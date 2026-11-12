"use client";

import React from 'react';
import Link from 'next/link';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

const SKILL_DESCRIPTIONS = {
  'C': 'Memory & Systems',
  'C++': 'OOP & Computation',
  'Python': 'Logic & Automation',
  'React': 'Component Architecture',
  'React.js': 'Component Architecture',
  'Next.js': 'SSR & Production Web',
  'PHP': 'Server-Side Web Processing',
  'Adobe Premiere Pro': 'Rhythm, pacing & post-production',
  'Video Editing': 'Rhythm, pacing & post-production',
  'Adobe After Effects': 'Keyframe dynamics & kinetic titles',
  'Motion Graphics': 'Keyframe dynamics & kinetic titles',
  'DaVinci Resolve': 'Color science & grading',
  'Photoshop & Illustrator': 'Editorial layout & visual hierarchy',
  'Graphic Design': 'Editorial layout & visual hierarchy',
  'Circuit Analysis': 'AC/DC network theorems & phasors',
  'Proteus Simulation': 'Schematic capture & simulation models',
  'Proteus Suite': 'Schematic capture & simulation models',
  'Breadboarding': '555 timer wiring & signal validation',
  'Machine Learning': 'Supervised learning & algorithms',
  'Git & Version Control': 'DAGs & workflows'
};

const SKILL_GROUPS = [
  {
    id: 'development',
    path: 'skills/development',
    title: 'Development',
    note: 'Turning logic into functional software.',
    link: { href: '/projects', label: 'Explore Sportivo and Git Visualizer' },
    match: (category) => category === 'development' || category === 'programming',
  },
  {
    id: 'ai-data',
    path: 'skills/ai-data',
    title: 'AI and data',
    note: 'Exploring algorithms, models, and machine learning problem solving.',
    link: { href: '/about', label: 'Read about my focus' },
    match: (category) => /\bai\b|\bml\b|data|machine|intelligen/.test(category),
  },
  {
    id: 'creative-media',
    path: 'skills/creative-media',
    title: 'Creative media',
    note: 'Crafting visual stories through editing, motion, and design.',
    link: { href: '/gallery', label: 'Open visual archive' },
    match: (category) => /media|creative|design|video|motion/.test(category),
  },
  {
    id: 'hardware',
    path: 'skills/hardware',
    title: 'Hardware and engineering',
    note: 'Circuits, systems, and practical electronics, grounded in the IOE Thapathali Campus curriculum and laboratory prototyping.',
    link: { href: '/projects', label: 'Explore 555 flasher and machinery builds' },
    match: (category) => /hardware|circuit|engineering|embedded/.test(category),
  },
];

const EXTERNAL_ONLY_SLUGS = ['sports-reels', 'social-media'];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* The part of a skill name that a project's tech list would actually contain. */
function skillKey(name) {
  return (name || '')
    .replace(/^Adobe\s+/i, '')
    .split('&')[0]
    .replace(/\s+(Simulation|Suite)$/i, '')
    .trim()
    .toLowerCase();
}

function techMatchesSkill(tech, key) {
  if (!key) return false;
  const pattern = new RegExp(`(^|[^a-z0-9+#.])${escapeRegExp(key)}($|[^a-z0-9+#])`, 'i');
  return pattern.test(tech);
}

function projectsUsingSkill(skillName, projects) {
  const key = skillKey(skillName);
  return projects
    .filter((project) => project.tech.some((tech) => techMatchesSkill(tech, key)))
    .slice(0, 2);
}

function ArrowIcon() {
  return (
    <svg className="skill-sheet-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function SkillsClientView({ initialSkills = [], initialProjects = [], jsonLd = null }) {
  const projects = initialProjects
    .map((project) => {
      const slug = project.slug || '';
      const tech = Array.isArray(project.tech)
        ? project.tech
        : (typeof project.tech === 'string' ? project.tech.split(',').map((item) => item.trim()) : []);
      const liveUrl = project.liveUrl || project.live_url || '';
      const external = EXTERNAL_ONLY_SLUGS.includes(slug) || !slug;
      const href = external ? liveUrl : `/projects/${slug}`;
      return {
        key: project.id || slug,
        label: (project.title || project.name || '').split(/\s[-–—:|]\s/)[0],
        tech,
        href,
        external,
      };
    })
    .filter((project) => project.href && project.label);

  const assigned = new Set();
  const groups = SKILL_GROUPS.map((group) => {
    const skills = initialSkills.filter((skill) => {
      const id = skill.id || skill.name;
      if (assigned.has(id)) return false;
      if (!group.match((skill.category || '').toLowerCase())) return false;
      assigned.add(id);
      return true;
    });
    return { ...group, skills };
  }).filter((group) => group.skills.length > 0);

  const totalSkills = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Skills', path: '/skills' }]} />
          {jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}

          <FadeUp>
            <section id="skills" className={`pt-36 sm:pt-40 subpage-container pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-6xl mx-auto w-full">

                <header className="mb-12 sm:mb-16">
                  <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-tight mb-4 flex items-center gap-3">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> Skills
                  </h1>

                  <p className="max-w-2xl text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed">
                    A multidisciplinary toolkit spanning software development, digital media, and computer engineering.
                  </p>

                  <p className="skill-sheet-summary">
                    <span>{String(groups.length).padStart(2, '0')} groups</span>
                    <span aria-hidden="true">/</span>
                    <span>{String(totalSkills).padStart(2, '0')} skills</span>
                  </p>
                </header>

                <div className="skill-sheet">
                  {groups.map((group) => (
                    <section key={group.id} id={group.id} className="skill-sheet-group" aria-labelledby={`${group.id}-heading`}>
                      <div className="skill-sheet-aside">
                        <p className="skill-sheet-path">{group.path}</p>
                        <h2 id={`${group.id}-heading`} className="skill-sheet-title">{group.title}</h2>
                        <p className="skill-sheet-note">{group.note}</p>
                        <Link href={group.link.href} className="skill-sheet-link">
                          <span>{group.link.label}</span>
                          <ArrowIcon />
                        </Link>
                      </div>

                      <div className="skill-sheet-table" role="table" aria-label={`${group.title} skills`}>
                        <div className="skill-sheet-head" role="row">
                          <span role="columnheader" aria-label="Line">#</span>
                          <span role="columnheader">skill</span>
                          <span role="columnheader">focus</span>
                          <span role="columnheader">used in</span>
                        </div>
                        {group.skills.map((skill, index) => {
                          const usedIn = projectsUsingSkill(skill.name, projects);
                          return (
                            <div key={skill.id || skill.name} className="skill-sheet-row" role="row">
                              <span className="skill-sheet-line" role="cell" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                              <span className="skill-sheet-name" role="cell">{skill.name}</span>
                              <span className="skill-sheet-focus" role="cell">
                                <span className="skill-sheet-comment" aria-hidden="true">{'//'}</span>
                                {skill.description || SKILL_DESCRIPTIONS[skill.name] || 'Core competency'}
                              </span>
                              <span className="skill-sheet-used" role="cell">
                                {usedIn.length > 0 ? usedIn.map((project) => (
                                  project.external ? (
                                    <a key={project.key} href={project.href} target="_blank" rel="noopener noreferrer">{project.label}</a>
                                  ) : (
                                    <Link key={project.key} href={project.href}>{project.label}</Link>
                                  )
                                )) : (
                                  <span className="skill-sheet-none" aria-label="No linked project">--</span>
                                )}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  ))}
                </div>

                <PagePagination
                  prev={{ label: 'About Dipesh', path: '/about' }}
                  next={{ label: 'Featured Projects', path: '/projects' }}
                />
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
