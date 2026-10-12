"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ScrollPreviewImage({ className = '', ...imageProps }) {
  const observerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return undefined;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={observerRef} className={`project-preview-observer absolute inset-0 ${isVisible ? 'is-visible' : ''}`}>
      <Image {...imageProps} className={className} />
    </div>
  );
}
