"use client";

import React, { useState, useEffect, useRef } from 'react';
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
    description: "A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, and direct shareable match links.",
    featured: true,
    image: "/sportivo-preview.jpg",
    tech: ["Next.js", "React", "Node.js", "REST APIs"],
    liveUrl: "https://sportivo.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/sportivo",
    articleUrl: "https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app",
    detailUrl: "/projects/sportivo",
    modalDetails: {
      overview: "Sportivo is an end-to-end live sports web application that aggregates real-time broadcast schedules and distributes resilient streaming links for football, cricket, and basketball fans worldwide.",
      architecture: [
        "Dynamic web scraper cron capturing matches across international leagues.",
        "Adaptive multi-stream fallback engine with automated failover.",
        "Optimized client state caching reducing latency and backend query load.",
        "Zero-latency UI state transitions built on Next.js App Router."
      ],
      metrics: "Sub-second stream switching, 100+ daily match listings aggregated automatically."
    }
  },
  {
    id: "git-visualizer",
    title: "Git Visualizer",
    category: "dev",
    categoryLabel: "Development",
    type: "Interactive Tool",
    description: "An interactive educational tool designed to demystify Git version control operations through live data-flow rendering and dynamic canvas mapping of branching, commits, and merges.",
    featured: true,
    image: "/git-preview.jpg",
    tech: ["HTML5 Canvas", "JavaScript", "Git DAG", "CSS3"],
    liveUrl: "https://git-visualizer.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/git-visualizer",
    articleUrl: "https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control",
    detailUrl: "/projects/git-visualizer",
    modalDetails: {
      overview: "Git Visualizer helps computer engineering students and junior developers visualize the directed acyclic graph (DAG) structure underlying distributed version control systems.",
      architecture: [
        "Dynamic HTML5 Canvas renderer with reactive node graph positioning.",
        "Simulated command parser supporting commit, branch, checkout, merge, and rebase.",
        "Real-time visual branch pointers and HEAD reference tracking.",
        "Step-by-step interactive undo and commit ancestry highlighting."
      ],
      metrics: "Interactive simulation supporting complex multi-branch divergence and merges."
    }
  },
  {
    id: "ioe-admission",
    title: "IOE Admission Guide",
    category: "dev",
    categoryLabel: "Development",
    type: "Web Application",
    description: "A comprehensive admission ecosystem for Tribhuvan University engineering applicants, offering statistical rank prediction, procedural counseling checklists, and automated priority form generation.",
    featured: true,
    image: "/ioe-preview.jpg",
    tech: ["React", "JavaScript", "Data Analytics", "Tailwind CSS"],
    liveUrl: "https://ioe-admission.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/ioe-admission-guide",
    detailUrl: "/projects/ioe-admission-guide",
    modalDetails: {
      overview: "Built to eliminate uncertainty for thousands of Nepalese engineering aspirants, IOE Admission Guide converts complex historical cut-off percentiles into actionable rank-based predictions.",
      architecture: [
        "Historical rank-matching engine trained on 5+ years of IOE entrance cutoff statistics.",
        "Interactive campus and quota filtering covering constituent campuses (Pulchowk, Thapathali, ERC, WRC).",
        "Automated priority application builder preventing submission format errors.",
        "100% client-side privacy preserving user scores without mandatory accounts."
      ],
      metrics: "Used by over 3,000+ applicants during TU entrance counseling seasons."
    }
  },
  {
    id: "sports-reels",
    title: "Sports Highlight Motion Reels",
    category: "media",
    categoryLabel: "Creative Media",
    type: "Motion Graphics & Video Editing",
    description: "High-impact dynamic sports video editing showcasing football and cricket highlights. Features audio-visual rhythm synchronization, speed ramps, and custom color grading.",
    featured: false,
    image: "/cricket.webp",
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design"],
    modalDetails: {
      overview: "High-energy commercial sports motion edits designed for multi-platform short-form distribution. Combines dynamic speed ramps, beat-matched cut points, and cinematic color transformation.",
      architecture: [
        "Optical flow frame interpolation for artifact-free 120fps slow-motion deceleration.",
        "Multi-layer sound design including turf impacts, ball strikes, whooshes, and stadium crowd reverb.",
        "Color grading in DaVinci Resolve utilizing custom tone curves and Rec.709 color transformation.",
        "Framing architecture with dual export optimization for vertical 9:16 and widescreen 16:9 formats."
      ],
      metrics: "Over 50+ delivered video assets for sports academies, tournaments, and creative clients."
    }
  },
  {
    id: "555-flasher",
    title: "Astable Multivibrator LED Flasher",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Hardware Prototype",
    description: "Physical breadboard circuit built and simulated using an NE555 timer IC, calculating RC time constants for frequency control and stable square-wave oscillation cycles.",
    featured: false,
    tech: ["NE555 Timer IC", "Proteus Suite", "Breadboard", "Analog Oscilloscopy"],
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
    description: "Torque derivations and equivalent circuit analysis of three-phase induction and DC motors, solving complex phasor networks and performance characteristics.",
    featured: false,
    tech: ["Phasor Calculus", "Motor Analysis", "MATLAB", "Equivalent Circuits"],
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
    description: "Troubleshooting procedures for vacuum pressure systems, syringe probe calibrations, and electromechanical component layouts on medical immunoassay instruments.",
    featured: false,
    tech: ["Biomedical Tech", "Fluidics", "Calibration Systems", "Instrumentation"],
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

/* Refined Technical Illustration for 555-Timer Hardware */
function CircuitVisual() {
  return (
    <div className="w-full h-full bg-[#08130E] relative overflow-hidden flex flex-col justify-between p-5 font-mono select-none">
      <div 
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)',
          backgroundSize: '14px 14px'
        }}
      />
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#34D399] tracking-wider border-b border-[#10B981]/20 pb-2">
        <span className="flex items-center gap-2 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
          </span>
          NE555 OSCILLATOR
        </span>
        <span className="text-[10px] text-[#6EE7B7]/80 bg-[#062419] px-2 py-0.5 rounded border border-[#10B981]/30">
          ASTABLE CIRCUIT
        </span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-between gap-4 py-2">
        <div className="border border-[#10B981]/40 bg-[#0A261B]/90 rounded-lg p-2.5 shadow-md min-w-[115px]">
          <div className="text-[10px] text-[#6EE7B7] font-bold text-center border-b border-[#10B981]/30 pb-1 mb-1.5 flex items-center justify-between">
            <span>NE555P</span>
            <span className="text-[8.5px] text-[#34D399]/70">DIP-8</span>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[8.5px] text-[#A7F3D0]">
            <div>1: GND</div>
            <div className="text-right">8: VCC</div>
            <div>2: TRIG</div>
            <div className="text-right">7: DISCH</div>
            <div>3: OUT</div>
            <div className="text-right">6: THRES</div>
            <div>4: RST</div>
            <div className="text-right">5: CTRL</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center justify-between text-[9px] text-[#A7F3D0]/80 mb-1 px-1">
            <span>PULSE TRAIN</span>
            <span className="text-[#34D399] font-bold">f ≈ 1.5 Hz</span>
          </div>
          <div className="bg-[#051A13]/80 rounded border border-[#10B981]/30 p-1.5 overflow-hidden">
            <svg className="w-full h-8 stroke-[#34D399] fill-none" viewBox="0 0 160 32">
              <line x1="0" y1="16" x2="160" y2="16" stroke="#0D3525" strokeWidth="0.75" strokeDasharray="3,3" />
              <path
                d="M 0 25 L 18 25 L 18 7 L 48 7 L 48 25 L 68 25 L 68 7 L 98 7 L 98 25 L 118 25 L 118 7 L 148 7 L 148 25 L 160 25"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-[8.5px] text-[#6EE7B7]/90 text-center mt-1 font-mono">
            f = 1.44 / [(R₁ + 2R₂) · C₁]
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9.5px] text-[#A7F3D0]/80 border-t border-[#10B981]/20 pt-1.5">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          VCC: 9.0V DC
        </span>
        <span>DUTY: 60%</span>
        <span className="text-[#34D399]">ACTIVE</span>
      </div>
    </div>
  );
}

/* Refined Technical Illustration for Electrical Machinery Modeling */
function MotorModelingVisual() {
  return (
    <div className="w-full h-full bg-[#08111A] relative overflow-hidden flex flex-col justify-between p-5 font-mono select-none">
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)',
          backgroundSize: '14px 14px'
        }}
      />
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#38BDF8] tracking-wider border-b border-sky-900/40 pb-2">
        <span className="flex items-center gap-2 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0284C7] opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0284C7]" />
          </span>
          INDUCTION MOTOR
        </span>
        <span className="text-[10px] text-[#7DD3FC] bg-[#072738] px-2 py-0.5 rounded border border-[#38BDF8]/30">
          PHASOR MODEL
        </span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-around gap-2 py-2">
        <div className="w-18 h-18 rounded-full border border-[#0284C7]/50 relative flex items-center justify-center bg-[#072738]/50 shadow-inner">
          <div className="absolute inset-0 border border-dashed border-[#38BDF8]/25 rounded-full" />
          <svg className="w-full h-full" viewBox="0 0 72 72">
            <line x1="36" y1="4" x2="36" y2="68" stroke="#0284C7" strokeWidth="0.75" strokeDasharray="2,2" />
            <line x1="4" y1="36" x2="68" y2="36" stroke="#0284C7" strokeWidth="0.75" strokeDasharray="2,2" />
            <line x1="36" y1="36" x2="36" y2="10" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            <polygon points="36,7 33,12 39,12" fill="#38BDF8" />
            <line x1="36" y1="36" x2="58" y2="47" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
            <polygon points="61,49 55,45 57,51" fill="#34D399" />
          </svg>
          <span className="absolute top-1 left-2 text-[7.5px] text-[#38BDF8] font-bold">V₁ ∠ 0°</span>
          <span className="absolute bottom-1 right-2 text-[7.5px] text-[#34D399] font-bold">I₁ ∠ -θ</span>
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-[8.5px] text-[#7DD3FC] mb-1 font-semibold flex justify-between">
            <span>TORQUE-SLIP CURVE</span>
            <span className="text-[#F59E0B]">T_max</span>
          </div>
          <div className="bg-[#051622]/80 rounded border border-[#0284C7]/30 p-1">
            <svg className="w-28 h-11 stroke-[#38BDF8] fill-none" viewBox="0 0 110 44">
              <line x1="8" y1="38" x2="104" y2="38" stroke="#334155" strokeWidth="1" />
              <line x1="8" y1="4" x2="8" y2="38" stroke="#334155" strokeWidth="1" />
              <path
                d="M 8 38 Q 38 4, 56 16 T 100 38"
                strokeWidth="2"
                stroke="#38BDF8"
              />
              <circle cx="38" cy="9" r="2.5" fill="#F59E0B" />
            </svg>
          </div>
          <div className="text-[7.5px] text-slate-400 flex items-center justify-between mt-0.5 px-0.5">
            <span>s=1 (Start)</span>
            <span className="text-[#F59E0B]">Pull-Out</span>
            <span>s=0 (Sync)</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9.5px] text-[#7DD3FC]/80 border-t border-sky-900/40 pt-1.5">
        <span>3-PHASE 400V</span>
        <span>COS φ: 0.85 LAG</span>
        <span className="text-emerald-400">NOMINAL</span>
      </div>
    </div>
  );
}

/* Refined Technical Illustration for Automated Analyzer Diagnostics */
function AnalyzerDiagVisual() {
  return (
    <div className="w-full h-full bg-[#081517] relative overflow-hidden flex flex-col justify-between p-5 font-mono select-none">
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: 'radial-gradient(#14B8A6 1px, transparent 1px)',
          backgroundSize: '14px 14px'
        }}
      />
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#2DD4BF] tracking-wider border-b border-teal-900/40 pb-2">
        <span className="flex items-center gap-2 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0D9488] opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0D9488]" />
          </span>
          FLUIDIC DIAGNOSTICS
        </span>
        <span className="text-[10px] text-[#5EEAD4] bg-[#042F2E] px-2 py-0.5 rounded border border-[#14B8A6]/30">
          IMMUNOASSAY
        </span>
      </div>

      <div className="relative z-10 my-auto flex items-center justify-between gap-3 py-2">
        <div className="border border-[#14B8A6]/40 bg-[#042A29]/80 rounded-lg p-2 flex-1 shadow-md">
          <div className="text-[8.5px] text-[#99F6E4] font-bold mb-1 flex items-center justify-between">
            <span>PROBE VOL</span>
            <span className="text-[#34D399]">±1.0 µL</span>
          </div>
          <div className="w-full bg-[#021817] rounded-full h-2 border border-[#14B8A6]/30 p-0.5 overflow-hidden">
            <div className="bg-[#2DD4BF] h-full rounded-full w-3/4" />
          </div>
          <div className="text-[7.5px] text-teal-300/80 mt-1 flex justify-between">
            <span>ASPIRATE: OK</span>
            <span>LEVEL: SENSED</span>
          </div>
        </div>

        <div className="border border-[#14B8A6]/40 bg-[#042A29]/80 rounded-lg p-2 flex-1 shadow-md">
          <div className="text-[8.5px] text-[#99F6E4] font-bold mb-1 flex items-center justify-between">
            <span>VACUUM P</span>
            <span className="text-[#F59E0B]">-48.2 kPa</span>
          </div>
          <div className="w-full bg-[#021817] rounded-full h-2 border border-[#14B8A6]/30 p-0.5 overflow-hidden">
            <div className="bg-[#F59E0B] h-full rounded-full w-4/5" />
          </div>
          <div className="text-[7.5px] text-teal-300/80 mt-1 flex justify-between">
            <span>-40 to -60 kPa</span>
            <span className="text-emerald-400 font-bold">NOMINAL</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9.5px] text-[#5EEAD4]/80 border-t border-teal-900/40 pt-1.5">
        <span>VALVES: 12/12 CYCLE OK</span>
        <span>ERROR LOGS: 0</span>
        <span className="text-emerald-400">READY</span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const modalCloseBtnRef = useRef(null);
  const lastActiveElementRef = useRef(null);

  const handleCloseModal = () => {
    setActiveModalProject(null);
    if (lastActiveElementRef.current) {
      lastActiveElementRef.current.focus();
    }
  };

  const handleOpenModal = (project, e) => {
    lastActiveElementRef.current = e?.currentTarget || null;
    setActiveModalProject(project);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeModalProject) {
        handleCloseModal();
      }
    };

    if (activeModalProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        modalCloseBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalProject]);

  const devCount = ALL_PROJECTS.filter((p) => p.category === 'dev').length;
  const mediaCount = ALL_PROJECTS.filter((p) => p.category === 'media').length;
  const expCount = ALL_PROJECTS.filter((p) => p.category === 'exp').length;

  const sportivo = ALL_PROJECTS.find((p) => p.id === 'sportivo');
  const gitVisualizer = ALL_PROJECTS.find((p) => p.id === 'git-visualizer');
  const ioeAdmission = ALL_PROJECTS.find((p) => p.id === 'ioe-admission');
  const sportsReels = ALL_PROJECTS.find((p) => p.id === 'sports-reels');
  const expProjects = ALL_PROJECTS.filter((p) => p.category === 'exp');

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]} />

          <FadeUp>
            <section id="projects" className={`pt-24 sm:pt-28 pb-32 px-4 sm:px-6 lg:px-8 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                
                {/* 1. Concise Editorial Intro */}
                <header className="mb-14 sm:mb-16">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#065F46] dark:text-[#34D399] font-bold mb-2">
                    Selected Work
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-neutral-800 pb-6">
                    <div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight">
                        Projects that bring ideas to life.
                      </h1>
                      <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl">
                        A curated archive of full-stack web applications, interactive visual tools, hardware prototypes, and creative motion production.
                      </p>
                    </div>

                    {/* Compact Filter Navigation */}
                    <div className="flex items-center gap-5 sm:gap-6 text-xs font-mono uppercase tracking-wider self-start md:self-auto" role="tablist" aria-label="Filter projects">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'all'}
                        onClick={() => setFilter('all')}
                        className={`transition-colors cursor-pointer py-1 ${
                          filter === 'all'
                            ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b-2 border-[#065F46] dark:border-[#34D399]'
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                        }`}
                      >
                        All ({ALL_PROJECTS.length})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'dev'}
                        onClick={() => setFilter('dev')}
                        className={`transition-colors cursor-pointer py-1 ${
                          filter === 'dev'
                            ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b-2 border-[#065F46] dark:border-[#34D399]'
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                        }`}
                      >
                        Development ({devCount})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'media'}
                        onClick={() => setFilter('media')}
                        className={`transition-colors cursor-pointer py-1 ${
                          filter === 'media'
                            ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b-2 border-[#065F46] dark:border-[#34D399]'
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                        }`}
                      >
                        Media ({mediaCount})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'exp'}
                        onClick={() => setFilter('exp')}
                        className={`transition-colors cursor-pointer py-1 ${
                          filter === 'exp'
                            ? 'text-[#065F46] dark:text-[#34D399] font-bold border-b-2 border-[#065F46] dark:border-[#34D399]'
                            : 'text-slate-500 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white'
                        }`}
                      >
                        Experiments ({expCount})
                      </button>
                    </div>
                  </div>
                </header>

                {/* 2. Featured Project: Sportivo (Hero Showcase) */}
                {(filter === 'all' || filter === 'dev') && sportivo && (
                  <section aria-labelledby="featured-project-heading" className="mb-20 sm:mb-24 lg:mb-28">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      {/* Large Visual Preview with Browser Frame */}
                      <div className="lg:col-span-8 group">
                        <Link 
                          href={sportivo.detailUrl}
                          className="block relative overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-900 shadow-sm focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
                          aria-label="View Sportivo project case study"
                        >
                          {/* Clean Browser Chrome Header */}
                          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 select-none">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-neutral-700" />
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-neutral-700" />
                              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-neutral-700" />
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 truncate max-w-[220px]">
                              sportivo.dipeshsapkota7.com.np
                            </span>
                            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
                              LIVE
                            </span>
                          </div>

                          {/* Screenshot */}
                          <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                            <Image
                              src={sportivo.image}
                              alt="Sportivo live sports streaming platform interface"
                              fill
                              priority
                              sizes="(max-width: 1024px) 100vw, 66vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
                            />
                          </div>
                        </Link>
                      </div>

                      {/* Asymmetrical Narrative & Links */}
                      <div className="lg:col-span-4 flex flex-col justify-center">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold mb-2">
                          01 &middot; Featured Web App
                        </div>
                        <h2 id="featured-project-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-3">
                          <Link href={sportivo.detailUrl} className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                            {sportivo.title}
                          </Link>
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                          {sportivo.description}
                        </p>
                        <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-6">
                          {sportivo.tech.join(" · ")}
                        </div>
                        <div className="flex items-center gap-4 text-xs font-mono">
                          <Link
                            href={sportivo.detailUrl}
                            className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline flex items-center gap-1"
                          >
                            Explore Case Study &rarr;
                          </Link>
                          {sportivo.liveUrl && (
                            <a
                              href={sportivo.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors"
                            >
                              Live App &nearr;
                            </a>
                          )}
                          {sportivo.githubUrl && (
                            <a
                              href={sportivo.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white transition-colors"
                            >
                              Code &nearr;
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* 3. The Editorial Pair: Git Visualizer & IOE Admission Guide */}
                {(filter === 'all' || filter === 'dev') && gitVisualizer && ioeAdmission && (
                  <section aria-labelledby="editorial-pair-heading" className="mb-20 sm:mb-24 lg:mb-28">
                    <h2 id="editorial-pair-heading" className="sr-only">Web Systems & Interactive Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                      {/* Project 2: Git Visualizer */}
                      <article className="group flex flex-col justify-between">
                        <Link
                          href={gitVisualizer.detailUrl}
                          className="block relative overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-900 shadow-sm focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399] mb-5"
                          aria-label="View Git Visualizer interactive case study"
                        >
                          <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                            <span>git-visualizer</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">LIVE APP</span>
                          </div>
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                            <Image
                              src={gitVisualizer.image}
                              alt="Git Visualizer interactive graph mapping interface"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                            />
                          </div>
                        </Link>
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold mb-1.5">
                            02 &middot; Interactive Learning Tool
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-2">
                            <Link href={gitVisualizer.detailUrl} className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                              {gitVisualizer.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                            {gitVisualizer.description}
                          </p>
                          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                            {gitVisualizer.tech.join(" · ")}
                          </div>
                          <div className="flex items-center gap-4 text-xs font-mono">
                            <Link href={gitVisualizer.detailUrl} className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline">
                              Case Study &rarr;
                            </Link>
                            <a href={gitVisualizer.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white">
                              Live Tool &nearr;
                            </a>
                            <a href={gitVisualizer.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white">
                              Code &nearr;
                            </a>
                          </div>
                        </div>
                      </article>

                      {/* Project 3: IOE Admission Guide */}
                      <article className="group flex flex-col justify-between">
                        <Link
                          href={ioeAdmission.detailUrl}
                          className="block relative overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-900 shadow-sm focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399] mb-5"
                          aria-label="View IOE Admission Guide case study"
                        >
                          <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 text-[10px] font-mono text-slate-500 dark:text-neutral-400">
                            <span>ioe-admission</span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">LIVE APP</span>
                          </div>
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                            <Image
                              src={ioeAdmission.image}
                              alt="IOE Admission Guide platform interface"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                            />
                          </div>
                        </Link>
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold mb-1.5">
                            03 &middot; Web Application
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-2">
                            <Link href={ioeAdmission.detailUrl} className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors">
                              {ioeAdmission.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                            {ioeAdmission.description}
                          </p>
                          <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                            {ioeAdmission.tech.join(" · ")}
                          </div>
                          <div className="flex items-center gap-4 text-xs font-mono">
                            <Link href={ioeAdmission.detailUrl} className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline">
                              Case Study &rarr;
                            </Link>
                            <a href={ioeAdmission.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white">
                              Live App &nearr;
                            </a>
                            <a href={ioeAdmission.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white">
                              Code &nearr;
                            </a>
                          </div>
                        </div>
                      </article>
                    </div>
                  </section>
                )}

                {/* 4. The Wide Rhythm-Breaker: Sports Highlight Motion Reels */}
                {(filter === 'all' || filter === 'media') && sportsReels && (
                  <section aria-labelledby="media-reels-heading" className="mb-20 sm:mb-24 lg:mb-28">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-neutral-800 bg-[#090D14] text-white">
                      {/* Cinematic Split / Widescreen Banner */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px] lg:min-h-[440px]">
                        {/* Authentic Media Asset Preview */}
                        <div className="lg:col-span-7 relative h-64 lg:h-full overflow-hidden select-none">
                          <Image
                            src={sportsReels.image}
                            alt="Sports motion editing highlights frame"
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#090D14]/60 to-[#090D14]" />
                          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <span className="px-2 py-1 rounded text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                              4K 60FPS
                            </span>
                            <span className="px-2 py-1 rounded text-[10px] font-mono text-slate-300 bg-black/80 backdrop-blur-md">
                              TC: 00:01:24:18
                            </span>
                          </div>
                        </div>

                        {/* Editorial Details & Post-Production Specs */}
                        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative z-10">
                          <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">
                            04 &middot; Creative Media
                          </div>
                          <h2 id="media-reels-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
                            {sportsReels.title}
                          </h2>
                          <p className="text-sm text-slate-300 leading-relaxed mb-5">
                            {sportsReels.description}
                          </p>

                          {/* Mini NLE Track Visual */}
                          <div className="space-y-1.5 p-3 rounded-lg bg-black/60 border border-neutral-800 font-mono text-[9px] mb-6">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 w-4">V1</span>
                              <div className="flex-1 h-3 bg-neutral-900 rounded flex gap-1 p-0.5 overflow-hidden">
                                <div className="h-full w-2/5 bg-emerald-600/80 rounded" />
                                <div className="h-full w-1/4 bg-sky-600/80 rounded" />
                                <div className="h-full w-1/3 bg-teal-600/80 rounded" />
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 w-4">A1</span>
                              <div className="flex-1 h-3 bg-neutral-900 rounded flex items-center px-1 overflow-hidden">
                                <div className="w-full h-1.5 flex items-center gap-0.5">
                                  {[4, 8, 12, 6, 14, 16, 10, 6, 14, 18, 12, 8, 14, 16, 8, 4, 10, 16, 14, 8].map((h, i) => (
                                    <div key={i} className="flex-1 bg-amber-400/80" style={{ height: `${h}px` }} />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-xs font-mono text-slate-400 mb-6">
                            {sportsReels.tech.join(" · ")}
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={(e) => handleOpenModal(sportsReels, e)}
                              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-400"
                            >
                              <span>View Production Breakdown &rarr;</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* 5. The Engineering & Hardware Staggered Trio */}
                {(filter === 'all' || filter === 'exp') && (
                  <section aria-labelledby="experiments-heading" className="mb-12">
                    <div className="border-t border-slate-200 dark:border-neutral-800 pt-10 mb-8">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold mb-1">
                        Physical Circuits & Simulation
                      </div>
                      <h2 id="experiments-heading" className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                        Engineering Prototypes & Analysis
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {expProjects.map((proj, idx) => (
                        <article key={proj.id} className="group flex flex-col justify-between">
                          <div 
                            onClick={(e) => handleOpenModal(proj, e)}
                            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200 dark:border-neutral-800 shadow-sm cursor-pointer mb-4"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleOpenModal(proj, e); }}
                            aria-label={`View technical specifications for ${proj.title}`}
                          >
                            {proj.id === '555-flasher' ? (
                              <CircuitVisual />
                            ) : proj.id === 'motor-modeling' ? (
                              <MotorModelingVisual />
                            ) : (
                              <AnalyzerDiagVisual />
                            )}
                          </div>

                          <div>
                            <div className="text-[11px] font-mono uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold mb-1">
                              0{idx + 5} &middot; {proj.type}
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] mb-2">
                              <button
                                type="button"
                                onClick={(e) => handleOpenModal(proj, e)}
                                className="hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors text-left cursor-pointer"
                              >
                                {proj.title}
                              </button>
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                              {proj.description}
                            </p>
                            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                              {proj.tech.join(" · ")}
                            </div>
                            <div>
                              <button
                                type="button"
                                onClick={(e) => handleOpenModal(proj, e)}
                                className="text-xs font-mono font-bold text-[#065F46] dark:text-[#34D399] hover:underline cursor-pointer"
                              >
                                Technical Specs &rarr;
                              </button>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                )}

              </div>
            </section>
          </FadeUp>

          {/* Accessible Project Detail Modal Dialog */}
          {activeModalProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
              onClick={handleCloseModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
            >
              <div
                className="relative w-full max-w-2xl bg-white dark:bg-[#121A17] border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-4 bg-slate-50 dark:bg-neutral-900">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold">
                      {activeModalProject.categoryLabel} &middot; {activeModalProject.type}
                    </span>
                  </div>
                  <button
                    ref={modalCloseBtnRef}
                    type="button"
                    onClick={handleCloseModal}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-neutral-800 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
                    aria-label="Close dialog (Escape)"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-6 overflow-y-auto space-y-6">
                  <div>
                    <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-2">
                      {activeModalProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {activeModalProject.description}
                    </p>
                  </div>

                  {activeModalProject.modalDetails?.overview && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-2">
                        Project Overview
                      </h4>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {activeModalProject.modalDetails.overview}
                      </p>
                    </div>
                  )}

                  {activeModalProject.modalDetails?.architecture && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-2">
                        Technical Specifications & Methodology
                      </h4>
                      <ul className="space-y-2">
                        {activeModalProject.modalDetails.architecture.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-0.5">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeModalProject.modalDetails?.metrics && (
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-[#162921]/60 border border-emerald-200 dark:border-emerald-900/60">
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-1">
                        Measured Outcome & Impact
                      </h4>
                      <p className="text-xs sm:text-sm font-mono text-[#065F46] dark:text-emerald-300">
                        {activeModalProject.modalDetails.metrics}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-2">
                      Tools & Technologies
                    </h4>
                    <div className="text-xs font-mono text-slate-600 dark:text-slate-300">
                      {activeModalProject.tech.join(" · ")}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-neutral-900 flex-wrap">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    {activeModalProject.detailUrl && (
                      <Link
                        href={activeModalProject.detailUrl}
                        className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline"
                      >
                        Full Case Study &rarr;
                      </Link>
                    )}
                    {activeModalProject.liveUrl && (
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        Live App &nearr;
                      </a>
                    )}
                    {activeModalProject.githubUrl && (
                      <a
                        href={activeModalProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        GitHub &nearr;
                      </a>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer ml-auto"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </SiteLayout>
  );
}
