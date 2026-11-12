"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

export default function CertificatesClientView({ certificates, jsonLd }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Background warm-up of certificate images into browser memory cache
  useEffect(() => {
    if (typeof window !== 'undefined' && Array.isArray(certificates)) {
      certificates.forEach((cert) => {
        if (cert.img) {
          const img = new window.Image();
          img.src = cert.img;
        }
      });
    }
  }, [certificates]);

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
            <section id="certificates" className={`pt-36 sm:pt-40 subpage-container pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className="mb-10 max-w-[750px]">
                  <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold mb-4 flex items-center gap-3.5 text-[#0F172A] dark:text-[#F9FAFB] tracking-tight">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> Certificates
                  </h1>
                  <p className="text-[17px] sm:text-[18px] leading-[1.7] text-[#334155] dark:text-[#A7B0BE]">
                    Verified technical certifications, masterclasses, and specialized credentials completed by Dipesh Sapkota across graphic design, motion graphics, DaVinci Resolve color science, and web development technologies.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                  {certificates.map((cert, idx) => (
                    <button 
                      type="button"
                      aria-label={`Open certificate: ${cert.title}`}
                      key={cert.id} 
                      className="group p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#11151C]/70 backdrop-blur-md shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer text-left flex flex-col"
                      onClick={() => setSelectedImage({
                        src: cert.img,
                        title: cert.title,
                        org: cert.org,
                        desc: `Issued by ${cert.org}`,
                        subtitle: `${cert.org} • ${cert.skills || cert.category || 'Verified Credential'}`,
                        isCertificate: true,
                        items: certificates.map((c) => ({
                          src: c.img,
                          title: c.title,
                          org: c.org,
                          desc: `Issued by ${c.org}`,
                          subtitle: `${c.org} • ${c.skills || c.category || 'Verified Credential'}`,
                          isCertificate: true,
                        })),
                        index: idx,
                      })}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200/70 dark:border-white/10 bg-slate-100 dark:bg-[#161B23] p-2.5 sm:p-3 flex items-center justify-center mb-3 transition-colors duration-200 relative">
                        <Image 
                          src={cert.img} 
                          alt={`Certificate for ${cert.title} issued by ${cert.org}`} 
                          width="400"
                          height="250"
                          loading="lazy"
                          decoding="async"
                          unoptimized={true}
                          className="w-full h-full object-contain smooth-img-zoom" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#090B0E] flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                          </div>
                        </div>
                      </div>
                      <h2 className="font-semibold text-[15px] sm:text-base leading-snug mb-1 text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors line-clamp-2">{cert.title}</h2>
                      <p className="text-xs sm:text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-auto">{cert.org}</p>
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

