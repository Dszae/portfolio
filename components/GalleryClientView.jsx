"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SiteLayout from './SiteLayout';
import FadeUp from './FadeUp';
import BreadcrumbJsonLd from './BreadcrumbJsonLd';
import PagePagination from './PagePagination';

export default function GalleryClientView({ gallery, jsonLd }) {
  const [selectedImage, setSelectedImage] = useState(null);

  // Background warm-up of gallery archive images into browser memory cache
  useEffect(() => {
    if (typeof window !== 'undefined' && Array.isArray(gallery)) {
      gallery.forEach((item) => {
        if (item.img) {
          const img = new window.Image();
          img.src = item.img;
        }
      });
    }
  }, [gallery]);

  return (
    <SiteLayout selectedImage={selectedImage} setSelectedImage={setSelectedImage}>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }]} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <FadeUp>
            <section id="gallery" className={`pt-36 sm:pt-40 subpage-container pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <div className="mb-10 max-w-3xl">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-4 text-[#0F172A] dark:text-[#F9FAFB]">
                    <span className="text-[#065F46] dark:text-[#34D399]">/</span> Gallery
                  </h1>
                  <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed">
                    A visual archive documenting campus moments, student leadership, technical exhibitions like Yathartha, and creative engineering milestones at IOE Thapathali Campus in Kathmandu, Nepal.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {gallery.map((item, idx) => (
                    <button 
                      type="button"
                      aria-label={`Open ${item.title}`}
                      key={item.id} 
                      className="group relative w-full aspect-video rounded-xl overflow-hidden border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] shadow-sm hover:shadow-md cursor-pointer smooth-card-hover hover:border-[#065F46]/60 dark:hover:border-[#34D399]/50"
                      onClick={() => setSelectedImage({
                        src: item.img,
                        title: item.title,
                        alt: item.alt,
                        desc: item.category ? `IOE Thapathali Campus • ${item.category}` : 'IOE Thapathali Campus',
                        subtitle: item.category ? `IOE Thapathali Campus • ${item.category}` : 'IOE Thapathali Campus',
                        isCertificate: false,
                        items: gallery.map((g) => ({
                          src: g.img,
                          title: g.title,
                          alt: g.alt,
                          desc: g.category ? `IOE Thapathali Campus • ${g.category}` : 'IOE Thapathali Campus',
                          subtitle: g.category ? `IOE Thapathali Campus • ${g.category}` : 'IOE Thapathali Campus',
                          isCertificate: false,
                        })),
                        index: idx,
                      })}
                    >
                      <Image
                        src={item.img}
                        alt={item.alt || item.title}
                        width="640"
                        height="360"
                        loading="lazy"
                        decoding="async"
                        unoptimized={true}
                        className="w-full h-full object-cover smooth-img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4 sm:p-6">
                        <div className="self-end w-8 h-8 rounded-full bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#090B0E] flex items-center justify-center shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                        </div>
                        <p className="text-[#F9FAFB] text-xs sm:text-sm font-semibold text-center">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <PagePagination 
                  prev={{ label: 'Resume & Journey', path: '/resume' }} 
                  next={{ label: 'Contact & Connect', path: '/contact' }} 
                />
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}

