import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'DipeshAdmin2026!';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'e9a2b847c13d8f50b2f6e917d05cae1837a4c9b2e1f582736184920475184920';

async function createToken(data) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  const sigHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${data}.${sigHex}`;
}

async function verifyToken(token) {
  if (!token || !token.includes('.')) return false;
  const [data, sigHex] = token.split('.');
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SESSION_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  
  const match = sigHex.match(/.{1,2}/g);
  if (!match) return false;
  const sigBytes = new Uint8Array(match.map(byte => parseInt(byte, 16)));
  return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(data));
}

export async function loginAdmin(password) {
  if (password !== ADMIN_PASSWORD) {
    return false;
  }
  const timestamp = Date.now().toString();
  const token = await createToken(`admin-${timestamp}`);
  
  const cookieStore = await cookies();
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return true;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    if (!session || !session.value) return false;
    return await verifyToken(session.value);
  } catch {
    return false;
  }
}

