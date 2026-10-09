"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SiteLayout from '../../components/SiteLayout';
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
    isComplex: true,
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
    isComplex: false,
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
    isComplex: false,
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
    isComplex: true,
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
    isComplex: false,
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
    isComplex: false,
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
    isComplex: false,
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

/* -------------------------------------------------------------
 * 1. Antigravity Physics Canvas Background
 * ------------------------------------------------------------- */
function AntigravityCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = 0;
    let height = 0;
    const dpr = window.devicePixelRatio || 1;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const parent = canvas.parentElement;
    const mouse = { x: -9999, y: -9999, radius: 130 };

    const handleResize = () => {
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes definition
    const particleCount = Math.min(Math.floor((width * height) / 12000), 55);
    const particles = [];
    const shapes = ['circle', 'diamond', 'cross'];
    const colors = [
      'rgba(52, 211, 153, ', // Mint green
      'rgba(16, 185, 129, ', // Emerald
      'rgba(148, 163, 184, ', // Slate
      'rgba(45, 212, 191, '  // Teal
    ];

    for (let i = 0; i < particleCount; i++) {
      const baseVy = -0.4 - Math.random() * 0.7; // Constant negative gravity vector
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: baseVy,
        baseVy,
        maxVy: -2.8,
        size: 1.5 + Math.random() * 2,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: 0.25 + Math.random() * 0.45
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint connections between nearby nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 65) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(52, 211, 153, ${(1 - dist / 65) * 0.12})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and render each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Negative gravity acceleration (upwards)
          p.vy -= 0.012;
          if (p.vy < p.maxVy) p.vy = p.maxVy;

          // Cursor dynamic scattering
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 4.8;
            const nx = dx / dist;
            const ny = dy / dist;
            p.vx += nx * force;
            p.vy += ny * force;
          }

          // Damping & returning seamlessly to upward drift
          p.vx *= 0.94;
          p.vy = p.vy * 0.94 + p.baseVy * 0.06;

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Boundary collision & wrapping logic
          if (p.x < 0) {
            p.x = 0;
            p.vx = -p.vx * 0.8;
          } else if (p.x > width) {
            p.x = width;
            p.vx = -p.vx * 0.8;
          }

          if (p.y < -15) {
            // Re-spawn at the bottom
            p.y = height + 10;
            p.x = Math.random() * width;
            p.vx = (Math.random() - 0.5) * 0.5;
            p.vy = p.baseVy;
          } else if (p.y > height + 25) {
            p.vy = p.baseVy;
          }
        }

        // Draw node
        ctx.save();
        ctx.fillStyle = `${p.colorBase}${p.alpha})`;
        ctx.strokeStyle = `${p.colorBase}${p.alpha})`;

        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'diamond') {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.lineTo(p.x, p.y + p.size);
          ctx.lineTo(p.x - p.size, p.y);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'cross') {
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - p.size, p.y);
          ctx.lineTo(p.x + p.size, p.y);
          ctx.moveTo(p.x, p.y - p.size);
          ctx.lineTo(p.x, p.y + p.size);
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}

/* -------------------------------------------------------------
 * 4. Animated Project Counter (Rapid 00 -> 07 animation)
 * ------------------------------------------------------------- */
function AnimatedProjectCounter({ total = 7 }) {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!isInView) return;

    const duration = 850;
    const startTime = performance.now();

    const animateCount = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(ease * total);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(total);
      }
    };

    const frame = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(frame);
  }, [isInView, total]);

  const formatted = String(count).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 font-mono text-xs font-semibold tracking-widest uppercase select-none shadow-sm backdrop-blur-sm"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
      <span>{formatted} Total Projects</span>
    </div>
  );
}

/* -------------------------------------------------------------
 * 3. Modern Glassmorphism Project Card
 * ------------------------------------------------------------- */
function ProjectCard({ project, onOpenModal }) {
  const hasDedicatedPage = Boolean(project.detailUrl);

  return (
    <article className="group relative h-full flex flex-col justify-between rounded-2xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl dark:hover:shadow-[0_16px_36px_rgba(0,0,0,0.5)] hover:border-[#065F46]/40 dark:hover:border-[#34D399]/40 transition-all duration-300 -translate-y-0 hover:-translate-y-1 overflow-hidden">
      <div>
        {/* Top Thumbnail Image with 5% scale hover without overflowing */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-950/90 border-b border-slate-200/80 dark:border-white/10 select-none">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} Preview`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
          ) : (
            <div className="w-full h-full bg-[#08130E] flex flex-col items-center justify-center p-4 text-center font-mono text-emerald-400/80">
              <span className="text-xs uppercase tracking-widest font-bold mb-1">
                {project.type}
              </span>
              <span className="text-[10px] text-slate-400">
                {project.id === '555-flasher' ? 'NE555 OSCILLATOR CIRCUIT' : project.id === 'motor-modeling' ? '3-PHASE PHASOR ANALYSIS' : 'DIAGNOSTIC INSTRUMENTATION'}
              </span>
            </div>
          )}

          {/* Floating Live Tag (if active) */}
          {project.liveUrl && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse motion-reduce:animate-none" />
                LIVE
              </span>
            </div>
          )}
        </div>

        {/* Project Body */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#065F46] dark:text-[#34D399] font-bold">
              {project.categoryLabel}
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 truncate">
              {project.type}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors leading-snug mb-2.5">
            {hasDedicatedPage ? (
              <Link href={project.detailUrl} className="hover:underline">
                {project.title}
              </Link>
            ) : (
              <button
                type="button"
                onClick={(e) => onOpenModal(project, e)}
                className="hover:underline text-left cursor-pointer"
              >
                {project.title}
              </button>
            )}
          </h3>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3 mb-4">
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Tags & Action Links */}
      <div className="px-6 pb-6 pt-2">
        {/* Minimal Monochromatic Tags with Faint Left-Border Accent */}
        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="border-l border-slate-300 dark:border-neutral-700/80 pl-2 text-[11px] font-mono text-slate-500 dark:text-neutral-400 group-hover:text-slate-800 dark:group-hover:text-neutral-200 group-hover:border-[#065F46] dark:group-hover:border-[#34D399] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Link Footer */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-xs font-mono">
          {hasDedicatedPage ? (
            <Link
              href={project.detailUrl}
              className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
            >
              Case Study &rarr;
            </Link>
          ) : (
            <button
              type="button"
              onClick={(e) => onOpenModal(project, e)}
              className="font-bold text-[#065F46] dark:text-[#34D399] hover:underline flex items-center gap-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#065F46] dark:focus-visible:outline-[#34D399]"
            >
              Technical Specs &rarr;
            </button>
          )}

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-neutral-400 hover:text-[#0F172A] dark:hover:text-white transition-colors"
                title="Launch Live App"
              >
                Live &nearr;
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 dark:text-neutral-400 hover:text-[#0F172A] dark:hover:text-white transition-colors"
                title="View GitHub Repository"
              >
                Code &nearr;
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------
 * Main Projects Page with Bento Grid & Antigravity Header
 * ------------------------------------------------------------- */
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

  const filtered = ALL_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }]} />

          <section id="projects" className={`pt-24 sm:pt-28 pb-32 px-4 sm:px-6 lg:px-8 w-full ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">

              {/* 1. Projects Header with Interactive Antigravity Canvas */}
              <header className="relative min-h-[340px] sm:min-h-[400px] flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-[#090E0C] border border-slate-200/60 dark:border-white/10 mb-12 sm:mb-16 p-8 sm:p-14 text-center select-none shadow-lg">
                {/* Antigravity Canvas Physics System */}
                <AntigravityCanvas />

                {/* Header Content on Top of Canvas */}
                <div className="relative z-10 max-w-3xl flex flex-col items-center">
                  {/* 4. Animated Project Counter (Rapid 00 -> 07) */}
                  <div className="mb-4">
                    <AnimatedProjectCounter total={ALL_PROJECTS.length} />
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F9FAFB] leading-tight mb-4">
                    Ideas, engineered and brought to life
                  </h1>

                  <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed">
                    A curated archive of full-stack software systems, interactive educational tools, hardware circuits, and creative motion production.
                  </p>
                </div>
              </header>

              {/* 2. Fluid Category Filter Buttons */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-neutral-800 pb-5 mb-10 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider" role="tablist" aria-label="Filter projects">
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
                    Development (3)
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
                    Creative Media (1)
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
                    Experiments (3)
                  </button>
                </div>

                <div className="hidden sm:block text-xs font-mono text-slate-500 dark:text-neutral-400">
                  Showing {filtered.length} of {ALL_PROJECTS.length}
                </div>
              </div>

              {/* 2. Asymmetrical Bento Box Grid with Fluid Framer Motion Filtering */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 auto-rows-fr"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((proj) => {
                    const isComplex = proj.isComplex;

                    return (
                      <motion.div
                        key={proj.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className={`h-full ${
                          isComplex ? 'col-span-1 md:col-span-2 lg:col-span-2' : 'col-span-1'
                        }`}
                      >
                        <ProjectCard
                          project={proj}
                          onOpenModal={handleOpenModal}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>

            </div>
          </section>

          {/* Accessible Project Detail Modal Dialog */}
          {activeModalProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
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
                    <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-600 dark:text-slate-300">
                      {activeModalProject.tech.map((t) => (
                        <span key={t} className="border-l border-slate-300 dark:border-neutral-700 pl-2">
                          {t}
                        </span>
                      ))}
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
