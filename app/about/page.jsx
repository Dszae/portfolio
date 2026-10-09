"use client";

import React from 'react';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';
import { person, portraitImage, siteUrl } from '../../components/JsonLdSchema';

const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${siteUrl}/about#profile-page`,
  url: `${siteUrl}/about`,
  name: 'About Dipesh Sapkota',
  description: 'Official biography and background of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.',
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

export default function AboutPage() {
  return (
    <SiteLayout>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
          />

          <FadeUp>
            <section id="about" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center gap-4">
                  <span className="text-[#047857] dark:text-[#34D399]">/</span> About Me
                </h1>
                <div className="grid md:grid-cols-12 gap-8 items-center">
                  
                  <div className={`md:col-span-7 p-6 sm:p-8 md:p-12 rounded-[2rem] border backdrop-blur-md ${theme.card}`}>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 leading-tight">Bridging Logic and Visual Execution</h2>
                    <p className={`text-base sm:text-lg leading-relaxed mb-6 ${theme.muted}`}>
                      Hello! I am <strong>Dipesh Sapkota</strong>, a dedicated Computer Engineering student at <span className="font-semibold text-[#047857] dark:text-[#34D399]">IOE Thapathali Campus</span> in Kathmandu, Nepal. As an AI and ML enthusiast, I am deeply invested in exploring intelligent systems, analyzing algorithms, and architecting embedded hardware solutions. My technical foundation is built on rigorous academic training and a continuous drive to solve complex computational challenges.
                    </p>
                    <p className={`text-base sm:text-lg leading-relaxed ${theme.muted}`}>
                      Complementing my engineering background, I possess over 4 years of professional experience as a freelance Video Editor and Motion Graphics Designer. This unique convergence of analytical problem-solving and high-end creative design empowers me to bridge the gap between logical architecture and visually engaging digital execution.
                    </p>
                  </div>
                  
                  <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
                    
                    <div className={`p-5 sm:p-6 md:p-8 rounded-2xl border backdrop-blur-md flex items-center gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1 ${theme.card}`}>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#047857]/10 dark:bg-[#34D399]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#047857] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-1">4+</h3>
                        <p className={`font-mono text-xs sm:text-sm uppercase tracking-wider ${theme.muted}`}>Years Experience</p>
                      </div>
                    </div>
                    
                    <div className={`p-5 sm:p-6 md:p-8 rounded-2xl border backdrop-blur-md flex items-center gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1 ${theme.card}`}>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#047857]/10 dark:bg-[#34D399]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#047857] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-1">50+</h3>
                        <p className={`font-mono text-xs sm:text-sm uppercase tracking-wider ${theme.muted}`}>Global Clients</p>
                      </div>
                    </div>

                    <div className={`p-5 sm:p-6 md:p-8 rounded-2xl border backdrop-blur-md flex items-center gap-4 sm:gap-6 transition-all duration-300 hover:-translate-y-1 ${theme.card}`}>
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#047857]/10 dark:bg-[#34D399]/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#047857] dark:text-[#34D399]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-1">Creative</h3>
                        <p className={`font-mono text-xs sm:text-sm uppercase tracking-wider ${theme.muted}`}>Design Focus</p>
                      </div>
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
