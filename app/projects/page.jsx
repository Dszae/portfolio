"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

const ALL_PROJECTS = [
  {
    id: "sportivo",
    title: "Sportivo",
    category: "dev",
    categoryLabel: "Development",
    type: "Featured Web App",
    description: "A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.",
    featured: true,
    image: "/sportivo-preview.jpg",
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://sportivo.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/sportivo",
    articleUrl: "https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app",
    detailUrl: "/projects/sportivo"
  },
  {
    id: "ioe-admission",
    title: "IOE Admission Guide",
    category: "dev",
    categoryLabel: "Development",
    type: "Featured Web App",
    description: "A comprehensive admission ecosystem for Tribhuvan University engineering applicants, offering statistical rank prediction, procedural counseling checklists, and automated priority form generation.",
    featured: true,
    image: "/ioe-preview.jpg",
    tech: ["JavaScript", "React", "Data Analytics", "Tailwind CSS"],
    liveUrl: "https://ioe-admission.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/ioe-admission-guide",
    detailUrl: "/projects/ioe-admission-guide"
  },
  {
    id: "git-visualizer",
    title: "Git Visualizer",
    category: "dev",
    categoryLabel: "Development",
    type: "Interactive Tool",
    description: "An interactive, visually driven learning tool designed to demystify Git version control operations through live data-flow rendering and canvas mapping of branching, commits, and merges.",
    featured: true,
    image: "/git-preview.jpg",
    tech: ["HTML5 Canvas", "JavaScript", "UI/UX Design", "CSS3"],
    liveUrl: "https://git-visualizer.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/git-visualizer",
    articleUrl: "https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control",
    detailUrl: "/projects/git-visualizer"
  },
  {
    id: "555-flasher",
    title: "Astable Multivibrator LED Flasher",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Hardware Prototype",
    description: "Physical breadboard circuit built and simulated using a 555 timer IC, calculating RC time constants for frequency control and stable square-wave oscillation cycles.",
    featured: false,
    tech: ["555 Timer IC", "Circuit Analysis", "Proteus Suite", "Breadboarding"]
  },
  {
    id: "sports-reels",
    title: "Sports Highlight Motion Reels",
    category: "media",
    categoryLabel: "Creative Media",
    type: "Motion Graphics & Video Editing",
    description: "High-impact dynamic sports video editing showcasing football and futsal highlights. Features audio-visual rhythm synchronization, speed ramps, and custom color grading.",
    featured: false,
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design"]
  },
  {
    id: "motor-modeling",
    title: "Electrical Machinery Modeling",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Engineering Analysis",
    description: "Torque derivations and equivalent circuit analysis of three-phase induction and DC motors, solving complex phasor networks and performance characteristics.",
    featured: false,
    tech: ["Electrical Engineering", "Phasor Calculus", "Motor Analysis"]
  },
  {
    id: "analyzer-diag",
    title: "Automated Analyzer Diagnostics",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Instrumentation Engineering",
    description: "Troubleshooting procedures for vacuum pressure systems, syringe probe calibrations, and electromechanical component layouts on medical immunoassay instruments.",
    featured: false,
    tech: ["Biomedical Tech", "Fluidics", "Calibration Systems"]
  }
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  const filtered = ALL_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]} />

          <FadeUp>
            <section id="projects" className={`pt-32 pb-24 px-6 sm:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-4">
                      <span className="text-[#047857] dark:text-[#34D399]">/</span> Projects Archive
                    </h1>
                    <p className={`mt-2 text-base ${theme.muted}`}>Full collection of engineering software, interactive tools, hardware simulations, and media.</p>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-[#E2E8F0] dark:border-[#26352F] bg-[#FFFFFF] dark:bg-[#111B17] self-start md:self-auto" role="tablist" aria-label="Project category filter">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'all'}
                      onClick={() => setFilter('all')}
                      className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                        filter === 'all'
                          ? 'bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                          : 'text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399]'
                      }`}
                    >
                      All ({ALL_PROJECTS.length})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'dev'}
                      onClick={() => setFilter('dev')}
                      className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                        filter === 'dev'
                          ? 'bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                          : 'text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399]'
                      }`}
                    >
                      Development
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'media'}
                      onClick={() => setFilter('media')}
                      className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                        filter === 'media'
                          ? 'bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                          : 'text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399]'
                      }`}
                    >
                      Creative Media
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'exp'}
                      onClick={() => setFilter('exp')}
                      className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                        filter === 'exp'
                          ? 'bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                          : 'text-[#475569] dark:text-[#A7B0BE] hover:text-[#047857] dark:hover:text-[#34D399]'
                      }`}
                    >
                      Experiments
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((proj) => (
                    <div
                      key={proj.id}
                      className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${theme.card} hover:-translate-y-1.5`}
                    >
                      <div>
                        {proj.image && (
                          <div className={`w-full h-44 mb-5 rounded-xl overflow-hidden border border-[#E2E8F0] dark:border-[#26352F] relative group bg-[#111B17]`}>
                            <Image
                              src={proj.image}
                              alt={`${proj.title} Preview`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-md bg-[#047857]/10 dark:bg-[#34D399]/10 text-[#047857] dark:text-[#34D399] border border-[#047857]/20 dark:border-[#34D399]/20">
                            {proj.categoryLabel}
                          </span>
                          <span className={`text-[11px] font-mono ${theme.muted}`}>{proj.type}</span>
                        </div>

                        <h2 className="text-xl font-bold mb-2.5 text-[#111827] dark:text-[#F9FAFB]">{proj.title}</h2>
                        <p className={`text-sm leading-relaxed mb-5 ${theme.muted}`}>{proj.description}</p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.tech.map((t) => (
                            <span key={t} className={`px-2.5 py-1 text-[11px] font-mono rounded-md ${theme.tag}`}>
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 pt-3 border-t border-[#E2E8F0] dark:border-[#26352F] flex-wrap">
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] hover:bg-[#065F46] dark:hover:bg-[#6EE7B7] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <span>Live App</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                          )}

                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#E2E8F0] dark:border-[#26352F] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-all flex items-center gap-1"
                            >
                              <span>Code</span>
                            </a>
                          )}

                          {proj.detailUrl && (
                            <Link
                              href={proj.detailUrl}
                              className="px-3 py-1.5 text-xs font-semibold rounded-lg text-[#047857] dark:text-[#34D399] hover:underline transition-all ml-auto font-mono"
                            >
                              Details &rarr;
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
