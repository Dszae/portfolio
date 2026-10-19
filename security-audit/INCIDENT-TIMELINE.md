# Security & Incident Reconstruction Timeline

**Target System:** Dipesh Sapkota Portfolio (`dipeshsapkota7.com.np`)  
**Repository:** `next-portfolio` (`https://github.com/Dszae/portfolio.git`)  
**Investigation Period:** October 12, 2026 – October 20, 2026  
**Auditor Role:** Incident Response Investigator & Code Forensic Specialist  
**Status:** Complete (Evidence Preserved)

---

## 1. Executive Summary: Incident & Security Chronology

A forensic investigation of the Git commit history and application changes was conducted to reconstruct how security-sensitive components, credentials, database grants, and API routes were introduced into the repository.

Key Timeline Findings:
1. **October 19, 2026 (Commit `3899488`):** Introduction of the administrative subsystem (`lib/adminAuth.js`). Hardcoded fallback values for `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` were committed.
2. **October 19, 2026 (Commit `c057d35`):** Introduction of `GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;` in `scripts/supabase-schema.sql`.
3. **October 19, 2026 (Commit `6a82397`):** Introduction of the AI Agent and streaming chat route (`/api/chat`). An in-memory IP rate limiter was implemented.
4. **October 20, 2026 (Commit `b4582c5` & `63ae41e`):** Admin dashboard enhancements, WebP compression pipeline, and system health metrics.

---

## 2. Chronological Event Reconstruction

| Timestamp (UTC/Local) | Commit Hash | Author | Event Description & Security Relevance | Severity Impact |
| :--- | :--- | :--- | :--- | :--- |
| **2026-10-12 to 2026-10-17** | `0d7d509` .. `4191b78` | `dsz` | Static portfolio and SEO development. Pre-rendered static pages; no administrative backend existed. | Baseline Clean |
| **2026-10-19 10:14** | `e0baa23` | `dsz` | Sitelinks exploration hub and `llms.txt` generation. | Informational |
| **2026-10-19 12:45** | `3899488` | `dsz` | **Introduction of Admin CMS & Fallback Secrets**: Created `lib/adminAuth.js` with `'DipeshAdmin2026!'` and static HMAC secret. Created `/admin` route and initial `/api/admin/*` endpoints. | **CRITICAL (SEC-01, SEC-04)** |
| **2026-10-19 13:10** | `22fbcbc` | `dsz` | Transitioned admin panel references to private env vars, but hardcoded fallback literals in `lib/adminAuth.js` remained active. | High (Mitigation Incomplete) |
| **2026-10-19 13:40** | `4161159` | `dsz` | Extended admin suite: added routes for `skills`, `messages`, `testimonials`, `services`, `backup`. | Medium |
| **2026-10-19 14:15** | `c057d35` | `dsz` | **Overly Permissive Postgres Grants**: Appended `GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;` to `scripts/supabase-schema.sql`. | **HIGH (SEC-02)** |
| **2026-10-19 14:50** | `d66b906` | `dsz` | CRUD modal integration across all admin panels. | Informational |
| **2026-10-19 15:40** | `6a82397` | `dsz` | **AI Assistant Engine Deployment**: Created `/api/chat` with SSE streaming, OpenAI tool orchestrator, and client IP rate limiter. | Informational (Safe Design) |
| **2026-10-19 16:20** | `c3e410e` .. `c8afc70` | `dsz` | Added Google Gemini Flash and Groq provider integrations with resilient multi-model failover. | Informational |
| **2026-10-19 17:30** | `dd78149` .. `fb14775` | `dsz` | UI enhancements: Light mode default, mobile navbar styling, zero-delay announcement rendering. | Informational |
| **2026-10-20 00:05** | `b4582c5` | `dsz` | Added client-side canvas-based WebP image conversion and compression pipeline for gallery and certificate uploads. | Informational |
| **2026-10-20 00:25** | `63ae41e` | `dsz` | **Executive Command Center**: Added metrics overview, system telemetry endpoint, global database search, and audience subscriber management. | Informational |
| **2026-10-20 00:35** | Current | Auditor | **Full-Stack Security Audit Initiated**: Read-only static code analysis, vulnerability mapping, and evidence preservation. | Audit In Progress |

---

## 3. Evidence Preservation & Integrity Checks

### 3.1 Git Working Tree & Remote Verification
- **Current Branch:** `main`
- **Head Commit:** `63ae41e17d91ec1b702ec8c983a9926ee4347781`
- **Remote Origin:** `https://github.com/Dszae/portfolio.git`
- **Local Git Status:** Working tree clean (audit reports placed in non-destructive `security-audit/` directory).

### 3.2 Verification of Secrets in Commits
- Git commit objects were scanned for patterns matching live OpenAI keys (`sk-[a-zA-Z0-9]{32,}`), Google AI keys (`AIza[0-9A-Za-z-_]{35}`), Supabase JWTs (`eyJh...`), and private SSH/RSA keys.
- **Result:** No live production LLM API keys or Supabase service-role JWTs were found in Git history. Live keys have resided strictly within untracked `.env.local`.
- **Exception:** The static HMAC secret string and default password were committed in `3899488` and remain retrievable from Git history.

---

## 4. Assessment of Active Compromise

Based on the forensic review of source code, configuration files, and API route behaviors:
- **Unauthorized Code Execution / Backdoors:** None found. No malicious dependencies, obtrusive obfuscated scripts, or anomalous outbound webhooks were discovered.
- **Ransomware / Data Destruction:** Database schemas and public routes remain intact.
- **Potential Exposure Surface:** The primary risk window began on **October 19, 2026 at 12:45 UTC** when commit `3899488` published the fallback admin credentials. Any party with access to the public GitHub repository could have logged in to any deployment that lacked explicit environment variable overrides.

---

## 5. Recommended Containment Steps

1. **Purge Historical Secrets from Git (Optional/Recommended):**
   - Use `git-filter-repo` or BFG Repo-Cleaner to permanently scrub the string literal from commit `3899488` if the repository is public.
2. **Immediate Rotation of Live Credentials:**
   - Update `ADMIN_PASSWORD` in the Vercel Production Environment Settings.
   - Generate a new 64-character random hex string for `ADMIN_SESSION_SECRET` in Vercel to immediately invalidate any previously generated tokens.

