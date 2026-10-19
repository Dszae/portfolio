"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard({
  initialCertificates = [],
  initialGallery = [],
  initialProjects = [],
  initialArticles = [],
  initialSkills = [],
  initialExperiences = [],
  initialSettings = {},
  initialMessages = []
}) {
  const router = useRouter();

  // Active view state
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Notification Banner
  const [notification, setNotification] = useState({ text: '', type: '' });

  // Confirmation modal state for destructive actions
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', onConfirm: null });

  // Real Entities State
  const [certificates, setCertificates] = useState(initialCertificates);
  const [gallery, setGallery] = useState(initialGallery);
  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [skills, setSkills] = useState(initialSkills);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [settings, setSettings] = useState(initialSettings);
  const [messages, setMessages] = useState(initialMessages);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Form states for modals
  const [editingItem, setEditingItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  // Health audit state
  const [linkCheckStatus, setLinkCheckStatus] = useState({ running: false, results: [] });

  const notify = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification({ text: '', type: '' });
    }, 4500);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin/login');
    router.refresh();
  };

  const uploadFile = async (file) => {
    setUploadingMedia(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      return data.url;
    } finally {
      setUploadingMedia(false);
    }
  };

  // Fetch Media Library
  const fetchMedia = async () => {
    setMediaLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setMediaFiles(data.files || []);
    } catch {
      notify('Failed to load media files from storage', 'error');
    } finally {
      setMediaLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'media') {
      fetchMedia();
    }
  }, [activeTab]);

  // Save Site-wide Settings
  const saveSettingSection = async (key, value) => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }
      setSettings(prev => ({ ...prev, [key]: value }));
      notify(`${key.charAt(0).toUpperCase() + key.slice(1)} settings saved to live portfolio!`);
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  // 1-Click JSON Backup Export
  const handleExportBackup = () => {
    window.open('/api/admin/backup', '_blank');
    notify('Exporting full database JSON backup...');
  };

  // Real Navigation Sections Matching dipeshsapkota7.com.np
  const navItems = [
    { id: 'overview', label: 'Executive Overview', badge: 'Live', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'profile', label: 'About & Profile (/about)', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'skills', label: 'Technical Skills (/skills)', count: skills.length, icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
    { id: 'projects', label: 'Projects Showcase (/projects)', count: projects.length, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { id: 'articles', label: 'Articles & Blog (/blog)', count: articles.length, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
    { id: 'certificates', label: 'Certificates (/certificates)', count: certificates.length, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
    { id: 'experience', label: 'Resume & Career (/resume)', count: experiences.length, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
    { id: 'gallery', label: 'Photo Gallery (/gallery)', count: gallery.length, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'inbox', label: 'Contact Inquiries (/contact)', count: messages.filter(m => !m.is_read).length, highlight: true, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { id: 'announcements', label: 'Popup & Rolling Banner', badge: (settings.announcement?.is_active || settings.popup?.is_active) ? 'Active' : undefined, icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { id: 'media', label: 'Media Bucket (Storage)', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
    { id: 'seo', label: 'SEO & Google Sitelinks', badge: '100%', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
    { id: 'database', label: 'Database & Backup', badge: 'Supabase', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
  ];

  return (
    <div className="min-h-screen bg-[#070A0F] text-slate-100 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-slate-950">

      {/* Top Global Notification Toast */}
      {notification.text && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold backdrop-blur-md transition-all ${
          notification.type === 'error'
            ? 'bg-rose-500/90 text-white border border-rose-400/50'
            : 'bg-emerald-500/90 text-slate-950 border border-emerald-300'
        }`}>
          <span>{notification.text}</span>
          <button onClick={() => setNotification({ text: '', type: '' })} className="opacity-80 hover:opacity-100 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0E131F] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">{confirmModal.title}</h3>
            <p className="text-xs text-slate-300 mb-6">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-medium text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmModal.onConfirm) confirmModal.onConfirm();
                  setConfirmModal({ open: false, title: '', message: '', onConfirm: null });
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md shadow-emerald-500/20">
              DS
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-tight">Dipesh Sapkota · Control Center</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                Production CMS
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700/60"
          >
            <span>View Live Site</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#090D15] border-r border-slate-800/80 pt-16 lg:pt-0 transform lg:translate-x-0 transition-transform duration-200 ease-in-out lg:static ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-4rem)]">
            <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
              Site Management
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <svg className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">

          {/* ============================================================== */}
          {/* TAB 1: EXECUTIVE OVERVIEW */}
          {/* ============================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">Portfolio Operations & Content Hub</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage content, media, credentials, and settings across dipeshsapkota7.com.np.</p>
                </div>
                <div className="flex gap-2">
                  <a href="https://tihkvcybdvvovmnvkdrx.supabase.co" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5 border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Supabase Live</span>
                  </a>
                  <button onClick={handleExportBackup} className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold">
                    Backup JSON
                  </button>
                </div>
              </div>

              {/* 6 Quick Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div onClick={() => setActiveTab('projects')} className="bg-[#0E131F] border border-slate-800 p-3.5 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-[11px] text-slate-400 font-medium truncate">Projects</div>
                  <div className="text-2xl font-bold text-white mt-1">{projects.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1 truncate">/projects →</div>
                </div>
                <div onClick={() => setActiveTab('articles')} className="bg-[#0E131F] border border-slate-800 p-3.5 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-[11px] text-slate-400 font-medium truncate">Articles</div>
                  <div className="text-2xl font-bold text-white mt-1">{articles.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1 truncate">/blog →</div>
                </div>
                <div onClick={() => setActiveTab('certificates')} className="bg-[#0E131F] border border-slate-800 p-3.5 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-[11px] text-slate-400 font-medium truncate">Certificates</div>
                  <div className="text-2xl font-bold text-white mt-1">{certificates.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1 truncate">/certificates →</div>
                </div>
                <div onClick={() => setActiveTab('skills')} className="bg-[#0E131F] border border-slate-800 p-3.5 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-[11px] text-slate-400 font-medium truncate">Skills</div>
                  <div className="text-2xl font-bold text-white mt-1">{skills.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1 truncate">/skills →</div>
                </div>
                <div onClick={() => setActiveTab('gallery')} className="bg-[#0E131F] border border-slate-800 p-3.5 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-[11px] text-slate-400 font-medium truncate">Gallery</div>
                  <div className="text-2xl font-bold text-white mt-1">{gallery.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1 truncate">/gallery →</div>
                </div>
                <div onClick={() => setActiveTab('inbox')} className="bg-[#0E131F] border border-slate-800 p-3.5 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-[11px] text-slate-400 font-medium truncate">Inquiries</div>
                  <div className="text-2xl font-bold text-white mt-1">{messages.length}</div>
                  <div className="text-[10px] text-emerald-400 mt-1 truncate">/contact →</div>
                </div>
              </div>

              {/* Website System Engine Architecture */}
              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Architecture & Zero-Downtime Fallback Verification</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Rendering Mode</span>
                    <h4 className="font-bold text-white text-sm">Static ISR Server Components</h4>
                    <p className="text-slate-400 text-[11px]">Pages are pre-rendered into static HTML for 100% Googlebot sitelink indexing and zero latency.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Revalidation</span>
                    <h4 className="font-bold text-white text-sm">On-Demand revalidatePath</h4>
                    <p className="text-slate-400 text-[11px]">Whenever you make an update, Next.js instantly purges the cache and regenerates the page.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Database Security</span>
                    <h4 className="font-bold text-white text-sm">Private Server-Role Isolation</h4>
                    <p className="text-slate-400 text-[11px]">No credentials are exposed to the browser. All database interactions happen securely inside Server Actions and API handlers.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: CERTIFICATES MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Certificates & Accreditations</h1>
                  <p className="text-xs text-slate-400 mt-1">Live management for credentials displayed on <Link href="/certificates" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/certificates</Link>.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Design', org: 'Udemy' }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <span>+ Add Certificate</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-[#0E131F] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                    <div className="relative aspect-video w-full bg-slate-900">
                      {cert.img ? (
                        <Image src={cert.img} alt={cert.title} fill unoptimized={Boolean(cert.img?.startsWith('http'))} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No Image</div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] uppercase">{cert.category}</span>
                        <h4 className="font-bold text-xs text-white mt-2 line-clamp-2">{cert.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{cert.org}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between text-xs">
                        <button
                          onClick={() => { setEditingItem(cert); setEditModalOpen(true); }}
                          className="text-emerald-400 hover:underline text-[11px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: 'Delete Certificate',
                              message: `Delete certificate "${cert.title}"?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/certificates?id=${cert.id}`, { method: 'DELETE' });
                                setCertificates(prev => prev.filter(c => c.id !== cert.id));
                                notify('Certificate removed from live site.');
                              }
                            });
                          }}
                          className="text-rose-400 hover:text-rose-300 text-[11px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: PHOTO GALLERY MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Life & Campus Photo Gallery</h1>
                  <p className="text-xs text-slate-400 mt-1">Live management for images on <Link href="/gallery" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/gallery</Link>.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Campus' }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <span>+ Add Photo to Gallery</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-[#0E131F] border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                    <div className="relative aspect-video w-full bg-slate-900">
                      {item.img ? (
                        <Image src={item.img} alt={item.alt || item.title} fill unoptimized={Boolean(item.img?.startsWith('http'))} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No Preview</div>
                      )}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 font-mono text-[10px]">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-white line-clamp-2">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">Alt: {item.alt}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between text-xs">
                        <button
                          onClick={() => { setEditingItem(item); setEditModalOpen(true); }}
                          className="text-emerald-400 hover:underline text-[11px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: 'Delete Photo',
                              message: `Delete "${item.title}" from gallery?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/gallery?id=${item.id}`, { method: 'DELETE' });
                                setGallery(prev => prev.filter(g => g.id !== item.id));
                                notify('Photo removed from /gallery.');
                              }
                            });
                          }}
                          className="text-rose-400 hover:text-rose-300 text-[11px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: PROJECTS SHOWCASE */}
          {/* ============================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Engineering & Software Projects</h1>
                  <p className="text-xs text-slate-400 mt-1">Live showcase projects featured on <Link href="/projects" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/projects</Link>.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'dev', category_label: 'Development', status: 'published', featured: false, tech: [] }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  + Add Project
                </button>
              </div>

              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/80 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-4">Project</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Tech Stack</th>
                      <th className="p-4">Featured</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {projects.map((proj) => (
                      <tr key={proj.id || proj.slug} className="hover:bg-slate-900/40">
                        <td className="p-4">
                          <div className="font-bold text-white">{proj.title}</div>
                          <span className="text-[11px] text-slate-400 font-mono">/{proj.slug}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] uppercase">
                            {proj.category_label || proj.category}
                          </span>
                        </td>
                        <td className="p-4 max-w-xs truncate text-[11px] text-slate-400">
                          {Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech}
                        </td>
                        <td className="p-4 font-mono">
                          {proj.featured ? <span className="text-emerald-400 font-bold">★ Yes</span> : 'No'}
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => { setEditingItem(proj); setEditModalOpen(true); }}
                            className="text-emerald-400 hover:text-emerald-300 px-2 py-1 rounded bg-slate-800 text-[11px]"
                          >
                            Edit
                          </button>
                          {proj.live_url && (
                            <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-[11px]">Demo ↗</a>
                          )}
                          <button
                            onClick={() => {
                              setConfirmModal({
                                open: true,
                                title: 'Delete Project',
                                message: `Delete project "${proj.title}"?`,
                                onConfirm: async () => {
                                  if (proj.id) await fetch(`/api/admin/projects?id=${proj.id}`, { method: 'DELETE' });
                                  setProjects(prev => prev.filter(p => p.slug !== proj.slug));
                                  notify('Project removed.');
                                }
                              });
                            }}
                            className="text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 text-[11px]"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: ARTICLES & BLOG MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'articles' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Engineering Articles & Blog</h1>
                  <p className="text-xs text-slate-400 mt-1">Live articles published on <Link href="/blog" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/blog</Link>.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Engineering', read_time: '6 min read', status: 'published' }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <span>+ New Article</span>
                </button>
              </div>

              <div className="space-y-4">
                {articles.map((art) => (
                  <div key={art.id || art.slug} className="bg-[#0E131F] border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-all">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] uppercase">{art.category}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{art.read_time}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">{art.status}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white truncate">{art.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{art.excerpt}</p>
                      <div className="text-[11px] text-slate-500 font-mono">Slug: /blog/{art.slug}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { setEditingItem(art); setEditModalOpen(true); }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <Link
                        href="/blog"
                        target="_blank"
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                      >
                        View on Site ↗
                      </Link>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: 'Delete Article',
                            message: `Delete article "${art.title}"?`,
                            onConfirm: async () => {
                              await fetch(`/api/admin/blog?id=${art.id}`, { method: 'DELETE' });
                              setArticles(prev => prev.filter(a => a.id !== art.id));
                              notify('Article removed from /blog.');
                            }
                          });
                        }}
                        className="text-rose-400 hover:text-rose-300 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: SKILLS & TECHNICAL COMPETENCIES */}
          {/* ============================================================== */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Skills & Technical Competencies</h1>
                  <p className="text-xs text-slate-400 mt-1">Manage competencies displayed on <Link href="/skills" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/skills</Link>.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Development', description: '' }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  + Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((s) => (
                  <div key={s.id || s.name} className="bg-[#0E131F] border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-emerald-500/40 transition-all">
                    <div className="flex-1 min-w-0 mr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-xs truncate">{s.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px] uppercase font-mono">{s.category}</span>
                      </div>
                      {s.description && (
                        <p className="text-[11px] text-slate-400 truncate">{s.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => { setEditingItem(s); setEditModalOpen(true); }}
                        className="px-2.5 py-1 bg-slate-800 text-emerald-400 text-xs rounded hover:bg-slate-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: 'Delete Skill',
                            message: `Delete skill "${s.name}"?`,
                            onConfirm: async () => {
                              if (s.id) await fetch(`/api/admin/skills?id=${s.id}`, { method: 'DELETE' });
                              setSkills(prev => prev.filter(item => item.name !== s.name));
                              notify('Skill deleted.');
                            }
                          });
                        }}
                        className="px-2 py-1 bg-rose-500/10 text-rose-400 text-xs rounded hover:bg-rose-500/20"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 7: EDUCATION & CAREER TIMELINE */}
          {/* ============================================================== */}
          {activeTab === 'experience' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Education & Career Timeline</h1>
                  <p className="text-xs text-slate-400 mt-1">Timeline entries displayed on <Link href="/resume" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/resume</Link>.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ type: 'experience', is_current: true }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  + Add Timeline Entry
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id || exp.title} className="bg-[#0E131F] border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-emerald-500/40 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] uppercase">{exp.type}</span>
                        {exp.is_current && <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">Current</span>}
                      </div>
                      <h3 className="text-sm font-bold text-white">{exp.title}</h3>
                      <p className="text-xs text-slate-300 font-medium">{exp.organization} · {exp.location}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{exp.start_date} – {exp.end_date || 'Present'}</p>
                      <p className="text-xs text-slate-400 mt-2 max-w-2xl">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingItem(exp); setEditModalOpen(true); }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: 'Delete Timeline Entry',
                            message: `Delete "${exp.title}"?`,
                            onConfirm: async () => {
                              if (exp.id) await fetch(`/api/admin/experience?id=${exp.id}`, { method: 'DELETE' });
                              setExperiences(prev => prev.filter(e => e.id !== exp.id));
                              notify('Timeline entry removed.');
                            }
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: PROFILE & PERSONAL BRANDING */}
          {/* ============================================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Personal Profile & Personal Branding</h1>
                <p className="text-xs text-slate-400 mt-1">Updates your live bio, tagline, and availability badge across the site.</p>
              </div>

              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={settings.profile?.name || 'Dipesh Sapkota'}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, name: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Professional Tagline</label>
                  <input
                    type="text"
                    value={settings.profile?.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, tagline: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">About Headline</label>
                  <input
                    type="text"
                    value={settings.profile?.headline || 'Bridging Logic and Visual Execution'}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, headline: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Primary Bio</label>
                  <textarea
                    rows={4}
                    value={settings.profile?.bio || ''}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, bio: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Secondary Bio (Creative & Engineering Convergence)</label>
                  <textarea
                    rows={3}
                    value={settings.profile?.secondary_bio || ''}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, secondary_bio: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none leading-relaxed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Years Experience Badge</label>
                    <input
                      type="text"
                      value={settings.profile?.years_experience || '4+'}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, years_experience: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Global Clients Badge</label>
                    <input
                      type="text"
                      value={settings.profile?.clients_count || '50+'}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, clients_count: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Professional Availability Status</label>
                  <input
                    type="text"
                    value={settings.profile?.availability_status || ''}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, availability_status: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    placeholder="Available for freelance projects & engineering roles"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={settings.profile?.location || 'Kathmandu, Nepal'}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, location: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Resume Download URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settings.profile?.resume_url || '/my_cv.pdf'}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, resume_url: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                    />
                    <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-200 font-semibold flex items-center whitespace-nowrap">
                      <span>{uploadingMedia ? 'Uploading...' : 'Upload PDF'}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        disabled={uploadingMedia}
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            try {
                              notify('Uploading PDF...');
                              const url = await uploadFile(f);
                              setSettings(prev => ({ ...prev, profile: { ...prev.profile, resume_url: url } }));
                              notify('Resume updated!');
                            } catch (err) {
                              notify(err.message, 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('profile', settings.profile)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Save Profile to Website
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 9: CONTACT INBOX */}
          {/* ============================================================== */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Contact Form Inquiries</h1>
                <p className="text-xs text-slate-400 mt-1">Incoming inquiries submitted to <Link href="/contact" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/contact</Link>.</p>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="p-12 text-center bg-[#0E131F] border border-slate-800 rounded-2xl space-y-3">
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 text-emerald-400 flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="text-sm font-bold text-white">Your Inbox is Clean</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      No incoming inquiries yet. When a visitor submits the contact form on <Link href="/contact" target="_blank" className="text-emerald-400 hover:underline">dipeshsapkota7.com.np/contact</Link>, their submission will appear here in real time.
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="bg-[#0E131F] border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-emerald-500/40 transition-all">
                      <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-800">
                        <div>
                          <span className="font-bold text-white text-sm">{msg.name}</span>
                          <span className="text-emerald-400 font-mono text-xs ml-2">({msg.email})</span>
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">{new Date(msg.created_at).toLocaleString()}</span>
                      </div>
                      {msg.subject && (
                        <div className="text-xs text-slate-200 font-bold bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800 inline-block">
                          {msg.subject}
                        </div>
                      )}
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-900/30 p-4 rounded-xl border border-slate-800/60">
                        {msg.message}
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: 'Delete Inquiry',
                              message: `Delete inquiry from "${msg.name}"?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/messages?id=${msg.id}`, { method: 'DELETE' });
                                setMessages(prev => prev.filter(m => m.id !== msg.id));
                                notify('Inquiry deleted from inbox.');
                              }
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl text-rose-400 hover:bg-rose-500/10 text-xs font-medium transition-colors"
                        >
                          Delete Message
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(msg.email);
                              notify(`Copied ${msg.email} to clipboard!`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                            <span>Copy Email</span>
                          </button>

                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent('Re: ' + (msg.subject || 'Portfolio Inquiry'))}&body=${encodeURIComponent('\n\n--- In reply to inquiry from ' + msg.name + ' ---\n' + (msg.message || ''))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                            <span>Reply via Gmail ↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB: POPUP & ROLLING ANNOUNCEMENT BANNER */}
          {/* ============================================================== */}
          {activeTab === 'announcements' && (
            <div className="space-y-8 animate-fade-in max-w-4xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Popup & Rolling Announcement Banner</h1>
                <p className="text-xs text-slate-400 mt-1">
                  Manage the top rolling marquee ticker and the visitor entry image popup modal across your live portfolio.
                </p>
              </div>

              {/* SECTION 1: ROLLING MARQUEE BANNER */}
              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-5 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Rolling Top Announcement Banner</span>
                      {settings.announcement?.is_active ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Active on Site</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">Disabled</span>
                      )}
                    </h2>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Smooth marquee banner that scrolls dynamically across the very top of your portfolio.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(settings.announcement?.is_active)}
                      onChange={(e) => setSettings({
                        ...settings,
                        announcement: { ...(settings.announcement || {}), is_active: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Badge Tag</label>
                    <input
                      type="text"
                      value={settings.announcement?.badge || 'ANNOUNCEMENT'}
                      onChange={(e) => setSettings({
                        ...settings,
                        announcement: { ...(settings.announcement || {}), badge: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="e.g. ANNOUNCEMENT, UPDATE, NEW"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1 font-medium">Scrolling Announcement Message</label>
                    <input
                      type="text"
                      value={settings.announcement?.message || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        announcement: { ...(settings.announcement || {}), message: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="e.g. Welcome to my portfolio! Currently open for freelance software engineering opportunities."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Link URL (Optional)</label>
                    <input
                      type="text"
                      value={settings.announcement?.link || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        announcement: { ...(settings.announcement || {}), link: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="e.g. /projects or /contact"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Link Button Label</label>
                    <input
                      type="text"
                      value={settings.announcement?.link_text || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        announcement: { ...(settings.announcement || {}), link_text: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="e.g. View Projects →"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Rolling Speed</label>
                    <select
                      value={settings.announcement?.speed || 'normal'}
                      onChange={(e) => setSettings({
                        ...settings,
                        announcement: { ...(settings.announcement || {}), speed: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    >
                      <option value="slow">Slow & Steady (35s)</option>
                      <option value="normal">Balanced Speed (22s)</option>
                      <option value="fast">Brisk Pace (14s)</option>
                    </select>
                  </div>
                </div>

                {/* Live Preview of Rolling Announcement */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">Live Marquee Preview</div>
                  <div className="border border-slate-700/80 rounded-xl bg-slate-950/90 overflow-hidden py-2 px-3">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold tracking-wider">
                        {settings.announcement?.badge || 'ANNOUNCEMENT'}
                      </span>
                      <div className="overflow-hidden relative flex-1 text-xs text-slate-200">
                        <span className="inline-block whitespace-nowrap animate-pulse">
                          {settings.announcement?.message || 'Welcome to my official portfolio! Explore engineering projects, certificates, and articles.'}
                          {settings.announcement?.link_text && (
                            <span className="ml-2 text-emerald-400 underline font-medium">{settings.announcement.link_text}</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('announcement', settings.announcement || {})}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                  >
                    Save Rolling Banner
                  </button>
                </div>
              </div>

              {/* SECTION 2: ENTRY POPUP IMAGE MODAL */}
              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-5 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Portfolio Entry Popup Image Modal</span>
                      {settings.popup?.is_active ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">Active on Site</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px]">Disabled</span>
                      )}
                    </h2>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Modal dialog with custom image, message, and call-to-action shown when a visitor opens your website.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(settings.popup?.is_active)}
                      onChange={(e) => setSettings({
                        ...settings,
                        popup: { ...(settings.popup || {}), is_active: e.target.checked }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Popup Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settings.popup?.image_url || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        popup: { ...(settings.popup || {}), image_url: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="https://... or /gallery/photo.jpg"
                    />
                    <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-200 font-semibold flex items-center whitespace-nowrap">
                      <span>{uploadingMedia ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingMedia}
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              notify('Uploading popup image to storage...');
                              const url = await uploadFile(file);
                              setSettings(prev => ({
                                ...prev,
                                popup: { ...(prev.popup || {}), image_url: url }
                              }));
                              notify('Image uploaded and set!');
                            } catch (err) {
                              notify(err.message, 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Popup Title</label>
                  <input
                    type="text"
                    value={settings.popup?.title || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      popup: { ...(settings.popup || {}), title: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-bold"
                    placeholder="e.g. Welcome to Dipesh Sapkota's Portfolio"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Popup Description / Caption</label>
                  <textarea
                    rows={3}
                    value={settings.popup?.description || ''}
                    onChange={(e) => setSettings({
                      ...settings,
                      popup: { ...(settings.popup || {}), description: e.target.value }
                    })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none leading-relaxed"
                    placeholder="e.g. Explore computer engineering projects, creative motion graphics, and verified certifications."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Action Button URL</label>
                    <input
                      type="text"
                      value={settings.popup?.link_url || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        popup: { ...(settings.popup || {}), link_url: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="e.g. /projects or /certificates"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Action Button Text</label>
                    <input
                      type="text"
                      value={settings.popup?.link_text || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        popup: { ...(settings.popup || {}), link_text: e.target.value }
                      })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-bold"
                      placeholder="e.g. Explore Projects →"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="session-check"
                    checked={settings.popup?.show_once_per_session ?? true}
                    onChange={(e) => setSettings({
                      ...settings,
                      popup: { ...(settings.popup || {}), show_once_per_session: e.target.checked }
                    })}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700 focus:ring-emerald-500"
                  />
                  <label htmlFor="session-check" className="text-slate-300 font-medium">
                    Show once per visitor session (recommended to avoid bothering returning users on every page refresh)
                  </label>
                </div>

                {/* Live Mockup Preview of Popup */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">Live Popup Preview</div>
                  <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 flex justify-center">
                    <div className="max-w-md w-full bg-[#0E131F] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                      {settings.popup?.image_url && (
                        <div className="relative aspect-video w-full bg-slate-900">
                          <Image
                            src={settings.popup.image_url}
                            alt={settings.popup.title || 'Popup preview'}
                            fill
                            unoptimized={Boolean(settings.popup.image_url?.startsWith('http'))}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="p-5 space-y-3">
                        <h3 className="text-base font-bold text-white">
                          {settings.popup?.title || 'Welcome to Dipesh Sapkota’s Portfolio'}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {settings.popup?.description || 'Explore computer engineering projects, creative motion graphics, and verified certifications.'}
                        </p>
                        <div className="pt-2 flex items-center justify-end gap-3">
                          <span className="text-xs text-slate-400">Close</span>
                          {settings.popup?.link_text && (
                            <span className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs">
                              {settings.popup.link_text}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('popup', settings.popup || {})}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                  >
                    Save Popup Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 10: MEDIA BUCKET */}
          {/* ============================================================== */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Supabase Media Storage (`portfolio-media`)</h1>
                  <p className="text-xs text-slate-400 mt-1">Browse, upload, and copy URLs of CDN assets.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={fetchMedia} className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700">↻ Refresh</button>
                  <label className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-emerald-500/20">
                    <span>{uploadingMedia ? 'Uploading...' : '+ Upload to Bucket'}</span>
                    <input
                      type="file"
                      disabled={uploadingMedia}
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          try {
                            notify('Uploading file...');
                            await uploadFile(f);
                            notify('Uploaded!');
                            fetchMedia();
                          } catch (err) {
                            notify(err.message, 'error');
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {mediaLoading ? (
                <div className="py-12 text-center text-slate-400 text-xs">Loading bucket files...</div>
              ) : mediaFiles.length === 0 ? (
                <div className="p-8 text-center bg-[#0E131F] border border-slate-800 rounded-2xl text-slate-400 text-xs">
                  No files uploaded to bucket yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {mediaFiles.map((file) => (
                    <div key={file.name} className="bg-[#0E131F] border border-slate-800 rounded-2xl p-3 flex flex-col justify-between">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 mb-2">
                        {file.url ? (
                          <Image src={file.url} alt={file.name} fill className="object-cover" />
                        ) : null}
                      </div>
                      <div className="text-[11px] text-slate-200 font-bold truncate">{file.name}</div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(file.url);
                          notify('Copied public URL to clipboard!');
                        }}
                        className="mt-2 text-emerald-400 text-left hover:underline text-[11px]"
                      >
                        Copy URL
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 11: SEO & GOOGLE SITELINKS */}
          {/* ============================================================== */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Google SEO & Sitelinks Management</h1>
                <p className="text-xs text-slate-400 mt-1">Live metadata, search snippet preview, and crawlers.</p>
              </div>

              {/* Editable SEO Settings */}
              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white">Meta Tags Editor</h3>
                <div>
                  <label className="block text-slate-400 mb-1">Site Meta Title</label>
                  <input
                    type="text"
                    value={settings.seo?.title || 'Dipesh Sapkota | Computer Engineering & Full-Stack Developer'}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Meta Description</label>
                  <textarea
                    rows={3}
                    value={settings.seo?.description || 'Official portfolio of Dipesh Sapkota, a Computer Engineering student, full-stack web developer, and motion designer based in Kathmandu, Nepal.'}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none leading-relaxed"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Canonical URL</label>
                  <input
                    type="url"
                    value={settings.seo?.canonical_url || 'https://www.dipeshsapkota7.com.np'}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, canonical_url: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('seo', settings.seo)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Save SEO Settings
                  </button>
                </div>
              </div>

              {/* Real Google Result Mockup */}
              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-3">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Google Search Result Preview</span>
                <div className="p-4 rounded-xl bg-[#202124] border border-slate-700 max-w-xl font-sans text-left space-y-1">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-black font-bold">D</span>
                    <span>https://www.dipeshsapkota7.com.np</span>
                  </div>
                  <h4 className="text-base text-[#8AB4F8] hover:underline font-medium cursor-pointer">
                    {settings.seo?.title || 'Dipesh Sapkota | Computer Engineering & Full-Stack Developer'}
                  </h4>
                  <p className="text-xs text-[#BDC1C6] line-clamp-2 leading-relaxed">
                    {settings.seo?.description || 'Official portfolio of Dipesh Sapkota, a Computer Engineering student, full-stack web developer, and motion designer based in Kathmandu, Nepal.'}
                  </p>
                  <div className="pt-2 flex gap-4 text-xs text-[#8AB4F8]">
                    <span className="hover:underline cursor-pointer">Projects</span>
                    <span className="hover:underline cursor-pointer">Certificates</span>
                    <span className="hover:underline cursor-pointer">Gallery</span>
                    <span className="hover:underline cursor-pointer">Resume</span>
                  </div>
                </div>
              </div>

              {/* Quick Inspection Links */}
              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-3">
                <h3 className="text-xs font-bold text-white">Live Search Engine Files</h3>
                <div className="flex flex-wrap gap-3 text-xs">
                  <a href="/sitemap.xml" target="_blank" className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">Inspect sitemap.xml ↗</a>
                  <a href="/robots.txt" target="_blank" className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">Inspect robots.txt ↗</a>
                  <a href="/.well-known/llms.txt" target="_blank" className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200">Inspect llms.txt (AI Crawlers) ↗</a>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 12: DATABASE & BACKUP */}
          {/* ============================================================== */}
          {activeTab === 'database' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Database Engine & Backup Safeguard</h1>
                <p className="text-xs text-slate-400 mt-1">Live Supabase tables, row counts, and 1-click JSON backup.</p>
              </div>

              <div className="bg-[#0E131F] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-white text-xs">Supabase Project</span>
                  <span className="font-mono text-xs text-emerald-400">tihkvcybdvvovmnvkdrx.supabase.co</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Certificates (`certificates`)</span>
                    <span className="font-mono text-emerald-400">{certificates.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Gallery Photos (`gallery_images`)</span>
                    <span className="font-mono text-emerald-400">{gallery.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Projects (`projects`)</span>
                    <span className="font-mono text-emerald-400">{projects.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Skills (`skills`)</span>
                    <span className="font-mono text-emerald-400">{skills.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Timeline (`experiences`)</span>
                    <span className="font-mono text-emerald-400">{experiences.length} rows</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={handleExportBackup}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    Download Full JSON Backup
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==================================================================== */}
      {/* GLOBAL DYNAMIC EDIT / ADD MODAL (Handles all sections seamlessly) */}
      {/* ==================================================================== */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#0E131F] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl my-8">

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-white">
                {editingItem?.id ? 'Edit' : 'Add New'} {
                  activeTab === 'certificates' ? 'Certificate' :
                  activeTab === 'gallery' ? 'Gallery Photo' :
                  activeTab === 'projects' ? 'Project' :
                  activeTab === 'articles' ? 'Article' :
                  activeTab === 'skills' ? 'Skill' :
                  activeTab === 'experience' ? 'Timeline Entry' : 'Item'
                }
              </h3>
              <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            {/* 1. PROJECT FORM */}
            {activeTab === 'projects' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const method = editingItem?.id ? 'PUT' : 'POST';
                const res = await fetch('/api/admin/projects', {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem)
                });
                const data = await res.json();
                if (!res.ok) {
                  notify(data.error || 'Failed to save project', 'error');
                  return;
                }
                const saved = data.data || editingItem;
                if (editingItem?.id) {
                  setProjects(prev => prev.map(p => p.id === saved.id ? saved : p));
                } else {
                  setProjects(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Project saved successfully to /projects!');
              }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="e.g. Sportivo — Live Scores & Sports Platform"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Slug (URL)</label>
                    <input
                      type="text"
                      value={editingItem?.slug || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="sportivo"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={editingItem?.category || 'dev'}
                      onChange={(e) => {
                        const cat = e.target.value;
                        const catLabel = cat === 'dev' ? 'Development' : cat === 'media' ? 'Creative Media' : 'Experiments';
                        setEditingItem(prev => ({ ...prev, category: cat, category_label: catLabel }));
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    >
                      <option value="dev">Development</option>
                      <option value="media">Creative Media</option>
                      <option value="exp">Experiments</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Project Subtitle / Type</label>
                  <input
                    type="text"
                    value={editingItem?.type || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    placeholder="e.g. Live Sports Streaming Platform"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none leading-relaxed"
                    placeholder="Comprehensive overview of features and architecture..."
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(editingItem?.tech) ? editingItem.tech.join(', ') : (editingItem?.tech || '')}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, tech: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                    placeholder="Next.js, React, Tailwind CSS, REST APIs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Preview Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingItem?.img || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, img: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="/sportivo-preview.jpg"
                    />
                    <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-200 font-semibold flex items-center whitespace-nowrap">
                      <span>{uploadingMedia ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingMedia}
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            try {
                              notify('Uploading image...');
                              const url = await uploadFile(f);
                              setEditingItem(prev => ({ ...prev, img: url }));
                              notify('Image uploaded!');
                            } catch (err) {
                              notify(err.message, 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Live Demo URL</label>
                    <input
                      type="url"
                      value={editingItem?.live_url || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, live_url: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="https://sportivo.dipeshsapkota7.com.np/"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={editingItem?.github_url || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, github_url: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="https://github.com/dszae/..."
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={Boolean(editingItem?.featured)}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <label htmlFor="featured-checkbox" className="text-slate-300 font-medium">Mark as Featured Showcase Project</label>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Save Project</button>
                </div>
              </form>
            )}

            {/* 2. SKILL FORM */}
            {activeTab === 'skills' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const method = editingItem?.id ? 'PUT' : 'POST';
                const res = await fetch('/api/admin/skills', {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem)
                });
                const data = await res.json();
                if (!res.ok) {
                  notify(data.error || 'Failed to save skill', 'error');
                  return;
                }
                const saved = data.data || editingItem;
                if (editingItem?.id) {
                  setSkills(prev => prev.map(s => s.id === saved.id ? saved : s));
                } else {
                  setSkills(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Skill saved successfully to /skills!');
              }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.name || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="e.g. Next.js, Python, Circuit Analysis"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={editingItem?.category || 'Development'}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  >
                    <option value="Development">Development</option>
                    <option value="Creative Media">Creative Media</option>
                    <option value="Hardware">Hardware & Engineering</option>
                    <option value="AI & Data">AI & Data Science</option>
                    <option value="Engineering">Engineering Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Subtext / Description</label>
                  <input
                    type="text"
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    placeholder="e.g. Component Architecture, Rhythm & pacing"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Save Skill</button>
                </div>
              </form>
            )}

            {/* 3. TIMELINE / EXPERIENCE FORM */}
            {activeTab === 'experience' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const method = editingItem?.id ? 'PUT' : 'POST';
                const res = await fetch('/api/admin/experience', {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem)
                });
                const data = await res.json();
                if (!res.ok) {
                  notify(data.error || 'Failed to save timeline entry', 'error');
                  return;
                }
                const saved = data.data || editingItem;
                if (editingItem?.id) {
                  setExperiences(prev => prev.map(exp => exp.id === saved.id ? saved : exp));
                } else {
                  setExperiences(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Timeline entry saved to /resume!');
              }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Entry Type</label>
                  <select
                    value={editingItem?.type || 'experience'}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  >
                    <option value="experience">Professional Experience</option>
                    <option value="education">Academic Education</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Title / Role / Degree</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    placeholder="e.g. Video Editor & Graphics Designer"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Organization / Campus</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.organization || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="e.g. Clamphook Academy"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingItem?.location || 'Kathmandu, Nepal'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Start Year / Date</label>
                    <input
                      type="text"
                      value={editingItem?.start_date || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, start_date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="2026"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">End Year / Date</label>
                    <input
                      type="text"
                      value={editingItem?.end_date || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, end_date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="Present"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="current-checkbox"
                    checked={Boolean(editingItem?.is_current)}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, is_current: e.target.checked }))}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-slate-700"
                  />
                  <label htmlFor="current-checkbox" className="text-slate-300 font-medium">Currently Active Position / Enrolled</label>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Description / Key Accomplishments</label>
                  <textarea
                    rows={3}
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none leading-relaxed"
                    placeholder="Details about responsibilities or GPA..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Save Timeline Entry</button>
                </div>
              </form>
            )}

            {/* 4. CERTIFICATE FORM */}
            {activeTab === 'certificates' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const method = editingItem?.id ? 'PUT' : 'POST';
                const res = await fetch('/api/admin/certificates', {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem)
                });
                const data = await res.json();
                if (!res.ok) {
                  notify(data.error || 'Failed to save certificate', 'error');
                  return;
                }
                const saved = data.data || data.certificate || editingItem;
                if (editingItem?.id) {
                  setCertificates(prev => prev.map(c => c.id === saved.id ? saved : c));
                } else {
                  setCertificates(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Certificate published to /certificates!');
              }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Certificate Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="e.g. Advanced Motion Design Masterclass"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Issuer / Organization</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.org || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, org: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Udemy / Coursera / Harvard"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={editingItem?.category || 'Design'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    >
                      <option value="Design">Design</option>
                      <option value="Motion">Motion</option>
                      <option value="Video">Video</option>
                      <option value="Development">Development</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Certificate Image</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingItem?.img || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, img: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="/graphic-design.webp"
                    />
                    <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-200 font-semibold flex items-center whitespace-nowrap">
                      <span>{uploadingMedia ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingMedia}
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            try {
                              notify('Uploading to Supabase Storage...');
                              const url = await uploadFile(f);
                              setEditingItem(prev => ({ ...prev, img: url }));
                              notify('Image uploaded!');
                            } catch (err) {
                              notify(err.message, 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Credential Verification URL (Optional)</label>
                  <input
                    type="url"
                    value={editingItem?.credential_url || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, credential_url: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                    placeholder="https://..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Publish Certificate</button>
                </div>
              </form>
            )}

            {/* 5. GALLERY FORM */}
            {activeTab === 'gallery' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const method = editingItem?.id ? 'PUT' : 'POST';
                const res = await fetch('/api/admin/gallery', {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem)
                });
                const data = await res.json();
                if (!res.ok) {
                  notify(data.error || 'Failed to save media', 'error');
                  return;
                }
                const saved = data.data || data.image || editingItem;
                if (editingItem?.id) {
                  setGallery(prev => prev.map(g => g.id === saved.id ? saved : g));
                } else {
                  setGallery(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Photo published to /gallery!');
              }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Caption / Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="e.g. Participating in college cricket tournament"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Image Alt Text (Crucial for Google Image SEO)</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.alt || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, alt: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    placeholder="Students posing together outdoors with cricket bats..."
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={editingItem?.category || 'Campus'}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  >
                    <option value="Sports">Sports</option>
                    <option value="Events">Events</option>
                    <option value="Team">Team</option>
                    <option value="Campus">Campus</option>
                    <option value="Work">Work</option>
                    <option value="Field Visit">Field Visit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Image File or URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={editingItem?.img || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, img: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="/cricket.webp"
                    />
                    <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-200 font-semibold flex items-center whitespace-nowrap">
                      <span>{uploadingMedia ? 'Uploading...' : 'Upload Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingMedia}
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            try {
                              notify('Uploading to Supabase Storage...');
                              const url = await uploadFile(f);
                              setEditingItem(prev => ({ ...prev, img: url }));
                              notify('Uploaded successfully!');
                            } catch (err) {
                              notify(err.message, 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Save Photo</button>
                </div>
              </form>
            )}

            {/* 6. ARTICLE FORM */}
            {activeTab === 'articles' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                const method = editingItem?.id ? 'PUT' : 'POST';
                const res = await fetch('/api/admin/blog', {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem)
                });
                const data = await res.json();
                if (!res.ok) {
                  notify(data.error || 'Failed to save article', 'error');
                  return;
                }
                const saved = data.data || editingItem;
                if (editingItem?.id) {
                  setArticles(prev => prev.map(a => a.id === saved.id ? saved : a));
                } else {
                  setArticles(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Article saved to /blog!');
              }} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                    placeholder="e.g. Building Sportivo: Engineering a Real-Time Live Sports Streaming App"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Slug</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.slug || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="building-sportivo"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingItem?.category || 'Engineering'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Technical Architecture"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Short Excerpt (Summary)</label>
                  <textarea
                    rows={2}
                    value={editingItem?.excerpt || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    placeholder="Brief overview displayed on article cards..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Live Article / Dev.to Link</label>
                    <input
                      type="url"
                      value={editingItem?.live_url || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, live_url: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="https://dev.to/dszae/..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Local Case Study Link</label>
                    <input
                      type="text"
                      value={editingItem?.local_url || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, local_url: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="/projects/sportivo"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Full Article Content (Markdown)</label>
                  <textarea
                    rows={4}
                    value={editingItem?.content || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                    placeholder="Article body content..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Publish Article</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
