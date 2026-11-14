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
  initialSettings = {},
  initialMessages = [],
  initialSubscribers = [],
  initialAnalytics = null
}) {
  const router = useRouter();

const [activeTab, setActiveTab] = useState('analytics');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const [notification, setNotification] = useState({ text: '', type: '' });

const [confirmModal, setConfirmModal] = useState({ open: false, title: '', message: '', onConfirm: null });

const [certificates, setCertificates] = useState(initialCertificates);
  const [gallery, setGallery] = useState(initialGallery);
  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [skills, setSkills] = useState(initialSkills);
  const [experiences, setExperiences] = useState(initialExperiences);
  const [settings, setSettings] = useState(initialSettings);
  const [messages, setMessages] = useState(initialMessages);
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

const [analytics, setAnalytics] = useState(initialAnalytics);
  const [analyticsPeriod, setAnalyticsPeriod] = useState('30d');
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [chartMetric, setChartMetric] = useState('both'); 
  const [hoveredPoint, setHoveredPoint] = useState(null);

const [systemHealth, setSystemHealth] = useState({
    status: 'unknown',
    latency: null,
    checking: false,
    lastChecked: ''
  });

const [globalSearch, setGlobalSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

const [newSubEmail, setNewSubEmail] = useState('');

const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }) + ' NPT');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

const [editingItem, setEditingItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const notify = (text, type = 'success') => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification({ text: '', type: '' });
    }, 4000);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.replace('/admin/login?reason=signed-out');
    router.refresh();
  };

  // Leave the dashboard when the session ends, checked on load and whenever the tab regains focus.
  useEffect(() => {
    let expiryTimer;
    const leave = () => {
      router.replace('/admin/login?reason=expired');
      router.refresh();
    };
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/auth', { cache: 'no-store' });
        const data = await res.json();
        if (!data.authenticated) {
          leave();
          return;
        }
        clearTimeout(expiryTimer);
        expiryTimer = setTimeout(leave, Math.max(0, data.expiresAt - Date.now()));
      } catch {
        // Offline or a failed request: keep the page and check again on the next focus.
      }
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') checkSession();
    };
    checkSession();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearTimeout(expiryTimer);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [router]);

const handlePeriodChange = async (newPeriod) => {
    if (newPeriod === analyticsPeriod && analytics) return;
    setAnalyticsPeriod(newPeriod);
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`/api/analytics?period=${newPeriod}`);
      const data = await res.json();
      if (data.success && data.data) {
        setAnalytics(data.data);
      }
    } catch {
      notify('Failed to load analytics', 'error');
    } finally {
      setAnalyticsLoading(false);
    }
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
      return data;
    } finally {
      setUploadingMedia(false);
    }
  };

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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    if (tabId === 'media' && mediaFiles.length === 0) {
      fetchMedia();
    }
  };

const saveSettingSection = async (key, value) => {
    try {
      let finalValue = value;
      if (key === 'announcement' && typeof value === 'object') {
        const textVal = (value.text || value.message || '').trim();
        finalValue = { ...value, text: textVal, message: textVal };
      }
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value: finalValue })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }
      setSettings(prev => ({ ...prev, [key]: finalValue }));
      if (key === 'announcement' && typeof window !== 'undefined') {
        try {
          localStorage.setItem('site_features_announcement', JSON.stringify({
            ...finalValue,
            timestamp: Date.now()
          }));
          window.dispatchEvent(new Event('storage'));
        } catch {}
      }
      notify(`${key.charAt(0).toUpperCase() + key.slice(1)} settings updated`);
    } catch (err) {
      notify(err.message, 'error');
    }
  };

const handleExportBackup = () => {
    window.open('/api/admin/backup', '_blank');
    notify('Exporting the database as JSON');
  };

const runHealthCheck = async () => {
    setSystemHealth(prev => ({ ...prev, checking: true }));
    const t0 = performance.now();
    try {
      const res = await fetch('/api/health');
      const t1 = performance.now();
      const latency = Math.max(1, Math.round(t1 - t0));
      if (res.ok) {
        setSystemHealth({
          status: 'healthy',
          latency,
          checking: false,
          lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        notify(`Health check passed in ${latency} ms`);
      } else {
        setSystemHealth({
          status: 'degraded',
          latency,
          checking: false,
          lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        notify('Health check reported degraded status', 'error');
      }
    } catch {
      setSystemHealth({
        status: 'error',
        latency: 0,
        checking: false,
        lastChecked: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      notify('Health check request failed', 'error');
    }
  };

  const toggleAnnouncement = async () => {
    const current = settings.announcement || {};
    const textVal = (current.text || current.message || '').trim();
    const updated = { ...current, text: textVal, message: textVal, is_active: !current.is_active };
    await saveSettingSection('announcement', updated);
  };

  const togglePopup = async () => {
    const current = settings.popup || {};
    const updated = { ...current, is_active: !current.is_active };
    await saveSettingSection('popup', updated);
  };

const toggleMessageRead = async (id, currentRead) => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_read: !currentRead })
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: !currentRead } : m));
        notify(!currentRead ? 'Message marked as read' : 'Message marked as unread');
      }
    } catch {
      notify('Failed to update message status', 'error');
    }
  };

const copyAllEmails = () => {
    if (subscribers.length === 0) {
      notify('No subscribers to copy', 'error');
      return;
    }
    const emails = subscribers.map(s => s.email).filter(Boolean).join(', ');
    navigator.clipboard.writeText(emails);
    notify(`Copied ${subscribers.length} subscriber emails`);
  };

  const exportSubscribersCSV = () => {
    if (subscribers.length === 0) {
      notify('No subscribers to export', 'error');
      return;
    }
    const headers = "id,email,status,subscribed_at\n";
    const rows = subscribers.map(s => `${s.id || ''},"${s.email || ''}","${s.status || 'active'}","${s.subscribed_at || ''}"`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    notify('Subscribers exported as CSV');
  };

  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    if (!newSubEmail || !newSubEmail.includes('@')) {
      notify('Enter a valid email address', 'error');
      return;
    }
    try {
      const res = await fetch('/api/admin/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newSubEmail })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add subscriber');
      setSubscribers(prev => [data.data || { id: Date.now(), email: newSubEmail, status: 'active', subscribed_at: new Date().toISOString() }, ...prev]);
      setNewSubEmail('');
      notify('Subscriber added');
    } catch (err) {
      notify(err.message, 'error');
    }
  };

  const handleDeleteSubscriber = (id, email) => {
    setConfirmModal({
      open: true,
      title: 'Remove subscriber',
      message: `Are you sure you want to remove "${email}"?`,
      onConfirm: async () => {
        try {
          const res = await fetch(`/api/admin/subscribers?id=${id}`, { method: 'DELETE' });
          if (!res.ok) throw new Error('Failed to delete subscriber');
          setSubscribers(prev => prev.filter(s => s.id !== id));
          notify(`Removed ${email}`);
        } catch (err) {
          notify(err.message, 'error');
        }
      }
    });
  };

const searchResults = useMemo(() => {
    if (!globalSearch || globalSearch.trim().length < 2) return [];
    const q = globalSearch.toLowerCase().trim();
    const results = [];

    projects.forEach(p => {
      if (p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.tech?.some(t => t.toLowerCase().includes(q))) {
        results.push({ type: 'Project', title: p.title, subtitle: p.category_label || p.category, tab: 'projects' });
      }
    });

    articles.forEach(a => {
      if (a.title?.toLowerCase().includes(q) || a.excerpt?.toLowerCase().includes(q) || a.tags?.some(t => t.toLowerCase().includes(q))) {
        results.push({ type: 'Article', title: a.title, subtitle: a.category || 'Blog', tab: 'articles' });
      }
    });

    certificates.forEach(c => {
      if (c.title?.toLowerCase().includes(q) || c.org?.toLowerCase().includes(q) || c.category?.toLowerCase().includes(q)) {
        results.push({ type: 'Certificate', title: c.title, subtitle: c.org, tab: 'certificates' });
      }
    });

    skills.forEach(s => {
      if (s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q)) {
        results.push({ type: 'Skill', title: s.name, subtitle: s.category, tab: 'skills' });
      }
    });

    gallery.forEach(g => {
      if (g.title?.toLowerCase().includes(q) || g.category?.toLowerCase().includes(q)) {
        results.push({ type: 'Gallery', title: g.title, subtitle: g.category, tab: 'gallery' });
      }
    });

    messages.forEach(m => {
      if (m.name?.toLowerCase().includes(q) || m.email?.toLowerCase().includes(q) || m.message?.toLowerCase().includes(q)) {
        results.push({ type: 'Inquiry', title: `${m.name} (${m.email})`, subtitle: m.subject || m.message?.slice(0, 40), tab: 'inbox' });
      }
    });

    subscribers.forEach(sub => {
      if (sub.email?.toLowerCase().includes(q)) {
        results.push({ type: 'Subscriber', title: sub.email, subtitle: 'Subscriber', tab: 'subscribers' });
      }
    });

    return results.slice(0, 8);
  }, [globalSearch, projects, articles, certificates, skills, gallery, messages, subscribers]);

const navGroups = [
    {
      group: 'Analytics',
      items: [
        { id: 'analytics', label: 'Visitor analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' }
      ]
    },
    {
      group: 'Content',
      items: [
        { id: 'projects', label: 'Projects', count: projects.length, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
        { id: 'articles', label: 'Articles', count: articles.length, icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
        { id: 'certificates', label: 'Certificates', count: certificates.length, icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' },
        { id: 'skills', label: 'Skills', count: skills.length, icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
        { id: 'gallery', label: 'Gallery', count: gallery.length, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { id: 'experience', label: 'Resume', count: experiences.length, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' }
      ]
    },
    {
      group: 'Audience',
      items: [
        { id: 'inbox', label: 'Inbox', count: messages.filter(m => !m.is_read).length, highlight: messages.filter(m => !m.is_read).length > 0, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { id: 'subscribers', label: 'Subscribers', count: subscribers.length, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
      ]
    },
    {
      group: 'Operations',
      items: [
        { id: 'announcements', label: 'Banner and popup', badge: (settings.announcement?.is_active || settings.popup?.is_active) ? 'Active' : undefined, icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
        { id: 'media', label: 'Media', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
        { id: 'seo', label: 'SEO and health', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
        { id: 'database', label: 'Backup', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4' }
      ]
    }
  ];

const chartPoints = useMemo(() => {
    if (!analytics || !analytics.timeseries || analytics.timeseries.length === 0) return [];
    return analytics.timeseries;
  }, [analytics]);

  const maxVal = useMemo(() => {
    if (chartPoints.length === 0) return 100;
    const maxVisits = Math.max(...chartPoints.map(p => p.visits || 0));
    const maxViews = Math.max(...chartPoints.map(p => p.pageViews || 0));
    return Math.max(maxVisits, maxViews, 50) * 1.15;
  }, [chartPoints]);

  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 35;
  const paddingY = 25;

  const getCoordinates = React.useCallback((index, value) => {
    const x = paddingX + (index / Math.max(chartPoints.length - 1, 1)) * (chartWidth - paddingX * 2);
    const y = chartHeight - paddingY - (value / maxVal) * (chartHeight - paddingY * 2);
    return { x, y };
  }, [chartPoints.length, maxVal]);

  const visitsPath = useMemo(() => {
    if (chartPoints.length === 0) return '';
    return chartPoints.map((p, i) => {
      const { x, y } = getCoordinates(i, p.visits);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [chartPoints, getCoordinates]);

  const visitsArea = useMemo(() => {
    if (chartPoints.length === 0) return '';
    const first = getCoordinates(0, chartPoints[0].visits);
    const last = getCoordinates(chartPoints.length - 1, chartPoints[chartPoints.length - 1].visits);
    const bottomY = chartHeight - paddingY;
    return `${visitsPath} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  }, [visitsPath, chartPoints, getCoordinates]);

  const viewsPath = useMemo(() => {
    if (chartPoints.length === 0) return '';
    return chartPoints.map((p, i) => {
      const { x, y } = getCoordinates(i, p.pageViews);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  }, [chartPoints, getCoordinates]);

  return (
    <div className="min-h-screen bg-[#141415] text-zinc-100 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-zinc-950">

{notification.text && (
        <div role="status" className="fixed top-4 right-4 z-50 px-3 py-2.5 rounded-lg shadow-xl flex items-center gap-2.5 text-xs font-medium bg-[#232325] text-zinc-100 border border-white/10">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${notification.type === 'error' ? 'bg-[#e5484d]' : 'bg-emerald-400'}`} aria-hidden="true"></span>
          <span>{notification.text}</span>
          <button onClick={() => setNotification({ text: '', type: '' })} aria-label="Dismiss" className="text-zinc-500 hover:text-zinc-200 transition-colors ml-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

{confirmModal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1f] border border-zinc-800 rounded-xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-white">{confirmModal.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{confirmModal.message}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800/80">
              <button
                type="button"
                onClick={() => setConfirmModal({ open: false, title: '', message: '', onConfirm: null })}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={async () => {
                  const cb = confirmModal.onConfirm;
                  setConfirmModal({ open: false, title: '', message: '', onConfirm: null });
                  if (cb) await cb();
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

<header className="h-14 border-b border-zinc-800/80 bg-[#141415] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-zinc-950 font-semibold flex items-center justify-center text-xs">
              DS
            </div>
            <div>
              <span className="font-medium text-xs text-white">Dipesh Sapkota</span>
              <span className="hidden sm:inline text-zinc-500 text-xs ml-1.5 font-normal">Dashboard</span>
            </div>
          </Link>
        </div>

<div className="relative flex-1 max-w-sm mx-4 hidden md:block">
          <div className="relative">
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search" aria-label="Search content"
              className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-600 transition-colors"
            />
            <svg className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            {globalSearch && (
              <button onClick={() => setGlobalSearch('')} className="absolute right-2.5 top-2 text-zinc-500 hover:text-zinc-300 text-xs">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}
          </div>

{searchFocused && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#1c1c1f] border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50 divide-y divide-zinc-800/60">
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onMouseDown={() => {
                    handleTabChange(res.tab);
                    setGlobalSearch('');
                    setSearchFocused(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-zinc-800/50 flex items-center justify-between transition-colors group"
                >
                  <div className="truncate pr-2">
                    <div className="text-xs font-medium text-white group-hover:text-emerald-400 truncate">{res.title}</div>
                    <div className="text-[11px] text-zinc-500 truncate">{res.subtitle}</div>
                  </div>
                  <span className="text-[11px] px-1.5 py-0.5 rounded font-mono shrink-0 bg-zinc-800 text-zinc-400">
                    {res.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

<div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={runHealthCheck}
            title="Check server and database latency"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono transition-colors"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${
              systemHealth.status === 'healthy' ? 'bg-emerald-400' : systemHealth.status === 'unknown' ? 'bg-zinc-500' : systemHealth.status === 'degraded' ? 'bg-amber-400' : 'bg-[#e5484d]'
            } ${systemHealth.checking ? 'opacity-40' : ''}`}></span>
            <span className="text-zinc-300 text-[11px]">{systemHealth.checking ? 'Checking' : systemHealth.latency == null ? 'Health' : `${systemHealth.latency} ms`}</span>
          </button>

          <div className="hidden xl:block px-2.5 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-[11px] font-mono text-zinc-400">
            {currentTime || 'NPT'}
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-colors border border-zinc-800"
          >
            <span>Site</span>
            <svg className="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>

          <button
            onClick={handleLogout}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-medium transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        <aside className={`fixed inset-y-0 left-0 z-30 w-56 bg-[#0f0f10] border-r border-zinc-800/80 pt-16 lg:pt-0 transform lg:tranzinc-x-0 transition-transform duration-150 ease-in-out lg:static shrink-0 ${
          mobileMenuOpen ? 'tranzinc-x-0' : '-tranzinc-x-full'
        }`}>
          <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
            {navGroups.map((grp) => (
              <div key={grp.group} className="space-y-0.5">
                <div className="px-2.5 py-1 text-[11px] text-zinc-500">
                  {grp.group}
                </div>
                {grp.items.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-zinc-800 text-white font-semibold'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <svg className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                        </svg>
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.count !== undefined && (
                        <span className={`text-[11px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                          item.highlight && item.count > 0
                            ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                            : isActive ? 'bg-zinc-900 text-zinc-300' : 'bg-zinc-900/60 text-zinc-500'
                        }`}>
                          {item.count}
                        </span>
                      )}
                      {item.badge && (
                        <span className="text-[11px] px-1 py-0.5 rounded font-mono shrink-0 bg-emerald-500/15 text-emerald-400">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

<main className="flex-1 overflow-y-auto p-4 sm:p-7 bg-[#141415]">

{activeTab === 'analytics' && (
            <div className="space-y-6 max-w-6xl mx-auto">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold text-white tracking-tight">Visitor analytics</h1>
                    <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
                      Tracking on
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">Audience traffic, visitor behavior, and portfolio engagement</p>
                </div>

                <div className="flex items-center gap-2">
                  
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs">
                    {[
                      { key: '7d', label: '7 days' },
                      { key: '30d', label: '30 days' },
                      { key: '90d', label: '90 days' },
                      { key: 'all', label: 'All time' }
                    ].map(p => (
                      <button
                        key={p.key}
                        onClick={() => handlePeriodChange(p.key)}
                        disabled={analyticsLoading}
                        className={`px-3 py-1 rounded-md text-[11px] font-medium transition-colors ${
                          analyticsPeriod === p.key
                            ? 'bg-zinc-800 text-white font-semibold shadow-sm'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePeriodChange(analyticsPeriod)}
                    disabled={analyticsLoading}
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Refresh analytics data"
                  >
                    <svg className={`w-3.5 h-3.5 ${analyticsLoading ? 'animate-spin text-emerald-400' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  </button>
                </div>
              </div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#19191b] border border-zinc-800/80 p-4 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Total visits</span>
                    <span className="text-[11px] text-zinc-500 font-mono tabular-nums" title="Second half of the period compared with the first half">
                      {analytics?.metrics?.trends?.visits ?? '0.0%'} vs prior half
                    </span>
                  </div>
                  <div className="text-2xl font-medium text-white tabular-nums">
                    {analytics?.metrics?.totalVisits !== undefined ? analytics.metrics.totalVisits.toLocaleString() : '0'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Sessions across all pages
                  </div>
                </div>

                <div className="bg-[#19191b] border border-zinc-800/80 p-4 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Unique visitors</span>
                    <span className="text-[11px] text-zinc-500 font-mono tabular-nums" title="Second half of the period compared with the first half">
                      {analytics?.metrics?.trends?.unique ?? '0.0%'} vs prior half
                    </span>
                  </div>
                  <div className="text-2xl font-medium text-white tabular-nums">
                    {analytics?.metrics?.uniqueVisitors !== undefined ? analytics.metrics.uniqueVisitors.toLocaleString() : '0'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Individual devices tracked
                  </div>
                </div>

                <div className="bg-[#19191b] border border-zinc-800/80 p-4 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Page views</span>
                    <span className="text-[11px] text-zinc-500 font-mono tabular-nums" title="Second half of the period compared with the first half">
                      {analytics?.metrics?.trends?.views ?? '0.0%'} vs prior half
                    </span>
                  </div>
                  <div className="text-2xl font-medium text-white tabular-nums">
                    {analytics?.metrics?.pageViews !== undefined ? analytics.metrics.pageViews.toLocaleString() : '0'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    {analytics?.metrics?.totalVisits > 0 
                      ? `~${(analytics.metrics.pageViews / analytics.metrics.totalVisits).toFixed(1)} views per session`
                      : '0 views per session'}
                  </div>
                </div>

                <div className="bg-[#19191b] border border-zinc-800/80 p-4 rounded-xl space-y-1">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Average session</span>
                    <span className="text-[11px] text-zinc-500 font-mono tabular-nums" title="Second half of the period compared with the first half">
                      {analytics?.metrics?.trends?.duration ?? '0.0%'} vs prior half
                    </span>
                  </div>
                  <div className="text-2xl font-medium text-white tabular-nums">
                    {analytics?.metrics?.avgDuration ?? '0s'}
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Bounce rate: {analytics?.metrics?.bounceRate ?? '0.0%'}
                  </div>
                </div>
              </div>

<div className="bg-[#19191b] border border-zinc-800/80 p-5 rounded-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Daily traffic</h3>
                    <p className="text-xs text-zinc-400">Visits and page views per day over the selected period</p>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => setChartMetric('both')}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                        chartMetric === 'both' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Visits</span>
                      <span className="text-zinc-500">/</span>
                      <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                      <span>Views</span>
                    </button>
                    <button
                      onClick={() => setChartMetric('visits')}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                        chartMetric === 'visits' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Visits</span>
                    </button>
                    <button
                      onClick={() => setChartMetric('views')}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${
                        chartMetric === 'views' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-300'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                      <span>Views</span>
                    </button>
                  </div>
                </div>

<div className="relative w-full overflow-x-auto pt-2">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-56 overflow-visible font-sans select-none"
                  >
                    <defs>
                      <linearGradient id="emeraldFade" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

{[0.25, 0.5, 0.75, 1].map((pct, idx) => {
                      const y = chartHeight - paddingY - pct * (chartHeight - paddingY * 2);
                      const labelVal = Math.round(maxVal * pct);
                      return (
                        <g key={idx}>
                          <line
                            x1={paddingX}
                            y1={y}
                            x2={chartWidth - paddingX}
                            y2={y}
                            stroke="#27272a"
                            strokeDasharray="4 4"
                            strokeWidth="1"
                          />
                          <text
                            x={paddingX - 8}
                            y={y + 3}
                            fill="#85858b"
                            fontSize="10"
                            fontFamily="monospace"
                            textAnchor="end"
                          >
                            {labelVal}
                          </text>
                        </g>
                      );
                    })}

{(chartMetric === 'both' || chartMetric === 'views') && (
                      <>
                        <path d={viewsPath} fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        {chartPoints.map((p, i) => {
                          const { x, y } = getCoordinates(i, p.pageViews);
                          return (
                            <circle
                              key={`v-${i}`}
                              cx={x}
                              cy={y}
                              r={hoveredPoint === i ? 5 : 2.5}
                              fill="#a1a1aa"
                            />
                          );
                        })}
                      </>
                    )}

{(chartMetric === 'both' || chartMetric === 'visits') && (
                      <>
                        <path d={visitsArea} fill="url(#emeraldFade)" />
                        <path d={visitsPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        {chartPoints.map((p, i) => {
                          const { x, y } = getCoordinates(i, p.visits);
                          return (
                            <circle
                              key={`p-${i}`}
                              cx={x}
                              cy={y}
                              r={hoveredPoint === i ? 5.5 : 3}
                              fill="#10b981"
                            />
                          );
                        })}
                      </>
                    )}

{chartPoints.map((p, i) => {
                      const { x } = getCoordinates(i, 0);
                      const isHovered = hoveredPoint === i;
                      const labelStep = Math.ceil(chartPoints.length / 8);
                      const showLabel = hoveredPoint === null ? i % labelStep === 0 : isHovered;
                      return (
                        <g key={`x-${i}`}>
                          <text
                            opacity={showLabel ? 1 : 0}
                            x={x}
                            y={chartHeight - 6}
                            fill={isHovered ? '#ededed' : '#85858b'}
                            fontSize="10"
                            fontFamily="monospace"
                            textAnchor="middle"
                          >
                            {p.label}
                          </text>

<rect
                            x={x - (chartWidth / chartPoints.length) / 2}
                            y={paddingY}
                            width={chartWidth / chartPoints.length}
                            height={chartHeight - paddingY * 2}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredPoint(i)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        </g>
                      );
                    })}
                  </svg>

{hoveredPoint !== null && chartPoints[hoveredPoint] && (
                    <div
                      className="absolute top-4 left-1/2 -tranzinc-x-1/2 bg-zinc-900 border border-zinc-700/80 px-3 py-1.5 rounded-lg shadow-xl text-xs flex items-center gap-3 font-mono pointer-events-none"
                    >
                      <span className="text-white font-semibold">{chartPoints[hoveredPoint].label}</span>
                      <span className="text-emerald-400">{chartPoints[hoveredPoint].visits} visits</span>
                      <span className="text-zinc-300">{chartPoints[hoveredPoint].pageViews} views</span>
                    </div>
                  )}
                </div>
              </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

<div className="bg-[#19191b] border border-zinc-800/80 p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Top pages</h3>
                      <p className="text-xs text-zinc-400">Most viewed URLs on the portfolio</p>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Share of views</span>
                  </div>

                  <div className="space-y-3">
                    {(analytics?.topPages || []).length > 0 ? (
                      analytics.topPages.map((page) => (
                        <div key={page.path} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2 truncate pr-2">
                              <span className="font-mono text-zinc-300 truncate">{page.path}</span>
                              <span className="text-[11px] text-zinc-500 truncate hidden sm:inline">· {page.title}</span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                              <span className="text-zinc-400">{page.views.toLocaleString()}</span>
                              <span className="text-emerald-400 font-medium w-9 text-right tabular-nums">{page.percent}%</span>
                            </div>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${page.percent}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                        No page views recorded yet
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#19191b] border border-zinc-800/80 p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Referrers</h3>
                      <p className="text-xs text-zinc-400">Where visitors arrive from</p>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Share of visits</span>
                  </div>

                  <div className="space-y-3">
                    {(analytics?.referrers || []).length > 0 ? (
                      analytics.referrers.map((ref) => (
                        <div key={ref.source} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-300 font-medium">{ref.source}</span>
                            <div className="flex items-center gap-3 font-mono text-[11px]">
                              <span className="text-zinc-400">{ref.visits.toLocaleString()} visits</span>
                              <span className="text-zinc-200 font-medium w-8 text-right tabular-nums">{ref.percent}%</span>
                            </div>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                            <div
                              className="bg-zinc-400 h-full rounded-full"
                              style={{ width: `${ref.percent}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                        No referrers recorded yet
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#19191b] border border-zinc-800/80 p-5 rounded-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Countries</h3>
                      <p className="text-xs text-zinc-400">Visitors by country</p>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500">Share of visitors</span>
                  </div>

                  <div className="space-y-3">
                    {(analytics?.countries || []).length > 0 ? (
                      analytics.countries.map((c) => (
                        <div key={c.country} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[11px] text-zinc-400">{c.code}</span>
                              <span className="text-zinc-300 font-medium">{c.country}</span>
                            </div>
                            <div className="flex items-center gap-3 font-mono text-[11px]">
                              <span className="text-zinc-400">{c.visitors.toLocaleString()} visitors</span>
                              <span className="text-zinc-200 font-medium w-8 text-right tabular-nums">{c.percent}%</span>
                            </div>
                          </div>
                          <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
                            <div
                              className="bg-zinc-400 h-full rounded-full"
                              style={{ width: `${c.percent}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                        No country data recorded yet
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#19191b] border border-zinc-800/80 p-5 rounded-xl space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Devices and browsers</h3>
                    <p className="text-xs text-zinc-400">Share of visits by device type and browser</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Device types</span>
                      <span className="font-mono text-[11px]">
                        {(analytics?.devices || []).length > 0
                          ? analytics.devices.map(d => `${d.type} ${d.percent}%`).join(' · ')
                          : 'No device events recorded yet'}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden flex">
                      {(analytics?.devices || []).length > 0 ? (
                        analytics.devices.map((d, idx) => {
                          const colors = ['bg-emerald-400', 'bg-zinc-400', 'bg-zinc-500', 'bg-zinc-600'];
                          return (
                            <div
                              key={d.type}
                              style={{ width: `${d.percent}%` }}
                              className={`${colors[idx % colors.length]} h-full`}
                              title={`${d.type}: ${d.percent}%`}
                            />
                          );
                        })
                      ) : (
                        <div style={{ width: '0%' }} className="bg-emerald-400 h-full" />
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                    <span className="text-xs text-zinc-400 block">Top browsers</span>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      {(analytics?.browsers || []).length > 0 ? (
                        analytics.browsers.map((b) => (
                          <div key={b.name} className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between">
                            <span className="text-zinc-300 font-sans">{b.name}</span>
                            <span className="text-zinc-200 font-medium tabular-nums">{b.percent}%</span>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-2 py-4 text-center text-zinc-500 font-sans text-xs">
                          No browser data recorded yet
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                    <span className="text-xs text-zinc-400 block">Engagement</span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                        <div className="text-[11px] text-zinc-500">Live demo clicks</div>
                        <div className="text-sm font-medium text-white font-mono tabular-nums mt-0.5">{analytics?.engagement?.projectDemoLaunches ?? 0}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                        <div className="text-[11px] text-zinc-500">GitHub code links</div>
                        <div className="text-sm font-medium text-white font-mono tabular-nums mt-0.5">{analytics?.engagement?.githubCodeClicks ?? 0}</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

{activeTab === 'projects' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Projects</h1>
                  <p className="text-xs text-zinc-400">Featured software and engineering case studies</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'dev', category_label: 'Development', status: 'published', featured: false, tech: [] }); setEditModalOpen(true); }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-colors"
                >
                  Add project
                </button>
              </div>

              <div className="bg-[#19191b] border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/80 text-zinc-400 font-mono border-b border-zinc-800">
                    <tr>
                      <th className="p-3.5">Project</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Tech</th>
                      <th className="p-3.5">Featured</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {projects.map((proj) => (
                      <tr key={proj.id || proj.slug} className="hover:bg-zinc-900/40">
                        <td className="p-3.5">
                          <div className="font-semibold text-white">{proj.title}</div>
                          <span className="text-[11px] text-zinc-500 font-mono">/{proj.slug}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px]">
                            {proj.category_label || proj.category}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-[11px] text-zinc-400">
                          {Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech}
                        </td>
                        <td className="p-3.5 font-mono">
                          {proj.featured ? <span className="text-emerald-400">Yes</span> : 'No'}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => { setEditingItem(proj); setEditModalOpen(true); }}
                            className="text-emerald-400 hover:underline px-2 py-1 text-[11px]"
                          >
                            Edit
                          </button>
                          {proj.live_url && (
                            <a href={proj.live_url} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white px-2 py-1 text-[11px]">Demo</a>
                          )}
                          <button
                            onClick={() => {
                              setConfirmModal({
                                open: true,
                                title: 'Delete project',
                                message: `Delete project "${proj.title}"?`,
                                onConfirm: async () => {
                                  if (proj.id) await fetch(`/api/admin/projects?id=${proj.id}`, { method: 'DELETE' });
                                  setProjects(prev => prev.filter(p => p.slug !== proj.slug));
                                  notify('Project removed');
                                }
                              });
                            }}
                            className="text-rose-400 hover:text-rose-300 px-2 py-1 text-[11px]"
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

{activeTab === 'articles' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Articles</h1>
                  <p className="text-xs text-zinc-400">Technical publications and engineering guides</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Engineering', read_time: '5 min read', status: 'published' }); setEditModalOpen(true); }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-colors"
                >
                  New Article
                </button>
              </div>

              <div className="space-y-3">
                {articles.map((art) => (
                  <div key={art.id || art.slug} className="bg-[#19191b] border border-zinc-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-zinc-700 transition-colors">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px]">{art.category}</span>
                        <span className="text-[11px] text-zinc-500 font-mono">{art.read_time}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-white truncate">{art.title}</h3>
                      <p className="text-xs text-zinc-400 line-clamp-1">{art.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingItem(art); setEditModalOpen(true); }}
                        className="px-2.5 py-1 rounded bg-zinc-800 text-emerald-400 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: 'Delete article',
                            message: `Delete article "${art.title}"?`,
                            onConfirm: async () => {
                              await fetch(`/api/admin/blog?id=${art.id}`, { method: 'DELETE' });
                              setArticles(prev => prev.filter(a => a.id !== art.id));
                              notify('Article removed');
                            }
                          });
                        }}
                        className="text-rose-400 hover:text-rose-300 text-xs px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

{activeTab === 'certificates' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Certificates</h1>
                  <p className="text-xs text-zinc-400">Verified credentials and professional accreditations</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Design', org: 'Udemy' }); setEditModalOpen(true); }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs"
                >
                  Add certificate
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-[#19191b] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-colors">
                    <div className="relative aspect-video w-full bg-zinc-900">
                      {cert.img ? (
                        <Image src={cert.img} alt={cert.title} fill unoptimized={Boolean(cert.img?.startsWith('http'))} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">No image</div>
                      )}
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[11px]">{cert.category}</span>
                        <h4 className="font-semibold text-xs text-white mt-1.5 line-clamp-2">{cert.title}</h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{cert.org}</p>
                      </div>
                      <div className="pt-2.5 border-t border-zinc-800/80 mt-2.5 flex items-center justify-between text-xs">
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
                              title: 'Delete certificate',
                              message: `Delete certificate "${cert.title}"?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/certificates?id=${cert.id}`, { method: 'DELETE' });
                                setCertificates(prev => prev.filter(c => c.id !== cert.id));
                                notify('Certificate removed');
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

{activeTab === 'skills' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Skills</h1>
                  <p className="text-xs text-zinc-400">Technical competencies and engineering tools</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Development', description: '' }); setEditModalOpen(true); }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs"
                >
                  Add skill
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skills.map((s) => (
                  <div key={s.id || s.name} className="bg-[#19191b] border border-zinc-800/80 p-3 rounded-lg flex items-center justify-between hover:border-zinc-700 transition-colors">
                    <div className="flex-1 min-w-0 mr-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-white text-xs truncate">{s.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[11px] font-mono">{s.category}</span>
                      </div>
                      {s.description && (
                        <p className="text-[11px] text-zinc-500 truncate">{s.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => { setEditingItem(s); setEditModalOpen(true); }}
                        className="px-2 py-0.5 bg-zinc-800 text-emerald-400 text-[11px] rounded hover:bg-zinc-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: 'Delete skill',
                            message: `Delete skill "${s.name}"?`,
                            onConfirm: async () => {
                              if (s.id) await fetch(`/api/admin/skills?id=${s.id}`, { method: 'DELETE' });
                              setSkills(prev => prev.filter(item => item.name !== s.name));
                              notify('Skill deleted');
                            }
                          });
                        }}
                        className="px-1.5 py-0.5 bg-rose-500/10 text-rose-400 text-[11px] rounded hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

{activeTab === 'gallery' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Gallery</h1>
                  <p className="text-xs text-zinc-400">Campus events, sports, and team photo archive</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ category: 'Campus' }); setEditModalOpen(true); }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs"
                >
                  Add photo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item) => (
                  <div key={item.id} className="bg-[#19191b] border border-zinc-800/80 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-colors">
                    <div className="relative aspect-video w-full bg-zinc-900">
                      {item.img ? (
                        <Image src={item.img} alt={item.alt || item.title} fill unoptimized={Boolean(item.img?.startsWith('http'))} className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">No preview</div>
                      )}
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-zinc-300 font-mono text-[11px]">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-semibold text-xs text-white line-clamp-1">{item.title}</h4>
                        <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-1">{item.alt}</p>
                      </div>
                      <div className="pt-2.5 border-t border-zinc-800/80 mt-2.5 flex items-center justify-between text-xs">
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
                              title: 'Delete photo',
                              message: `Delete "${item.title}"?`,
                              onConfirm: async () => {
                                await fetch(`/api/admin/gallery?id=${item.id}`, { method: 'DELETE' });
                                setGallery(prev => prev.filter(g => g.id !== item.id));
                                notify('Photo removed');
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

{activeTab === 'inbox' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Inbox</h1>
                  <p className="text-xs text-zinc-400">Direct messages submitted through the contact form</p>
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  {messages.filter(m => !m.is_read).length} unread / {messages.length} total
                </div>
              </div>

              {messages.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 text-xs bg-zinc-900/40 rounded-xl border border-zinc-800/60">
                  No inquiries received yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-4 rounded-xl bg-[#19191b] border border-zinc-800/80 space-y-2 hover:border-zinc-700 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${msg.is_read ? 'bg-zinc-600' : 'bg-emerald-400'}`}></span>
                          <span className="font-semibold text-white">{msg.name}</span>
                          <span className="text-emerald-400 font-mono text-[11px]">({msg.email})</span>
                        </div>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {new Date(msg.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-300 font-medium">{msg.subject || 'Portfolio Inquiry'}</div>
                      <p className="text-xs text-zinc-400 bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60 leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-xs">
                        <button
                          onClick={() => toggleMessageRead(msg.id, msg.is_read)}
                          className="text-[11px] text-zinc-400 hover:text-zinc-200"
                        >
                          {msg.is_read ? 'Mark as Unread' : 'Mark as Read'}
                        </button>
                        <div className="flex items-center gap-3">
                          <a
                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}&su=${encodeURIComponent('Re: ' + (msg.subject || 'Portfolio Inquiry'))}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-emerald-400 hover:underline font-medium"
                          >
                            Reply via Gmail
                          </a>
                          <button
                            onClick={() => {
                              setConfirmModal({
                                open: true,
                                title: 'Delete message',
                                message: `Delete inquiry from "${msg.name}"?`,
                                onConfirm: async () => {
                                  await fetch(`/api/admin/messages?id=${msg.id}`, { method: 'DELETE' });
                                  setMessages(prev => prev.filter(m => m.id !== msg.id));
                                  notify('Message deleted');
                                }
                              });
                            }}
                            className="text-[11px] text-rose-400 hover:text-rose-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

{activeTab === 'subscribers' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Subscribers</h1>
                  <p className="text-xs text-zinc-400">Newsletter subscribers and followers</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyAllEmails}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Copy emails
                  </button>
                  <button
                    onClick={exportSubscribersCSV}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

<form onSubmit={handleAddSubscriber} className="flex gap-2 bg-[#19191b] p-3 rounded-xl border border-zinc-800/80">
                <input
                  type="email"
                  value={newSubEmail}
                  onChange={(e) => setNewSubEmail(e.target.value)}
                  placeholder="Email address" aria-label="Subscriber email"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 outline-none focus:border-zinc-700"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs"
                >
                  Add
                </button>
              </form>

              <div className="bg-[#19191b] border border-zinc-800/80 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/80 text-zinc-400 font-mono border-b border-zinc-800">
                    <tr>
                      <th className="p-3.5">Email</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    {subscribers.map((s) => (
                      <tr key={s.id || s.email} className="hover:bg-zinc-900/40">
                        <td className="p-3.5 font-medium text-white">{s.email}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px]">
                            {s.status || 'active'}
                          </span>
                        </td>
                        <td className="p-3.5 text-zinc-500 font-mono text-[11px]">
                          {s.subscribed_at ? new Date(s.subscribed_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(s.id, s.email)}
                            className="text-rose-400 hover:text-rose-300 text-[11px]"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

{activeTab === 'announcements' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="pb-3 border-b border-zinc-800">
                <h1 className="text-lg font-semibold text-white">Banner and popup</h1>
                <p className="text-xs text-zinc-400">Configure the top rolling ticker and arrival modal</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                <div className="bg-[#19191b] border border-zinc-800/80 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${settings.announcement?.is_active ? 'bg-emerald-400' : 'bg-zinc-600'}`}></span>
                      <h3 className="text-xs font-semibold text-white">Top banner</h3>
                    </div>
                    <button
                      onClick={toggleAnnouncement}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        settings.announcement?.is_active
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {settings.announcement?.is_active ? 'Pause' : 'Activate'}
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-zinc-400 mb-1">Announcement text</label>
                      <input
                        type="text"
                        value={settings.announcement?.text || settings.announcement?.message || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSettings(prev => ({
                            ...prev,
                            announcement: {
                              ...prev.announcement,
                              text: val,
                              message: val
                            }
                          }));
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none"
                        placeholder="Open for Computer Engineering opportunities and AI/ML research collaborations"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Scroll duration</label>
                      <input
                        type="text"
                        value={settings.announcement?.speed || '25s'}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          announcement: { ...prev.announcement, speed: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none font-mono"
                        placeholder="25s"
                      />
                    </div>
                    <button
                      onClick={() => {
                        const current = settings.announcement || {};
                        const textVal = (current.text || current.message || '').trim();
                        saveSettingSection('announcement', { ...current, text: textVal, message: textVal });
                      }}
                      className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs"
                    >
                      Save Banner Settings
                    </button>
                  </div>
                </div>

<div className="bg-[#19191b] border border-zinc-800/80 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${settings.popup?.is_active ? 'bg-emerald-400' : 'bg-zinc-600'}`}></span>
                      <h3 className="text-xs font-semibold text-white">Entry popup</h3>
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[11px] font-mono text-zinc-400">Homepage only</span>
                    </div>
                    <button
                      onClick={togglePopup}
                      className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
                        settings.popup?.is_active
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {settings.popup?.is_active ? 'Pause' : 'Activate'}
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    
                    <div>
                      <label className="block text-zinc-400 mb-1">Display frequency</label>
                      <select
                        value={settings.popup?.frequency || (settings.popup?.show_once_per_session !== false ? 'once_per_session' : 'every_refresh')}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          popup: {
                            ...prev.popup,
                            frequency: e.target.value,
                            show_once_per_session: e.target.value === 'once_per_session'
                          }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none"
                      >
                        <option value="once_per_session">Once per session</option>
                        <option value="every_refresh">On every homepage load</option>
                      </select>
                      <p className="text-[11px] text-zinc-500 mt-0.5">Shown on the homepage only, never on articles, skills or projects</p>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Popup title</label>
                      <input
                        type="text"
                        value={settings.popup?.title || ''}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          popup: { ...prev.popup, title: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none"
                        placeholder="Welcome to Dipesh Sapkota's Portfolio"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={settings.popup?.description || ''}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          popup: { ...prev.popup, description: e.target.value }
                        }))}
                        className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none"
                        placeholder="Explore my latest projects and tools"
                      />
                    </div>

<div>
                      <label className="block text-zinc-400 mb-1">Popup image</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={settings.popup?.image_url || ''}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            popup: { ...prev.popup, image_url: e.target.value }
                          }))}
                          className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none font-mono"
                          placeholder="/popup-image.webp"
                        />
                        <label className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer text-zinc-200 font-medium whitespace-nowrap border border-zinc-700 text-xs">
                          <span>{uploadingMedia ? 'Uploading' : 'Upload image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingMedia}
                            className="hidden"
                            onChange={async (e) => {
                              const f = e.target.files?.[0];
                              if (f) {
                                try {
                                  notify('Compressing and uploading the image');
                                  const uploadRes = await uploadFile(f);
                                  setSettings(prev => ({
                                    ...prev,
                                    popup: { ...prev.popup, image_url: uploadRes.url }
                                  }));
                                  notify('Popup image uploaded');
                                } catch (err) {
                                  notify(err.message, 'error');
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-zinc-400 mb-1">Action link</label>
                        <input
                          type="text"
                          value={settings.popup?.link_url || ''}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            popup: { ...prev.popup, link_url: e.target.value }
                          }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none font-mono"
                          placeholder="/projects"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1">Button text</label>
                        <input
                          type="text"
                          value={settings.popup?.link_text || ''}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            popup: { ...prev.popup, link_text: e.target.value }
                          }))}
                          className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-white outline-none"
                          placeholder="Explore Projects"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => saveSettingSection('popup', settings.popup)}
                      className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs mt-2"
                    >
                      Save Popup Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

{activeTab === 'media' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Media</h1>
                  <p className="text-xs text-zinc-400">Uploads are converted to compressed WebP</p>
                </div>
                <label className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs cursor-pointer">
                  <span>{uploadingMedia ? 'Uploading' : 'Upload file'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploadingMedia}
                    className="hidden"
                    onChange={async (e) => {
                      const f = e.target.files?.[0];
                      if (f) {
                        try {
                          notify('Compressing and uploading');
                          await uploadFile(f);
                          notify('File uploaded');
                          fetchMedia();
                        } catch (err) {
                          notify(err.message, 'error');
                        }
                      }
                    }}
                  />
                </label>
              </div>

              {mediaLoading ? (
                <div className="p-8 text-center text-xs text-zinc-500">Loading media</div>
              ) : mediaFiles.length === 0 ? (
                <div className="p-8 text-center text-xs text-zinc-500 bg-zinc-900/40 rounded-xl border border-zinc-800/60">
                  No files found in portfolio-media bucket.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                  {mediaFiles.map((file, idx) => (
                    <div key={idx} className="bg-[#19191b] border border-zinc-800/80 rounded-lg p-2 space-y-1.5">
                      <div className="relative aspect-square w-full rounded bg-zinc-900 overflow-hidden">
                        <Image src={file.url} alt={file.name} fill unoptimized className="object-cover" />
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate font-mono">{file.name}</div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(file.url);
                          notify('Copied URL to clipboard');
                        }}
                        className="w-full text-center py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded font-medium"
                      >
                        Copy URL
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

{activeTab === 'database' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="pb-3 border-b border-zinc-800">
                <h1 className="text-lg font-semibold text-white">Backup</h1>
                <p className="text-xs text-zinc-400">Download the full database as JSON</p>
              </div>

              <div className="bg-[#19191b] border border-zinc-800/80 rounded-xl p-5 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-white">JSON snapshot</h3>
                  <p className="text-xs text-zinc-400">
                    Exports all tables (projects, articles, certificates, skills, gallery, messages, and settings) into a single portable backup file.
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleExportBackup}
                    className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition-colors"
                  >
                    Download backup
                  </button>
                  <a
                    href="https://tihkvcybdvvovmnvkdrx.supabase.co"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Supabase Console
                  </a>
                </div>
              </div>
            </div>
          )}

{activeTab === 'experience' && (
            <div className="space-y-5 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
                <div>
                  <h1 className="text-lg font-semibold text-white">Resume</h1>
                  <p className="text-xs text-zinc-400">Career milestones, roles, and education</p>
                </div>
                <button
                  onClick={() => { setEditingItem({ type: 'experience', is_current: true }); setEditModalOpen(true); }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs"
                >
                  Add entry
                </button>
              </div>

              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div key={exp.id || exp.title} className="bg-[#19191b] border border-zinc-800/80 p-4 rounded-xl flex items-start justify-between gap-3 hover:border-zinc-700 transition-colors">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {(exp.logo || exp.img || exp.image) ? (
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                          <Image
                            src={exp.logo || exp.img || exp.image}
                            alt={exp.organization || exp.title}
                            fill
                            unoptimized={Boolean((exp.logo || exp.img || exp.image)?.startsWith('http'))}
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[11px] text-zinc-500 font-mono shrink-0">
                          LOGO
                        </div>
                      )}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-zinc-800 font-mono text-[11px] text-zinc-400">{exp.type}</span>
                          <h3 className="text-xs font-semibold text-white truncate">{exp.title}</h3>
                          <span className="text-[11px] text-zinc-500 truncate">at {exp.organization}</span>
                        </div>
                        <div className="text-[11px] text-zinc-500 font-mono">
                          {exp.start_date || 'N/A'} – {exp.end_date || (exp.is_current ? 'Present' : 'N/A')} {exp.location ? `· ${exp.location}` : ''}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2">{exp.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => { setEditingItem(exp); setEditModalOpen(true); }}
                        className="px-2.5 py-1 rounded bg-zinc-800 text-emerald-400 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setConfirmModal({
                            open: true,
                            title: 'Delete entry',
                            message: `Delete "${exp.title}"?`,
                            onConfirm: async () => {
                              if (exp.id) await fetch(`/api/admin/experience?id=${exp.id}`, { method: 'DELETE' });
                              setExperiences(prev => prev.filter(x => x.id !== exp.id));
                              notify('Experience entry deleted');
                            }
                          });
                        }}
                        className="px-2 py-1 rounded bg-rose-500/10 text-rose-400 text-xs hover:bg-rose-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

{editModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1c1c1f] border border-zinc-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-semibold text-white">
                {editingItem?.id ? 'Edit item' : 'New entry'}
              </h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="text-zinc-400 hover:text-white text-xs"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

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
                notify('Project saved');
              }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Slug</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.slug || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingItem?.category_label || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, category_label: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingItem?.img || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, img: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">Save project</button>
                </div>
              </form>
            )}

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
                const saved = data.data || editingItem;
                if (editingItem?.id) {
                  setCertificates(prev => prev.map(c => c.id === saved.id ? saved : c));
                } else {
                  setCertificates(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Certificate saved');
              }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Certificate title</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Issuing organization</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.org || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, org: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingItem?.category || 'General'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingItem?.img || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, img: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">Save</button>
                </div>
              </form>
            )}

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
                  notify(data.error || 'Failed to save photo', 'error');
                  return;
                }
                const saved = data.data || editingItem;
                if (editingItem?.id) {
                  setGallery(prev => prev.map(g => g.id === saved.id ? saved : g));
                } else {
                  setGallery(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Photo saved');
              }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Caption</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Alt text</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.alt || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, alt: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingItem?.category || 'Campus'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Image URL</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.img || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, img: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">Save photo</button>
                </div>
              </form>
            )}

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
                notify('Article saved');
              }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Slug</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.slug || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={editingItem?.category || 'Engineering'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Excerpt</label>
                  <textarea
                    rows={2}
                    value={editingItem?.excerpt || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">Save article</button>
                </div>
              </form>
            )}

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
                notify('Skill saved');
              }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Skill name</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.name || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.category || 'Development'}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Short description</label>
                  <input
                    type="text"
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">Save skill</button>
                </div>
              </form>
            )}

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
                  notify(data.error || 'Failed to save experience', 'error');
                  return;
                }
                const saved = data.data || editingItem;
                if (editingItem?.id) {
                  setExperiences(prev => prev.map(x => x.id === saved.id ? saved : x));
                } else {
                  setExperiences(prev => [saved, ...prev]);
                }
                setEditModalOpen(false);
                notify('Experience entry saved');
              }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-zinc-400 mb-1">Role or degree</label>
                  <input
                    type="text"
                    required
                    value={editingItem?.title || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    placeholder="e.g. Bachelor in Computer Engineering or Frontend Engineer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Organization or campus</label>
                    <input
                      type="text"
                      required
                      value={editingItem?.organization || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                      placeholder="IOE Thapathali Campus"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Type</label>
                    <select
                      value={editingItem?.type || 'experience'}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    >
                      <option value="experience">Experience</option>
                      <option value="education">Education</option>
                    </select>
                  </div>
                </div>

<div>
                  <label className="block text-zinc-400 mb-1">Logo</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editingItem?.logo || editingItem?.img || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, logo: e.target.value }))}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                      placeholder="/thapathali.webp or an https URL"
                    />
                    <label className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer text-zinc-200 font-medium whitespace-nowrap border border-zinc-700 text-xs">
                      <span>{uploadingMedia ? 'Uploading' : 'Upload logo'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingMedia}
                        className="hidden"
                        onChange={async (e) => {
                          const f = e.target.files?.[0];
                          if (f) {
                            try {
                              notify('Compressing and uploading the logo');
                              const uploadRes = await uploadFile(f);
                              setEditingItem(prev => ({ ...prev, logo: uploadRes.url }));
                              notify('Logo uploaded');
                            } catch (err) {
                              notify(err.message, 'error');
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                  {(editingItem?.logo || editingItem?.img) && (
                    <div className="mt-2 flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-lg border border-zinc-800/80">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800">
                        <Image
                          src={editingItem.logo || editingItem.img}
                          alt="Logo Preview"
                          fill
                          unoptimized
                          className="object-contain p-0.5"
                        />
                      </div>
                      <span className="text-[11px] text-zinc-400 font-mono truncate">{editingItem.logo || editingItem.img}</span>
                    </div>
                  )}
                  <p className="text-[11px] text-zinc-500 mt-1">The image is converted to WebP on upload</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Start date</label>
                    <input
                      type="text"
                      value={editingItem?.start_date || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, start_date: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                      placeholder="2025"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">End date</label>
                    <input
                      type="text"
                      value={editingItem?.end_date || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, end_date: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none font-mono"
                      placeholder="Present"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Location</label>
                    <input
                      type="text"
                      value={editingItem?.location || ''}
                      onChange={(e) => setEditingItem(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                      placeholder="Kathmandu, Nepal"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white outline-none"
                    placeholder="Key highlights, coursework, GPA, achievements"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300">Cancel</button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">Save entry</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
