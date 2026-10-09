export const metadata = {
  title: 'Certificates',
  description: 'Verified professional certifications of Dipesh Sapkota from Udemy, Blackmagic Design, and EDUCBA in Graphic Design, Motion Design, Color Correction, Premiere Pro, and Web Development.',
  alternates: { canonical: '/certificates' },
  openGraph: {
    title: 'Certificates | Dipesh Sapkota',
    description: 'Verified professional coursework and certifications of Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/certificates',
    images: [{ url: '/graphic-design.webp', width: 400, height: 300, alt: 'Certifications of Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certifications | Dipesh Sapkota',
    description: 'Verified credentials and certificates in design, editing, and software.',
    images: ['/graphic-design.webp'],
  },
};

export default function CertificatesLayout({ children }) {
  return children;
}

