"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const NAV_LINKS = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/about', label: 'About', id: 'about' },
  { path: '/skills', label: 'Skills', id: 'skills' },
  { path: '/projects', label: 'Projects', id: 'projects' },
  { path: '/certificates', label: 'Certificates', id: 'certificates' },
  { path: '/resume', label: 'Resume', id: 'resume' },
  { path: '/gallery', label: 'Gallery', id: 'gallery' },
  { path: '/contact', label: 'Contact', id: 'contact' },
];

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="site-icon-button fixed bottom-6 right-6 z-50 shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

function LightboxModal({ image, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeIdx, setActiveIdx] = useState(image?.index ?? 0);
  const [isZoomed, setIsZoomed] = useState(false);

  const items = image?.items;
  const hasItems = Array.isArray(items) && items.length > 0;
  const currentItem = hasItems && items[activeIdx] ? items[activeIdx] : image;
  const totalCount = hasItems ? items.length : 1;

  // Touch swipe gesture refs
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    setImageLoaded(false);
    setIsZoomed(false);
  }, [currentItem?.src]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (!hasItems) return;
    setImageLoaded(false);
    setIsZoomed(false);
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (!hasItems) return;
    setImageLoaded(false);
    setIsZoomed(false);
    setActiveIdx((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.changedTouches && e.changedTouches[0];
    if (!touch) return;
    const deltaX = touchStartX.current - touch.clientX;
    const deltaY = touchStartY.current - touch.clientY;

    // Horizontal swipe (left for next, right for prev)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX > 0 && hasItems) {
        handleNext();
      } else if (deltaX < 0 && hasItems) {
        handlePrev();
      }
    }
    // Vertical swipe down to close modal (only if not zoomed)
    else if (!isZoomed && deltaY < -75 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
      onClose();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (hasItems && e.key === 'ArrowLeft') handlePrev();
      if (hasItems && e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hasItems, items, onClose]);

  return (
    <motion.div 
      key="image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={currentItem?.title || 'Image preview'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-1.5 sm:p-6 md:p-8 cursor-pointer"
      onClick={onClose}
    >
      <motion.div 
        key="image-lightbox-card"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[98vw] sm:max-w-5xl lg:max-w-6xl max-h-[95vh] sm:max-h-[92vh] flex flex-col bg-[#0B0F0E] border border-white/15 dark:border-[#34D399]/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden cursor-default select-none"
      >
        {/* Modal Top Toolbar */}
        <div className="flex-shrink-0 flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 border-b border-white/10 dark:border-[#26352F] bg-[#0F172A]/80 dark:bg-[#0B0F0E]/90 backdrop-blur-sm z-20">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#34D399] bg-[#34D399]/15 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-[#34D399]/30 font-semibold truncate max-w-[130px] sm:max-w-none">
              {currentItem?.desc || 'Preview'}
            </span>
            {hasItems && (
              <span className="text-[11px] sm:text-xs font-mono text-slate-400">
                {activeIdx + 1}/{totalCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Zoom toggle button */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setIsZoomed((z) => !z); }}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
              className={`p-2 rounded-lg text-xs font-mono transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#34D399] ${
                isZoomed 
                  ? 'bg-[#34D399] text-[#0B0F0E] font-bold' 
                  : 'text-slate-300 hover:text-white bg-white/10 hover:bg-white/15'
              }`}
              title={isZoomed ? "Zoom out" : "Zoom in"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isZoomed ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                )}
              </svg>
              <span className="hidden sm:inline">{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
            </button>

            {/* Open full resolution in new tab */}
            <a
              href={currentItem?.src}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/10 hover:bg-white/15 transition-colors text-xs flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#34D399]"
              title="Open full resolution in new tab"
              aria-label="Open full resolution in new tab"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="hidden sm:inline font-mono">Full Size</span>
            </a>

            {/* Close button with large touch target */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center text-slate-300 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Image Box - Adaptive Height with Touch Swiping */}
        <div 
          className={`relative w-full h-[50vh] sm:h-[60vh] md:h-[66vh] lg:h-[70vh] min-h-[240px] flex items-center justify-center bg-black/80 select-none ${
            isZoomed ? 'overflow-auto touch-pan-x touch-pan-y' : 'overflow-hidden touch-pan-y'
          }`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={() => setIsZoomed((z) => !z)}
        >
          {/* Skeleton loading state with spinner */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0B0F0E] z-10">
              <div className="w-10 h-10 border-2 border-[#34D399]/20 border-t-[#34D399] rounded-full animate-spin mb-3" />
              <p className="text-xs font-mono text-[#34D399] tracking-wider uppercase">Loading image...</p>
            </div>
          )}

          <Image 
            key={currentItem?.src}
            src={currentItem?.src} 
            alt={currentItem?.alt || currentItem?.title || 'Preview'} 
            fill
            sizes="(max-width: 640px) 98vw, (max-width: 1280px) 95vw, 1280px"
            loading="eager" 
            priority
            onLoad={() => setImageLoaded(true)}
            className={`object-contain p-2 sm:p-4 block transition-all duration-300 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${isZoomed ? 'scale-[1.75] sm:scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'}`} 
          />

          {/* Desktop-only floating side arrows (hidden on mobile so they don't cover content) */}
          {hasItems && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#065F46] dark:hover:bg-[#34D399] text-white dark:hover:text-[#0B0F0E] border border-white/10 hover:border-transparent backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-[#065F46] dark:hover:bg-[#34D399] text-white dark:hover:text-[#0B0F0E] border border-white/10 hover:border-transparent backdrop-blur transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
        
        {/* Caption Bar with Thumb-Friendly Bottom Navigation on Mobile & Desktop */}
        <div className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#0F172A]/90 dark:bg-[#111B17]/90 border-t border-white/10 dark:border-[#26352F] flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm sm:text-base md:text-xl font-semibold text-[#F5F7F5] line-clamp-1 sm:line-clamp-2 leading-snug">
              {currentItem?.title}
            </h3>
            {currentItem?.desc && (
              <p className="text-[11px] sm:text-xs md:text-sm text-[#065F46] dark:text-[#34D399] font-mono tracking-wide font-medium mt-0.5 truncate">
                {currentItem?.desc}
              </p>
            )}
          </div>

          {/* Thumb-friendly mobile navigation controls (always reachable with thumb) */}
          {hasItems && (
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous image"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-mono text-xs text-slate-300 px-1 sm:px-2 min-w-[2.5rem] sm:min-w-[3rem] text-center">
                {activeIdx + 1}/{totalCount}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next image"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/10 hover:bg-white/20 active:scale-90 text-white flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-[#34D399]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SiteLayout({ children, selectedImage, setSelectedImage }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    try {
      document.documentElement.style.removeProperty('background-color');
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDarkActive = stored !== null ? stored === 'dark' : prefersDark;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(isDarkActive);
      if (isDarkActive) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // Fallback
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    try {
      document.documentElement.style.removeProperty('background-color');
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    if (selectedImage || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage, isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!selectedImage || !setSelectedImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, setSelectedImage]);

  const theme = {
    bg: 'theme-page',
    nav: 'theme-nav',
    card: 'theme-card',
    cardElevated: 'theme-card-elevated',
    muted: 'color-secondary',
    subtle: 'color-muted',
    accentText: 'color-accent',
    accentBg: 'bg-accent',
    accentHover: 'hover-accent',
    tag: 'theme-tag border',
    input: 'theme-input focus:border-[var(--focus-ring)]'
  };

  const isCurrentPage = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className={`site-shell min-h-screen font-sans relative w-full m-0 p-0 ${theme.bg}`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#065F46] focus:text-white dark:focus:bg-[#34D399] dark:focus:text-[#0B0F0E] focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#065F46] dark:focus:ring-[#34D399]"
      >
        Skip to main content
      </a>

      {isMenuOpen && (
        <div
          className="site-backdrop"
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <nav aria-label="Main navigation" className="site-nav" itemScope itemType="https://schema.org/SiteNavigationElement">
        <div className="site-nav-inner relative z-10">
          <Link href="/" className="site-wordmark" onClick={() => setIsMenuOpen(false)}>
            Dipesh Sapkota<span className="site-wordmark-dot">.</span>
          </Link>
          
          <div className="site-desktop-nav">
            {NAV_LINKS.map((link) => {
              const active = isCurrentPage(link.path);
              return (
                <Link 
                  key={link.id} 
                  href={link.path} 
                  itemProp="url"
                  aria-current={active ? 'page' : undefined}
                  className={`site-nav-link ${active ? 'is-active' : ''}`}
                >
                  <span itemProp="name">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="site-header-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="site-icon-button"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              aria-pressed={isDark}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            
            <button 
              ref={menuToggleRef}
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="site-icon-button site-menu-toggle relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        </div>

      </nav>

      <nav
        id="mobile-navigation"
        className={`site-mobile-nav ${isMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMenuOpen}
        aria-label="Mobile navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="site-mobile-nav-list">
          {NAV_LINKS.map((link) => {
            const active = isCurrentPage(link.path);
            return (
              <Link
                key={`mobile-${link.id}`}
                href={link.path}
                itemProp="url"
                aria-current={active ? 'page' : undefined}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
                className={`site-nav-link ${active ? 'is-active' : ''}`}
              >
                <span itemProp="name">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <main id="main-content" tabIndex={-1} className="relative z-10 w-full flex flex-col items-center outline-none">
        {typeof children === 'function' ? children({ theme, isDark }) : children}
      </main>

      <footer className="theme-footer py-8 sm:py-10 text-center text-xs sm:text-sm border-t w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-7 gap-y-3 mb-6 sm:mb-8">
            <a href="https://github.com/dszae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on GitHub (dszae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on GitHub (dszae)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on LinkedIn (dszae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on LinkedIn (dszae)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://dev.to/dszae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on DEV Community (dszae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on DEV Community (dszae)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H5.34v4.36h1.22c.4 0 .69-.08.87-.25.18-.17.28-.46.28-.86v-2.16c0-.4-.1-.69-.29-.86zM20.5 2H3.5A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.94 13.08c0 .73-.24 1.3-.72 1.7-.48.4-1.16.6-2.04.6H3.6V8.62h2.58c.88 0 1.56.2 2.04.6.48.4.72.97.72 1.7v2.16zm5.12-3.26h-2.58v1.65h2.2v1.18h-2.2v1.73h2.58v1.2H9.8V8.62h4.26v1.2zm6.34 0l-1.9 6.96h-1.38l-1.9-6.96h1.44l1.15 4.79 1.15-4.79h1.44z"/></svg>
            </a>
            <a href="https://www.youtube.com/@dszae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on YouTube (@dszae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on YouTube (@dszae)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://x.com/dsz_ae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on X (dsz_ae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on X (Twitter)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on Instagram (dsz.ae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on Instagram (dsz.ae)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on Facebook (dsz.ae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on Facebook (dsz.ae)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="https://tiktok.com/@dsz_ae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on TikTok (dsz_ae)" className="site-footer-link transition-colors p-1" title="Dipesh Sapkota on TikTok (dsz_ae)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.53 3.91-1.63 5.49-1.61 2.31-4.32 3.82-7.16 3.99-2.03.12-4.11-.43-5.78-1.66-2.19-1.61-3.48-4.24-3.35-6.99.11-2.45 1.3-4.83 3.23-6.28 1.79-1.35 4.15-1.87 6.37-1.44v4.18c-1.16-.36-2.46-.3-3.56.24-.95.46-1.68 1.36-1.88 2.4-.33 1.72.76 3.5 2.44 3.96 1.48.41 3.16-.16 4.02-1.44.42-.62.62-1.38.62-2.14V.02z"/></svg>
            </a>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6" itemScope itemType="https://schema.org/SiteNavigationElement">
            {NAV_LINKS.map((link) => (
              <Link 
                key={`footer-${link.id}`} 
                href={link.path} 
                itemProp="url"
                className="site-footer-link transition-colors"
              >
                <span itemProp="name">{link.label}</span>
              </Link>
            ))}
          </nav>
          <p className="font-semibold text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} <Link href="/" className="site-footer-link underline transition-colors">Dipesh Sapkota<span className="site-wordmark-dot">.</span></Link> All rights reserved.
          </p>
        </div>
      </footer>

      <ScrollToTopButton />

      <AnimatePresence>
        {selectedImage && setSelectedImage && (
          <LightboxModal 
            key={selectedImage.src || 'lightbox'} 
            image={selectedImage} 
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
