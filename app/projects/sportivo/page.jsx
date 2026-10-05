export const metadata = {
  title: "Sportivo Project",
  description: "Explore Sportivo, a real-time live sports streaming platform engineered by Dipesh Sapkota (dszae) featuring match schedule scraping and multi-server stream switching.",
  alternates: { canonical: '/projects/sportivo' },
  openGraph: {
    type: 'website',
    title: 'Sportivo Project by Dipesh Sapkota',
    description: 'A real-time live sports streaming platform engineered by Dipesh Sapkota.',
    url: '/projects/sportivo',
    images: [{ url: '/og-image.webp', width: 640, height: 640, alt: 'Dipesh Sapkota portrait' }],
  },
};

export default function SportivoProjectPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sportivo Live Sports Streaming',
    url: 'https://www.dipeshsapkota7.com.np/projects/sportivo',
    description: 'A real-time live sports streaming platform engineered by Dipesh Sapkota with match schedules, search, and multi-server stream switching.',
    applicationCategory: 'SportsApplication',
    creator: { '@id': 'https://www.dipeshsapkota7.com.np/#person' },
    sameAs: 'https://github.com/dszae/sportivo',
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
        Featured Web App
      </span>
      <h1 className="text-4xl font-bold mb-6">Sportivo: Real-Time Live Sports Streaming Platform</h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        Engineered by <strong>Dipesh Sapkota</strong>, Sportivo is a high-performance live sports streaming application designed to deliver real-time football, cricket, and basketball streams with lightning-fast stream switching and clean user interfaces.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
      <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-700 dark:text-slate-300">
        <li>Real-time match schedule scraping and live tracking.</li>
        <li>Multi-server stream switching for uninterrupted viewing.</li>
        <li>Live team logo thumbnails and dynamic filtering options.</li>
        <li>Direct shareable match links.</li>
      </ul>

      <div className="flex flex-wrap gap-4">
        <a href="https://sportivo.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-500 transition-all">
          Launch Live App
        </a>
        <a href="https://github.com/dszae/sportivo" target="_blank" rel="noreferrer" className="px-6 py-3 border font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          GitHub Repository
        </a>
        <a href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" target="_blank" rel="noreferrer" className="px-6 py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-600 transition-all">
          Read Engineering Article
        </a>
      </div>
    </main>
  );
}
