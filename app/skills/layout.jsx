export const metadata = {
  title: 'Skills',
  description: 'Technical competencies of Dipesh Sapkota across programming (C/C++, Python, React, PHP), creative media (video editing, motion graphics, graphic design), and engineering (circuit analysis, Proteus).',
  alternates: { canonical: '/skills' },
  openGraph: {
    title: 'Skills | Dipesh Sapkota',
    description: 'Programming, Creative Media, and Engineering skills of Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/skills',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota Skills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical Skills | Dipesh Sapkota',
    description: 'Technical proficiency in programming, media production, and engineering.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function SkillsLayout({ children }) {
  return children;
}

