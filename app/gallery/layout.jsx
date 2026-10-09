export const metadata = {
  title: 'Gallery',
  description: 'Curated photo archive and visual moments documenting campus life at IOE Thapathali, tech exhibitions, creative projects, and travels in Nepal.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery | Dipesh Sapkota',
    description: 'Photo gallery of campus life, competitions, and creative projects.',
    url: 'https://www.dipeshsapkota7.com.np/gallery',
    images: [{ url: '/yathartha.webp', width: 640, height: 360, alt: 'Yathartha Exhibition' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Archive | Dipesh Sapkota',
    description: 'Visual moments and photography by Dipesh Sapkota.',
    images: ['/yathartha.webp'],
  },
};

export default function GalleryLayout({ children }) {
  return children;
}

