export async function GET() {
  const robotsTxt = `User-Agent: *
Allow: /

Sitemap: https://www.dipeshsapkota7.com.np/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
