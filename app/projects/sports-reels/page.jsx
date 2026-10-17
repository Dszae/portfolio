import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';

export const metadata = {
  title: "Sports Reels & Motion Design: Creative Video Production Case Study",
  description: "Creative production case study of high-energy sports edits, short-form reels, and motion design engineered by Dipesh Sapkota (dszae) using Adobe Premiere Pro, After Effects, and DaVinci Resolve.",
  keywords: ['Sports Reels', 'Video Editing', 'Motion Graphics', 'After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Dipesh Sapkota', 'dszae'],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: '/projects/sports-reels', languages: { 'en-US': '/projects/sports-reels' } },
  openGraph: {
    type: 'article',
    title: 'Sports Reels & Motion Design Case Study | Dipesh Sapkota',
    description: 'High-energy sports edits, kinetic motion typography, and speed-ramp workflows by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/projects/sports-reels',
    images: [{ url: '/instagram-videos.png', width: 1200, height: 630, alt: 'Sports video editing and motion design collection by Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sports Reels & Motion Design | Dipesh Sapkota',
    description: '120fps speed ramping, Rec.709 color grading, and motion graphics workflows by Dipesh Sapkota (dszae).',
    images: ['/instagram-videos.png'],
    creator: '@DszAe18',
  },
};

export default function SportsReelsProjectPage() {
  const jsonLd = [{
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'Sports Reels & Motion Design Collection',
    headline: 'Sports Reels & Motion Design: High-Energy Video Production & Kinetic Workflows',
    description: 'A curated collection and production case study of short-form sports edits, motion graphics, and video storytelling produced by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/projects/sports-reels',
    author: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    creator: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    datePublished: '2024-12-01T00:00:00+05:45',
    dateModified: '2026-10-17T00:00:00+05:45',
    sameAs: 'https://instagram.com/dsz.ae',
  }];

  return (
    <SiteLayout>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: 'Sports Reels & Motion Design', path: '/projects/sports-reels' },
          ]}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Back link */}
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

        {/* Editorial Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/15 border border-[#065F46]/20 dark:border-[#34D399]/30 rounded-lg">
              Creative Production
            </span>
            <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
              Motion Graphics &middot; Speed Ramping &middot; Color Grading
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
            Sports Reels &amp; Motion Design
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
            A comprehensive look at my sports video editing practice: combining high-framerate sports footage, frame-accurate speed ramping, kinetic typography in Adobe After Effects, and filmic color grading in DaVinci Resolve into engaging visual narratives for social audiences.
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm mb-8 font-mono text-xs">
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Editor / Designer</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Dipesh Sapkota</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Tools</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">AE &middot; Premiere &middot; DaVinci</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Aspect Ratios</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">9:16 Vertical &middot; 16:9 Cinema</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Platform</span>
              <a href="https://instagram.com/dsz.ae" target="_blank" rel="noopener noreferrer" className="text-[#065F46] dark:text-[#34D399] font-bold hover:underline">
                @dsz.ae &rarr;
              </a>
            </div>
          </div>
        </header>

        {/* Media Preview Showcase */}
        <section className="mb-14">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#222933] bg-slate-900 shadow-md">
            <Image
              src="/instagram-videos.png"
              alt="Social media video editing and sports reels collection by Dipesh Sapkota"
              width={1200}
              height={630}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="mt-3 text-xs font-mono text-center text-[#64748B] dark:text-[#94A3B8]">
            Curated selection of short-form motion reels and sports edits produced by Dipesh Sapkota.
          </p>
        </section>

        {/* Editorial Body Content */}
        <article className="space-y-12 text-[#1E293B] dark:text-[#CBD5E1] text-base sm:text-lg leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
              1. The Philosophy of High-Energy Sports Editing
            </h2>
            <p>
              Sports editing is unique because the narrative unfolds at superhuman speeds. A single split-second play — a football striker striking top bins, a cricketer executing a cover drive, or a basketball fastbreak — contains immense drama. My goal is to capture that physical energy and translate it into a visceral viewing experience.
            </p>
            <p>
              Rather than simply stitching clips together, I design each reel as a rhythmic composition where every cut aligns with percussive beats, bass drops, or tension-building risers in the soundtrack.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
              2. Technical Workflow: Speed Ramping &amp; Optical Flow
            </h2>
            <p>
              The hallmark of dynamic sports edits is seamless speed ramping. Using 120 FPS high-framerate captures:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-[#475569] dark:text-[#94A3B8]">
              <li>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Bézier Velocity Curves:</strong> Rather than abrupt linear cuts, I shape smooth S-curves in Premiere Pro and After Effects, slowing down to 20% speed at the exact point of ball contact, then ramping up to 300% to propel the camera into the next action.
              </li>
              <li>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Optical Flow Interpolation:</strong> For frames that need dramatic ultra-slow motion, I apply vector optical flow analysis to synthesize intermediate sub-frames without stutter or ghosting.
              </li>
              <li>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Motion Blur Integration:</strong> Directional RSMB (ReelSmart Motion Blur) ensures that high-speed transitions maintain natural filmic continuity.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
              3. Color Grading &amp; Film Emulation
            </h2>
            <p>
              Raw broadcast footage is often flat or inconsistently lit across different stadiums. In DaVinci Resolve and Premiere Lumetri Color:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-[#475569] dark:text-[#94A3B8]">
              <li>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Rec.709 Space Conversion:</strong> Standardizing color temperature and exposure profiles across multi-camera sources.
              </li>
              <li>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Filmic Contrast Curves:</strong> Deepening mid-tone contrast while maintaining soft highlight roll-offs on stadium floodlights.
              </li>
              <li>
                <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Subject Isolation:</strong> Power windows and subtle vignette masking guide the viewer&apos;s eye directly to the player in motion.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
              4. Sound Design &amp; -14 LUFS Audio Normalization
            </h2>
            <p>
              Visual impact is incomplete without auditory weight. For every edit, I layer a multitrack soundscape:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-[#475569] dark:text-[#94A3B8]">
              <li><strong className="text-[#0F172A] dark:text-[#F9FAFB]">Stadium Foley:</strong> Crowd murmurs, ball impacts, sneaker squeaks, and referee whistles.</li>
              <li><strong className="text-[#0F172A] dark:text-[#F9FAFB]">Cinematic Impacts:</strong> Low-end sub booms and high-frequency whooshes that punctuate speed ramp transitions.</li>
              <li><strong className="text-[#0F172A] dark:text-[#F9FAFB]">Broadcast Standards:</strong> Master bus compression normalized to -14 LUFS integrated loudness with -1.0 dB true peak ceiling for optimal mobile playback without clipping.</li>
            </ul>
          </section>

          {/* Action Callout */}
          <section className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Explore Video Portfolio &amp; Motion Edits
              </h3>
              <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
                Watch full reels, breakdowns, and creative edits on my Instagram channel or explore gallery photo archives.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="https://instagram.com/dsz.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-center text-sm font-semibold bg-[#065F46] text-white hover:bg-[#065F46]/90 dark:bg-[#34D399] dark:text-slate-950 dark:hover:bg-[#34D399]/90 transition-colors shadow-sm"
              >
                Instagram @dsz.ae &rarr;
              </a>
              <Link
                href="/gallery"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-center text-sm font-semibold border border-slate-200 dark:border-[#222933] text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-[#181D24] transition-colors"
              >
                Photo Gallery
              </Link>
            </div>
          </section>
        </article>

        {/* Navigation Pagination */}
        <div className="mt-16">
          <PagePagination
            prev={{ label: 'IOE Admission Guide', path: '/projects/ioe-admission-guide' }}
            next={{ label: 'NE555 Multivibrator Flasher', path: '/projects/555-flasher' }}
          />
        </div>
      </div>
    </SiteLayout>
  );
}
