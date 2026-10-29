"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import RollingAnnouncement from './RollingAnnouncement';
import PortfolioEntryPopup from './PortfolioEntryPopup';
import AiAssistant from './AiAssistant/AiAssistant';

export const NAV_LINKS = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/about', label: 'About', id: 'about' },
  { path: '/skills', label: 'Skills', id: 'skills' },
  { path: '/projects', label: 'Projects', id: 'projects' },
  { path: '/blog', label: 'Articles', id: 'blog' },
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
      className="site-icon-button fixed bottom-[78px] right-5 sm:bottom-[76px] sm:right-6 z-40 shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-full"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

function LightboxModal({ image, onClose }) {
  const [activeIdx, setActiveIdx] = useState(image?.index ?? 0);
  const [isLoaded, setIsLoaded] = useState(false);

  const items = image?.items;
  const hasItems = Array.isArray(items) && items.length > 0;
  const currentItem = hasItems && items[activeIdx] ? items[activeIdx] : image;

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Monitor image load state
  useEffect(() => {
    if (!currentItem?.src) return;
    setIsLoaded(false);
    const img = new window.Image();
    img.src = currentItem.src;
    if (img.complete && img.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setIsLoaded(true);
    }
  }, [currentItem?.src]);

  // Preload neighboring images in the set
  useEffect(() => {
    if (!hasItems || items.length <= 1) return;
    const nextIdx = (activeIdx + 1) % items.length;
    const prevIdx = (activeIdx - 1 + items.length) % items.length;
    [items[nextIdx]?.src, items[prevIdx]?.src].forEach((src) => {
      if (src) {
        const pre = new window.Image();
        pre.src = src;
      }
    });
  }, [activeIdx, hasItems, items]);

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (!hasItems) return;
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (!hasItems) return;
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

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX > 0 && hasItems) {
        handleNext();
      } else if (deltaX < 0 && hasItems) {
        handlePrev();
      }
    } else if (deltaY < -75 && Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
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

  const isCertificate = Boolean(
    image?.isCertificate ||
    currentItem?.isCertificate ||
    (currentItem?.src && currentItem.src.toLowerCase().includes('cert')) ||
    (currentItem?.desc && currentItem.desc.toLowerCase().includes('issued by')) ||
    (currentItem?.subtitle && currentItem.subtitle.toLowerCase().includes('credential'))
  );

  return (
    <motion.div 
      key="image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={currentItem?.title || 'Image preview'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-md select-none cursor-pointer overflow-hidden p-0"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar: Counter + Close Button */}
      <div 
        className="w-full shrink-0 h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between z-30"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div>
          {hasItems && items.length > 1 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-medium text-white/90 shadow-sm">
              {activeIdx + 1} / {items.length}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close modal"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md focus:outline-none"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Middle Stage: Image + Navigation Arrows */}
      <div 
        className="flex-1 min-h-0 w-full flex items-center justify-center relative px-2 sm:px-14 lg:px-20 overflow-hidden"
        onClick={onClose}
      >
        {/* Floating Left Navigation Arrow */}
        {hasItems && items.length > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handlePrev(e); }}
            aria-label="Previous"
            className="absolute left-2 sm:left-4 md:left-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 backdrop-blur-md border border-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xl focus:outline-none"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Center Image Container - clicking only here prevents closing */}
        <motion.div 
          key={"image-card-" + (currentItem?.src || activeIdx)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={"relative z-20 max-w-[94vw] sm:max-w-[86vw] lg:max-w-4xl max-h-[66vh] sm:max-h-[72vh] flex items-center justify-center rounded-xl sm:rounded-2xl shadow-2xl cursor-default " + (isCertificate ? 'bg-white p-2 sm:p-4' : 'bg-transparent p-0')}
        >
          {/* Subtle loading skeleton in stage to prevent any layout shift */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center min-w-[240px] min-h-[180px] sm:min-w-[400px] sm:min-h-[300px] rounded-xl bg-white/5 animate-pulse">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
          )}

          <img 
            src={currentItem?.src} 
            alt={currentItem?.alt || currentItem?.title || 'Preview'} 
            onLoad={() => setIsLoaded(true)}
            className={"max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full block object-contain select-none transition-opacity duration-300 ease-out " + 
              (isCertificate ? 'rounded-lg' : 'rounded-xl') + " " +
              (isLoaded ? 'opacity-100' : 'opacity-0')}
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* Floating Right Navigation Arrow */}
        {hasItems && items.length > 1 && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleNext(e); }}
            aria-label="Next"
            className="absolute right-2 sm:right-4 md:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/80 active:scale-90 backdrop-blur-md border border-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xl focus:outline-none"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Title & Subtitle - Permanently Anchored to Bottom */}
      <div 
        className="w-full shrink-0 min-h-[64px] sm:min-h-[72px] pb-4 pt-2 sm:pb-6 sm:pt-3 px-4 text-center z-30 flex flex-col items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="max-w-2xl px-2">
          <h3 className="text-white text-sm sm:text-base md:text-lg font-bold tracking-tight line-clamp-1">
            {currentItem?.title || currentItem?.alt || 'Certificate'}
          </h3>
          {(currentItem?.subtitle || currentItem?.desc) && (
            <p className="mt-0.5 text-xs sm:text-sm text-slate-400 font-medium line-clamp-1">
              {currentItem?.subtitle || currentItem?.desc}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SiteLayout({ children, selectedImage, setSelectedImage }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasAnnouncement, setHasAnnouncement] = useState(true);
  const menuToggleRef = useRef(null);



  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const isDarkActive = stored ? stored === 'dark' : document.documentElement.classList.contains('dark');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(isDarkActive);
      const root = document.documentElement;
      if (isDarkActive) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
      }
      if (stored) {
        document.cookie = `theme=${stored}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch {}
  }, []);

  const toggleTheme = () => {
    try {
      const root = document.documentElement;
      const isCurrentlyDark = root.classList.contains('dark');
      const nextDark = !isCurrentlyDark;
      const themeName = nextDark ? 'dark' : 'light';

      root.classList.add('theme-transitioning');
      if (nextDark) {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
      }
      setIsDark(nextDark);
      localStorage.setItem('theme', themeName);
      document.cookie = `theme=${themeName}; path=/; max-age=31536000; SameSite=Lax`;
      setTimeout(() => {
        root.classList.remove('theme-transitioning');
      }, 400);
    } catch {}
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
    <div className={`site-shell min-h-screen font-sans relative w-full m-0 p-0 ${hasAnnouncement ? 'has-announcement' : ''} ${theme.bg}`}>
      
      <PortfolioEntryPopup />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#065F46] focus:text-white dark:focus:bg-[#34D399] dark:focus:text-[#090B0E] focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#065F46] dark:focus:ring-[#34D399]"
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

      <nav aria-label="Main navigation" className="site-nav">
        
        <RollingAnnouncement onVisibilityChange={setHasAnnouncement} />

        <div className="site-nav-inner relative z-10">
          <Link href="/" className="site-wordmark" onClick={() => setIsMenuOpen(false)}>
            Dipesh Sapkota<span className="site-wordmark-dot">.</span>
          </Link>
          
          <ul className="site-desktop-nav list-none p-0 m-0" role="list">
            {NAV_LINKS.filter((link) => link.id !== 'home').map((link) => {
              const active = isCurrentPage(link.path);
              return (
                <li key={link.id} className="inline-flex items-center" itemScope itemType="https://schema.org/SiteNavigationElement">
                  <Link 
                    href={link.path} 
                    prefetch={true}
                    itemProp="url"
                    aria-current={active ? 'page' : undefined}
                    className={`site-nav-link ${active ? 'is-active' : ''}`}
                  >
                    <span itemProp="name">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="site-header-actions">
            <button
              type="button"
              onClick={toggleTheme}
              className="site-icon-button"
              aria-label="Toggle theme"
            >
              <svg className="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg className="w-5 h-5 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
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
                <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
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
      >
        <ul className="site-mobile-nav-list list-none p-0 m-0" role="list">
          {NAV_LINKS.map((link) => {
            const active = isCurrentPage(link.path);
            return (
              <li key={`mobile-${link.id}`} className="w-full" itemScope itemType="https://schema.org/SiteNavigationElement">
                <Link
                  href={link.path}
                  prefetch={true}
                  itemProp="url"
                  aria-current={active ? 'page' : undefined}
                  tabIndex={isMenuOpen ? 0 : -1}
                  onClick={() => setIsMenuOpen(false)}
                  className={`site-nav-link ${active ? 'is-active' : ''}`}
                >
                  <span itemProp="name">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <main 
        id="main-content" 
        tabIndex={-1} 
        className="relative z-10 w-full flex flex-col items-center outline-none"
      >
        <div key={pathname} className={`w-full flex flex-col items-center ${pathname === '/' ? '' : 'fade-down-to-up'}`}>
          {typeof children === 'function' ? children({ theme, isDark }) : children}
        </div>
      </main>

      <footer className="theme-footer pt-16 pb-12 text-xs sm:text-sm border-t w-full" role="contentinfo">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#CBD5E1] dark:border-[#222933]">

<div className="flex flex-col items-start text-left">
              <Link href="/" className="site-wordmark text-lg font-bold mb-3">
                Dipesh Sapkota<span className="site-wordmark-dot">.</span>
              </Link>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-[#A7B0BE] leading-relaxed mb-4">
                Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal. Focused on AI/ML enthusiast research, software systems, and creative digital media.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#065F46] dark:text-[#34D399] bg-[#065F46]/10 dark:bg-[#34D399]/10 px-3 py-1.5 rounded-lg mb-2">
                <span className="w-2 h-2 rounded-full bg-[#065F46] dark:bg-[#34D399] animate-pulse"></span>
                <span>Kathmandu, Nepal (UTC+5:45)</span>
              </div>
              <p className="text-[11px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                Tribhuvan University &middot; Institute of Engineering
              </p>
            </div>

<nav aria-label="Footer primary navigation" className="text-left">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0F172A] dark:text-[#F8FAFC] mb-4">
                Directory
              </h2>
              <ul className="space-y-2.5">
                {NAV_LINKS.filter((link) => link.id !== 'home').map((link) => (
                  <li key={`footer-${link.id}`} itemScope itemType="https://schema.org/SiteNavigationElement">
                    <Link
                      href={link.path}
                      itemProp="url"
                      className="footer-nav-link"
                    >
                      <span className="footer-link-arrow" aria-hidden="true">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                      <span itemProp="name" className="footer-link-text">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

<nav aria-label="Footer case studies and projects" className="text-left">
              <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0F172A] dark:text-[#F8FAFC] mb-4">
                Case Studies
              </h2>
              <ul className="space-y-2.5">
                {[
                  { href: "/projects/sportivo", label: "Sportivo — Live Scores, Fixtures & Sports News" },
                  { href: "/projects/git-visualizer", label: "Git Visualizer (DAG Internals)" },
                  { href: "/projects/ioe-admission-guide", label: "IOE Admission Guide Portal" },
                  { href: "https://instagram.com/dsz.ae", label: "Sports Reels (Instagram)", external: true },
                  { href: "/projects/555-flasher", label: "NE555 Timer Circuit Prototype" },
                  { href: "/projects/motor-modeling", label: "Electrical Machinery Modeling" },
                  { href: "/projects/analyzer-diag", label: "Clinical Analyzer Diagnostics" },
                ].map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                        <span className="footer-link-arrow" aria-hidden="true">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                        <span className="footer-link-text">{item.label}</span>
                      </a>
                    ) : (
                      <Link href={item.href} className="footer-nav-link">
                        <span className="footer-link-arrow" aria-hidden="true">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                        <span className="footer-link-text">{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

<div className="text-left flex flex-col justify-start">
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-[#0F172A] dark:text-[#F8FAFC] mb-4">
                  Verified Profiles
                </h2>
                <div className="flex flex-wrap gap-2">
                  <a href="https://github.com/dszae" target="_blank" rel="me noopener noreferrer" aria-label="My GitHub profile (dszae)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="My GitHub profile (dszae)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  </a>
                  <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on LinkedIn (dszae)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="Dipesh Sapkota on LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                  <a href="https://dev.to/dszae" target="_blank" rel="me noopener noreferrer" aria-label="My DEV Community profile (dszae)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="My DEV Community profile (dszae)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H5.34v4.36h1.22c.4 0 .69-.08.87-.25.18-.17.28-.46.28-.86v-2.16c0-.4-.1-.69-.29-.86zM20.5 2H3.5A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.94 13.08c0 .73-.24 1.3-.72 1.7-.48.4-1.16.6-2.04.6H3.6V8.62h2.58c.88 0 1.56.2 2.04.6.48.4.72.97.72 1.7v2.16zm5.12-3.26h-2.58v1.65h2.2v1.18h-2.2v1.73h2.58v1.2H9.8V8.62h4.26v1.2zm6.34 0l-1.9 6.96h-1.38l-1.9-6.96h1.44l1.15 4.79 1.15-4.79h1.44z"/></svg>
                  </a>
                  <a href="https://orcid.org/0009-0001-7595-5114" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on ORCID (0009-0001-7595-5114)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="ORCID iD (0009-0001-7595-5114)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/></svg>
                  </a>
                  <a href="https://x.com/DszAe18" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on X (DszAe18)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="Dipesh Sapkota on X (DszAe18)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on Instagram (dsz.ae)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="Dipesh Sapkota on Instagram (dsz.ae)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  </a>
                  <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on Facebook (dsz.ae)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="Dipesh Sapkota on Facebook (dsz.ae)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a>
                  <a href="https://wa.me/9779764685307" target="_blank" rel="me noopener noreferrer" aria-label="Dipesh Sapkota on WhatsApp (+977 9764685307)" className="w-9 h-9 rounded-lg border border-[#CBD5E1] dark:border-[#222933] flex items-center justify-center text-[#475569] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-colors" title="WhatsApp (+977 9764685307)">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12.031 0C5.398 0 .023 5.375.023 12.008c0 2.115.553 4.181 1.604 6.002L.004 24l6.167-1.617c1.76 1.002 3.774 1.53 5.86 1.53 6.633 0 12.008-5.375 12.008-12.005C24.039 5.375 18.664 0 12.031 0zm.005 21.905c-1.8 0-3.564-.484-5.1-1.396l-.365-.217-3.79 1.002.997-3.69-.238-.38a9.907 9.907 0 01-1.52-5.216c0-5.467 4.453-9.92 9.92-9.92 2.65 0 5.14 1.033 7.012 2.905s2.906 4.362 2.906 7.012c0 5.467-4.453 9.92-9.922 9.92zm5.438-7.433c-.298-.15-1.764-.87-2.037-.97-.273-.1-.472-.15-.672.15-.2.298-.77 1-.945 1.2-.175.2-.349.224-.647.075-.298-.15-1.258-.464-2.396-1.48-1.077-.96-1.804-2.147-2.015-2.51-.21-.362-.022-.558.127-.706.134-.134.298-.349.447-.524.15-.175.2-.298.3-.497.1-.2.05-.373-.025-.523-.075-.15-.672-1.62-.92-2.22-.242-.584-.488-.505-.671-.514-.174-.009-.373-.01-.572-.01-.2 0-.523.075-.796.373-.274.298-1.045 1.02-1.045 2.487s1.07 2.885 1.22 3.085c.15.2 2.106 3.216 5.103 4.51.713.308 1.27.493 1.704.63.716.228 1.368.196 1.883.119.574-.086 1.764-.72 2.013-1.416.248-.696.248-1.293.174-1.416-.075-.124-.274-.2-.572-.349z"/></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

<div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-[#94A3B8]">
            <p className="font-medium text-center w-full">
              &copy; {new Date().getFullYear()} <Link href="/" aria-label="Go to my home page" className="font-semibold text-[#0F172A] dark:text-[#F9FAFB] no-underline hover:no-underline">Dipesh Sapkota<span className="site-wordmark-dot">.</span></Link> All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <ScrollToTopButton />
      <AiAssistant />

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
