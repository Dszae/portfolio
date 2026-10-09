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
    url: '/blog',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles by Dipesh Sapkota',
    description: 'Engineering and software development articles written by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32 text-[#111827] dark:text-[#F9FAFB]">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Articles', path: '/blog' }]} />
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">Articles by Dipesh Sapkota</h1>
        <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B0BE] mb-8 leading-relaxed">
          Read my technical articles published on Hashnode covering web engineering, system architecture, and development:
        </p>
        <ul className="space-y-4">
          <li className="p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#047857]/50 dark:hover:border-[#34D399]/50 transition-colors shadow-sm">
            <a href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" target="_blank" rel="noreferrer" className="text-[#047857] dark:text-[#34D399] hover:underline text-lg font-semibold block">
              Building Sportivo: How I Engineered a Real-Time Live Sports Streaming Web App &rarr;
            </a>
          </li>
          <li className="p-5 rounded-2xl border border-[#E2E8F0] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#047857]/50 dark:hover:border-[#34D399]/50 transition-colors shadow-sm">
            <a href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" target="_blank" rel="noreferrer" className="text-[#047857] dark:text-[#34D399] hover:underline text-lg font-semibold block">
              How I Built an Interactive Git Visualizer to Master Version Control &rarr;
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
