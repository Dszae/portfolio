import path from 'path';

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "frame-src 'none'",
  "form-action 'self' https://api.web3forms.com",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://static.cloudflareinsights.com/beacon.min.js https://static.cloudflareinsights.com/beacon.min.js/",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
  'upgrade-insecure-requests',
].join('; ');

const nextConfig = {
  trailingSlash: false,
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
        source: '/profile',
        destination: '/about',
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
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</.well-known/api-catalog>; rel="api-catalog", </.well-known/llms.txt>; rel="service-doc", </auth.md>; rel="describedby"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
