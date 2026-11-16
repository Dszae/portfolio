import path from 'path';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self' https://api.web3forms.com",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''} https://static.cloudflareinsights.com https://www.googletagmanager.com`,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.supabase.co https://tihkvcybdvvovmnvkdrx.supabase.co",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com https://cloudflareinsights.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.supabase.co https://tihkvcybdvvovmnvkdrx.supabase.co",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig = {
  // Dev only: lets the dev server's live-reload connection work on these hosts.
  allowedDevOrigins: ['127.0.0.1'],
  trailingSlash: false,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/api-catalog',
        destination: '/api-catalog',
      },
      {
        source: '/.well-known/llms.txt',
        destination: '/llms',
      },
      {
        source: '/.well-known/agent-card.json',
        destination: '/agent-card',
      },
      {
        source: '/.well-known/agent-skills/index.json',
        destination: '/agent-skills/index',
      },
      {
        source: '/.well-known/http-message-signatures-directory',
        destination: '/http-message-signatures-directory',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/articles',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/article',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/security.txt',
        destination: '/.well-known/security.txt',
        permanent: true,
      },
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
      {
        source: '/image-licensing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/my_cv.pdf',
        destination: '/dipesh-sapkota-cv.pdf',
        permanent: true,
      },
      {
        source: '/cv',
        destination: '/resume',
        permanent: true,
      },
      {
        source: '/projects/sports-reels',
        destination: 'https://instagram.com/dsz.ae',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), interest-cohort=()',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
          {
            key: 'Origin-Agent-Cluster',
            value: '?1',
          },
        ],
      },
      {
        source: '/(.*\\.(?:ico|png|jpg|jpeg|webp|avif|svg|woff2|woff))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/(api/.*|\\.well-known/.*|openapi\\.json|auth\\.md|llms|mcp)',
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
      {
        // Mirrors public/_headers (which Cloudflare applies to the static asset in production).
        source: '/dipesh-sapkota-cv.pdf',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'inline; filename="Dipesh_Sapkota_CV.pdf"' },
          { key: 'X-Robots-Tag', value: 'index, follow' },
          { key: 'Link', value: '<https://www.dipeshsapkota7.com.np/dipesh-sapkota-cv.pdf>; rel="canonical"' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</.well-known/api-catalog>; rel="api-catalog", </.well-known/llms.txt>; rel="service-doc", </auth.md>; rel="describedby", </.well-known/oauth-protected-resource>; rel="oauth-protected-resource", </.well-known/oauth-authorization-server>; rel="oauth-authorization-server", </.well-known/mcp/server-card.json>; rel="mcp-server-card"',
          },
        ],
      },
    ];
  },
};

export default function config(phase) {
  // Local Cloudflare bindings are only needed by `next dev`. Running this during
  // `next build` opens a remote Wrangler session (the AI binding is remote-only),
  // which fails in CI where no CLOUDFLARE_API_TOKEN is available.
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    initOpenNextCloudflareForDev();
  }
  return nextConfig;
}
