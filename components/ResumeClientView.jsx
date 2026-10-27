"use client";

import React from 'react';
import Image from 'next/image';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

export default function ResumeClientView({ experiences = [], siteSettings = {}, jsonLd }) {
  const experienceList = experiences.filter(e => e.type === 'experience');
  const educationList = experiences.filter(e => e.type === 'education');
  const resumeUrl = siteSettings?.profile?.resume_url || '/my_cv.pdf';

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Resume', path: '/resume' }]} />
          {jsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
          )}

          <FadeUp>
            <section id="resume" className={`pt-36 sm:pt-40 subpage-container pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-4 text-[#0F172A] dark:text-[#F9FAFB]">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> Resume
                  </h1>
                  <a
                    href={resumeUrl}
                    download="Dipesh_Sapkota_CV.pdf"
                    aria-label="Download CV (PDF document, 105 KB)"
                    className="self-start sm:self-auto px-6 py-3 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#090B0E] font-semibold rounded-xl transition-all hover:-translate-y-1 flex items-center gap-2 shadow-sm font-sans cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    <span>Download CV <span className="text-xs font-mono font-normal opacity-85">(PDF)</span></span>
                  </a>
                </div>

                <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] mb-14 max-w-3xl leading-relaxed">
                  Academic trajectory, technical experience, and creative production history of Dipesh Sapkota. Currently studying Computer Engineering at IOE Thapathali Campus in Kathmandu while developing software tools and leading creative media projects.
                </p>

                <div className="grid lg:grid-cols-2 gap-16">

<div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-10 flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      Experience
                    </h2>
                    <div className="space-y-8 relative border-l-2 border-[#CBD5E1] dark:border-[#34D399]/20 pl-6 ml-3">
                      {experienceList.map((exp, index) => (
                        <div 
                          key={exp.id || index} 
                          className="relative pb-2 group cursor-default"
                        >
                          <div className="absolute -left-[31px] top-5 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#090B0E] timeline-dot-pulse"></div>
                          
                          <div className={`relative overflow-hidden p-6 rounded-2xl timeline-card-shift border group-hover:shadow-xl group-hover:border-[#065F46]/50 dark:group-hover:border-[#34D399]/50 ${theme.card}`}>
                            <div className="flex items-center gap-4">
                              {(exp.logo || exp.img || exp.image) && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={exp.logo || exp.img || exp.image} 
                                    alt={`${exp.organization || exp.company} logo`} 
                                    width="48"
                                    height="48"
                                    loading="lazy"
                                    decoding="async"
                                    unoptimized={true}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-slate-200 dark:border-slate-800" 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#222933]">
                                  {exp.start_date ? `${exp.start_date} – ${exp.end_date || 'Present'}` : (exp.year || 'Present')}
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold mb-1 text-[#0F172A] dark:text-[#F9FAFB]">{exp.title || exp.role}</h3>
                                <p className="text-xs sm:text-sm mb-2 font-medium text-[#065F46] dark:text-[#6EE7B7]">{exp.organization || exp.company}</p>
                                <p className="text-sm leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">{exp.description || exp.desc}</p>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#065F46] to-[#059669] dark:from-[#34D399] dark:to-[#6EE7B7] timeline-line-fill rounded-b-2xl pointer-events-none"></div>
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
                      {educationList.map((edu, index) => (
                        <div 
                          key={edu.id || index} 
                          className="relative pb-2 group cursor-default"
                        >
                          <div className="absolute -left-[31px] top-5 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#090B0E] timeline-dot-pulse"></div>
                          
                          <div className={`relative overflow-hidden p-6 rounded-2xl timeline-card-shift border group-hover:shadow-xl group-hover:border-[#065F46]/50 dark:group-hover:border-[#34D399]/50 ${theme.card}`}>
                            <div className="flex items-center gap-4">
                              {(edu.logo || edu.img || edu.image) && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={edu.logo || edu.img || edu.image} 
                                    alt={`${edu.organization || edu.school} logo`} 
                                    width="48"
                                    height="48"
                                    loading="lazy"
                                    decoding="async"
                                    unoptimized={true}
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-slate-200 dark:border-slate-800" 
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#222933]">
                                  {edu.start_date ? `${edu.start_date} – ${edu.end_date || 'Present'}` : (edu.year || 'Present')}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold leading-tight mb-1 text-[#0F172A] dark:text-[#F8FAFC]">{edu.title || edu.degree}</h3>
                                <p className="text-xs sm:text-sm mb-2 font-medium text-[#065F46] dark:text-[#6EE7B7]">{edu.organization || edu.school}</p>
                                <p className="text-sm leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">{edu.description || edu.desc}</p>
                              </div>
                            </div>
                            <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#065F46] to-[#059669] dark:from-[#34D399] dark:to-[#6EE7B7] timeline-line-fill rounded-b-2xl pointer-events-none"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                <PagePagination 
                  prev={{ label: 'Certificates & Credentials', path: '/certificates' }} 
                  next={{ label: 'Gallery & Visual Archive', path: '/gallery' }} 
                />
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}

