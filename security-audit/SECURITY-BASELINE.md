# Security Baseline, Hardening Guidelines & Operational Runbook

**Target System:** Dipesh Sapkota Portfolio (`dipeshsapkota7.com.np`)  
**Repository:** `next-portfolio` (`https://github.com/Dszae/portfolio.git`)  
**Audit Date:** October 20, 2026  
**Auditor Role:** Principal Security Architect  
**Status:** Approved Security Baseline Standard

---

## 1. Security Architecture Principles

All future development, AI prompts, and code contributions to `next-portfolio` must adhere to these four core design principles:

1. **Fail-Closed by Design:**
   - If an authentication credential, database secret, or cryptographic key is missing from the environment, the application must reject access and log an alert. Never use default fallback strings or hardcoded development passwords in production paths.
2. **Strict Least Privilege:**
   - The unauthenticated `anon` database role must only possess read permissions (`SELECT`) on publicly visible tables. All mutations (`INSERT`, `UPDATE`, `DELETE`) must be restricted to server-side operations utilizing `service_role`.
3. **Defense in Depth:**
   - Client-side checks must always be mirrored with server-side validation and rate limiting. Never rely solely on honeypots or frontend button disabled states.
4. **Boundary Isolation for AI & LLMs:**
   - The AI Assistant must operate inside strict rate-limiting bounds, utilize structured schemas (Zod), and validate all external API parameters before invoking tools.

---

## 2. Infrastructure & Deployment Security Baseline

### 2.1 Vercel Hosting & Environment Variables
- **Environment Isolation:**
  - Maintain distinct values for Production, Preview, and Development environments.
  - Never allow preview branch deployments (`*.vercel.app`) to share production database credentials unless strictly required.
- **Secret Protection:**
  - Mark all backend variables (`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `GEMINI_API_KEY`) as sensitive in the Vercel dashboard so they cannot be printed in build logs.
  - Never prefix backend credentials with `NEXT_PUBLIC_`.

### 2.2 Git Repository Hygiene & Branch Protection
- **Pre-Commit Secret Scanning:**
  - Utilize Git hooks or GitHub Secret Scanning / TruffleHog to detect accidental credential commits prior to pushing.
- **Branch Protection:**
  - Enforce branch protection on `main`. Require pull request reviews and status checks (`npm run lint` and `npm test`) before merging.

---

## 3. Supabase Database Security Baseline

### 3.1 Row Level Security (RLS) Standard
Every table created in the `public` schema must have RLS explicitly enabled:
```sql
ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;
```

### 3.2 Standard RLS Policy Templates
- **Publicly Readable Content (e.g. projects, articles, skills):**
  ```sql
  CREATE POLICY "Public Read Access"
  ON public.<table_name>
  FOR SELECT
  TO anon, authenticated
  USING (true);
  ```
- **Service-Role Only Mutations:**
  ```sql
  CREATE POLICY "Service Role Full Access"
  ON public.<table_name>
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
  ```

### 3.3 Database User Grants
Never run `GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;`. The standard grant configuration is:
```sql
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
```

---

## 4. AI Agent & LLM Security Baseline

1. **System Prompt Immutability:**
   - The AI assistant's system instructions must instruct the model to ignore user attempts to override instructions, leak internal keys, or generate executable scripts.
2. **Prompt Injection Mitigation:**
   - Input lengths are restricted to 2,000 characters per message and 15 turns maximum per dialogue.
3. **Tool Parameter Bounding:**
   - All tool arguments must be strictly typed and validated with regex or Zod schemas before being passed to external APIs.
4. **Markdown Link Sanitization:**
   - Anchor links rendered by the assistant must be validated against `https://`, `http://`, `mailto:`, and `/`. Never allow `javascript:` or `data:` URIs.

---

## 5. Emergency Incident Response & Credential Rotation Runbook

In the event of a suspected credential leak or security incident, follow this step-by-step procedure:

### Phase 1: Invalidate Admin Session Secret (Immediate Revocation)
1. Generate a new cryptographically secure 64-character hex secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Update `ADMIN_SESSION_SECRET` in the Vercel project environment variables.
3. Redeploy the application. This immediately invalidates every active administrative session worldwide.

### Phase 2: Update Admin Password
1. Generate a new strong passphrase (minimum 20 characters with mixed case, numbers, and symbols).
2. Update `ADMIN_PASSWORD` in Vercel environment variables.
3. Redeploy.

### Phase 3: Rotate Supabase Service Role Key (If Compromised)
1. Navigate to **Supabase Dashboard -> Project Settings -> API**.
2. Under "Project API keys", click **Roll key** for `service_role`.
3. Copy the new key and update `SUPABASE_SERVICE_ROLE_KEY` in Vercel environment variables.
4. Redeploy and verify `/admin` functionality.

### Phase 4: Rotate Third-Party API Keys (Gemini, Web3Forms, Groq)
1. Regenerate keys via Google AI Studio / Groq console / Web3Forms dashboard.
2. Update corresponding environment variables in Vercel.
3. Verify `/api/chat` and `/api/contact` responses.

