import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';

export const metadata = {
  title: "IOE Admission Guide: Engineering Entrance & Rank Predictor",
  description: "Technical case study of the IOE Admission Guide by Dipesh Sapkota (dszae): historical rank cutoff modeling, multi-campus counseling algorithms, and automated priority sheets.",
  alternates: { canonical: '/projects/ioe-admission-guide' },
  openGraph: {
    type: 'website',
    title: 'IOE Admission Guide by Dipesh Sapkota',
    description: 'Engineering entrance rank prediction, historical cutoff analytics, and counseling workflows for Tribhuvan University applicants.',
    url: 'https://www.dipeshsapkota7.com.np/projects/ioe-admission-guide',
    images: [{ url: '/ioe-preview.jpg', alt: 'IOE Admission Guide interface preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IOE Admission Guide by Dipesh Sapkota',
    description: 'Engineering admission tools created by Dipesh Sapkota, including rank prediction, cutoff analytics, and counseling workflows.',
    images: ['/ioe-preview.jpg'],
  },
};

export default function IoeAdmissionProjectPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'IOE Entrance Preparation Portal',
    url: 'https://www.dipeshsapkota7.com.np/projects/ioe-admission-guide',
    description: 'An engineering admission portal built by Dipesh Sapkota with rank prediction, cutoff analytics, and counseling tools.',
    applicationCategory: 'EducationalApplication',
    creator: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    sameAs: 'https://github.com/dszae/ioe-admission-guide',
  };

  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24 outline-none">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: 'IOE Admission Guide', path: '/projects/ioe-admission-guide' },
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
              Data Analytics &amp; Decision Systems
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
            IOE Admission Guide &amp; Statistical Rank Predictor
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
            A comprehensive counseling web portal developed for Tribhuvan University Institute of Engineering applicants, evaluating five consecutive years of cutoff rankings to deliver predictive campus feasibility, quota modeling, and automated choice prioritization.
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm mb-8 font-mono text-xs">
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Author</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Dipesh Sapkota (IOE)</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Target Campus</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">TU IOE Campuses</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Tech Stack</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">React, Analytics, Tailwind</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Availability</span>
              <strong className="text-[#065F46] dark:text-[#34D399]">Live Production</strong>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://ioe-admission.dipeshsapkota7.com.np/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Live Guide App</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://github.com/dszae/ioe-admission-guide"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] hover:bg-slate-50 dark:hover:bg-[#16221D] font-semibold rounded-xl transition-all text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              <span>GitHub Repository</span>
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
                  <span>https://ioe-admission.dipeshsapkota7.com.np</span>
                </div>
              </div>
            </div>

            {/* High-res Image Preview */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src="/ioe-preview.jpg"
                alt="IOE Admission Guide interface showing rank predictor, campus selection, and cutoff analytics"
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
            <span className="text-[#065F46] dark:text-[#34D399]">#</span> Core Modules &amp; Scope
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                5 Years
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Historical Cutoff Datasets
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Ingested official admission merit lists across five academic sessions to derive realistic percentile confidence intervals.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                4 Campuses
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Constituent Campus Coverage
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Full quota analytics for Pulchowk Campus, Thapathali Campus, Paschimanchal Campus (WRC), and Purwanchal Campus (ERC).
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                Zero Setup
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                100% Client-Side Evaluation
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Executes all percentile calculations instantly in the browser without requiring account creation or personal data collection.
              </p>
            </div>
          </div>
        </section>

        {/* Deep Architecture Breakdown */}
        <section className="mb-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-4 flex items-center gap-3">
              <span className="text-[#065F46] dark:text-[#34D399]">#</span> Algorithmic Architecture
            </h2>
            <p className="text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed mb-6">
              Engineering entrance counseling in Nepal involves intricate shifting cutoff lines across regular (subsidized) and full-fee seats. The guide simplifies this via three decoupled processing layers:
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">01.</span>
                Rank Percentile Feasibility Estimator
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed mb-3">
                Given an applicant&apos;s entrance score or projected rank, the engine maps against multi-year historical distributions:
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>High Likelihood (Green):</strong> Projected rank consistently falls inside the 1st and 2nd admission lists across all previous batches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Borderline Threshold (Amber):</strong> Projected rank reaches the 3rd or 4th supplementary rounds depending on seat cancellations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Reach Target (Slate):</strong> Cutoff historically exceeds the score, suggesting alternative campus or discipline selections.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">02.</span>
                Automated Priority Form Builder &amp; Checklist
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed">
                Many students forfeit seats because of improper priority form ordering. The system guides students through an interactive ranking matrix, allowing them to reorder choices with drag/click controls and exporting a clean, verified priority sheet with necessary document submission checklists.
              </p>
            </div>
          </div>
        </section>

        {/* Sequential Navigation */}
        <PagePagination
          prev={{ label: 'Case Study: Sportivo', path: '/projects/sportivo' }}
          next={{ label: 'Case Study: Git Visualizer', path: '/projects/git-visualizer' }}
        />
      </main>
    </SiteLayout>
  );
}
