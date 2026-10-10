"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function CertificatesGrid({ certificates }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCert, setActiveCert] = useState(null);

  const categories = ['All', ...Array.from(new Set(certificates.map((c) => c.category)))];

  const filtered = selectedCategory === 'All'
    ? certificates
    : certificates.filter((c) => c.category === selectedCategory);

  const handleClose = useCallback(() => {
    setActiveCert(null);
  }, []);

  useEffect(() => {
    if (!activeCert) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [activeCert, handleClose]);

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
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md cursor-pointer"
            onClick={handleClose}
          >
            <motion.div
              key="cert-modal-card"
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full bg-[#0F172A] dark:bg-[#111B17] border border-[#CBD5E1]/40 dark:border-[#34D399]/30 ring-1 ring-black/10 dark:ring-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 dark:border-[#26352F] bg-slate-950/50 dark:bg-[#0B0F0E]/60">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#34D399] bg-[#34D399]/15 px-2.5 py-1 rounded border border-[#34D399]/30 font-semibold">
                    {activeCert.org}
                  </span>
                  <span className="text-xs text-slate-300 dark:text-slate-400 font-semibold">{activeCert.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeCert.img}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 dark:hover:bg-[#16221D] transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-[#34D399]"
                    title="Open original certificate in new tab"
                    aria-label="Open original certificate in new tab"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Certificate Image */}
              <div className="relative w-full aspect-[4/3] max-h-[60vh] bg-black flex items-center justify-center p-2">
                <Image
                  src={activeCert.img}
                  alt={`Certificate: ${activeCert.title}`}
                  width={1000}
                  height={750}
                  priority
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="p-6 bg-slate-900 border-t border-slate-800">
                <h3 className="text-xl font-bold text-white mb-2">{activeCert.title}</h3>
                <p className="text-sm text-slate-300 mb-3 leading-relaxed">{activeCert.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400">Validated Skills:</span>
                  <span className="font-mono text-[#34D399] bg-slate-800 px-2.5 py-1 rounded border border-[#26352F]">
                    {activeCert.skills}
                  </span>
                  <span className="text-slate-400 ml-auto">Issuing Institution: <strong className="text-white">{activeCert.org}</strong></span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

