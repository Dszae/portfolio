const siteUrl = 'https://www.dipeshsapkota7.com.np';

const homepageImages = [
  '/og-image.webp',
  '/clamphook_.webp',
  '/campus.webp',
  '/freelance.webp',
  '/thapathali.webp',
  '/janak.webp',
  '/mahendra.webp',
  '/sportivo-preview.jpg',
  '/ioe-preview.jpg',
  '/git-preview.jpg',
  '/cricket.webp',
  '/yathartha.webp',
  '/clamphook.webp',
  '/lecture.webp',
  '/exploring.webp',
  '/nagdhunga%20surung%20marga.webp',
  '/graphic-design.webp',
  '/motion-design.webp',
  '/after-effects.webp',
  '/davinci-resolve.webp',
  '/premiere-pro.webp',
  '/web-development.webp',
  '/google-adwords.webp',
  '/design-principles.webp',
];

const pages = [
  { path: '/', images: homepageImages },
  { path: '/about' },
  { path: '/experience' },
  { path: '/projects/sportivo' },
  { path: '/projects/ioe-admission-guide' },
  { path: '/projects/git-visualizer' },
  { path: '/blog' },
  { path: '/contact' },
];

export async function GET() {
  const entries = pages.map(({ path, images = [] }) => {
    const imageEntries = images
      .map((image) => `<image:image><image:loc>${siteUrl}${image}</image:loc></image:image>`)
      .join('');

    return `<url><loc>${siteUrl}${path}</loc>${imageEntries}</url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${entries}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
