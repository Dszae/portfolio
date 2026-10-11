import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';

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
    creator: '@DszAe18',
    site: '@DszAe18',
  },
};

export default function BlogPage() {
  return (
    <SiteLayout>
      <div className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Articles', path: '/blog' }]} />
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
            <span className="text-[#065F46] dark:text-[#34D399]">/</span> Articles &amp; Write-Ups
          </h1>
          <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] mb-10 leading-relaxed max-w-2xl">
            In-depth engineering articles, architectural case studies, and technical write-ups covering AI/ML, distributed systems, and modern web applications.
          </p>

          <ul className="space-y-6">
            {/* DEV Community Featured Publication */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  DEV Community
                </span>
                <span className="card-meta">@dszae</span>
              </div>
              <a 
                href="https://dev.to/dszae" 
                target="_blank" 
                rel="me noopener noreferrer" 
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Dipesh Sapkota on DEV Community &rarr;
              </a>
              <p className="card-description">
                Follow technical notes, AI/ML engineering insights, and practical developer tutorials on my official DEV Community author profile.
              </p>
            </li>

            {/* Sportivo Engineering Deep Dive */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Technical Architecture
                </span>
                <span className="card-meta">Full Case Study</span>
              </div>
              <Link 
                href="/projects/sportivo" 
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                Building Sportivo: Engineering a Real-Time Live Sports Streaming Web App &rarr;
              </Link>
              <p className="card-description">
                Comprehensive technical case study documenting multi-server stream switching, headless DOM parsing, schedule synchronization, and resilient fallback handling.
              </p>
            </li>

            {/* Git Visualizer Technical Article */}
            <li className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="card-category-label">
                  Data Structures &amp; DAG
                </span>
                <span className="card-meta">Interactive Canvas</span>
              </div>
              <Link 
                href="/projects/git-visualizer" 
                className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
              >
                How I Built an Interactive Git Visualizer to Master Version Control &rarr;
              </Link>
              <p className="card-description">
                Deep dive into graph theory, directed acyclic graphs (DAG), Canvas rendering performance, and interactive state models for version control pedagogy.
              </p>
            </li>
          </ul>

          <PagePagination
            prev={{ label: 'Featured Projects', path: '/projects' }}
            next={{ label: 'Certificates & Credentials', path: '/certificates' }}
          />
        </div>
      </div>
    </SiteLayout>
  );
}
