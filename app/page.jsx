"use client";

import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import InteractivePortrait from '../components/InteractivePortrait';
import { HomePageJsonLd } from '../components/JsonLdSchema';

const SKILLS_PREVIEW = [
  {
    title: "Software & Web Development",
    description: "C, C++, Python, React, Next.js, and practical software systems architecture.",
    href: "/skills",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    label: "Explore software development skills"
  },
  {
    title: "Creative Media & Motion",
    description: "Premiere Pro, After Effects, dynamic sports edits, and visual design assets.",
    href: "/gallery",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    label: "View creative media and editing work"
  },
  {
    title: "AI & Intelligent Systems",
    description: "Exploration of algorithms, models, and machine learning problem solving.",
    href: "/about",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    label: "Read about AI background"
  },
  {
    title: "Hardware & Engineering",
    description: "Circuit analysis, Proteus simulation models, and practical breadboard prototypes.",
    href: "/projects",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    label: "Explore hardware projects"
  }
];

const FEATURED_PROJECTS = [
  {
    name: "Sportivo - Live Sports Platform",
    description: "A real-time sports discovery platform combining live score telemetry, upcoming fixtures, and dynamic multi-server stream switching for football, cricket, and basketball.",
    href: "/projects/sportivo",
    image: "/sportivo-preview.webp",
    liveUrl: "https://sportivo.dipeshsapkota7.com.np/",
    linkLabel: "Visit Sportivo",
  },
  {
    name: "IOE Admission Hub",
    description: "An admission toolkit for Institute of Engineering applicants featuring rank prediction, campus exploration, priority planning, CBT score calculation, and counseling guidance.",
    href: "/projects/ioe-admission-guide",
    image: "/ioe-preview.webp",
    linkLabel: "Explore IOE Admission Hub",
  },
  {
    name: "Git Visualizer",
    description: "An interactive Git learning platform featuring a live commit graph, deterministic Git command simulator, guided lessons, safe undo tools, command reference, and a visual explanation of how Git moves code between repository stages.",
    href: "/projects/git-visualizer",
    image: "/git-preview.webp",
    linkLabel: "Explore Git Visualizer",
  },
];

const CORE_SECTIONS = [
  {
    title: "About Dipesh Sapkota",
    description: "Academic background at IOE Thapathali Campus, 4+ years of freelance experience, and engineering focus.",
    href: "/about",
    cta: "Read biography",
  },
  {
    title: "Technical Skills",
    description: "C/C++, Python, React, Next.js, AI/ML problem solving, circuit analysis, and video editing workflows.",
    href: "/skills",
    cta: "View competencies",
  },
  {
    title: "Engineering Projects",
    description: "Flagship web platforms (Sportivo, Git Visualizer, IOE Admission Guide) and hardware prototypes.",
    href: "/projects",
    cta: "Explore portfolio",
  },
  {
    title: "Articles & Write-Ups",
    description: "In-depth technical architecture write-ups, DAG visualization tutorials, and engineering notes.",
    href: "/blog",
    cta: "Read articles",
  },
  {
    title: "Verified Certifications",
    description: "Accredited credentials from Udemy, EDUCBA, and Blackmagic Design in design, motion, and web development.",
    href: "/certificates",
    cta: "View certificates",
  },
  {
    title: "Curriculum Vitae",
    description: "Full work milestones, leadership roles, academic record at Thapathali Campus, and downloadable PDF CV.",
    href: "/resume",
    cta: "View resume",
  },
  {
    title: "Visual Gallery",
    description: "High-resolution photo archive documenting campus tech exhibitions, cricket tournaments, and field visits.",
    href: "/gallery",
    cta: "Browse gallery",
  },
  {
    title: "Contact & Inquiries",
    description: "Direct contact channels for engineering collaborations, video editing, and consultations.",
    href: "/contact",
    cta: "Get in touch",
  },
];


export default function Home() {
  return (
    <SiteLayout>
      {() => (
        <>
          <HomePageJsonLd />

          <section id="home" className="home-hero">
            <div className="home-hero-inner">
              <div className="hero-copy">
                <div className="mb-3">
                  <span className="hero-name-badge inline-block text-base sm:text-lg font-semibold text-[#065F46] dark:text-[#34D399]">
                    Dipesh Sapkota
                  </span>
                </div>
                <h1 className="hero-title">
                  Engineering logic.<br />
                  <span>Creating visual rhythm.</span>
                </h1>
                <p className="hero-description">
                  Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal. Focused on Artificial Intelligence, Machine Learning, video editing, and motion graphics design.
                </p>

                <div className="hero-actions">
                  <Link href="/projects" prefetch={true} className="hero-button hero-button-primary">
                    <span>View Projects</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </Link>
                  <Link href="/contact" prefetch={true} className="hero-button hero-button-secondary">
                    Contact Me
                  </Link>
                </div>
              </div>

              <figure className="hero-portrait-wrap">
                <div className="hero-portrait-accent" aria-hidden="true" />
                <InteractivePortrait />
              </figure>
            </div>
          </section>

          <section id="about" className="px-6 py-16 sm:px-10 lg:px-16 border-t border-slate-200 dark:border-[#222933]" aria-labelledby="about-preview-heading">
            <div className="mx-auto max-w-6xl">
              <div className="max-w-3xl">
                <p className="section-eyebrow">About Dipesh Sapkota</p>
                <h2 id="about-preview-heading" className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white leading-tight">
                  I am Dipesh Sapkota, a Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#475569] dark:text-[#A7B0BE]">
                  My academic work focuses on Artificial Intelligence, Machine Learning, embedded systems, and algorithmic problem solving. Alongside engineering, I have worked for over four years as a freelance motion graphics designer and video editor with more than 50 global clients, producing dynamic video content and visual educational media.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link href="/about" prefetch={true} className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#065F46] hover:underline dark:text-[#34D399]">
                    <span>Read full biography</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Bottom Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10" aria-label="Key Statistics and Contact">
                {/* Card 1: Experience */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] flex flex-col justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-[#065F46] dark:text-[#34D399]">4+</span>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#A7B0BE] font-bold mt-1">Years Experience</p>
                    <p className="text-xs text-[#64748B] dark:text-[#8892B0] mt-1">Motion Graphics &amp; Video Editing</p>
                  </div>
                </div>

                {/* Card 2: Clients */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] flex flex-col justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-bold text-[#065F46] dark:text-[#34D399]">50+</span>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#A7B0BE] font-bold mt-1">Global Clients</p>
                    <p className="text-xs text-[#64748B] dark:text-[#8892B0] mt-1">Commercial &amp; Educational Projects</p>
                  </div>
                </div>

                {/* Card 3: Affiliation */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] flex flex-col justify-between">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">IOE Thapathali</span>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#334155] dark:text-[#A7B0BE] font-bold mt-1">Campus Affiliation</p>
                    <p className="text-xs text-[#64748B] dark:text-[#8892B0] mt-1">Tribhuvan University, Kathmandu</p>
                  </div>
                </div>

                {/* Card 4: Connect & Collaborate */}
                <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] flex flex-col justify-between">
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-white">Connect &amp; Collaborate</span>
                    <p className="text-xs text-[#475569] dark:text-[#A7B0BE] leading-relaxed mt-1">
                      Open for AI/ML engineering collaborations, academic research, and motion design commissions.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#065F46] dark:text-[#34D399] hover:underline"
                    >
                      <span>Send an inquiry</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" className="skills-preview" aria-labelledby="skills-preview-heading">
            <div className="skills-preview-inner">
              <div className="skills-preview-heading">
                <h2 id="skills-preview-heading">Technical Skills & Disciplines</h2>
                <Link href="/skills" className="inline-flex items-center gap-1.5 group">
                  <span>View all skills</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
              <div className="skills-preview-grid">
                {SKILLS_PREVIEW.map((skill) => (
                  <Link key={skill.title} href={skill.href} aria-label={skill.label} className="skill-preview-card">
                    <span className="skill-preview-icon">{skill.icon}</span>
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                    <span className="skill-preview-action" aria-hidden="true">
                      <span>View details</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="featured-projects" className="px-6 py-16 sm:px-10 lg:px-16" aria-labelledby="featured-projects-heading">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="section-eyebrow">Selected work from my practice</p>
                  <h2 id="featured-projects-heading" className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                    Featured Engineering Projects
                  </h2>
                  <p className="mt-3 max-w-2xl text-[#475569] dark:text-[#A7B0BE]">
                    Explore Sportivo, the IOE Admission Guide admission hub, and Git Visualizer from my engineering practice.
                  </p>
                </div>
                <Link href="/projects" className="font-mono text-sm font-semibold text-[#065F46] hover:underline dark:text-[#34D399]">
                  View all projects
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {FEATURED_PROJECTS.map((project) => (
                  <article
                    key={project.name}
                    className="project-card group overflow-hidden rounded-2xl transition duration-200"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      width={993}
                      height={450}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                      loading="lazy"
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-[#0F172A] dark:text-white">
                        <Link href={project.href} className="hover:text-[#065F46] dark:hover:text-[#34D399]">
                          {project.name}
                        </Link>
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#475569] dark:text-[#A7B0BE]">{project.description}</p>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-mono text-sm font-semibold text-[#065F46] hover:underline dark:text-[#34D399]">
                          {project.linkLabel}
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="connect" className="px-6 py-20 sm:px-10 lg:px-16 border-t border-slate-200 dark:border-[#222933]">
            <div className="mx-auto max-w-4xl text-center">
              <p className="section-eyebrow">Collaboration &amp; Inquiries</p>
              <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                Let&apos;s build something meaningful.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-[#A7B0BE] max-w-xl mx-auto leading-relaxed">
                Open for software engineering projects, AI/ML research collaborations, and motion graphics commissions.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="hero-button hero-button-primary text-sm font-semibold"
                >
                  Get in touch
                </Link>
                <a
                  href="mailto:dsz.ae18@gmail.com"
                  className="hero-button hero-button-secondary font-mono text-sm"
                >
                  dsz.ae18@gmail.com
                </a>
              </div>
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}
