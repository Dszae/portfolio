import { getAdminUsername, getEnvironmentFingerprint, matchesAdminIdentity } from './adminAuth.js';
import {
  createResetToken,
  hashPassword,
  isResetTokenFormat,
  sha256Hex,
  validateNewPassword,
} from './adminPassword.js';
import {
  consumeResetToken,
  isResetTokenValid,
  readStoredCredentials,
  saveResetToken,
} from './adminCredentialStore.js';
import { isMailConfigured, sendAdminMail } from './adminMailer.js';
import { logAdminAuthEvent } from './loginRateLimit.js';

/*
 * Password reset by email for the single admin account.
 *
 *   1. The owner asks for a link with the username or admin email.
 *   2. A random token is emailed to the owner; only its hash is stored, for 15 minutes.
 *   3. Opening the link and choosing a password stores the new hash and clears the
 *      token in one step, so the link works once. Every session is signed out,
 *      because sessions are signed with the active credential.
 */

export const RESET_TOKEN_TTL_MS = 15 * 60 * 1000;
export const RESET_EMAIL_COOLDOWN_MS = 60 * 1000;

/* Email reset needs a mail provider and the private credential table. */
export async function isEmailResetAvailable() {
  if (!isMailConfigured()) return false;
  try {
    return (await readStoredCredentials()).available;
  } catch {
    return false;
  }
}

/*
 * Returns 'sent', 'skipped' (unknown identifier, or a link went out moments ago)
 * or 'failed' (the mail provider did not accept the message).
 */
export async function requestPasswordReset({ identifier, origin, clientKey }) {
  if (!matchesAdminIdentity(identifier)) return 'skipped';

  const stored = await readStoredCredentials({ fresh: true });
  const lastRequest = stored.row?.reset_requested_at ? new Date(stored.row.reset_requested_at).getTime() : 0;
  if (Date.now() - lastRequest < RESET_EMAIL_COOLDOWN_MS) return 'skipped';

  const { token, tokenHash } = await createResetToken();
  await saveResetToken(tokenHash, Date.now() + RESET_TOKEN_TTL_MS);

  const minutes = RESET_TOKEN_TTL_MS / 60000;
  const delivered = await sendAdminMail({
    subject: 'Reset your portfolio admin password',
    text: [
      'A password reset was requested for the admin account of dipeshsapkota7.com.np.',
      `Open this link to choose a new password. It works once and expires in ${minutes} minutes:`,
      `${origin}/admin/reset-password?token=${token}`,
      'If you did not ask for this, ignore this email. The password has not changed.',
    ].join('\n\n'),
  });

  await logAdminAuthEvent(
    delivered ? 'admin_reset_requested' : 'admin_reset_mail_failed',
    clientKey,
    delivered ? 'Password reset link emailed' : 'Password reset link could not be emailed'
  );
  return delivered ? 'sent' : 'failed';
}

export async function checkResetToken(token) {
  if (!isResetTokenFormat(token)) return false;
  try {
    return await isResetTokenValid(await sha256Hex(token));
  } catch {
    return false;
  }
}

/* Returns { ok: true } or { ok: false, code, error }. */
export async function completePasswordReset({ token, password, clientKey }) {
  const expired = { ok: false, code: 'invalid_token', error: 'This reset link has expired or was already used' };
  if (!isResetTokenFormat(token)) return expired;

  const problem = validateNewPassword(password, getAdminUsername());
  if (problem) return { ok: false, code: 'weak_password', error: problem };

  const tokenHash = await sha256Hex(token);
  if (!(await isResetTokenValid(tokenHash))) return expired;

  const passwordHash = await hashPassword(password);
  const changed = await consumeResetToken(tokenHash, passwordHash, await getEnvironmentFingerprint());
  if (!changed) return expired;

  await logAdminAuthEvent('admin_password_reset', clientKey, 'Admin password changed by email reset');
  await sendAdminMail({
    subject: 'Your portfolio admin password was changed',
    text: [
      'The admin password of dipeshsapkota7.com.np was just changed through an email reset. All sessions were signed out.',
      'If this was not you, reset the password again from the sign-in page and check who has access to your inbox.',
    ].join('\n\n'),
  });

  return { ok: true };
}
