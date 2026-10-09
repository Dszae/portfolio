import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: "Git Visualizer Project",
  description: "Learn Git commands visually with Git Visualizer, an interactive developer tool created by Dipesh Sapkota (dszae).",
  alternates: { canonical: '/projects/git-visualizer' },
  openGraph: {
    type: 'website',
    title: 'Git Visualizer by Dipesh Sapkota',
    description: 'An interactive tool for learning Git commands and version-control workflows.',
    url: '/projects/git-visualizer',
    images: [{ url: '/git-preview.jpg', alt: 'Git Visualizer project preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Visualizer by Dipesh Sapkota',
    description: 'An interactive Git learning tool built by Dipesh Sapkota (dszae).',
    images: ['/git-preview.jpg'],
  },
};

export default function GitVisualizerProjectPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Git Visualizer',
    url: 'https://www.dipeshsapkota7.com.np/projects/git-visualizer',
    description: 'An interactive visual learning tool for Git commands and version-control workflows created by Dipesh Sapkota.',
    applicationCategory: 'DeveloperApplication',
    creator: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    sameAs: 'https://github.com/dszae/git-visualizer',
  };

  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32 text-[#111827] dark:text-[#F9FAFB]">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: 'Git Visualizer', path: '/projects/git-visualizer' }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#047857] dark:text-[#34D399] bg-[#047857]/10 dark:bg-[#34D399]/10 border border-[#047857]/20 dark:border-[#34D399]/20 rounded-full mb-4">
          Featured Web App
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Git Visualizer: Interactive Version Control Tool</h1>
        <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B0BE] mb-6 leading-relaxed">
          Created by <strong>Dipesh Sapkota</strong>, Git Visualizer is an interactive, visually-driven learning web application designed to demystify Git version control operations through live data-flow rendering and canvas mapping.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Key Highlights</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-[#475569] dark:text-[#A7B0BE]">
          <li>Interactive hover-driven UI explaining commits, branches, and merges.</li>
          <li>Real-time canvas diagramming of standard Git commands.</li>
          <li>Built for students and developers mastering version control workflows.</li>
        </ul>

        <div className="flex flex-wrap gap-4">
          <a href="https://git-visualizer.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl transition-all shadow-sm">
            Launch Visualizer
          </a>
          <a href="https://github.com/dszae/git-visualizer" target="_blank" rel="noreferrer" aria-label="View the Git Visualizer GitHub repository" className="px-6 py-3 border border-[#E2E8F0] dark:border-[#26352F] bg-[#FFFFFF] dark:bg-[#111B17] font-semibold rounded-xl hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-all">
            GitHub Repository
          </a>
          <a href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" target="_blank" rel="noreferrer" aria-label="Read the article about building the Git Visualizer" className="px-6 py-3 border border-[#E2E8F0] dark:border-[#26352F] hover:border-[#047857] dark:hover:border-[#34D399] font-semibold rounded-xl hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-all">
            Read Engineering Article
          </a>
        </div>
      </main>
    </>
  );
}
