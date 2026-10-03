import path from 'path';

const nextConfig = {
  turbopack: {
    root: path.join(__dirname, '..'),
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/robots',
      },
      {
        source: '/.well-known/api-catalog',
        destination: '/api-catalog',
      },
      {
        source: '/auth.md',
        destination: '/auth-md',
      },
      {
        source: '/.well-known/openid-configuration',
        destination: '/openid-configuration',
      },
      {
        source: '/.well-known/oauth-protected-resource',
        destination: '/oauth-protected-resource',
      },
    ];
  },
  async headers() {
    return [
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