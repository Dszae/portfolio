import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import HoverVideo from '@/components/HoverVideo';

export const metadata = {
  title: "Sportivo — Live Scores, Fixtures & Sports News",
  description: "Sportivo is a focused real-time sports platform that brings live scores, upcoming fixtures, match discovery, and sports news into one responsive experience. Built by Dipesh Sapkota, it is designed to help football, cricket, and basketball fans scan updates quickly and move naturally from match information to available streams.",
  keywords: ['Sportivo', 'live sports scores', 'football fixtures', 'cricket fixtures', 'basketball fixtures', 'Dipesh Sapkota'],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: '/projects/sportivo', languages: { 'en-US': '/projects/sportivo' } },
  openGraph: {
    type: 'website',
    title: 'Sportivo — Live Scores, Fixtures & Sports News | Dipesh Sapkota',
    description: 'Sportivo is a focused real-time sports platform that brings live scores, upcoming fixtures, match discovery, and sports news into one responsive experience for football, cricket, and basketball fans.',
    url: 'https://www.dipeshsapkota7.com.np/projects/sportivo',
    images: [{ url: '/sportivo-preview.jpg', width: 993, height: 450, alt: 'Sportivo live sports platform preview by Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sportivo — Live Scores, Fixtures & Sports News | Dipesh Sapkota',
    description: 'Explore Sportivo, a sports platform built by Dipesh Sapkota.',
    images: ['/sportivo-preview.jpg'],
    creator: '@DszAe18',
  },
};

export default function SportivoProjectPage() {
  const jsonLd = [{
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Sportivo',
    url: 'https://sportivo.dipeshsapkota7.com.np/',
    description: 'Sportivo is a sports platform built by Dipesh Sapkota for live scores, fixtures, and sports news.',
    applicationCategory: 'SportsApplication',
    operatingSystem: 'Any modern browser (Web Application)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Person',
      '@id': 'https://www.dipeshsapkota7.com.np/#author',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
      identifier: 'https://orcid.org/0009-0001-7595-5114',
      sameAs: [
        'https://orcid.org/0009-0001-7595-5114',
        'https://www.wikidata.org/wiki/Q141595522',
        'https://github.com/dszae',
        'https://linkedin.com/in/dszae',
      ],
    },
    creator: {
      '@type': 'Person',
      '@id': 'https://www.dipeshsapkota7.com.np/#author',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
      identifier: 'https://orcid.org/0009-0001-7595-5114',
      sameAs: [
        'https://orcid.org/0009-0001-7595-5114',
        'https://www.wikidata.org/wiki/Q141595522',
        'https://github.com/dszae',
        'https://linkedin.com/in/dszae',
      ],
    },
    sameAs: [
      'https://sportivo.dipeshsapkota7.com.np/',
      'https://github.com/dszae/sportivo',
    ],
  }, {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: 'Sportivo Live Sports Platform Demo | Dipesh Sapkota',
    description: 'A product demonstration of Sportivo, a live sports platform created by Dipesh Sapkota for scores, fixtures, match discovery, and sports news.',
    thumbnailUrl: 'https://www.dipeshsapkota7.com.np/sportivo-first-frame.jpg',
    contentUrl: 'https://www.dipeshsapkota7.com.np/sportivo-launch.mp4',
    embedUrl: 'https://www.youtube-nocookie.com/embed/rfxeT_Dl7pE',
    sameAs: 'https://www.youtube.com/watch?v=rfxeT_Dl7pE',
    uploadDate: '2026-10-12T00:00:00+05:45',
    author: { 
      '@type': 'Person', 
      '@id': 'https://www.dipeshsapkota7.com.np/#author',
      name: 'Dipesh Sapkota', 
      url: 'https://www.dipeshsapkota7.com.np/',
      identifier: 'https://orcid.org/0009-0001-7595-5114' 
    },
    publisher: { 
      '@type': 'Person', 
      '@id': 'https://www.dipeshsapkota7.com.np/#author',
      name: 'Dipesh Sapkota', 
      url: 'https://www.dipeshsapkota7.com.np/' 
    },
    inLanguage: 'en',
    isFamilyFriendly: true,
  }];

  return (
    <SiteLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-36 sm:pt-40 subpage-container pb-24">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: 'Sportivo', path: '/projects/sportivo' },
          ]}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

<div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Projects</span>
          </Link>
        </div>

<header className="mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/15 border border-[#065F46]/20 dark:border-[#34D399]/30 rounded-lg">
              Featured Case Study
            </span>
            <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
              Independent Sports Platform
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
            Sportivo — Live Scores, Fixtures &amp; Sports News
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
            I built Sportivo as a focused real-time sports platform for live scores, upcoming fixtures, match discovery, and sports news in one responsive experience. I structured it for fast scanning across football, cricket, and basketball, helping visitors move from a quick match update to deeper fixture information and available streams without unnecessary friction.
          </p>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm mb-8 font-mono text-xs">
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Role</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Creator</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Timeline</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Independent project</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Tech Stack</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Web platform</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Status</span>
              <strong className="text-[#065F46] dark:text-[#34D399]">Live site</strong>
            </div>
          </div>

<div className="flex flex-wrap items-center gap-3">
            <a
              href="https://sportivo.dipeshsapkota7.com.np/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#090B0E] font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Visit Sportivo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://github.com/dszae/sportivo"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:bg-slate-50 dark:hover:bg-[#181D24] font-semibold rounded-xl transition-all text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              <span>GitHub Source</span>
            </a>

            <a
              href="https://dev.to/dszae"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46] dark:hover:border-[#34D399] font-semibold rounded-xl transition-all text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-2"
            >
              <span>Read on DEV Community</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </header>

<section className="mb-16">
          <div className="rounded-2xl border border-slate-200 dark:border-[#222933] bg-slate-900 overflow-hidden shadow-2xl">
            
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex-1 max-w-sm mx-auto text-center">
                <div className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 truncate flex items-center justify-center gap-1.5">
                  <svg className="w-3 h-3 text-[#34D399]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  <span>https://sportivo.dipeshsapkota7.com.np</span>
                </div>
              </div>
            </div>

<div className="relative aspect-[16/10] w-full bg-black">
              <HoverVideo
                className="h-full w-full object-contain"
                controls
                playsInline
                preload="metadata"
                poster="/sportivo-first-frame.jpg"
                aria-label="Sportivo product launch demonstration"
              >
                <source src="/sportivo-launch.mp4" type="video/mp4" />
                Your browser does not support embedded video.
              </HoverVideo>
            </div>
          </div>
        </section>

<section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-6 flex items-center gap-3">
            <span className="text-[#065F46] dark:text-[#34D399]">#</span> Sportivo Highlights
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                Live scores
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Score-focused browsing
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Sportivo gives visitors a dedicated place to follow current sports score information.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                Fixtures
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Match schedules
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Browse upcoming fixtures and keep sports schedules close to the live scores experience.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                Sports news
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                A broader sports view
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                The platform combines sports news with scores and fixtures in one web destination.
              </p>
            </div>
          </div>
        </section>

<section className="mb-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-4 flex items-center gap-3">
              <span className="text-[#065F46] dark:text-[#34D399]">#</span> About Sportivo
            </h2>
            <p className="text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed mb-6">
              Sportivo is my independent sports platform. I bring live scores, fixtures, and sports news together in a responsive interface for people who want a focused sports destination.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">01.</span>
                Live scores
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed mb-3">
                The live scores area is one of Sportivo&apos;s central project experiences.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Clear focus:</strong> Score information is presented as a primary part of the sports platform.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Accessible destination:</strong> Visitors can open the live Sportivo platform directly from this portfolio.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">02.</span>
                Fixtures and sports news
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed mb-3">
                Fixtures and sports news complement the live scores experience and give the project its broader sports focus.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>One connected platform:</strong> Scores, fixtures, and news are presented as related parts of Sportivo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Built by me:</strong> Sportivo is part of my independent software portfolio.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">03.</span>
                Responsive web experience
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed">
                Sportivo is presented as a responsive web platform and can be explored from the live site on desktop and mobile devices.
              </p>
            </div>
          </div>
        </section>

<PagePagination
          prev={{ label: 'Featured Projects Archive', path: '/projects' }}
          next={{ label: 'Case Study: IOE Admission Guide', path: '/projects/ioe-admission-guide' }}
        />
      </div>
    </SiteLayout>
  );
}
