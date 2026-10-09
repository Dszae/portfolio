import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: "Experience & Education",
  description: "Experience and education of Dipesh Sapkota, a Computer Engineering student at IOE Thapathali Campus and video editor at Clamphook Academy in Nepal.",
  alternates: { canonical: '/experience' },
  openGraph: {
    type: 'profile',
    title: 'Experience & Education - Dipesh Sapkota',
    description: 'Professional experience and academic background of Dipesh Sapkota at IOE Thapathali Campus and Clamphook Academy.',
    url: '/experience',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Experience & Education - Dipesh Sapkota',
    description: 'Experience and education of Dipesh Sapkota, Computer Engineering student at IOE Thapathali and video editor at Clamphook Academy.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function ExperiencePage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32 text-[#111827] dark:text-[#F9FAFB]">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Experience & Education', path: '/experience' }]} />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E2E8F0] dark:border-[#26352F]">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Experience & Education</h1>
          <Link
            href="/resume"
            className="px-5 py-2.5 bg-[#047857] hover:bg-[#065F46] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <span>View Full Journey</span>
            <span>&rarr;</span>
          </Link>
        </div>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#047857] dark:text-[#34D399] mb-4">Professional Experience</h2>
          <h3 className="text-xl font-bold mb-1">Video Editor & Graphics Designer &bull; Clamphook Academy</h3>
          <p className="text-sm text-[#475569] dark:text-[#A7B0BE] mb-2 font-mono">2026 - Present</p>
          <p className="text-[#475569] dark:text-[#A7B0BE] leading-relaxed">Producing promotional videos and design assets for entrance examination crash courses.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-[#047857] dark:text-[#34D399] mb-4">Education</h2>
          <h3 className="text-xl font-bold mb-1">Bachelor in Computer Engineering &bull; IOE Thapathali Campus</h3>
          <p className="text-sm text-[#475569] dark:text-[#A7B0BE] mb-2 font-mono">2025 - Present | Kathmandu, Nepal</p>
        </section>
      </main>
    </>
  );
}
