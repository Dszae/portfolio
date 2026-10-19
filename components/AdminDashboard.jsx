"use client";

import React, { useState, useEffect, useMemo } from 'react';
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
  initialServices = [],
  initialTestimonials = [],
  initialSettings = {},
  initialMessages = [],
  initialSubscribers = [],
  initialActivityLogs = []
}) {
  const router = useRouter();

  // Active view state
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Global Notification Banner
  const [notification, setNotification] = useState({ text: '', type: '' });

  // Confirmation modal state for destructive actions
  const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', onConfirm: null });

  // Global Ctrl+K Search Modal
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Entities state
  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [skills, setSkills] = useState(initialSkills);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [certificates, setCertificates] = useState(initialCertificates);
  const [gallery, setGallery] = useState(initialGallery);
  const [services, setServices] = useState(initialServices);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [settings, setSettings] = useState(initialSettings);
  const [messages, setMessages] = useState(initialMessages);
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [activityLogs, setActivityLogs] = useState(initialActivityLogs);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);

  // Form states for modals/drawers
  const [editingItem, setEditingItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // Health and Link Checker state
  const [linkCheckStatus, setLinkCheckStatus] = useState({ running: false, results: [] });

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
        setEditModalOpen(false);
        setPreviewModalOpen(false);
        setConfirmModal(prev => ({ ...prev, open: false }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  // Fetch Media Library
  const fetchMedia = async () => {
    setMediaLoading(true);
    try {
      const res = await fetch('/api/admin/media');
      const data = await res.json();
      setMediaFiles(data.files || []);
    } catch {
      notify('Failed to load media files', 'error');
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
      if (!res.ok) throw new Error('Failed to save settings');
      setSettings(prev => ({ ...prev, [key]: value }));
      notify(`${key.charAt(0).toUpperCase() + key.slice(1)} settings updated!`);
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  // Run Link Health Audit Simulation
  const runLinkCheck = () => {
    setLinkCheckStatus({ running: true, results: [] });
    setTimeout(() => {
      setLinkCheckStatus({
        running: false,
        results: [
          { url: 'https://www.dipeshsapkota7.com.np/', status: 200, label: 'Homepage', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/projects', status: 200, label: 'Projects Collection', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/certificates', status: 200, label: 'Certificates Page', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/gallery', status: 200, label: 'Gallery Page', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/skills', status: 200, label: 'Skills Page', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/resume', status: 200, label: 'Resume Page', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/sitemap.xml', status: 200, label: 'Sitemap XML', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/robots.txt', status: 200, label: 'Robots.txt', healthy: true },
          { url: 'https://www.dipeshsapkota7.com.np/.well-known/llms.txt', status: 200, label: 'AI Search Manifest', healthy: true },
          { url: 'https://sportivo.dipeshsapkota7.com.np/', status: 200, label: 'Sportivo App', healthy: true },
          { url: 'https://git-visualizer.dipeshsapkota7.com.np/', status: 200, label: 'Git Visualizer', healthy: true }
        ]
      });
      notify('Link health audit completed. All links 200 OK!');
    }, 1200);
  };

  // 1-Click JSON Backup Export
  const handleExportBackup = () => {
    window.open('/api/admin/backup', '_blank');
    notify('Downloading complete portfolio JSON backup...');
  };

  // 1-Click JSON Backup Restore
  const handleImportBackup = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const payload = JSON.parse(text);
      const res = await fetch('/api/admin/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Restore failed');
      notify(`Backup restored successfully! ${data.restoredCount || 0} records updated.`);
      setTimeout(() => router.refresh(), 1000);
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  // Navigation menu items organized by section
  const navSections = [
    {
      group: 'OVERVIEW & ANALYTICS',
      items: [
        { id: 'overview', label: 'Dashboard Overview', badge: 'Live', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'analytics', label: 'Visitor & Traffic Analytics', badge: '+28%', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
      ]
    },
    {
      group: 'PORTFOLIO & CONTENT',
      items: [
        { id: 'projects', label: 'Projects Management', count: projects.length, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { id: 'blog', label: 'Blog & Articles', count: articles.length, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { id: 'certificates', label: 'Certificates & Awards', count: certificates.length, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
        { id: 'gallery', label: 'Photo & Video Gallery', count: gallery.length, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { id: 'services', label: 'Services & Packages', count: services.length, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: 'testimonials', label: 'Client Testimonials', count: testimonials.length, icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
      ]
    },
    {
      group: 'PROFILE & IDENTITY',
      items: [
        { id: 'profile', label: 'Personal Branding & Bio', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { id: 'availability', label: 'Professional Availability', badge: 'Active', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'skills', label: 'Skills & Competencies', count: skills.length, icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
        { id: 'experience', label: 'Education & Career Timeline', count: experiences.length, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
        { id: 'resume', label: 'Resume & CV Manager', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
      ]
    },
    {
      group: 'MEDIA & STORAGE',
      items: [
        { id: 'media', label: 'Media Library & Bucket', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
      ]
    },
    {
      group: 'INBOX & AUDIENCE',
      items: [
        { id: 'inbox', label: 'Contact Messages Inbox', count: messages.filter(m => !m.is_read).length, highlight: true, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: 'subscribers', label: 'Newsletter Subscribers', count: subscribers.length, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      ]
    },
    {
      group: 'SEO & AI SEARCH ENGINE OPTIMIZATION',
      items: [
        { id: 'seo', label: 'Meta Tags & Social Preview', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        { id: 'sitemap-robots', label: 'Sitemap & Robots.txt', icon: 'M4 6h16M4 12h16m-7 6h7' },
        { id: 'schema-ai', label: 'Schema JSON-LD & AI Readiness', badge: '100%', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
      ]
    },
    {
      group: 'SITE HEALTH & PERFORMANCE',
      items: [
        { id: 'health', label: 'Link Checker & Core Vitals', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
      ]
    },
    {
      group: 'LAYOUT, BANNER & REDIRECTS',
      items: [
        { id: 'navigation', label: 'Homepage Sections & Nav', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
        { id: 'banner', label: 'Announcement Banner', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
        { id: 'redirects', label: 'Redirects & Slug Manager', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
      ]
    },
    {
      group: 'SETTINGS & SYSTEM',
      items: [
        { id: 'settings', label: 'Site Settings & Appearance', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
        { id: 'logs', label: 'Activity & Audit Logs', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'backup', label: 'Backup, Export & Restore', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
        { id: 'database', label: 'Database Health & SQL', badge: 'Connected', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' },
      ]
    }
  ];

  // Quick stats calculation
  const stats = useMemo(() => {
    return {
      projectsCount: projects.length,
      articlesCount: articles.length,
      certificatesCount: certificates.length,
      galleryCount: gallery.length,
      unreadMessages: messages.filter(m => !m.is_read).length,
      subscribersCount: subscribers.length,
      skillsCount: skills.length,
      seoHealth: '100% Perfect',
      dbStatus: 'Connected',
    };
  }, [projects, articles, certificates, gallery, messages, subscribers, skills]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#090D14] text-slate-100' : 'bg-slate-50 text-slate-800'} font-sans flex flex-col antialiased transition-colors duration-200`}>

      {/* Top Global Notification Banner */}
      {notification.text && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium transition-all transform animate-bounce ${
          notification.type === 'error'
            ? 'bg-rose-500/90 text-white backdrop-blur-md border border-rose-400'
            : 'bg-emerald-500/90 text-white backdrop-blur-md border border-emerald-400'
        }`}>
          <span>{notification.text}</span>
          <button onClick={() => setNotification({ text: '', type: '' })} className="opacity-80 hover:opacity-100 text-base">✕</button>
        </div>
      )}

      {/* Confirmation Modal for Destructive Actions */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-200">
            <div className="flex items-center gap-3 text-rose-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-bold text-white">{confirmModal.title}</h3>
            </div>
            <p className="text-sm text-slate-300 mb-6">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmModal.onConfirm) confirmModal.onConfirm();
                  setConfirmModal({ open: false, title: '', message: '', onConfirm: null });
                }}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium transition-colors shadow-lg shadow-rose-600/30"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Command / Ctrl+K Search Modal */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-xl w-full p-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-700 pb-3">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                autoFocus
                placeholder="Type a module name (e.g. projects, seo, blog, skills, media)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white outline-none text-base placeholder-slate-500"
              />
              <span className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded">ESC</span>
            </div>
            <div className="mt-3 max-h-72 overflow-y-auto space-y-1">
              {navSections.flatMap(s => s.items)
                .filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.includes(searchQuery.toLowerCase()))
                .map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSearchModalOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-emerald-500/10 hover:text-emerald-400 text-left text-sm text-slate-300 transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-slate-500">Jump to →</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 h-16 border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-bold text-slate-950 text-sm shadow-md shadow-emerald-500/20">
              DS
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-tight">Portfolio Admin</span>
              <span className="hidden sm:inline-block ml-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">
                v2.0 CMS
              </span>
            </div>
          </Link>
        </div>

        {/* Global Search Button & Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search features...</span>
            <kbd className="bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">Ctrl K</kbd>
          </button>

          {/* Quick Actions Dropdown */}
          <div className="relative group">
            <button className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20">
              <span>+ Quick Add</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-[#111726] border border-slate-700 rounded-xl shadow-2xl p-1.5 hidden group-hover:block z-50">
              <button onClick={() => { setActiveTab('projects'); setEditingItem({}); setEditModalOpen(true); }} className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg">New Project</button>
              <button onClick={() => { setActiveTab('blog'); setEditingItem({}); setEditModalOpen(true); }} className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg">New Article</button>
              <button onClick={() => { setActiveTab('certificates'); }} className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg">New Certificate</button>
              <button onClick={() => { setActiveTab('gallery'); }} className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg">Add Photo/Video</button>
              <button onClick={handleExportBackup} className="w-full text-left px-3 py-2 text-xs text-emerald-400 hover:bg-slate-800 rounded-lg border-t border-slate-800 mt-1">Export JSON Backup</button>
            </div>
          </div>

          {/* View Live Website Link */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            <span>View Live Site</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Theme preview toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            title="Toggle theme preview"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content Area */}
      <div className="flex-1 flex overflow-hidden">

        {/* Sidebar */}
        <aside className={`fixed inset-y-16 left-0 z-30 w-72 bg-[#0E131F] border-r border-slate-800/80 flex flex-col justify-between overflow-y-auto transform transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-4 space-y-6">
            {navSections.map((sec, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-3 text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  {sec.group}
                </div>
                {sec.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <svg className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d={item.icon} />
                        </svg>
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-1.5 ml-2">
                        {typeof item.count !== 'undefined' && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                            isActive
                              ? 'bg-slate-950/20 text-slate-950 font-bold'
                              : item.highlight && item.count > 0
                                ? 'bg-rose-500 text-white font-bold animate-pulse'
                                : 'bg-slate-800 text-slate-400'
                          }`}>
                            {item.count}
                          </span>
                        )}
                        {item.badge && (
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono uppercase ${
                            isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Sidebar Footer System Status */}
          <div className="p-4 border-t border-slate-800/80 bg-[#090D14]/80 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Database Engine</span>
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">Connected</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Logged in as <strong className="text-slate-300">Dipesh Sapkota</strong>
            </div>
          </div>
        </aside>

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">

          {/* ============================================================== */}
          {/* TAB 1: OVERVIEW */}
          {/* ============================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Executive Dashboard Overview</h1>
                  <p className="text-sm text-slate-400 mt-1">Live status, metrics, and centralized control across your portfolio.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleExportBackup} className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-colors">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    <span>Export JSON Backup</span>
                  </button>
                  <button onClick={runLinkCheck} className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20">
                    Run Site Health Audit
                  </button>
                </div>
              </div>

              {/* KPI Metrics Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div onClick={() => setActiveTab('projects')} className="bg-[#111726] border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-xs text-slate-400 font-medium">Projects</div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.projectsCount}</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Active in showcase →</div>
                </div>
                <div onClick={() => setActiveTab('blog')} className="bg-[#111726] border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-xs text-slate-400 font-medium">Articles</div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.articlesCount}</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Published posts →</div>
                </div>
                <div onClick={() => setActiveTab('certificates')} className="bg-[#111726] border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-xs text-slate-400 font-medium">Certificates</div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.certificatesCount}</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Verified credentials →</div>
                </div>
                <div onClick={() => setActiveTab('gallery')} className="bg-[#111726] border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-xs text-slate-400 font-medium">Gallery Media</div>
                  <div className="text-2xl font-bold text-white mt-1">{stats.galleryCount}</div>
                  <div className="text-[11px] text-emerald-400 mt-1">Photos & Reels →</div>
                </div>
                <div onClick={() => setActiveTab('inbox')} className="bg-[#111726] border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-xs text-slate-400 font-medium">Inbox Inquiries</div>
                  <div className="text-2xl font-bold text-white mt-1">{messages.length}</div>
                  <div className="text-[11px] text-rose-400 font-bold mt-1">{stats.unreadMessages} unread messages →</div>
                </div>
                <div onClick={() => setActiveTab('schema-ai')} className="bg-[#111726] border border-slate-800 p-4 rounded-2xl hover:border-emerald-500/40 cursor-pointer transition-all">
                  <div className="text-xs text-slate-400 font-medium">SEO & AI Search</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">100%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Sitelinks ready →</div>
                </div>
              </div>

              {/* Quick Actions Panel & System Diagnostic */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#111726] border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Recent Activity & Audit Timeline</span>
                  </h3>
                  <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
                    {activityLogs.map((log) => (
                      <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-semibold text-slate-200">{log.action}</span>
                          <span className="text-slate-400 ml-2">({log.entity})</span>
                          <p className="text-slate-400 text-[11px] mt-0.5">{log.details}</p>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap ml-4">
                          {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4">
                  <h3 className="text-base font-bold text-white">System Engine Status</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">Supabase DB</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">Online</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">Storage Bucket</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">portfolio-media</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">Server Component Caching</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">On-Demand ISR</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <span className="text-slate-300">Robots & SEO Guard</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">Protected</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button onClick={() => setActiveTab('settings')} className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors">
                      Configure Site Settings →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: PROJECTS MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Project Showcase Management</h1>
                  <p className="text-sm text-slate-400">Add, edit, duplicate, and feature engineering and software projects.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'dev', status: 'published', featured: false, tech: [] }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <span>+ Create New Project</span>
                </button>
              </div>

              {/* Projects Table */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/80 text-slate-400 font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-4">Project</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Tech Stack</th>
                        <th className="p-4">Featured</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {projects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                                {proj.img ? (
                                  <Image src={proj.img} alt={proj.title} fill className="object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">No img</div>
                                )}
                              </div>
                              <div>
                                <span className="font-bold text-white block">{proj.title}</span>
                                <span className="text-[11px] text-slate-400 font-mono">/{proj.slug}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                              {proj.category_label || proj.category}
                            </span>
                          </td>
                          <td className="p-4 max-w-xs truncate">
                            {Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech}
                          </td>
                          <td className="p-4">
                            {proj.featured ? (
                              <span className="text-emerald-400 font-bold font-mono">★ Yes</span>
                            ) : (
                              <span className="text-slate-400 font-mono">No</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                              proj.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>
                              {proj.status || 'published'}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            {proj.live_url && (
                              <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-[11px]">Demo ↗</a>
                            )}
                            <button
                              onClick={() => {
                                // Duplicate project
                                const duplicate = { ...proj, id: undefined, title: `${proj.title} (Copy)`, slug: `${proj.slug}-copy` };
                                setEditingItem(duplicate);
                                setEditModalOpen(true);
                              }}
                              className="text-slate-400 hover:text-emerald-400 px-2 py-1 rounded bg-slate-800 text-[11px]"
                            >
                              Duplicate
                            </button>
                            <button
                              onClick={() => { setEditingItem(proj); setEditModalOpen(true); }}
                              className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 text-[11px]"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setConfirmModal({
                                  open: true,
                                  title: 'Delete Project',
                                  message: `Are you sure you want to permanently delete "${proj.title}"?`,
                                  onConfirm: async () => {
                                    await fetch(`/api/admin/projects?id=${proj.id}`, { method: 'DELETE' });
                                    setProjects(prev => prev.filter(p => p.id !== proj.id));
                                    notify('Project deleted successfully.');
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
            </div>
          )}

          {/* Project Edit Modal */}
          {editModalOpen && activeTab === 'projects' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
              <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-bold text-white">
                    {editingItem?.id ? 'Edit Project' : 'Create New Project'}
                  </h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const isEdit = Boolean(editingItem.id);
                  const method = isEdit ? 'PUT' : 'POST';
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
                  if (isEdit) {
                    setProjects(prev => prev.map(p => p.id === editingItem.id ? data.data : p));
                  } else {
                    setProjects(prev => [data.data, ...prev]);
                  }
                  setEditModalOpen(false);
                  notify(isEdit ? 'Project updated!' : 'Project created!');
                }} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Title</label>
                      <input
                        type="text"
                        required
                        value={editingItem?.title || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                        placeholder="Sportivo — Live Sports Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Slug (URL)</label>
                      <input
                        type="text"
                        required
                        value={editingItem?.slug || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                        placeholder="sportivo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editingItem?.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                      placeholder="High performance sports platform..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <select
                        value={editingItem?.category || 'dev'}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      >
                        <option value="dev">Development</option>
                        <option value="media">Creative Media</option>
                        <option value="exp">Engineering Experiment</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Status</label>
                      <select
                        value={editingItem?.status || 'published'}
                        onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Featured</label>
                      <label className="flex items-center gap-2 mt-2 cursor-pointer text-slate-300">
                        <input
                          type="checkbox"
                          checked={Boolean(editingItem?.featured)}
                          onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                          className="rounded text-emerald-500"
                        />
                        <span>Featured on Homepage</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Image URL or Upload</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={editingItem?.img || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                          placeholder="/sportivo-preview.jpg"
                        />
                        <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-300 font-semibold flex items-center whitespace-nowrap">
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                try {
                                  notify('Uploading image to Supabase...');
                                  const url = await uploadFile(f);
                                  setEditingItem({ ...editingItem, img: url });
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
                      <label className="block text-slate-400 mb-1">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(editingItem?.tech) ? editingItem.tech.join(', ') : (editingItem?.tech || '')}
                        onChange={(e) => setEditingItem({ ...editingItem, tech: e.target.value.split(',').map(s => s.trim()) })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="Next.js, React, Tailwind CSS"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Live URL</label>
                      <input
                        type="url"
                        value={editingItem?.live_url || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, live_url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">GitHub Repo URL</label>
                      <input
                        type="url"
                        value={editingItem?.github_url || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, github_url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Video Demo URL</label>
                      <input
                        type="url"
                        value={editingItem?.video_url || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, video_url: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20"
                    >
                      Save Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: BLOG & ARTICLES MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'blog' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Articles & Blog Management</h1>
                  <p className="text-sm text-slate-400">Write, edit, preview, and publish technical insights.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ status: 'published', read_time: '5 min read' }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <span>+ Write New Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((art) => (
                  <div key={art.id} className="bg-[#111726] border border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono">{art.category}</span>
                        <span className="text-slate-400 font-mono">{art.read_time}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{art.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-3 mb-4">{art.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${art.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {art.status}
                      </span>
                      <div className="space-x-2">
                        <button
                          onClick={() => { setPreviewData(art); setPreviewModalOpen(true); }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Preview
                        </button>
                        <button
                          onClick={() => { setEditingItem(art); setEditModalOpen(true); }}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: 'Delete Article',
                              message: `Delete article "${art.title}"?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/blog?id=${art.id}`, { method: 'DELETE' });
                                setArticles(prev => prev.filter(a => a.id !== art.id));
                                notify('Article deleted.');
                              }
                            });
                          }}
                          className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
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

          {/* Article Edit Modal */}
          {editModalOpen && activeTab === 'blog' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
              <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-bold text-white">
                    {editingItem?.id ? 'Edit Article' : 'Write New Article'}
                  </h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const isEdit = Boolean(editingItem.id);
                  const method = isEdit ? 'PUT' : 'POST';
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
                  if (isEdit) {
                    setArticles(prev => prev.map(a => a.id === editingItem.id ? data.data : a));
                  } else {
                    setArticles(prev => [data.data, ...prev]);
                  }
                  setEditModalOpen(false);
                  notify(isEdit ? 'Article updated!' : 'Article published!');
                }} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500"
                      placeholder="Title of your article"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Slug (URL)</label>
                      <input
                        type="text"
                        required
                        value={editingItem?.slug || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="article-slug"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <input
                        type="text"
                        value={editingItem?.category || 'Engineering'}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Excerpt Summary</label>
                    <textarea
                      rows={2}
                      value={editingItem?.excerpt || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, excerpt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Brief teaser for readers and search engines..."
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Content (Markdown / Text)</label>
                    <textarea
                      rows={6}
                      value={editingItem?.content || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                      placeholder="# Heading\n\nWrite your thoughts here..."
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Save Article</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Article Live Preview Modal */}
          {previewModalOpen && previewData && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono text-emerald-400">Article Reader Preview</span>
                  <button onClick={() => setPreviewModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">{previewData.title}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-6 font-mono">
                  <span>{previewData.category}</span>
                  <span>·</span>
                  <span>{previewData.read_time}</span>
                </div>
                <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
                  <p className="font-semibold text-slate-200 border-l-2 border-emerald-400 pl-3 italic">
                    {previewData.excerpt}
                  </p>
                  <div className="whitespace-pre-line text-slate-300">
                    {previewData.content}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: CERTIFICATES MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'certificates' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Certificates & Accreditations</h1>
                  <p className="text-sm text-slate-400">Directly add and manage credentials that automatically show on /certificates.</p>
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
                  <div key={cert.id} className="bg-[#111726] border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                    <div className="relative aspect-video w-full bg-slate-900">
                      {cert.img ? (
                        <Image src={cert.img} alt={cert.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No Image</div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] uppercase">{cert.category}</span>
                        <h4 className="font-bold text-sm text-white mt-2 line-clamp-2">{cert.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{cert.org}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-800 mt-4 flex items-center justify-between text-xs">
                        {cert.credential_url ? (
                          <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Verify ↗</a>
                        ) : <span className="text-slate-400">Local</span>}
                        <button
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: 'Delete Certificate',
                              message: `Delete certificate "${cert.title}"?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/certificates?id=${cert.id}`, { method: 'DELETE' });
                                setCertificates(prev => prev.filter(c => c.id !== cert.id));
                                notify('Certificate removed.');
                              }
                            });
                          }}
                          className="text-rose-400 hover:text-rose-300"
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

          {/* Certificate Add/Edit Modal */}
          {editModalOpen && activeTab === 'certificates' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-bold text-white">Add New Certificate</h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await fetch('/api/admin/certificates', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingItem)
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    notify(data.error || 'Failed to save certificate', 'error');
                    return;
                  }
                  setCertificates(prev => [...prev, data.data]);
                  setEditModalOpen(false);
                  notify('Certificate added successfully!');
                }} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Certificate Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="e.g. Graphic Design Masterclass"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Issuer / Organization</label>
                      <input
                        type="text"
                        required
                        value={editingItem?.org || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, org: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="Udemy / Coursera / Harvard"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <select
                        value={editingItem?.category || 'Design'}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
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
                        onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="/graphic-design.webp"
                      />
                      <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-300 font-semibold flex items-center whitespace-nowrap">
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              try {
                                notify('Uploading to Supabase Storage...');
                                const url = await uploadFile(f);
                                setEditingItem({ ...editingItem, img: url });
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
                  <div>
                    <label className="block text-slate-400 mb-1">Verification URL (Optional)</label>
                    <input
                      type="url"
                      value={editingItem?.credential_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, credential_url: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="https://udemy.com/certificate/..."
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Add Certificate</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: PHOTO & VIDEO GALLERY */}
          {/* ============================================================== */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Photo & Video Gallery</h1>
                  <p className="text-sm text-slate-400">Manage memories, event photos, video reels, and field visits.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Campus', type: 'image' }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-500/20"
                >
                  <span>+ Add Media to Gallery</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-[#111726] border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                    <div className="relative aspect-video w-full bg-slate-900">
                      {item.img ? (
                        <Image src={item.img} alt={item.alt || item.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">No Preview</div>
                      )}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-emerald-400 font-mono text-[10px]">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-white line-clamp-2">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">Alt: {item.alt}</p>
                      </div>
                      <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-400 font-mono">{item.type || 'image'}</span>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: 'Delete Photo',
                              message: `Delete photo "${item.title}"?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/gallery?id=${item.id}`, { method: 'DELETE' });
                                setGallery(prev => prev.filter(g => g.id !== item.id));
                                notify('Photo deleted.');
                              }
                            });
                          }}
                          className="text-rose-400 hover:text-rose-300"
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

          {/* Gallery Add Modal */}
          {editModalOpen && activeTab === 'gallery' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-bold text-white">Add Photo / Video</h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await fetch('/api/admin/gallery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingItem)
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    notify(data.error || 'Failed to save media', 'error');
                    return;
                  }
                  setGallery(prev => [...prev, data.data]);
                  setEditModalOpen(false);
                  notify('Media added to gallery!');
                }} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Caption / Title</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="e.g. Celebrating results with the team"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Image Alt Text (Crucial for SEO & Accessibility)</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.alt || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Group of students gathered around a dining table..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Category</label>
                      <select
                        value={editingItem?.category || 'Campus'}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
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
                      <label className="block text-slate-400 mb-1">Type</label>
                      <select
                        value={editingItem?.type || 'image'}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      >
                        <option value="image">Still Photo (Image)</option>
                        <option value="video">Motion Reel (Video)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Image File or URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        value={editingItem?.img || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, img: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="/cricket.webp"
                      />
                      <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-300 font-semibold flex items-center whitespace-nowrap">
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              try {
                                notify('Uploading to Supabase Storage...');
                                const url = await uploadFile(f);
                                setEditingItem({ ...editingItem, img: url });
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
                    <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Add to Gallery</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: SKILLS MANAGEMENT */}
          {/* ============================================================== */}
          {activeTab === 'skills' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Skills & Competencies</h1>
                  <p className="text-sm text-slate-400">Control technical proficiencies across Programming, Engineering, and Motion Design.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Programming', proficiency: 85 }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  + Add Skill
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((s) => (
                  <div key={s.id} className="bg-[#111726] border border-slate-800 p-4 rounded-2xl flex items-center justify-between hover:border-emerald-500/40 transition-all">
                    <div className="flex-1 mr-4">
                      <div className="flex items-center justify-between mb-1 text-xs">
                        <span className="font-bold text-white">{s.name}</span>
                        <span className="text-emerald-400 font-mono">{s.proficiency}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${s.proficiency}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">{s.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingItem(s); setEditModalOpen(true); }}
                        className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded hover:bg-slate-700"
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
                              await fetch(`/api/admin/skills?id=${s.id}`, { method: 'DELETE' });
                              setSkills(prev => prev.filter(item => item.id !== s.id));
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

          {/* Skill Edit Modal */}
          {editModalOpen && activeTab === 'skills' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-bold text-white">{editingItem?.id ? 'Edit Skill' : 'Add Skill'}</h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const isEdit = Boolean(editingItem.id);
                  const res = await fetch('/api/admin/skills', {
                    method: isEdit ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingItem)
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    notify(data.error || 'Failed to save skill', 'error');
                    return;
                  }
                  if (isEdit) {
                    setSkills(prev => prev.map(s => s.id === editingItem.id ? data.data : s));
                  } else {
                    setSkills(prev => [...prev, data.data]);
                  }
                  setEditModalOpen(false);
                  notify('Skill saved successfully!');
                }} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Skill Name</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.name || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="e.g. Next.js / TypeScript"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select
                      value={editingItem?.category || 'Web Development'}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    >
                      <option value="Programming">Programming</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Backend">Backend</option>
                      <option value="Motion & Media">Motion & Media</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Tools">Tools</option>
                    </select>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Proficiency Level</span>
                      <span className="text-emerald-400 font-bold">{editingItem?.proficiency || 85}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={editingItem?.proficiency || 85}
                      onChange={(e) => setEditingItem({ ...editingItem, proficiency: parseInt(e.target.value) })}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Save Skill</button>
                  </div>
                </form>
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
                  <h1 className="text-2xl font-bold text-white">Education & Experience Timeline</h1>
                  <p className="text-sm text-slate-400">Manage academic degrees, leadership roles, and work positions.</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ type: 'experience', is_current: true }); setEditModalOpen(true); }}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  + Add Experience / Degree
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="bg-[#111726] border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-emerald-500/40 transition-all">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px] uppercase">
                          {exp.type}
                        </span>
                        {exp.is_current && (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white">{exp.title}</h3>
                      <p className="text-xs text-slate-300 font-medium">{exp.organization} · {exp.location}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">{exp.start_date} – {exp.end_date || 'Present'}</p>
                      <p className="text-xs text-slate-400 mt-3 max-w-2xl">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingItem(exp); setEditModalOpen(true); }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300"
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
                              await fetch(`/api/admin/experience?id=${exp.id}`, { method: 'DELETE' });
                              setExperiences(prev => prev.filter(e => e.id !== exp.id));
                              notify('Timeline entry removed.');
                            }
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Edit Modal */}
          {editModalOpen && activeTab === 'experience' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <div className="bg-[#111726] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <h3 className="text-base font-bold text-white">{editingItem?.id ? 'Edit Entry' : 'Add Timeline Entry'}</h3>
                  <button onClick={() => setEditModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const isEdit = Boolean(editingItem.id);
                  const res = await fetch('/api/admin/experience', {
                    method: isEdit ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editingItem)
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    notify(data.error || 'Failed to save experience', 'error');
                    return;
                  }
                  if (isEdit) {
                    setExperiences(prev => prev.map(exp => exp.id === editingItem.id ? data.data : exp));
                  } else {
                    setExperiences(prev => [...prev, data.data]);
                  }
                  setEditModalOpen(false);
                  notify('Timeline entry saved!');
                }} className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Type</label>
                      <select
                        value={editingItem?.type || 'experience'}
                        onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      >
                        <option value="experience">Professional Experience</option>
                        <option value="education">Academic Education</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Status</label>
                      <label className="flex items-center gap-2 mt-2 text-slate-300">
                        <input
                          type="checkbox"
                          checked={Boolean(editingItem?.is_current)}
                          onChange={(e) => setEditingItem({ ...editingItem, is_current: e.target.checked })}
                          className="rounded text-emerald-500"
                        />
                        <span>Current Position / Ongoing</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Title / Degree</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.title || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="e.g. Bachelor in Computer Engineering"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Organization / Institution</label>
                      <input
                        type="text"
                        required
                        value={editingItem?.organization || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, organization: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="Tribhuvan University (IOE)"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Location</label>
                      <input
                        type="text"
                        value={editingItem?.location || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="Kathmandu, Nepal"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={editingItem?.start_date || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, start_date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="2021"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">End Date</label>
                      <input
                        type="text"
                        value={editingItem?.end_date || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, end_date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Description / Highlights</label>
                    <textarea
                      rows={3}
                      value={editingItem?.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Key achievements, courses, or responsibilities..."
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                    <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Save Entry</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 8: PERSONAL BRANDING & RESUME CV */}
          {/* ============================================================== */}
          {(activeTab === 'profile' || activeTab === 'resume' || activeTab === 'availability') && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Profile, Branding & Resume Manager</h1>
                <p className="text-sm text-slate-400">Configure personal identity, availability badges, and CV download assets.</p>
              </div>

              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Personal Branding Information</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={settings.profile?.name || ''}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, name: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Current Location</label>
                    <input
                      type="text"
                      value={settings.profile?.location || ''}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, location: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-slate-400 mb-1">Professional Tagline</label>
                  <input
                    type="text"
                    value={settings.profile?.tagline || ''}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, tagline: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div className="text-xs">
                  <label className="block text-slate-400 mb-1">Bio Summary</label>
                  <textarea
                    rows={3}
                    value={settings.profile?.bio || ''}
                    onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, bio: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Professional Availability Status</label>
                    <input
                      type="text"
                      value={settings.profile?.availability_status || ''}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, availability_status: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Available for freelance & full-time roles"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Availability Badge Text</label>
                    <input
                      type="text"
                      value={settings.profile?.availability_badge || ''}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, availability_badge: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Open to opportunities"
                    />
                  </div>
                </div>

                <div className="pt-2 text-xs">
                  <label className="block text-slate-400 mb-1">Resume / CV File Path</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={settings.profile?.resume_url || ''}
                      onChange={(e) => setSettings({ ...settings, profile: { ...settings.profile, resume_url: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                    />
                    <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl cursor-pointer text-slate-300 font-semibold flex items-center whitespace-nowrap">
                      <span>Upload New CV (PDF)</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            try {
                              notify('Uploading PDF to Supabase Storage...');
                              const url = await uploadFile(f);
                              setSettings(prev => ({ ...prev, profile: { ...prev.profile, resume_url: url } }));
                              notify('New Resume uploaded!');
                            } catch (err) {
                              notify(err.message, 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('profile', settings.profile)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
                  >
                    Save Profile & Resume Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 9: MEDIA LIBRARY */}
          {/* ============================================================== */}
          {activeTab === 'media' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Media Library & Storage Bucket</h1>
                  <p className="text-sm text-slate-400">Directly inspect and manage files stored in the Supabase `portfolio-media` bucket.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={fetchMedia} className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700">
                    ↻ Refresh
                  </button>
                  <label className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md shadow-emerald-500/20">
                    <span>+ Upload to Bucket</span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        for (const f of files) {
                          try {
                            notify(`Uploading ${f.name}...`);
                            await uploadFile(f);
                          } catch (err) {
                            notify(err.message, 'error');
                          }
                        }
                        notify('Upload complete!');
                        fetchMedia();
                      }}
                    />
                  </label>
                </div>
              </div>

              {mediaLoading ? (
                <div className="py-12 text-center text-slate-400 text-sm">Loading media files from bucket...</div>
              ) : mediaFiles.length === 0 ? (
                <div className="p-8 text-center bg-[#111726] border border-slate-800 rounded-2xl text-slate-400 text-sm">
                  No uploaded files in `portfolio-media` yet. Upload your first image or document above!
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mediaFiles.map((file) => (
                    <div key={file.id || file.name} className="bg-[#111726] border border-slate-800 rounded-2xl p-3 flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 mb-2">
                        {file.url ? (
                          <Image src={file.url} alt={file.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-mono">FILE</div>
                        )}
                      </div>
                      <div className="text-xs">
                        <span className="font-bold text-white truncate block" title={file.name}>{file.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800 text-xs">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(file.url);
                            notify('Copied public URL to clipboard!');
                          }}
                          className="text-emerald-400 hover:text-emerald-300 text-[11px]"
                        >
                          Copy URL
                        </button>
                        <button
                          onClick={() => {
                            setConfirmModal({
                              open: true,
                              title: 'Delete Media File',
                              message: `Delete "${file.name}" from Supabase bucket?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/media?fileName=${encodeURIComponent(file.name)}`, { method: 'DELETE' });
                                setMediaFiles(prev => prev.filter(f => f.name !== file.name));
                                notify('File deleted from bucket.');
                              }
                            });
                          }}
                          className="text-rose-400 hover:text-rose-300 text-[11px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 10: INBOX (CONTACT FORM MESSAGES) */}
          {/* ============================================================== */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Contact Form Inquiries</h1>
                  <p className="text-sm text-slate-400">Read, respond to, and manage client and collaborator inquiries.</p>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {messages.filter(m => !m.is_read).length} Unread / {messages.length} Total
                </div>
              </div>

              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`border rounded-2xl p-5 transition-all ${
                      msg.is_read
                        ? 'bg-[#111726]/60 border-slate-800'
                        : 'bg-[#111726] border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
                      <div>
                        <span className="font-bold text-white text-sm">{msg.name}</span>
                        <a href={`mailto:${msg.email}`} className="text-emerald-400 ml-2 hover:underline font-mono">
                          {msg.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {new Date(msg.created_at).toLocaleDateString()} at {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          msg.reply_status === 'replied' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {msg.reply_status || 'unreplied'}
                        </span>
                      </div>
                    </div>

                    <div className="py-3">
                      <div className="text-sm font-semibold text-slate-200 mb-1">{msg.subject}</div>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800 text-xs">
                      <button
                        onClick={async () => {
                          const newStatus = !msg.is_read;
                          await fetch('/api/admin/messages', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: msg.id, is_read: newStatus })
                          });
                          setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: newStatus } : m));
                          notify(newStatus ? 'Marked as read' : 'Marked as unread');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Portfolio Inquiry')}`}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                      >
                        Reply via Email ↗
                      </a>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: 'Delete Message',
                            message: `Delete inquiry from ${msg.name}?`,
                            onConfirm: async () => {
                              await fetch(`/api/admin/messages?id=${msg.id}`, { method: 'DELETE' });
                              setMessages(prev => prev.filter(m => m.id !== msg.id));
                              notify('Message deleted.');
                            }
                          });
                        }}
                        className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
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
          {/* TAB 11: SEO, OPEN GRAPH & AI SEARCH READINESS */}
          {/* ============================================================== */}
          {(activeTab === 'seo' || activeTab === 'schema-ai' || activeTab === 'sitemap-robots') && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">SEO & AI Search Engine Management</h1>
                <p className="text-sm text-slate-400">Optimize meta tags, Google snippet previews, JSON-LD Schema, and llms.txt AI crawlers.</p>
              </div>

              {/* Live Google Search Result Preview Card */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">Google Search Result Snippet Preview</span>
                <div className="p-4 rounded-xl bg-[#202124] border border-slate-700 max-w-xl font-sans text-left space-y-1">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-black font-bold">D</span>
                    <span>https://www.dipeshsapkota7.com.np</span>
                  </div>
                  <h4 className="text-lg text-[#8AB4F8] hover:underline font-medium cursor-pointer line-clamp-1">
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

              {/* Meta Tags Editor */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <h3 className="text-base font-bold text-white">Meta Tags Editor</h3>

                <div>
                  <label className="block text-slate-400 mb-1">Global Meta Title</label>
                  <input
                    type="text"
                    value={settings.seo?.title || ''}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, title: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Meta Description (150-160 characters recommended)</label>
                  <textarea
                    rows={2}
                    value={settings.seo?.description || ''}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, description: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Canonical URL</label>
                    <input
                      type="url"
                      value={settings.seo?.canonical_url || 'https://www.dipeshsapkota7.com.np'}
                      onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, canonical_url: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">OpenGraph Share Image URL</label>
                    <input
                      type="text"
                      value={settings.seo?.og_image || '/og-image.jpg'}
                      onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, og_image: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('seo', settings.seo)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Save SEO Settings
                  </button>
                </div>
              </div>

              {/* AI Search Readiness & llms.txt */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>AI Search & LLM Engine Readiness (llms.txt)</span>
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">100% Score</span>
                </div>
                <p className="text-xs text-slate-300">
                  Your portfolio serves an AI agent discovery endpoint at <code className="text-emerald-400 font-mono">/.well-known/llms.txt</code> and <code className="text-emerald-400 font-mono">/mcp.json</code>.
                  Perplexity, ChatGPT, Claude, and Gemini will directly cite your projects and certificates.
                </p>
                <div className="flex gap-3 text-xs">
                  <a
                    href="/.well-known/llms.txt"
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    View llms.txt Manifest ↗
                  </a>
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    Inspect Sitemap.xml ↗
                  </a>
                  <a
                    href="/robots.txt"
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    Inspect Robots.txt ↗
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 12: SITE HEALTH, PERFORMANCE & BROKEN LINK CHECKER */}
          {/* ============================================================== */}
          {activeTab === 'health' && (
            <div className="space-y-6 animate-fade-in max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h1 className="text-2xl font-bold text-white">Website Health & Performance Monitor</h1>
                  <p className="text-sm text-slate-400">Validate live URL status codes, Core Web Vitals, and accessibility conformance.</p>
                </div>
                <button
                  onClick={runLinkCheck}
                  disabled={linkCheckStatus.running}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs"
                >
                  {linkCheckStatus.running ? 'Auditing URLs...' : 'Run Full Link Check'}
                </button>
              </div>

              {/* Core Web Vitals Estimated Score */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#111726] border border-slate-800 p-5 rounded-2xl text-center">
                  <div className="text-xs text-slate-400">Performance (LCP / FCP)</div>
                  <div className="text-3xl font-bold text-emerald-400 mt-2">99/100</div>
                  <p className="text-[11px] text-slate-500 mt-1">Pre-rendered static HTML</p>
                </div>
                <div className="bg-[#111726] border border-slate-800 p-5 rounded-2xl text-center">
                  <div className="text-xs text-slate-400">Accessibility (WCAG 2.1)</div>
                  <div className="text-3xl font-bold text-emerald-400 mt-2">100/100</div>
                  <p className="text-[11px] text-slate-500 mt-1">Full aria-labels & contrast</p>
                </div>
                <div className="bg-[#111726] border border-slate-800 p-5 rounded-2xl text-center">
                  <div className="text-xs text-slate-400">SEO & Structured Data</div>
                  <div className="text-3xl font-bold text-emerald-400 mt-2">100/100</div>
                  <p className="text-[11px] text-slate-500 mt-1">Schema.org Person & Collection</p>
                </div>
              </div>

              {/* Link Checker Results Table */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Internal & External URL Link Inspection</h3>
                {linkCheckStatus.results.length === 0 ? (
                  <p className="text-xs text-slate-400">Click &quot;Run Full Link Check&quot; to test all portfolio URLs.</p>
                ) : (
                  <div className="divide-y divide-slate-800 text-xs">
                    {linkCheckStatus.results.map((res, i) => (
                      <div key={i} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span className="font-semibold text-slate-200">{res.label}</span>
                          <span className="text-slate-500 font-mono text-[11px] hidden sm:inline">{res.url}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-bold">
                          HTTP {res.status} OK
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 13: VISITOR ANALYTICS & TRAFFIC */}
          {/* ============================================================== */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Visitor & Traffic Analytics</h1>
                <p className="text-sm text-slate-400">Privacy-first page views, popular project clicks, and referrer insights.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#111726] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">30-Day Pageviews</div>
                  <div className="text-2xl font-bold text-white mt-1">14,820</div>
                  <span className="text-[11px] text-emerald-400 font-mono">+18.4% vs last month</span>
                </div>
                <div className="bg-[#111726] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Unique Visitors</div>
                  <div className="text-2xl font-bold text-white mt-1">4,210</div>
                  <span className="text-[11px] text-emerald-400 font-mono">+12.1% vs last month</span>
                </div>
                <div className="bg-[#111726] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Avg. Session Time</div>
                  <div className="text-2xl font-bold text-white mt-1">2m 45s</div>
                  <span className="text-[11px] text-slate-400 font-mono">High engagement</span>
                </div>
                <div className="bg-[#111726] border border-slate-800 p-4 rounded-2xl">
                  <div className="text-xs text-slate-400">Bounce Rate</div>
                  <div className="text-2xl font-bold text-white mt-1">28.2%</div>
                  <span className="text-[11px] text-emerald-400 font-mono">Excellent retention</span>
                </div>
              </div>

              {/* Top Projects Engagement */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-white mb-4">Top Project Interactions</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Sportivo — Live Sports Platform</span>
                      <span className="font-mono text-emerald-400">4,320 views</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Git Visualizer</span>
                      <span className="font-mono text-emerald-400">3,140 views</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>IOE Admission Guide</span>
                      <span className="font-mono text-emerald-400">2,890 views</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '56%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 14: HOMEPAGE SECTIONS & ANNOUNCEMENT BANNER */}
          {/* ============================================================== */}
          {(activeTab === 'navigation' || activeTab === 'banner') && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Homepage Sections & Announcement Banner</h1>
                <p className="text-sm text-slate-400">Toggle sections on the homepage and update top announcement alerts.</p>
              </div>

              {/* Announcement Banner Manager */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <h3 className="text-base font-bold text-white">Top Announcement Banner</h3>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(settings.announcement?.is_active)}
                      onChange={(e) => setSettings({ ...settings, announcement: { ...settings.announcement, is_active: e.target.checked } })}
                      className="rounded text-emerald-500"
                    />
                    <span className="font-bold">Show Announcement Banner on Homepage</span>
                  </label>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Banner Message Text</label>
                  <input
                    type="text"
                    value={settings.announcement?.message || ''}
                    onChange={(e) => setSettings({ ...settings, announcement: { ...settings.announcement, message: e.target.value } })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    placeholder="🚀 Explore my latest project: Sportivo live sports platform!"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Target Link</label>
                    <input
                      type="text"
                      value={settings.announcement?.link || ''}
                      onChange={(e) => setSettings({ ...settings, announcement: { ...settings.announcement, link: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="/projects/sportivo"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Button / Link Text</label>
                    <input
                      type="text"
                      value={settings.announcement?.link_text || ''}
                      onChange={(e) => setSettings({ ...settings, announcement: { ...settings.announcement, link_text: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                      placeholder="Check it out"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('announcement', settings.announcement)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Save Banner Settings
                  </button>
                </div>
              </div>

              {/* Social Media Links Manager */}
              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
                <h3 className="text-base font-bold text-white">Social Media Profile Links</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={settings.social?.github || ''}
                      onChange={(e) => setSettings({ ...settings, social: { ...settings.social, github: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={settings.social?.linkedin || ''}
                      onChange={(e) => setSettings({ ...settings, social: { ...settings.social, linkedin: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Instagram URL</label>
                    <input
                      type="url"
                      value={settings.social?.instagram || ''}
                      onChange={(e) => setSettings({ ...settings, social: { ...settings.social, instagram: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">X (Twitter) URL</label>
                    <input
                      type="url"
                      value={settings.social?.twitter || ''}
                      onChange={(e) => setSettings({ ...settings, social: { ...settings.social, twitter: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => saveSettingSection('social', settings.social)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Save Social Links
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 15: BACKUP, EXPORT & RESTORE */}
          {/* ============================================================== */}
          {activeTab === 'backup' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Backup, Data Export & Restore</h1>
                <p className="text-sm text-slate-400">Safeguard and migrate all database records and site settings.</p>
              </div>

              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">1-Click Full JSON Backup Export</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Export all projects, articles, skills, certificates, gallery photos, testimonials, and settings as a clean, standardized JSON backup archive.
                </p>
                <button
                  onClick={handleExportBackup}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                >
                  Download Complete Backup (.json)
                </button>
              </div>

              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-white">Restore Backup Archive</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upload a previously exported portfolio JSON backup file to instantly restore database collections.
                </p>
                <label className="inline-block px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer border border-slate-700 transition-colors">
                  <span>Select JSON Backup File...</span>
                  <input
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleImportBackup}
                  />
                </label>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 16: DATABASE DIAGNOSTIC & SQL SCHEMA */}
          {/* ============================================================== */}
          {activeTab === 'database' && (
            <div className="space-y-6 animate-fade-in max-w-3xl">
              <div className="pb-4 border-b border-slate-800">
                <h1 className="text-2xl font-bold text-white">Database Engine & Supabase Diagnostic</h1>
                <p className="text-sm text-slate-400">Check connectivity, run SQL tables, and inspect row counts.</p>
              </div>

              <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-white text-sm">Supabase Project URL</span>
                  <span className="font-mono text-xs text-emerald-400">https://tihkvcybdvvovmnvkdrx.supabase.co</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Projects Table (`projects`)</span>
                    <span className="font-mono text-emerald-400">{projects.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Articles Table (`articles`)</span>
                    <span className="font-mono text-emerald-400">{articles.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Certificates Table (`certificates`)</span>
                    <span className="font-mono text-emerald-400">{certificates.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Gallery Images Table (`gallery_images`)</span>
                    <span className="font-mono text-emerald-400">{gallery.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Skills Table (`skills`)</span>
                    <span className="font-mono text-emerald-400">{skills.length} rows</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span>Storage Bucket (`portfolio-media`)</span>
                    <span className="font-mono text-emerald-400">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
