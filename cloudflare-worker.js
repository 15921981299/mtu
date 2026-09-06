import { SALES_EMAIL, isZohoSmtpConfigured, sendZohoEmail } from './zoho-smtp.js';

const DOWNLOAD_TTL_SECONDS = 7 * 24 * 60 * 60;
const textEncoder = new TextEncoder();

async function hmacKey(secret) {
  return crypto.subtle.importKey('raw', textEncoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function createDownloadUrl(request, key, secret, now = Date.now()) {
  const expires = String(Math.floor(now / 1000) + DOWNLOAD_TTL_SECONDS);
  const signature = await crypto.subtle.sign('HMAC', await hmacKey(secret), textEncoder.encode(`${key}\n${expires}`));
  const hex = Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
  const url = new URL('/api/rfq/download', request.url);
  url.search = new URLSearchParams({ key, expires, signature: hex }).toString();
  return url.toString();
}

async function downloadDrawing(request, env, now = Date.now()) {
  const headers = {
    'Cache-Control': 'private, no-store',
    'X-Robots-Tag': 'noindex, nofollow, noarchive',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
  };
  const fail = (message, status) => new Response(message, { status, headers });
  if (!['GET', 'HEAD'].includes(request.method)) return fail('Method not allowed', 405);
  if (!env.RFQ_DOWNLOAD_SECRET || !env.R2_BUCKET) return fail('Download temporarily unavailable.', 503);

  const url = new URL(request.url);
  const key = url.searchParams.get('key') || '';
  const expires = url.searchParams.get('expires') || '';
  const signature = url.searchParams.get('signature') || '';
  const nowSeconds = Math.floor(now / 1000);
  if (!key.startsWith('rfq/') || /[\r\n]/.test(key) || !/^\d{10}$/.test(expires) || !/^[a-f0-9]{64}$/.test(signature)) {
    return fail('Invalid download link.', 403);
  }
  const valid = await crypto.subtle.verify(
    'HMAC',
    await hmacKey(env.RFQ_DOWNLOAD_SECRET),
    Uint8Array.from(signature.match(/../g), (byte) => parseInt(byte, 16)),
    textEncoder.encode(`${key}\n${expires}`),
  );
  if (!valid) return fail('Invalid download link.', 403);
  if (Number(expires) <= nowSeconds || Number(expires) > nowSeconds + DOWNLOAD_TTL_SECONDS + 60) {
    return fail('This download link has expired. Contact sales@dieselpartsource.com for assistance.', 410);
  }

  const object = request.method === 'HEAD' ? await env.R2_BUCKET.head(key) : await env.R2_BUCKET.get(key);
  if (!object) return fail('File not found.', 404);
  const filename = (object.customMetadata?.originalFilename || key.split('/').pop() || 'attachment').replace(/[\r\n\u0000-\u001f\u007f/\\]/g, '_');
  const encoded = encodeURIComponent(filename).replace(/[!'()*]/g, (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`);
  return new Response(request.method === 'HEAD' ? null : object.body, {
    headers: {
      ...headers,
      'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
      'Content-Length': String(object.size),
      'Content-Disposition': `attachment; filename="attachment"; filename*=UTF-8''${encoded}`,
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isRfqRoute = url.pathname === '/api/rfq' || url.pathname === '/api/rfq/';
    const isDownloadRoute = url.pathname === '/api/rfq/download' || url.pathname === '/api/rfq/download/';

    if (isDownloadRoute) return downloadDrawing(request, env);

    if (!isRfqRoute) {
      if (env.ASSETS && typeof env.ASSETS.fetch === 'function') {
        return env.ASSETS.fetch(request);
      }

      return new Response('Not found', { status: 404 });
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ ok: true, ready: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    try {
      const fd = await request.formData();
      const name = fd.get('name')?.toString() || '(not provided)';
      const email = fd.get('email')?.toString() || '(not provided)';
      const company = fd.get('company')?.toString() || '-';
      const phone = fd.get('phone')?.toString() || '-';
      const material = fd.get('material')?.toString() || '-';
      const quantity = fd.get('quantity')?.toString() || '-';
      const message = fd.get('message')?.toString() || '-';
      const source = fd.get('source')?.toString() || '-';
      const role = fd.get('role')?.toString() || '-';
      const nda = fd.get('nda') ? 'Yes' : 'No';

      // Store file to R2
      let drawingInfo = 'No file';
      const drawing = fd.get('drawing');

      if (drawing && drawing instanceof File && drawing.size > 0) {
        const fileSizeKB = (drawing.size / 1024).toFixed(0);
        const key = `rfq/${Date.now()}_${drawing.name}`;

        if (env.R2_BUCKET) {
          await env.R2_BUCKET.put(key, drawing.stream(), {
            httpMetadata: { contentType: drawing.type || 'application/octet-stream' },
            customMetadata: { originalFilename: drawing.name, retentionClass: 'rfq-private' },
          });
          if (env.RFQ_DOWNLOAD_SECRET) {
            const downloadUrl = await createDownloadUrl(request, key, env.RFQ_DOWNLOAD_SECRET);
            drawingInfo = `${drawing.name} (${fileSizeKB} KB)\nPrivate download (valid for 7 days): ${downloadUrl}`;
          } else {
            drawingInfo = `${drawing.name} (${fileSizeKB} KB) [private download not configured]`;
          }
          console.log(`File stored: ${key} (${fileSizeKB} KB)`);
        } else {
          drawingInfo = `${drawing.name} (${fileSizeKB} KB) [R2 not configured]`;
          console.log('R2 not bound - file not stored');
        }
      }

      const emailBody = [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Company:  ${company}`,
        `Phone:    ${phone}`,
        `Role:     ${role}`,
        `Material: ${material}`,
        `Quantity: ${quantity}`,
        `Drawing:  ${drawingInfo}`,
        `NDA:      ${nda}`,
        `Source:   ${source}`,
        '',
        `Message:`,
        message,
      ].join('\n');

      console.log(emailBody);

      const deliverEmail = typeof env.__sendEmail === 'function' ? env.__sendEmail : sendZohoEmail;

      if (!env.__sendEmail && !isZohoSmtpConfigured(env)) {
        console.error('ZOHO_SMTP_PASS not configured');
        return new Response(JSON.stringify({ ok: false, message: 'Email service not configured. Please email us at sales@dieselpartsource.com' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      await deliverEmail(env, {
        to: 'admin@machiningsupplier.com',
        subject: `New RFQ: ${name} - ${material} / ${quantity}`,
        text: emailBody,
        replyTo: email.includes('@') && email !== '(not provided)' ? email : undefined,
      });
      console.log('Zoho SMTP: sales notification sent');

      if (email.includes('@') && email !== '(not provided)') {
        const autoReplyBody = [
          `Hi ${name},`,
          '',
          'Thank you for submitting your engine parts inquiry to Diesel Part Source.',
          '',
          'We have received your inquiry. Our parts team will review your part number, engine details, photos, quantity, and destination before quotation.',
          '',
          'What happens next:',
          '1. Part-number, engine model, and serial-number review',
          '2. Availability, lead time, unit price, and shipping route check',
          '3. Follow-up if replacement or compatibility details need confirmation',
          '',
          'Helpful resources:',
          '- MTU part numbers: https://dieselpartsource.com/part-products/',
          '- Engine parts catalog: https://dieselpartsource.com/products/',
          '',
          'Questions before we reply? Email sales@dieselpartsource.com - we respond within one business day.',
          '',
          'Best regards,',
          'Diesel Part Source Parts Team',
        ].join('\n');

        try {
          await deliverEmail(env, {
            to: email,
            subject: 'We received your engine parts inquiry - Diesel Part Source',
            text: autoReplyBody,
            replyTo: SALES_EMAIL,
          });
          console.log('Zoho SMTP: customer auto-reply sent');
        } catch (autoReplyErr) {
          console.error('Customer auto-reply failed:', autoReplyErr.message);
        }
      }

      return new Response(JSON.stringify({ ok: true, message: `Thanks ${name}! We'll respond to ${email} within 24 hours.` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });

    } catch (err) {
      console.error('RFQ Error:', err.message);
      return new Response(JSON.stringify({ ok: false, message: 'Something went wrong. Please email us at sales@dieselpartsource.com' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
