"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

const GALLERY_IMAGES = [
  { id: 1, title: "Participating in college cricket tournament", alt: "Students posing together outdoors with cricket bats", img: "/cricket.webp" },
  { id: 2, title: "Successfully conducted Yathartha", alt: "Yathartha event team posing on stage with medals and posters", img: "/yathartha.webp" },
  { id: 3, title: "Celebrating incredible results of Clamphook with the team", alt: "Group gathered around a dining table under Nepal-themed wall art", img: "/clamphook.webp" },
  { id: 4, title: "Attending boring lectures", alt: "Student sitting at a classroom desk during a lecture", img: "/lecture.webp" },
  { id: 5, title: "Deep in focus and exploring concepts", alt: "Student wearing a headset in front of video-editing software", img: "/exploring.webp" },
  { id: 6, title: "Nagdhunga Surung Marga", alt: "Dipesh standing by a roadside with hills in the background", img: "/nagdhunga surung marga.webp" }
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SiteLayout selectedImage={selectedImage} setSelectedImage={setSelectedImage}>
      {({ theme }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Gallery', path: '/gallery' }]} />

          <FadeUp>
            <section id="gallery" className={`pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-4 text-[#0F172A] dark:text-[#F9FAFB]">
                  <span className="text-[#065F46] dark:text-[#34D399]">/</span> Visual Archive
                </h1>
                <p className="mb-12 text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] font-medium">A curated space for campus memories, event leadership, and engineering moments.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {GALLERY_IMAGES.map((item) => (
                    <button 
                      type="button"
                      aria-label={`Open ${item.title}`}
                      key={item.id} 
                      className="group relative w-full aspect-video rounded-xl overflow-hidden border border-[#CBD5E1] dark:border-[#26372F] bg-[#111B17] shadow-sm hover:shadow-md cursor-pointer smooth-card-hover hover:border-[#065F46]/60 dark:hover:border-[#34D399]/50"
                      onClick={() => setSelectedImage({ src: item.img, title: item.title, alt: item.alt, desc: 'Visual Archive' })}
                    >
                      <Image
                        src={item.img}
                        alt=""
                        width="640"
                        height="360"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover smooth-img-zoom"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0E]/90 via-[#0B0F0E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-6">
                        <div className="self-end w-8 h-8 rounded-full bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] flex items-center justify-center shadow-md transform-gpu scale-75 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                        </div>
                        <p className="text-[#F9FAFB] text-xs sm:text-sm font-semibold text-center translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </FadeUp>
        </>
      )}
    </SiteLayout>
  );
}
