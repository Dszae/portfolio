const siteUrl = 'https://www.dipeshsapkota7.com.np';

const image = (path, title) => ({ path, title });
const portrait = image('/og-image.webp', 'Dipesh Sapkota portrait');

const pages = [
  {
    path: '/',
    images: [
      portrait,
      image('/clamphook_.webp', 'Clamphook Academy logo'),
      image('/campus.webp', 'College Programs logo'),
      image('/freelance.webp', 'Freelance work logo'),
      image('/thapathali.webp', 'Thapathali Campus logo'),
      image('/janak.webp', 'Janak Model Secondary School logo'),
      image('/mahendra.webp', 'Mahendra Adarsha Secondary School logo'),
      image('/sportivo-preview.jpg', 'Sportivo project preview'),
      image('/ioe-preview.jpg', 'IOE Admission Guide project preview'),
      image('/git-preview.jpg', 'Git Visualizer project preview'),
      image('/cricket.webp', 'Participating in a college cricket tournament'),
      image('/yathartha.webp', 'Yathartha visual archive'),
      image('/clamphook.webp', 'Clamphook Academy design'),
      image('/lecture.webp', 'Lecture visual archive'),
      image('/exploring.webp', 'Exploring visual archive'),
      image('/nagdhunga%20surung%20marga.webp', 'Nagdhunga tunnel visual archive'),
      image('/graphic-design.webp', 'Graphic design work'),
      image('/motion-design.webp', 'Motion design work'),
      image('/after-effects.webp', 'Adobe After Effects'),
      image('/davinci-resolve.webp', 'DaVinci Resolve'),
      image('/premiere-pro.webp', 'Adobe Premiere Pro'),
      image('/web-development.webp', 'Web development'),
      image('/google-adwords.webp', 'Google Ads'),
      image('/design-principles.webp', 'Design principles'),
    ],
  },
  { path: '/about', images: [portrait] },
  {
    path: '/experience',
    images: [
      image('/clamphook_.webp', 'Clamphook Academy logo'),
      image('/campus.webp', 'College Programs logo'),
      image('/freelance.webp', 'Freelance work logo'),
      image('/thapathali.webp', 'Thapathali Campus logo'),
      image('/janak.webp', 'Janak Model Secondary School logo'),
      image('/mahendra.webp', 'Mahendra Adarsha Secondary School logo'),
    ],
  },
  { path: '/projects/sportivo', images: [image('/sportivo-preview.jpg', 'Sportivo project preview')] },
  { path: '/projects/ioe-admission-guide', images: [image('/ioe-preview.jpg', 'IOE Admission Guide project preview')] },
  { path: '/projects/git-visualizer', images: [image('/git-preview.jpg', 'Git Visualizer project preview')] },
  { path: '/blog', images: [portrait] },
  { path: '/contact', images: [portrait] },
];

const escapeXml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export async function GET() {
  const entries = pages.map(({ path, images = [] }) => {
    const imageEntries = images
      .map(({ path: imagePath, title }) => (
        `<image:image><image:loc>${escapeXml(`${siteUrl}${imagePath}`)}</image:loc><image:title>${escapeXml(title)}</image:title></image:image>`
      ))
      .join('');

    return `<url><loc>${escapeXml(`${siteUrl}${path}`)}</loc>${imageEntries}</url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
