import { supabaseAdmin } from './supabaseAdmin.js';

/*
 * Brute-force protection for the admin sign-in.
 *
 * Failed attempts are counted per client over a sliding window. Two stores are
 * combined and the stricter count wins:
 *   - memory: instant, but local to one server process or Worker isolate
 *   - activity_logs (Supabase, service role only): shared by every isolate and
 *     kept across restarts, which also leaves an audit trail of sign-in attempts
 *
 * If the database is unreachable the memory count still applies.
 */

export const MAX_FAILED_ATTEMPTS = 5;
export const WINDOW_MS = 15 * 60 * 1000;

const FAILED = 'admin_login_failed';
const SUCCEEDED = 'admin_login_succeeded';
const DB_TIMEOUT_MS = 1500;

const memory = (globalThis.__adminLoginFailures ??= new Map());

function hasDatabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function recentMemoryFailures(clientKey, now) {
  const recent = (memory.get(clientKey) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length) memory.set(clientKey, recent);
  else memory.delete(clientKey);
  return recent;
}

/* Failures since the last successful sign-in, newest first. Null when the lookup fails. */
async function recentDatabaseFailures(clientKey, now) {
  if (!hasDatabase()) return null;
  try {
    const { data, error } = await supabaseAdmin
      .from('activity_logs')
      .select('action, created_at')
      .eq('entity', 'admin_auth')
      .eq('ip_address', clientKey)
      .in('action', [FAILED, SUCCEEDED])
      .gte('created_at', new Date(now - WINDOW_MS).toISOString())
      .order('created_at', { ascending: false })
      .limit(MAX_FAILED_ATTEMPTS + 1)
      .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS));
    if (error || !Array.isArray(data)) return null;

    const failures = [];
    for (const row of data) {
      if (row.action !== FAILED) break;
      failures.push(new Date(row.created_at).getTime());
    }
    return failures;
  } catch {
    return null;
  }
}

/* Writes one line to the admin audit trail. Best effort: a failed write never blocks the request. */
export async function logAdminAuthEvent(action, clientKey, details) {
  if (!hasDatabase()) return;
  try {
    await supabaseAdmin
      .from('activity_logs')
      .insert({ action, entity: 'admin_auth', details, ip_address: clientKey })
      .abortSignal(AbortSignal.timeout(DB_TIMEOUT_MS));
  } catch {
    // The memory count already holds this attempt.
  }
}

/* Current standing for a client: whether it is locked out and for how long. */
export async function getLoginThrottle(clientKey, now = Date.now()) {
  const fromMemory = recentMemoryFailures(clientKey, now);
  const fromDatabase = (await recentDatabaseFailures(clientKey, now)) || [];
  const failures = fromDatabase.length > fromMemory.length ? fromDatabase : fromMemory;

  const blocked = failures.length >= MAX_FAILED_ATTEMPTS;
  const oldest = failures.length ? Math.min(...failures) : now;

  return {
    blocked,
    remaining: Math.max(0, MAX_FAILED_ATTEMPTS - failures.length),
    retryAfterSeconds: blocked ? Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)) : 0,
  };
}

export async function recordLoginFailure(clientKey, now = Date.now()) {
  memory.set(clientKey, [...recentMemoryFailures(clientKey, now), now]);
  await logAdminAuthEvent(FAILED, clientKey, 'Rejected admin sign-in attempt');
  return getLoginThrottle(clientKey, now);
}

export async function recordLoginSuccess(clientKey) {
  memory.delete(clientKey);
  await logAdminAuthEvent(SUCCEEDED, clientKey, 'Admin signed in');
}

/*
 * Simple per-client cap for the password reset endpoints: at most `max` calls
 * per window. Memory only, which is enough here because a reset additionally
 * needs a 256-bit token and reset emails have their own database cooldown.
 */
const buckets = (globalThis.__adminAuthBuckets ??= new Map());

export function takeAttempt(bucket, clientKey, max, windowMs, now = Date.now()) {
  const key = `${bucket}:${clientKey}`;
  const recent = (buckets.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= max) {
    buckets.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000)) };
  }
  buckets.set(key, [...recent, now]);
  return { allowed: true, retryAfterSeconds: 0 };
}
