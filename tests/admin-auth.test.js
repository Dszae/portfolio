/**
 * Checks for the admin sign-in building blocks: password hashing and attempt limiting.
 * Run with: node tests/admin-auth.test.js
 */
import assert from 'node:assert/strict';
import {
  hashPassword,
  verifyPasswordHash,
  parsePasswordHash,
  timingSafeEqualText,
  validateNewPassword,
  createResetToken,
  isResetTokenFormat,
  sha256Hex,
} from '../lib/adminPassword.js';

// Keep the limiter on its in-memory store so the test never touches the database.
delete process.env.SUPABASE_URL;
delete process.env.SUPABASE_SERVICE_ROLE_KEY;
const { getLoginThrottle, recordLoginFailure, recordLoginSuccess, takeAttempt, MAX_FAILED_ATTEMPTS, WINDOW_MS } =
  await import('../lib/loginRateLimit.js');

let passed = 0;
let total = 0;

async function test(name, fn) {
  total += 1;
  try {
    await fn();
    console.log(`  ok   ${name}`);
    passed += 1;
  } catch (err) {
    console.error(`  FAIL ${name}: ${err.message}`);
  }
}

console.log('Admin sign-in checks\n');

await test('a hash verifies its own password and rejects others', async () => {
  const stored = await hashPassword('correct horse battery staple');
  assert.match(stored, /^pbkdf2:100000:[0-9a-f]{32}:[0-9a-f]{64}$/);
  assert.equal(await verifyPasswordHash('correct horse battery staple', stored), true);
  assert.equal(await verifyPasswordHash('correct horse battery stapl', stored), false);
  assert.equal(await verifyPasswordHash('', stored), false);
});

await test('the same password hashes differently each time', async () => {
  assert.notEqual(await hashPassword('same'), await hashPassword('same'));
});

await test('malformed or weakened hashes are rejected', async () => {
  assert.equal(parsePasswordHash(''), null);
  assert.equal(parsePasswordHash('plain-text-password'), null);
  assert.equal(parsePasswordHash('pbkdf2:0:00:00'), null);
  assert.equal(parsePasswordHash(`pbkdf2:999999999:${'ab'.repeat(16)}:${'cd'.repeat(32)}`), null);
  assert.equal(await verifyPasswordHash('anything', 'pbkdf2:100000:zz:zz'), false);
});

await test('text comparison handles length differences', () => {
  assert.equal(timingSafeEqualText('dszae', 'dszae'), true);
  assert.equal(timingSafeEqualText('dszae', 'dszae '), false);
  assert.equal(timingSafeEqualText('', 'dszae'), false);
});

await test('a client is locked out after the allowed failures', async () => {
  const client = 'test-client-lockout';
  const start = 1_000_000;
  for (let attempt = 1; attempt < MAX_FAILED_ATTEMPTS; attempt += 1) {
    const state = await recordLoginFailure(client, start + attempt);
    assert.equal(state.blocked, false);
    assert.equal(state.remaining, MAX_FAILED_ATTEMPTS - attempt);
  }
  const locked = await recordLoginFailure(client, start + MAX_FAILED_ATTEMPTS);
  assert.equal(locked.blocked, true);
  assert.ok(locked.retryAfterSeconds > 0 && locked.retryAfterSeconds <= WINDOW_MS / 1000);
});

await test('the lock lifts when the window has passed', async () => {
  const client = 'test-client-window';
  const start = 2_000_000;
  for (let attempt = 0; attempt < MAX_FAILED_ATTEMPTS; attempt += 1) {
    await recordLoginFailure(client, start + attempt);
  }
  assert.equal((await getLoginThrottle(client, start + 10)).blocked, true);
  assert.equal((await getLoginThrottle(client, start + WINDOW_MS + 10)).blocked, false);
});

await test('a successful sign-in clears earlier failures, and clients are counted separately', async () => {
  const start = 3_000_000;
  await recordLoginFailure('test-client-a', start);
  await recordLoginFailure('test-client-a', start + 1);
  assert.equal((await getLoginThrottle('test-client-b', start + 2)).remaining, MAX_FAILED_ATTEMPTS);
  await recordLoginSuccess('test-client-a');
  assert.equal((await getLoginThrottle('test-client-a', start + 3)).remaining, MAX_FAILED_ATTEMPTS);
});

await test('new passwords must be long and varied enough', () => {
  assert.notEqual(validateNewPassword('short'), '');
  assert.notEqual(validateNewPassword('aaaaaaaaaaaaaa'), '');
  assert.notEqual(validateNewPassword('x'.repeat(201)), '');
  assert.equal(validateNewPassword('a-Sound-Passphrase-7', 'dszae'), '');
});

await test('reset tokens are random, well formed and stored only as a hash', async () => {
  const first = await createResetToken();
  const second = await createResetToken();
  assert.equal(isResetTokenFormat(first.token), true);
  assert.notEqual(first.token, second.token);
  assert.equal(first.tokenHash, await sha256Hex(first.token));
  assert.notEqual(first.tokenHash, first.token);
  assert.equal(isResetTokenFormat('not-a-token'), false);
  assert.equal(isResetTokenFormat(`${first.token}0`), false);
});

await test('reset endpoints cap calls per client and per bucket', () => {
  const start = 4_000_000;
  for (let call = 0; call < 3; call += 1) {
    assert.equal(takeAttempt('test-recover', 'client-x', 3, 1000, start + call).allowed, true);
  }
  const limited = takeAttempt('test-recover', 'client-x', 3, 1000, start + 5);
  assert.equal(limited.allowed, false);
  assert.ok(limited.retryAfterSeconds >= 1);
  assert.equal(takeAttempt('test-recover', 'client-y', 3, 1000, start + 5).allowed, true);
  assert.equal(takeAttempt('test-reset', 'client-x', 3, 1000, start + 5).allowed, true);
  assert.equal(takeAttempt('test-recover', 'client-x', 3, 1000, start + 1500).allowed, true);
});

console.log(`\n${passed}/${total} passed`);
process.exit(passed === total ? 0 : 1);
