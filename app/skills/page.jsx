import React from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata = {
  title: 'Skills & Technical Competencies',
  description: 'Explore the technical, engineering, and creative skill set of Dipesh Sapkota, including C/C++, Python, React, Next.js, video editing, and circuit analysis.',
  alternates: { canonical: '/skills' },
  openGraph: {
    type: 'website',
    title: 'Skills & Technical Competencies | Dipesh Sapkota',
    description: 'Explore the programming, engineering, and creative media skill set of Dipesh Sapkota.',
    url: '/skills',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota skills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills | Dipesh Sapkota',
    description: 'Explore the programming, engineering, and creative media skills of Dipesh Sapkota.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

const siteUrl = 'https://www.dipeshsapkota7.com.np';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Skills & Technical Competencies | Dipesh Sapkota',
  url: `${siteUrl}/skills`,
  description: 'Explore the technical, engineering, and creative skill set of Dipesh Sapkota, including C/C++, Python, React, Next.js, video editing, and circuit analysis.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Technical Competencies',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Programming & Software Development (C, C++, Python, React.js, Next.js, PHP)' },
      { '@type': 'ListItem', position: 2, name: 'Creative Media & Motion Graphics (Premiere Pro, After Effects, DaVinci Resolve, Graphic Design)' },
      { '@type': 'ListItem', position: 3, name: 'Computer Engineering & Hardware (Proteus Suite, Circuit Analysis, Breadboarding, 555 Timer)' },
    ],
  },
};

const SKILL_CATEGORIES = [
  {
    title: "Programming & Web Systems",
    icon: (
      <svg className="w-6 h-6 text-sky-600 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    skills: [
      { name: "C / C++", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-sky-600 dark:bg-sky-500", detail: "Object-oriented programming, memory management, pointers, and algorithmic problem solving." },
      { name: "Python", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-sky-600 dark:bg-sky-500", detail: "Scripting, web scraping, data manipulation, and introductory machine learning algorithms." },
      { name: "React.js & Next.js", exp: "<1 Year", level: "Practical", percent: 65, color: "bg-sky-600 dark:bg-sky-500", detail: "Building responsive web apps, App Router, Tailwind CSS, and full-stack API integration." },
      { name: "PHP & Backend", exp: "<1 Year", level: "Learning", percent: 40, color: "bg-sky-600 dark:bg-sky-500", detail: "Server-side scripting, relational databases, and dynamic form processing." },
    ],
  },
  {
    title: "Creative Media & Motion Design",
    icon: (
      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    ),
    skills: [
      { name: "Video Editing", exp: "5+ Years", level: "High Proficiency", percent: 90, color: "bg-purple-600 dark:bg-purple-400", detail: "Commercial editing with Adobe Premiere Pro and DaVinci Resolve, pacing, multi-cam, sound design." },
      { name: "Graphic Design", exp: "3+ Years", level: "Advanced", percent: 85, color: "bg-pink-600 dark:bg-pink-400", detail: "Branding materials, typographic hierarchy, thumbnails, and promotional campaign assets." },
      { name: "Motion Graphics", exp: "2+ Years", level: "Intermediate", percent: 70, color: "bg-purple-500 dark:bg-purple-300", detail: "Keyframe animation, kinetic text, visual effects, and UI motion in Adobe After Effects & Figma." },
    ],
  },
  {
    title: "Engineering & Hardware Labs",
    icon: (
      <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    skills: [
      { name: "Proteus Simulation Suite", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-600 dark:bg-emerald-400", detail: "Schematic capture, PCB design verification, and circuit oscillation simulations." },
      { name: "Circuit Analysis", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-emerald-600 dark:bg-emerald-400", detail: "Mesh/nodal calculations, AC/DC circuit theorems, steady-state and transient responses." },
      { name: "Breadboard Prototyping", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-600 dark:bg-emerald-400", detail: "Physical wiring with 555 timers, multivibrators, discrete transistors, and digital logic gates." },
    ],
  },
];

const TOOLS = [
  "C++", "Python", "React", "Next.js", "Tailwind CSS", "Git / GitHub", "Adobe Premiere Pro",
  "Adobe After Effects", "DaVinci Resolve", "Figma", "Adobe Photoshop", "Adobe Illustrator",
  "Proteus Suite", "Circuit Simulator", "555 Timer", "Linux / Bash"
];

export default function SkillsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 py-32">
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', path: '/' },
            { name: 'Skills', path: '/skills' },
          ]}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <header className="mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
            Technical Proficiency
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Skills & Technical Competencies</h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A comprehensive overview of programming languages, hardware instrumentation, and commercial creative toolsets developed through computer engineering studies at IOE Thapathali Campus and freelance digital media work.
          </p>
        </header>

        {/* Skill Category Cards with Progress Bars */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md flex flex-col justify-between shadow-sm hover:border-sky-500 dark:hover:border-sky-500 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-bold">{category.title}</h2>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40"
                    >
                      <div className="flex justify-between items-end mb-1.5">
                        <div>
                          <h3 className="font-semibold text-sm">{skill.name}</h3>
                          <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                            {skill.exp} &bull; {skill.level}
                          </p>
                        </div>
                        <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                          {skill.percent}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full rounded-full ${skill.color}`}
                          style={{ width: `${skill.percent}%` }}
                        ></div>
                      </div>

                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {skill.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Software & Toolkit Pills */}
        <section aria-labelledby="toolkit-heading" className="p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur mb-16">
          <h2 id="toolkit-heading" className="text-2xl font-bold mb-4 flex items-center gap-3">
            <span className="w-2.5 h-6 bg-sky-500 rounded-full inline-block"></span>
            Software Tools & Technologies
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Key software environments, frameworks, and applications utilized across engineering laboratories and media workflows.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 font-mono text-xs font-semibold text-slate-700 dark:text-slate-200 hover:border-sky-500 dark:hover:border-sky-500 transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link href="/projects" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
            View Projects
          </Link>
          <Link href="/certificates" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Verified Certifications
          </Link>
          <Link href="/resume" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            View Resume & CV
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Get in Touch
          </Link>
        </div>
      </main>
    </>
  );
}
