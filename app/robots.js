export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
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
          'GPTBot',
          'ChatGPT-User',
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
    ],
    sitemap: 'https://www.dipeshsapkota7.com.np/sitemap.xml',
    host: 'https://www.dipeshsapkota7.com.np',
  };
}
