'use client';

import { useRef } from 'react';

export default function HoverVideo({ children, ...videoProps }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <video
      {...videoProps}
      ref={videoRef}
      muted
      controlsList="nodownload"
      onContextMenu={(event) => event.preventDefault()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </video>
  );
}