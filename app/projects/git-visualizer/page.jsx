export const metadata = {
  title: "Git Visualizer Project",
  description: "Learn Git commands visually with Git Visualizer, an interactive developer tool created by Dipesh Sapkota (dszae).",
  alternates: { canonical: '/projects/git-visualizer' },
  openGraph: {
    type: 'website',
    title: 'Git Visualizer by Dipesh Sapkota',
    description: 'An interactive tool for learning Git commands and version-control workflows.',
    url: '/projects/git-visualizer',
    images: [{ url: '/og-image.webp', width: 640, height: 640, alt: 'Dipesh Sapkota portrait' }],
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
    creator: { '@id': 'https://www.dipeshsapkota7.com.np/#person' },
    sameAs: 'https://github.com/dszae/git-visualizer',
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
        Featured Web App
      </span>
      <h1 className="text-4xl font-bold mb-6">Git Visualizer: Interactive Version Control Tool</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        Created by <strong>Dipesh Sapkota</strong>, Git Visualizer is an interactive, visually-driven learning web application designed to demystify Git version control operations through live data-flow rendering and canvas mapping.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Key Highlights</h2>
      <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-700 dark:text-slate-300">
        <li>Interactive hover-driven UI explaining commits, branches, and merges.</li>
        <li>Real-time canvas diagramming of standard Git commands.</li>
        <li>Built for students and developers mastering version control workflows.</li>
      </ul>

      <div className="flex flex-wrap gap-4">
        <a href="https://git-visualizer.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-500 transition-all">
          Launch Visualizer
        </a>
        <a href="https://github.com/dszae/git-visualizer" target="_blank" rel="noreferrer" className="px-6 py-3 border font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          GitHub Repository
        </a>
        <a href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" target="_blank" rel="noreferrer" className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-600 transition-all">
          Read Engineering Article
        </a>
      </div>
    </main>
  );
}
