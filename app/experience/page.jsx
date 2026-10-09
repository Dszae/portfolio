"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

const ROLES = [
  {
    role: "Video Editor & Graphics Designer",
    company: "Clamphook Academy",
    period: "2026 - Present",
    location: "Kathmandu, Nepal",
    logo: "/clamphook_.webp",
    desc: "Producing and editing promotional video campaigns and visual graphic materials for entrance examination crash courses and academic programs.",
  },
  {
    role: "Video Editor",
    company: "College Programs",
    period: "2026 - Present",
    location: "Kathmandu, Nepal",
    logo: "/campus.webp",
    desc: "Overseeing digital media post-production and layout execution for university events, exhibitions, and technical programs.",
  },
  {
    role: "Freelance Creative Editor",
    company: "Independent Practice",
    period: "2023 - Present",
    location: "Remote / Nepal",
    logo: "/freelance.webp",
    desc: "Delivering customized digital video edits, motion graphics, and graphic design assets for over 50 global clients.",
  },
];

const EDUCATION = [
  {
    degree: "Bachelor in Computer Engineering",
    school: "Institute of Engineering (IOE), Thapathali Campus",
    period: "2025 - Present",
    location: "Kathmandu, Nepal",
    logo: "/thapathali.webp",
    desc: "Undergraduate curriculum covering algorithms, data structures, digital electronics, microprocessors, and intelligent systems.",
  },
  {
    degree: "School Leaving Certificate (SLC / +2)",
    school: "Shree Janak Model Secondary School",
    period: "2022 - 2024",
    location: "Nepal",
    logo: "/janak.webp",
    desc: "Major in Science & Mathematics with GPA: 3.88 / 4.00.",
  },
  {
    degree: "Secondary Education Examination (SEE)",
    school: "Shree Mahendra Adarsha Secondary School",
    period: "2022",
    location: "Nepal",
    logo: "/mahendra.webp",
    desc: "Completed secondary education with GPA: 3.88 / 4.00.",
  },
];

export default function ExperiencePage() {
  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Experience', path: '/experience' }]} />

          <FadeUp>
            <section id="experience" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-16 pb-8 border-b border-[#CBD5E1] dark:border-[#26352F]">
                  <div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#065F46] dark:text-[#34D399] mb-2 block">
                      Career & Education
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-4 text-[#0F172A] dark:text-[#F9FAFB]">
                      <span className="text-[#065F46] dark:text-[#34D399]">/</span> Experience & Education
                    </h1>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href="/resume"
                      className="px-5 py-2.5 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#0B0F0E] text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <span>Full Resume</span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                    <a
                      href="/my_cv.pdf"
                      download="Dipesh_Sapkota_CV.pdf"
                      className="px-5 py-2.5 border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] text-[#0F172A] dark:text-[#F9FAFB] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download CV</span>
                    </a>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-16">
                  
                  {/* Column 1: Professional Experience */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-10 flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Professional Experience
                    </h2>

                    <div className="space-y-8 relative border-l-2 border-[#CBD5E1] dark:border-[#34D399]/20 pl-6 ml-3">
                      {ROLES.map((role, idx) => (
                        <div key={idx} className="relative pb-4 group">
                          <div className="absolute -left-[33px] top-4 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#0B0F0E]" />
                          <div className={`p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] transition-all duration-300 hover:shadow-md ${theme.card}`}>
                            <div className="flex items-center gap-4">
                              {role.logo && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={role.logo}
                                    alt={role.company}
                                    width="48"
                                    height="48"
                                    loading="lazy"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 bg-[#F1F5F9] dark:bg-[#16221D] text-[#0F172A] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#26352F]">
                                  {role.period}
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold mb-1 text-[#0F172A] dark:text-[#F8FAFC]">
                                  {role.role}
                                </h3>
                                <p className="text-xs sm:text-sm mb-2 font-medium tracking-wide text-[#065F46] dark:text-[#6EE7B7]">
                                  {role.company} &bull; {role.location}
                                </p>
                                <p className="text-sm leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">
                                  {role.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Academic Background */}
                  <div>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-10 flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                      </svg>
                      Education & Academics
                    </h2>

                    <div className="space-y-8 relative border-l-2 border-[#CBD5E1] dark:border-[#34D399]/20 pl-6 ml-3">
                      {EDUCATION.map((edu, idx) => (
                        <div key={idx} className="relative pb-4 group">
                          <div className="absolute -left-[33px] top-4 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#0B0F0E]" />
                          <div className={`p-6 rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] transition-all duration-300 hover:shadow-md ${theme.card}`}>
                            <div className="flex items-center gap-4">
                              {edu.logo && (
                                <div className="flex-shrink-0 flex items-center justify-center">
                                  <Image
                                    src={edu.logo}
                                    alt={edu.school}
                                    width="48"
                                    height="48"
                                    loading="lazy"
                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-semibold rounded-md mb-2 bg-[#F1F5F9] dark:bg-[#16221D] text-[#0F172A] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#26352F]">
                                  {edu.period}
                                </span>
                                <h3 className="text-base sm:text-lg font-bold leading-tight mb-1 text-[#0F172A] dark:text-[#F8FAFC]">
                                  {edu.degree}
                                </h3>
                                <p className="text-xs sm:text-sm mb-2 font-medium tracking-wide text-[#065F46] dark:text-[#6EE7B7]">
                                  {edu.school}
                                </p>
                                <p className="text-sm leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">
                                  {edu.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Internal Cross Links */}
                <div className="mt-16 pt-8 border-t border-[#CBD5E1] dark:border-[#26352F] flex flex-wrap gap-4 items-center justify-between">
                  <div className="text-sm text-[#475569] dark:text-[#94A3B8]">
                    Explore associated engineering work & credentials:
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/projects" className="text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                      &larr; View Projects
                    </Link>
                    <Link href="/certificates" className="text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                      Verified Certificates &rarr;
                    </Link>
                    <Link href="/contact" className="text-sm font-semibold text-[#065F46] dark:text-[#34D399] hover:underline">
                      Get In Touch &rarr;
                    </Link>
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
