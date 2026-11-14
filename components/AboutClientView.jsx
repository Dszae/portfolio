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
  const headline = profile.headline || "Bridging Analytical Logic and Visual Execution";
  const bio = profile.bio || "I am a Computer Engineering undergraduate student at the Institute of Engineering (IOE), Thapathali Campus in Kathmandu, Nepal. My work spans Artificial Intelligence, Machine Learning algorithms, intelligent systems, and hardware simulations.";
  const secondaryBio = profile.secondary_bio || "Alongside engineering studies, I have accumulated over 4+ years of professional freelance experience as a video editor and motion graphics designer, collaborating with 50+ clients internationally to deliver high-impact visual media.";
  const yearsExp = profile.years_experience || "4+";
  const clientsCount = profile.clients_count || "50+";

  const effectiveBreadcrumbs = breadcrumbItems || [
    { name: 'Home', path: '/' },
    { name: pageTitle, path: '/about' }
  ];

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={effectiveBreadcrumbs} />
          {jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
            />
          )}

          <FadeUp>
            <section id="about" className={`pt-36 sm:pt-44 subpage-container pb-28 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-6xl mx-auto w-full">
                
                {/* 1. Page Header (Editorial Monograph Style) */}
                <header className="mb-16 sm:mb-24">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#065F46] dark:text-[#34D399] font-bold mb-4">
                    <span>01</span>
                    <span className="w-8 h-[1px] bg-current opacity-60"></span>
                    <span>Identity & Profile</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-[1.1]">
                    Dipesh Sapkota
                  </h1>
                  <p className="mt-4 text-lg sm:text-xl font-mono font-medium text-[#1E293B] dark:text-[#CBD5E1]">
                    Computer Engineering Student · AI/ML Enthusiast · Motion Designer
                  </p>
                </header>

                {/* 2. Hero Editorial Split (Portrait + Bio) - No card wrappers */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#CBD5E1] dark:border-[#334155]">
                  
                  {/* Left Column: Authentic Portrait + Quick Specs */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#E2E8F0] dark:bg-[#1E293B] border border-[#CBD5E1] dark:border-[#334155] cursor-pointer">
                      <Image
                        src="/dipeshsapkota_2.png"
                        alt="Dipesh Sapkota - Computer Engineering Student at IOE Thapathali Campus and AI/ML Enthusiast"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
                      />
                    </div>

                    {/* Metadata Ledger */}
                    <dl className="grid grid-cols-2 gap-y-4 pt-2 font-mono text-xs">
                      <div>
                        <dt className="uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">Location</dt>
                        <dd className="mt-1 font-bold text-[#0F172A] dark:text-[#F8FAFC]">Kathmandu, Nepal</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">Institution</dt>
                        <dd className="mt-1 font-bold text-[#0F172A] dark:text-[#F8FAFC]">IOE Thapathali</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">Degree</dt>
                        <dd className="mt-1 font-bold text-[#0F172A] dark:text-[#F8FAFC]">B.E. Computer Eng.</dd>
                      </div>
                      <div>
                        <dt className="uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">Status</dt>
                        <dd className="mt-1 font-bold text-[#065F46] dark:text-[#34D399]">Available for Projects</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Right Column: Editorial Prose */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-[1.25] mb-8">
                        {headline}
                      </h2>
                      
                      <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#0F172A] dark:text-[#E2E8F0]">
                        <p>{bio}</p>
                        <p>{secondaryBio}</p>
                        <p>
                          My engineering workflow prioritizes algorithmic structure, systems reliability, and hands-on simulation. I engineer tools that demystify technical abstractions, including{' '}
                          <Link href="/projects/git-visualizer" className="text-[#065F46] dark:text-[#34D399] font-bold underline underline-offset-4 hover:opacity-80">
                            Git Visualizer
                          </Link>{' '}
                          (an interactive DAG commit simulator),{' '}
                          <Link href="/projects/sportivo" className="text-[#065F46] dark:text-[#34D399] font-bold underline underline-offset-4 hover:opacity-80">
                            Sportivo
                          </Link>{' '}
                          (a live sports fixture platform), and{' '}
                          <Link href="/projects/ioe-admission-guide" className="text-[#065F46] dark:text-[#34D399] font-bold underline underline-offset-4 hover:opacity-80">
                            IOE Admission Hub
                          </Link>{' '}
                          (an admission analytics tool for TU applicants).
                        </p>
                      </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-[#CBD5E1] dark:border-[#334155]">
                      <blockquote className="text-base font-medium text-[#1E293B] dark:text-[#CBD5E1] border-l-2 border-[#065F46] dark:border-[#34D399] pl-4 italic">
                        &ldquo;Software architecture is at its best when analytical rigor meets clear visual communication.&rdquo;
                      </blockquote>
                    </div>
                  </div>
                </div>

                {/* 3. Typographic Metrics Ticker (No Icon Cards) */}
                <div className="py-16 sm:py-20 border-b border-[#CBD5E1] dark:border-[#334155]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
                    <div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                        {yearsExp}
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">
                        Years Motion Design
                      </div>
                    </div>

                    <div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                        {clientsCount}
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">
                        Global Clients Served
                      </div>
                    </div>

                    <div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-[#065F46] dark:text-[#34D399] tracking-tight">
                        IOE
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">
                        Thapathali Campus (TU)
                      </div>
                    </div>

                    <div>
                      <div className="text-4xl sm:text-5xl font-mono font-bold text-[#0F172A] dark:text-[#F8FAFC] tracking-tight">
                        2026
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-semibold">
                        B.E. Cohort Graduation
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Structured Ledger / Index Rows (Cardless) */}
                <div className="py-16 sm:py-20">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#065F46] dark:text-[#34D399] font-bold mb-12">
                    <span>02</span>
                    <span className="w-8 h-[1px] bg-current opacity-60"></span>
                    <span>Core Competencies & Record</span>
                  </div>

                  <div className="divide-y divide-[#CBD5E1] dark:divide-[#334155]">
                    
                    {/* Row 1: Academic Foundation */}
                    <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                      <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">
                        01 / Formal Education
                      </div>
                      <div className="md:col-span-8">
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          Bachelor of Computer Engineering (B.E.)
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#1E293B] dark:text-[#CBD5E1]">
                          Institute of Engineering (IOE), Thapathali Campus · Tribhuvan University, Kathmandu, Nepal
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-[#1E293B] dark:text-[#E2E8F0] leading-relaxed">
                          Rigorous curriculum covering computer architecture, discrete mathematics, object-oriented programming, data structures & algorithms, operating systems, digital logic, and communication networks.
                        </p>
                      </div>
                    </div>

                    {/* Row 2: AI & Computing */}
                    <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                      <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">
                        02 / Computing & Intelligence
                      </div>
                      <div className="md:col-span-8">
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          Artificial Intelligence & Machine Learning
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#1E293B] dark:text-[#CBD5E1]">
                          Supervised models, neural patterns, computational simulations, and algorithms
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-[#1E293B] dark:text-[#E2E8F0] leading-relaxed">
                          Exploring algorithms that extract patterns from raw data, mathematical modeling, and applying ML techniques to real-world datasets alongside web application backends.
                        </p>
                      </div>
                    </div>

                    {/* Row 3: Hardware Simulation */}
                    <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                      <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">
                        03 / Hardware & Simulation
                      </div>
                      <div className="md:col-span-8">
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          Circuits, Breadboards & Simulation
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#1E293B] dark:text-[#CBD5E1]">
                          NE555 Timer Networks, Proteus Prototyping, and MATLAB DC Motor Control
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-[#1E293B] dark:text-[#E2E8F0] leading-relaxed">
                          Designing relaxation oscillators, analog-to-digital clock transitions, and simulating closed-loop electromechanical DC motor control with step response characterization.
                        </p>
                      </div>
                    </div>

                    {/* Row 4: Motion Design */}
                    <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                      <div className="md:col-span-4 font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#94A3B8] font-bold">
                        04 / Creative Direction
                      </div>
                      <div className="md:col-span-8">
                        <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          Motion Graphics & High-Impact Video Editing
                        </h3>
                        <p className="mt-1 text-sm font-semibold text-[#1E293B] dark:text-[#CBD5E1]">
                          Adobe Premiere Pro, Adobe After Effects, DaVinci Resolve, dynamic typography, and sound design
                        </p>
                        <p className="mt-3 text-sm sm:text-base text-[#1E293B] dark:text-[#E2E8F0] leading-relaxed">
                          4+ years producing high-energy sports edits, technical motion explainers, and commercial video assets for over 50 global creators and agencies.
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 5. Navigation Pagination */}
                <div className="pt-12 border-t border-[#CBD5E1] dark:border-[#334155]">
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


