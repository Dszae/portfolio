"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/resume', label: 'Resume' },
  { path: '/projects', label: 'Projects' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/certificates', label: 'Certificates' },
  { path: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dipesh Sapkota<span className="text-sky-500">.</span>
          </Link>

          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-3 lg:gap-6 font-mono text-xs lg:text-sm font-medium uppercase tracking-wider"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`transition-colors py-2 px-2.5 rounded-lg ${
                    active
                      ? 'text-sky-600 dark:text-sky-400 font-bold bg-sky-500/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-site-nav"
              className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-700 dark:text-slate-200"
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
          className={`md:hidden absolute top-20 left-0 w-full backdrop-blur-xl bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 shadow-xl overflow-hidden ${
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
                      ? 'text-sky-600 dark:text-sky-400 font-bold bg-sky-500/10'
                      : 'text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-900'
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
          className="md:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}

