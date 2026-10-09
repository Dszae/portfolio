"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

const PROJECTS = [
  { id: 1, title: "Astable Multivibrator LED Flasher", category: "Hardware", description: "Physical breadboard circuit built and simulated using a 555 timer, focusing on frequency control and stable oscillation cycles.", tech: ["Circuit Analysis", "Proteus", "555 Timer"] },
  { id: 2, title: "Sports Highlight Reels", category: "Creative Media", description: "High-impact motion graphics and dynamic video editing showcasing football and futsal moments. Focused on rendering optimization.", tech: ["Premiere Pro", "After Effects"] },
  { id: 3, title: "Electrical Machinery Modeling", category: "Engineering", description: "Analysis and torque derivations of three-phase induction and DC motors, solving complex phasor circuit networks.", tech: ["Mathematics", "Network Analysis"] },
  { id: 4, title: "Automated Analyzer Diagnostics", category: "Instrumentation", description: "Troubleshooting procedures for vacuum failures, probe calibrations, and component layouts on advanced immunoassay platforms.", tech: ["Medical Tech", "Fluidics"] }
];

export default function ProjectsPage() {
  return (
    <SiteLayout>
      {({ theme, isDark }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]} />

          <FadeUp>
            <section id="projects" className={`pt-32 pb-24 px-6 sm:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
              <h1 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center gap-4">
                <span className="text-[#047857] dark:text-[#34D399]">/</span> Projects Archive
              </h1>

              {/* Sportivo */}
              <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-1.5 ${theme.card}`}>
                <div className="w-full lg:w-1/2">
                  <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#047857] dark:text-[#34D399] bg-[#047857]/10 dark:bg-[#34D399]/10 border border-[#047857]/20 dark:border-[#34D399]/20 rounded-full mb-4">
                    Featured Web App
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Sportivo</h2>
                  <p className="text-sm sm:text-base mb-6 leading-relaxed text-[#111827] dark:text-[#F9FAFB] font-normal">
                    A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 text-[#047857] dark:text-[#34D399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Real-time Football, Cricket & Basketball Streams
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 text-[#047857] dark:text-[#34D399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Instant Live Match Search & Filter
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/projects/sportivo" 
                      className="px-6 py-3 border-2 border-[#047857] dark:border-[#34D399] text-[#047857] dark:text-[#34D399] bg-[#047857]/5 dark:bg-[#34D399]/10 text-sm font-bold rounded-xl hover:bg-[#047857] hover:text-white dark:hover:bg-[#34D399] dark:hover:text-[#0B0F0E] transition-all shadow-sm"
                    >
                      Project Details
                    </Link>
                    <a 
                      href="https://sportivo.dipeshsapkota7.com.np/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
                    >
                      Launch Sportivo
                    </a>
                    <a 
                      href="https://github.com/dszae/sportivo" 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label="View Sportivo source code on GitHub" 
                      className="px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border border-[#E2E8F0] dark:border-[#26352F] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] bg-[#FFFFFF] dark:bg-[#111B17]"
                    >
                      Source Code
                    </a>
                    <a 
                      href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label="Read the article about building Sportivo" 
                      className="px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border border-[#E2E8F0] dark:border-[#26352F] hover:border-[#047857] dark:hover:border-[#34D399] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D]"
                    >
                      Read Article
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-[#26352F] bg-[#111B17]' : 'border-[#E2E8F0] bg-[#FFFFFF]'}`}>
                    <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-[#16221D] border-[#26352F]' : 'bg-[#F1F5F9] border-[#E2E8F0]'}`}>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                      </div>
                      <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-[#0B0F0E] text-[#A7B0BE]' : 'bg-white text-[#475569] border border-[#E2E8F0]'}`}>
                        sportivo.dipeshsapkota7.com.np
                      </div>
                    </div>
                    <div className="h-[300px] sm:h-[450px] w-full relative overflow-hidden group">
                      <Image 
                        src="/sportivo-preview.jpg" 
                        alt="Sportivo Live Sports Streaming Platform Preview" 
                        width={993}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        onClick={() => window.open("https://sportivo.dipeshsapkota7.com.np/", "_blank")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* IOE Admission Guide */}
              <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-1.5 ${theme.card}`}>
                <div className="w-full lg:w-1/2">
                  <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#047857] dark:text-[#34D399] bg-[#047857]/10 dark:bg-[#34D399]/10 border border-[#047857]/20 dark:border-[#34D399]/20 rounded-full mb-4">
                    Featured Web App
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">IOE Admission Guide</h2>
                  <p className="text-sm sm:text-base mb-6 leading-relaxed text-[#111827] dark:text-[#F9FAFB] font-normal">
                    A comprehensive admission ecosystem for Tribhuvan University engineering applicants. Beyond predicting ranks, it provides step-by-step procedural counseling guides, automated priority form generation, and detailed cutoff analytics.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 text-[#047857] dark:text-[#34D399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Step-by-Step IOE Counseling & Document Guides
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 text-[#047857] dark:text-[#34D399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Statistical Rank Predictor & Priority Form Generator
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/projects/ioe-admission-guide" 
                      className="px-6 py-3 border-2 border-[#047857] dark:border-[#34D399] text-[#047857] dark:text-[#34D399] bg-[#047857]/5 dark:bg-[#34D399]/10 text-sm font-bold rounded-xl hover:bg-[#047857] hover:text-white dark:hover:bg-[#34D399] dark:hover:text-[#0B0F0E] transition-all shadow-sm"
                    >
                      Project Details
                    </Link>
                    <a 
                      href="https://ioe-admission.dipeshsapkota7.com.np/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
                    >
                      Explore Guide
                    </a>
                    <a 
                      href="https://github.com/dszae/ioe-admission-guide" 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label="View IOE Admission Guide source code on GitHub" 
                      className="px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border border-[#E2E8F0] dark:border-[#26352F] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] bg-[#FFFFFF] dark:bg-[#111B17]"
                    >
                      Source Code
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-[#26352F] bg-[#111B17]' : 'border-[#E2E8F0] bg-[#FFFFFF]'}`}>
                    <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-[#16221D] border-[#26352F]' : 'bg-[#F1F5F9] border-[#E2E8F0]'}`}>
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-amber-500/80"></div><div className="w-3 h-3 rounded-full bg-emerald-500/80"></div></div>
                      <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-[#0B0F0E] text-[#A7B0BE]' : 'bg-white text-[#475569] border border-[#E2E8F0]'}`}>
                        ioe-admission.dipeshsapkota7.com.np
                      </div>
                    </div>
                    <div className="h-[300px] sm:h-[450px] w-full relative overflow-hidden group">
                      <Image 
                        src="/ioe-preview.jpg" 
                        alt="IOE Admission Guide Preview" 
                        width={993}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        onClick={() => window.open("https://ioe-admission.dipeshsapkota7.com.np/", "_blank")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Git Visualizer */}
              <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-1.5 ${theme.card}`}>
                <div className="w-full lg:w-1/2">
                  <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-[#047857] dark:text-[#34D399] bg-[#047857]/10 dark:bg-[#34D399]/10 border border-[#047857]/20 dark:border-[#34D399]/20 rounded-full mb-4">
                    Featured Web App
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Git Visualizer</h2>
                  <p className="text-sm sm:text-base mb-6 leading-relaxed text-[#111827] dark:text-[#F9FAFB] font-normal">
                    An interactive, visually driven learning tool designed to demystify Git version control. Features a dynamic data-flow architecture and an interactive canvas for mapping standard Git commands.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 text-[#047857] dark:text-[#34D399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Interactive Hover-Driven UI
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 text-[#047857] dark:text-[#34D399] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Live Diagramming of Git Operations
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href="/projects/git-visualizer" 
                      className="px-6 py-3 border-2 border-[#047857] dark:border-[#34D399] text-[#047857] dark:text-[#34D399] bg-[#047857]/5 dark:bg-[#34D399]/10 text-sm font-bold rounded-xl hover:bg-[#047857] hover:text-white dark:hover:bg-[#34D399] dark:hover:text-[#0B0F0E] transition-all shadow-sm"
                    >
                      Project Details
                    </Link>
                    <a 
                      href="https://git-visualizer.dipeshsapkota7.com.np/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
                    >
                      Explore Visualizer
                    </a>
                    <a 
                      href="https://github.com/dszae/git-visualizer" 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label="View Git Visualizer source code on GitHub" 
                      className="px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border border-[#E2E8F0] dark:border-[#26352F] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] bg-[#FFFFFF] dark:bg-[#111B17]"
                    >
                      Source Code
                    </a>
                    <a 
                      href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label="Read the article about building the Git Visualizer" 
                      className="px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border border-[#E2E8F0] dark:border-[#26352F] hover:border-[#047857] dark:hover:border-[#34D399] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D]"
                    >
                      Read Article
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-[#26352F] bg-[#111B17]' : 'border-[#E2E8F0] bg-[#FFFFFF]'}`}>
                    <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-[#16221D] border-[#26352F]' : 'bg-[#F1F5F9] border-[#E2E8F0]'}`}>
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/80"></div><div className="w-3 h-3 rounded-full bg-amber-500/80"></div><div className="w-3 h-3 rounded-full bg-emerald-500/80"></div></div>
                      <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-[#0B0F0E] text-[#A7B0BE]' : 'bg-white text-[#475569] border border-[#E2E8F0]'}`}>
                        git-visualizer.dipeshsapkota7.com.np
                      </div>
                    </div>
                    <div className="h-[300px] sm:h-[450px] w-full relative overflow-hidden group">
                      <Image 
                        src="/git-preview.jpg" 
                        alt="Git Visualizer Tool Preview" 
                        width={993}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                        onClick={() => window.open("https://git-visualizer.dipeshsapkota7.com.np/", "_blank")}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Engineering Projects Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {PROJECTS.map((proj) => (
                  <div key={proj.id} className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-md transition-all duration-300 group ${theme.card} flex flex-col`}>
                    <div className="flex justify-between items-start mb-6">
                      <span className="inline-block px-3.5 py-1 bg-[#047857]/10 dark:bg-[#34D399]/10 text-[#047857] dark:text-[#34D399] text-xs font-semibold rounded-full uppercase tracking-wider border border-[#047857]/20 dark:border-[#34D399]/20">
                        {proj.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 group-hover:text-[#047857] dark:group-hover:text-[#34D399] transition-colors">{proj.title}</h3>
                    <p className="mb-8 line-clamp-3 text-sm sm:text-base leading-relaxed text-[#475569] dark:text-[#A7B0BE] font-normal">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {proj.tech.map((t) => (
                        <span key={t} className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs font-mono font-medium rounded-lg ${theme.tag}`}>
                          {t}
                        </span>
                      ))}
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
