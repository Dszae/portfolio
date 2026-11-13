import { cookies } from 'next/headers';
import {
  verifyPasswordHash,
  parsePasswordHash,
  timingSafeEqualText,
  sha256Hex,
  toHex,
  fromHex,
} from './adminPassword.js';
import { readStoredCredentials } from './adminCredentialStore.js';

/*
 * Single-owner admin authentication.
 *
 * Credentials come from the environment, never from source:
 *   ADMIN_USERNAME        sign-in name (defaults to the public handle "dszae")
 *   ADMIN_EMAIL           optional, accepted in place of the username
 *   ADMIN_PASSWORD_HASH   PBKDF2 hash from `npm run admin:credentials`
 *   ADMIN_PASSWORD        legacy plain-text fallback, used only when no hash is set
 *   ADMIN_SESSION_SECRET  signs session cookies; sign-in is refused without it
 *
 * A password set through the email reset is stored in the private
 * `admin_credentials` table and takes over from the environment value. It stays
 * in force until the environment value itself is changed, so whichever was set
 * last wins.
 *
 * Sessions are stateless signed cookies. The signing key mixes in the active
 * credential, so changing the password signs every existing session out.
 */

export const SESSION_COOKIE = 'admin_session';
export const SESSION_TTL_SECONDS = 60 * 60 * 12;

const DEFAULT_USERNAME = 'dszae';
const MIN_SECRET_LENGTH = 32;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function readEnvironment() {
  const sessionSecret = (process.env.ADMIN_SESSION_SECRET || '').trim();
  const envHash = (process.env.ADMIN_PASSWORD_HASH || '').trim();
  const hashIsValid = Boolean(parsePasswordHash(envHash));
  return {
    username: (process.env.ADMIN_USERNAME || DEFAULT_USERNAME).trim().toLowerCase(),
    email: (process.env.ADMIN_EMAIL || '').trim().toLowerCase(),
    passwordHash: hashIsValid ? envHash : '',
    legacyPassword: hashIsValid ? '' : process.env.ADMIN_PASSWORD || '',
    sessionSecret: sessionSecret.length >= MIN_SECRET_LENGTH ? sessionSecret : '',
  };
}

async function hmacHex(secret, value) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(String(value))));
}

/*
 * Identifies the password currently set in the environment without revealing it.
 * A reset password is stored next to this value and applies only while it still
 * matches, so setting a new environment password takes over again.
 */
async function environmentFingerprint(env) {
  if (env.passwordHash) return sha256Hex(`admin-env-credential:${env.passwordHash}`);
  if (env.legacyPassword && env.sessionSecret) return hmacHex(env.sessionSecret, `admin-env-credential:${env.legacyPassword}`);
  return '';
}

export async function getEnvironmentFingerprint() {
  return environmentFingerprint(readEnvironment());
}

/* The environment values plus, when one is in force, the password set by an email reset. */
async function loadConfig() {
  const env = readEnvironment();
  const stored = await readStoredCredentials();
  const resetHash = stored.row?.password_hash || '';

  if (resetHash && parsePasswordHash(resetHash) && stored.row.env_fingerprint === (await environmentFingerprint(env))) {
    return { ...env, passwordHash: resetHash, legacyPassword: '' };
  }
  return env;
}

function isConfigured(config) {
  return Boolean(config.sessionSecret && (config.passwordHash || config.legacyPassword));
}

export async function isAuthConfigured() {
  return isConfigured(await loadConfig());
}

function base64UrlEncode(text) {
  let binary = '';
  for (const byte of encoder.encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (value.length % 4)) % 4);
  const binary = atob(padded);
  return decoder.decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

async function importSigningKey(config, usage) {
  const material = `${config.sessionSecret}\n${config.passwordHash || config.legacyPassword}`;
  return crypto.subtle.importKey('raw', encoder.encode(material), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

async function signSession(payload, config) {
  const body = base64UrlEncode(JSON.stringify(payload));
  const key = await importSigningKey(config, 'sign');
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`v2.${body}`));
  return `v2.${body}.${toHex(signature)}`;
}

async function readSessionToken(token, config) {
  if (typeof token !== 'string' || token.length > 1024) return null;
  const [version, body, signatureHex, ...rest] = token.split('.');
  if (version !== 'v2' || !body || !signatureHex || rest.length) return null;

  const signature = fromHex(signatureHex);
  if (!signature) return null;

  const key = await importSigningKey(config, 'verify');
  const valid = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(`v2.${body}`));
  if (!valid) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body));
    if (payload.sub !== config.username) return null;
    if (!Number.isFinite(payload.exp) || payload.exp * 1000 <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/* Keyed fingerprint for values that should not be stored raw, such as client IPs. */
export async function fingerprint(value) {
  const { sessionSecret } = readEnvironment();
  return (await hmacHex(sessionSecret || 'unconfigured', value)).slice(0, 32);
}

function identityMatches(identifier, config) {
  const name = String(identifier ?? '').trim().toLowerCase();
  const usernameMatches = timingSafeEqualText(name, config.username);
  const emailMatches = config.email !== '' && timingSafeEqualText(name, config.email);
  return usernameMatches || emailMatches;
}

/* True when the text is the admin username or the configured admin email. */
export function matchesAdminIdentity(identifier) {
  return identityMatches(identifier, readEnvironment());
}

export function getAdminUsername() {
  return readEnvironment().username;
}

/*
 * Checks a username (or email) and password. The password check always runs, so a
 * wrong username takes as long as a wrong password.
 */
export async function verifyCredentials(identifier, password) {
  const config = await loadConfig();
  if (!isConfigured(config)) return false;

  const nameMatches = identityMatches(identifier, config);
  const passwordMatches = config.passwordHash
    ? await verifyPasswordHash(password, config.passwordHash)
    : timingSafeEqualText(password, config.legacyPassword);

  return nameMatches && passwordMatches;
}

export async function createSession() {
  const config = await loadConfig();
  if (!isConfigured(config)) return null;

  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = {
    sub: config.username,
    iat: issuedAt,
    exp: issuedAt + SESSION_TTL_SECONDS,
    sid: toHex(crypto.getRandomValues(new Uint8Array(12))),
  };

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await signSession(payload, config), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
    priority: 'high',
  });

  return payload;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/* Returns { username, issuedAt, expiresAt } for a valid session, otherwise null. */
export async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const config = await loadConfig();
    if (!isConfigured(config)) return null;

    const payload = await readSessionToken(token, config);
    if (!payload) return null;

    return {
      username: payload.sub,
      issuedAt: payload.iat * 1000,
      expiresAt: payload.exp * 1000,
    };
  } catch {
    return null;
  }
}

export async function isAuthenticated() {
  return (await getSession()) !== null;
}

export async function logoutAdmin() {
  await destroySession();
}
