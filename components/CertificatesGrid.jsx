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
      {/* Category Filter */}
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
                ? 'bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] shadow-sm'
                : 'border border-[#CBD5E1] dark:border-[#26352F] text-[#1E293B] dark:text-[#CBD5E1] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((cert) => (
          <article
            key={cert.id}
            className="group rounded-2xl border border-[#CBD5E1] dark:border-[#26352F] bg-white dark:bg-[#111B17] p-5 backdrop-blur flex flex-col justify-between hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all duration-300 hover:-translate-y-1 shadow-sm"
          >
            <div>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-[#CBD5E1] dark:border-[#26352F] bg-slate-900 relative mb-4 group-hover:border-[#065F46]/50 dark:group-hover:border-[#34D399]/50 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-[#34D399]"
                aria-label={`Inspect certificate: ${cert.title}`}
              >
                <Image
                  src={cert.img}
                  alt={`Certificate for ${cert.title} issued by ${cert.org}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#065F46] dark:bg-[#34D399] text-white dark:text-[#0B0F0E] flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <div className="pt-3 border-t border-[#CBD5E1]/50 dark:border-[#26352F] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#475569] dark:text-[#94A3B8]">
                Skills: {cert.skills}
              </span>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="text-xs font-semibold text-[#065F46] dark:text-[#34D399] hover:underline"
              >
                View &rarr;
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox / Modal */}
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
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-6 md:p-8 bg-slate-950/90 backdrop-blur-md cursor-pointer"
            onClick={handleClose}
          >
            <motion.div
              key="cert-modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[98vw] sm:max-w-5xl lg:max-w-6xl max-h-[95vh] sm:max-h-[92vh] bg-[#0F172A] dark:bg-[#111B17] border border-[#CBD5E1]/40 dark:border-[#34D399]/30 ring-1 ring-black/10 dark:ring-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col cursor-default select-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex-shrink-0 flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3.5 border-b border-slate-800 dark:border-[#26352F] bg-slate-950/60 dark:bg-[#0B0F0E]/70 backdrop-blur-sm z-20">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#34D399] bg-[#34D399]/15 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-[#34D399]/30 font-semibold truncate max-w-[130px] sm:max-w-none">
                    {activeCert.org}
                  </span>
                  {filtered.length > 1 && (
                    <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                      {activeCertIndex + 1}/{filtered.length}
                    </span>
                  )}
                  <span className="text-[11px] sm:text-xs text-slate-300 dark:text-slate-400 font-semibold truncate hidden sm:inline">{activeCert.category}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {/* Zoom toggle button */}
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); setIsZoomed((z) => !z); }}
                    aria-label={isZoomed ? "Zoom out" : "Zoom in"}
                    className={`p-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#34D399] ${
                      isZoomed 
                        ? 'bg-[#34D399] text-[#0B0F0E] font-bold' 
                        : 'text-slate-300 hover:text-white bg-slate-800 dark:bg-[#16221D]'
                    }`}
                    title={isZoomed ? "Zoom out" : "Zoom in"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isZoomed ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      )}
                    </svg>
                    <span className="hidden sm:inline">{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
                  </button>

                  <a
                    href={activeCert.img}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 dark:bg-[#16221D] transition-colors text-xs flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                    title="Open original certificate in new tab"
                    aria-label="Open original certificate in new tab"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="hidden sm:inline font-mono">Full Size</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close certificate dialog"
                    className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-slate-300 hover:text-white rounded-lg bg-slate-800 dark:bg-[#16221D] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Certificate Image - Strictly Fixed Geometry with Touch Swiping */}
              <div 
                className={`relative w-full h-[50vh] sm:h-[60vh] md:h-[66vh] lg:h-[70vh] min-h-[240px] bg-black flex items-center justify-center select-none ${
                  isZoomed ? 'overflow-auto touch-pan-x touch-pan-y' : 'overflow-hidden touch-pan-y'
                }`}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={() => setIsZoomed((z) => !z)}
              >
                <Image
                  src={activeCert.img}
                  alt={`Certificate: ${activeCert.title}`}
                  fill
                  sizes="(max-width: 640px) 98vw, (max-width: 1280px) 95vw, 1280px"
                  priority
                  className={`object-contain p-2 sm:p-4 block transition-transform duration-200 ${
                    isZoomed ? 'scale-[1.75] sm:scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                />

                {/* Desktop-only floating side arrows */}
                {filtered.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous certificate"
                      className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#065F46] dark:hover:bg-[#34D399] text-white dark:hover:text-[#0B0F0E] border border-white/10 hover:border-transparent backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next certificate"
                      className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#065F46] dark:hover:bg-[#34D399] text-white dark:hover:text-[#0B0F0E] border border-white/10 hover:border-transparent backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Details - Fixed at Bottom with Thumb Navigation */}
              <div className="flex-shrink-0 p-4 sm:p-6 bg-slate-900 border-t border-slate-800 dark:border-[#26352F] flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1 line-clamp-1 sm:line-clamp-2 leading-snug">{activeCert.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-300 mb-1 leading-relaxed line-clamp-1 sm:line-clamp-2">{activeCert.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-400">Validated Skills:</span>
                    <span className="font-mono text-[#34D399] bg-slate-800 px-2 py-0.5 rounded border border-[#26352F] text-[11px] sm:text-xs truncate max-w-[180px] sm:max-w-none">
                      {activeCert.skills}
                    </span>
                    <span className="text-slate-400 ml-auto hidden sm:inline">Issuing Institution: <strong className="text-white">{activeCert.org}</strong></span>
                  </div>
                </div>

                {/* Thumb-friendly mobile & desktop navigation */}
                {filtered.length > 1 && (
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous certificate"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <span className="font-mono text-xs text-slate-300 px-1 sm:px-2 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                      {activeCertIndex + 1}/{filtered.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next certificate"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

