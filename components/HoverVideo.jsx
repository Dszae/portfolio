'use client';

import { useRef, useState } from 'react';

export default function HoverVideo({ children, className = '', ...videoProps }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className={`project-video-shell group relative h-full w-full overflow-hidden ${isHovered ? 'is-hovered' : ''} ${isPlaying ? 'is-playing' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-video-grid" aria-hidden="true" />
      <div className="project-video-scanline" aria-hidden="true" />

      <div className="project-video-hud" aria-hidden="true">
        <span className="project-video-kicker">
          <span className="project-video-pulse" />
          Live product preview
        </span>
        <span className="project-video-index">01 / 01</span>
      </div>

      <div className="project-video-corner project-video-corner-tl" aria-hidden="true" />
      <div className="project-video-corner project-video-corner-br" aria-hidden="true" />

      <div className="project-video-prompt" aria-hidden="true">
        <span className="project-video-prompt-icon">{isPlaying ? '||' : '>'}</span>
        <span>{isPlaying ? 'Previewing' : 'Hover to preview'}</span>
      </div>

      <video
        {...videoProps}
        ref={videoRef}
        className={`relative z-10 ${className}`}
        muted
        controlsList="nodownload"
        onContextMenu={(event) => event.preventDefault()}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {children}
      </video>
    </div>
  );
}