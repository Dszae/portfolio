"use client";

import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import InteractivePortrait from '../components/InteractivePortrait';
import { HomePageJsonLd } from '../components/JsonLdSchema';

const SKILLS_PREVIEW = [
  {
    title: "Software & Web Development",
    description: "C, C++, Python, React, Next.js, and practical full-stack system architecture.",
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
    name: "Sportivo — Live Scores, Fixtures & Sports News",
    description: "A focused real-time sports platform that combines live scores, upcoming fixtures, match discovery, and sports news in one responsive experience for football, cricket, and basketball fans.",
    href: "/projects/sportivo",
    image: "/sportivo-preview.jpg",
    liveUrl: "https://sportivo.dipeshsapkota7.com.np/",
    linkLabel: "Visit Sportivo",
  },
  {
    name: "IOE Admission Hub",
    description: "An admission toolkit for Institute of Engineering applicants featuring rank prediction, campus exploration, priority planning, CBT score calculation, and counseling guidance.",
    href: "/projects/ioe-admission-guide",
    image: "/ioe-preview.jpg",
    linkLabel: "Explore IOE Admission Hub",
  },
  {
    name: "Git Visualizer",
    description: "An interactive Git learning platform featuring a live commit graph, deterministic Git command simulator, guided lessons, safe undo tools, command reference, and a visual explanation of how Git moves code between repository stages.",
    href: "/projects/git-visualizer",
    image: "/git-preview.jpg",
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
    description: "Direct contact channels for software development, video editing, and freelance consultations.",
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
                <p className="hero-eyebrow">Computer Engineering &middot; Creative Media</p>
                <h1 className="hero-title">
                  <span className="hero-name-badge block font-mono text-sm sm:text-base font-bold tracking-widest uppercase text-[#065F46] dark:text-[#34D399] mb-3">
                    Dipesh Sapkota
                  </span>
                  Engineering logic.<br />
                  <span>Creating experiences.</span>
                </h1>
                <p className="hero-description">
                  I explore AI/ML, build software, and create visual stories through video and design.
                </p>

                <div className="hero-actions">
                  <Link href="/projects" className="hero-button hero-button-primary">
                    <span>View Projects</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </Link>
                  <Link href="/contact" className="hero-button hero-button-secondary">
                    Contact Me
                  </Link>
                  <Link href="/resume" className="hero-cv-link">
                    <span>View Resume</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                <nav className="hero-socials" aria-label="Social profiles">
                  <a href="https://github.com/dszae" target="_blank" rel="me noopener noreferrer" aria-label="My GitHub profile (dszae)" className="hero-social-link" title="My GitHub profile (dszae)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                  <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noopener noreferrer" aria-label="My LinkedIn profile (dszae)" className="hero-social-link" title="My LinkedIn profile (dszae)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="https://dev.to/dszae" target="_blank" rel="me noopener noreferrer" aria-label="My DEV Community profile (dszae)" className="hero-social-link" title="My DEV Community profile (dszae)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H5.34v4.36h1.22c.4 0 .69-.08.87-.25.18-.17.28-.46.28-.86v-2.16c0-.4-.1-.69-.29-.86zM20.5 2H3.5A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.94 13.08c0 .73-.24 1.3-.72 1.7-.48.4-1.16.6-2.04.6H3.6V8.62h2.58c.88 0 1.56.2 2.04.6.48.4.72.97.72 1.7v2.16zm5.12-3.26h-2.58v1.65h2.2v1.18h-2.2v1.73h2.58v1.2H9.8V8.62h4.26v1.2zm6.34 0l-1.9 6.96h-1.38l-1.9-6.96h1.44l1.15 4.79 1.15-4.79h1.44z"/></svg>
                  </a>
                  <a href="https://x.com/DszAe18" target="_blank" rel="me noopener noreferrer" aria-label="My X profile (DszAe18)" className="hero-social-link" title="My X profile (DszAe18)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noopener noreferrer" aria-label="My Instagram profile (dsz.ae)" className="hero-social-link" title="My Instagram profile (dsz.ae)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noopener noreferrer" aria-label="My Facebook profile (dsz.ae)" className="hero-social-link" title="My Facebook profile (dsz.ae)">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                  </a>
                </nav>
              </div>

              <figure className="hero-portrait-wrap">
                <div className="hero-portrait-accent" aria-hidden="true" />
                <InteractivePortrait />
              </figure>
            </div>
          </section>

          <section id="skills" className="skills-preview" aria-labelledby="skills-preview-heading">
            <div className="skills-preview-inner">
              <div className="skills-preview-heading">
                <h2 id="skills-preview-heading">Technical Skills & Disciplines</h2>
                <Link href="/skills" className="inline-flex items-center gap-1.5 group">
                  <span>View All Technical Skills</span>
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
                  View all projects &rarr;
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {FEATURED_PROJECTS.map((project) => (
                  <article
                    key={project.name}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#222933] dark:bg-[#0F1216]"
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} project preview`}
                      width={993}
                      height={450}
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
                          {project.linkLabel} &rarr;
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="portfolio-directory" className="px-6 py-16 sm:px-10 lg:px-16 border-t border-slate-200 dark:border-[#222933]" aria-labelledby="portfolio-directory-heading">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10">
                <p className="section-eyebrow">Explore all sections</p>
                <h2 id="portfolio-directory-heading" className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-white">
                  Portfolio Directory &amp; Navigation
                </h2>
                <p className="mt-2 text-sm sm:text-base text-[#475569] dark:text-[#A7B0BE] max-w-2xl">
                  Quick access to my academic background, technical skills, software systems, articles, certifications, and direct contact channels.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {CORE_SECTIONS.map((section) => (
                  <Link
                    key={section.href}
                    href={section.href}
                    className="group flex flex-col justify-between p-5 rounded-2xl border border-slate-200 dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm hover:border-[#065F46]/60 dark:hover:border-[#34D399]/60 hover:-translate-y-0.5 transition-all"
                  >
                    <div>
                      <h3 className="text-base font-bold text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors mb-2">
                        {section.title}
                      </h3>
                      <p className="text-xs text-[#475569] dark:text-[#A7B0BE] leading-relaxed mb-4">
                        {section.description}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#065F46] dark:text-[#34D399]">
                      <span>{section.cta}</span>
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" focusable="false">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}
