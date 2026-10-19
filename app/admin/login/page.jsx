"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message || 'Incorrect admin password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#090B0E] text-slate-100 px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-3xl border border-[#222933] bg-[#0F1216] shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#065F46]/20 border border-[#34D399]/30 text-[#34D399] mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Portfolio Admin
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Dipesh Sapkota &middot; Content Management System
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono font-medium text-slate-300 mb-2">
              Admin Master Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter master password..."
              required
              className="w-full px-4 py-3 rounded-xl bg-[#161B22] border border-[#30363D] text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#34D399] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-[#34D399] text-slate-950 hover:bg-[#6EE7B7] disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-[#34D399]/10"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#222933] text-center">
          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-[#34D399] transition-colors">
            &larr; Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}

