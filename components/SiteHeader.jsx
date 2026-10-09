"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/experience', label: 'Experience' },
  { path: '/certificates', label: 'Certificates' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
  { path: '/gallery', label: 'Gallery' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = stored !== null ? stored === 'dark' : prefersDark;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // Fallback
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // Fallback
    }
  };

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#065F46] focus:text-white dark:focus:bg-[#34D399] dark:focus:text-[#0B0F0E] focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#065F46] dark:focus:ring-[#34D399]"
      >
        Skip to main content
      </a>
      <header
        role="banner"
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#FFFFFF]/90 dark:bg-[#0B0F0E]/90 border-b border-[#E2E8F0] dark:border-[#26352F] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-[#0F172A] dark:text-[#F9FAFB] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dipesh Sapkota<span className="text-[#065F46] dark:text-[#34D399]">.</span>
          </Link>

          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 lg:gap-3 font-mono text-[11px] lg:text-xs font-medium uppercase tracking-wider"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-colors py-2 px-2.5 rounded-lg ${
                    active
                      ? 'text-[#065F46] dark:text-[#34D399] font-bold bg-[#E2E8F0] dark:bg-[#34D399]/10'
                      : 'text-[#1E293B] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              type="button"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-[#CBD5E1] dark:border-[#26352F] text-[#065F46] dark:text-[#34D399] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-colors shadow-sm cursor-pointer"
              aria-label="Toggle Theme Mode"
            >
              <svg className="hidden dark:block w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg className="block dark:hidden w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-site-nav"
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center border border-[#CBD5E1] dark:border-[#26352F] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D] transition-colors text-[#0F172A] dark:text-[#F9FAFB]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          id="mobile-site-nav"
          className={`md:hidden absolute top-20 left-0 w-full backdrop-blur-xl bg-[#FFFFFF]/95 dark:bg-[#0B0F0E]/95 border-b border-[#CBD5E1] dark:border-[#26352F] transition-all duration-300 shadow-xl overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
          }`}
        >
          <div className="flex flex-col px-6 space-y-2 font-mono text-sm font-medium uppercase tracking-wider text-center">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 px-4 rounded-lg transition-colors ${
                    active
                      ? 'text-[#065F46] dark:text-[#34D399] font-bold bg-[#E2E8F0] dark:bg-[#34D399]/10'
                      : 'text-[#1E293B] dark:text-[#A7B0BE] hover:text-[#065F46] dark:hover:text-[#34D399] hover:bg-[#F1F5F9] dark:hover:bg-[#16221D]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Backdrop for mobile */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-[#0B0F0E]/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
