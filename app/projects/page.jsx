import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Projects & Engineering Showcase',
  description: 'Explore software projects, web platforms, and engineering instruments built by Dipesh Sapkota (dszae), including Sportivo, IOE Admission Guide, and Git Visualizer.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    title: 'Projects & Engineering Showcase | Dipesh Sapkota',
    description: 'Explore live web applications, developer utilities, and hardware engineering projects by Dipesh Sapkota.',
    url: '/projects',
    images: [{ url: '/sportivo-preview.jpg', width: 993, height: 450, alt: 'Sportivo preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Dipesh Sapkota',
    description: 'Explore software applications and engineering tools engineered by Dipesh Sapkota.',
    images: ['/sportivo-preview.jpg'],
  },
};

const siteUrl = 'https://www.dipeshsapkota7.com.np';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Projects by Dipesh Sapkota',
  url: `${siteUrl}/projects`,
  description: 'Full-stack web applications, developer tools, and engineering prototypes by Dipesh Sapkota.',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Sportivo: Live Sports Streaming',
        url: `${siteUrl}/projects/sportivo`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'IOE Admission Guide & Rank Predictor',
        url: `${siteUrl}/projects/ioe-admission-guide`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Git Visualizer: Interactive Version Control',
        url: `${siteUrl}/projects/git-visualizer`,
      },
    ],
  },
};

const FEATURED_PROJECTS = [
  {
    title: "Sportivo",
    badge: "Featured Web App",
    badgeColor: "text-sky-600 bg-sky-500/10 border-sky-500/30",
    description: "A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.",
    features: [
      "Real-time Football, Cricket & Basketball Streams",
      "Instant Live Match Search & Multi-server Stream Switching",
    ],
    previewImg: "/sportivo-preview.jpg",
    previewUrl: "sportivo.dipeshsapkota7.com.np",
    liveUrl: "https://sportivo.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/sportivo",
    articleUrl: "https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app",
    detailsUrl: "/projects/sportivo",
  },
  {
    title: "IOE Admission Guide",
    badge: "Featured Web App",
    badgeColor: "text-cyan-600 bg-cyan-500/10 border-cyan-500/30",
    description: "A comprehensive admission ecosystem for Tribhuvan University engineering applicants. Beyond predicting ranks, it provides step-by-step procedural counseling guides, automated priority form generation, and detailed cutoff analytics.",
    features: [
      "Step-by-Step IOE Counseling & Document Guides",
      "Statistical Rank Predictor & Priority Form Generator",
    ],
    previewImg: "/ioe-preview.jpg",
    previewUrl: "ioe-admission.dipeshsapkota7.com.np",
    liveUrl: "https://ioe-admission.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/ioe-admission-guide",
    detailsUrl: "/projects/ioe-admission-guide",
  },
  {
    title: "Git Visualizer",
    badge: "Featured Web App",
    badgeColor: "text-amber-600 bg-amber-500/10 border-amber-500/30",
    description: "An interactive, visually driven learning tool designed to demystify Git version control. Features a dynamic data-flow architecture and an interactive canvas for mapping standard Git commands.",
    features: [
      "Interactive Hover-Driven UI",
      "Live Diagramming of Git Operations & Branch Merging",
    ],
    previewImg: "/git-preview.jpg",
    previewUrl: "git-visualizer.dipeshsapkota7.com.np",
    liveUrl: "https://git-visualizer.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/git-visualizer",
    articleUrl: "https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control",
    detailsUrl: "/projects/git-visualizer",
  },
];

const ENGINEERING_PROJECTS = [
  {
    id: 1,
    title: "Astable Multivibrator LED Flasher",
    category: "Hardware",
    description: "Physical breadboard circuit built and simulated using a 555 timer, focusing on frequency control and stable oscillation cycles.",
    tech: ["Circuit Analysis", "Proteus", "555 Timer"],
  },
  {
    id: 2,
    title: "Sports Highlight Reels",
    category: "Creative Media",
    description: "High-impact motion graphics and dynamic video editing showcasing football and futsal moments. Focused on rendering optimization.",
    tech: ["Premiere Pro", "After Effects", "Color Grading"],
  },
  {
    id: 3,
    title: "Electrical Machinery Modeling",
    category: "Engineering",
    description: "Analysis and torque derivations of three-phase induction and DC motors, solving complex phasor circuit networks.",
    tech: ["Mathematics", "Network Analysis", "MATLAB"],
  },
  {
    id: 4,
    title: "Automated Analyzer Diagnostics",
    category: "Instrumentation",
    description: "Troubleshooting procedures for vacuum failures, probe calibrations, and component layouts on advanced immunoassay platforms.",
    tech: ["Medical Tech", "Fluidics", "Diagnostics"],
  },
];

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 py-32">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Projects', path: '/projects' },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
            Software & Engineering Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects Archive</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A showcase of web applications, developer learning utilities, and hardware prototypes engineered by Dipesh Sapkota (dszae).
          </p>
        </header>

        {/* Featured Applications */}
        <section aria-label="Featured Applications" className="space-y-16 mb-20">
          {FEATURED_PROJECTS.map((proj) => (
            <article
              key={proj.title}
              className="p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg hover:border-sky-500 dark:hover:border-sky-500 transition-all duration-500"
            >
              <div className="w-full lg:w-1/2">
                <span className={`inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest rounded-full mb-4 border ${proj.badgeColor}`}>
                  {proj.badge}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">{proj.title}</h2>
                <p className="text-sm sm:text-base mb-6 leading-relaxed text-slate-600 dark:text-slate-300">
                  {proj.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {proj.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm font-semibold">
                      <svg className="w-5 h-5 text-sky-600 dark:text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={proj.detailsUrl}
                    className="px-6 py-3 border border-sky-500/40 text-sky-600 dark:text-sky-400 text-sm font-semibold rounded-xl hover:bg-sky-500/10 transition-all"
                  >
                    Project Details
                  </Link>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
                  >
                    Launch App
                  </a>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                  >
                    Source Code
                  </a>
                  {proj.articleUrl && (
                    <a
                      href={proj.articleUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
                    >
                      Read Article
                    </a>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-lg">
                  <div className="h-10 flex items-center px-4 gap-2 border-b border-slate-800 bg-slate-900">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500/90"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500/90"></div>
                    </div>
                    <div className="mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider bg-slate-950 text-slate-400">
                      {proj.previewUrl}
                    </div>
                  </div>
                  <div className="h-[280px] sm:h-[400px] w-full relative overflow-hidden group">
                    <Image
                      src={proj.previewImg}
                      alt={`${proj.title} Preview`}
                      width={993}
                      height={450}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Engineering & Hardware Grid */}
        <section aria-labelledby="hardware-engineering-heading" className="mb-16">
          <h2 id="hardware-engineering-heading" className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2.5 h-6 bg-sky-500 rounded-full inline-block"></span>
            Hardware, Prototyping & Media Systems
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {ENGINEERING_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:border-sky-500 dark:hover:border-sky-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-block px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold rounded-full uppercase tracking-wider border border-sky-500/20">
                      {proj.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-3">{proj.title}</h3>
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
                    {proj.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  {proj.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-sky-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link href="/skills" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
            Technical Skills
          </Link>
          <Link href="/resume" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Curriculum Vitae
          </Link>
          <Link href="/certificates" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Certifications
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Contact Me
          </Link>
        </div>
      </main>
    </>
  );
}
