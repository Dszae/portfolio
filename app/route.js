export async function GET() {
  const robotsTxt = `User-Agent: *
Allow: /

Content-Signal: ai-train=no, search=yes, ai-input=no

Sitemap: https://www.dipeshsapkota7.com.np/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}