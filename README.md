# Dipesh Sapkota | Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-dipeshsapkota7.com.np-0891b2?style=for-the-badge&logo=vercel&logoColor=white)](https://www.dipeshsapkota7.com.np/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
[![License](https://img.shields.io/badge/License-Private-lightgrey?style=for-the-badge)](package.json)

The personal portfolio and content platform of **Dipesh Sapkota**, a Computer Engineering student at IOE Thapathali Campus, AI/ML enthusiast, video editor, and motion graphics designer based in Nepal.

The platform includes a real-time portfolio experience, an administrative content management system, dynamic Schema.org structured data, automated search engine optimization (SEO), and AI-agent discovery resources.

## Live Website

**[Open the portfolio](https://www.dipeshsapkota7.com.np/)**

## Key Features

### 1. Intelligent SEO & Structured Data Engine
- **Dynamic Content Analysis:** Analyzes article and project content on the fly to extract technical keywords, calculate reading metrics, generate sentence-bounded excerpts, and infer taxonomy.
- **Adaptive Schema.org Graph:** Automatically emits valid JSON-LD schemas including `Person`, `WebSite`, `BreadcrumbList`, `TechArticle`, `BlogPosting`, `SoftwareApplication`, `EducationalOccupationalCredential`, `ImageObject`, and `ProfilePage`.
- **Contextual Categorization:** Distinguishes application types (AI/ML, hardware simulation, multimedia, sports PWAs) and targets appropriate operating systems and programming languages.
- **Dynamic XML Sitemap:** Automatically generates `/sitemap.xml` with Google Image extensions (`<image:image>`), dynamic `<lastmod>` timestamps, and crawler priorities.

### 2. Full-Stack Automated Cache Revalidation
- **Instant Synchronization:** Mutations made in the Admin Panel (projects, blog, experience, certificates, gallery, skills, services, testimonials, settings) immediately purge internal memory caches.
- **On-Demand Revalidation:** Calls Next.js `revalidatePath()` across all affected routes, parent lists, and the dynamic sitemap.
- **Audit Trail:** Logs administrator updates and revalidation events to Supabase `activity_logs`.

### 3. Dedicated Admin Dashboard & Media Processing
- **Minimalist Control Center:** Clean dashboard for managing projects, articles, work experience, education, certificates, skills, gallery, and site settings.
- **Automated WebP Compression:** Uploaded raster images (JPEG, PNG, AVIF, HEIC) are converted to WebP format via Sharp with EXIF rotation and dimension optimization.
- **Dynamic Routing:** Supports both static custom showcases and dynamic database-driven detail routes (`/blog/[slug]` and `/projects/[slug]`).

### 4. Hardened Security Architecture
- **Cryptographic Authentication:** Protected admin endpoints backed by HMAC-SHA256 session verification stored in `HttpOnly`, `Secure`, `SameSite=Lax` cookies.
- **Strict Browser Headers:** Configured in `next.config.js` with Content Security Policy (CSP), HSTS preload (`max-age=63072000`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and restricted permissions.
- **Zero Client Secret Leakage:** Service-role privileges remain strictly server-side.

### 5. Interactive UI & Presentation
- **Theme Support:** Dark and light theme toggle with persistent preference synchronization.
- **Responsive Navigation:** Mobile-optimized drawer, keyboard shortcuts, modal previews, and scroll progress tracking.
- **AI Agent Discovery:** Standards-compliant `.well-known` endpoints for AI models, OpenAPI specifications, and Markdown representations.

## Featured Projects

| Project | Description | Links |
| --- | --- | --- |
| **Sportivo** | Real-time sports platform with match schedules, search, live tracking, and multi-server stream switching. | [Live app](https://sportivo.dipeshsapkota7.com.np/) · [Source](https://github.com/dszae/sportivo) |
| **IOE Admission Guide** | Engineering admission guide with rank prediction, cutoff analytics, counseling workflows, and priority form tools. | [Live app](https://ioe-admission.dipeshsapkota7.com.np/) · [Source](https://github.com/dszae/ioe-admission-guide) |
| **Git Visualizer** | Interactive learning tool that explains Git commands, commits, branches, merges, and version-control workflows. | [Live app](https://git-visualizer.dipeshsapkota7.com.np/) · [Source](https://github.com/dszae/git-visualizer) |

## Tech Stack

- **Framework:** Next.js 16 (Turbopack, App Router)
- **UI & State:** React 19, JSX
- **Styling:** Tailwind CSS 4, custom utility layers
- **Animation:** Framer Motion
- **Database & Auth:** Supabase PostgreSQL, cryptographic HMAC session cookies
- **Media Optimization:** Sharp (WebP pipeline)
- **Deployment:** Vercel

## Project Structure

```text
app/
  page.jsx                     # Primary portfolio page
  about/page.jsx               # Biography, focus areas, and ProfilePage schema
  profile/page.jsx             # Verified public profile page
  resume/page.jsx              # Experience, education, and career history
  skills/page.jsx              # Technical competencies and toolkits
  projects/                    # Projects gallery and dynamic [slug] routes
  blog/                        # Articles list and dynamic [slug] routes
  certificates/page.jsx        # Professional credentials and certifications
  gallery/page.jsx             # Visual media and photography gallery
  contact/page.jsx             # Contact form and communication channels
  admin/                       # Admin authentication and dashboard
  api/                         # Admin CRUD, AI agent, markdown, and analytics routes
  sitemap.xml/route.js         # Dynamic Google-indexed XML sitemap
components/                    # Reusable React components and schemas
lib/
  seoEngine.js                 # Content analyzer and Schema.org generator
  revalidationEngine.js        # Automated cache and route revalidator
  dataService.js               # Supabase data access layer with in-memory caching
  adminAuth.js                 # HMAC session authentication utilities
  supabaseAdmin.js             # Privileged server-side Supabase client
next.config.js                 # Security headers, rewrites, and image patterns
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm or pnpm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Dszae/portfolio.git
cd portfolio
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD=your-secure-admin-password
ADMIN_SESSION_SECRET=your-random-64-character-hex-string
```

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server. |
| `npm run lint` | Run ESLint across the repository. |
| `npm run build` | Create a production build with Turbopack. |
| `npm run start` | Start the production server after building. |

## Public Discovery & Machine-Readable Resources

The platform exposes public, read-only endpoints:

- [`/api/markdown`](https://www.dipeshsapkota7.com.np/api/markdown) - Portfolio information as Markdown.
- [`/api/health`](https://www.dipeshsapkota7.com.np/api/health) - Health check and uptime status.
- [`/openapi.json`](https://www.dipeshsapkota7.com.np/openapi.json) - OpenAPI 3.1 specification.
- [`/.well-known/api-catalog`](https://www.dipeshsapkota7.com.np/.well-known/api-catalog) - API catalog.
- [`/.well-known/llms.txt`](https://www.dipeshsapkota7.com.np/.well-known/llms.txt) - AI-readable portfolio summary.
- [`/.well-known/agent-card.json`](https://www.dipeshsapkota7.com.np/.well-known/agent-card.json) - Agent capability definition.

## Deployment

The project is configured for automated deployments on [Vercel](https://vercel.com/):

```text
Build command: npm run build
Output directory: Next.js default (.next)
Install command: npm install
```

## Contact

- **Website:** [dipeshsapkota7.com.np](https://www.dipeshsapkota7.com.np/)
- **GitHub:** [@dszae](https://github.com/dszae)
- **LinkedIn:** [Dipesh Sapkota](https://linkedin.com/in/dszae)
- **Email:** [dsz.ae18@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com)

## License

This is a personal portfolio project. The source code is provided for reference. Personal branding, credentials, imagery, and written content are reserved.
