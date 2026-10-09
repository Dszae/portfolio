import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { person, portraitImage, siteUrl } from '@/components/JsonLdSchema';

export const metadata = {
  title: 'About Dipesh Sapkota | Official Biography',
  description: 'Meet Dipesh Sapkota (dszae), Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, and freelance video editor.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    title: 'About Dipesh Sapkota | Official Biography',
    description: 'Dipesh Sapkota (dszae) studies Computer Engineering at IOE Thapathali and builds software and digital media projects in Nepal.',
    url: '/about',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Portrait of Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dipesh Sapkota',
    description: 'Meet Dipesh Sapkota (dszae), Computer Engineering student at IOE Thapathali in Nepal.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl}/about#profile-page`,
  url: `${siteUrl}/about`,
  name: 'About Dipesh Sapkota | Official Profile',
  description: 'Official biography of Dipesh Sapkota, a Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, and creator of independent software projects.',
  dateCreated: '2025-01-01T00:00:00+05:45',
  dateModified: '2026-10-09T00:00:00+05:45',
  mainEntity: person,
  primaryImageOfPage: portraitImage,
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Dipesh Sapkota',
    url: `${siteUrl}/`,
  },
  inLanguage: 'en',
};

const STATS = [
  {
    value: "4+",
    label: "Years Experience",
    detail: "Freelance post-production & engineering coursework",
    icon: (
      <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Global Clients",
    detail: "Delivering customized video assets and branding",
    icon: (
      <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: "Creative",
    label: "Design Focus",
    detail: "Motion design, typography, and visual pacing",
    icon: (
      <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 py-32 space-y-16">
        <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />

        {/* Bio Header */}
        <section aria-labelledby="about-me-heading" className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-sky-600 bg-sky-500/10 border border-sky-500/30 rounded-full mb-4">
              Official Biography
            </span>
            <h1 id="about-me-heading" className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              About Dipesh Sapkota
            </h1>
            <h2 className="text-2xl font-semibold mb-6 text-sky-600 dark:text-sky-400">
              Bridging Logic and Visual Execution
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
              <p>
                Hello! I am <strong>Dipesh Sapkota</strong>, known online as <strong>dszae</strong>. I am a dedicated Computer Engineering student at <span className="font-semibold text-sky-600 dark:text-sky-400">IOE Thapathali Campus</span> in Kathmandu, Nepal. As an AI and ML enthusiast, I am deeply invested in exploring intelligent computational systems, analyzing algorithm complexities, and architecting embedded hardware solutions.
              </p>
              <p>
                Complementing my engineering background, I possess over 4 years of professional experience as a freelance Video Editor and Motion Graphics Designer. This unique convergence of analytical problem-solving and high-end creative design empowers me to bridge the gap between logical architecture and visually engaging digital execution.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/resume" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-xl transition-all shadow-sm">
                View Full Resume &rarr;
              </Link>
              <Link href="/projects" className="px-6 py-3 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                Browse Projects
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <figure className="relative">
              <div className="w-72 sm:w-80 h-72 sm:h-80 rounded-3xl overflow-hidden border-2 border-sky-500/40 shadow-2xl relative">
                <Image
                  src="/dipesh-sapkota.jpg"
                  alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
                  width={627}
                  height={627}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs font-mono text-slate-500 dark:text-slate-400">
                Dipesh Sapkota (dszae) &bull; IOE Thapathali Campus
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Stat Cards from homepage */}
        <section aria-label="Key Milestones" className="grid sm:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md flex flex-col justify-between hover:border-sky-500 dark:hover:border-sky-500 transition-all duration-300 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold tracking-tight block mb-1">{stat.value}</span>
                <h3 className="font-mono text-xs uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2 font-semibold">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Profiles and Community Links */}
        <section aria-labelledby="profiles-heading" className="p-8 sm:p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
          <h2 id="profiles-heading" className="text-2xl font-bold mb-4">Official Profiles & Writing</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            I actively contribute to the developer and design communities under the handle <strong>dszae</strong>:
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="https://github.com/dszae"
              target="_blank"
              rel="me noreferrer"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:border-sky-500 dark:hover:border-sky-500 transition-all font-semibold text-sm flex items-center justify-between"
            >
              <span>GitHub</span>
              <span className="text-sky-500">&rarr;</span>
            </a>
            <a
              href="https://linkedin.com/in/dszae"
              target="_blank"
              rel="me noreferrer"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:border-sky-500 dark:hover:border-sky-500 transition-all font-semibold text-sm flex items-center justify-between"
            >
              <span>LinkedIn</span>
              <span className="text-sky-500">&rarr;</span>
            </a>
            <a
              href="https://dev.to/dszae"
              target="_blank"
              rel="me noreferrer"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:border-sky-500 dark:hover:border-sky-500 transition-all font-semibold text-sm flex items-center justify-between"
            >
              <span>DEV Community</span>
              <span className="text-sky-500">&rarr;</span>
            </a>
            <Link
              href="/blog"
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 hover:border-sky-500 dark:hover:border-sky-500 transition-all font-semibold text-sm flex items-center justify-between"
            >
              <span>Engineering Articles</span>
              <span className="text-sky-500">&rarr;</span>
            </Link>
          </div>
        </section>

        <div className="flex flex-wrap gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
          <Link href="/skills" className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold rounded-xl transition-all shadow-sm">
            Explore Skills
          </Link>
          <Link href="/gallery" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Visual Archive
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Get in Touch
          </Link>
          <Link href="/" className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
}
