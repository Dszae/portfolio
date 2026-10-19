"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RollingAnnouncement({ onVisibilityChange }) {
  const [feature, setFeature] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      if (sessionStorage.getItem('dismissed_announcement') === 'true') {
        setDismissed(true);
        return;
      }
    } catch {}

    let mounted = true;
    async function loadFeatures() {
      try {
        const res = await fetch('/api/site-features', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (mounted && data.announcement?.is_active && data.announcement?.message) {
            setFeature(data.announcement);
            if (onVisibilityChange) onVisibilityChange(true);
          }
        }
      } catch {
        // Silently fail if endpoint is unreachable
      }
    }
    loadFeatures();
    return () => { mounted = false; };
  }, [onVisibilityChange]);

  if (dismissed || !feature || !feature.is_active || !feature.message) {
    return null;
  }

  const speedClass = feature.speed === 'slow' 
    ? 'animate-ticker-slow' 
    : feature.speed === 'fast' 
    ? 'animate-ticker-fast' 
    : 'animate-ticker';

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('dismissed_announcement', 'true');
    } catch {}
    if (onVisibilityChange) onVisibilityChange(false);
  };

  const hasBadgeText = feature.badge && feature.badge.trim() !== '' && feature.badge.trim() !== '-';

  return (
    <aside 
      aria-label="Site announcement banner"
      className="w-full overflow-hidden bg-[#070A0F] border-b border-emerald-500/20 text-slate-100 text-xs py-2 px-3 sm:px-4 shadow-sm select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Badge / Indicator */}
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

        {/* Rolling marquee text track */}
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

        {/* Dismiss button */}
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
