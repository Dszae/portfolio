"use client";

import React from 'react';
import Link from 'next/link';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

const SKILL_DESCRIPTIONS = {
  'C': 'Memory & Systems',
  'C++': 'OOP & Computation',
  'Python': 'Logic & Automation',
  'React': 'Component Architecture',
  'React.js': 'Component Architecture',
  'Next.js': 'SSR & Production Web',
  'PHP': 'Server-Side Web Processing',
  'Adobe Premiere Pro': 'Rhythm, pacing & post-production',
  'Video Editing': 'Rhythm, pacing & post-production',
  'Adobe After Effects': 'Keyframe dynamics & kinetic titles',
  'Motion Graphics': 'Keyframe dynamics & kinetic titles',
  'DaVinci Resolve': 'Color science & grading',
  'Photoshop & Illustrator': 'Editorial layout & visual hierarchy',
  'Graphic Design': 'Editorial layout & visual hierarchy',
  'Circuit Analysis': 'AC/DC network theorems & phasors',
  'Proteus Simulation': 'Schematic capture & simulation models',
  'Proteus Suite': 'Schematic capture & simulation models',
  'Breadboarding': '555 timer wiring & signal validation',
  'Machine Learning': 'Supervised learning & algorithms',
  'Git & Version Control': 'DAGs & workflows'
};

function SkillIcon({ name, category }) {
  const lower = (name || '').toLowerCase();
  
  if (lower.includes('c++')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.38 8.65c-.47-.8-1.1-1.47-1.87-1.95L13.8 2.37c-.77-.47-1.68-.73-2.61-.73s-1.84.26-2.61.73L1.87 6.7C1.1 7.18.47 7.85 0 8.65v6.7c.47.8 1.1 1.47 1.87 1.95l6.71 4.33c.77.47 1.68.73 2.61.73s1.84-.26 2.61-.73l6.71-4.33c.77-.48 1.4-1.15 1.87-1.95v-6.7zM10.1 14.86c-1.58 0-2.86-1.28-2.86-2.86s1.28-2.86 2.86-2.86c.86 0 1.62.38 2.14.99l1.45-1.45C12.87 7.69 11.58 7.14 10.1 7.14c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86c1.48 0 2.77-.55 3.59-1.54l-1.45-1.45c-.52.61-1.28.99-2.14.99zm6.18-2.18h1.16v-1.36h-1.16V10.16h-1.36v1.16h-1.16v1.36h1.16v1.16h1.36v-1.16zm4.12 0h1.16v-1.36H20.4V10.16h-1.36v1.16h-1.16v1.36h1.16v1.16h1.36v-1.16z" />
      </svg>
    );
  }
  if (lower === 'c') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c2.25 0 4.28.93 5.74 2.42l-2.12 2.12C14.73 7.63 13.43 7 12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.43 0 2.73-.63 3.62-1.54l2.12 2.12C16.28 19.07 14.25 20 12 20z" />
      </svg>
    );
  }
  if (lower.includes('python')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.816v.825H3.924S0 5.787 0 11.916c0 6.127 3.42 5.918 3.42 5.918h2.043v-2.873s-.11-3.425 3.366-3.425h5.79v-.848s.07-2.613-3.666-2.613H6.887S7.067 4.15 11.914 4.15c4.848 0 4.11 2.375 4.11 2.375l-.004 1.704h2.044s3.42-.209 3.42 5.918c0 6.128-3.924 5.685-3.924 5.685h-2.044v-2.874s.11-3.424-3.366-3.424h-5.79v.848s-.07 2.613 3.666 2.613h4.068s-.18 3.925-5.027 3.925c-4.848 0-4.11-2.375-4.11-2.375l.004-1.704H3.924S.504 16.924.504 10.796c0-6.128 3.924-5.685 3.924-5.685h2.044V7.985S6.362 11.41 9.838 11.41h5.79v-.848s.07-2.614-3.666-2.614H7.894S8.074 4.023 12.92 4.023c4.848 0 4.11 2.375 4.11 2.375l-.006 5.518H11.21v.825h8.098S23.23 12.296 23.23 6.168C23.23.04 19.81.25 19.81.25H17.766V3.123s.11 3.425-3.366 3.425H8.61v.848s-.07 2.613 3.666 2.613h4.068S16.164 6.084 11.914 0z" />
      </svg>
    );
  }
  if (lower.includes('react') || lower.includes('next')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0-7.5c-3.1 0-5.8 1.4-7.5 3.6 1.4 1.4 3.4 2.8 5.7 3.8C10.8 7.4 11.4 5.3 12 2c.6 3.3 1.2 5.4 1.8 7.4 2.3-1 4.3-2.4 5.7-3.8C17.8 3.4 15.1 2 12 2zm8.5 7.5c-.8 2.8-2.4 5.3-4.5 7.1 1.7 1.2 3.6 2 5.5 2.4.9-1.3 1.5-2.8 1.5-4.5 0-1.8-.7-3.5-1.9-4.8-.2-.1-.4-.1-.6-.2zm-17 0c-.2.1-.4.1-.6.2C1.7 8.5 1 10.2 1 12c0 1.7.6 3.2 1.5 4.5 1.9-.4 3.8-1.2 5.5-2.4C5.9 12.3 4.3 9.8 3.5 7.5zm8.5 14.5c3.1 0 5.8-1.4 7.5-3.6-1.4-1.4-3.4-2.8-5.7-3.8-.6 2-1.2 4.1-1.8 7.4-.6-3.3-1.2-5.4-1.8-7.4-2.3 1-4.3 2.4-5.7 3.8 1.7 2.2 4.4 3.6 7.5 3.6z" />
      </svg>
    );
  }
  if (lower.includes('php')) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.7 13.5l1.05-5.25h2.1c1.35 0 2.25.6 2.25 1.8 0 1.5-1.2 3.45-3.15 3.45H6.3zm7.65 0l1.05-5.25h2.1c1.35 0 2.25.6 2.25 1.8 0 1.5-1.2 3.45-3.15 3.45H13.95zm-3.15-5.25l-.75 3.75h1.2c.9 0 1.5-.75 1.5-1.65 0-.75-.45-1.05-1.2-1.05h-.75zm7.65 0l-.75 3.75h1.2c.9 0 1.5-.75 1.5-1.65 0-.75-.45-1.05-1.2-1.05h-.75z" />
      </svg>
    );
  }
  if (lower.includes('video') || lower.includes('premiere') || lower.includes('resolve')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }
  if (lower.includes('after effects') || lower.includes('motion')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    );
  }
  if (lower.includes('photoshop') || lower.includes('design') || lower.includes('illustrator')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    );
  }
  if (lower.includes('circuit') || lower.includes('proteus') || lower.includes('hardware') || lower.includes('embedded')) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    );
  }
  
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

export default function SkillsClientView({ initialSkills = [], jsonLd = null }) {
  
  const devSkills = initialSkills.filter(s => 
    (s.category || '').toLowerCase() === 'development' || 
    (s.category || '').toLowerCase() === 'programming'
  );
  
  const mediaSkills = initialSkills.filter(s => 
    (s.category || '').toLowerCase().includes('media') || 
    (s.category || '').toLowerCase().includes('creative') ||
    (s.category || '').toLowerCase().includes('design')
  );

  const hardwareSkills = initialSkills.filter(s => 
    (s.category || '').toLowerCase().includes('hardware') || 
    (s.category || '').toLowerCase().includes('circuit') ||
    (s.category || '').toLowerCase().includes('engineering') ||
    (s.category || '').toLowerCase().includes('embedded')
  );

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Skills', path: '/skills' }]} />
          {jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}

          <FadeUp>
            <section id="skills" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-6xl mx-auto w-full">

<header className="mb-12">
                  <div className="flex items-center gap-2.5 mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#065F46] dark:text-[#6EE7B7]">
                    <span className="w-6 h-0.5 bg-[#065F46] dark:bg-[#6EE7B7] rounded-full" aria-hidden="true"></span>
                    <span>WHAT I WORK WITH</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-tight mb-4 flex items-center gap-3">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> Skills
                  </h1>

                  <p className="max-w-2xl text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed">
                    Built with logic. Made with creativity. A multidisciplinary toolkit spanning software development, digital media, and computer engineering.
                  </p>
                </header>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

<article id="development" className="md:col-span-7 bg-[#FFFFFF] dark:bg-[#0F1216] border border-[#CBD5E1] dark:border-[#222933] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#065F46]/50 dark:hover:border-[#6EE7B7]/50 relative overflow-hidden flex flex-col justify-between group">
                    <div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] text-[#065F46] dark:text-[#6EE7B7] flex items-center justify-center flex-shrink-0 group-hover:border-[#065F46]/50 dark:group-hover:border-[#34D399]/50 transition-colors duration-200">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#065F46] dark:text-[#6EE7B7]">
                            Core Architecture
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                            Development
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6 font-medium">
                        Turning logic into functional software.
                      </p>

<ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {devSkills.map((s) => (
                          <li key={s.id || s.name} className="p-3.5 rounded-xl border border-[#CBD5E1] dark:border-[#222933] bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#0F1216] hover:border-[#065F46]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] dark:bg-[#0F1216] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                              <SkillIcon name={s.name} category={s.category} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-sm block truncate">{s.name}</span>
                              <span className="text-[11px] font-mono text-[#334155] dark:text-[#A7B0BE] leading-tight block truncate">
                                {s.description || SKILL_DESCRIPTIONS[s.name] || 'Core competency'}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

<div className="pt-4 border-t border-[#CBD5E1] dark:border-[#222933] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                      <span className="text-[#1E293B] dark:text-[#A7B0BE] font-semibold">Applied in real applications</span>
                      <Link 
                        href="/projects" 
                        className="text-[#065F46] dark:text-[#6EE7B7] hover:text-[#065F46] font-bold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065F46] rounded group"
                      >
                        <span>Explore Sportivo &amp; Git Visualizer</span>
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>

<article className="md:col-span-5 bg-[#FFFFFF] dark:bg-[#0F1216] border border-[#CBD5E1] dark:border-[#222933] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#065F46]/50 dark:hover:border-[#6EE7B7]/50 relative overflow-hidden flex flex-col justify-between group">
                    <div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] text-[#065F46] dark:text-[#6EE7B7] flex items-center justify-center flex-shrink-0 group-hover:border-[#065F46]/50 dark:group-hover:border-[#34D399]/50 transition-colors duration-200">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#065F46] dark:text-[#6EE7B7]">
                            Digital Production
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                            Creative Media
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6 font-medium">
                        Crafting visual stories through editing, motion, and design.
                      </p>

<ul role="list" className="space-y-3 mb-6">
                        {mediaSkills.map((s) => (
                          <li key={s.id || s.name} className="p-3.5 rounded-xl border border-[#CBD5E1] dark:border-[#222933] bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#0F1216] hover:border-[#065F46]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#0F1216] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                              <SkillIcon name={s.name} category={s.category} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="font-bold text-sm block truncate">{s.name}</span>
                              <span className="text-[11px] font-mono text-[#334155] dark:text-[#A7B0BE] leading-tight block truncate">
                                {s.description || SKILL_DESCRIPTIONS[s.name] || 'Digital creation'}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

<div className="pt-4 border-t border-[#CBD5E1] dark:border-[#222933] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                      <span className="text-[#1E293B] dark:text-[#A7B0BE] font-semibold">50+ client assets</span>
                      <Link 
                        href="/gallery" 
                        className="text-[#065F46] dark:text-[#6EE7B7] hover:text-[#065F46] font-bold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065F46] rounded group"
                      >
                        <span>Open Visual Archive</span>
                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </article>

<article className="md:col-span-12 bg-[#FFFFFF] dark:bg-[#0F1216] border border-[#CBD5E1] dark:border-[#222933] rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#065F46]/50 dark:hover:border-[#6EE7B7]/50 relative overflow-hidden group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

<div className="lg:col-span-5">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] text-[#065F46] dark:text-[#6EE7B7] flex items-center justify-center flex-shrink-0 group-hover:border-[#065F46]/50 dark:group-hover:border-[#34D399]/50 transition-colors duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#065F46] dark:text-[#6EE7B7]">
                              Physical Computing
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                              Hardware &amp; Engineering
                            </h2>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-4 font-medium">
                          Understanding circuits, systems, and practical electronics. Grounded in IOE Thapathali Campus curriculum and hands-on laboratory prototyping.
                        </p>

                        <Link 
                          href="/projects" 
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#065F46] dark:text-[#6EE7B7] hover:text-[#065F46] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#065F46] rounded group"
                        >
                          <span>Explore 555 Flasher &amp; Machinery Builds</span>
                          <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>

<div className="lg:col-span-7">
                        <ul role="list" className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          {hardwareSkills.map((s) => (
                            <li key={s.id || s.name} className="p-4 rounded-xl border border-[#CBD5E1] dark:border-[#222933] bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#F8FAFC] hover:bg-[#E2E8F0] dark:hover:bg-[#0F1216] hover:border-[#065F46]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex flex-col justify-between">
                              <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#0F1216] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#6EE7B7] mb-3">
                                <SkillIcon name={s.name} category={s.category} />
                              </div>
                              <div>
                                <span className="font-bold text-sm block mb-1">{s.name}</span>
                                <span className="text-[11px] font-mono text-[#334155] dark:text-[#A7B0BE] leading-tight block">
                                  {s.description || SKILL_DESCRIPTIONS[s.name] || 'Laboratory & engineering'}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </article>

                </div>

                <PagePagination 
                  prev={{ label: 'About Dipesh', path: '/about' }} 
                  next={{ label: 'Featured Projects', path: '/projects' }} 
                />
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
