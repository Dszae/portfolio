export const metadata = {
  title: 'About',
  description: 'Learn about Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal with 4+ years of creative media experience.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    title: 'About | Dipesh Sapkota',
    description: 'Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal and video editor.',
    url: 'https://www.dipeshsapkota7.com.np/about',
    images: [{ url: '/dipesh-sapkota-portrait-16x9.jpg', width: 1200, height: 675, alt: 'Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dipesh Sapkota',
    description: 'Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.',
    images: ['/dipesh-sapkota-portrait-16x9.jpg'],
  },
};

export default function AboutLayout({ children }) {
  return children;
}

