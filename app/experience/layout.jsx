export const metadata = {
  title: 'Experience',
  description: 'Professional experience and academic background of Dipesh Sapkota (dszae) at IOE Thapathali Campus and Clamphook Academy in Kathmandu, Nepal.',
  alternates: { canonical: '/experience' },
  openGraph: {
    type: 'profile',
    title: 'Experience | Dipesh Sapkota',
    description: 'Professional experience and academic background of Dipesh Sapkota at IOE Thapathali Campus and Clamphook Academy.',
    url: 'https://www.dipeshsapkota7.com.np/experience',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience | Dipesh Sapkota',
    description: 'Experience and education of Dipesh Sapkota, Computer Engineering student at IOE Thapathali and video editor at Clamphook Academy.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function ExperienceLayout({ children }) {
  return children;
}
