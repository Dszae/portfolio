'use client';

import React, { useEffect } from 'react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#080B10] text-[#F1F5F9] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md w-full bg-[#0F141F] border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 font-mono font-bold text-lg">
            !
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Application Error</h1>
          <p className="text-sm text-slate-400 mb-6">
            A critical error occurred. Please try reloading the page.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Reload application
          </button>
        </div>
      </body>
    </html>
  );
}
