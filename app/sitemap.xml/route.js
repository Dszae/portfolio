const baseUrl = 'https://www.dipeshsapkota7.com.np';

const urls = [
  { path: '/', changeFrequency: 'weekly', priority: '1.0' },
  { path: '/about', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/contact', changeFrequency: 'monthly', priority: '0.7' },
  { path: '/blog', changeFrequency: 'monthly', priority: '0.7' },
  { path: '/experience', changeFrequency: 'monthly', priority: '0.7' },
  { path: '/projects/sportivo', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/projects/ioe-admission-guide', changeFrequency: 'monthly', priority: '0.8' },
  { path: '/projects/git-visualizer', changeFrequency: 'monthly', priority: '0.8' },
  { url: 'https://sportivo.dipeshsapkota7.com.np/', changeFrequency: 'weekly', priority: '0.9' },
  { url: 'https://ioe-admission.dipeshsapkota7.com.np/', changeFrequency: 'weekly', priority: '0.9' },
  { url: 'https://git-visualizer.dipeshsapkota7.com.np/', changeFrequency: 'monthly', priority: '0.8' },
];

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export async function GET() {
  const lastModified = new Date().toISOString().split('T')[0];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((entry) => {
  const url = entry.url || `${baseUrl}${entry.path}`;
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}