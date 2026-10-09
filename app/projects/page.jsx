"use client";

import React, { useState, useEffect, useRef, useId } from 'react';
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
    description: "A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.",
    featured: true,
    image: "/sportivo-preview.jpg",
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST APIs", "Cheerio"],
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
    id: "ioe-admission",
    title: "IOE Admission Guide",
    category: "dev",
    categoryLabel: "Development",
    type: "Featured Web App",
    description: "A comprehensive admission ecosystem for Tribhuvan University engineering applicants, offering statistical rank prediction, procedural counseling checklists, and automated priority form generation.",
    featured: true,
    image: "/ioe-preview.jpg",
    tech: ["JavaScript", "React", "Data Analytics", "Tailwind CSS", "TU IOE"],
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
    id: "git-visualizer",
    title: "Git Visualizer",
    category: "dev",
    categoryLabel: "Development",
    type: "Interactive Tool",
    description: "An interactive, visually driven learning tool designed to demystify Git version control operations through live data-flow rendering and canvas mapping of branching, commits, and merges.",
    featured: true,
    image: "/git-preview.jpg",
    tech: ["HTML5 Canvas", "JavaScript", "UI/UX Design", "CSS3", "Git DAG"],
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
    id: "555-flasher",
    title: "Astable Multivibrator LED Flasher",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Hardware Prototype",
    description: "Physical breadboard circuit built and simulated using an NE555 timer IC, calculating RC time constants for frequency control and stable square-wave oscillation cycles.",
    featured: false,
    tech: ["555 Timer IC", "Circuit Analysis", "Proteus Suite", "Breadboarding", "Analog Oscilloscopy"],
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
    id: "sports-reels",
    title: "Sports Highlight Motion Reels",
    category: "media",
    categoryLabel: "Creative Media",
    type: "Motion Graphics & Video Editing",
    description: "High-impact dynamic sports video editing showcasing football and futsal highlights. Features audio-visual rhythm synchronization, speed ramps, and custom color grading.",
    featured: false,
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design", "Speed Ramping"],
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
    id: "motor-modeling",
    title: "Electrical Machinery Modeling",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Engineering Analysis",
    description: "Torque derivations and equivalent circuit analysis of three-phase induction and DC motors, solving complex phasor networks and performance characteristics.",
    featured: false,
    tech: ["Electrical Engineering", "Phasor Calculus", "Motor Analysis", "MATLAB", "Equivalent Circuits"],
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
    tech: ["Biomedical Tech", "Fluidics", "Calibration Systems", "Instrumentation", "Pneumatics"],
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

/* Custom SVG Visual Preview for 555-Timer */
function CircuitVisual() {
  return (
    <div className="w-full h-full bg-[#0A1612] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#10B981 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />
      
      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#34D399] tracking-wider">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          NE555 OSCILLATOR
        </span>
        <span className="text-[#6EE7B7]/70 text-[10px]">ASTABLE CIRCUIT</span>
      </div>

      {/* Schematic diagram representation */}
      <div className="relative z-10 my-auto flex items-center justify-center gap-6 py-2">
        {/* IC Chip box */}
        <div className="border border-[#10B981]/50 bg-[#062419]/80 rounded-lg p-3 text-center shadow-lg shadow-[#062419]/50 min-w-[110px]">
          <div className="text-[10px] text-[#6EE7B7]/80 font-bold mb-1 border-b border-[#10B981]/30 pb-1">NE555P</div>
          <div className="text-[9px] text-[#A7F3D0] space-y-0.5">
            <div>PIN 3: OUT</div>
            <div>PIN 2/6: TRG/THR</div>
            <div>PIN 7: DISCH</div>
          </div>
        </div>

        {/* Pulse wave line */}
        <div className="flex-1 flex flex-col justify-center">
          <svg className="w-full h-12 stroke-[#34D399] fill-none" viewBox="0 0 160 40">
            <path
              d="M 0 30 L 20 30 L 20 10 L 50 10 L 50 30 L 70 30 L 70 10 L 100 10 L 100 30 L 120 30 L 120 10 L 150 10 L 150 30 L 160 30"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-[9px] text-[#6EE7B7]/90 text-center mt-1">
            f = 1.44 / [(R₁ + 2R₂) × C₁]
          </div>
        </div>
      </div>

      {/* Status footer */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-[#A7F3D0]/80 border-t border-[#10B981]/20 pt-2">
        <span>V_CC: 9.0V</span>
        <span>DUTY: 60%</span>
        <span>OUTPUT: ACTIVE</span>
      </div>
    </div>
  );
}

/* Custom SVG Visual Preview for Motion Reels */
function MotionReelsVisual() {
  return (
    <div className="w-full h-full bg-[#0E131F] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
      {/* Background radial sheen */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#60A5FA] tracking-wider">
        <span className="flex items-center gap-1.5 font-bold text-[#93C5FD]">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
          NLE TIMELINE
        </span>
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1E3A8A]/50 text-[#93C5FD] border border-[#3B82F6]/30">4K 60FPS</span>
      </div>

      {/* Track Lanes */}
      <div className="relative z-10 my-auto space-y-1.5 py-2">
        {/* Video Track 1 */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-400 w-5">V2</span>
          <div className="flex-1 h-4 bg-slate-900 rounded border border-slate-700/60 overflow-hidden flex gap-1 p-0.5">
            <div className="h-full w-1/4 bg-violet-600/80 rounded text-[8px] flex items-center px-1 text-white">Title.mogrt</div>
            <div className="h-full w-1/3 bg-purple-600/80 rounded text-[8px] flex items-center px-1 text-white">LowerThird</div>
          </div>
        </div>

        {/* Video Track 2 */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-400 w-5">V1</span>
          <div className="flex-1 h-5 bg-slate-900 rounded border border-slate-700/60 overflow-hidden flex gap-1 p-0.5">
            <div className="h-full w-1/3 bg-emerald-600/80 rounded text-[8px] flex items-center px-1 text-white">Futsal_Goal_CamA</div>
            <div className="h-full w-1/4 bg-sky-600/80 rounded text-[8px] flex items-center px-1 text-white">SpeedRamp_120fps</div>
            <div className="h-full w-1/3 bg-teal-600/80 rounded text-[8px] flex items-center px-1 text-white">Celebration_Wide</div>
          </div>
        </div>

        {/* Audio Track */}
        <div className="flex items-center gap-2">
          <span className="text-[9px] text-slate-400 w-5">A1</span>
          <div className="flex-1 h-4 bg-slate-900 rounded border border-slate-700/60 overflow-hidden flex items-center px-1">
            <div className="w-full h-2 flex items-center gap-0.5">
              {[4, 8, 12, 6, 14, 16, 10, 6, 14, 18, 12, 8, 14, 16, 8, 4, 10, 16, 14, 6].map((h, i) => (
                <div key={i} className="flex-1 bg-amber-400/80 rounded-sm" style={{ height: `${h}px` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800 pt-2">
        <span className="font-mono text-emerald-400">TC: 00:01:24:18</span>
        <span>AUDIO: -14 LUFS</span>
        <span>LUT: Rec.709</span>
      </div>
    </div>
  );
}

/* Custom SVG Visual Preview for Motor Modeling */
function MotorModelingVisual() {
  return (
    <div className="w-full h-full bg-[#0C151F] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#38BDF8] tracking-wider">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
          INDUCTION MOTOR
        </span>
        <span className="text-[#7DD3FC]/70 text-[10px]">PHASOR CALCULUS</span>
      </div>

      {/* Phasor & Curve visualization */}
      <div className="relative z-10 my-auto flex items-center justify-around py-2">
        {/* Polar phasor circle */}
        <div className="w-20 h-20 rounded-full border border-[#0284C7]/50 relative flex items-center justify-center bg-[#072738]/40">
          <div className="absolute inset-0 border border-dashed border-[#38BDF8]/20 rounded-full" />
          <svg className="w-full h-full" viewBox="0 0 80 80">
            {/* Center axes */}
            <line x1="40" y1="5" x2="40" y2="75" stroke="#0284C7" strokeWidth="0.75" strokeDasharray="2,2" />
            <line x1="5" y1="40" x2="75" y2="40" stroke="#0284C7" strokeWidth="0.75" strokeDasharray="2,2" />
            {/* Voltage Vector */}
            <line x1="40" y1="40" x2="40" y2="12" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
            <polygon points="40,8 37,14 43,14" fill="#38BDF8" />
            {/* Current Vector (lagging) */}
            <line x1="40" y1="40" x2="65" y2="52" stroke="#34D399" strokeWidth="2" strokeLinecap="round" />
            <polygon points="68,54 62,50 64,56" fill="#34D399" />
          </svg>
          <span className="absolute bottom-1 right-2 text-[8px] text-[#34D399]">I₁ ∠ -θ</span>
          <span className="absolute top-1 left-2 text-[8px] text-[#38BDF8]">V₁ ∠ 0°</span>
        </div>

        {/* Torque-Slip curve diagram */}
        <div className="flex flex-col justify-center">
          <div className="text-[9px] text-[#7DD3FC] mb-1 font-semibold">TORQUE-SLIP CURVE</div>
          <svg className="w-28 h-14 stroke-[#38BDF8] fill-none" viewBox="0 0 110 50">
            <line x1="10" y1="45" x2="105" y2="45" stroke="#475569" strokeWidth="1" />
            <line x1="10" y1="5" x2="10" y2="45" stroke="#475569" strokeWidth="1" />
            {/* Characteristic curve */}
            <path
              d="M 10 45 Q 40 5, 60 20 T 100 45"
              strokeWidth="2"
              stroke="#38BDF8"
            />
            <circle cx="42" cy="11" r="3" fill="#F59E0B" />
          </svg>
          <div className="text-[8px] text-[#F59E0B] flex items-center justify-between">
            <span>s = 1 (Start)</span>
            <span>T_max</span>
            <span>s = 0 (Sync)</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-[#7DD3FC]/80 border-t border-[#0284C7]/20 pt-2">
        <span>3-PHASE SQUIRREL CAGE</span>
        <span>COS φ: 0.85 LAG</span>
      </div>
    </div>
  );
}

/* Custom SVG Visual Preview for Automated Analyzer Diagnostics */
function AnalyzerDiagVisual() {
  return (
    <div className="w-full h-full bg-[#0F181C] relative overflow-hidden flex flex-col justify-between p-4 font-mono select-none">
      {/* Background tech grid */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(#14B8A6 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Header bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#2DD4BF] tracking-wider">
        <span className="flex items-center gap-1.5 font-bold">
          <span className="w-2 h-2 rounded-full bg-[#0D9488] animate-pulse" />
          FLUIDIC DIAGNOSTICS
        </span>
        <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#115E59]/40 text-[#5EEAD4] border border-[#14B8A6]/30">
          IMMUNOASSAY SYS
        </span>
      </div>

      {/* Fluidic & vacuum monitor */}
      <div className="relative z-10 my-auto flex items-center justify-between gap-4 py-2">
        {/* Syringe probe visual */}
        <div className="border border-[#14B8A6]/40 bg-[#042F2E]/60 rounded-lg p-2.5 flex-1 shadow-md">
          <div className="text-[9px] text-[#99F6E4] font-semibold mb-1 flex items-center justify-between">
            <span>PROBE VOL</span>
            <span className="text-[#34D399]">±1.0 µL</span>
          </div>
          <div className="w-full bg-[#04201F] rounded-full h-2.5 border border-[#14B8A6]/30 p-0.5 overflow-hidden">
            <div className="bg-[#2DD4BF] h-full rounded-full w-3/4" />
          </div>
          <div className="text-[8px] text-teal-300/80 mt-1 flex justify-between">
            <span>ASPIRATE: OK</span>
            <span>LEVEL: SENSED</span>
          </div>
        </div>

        {/* Vacuum sensor gauge */}
        <div className="border border-[#14B8A6]/40 bg-[#042F2E]/60 rounded-lg p-2.5 flex-1 shadow-md">
          <div className="text-[9px] text-[#99F6E4] font-semibold mb-1 flex items-center justify-between">
            <span>VACUUM P</span>
            <span className="text-[#F59E0B]">-48.2 kPa</span>
          </div>
          <div className="w-full bg-[#04201F] rounded-full h-2.5 border border-[#14B8A6]/30 p-0.5 overflow-hidden">
            <div className="bg-[#F59E0B] h-full rounded-full w-4/5" />
          </div>
          <div className="text-[8px] text-teal-300/80 mt-1 flex justify-between">
            <span>RANGE: -40 to -60</span>
            <span className="text-emerald-400">NOMINAL</span>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-[#5EEAD4]/80 border-t border-[#14B8A6]/20 pt-2">
        <span>ELECTRO-PNEUMATIC VALVES: 12/12</span>
        <span>ERROR LOGS: 0</span>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const modalCloseBtnRef = useRef(null);
  const lastActiveElementRef = useRef(null);
  const searchInputId = useId();

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

  // Close modal on escape
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

  // Filter calculations
  const totalDevCount = ALL_PROJECTS.filter((p) => p.category === 'dev').length;
  const totalMediaCount = ALL_PROJECTS.filter((p) => p.category === 'media').length;
  const totalExpCount = ALL_PROJECTS.filter((p) => p.category === 'exp').length;

  const filtered = ALL_PROJECTS.filter((p) => {
    const matchesCategory = filter === 'all' || p.category === filter;
    if (!matchesCategory) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const inTitle = p.title.toLowerCase().includes(q);
    const inDesc = p.description.toLowerCase().includes(q);
    const inType = p.type.toLowerCase().includes(q);
    const inTech = p.tech.some((t) => t.toLowerCase().includes(q));
    return inTitle || inDesc || inType || inTech;
  });

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]} />

          <FadeUp>
            <section id="projects" className={`pt-24 sm:pt-28 pb-28 px-4 sm:px-6 lg:px-8 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                
                {/* Refined Page Header & Editorial Intro */}
                <header className="mb-12 sm:mb-16">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono font-bold tracking-widest uppercase bg-[#ECFDF5] dark:bg-[#162921] text-[#065F46] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#264D3B] mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#065F46] dark:bg-[#34D399]" />
                    SELECTED WORK / PROJECT ARCHIVE
                  </div>
                  
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-4">
                    Projects that bring ideas to life.
                  </h1>
                  
                  <p className="text-base sm:text-lg text-[#334155] dark:text-[#A7B0BE] max-w-3xl leading-relaxed">
                    A curated archive spanning full-stack web applications, interactive visual tools, hardware circuits, and dynamic motion post-production. Each project reflects a balance between rigorous engineering logic and creative execution.
                  </p>

                  {/* Filter & Search Bar */}
                  <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#26372F] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#F1F5F9] dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F]" role="tablist" aria-label="Filter projects by category">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'all'}
                        onClick={() => setFilter('all')}
                        className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                          filter === 'all'
                            ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                            : 'text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#18231E]'
                        }`}
                      >
                        All ({ALL_PROJECTS.length})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'dev'}
                        onClick={() => setFilter('dev')}
                        className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                          filter === 'dev'
                            ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                            : 'text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#18231E]'
                        }`}
                      >
                        Development ({totalDevCount})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'media'}
                        onClick={() => setFilter('media')}
                        className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                          filter === 'media'
                            ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                            : 'text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#18231E]'
                        }`}
                      >
                        Creative Media ({totalMediaCount})
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={filter === 'exp'}
                        onClick={() => setFilter('exp')}
                        className={`px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                          filter === 'exp'
                            ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                            : 'text-[#334155] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-white hover:bg-white/60 dark:hover:bg-[#18231E]'
                        }`}
                      >
                        Experiments ({totalExpCount})
                      </button>
                    </div>

                    {/* Quick Search */}
                    <div className="relative min-w-[240px] max-w-xs w-full">
                      <label htmlFor={searchInputId} className="sr-only">Search projects by keyword or tech stack</label>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748B]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                      <input
                        id={searchInputId}
                        type="text"
                        placeholder="Search keyword or tech..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 text-xs font-mono rounded-xl bg-white dark:bg-[#121A17] border border-[#E2E8F0] dark:border-[#26372F] text-[#0F172A] dark:text-[#F9FAFB] placeholder-[#64748B] focus:outline-none focus:border-[#065F46] dark:focus:border-[#34D399] transition-all"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-xs text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer"
                          aria-label="Clear search"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                </header>

                {/* Empty State */}
                {filtered.length === 0 && (
                  <div className="p-12 text-center rounded-2xl border border-dashed border-[#CBD5E1] dark:border-[#26372F] bg-white/50 dark:bg-[#121A17]/50 max-w-lg mx-auto">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#ECFDF5] dark:bg-[#162921] text-[#065F46] dark:text-[#34D399] flex items-center justify-center mb-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-1">No matching projects found</h3>
                    <p className="text-sm text-[#334155] dark:text-[#A7B0BE] mb-6">
                      No projects matched your search criteria for &ldquo;{searchQuery}&rdquo;. Try resetting the category or clearing the search query.
                    </p>
                    <button
                      type="button"
                      onClick={() => { setFilter('all'); setSearchQuery(''); }}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] transition-all cursor-pointer shadow-sm"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

                {/* Projects Grid: 1 col on mobile, 2 col on tablet, 3 col on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filtered.map((proj) => {
                    const hasDedicatedPage = Boolean(proj.detailUrl);

                    return (
                      <article
                        key={proj.id}
                        className="group flex flex-col rounded-2xl border border-[#E2E8F0] dark:border-[#26372F] bg-white dark:bg-[#121A17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 overflow-hidden"
                      >
                        {/* Visual Preview Header (Consistent 16:10 Aspect Ratio) */}
                        <div className="w-full aspect-[16/10] relative overflow-hidden bg-[#0F172A]/5 dark:bg-[#0B0F0E] border-b border-[#E2E8F0] dark:border-[#26372F]">
                          {proj.image ? (
                            <Image
                              src={proj.image}
                              alt={`${proj.title} Preview`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                          ) : proj.id === '555-flasher' ? (
                            <CircuitVisual />
                          ) : proj.id === 'sports-reels' ? (
                            <MotionReelsVisual />
                          ) : proj.id === 'motor-modeling' ? (
                            <MotorModelingVisual />
                          ) : proj.id === 'analyzer-diag' ? (
                            <AnalyzerDiagVisual />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-mono text-slate-400">
                              Preview unavailable
                            </div>
                          )}

                          {/* Live/Status Floating Indicator */}
                          {proj.liveUrl && (
                            <div className="absolute top-3 right-3 z-10">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#0F172A]/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-md">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                LIVE
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Category & Type meta row */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="inline-block px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider rounded-md bg-[#ECFDF5] dark:bg-[#162921] text-[#065F46] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#264D3B]">
                                {proj.categoryLabel}
                              </span>
                              <span className="text-xs font-mono text-[#475569] dark:text-[#94A3B8] font-medium truncate">
                                {proj.type}
                              </span>
                            </div>

                            {/* Project Title - High contrast and prominent */}
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors leading-tight mb-2.5">
                              {proj.title}
                            </h2>

                            {/* Description */}
                            <p className="text-sm leading-relaxed text-[#334155] dark:text-[#A7B0BE] line-clamp-3 mb-5">
                              {proj.description}
                            </p>
                          </div>

                          {/* Technology Badges & Action Buttons */}
                          <div>
                            <div className="flex flex-wrap gap-1.5 mb-6">
                              {proj.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-[#F1F5F9] dark:bg-[#18231E] text-[#1E293B] dark:text-[#CBD5E1] border border-[#E2E8F0] dark:border-[#26372F]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>

                            {/* Actions Footer */}
                            <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-between gap-2 flex-wrap">
                              {/* Primary Action Button */}
                              {hasDedicatedPage ? (
                                <Link
                                  href={proj.detailUrl}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] transition-all shadow-sm"
                                >
                                  <span>View Project</span>
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => handleOpenModal(proj, e)}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] transition-all shadow-sm cursor-pointer"
                                >
                                  <span>View Details</span>
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </button>
                              )}

                              {/* Secondary Links */}
                              <div className="flex items-center gap-1.5 ml-auto">
                                {proj.liveUrl && (
                                  <a
                                    href={proj.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-2 text-xs font-medium rounded-lg border border-[#CBD5E1] dark:border-[#26372F] hover:bg-[#F8FAFC] dark:hover:bg-[#18231E] text-[#0F172A] dark:text-[#F9FAFB] transition-all flex items-center gap-1 cursor-pointer"
                                    title="Open live website"
                                  >
                                    <span>Demo</span>
                                    <svg className="w-3 h-3 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                  </a>
                                )}

                                {proj.githubUrl && (
                                  <a
                                    href={proj.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-2 text-xs font-medium rounded-lg border border-[#CBD5E1] dark:border-[#26372F] hover:bg-[#F8FAFC] dark:hover:bg-[#18231E] text-[#0F172A] dark:text-[#F9FAFB] transition-all flex items-center gap-1 cursor-pointer"
                                    title="View GitHub source code"
                                  >
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    <span>Code</span>
                                  </a>
                                )}

                                {proj.articleUrl && (
                                  <a
                                    href={proj.articleUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-2 text-xs font-medium rounded-lg border border-[#CBD5E1] dark:border-[#26372F] hover:bg-[#F8FAFC] dark:hover:bg-[#18231E] text-[#0F172A] dark:text-[#F9FAFB] transition-all flex items-center gap-1 cursor-pointer"
                                    title="Read Hashnode engineering article"
                                  >
                                    <svg className="w-3.5 h-3.5 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                    <span className="hidden sm:inline">Article</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

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
                className="relative w-full max-w-2xl bg-white dark:bg-[#121A17] border border-[#CBD5E1] dark:border-[#26372F] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Top Bar */}
                <div className="p-6 border-b border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-between gap-4 bg-[#F8FAFC] dark:bg-[#16221D]">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-md bg-[#ECFDF5] dark:bg-[#162921] text-[#065F46] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#264D3B]">
                      {activeModalProject.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-[#475569] dark:text-[#94A3B8]">
                      {activeModalProject.type}
                    </span>
                  </div>

                  <button
                    ref={modalCloseBtnRef}
                    type="button"
                    onClick={handleCloseModal}
                    className="p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] dark:hover:text-[#F9FAFB] hover:bg-[#E2E8F0] dark:hover:bg-[#26372F] transition-all cursor-pointer"
                    aria-label="Close dialog (Escape)"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>

                {/* Modal Scrollable Body */}
                <div className="p-6 overflow-y-auto space-y-6">
                  {/* Title & Headline */}
                  <div>
                    <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-[#F9FAFB] leading-tight mb-2">
                      {activeModalProject.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#334155] dark:text-[#A7B0BE] leading-relaxed">
                      {activeModalProject.description}
                    </p>
                  </div>

                  {/* Overview */}
                  {activeModalProject.modalDetails?.overview && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-2">
                        Project Overview
                      </h4>
                      <p className="text-sm text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
                        {activeModalProject.modalDetails.overview}
                      </p>
                    </div>
                  )}

                  {/* Architecture / Key Implementation Details */}
                  {activeModalProject.modalDetails?.architecture && (
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-2">
                        Technical Specifications & Methodology
                      </h4>
                      <ul className="space-y-2">
                        {activeModalProject.modalDetails.architecture.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1E293B] dark:text-[#CBD5E1] leading-relaxed">
                            <span className="text-[#065F46] dark:text-[#34D399] font-bold mt-1">▸</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Metrics */}
                  {activeModalProject.modalDetails?.metrics && (
                    <div className="p-4 rounded-xl bg-[#ECFDF5]/60 dark:bg-[#162921]/60 border border-[#A7F3D0]/60 dark:border-[#264D3B]">
                      <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-1">
                        Measured Outcome & Impact
                      </h4>
                      <p className="text-xs sm:text-sm font-mono text-[#065F46] dark:text-[#A7F3D0]">
                        {activeModalProject.modalDetails.metrics}
                      </p>
                    </div>
                  )}

                  {/* Tech stack pills */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-[#065F46] dark:text-[#34D399] mb-2">
                      Tools & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-[#F1F5F9] dark:bg-[#18231E] text-[#1E293B] dark:text-[#CBD5E1] border border-[#CBD5E1] dark:border-[#26372F]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="p-6 border-t border-[#E2E8F0] dark:border-[#26372F] flex items-center justify-between gap-3 bg-[#F8FAFC] dark:bg-[#16221D] flex-wrap">
                  <div className="flex items-center gap-2">
                    {activeModalProject.liveUrl && (
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] transition-all shadow-sm"
                      >
                        Launch Live App &rarr;
                      </a>
                    )}
                    {activeModalProject.githubUrl && (
                      <a
                        href={activeModalProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#CBD5E1] dark:border-[#26372F] hover:bg-white dark:hover:bg-[#18231E] text-[#0F172A] dark:text-[#F9FAFB] transition-all"
                      >
                        Source Code
                      </a>
                    )}
                    {activeModalProject.detailUrl && (
                      <Link
                        href={activeModalProject.detailUrl}
                        className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#CBD5E1] dark:border-[#26372F] hover:bg-white dark:hover:bg-[#18231E] text-[#065F46] dark:text-[#34D399] transition-all"
                      >
                        Full Case Study
                      </Link>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#CBD5E1] dark:border-[#26372F] hover:bg-white dark:hover:bg-[#18231E] text-[#334155] dark:text-[#A7B0BE] transition-all cursor-pointer ml-auto"
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
