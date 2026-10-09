"use client";

import React, { useState, useEffect, useRef } from 'react';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

const SKILL_CATEGORIES = [
  {
    title: "Programming",
    icon: (
      <svg className="w-6 h-6 text-sky-700 dark:text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
    ),
    skills: [
      { name: "C / C++", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-sky-700 dark:bg-sky-500" },
      { name: "Python", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-sky-700 dark:bg-sky-500" },
      { name: "React.js", exp: "<1 Year", level: "Learning", percent: 40, color: "bg-sky-700 dark:bg-sky-500" },
      { name: "PHP", exp: "<1 Year", level: "Learning", percent: 40, color: "bg-sky-700 dark:bg-sky-500" }
    ]
  },
  {
    title: "Creative & Media",
    icon: (
      <svg className="w-6 h-6 text-purple-800 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>
    ),
    skills: [
      { name: "Video Editing", exp: "5+ Years", level: "High Proficiency", percent: 90, color: "bg-purple-800 dark:bg-purple-400" },
      { name: "Graphic Design", exp: "3+ Years", level: "Advanced", percent: 85, color: "bg-pink-800 dark:bg-pink-400" },
      { name: "Motion Graphics", exp: "2+ Years", level: "Intermediate", percent: 70, color: "bg-purple-700 dark:bg-purple-300" }
    ]
  },
  {
    title: "Engineering",
    icon: (
      <svg className="w-6 h-6 text-emerald-800 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    ),
    skills: [
      { name: "Proteus Suite", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-800 dark:bg-emerald-400" },
      { name: "Circuit Analysis", exp: "1+ Years", level: "Intermediate", percent: 70, color: "bg-emerald-700 dark:bg-emerald-300" },
      { name: "Breadboarding", exp: "1+ Years", level: "Intermediate", percent: 75, color: "bg-emerald-800 dark:bg-emerald-400" }
    ]
  }
];

export default function SkillsPage() {
  const [skillsInView, setSkillsInView] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    // Fallback: trigger after 200ms
    const timer = setTimeout(() => setSkillsInView(true), 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <SiteLayout>
      {({ theme, isDark }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Skills', path: '/skills' }]} />

          <FadeUp>
            <section id="skills" ref={skillsRef} className={`pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-[100rem] mx-auto w-full">
                <h1 className="text-3xl sm:text-4xl font-bold mb-10 flex items-center gap-4">
                  <span className="text-sky-500">/</span> Technical Proficiency
                </h1>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                  {SKILL_CATEGORIES.map((category, idx) => (
                    <div key={idx} className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 hover:-translate-y-2 w-full ${theme.card} flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center text-2xl">
                            {category.icon}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-semibold">{category.title}</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                          {category.skills.map((skill, sIdx) => (
                            <div key={sIdx} className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                              <div className="flex justify-between items-end mb-1.5">
                                <div>
                                  <h3 className="font-semibold text-xs sm:text-sm">{skill.name}</h3>
                                  <p className={`font-mono text-[11px] ${theme.muted}`}>{skill.exp} • {skill.level}</p>
                                </div>
                                <span className="font-mono text-[11px] font-semibold">{skill.percent}%</span>
                              </div>
                              <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                                <div
                                  className={`h-full rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                                  style={{ width: skillsInView ? `${skill.percent}%` : '0%' }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
