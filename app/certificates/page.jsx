"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import SiteLayout from '../../components/SiteLayout';
import FadeUp from '../../components/FadeUp';
import BreadcrumbJsonLd from '../../components/BreadcrumbJsonLd';

const CERTIFICATES = [
  { id: 1, title: "Graphic Design Masterclass", org: "Udemy", img: "/graphic-design.webp" },
  { id: 2, title: "Motion Design with Figma", org: "Udemy", img: "/motion-design.webp" },
  { id: 3, title: "After Effects Course", org: "EDUCBA", img: "/after-effects.webp" },
  { id: 4, title: "DaVinci Resolve 16: Color Correction", org: "Blackmagicdesign", img: "/davinci-resolve.webp" },
  { id: 5, title: "Adobe Premiere Pro CC Masterclass", org: "Udemy", img: "/premiere-pro.webp" },
  { id: 6, title: "Web Development Masterclass", org: "Udemy", img: "/web-development.webp" },
  { id: 7, title: "Google Adwords Crash Course 2021", org: "Udemy", img: "/google-adwords.webp" },
  { id: 8, title: "Design Principles, Typography & Color Theory", org: "Udemy", img: "/design-principles.webp" }
];

export default function CertificatesPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <SiteLayout selectedImage={selectedImage} setSelectedImage={setSelectedImage}>
      {({ theme, isDark }) => (
        <>
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Certificates', path: '/certificates' }]} />

          <FadeUp>
            <section id="certificates" className={`pt-32 pb-24 px-6 sm:px-12 w-full ${theme.bg}`}>
              <div className="max-w-7xl mx-auto w-full">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 flex items-center gap-4">
                  <span className="text-[#047857] dark:text-[#34D399]">/</span> Certifications
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CERTIFICATES.map((cert) => (
                    <button 
                      type="button"
                      aria-label={`Open certificate: ${cert.title}`}
                      key={cert.id} 
                      className={`p-5 sm:p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-md cursor-pointer text-left ${theme.card}`}
                      onClick={() => setSelectedImage({ src: cert.img, title: cert.title, desc: `Issued by ${cert.org}` })}
                    >
                      <div className={`aspect-[4/3] overflow-hidden rounded-xl border flex items-center justify-center mb-6 transition-colors relative ${isDark ? 'border-[#26352F] bg-[#16221D] group-hover:border-[#34D399]/60' : 'border-[#E2E8F0] bg-[#F1F5F9] group-hover:border-[#047857]/60'}`}>
                        <Image 
                          src={cert.img} 
                          alt={`Certificate for ${cert.title} issued by ${cert.org}`} 
                          width="400"
                          height="300"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-[#0B0F0E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-[#047857] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] flex items-center justify-center shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                          </div>
                        </div>
                      </div>
                      <h2 className="font-semibold text-sm sm:text-base mb-2 group-hover:text-[#047857] dark:group-hover:text-[#34D399] transition-colors">{cert.title}</h2>
                      <p className={`font-mono text-xs ${theme.muted}`}>{cert.org}</p>
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
