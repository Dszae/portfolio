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
                <span className="text-sky-500">/</span> Projects Archive
              </h1>

              {/* Sportivo */}
              <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-sky-500 ${theme.card}`}>
                <div className="w-full lg:w-1/2">
                  <span className={`inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-sky-300' : 'text-sky-800'} bg-sky-500/10 border border-sky-500/20 rounded-full mb-4`}>
                    Featured Web App
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Sportivo</h2>
                  <p className="text-sm sm:text-base mb-6 leading-relaxed text-slate-800 dark:text-slate-200 font-normal">
                    A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <svg className={`w-5 h-5 ${isDark ? 'text-sky-300' : 'text-sky-700'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Real-time Football, Cricket & Basketball Streams
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <svg className={`w-5 h-5 ${isDark ? 'text-sky-300' : 'text-sky-700'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Instant Live Match Search & Filter
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/projects/sportivo" className="px-6 py-3 border-2 border-sky-600 dark:border-sky-400 text-sky-950 dark:text-sky-100 bg-sky-100 dark:bg-sky-950/60 text-sm font-bold rounded-xl hover:bg-sky-600 hover:text-white dark:hover:bg-sky-400 dark:hover:text-slate-950 transition-all shadow-sm">Project details</Link>
                    <a href="https://sportivo.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                      Launch Sportivo
                    </a>
                    <a href="https://github.com/dszae/sportivo" target="_blank" rel="noreferrer" aria-label="View Sportivo source code on GitHub" className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border ${isDark ? 'border-slate-800 hover:bg-slate-900 bg-slate-900' : 'border-slate-200 hover:bg-slate-50 bg-slate-100'}`}>
                      Source Code
                    </a>
                    <a href="https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app" target="_blank" rel="noreferrer" aria-label="Read the article about building Sportivo" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                      Read Article
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                    <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/90"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-500/90"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/90"></div>
                      </div>
                      <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-600'}`}>
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
              <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500 ${theme.card}`}>
                <div className="w-full lg:w-1/2">
                  <span className={`inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-cyan-300' : 'text-cyan-800'} bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4`}>
                    Featured Web App
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">IOE Admission Guide</h2>
                  <p className="text-sm sm:text-base mb-6 leading-relaxed text-slate-800 dark:text-slate-200 font-normal">
                    A comprehensive admission ecosystem for Tribhuvan University engineering applicants. Beyond predicting ranks, it provides step-by-step procedural counseling guides, automated priority form generation, and detailed cutoff analytics.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <svg className={`w-5 h-5 ${isDark ? 'text-cyan-300' : 'text-cyan-700'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Step-by-Step IOE Counseling & Document Guides
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <svg className={`w-5 h-5 ${isDark ? 'text-cyan-300' : 'text-cyan-700'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Statistical Rank Predictor & Priority Form Generator
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/projects/ioe-admission-guide" className="px-6 py-3 border-2 border-cyan-600 dark:border-cyan-400 text-cyan-950 dark:text-cyan-100 bg-cyan-100 dark:bg-cyan-950/60 text-sm font-bold rounded-xl hover:bg-cyan-600 hover:text-white dark:hover:bg-cyan-400 dark:hover:text-slate-950 transition-all shadow-sm">Project details</Link>
                    <a href="https://ioe-admission.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                      Explore Guide
                    </a>
                    <a href="https://github.com/dszae/ioe-admission-guide" target="_blank" rel="noreferrer" aria-label="View IOE Admission Guide source code on GitHub" className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border ${isDark ? 'border-slate-800 hover:bg-slate-900 bg-slate-900' : 'border-slate-200 hover:bg-slate-50 bg-slate-100'}`}>
                      Source Code
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                    <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/90"></div><div className="w-3 h-3 rounded-full bg-amber-500/90"></div><div className="w-3 h-3 rounded-full bg-emerald-500/90"></div></div>
                      <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-600'}`}>
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
              <div className={`mb-16 p-6 sm:p-10 rounded-[2rem] border backdrop-blur-xl flex flex-col lg:flex-row items-center gap-10 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-amber-500 ${theme.card}`}>
                <div className="w-full lg:w-1/2">
                  <span className={`inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-amber-300' : 'text-amber-800'} bg-amber-500/10 border border-amber-500/20 rounded-full mb-4`}>
                    Featured Web App
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Git Visualizer</h2>
                  <p className="text-sm sm:text-base mb-6 leading-relaxed text-slate-800 dark:text-slate-200 font-normal">
                    An interactive, visually driven learning tool designed to demystify Git version control. Features a dynamic data-flow architecture and an interactive canvas for mapping standard Git commands.
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <svg className={`w-5 h-5 ${isDark ? 'text-amber-300' : 'text-amber-700'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Interactive Hover-Driven UI
                    </li>
                    <li className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      <svg className={`w-5 h-5 ${isDark ? 'text-amber-300' : 'text-amber-700'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      Live Diagramming of Git Operations
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/projects/git-visualizer" className="px-6 py-3 border-2 border-amber-600 dark:border-amber-400 text-amber-950 dark:text-amber-100 bg-amber-100 dark:bg-amber-950/60 text-sm font-bold rounded-xl hover:bg-amber-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-slate-950 transition-all shadow-sm">Project details</Link>
                    <a href="https://git-visualizer.dipeshsapkota7.com.np/" target="_blank" rel="noreferrer" className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                      Explore Visualizer
                    </a>
                    <a href="https://github.com/dszae/git-visualizer" target="_blank" rel="noreferrer" aria-label="View Git Visualizer source code on GitHub" className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 border ${isDark ? 'border-slate-800 hover:bg-slate-900 bg-slate-900' : 'border-slate-200 hover:bg-slate-50 bg-slate-100'}`}>
                      Source Code
                    </a>
                    <a href="https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control" target="_blank" rel="noreferrer" aria-label="Read the article about building the Git Visualizer" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm">
                      Read Article
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-1/2">
                  <div className={`rounded-xl overflow-hidden border shadow-lg ${isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-slate-100'}`}>
                    <div className={`h-10 flex items-center px-4 gap-2 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-200 border-slate-300'}`}>
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/90"></div><div className="w-3 h-3 rounded-full bg-amber-500/90"></div><div className="w-3 h-3 rounded-full bg-emerald-500/90"></div></div>
                      <div className={`mx-auto text-[10px] px-6 py-1 rounded-md font-mono tracking-wider ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-white text-slate-600'}`}>
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
                      <span className={`inline-block px-3.5 py-1 bg-sky-500/10 ${isDark ? 'text-sky-300' : 'text-sky-800'} text-xs font-semibold rounded-full uppercase tracking-wider border border-sky-500/20`}>
                        {proj.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-4 group-hover:text-sky-500 transition-colors">{proj.title}</h3>
                    <p className="mb-8 line-clamp-3 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300 font-normal">{proj.description}</p>
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
