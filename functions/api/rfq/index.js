import { buildCustomerAutoReply, sendResendEmail } from '../../_lib/resend.js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};

const SITE_URL = 'https://dieselpartsrfq.com';

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method === 'GET') {
    return new Response(JSON.stringify({ ok: true, ready: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
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
    const tolerance = fd.get('tolerance')?.toString() || '-';
    const surfaceFinish = fd.get('surface_finish')?.toString() || '-';
    const deadline = fd.get('deadline')?.toString() || '-';
    const country = fd.get('country')?.toString() || '-';
    const message = fd.get('message')?.toString() || '-';
    const source = fd.get('source')?.toString() || '-';
    const role = fd.get('role')?.toString() || '-';
    const firstTouchPage = fd.get('first_touch_page')?.toString() || '-';
    const firstTouchStage = fd.get('first_touch_stage')?.toString() || '-';
    const touchCount = fd.get('touch_count')?.toString() || '-';
    const touchPath = fd.get('touch_path')?.toString() || '-';
    const nda = fd.get('nda') ? 'Yes' : 'No';
    const inspectionReport = fd.get('inspection_report') ? 'Yes' : 'No';
    const materialCertificate = fd.get('material_certificate') ? 'Yes' : 'No';

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
      } else {
        drawingInfo = `${drawing.name} (${fileSizeKB} KB) [R2 not configured]`;
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
      `Tolerance:${tolerance}`,
      `Finish:   ${surfaceFinish}`,
      `Deadline: ${deadline}`,
      `Country:  ${country}`,
      `Drawing:  ${drawingInfo}`,
      `Inspection report:   ${inspectionReport}`,
      `Material certificate:${materialCertificate}`,
      `NDA:      ${nda}`,
      `Source:   ${source}`,
      '',
      `Attribution (multi-touch):`,
      `First touch page:  ${firstTouchPage}`,
      `First touch stage: ${firstTouchStage}`,
      `Touch count:       ${touchCount}`,
      `Touch path:        ${touchPath}`,
      '',
      `Message:`,
      message,
    ].join('\n');

    const resendKey = env.RESEND_API_KEY;
    if (!resendKey) {
      console.error('RESEND_API_KEY not configured');
      return new Response(
        JSON.stringify({ ok: false, message: 'Email service not configured. Please email us at charles@dieselpartsrfq.com' }),
        { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    await sendResendEmail(resendKey, {
      to: 'charles@dieselpartsrfq.com',
      subject: `New RFQ: ${name} — ${material} / ${quantity}`,
      text: emailBody,
    });

    if (email.includes('@') && email !== '(not provided)') {
      try {
        await sendResendEmail(resendKey, {
          to: email,
          subject: 'We received your engine parts inquiry — Engine Family',
          text: buildCustomerAutoReply({ name, siteUrl: SITE_URL }),
          replyTo: 'charles@dieselpartsrfq.com',
        });
      } catch (autoReplyErr) {
        console.error('Customer auto-reply failed:', autoReplyErr.message);
      }
    }

    if (env.RFQ_WEBHOOK_URL) {
      try {
        await fetch(env.RFQ_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            company,
            phone,
            role,
            material,
            quantity,
            tolerance,
            surfaceFinish,
            deadline,
            country,
            message,
            source,
            firstTouchPage,
            firstTouchStage,
            touchCount,
            touchPath,
            nda,
            inspectionReport,
            materialCertificate,
            submittedAt: new Date().toISOString(),
          }),
        });
      } catch (webhookErr) {
        console.error('RFQ webhook failed:', webhookErr.message);
      }
    }

    return new Response(JSON.stringify({ ok: true, message: `Thanks ${name}! We'll respond to ${email} within 24 hours.` }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err) {
    console.error('RFQ Error:', err.message);
    return new Response(JSON.stringify({ ok: false, message: 'Something went wrong. Please email us at charles@dieselpartsrfq.com' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}
