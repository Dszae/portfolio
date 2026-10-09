"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { HomePageJsonLd } from '../components/JsonLdSchema';

const PROJECTS = [
  {
    id: "sportivo",
    title: "Sportivo",
    category: "dev",
    categoryLabel: "Development",
    type: "Featured Web Application",
    description: "A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.",
    image: "/sportivo-preview.jpg",
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://sportivo.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/sportivo",
    articleUrl: "https://building-sportivo-live-sports-streaming.hashnode.dev/building-sportivo-how-i-engineered-a-real-time-live-sports-streaming-web-app",
    detailUrl: "/projects/sportivo"
  },
  {
    id: "ioe-admission",
    title: "IOE Admission Guide",
    category: "dev",
    categoryLabel: "Development",
    type: "Featured Web Application",
    description: "A comprehensive admission ecosystem for Tribhuvan University engineering applicants, offering statistical rank prediction, procedural counseling checklists, and automated priority form generation.",
    image: "/ioe-preview.jpg",
    tech: ["JavaScript", "React", "Data Analytics", "Tailwind CSS"],
    liveUrl: "https://ioe-admission.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/ioe-admission-guide",
    detailUrl: "/projects/ioe-admission-guide"
  },
  {
    id: "git-visualizer",
    title: "Git Visualizer",
    category: "dev",
    categoryLabel: "Development",
    type: "Interactive Developer Tool",
    description: "An interactive, visually driven learning tool designed to demystify Git version control operations through live data-flow rendering and canvas mapping of branching, commits, and merges.",
    image: "/git-preview.jpg",
    tech: ["HTML5 Canvas", "JavaScript", "UI/UX Design", "CSS3"],
    liveUrl: "https://git-visualizer.dipeshsapkota7.com.np/",
    githubUrl: "https://github.com/dszae/git-visualizer",
    articleUrl: "https://how-i-built-an-interactive-git-visualizer.hashnode.dev/how-i-built-an-interactive-git-visualizer-to-master-version-control",
    detailUrl: "/projects/git-visualizer"
  },
  {
    id: "555-flasher",
    title: "Astable Multivibrator LED Flasher",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Hardware Prototype",
    description: "Physical breadboard circuit built and simulated using a 555 timer IC, calculating RC time constants for frequency control and stable square-wave oscillation cycles.",
    tech: ["555 Timer IC", "Circuit Analysis", "Proteus Suite", "Breadboarding"]
  },
  {
    id: "sports-reels",
    title: "Sports Highlight Motion Reels",
    category: "media",
    categoryLabel: "Creative Media",
    type: "Motion Graphics & Video Editing",
    description: "High-impact dynamic sports video editing showcasing football and futsal highlights. Features audio-visual rhythm synchronization, speed ramps, and custom color grading.",
    tech: ["Premiere Pro", "After Effects", "DaVinci Resolve", "Sound Design"]
  },
  {
    id: "motor-modeling",
    title: "Electrical Machinery Modeling",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Engineering Analysis",
    description: "Torque derivations and equivalent circuit analysis of three-phase induction and DC motors, solving complex phasor networks and performance characteristics.",
    tech: ["Electrical Engineering", "Phasor Calculus", "Motor Analysis"]
  },
  {
    id: "analyzer-diag",
    title: "Automated Analyzer Diagnostics",
    category: "exp",
    categoryLabel: "Experiments",
    type: "Instrumentation Engineering",
    description: "Troubleshooting procedures for vacuum pressure systems, syringe probe calibrations, and electromechanical component layouts on medical immunoassay instruments.",
    tech: ["Biomedical Tech", "Fluidics", "Calibration Systems"]
  }
];

const MEDIA_SHOWCASE = [
  { id: 1, title: "College Cricket Tournament", alt: "Students posing together outdoors with cricket bats", img: "/cricket.webp", desc: "Campus Athletics" },
  { id: 2, title: "Yathartha Tech Exhibition Leadership", alt: "Yathartha event team posing on stage with medals and posters", img: "/yathartha.webp", desc: "Event Management" },
  { id: 3, title: "Clamphook Academic Milestones", alt: "Group gathered around a dining table under Nepal-themed wall art", img: "/clamphook.webp", desc: "Creative Production" },
  { id: 4, title: "Motion Design & Video Post-Production", alt: "Student wearing a headset in front of video-editing software", img: "/exploring.webp", desc: "Creative Studio" },
  { id: 5, title: "Engineering Fundamentals at IOE", alt: "Student sitting at a classroom desk during a lecture", img: "/lecture.webp", desc: "Academic Journey" },
  { id: 6, title: "Infrastructure Engineering Site Visit", alt: "Dipesh standing by a roadside with hills in the background", img: "/nagdhunga surung marga.webp", desc: "Field Exploration" }
];

const TOOLKIT_GROUPS = [
  {
    title: "Software & Algorithms",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    ),
    skills: ["C / C++", "Python", "JavaScript (ES6+)", "React.js", "Next.js", "PHP", "Tailwind CSS", "REST APIs"]
  },
  {
    title: "Creative Media & Motion",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" /></svg>
    ),
    skills: ["Video Editing", "Motion Graphics", "Graphic Design", "Color Grading", "Visual Storytelling", "Typography & Layout"]
  },
  {
    title: "Hardware & Engineering",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
    skills: ["Circuit Analysis", "Proteus Suite", "Breadboard Prototyping", "555 Timer Systems", "Machinery Modeling", "Digital Logic"]
  },
  {
    title: "Tools & Environments",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
    skills: ["Git & GitHub", "Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Figma", "VS Code", "Linux / Bash", "Vercel"]
  }
];

const SKILLS_PREVIEW = [
  {
    title: "Engineering",
    description: "C/C++, Python, Problem Solving",
    href: "#projects",
    label: "Explore engineering projects",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-8-2 6h4l-2 5" /></svg>
  },
  {
    title: "AI / ML",
    description: "Learning, building, experimentation",
    href: "/skills",
    label: "Explore AI and machine learning skills",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="2.2" /><circle cx="5" cy="6" r="1.6" /><circle cx="19" cy="6" r="1.6" /><circle cx="5" cy="18" r="1.6" /><circle cx="19" cy="18" r="1.6" /><path strokeLinecap="round" d="m10.4 10.5-4-3m7.2 3 4-3m-7.2 6-4 3m7.2-3 4 3" /></svg>
  },
  {
    title: "Video & Editing",
    description: "Storytelling, post-production",
    href: "#media",
    label: "Explore video and media work",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="m10 9 5 3-5 3V9Z" /></svg>
  },
  {
    title: "Graphic Design",
    description: "Visuals, branding, creativity",
    href: "/skills",
    label: "Explore graphic design skills",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m4 20 4.2-1 10.6-10.6a2.1 2.1 0 0 0-3-3L5.2 16 4 20Z" /><path strokeLinecap="round" d="m14.5 7.5 3 3M4 20h16" /></svg>
  }
];

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  // Contact form state
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered projects
  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  // Handle contact form submission
  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setFormStatus("Sending message...");

    const form = event.target;
    const formData = new FormData(form);

    if (formData.get("botcheck")) {
      setFormStatus("Thank you! Your message has been sent.");
      form.reset();
      setIsSubmitting(false);
      return;
    }

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();

    if (!name || name.length > 100) {
      setFormStatus("Please provide a valid name (up to 100 characters).");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      setFormStatus("Please provide a valid email address.");
      setIsSubmitting(false);
      return;
    }

    if (!message || message.length > 5000) {
      setFormStatus("Please provide a message (up to 5,000 characters).");
      setIsSubmitting(false);
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "e6fd2e32-2b5c-4a3f-81d9-aa02f4dfcc76";
    formData.set("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setFormStatus("Thank you! Your message has been sent.");
        form.reset();
      } else {
        setFormStatus("Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteLayout selectedImage={selectedImage} setSelectedImage={setSelectedImage}>
      {({ theme, isDark }) => (
        <>
          <HomePageJsonLd />

          {/* ===================== HERO SECTION ===================== */}
          <section id="home" className="home-hero">
            <div className="home-hero-inner">
              <div className="hero-copy">
                <p className="hero-eyebrow">COMPUTER ENGINEERING &middot; CREATIVE MEDIA</p>
                <h1 className="hero-title">
                  Engineering logic.<br />
                  <span>Creating experiences.</span>
                </h1>
                <p className="hero-description">
                  Computer engineering student exploring AI/ML, building software, and creating visual stories through video and design.
                </p>

                <div className="hero-actions">
                  <a href="#projects" className="hero-button hero-button-primary">
                    Explore My Work
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" /></svg>
                  </a>
                  <a href="#contact" className="hero-button hero-button-secondary">Get In Touch</a>
                  <a href="/my_cv.pdf" download="Dipesh_Sapkota_CV.pdf" className="hero-cv-link">
                    Download CV
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4m-3 7v2h14v-2" /></svg>
                  </a>
                </div>

                <div className="hero-socials" aria-label="Social profiles">
                  <a href="https://github.com/dszae" target="_blank" rel="me noreferrer" aria-label="GitHub profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                  <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noreferrer" aria-label="LinkedIn profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Instagram profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Facebook profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                  </a>
                </div>
              </div>

              <figure className="hero-portrait-wrap">
                <div className="hero-portrait-accent" aria-hidden="true" />
                <div className="hero-portrait-frame">
                  <Image
                    src="/dipesh-sapkota.jpg"
                    id="primary-profile-image"
                    itemProp="image"
                    alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
                    fill
                    sizes="(max-width: 680px) 88vw, (max-width: 899px) 38vw, 440px"
                    fetchPriority="high"
                    priority
                    className="hero-portrait-image"
                  />
                </div>
              </figure>
            </div>
          </section>

          <section className="skills-preview" aria-labelledby="skills-preview-heading">
            <div className="skills-preview-inner">
              <div className="skills-preview-heading">
                <h2 id="skills-preview-heading">Areas I work across</h2>
                <Link href="/skills">View all skills <span aria-hidden="true">&rarr;</span></Link>
              </div>
              <div className="skills-preview-grid">
                {SKILLS_PREVIEW.map((skill) => (
                  <Link key={skill.title} href={skill.href} aria-label={skill.label} className="skill-preview-card">
                    <span className="skill-preview-icon">{skill.icon}</span>
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
          {/* ===================== ABOUT SECTION ===================== */}
          <section id="about" className={`py-24 px-6 sm:px-12 w-full border-t ${isDark ? 'border-[#29372F]' : 'border-[#D6E1D9]'} ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#087F5B] dark:text-[#34D399]">01. Profile &amp; Background</span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Bridging Logic &amp; Visual Execution</h2>
                </div>
                <Link href="/about" className="text-sm font-semibold text-[#087F5B] dark:text-[#34D399] hover:underline flex items-center gap-1.5 font-mono">
                  <span>View Full Profile Page</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-stretch">
                <div className={`md:col-span-7 p-6 sm:p-10 rounded-2xl border backdrop-blur-md ${theme.card} flex flex-col justify-between`}>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">Engineering Problem Solving Meets Creative Direction</h3>
                    <p className={`text-base sm:text-lg leading-relaxed mb-5 ${theme.muted}`}>
                      Hello! I am <strong>Dipesh Sapkota</strong>, a Computer Engineering student at <span className="font-semibold text-[#087F5B] dark:text-[#34D399]">IOE Thapathali Campus</span> in Kathmandu, Nepal. My technical focus centers on algorithms, software architecture, and intelligent hardware systems.
                    </p>
                    <p className={`text-base sm:text-lg leading-relaxed ${theme.muted}`}>
                      Alongside engineering, I bring 4+ years of professional freelance experience in video editing, motion graphics, and graphic design for global clients and academic institutions. This dual foundation enables me to design software with visual clarity and engineer creative assets with technical precision.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#D6E1D9] dark:border-[#29372F] flex flex-wrap gap-3">
                    <span className={`px-3 py-1 text-xs font-mono rounded-lg ${theme.tag}`}>Algorithms &amp; C/C++</span>
                    <span className={`px-3 py-1 text-xs font-mono rounded-lg ${theme.tag}`}>Full-Stack Web</span>
                    <span className={`px-3 py-1 text-xs font-mono rounded-lg ${theme.tag}`}>Motion Post-Production</span>
                    <span className={`px-3 py-1 text-xs font-mono rounded-lg ${theme.tag}`}>AI/ML Exploration</span>
                  </div>
                </div>

                <div className="md:col-span-5 grid grid-cols-2 gap-4">
                  <div className={`p-6 rounded-2xl border ${theme.card} flex flex-col justify-center text-center`}>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#087F5B] dark:text-[#34D399] mb-1">4+</div>
                    <div className="font-mono text-xs uppercase tracking-wider font-semibold">Years Experience</div>
                    <div className={`text-xs mt-1 ${theme.muted}`}>Media &amp; Freelance</div>
                  </div>

                  <div className={`p-6 rounded-2xl border ${theme.card} flex flex-col justify-center text-center`}>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#087F5B] dark:text-[#34D399] mb-1">50+</div>
                    <div className="font-mono text-xs uppercase tracking-wider font-semibold">Global Clients</div>
                    <div className={`text-xs mt-1 ${theme.muted}`}>Delivered Assets</div>
                  </div>

                  <div className={`p-6 rounded-2xl border ${theme.card} flex flex-col justify-center text-center`}>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#087F5B] dark:text-[#34D399] mb-1">10+</div>
                    <div className="font-mono text-xs uppercase tracking-wider font-semibold">Live Projects</div>
                    <div className={`text-xs mt-1 ${theme.muted}`}>Web &amp; Hardware</div>
                  </div>

                  <div className={`p-6 rounded-2xl border ${theme.card} flex flex-col justify-center text-center`}>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#087F5B] dark:text-[#34D399] mb-1">IOE</div>
                    <div className="font-mono text-xs uppercase tracking-wider font-semibold">Thapathali</div>
                    <div className={`text-xs mt-1 ${theme.muted}`}>Computer Eng.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================== PROJECT SHOWCASE ===================== */}
          <section id="projects" className={`py-24 px-6 sm:px-12 w-full border-t ${isDark ? 'border-[#29372F]' : 'border-[#D6E1D9]'} ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#087F5B] dark:text-[#34D399]">02. Selected Work</span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Project Showcase &amp; Engineering</h2>
                  <p className={`mt-2 text-base ${theme.muted}`}>Interactive web systems, developer utilities, hardware prototypes, and creative motion.</p>
                </div>

                {/* Working Project Filtering Tabs */}
                <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-[#D6E1D9] dark:border-[#29372F] bg-[#FFFFFF] dark:bg-[#121916] self-start md:self-auto" role="tablist" aria-label="Project category filter">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedFilter === 'all'}
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedFilter === 'all'
                        ? 'bg-[#087F5B] dark:bg-[#34D399] text-white dark:text-[#0B0F0D] shadow-sm'
                        : 'text-[#45574C] dark:text-[#B0BBB5] hover:text-[#087F5B] dark:hover:text-[#34D399]'
                    }`}
                  >
                    All ({PROJECTS.length})
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedFilter === 'dev'}
                    onClick={() => setSelectedFilter('dev')}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedFilter === 'dev'
                        ? 'bg-[#087F5B] dark:bg-[#34D399] text-white dark:text-[#0B0F0D] shadow-sm'
                        : 'text-[#45574C] dark:text-[#B0BBB5] hover:text-[#087F5B] dark:hover:text-[#34D399]'
                    }`}
                  >
                    Development
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedFilter === 'media'}
                    onClick={() => setSelectedFilter('media')}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedFilter === 'media'
                        ? 'bg-[#087F5B] dark:bg-[#34D399] text-white dark:text-[#0B0F0D] shadow-sm'
                        : 'text-[#45574C] dark:text-[#B0BBB5] hover:text-[#087F5B] dark:hover:text-[#34D399]'
                    }`}
                  >
                    Creative Media
                  </button>

                  <button
                    type="button"
                    role="tab"
                    aria-selected={selectedFilter === 'exp'}
                    onClick={() => setSelectedFilter('exp')}
                    className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedFilter === 'exp'
                        ? 'bg-[#087F5B] dark:bg-[#34D399] text-white dark:text-[#0B0F0D] shadow-sm'
                        : 'text-[#45574C] dark:text-[#B0BBB5] hover:text-[#087F5B] dark:hover:text-[#34D399]'
                    }`}
                  >
                    Experiments
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 flex flex-col justify-between ${theme.card} hover:-translate-y-1.5`}
                  >
                    <div>
                      {/* Image Preview if available */}
                      {proj.image && (
                        <div className={`w-full h-44 mb-5 rounded-xl overflow-hidden border border-[#D6E1D9] dark:border-[#29372F] relative group bg-[#121916]`}>
                          <Image
                            src={proj.image}
                            alt={`${proj.title} Preview`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-md bg-[#087F5B]/10 dark:bg-[#34D399]/10 text-[#087F5B] dark:text-[#34D399] border border-[#087F5B]/20 dark:border-[#34D399]/20">
                          {proj.categoryLabel}
                        </span>
                        <span className={`text-[11px] font-mono ${theme.muted}`}>{proj.type}</span>
                      </div>

                      <h3 className="text-xl font-bold mb-2.5 text-[#14231B] dark:text-[#F5F7F5]">{proj.title}</h3>
                      <p className={`text-sm leading-relaxed mb-5 ${theme.muted}`}>{proj.description}</p>
                    </div>

                    <div>
                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {proj.tech.map((t) => (
                          <span key={t} className={`px-2.5 py-1 text-[11px] font-mono rounded-md ${theme.tag}`}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-2 pt-3 border-t border-[#D6E1D9] dark:border-[#29372F] flex-wrap">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#087F5B] dark:bg-[#34D399] text-white dark:text-[#0B0F0D] hover:bg-[#066747] dark:hover:bg-[#6EE7B7] transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            <span>Live App</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                          </a>
                        )}

                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#D6E1D9] dark:border-[#29372F] hover:bg-[#EDF3EF] dark:hover:bg-[#18221D] transition-all flex items-center gap-1"
                          >
                            <span>Code</span>
                          </a>
                        )}

                        {proj.detailUrl && (
                          <Link
                            href={proj.detailUrl}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg text-[#087F5B] dark:text-[#34D399] hover:underline transition-all ml-auto font-mono"
                          >
                            Details &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#087F5B] dark:border-[#34D399] text-[#087F5B] dark:text-[#34D399] font-semibold text-sm hover:bg-[#087F5B] hover:text-white dark:hover:bg-[#34D399] dark:hover:text-[#0B0F0D] transition-all cursor-pointer font-mono"
                >
                  <span>Explore Complete Project Archive</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </section>

          {/* ===================== CREATIVE WORK & MEDIA ===================== */}
          <section id="media" className={`py-24 px-6 sm:px-12 w-full border-t ${isDark ? 'border-[#29372F]' : 'border-[#D6E1D9]'} ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#087F5B] dark:text-[#34D399]">03. Creative Direction</span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Creative Media &amp; Visual Archive</h2>
                  <p className={`mt-2 text-base ${theme.muted}`}>Documenting video editing, event leadership, campus athletics, and technical milestones.</p>
                </div>
                <Link href="/gallery" className="text-sm font-semibold text-[#087F5B] dark:text-[#34D399] hover:underline flex items-center gap-1.5 font-mono">
                  <span>Open Full Gallery Page</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {MEDIA_SHOWCASE.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    aria-label={`Open photo: ${item.title}`}
                    onClick={() => setSelectedImage({ src: item.img, title: item.title, alt: item.alt, desc: item.desc })}
                    className="group relative w-full aspect-video rounded-xl overflow-hidden border border-[#D6E1D9] dark:border-[#29372F] bg-[#121916] shadow-sm hover:shadow-md cursor-pointer transition-all duration-300 hover:border-[#087F5B]/60 dark:hover:border-[#34D399]/60"
                  >
                    <Image
                      src={item.img}
                      alt={item.alt}
                      width={640}
                      height={360}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0D]/90 via-[#0B0F0D]/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 sm:p-5">
                      <div className="self-end w-8 h-8 rounded-full bg-[#087F5B] dark:bg-[#34D399] text-white dark:text-[#0B0F0D] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                      </div>
                      <div className="text-left">
                        <p className="text-[11px] font-mono uppercase tracking-wider text-[#34D399] font-semibold">{item.desc}</p>
                        <p className="text-[#F5F7F5] text-xs sm:text-sm font-semibold truncate mt-0.5">{item.title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ===================== SKILLS & TOOLKIT ===================== */}
          <section id="skills" className={`py-24 px-6 sm:px-12 w-full border-t ${isDark ? 'border-[#29372F]' : 'border-[#D6E1D9]'} ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#087F5B] dark:text-[#34D399]">04. Technical Capabilities</span>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1">Skills &amp; Professional Toolkit</h2>
                  <p className={`mt-2 text-base ${theme.muted}`}>Core technical capabilities organized across engineering, creative media, and computing.</p>
                </div>
                <Link href="/skills" className="text-sm font-semibold text-[#087F5B] dark:text-[#34D399] hover:underline flex items-center gap-1.5 font-mono">
                  <span>View Detailed Proficiency Page</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOOLKIT_GROUPS.map((group, gIdx) => (
                  <div key={gIdx} className={`p-6 rounded-2xl border backdrop-blur-md ${theme.card} flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#087F5B]/10 dark:bg-[#34D399]/10 text-[#087F5B] dark:text-[#34D399] flex items-center justify-center flex-shrink-0">
                          {group.icon}
                        </div>
                        <h3 className="font-bold text-base text-[#14231B] dark:text-[#F5F7F5] leading-tight">{group.title}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg border ${
                              isDark ? 'bg-[#18221D] border-[#29372F] text-[#F5F7F5]' : 'bg-[#EDF3EF] border-[#D6E1D9] text-[#14231B]'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===================== CONTACT SECTION ===================== */}
          <section id="contact" className={`py-24 px-6 sm:px-12 w-full border-t ${isDark ? 'border-[#29372F]' : 'border-[#D6E1D9]'} ${theme.bg}`}>
            <div className="max-w-7xl mx-auto w-full">
              <div className={`p-6 sm:p-10 md:p-14 rounded-3xl border backdrop-blur-md ${theme.card}`}>
                <div className="grid lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-5">
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#087F5B] dark:text-[#34D399]">05. Get In Touch</span>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-1 mb-4">Let&apos;s Connect</h2>
                    <p className={`mb-8 text-base leading-relaxed ${theme.muted}`}>
                      I am open for software engineering internships, freelance video editing and motion graphics projects, and collaborative technical initiatives.
                    </p>

                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[#087F5B]/10 dark:bg-[#34D399]/10 flex items-center justify-center text-[#087F5B] dark:text-[#34D399] flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <div>
                          <div className={`font-mono text-[11px] uppercase tracking-wider ${theme.muted}`}>Location</div>
                          <div className="font-semibold text-sm">Kathmandu, Nepal</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[#087F5B]/10 dark:bg-[#34D399]/10 flex items-center justify-center text-[#087F5B] dark:text-[#34D399] flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        </div>
                        <div>
                          <div className={`font-mono text-[11px] uppercase tracking-wider ${theme.muted}`}>Phone</div>
                          <a href="tel:+9779764685307" className="font-semibold text-sm hover:text-[#087F5B] dark:hover:text-[#34D399] transition-colors">9764685307</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-[#087F5B]/10 dark:bg-[#34D399]/10 flex items-center justify-center text-[#087F5B] dark:text-[#34D399] flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                          <div className={`font-mono text-[11px] uppercase tracking-wider ${theme.muted}`}>Email</div>
                          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dsz.ae18@gmail.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-sm hover:text-[#087F5B] dark:hover:text-[#34D399] transition-colors">dsz.ae18@gmail.com</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <form className="space-y-4" onSubmit={handleContactSubmit} aria-busy={isSubmitting}>
                      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden="true" />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="sr-only" htmlFor="home-contact-name">Your Name</label>
                          <input
                            id="home-contact-name"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            autoComplete="name"
                            className={`w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#087F5B]/30 dark:focus:ring-[#34D399]/30 transition-all ${theme.input}`}
                            required
                          />
                        </div>
                        <div>
                          <label className="sr-only" htmlFor="home-contact-email">Your Email</label>
                          <input
                            id="home-contact-email"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            autoComplete="email"
                            className={`w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#087F5B]/30 dark:focus:ring-[#34D399]/30 transition-all ${theme.input}`}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="sr-only" htmlFor="home-contact-message">Your Message</label>
                        <textarea
                          id="home-contact-message"
                          name="message"
                          placeholder="Tell me about your project, ideas, or opportunity..."
                          rows="4"
                          className={`w-full px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#087F5B]/30 dark:focus:ring-[#34D399]/30 transition-all resize-none ${theme.input}`}
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3.5 sm:px-8 sm:py-4 bg-[#087F5B] hover:bg-[#066747] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0D] font-semibold rounded-xl disabled:cursor-not-allowed disabled:opacity-60 transition-all w-full shadow-md cursor-pointer hover:-translate-y-0.5 text-sm"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>

                      {formStatus && (
                        <p role="status" aria-live="polite" className={`text-xs text-center font-semibold mt-3 ${formStatus.includes("wrong") || formStatus.includes("error") ? "text-red-500" : "text-[#087F5B] dark:text-[#34D399]"}`}>
                          {formStatus}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}
