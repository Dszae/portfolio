import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';

export const metadata = {
  title: "Git Visualizer: Interactive Version Control & DAG Case Study",
  description: "Technical case study of Git Visualizer by Dipesh Sapkota (dszae): interactive HTML5 Canvas engine, directed acyclic graph (DAG) mapping, and visual Git workflows.",
  alternates: { canonical: '/projects/git-visualizer' },
  openGraph: {
    type: 'website',
    title: 'Git Visualizer Case Study by Dipesh Sapkota',
    description: 'An interactive canvas-driven tool for learning Git version control data structures, branches, and commit graphs.',
    url: 'https://www.dipeshsapkota7.com.np/projects/git-visualizer',
    images: [{ url: '/git-preview.jpg', alt: 'Git Visualizer interactive interface preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Git Visualizer Case Study by Dipesh Sapkota',
    description: 'An interactive Git learning tool and DAG canvas engine built by Dipesh Sapkota (dszae).',
    images: ['/git-preview.jpg'],
  },
};

export default function GitVisualizerProjectPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Git Visualizer',
    url: 'https://www.dipeshsapkota7.com.np/projects/git-visualizer',
    description: 'An interactive visual learning tool for Git commands and version-control workflows created by Dipesh Sapkota.',
    applicationCategory: 'DeveloperApplication',
    creator: {
      '@type': 'Person',
      name: 'Dipesh Sapkota',
      url: 'https://www.dipeshsapkota7.com.np/',
    },
    sameAs: 'https://github.com/dszae/git-visualizer',
  };

  return (
    <SiteLayout>
      <main id="main-content" tabIndex={-1} className="w-full max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-24 outline-none">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
            { name: 'Git Visualizer', path: '/projects/git-visualizer' },
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
              Interactive Developer Tools &middot; Graph Theory
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-6">
            Git Visualizer: Interactive Canvas DAG for Version Control
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#334155] dark:text-[#CBD5E1] leading-relaxed max-w-3xl mb-8">
            An interactive pedagogical developer tool designed to eliminate Git confusion by mapping commits, branch pointers, and HEAD movements on a dynamically computed directed acyclic graph (DAG) rendered in real time on an HTML5 canvas.
          </p>

          {/* Quick Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm mb-8 font-mono text-xs">
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Creator</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Dipesh Sapkota (dszae)</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Architecture</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">Directed Acyclic Graph</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Technologies</span>
              <strong className="text-[#0F172A] dark:text-[#F9FAFB]">HTML5 Canvas, JS, CSS</strong>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-[#94A3B8] block mb-1">Status</span>
              <strong className="text-[#065F46] dark:text-[#34D399]">Live Tool &middot; Open Source</strong>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://git-visualizer.dipeshsapkota7.com.np/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Launch Visualizer</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://github.com/dszae/git-visualizer"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] hover:bg-slate-50 dark:hover:bg-[#16221D] font-semibold rounded-xl transition-all text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              <span>GitHub Repository</span>
            </a>

            <a
              href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control"
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
                  <span>https://git-visualizer.dipeshsapkota7.com.np</span>
                </div>
              </div>
            </div>

            {/* High-res Image Preview */}
            <div className="relative aspect-[16/10] w-full bg-black">
              <Image
                src="/git-preview.jpg"
                alt="Git Visualizer canvas showing interactive Git commit DAG nodes, branches, and terminal commands"
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
            <span className="text-[#065F46] dark:text-[#34D399]">#</span> Graph Engine Capabilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                60 FPS
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                HTML5 Canvas Physics
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Smooth frame loop rendering dynamic bezier curves, node pulses, and branch splits without DOM overhead.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                DAG Model
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                True Git Object Representation
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Treats commits as immutable snapshots with hash IDs, branch tags as pointer references, and HEAD as a symref.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] shadow-sm">
              <span className="text-3xl font-extrabold text-[#065F46] dark:text-[#34D399] font-mono block mb-1">
                In-Memory
              </span>
              <h3 className="font-semibold text-sm text-[#0F172A] dark:text-[#F9FAFB] mb-1">
                Command State Machine
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#A7B0BE] leading-relaxed">
                Parses simulated terminal commands (`commit`, `branch`, `checkout`, `merge`) with instant step rollback support.
              </p>
            </div>
          </div>
        </section>

        {/* Deep Architecture Breakdown */}
        <section className="mb-16 space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-4 flex items-center gap-3">
              <span className="text-[#065F46] dark:text-[#34D399]">#</span> Graph Architecture &amp; Mechanics
            </h2>
            <p className="text-sm sm:text-base text-[#334155] dark:text-[#CBD5E1] leading-relaxed mb-6">
              Most newcomers struggle with Git because they imagine files being pushed and pulled rather than a directed acyclic graph of immutable snapshots. Git Visualizer models the exact underlying data structures:
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">01.</span>
                Immutable Commits &amp; Dynamic Branch Pointers
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed mb-3">
                When a user executes <code>git commit</code>, the state machine creates a new commit object containing a pseudo-SHA1 hash, commit message, and an array of parent node IDs.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#475569] dark:text-[#CBD5E1]">
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>Branch As Lightweight Pointers:</strong> The active branch tag (e.g. <code>main</code> or <code>feature</code>) updates its reference pointer to the newly minted commit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                  <span><strong>HEAD Tracker:</strong> The HEAD label smoothly floats and locks onto the active branch pointer, visually explaining detached HEAD states when checked out directly to a hash.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17]">
              <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2 flex items-center gap-2">
                <span className="font-mono text-[#065F46] dark:text-[#34D399] text-sm">02.</span>
                Collision Avoidance &amp; Bezier Branch Topologies
              </h3>
              <p className="text-sm text-[#334155] dark:text-[#A7B0BE] leading-relaxed">
                To prevent branches and merge lines from colliding as the graph grows, the canvas recalculates horizontal and vertical lane coordinates dynamically. Branch divergences use cubic bezier paths to smoothly separate child branches into isolated visual rows, rejoining cleanly during simulated merge commits with dual incoming parent vectors.
              </p>
            </div>
          </div>
        </section>

        {/* Sequential Navigation */}
        <PagePagination
          prev={{ label: 'Case Study: IOE Admission Guide', path: '/projects/ioe-admission-guide' }}
          next={{ label: 'Featured Projects Archive', path: '/projects' }}
        />
      </main>
    </SiteLayout>
  );
}
