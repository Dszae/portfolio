import type { MetadataRoute } from 'next';

const sharedAllow = ['/', '/api/markdown', '/llms.txt', '/llms-full.txt', '/.well-known/'];
const sharedDisallow = ['/api/', '/admin/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
        },
      },
      {
        userAgent: 'GPTBot',
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
        },
      },
      {
        userAgent: 'ChatGPT-User',
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
        },
      },
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Google-Extended',
          'bingbot',
          'msnbot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'YandexBot',
          'Applebot',
          'Applebot-Extended',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'PerplexityBot',
          'Bytespider',
          'Diffbot',
          'FacebookBot',
          'Meta-ExternalAgent',
          'cohere-ai',
          'Omgilibot',
        ],
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
        },
      },
      {
        userAgent: 'Cloudflare-AI-Search',
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
        },
      },
      {
        userAgent: '*',
        allow: sharedAllow,
        disallow: sharedDisallow,
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
        },
      },
    ],
    sitemap: 'https://www.dipeshsapkota7.com.np/sitemap.xml',
  };
}
