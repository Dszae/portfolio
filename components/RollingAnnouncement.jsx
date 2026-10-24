"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const DEFAULT_ANNOUNCEMENT = {
  is_active: true,
  message: "Wishing you and your loved ones a happy Dashain filled with love, laughter, and beautiful moments. शुभ विजयादशमी!",
  link: "",
  link_text: "",
  speed: "normal",
  badge: ""
};

export function getClientInitialAnnouncement() {
  if (typeof window !== 'undefined') {
    if (window.__INITIAL_SITE_FEATURES__?.announcement) {
      const ann = window.__INITIAL_SITE_FEATURES__.announcement;
      const txt = (ann.text || ann.message || '').trim();
      return { ...ann, text: txt, message: txt };
    }
    try {
      const cached = localStorage.getItem('site_features_announcement');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && typeof parsed === 'object') {
          const txt = (parsed.text || parsed.message || '').trim();
          return { ...parsed, text: txt, message: txt };
        }
      }
    } catch {}
  }
  return DEFAULT_ANNOUNCEMENT;
}

export default function RollingAnnouncement({ onVisibilityChange }) {
  const [feature, setFeature] = useState(DEFAULT_ANNOUNCEMENT);
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let active = true;
    setMounted(true);
    const clientInitial = getClientInitialAnnouncement();
    if (clientInitial) {
      setFeature(clientInitial);
      if (clientInitial.is_active && (clientInitial.text || clientInitial.message) && onVisibilityChange) {
        onVisibilityChange(true);
      }
    }
    async function syncFeatures() {
      try {
        const res = await fetch('/api/site-features?t=' + Date.now(), { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const ann = data.announcement;
          if (mounted && ann) {
            const txt = (ann.text || ann.message || '').trim();
            const normalized = { ...ann, text: txt, message: txt };
            setFeature(normalized);
            try {
              localStorage.setItem('site_features_announcement', JSON.stringify(normalized));
            } catch {}
            if (normalized.is_active && txt) {
              if (onVisibilityChange) onVisibilityChange(true);
            } else {
              if (onVisibilityChange) onVisibilityChange(false);
            }
          }
        }
      } catch {
      }
    }
    syncFeatures();

    const handleStorageUpdate = (e) => {
      if (e.key === 'site_features_announcement' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          const txt = (parsed.text || parsed.message || '').trim();
          setFeature({ ...parsed, text: txt, message: txt });
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageUpdate);
    return () => {
      active = false;
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [onVisibilityChange]);

  const messageText = (feature?.text || feature?.message || '').trim();

  if (!mounted || dismissed || !feature || !feature.is_active || !messageText) {
    return null;
  }

  const speedClass = feature.speed === 'slow' 
    ? 'animate-ticker-slow' 
    : feature.speed === 'fast' 
    ? 'animate-ticker-fast' 
    : 'animate-ticker';

  const handleDismiss = () => {
    setDismissed(true);
    if (onVisibilityChange) onVisibilityChange(false);
  };

  const hasBadgeText = feature.badge && feature.badge.trim() !== '' && feature.badge.trim() !== '-';

  return (
    <aside 
      aria-label="Site announcement banner"
      className="w-full overflow-hidden bg-[#070A0F] border-b border-emerald-500/20 text-slate-100 text-xs py-2 px-3 sm:px-4 shadow-sm select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {hasBadgeText ? (
          <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{feature.badge}</span>
          </div>
        ) : (
          <div className="shrink-0 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        )}

<div className="flex-1 overflow-hidden relative whitespace-nowrap">
          <div className={`${speedClass} items-center gap-6 min-w-max`}>
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <span key={idx} className="inline-flex items-center gap-3 pr-6">
                <span className="font-medium tracking-wide text-slate-200">
                  {feature.message}
                </span>
                {feature.link && (
                  <Link 
                    href={feature.link}
                    className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 ml-1"
                  >
                    <span>{feature.link_text || 'Learn more →'}</span>
                  </Link>
                )}
                <span className="text-emerald-500/50 mx-3" aria-hidden="true">✦</span>
              </span>
            ))}
          </div>
        </div>

<button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="shrink-0 text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors text-xs font-bold"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
