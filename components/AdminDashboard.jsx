"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({ initialCertificates, initialGallery }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('certificates');
  
  // Certificates state
  const [certificates, setCertificates] = useState(initialCertificates || []);
  const [certTitle, setCertTitle] = useState('');
  const [certOrg, setCertOrg] = useState('Udemy');
  const [certCategory, setCertCategory] = useState('Design');
  const [certUrl, setCertUrl] = useState('');
  const [certFile, setCertFile] = useState(null);
  const [certLoading, setCertLoading] = useState(false);
  const [certMessage, setCertMessage] = useState({ text: '', type: '' });

  // Gallery state
  const [gallery, setGallery] = useState(initialGallery || []);
  const [galTitle, setGalTitle] = useState('');
  const [galAlt, setGalAlt] = useState('');
  const [galCategory, setGalCategory] = useState('Campus');
  const [galFile, setGalFile] = useState(null);
  const [galLoading, setGalLoading] = useState(false);
  const [galMessage, setGalMessage] = useState({ text: '', type: '' });

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    if (!certFile && !certUrl) {
      setCertMessage({ text: 'Please choose an image file to upload', type: 'error' });
      return;
    }

    setCertLoading(true);
    setCertMessage({ text: '', type: '' });

    try {
      let imageUrl = certUrl;
      if (certFile) {
        imageUrl = await uploadFile(certFile);
      }

      const res = await fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: certTitle,
          org: certOrg,
          category: certCategory,
          img: imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save certificate');

      setCertificates((prev) => [...prev, data.certificate]);
      setCertTitle('');
      setCertUrl('');
      setCertFile(null);
      setCertMessage({ text: 'Certificate successfully added and published live!', type: 'success' });
    } catch (err) {
      setCertMessage({ text: err.message, type: 'error' });
    } finally {
      setCertLoading(false);
    }
  };

  const handleDeleteCertificate = async (id) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;

    try {
      const res = await fetch(`/api/admin/certificates?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setCertificates((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddGalleryImage = async (e) => {
    e.preventDefault();
    if (!galFile) {
      setGalMessage({ text: 'Please select a photo file to upload', type: 'error' });
      return;
    }

    setGalLoading(true);
    setGalMessage({ text: '', type: '' });

    try {
      const imageUrl = await uploadFile(galFile);

      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: galTitle,
          alt: galAlt || galTitle,
          category: galCategory,
          img: imageUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save gallery photo');

      setGallery((prev) => [...prev, data.image]);
      setGalTitle('');
      setGalAlt('');
      setGalFile(null);
      setGalMessage({ text: 'Photo uploaded and published to gallery live!', type: 'success' });
    } catch (err) {
      setGalMessage({ text: err.message, type: 'error' });
    } finally {
      setGalLoading(false);
    }
  };

  const handleDeleteGalleryImage = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery photo?')) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      setGallery((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-slate-100">
      {/* Top Navigation Bar */}
      <header className="border-b border-[#222933] bg-[#0F1216]/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg text-white font-sans tracking-tight">
              Dipesh Sapkota<span className="text-[#34D399]">.</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#065F46]/20 border border-[#34D399]/30 text-[#34D399]">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-mono text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>View Live Site</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs font-mono px-3 py-1.5 rounded-lg border border-[#30363D] hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 mb-8 border-b border-[#222933] pb-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-[#34D399] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#161B22]'
            }`}
          >
            Certificates [{certificates.length}]
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#34D399] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#161B22]'
            }`}
          >
            Gallery Photos [{gallery.length}]
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'bg-[#34D399] text-slate-950 font-bold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-[#161B22]'
            }`}
          >
            Database &amp; SQL Setup
          </button>
        </div>

        {/* TAB 1: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl border border-[#222933] bg-[#0F1216] sticky top-24">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]"></span>
                  Add New Certificate
                </h2>
                <p className="text-xs text-slate-400 mb-6">
                  Upload an image to Supabase Storage and publish directly to /certificates.
                </p>

                {certMessage.text && (
                  <div className={`p-3 rounded-xl text-xs font-mono mb-4 ${
                    certMessage.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                  }`}>
                    {certMessage.text}
                  </div>
                )}

                <form onSubmit={handleAddCertificate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Certificate Title</label>
                    <input
                      type="text"
                      value={certTitle}
                      onChange={(e) => setCertTitle(e.target.value)}
                      placeholder="e.g. Machine Learning Specialization"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-white text-xs focus:border-[#34D399] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Issuing Organization</label>
                    <input
                      type="text"
                      value={certOrg}
                      onChange={(e) => setCertOrg(e.target.value)}
                      placeholder="e.g. DeepLearning.AI, Udemy, Coursera"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-white text-xs focus:border-[#34D399] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Category</label>
                    <select
                      value={certCategory}
                      onChange={(e) => setCertCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-white text-xs focus:border-[#34D399] focus:outline-none"
                    >
                      <option value="Design">Graphic &amp; UI Design</option>
                      <option value="Motion">Motion Design</option>
                      <option value="Video">Video &amp; Color Grading</option>
                      <option value="Development">Software Development</option>
                      <option value="AI/ML">AI &amp; Machine Learning</option>
                      <option value="Marketing">Digital Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Upload Image / PDF</label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setCertFile(e.target.files?.[0] || null)}
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1F242C] file:text-[#34D399] hover:file:bg-[#2A313C] cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={certLoading}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-[#34D399] text-slate-950 hover:bg-[#6EE7B7] disabled:opacity-50 transition-all cursor-pointer shadow-md mt-2"
                  >
                    {certLoading ? 'Uploading & Publishing...' : 'Upload & Publish Certificate'}
                  </button>
                </form>
              </div>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase text-slate-400">
                Published Certificates ({certificates.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl border border-[#222933] bg-[#0F1216] flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border border-[#222933] mb-3">
                        <Image
                          src={cert.img}
                          alt={cert.title}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#161B22] text-[#34D399] border border-[#34D399]/20">
                        {cert.org}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 line-clamp-1">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#222933] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">ID: {cert.id}</span>
                      <button
                        onClick={() => handleDeleteCertificate(cert.id)}
                        className="text-xs font-mono text-rose-400 hover:text-rose-300 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GALLERY PHOTOS */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-2xl border border-[#222933] bg-[#0F1216] sticky top-24">
                <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]"></span>
                  Upload Gallery Photo
                </h2>
                <p className="text-xs text-slate-400 mb-6">
                  Add photos of campus events, achievements, field visits, or creative sessions.
                </p>

                {galMessage.text && (
                  <div className={`p-3 rounded-xl text-xs font-mono mb-4 ${
                    galMessage.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
                  }`}>
                    {galMessage.text}
                  </div>
                )}

                <form onSubmit={handleAddGalleryImage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Photo Title / Caption</label>
                    <input
                      type="text"
                      value={galTitle}
                      onChange={(e) => setGalTitle(e.target.value)}
                      placeholder="e.g. Yathartha National Tech Festival"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-white text-xs focus:border-[#34D399] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Alt Description (SEO)</label>
                    <input
                      type="text"
                      value={galAlt}
                      onChange={(e) => setGalAlt(e.target.value)}
                      placeholder="e.g. Engineering students presenting IoT project on stage"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-white text-xs focus:border-[#34D399] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Category</label>
                    <select
                      value={galCategory}
                      onChange={(e) => setGalCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#161B22] border border-[#30363D] text-white text-xs focus:border-[#34D399] focus:outline-none"
                    >
                      <option value="Campus">Campus Life &amp; Lectures</option>
                      <option value="Events">Tech Festivals &amp; Exhibitions</option>
                      <option value="Sports">Sports &amp; Athletics</option>
                      <option value="Team">Team &amp; Community</option>
                      <option value="Field Visit">Field Visits &amp; Engineering</option>
                      <option value="Creative">Creative Editing Sessions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Select Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setGalFile(e.target.files?.[0] || null)}
                      required
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#1F242C] file:text-[#34D399] hover:file:bg-[#2A313C] cursor-pointer"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={galLoading}
                    className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-[#34D399] text-slate-950 hover:bg-[#6EE7B7] disabled:opacity-50 transition-all cursor-pointer shadow-md mt-2"
                  >
                    {galLoading ? 'Uploading Photo...' : 'Upload & Publish Photo'}
                  </button>
                </form>
              </div>
            </div>

            {/* List Column */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase text-slate-400">
                Published Gallery Photos ({gallery.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl border border-[#222933] bg-[#0F1216] flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-900 border border-[#222933] mb-2">
                        <Image
                          src={item.img}
                          alt={item.alt || item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-white line-clamp-2">
                        {item.title}
                      </h4>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#222933] flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
                      <button
                        onClick={() => handleDeleteGalleryImage(item.id)}
                        className="text-xs font-mono text-rose-400 hover:text-rose-300 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DATABASE SETUP */}
        {activeTab === 'database' && (
          <div className="max-w-4xl mx-auto p-8 rounded-2xl border border-[#222933] bg-[#0F1216]">
            <h2 className="text-xl font-bold text-white mb-2">
              Supabase Database &amp; Storage Setup
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              To connect your database, open your Supabase project dashboard, navigate to the <strong>SQL Editor</strong> on the left, paste the SQL script below, and click <strong>Run</strong>. This will create your tables and storage bucket.
            </p>

            <div className="p-4 rounded-xl bg-[#090B0E] border border-[#222933] font-mono text-xs text-slate-300 overflow-x-auto max-h-96">
              <pre>{`-- 1. Create Certificates Table
CREATE TABLE IF NOT EXISTS public.certificates (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    org TEXT NOT NULL,
    img TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    credential_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Gallery Images Table
CREATE TABLE IF NOT EXISTS public.gallery_images (
    id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    alt TEXT NOT NULL,
    img TEXT NOT NULL,
    category TEXT DEFAULT 'Campus',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Public Read
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery_images FOR SELECT USING (true);

-- 4. Create Public Media Storage Bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-media');
CREATE POLICY "Service Role Storage All" ON storage.objects FOR ALL USING (bucket_id = 'portfolio-media');`}</pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
