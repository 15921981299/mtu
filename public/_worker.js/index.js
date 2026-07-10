export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isRfqRoute = url.pathname === '/api/rfq' || url.pathname === '/api/rfq/';

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
          });
          const url = `https://pub-rfq-uploads.r2.dev/${key}`;
          drawingInfo = `${drawing.name} (${fileSizeKB} KB)\nDownload: ${url}`;
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

      // Send email via Resend (set RESEND_API_KEY in Worker secrets)
      const resendKey = env.RESEND_API_KEY;
      if (!resendKey) {
        console.error('RESEND_API_KEY not configured');
        return new Response(JSON.stringify({ ok: false, message: 'Email service not configured. Please email us at charles@dieselpartsrfq.com' }), {
          status: 503,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }

      const mailResp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: 'Engine Family <rfq@dieselpartsrfq.com>',
          to: 'charles@dieselpartsrfq.com',
          subject: `New RFQ: ${name} - ${material} / ${quantity}`,
          text: emailBody,
        }),
      });
      console.log('Resend status:', mailResp.status);

      if (email.includes('@') && email !== '(not provided)') {
        const autoReplyBody = [
          `Hi ${name},`,
          '',
          'Thank you for submitting your engine parts inquiry to Engine Family.',
          '',
          'We have received your inquiry. Our parts team will review your part number, engine details, photos, quantity, and destination before quotation.',
          '',
          'What happens next:',
          '1. Part-number, engine model, and serial-number review',
          '2. Availability, lead time, unit price, and shipping route check',
          '3. Follow-up if replacement or compatibility details need confirmation',
          '',
          'Helpful resources:',
          '- MTU part numbers: https://dieselpartsrfq.com/part-products/',
          '- Engine parts catalog: https://dieselpartsrfq.com/products/',
          '',
          'Questions before we reply? Email charles@dieselpartsrfq.com - we respond within one business day.',
          '',
          'Best regards,',
          'Engine Family Parts Team',
        ].join('\n');

        const autoReplyResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Engine Family <rfq@dieselpartsrfq.com>',
            to: email,
            reply_to: 'charles@dieselpartsrfq.com',
            subject: 'We received your engine parts inquiry - Engine Family',
            text: autoReplyBody,
          }),
        });
        console.log('Customer auto-reply status:', autoReplyResp.status);
      }

      return new Response(JSON.stringify({ ok: true, message: `Thanks ${name}! We'll respond to ${email} within 24 hours.` }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });

    } catch (err) {
      console.error('RFQ Error:', err.message);
      return new Response(JSON.stringify({ ok: false, message: 'Something went wrong. Please email us at charles@dieselpartsrfq.com' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  },
};
