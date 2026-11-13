/*
 * Password hashing for the admin account. Web Crypto only, so the same code runs in
 * Node, in the Cloudflare Worker and in scripts/admin-credentials.mjs.
 *
 * Stored format: pbkdf2:<iterations>:<salt hex>:<hash hex>
 * Colons instead of "$" because dotenv expands "$" inside .env files.
 */

// Cloudflare Workers reject PBKDF2 iteration counts above 100000.
export const PBKDF2_ITERATIONS = 100000;
const KEY_BITS = 256;
const encoder = new TextEncoder();

export function toHex(bytes) {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function fromHex(hex) {
  if (typeof hex !== 'string' || hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

/* Compares two byte arrays without stopping at the first difference. */
export function timingSafeEqual(a, b) {
  if (!a || !b) return false;
  const length = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < length; i += 1) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

export function timingSafeEqualText(a, b) {
  return timingSafeEqual(encoder.encode(String(a ?? '')), encoder.encode(String(b ?? '')));
}

async function derive(password, salt, iterations) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, KEY_BITS);
  return new Uint8Array(bits);
}

export async function hashPassword(password, iterations = PBKDF2_ITERATIONS) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derive(password, salt, iterations);
  return `pbkdf2:${iterations}:${toHex(salt)}:${toHex(hash)}`;
}

export function parsePasswordHash(stored) {
  const [scheme, rawIterations, saltHex, hashHex] = String(stored || '').trim().split(':');
  const iterations = Number(rawIterations);
  const salt = fromHex(saltHex);
  const hash = fromHex(hashHex);
  if (scheme !== 'pbkdf2' || !Number.isInteger(iterations) || iterations < 1 || iterations > PBKDF2_ITERATIONS) return null;
  if (!salt || !hash || salt.length < 8 || hash.length !== KEY_BITS / 8) return null;
  return { iterations, salt, hash };
}

export async function verifyPasswordHash(password, stored) {
  const parsed = parsePasswordHash(stored);
  if (!parsed) return false;
  const candidate = await derive(String(password ?? ''), parsed.salt, parsed.iterations);
  return timingSafeEqual(candidate, parsed.hash);
}

export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 200;

/* Returns a message describing why a new password is not acceptable, or '' when it is fine. */
export function validateNewPassword(password, username = '') {
  const value = typeof password === 'string' ? password : '';
  if (value.length < MIN_PASSWORD_LENGTH) return `Use at least ${MIN_PASSWORD_LENGTH} characters`;
  if (value.length > MAX_PASSWORD_LENGTH) return `Use at most ${MAX_PASSWORD_LENGTH} characters`;
  if (new Set(value).size < 5) return 'Use a wider mix of characters';
  if (username && value.toLowerCase() === username.toLowerCase()) return 'The password cannot be the username';
  return '';
}

export async function sha256Hex(text) {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(String(text))));
}

/* A reset token is 256 random bits. Only its SHA-256 hash is stored; the token itself goes in the email. */
export async function createResetToken() {
  const token = toHex(crypto.getRandomValues(new Uint8Array(32)));
  return { token, tokenHash: await sha256Hex(token) };
}

export function isResetTokenFormat(token) {
  return typeof token === 'string' && /^[0-9a-f]{64}$/.test(token);
}
