"use client";

import React from 'react';
import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

export default function SkillsPage() {
  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Skills', path: '/skills' }]} />

          <FadeUp>
            <section id="skills" className={`pt-32 pb-24 px-6 sm:px-12 w-full ${theme.bg}`}>
              <div className="max-w-6xl mx-auto w-full">
                
                {/* Section Introduction */}
                <header className="mb-12">
                  <div className="flex items-center gap-2.5 mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                    <span className="w-6 h-0.5 bg-[#10B981] dark:bg-[#6EE7B7] rounded-full" aria-hidden="true"></span>
                    <span>WHAT I WORK WITH</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#111827] dark:text-[#F8FAFC] leading-tight mb-4">
                    Built with logic. Made with creativity.
                  </h1>

                  <p className="max-w-2xl text-base sm:text-lg text-[#64748B] dark:text-[#A7B5AE] leading-relaxed">
                    A multidisciplinary toolkit spanning software development, digital media, and computer engineering.
                  </p>
                </header>

                {/* Asymmetrical Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">

                  {/* Card A: Development (~58% desktop width: md:col-span-7) */}
                  <article className="md:col-span-7 bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] rounded-2xl sm:rounded-[22px] p-6 sm:p-8 lg:p-9 shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#10B981]/50 dark:hover:border-[#6EE7B7]/50 relative overflow-hidden flex flex-col justify-between group">
                    {/* Decorative subtle code watermark */}
                    <div 
                      aria-hidden="true" 
                      className="absolute right-6 top-6 font-mono text-[10px] text-[#10B981]/15 dark:text-[#6EE7B7]/15 pointer-events-none select-none hidden sm:block tracking-wide"
                    >
                      {"// logic => functional_software"}
                    </div>

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] dark:bg-[#18231E] border border-[#10B981]/20 dark:border-[#6EE7B7]/20 text-[#047857] dark:text-[#6EE7B7] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                            Core Architecture
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                            Development
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-[#64748B] dark:text-[#A7B5AE] leading-relaxed mb-6">
                        Turning logic into functional software.
                      </p>

                      {/* Technology Chips Grid */}
                      <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {/* C */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8c2.25 0 4.28.93 5.74 2.42l-2.12 2.12C14.73 7.63 13.43 7 12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5c1.43 0 2.73-.63 3.62-1.54l2.12 2.12C16.28 19.07 14.25 20 12 20z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">C</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Memory &amp; Systems</span>
                          </div>
                        </li>

                        {/* C++ */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M22.38 8.65c-.47-.8-1.1-1.47-1.87-1.95L13.8 2.37c-.77-.47-1.68-.73-2.61-.73s-1.84.26-2.61.73L1.87 6.7C1.1 7.18.47 7.85 0 8.65v6.7c.47.8 1.1 1.47 1.87 1.95l6.71 4.33c.77.47 1.68.73 2.61.73s1.84-.26 2.61-.73l6.71-4.33c.77-.48 1.4-1.15 1.87-1.95v-6.7zM10.1 14.86c-1.58 0-2.86-1.28-2.86-2.86s1.28-2.86 2.86-2.86c.86 0 1.62.38 2.14.99l1.45-1.45C12.87 7.69 11.58 7.14 10.1 7.14c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86c1.48 0 2.77-.55 3.59-1.54l-1.45-1.45c-.52.61-1.28.99-2.14.99zm6.18-2.18h1.16v-1.36h-1.16V10.16h-1.36v1.16h-1.16v1.36h1.16v1.16h1.36v-1.16zm4.12 0h1.16v-1.36H20.4V10.16h-1.36v1.16h-1.16v1.36h1.16v1.16h1.36v-1.16z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">C++</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">OOP &amp; Computation</span>
                          </div>
                        </li>

                        {/* Python */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.75h5.816v.825H3.924S0 5.787 0 11.916c0 6.127 3.42 5.918 3.42 5.918h2.043v-2.873s-.11-3.425 3.366-3.425h5.79v-.848s.07-2.613-3.666-2.613H6.887S7.067 4.15 11.914 4.15c4.848 0 4.11 2.375 4.11 2.375l-.004 1.704h2.044s3.42-.209 3.42 5.918c0 6.128-3.924 5.685-3.924 5.685h-2.044v-2.874s.11-3.424-3.366-3.424h-5.79v.848s-.07 2.613 3.666 2.613h4.068s-.18 3.925-5.027 3.925c-4.848 0-4.11-2.375-4.11-2.375l.004-1.704H3.924S.504 16.924.504 10.796c0-6.128 3.924-5.685 3.924-5.685h2.044V7.985S6.362 11.41 9.838 11.41h5.79v-.848s.07-2.614-3.666-2.614H7.894S8.074 4.023 12.92 4.023c4.848 0 4.11 2.375 4.11 2.375l-.006 5.518H11.21v.825h8.098S23.23 12.296 23.23 6.168C23.23.04 19.81.25 19.81.25H17.766V3.123s.11 3.425-3.366 3.425H8.61v.848s-.07 2.613 3.666 2.613h4.068S16.164 6.084 11.914 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">Python</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Logic &amp; Automation</span>
                          </div>
                        </li>

                        {/* React.js */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                          <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26352F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0-7.5c-3.1 0-5.8 1.4-7.5 3.6 1.4 1.4 3.4 2.8 5.7 3.8C10.8 7.4 11.4 5.3 12 2c.6 3.3 1.2 5.4 1.8 7.4 2.3-1 4.3-2.4 5.7-3.8C17.8 3.4 15.1 2 12 2zm8.5 7.5c-.8 2.8-2.4 5.3-4.5 7.1 1.7 1.2 3.6 2 5.5 2.4.9-1.3 1.5-2.8 1.5-4.5 0-1.8-.7-3.5-1.9-4.8-.2-.1-.4-.1-.6-.2zm-17 0c-.2.1-.4.1-.6.2C1.7 8.5 1 10.2 1 12c0 1.7.6 3.2 1.5 4.5 1.9-.4 3.8-1.2 5.5-2.4C5.9 12.3 4.3 9.8 3.5 7.5zm8.5 14.5c3.1 0 5.8-1.4 7.5-3.6-1.4-1.4-3.4-2.8-5.7-3.8-.6 2-1.2 4.1-1.8 7.4-.6-3.3-1.2-5.4-1.8-7.4-2.3 1-4.3 2.4-5.7 3.8 1.7 2.2 4.4 3.6 7.5 3.6z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">React.js</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Component Architecture</span>
                          </div>
                        </li>

                        {/* PHP */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26352F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3 sm:col-span-2">
                          <div className="w-7 h-7 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26352F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-5.7 13.5l1.05-5.25h2.1c1.35 0 2.25.6 2.25 1.8 0 1.5-1.2 3.45-3.15 3.45H6.3zm7.65 0l1.05-5.25h2.1c1.35 0 2.25.6 2.25 1.8 0 1.5-1.2 3.45-3.15 3.45H13.95zm-3.15-5.25l-.75 3.75h1.2c.9 0 1.5-.75 1.5-1.65 0-.75-.45-1.05-1.2-1.05h-.75zm7.65 0l-.75 3.75h1.2c.9 0 1.5-.75 1.5-1.65 0-.75-.45-1.05-1.2-1.05h-.75z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">PHP</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Server-Side Web Processing</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Card Footer: Real Project Connection */}
                    <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                      <span className="text-[#64748B] dark:text-[#A7B5AE]">Applied in real applications</span>
                      <Link 
                        href="/projects" 
                        className="text-[#047857] dark:text-[#6EE7B7] hover:text-[#059669] font-semibold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded"
                      >
                        <span>Explore Sportivo &amp; Git Visualizer</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>

                  {/* Card B: Creative Media (~42% desktop width: md:col-span-5) */}
                  <article className="md:col-span-5 bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] rounded-2xl sm:rounded-[22px] p-6 sm:p-8 lg:p-9 shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#10B981]/50 dark:hover:border-[#6EE7B7]/50 relative overflow-hidden flex flex-col justify-between group">
                    {/* Layered decorative ambient element */}
                    <div 
                      aria-hidden="true" 
                      className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-[#10B981]/10 dark:bg-[#6EE7B7]/10 pointer-events-none blur-2xl"
                    ></div>

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] dark:bg-[#18231E] border border-[#10B981]/20 dark:border-[#6EE7B7]/20 text-[#047857] dark:text-[#6EE7B7] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                            Digital Production
                          </span>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                            Creative Media
                          </h2>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-[#64748B] dark:text-[#A7B5AE] leading-relaxed mb-6">
                        Crafting visual stories through editing, motion, and design.
                      </p>

                      {/* Showcase Items */}
                      <ul role="list" className="space-y-3 mb-6">
                        {/* Video Editing */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">Video Editing</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Rhythm, pacing &amp; post-production</span>
                          </div>
                        </li>

                        {/* Motion Graphics */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">Motion Graphics</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Keyframe dynamics &amp; kinetic titles</span>
                          </div>
                        </li>

                        {/* Graphic Design */}
                        <li className="p-3.5 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] flex-shrink-0 mt-0.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-bold text-sm block">Graphic Design</span>
                            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Editorial layout &amp; visual hierarchy</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Card Footer: Real Gallery Connection */}
                    <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#26352F] flex items-center justify-between flex-wrap gap-2 text-xs font-mono">
                      <span className="text-[#64748B] dark:text-[#A7B5AE]">50+ client assets</span>
                      <Link 
                        href="/gallery" 
                        className="text-[#047857] dark:text-[#6EE7B7] hover:text-[#059669] font-semibold hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded"
                      >
                        <span>Open Visual Archive</span>
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </article>

                  {/* Card C: Hardware & Engineering (100% width beneath: md:col-span-12) */}
                  <article className="md:col-span-12 bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] rounded-2xl sm:rounded-[22px] p-6 sm:p-8 lg:p-9 shadow-sm hover:shadow-md transition-all duration-200 ease-out hover:-translate-y-1.5 hover:border-[#10B981]/50 dark:hover:border-[#6EE7B7]/50 relative overflow-hidden group">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Left: Category Overview */}
                      <div className="lg:col-span-5">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] dark:bg-[#18231E] border border-[#10B981]/20 dark:border-[#6EE7B7]/20 text-[#047857] dark:text-[#6EE7B7] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#047857] dark:text-[#6EE7B7]">
                              Physical Computing
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] dark:text-[#F8FAFC]">
                              Hardware &amp; Engineering
                            </h2>
                          </div>
                        </div>

                        <p className="text-sm sm:text-base text-[#64748B] dark:text-[#A7B5AE] leading-relaxed mb-4">
                          Understanding circuits, systems, and practical electronics. Grounded in IOE Thapathali Campus curriculum and hands-on laboratory prototyping.
                        </p>

                        <Link 
                          href="/projects" 
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#047857] dark:text-[#6EE7B7] hover:text-[#059669] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded"
                        >
                          <span>Explore 555 Flasher &amp; Machinery Builds</span>
                          <span aria-hidden="true">&rarr;</span>
                        </Link>
                      </div>

                      {/* Right: Compact Skills Chips */}
                      <div className="lg:col-span-7">
                        <ul role="list" className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          {/* Proteus Suite */}
                          <li className="p-4 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] mb-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-bold text-sm block mb-1">Proteus Suite</span>
                              <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">Schematic capture &amp; simulation models</span>
                            </div>
                          </li>

                          {/* Circuit Analysis */}
                          <li className="p-4 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] mb-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-bold text-sm block mb-1">Circuit Analysis</span>
                              <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">AC/DC network theorems &amp; phasors</span>
                            </div>
                          </li>

                          {/* Breadboarding */}
                          <li className="p-4 rounded-xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#F1F5F9] dark:bg-[#18231E] text-[#111827] dark:text-[#F8FAFC] hover:bg-[#ECFDF5] dark:hover:bg-[#121A17] hover:border-[#10B981]/40 dark:hover:border-[#6EE7B7]/40 transition-all duration-150 flex flex-col justify-between">
                            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-center text-[#047857] dark:text-[#6EE7B7] mb-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                            </div>
                            <div>
                              <span className="font-bold text-sm block mb-1">Breadboarding</span>
                              <span className="text-[11px] font-mono text-[#64748B] dark:text-[#A7B5AE] leading-tight block">555 timer wiring &amp; signal validation</span>
                            </div>
                          </li>
                        </ul>
                      </div>

                    </div>
                  </article>

                </div>

              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
