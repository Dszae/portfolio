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

  return (
    <motion.div 
      key="image-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={image ? image.title : 'Image preview'}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-10 cursor-pointer"
      onClick={onClose}
    >
      <motion.div 
        key="image-lightbox-card"
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 10 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-auto max-h-[90vh] flex flex-col items-center justify-center cursor-default select-none"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 dark:border-[#34D399]/30 ring-1 ring-black/20 dark:ring-[#34D399]/20 bg-[#0B0F0E]">
          <Image 
            src={image.src} 
            alt={image.alt || image.title} 
            width={1200} 
            height={800} 
            loading="eager" 
            priority
            onLoad={() => setImageLoaded(true)}
            className={`max-w-full max-h-[75vh] w-auto h-auto object-contain block transition-opacity duration-300 ease-out ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`} 
          />
        </div>
        
        <div className="mt-4 sm:mt-5 text-center px-4">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#F5F7F5] mb-1">{image.title}</h3>
          <p className="text-[#065F46] dark:text-[#34D399] font-mono text-xs tracking-wider uppercase font-semibold">{image.desc}</p>
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

      <nav aria-label="Main navigation" className="site-nav">
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
                  aria-current={active ? 'page' : undefined}
                  className={`site-nav-link ${active ? 'is-active' : ''}`}
                >
                  {link.label}
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

      <div
        id="mobile-navigation"
        className={`site-mobile-nav ${isMenuOpen ? 'is-open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="site-mobile-nav-list">
          {NAV_LINKS.map((link) => {
            const active = isCurrentPage(link.path);
            return (
              <Link
                key={`mobile-${link.id}`}
                href={link.path}
                aria-current={active ? 'page' : undefined}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
                className={`site-nav-link ${active ? 'is-active' : ''}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <main id="main-content" tabIndex={-1} className="relative z-10 w-full flex flex-col items-center outline-none">
        {typeof children === 'function' ? children({ theme, isDark }) : children}
      </main>

      <footer className="theme-footer py-8 sm:py-10 text-center text-xs sm:text-sm border-t w-full">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-7 gap-y-3 mb-6 sm:mb-8">
            <a href="https://github.com/dszae" target="_blank" rel="me noreferrer" aria-label="GitHub Profile" className="site-footer-link transition-colors p-1" title="GitHub">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noreferrer" aria-label="LinkedIn Profile" className="site-footer-link transition-colors p-1" title="LinkedIn">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://x.com/dsz_ae" target="_blank" rel="me noreferrer" aria-label="X (Twitter) Profile" className="site-footer-link transition-colors p-1" title="X (Twitter)">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://hashnode.com/@dszae" target="_blank" rel="me noreferrer" aria-label="Hashnode Tech Blog" className="site-footer-link transition-colors p-1" title="Hashnode Blog">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M22.351 8.019l-6.37-6.37a2.532 2.532 0 0 0-3.58 0L9.98 4.07 19.93 14.02l2.421-2.421a2.532 2.532 0 0 0 0-3.58zM1.649 15.981l6.37 6.37a2.532 2.532 0 0 0 3.58 0l2.421-2.421-9.95-9.95-2.421 2.421a2.532 2.532 0 0 0 0 3.58z"/></svg>
            </a>
            <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Instagram Profile" className="site-footer-link transition-colors p-1" title="Instagram">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Facebook Profile" className="site-footer-link transition-colors p-1" title="Facebook">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="https://tiktok.com/@dsz_ae" target="_blank" rel="me noreferrer" aria-label="TikTok Profile" className="site-footer-link transition-colors p-1" title="TikTok">
              <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.53 3.91-1.63 5.49-1.61 2.31-4.32 3.82-7.16 3.99-2.03.12-4.11-.43-5.78-1.66-2.19-1.61-3.48-4.24-3.35-6.99.11-2.45 1.3-4.83 3.23-6.28 1.79-1.35 4.15-1.87 6.37-1.44v4.18c-1.16-.36-2.46-.3-3.56.24-.95.46-1.68 1.36-1.88 2.4-.33 1.72.76 3.5 2.44 3.96 1.48.41 3.16-.16 4.02-1.44.42-.62.62-1.38.62-2.14V.02z"/></svg>
            </a>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6">
            {NAV_LINKS.map((link) => (
              <Link 
                key={`footer-${link.id}`} 
                href={link.path} 
                className="site-footer-link transition-colors"
              >
                {link.label}
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
