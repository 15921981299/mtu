const FROM = 'Machining Supplier <rfq@machiningsupplier.com>';

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
    'Thank you for submitting your CNC machining quote request to Machining Supplier.',
    '',
    'We have received your inquiry. Our engineering team will review your drawing for manufacturability and send a detailed quotation within 24 hours.',
    '',
    'What happens next:',
    '1. DFM review of your drawing and specifications',
    '2. Detailed quote with lead time, unit price, and tooling cost (if any)',
    '3. Engineering follow-up if we spot cost-saving design opportunities',
    '',
    'Helpful resources:',
    `- CNC Tolerance Guide: ${siteUrl}/resources/cnc-tolerance-guide/`,
    `- Drawing preparation tips: ${siteUrl}/blog/how-to-prepare-a-drawing-for-cnc-rfq/`,
    '',
    'Questions before we reply? Email info@machiningsupplier.com — we respond within one business day.',
    '',
    'Best regards,',
    'Machining Supplier Engineering Team',
  ].join('\n');
}
