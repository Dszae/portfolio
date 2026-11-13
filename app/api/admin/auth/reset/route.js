import { destroySession, fingerprint } from '@/lib/adminAuth';
import { completePasswordReset } from '@/lib/adminPasswordReset';
import { takeAttempt } from '@/lib/loginRateLimit';
import { clientAddress, isSameOrigin, json, readJson, tooManyRequests } from '@/lib/adminRequest';

export const dynamic = 'force-dynamic';

const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

/* Sets a new password from an emailed reset link. The link works once. */
export async function POST(request) {
  if (!isSameOrigin(request)) {
    return json({ error: 'Request blocked', code: 'forbidden' }, 403);
  }

  const body = await readJson(request);
  const token = typeof body?.token === 'string' ? body.token : '';
  const password = typeof body?.password === 'string' ? body.password : '';
  if (!token || !password) {
    return json({ error: 'Enter a new password', code: 'missing_fields' }, 400);
  }

  try {
    const clientKey = await fingerprint(clientAddress(request));
    const gate = takeAttempt('reset', clientKey, MAX_ATTEMPTS, WINDOW_MS);
    if (!gate.allowed) return tooManyRequests(gate.retryAfterSeconds, 'Too many attempts');

    const result = await completePasswordReset({ token, password, clientKey });
    if (!result.ok) return json({ error: result.error, code: result.code }, 400);

    await destroySession();
    return json({ success: true });
  } catch (error) {
    console.error('Admin password reset failed:', error);
    return json({ error: 'The password could not be saved. Try again', code: 'server_error' }, 500);
  }
}
