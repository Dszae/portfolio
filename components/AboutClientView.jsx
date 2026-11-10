"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
            <section
              id={pageTitle.toLowerCase() === 'profile' ? 'profile' : 'about'}
              className={`pt-32 sm:pt-40 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}
            >
              <div className="max-w-7xl mx-auto w-full">
                
                {/* 1. EDITORIAL INTRODUCTION */}
                <header className="pb-10 sm:pb-12 border-b border-[#E4E9E5] dark:border-[#222933]">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#087A5B] dark:text-[#34D399] font-bold">
                      Personal Profile
                    </span>
                    <span className="text-xs text-[#596579] dark:text-[#94A3B8]">/</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#596579] dark:text-[#94A3B8]">
                      Kathmandu, Nepal
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#17212F] dark:text-[#F8FAFC] leading-[1.1]">
                    Beyond the code.<br className="hidden sm:inline" /> I am Dipesh Sapkota.
                  </h1>

                  <p className="mt-4 text-base sm:text-lg text-[#596579] dark:text-[#94A3B8] font-medium tracking-wide max-w-3xl">
                    Computer Engineering Student · AI/ML Enthusiast · Motion Designer
                  </p>
                </header>

                {/* 2. REFINED TWO-COLUMN ABOUT SECTION */}
                <div className="pt-12 sm:pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  
                  {/* Left Column: Portrait, Identity Meta & Verified Channels */}
                  <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                    
                    {/* Portrait Frame */}
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-[#E4E9E5] dark:border-[#222933] bg-[#F7F8F5] dark:bg-[#11151C] shadow-sm">
                      <Image
                        src="/dipesh-sapkota.jpg"
                        alt="Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 42vw, 420px"
                        priority
                        fetchPriority="high"
                        className="object-cover object-center transition-transform duration-700 hover:scale-[1.01]"
                      />
                      
                      {/* Ambient Location & Status Pill */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 dark:bg-[#0B0F14]/90 backdrop-blur-md border border-[#E4E9E5] dark:border-[#222933] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2" aria-hidden="true">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#087A5B] dark:bg-[#34D399] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#087A5B] dark:bg-[#34D399]"></span>
                          </span>
                          <span className="font-mono text-[11px] font-semibold text-[#17212F] dark:text-[#F8FAFC]">Kathmandu, Nepal</span>
                        </div>
                        <span className="font-mono text-[10px] text-[#596579] dark:text-[#94A3B8]">IOE Thapathali</span>
                      </div>
                    </div>

                    {/* Identity Details Card */}
                    <div className="p-5 rounded-2xl border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 space-y-3">
                      <div className="flex justify-between items-baseline border-b border-[#E4E9E5] dark:border-[#222933] pb-2.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#596579] dark:text-[#94A3B8]">Discipline</span>
                        <span className="text-xs font-semibold text-[#17212F] dark:text-[#F8FAFC] text-right">Computer Engineering</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-[#E4E9E5] dark:border-[#222933] pb-2.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#596579] dark:text-[#94A3B8]">Institution</span>
                        <span className="text-xs font-semibold text-[#17212F] dark:text-[#F8FAFC] text-right">IOE Thapathali Campus · TU</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-[#E4E9E5] dark:border-[#222933] pb-2.5">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#596579] dark:text-[#94A3B8]">Creative Craft</span>
                        <span className="text-xs font-semibold text-[#17212F] dark:text-[#F8FAFC] text-right">Motion Design &amp; Video Editing</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="font-mono text-xs uppercase tracking-wider text-[#596579] dark:text-[#94A3B8]">Status</span>
                        <span className="text-xs font-semibold text-[#087A5B] dark:text-[#34D399] text-right">Open for Inquiries</span>
                      </div>
                    </div>

                    {/* Verified Channels */}
                    <div className="pt-1">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#596579] dark:text-[#94A3B8] font-bold mb-3">
                        Verified Channels
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <a
                          href="https://github.com/dszae"
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-lg border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 text-[#17212F] dark:text-[#F8FAFC] hover:border-[#087A5B] dark:hover:border-[#34D399] hover:text-[#087A5B] dark:hover:text-[#34D399] transition-colors"
                        >
                          <span className="font-medium">GitHub</span>
                          <span className="font-mono text-[10px] text-[#596579] dark:text-[#94A3B8]">dszae</span>
                        </a>
                        <a
                          href="https://linkedin.com/in/dipeshsapkota7"
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-lg border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 text-[#17212F] dark:text-[#F8FAFC] hover:border-[#087A5B] dark:hover:border-[#34D399] hover:text-[#087A5B] dark:hover:text-[#34D399] transition-colors"
                        >
                          <span className="font-medium">LinkedIn</span>
                          <span className="font-mono text-[10px] text-[#596579] dark:text-[#94A3B8]">in/dipesh</span>
                        </a>
                        <a
                          href="https://dev.to/dszae"
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-lg border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 text-[#17212F] dark:text-[#F8FAFC] hover:border-[#087A5B] dark:hover:border-[#34D399] hover:text-[#087A5B] dark:hover:text-[#34D399] transition-colors"
                        >
                          <span className="font-medium">DEV</span>
                          <span className="font-mono text-[10px] text-[#596579] dark:text-[#94A3B8]">articles</span>
                        </a>
                        <a
                          href="https://orcid.org/0009-0001-7595-5114"
                          target="_blank"
                          rel="me noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-lg border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 text-[#17212F] dark:text-[#F8FAFC] hover:border-[#087A5B] dark:hover:border-[#34D399] hover:text-[#087A5B] dark:hover:text-[#34D399] transition-colors"
                        >
                          <span className="font-medium">ORCID</span>
                          <span className="font-mono text-[10px] text-[#596579] dark:text-[#94A3B8]">0009-0001</span>
                        </a>
                      </div>
                    </div>
                  </aside>

                  {/* Right Column: Narrative Biography & Purpose-Driven Initiatives */}
                  <main className="lg:col-span-7 space-y-8">
                    
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#087A5B] dark:text-[#34D399] font-bold">
                        Perspective &amp; Practice
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#17212F] dark:text-[#F8FAFC] mt-2 leading-tight">
                        Bridging computational architecture and dynamic visual execution.
                      </h2>
                    </div>

                    <div className="space-y-5 text-base sm:text-lg leading-relaxed text-[#596579] dark:text-[#94A3B8]">
                      <p>
                        I am <strong className="text-[#17212F] dark:text-white font-semibold">Dipesh Sapkota</strong>, an undergraduate Computer Engineering student at Tribhuvan University, Institute of Engineering (IOE), Thapathali Campus in Kathmandu, Nepal. My core technical exploration centers on Artificial Intelligence, Machine Learning algorithms, and embedded hardware architectures. I study how computational mathematical models, low-level circuit logic, and systematic software engineering unite to solve real-world problems.
                      </p>
                      
                      <p>
                        Parallel to engineering, I have cultivated a four-year professional practice in creative media as a freelance video editor and motion graphics designer. Collaborating with more than 50 international clients across commercial branding, academic crash courses, and digital creators, I produce rhythmic, high-retention video assets and title animations using Adobe After Effects, Premiere Pro, and DaVinci Resolve.
                      </p>

                      <p>
                        I believe software and engineering tools should serve people with clarity and purpose. That philosophy drives my public initiatives, developed to meet genuine educational and community needs:
                      </p>
                    </div>

                    {/* Featured Work Links */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <Link
                        href="/projects/ioe-admission-guide"
                        className="p-5 rounded-2xl border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 hover:border-[#087A5B] dark:hover:border-[#34D399] transition-colors group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm sm:text-base text-[#17212F] dark:text-[#F8FAFC] group-hover:text-[#087A5B] dark:group-hover:text-[#34D399] transition-colors">
                              IOE Admission Hub
                            </h3>
                            <span className="text-xs text-[#087A5B] dark:text-[#34D399] font-mono group-hover:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </div>
                          <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed">
                            Admission analytics platform providing CBT score estimation and campus priority counseling for Nepalese engineering applicants.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-[#087A5B] dark:text-[#34D399] mt-3 uppercase tracking-wider font-semibold">
                          Next.js · Analytics
                        </span>
                      </Link>

                      <Link
                        href="/projects/sportivo"
                        className="p-5 rounded-2xl border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 hover:border-[#087A5B] dark:hover:border-[#34D399] transition-colors group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm sm:text-base text-[#17212F] dark:text-[#F8FAFC] group-hover:text-[#087A5B] dark:group-hover:text-[#34D399] transition-colors">
                              Sportivo
                            </h3>
                            <span className="text-xs text-[#087A5B] dark:text-[#34D399] font-mono group-hover:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </div>
                          <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed">
                            Live sports match center with dynamic telemetry, real-time score feeds, and interactive multi-stream switching.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-[#087A5B] dark:text-[#34D399] mt-3 uppercase tracking-wider font-semibold">
                          React · WebSockets
                        </span>
                      </Link>

                      <Link
                        href="/projects/git-visualizer"
                        className="p-5 rounded-2xl border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 hover:border-[#087A5B] dark:hover:border-[#34D399] transition-colors group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm sm:text-base text-[#17212F] dark:text-[#F8FAFC] group-hover:text-[#087A5B] dark:group-hover:text-[#34D399] transition-colors">
                              Git Visualizer
                            </h3>
                            <span className="text-xs text-[#087A5B] dark:text-[#34D399] font-mono group-hover:translate-x-0.5 transition-transform">
                              →
                            </span>
                          </div>
                          <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed">
                            Interactive directed acyclic graph (DAG) commit visualizer designed to teach branch topology and pointer operations.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-[#087A5B] dark:text-[#34D399] mt-3 uppercase tracking-wider font-semibold">
                          Graph Theory · SVG
                        </span>
                      </Link>

                      <div className="p-5 rounded-2xl border border-[#E4E9E5] dark:border-[#222933] bg-[#FFFFFF] dark:bg-[#11151C]/60 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm sm:text-base text-[#17212F] dark:text-[#F8FAFC]">
                              BeatMarker
                            </h3>
                            <span className="font-mono text-[10px] text-[#596579] dark:text-[#94A3B8]">
                              Automation
                            </span>
                          </div>
                          <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed">
                            Adobe After Effects CEP extension automating audio waveform transient marker placement for rhythmic video cuts.
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-[#087A5B] dark:text-[#34D399] mt-3 uppercase tracking-wider font-semibold">
                          ExtendScript · CEP
                        </span>
                      </div>
                    </div>

                  </main>
                </div>

                {/* 3. PROFESSIONAL INFORMATION GRID (MINIMAL TYPOGRAPHY & DIVIDERS) */}
                <section className="mt-20 sm:mt-28 pt-12 border-t border-[#E4E9E5] dark:border-[#222933]" aria-labelledby="domains-heading">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#087A5B] dark:text-[#34D399] font-bold">
                        Domains &amp; Competencies
                      </span>
                      <h2 id="domains-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17212F] dark:text-[#F8FAFC] mt-2">
                        Academic discipline and creative toolchains.
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#596579] dark:text-[#94A3B8] max-w-sm font-mono">
                      Rigorous engineering grounded in mathematics, coupled with digital media production.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E4E9E5] dark:divide-[#222933] border-y border-[#E4E9E5] dark:border-[#222933]">
                    
                    {/* Block 1: Education */}
                    <div className="py-6 md:py-8 lg:px-6 first:lg:pl-0">
                      <span className="font-mono text-xs text-[#087A5B] dark:text-[#34D399] font-semibold tracking-wider uppercase">
                        01 / Education
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#17212F] dark:text-[#F8FAFC] mt-2">
                        IOE Thapathali Campus
                      </h3>
                      <p className="text-xs text-[#087A5B] dark:text-[#34D399] font-medium mt-0.5">
                        Tribhuvan University · Kathmandu
                      </p>
                      <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed mt-3">
                        Bachelor of Engineering in Computer Engineering (2025 – 2029). Core studies in digital logic, microprocessors, algorithm design, data structures, and computer organization.
                      </p>
                    </div>

                    {/* Block 2: Technical Focus */}
                    <div className="py-6 md:py-8 md:pl-6 lg:px-6">
                      <span className="font-mono text-xs text-[#087A5B] dark:text-[#34D399] font-semibold tracking-wider uppercase">
                        02 / Technical Focus
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#17212F] dark:text-[#F8FAFC] mt-2">
                        AI / ML &amp; Embedded Systems
                      </h3>
                      <p className="text-xs text-[#087A5B] dark:text-[#34D399] font-medium mt-0.5">
                        Intelligent Systems &amp; Hardware
                      </p>
                      <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed mt-3">
                        Applied Machine Learning models, predictive architectures, Python scientific pipelines, C/C++ firmware, and hardware circuit simulation in Proteus.
                      </p>
                    </div>

                    {/* Block 3: Creative Practice */}
                    <div className="py-6 md:py-8 lg:px-6">
                      <span className="font-mono text-xs text-[#087A5B] dark:text-[#34D399] font-semibold tracking-wider uppercase">
                        03 / Creative Practice
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#17212F] dark:text-[#F8FAFC] mt-2">
                        Motion Graphics &amp; Video
                      </h3>
                      <p className="text-xs text-[#087A5B] dark:text-[#34D399] font-medium mt-0.5">
                        Commercial &amp; Educational Media
                      </p>
                      <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed mt-3">
                        Four years crafting visual narratives, kinetic typography, promotional explainers, and high-retention short-form edits for 50+ clients globally.
                      </p>
                    </div>

                    {/* Block 4: Production Stack */}
                    <div className="py-6 md:py-8 lg:px-6 last:lg:pr-0">
                      <span className="font-mono text-xs text-[#087A5B] dark:text-[#34D399] font-semibold tracking-wider uppercase">
                        04 / Toolchains
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#17212F] dark:text-[#F8FAFC] mt-2">
                        Software &amp; Workflows
                      </h3>
                      <p className="text-xs text-[#087A5B] dark:text-[#34D399] font-medium mt-0.5">
                        Production Environment
                      </p>
                      <p className="text-xs text-[#596579] dark:text-[#94A3B8] leading-relaxed mt-3">
                        After Effects, Premiere Pro, DaVinci Resolve, Next.js, React, Git, Tailwind CSS, Python, C, C++, and Proteus Design Suite.
                      </p>
                    </div>

                  </div>
                </section>

                {/* 4. STATISTICS & COLLABORATION (TYPOGRAPHIC METRICS STRIP) */}
                <section className="mt-20 sm:mt-24 pt-12 border-t border-[#E4E9E5] dark:border-[#222933]" aria-labelledby="stats-heading">
                  <div className="mb-10">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#087A5B] dark:text-[#34D399] font-bold">
                      Key Metrics
                    </span>
                    <h2 id="stats-heading" className="text-2xl sm:text-3xl font-bold tracking-tight text-[#17212F] dark:text-[#F8FAFC] mt-2">
                      Track record and collaboration availability.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    
                    {/* Stat 1: Years Experience */}
                    <div className="flex flex-col justify-between border-l-2 border-[#087A5B] dark:border-[#34D399] pl-4 sm:pl-5">
                      <div>
                        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17212F] dark:text-[#F8FAFC]">
                          {yearsExp}
                        </span>
                        <p className="font-mono text-xs uppercase tracking-wider text-[#17212F] dark:text-[#F8FAFC] font-bold mt-2">
                          Years Experience
                        </p>
                      </div>
                      <p className="text-xs text-[#596579] dark:text-[#94A3B8] mt-2 leading-relaxed">
                        Motion graphics design, digital video editing, and post-production workflows.
                      </p>
                    </div>

                    {/* Stat 2: Global Clients */}
                    <div className="flex flex-col justify-between border-l-2 border-[#087A5B] dark:border-[#34D399] pl-4 sm:pl-5">
                      <div>
                        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#17212F] dark:text-[#F8FAFC]">
                          {clientsCount}
                        </span>
                        <p className="font-mono text-xs uppercase tracking-wider text-[#17212F] dark:text-[#F8FAFC] font-bold mt-2">
                          Global Clients
                        </p>
                      </div>
                      <p className="text-xs text-[#596579] dark:text-[#94A3B8] mt-2 leading-relaxed">
                        Commercial campaigns, educational content, and digital media partnerships.
                      </p>
                    </div>

                    {/* Stat 3: Campus Affiliation */}
                    <div className="flex flex-col justify-between border-l-2 border-[#087A5B] dark:border-[#34D399] pl-4 sm:pl-5">
                      <div>
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#17212F] dark:text-[#F8FAFC]">
                          IOE
                        </span>
                        <p className="font-mono text-xs uppercase tracking-wider text-[#17212F] dark:text-[#F8FAFC] font-bold mt-2">
                          Thapathali Campus
                        </p>
                      </div>
                      <p className="text-xs text-[#596579] dark:text-[#94A3B8] mt-2 leading-relaxed">
                        Tribhuvan University, Kathmandu. Bachelor of Engineering in Computer Engineering.
                      </p>
                    </div>

                    {/* Stat 4: Connect & Collaborate */}
                    <div className="flex flex-col justify-between border-l-2 border-[#087A5B] dark:border-[#34D399] pl-4 sm:pl-5">
                      <div>
                        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#087A5B] dark:text-[#34D399]">
                          Active
                        </span>
                        <p className="font-mono text-xs uppercase tracking-wider text-[#17212F] dark:text-[#F8FAFC] font-bold mt-2">
                          Collaboration
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#596579] dark:text-[#94A3B8] mt-2 leading-relaxed">
                          Open for AI/ML engineering collaborations, academic research, and motion design commissions.
                        </p>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#087A5B] dark:text-[#34D399] hover:underline mt-3"
                        >
                          <span>Send an inquiry</span>
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>

                  </div>
                </section>

                {/* 5. SEQUENTIAL NAVIGATION */}
                <div className="mt-16 sm:mt-20">
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
