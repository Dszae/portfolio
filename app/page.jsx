"use client";

import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '../components/SiteLayout';
import { HomePageJsonLd } from '../components/JsonLdSchema';

const CAPABILITIES = [
  {
    id: "engineering",
    title: "Engineering",
    subtitle: "C / C++ · Python · Problem Solving",
    href: "/skills",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    subtitle: "Learning · Building · Exploring",
    href: "/skills",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 3.5a3.5 3.5 0 0 0-3.5 3.5c0 .33.05.65.13.96A4 4 0 0 0 3 11.5c0 1.63 1 3.03 2.42 3.65A4.5 4.5 0 0 0 9.5 20.5c.34 0 .67-.04.99-.11A4 4 0 0 0 12 21.5m2.5-18a3.5 3.5 0 0 1 3.5 3.5c0 .33-.05.65-.13.96A4 4 0 0 1 21 11.5c0 1.63-1 3.03-2.42 3.65A4.5 4.5 0 0 1 14.5 20.5c-.34 0-.67-.04-.99-.11A4 4 0 0 1 12 21.5M12 3.5V21.5M8 8h.01M16 8h.01M7 13h.01M17 13h.01M8.5 17h.01M15.5 17h.01" />
      </svg>
    )
  },
  {
    id: "video-editing",
    title: "Video & Editing",
    subtitle: "Storytelling · Post Production",
    href: "/gallery",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    subtitle: "Visuals · Branding · Creativity",
    href: "/gallery",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM15.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM8.5 15.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM14 15.5c.83 0 1.5.67 1.5 1.5 0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5a4.5 4.5 0 0 0-4.5-4.5z" />
      </svg>
    )
  }
];

export default function Home() {
  return (
    <SiteLayout>
      {() => (
        <>
          <HomePageJsonLd />

          <section 
            id="home" 
            className="relative w-full min-h-[calc(100vh-72px)] flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-5 sm:px-8 lg:px-12 overflow-hidden"
          >
            {/* Ambient emerald glowing mesh curves behind hero */}
            <div 
              aria-hidden="true" 
              className="absolute top-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#10B981]/15 dark:bg-[#34D399]/15 blur-[120px] pointer-events-none -z-10" 
            />
            <div 
              aria-hidden="true" 
              className="absolute bottom-10 -left-20 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-[#047857]/15 dark:bg-[#059669]/15 blur-[100px] pointer-events-none -z-10" 
            />

            <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between">
              
              {/* Main Hero Split: Left Content & Right Portrait Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pt-4 sm:pt-8 my-auto">
                
                {/* Left Column (lg:col-span-7) */}
                <div className="lg:col-span-7 flex flex-col items-start z-10">
                  
                  {/* Eyebrow Pill */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] dark:bg-[#0E2018] border border-[#10B981]/30 dark:border-[#34D399]/30 text-[#047857] dark:text-[#6EE7B7] text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-5 sm:mb-6 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] dark:bg-[#6EE7B7] animate-pulse" />
                    <span>Computer Engineering &middot; Creative Media</span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[66px] font-extrabold tracking-tight leading-[1.08] text-[#111827] dark:text-[#F9FAFB] mb-5">
                    Engineering logic<br />
                    <span className="text-[#047857] dark:text-[#34D399]">Creating experiences.</span>
                  </h1>

                  {/* Subtitle */}
                  <p className="text-base sm:text-lg text-[#475569] dark:text-[#A7B0BE] max-w-xl leading-relaxed mb-8">
                    Computer engineering student exploring AI/ML, building software, and creating visual stories through video and design.
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4 mb-8 sm:mb-10">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] font-semibold text-sm sm:text-base hover:bg-[#065F46] dark:hover:bg-[#6EE7B7] transition-all transform-gpu hover:-translate-y-0.5 shadow-lg shadow-[#047857]/20 dark:shadow-[#34D399]/25 cursor-pointer"
                    >
                      <span aria-hidden="true">&rarr;</span>
                      <span>Explore My Work</span>
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3 sm:py-3.5 rounded-full border border-[#CBD5E1] dark:border-[#26372F] bg-transparent text-[#111827] dark:text-[#F9FAFB] font-medium text-sm sm:text-base hover:border-[#047857] dark:hover:border-[#34D399] hover:text-[#047857] dark:hover:text-[#34D399] transition-all transform-gpu hover:-translate-y-0.5 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Get In Touch</span>
                    </Link>
                  </div>

                  {/* Social Icons Row */}
                  <nav className="flex items-center gap-5 text-[#64748B] dark:text-[#94A3B8]" aria-label="Social profiles">
                    <a 
                      href="https://linkedin.com/in/dszae" 
                      target="_blank" 
                      rel="me noreferrer" 
                      aria-label="LinkedIn profile" 
                      className="hover:text-[#047857] dark:hover:text-[#34D399] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a 
                      href="https://github.com/dszae" 
                      target="_blank" 
                      rel="me noreferrer" 
                      aria-label="GitHub profile" 
                      className="hover:text-[#047857] dark:hover:text-[#34D399] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a 
                      href="https://instagram.com/dsz.ae" 
                      target="_blank" 
                      rel="me noreferrer" 
                      aria-label="Instagram profile" 
                      className="hover:text-[#047857] dark:hover:text-[#34D399] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a 
                      href="https://facebook.com/dsz.ae" 
                      target="_blank" 
                      rel="me noreferrer" 
                      aria-label="Facebook profile" 
                      className="hover:text-[#047857] dark:hover:text-[#34D399] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                      </svg>
                    </a>
                  </nav>

                </div>

                {/* Right Column: Layered Portrait + Signature & Keyword Label (lg:col-span-5) */}
                <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
                  <div className="relative flex items-center gap-5 sm:gap-7 md:gap-8">
                    
                    {/* Main Portrait Frame with Layered Offset Card */}
                    <div className="relative">
                      {/* Emerald offset background card */}
                      <div 
                        aria-hidden="true" 
                        className="absolute -right-3 -top-3 sm:-right-4 sm:-top-4 w-full h-full rounded-[28px] sm:rounded-[36px] bg-gradient-to-tr from-[#047857] to-[#10B981] dark:from-[#065F46] dark:to-[#34D399] opacity-80 sm:opacity-95 shadow-xl -z-10" 
                      />

                      {/* Photo Container */}
                      <figure className="relative w-[260px] sm:w-[320px] md:w-[350px] aspect-[4/5] rounded-[26px] sm:rounded-[34px] overflow-hidden border border-[#E2E8F0] dark:border-[#26372F] shadow-2xl bg-[#111B17] m-0">
                        <Image
                          src="/dipesh-sapkota.jpg"
                          id="primary-profile-image"
                          itemProp="image"
                          alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
                          fill
                          sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 350px"
                          priority
                          loading="eager"
                          className="object-cover object-center"
                        />
                      </figure>
                    </div>

                    {/* Creative Brand Accent to the right of portrait */}
                    <aside aria-label="Creative discipline tags" className="flex flex-col items-start select-none">
                      {/* Handwritten Signature: Dipesh */}
                      <svg 
                        viewBox="0 0 150 48" 
                        className="w-24 sm:w-28 h-auto text-[#047857] dark:text-[#34D399] transform -rotate-6"
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 36 C 14 22, 22 10, 28 8 C 34 6, 38 12, 34 22 C 30 32, 24 38, 18 36 C 15 34, 18 24, 22 16" />
                        <path d="M38 18 L 38 32" />
                        <circle cx="38" cy="12" r="1.5" fill="currentColor" />
                        <path d="M44 20 C 44 28, 46 42, 46 42 M 44 24 C 48 20, 56 20, 56 26 C 56 32, 48 34, 44 32" />
                        <path d="M60 28 C 60 22, 68 20, 68 24 C 68 30, 58 32, 64 36 C 68 38, 72 34, 74 32" />
                        <path d="M78 12 L 78 34 M 78 24 C 82 20, 90 20, 90 26 L 90 34" />
                        <path d="M22 38 C 50 36, 92 32, 126 22" strokeWidth="1.6" />
                      </svg>

                      {/* Small Divider Dash */}
                      <div className="w-6 h-[2px] bg-[#047857] dark:bg-[#34D399] my-2.5 rounded-full" aria-hidden="true" />

                      {/* Vertical Spaced Keywords */}
                      <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#047857] dark:text-[#34D399] leading-relaxed flex flex-col gap-1">
                        <span>IDEAS</span>
                        <span>CODE</span>
                        <span>EDIT</span>
                        <span>DESIGN</span>
                      </div>
                    </aside>

                  </div>
                </div>

              </div>

              {/* Bottom 4 Capability Bento Cards */}
              <div className="w-full pt-10 sm:pt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                  {CAPABILITIES.map((cap) => (
                    <Link
                      key={cap.id}
                      href={cap.href}
                      className="group p-5 sm:p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#26372F] bg-[#FFFFFF] dark:bg-[#111B17] smooth-card-hover hover:border-[#047857]/60 dark:hover:border-[#34D399]/60 flex flex-col justify-between shadow-sm cursor-pointer"
                    >
                      <div>
                        {/* Icon badge */}
                        <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] dark:bg-[#16251E] border border-[#10B981]/25 dark:border-[#34D399]/25 text-[#047857] dark:text-[#34D399] flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105">
                          {cap.icon}
                        </div>

                        <h2 className="text-lg font-bold text-[#111827] dark:text-[#F9FAFB] mb-1 group-hover:text-[#047857] dark:group-hover:text-[#34D399] transition-colors">
                          {cap.title}
                        </h2>

                        <p className="text-xs font-mono text-[#64748B] dark:text-[#A7B0BE] leading-relaxed mb-4">
                          {cap.subtitle}
                        </p>
                      </div>

                      <div className="text-xs font-mono font-semibold text-[#047857] dark:text-[#34D399] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Explore</span>
                        <span aria-hidden="true">&rarr;</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Bottom Right Scroll Indicator */}
                <div className="flex justify-end pt-4 sm:pt-6">
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#64748B] dark:text-[#A7B0BE] uppercase select-none opacity-80">
                    <svg className="w-3.5 h-5 text-current animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="5" y="2" width="14" height="20" rx="7" strokeWidth="1.8" />
                      <path d="M12 6v4" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>SCROLL DOWN</span>
                  </div>
                </div>

              </div>

            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}
