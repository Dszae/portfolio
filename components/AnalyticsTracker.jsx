"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function getVisitorId() {
  if (typeof window === 'undefined') return '';
  try {
    let vid = localStorage.getItem('portfolio_vid');
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem('portfolio_vid', vid);
    }
    return vid;
  } catch {
    return '';
  }
}

function sendAnalyticsEvent(payload) {
  try {
    const jsonStr = JSON.stringify(payload);
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([jsonStr], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics', blob);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonStr,
        keepalive: true
      }).catch(() => {});
    }
  } catch {}
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastRecordedPath = useRef('');

  useEffect(() => {
    if (pathname === lastRecordedPath.current) return;
    lastRecordedPath.current = pathname;

    if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      return;
    }

    const vid = getVisitorId();
    sendAnalyticsEvent({
      type: 'page_view',
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200,
      visitorId: vid
    });
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('a');
      if (!target || !target.href) return;
      const href = target.href.toLowerCase();
      const vid = getVisitorId();

      if (href.includes('github.com')) {
        sendAnalyticsEvent({
          type: 'github_click',
          path: pathname,
          visitorId: vid
        });
      } else if (href.includes('sportivo.dipeshsapkota7.com.np') || target.dataset.track === 'demo') {
        sendAnalyticsEvent({
          type: 'demo_click',
          path: pathname,
          visitorId: vid
        });
      } else if (href.includes('resume') || href.includes('.pdf') || target.dataset.track === 'resume') {
        sendAnalyticsEvent({
          type: 'resume_download',
          path: pathname,
          visitorId: vid
        });
      }
    };

    window.addEventListener('click', handleClick, { passive: true });
    return () => window.removeEventListener('click', handleClick);
  }, [pathname]);

  return null;
}

