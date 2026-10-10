import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';

export const metadata = {
  title: "Sportivo: Live Sports Streaming Platform Case Study",
  description: "Technical case study of Sportivo by Dipesh Sapkota (dszae): real-time fixture aggregation, resilient multi-server stream switching, and clean sports UI engineering.",
  alternates: { canonical: '/projects/sportivo' },
  openGraph: {
    type: 'website',
    title: 'Sportivo Case Study by Dipesh Sapkota',
    description: 'A real-time live sports streaming platform engineered by Dipesh Sapkota with resilient multi-server fallback logic.',
    url: 'https://www.dipeshsapkota7.com.np/projects/sportivo',
    images: [{ url: '/sportivo-preview.jpg', alt: 'Sportivo project interface preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sportivo Case Study by Dipesh Sapkota',
    description: 'Explore the architecture and engineering behind Sportivo, built by Dipesh Sapkota (dszae).',
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
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24 outline-none">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: 'Sportivo', path: '/projects/sportivo' },
          ]}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Editorial Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/15 border border-[#065F46]/20 dark:border-[#34D399]/30 rounded-lg">
              Featured Case Study
            </span>
            <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
              Full-Stack System Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
            Sportivo: Real-Time Live Sports Streaming &amp; Schedule Platform
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
            A production web application engineered to aggregate high-definition football, cricket, and basketball fixtures with automated schedule parsing, dynamic CORS-compliant stream proxies, and instant multi-server failover switching.
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm mb-8 font-mono text-xs">
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Role</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Full-Stack Engineer</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Timeline</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Production / 2025</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Tech Stack</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Next.js, Node, Tailwind</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Status</span>
              <strong className="text-[#065F46] dark:text-[#34D399]">Live Application</strong>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://sportivo.dipeshsapkota7.com.np/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Live Application</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://github.com/dszae/sportivo"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] hover:bg-slate-50 dark:hover:bg-[#16221D] font-semibold rounded-xl transition-all text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              <span>GitHub Source</span>
            </a>

            <a
              href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] hover:border-[#065F46] dark:hover:border-[#34D399] font-semibold rounded-xl transition-all text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-2"
            >
              <span>Read Engineering Article</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </a>
          </div>
        </header>

        {/* Visual Showcase: Framed Browser Mockup */}
        <section className="mb-16">
          <div className="rounded-2xl border border-slate-200 dark:border-[#26372F] bg-slate-900 overflow-hidden shadow-2xl">
            {/* Window Chrome Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-950/80 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex-1 max-w-sm mx-auto text-center">
                <div className="px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 truncate flex items-center justify-center gap-1.5">
                  <svg className="w-3 h-3 text-[#34D399]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  <span>https://sportivo.dipeshsapkota7.com.np</span>
                </div>
              </div>
            </div>

            {/* High-res Image Preview */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src="/sportivo-preview.jpg"
                alt="Sportivo live sports streaming interface displaying fixtures, search bar, and stream player"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 980px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* Key Engineering Highlights Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-6 flex items-center gap-3">
            <span className="text-[#065F46] dark:text-[#34D399]">#</span> System Highlights &amp; Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                &lt; 350ms
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Failover Switch Latency
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Client-side video stream switching detects broken HLS feeds and triggers backup servers without unmounting the UI player.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                Multi-Sport
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Automated Fixture Aggregation
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Scrapes and normalizes match schedules across football (EPL, La Liga, UCL), cricket (IPL, T20 World Cup), and basketball (NBA).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                100%
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Direct Shareable URLs
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Unique persistent match links allow fans to share a game directly, deep-linking into specific teams and live streams.
              </p>
            </div>
          </div>
        </section>

        {/* Deep Architecture Breakdown */}
        <section className="mb-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-4 flex items-center gap-3">
              <span className="text-[#065F46] dark:text-[#34D399]">#</span> Architectural Deep Dive
            </h2>
            <p className="text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed mb-6">
              Online streaming aggregators face two persistent challenges: volatile stream health and unstable third-party data providers. Sportivo is built on an isolated, resilient pipeline designed to never crash the user session.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">01.</span>
                Resilient Multi-Server Stream Switching Engine
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed mb-3">
                Live sporting streams often go down unexpectedly due to server overloads. Sportivo attaches multiple verified source endpoints (Server 1, Server 2, Server 3, etc.) to each fixture.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Automatic Heartbeat Detection:</strong> Monitored player playback buffer to detect stalled media streams or 403 Forbidden errors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Seamless Fallback Rotation:</strong> If primary HLS URL errors out, the player automatically promotes the secondary stream without refreshing the browser tab.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">02.</span>
                Automated Background Schedule Scraper &amp; Timezone Normalization
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed mb-3">
                Match schedules change dynamically due to weather or league rescheduling. Sportivo uses a scheduled Node.js extraction service that normalizes kickoff times into standard ISO timestamps.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Local Clock Synchronization:</strong> Automatically converts UTC kickoffs into the viewer&apos;s local timezone (e.g. NPT +5:45 in Nepal).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Live Status Indicator:</strong> Matches are dynamically classified as &apos;Live Now&apos;, &apos;Upcoming&apos;, or &apos;Finished&apos; based on real-time clock thresholds.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">03.</span>
                Mobile-First Responsive Video Experience
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed">
                Many streaming sites fail miserably on mobile viewports due to intrusive overlays and non-responsive video wrappers. Sportivo was engineered with strict 16:9 aspect ratio locking, native touch tap-to-pause gestures, and custom full-screen toggle handling on iOS Safari and Android Chrome.
              </p>
            </div>
          </div>
        </section>

        {/* Sequential Navigation */}
        <PagePagination
          prev={{ label: 'Featured Projects Archive', path: '/projects' }}
          next={{ label: 'Case Study: IOE Admission Guide', path: '/projects/ioe-admission-guide' }}
        />
      </main>
    </SiteLayout>
  );
}
