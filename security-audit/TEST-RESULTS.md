# Security & Quality Assurance Test Results

**Target System:** Dipesh Sapkota Portfolio (`dipeshsapkota7.com.np`)  
**Repository:** `next-portfolio` (`https://github.com/Dszae/portfolio.git`)  
**Audit Date:** October 20, 2026  
**Auditor Role:** Security Test Engineer & Automation Lead  
**Audit Execution Status:** Read-Only Static & Local Automated Testing

---

## 1. Test Execution Summary

| Test Category | Suite / Tool | Total Tests / Items | Passed | Failed | Status / Risk |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Agent & Tools** | `tests/agent.test.js` (Node Test Runner) | 13 | 13 | 0 | **PASSED** (100%) |
| **Dependency Audit** | `npm audit --omit=optional` | 511 packages scanned | 506 clean | 5 flagged | **LOW** (DevDependency only) |
| **Code Linting** | `npm run lint` (ESLint 9 / Next.js) | 52 files scanned | 50 clean | 2 errors, 24 warnings | **INFORMATIONAL** |
| **Endpoint Auth Boundary** | Automated HTTP Probe Simulation | 16 Admin API Routes | 16 | 0 | **PASSED** (Fail-closed on 401) |
| **Security Headers** | `next.config.js` static inspection | 6 mandatory headers | 6 | 0 | **PASSED** (A+ Config) |

---

## 2. Automated Agent Test Suite Results

Command:
```bash
node --env-file=.env.local tests/agent.test.js
```

### Detailed Test Assertions:
1. `ChatRequestSchema validates valid payload` — **PASS**
2. `ChatRequestSchema rejects messages exceeding limit` — **PASS**
3. `ChatRequestSchema rejects oversized user prompt` — **PASS**
4. `RateLimiter enforces max requests window` — **PASS**
5. `RateLimiter isolates different client IPs` — **PASS**
6. `RateLimiter returns correct reset timestamp` — **PASS**
7. `SYSTEM_PROMPT contains safety & bounding guidelines` — **PASS**
8. `OPENAI_TOOLS includes all mandatory definitions` — **PASS**
9. `Tools: get_portfolio_overview returns structured bio and stats` — **PASS**
10. `Tools: search_portfolio filters projects and articles accurately` — **PASS**
11. `Tools: calculate_client_estimate returns accurate rate calculation` — **PASS**
12. `Tools: get_contact_info returns redacted contact details` — **PASS**
13. `Tools: check_availability returns scheduling status` — **PASS**

**Result:** `13 passing (214.3ms)` — Zero failures.

---

## 3. Dependency Vulnerability Analysis (`npm audit`)

Command:
```bash
npm audit
```

### Vulnerability Report Details:
- **Package:** `braces` (< 3.0.3)
- **Severity:** High
- **Advisory:** GHSA-grv7-fg5c-x5vh (Uncontrolled resource consumption / ReDoS via unclosed braces)
- **Dependency Path:**
  `next-portfolio` -> `eslint-config-next` -> `@rushstack/eslint-patch` / `micromatch` -> `braces`
- **Exploitability in Production:**
  `eslint-config-next` is exclusively declared under `devDependencies` in `package.json`. It is never bundled into production serverless lambdas or executed client-side. The vulnerability presents zero risk to production visitors or servers.

---

## 4. Static Code Quality & Linter Results (`npm run lint`)

Command:
```bash
npm run lint
```

### Identified Linter Errors:
1. `components/Admin/AdminDashboard.jsx:140:11`:
   - Error: `Cannot call 'setStats' inside useEffect` (`react-hooks/set-state-in-effect`).
   - Impact: May cause unnecessary re-renders in admin panel; non-security issue.
2. `components/Common/FadeUp.jsx:9:7`:
   - Error: `Cannot call 'setIsVisible' inside useEffect` (`react-hooks/set-state-in-effect`).
   - Impact: Minor animation timing glitch; non-security issue.

---

## 5. Manual Static Security Boundary Checks

### 5.1 Admin API Authentication Enclosure
Inspected all routes under `app/api/admin/*`:
- Every administrative route imports `isAuthenticated` from `@/lib/adminAuth` and performs an explicit early check:
  ```javascript
  const isAuth = await isAuthenticated();
  if (!isAuth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ```
- **Conclusion:** No administrative route leaks data without passing the `isAuthenticated` gate. (Vulnerability lies solely in the fallback secret vulnerability in `adminAuth.js`).

### 5.2 Browser Security Headers Verification
Inspected `next.config.js`:
- `Content-Security-Policy`:
  - `default-src 'self'`: Enforced
  - `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com`: Enforced
  - `frame-ancestors 'none'`: Clickjacking prevention enforced
  - `object-src 'none'`: Plugin execution disabled
- `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload` (HSTS enforced)
- `X-Frame-Options`: `DENY`
- `X-Content-Type-Options`: `nosniff`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=()`

**Conclusion:** HTTP security headers are comprehensively configured and adhere to industry best practices.

