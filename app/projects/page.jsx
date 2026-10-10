"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';
import PagePagination from '../../components/PagePagination';

function MotionReelsGraphic() {
  return (
    <div className="relative aspect-[16/10] w-full bg-[#0A100D] text-slate-200 overflow-hidden select-none font-mono flex flex-col justify-between p-4 sm:p-5 border border-slate-200 dark:border-[#26372F] rounded-lg">
      {/* Top Monitor Status Bar */}
      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#26372F]/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="font-bold text-red-400">REC · 4K UHD</span>
        </div>
        <div className="text-slate-400 font-medium hidden sm:block">120 FPS · OPTICAL FLOW</div>
        <div className="text-[#34D399] font-bold">00:01:24:18</div>
      </div>

      {/* Main Center Video Grading Scope & Motion Path Canvas */}
      <div className="relative my-auto py-3 flex flex-col items-center justify-center">
        {/* Speed Ramp Bezier Curve Visual */}
        <div className="w-full relative h-20 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" fill="none">
            {/* Grid guide lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="#1F2E27" strokeDasharray="3 3" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="#1F2E27" strokeDasharray="3 3" />
            
            {/* Speed Ramping Curve */}
            <path 
              d="M 10 65 Q 70 65 95 35 T 160 15 T 225 35 Q 250 65 290 65" 
              stroke="#34D399" 
              strokeWidth="2.5" 
              fill="none" 
            />
            {/* Area fill under curve */}
            <path 
              d="M 10 65 Q 70 65 95 35 T 160 15 T 225 35 Q 250 65 290 65 L 290 75 L 10 75 Z" 
              fill="url(#emeraldGlow)" 
              opacity="0.15" 
            />
            <defs>
              <linearGradient id="emeraldGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Keyframe Nodes */}
            <circle cx="95" cy="35" r="4" fill="#34D399" />
            <circle cx="160" cy="15" r="4.5" fill="#FFFFFF" stroke="#34D399" strokeWidth="2" />
            <circle cx="225" cy="35" r="4" fill="#34D399" />
          </svg>

          {/* Floating Keyframe Label */}
          <div className="absolute top-0 text-[10px] bg-[#162920] border border-[#34D399]/40 text-[#34D399] px-2 py-0.5 rounded shadow">
            Speed Ramp · 120fps (20% Speed)
          </div>
        </div>

        {/* Framing Crosshairs & Metadata */}
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
      <div className="space-y-1.5 pt-2 border-t border-[#26372F]/80 text-[10px]">
        {/* Track V1 */}
        <div className="flex items-center gap-2">
          <span className="w-6 text-slate-400 font-semibold">V1</span>
          <div className="flex-1 h-4 rounded bg-[#162B21] border border-[#34D399]/30 flex items-center px-2 text-[#34D399] font-medium overflow-hidden">
            <span>Main Footage (4K 120fps Capture)</span>
          </div>
        </div>
        {/* Track A1 */}
        <div className="flex items-center gap-2">
          <span className="w-6 text-slate-400 font-semibold">A1</span>
          <div className="flex-1 h-4 rounded bg-[#11221B] border border-[#26372F] flex items-center px-2 gap-1 overflow-hidden">
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

const FEATURED_PROJECTS = [
  {
    id: "sportivo",
    title: "Sportivo",
    category: "dev",
    categoryLabel: "Development",
    label: "Featured Project",
    type: "Live Sports Streaming Platform",
    description: "A real-time live sports streaming web application engineered to aggregate match schedules across international football, cricket, and basketball leagues. Features automated background scraping, resilient multi-server stream switching with fallback logic, and direct shareable match URLs.",
    image: "/sportivo-preview.jpg",
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://sportivo.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/sportivo",
    articleUrl: "https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app",
    detailUrl: "/projects/sportivo"
  },
  {
    id: "git-visualizer",
    title: "Git Visualizer",
    category: "dev",
    categoryLabel: "Development",
    label: "Featured Project",
    type: "Interactive Educational Tool",
    description: "An interactive, canvas-driven learning tool designed to demystify Git version control internals. Dynamically renders directed acyclic graph (DAG) commit structures, branch pointers, and HEAD movements in real time as users execute simulated commit, branch, checkout, and merge commands.",
    image: "/git-preview.jpg",
    tech: ["HTML5 Canvas", "JavaScript", "Git DAG", "CSS3"],
    liveUrl: "https://git-visualizer.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/git-visualizer",
    articleUrl: "https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control",
    detailUrl: "/projects/git-visualizer"
  },
  {
    id: "ioe-admission",
    title: "IOE Admission Guide",
    category: "dev",
    categoryLabel: "Development",
    label: "Featured Project",
    type: "Web Application",
    description: "A comprehensive counseling and admissions portal built for Tribhuvan University engineering applicants. Evaluates five years of historical entrance cutoff percentiles to deliver statistical rank-based college predictions, procedural campus counseling checklists, and automated priority forms.",
    image: "/ioe-preview.jpg",
    tech: ["React", "JavaScript", "Data Analytics", "Tailwind CSS"],
    liveUrl: "https://ioe-admission.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/ioe-admission-guide",
    detailUrl: "/projects/ioe-admission-guide"
  },
  {
    id: "sports-reels",
    title: "Sports Highlight Motion Reels",
    category: "media",
    categoryLabel: "Creative Media",
    label: "Featured Project",
    type: "Motion Graphics & Video Editing",
    description: "High-impact short-form sports highlight edits created for commercial clients and athletics tournaments. Incorporates beat-matched cut sequencing, 120fps optical-flow speed ramping, custom multi-layered stadium sound design (-14 LUFS standard), and cinematic color grading in DaVinci Resolve.",
    image: null,
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design"],
    detailUrl: "/projects/sports-reels",
    modalDetails: {
      overview: "Commercial sports motion edits designed for multi-platform short-form distribution. Combines dynamic speed ramps, beat-matched cut points, and cinematic color transformation.",
      architecture: [
        "Optical flow frame interpolation for artifact-free 120fps slow-motion deceleration.",
        "Multi-layer sound design including turf impacts, ball strikes, whooshes, and stadium crowd reverb.",
        "Color grading in DaVinci Resolve utilizing custom tone curves and Rec.709 color transformation.",
        "Framing architecture with dual export optimization for vertical 9:16 and widescreen 16:9 formats."
      ],
      metrics: "Over 50+ delivered video assets for sports academies, tournaments, and creative clients."
    }
  }
];

const NOTEWORTHY_PROJECTS = [
  {
    id: "555-flasher",
    title: "Astable Multivibrator LED Flasher",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Hardware Circuit Prototype",
    description: "Physical breadboard relaxation oscillator circuit built with the NE555 timer IC in an astable configuration. Calculates RC timing networks to generate stable square-wave switching pulses across complementary output LEDs.",
    tech: ["NE555 Timer IC", "Circuit Analysis", "Proteus ISIS", "Breadboard"],
    detailUrl: "/projects/555-flasher",
    modalDetails: {
      overview: "A hardware relaxation oscillator prototype engineered around the NE555 timer IC in astable multivibrator configuration, generating continuous square-wave pulses for dual complementary LEDs.",
      architecture: [
        "RC timing network calculation: frequency f = 1.44 / ((R₁ + 2R₂) × C₁).",
        "Charge cycle: t_high = 0.693 × (R₁ + R₂) × C₁; Discharge cycle: t_low = 0.693 × R₂ × C₁.",
        "Bypass capacitor decoupling (100nF on pin 5) suppressing supply ripple and false triggering.",
        "Transient simulation executed in Proteus ISIS prior to physical breadboard prototyping and oscilloscope validation."
      ],
      metrics: "Operates at 1.5 Hz oscillation frequency with 60% duty cycle on 9V rail."
    }
  },
  {
    id: "motor-modeling",
    title: "Electrical Machinery Modeling",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Engineering Analysis",
    description: "Steady-state mathematical modeling and parameter derivation for 3-phase squirrel cage induction machines and DC motors. Derives torque-speed curves from locked-rotor test data and solves complex stator/rotor phasor impedance networks.",
    tech: ["Electrical Machines", "Phasor Calculus", "Motor Analysis", "MATLAB"],
    detailUrl: "/projects/motor-modeling",
    modalDetails: {
      overview: "Mathematical analysis and steady-state simulation of 3-phase squirrel cage induction machines and separately excited DC motors conducted as part of electrical engineering coursework at IOE Thapathali Campus.",
      architecture: [
        "Equivalent circuit parameter estimation derived from locked-rotor and no-load laboratory test datasets.",
        "Analytical derivation of electromagnetic torque curves across slip variations (s = 0 to s = 1).",
        "Phasor analysis modeling stator magnetizing reactances, rotor impedance reflections, and power factor variations.",
        "Identification of pull-out breakdown torque thresholds and starting current limits."
      ],
      metrics: "Calculated torque-speed profiles matching experimental dynamo bench test results within ±3.5% error."
    }
  },
  {
    id: "analyzer-diag",
    title: "Automated Analyzer Diagnostics",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Instrumentation Engineering",
    description: "Diagnostic troubleshooting protocol and component analysis for automated clinical immunoassay and biochemical laboratory equipment. Analyzes negative pressure tolerances (-40 to -60 kPa), micro-stepping syringe probe calibrations, and electro-fluidic valve sequences.",
    tech: ["Biomedical Tech", "Fluidics", "Calibration Systems", "Instrumentation"],
    detailUrl: "/projects/analyzer-diag",
    modalDetails: {
      overview: "Diagnostic methodology development and electromechanical troubleshooting protocols for automated clinical immunoassay and biochemical laboratory instruments.",
      architecture: [
        "Pneumatic sub-assembly verification for vacuum waste lines and pressure transducers (-40 to -60 kPa tolerance).",
        "Stepper motor microstepping calibration for micro-liter reagent aspirate/dispense precision (±1.0 µL repeatability).",
        "Liquid level detection (capacitive probe sensing) verification and electro-pneumatic pinch valve lifecycle maintenance.",
        "Systematic fault isolation decision trees reducing diagnostic downtime during laboratory maintenance."
      ],
      metrics: "Comprehensive technical protocol covering 12 common electro-fluidic fault states."
    }
  }
];

const ALL_PROJECTS = [...FEATURED_PROJECTS, ...NOTEWORTHY_PROJECTS];

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');

  const filteredFeatured = FEATURED_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const filteredNoteworthy = NOTEWORTHY_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const totalCount = ALL_PROJECTS.length;
  const devCount = ALL_PROJECTS.filter((p) => p.category === 'dev').length;
  const mediaCount = ALL_PROJECTS.filter((p) => p.category === 'media').length;
  const expCount = ALL_PROJECTS.filter((p) => p.category === 'exp').length;

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]} />

          <FadeUp>
            <section id="projects" className={`pt-24 sm:pt-28 pb-32 px-4 sm:px-8 lg:px-16 max-w-6xl mx-auto w-full ${theme.bg}`}>
              
              {/* A. Clean Section Heading */}
              <header className="mb-16 sm:mb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-[#26372F] pb-8">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
                      <span className="font-mono text-sm sm:text-base font-normal text-[#065F46] dark:text-[#34D399]">03.</span>
                      Projects
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-[#475569] dark:text-[#A7B0BE] max-w-xl leading-relaxed">
                      A selection of web systems, interactive tools, hardware simulations, and creative media I&apos;ve engineered.
                    </p>
                  </div>

                  {/* Compact, understated category filter row */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono tracking-wider self-start md:self-auto" role="tablist" aria-label="Filter projects">
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

              {/* B & C. Featured Projects (Brittany Chiang-Inspired Alternating Presentation) */}
              {filteredFeatured.length > 0 && (
                <div className="space-y-20 sm:space-y-28 mb-24">
                  {filteredFeatured.map((project, idx) => {
                    const isEven = idx % 2 === 0;

                    return (
                      <article
                        key={project.id}
                        className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                      >
                        {/* 1. Real Visual Preview (7 columns on desktop) */}
                        <div
                          className={`lg:col-span-7 ${
                            isEven ? 'lg:order-1' : 'lg:order-2'
                          }`}
                        >
                          <Link
                            href={project.detailUrl}
                            className="group block relative rounded-lg overflow-hidden border border-slate-200 dark:border-[#26372F] bg-slate-100 dark:bg-[#121A17] shadow-sm hover:border-[#065F46]/60 dark:hover:border-[#34D399]/60 transition-colors focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
                            aria-label={`View ${project.title} case study`}
                          >
                            {project.image ? (
                              <div className="relative aspect-[16/10] w-full overflow-hidden">
                                <Image
                                  src={project.image}
                                  alt={`${project.title} interface preview`}
                                  fill
                                  priority={idx === 0}
                                  sizes="(max-width: 1024px) 100vw, 58vw"
                                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                                />
                                <div className="absolute inset-0 bg-[#065F46]/10 dark:bg-[#34D399]/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                              </div>
                            ) : (
                              <div className="relative">
                                <MotionReelsGraphic />
                                <div className="absolute inset-0 bg-[#065F46]/10 dark:bg-[#34D399]/10 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                              </div>
                            )}
                          </Link>
                        </div>

                        {/* 2. Structured Content (5 columns on desktop, overlapping aligned) */}
                        <div
                          className={`lg:col-span-5 flex flex-col ${
                            isEven ? 'lg:order-2 lg:text-left' : 'lg:order-1 lg:text-right'
                          }`}
                        >
                          {/* Eyebrow Label */}
                          <div className="font-mono text-xs text-[#065F46] dark:text-[#34D399] tracking-wider mb-1 font-semibold">
                            {project.label || "Featured Project"} &middot; {project.categoryLabel}
                          </div>

                          {/* Project Title */}
                          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-3">
                            <Link
                              href={project.detailUrl}
                              className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
                            >
                              {project.title}
                            </Link>
                          </h2>

                          {/* Concise, Readable Description Block */}
                          <div className="p-5 sm:p-6 rounded-lg bg-white dark:bg-[#121A17] border border-slate-200 dark:border-[#26372F] shadow-sm mb-4 text-sm leading-relaxed text-[#334155] dark:text-[#A7B0BE]">
                            <p>{project.description}</p>
                          </div>

                          {/* Relevant Monospace Tech List */}
                          <ul
                            className={`flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[#64748B] dark:text-[#94A3B8] mb-5 ${
                              isEven ? 'justify-start' : 'lg:justify-end justify-start'
                            }`}
                          >
                            {project.tech.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>

                          {/* Subtle Links */}
                          <div
                            className={`flex items-center gap-4 text-xs font-mono ${
                              isEven ? 'justify-start' : 'lg:justify-end justify-start'
                            }`}
                          >
                            <Link
                              href={project.detailUrl}
                              className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399] group"
                            >
                              <span>Case Study</span>
                              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </Link>

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors p-1"
                                aria-label={`${project.title} live application`}
                                title="Live Application"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
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
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                              </a>
                            )}

                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors p-1"
                                aria-label={`${project.title} live application`}
                                title="Launch App"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                              </a>
                            )}

                            {project.articleUrl && (
                              <a
                                href={project.articleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors p-1"
                                aria-label={`Read article about ${project.title}`}
                                title="Engineering Article"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* C. Other Engineering Prototypes & Experiments (Clean Aligned Grid) */}
              {filteredNoteworthy.length > 0 && (
                <div className="pt-12 border-t border-slate-200 dark:border-[#26372F]">
                  <div className="text-center mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                      Other Noteworthy Engineering Projects
                    </h2>
                    <p className="mt-1 font-mono text-xs text-[#065F46] dark:text-[#34D399]">
                      Hardware prototypes, machinery analysis, and laboratory instrumentation
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {filteredNoteworthy.map((project) => (
                      <article
                        key={project.id}
                        className="group flex flex-col justify-between p-6 rounded-lg bg-white dark:bg-[#121A17] border border-slate-200 dark:border-[#26372F] shadow-sm hover:-translate-y-1 hover:border-[#065F46]/60 dark:hover:border-[#34D399]/60 transition-all duration-300"
                      >
                        <div>
                          {/* Top Row: Technical Icon & External Action */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[#065F46] dark:text-[#34D399]" aria-hidden="true">
                              {project.id === '555-flasher' ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                              ) : project.id === 'motor-modeling' ? (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                              ) : (
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                              )}
                            </span>

                            <Link
                              href={project.detailUrl}
                              className="text-[#64748B] dark:text-[#94A3B8] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors p-1"
                              aria-label={`View specs for ${project.title}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </Link>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors mb-2">
                            <Link
                              href={project.detailUrl}
                              className="text-left"
                            >
                              {project.title}
                            </Link>
                          </h3>

                          {/* Description */}
                          <p className="text-xs sm:text-sm text-[#475569] dark:text-[#A7B0BE] leading-relaxed mb-4">
                            {project.description}
                          </p>
                        </div>

                        <div>
                          {/* Tech Stack */}
                          <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-[#64748B] dark:text-[#7A8A82] pt-3 border-t border-slate-100 dark:border-[#1E2D26] mb-3">
                            {project.tech.map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>

                          {/* Dedicated Breakdown Link */}
                          <Link
                            href={project.detailUrl}
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#065F46] dark:text-[#34D399] hover:underline group"
                          >
                            <span>Technical Breakdown</span>
                            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              <PagePagination 
                prev={{ label: 'Technical Skills', path: '/skills' }} 
                next={{ label: 'Certificates & Credentials', path: '/certificates' }} 
              />
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
