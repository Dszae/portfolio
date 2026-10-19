"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastRecordedPath = useRef('');

  useEffect(() => {
    
    if (pathname === lastRecordedPath.current) return;
    lastRecordedPath.current = pathname;

if (!pathname || pathname.startsWith('/admin') || pathname.startsWith('/api')) {
      return;
    }

    const payload = {
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1200
    };

try {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', blob);
      } else {
        fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    } catch {
    }
  }, [pathname]);

  return null;
}

