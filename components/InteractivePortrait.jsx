"use client";

import Image from 'next/image';
import { useRef } from 'react';

export default function InteractivePortrait() {
  const frameRef = useRef(null);

  const handlePointerMove = (event) => {
    const frame = frameRef.current;
    if (!frame || event.pointerType === 'touch') return;

    const bounds = frame.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    frame.style.setProperty('--portrait-rotate-x', `${vertical * -8}deg`);
    frame.style.setProperty('--portrait-rotate-y', `${horizontal * 8}deg`);
    frame.style.setProperty('--portrait-light-x', `${(horizontal + 0.5) * 100}%`);
    frame.style.setProperty('--portrait-light-y', `${(vertical + 0.5) * 100}%`);
  };

  const resetPointer = () => {
    const frame = frameRef.current;
    if (!frame) return;

    frame.style.setProperty('--portrait-rotate-x', '0deg');
    frame.style.setProperty('--portrait-rotate-y', '0deg');
    frame.style.setProperty('--portrait-light-x', '50%');
    frame.style.setProperty('--portrait-light-y', '50%');
  };

  return (
    <div
      ref={frameRef}
      className="hero-portrait-frame"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <Image
        src="/dipesh-sapkota.jpg"
        id="primary-profile-image"
        itemProp="image"
        alt="My portrait from IOE Thapathali Campus in Kathmandu, Nepal"
        fill
        sizes="(max-width: 680px) 88vw, (max-width: 899px) 38vw, 440px"
        loading="eager"
        priority
        fetchPriority="high"
        className="hero-portrait-image"
      />
      <span className="hero-portrait-focus" aria-hidden="true" />
    </div>
  );
}
