export const metadata = {
  title: 'Contact & Let\'s Connect | Dipesh Sapkota',
  description: 'Reach out to Dipesh Sapkota for freelance video editing, web development projects, or engineering collaborations in Kathmandu, Nepal. Direct phone, email, and contact form.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Dipesh Sapkota',
    description: 'Open for freelance projects, collaborations, and technical discussions.',
    url: 'https://www.dipeshsapkota7.com.np/contact',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Contact Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Dipesh Sapkota',
    description: 'Get in touch for freelance media, web design, or engineering work.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function ContactLayout({ children }) {
  return children;
}

