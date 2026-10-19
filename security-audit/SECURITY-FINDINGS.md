# Comprehensive Security Findings & Technical Analysis

**Target System:** Dipesh Sapkota Portfolio (`dipeshsapkota7.com.np`)  
**Repository:** `next-portfolio` (`https://github.com/Dszae/portfolio.git`)  
**Audit Date:** October 20, 2026  
**Auditor Role:** Senior Application Security Engineer & Code Auditor  
**Audit Status:** Complete (Non-Destructive Static & Runtime Analysis)

---

## Findings Summary Matrix

| ID | Title | Severity | CVSS v3.1 | CWE | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Hardcoded Fallback Admin Password & Static HMAC Secret | **CRITICAL** | **9.8** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`) | CWE-798 | Unpatched |
| **SEC-02** | Excessive Database Privilege Grants to Public `anon` Role | **HIGH** | **7.5** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N`) | CWE-276 | Unpatched |
| **SEC-03** | Lack of Rate Limiting & Lockout on Admin Authentication | **HIGH** | **7.5** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`) | CWE-307 | Unpatched |
| **SEC-04** | Missing Server-Side Expiration Check on Admin Session Tokens | **HIGH** | **7.4** (`CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:N`) | CWE-613 | Unpatched |
| **SEC-05** | Unrestricted Contact Message Ingestion Endpoint (Spam/DoS) | **MEDIUM** | **5.3** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N`) | CWE-770 | Unpatched |
| **SEC-06** | Potential Protocol-Based XSS via `javascript:` URIs in Markdown | **MEDIUM** | **6.1** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N`) | CWE-79 | Unpatched |
| **SEC-07** | Hardcoded Third-Party Form Access Key in Source Code | **MEDIUM** | **4.3** (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N`) | CWE-522 | Unpatched |
| **SEC-08** | Missing Parameter Sanitization on GitHub Agent Tool | **LOW** | **3.7** (`CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N`) | CWE-20 | Unpatched |
| **SEC-09** | ReDoS in Transitive Development Dependency (`braces`) | **LOW** | **3.1** (`CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:N/I:N/A:L`) | CWE-1333| Unpatched |

---

## Detailed Technical Findings

---

### SEC-01: Hardcoded Fallback Admin Password & Static HMAC Secret

- **Severity:** **CRITICAL** (CVSS:3.1: 9.8)
- **CWE:** CWE-798: Use of Hard-coded Credentials
- **File Location:** `lib/adminAuth.js:3-4`
- **Introduced in Commit:** `3899488` ("feat: complete advanced professional admin dashboard...")

#### Vulnerability Description & Root Cause
In `lib/adminAuth.js`, the authentication system falls back to hardcoded string literals if the environment variables `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` are not set:

```javascript
// lib/adminAuth.js:3-4
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'DipeshAdmin2026!';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'e9a2b847c13d8f50b2f6e917d05cae1837a4c9b2e1f582736184920475184920';
```

Because the Git repository is publicly mirrored or accessible on GitHub (`https://github.com/Dszae/portfolio.git`), any attacker can read this commit history.

#### Exploit Scenario & Threat Model
1. If the live production environment on Vercel is deployed without explicitly providing `ADMIN_PASSWORD` in the environment settings, or if an attacker targets preview deployments (`*.vercel.app`) that omit secrets, the fallback password `'DipeshAdmin2026!'` will be accepted.
2. Even if `ADMIN_PASSWORD` is set on production, if `ADMIN_SESSION_SECRET` is left unset, an attacker can locally compute a valid HMAC-SHA256 signature using the static key:
   ```javascript
   crypto.createHmac('sha256', 'e9a2b847c13d8f50b2f6e917d05cae1837a4c9b2e1f582736184920475184920')
         .update('admin-' + Date.now()).digest('hex');
   ```
   Injecting this token into the `admin_token` cookie grants full administrative control without ever submitting a password.

#### Impact
Full compromise of the portfolio backend. The attacker can modify, delete, or deface projects, skills, certificates, and articles, or exfiltrate all visitor contact inquiries via `/api/admin/backup`.

#### Remediation
Fail closed: If the required environment variables are missing, throw an error or reject all authentication requests immediately. Never provide a default password or session secret in source code.

```javascript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

if (!ADMIN_PASSWORD || !SESSION_SECRET) {
  console.error('[SECURITY ERROR] ADMIN_PASSWORD or ADMIN_SESSION_SECRET is not configured.');
}

export function authenticate(password) {
  if (!ADMIN_PASSWORD) return false;
  // Timing safe comparison...
}
```

---

### SEC-02: Excessive Database Privilege Grants to Public `anon` Role

- **Severity:** **HIGH** (CVSS:3.1: 7.5)
- **CWE:** CWE-276: Incorrect Default Permissions
- **File Location:** `scripts/supabase-schema.sql:165-170`

#### Vulnerability Description & Root Cause
In `scripts/supabase-schema.sql`, the setup script executes:
```sql
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon;
```
Granting `ALL` privileges gives the unauthenticated `anon` role permissions to `INSERT`, `UPDATE`, `DELETE`, and `TRUNCATE` tables.

#### Threat Model & Context
In PostgreSQL / Supabase, Row Level Security (RLS) restricts access even if table-level permissions exist. For the currently defined tables (`projects`, `articles`, `certificates`, etc.), RLS policies only allow `SELECT` to `anon`. 
**However**, this creates an extreme configuration drift vulnerability:
- If an administrator or future migration adds a new table and forgets to run `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`, the table is instantly completely readable and writable by anyone on the internet holding the public anon key.
- Furthermore, `GRANT ALL` on sequences allows unauthorized sequence manipulation.

#### Remediation
Follow the principle of least privilege. Grant only `SELECT` to `anon` and `authenticated`:
```sql
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
```

---

### SEC-03: Lack of Rate Limiting & Lockout on Admin Authentication

- **Severity:** **HIGH** (CVSS:3.1: 7.5)
- **CWE:** CWE-307: Improper Restriction of Excessive Authentication Attempts
- **File Location:** `app/api/admin/auth/route.js:14-25`

#### Vulnerability Description & Root Cause
The admin authentication endpoint `POST /api/admin/auth` performs direct password verification without tracking failed attempts:
```javascript
export async function POST(request) {
  try {
    const { password } = await request.json();
    if (!authenticate(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    // ...
```
There is no in-memory rate limiter, IP-based backoff, or temporary account lockout mechanism.

#### Threat Model
An attacker running automated password-guessing tools (e.g. Hydra, Burp Suite Intruder, or custom Python scripts) can issue tens of thousands of password requests per minute against `https://dipeshsapkota7.com.np/api/admin/auth` until the password is found.

#### Remediation
Implement an IP-based sliding window rate limiter (e.g. maximum 5 failed attempts per 15-minute window) and use constant-time string comparison (`crypto.timingSafeEqual`) to prevent timing side-channel analysis.

---

### SEC-04: Missing Server-Side Expiration Check on Admin Session Tokens

- **Severity:** **HIGH** (CVSS:3.1: 7.4)
- **CWE:** CWE-613: Insufficient Session Expiration
- **File Location:** `lib/adminAuth.js:20-36`

#### Vulnerability Description & Root Cause
The admin session token generation and verification routine is implemented as:
```javascript
export function generateToken() {
  const timestamp = Date.now();
  const signature = crypto.createHmac('sha256', SESSION_SECRET).update(`admin-${timestamp}`).digest('hex');
  return `admin-${timestamp}.${signature}`;
}

export function verifyToken(token) {
  if (!token || typeof token !== 'string') return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expectedSig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return sig === expectedSig;
}
```
Notice:
1. `payload` contains `admin-${timestamp}`.
2. `verifyToken` recalculates the HMAC on `payload` and compares `sig === expectedSig`.
3. **The timestamp is never parsed or compared against current time.**

#### Threat Model & Impact
Although the browser cookie is set with `maxAge: 7 * 24 * 3600`, cookie headers can be captured in HTTP proxies, developer consoles, server logs, or packet captures. Because the server never validates the token timestamp, **a captured token remains valid indefinitely**. There is no session revocation or server-side expiration mechanism.

#### Remediation
Extract and check the timestamp in `verifyToken`:
```javascript
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const timestamp = parseInt(payload.replace('admin-', ''), 10);
if (isNaN(timestamp) || Date.now() - timestamp > SEVEN_DAYS_MS || timestamp > Date.now() + 60000) {
  return false; // Token expired or timestamp in future
}
```

---

### SEC-05: Unrestricted Contact Message Ingestion Endpoint (Spam/DoS)

- **Severity:** **MEDIUM** (CVSS:3.1: 5.3)
- **CWE:** CWE-770: Allocation of Resources Without Limits or Throttling
- **File Location:** `app/api/contact/route.js:5-75`

#### Vulnerability Description & Root Cause
The endpoint `POST /api/contact` only checks a simple honeypot (`botcheck`). There is no IP rate limiting applied.

#### Threat Model & Impact
1. **Database Resource Exhaustion:** An automated script can submit millions of records into the Supabase `contact_messages` table, exhausting database storage limits.
2. **Third-Party API Flooding:** Each request triggers an outbound POST to `https://api.web3forms.com/submit`. An attacker can exhaust the free or paid tier quota of the Web3Forms account within minutes.

#### Remediation
Integrate the in-memory rate limiter into `/api/contact` allowing a maximum of 5 contact requests per IP per 10 minutes.

---

### SEC-06: Potential Protocol-Based XSS via `javascript:` URIs in Markdown

- **Severity:** **MEDIUM** (CVSS:3.1: 6.1)
- **CWE:** CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')
- **File Location:** `components/AiAssistant/MarkdownRenderer.jsx:142-148`

#### Vulnerability Description & Root Cause
In `MarkdownRenderer.jsx`, custom markdown links are rendered as:
```javascript
a: ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-0.5"
  >
    {children}
  </a>
)
```
If an LLM or prompt injection payload generates markdown containing:
`[Click here to view certificate](javascript:alert(document.cookie))`
React will render `<a href="javascript:alert(document.cookie)">`. When a user clicks this link, the JavaScript payload executes in the visitor's browser context.

#### Remediation
Sanitize the `href` attribute before rendering. Ensure the URL scheme begins with `https://`, `http://`, `mailto:`, or `/`. Reject `javascript:`, `vbscript:`, and `data:` schemes.

```javascript
const isSafeUrl = (url) => {
  if (!url) return false;
  return /^(https?:\/\/|\/|mailto:)/i.test(url.trim());
};

a: ({ href, children }) => {
  const safeHref = isSafeUrl(href) ? href : '#';
  return (
    <a href={safeHref} target="_blank" rel="noopener noreferrer" ...>
      {children}
    </a>
  );
}
```

---

### SEC-07: Hardcoded Third-Party Form Access Key in Source Code

- **Severity:** **MEDIUM** (CVSS:3.1: 4.3)
- **CWE:** CWE-522: Insufficiently Protected Credentials
- **File Location:** `app/api/contact/route.js:52` and `app/contact/page.jsx:21`

#### Vulnerability Description & Root Cause
The Web3Forms access key is hardcoded as a fallback in `app/api/contact/route.js:52`:
```javascript
const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'e6fd2e32-2b5c-4a3f-81d9-aa02f4dfcc76';
```
While Web3Forms public access keys are designed to be client-accessible, publishing the key in Git allows third parties to copy the key and send emails directly through the owner's Web3Forms quota without visiting the website.

#### Remediation
Store the access key exclusively in server-side environment variables (`WEB3FORMS_ACCESS_KEY`), remove the `NEXT_PUBLIC_` prefix, and remove the hardcoded fallback UUID from Git.

---

### SEC-08: Missing Parameter Sanitization on GitHub Agent Tool

- **Severity:** **LOW** (CVSS:3.1: 3.7)
- **CWE:** CWE-20: Improper Input Validation
- **File Location:** `lib/agent/tools.js:406`

#### Vulnerability Description & Root Cause
In `lib/agent/tools.js`, the GitHub repository query tool accepts `owner` and `repo` parameters and interpolates them directly into:
```javascript
`https://api.github.com/repos/${owner}/${repo}`
```
Although GitHub's API handles special characters cleanly, passing unvalidated strings could cause path traversal or unexpected request paths if an attacker crafts prompt injections manipulating tool parameters.

#### Remediation
Validate `owner` and `repo` against the regex `/^[a-zA-Z0-9._-]+$/` before initiating the fetch request.

---

### SEC-09: ReDoS in Transitive Development Dependency (`braces`)

- **Severity:** **LOW** (CVSS:3.1: 3.1)
- **CWE:** CWE-1333: Inefficient Regular Expression Complexity
- **File Location:** `package-lock.json` (`braces` via `micromatch` / `eslint-config-next`)

#### Vulnerability Description & Root Cause
Running `npm audit` flagged an uncontrolled resource consumption vulnerability in `braces` prior to version 3.0.3 when parsing unclosed braces.
Because this package is only executed locally during `npm run lint` and is not part of the production serverless bundle, the real-world risk to the production application is negligible.

#### Remediation
Update `eslint-config-next` or run `npm audit fix` during routine maintenance.

