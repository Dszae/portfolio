export const metadata = {
  title: 'About',
  description: 'Learn about Dipesh Sapkota (dszae), Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal with 4+ years of creative media experience.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    title: 'About | Dipesh Sapkota',
    description: 'Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal and video editor.',
    url: 'https://www.dipeshsapkota7.com.np/about',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dipesh Sapkota',
    description: 'Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function AboutLayout({ children }) {
  return children;
}

