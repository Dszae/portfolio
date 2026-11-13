import { supabaseAdmin } from './supabaseAdmin.js';

/*
 * Private storage for what an email password reset has to write at runtime: the
 * new password hash and the pending reset token. Environment secrets cannot be
 * changed by the running site, so this lives in the Supabase table
 * `admin_credentials` (row level security on, no policies: service role only).
 * The SQL is in scripts/supabase-schema.sql.
 *
 * Until that table exists every read reports `available: false` and the site
 * keeps using the password from the environment.
 */

const TABLE = 'admin_credentials';
const ROW_ID = 'owner';
const CACHE_MS = 30 * 1000;
const STALE_MS = 10 * 60 * 1000;
const DB_TIMEOUT_MS = 2500;
const MISSING_TABLE_CODES = new Set(['PGRST205', '42P01']);

const cache = (globalThis.__adminCredentialCache ??= { value: null, fetchedAt: 0 });

export function hasCredentialDatabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function invalidateCredentialCache() {
  cache.value = null;
  cache.fetchedAt = 0;
}

/*
 * Returns { available, row }.
 *   available: false  the table is missing or no database is configured
 *   row: null         nothing has been stored yet
 * Throws when the database cannot be reached and no recent copy is cached, so a
 * reset password is never silently replaced by the older one from the environment.
 */
export async function readStoredCredentials({ fresh = false } = {}) {
  if (!hasCredentialDatabase()) return { available: false, row: null };

  const age = Date.now() - cache.fetchedAt;
  if (!fresh && cache.value && age < CACHE_MS) return cache.value;

  let failure;
  try {
    const { data, error } = await supabaseAdmin
      .from(TABLE)
      .select('password_hash, env_fingerprint, password_updated_at, reset_requested_at')
      .eq('id', ROW_ID)
      .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS))
      .maybeSingle();

    if (!error) {
      cache.value = { available: true, row: data || null };
      cache.fetchedAt = Date.now();
      return cache.value;
    }
    if (MISSING_TABLE_CODES.has(error.code)) {
      cache.value = { available: false, row: null };
      cache.fetchedAt = Date.now();
      return cache.value;
    }
    failure = new Error(`admin_credentials lookup failed: ${error.message}`);
  } catch (error) {
    failure = error;
  }

  if (cache.value && age < STALE_MS) return cache.value;
  throw failure;
}

/* Stores the hash of a new reset token, replacing any earlier one. */
export async function saveResetToken(tokenHash, expiresAt) {
  const now = new Date().toISOString();
  const { error } = await supabaseAdmin
    .from(TABLE)
    .upsert(
      {
        id: ROW_ID,
        reset_token_hash: tokenHash,
        reset_expires_at: new Date(expiresAt).toISOString(),
        reset_requested_at: now,
        updated_at: now,
      },
      { onConflict: 'id' }
    )
    .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS));
  if (error) throw new Error(`Could not store the reset token: ${error.message}`);
  invalidateCredentialCache();
}

/* True while the token is the pending one and has not expired. Reading does not use it up. */
export async function isResetTokenValid(tokenHash) {
  if (!hasCredentialDatabase()) return false;
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select('id')
    .eq('id', ROW_ID)
    .eq('reset_token_hash', tokenHash)
    .gt('reset_expires_at', new Date().toISOString())
    .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS))
    .maybeSingle();
  return !error && Boolean(data);
}

/*
 * Sets the new password and clears the token in one conditional update, so a
 * token works exactly once even if two requests race. Returns false when the
 * token is unknown, already used or expired.
 */
export async function consumeResetToken(tokenHash, passwordHash, envFingerprint) {
  const now = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update({
      password_hash: passwordHash,
      env_fingerprint: envFingerprint,
      password_updated_at: now,
      reset_token_hash: null,
      reset_expires_at: null,
      updated_at: now,
    })
    .eq('id', ROW_ID)
    .eq('reset_token_hash', tokenHash)
    .gt('reset_expires_at', now)
    .select('id')
    .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS));
  if (error) throw new Error(`Could not save the new password: ${error.message}`);
  invalidateCredentialCache();
  return Array.isArray(data) && data.length === 1;
}
