"use client";

import React from 'react';
import Link from 'next/link';

export default function PagePagination({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <nav 
      aria-label="Sequential page navigation" 
      className="w-full max-w-6xl mx-auto px-4 sm:px-8 mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-slate-200 dark:border-[#26372F]"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {prev ? (
          <Link
            href={prev.path}
            className="group flex-1 flex items-center gap-4 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 hover:bg-slate-50 dark:hover:bg-[#16221D] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-[#34D399]"
            aria-label={`Previous page: ${prev.label}`}
          >
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#16221D] border border-slate-200 dark:border-[#26372F] flex items-center justify-center text-[#065F46] dark:text-[#34D399] group-hover:-translate-x-1 transition-transform flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] font-bold">
                Previous
              </span>
              <span className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors">
                {prev.label}
              </span>
            </div>
          </Link>
        ) : (
          <div className="hidden sm:block flex-1" />
        )}

        {next && (
          <Link
            href={next.path}
            className="group flex-1 flex items-center justify-between sm:justify-end gap-4 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-[#26372F] bg-white dark:bg-[#111B17] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 hover:bg-slate-50 dark:hover:bg-[#16221D] transition-all shadow-sm text-right focus:outline-none focus:ring-2 focus:ring-[#065F46] dark:focus:ring-[#34D399]"
            aria-label={`Next page: ${next.label}`}
          >
            <div className="flex flex-col text-left sm:text-right">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-[#64748B] dark:text-[#94A3B8] font-bold">
                Next
              </span>
              <span className="font-semibold text-sm sm:text-base text-[#0F172A] dark:text-[#F9FAFB] group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors">
                {next.label}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-[#16221D] border border-slate-200 dark:border-[#26372F] flex items-center justify-center text-[#065F46] dark:text-[#34D399] group-hover:translate-x-1 transition-transform flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

