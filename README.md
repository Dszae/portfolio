# Dipesh Sapkota | Portfolio

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-dipeshsapkota7.com.np-0891b2?style=for-the-badge&logo=vercel&logoColor=white)](https://www.dipeshsapkota7.com.np/)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
[![License](https://img.shields.io/badge/License-Private-lightgrey?style=for-the-badge)](package.json)

The personal portfolio of **Dipesh Sapkota**, a Computer Engineering student at IOE Thapathali Campus, AI/ML enthusiast, developer, video editor, and motion graphics designer based in Nepal.

The site brings together professional experience, technical skills, selected projects, engineering articles, contact information, and machine-readable portfolio resources for search engines and AI agents.

## Live Website

**[Open the portfolio](https://www.dipeshsapkota7.com.np/)**

## Features

- Responsive portfolio experience for mobile, tablet, and desktop screens.
- Interactive particle canvas on the home page.
- Light and dark theme support.
- Dedicated pages for about, experience, contact, blog, and featured projects.
- Metadata, canonical URLs, Open Graph cards, Twitter cards, JSON-LD, sitemap, and robots configuration.
- Public Markdown and health APIs for portfolio discovery.
- AI-agent discovery resources through `.well-known` routes.
- Security-focused response headers configured in `next.config.js`.

## Featured Projects

| Project | Description | Links |
| --- | --- | --- |
| **Sportivo** | Real-time sports platform with match schedules, search, live tracking, and multi-server stream switching. | [Live app](https://sportivo.dipeshsapkota7.com.np/) · [Source](https://github.com/dszae/sportivo) |
| **IOE Admission Guide** | Engineering admission guide with rank prediction, cutoff analytics, counseling workflows, and priority form tools. | [Live app](https://ioe-admission.dipeshsapkota7.com.np/) · [Source](https://github.com/dszae/ioe-admission-guide) |
| **Git Visualizer** | Interactive learning tool that explains Git commands, commits, branches, merges, and version-control workflows. | [Live app](https://git-visualizer.dipeshsapkota7.com.np/) · [Source](https://github.com/dszae/git-visualizer) |

## Tech Stack

- **Framework:** Next.js 16 with the App Router
- **UI:** React 19 and JSX
- **Styling:** Tailwind CSS 4 and custom CSS
- **Animation:** Framer Motion
- **Language:** JavaScript with TypeScript tooling
- **Quality:** ESLint and Next.js build checks
- **Deployment:** Vercel

## Project Structure

```text
app/
  page.jsx                    # Main portfolio page
  about/page.jsx              # Biography and focus areas
  experience/page.jsx         # Experience and education
  blog/page.jsx               # Technical articles
  contact/page.jsx            # Contact information
  projects/                   # Featured project pages
  api/                        # Health and Markdown APIs
  .well-known/                # Agent and API discovery resources
components/                   # Shared React components
public/                       # Static images and crawler resources
next.config.js                # Rewrites and security headers
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/dszae/next-portfolio.git
cd next-portfolio
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Next.js development server. |
| `npm run lint` | Run ESLint across the repository. |
| `npm run build` | Create a production build. |
| `npm run start` | Start the production server after building. |

## Public API and Discovery Resources

The portfolio exposes public, read-only resources:

- [`/api/markdown`](https://www.dipeshsapkota7.com.np/api/markdown) - Portfolio information as Markdown.
- [`/api/health`](https://www.dipeshsapkota7.com.np/api/health) - API availability and service status.
- [`/openapi.json`](https://www.dipeshsapkota7.com.np/openapi.json) - OpenAPI 3.1 specification.
- [`/.well-known/api-catalog`](https://www.dipeshsapkota7.com.np/.well-known/api-catalog) - API catalog.
- [`/.well-known/llms.txt`](https://www.dipeshsapkota7.com.np/.well-known/llms.txt) - AI-readable portfolio summary.
- [`/.well-known/agent-card.json`](https://www.dipeshsapkota7.com.np/.well-known/agent-card.json) - Agent capability card.
- [`/.well-known/mcp/server-card.json`](https://www.dipeshsapkota7.com.np/.well-known/mcp/server-card.json) - MCP server discovery metadata.

These resources contain public information only and do not require authentication.

## Deployment

This project is configured for deployment on [Vercel](https://vercel.com/). Import the repository into a Vercel project and use the default Next.js build settings:

```text
Build command: npm run build
Output: Next.js default output
Install command: npm install
```

For a local production check:

```bash
npm run build
npm run start
```

## Contact

- **Website:** [dipeshsapkota7.com.np](https://www.dipeshsapkota7.com.np/)
- **GitHub:** [@dszae](https://github.com/dszae)
- **LinkedIn:** [Dipesh Sapkota](https://linkedin.com/in/dszae)
- **Email:** [dsz.ae18@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com)

## License

This is a personal portfolio project. The source is available for reference, but the content, branding, images, and personal information are not licensed for redistribution without permission.
