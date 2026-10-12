"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const previewRegistry = new Set();
let activePreview = null;

function updateActivePreview() {
  if (!activePreview?.isVisible) {
    activePreview = [...previewRegistry].find((preview) => preview.isVisible) || null;
  }

  previewRegistry.forEach((preview) => {
    preview.setIsActive(preview === activePreview);
  });
}

export default function ScrollPreviewImage({ className = '', ...imageProps }) {
  const observerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return undefined;

    const preview = { element, isVisible: false, setIsActive };
    previewRegistry.add(preview);

    if (!('IntersectionObserver' in window)) {
      preview.isVisible = true;
      updateActivePreview();
      return () => {
        previewRegistry.delete(preview);
        if (activePreview === preview) activePreview = null;
        updateActivePreview();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        preview.isVisible = entry.isIntersecting;
        updateActivePreview();
      },
      { threshold: 0.01 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      previewRegistry.delete(preview);
      if (activePreview === preview) activePreview = null;
      updateActivePreview();
    };
  }, []);

  return (
    <div ref={observerRef} className={`project-preview-observer absolute inset-0 ${isActive ? 'is-active' : ''}`}>
      <Image {...imageProps} className={className} />
    </div>
  );
}
