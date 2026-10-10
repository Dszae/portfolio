import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

export async function GET() {
  const filePath = path.join(process.cwd(), 'public', 'sitemap.xsl');
  const content = fs.readFileSync(filePath, 'utf8');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/xsl; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
