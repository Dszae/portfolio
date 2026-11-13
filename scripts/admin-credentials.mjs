/*
 * Generates the environment values for the admin account.
 *
 *   npm run admin:credentials
 *
 * Asks for a username and password, then prints ADMIN_USERNAME and
 * ADMIN_PASSWORD_HASH. Put them in .env.local, then deploy: the deploy bundles
 * .env.local into the Worker. The password itself is never written anywhere.
 */
import { createInterface } from 'node:readline/promises';
import { randomBytes } from 'node:crypto';
import { stdin, stdout, argv, exit } from 'node:process';
import { hashPassword } from '../lib/adminPassword.js';

const MIN_LENGTH = 10;

async function ask(question) {
  const prompt = createInterface({ input: stdin, output: stdout });
  try {
    return (await prompt.question(question)).trim();
  } finally {
    prompt.close();
  }
}

const username = (await ask('Username [dszae]: ')) || 'dszae';
const password = await ask('New password: ');

if (password.length < MIN_LENGTH) {
  console.error(`Password must be at least ${MIN_LENGTH} characters.`);
  exit(1);
}

console.log('\nPut these in .env.local, then run npm run deploy:cloudflare:\n');
console.log(`ADMIN_USERNAME=${username.toLowerCase()}`);
console.log(`ADMIN_PASSWORD_HASH=${await hashPassword(password)}`);

if (argv.includes('--with-session-secret')) {
  console.log(`ADMIN_SESSION_SECRET=${randomBytes(32).toString('hex')}`);
}

console.log('\nRemove ADMIN_PASSWORD if it is still set. Changing the password signs out every session.');
