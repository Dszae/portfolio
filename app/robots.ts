import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: '/api/',
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
        },
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: '/api/',
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
        },
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: '/api/',
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
        allow: '/',
        disallow: '/api/',
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=yes',
        },
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
        other: {
          'Content-Signal': 'ai-train=no, search=yes, ai-input=no',
        },
      },
    ],
    sitemap: 'https://www.dipeshsapkota7.com.np/sitemap.xml',
  };
}

