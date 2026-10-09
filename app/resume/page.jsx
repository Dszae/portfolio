"use client";

import React from 'react';
import Image from 'next/image';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

const EXPERIENCE = [
  { 
    year: "2026 - Present", 
    role: "Video Editor & Graphics Designer", 
    company: "Clamphook Academy", 
    desc: "Producing and editing promotional videos and designing graphic materials for secondary-level and entrance examination crash courses.",
    logo: "/clamphook_.webp" 
  },
  { 
    year: "2026 - Present", 
    role: "Video Editor", 
    company: "College Programs", 
    desc: "Managing post-production and digital layout execution for university events and academic programs.",
    logo: "/campus.webp" 
  },
  { 
    year: "2023 - Present", 
    role: "Freelance Creative Editor", 
    company: "Independent Practice", 
    desc: "Delivering custom digital content, motion graphics layouts, and promotional assets for various clients.",
    logo: "/freelance.webp" 
  }
];

const EDUCATION = [
  { 
    year: "2025 - Present", 
    degree: "Bachelor in Computer Engineering", 
    school: "Institute of Engineering (IOE), Thapathali Campus", 
    desc: "Currently pursuing Bachelor's in Computer Engineering.",
    logo: "/thapathali.webp" 
  },
  { 
    year: "2022 - 2024", 
    degree: "School Leaving Certificate (SLC / +2)", 
    school: "Shree Janak Model Secondary School", 
    desc: "GPA: 3.88 / 4.00",
    logo: "/janak.webp" 
  },
  { 
    year: "2022", 
    degree: "Secondary Education Examination (SEE)", 
    school: "Shree Mahendra Adarsha Secondary School", 
    desc: "GPA: 3.88 / 4.00",
    logo: "/mahendra.webp" 
  }
];

export default function ResumePage() {
  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Resume', path: '/resume' }]} />

          <FadeUp>
            <section id="resume" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-16">
                  <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-4 text-[#0F172A] dark:text-[#F9FAFB]">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> Resume & Career Journey
                  </h1>
                  <a
                    href="/my_cv.pdf"
                    download="Dipesh_Sapkota_CV.pdf"
                    aria-label="Download CV (PDF document, 105 KB)"
                    className="self-start sm:self-auto px-6 py-3 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] font-semibold rounded-xl transition-all hover:-translate-y-1 flex items-center gap-2 shadow-sm font-sans cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>Download CV <span className="text-xs font-mono font-normal opacity-85">(PDF)</span></span>
                  </a>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">

                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-10 flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      Experience
                    </h2>
                    <div className="space-y-8 relative border-l-2 border-[#CBD5E1] dark:border-[#34D399]/20 pl-6 ml-3">
                      {EXPERIENCE.map((exp, index) => (
                        <div 
                          key={index} 
                          className="relative pb-4 transition-transform duration-300 hover:translate-x-2 group cursor-default"
                        >
                          <div className="absolute -left-[33px] top-4 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#0B0F0E]"></div>
                          
                          <div className={`p-6 rounded-2xl transition-all duration-300 group-hover:shadow-md ${theme.card}`}>
                            <div className="flex items-center gap-4">
                              {exp.logo && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                    <Image
                                    src={exp.logo} 
                                    alt={`${exp.company} logo`} 
                                    width="48"
                                    height="48"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 bg-[#F1F5F9] dark:bg-[#16221D] text-[#0F172A] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#26352F]">
                                  {exp.year}
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold mb-1 text-[#0F172A] dark:text-[#F8FAFC]">{exp.role}</h3>
                                <p className="text-xs sm:text-sm mb-2 font-light tracking-wide text-[#065F46] dark:text-[#6EE7B7]">{exp.company}</p>
                                <p className="text-sm leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">{exp.desc}</p>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-6 w-0 h-1 bg-[#065F46] dark:bg-[#34D399] transition-all duration-300 group-hover:w-[calc(100%-3rem)] rounded-b-2xl"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-10 flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                      Education
                    </h2>
                    <div className="space-y-8 relative border-l-2 border-[#CBD5E1] dark:border-[#34D399]/20 pl-6 ml-3">
                      {EDUCATION.map((edu, index) => (
                        <div 
                          key={index} 
                          className="relative pb-4 transition-transform duration-300 hover:translate-x-2 group cursor-default"
                        >
                          <div className="absolute -left-[33px] top-4 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#0B0F0E]"></div>
                          
                          <div className={`p-6 rounded-2xl transition-all duration-300 group-hover:shadow-md ${theme.card}`}>
                            <div className="flex items-center gap-4">
                              {edu.logo && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={edu.logo} 
                                    alt={`${edu.school} logo`} 
                                    width="48"
                                    height="48"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 bg-[#F1F5F9] dark:bg-[#16221D] text-[#0F172A] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#26352F]">
                                  {edu.year}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold leading-tight mb-1 text-[#0F172A] dark:text-[#F8FAFC]">{edu.degree}</h3>
                                <p className="text-xs sm:text-sm mb-2 font-light tracking-wide text-[#065F46] dark:text-[#6EE7B7]">{edu.school}</p>
                                <p className="text-sm leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">{edu.desc}</p>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-6 w-0 h-1 bg-[#065F46] dark:bg-[#34D399] transition-all duration-300 group-hover:w-[calc(100%-3rem)] rounded-b-2xl"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
