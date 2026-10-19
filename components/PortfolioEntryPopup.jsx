"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PortfolioEntryPopup() {
  const pathname = usePathname();

  const [popup, setPopup] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.__INITIAL_SITE_FEATURES__?.popup) {
        return window.__INITIAL_SITE_FEATURES__.popup;
      }
      try {
        const cached = localStorage.getItem('site_features_popup');
        if (cached) return JSON.parse(cached);
      } catch {}
    }
    return null;
  });

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Popup should strictly ONLY ever display on the homepage ('/')
    if (window.location.pathname !== '/') return false;

    try {
      const p = window.__INITIAL_SITE_FEATURES__?.popup || (() => {
        const cached = localStorage.getItem('site_features_popup');
        return cached ? JSON.parse(cached) : null;
      })();

      if (p) {
        const isOncePerSession = p?.frequency === 'once_per_session' || p?.show_once_per_session === true;
        if (isOncePerSession && sessionStorage.getItem('portfolio_popup_seen') === 'true') {
          return false;
        }
        return Boolean(p?.is_active && p?.image_url);
      }
    } catch {}
    return false;
  });

  useEffect(() => {
    // Strictly only check and show on the homepage ('/')
    if (pathname !== '/') return;

    let mounted = true;
    async function checkPopup() {
      try {
        const res = await fetch('/api/site-features');
        if (!res.ok) return;
        const data = await res.json();
        const p = data.popup;

        if (mounted && p) {
          setPopup(p);
          try {
            localStorage.setItem('site_features_popup', JSON.stringify(p));
          } catch {}

          if (p.is_active && p.image_url) {
            const isOncePerSession = p.frequency === 'once_per_session' || p.show_once_per_session === true;
            if (isOncePerSession) {
              const alreadySeen = sessionStorage.getItem('portfolio_popup_seen') === 'true';
              if (!alreadySeen) {
                setIsOpen(true);
              } else {
                setIsOpen(false);
              }
            } else {
              // 'every_refresh' option: show on every homepage reload
              setIsOpen(true);
            }
          } else {
            setIsOpen(false);
          }
        }
      } catch {
        // Silently catch network errors
      }
    }

    checkPopup();
    return () => { mounted = false; };
  }, [pathname]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      // Record session dismissal
      sessionStorage.setItem('portfolio_popup_seen', 'true');
    } catch {}
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Strictly do not render if not on homepage or not open or missing popup
  if (pathname !== '/' || !isOpen || !popup || !popup.image_url) {
    return null;
  }

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-popup-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative bg-[#0E131F] border border-slate-700/80 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close announcement modal"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur transition-all border border-white/20 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Featured Popup Image */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-900 overflow-hidden">
          <Image
            src={popup.image_url}
            alt={popup.title || 'Portfolio Announcement'}
            fill
            sizes="(max-width: 640px) 95vw, 600px"
            priority
            unoptimized={Boolean(popup.image_url?.startsWith('http'))}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E131F] via-transparent to-transparent opacity-80" />
        </div>

        {/* Content Box */}
        <div className="p-6 sm:p-7 space-y-3">
          {popup.title && (
            <h2 id="entry-popup-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
              {popup.title}
            </h2>
          )}

          {popup.description && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {popup.description}
            </p>
          )}

          {/* Action Links */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Dismiss
            </button>
            {popup.link_url && (
              <Link
                href={popup.link_url}
                onClick={handleClose}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
              >
                <span>{popup.link_text || 'Learn More'}</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
