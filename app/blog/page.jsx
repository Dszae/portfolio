import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: "Articles",
  description: "Technical write-ups and engineering articles authored by Dipesh Sapkota (dszae).",
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'Blog & Articles - Dipesh Sapkota',
    description: 'Technical write-ups and engineering articles authored by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/blog',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles by Dipesh Sapkota',
    description: 'Engineering, AI/ML, and intelligent systems articles written by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="max-w-4xl mx-auto px-6 py-32 text-[#111827] dark:text-[#F9FAFB] outline-none">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Articles', path: '/blog' }]} />
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">Articles by Dipesh Sapkota</h1>
        <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] mb-8 leading-relaxed">
          Read my technical write-ups and publications on DEV Community and engineering platforms covering AI/ML, system architecture, and interactive software:
        </p>
        <ul className="space-y-4">
          <li className="p-5 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors shadow-sm">
            <a href="https://dev.to/dszae" target="_blank" rel="me noopener noreferrer" className="text-[#065F46] dark:text-[#34D399] hover:underline text-lg font-semibold block">
              Follow Dipesh Sapkota on DEV Community (@dszae) &rarr;
            </a>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] mt-1">Official DEV Community profile, technical write-ups, AI engineering notes, and community contributions.</p>
          </li>
          <li className="p-5 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors shadow-sm">
            <a href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" target="_blank" rel="noreferrer" className="text-[#065F46] dark:text-[#34D399] hover:underline text-lg font-semibold block">
              Building Sportivo: How I Engineered a Real-Time Live Sports Streaming Web App &rarr;
            </a>
          </li>
          <li className="p-5 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors shadow-sm">
            <a href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" target="_blank" rel="noreferrer" className="text-[#065F46] dark:text-[#34D399] hover:underline text-lg font-semibold block">
              How I Built an Interactive Git Visualizer to Master Version Control &rarr;
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
