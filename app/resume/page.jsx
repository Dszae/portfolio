"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';
import PagePagination from '../../components/PagePagination';

const PROFILE = {
  name: "Dipesh Sapkota",
  headline: "Programmer, Video Editor and Graphic Designer",
  bio: "Creative and results-driven Multi-disciplinary Artist with 4+ years of experience delivering high-impact digital content. Specializing in the intersection of technical precision and visual storytelling, I have successfully collaborated with 20+ international clients and leading brands to produce performance-driven visuals.",
  phone: "9764685307",
  email: "dsz.ae18@gmail.com",
  location: "Kathmandu, Nepal",
};

const EXPERIENCE = [
  {
    period: "2025 - Present",
    role: "Graphic designer & Video editor",
    organization: "An institute",
    logo: "/campus.webp",
    bullets: [
      "Create high-impact videos, motion graphics, and design assets for digital platforms",
      "Collaborate with creative teams to deliver premium-quality content",
    ],
  },
  {
    period: "2023 - Present",
    role: "Freelance Video Editor & Motion Designer",
    organization: "Remote work",
    logo: "/freelance.webp",
    bullets: [
      "Worked with 50+ international clients across various industries",
      "Delivered social media videos, ads, motion graphics, and branded visuals",
    ],
  },
  {
    period: "2023 - Present",
    role: "Content creator",
    organization: "Social media",
    logo: "/motion-design.webp",
    bullets: [
      "Conceptualized, produced, and edited impactful videos focused on raising awareness, exposing frauds, and spreading verified truths across social media platforms.",
      "Created content that engaged audiences globally, with several videos achieving millions of views.",
    ],
  },
];

const EDUCATION = [
  {
    period: "2025",
    degree: "10+2",
    institution: "Janak Model Secondary School",
    score: "GPA: 3.88 / 4.0",
    logo: "/janak.webp",
  },
  {
    period: "2021",
    degree: "SEE",
    institution: "Shree Mahendra Adarsha Model Secondary School",
    score: "GPA: 3.88 / 4.0",
    logo: "/mahendra.webp",
  },
];

const SKILLS = [
  "Video Editing",
  "Motion Graphics",
  "Visual Effects (VFX)",
  "Graphic Design",
  "2D & 3D Animation",
  "Compositing & Rotoscoping",
  "Color Grading",
  "Brand Identity & Typography",
];

const SOFTWARE_MASTERY = [
  { name: "Adobe After Effects", logo: "/after-effects.webp", category: "Motion & VFX" },
  { name: "Adobe Premiere Pro", logo: "/premiere-pro.webp", category: "NLE Video Editing" },
  { name: "Adobe Photoshop", logo: "/graphic-design.webp", category: "Digital Imaging" },
  { name: "Adobe Illustrator", logo: "/design-principles.webp", category: "Vector Graphics" },
];

const LANGUAGES = [
  { language: "English", fluency: "Fluent" },
  { language: "Nepali", fluency: "Fluent" },
  { language: "Hindi", fluency: "Fluent" },
];

export default function ResumePage() {
  const [showPdfEmbed, setShowPdfEmbed] = useState(false);

  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd
            items={[
              { name: 'Home', path: '/' },
              { name: 'Resume', path: '/resume' },
            ]}
          />

          <FadeUp>
            <section
              id="resume"
              className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}
            >
              <div className="max-w-6xl mx-auto w-full">
                {/* Header with Title and Download Actions */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
                  <div>
                    <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB] leading-tight">
                      <span className="text-[#065F46] dark:text-[#34D399]">/</span> Resume
                    </h1>
                    <p className="mt-2 text-sm sm:text-base font-mono uppercase tracking-wider text-[#065F46] dark:text-[#6EE7B7]">
                      {PROFILE.headline}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href="/my_cv.pdf"
                      download="Dipesh_Sapkota_CV.pdf"
                      aria-label="Download Dipesh Sapkota CV (PDF document, 75 KB)"
                      className="px-5 py-2.5 bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#090B0E] font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download PDF</span>
                    </a>

                    <a
                      href="/my_cv.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#F8FAFC] border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 font-semibold text-sm rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span>Open PDF in Tab</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setShowPdfEmbed((prev) => !prev)}
                      className="px-4 py-2.5 text-xs font-mono font-medium rounded-xl border border-[#CBD5E1] dark:border-[#222933] text-[#475569] dark:text-[#A7B0BE] hover:text-[#0F172A] dark:hover:text-white transition-colors"
                      aria-expanded={showPdfEmbed}
                    >
                      {showPdfEmbed ? 'Hide Document Preview' : 'Preview Document'}
                    </button>
                  </div>
                </header>

                {/* Optional Interactive Document Viewer */}
                {showPdfEmbed && (
                  <div className="mb-12 p-4 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-[#F8FAFC] dark:bg-[#0F1216]">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E2E8F0] dark:border-[#222933] text-xs font-mono text-[#64748B]">
                      <span>DOCUMENT PREVIEW: Dipesh_Sapkota_CV.pdf</span>
                      <a href="/my_cv.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline text-[#065F46] dark:text-[#34D399]">
                        Full Screen ↗
                      </a>
                    </div>
                    <iframe
                      src="/my_cv.pdf#toolbar=0"
                      title="Dipesh Sapkota Curriculum Vitae"
                      className="w-full h-[640px] rounded-xl border border-[#CBD5E1] dark:border-[#222933] bg-white"
                    />
                  </div>
                )}

                {/* Profile Overview Card */}
                <div className={`p-6 sm:p-8 rounded-2xl border mb-12 shadow-sm ${theme.card}`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#CBD5E1] dark:border-[#222933]">
                    <div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#065F46] dark:text-[#6EE7B7]">
                        Executive Summary
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1">
                        Profile
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium">
                      <a
                        href={`tel:${PROFILE.phone}`}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#F8FAFC] border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{PROFILE.phone}</span>
                      </a>

                      <a
                        href={`mailto:${PROFILE.email}`}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#F8FAFC] border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 transition-colors"
                      >
                        <svg className="w-4 h-4 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{PROFILE.email}</span>
                      </a>

                      <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F1F5F9] dark:bg-[#181D24] text-[#475569] dark:text-[#A7B0BE] border border-[#CBD5E1] dark:border-[#222933]">
                        <svg className="w-4 h-4 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{PROFILE.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">
                    {PROFILE.bio}
                  </p>
                </div>

                {/* Main 2-Column Grid: Timeline on Left, Skills/Tools on Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column: Work Experience & Education (7 cols) */}
                  <div className="lg:col-span-7 space-y-12">
                    {/* Work Experience */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB]">
                        <svg className="w-5 h-5 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Work Experience
                      </h2>

                      <div className="space-y-6 relative border-l-2 border-[#CBD5E1] dark:border-[#34D399]/20 pl-6 ml-3">
                        {EXPERIENCE.map((exp, index) => (
                          <div key={index} className="relative pb-2 group cursor-default">
                            <div className="absolute -left-[31px] top-5 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#090B0E]" />

                            <div className={`p-6 rounded-2xl transition-all duration-200 border group-hover:shadow-md ${theme.card}`}>
                              <div className="flex items-start gap-4">
                                {exp.logo && (
                                  <div className="flex-shrink-0 mt-1">
                                    <Image
                                      src={exp.logo}
                                      alt={`${exp.organization} icon`}
                                      width={40}
                                      height={40}
                                      className="w-10 h-10 rounded-xl object-cover border border-[#CBD5E1] dark:border-[#222933]"
                                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                  </div>
                                )}

                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#F1F5F9] dark:bg-[#181D24] text-[#065F46] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#222933]">
                                      {exp.period}
                                    </span>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#A7B0BE]">
                                      {exp.organization}
                                    </span>
                                  </div>

                                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC] mb-3">
                                    {exp.role}
                                  </h3>

                                  <ul className="space-y-2 text-sm leading-relaxed text-[#1E293B] dark:text-[#A7B0BE]">
                                    {exp.bullets.map((bullet, bIndex) => (
                                      <li key={bIndex} className="flex items-start gap-2.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#065F46] dark:bg-[#34D399] mt-2 flex-shrink-0" />
                                        <span>{bullet}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-8 flex items-center gap-3 text-[#0F172A] dark:text-[#F9FAFB]">
                        <svg className="w-5 h-5 text-[#065F46] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        Education
                      </h2>

                      <div className="space-y-6 relative border-l-2 border-[#CBD5E1] dark:border-[#34D399]/20 pl-6 ml-3">
                        {EDUCATION.map((edu, index) => (
                          <div key={index} className="relative pb-2 group cursor-default">
                            <div className="absolute -left-[31px] top-5 w-3.5 h-3.5 bg-[#065F46] dark:bg-[#34D399] rounded-full border-4 border-white dark:border-[#090B0E]" />

                            <div className={`p-6 rounded-2xl transition-all duration-200 border group-hover:shadow-md ${theme.card}`}>
                              <div className="flex items-start gap-4">
                                {edu.logo && (
                                  <div className="flex-shrink-0 mt-1">
                                    <Image
                                      src={edu.logo}
                                      alt={`${edu.institution} logo`}
                                      width={40}
                                      height={40}
                                      className="w-10 h-10 rounded-xl object-cover border border-[#CBD5E1] dark:border-[#222933]"
                                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                    />
                                  </div>
                                )}

                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#F1F5F9] dark:bg-[#181D24] text-[#065F46] dark:text-[#34D399] border border-[#CBD5E1] dark:border-[#222933]">
                                      {edu.period}
                                    </span>
                                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-[#ECFDF5] dark:bg-[#064E3B]/40 text-[#065F46] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#065F46]">
                                      {edu.score}
                                    </span>
                                  </div>

                                  <h3 className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                                    {edu.degree}
                                  </h3>
                                  <p className="text-xs sm:text-sm mt-1 font-medium text-[#475569] dark:text-[#A7B0BE]">
                                    {edu.institution}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Skills, Software Mastery, Languages (5 cols) */}
                  <div className="lg:col-span-5 space-y-8">
                    {/* Skills */}
                    <div className={`p-6 sm:p-7 rounded-2xl border shadow-sm ${theme.card}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#34D399]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          Skills
                        </h2>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {SKILLS.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#F1F5F9] dark:bg-[#181D24] text-[#0F172A] dark:text-[#F8FAFC] border border-[#CBD5E1] dark:border-[#222933] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Software Mastery */}
                    <div className={`p-6 sm:p-7 rounded-2xl border shadow-sm ${theme.card}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#34D399]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          Software Mastery
                        </h2>
                      </div>

                      <div className="space-y-3">
                        {SOFTWARE_MASTERY.map((soft, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3.5 p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#12161B] border border-[#E2E8F0] dark:border-[#222933]"
                          >
                            <Image
                              src={soft.logo}
                              alt={soft.name}
                              width={32}
                              height={32}
                              className="w-8 h-8 rounded-lg object-cover flex-shrink-0 border border-[#CBD5E1] dark:border-[#222933]"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] truncate">
                                {soft.name}
                              </h3>
                              <p className="text-xs font-mono text-[#64748B] dark:text-[#A7B0BE]">
                                {soft.category}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className={`p-6 sm:p-7 rounded-2xl border shadow-sm ${theme.card}`}>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-lg bg-[#F1F5F9] dark:bg-[#181D24] border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#065F46] dark:text-[#34D399]">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                          </svg>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                          Languages
                        </h2>
                      </div>

                      <div className="space-y-2.5">
                        {LANGUAGES.map((lang, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] dark:bg-[#12161B] border border-[#E2E8F0] dark:border-[#222933]"
                          >
                            <span className="text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC]">
                              {lang.language}
                            </span>
                            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#ECFDF5] dark:bg-[#064E3B]/40 text-[#065F46] dark:text-[#34D399] border border-[#A7F3D0] dark:border-[#065F46]">
                              {lang.fluency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pagination */}
                <div className="mt-16">
                  <PagePagination
                    prev={{ label: 'Certificates & Credentials', path: '/certificates' }}
                    next={{ label: 'Gallery & Visual Archive', path: '/gallery' }}
                  />
                </div>
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
