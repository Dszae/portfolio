import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: '/api/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: '/api/',
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
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/api/',
      },
    ],
    sitemap: 'https://www.dipeshsapkota7.com.np/sitemap.xml',
  };
}

