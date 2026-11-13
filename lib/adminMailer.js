/*
 * Sends account mail to the site owner. Two providers are supported, checked in
 * this order:
 *
 *   Resend      RESEND_API_KEY + ADMIN_EMAIL (recipient). ADMIN_MAIL_FROM is
 *               optional; the default Resend test sender only delivers to the
 *               address that owns the Resend account, which suits a single owner.
 *   Web3Forms   WEB3FORMS_ACCESS_KEY. Mail goes to the inbox that owns the key.
 *
 * Neither provider lets a visitor choose the recipient, so this cannot be used
 * to send mail to anyone but the owner.
 */

const MAIL_TIMEOUT_MS = 8000;
const DEFAULT_FROM = 'Portfolio Admin <onboarding@resend.dev>';

function provider() {
  if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) return 'resend';
  if (process.env.WEB3FORMS_ACCESS_KEY) return 'web3forms';
  return null;
}

export function isMailConfigured() {
  return provider() !== null;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

/* Plain paragraphs, with bare URLs turned into links. */
function toHtml(text) {
  return text
    .split(/\n{2,}/)
    .map((block) => {
      const body = escapeHtml(block).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>').replace(/\n/g, '<br>');
      return `<p style="margin:0 0 16px;font:15px/1.6 system-ui,sans-serif;color:#171717">${body}</p>`;
    })
    .join('');
}

/* Resolves to true when the provider accepted the message. Never throws. */
export async function sendAdminMail({ subject, text }) {
  const signal = AbortSignal.timeout(MAIL_TIMEOUT_MS);
  try {
    if (provider() === 'resend') {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        signal,
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.ADMIN_MAIL_FROM || DEFAULT_FROM,
          to: [process.env.ADMIN_EMAIL],
          subject,
          text,
          html: toHtml(text),
        }),
      });
      if (!response.ok) console.error('Resend rejected admin mail:', response.status, await response.text().catch(() => ''));
      return response.ok;
    }

    if (provider() === 'web3forms') {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: 'Dipesh Sapkota Portfolio Admin',
          message: text,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false) console.error('Web3Forms rejected admin mail:', response.status, result.message || '');
      return response.ok && result.success !== false;
    }
  } catch (error) {
    console.error('Admin mail delivery failed:', error?.message || error);
  }
  return false;
}
