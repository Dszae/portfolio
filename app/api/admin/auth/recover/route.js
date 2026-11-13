import { fingerprint } from '@/lib/adminAuth';
import { isEmailResetAvailable, requestPasswordReset } from '@/lib/adminPasswordReset';
import { takeAttempt } from '@/lib/loginRateLimit';
import { clientAddress, isSameOrigin, json, linkOrigin, readJson, tooManyRequests } from '@/lib/adminRequest';

export const dynamic = 'force-dynamic';

const MAX_REQUESTS = 3;
const WINDOW_MS = 15 * 60 * 1000;
const MIN_RESPONSE_MS = 900;

/*
 * Asks for a password reset link. The answer is the same whether or not the
 * identifier belongs to the admin, and takes about as long either way.
 */
export async function POST(request) {
  if (!isSameOrigin(request)) {
    return json({ error: 'Request blocked', code: 'forbidden' }, 403);
  }

  const body = await readJson(request);
  const identifier = typeof body?.identifier === 'string' ? body.identifier.trim() : '';
  if (!identifier || identifier.length > 200) {
    return json({ error: 'Enter your username or email', code: 'missing_fields' }, 400);
  }

  const started = Date.now();
  try {
    const clientKey = await fingerprint(clientAddress(request));
    const gate = takeAttempt('recover', clientKey, MAX_REQUESTS, WINDOW_MS);
    if (!gate.allowed) return tooManyRequests(gate.retryAfterSeconds, 'Too many reset requests');

    if (!(await isEmailResetAvailable())) {
      return json({ error: 'Email reset is not set up on this server', code: 'not_configured' }, 503);
    }

    const outcome = await requestPasswordReset({ identifier, origin: linkOrigin(request), clientKey });
    await new Promise((resolve) => setTimeout(resolve, Math.max(0, MIN_RESPONSE_MS - (Date.now() - started))));

    if (outcome === 'failed') {
      return json({ error: 'The reset email could not be sent. Try again in a few minutes', code: 'mail_failed' }, 502);
    }
    return json({ success: true });
  } catch (error) {
    console.error('Admin password reset request failed:', error);
    return json({ error: 'The request failed on the server', code: 'server_error' }, 500);
  }
}
