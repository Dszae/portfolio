"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ScrollPreviewImage from './ScrollPreviewImage';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

function MotionReelsGraphic() {
  return (
    <div className="relative aspect-[16/10] w-full bg-[#090B0E] text-slate-200 overflow-hidden select-none font-mono flex flex-col justify-between p-4 sm:p-5 border border-slate-200 dark:border-[#222933] rounded-xl">
      {/* Top Monitor Status Bar */}
      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#222933]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-bold text-red-400">REC · 4K UHD</span>
        </div>
        <div className="text-slate-400 font-medium hidden sm:block">120 FPS · OPTICAL FLOW</div>
        <div className="text-[#34D399] font-bold">00:01:24:18</div>
      </div>

      {/* Main Center Video Grading Scope & Motion Path Canvas */}
      <div className="relative my-auto py-3 flex flex-col items-center justify-center">
        <div className="w-full relative h-20 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" fill="none" aria-hidden="true" focusable="false">
            <line x1="0" y1="20" x2="300" y2="20" stroke="#1E293B" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="#1E293B" strokeDasharray="3 3" />
            <path 
              d="M 10 65 Q 70 65 95 35 T 160 15 T 225 35 Q 250 65 290 65" 
              stroke="#34D399" 
              strokeWidth="2.5" 
              fill="none" 
            />
            <circle cx="95" cy="35" r="4" fill="#34D399" />
            <circle cx="160" cy="15" r="4.5" fill="#FFFFFF" stroke="#34D399" strokeWidth="2" />
            <circle cx="225" cy="35" r="4" fill="#34D399" />
          </svg>
          <div className="absolute top-0 text-[10px] bg-[#181D24] border border-[#34D399]/40 text-[#34D399] px-2 py-0.5 rounded shadow">
            Speed Ramp · 120fps (20% Speed)
          </div>
        </div>

        <div className="flex items-center justify-between w-full text-[10px] text-slate-400 mt-2 px-1">
          <span className="flex items-center gap-1.5">
            <span className="text-[#34D399]">LUT:</span> Rec.709 Film Curve
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#34D399]">AUDIO:</span> -14 LUFS Normalized
          </span>
        </div>
      </div>

      {/* Bottom DAW / NLE Multitrack Timeline */}
      <div className="space-y-1.5 pt-2 border-t border-[#222933] text-[10px]">
        <div className="flex items-center gap-2">
          <span className="w-6 text-slate-400 font-semibold">V1</span>
          <div className="flex-1 h-4 rounded bg-[#181D24] border border-[#34D399]/30 flex items-center px-2 text-[#34D399] font-medium overflow-hidden">
            <span>Main Footage (4K 120fps Capture)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-6 text-slate-400 font-semibold">A1</span>
          <div className="flex-1 h-4 rounded bg-[#13171D] border border-[#222933] flex items-center px-2 gap-1 overflow-hidden">
            <span className="text-slate-400">Stadium Ambience &amp; Sound FX</span>
            <div className="ml-auto flex items-center gap-0.5 opacity-70">
              <span className="w-0.5 h-2 bg-[#34D399]"></span>
              <span className="w-0.5 h-3 bg-[#34D399]"></span>
              <span className="w-0.5 h-1.5 bg-[#34D399]"></span>
              <span className="w-0.5 h-2.5 bg-[#34D399]"></span>
              <span className="w-0.5 h-1 bg-[#34D399]"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsClientView({ initialProjects = [], jsonLd = null }) {
  const [filter, setFilter] = useState('all');

  // Normalize project attributes
  const normalizedProjects = initialProjects.map((p) => {
    const slug = p.slug || p.id?.toString() || '';
    const image = p.image || p.img || '';
    const tech = Array.isArray(p.tech) ? p.tech : (typeof p.tech === 'string' ? p.tech.split(',').map(s => s.trim()) : []);
    const liveUrl = p.liveUrl || p.live_url || '';
    const githubUrl = p.githubUrl || p.github_url || '';
    const detailUrl = p.detailUrl || (slug && !slug.startsWith('http') ? (slug.startsWith('/') ? slug : `/projects/${slug}`) : '');
    const isFeatured = p.featured === true || p.label === 'Featured Project' || p.label === 'Featured Work' || ['sportivo', 'git-visualizer', 'ioe-admission-guide', 'ioe-admission', 'sports-reels', 'social-media'].includes(slug);
    const category = p.category || 'dev';
    const categoryLabel = p.categoryLabel || p.category_label || (category === 'dev' ? 'Development' : category === 'media' ? 'Creative Media' : 'Experiments');

    return {
      ...p,
      slug,
      image,
      tech,
      liveUrl,
      githubUrl,
      detailUrl,
      isFeatured,
      category,
      categoryLabel
    };
  });

  const featuredProjects = normalizedProjects.filter(p => p.isFeatured);
  const noteworthyProjects = normalizedProjects.filter(p => !p.isFeatured);

  const filteredFeatured = featuredProjects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const filteredNoteworthy = noteworthyProjects.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const totalCount = normalizedProjects.length;
  const devCount = normalizedProjects.filter((p) => p.category === 'dev').length;
  const mediaCount = normalizedProjects.filter((p) => p.category === 'media').length;
  const expCount = normalizedProjects.filter((p) => p.category === 'exp').length;

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]} />
          {jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}

          <FadeUp>
            <section id="projects" className={`pt-24 sm:pt-28 pb-32 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto w-full ${theme.bg}`}>
              
              {/* Clean Section Heading */}
              <header className="mb-16 sm:mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-[#222933] pb-8">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                      <span className="text-[#065F46] dark:text-[#34D399]">/</span>
                      Projects
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-[#475569] dark:text-[#A7B0BE] max-w-xl leading-relaxed">
                      A selection of web systems, interactive tools, hardware simulations, and creative media I&apos;ve engineered.
                    </p>
                  </div>

                  {/* Category filter tabs */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium tracking-wide self-start md:self-auto" role="tablist" aria-label="Filter projects">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'all'}
                      onClick={() => setFilter('all')}
                      className={`cursor-pointer transition-colors pb-1 ${
                        filter === 'all'
                          ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b border-[#065F46] dark:border-[#34D399]'
                          : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
                      }`}
                    >
                      All [{totalCount}]
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'dev'}
                      onClick={() => setFilter('dev')}
                      className={`cursor-pointer transition-colors pb-1 ${
                        filter === 'dev'
                          ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b border-[#065F46] dark:border-[#34D399]'
                          : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
                      }`}
                    >
                      Development [{devCount}]
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'media'}
                      onClick={() => setFilter('media')}
                      className={`cursor-pointer transition-colors pb-1 ${
                        filter === 'media'
                          ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b border-[#065F46] dark:border-[#34D399]'
                          : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
                      }`}
                    >
                      Media [{mediaCount}]
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={filter === 'exp'}
                      onClick={() => setFilter('exp')}
                      className={`cursor-pointer transition-colors pb-1 ${
                        filter === 'exp'
                          ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b border-[#065F46] dark:border-[#34D399]'
                          : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white'
                      }`}
                    >
                      Experiments [{expCount}]
                    </button>
                  </div>
                </div>
              </header>

              {/* Featured Projects Alternating Presentation */}
              {filteredFeatured.length > 0 && (
                <div className="space-y-20 sm:space-y-28 mb-24">
                  {filteredFeatured.map((project, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <article
                        key={project.id || project.slug}
                        className="project-preview-project relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                      >
                        {/* 1. Visual Preview */}
                        <div
                          className={`lg:col-span-7 ${
                            isEven ? 'lg:order-1' : 'lg:order-2'
                          }`}
                        >
                          <Link
                            href={project.detailUrl || project.liveUrl || '#'}
                            target={project.detailUrl ? undefined : '_blank'}
                            rel={project.detailUrl ? undefined : 'noopener noreferrer'}
                            className="group block relative rounded-2xl overflow-hidden border border-slate-200 dark:border-[#222933] bg-slate-100 dark:bg-[#0F1216] shadow-sm hover:border-[#065F46]/60 dark:hover:border-[#34D399]/60 transition-colors focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
                            aria-label={project.detailUrl ? `View ${project.title} case study` : `View ${project.title}`}
                          >
                            {project.image ? (
                              <div className="project-preview-viewport relative aspect-[16/10] w-full overflow-hidden">
                                <ScrollPreviewImage
                                  src={project.image}
                                  alt={`${project.title} interface preview`}
                                  fill
                                  priority={idx === 0}
                                  sizes="(max-width: 1024px) 100vw, 58vw"
                                  className={`project-preview-image ${project.slug === 'sportivo' ? 'project-preview-image-scroll-sportivo' : project.slug === 'git-visualizer' ? 'project-preview-image-scroll-git' : (project.slug === 'ioe-admission' || project.slug === 'ioe-admission-guide') ? 'project-preview-image-scroll-ioe' : (project.slug === 'social-media' || project.slug === 'sports-reels') ? 'project-preview-image-scroll-instagram' : 'object-cover object-top'}`}
                                />
                              </div>
                            ) : (
                              <div className="relative">
                                <MotionReelsGraphic />
                              </div>
                            )}
                          </Link>
                        </div>

                        {/* 2. Structured Content */}
                        <div
                          className={`lg:col-span-5 flex flex-col ${
                            isEven ? 'lg:order-2 lg:text-left' : 'lg:order-1 lg:text-right'
                          }`}
                        >
                          <div className="section-eyebrow mb-2">
                            {project.label || "Featured Project"} &middot; {project.categoryLabel}
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-3">
                            <Link
                              href={project.detailUrl || project.liveUrl || '#'}
                              target={project.detailUrl ? undefined : '_blank'}
                              rel={project.detailUrl ? undefined : 'noopener noreferrer'}
                              className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
                            >
                              {project.title}
                            </Link>
                          </h2>

                          <div className="p-5 sm:p-6 rounded-xl bg-white dark:bg-[#0F1216] border border-slate-200 dark:border-[#222933] shadow-sm mb-4">
                            <p className="card-description">{project.description}</p>
                          </div>

                          <ul
                            className={`flex flex-wrap gap-x-4 gap-y-1 tech-tag mb-5 ${
                              isEven ? 'justify-start' : 'lg:justify-end justify-start'
                            }`}
                          >
                            {project.tech.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>

                          <div
                            className={`flex items-center gap-4 text-xs font-medium ${
                              isEven ? 'justify-start' : 'lg:justify-end justify-start'
                            }`}
                          >
                            {project.detailUrl ? (
                              <Link
                                href={project.detailUrl}
                                className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399] group"
                              >
                                <span>Case Study</span>
                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </Link>
                            ) : project.liveUrl ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399] group"
                              >
                                <span>Live Project</span>
                                <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                              </a>
                            ) : null}

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors p-1"
                                aria-label={`${project.title} live application`}
                                title="Live Application"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                              </a>
                            )}

                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors p-1"
                                aria-label={`${project.title} GitHub repository`}
                                title="GitHub Source"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Noteworthy Engineering Projects */}
              {filteredNoteworthy.length > 0 && (
                <div className="pt-12 border-t border-slate-200 dark:border-[#222933]">
                  <div className="text-center mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                      Other Noteworthy Engineering Projects
                    </h2>
                    <p className="mt-2 section-eyebrow">
                      Hardware prototypes, machinery analysis, and laboratory instrumentation
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredNoteworthy.map((project) => (
                      <article
                        key={project.id || project.slug}
                        className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#0F1216] border border-slate-200 dark:border-[#222933] shadow-sm hover:-translate-y-0.5 hover:border-[#065F46]/60 dark:hover:border-[#34D399]/60 transition-all duration-200"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[#065F46] dark:text-[#34D399]" aria-hidden="true">
                              {project.slug === '555-flasher' ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                              ) : project.slug === 'motor-modeling' ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                              ) : (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                              )}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors mb-2">
                            {project.detailUrl ? (
                              <Link href={project.detailUrl} className="text-left">
                                {project.title}
                              </Link>
                            ) : (
                              <span>{project.title}</span>
                            )}
                          </h3>

                          <p className="card-description mb-4">
                            {project.description}
                          </p>
                        </div>

                        <div>
                          <ul className="flex flex-wrap gap-x-3 gap-y-1 tech-tag pt-3 border-t border-slate-100 dark:border-[#222933] mb-3">
                            {project.tech.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>

                          {project.detailUrl ? (
                            <Link
                              href={project.detailUrl}
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#065F46] dark:text-[#34D399] hover:underline group"
                            >
                              <span>Technical Breakdown</span>
                              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>
                          ) : project.liveUrl ? (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#065F46] dark:text-[#34D399] hover:underline group"
                            >
                              <span>View Project</span>
                              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              <PagePagination 
                prev={{ label: 'Technical Skills', path: '/skills' }} 
                next={{ label: 'Engineering Articles', path: '/blog' }} 
              />
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}

