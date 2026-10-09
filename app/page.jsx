"use client";

import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
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

export default function Home() {
  return (
    <SiteLayout>
      {() => (
        <>
          <HomePageJsonLd />

          {/* ===================== HERO SECTION ===================== */}
          <section id="home" className="home-hero">
            <div className="home-hero-inner">
              {/* Desktop Left / Mobile Below Image */}
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
                  Computer engineering student exploring AI/ML, building software, and creating visual stories through video and design.
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
                  <a href="https://github.com/dszae" target="_blank" rel="me noreferrer" aria-label="GitHub profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                  <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noreferrer" aria-label="LinkedIn profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Instagram profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Facebook profile" className="hero-social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" /></svg>
                  </a>
                </nav>
              </div>

              {/* Desktop Right / Mobile Top */}
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
                    loading="eager"
                    priority
                    fetchPriority="high"
                    className="hero-portrait-image"
                  />
                </div>
              </figure>
            </div>
          </section>

          {/* ===================== SKILLS PREVIEW ===================== */}
          <section id="skills" className="skills-preview" aria-labelledby="skills-preview-heading">
            <div className="skills-preview-inner">
              <div className="skills-preview-heading">
                <h2 id="skills-preview-heading">Technical Skills & Disciplines</h2>
                <Link href="/skills">View All Technical Skills <span aria-hidden="true">&rarr;</span></Link>
              </div>
              <div className="skills-preview-grid">
                {SKILLS_PREVIEW.map((skill) => (
                  <Link key={skill.title} href={skill.href} aria-label={skill.label} className="skill-preview-card">
                    <span className="skill-preview-icon">{skill.icon}</span>
                    <h3>{skill.title}</h3>
                    <p>{skill.description}</p>
                    <span className="skill-preview-action" aria-hidden="true">
                      <span>View details</span>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ===================== PORTFOLIO DIRECTORY / SECTIONS ===================== */}
          <section id="directory" className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-16 sm:py-24 border-t border-[#CBD5E1] dark:border-[#26352F]" aria-labelledby="portfolio-sections-heading">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#065F46] dark:text-[#34D399] mb-2 block">
                  Site Navigation & Highlights
                </span>
                <h2 id="portfolio-sections-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB]">
                  Explore My Portfolio
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#1E293B] dark:text-[#A7B0BE] max-w-md">
                Direct links to engineering systems, technical competencies, verified credentials, and professional background.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. About */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">01. Profile</span>
                    <span className="text-xs font-mono text-[#64748B]">IOE Thapathali</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">About Me</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Learn about Dipesh Sapkota, a Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, combining algorithmic logic with visual media design.
                  </p>
                </div>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>Read About Me</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 2. Skills */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">02. Competencies</span>
                    <span className="text-xs font-mono text-[#64748B]">Software & Media</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Technical Skills</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Comprehensive overview of programming languages (C/C++, Python, JavaScript), full-stack frameworks (React, Next.js), and media suites.
                  </p>
                </div>
                <Link href="/skills" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>View Technical Skills</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 3. Projects */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">03. Showcase</span>
                    <span className="text-xs font-mono text-[#64748B]">Web Apps & Tools</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Featured Projects</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Interactive applications including Sportivo (live sports streaming), IOE Admission Guide (engineering admission counseling), and Git Visualizer.
                  </p>
                </div>
                <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>View Projects</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 4. Experience */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">04. Career</span>
                    <span className="text-xs font-mono text-[#64748B]">Roles & Campus</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Experience</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Professional editing and design roles at Clamphook Academy and undergraduate coursework at Institute of Engineering (IOE), Thapathali Campus.
                  </p>
                </div>
                <Link href="/experience" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>View Experience</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 5. Certificates */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">05. Credentials</span>
                    <span className="text-xs font-mono text-[#64748B]">Verified Certs</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Certificates</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Verified coursework and credentials from Udemy, Blackmagic Design, and EDUCBA across design principles, color correction, and software development.
                  </p>
                </div>
                <Link href="/certificates" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>View Certificates</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 6. Resume */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">06. CV</span>
                    <span className="text-xs font-mono text-[#64748B]">Full Journey</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Resume</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Complete curriculum vitae, work experience milestones, academic history at IOE Thapathali, and direct CV download options.
                  </p>
                </div>
                <Link href="/resume" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>View Resume</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 7. Contact */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">07. Get In Touch</span>
                    <span className="text-xs font-mono text-[#64748B]">Kathmandu, NP</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Contact</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Get in touch with Dipesh Sapkota for freelance video editing, software engineering collaborations, or inquiries.
                  </p>
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>Contact Dipesh</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 8. Gallery */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">08. Visual Archive</span>
                    <span className="text-xs font-mono text-[#64748B]">Campus Life</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Photo Gallery</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    Photographic moments from college cricket tournaments, Yathartha tech exhibitions, and campus life at IOE Thapathali in Nepal.
                  </p>
                </div>
                <Link href="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>Browse Gallery</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>

              {/* 9. Articles */}
              <article className="p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all hover:-translate-y-1 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold uppercase text-[#065F46] dark:text-[#34D399]">09. Publications</span>
                    <span className="text-xs font-mono text-[#64748B]">Technical Articles</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#F9FAFB] mb-2">Articles</h3>
                  <p className="text-sm text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-6">
                    In-depth software engineering write-ups documenting the architectural decisions behind Sportivo and Git Visualizer.
                  </p>
                </div>
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                  <span>Read Articles</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </article>
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}
