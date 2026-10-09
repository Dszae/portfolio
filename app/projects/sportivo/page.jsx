import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: "Sportivo Project",
  description: "Explore Sportivo, a live sports platform by Dipesh Sapkota (dszae), with real-time schedules, match search, and multi-server streaming.",
  alternates: { canonical: '/projects/sportivo' },
  openGraph: {
    type: 'website',
    title: 'Sportivo Project by Dipesh Sapkota',
    description: 'A real-time live sports streaming platform engineered by Dipesh Sapkota.',
    url: '/projects/sportivo',
    images: [{ url: '/sportivo-preview.jpg', alt: 'Sportivo project preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sportivo Project by Dipesh Sapkota',
    description: 'Explore Sportivo, a live sports platform engineered by Dipesh Sapkota (dszae).',
    images: ['/sportivo-preview.jpg'],
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
    creator: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    sameAs: 'https://github.com/dszae/sportivo',
  };

  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32 text-[#111827] dark:text-[#F9FAFB]">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }, { name: 'Sportivo', path: '/projects/sportivo' }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#047857] dark:text-[#34D399] bg-[#047857]/10 dark:bg-[#34D399]/10 border border-[#047857]/20 dark:border-[#34D399]/20 rounded-full mb-4">
          Featured Web App
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Sportivo: Real-Time Live Sports Streaming Platform</h1>
        <p className="text-base sm:text-lg text-[#334155] dark:text-[#A7B0BE] mb-6 leading-relaxed">
          Engineered by <strong>Dipesh Sapkota</strong>, Sportivo is a high-performance live sports streaming application designed to deliver real-time football, cricket, and basketball streams with lightning-fast stream switching and clean user interfaces.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8 text-[#334155] dark:text-[#A7B0BE]">
          <li>Real-time match schedule scraping and live tracking.</li>
          <li>Multi-server stream switching for uninterrupted viewing.</li>
          <li>Live team logo thumbnails and dynamic filtering options.</li>
          <li>Direct shareable match links.</li>
        </ul>

        <div className="flex flex-wrap gap-4">
          <a href="https://sportivo.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl transition-all shadow-sm">
            Launch Live App
          </a>
          <a href="https://github.com/dszae/sportivo" target="_blank" rel="noreferrer" aria-label="View the Sportivo GitHub repository" className="px-6 py-3 border border-[#E2E8F0] dark:border-[#26352F] bg-[#FFFFFF] dark:bg-[#111B17] font-semibold rounded-xl hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-all">
            GitHub Repository
          </a>
          <a href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" target="_blank" rel="noreferrer" aria-label="Read the article about building Sportivo" className="px-6 py-3 border border-[#E2E8F0] dark:border-[#26352F] hover:border-[#047857] dark:hover:border-[#34D399] font-semibold rounded-xl hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-all">
            Read Engineering Article
          </a>
        </div>
      </main>
    </>
  );
}
