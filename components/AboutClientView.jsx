"use client";

import React from 'react';
import Link from 'next/link';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

export default function AboutClientView({ siteSettings = {}, jsonLd = null, pageTitle = "About", breadcrumbItems = null }) {
  const profile = siteSettings.profile || {};
  const yearsExp = profile.years_experience || "4+";
  const clientsCount = profile.clients_count || "50+";

  const effectiveBreadcrumbs = breadcrumbItems || [
    { name: 'Home', path: '/' },
    { name: pageTitle, path: pageTitle.toLowerCase() === 'profile' ? '/profile' : '/about' }
  ];

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={effectiveBreadcrumbs} />
          {jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}

          <FadeUp>
            <section id={pageTitle.toLowerCase() === 'profile' ? 'profile' : 'about'} className={`pt-36 sm:pt-40 subpage-container pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <header className="mb-10 sm:mb-12">
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#065F46] dark:text-[#34D399]">
                    Personal Overview &amp; Background
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 flex items-center gap-4 text-[#0F172A] dark:text-[#F9FAFB]">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> {pageTitle}
                  </h1>
                </header>

                <div className="grid md:grid-cols-12 gap-8 items-start">
                  
                  {/* Primary Narrative Card */}
                  <article className={`md:col-span-8 p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 backdrop-blur-md transition-colors duration-200 ${theme.card}`}>
                    <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold mb-3">
                      Identity &amp; Discipline
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight text-[#0F172A] dark:text-[#F8FAFC]">
                      I am Dipesh Sapkota, a Computer Engineering student and creative motion designer based in Kathmandu, Nepal.
                    </h2>
                    
                    <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">
                      <p>
                        I am currently pursuing my Bachelor of Engineering in Computer Engineering at Tribhuvan University, Institute of Engineering (IOE), Thapathali Campus. My core engineering interests lie in Artificial Intelligence, Machine Learning, embedded hardware systems, and algorithm design. I study how computational models, circuit analysis, and software architecture come together to solve structured real-world problems.
                      </p>
                      
                      <p>
                        Alongside my technical studies, I have spent more than four years working as a freelance video editor and motion graphics designer. Over this time, I have partnered with over 50 global clients to produce dynamic video assets, educational visual media, and short-form sports edits using Adobe Premiere Pro, After Effects, and DaVinci Resolve.
                      </p>

                      <p>
                        My development practice is anchored in utility and education. I create projects that address genuine user needs, such as the{' '}
                        <Link href="/projects/ioe-admission-guide" className="font-semibold text-[#065F46] hover:underline dark:text-[#34D399]">
                          IOE Admission Hub
                        </Link>{' '}
                        (an admission analytics tool providing CBT score estimation and campus priority counseling for Nepalese engineering applicants),{' '}
                        <Link href="/projects/sportivo" className="font-semibold text-[#065F46] hover:underline dark:text-[#34D399]">
                          Sportivo
                        </Link>{' '}
                        (a live sports telemetry match center with dynamic stream switching),{' '}
                        <Link href="/projects/git-visualizer" className="font-semibold text-[#065F46] hover:underline dark:text-[#34D399]">
                          Git Visualizer
                        </Link>{' '}
                        (an interactive DAG commit simulator), and BeatMarker (an After Effects CEP automation extension).
                      </p>
                    </div>

                    {/* Factual Highlights Grid */}
                    <div className="mt-10 pt-8 border-t border-slate-200 dark:border-[#222933] grid sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11151C] border border-slate-200 dark:border-[#222933]">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold">
                          Engineering Education
                        </h3>
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-white mt-1">
                          IOE Thapathali Campus
                        </p>
                        <p className="text-xs text-[#475569] dark:text-[#A7B0BE] mt-0.5">
                          Tribhuvan University · B.E. Computer Engineering
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11151C] border border-slate-200 dark:border-[#222933]">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold">
                          Technical Focus
                        </h3>
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-white mt-1">
                          AI / ML &amp; Embedded Systems
                        </p>
                        <p className="text-xs text-[#475569] dark:text-[#A7B0BE] mt-0.5">
                          Python, C/C++, Circuit Analysis &amp; Microcontrollers
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11151C] border border-slate-200 dark:border-[#222933]">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold">
                          Creative Track Record
                        </h3>
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-white mt-1">
                          4+ Years Video Editing &amp; Motion
                        </p>
                        <p className="text-xs text-[#475569] dark:text-[#A7B0BE] mt-0.5">
                          50+ Global Clients across Digital Media &amp; Education
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#11151C] border border-slate-200 dark:border-[#222933]">
                        <h3 className="font-mono text-xs uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold">
                          Toolchains &amp; Software
                        </h3>
                        <p className="text-sm font-semibold text-[#0F172A] dark:text-white mt-1">
                          After Effects, Premiere, DaVinci
                        </p>
                        <p className="text-xs text-[#475569] dark:text-[#A7B0BE] mt-0.5">
                          Next.js, React, Git, Proteus Simulation
                        </p>
                      </div>
                    </div>
                  </article>
                  
                  {/* Right Column: Stable Stat Cards & Quick Links */}
                  <aside className="md:col-span-4 flex flex-col gap-4 sm:gap-6">
                    
                    <div className={`p-5 sm:p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 backdrop-blur-md flex items-center gap-4 transition-colors duration-200 ${theme.card}`}>
                      <div className="w-14 h-14 rounded-xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{yearsExp}</h3>
                        <p className="font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#A7B0BE] font-bold">Years Experience</p>
                        <p className="text-xs text-[#64748B] dark:text-[#8892B0] mt-0.5">Motion Graphics &amp; Video Editing</p>
                      </div>
                    </div>
                    
                    <div className={`p-5 sm:p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 backdrop-blur-md flex items-center gap-4 transition-colors duration-200 ${theme.card}`}>
                      <div className="w-14 h-14 rounded-xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">{clientsCount}</h3>
                        <p className="font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#A7B0BE] font-bold">Global Clients</p>
                        <p className="text-xs text-[#64748B] dark:text-[#8892B0] mt-0.5">Commercial &amp; Educational Projects</p>
                      </div>
                    </div>

                    <div className={`p-5 sm:p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 backdrop-blur-md flex items-center gap-4 transition-colors duration-200 ${theme.card}`}>
                      <div className="w-14 h-14 rounded-xl bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">IOE Thapathali</h3>
                        <p className="font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#A7B0BE] font-bold">Campus Affiliation</p>
                        <p className="text-xs text-[#64748B] dark:text-[#8892B0] mt-0.5">Tribhuvan University, Kathmandu</p>
                      </div>
                    </div>

                    <div className={`p-6 rounded-2xl border border-slate-200 dark:border-[#222933] ${theme.card}`}>
                      <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-[#065F46] dark:text-[#34D399] mb-3">
                        Connect &amp; Collaborate
                      </h3>
                      <p className="text-xs sm:text-sm text-[#475569] dark:text-[#A7B0BE] leading-relaxed mb-4">
                        Open for AI/ML engineering collaborations, academic research, and motion design commissions.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#065F46] dark:text-[#34D399] hover:underline"
                      >
                        <span>Send an inquiry</span>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>

                  </aside>
                </div>

                <div className="mt-16">
                  <PagePagination 
                    prev={{ label: 'Home Page', path: '/' }} 
                    next={{ label: 'Technical Skills', path: '/skills' }} 
                  />
                </div>
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
