export const metadata = {
  title: 'Resume',
  description: 'Career journey, work experience, and educational background of Dipesh Sapkota (dszae) at IOE Thapathali Campus and Clamphook Academy. Download full CV.',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: 'Resume | Dipesh Sapkota',
    description: 'Experience and education timeline of Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/resume',
    images: [{ url: '/dipesh-sapkota-portrait-16x9.jpg', width: 1200, height: 675, alt: 'Dipesh Sapkota Resume' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Dipesh Sapkota',
    description: 'Work experience, education, and engineering curriculum vitae.',
    images: ['/dipesh-sapkota-portrait-16x9.jpg'],
  },
};

export default function ResumeLayout({ children }) {
  return children;
}

