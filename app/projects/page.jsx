import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Projects',
  description: 'Explore software projects engineered by Dipesh Sapkota (dszae), including Git Visualizer, IOE Admission Guide, and Sportivo.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    title: 'Projects | Dipesh Sapkota',
    description: 'Explore software projects engineered by Dipesh Sapkota (dszae), including Git Visualizer, IOE Admission Guide, and Sportivo.',
    url: '/projects',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Dipesh Sapkota',
    description: 'Explore software projects engineered by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects by Dipesh Sapkota',
  url: 'https://www.dipeshsapkota7.com.np/projects',
  description: 'Explore software projects engineered by Dipesh Sapkota (dszae), including Git Visualizer, IOE Admission Guide, and Sportivo.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Git Visualizer',
        url: 'https://www.dipeshsapkota7.com.np/projects/git-visualizer',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'IOE Admission Guide',
        url: 'https://www.dipeshsapkota7.com.np/projects/ioe-admission-guide',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Sportivo',
        url: 'https://www.dipeshsapkota7.com.np/projects/sportivo',
      },
    ],
  },
};

const PROJECTS = [
  {
    title: 'Git Visualizer',
    subtitle: 'Interactive Version Control Visualizer',
    description: 'An interactive, visually-driven learning web application designed to demystify Git version control operations through live data-flow rendering and canvas mapping.',
    badge: 'Developer Tool',
    badgeColor: 'text-amber-600 bg-amber-500/10 border-amber-500/30',
    detailsUrl: '/projects/git-visualizer',
    liveUrl: 'https://git-visualizer.dipeshsapkota7.com.np/',
    githubUrl: 'https://github.com/dszae/git-visualizer',
  },
  {
    title: 'IOE Admission Guide',
    subtitle: 'Tribhuvan University Admission Portal',
    description: 'A comprehensive admission ecosystem for Tribhuvan University engineering applicants, offering rank prediction, procedural counseling guides, automated priority form generation, and cutoff analytics.',
    badge: 'Education & Analytics',
    badgeColor: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/30',
    detailsUrl: '/projects/ioe-admission-guide',
    liveUrl: 'https://ioe-admission.dipeshsapkota7.com.np/',
    githubUrl: 'https://github.com/dszae/ioe-admission-guide',
  },
  {
    title: 'Sportivo',
    subtitle: 'Real-Time Live Sports Streaming Platform',
    description: 'A high-performance live sports web platform engineered with real-time match schedules, instant multi-match search, and client-side multi-server stream switching.',
    badge: 'Web App & Streaming',
    badgeColor: 'text-sky-600 bg-sky-500/10 border-sky-500/30',
    detailsUrl: '/projects/sportivo',
    liveUrl: 'https://sportivo.dipeshsapkota7.com.np/',
    githubUrl: 'https://github.com/dszae/sportivo',
  },
];

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-12">
        <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
          Software & Tools
        </span>
        <h1 className="text-4xl font-bold mb-4">Featured Projects</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          A showcase of full-stack web applications, developer utilities, and educational tools engineered by Dipesh Sapkota.
        </p>
      </header>

      <div className="grid gap-8">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 md:p-8 backdrop-blur transition-all hover:border-sky-500 dark:hover:border-sky-500"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${project.badgeColor}`}>
                {project.badge}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              <Link href={project.detailsUrl} className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                {project.title}
              </Link>
            </h2>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">{project.subtitle}</p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={project.detailsUrl}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
              >
                Project Details
              </Link>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Launch App
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                Source Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
    </>
  );
}

