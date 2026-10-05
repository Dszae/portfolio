import path from 'path';

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
                source: '/.well-known/openid-configuration',
                destination: '/openid-configuration',
            },
            {
                source: '/.well-known/oauth-protected-resource',
                destination: '/oauth-protected-resource',
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
                source: '/.well-known/mcp/server-card.json',
                destination: '/mcp/server-card',
            },
            {
                source: '/.well-known/http-message-signatures-directory',
                destination: '/http-message-signatures-directory',
            },
            {
                source: '/.well-known/ai-catalog.json',
                destination: '/ai-catalog',
            }
        ];
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
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
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/xml',
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
