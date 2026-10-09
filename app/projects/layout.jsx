export const metadata = {
  title: 'Projects Archive | Dipesh Sapkota',
  description: 'Featured web development and engineering projects by Dipesh Sapkota, including Sportivo (live sports streaming), IOE Admission Guide, Git Visualizer, and hardware prototypes.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects Archive | Dipesh Sapkota',
    description: 'Explore live web apps and engineering projects by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/projects',
    images: [{ url: '/sportivo-preview.jpg', width: 993, height: 450, alt: 'Sportivo by Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects Archive | Dipesh Sapkota',
    description: 'Real-time web applications and engineering projects by Dipesh Sapkota.',
    images: ['/sportivo-preview.jpg'],
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}
