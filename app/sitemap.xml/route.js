const siteUrl = 'https://www.dipeshsapkota7.com.np';
export const dynamic = 'force-static';

const image = (path, title) => ({ path, title });
const portrait = image('/dipesh-sapkota.jpg', 'Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus');
const currentDate = '2026-10-12';
const pages = [
  // Primary Homepage
  {
    path: '/',
    priority: '1.0',
    changefreq: 'daily',
    images: [portrait],
  },
  // Core Sitelinks (Primary Navigation Pages)
  {
    path: '/about',
    priority: '0.95',
    changefreq: 'weekly',
    images: [portrait],
  },
  {
    path: '/skills',
    priority: '0.95',
    changefreq: 'weekly',
  },
  {
    path: '/projects',
    priority: '0.95',
    changefreq: 'weekly',
    images: [
      image('/sportivo-preview.jpg', 'Sportivo project preview'),
      image('/ioe-preview.jpg', 'IOE Admission Guide project preview'),
      image('/git-preview.jpg', 'Git Visualizer project preview'),
    ],
  },
  {
    path: '/certificates',
    priority: '0.95',
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
    priority: '0.95',
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
    priority: '0.95',
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
    priority: '0.95',
    changefreq: 'monthly',
    images: [portrait],
  },
  // Sub-pages, Case Studies, and Secondary Resources
  {
    path: '/projects/sportivo',
    priority: '0.95',
    changefreq: 'monthly',
    images: [image('/sportivo-preview.jpg', 'Sportivo project preview')],
    videos: [{ title: 'Sportivo Live Sports Platform Demo', description: 'A product demonstration of Sportivo, a live sports platform created by Dipesh Sapkota.', thumbnail: '/sportivo-first-frame.jpg', content: '/sportivo-launch.mp4' }],
  },
  {
    path: '/projects/ioe-admission-guide',
    priority: '0.85',
    changefreq: 'monthly',
    images: [image('/ioe-preview.jpg', 'IOE Admission Guide project preview')],
    videos: [{ title: 'IOE Admission Guide Demo', description: 'A product demonstration of the IOE Admission Guide created by Dipesh Sapkota.', thumbnail: '/ioe-first-frame.jpg', content: '/ioe-demo.mp4' }],
  },
  {
    path: '/projects/git-visualizer',
    priority: '0.85',
    changefreq: 'monthly',
    images: [image('/git-preview.jpg', 'Git Visualizer project preview')],
    videos: [{ title: 'Git Visualizer Interactive Demo', description: 'A product demonstration of Git Visualizer, an interactive version-control learning tool created by Dipesh Sapkota.', thumbnail: '/git-visualizer-first-frame.jpg', content: '/git-visualizer-launch.mp4' }],
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

// External project subdomains — included so Google associates them with this site
// and may show them as sitelinks for dipeshsapkota7.com.np
const externalPages = [
  {
    url: 'https://sportivo.dipeshsapkota7.com.np/',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    url: 'https://ioe-admission.dipeshsapkota7.com.np/',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    url: 'https://git-visualizer.dipeshsapkota7.com.np/',
    priority: '0.9',
    changefreq: 'weekly',
  },
];

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export async function GET() {
  const entries = pages.map(({ path, priority = '0.7', changefreq = 'weekly', images = [], videos = [] }) => {
    const imageEntries = images
      .map(({ path: imagePath, title }) => (
        `<image:image><image:loc>${escapeXml(`${siteUrl}${imagePath}`)}</image:loc><image:title>${escapeXml(title)}</image:title></image:image>`
      ))
      .join('');
    const videoEntries = videos.map(({ title, description, thumbnail, content }) => (
      `<video:video><video:thumbnail_loc>${escapeXml(`${siteUrl}${thumbnail}`)}</video:thumbnail_loc><video:title>${escapeXml(title)}</video:title><video:description>${escapeXml(description)}</video:description><video:content_loc>${escapeXml(`${siteUrl}${content}`)}</video:content_loc><video:publication_date>${currentDate}T00:00:00+05:45</video:publication_date></video:video>`
    )).join('');

    return `<url><loc>${escapeXml(`${siteUrl}${path}`)}</loc><lastmod>${currentDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority>${imageEntries}${videoEntries}</url>`;
  }).join('');

  const externalEntries = externalPages.map(({ url, priority = '0.7', changefreq = 'weekly' }) =>
    `<url><loc>${escapeXml(url)}</loc><lastmod>${currentDate}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  ).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${entries}${externalEntries}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
