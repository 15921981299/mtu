const FROM = 'Engine Family <rfq@dieselpartsrfq.com>';

export async function sendResendEmail(resendKey, { to, subject, text, replyTo }) {
  const payload = {
    from: FROM,
    to,
    subject,
    text,
  };
  if (replyTo) payload.reply_to = replyTo;

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    throw new Error(`Resend failed (${resp.status}): ${detail}`);
  }

  return resp;
}

export function buildCustomerAutoReply({ name, siteUrl }) {
  return [
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
    `- MTU part numbers: ${siteUrl}/part-products/`,
    `- Engine parts catalog: ${siteUrl}/products/`,
    '',
    'Questions before we reply? Email charles@dieselpartsrfq.com — we respond within one business day.',
    '',
    'Best regards,',
    'Engine Family Parts Team',
  ].join('\n');
}
