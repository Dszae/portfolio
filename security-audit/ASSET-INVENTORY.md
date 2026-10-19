# Application Asset & Surface Inventory

**Target Application:** Dipesh Sapkota Portfolio  
**Domain:** `https://www.dipeshsapkota7.com.np`  
**Framework:** Next.js 16.3.8 (App Router with Turbopack)  
**Database:** Supabase (PostgreSQL 15 + Supabase Storage)

---

## 1. Public Pages & Client-Side Routes

| Route | Render Type | Auth Required? | Purpose / Content | Sensitive Data? |
| :--- | :--- | :--- | :--- | :--- |
| `/` | Static (ISR) | No | Main landing page, hero, featured projects, experience, contact CTA | None (Public) |
| `/about` | Static (ISR) | No | Biography, education timeline, philosophy, credentials | None (Public) |
| `/profile` | Redirect | No | 301 Permanent Redirect to `/about` | None |
| `/projects` | Static (ISR) | No | Portfolio project showcase, tech stack filters | None (Public) |
| `/projects/[slug]` | Static (ISR) | No | Project case studies (`sportivo`, `git-visualizer`, `ioe-admission-guide`, `555-flasher`, `motor-modeling`, `analyzer-diag`, `sports-reels`) | None (Public) |
| `/blog` | Static (ISR) | No | Technical engineering blog posts & tutorials | None (Public) |
| `/certificates` | Static (ISR) | No | Certified accreditations, verified credentials | None (Public) |
| `/gallery` | Static (ISR) | No | High-resolution photography & event highlights | None (Public) |
| `/skills` | Static (ISR) | No | Technical skill catalog with proficiency levels | None (Public) |
| `/resume` | Static (ISR) | No | Online interactive curriculum vitae & PDF download | None (Public) |
| `/contact` | Static (ISR) | No | Interactive message submission form | None (Public) |
| `/image-licensing` | Static (ISR) | No | Content licensing and attribution terms | None (Public) |
| `/admin/login` | Client Component | No | Administrator authentication portal | None (Public login UI) |
| `/admin` | Server Component | Yes (`admin_session` cookie) | Content Management System & Executive Command Hub | Yes (Inquiries, Subscribers, Settings) |

---

## 2. API Routes & Endpoint Inventory

| Endpoint | HTTP Method | Auth Required | Input Validation | Upstream Services | Risk Assessment |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/api/health` | `GET` | No | None | None | Low (Service status response) |
| `/api/markdown` | `GET` | No | Query params | Internal Data Service | Low (Converts pages to text/markdown) |
| `/api/site-features` | `GET` | No | None | Internal constants | Low (Feature flags) |
| `/api/contact` | `POST` | No | Name, Email, Msg length checks | Supabase DB, Web3Forms API | **Medium** (Missing rate limit; hardcoded Web3Forms fallback) |
| `/api/chat` | `GET` | No | None | Internal constants | Low (Agent capabilities discovery) |
| `/api/chat` | `POST` | No | Zod Schema (`ChatRequestSchema`) | Gemini API / Groq API / OpenAI API | Low-Medium (Rate limited: 15 req/10 min; streaming SSE) |
| `/api/agent/auth` | `GET`, `POST` | No | JSON parsing | None | Low (RFC 9728 discovery token generator) |
| `/api/agent/claim` | `POST` | No | None | None | Low (RFC agent claim endpoint) |
| `/api/agent/revoke`| `POST` | No | None | None | Low (RFC agent token revocation) |
| `/api/agent/token` | `POST` | No | None | None | Low (RFC agent token endpoint) |
| `/api/admin/auth` | `POST` | No (Login) | JSON (`password`) | `lib/adminAuth.js` | **High** (No rate limiting, plaintext fallback password in code) |
| `/api/admin/auth` | `DELETE` | Yes | None | `lib/adminAuth.js` | Low (Destroys admin session cookie) |
| `/api/admin/auth` | `GET` | Yes | None | `lib/adminAuth.js` | Low (Verifies session) |
| `/api/admin/backup` | `GET` | Yes | None | Supabase DB | Low (Export full JSON backup) |
| `/api/admin/backup` | `POST` | Yes | JSON schema check | Supabase DB | Low (Restores DB tables from JSON) |
| `/api/admin/blog` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `articles` table | Low (Authenticated CRUD) |
| `/api/admin/certificates` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `certificates` table | Low (Authenticated CRUD) |
| `/api/admin/experience` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `experiences` table | Low (Authenticated CRUD) |
| `/api/admin/gallery` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `gallery_images` table | Low (Authenticated CRUD) |
| `/api/admin/media` | `GET`, `DELETE` | Yes | Query param (`name`) | Supabase Storage `portfolio-media` | Low (Authenticated storage manager) |
| `/api/admin/messages` | `GET`, `PUT`, `DELETE` | Yes | Query param (`id`) | Supabase `contact_messages` table | Low (Authenticated inbox manager) |
| `/api/admin/projects` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `projects` table | Low (Authenticated CRUD) |
| `/api/admin/redirects` | `GET`, `POST`, `DELETE` | Yes | Body fields | Supabase `redirects` table | Low (Authenticated URL mapping) |
| `/api/admin/services` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `services` table | Low (Authenticated CRUD) |
| `/api/admin/settings` | `GET`, `PUT` | Yes | Body fields | Supabase `site_settings` table | Low (Authenticated site settings) |
| `/api/admin/skills` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `skills` table | Low (Authenticated CRUD) |
| `/api/admin/subscribers` | `GET`, `POST`, `DELETE` | Yes | Email check | Supabase `newsletter_subscribers` | Low (Authenticated audience manager) |
| `/api/admin/testimonials` | `GET`, `POST`, `PUT`, `DELETE` | Yes | Body fields | Supabase `testimonials` table | Low (Authenticated CRUD) |
| `/api/admin/upload` | `POST` | Yes | File MIME & extension | Sharp WebP pipeline, Supabase Storage | Low (Converts images to WebP) |

---

## 3. Database Assets (Supabase PostgreSQL)

| Table Name | Storage Scope | RLS Enabled? | Public SELECT | Public INSERT | Admin (Service Role) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `certificates` | Public Showcase | Yes | Yes | No | Full CRUD |
| `gallery_images` | Public Showcase | Yes | Yes | No | Full CRUD |
| `projects` | Public Showcase | Yes | Yes | No | Full CRUD |
| `articles` | Public Showcase | Yes | Yes | No | Full CRUD |
| `skills` | Public Showcase | Yes | Yes | No | Full CRUD |
| `experiences` | Public Showcase | Yes | Yes | No | Full CRUD |
| `services` | Public Showcase | Yes | Yes | No | Full CRUD |
| `testimonials` | Public Showcase | Yes | Yes | No | Full CRUD |
| `site_settings` | System Config | Yes | Yes | No | Full CRUD |
| `contact_messages` | Private Inquiries | Yes | **No** (Protected) | **Yes** (Honeypot guarded) | Full CRUD |
| `newsletter_subscribers` | Audience Leads | Yes | **No** (Protected) | **Yes** | Full CRUD |
| `redirects` | Routing Map | Yes | No | No | Full CRUD |
| `activity_logs` | Audit Trail | Yes | No | No | Full CRUD |
| `storage.objects` (`portfolio-media`) | CDN Media Assets | Yes | Yes (`portfolio-media` only) | No | Full CRUD |

---

## 4. Third-Party Integrations & Services

1. **Supabase (`tihkvcybdvvovmnvkdrx.supabase.co`)**:
   - Host: AWS US-East (PostgreSQL 15)
   - Usage: Relational content storage, static file CDN (`portfolio-media`).
2. **Web3Forms (`api.web3forms.com`)**:
   - Usage: Email delivery for contact form submissions.
3. **Google Analytics / Tag Manager (`googletagmanager.com`, `google-analytics.com`)**:
   - Usage: Anonymous visitor analytics & sitelink engagement metrics.
4. **Cloudflare Web Analytics (`static.cloudflareinsights.com`)**:
   - Usage: Privacy-preserving core web vitals and edge performance monitoring.
5. **LLM Inference Providers (Server-side)**:
   - Google Gemini API (`generativelanguage.googleapis.com`)
   - Groq API (`api.groq.com`)
   - OpenAI API (`api.openai.com`)

