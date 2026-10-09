"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

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
                ? 'bg-sky-600 text-white shadow-sm'
                : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
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
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-5 backdrop-blur flex flex-col justify-between hover:border-sky-500 dark:hover:border-sky-500 transition-all duration-300 hover:-translate-y-1 shadow-sm"
          >
            <div>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 relative mb-4 group-hover:border-sky-500/50 transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                  <div className="w-10 h-10 rounded-full bg-sky-600 text-white flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </button>

              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold">
                  {cert.org}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {cert.category}
                </span>
              </div>

              <h3 className="font-semibold text-base mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                {cert.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {cert.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">
                Skills: {cert.skills}
              </span>
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                View &rarr;
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {activeCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeCert.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-fadeIn"
          onClick={handleClose}
        >
          <div
            className="relative max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded border border-sky-500/30">
                  {activeCert.org}
                </span>
                <span className="text-xs text-slate-300 font-semibold">{activeCert.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeCert.img}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors text-xs"
                  title="Open original certificate"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close dialog"
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
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
                <span className="font-mono text-sky-400 bg-slate-800 px-2.5 py-1 rounded">
                  {activeCert.skills}
                </span>
                <span className="text-slate-400 ml-auto">Issuing Institution: <strong className="text-white">{activeCert.org}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

