# Dszae Portfolio

[![Live Site](https://img.shields.io/badge/Live-dipeshsapkota7.com.np-0891b2?style=for-the-badge&logo=vercel&logoColor=white)](https://www.dipeshsapkota7.com.np/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)

Personal portfolio website for **Dipesh Sapkota** built with Next.js App Router. The site presents professional profile content, featured projects, public machine-readable endpoints, and AI/agent discovery resources.

## Live Demo

- **Production:** https://www.dipeshsapkota7.com.np/

## Key Features

- Responsive portfolio UI across home, about, experience, blog, contact, and project pages.
- SEO-ready metadata and structured data (Open Graph, Twitter, JSON-LD, sitemap, robots).
- Public read-only API endpoints:
  - `/api/health`
  - `/api/markdown`
  - `/openapi.json`
- `.well-known` and related discovery endpoints for AI/agent integrations.
- Security-oriented HTTP headers configured in `next.config.js`.

## Technology Stack

- **Framework:** Next.js `16.3.8` (App Router)
- **UI:** React `19.2.8`
- **Styling:** Tailwind CSS `4`
- **Animation:** Framer Motion
- **Tooling:** ESLint, TypeScript type packages
- **Deployment target:** Vercel

## Architecture / Project Structure

```text
app/
  page.jsx                          # Main portfolio page
  about/, experience/, blog/        # Secondary pages
  contact/, projects/               # Contact + project detail pages
  api/health/route.js               # Health endpoint
  api/markdown/route.js             # Markdown profile endpoint
  openapi.json/route.js             # OpenAPI spec endpoint
  .well-known/...                   # Agent/auth/discovery resources
components/
  FadeUp.jsx
  WebMCPInitializer.jsx
public/                             # Static assets
next.config.js                      # Rewrites and headers
.github/workflows/ci.yml            # Lint + build CI
```

## Prerequisites

- Node.js `20+`
- npm `9+`

## Setup

```bash
git clone https://github.com/Dszae/portfolio.git
cd portfolio
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Environment Variables

No local `.env` file is required to run this project in development.

If you customize external services (for example contact-form providers), prefer environment variables instead of hardcoding sensitive values.

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint across the repository |

## Development, Build, and Deployment

### Local development

```bash
npm run dev
```

### Production check (local)

```bash
npm run lint
npm run build
npm run start
```

### Deployment

This repository is set up for Vercel-style deployment:

- Install: `npm install`
- Build: `npm run build`
- Start: `npm run start` (for non-serverless environments)

`vercel.json` is present in the repository root.

## Accessibility and Security Notes

- Semantic metadata and JSON-LD are provided through `app/layout.jsx`.
- ARIA labels are used in interactive sections (e.g., social links and modal controls).
- Baseline response headers are configured in `next.config.js` (`X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

## Support / Contact

- Website: https://www.dipeshsapkota7.com.np/
- GitHub: https://github.com/dszae
- LinkedIn: https://linkedin.com/in/dszae
- Email: dsz.ae18@gmail.com

## License / Source Usage

This repository is a personal portfolio project and is marked as private in package metadata. Source is published for reference only unless explicit permission is granted by the owner. Personal branding assets, profile content, and media are not open for unrestricted reuse.
