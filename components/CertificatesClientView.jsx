"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

export default function CertificatesClientView({ certificates, jsonLd }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SiteLayout selectedImage={selectedImage} setSelectedImage={setSelectedImage}>
      {({ theme, isDark }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Certificates', path: '/certificates' }]} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <FadeUp>
            <section id="certificates" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className="mb-10 max-w-3xl">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-4 text-[#0F172A] dark:text-[#F9FAFB]">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> Certificates
                  </h1>
                  <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed">
                    Verified technical certifications, masterclasses, and specialized credentials completed by Dipesh Sapkota across graphic design, motion graphics, DaVinci Resolve color science, and modern full-stack web engineering.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {certificates.map((cert, idx) => (
                    <button 
                      type="button"
                      aria-label={`Open certificate: ${cert.title}`}
                      key={cert.id} 
                      className={`group p-5 sm:p-6 rounded-2xl border backdrop-blur-md smooth-card-hover hover:shadow-lg cursor-pointer text-left ${theme.card}`}
                      onClick={() => setSelectedImage({
                        src: cert.img,
                        title: cert.title,
                        desc: `Issued by ${cert.org}`,
                        items: certificates.map((c) => ({ src: c.img, title: c.title, desc: `Issued by ${c.org}` })),
                        index: idx,
                      })}
                    >
                      <div className={`aspect-[4/3] overflow-hidden rounded-xl border flex items-center justify-center mb-6 transition-colors duration-200 relative ${isDark ? 'border-[#222933] bg-[#181D24] group-hover:border-[#34D399]/60' : 'border-[#CBD5E1] bg-[#F1F5F9] group-hover:border-[#065F46]/60'}`}>
                        <Image 
                          src={cert.img} 
                          alt={`Certificate for ${cert.title} issued by ${cert.org}`} 
                          width="400"
                          height="300"
                          loading="lazy"
                          decoding="async"
                          unoptimized={Boolean(cert.img?.startsWith('http'))}
                          className="w-full h-full object-cover smooth-img-zoom" 
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#090B0E] flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                          </div>
                        </div>
                      </div>
                      <h2 className="font-semibold text-sm sm:text-base mb-2 text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors">{cert.title}</h2>
                      <p className="font-mono text-xs text-[#334155] dark:text-[#A7B0BE] font-bold">{cert.org}</p>
                    </button>
                  ))}
                </div>

                <PagePagination 
                  prev={{ label: 'Engineering Articles', path: '/blog' }} 
                  next={{ label: 'Resume & Journey', path: '/resume' }} 
                />
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}

