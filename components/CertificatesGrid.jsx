"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CertificatesGrid({ certificates }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCert, setActiveCert] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const categories = ['All', ...Array.from(new Set(certificates.map((c) => c.category)))];

  const filtered = selectedCategory === 'All'
    ? certificates
    : certificates.filter((c) => c.category === selectedCategory);

  const activeCertIndex = activeCert ? filtered.findIndex((c) => c.id === activeCert.id) : -1;

  const handleClose = useCallback(() => {
    setActiveCert(null);
    setIsZoomed(false);
  }, []);

  const handlePrev = useCallback(() => {
    if (activeCertIndex === -1 || filtered.length === 0) return;
    setIsZoomed(false);
    const newIdx = activeCertIndex > 0 ? activeCertIndex - 1 : filtered.length - 1;
    setActiveCert(filtered[newIdx]);
  }, [activeCertIndex, filtered]);

  const handleNext = useCallback(() => {
    if (activeCertIndex === -1 || filtered.length === 0) return;
    setIsZoomed(false);
    const newIdx = activeCertIndex < filtered.length - 1 ? activeCertIndex + 1 : 0;
    setActiveCert(filtered[newIdx]);
  }, [activeCertIndex, filtered]);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.changedTouches && e.changedTouches[0];
    if (!touch) return;
    const deltaX = touchStartX.current - touch.clientX;
    const deltaY = touchStartY.current - touch.clientY;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX > 0) handleNext();
      else handlePrev();
    } else if (!isZoomed && deltaY < -75 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      handleClose();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    if (!activeCert) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeCert, handleClose, handlePrev, handleNext]);

  return (
    <div>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setActiveCert(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#090B0E] shadow-sm'
                : 'border border-[#CBD5E1] dark:border-[#222933] text-[#1E293B] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#181D24]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((cert) => (
          <article
            key={cert.id}
            className="group rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] p-5 backdrop-blur flex flex-col justify-between hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm"
          >
            <div>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#CBD5E1] dark:border-[#222933] bg-slate-900 relative mb-4 group-hover:border-[#065F46]/50 dark:group-hover:border-[#34D399]/50 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-[#34D399]"
                aria-label={`Inspect certificate: ${cert.title}`}
              >
                <Image
                  src={cert.img}
                  alt={`Certificate for ${cert.title} issued by ${cert.org}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#090B0E] flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#065F46]/10 dark:bg-[#34D399]/15 text-[#065F46] dark:text-[#34D399] border border-[#065F46]/20 dark:border-[#34D399]/30 font-semibold">
                  {cert.org}
                </span>
                <span className="text-[11px] font-mono text-[#475569] dark:text-[#94A3B8]">
                  {cert.category}
                </span>
              </div>

              <h3 className="font-semibold text-base mb-2 text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors leading-snug">
                {cert.title}
              </h3>

              <p className="text-xs text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed mb-4">
                {cert.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#CBD5E1]/50 dark:border-[#222933] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#475569] dark:text-[#94A3B8]">
                Skills: {cert.skills}
              </span>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="text-xs font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
              >
                View Certificate
              </button>
            </div>
          </article>
        ))}
      </div>

<AnimatePresence>
        {activeCert && (
          <motion.div
            key="cert-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 md:p-10 select-none cursor-pointer"
            onClick={handleClose}
          >
            {/* Top right clean close button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close certificate dialog"
              className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] p-2.5 text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Floating Left Navigation Arrow */}
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handlePrev(e); }}
                aria-label="Previous certificate"
                className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-[120] p-2.5 sm:p-3 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Center Certificate Card - clicking only here prevents closing */}
            <motion.div
              key={"cert-card-" + activeCert.id}
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 6 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 bg-white p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-2xl max-w-[92vw] sm:max-w-[85vw] lg:max-w-4xl max-h-[72vh] sm:max-h-[76vh] flex items-center justify-center cursor-default overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={activeCert.img}
                alt={"Certificate: " + activeCert.title}
                className="max-h-[68vh] sm:max-h-[72vh] w-auto max-w-full block object-contain rounded-xl select-none"
                loading="eager"
              />
            </motion.div>

            {/* Floating Right Navigation Arrow */}
            {filtered.length > 1 && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleNext(e); }}
                aria-label="Next certificate"
                className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-[120] p-2.5 sm:p-3 text-white/70 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer focus:outline-none"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Bottom Title & Subtitle - pointer-events-none so clicking here closes */}
            <div className="mt-4 sm:mt-5 text-center max-w-2xl px-4 pointer-events-none select-none z-10">
              <h3 className="text-white text-base sm:text-lg md:text-xl font-bold tracking-tight">
                {activeCert.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-400 font-medium">
                {activeCert.org} &bull; {activeCert.skills || activeCert.category}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

