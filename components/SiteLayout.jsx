"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NAV_LINKS = [
  { path: '/', label: 'Home', id: 'home' },
  { path: '/about', label: 'About', id: 'about' },
  { path: '/skills', label: 'Skills', id: 'skills' },
  { path: '/resume', label: 'Resume', id: 'resume' },
  { path: '/projects', label: 'Projects', id: 'projects' },
  { path: '/gallery', label: 'Gallery', id: 'gallery' },
  { path: '/certificates', label: 'Certificates', id: 'certificates' },
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
      className="fixed bottom-6 right-6 z-50 p-3.5 bg-sky-800 dark:bg-sky-700 hover:bg-sky-700 dark:hover:bg-sky-800 text-white rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center cursor-pointer border border-sky-700/40 backdrop-blur-md"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}

export default function SiteLayout({ children, selectedImage, setSelectedImage }) {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkStored = localStorage.getItem('theme') === 'dark';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = isDarkStored || (!('theme' in localStorage) && prefersDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (selectedImage || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedImage, isMenuOpen]);

  const theme = {
    bg: isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900',
    nav: isDark ? 'bg-slate-950/95 border-slate-800 text-slate-100' : 'bg-white/95 border-slate-200 text-slate-900',
    card: isDark ? 'bg-slate-900 backdrop-blur-md border-slate-800 hover:border-sky-500 text-slate-100' : 'bg-white backdrop-blur-md border-slate-200 hover:border-sky-500 text-slate-900 shadow-sm',
    muted: isDark ? 'text-slate-400' : 'text-slate-600',
    tag: isDark ? 'bg-slate-800 text-sky-400' : 'bg-sky-50 text-sky-700',
    input: isDark ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-sky-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-sky-500'
  };

  const isCurrentPage = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${theme.bg} relative selection:bg-sky-500/30 w-full m-0 p-0`}>
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 cursor-pointer ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        onTouchStart={() => setIsMenuOpen(false)}
      />

      <nav aria-label="Main Navigation" className={`fixed top-0 left-0 w-full backdrop-blur-md border-b z-50 transition-colors duration-300 ${theme.nav}`}>
        <div className="w-full px-6 sm:px-12 h-20 flex justify-between items-center relative z-10">
          <Link href="/" className="text-2xl font-bold tracking-tight" onClick={() => setIsMenuOpen(false)}>
            Dipesh Sapkota<span className="text-sky-500">.</span>
          </Link>
          
          <div className="hidden md:flex gap-4 lg:gap-8 font-mono text-sm font-medium uppercase tracking-wider">
            {NAV_LINKS.map((link) => {
              const active = isCurrentPage(link.path);
              return (
                <Link 
                  key={link.id} 
                  href={link.path} 
                  aria-label={link.id === 'about' ? 'About section' : undefined}
                  className={`${active ? 'text-sky-500 font-bold' : 'opacity-80 hover:opacity-100'} hover:text-sky-500 transition-colors`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors shadow-sm cursor-pointer ${isDark ? 'border-slate-800 text-sky-400 hover:bg-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              aria-label="Toggle Theme Mode"
              aria-pressed={isDark}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            
            <button 
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative z-50 cursor-pointer"
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

        <div 
          id="mobile-navigation"
          className={`md:hidden absolute top-20 left-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 shadow-xl overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} ${theme.nav}`}
        >
          <div className="flex flex-col px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider space-y-6 text-center relative z-20">
            {NAV_LINKS.map((link) => {
              const active = isCurrentPage(link.path);
              return (
                <Link 
                  key={link.id} 
                  href={link.path} 
                  aria-label={link.id === 'about' ? 'About section' : undefined}
                  onClick={() => setIsMenuOpen(false)} 
                  className={`${active ? 'text-sky-500 font-bold' : ''} hover:text-sky-500 transition-colors`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col items-center">
        {typeof children === 'function' ? children({ theme, isDark }) : children}
      </main>

      <footer className={`py-8 sm:py-10 text-center font-mono text-[11px] sm:text-sm border-t w-full ${isDark ? 'border-slate-800 bg-slate-950 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'}`}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex flex-wrap justify-center gap-x-6 sm:gap-x-8 gap-y-4 mb-6 sm:mb-8">
            <a href="https://github.com/dszae" target="_blank" rel="me noreferrer" aria-label="GitHub Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </a>
            <a href="https://linkedin.com/in/dszae" target="_blank" rel="me noreferrer" aria-label="LinkedIn Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href="https://instagram.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Instagram Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
            </a>
            <a href="https://facebook.com/dsz.ae" target="_blank" rel="me noreferrer" aria-label="Facebook Profile" className="hover:text-sky-500 transition-colors">
              <svg className="w-5 h-5 sm:w-6 h-6 inline-block" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6">
            <Link href="/about" className="hover:text-sky-500 transition-colors">About</Link>
            <Link href="/skills" className="hover:text-sky-500 transition-colors">Skills</Link>
            <Link href="/resume" className="hover:text-sky-500 transition-colors">Resume</Link>
            <Link href="/projects" className="hover:text-sky-500 transition-colors">Projects</Link>
            <Link href="/gallery" className="hover:text-sky-500 transition-colors">Gallery</Link>
            <Link href="/certificates" className="hover:text-sky-500 transition-colors">Certificates</Link>
            <Link href="/experience" className="hover:text-sky-500 transition-colors">Experience</Link>
            <Link href="/blog" className="hover:text-sky-500 transition-colors">Articles</Link>
            <Link href="/contact" className="hover:text-sky-500 transition-colors">Contact</Link>
          </nav>
          <p className="font-semibold">
            &copy; {new Date().getFullYear()} <Link href="/" className="hover:text-sky-500 underline transition-colors">Dipesh Sapkota</Link>. All rights reserved.
          </p>
        </div>
      </footer>

      <ScrollToTopButton />

      {selectedImage && setSelectedImage && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage ? selectedImage.title : 'Image preview'}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 md:p-8 opacity-100 transition-opacity duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center">
            <Image 
              src={selectedImage.src} 
              alt={selectedImage.alt || selectedImage.title} 
              width={1200} 
              height={800} 
              loading="eager" 
              fetchPriority="high" 
              onClick={(e) => e.stopPropagation()} 
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl" 
            />
            
            <div className="mt-4 sm:mt-6 text-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-1 sm:mb-2">{selectedImage.title}</h3>
              <p className="text-sky-400 font-mono text-xs sm:text-sm tracking-wide uppercase font-semibold">{selectedImage.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
