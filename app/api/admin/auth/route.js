import {
  createSession,
  destroySession,
  fingerprint,
  getSession,
  isAuthConfigured,
  verifyCredentials,
} from '@/lib/adminAuth';
import { getLoginThrottle, recordLoginFailure, recordLoginSuccess } from '@/lib/loginRateLimit';
import { clientAddress, isSameOrigin, json, readJson, tooManyRequests } from '@/lib/adminRequest';

export const dynamic = 'force-dynamic';

const MAX_FIELD_LENGTH = 200;
const FAILURE_DELAY_MS = 400;

export async function POST(request) {
  if (!isSameOrigin(request)) {
    return json({ error: 'Request blocked', code: 'forbidden' }, 403);
  }

  const body = await readJson(request);
  if (!body) {
    return json({ error: 'Invalid request', code: 'invalid_request' }, 400);
  }

  const username = typeof body.username === 'string' ? body.username.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!username || !password) {
    return json({ error: 'Enter your username and password', code: 'missing_fields' }, 400);
  }
  if (username.length > MAX_FIELD_LENGTH || password.length > MAX_FIELD_LENGTH) {
    return json({ error: 'Incorrect username or password', code: 'invalid_credentials' }, 401);
  }

  try {
    if (!(await isAuthConfigured())) {
      return json({ error: 'Sign-in is not configured on this server', code: 'not_configured' }, 503);
    }

    const clientKey = await fingerprint(clientAddress(request));

    const throttle = await getLoginThrottle(clientKey);
    if (throttle.blocked) return tooManyRequests(throttle.retryAfterSeconds, 'Too many failed attempts');

    if (!(await verifyCredentials(username, password))) {
      const after = await recordLoginFailure(clientKey);
      await new Promise((resolve) => setTimeout(resolve, FAILURE_DELAY_MS));
      if (after.blocked) return tooManyRequests(after.retryAfterSeconds, 'Too many failed attempts');
      return json(
        {
          error: 'Incorrect username or password',
          code: 'invalid_credentials',
          attemptsRemaining: after.remaining,
        },
        401
      );
    }

    await recordLoginSuccess(clientKey);
    const session = await createSession();
    return json({ success: true, username: session.sub, expiresAt: session.exp * 1000 });
  } catch (error) {
    console.error('Admin sign-in failed:', error);
    return json({ error: 'Sign-in failed on the server', code: 'server_error' }, 500);
  }
}

export async function DELETE(request) {
  if (!isSameOrigin(request)) {
    return json({ error: 'Request blocked', code: 'forbidden' }, 403);
  }
  await destroySession();
  return json({ success: true });
}

export async function GET() {
  const session = await getSession();
  if (!session) return json({ authenticated: false });
  return json({ authenticated: true, username: session.username, expiresAt: session.expiresAt });
}
