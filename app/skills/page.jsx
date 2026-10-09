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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Skills & Technical Competencies | Dipesh Sapkota',
  url: 'https://www.dipeshsapkota7.com.np/skills',
  description: 'Explore the technical, engineering, and creative skill set of Dipesh Sapkota, including C/C++, Python, React, Next.js, video editing, and circuit analysis.',
  mainEntity: {
    '@type': 'ItemList',
    name: 'Technical Competencies',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Programming & Software Development (C, C++, Python, React.js, Next.js, PHP)' },
      { '@type': 'ListItem', position: 2, name: 'Creative Media & Motion Graphics (Premiere Pro, After Effects, DaVinci Resolve, Graphic Design)' },
      { '@type': 'ListItem', position: 3, name: 'Computer Engineering & Hardware (Proteus Suite, Circuit Analysis, Breadboarding, 555 Timer, Embedded Systems)' },
    ],
  },
};

const SKILL_DOMAINS = [
  {
    category: 'Programming & Software Development',
    description: 'Practical coding experience ranging from low-level systems programming to modern responsive web development.',
    skills: [
      { name: 'C / C++', exp: '1+ Years', level: 'Intermediate', detail: 'Object-oriented programming, memory management, pointers, and algorithmic problem solving for computer engineering coursework.' },
      { name: 'Python', exp: '1+ Years', level: 'Intermediate', detail: 'Scripting, automation, data manipulation, and introductory machine learning algorithms.' },
      { name: 'React.js & Next.js', exp: '<1 Year', level: 'Practical Application', detail: 'Building modern responsive web applications, server components, dynamic routing, and API integration.' },
      { name: 'PHP', exp: '<1 Year', level: 'Learning', detail: 'Backend scripting, basic relational database interaction, and server-side form handling.' },
    ],
  },
  {
    category: 'Creative Media & Motion Design',
    description: 'Over 5 years of hands-on visual storytelling, high-impact motion graphics, and commercial video post-production.',
    skills: [
      { name: 'Video Editing', exp: '5+ Years', level: 'High Proficiency', detail: 'Long-form and short-form editing with Adobe Premiere Pro and DaVinci Resolve, sound design, color grading, and pacing.' },
      { name: 'Graphic Design', exp: '3+ Years', level: 'Advanced', detail: 'Promotional branding, visual hierarchy, typography, thumbnail architecture, and social media marketing assets.' },
      { name: 'Motion Graphics', exp: '2+ Years', level: 'Intermediate', detail: 'Keyframe animation, kinetic typography, visual effects, and dynamic transitions using Adobe After Effects.' },
    ],
  },
  {
    category: 'Computer Engineering & Hardware',
    description: 'Academic laboratory and experimental experience with analog/digital electronics and instrumentation.',
    skills: [
      { name: 'Proteus Simulation Suite', exp: '1+ Years', level: 'Intermediate', detail: 'Schematic capture, circuit simulation, virtual instrumentation, and PCB design verification.' },
      { name: 'Circuit Analysis', exp: '1+ Years', level: 'Intermediate', detail: 'Mesh and nodal analysis, AC/DC network theorems, steady-state and transient circuit modeling.' },
      { name: 'Breadboarding & Prototyping', exp: '1+ Years', level: 'Intermediate', detail: 'Hardware prototyping with 555 timers, multivibrator circuits, discrete logic gates, and sensor interfaces.' },
    ],
  },
];

export default function SkillsPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-6 py-32">
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

      <header className="mb-12">
        <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
          Capabilities & Toolkit
        </span>
        <h1 className="text-4xl font-bold mb-4">Skills & Technical Competencies</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          An overview of technical disciplines, software stacks, and creative tools developed through academic studies at IOE Thapathali Campus and freelance media production.
        </p>
      </header>

      <div className="space-y-12">
        {SKILL_DOMAINS.map((domain) => (
          <section key={domain.category} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 backdrop-blur">
            <h2 className="text-2xl font-bold mb-2">{domain.category}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{domain.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domain.skills.map((skill) => (
                <div key={skill.name} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-base">{skill.name}</h3>
                    <span className="text-xs font-mono text-sky-600 dark:text-sky-400">{skill.exp}</span>
                  </div>
                  <span className="inline-block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{skill.level}</span>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">{skill.detail}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
        <Link href="/projects" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
          Explore Projects
        </Link>
        <Link href="/certificates" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          View Certifications
        </Link>
        <Link href="/resume" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          View Resume & CV
        </Link>
      </div>
    </main>
    </>
  );
}
