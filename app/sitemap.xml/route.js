const siteUrl = 'https://www.dipeshsapkota7.com.np';
export const dynamic = 'force-static';

const image = (path, title) => ({ path, title });
const portrait = image('/dipesh-sapkota.jpg', 'Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus');
const currentDate = '2026-10-10';

const pages = [
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    images: [portrait],
  },
  {
    path: '/about',
    priority: '0.9',
    changefreq: 'weekly',
    images: [portrait],
  },
  {
    path: '/skills',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    path: '/projects',
    priority: '0.9',
    changefreq: 'weekly',
    images: [
      image('/sportivo-preview.jpg', 'Sportivo project preview'),
      image('/ioe-preview.jpg', 'IOE Admission Guide project preview'),
      image('/git-preview.jpg', 'Git Visualizer project preview'),
    ],
  },
  {
    path: '/projects/sportivo',
    priority: '0.85',
    changefreq: 'monthly',
    images: [image('/sportivo-preview.jpg', 'Sportivo project preview')],
  },
  {
    path: '/projects/ioe-admission-guide',
    priority: '0.85',
    changefreq: 'monthly',
    images: [image('/ioe-preview.jpg', 'IOE Admission Guide project preview')],
  },
  {
    path: '/projects/git-visualizer',
    priority: '0.85',
    changefreq: 'monthly',
    images: [image('/git-preview.jpg', 'Git Visualizer project preview')],
  },
  {
    path: '/projects/sports-reels',
    priority: '0.85',
    changefreq: 'monthly',
    images: [portrait],
  },
  {
    path: '/projects/555-flasher',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/projects/motor-modeling',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/projects/analyzer-diag',
    priority: '0.8',
    changefreq: 'monthly',
  },
  {
    path: '/certificates',
    priority: '0.9',
    changefreq: 'weekly',
    images: [
      image('/graphic-design.webp', 'Graphic Design Masterclass certificate'),
      image('/motion-design.webp', 'Motion Design with Figma certificate'),
      image('/after-effects.webp', 'Adobe After Effects certificate'),
      image('/davinci-resolve.webp', 'DaVinci Resolve 16 Color Correction certificate'),
      image('/premiere-pro.webp', 'Adobe Premiere Pro CC Masterclass certificate'),
      image('/web-development.webp', 'Web Development Masterclass certificate'),
      image('/google-adwords.webp', 'Google Adwords certificate'),
      image('/design-principles.webp', 'Design Principles, Typography & Color Theory certificate'),
    ],
  },
  {
    path: '/resume',
    priority: '0.9',
    changefreq: 'weekly',
    images: [
      portrait,
      image('/clamphook_.webp', 'Clamphook Academy logo'),
      image('/campus.webp', 'College Programs logo'),
      image('/freelance.webp', 'Freelance work logo'),
      image('/thapathali.webp', 'Thapathali Campus logo'),
      image('/janak.webp', 'Janak Model Secondary School logo'),
      image('/mahendra.webp', 'Mahendra Adarsha Secondary School logo'),
    ],
  },
  {
    path: '/gallery',
    priority: '0.9',
    changefreq: 'weekly',
    images: [
      image('/cricket.webp', 'Participating in college cricket tournament'),
      image('/yathartha.webp', 'Successfully conducted Yathartha Tech Exhibition'),
      image('/clamphook.webp', 'Celebrating academic results with Clamphook team'),
      image('/lecture.webp', 'Engineering lectures at IOE Thapathali'),
      image('/exploring.webp', 'Creative video editing and focus'),
      image('/nagdhunga%20surung%20marga.webp', 'Nagdhunga tunnel roadside field visit'),
    ],
  },
  {
    path: '/contact',
    priority: '0.9',
    changefreq: 'monthly',
    images: [portrait],
  },
  {
    path: '/blog',
    priority: '0.85',
    changefreq: 'weekly',
    images: [portrait],
  },
  {
    path: '/image-licensing',
    priority: '0.6',
    changefreq: 'monthly',
  },
];

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export async function GET() {
  const entries = pages.map(({ path, priority = '0.7', changefreq = 'weekly', images = [] }) => {
    const imageEntries = images
      .map(({ path: imagePath, title }) => (
        `<image:image><image:loc>${escapeXml(`${siteUrl}${imagePath}`)}</image:loc><image:title>${escapeXml(title)}</image:title></image:image>`
      ))
      .join('');

    return `<url><loc>${escapeXml(`${siteUrl}${path}`)}</loc><lastmod>${currentDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${imageEntries}</url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
