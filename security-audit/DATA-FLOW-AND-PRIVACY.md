# Data Flow, Privacy, and Third-Party Integration Audit

**Target System:** Dipesh Sapkota Portfolio (`dipeshsapkota7.com.np`)  
**Repository:** `next-portfolio` (`https://github.com/Dszae/portfolio.git`)  
**Audit Date:** October 20, 2026  
**Auditor Role:** Senior Application Security & Privacy Reviewer  
**Status:** Complete (Read-Only Analysis)

---

## 1. Executive Summary: Data Governance & Privacy Posture

The application processes user-submitted contact data, chat inquiries, administrative credentials, portfolio media assets, and server analytics. 

Overall Data Security Evaluation:
- **Stateless Chat Ingestion:** Chat sessions are ephemeral and client-managed. No conversational transcripts or visitor IP logs are persisted in permanent database tables.
- **Direct PII Capture via Contact Form:** User contact submissions (Name, Email, Subject, Message) are stored persistently in Supabase (`contact_messages`) and duplicated to Web3Forms via an outbound REST API call for email forwarding.
- **Backup & Export Privacy Boundary:** The administrative backup endpoint (`/api/admin/backup`) exports full database dumps including all user contact inquiries (PII) in plaintext JSON format.
- **Third-Party Telemetry & APIs:** Integrated external providers include Supabase, Web3Forms, Google Gemini (Vertex/Generative Language), Groq, OpenAI, and GitHub Public API. No unauthorized analytics trackers, ad networks, or hidden telemetry beacons were detected.

---

## 2. Complete Data Flow Diagram

```mermaid
flowchart TD
    User["Public Visitor / User"]
    Admin["Site Administrator"]
    
    subgraph NextJS["Next.js Serverless Edge / Node Runtime (Vercel)"]
        ChatAPI["/api/chat (SSE Stream)"]
        ContactAPI["/api/contact"]
        AdminAuth["/api/admin/auth"]
        AdminCRUD["/api/admin/* (CRUD)"]
        AdminBackup["/api/admin/backup"]
        RateLimiter["In-Memory Rate Limiter (IP Cache)"]
    end

    subgraph SupabaseDB["Supabase Cloud (PostgreSQL & Storage)"]
        TableMessages[("contact_messages (PII)")]
        TablePortfolio[("projects, articles, certificates, etc.")]
        StorageBucket[("Storage: portfolio-media")]
    end

    subgraph ExternalThirdParties["Third-Party External Services"]
        Web3Forms["Web3Forms API (Email Notification)"]
        GeminiAPI["Google Gemini API (LLM)"]
        GroqAPI["Groq Cloud API (Fallback LLM)"]
        GitHubAPI["GitHub Public API (Repo Stats)"]
    end

    %% Visitor flows
    User -->|POST prompts (ephemeral)| ChatAPI
    User -->|POST name, email, message| ContactAPI
    ChatAPI -->|Rate limit check| RateLimiter
    ChatAPI -->|Prompt & Context| GeminiAPI
    ChatAPI -->|Fallback Prompt| GroqAPI
    ChatAPI -.->|Repo lookups| GitHubAPI
    ContactAPI -->|Persist message| TableMessages
    ContactAPI -->|Forward form payload| Web3Forms

    %% Admin flows
    Admin -->|POST password| AdminAuth
    AdminAuth -->|Set HttpOnly cookie: admin_token| Admin
    Admin -->|CRUD updates + Auth Cookie| AdminCRUD
    AdminCRUD -->|Read / Write| TablePortfolio
    AdminCRUD -->|Upload media| StorageBucket
    Admin -->|GET full JSON export| AdminBackup
    AdminBackup -->|Dump all tables including messages| Admin
```

---

## 3. Data Ingress & Egress Analysis

### 3.1 Visitor Contact Ingestion (`/api/contact`)
- **Ingress Data:**
  - `name`: string (1-100 characters)
  - `email`: string (RFC 5322 regex validation, max 150 characters)
  - `subject`: string (defaults to "Portfolio Inquiry")
  - `message`: string (1-5,000 characters)
  - `botcheck`: honeypot field
- **Storage Target:** Supabase PostgreSQL table `contact_messages`.
- **Egress Target:** `https://api.web3forms.com/submit`.
- **Transmission Security:** TLS 1.3 enforced over HTTPS.
- **Privacy Assessment:**
  - Direct duplication to third-party Web3Forms.
  - No client-side encryption before persistence.
  - Stored indefinitely in `contact_messages` until deleted manually by administrator in dashboard.

### 3.2 AI Assistant / Chat Engine (`/api/chat`)
- **Ingress Data:**
  - `messages`: array of `{ role: 'user' | 'assistant' | 'system', content: string }`.
  - Max messages capped at 15 items; each message string capped at 2,000 characters.
  - Client IP derived from `x-forwarded-for` or `x-real-ip`.
- **Internal Storage:**
  - None. In-memory sliding window cache retains client IP and timestamp for rate limiting (reset window: 60 minutes). No database logging.
- **Egress Data:**
  - Transmitted to Google Gemini API (`gemini-2.5-flash` or `gemini-3.5-flash-lite`) or Groq API.
  - Prompts incorporate system prompts, grounded resume/portfolio facts, and user query.
- **Privacy Assessment:**
  - Prompts are processed subject to Google Cloud / Groq terms of service for API consumers (API data is generally not used for model training under Google API terms, but data traverses external cloud infrastructure).

### 3.3 Admin Authentication & Session Management
- **Ingress Data:** Plaintext password submitted to `POST /api/admin/auth`.
- **Session Mechanism:**
  - Token signed via HMAC-SHA256 (`adminAuth.js`).
  - Stored in browser cookie: `admin_token`.
  - Cookie attributes: `httpOnly: true`, `sameSite: 'strict'`, `path: '/'`, `secure: process.env.NODE_ENV === 'production'`.
- **Egress:** None. Verification occurs entirely on the server.

### 3.4 Admin Data Export & Backup (`/api/admin/backup`)
- **Ingress:** Authenticated GET request from administrator.
- **Egress Data:**
  - Returns complete JSON payload containing: `projects`, `articles`, `skills`, `experiences`, `certificates`, `gallery`, `services`, `testimonials`, `settings`, and `messages`.
- **Privacy Risk:**
  - The backup payload contains sensitive customer/visitor inquiries (PII).
  - Anyone obtaining an active admin session or exploiting fallback HMAC credentials can trigger `/api/admin/backup` to download every contact message ever submitted.

---

## 4. Client-Side Storage & Cookies Inventory

| Storage Mechanism | Key / Identifier | Sensitivity | Purpose | Expiry / Scope |
| :--- | :--- | :--- | :--- | :--- |
| **HTTP Cookie** | `admin_token` | **High** | Authenticated session token for administrative portal | 7 days (`maxAge: 60 * 60 * 24 * 7`); HttpOnly; SameSite=Strict |
| **Local Storage** | `portfolio-theme` | Low | Stores user UI preference (`'light'` vs `'dark'`) | Persistent until cleared |
| **Local Storage** | `rolling-text-dismissed` | Low | Tracks if announcement banner was dismissed | Session / persistent |
| **Session Storage**| None | N/A | None used | N/A |
| **IndexedDB** | None | N/A | None used | N/A |

---

## 5. Third-Party Integrations & External Endpoints

| Provider | Purpose | Data Shared | Authentication / Key Type | Risk Evaluation |
| :--- | :--- | :--- | :--- | :--- |
| **Supabase (AWS/GCP)** | Primary Database & Asset Object Store | Portfolio items, contact inquiries, binary images | Service Role Key (Backend Serverless) & Anon Key (Client) | High impact if Service Role Key is leaked; RLS must be strict. |
| **Web3Forms** | Contact form email forwarder | Contact name, email, subject, message body | Public Form Access Key | Key is exposed in client and server code; allows quota flooding if unmonitored. |
| **Google Gemini API** | AI Chatbot Reasoning | User chat prompts, portfolio context, questions | Private Server-Side API Key (`GEMINI_API_KEY`) | Protected server-side; not exposed to client. |
| **Groq Cloud** | Fallback Fast LLM | User chat prompts, portfolio context | Private Server-Side API Key (`GROQ_API_KEY`) | Protected server-side; not exposed to client. |
| **GitHub REST API** | Agent live repository data querying | Repository names, commits, metadata | Unauthenticated Public API Requests | Low sensitivity; public read-only requests with rate limits. |
| **Google Fonts** | Typography CDN | Visitor IP, User-Agent during font download | Public CDN Request | Standard web asset retrieval; minimal privacy risk. |

---

## 6. Retention and Deletion Policies

1. **Contact Submissions:**
   - Currently retained indefinitely in Supabase `contact_messages`.
   - **Recommendation:** Implement a 90-day auto-purge policy or manual bulk cleanup action for messages that have already been resolved.
2. **Visitor IP Addresses:**
   - Client IPs used for `/api/chat` rate limiting are stored purely in memory using Node.js `Map` and cleared automatically on server restart or window expiration. No persistent IP tracking.
3. **Uploaded Media Files:**
   - Images uploaded to `portfolio-media` storage bucket remain indefinitely until deleted through the admin dashboard. Storage bucket files are publicly accessible by design.

---

## 7. Compliance and Regulatory Observations

- **GDPR / Privacy Considerations:**
  - Contact form collects personal email addresses without a visible privacy policy checkbox or consent disclaimer informing users that messages are processed via Web3Forms.
  - Recommendation: Add a concise notice below the contact form: *"Messages are securely processed and forwarded for direct response. We do not sell or share your contact details."*

