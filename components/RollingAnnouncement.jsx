"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RollingAnnouncement() {
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadFeatures() {
      try {
        const res = await fetch('/api/site-features');
        if (res.ok) {
          const data = await res.json();
          if (mounted && data.announcement?.is_active && data.announcement?.message) {
            setFeature(data.announcement);
          }
        }
      } catch {
        // Silently fail if endpoint is unreachable
      }
    }
    loadFeatures();
    return () => { mounted = false; };
  }, []);

  if (!feature || !feature.is_active || !feature.message) {
    return null;
  }

  const speedClass = feature.speed === 'slow' ? 'animate-marquee-slow' : feature.speed === 'fast' ? 'animate-marquee-fast' : 'animate-marquee';

  return (
    <aside 
      aria-label="Site announcement banner"
      className="relative z-40 w-full overflow-hidden bg-[#070A0F] border-b border-emerald-500/20 text-slate-200 text-xs py-2 px-4 shadow-sm select-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Static badge on the left */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Notice</span>
        </div>

        {/* Rolling marquee text */}
        <div className="flex-1 overflow-hidden relative group cursor-pointer whitespace-nowrap">
          <div className="inline-flex items-center gap-8 animate-marquee group-hover:[animation-play-state:paused]">
            <span className="font-medium tracking-wide">
              {feature.message}
            </span>
            {feature.link && (
              <Link 
                href={feature.link}
                className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 ml-2"
              >
                <span>{feature.link_text || 'Learn more →'}</span>
              </Link>
            )}

            {/* Repeated snippet to ensure uninterrupted continuous roll */}
            <span className="text-slate-600 dark:text-slate-500 mx-4" aria-hidden="true">✦</span>
            <span className="font-medium tracking-wide">
              {feature.message}
            </span>
            {feature.link && (
              <Link 
                href={feature.link}
                className="inline-flex items-center gap-1 font-bold text-emerald-400 hover:text-emerald-300 underline underline-offset-2 ml-2"
              >
                <span>{feature.link_text || 'Learn more →'}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Dismiss / close ticker button */}
        <button
          type="button"
          onClick={() => setFeature(null)}
          aria-label="Dismiss banner"
          className="flex-shrink-0 text-slate-500 hover:text-slate-300 p-0.5 rounded hover:bg-slate-800 transition-colors text-xs font-bold"
        >
          ✕
        </button>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-slow {
          display: inline-flex;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-fast {
          display: inline-flex;
          animation: marquee 16s linear infinite;
        }
      `}</style>
    </aside>
  );
}
