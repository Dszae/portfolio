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

export default function sitemap() {
  return [
    { url: siteUrl, images: homepageImages.map((image) => `${siteUrl}${image}`) },
    { url: `${siteUrl}/about` },
    { url: `${siteUrl}/experience` },
    { url: `${siteUrl}/projects/sportivo` },
    { url: `${siteUrl}/projects/ioe-admission-guide` },
    { url: `${siteUrl}/projects/git-visualizer` },
    { url: `${siteUrl}/blog` },
    { url: `${siteUrl}/contact` },
  ];
}
