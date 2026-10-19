# Actionable Security Remediation & Hardening Plan

**Target System:** Dipesh Sapkota Portfolio (`dipeshsapkota7.com.np`)  
**Repository:** `next-portfolio` (`https://github.com/Dszae/portfolio.git`)  
**Audit Date:** October 20, 2026  
**Auditor Role:** Senior Application Security Architect  
**Plan Status:** Proposed / Awaiting User Approval to Implement

---

## 1. Remediation Roadmap Overview

| Priority | Finding ID | Action Item | Target File(s) | Estimated Effort | Risk of Regression |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **P1** | **SEC-01** | Eliminate hardcoded fallback credentials; fail-closed authentication | `lib/adminAuth.js` | 15 mins | Very Low |
| **P1** | **SEC-04** | Enforce 7-day server-side token timestamp expiration | `lib/adminAuth.js` | 15 mins | Very Low |
| **P2** | **SEC-03** | Implement brute-force rate limiter & constant-time password check | `app/api/admin/auth/route.js` | 20 mins | Very Low |
| **P2** | **SEC-05** | Add rate limiting to contact form message ingestion | `app/api/contact/route.js` | 15 mins | Very Low |
| **P2** | **SEC-06** | Sanitize markdown URL protocols against `javascript:` injection | `components/AiAssistant/MarkdownRenderer.jsx` | 10 mins | Very Low |
| **P3** | **SEC-02** | Revoke `ALL` from `anon` in Supabase; restrict to `SELECT` | `scripts/supabase-schema.sql` | 10 mins | Low |
| **P3** | **SEC-07** | Remove hardcoded fallback Web3Forms access key | `app/api/contact/route.js`, `app/contact/page.jsx` | 10 mins | Very Low |
| **P4** | **SEC-08** | Add regex validation for GitHub repo tool parameters | `lib/agent/tools.js` | 10 mins | Very Low |
| **P4** | **SEC-09** | Resolve ReDoS devDependency advisory in package lockfile | `package.json`, `package-lock.json` | 15 mins | Very Low |

---

## 2. Step-by-Step Technical Implementation Details

### Step 1: Patch `lib/adminAuth.js` (SEC-01 & SEC-04)

#### Changes to Apply:
1. Remove `'DipeshAdmin2026!'` and the static HMAC secret fallback.
2. If `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET` is unset, fail closed (return `false` for authentication and throw a security warning in server logs).
3. Implement `crypto.timingSafeEqual` for password verification to eliminate timing attacks.
4. In `verifyToken(token)`, extract the timestamp integer from `admin-${timestamp}` and verify that `Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000`.

#### Code Blueprint:
```javascript
import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function authenticate(password) {
  if (!ADMIN_PASSWORD || !password || typeof password !== 'string') {
    return false;
  }
  
  const expectedBuffer = Buffer.from(ADMIN_PASSWORD, 'utf8');
  const inputBuffer = Buffer.from(password, 'utf8');
  
  if (expectedBuffer.length !== inputBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(expectedBuffer, inputBuffer);
}

export function generateToken() {
  if (!SESSION_SECRET) throw new Error('ADMIN_SESSION_SECRET is not configured on the server.');
  const timestamp = Date.now();
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(`admin-${timestamp}`).digest('hex');
  return `admin-${timestamp}.${signature}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string' || !SESSION_SECRET) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;

  // Verify HMAC signature
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  if (sig !== expectedSig) return false;

  // Enforce server-side timestamp expiration (7 days)
  const timestamp = parseInt(payload.replace('admin-', ''), 10);
  if (isNaN(timestamp)) return false;
  const age = Date.now() - timestamp;
  if (age < 0 || age > SEVEN_DAYS_MS) {
    return false; // Token expired or timestamp in the future
  }

  return true;
}
```

---

### Step 2: Rate Limit Admin Login & Contact Forms (SEC-03 & SEC-05)

#### Changes to Apply:
1. Create a lightweight, general-purpose in-memory rate limiter or extend `lib/agent/rateLimiter.js`.
2. In `app/api/admin/auth/route.js`:
   - Limit attempts to 5 per IP address per 15 minutes.
   - Return HTTP 429 Too Many Requests if the limit is exceeded.
3. In `app/api/contact/route.js`:
   - Limit contact submissions to 5 per IP address per 10 minutes.

---

### Step 3: Sanitize Markdown Link Protocols (SEC-06)

#### Changes to Apply:
In `components/AiAssistant/MarkdownRenderer.jsx`, create a helper `isSafeUrl` to filter out `javascript:`, `data:`, and `vbscript:` URI schemes before rendering the anchor tag.

#### Code Blueprint:
```javascript
const isSafeUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  return /^(https?:\/\/|\/|mailto:)/i.test(trimmed);
};

// In components object:
a: ({ href, children }) => {
  const safeHref = isSafeUrl(href) ? href : '#';
  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-0.5"
    >
      {children}
    </a>
  );
}
```

---

### Step 4: Database Least Privilege Migration (SEC-02)

#### Changes to Apply:
1. Update `scripts/supabase-schema.sql` to replace:
   ```sql
   GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
   ```
   with:
   ```sql
   GRANT USAGE ON SCHEMA public TO anon, authenticated;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
   GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
   ```
2. Provide the SQL script for execution in the Supabase SQL editor:
   ```sql
   REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
   REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon;
   REVOKE ALL ON ALL ROUTINES IN SCHEMA public FROM anon;

   GRANT USAGE ON SCHEMA public TO anon, authenticated;
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
   GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
   GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
   GRANT ALL ON ALL ROUTINES IN SCHEMA public TO service_role;
   ```

---

### Step 5: Web3Forms & GitHub Tool Hardening (SEC-07 & SEC-08)

#### Changes to Apply:
1. In `app/api/contact/route.js`, remove hardcoded fallback UUID. Require `process.env.WEB3FORMS_ACCESS_KEY` or `process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
2. In `lib/agent/tools.js`, validate `owner` and `repo` parameters with `/^[a-zA-Z0-9._-]+$/` before calling GitHub API.

---

## 3. Rollback Strategy & Verification Testing

- **Rollback Plan:**
  - Code changes can be reverted instantly via standard Git commands (`git revert` or checkout).
  - Database permission changes can be restored via SQL if any public read operations fail.
- **Post-Remediation Verification:**
  1. Test admin login with valid credentials (verify 200 OK + cookie set).
  2. Test admin login with incorrect password (verify 401 Unauthorized).
  3. Test 6 consecutive invalid logins from the same IP (verify 429 Too Many Requests).
  4. Test token forgery with legacy secret (verify rejected).
  5. Test expired token replay (verify rejected).
  6. Run `npm test` and `node --env-file=.env.local tests/agent.test.js` to ensure 100% test pass rate.

