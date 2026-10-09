'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const CONSENT_STORAGE_KEY = 'portfolio-analytics-consent';
const GA_MEASUREMENT_ID = 'G-49P9YBE6PD';
const consentListeners = new Set();
let fallbackConsent = 'unknown';

function getConsentSnapshot() {
  try {
    const savedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (savedConsent === 'accepted' || savedConsent === 'rejected') {
      return savedConsent;
    }
  } catch {
    // Use the in-memory choice when browser storage is unavailable.
  }

  return fallbackConsent;
}

function getServerConsentSnapshot() {
  return 'unknown';
}

function subscribeToConsent(listener) {
  consentListeners.add(listener);
  window.addEventListener('storage', listener);

  return () => {
    consentListeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}

function saveConsentChoice(consent) {
  fallbackConsent = consent;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  } catch {
    // Keep the choice for this visit when browser storage is unavailable.
  }

  consentListeners.forEach((listener) => listener());
}

function updateAnalyticsConsent(consent) {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      analytics_storage: consent === 'accepted' ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
  }
}

function loadAnalytics() {
  if (document.getElementById('google-analytics-script')) {
    updateAnalyticsConsent('accepted');
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer.push(args);
  };

  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  updateAnalyticsConsent('accepted');
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });

  const script = document.createElement('script');
  script.id = 'google-analytics-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export default function AnalyticsPrivacyControls() {
  const consent = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const showPreferences = consent === 'unknown' || settingsOpen;

  useEffect(() => {
    if (consent === 'accepted') {
      loadAnalytics();
    } else if (consent === 'rejected') {
      updateAnalyticsConsent('rejected');
    }
  }, [consent]);

  const saveConsent = (nextConsent) => {
    saveConsentChoice(nextConsent);
    setSettingsOpen(false);
  };

  if (!showPreferences) {
    return (
      <button
        type="button"
        aria-label="Open privacy settings"
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-4 left-4 z-[110] rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        Privacy settings
      </button>
    );
  }

  return (
    <aside
      role="region"
      aria-labelledby="privacy-preferences-title"
      className="fixed inset-x-4 bottom-4 z-[110] mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white/95 p-4 text-slate-900 shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-5"
    >
      <div className="min-w-0">
        <h2 id="privacy-preferences-title" className="mb-1 text-sm font-semibold">
          Optional analytics
        </h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          Google Analytics stays off unless you allow it. If enabled, it can collect page views and browser details. Your choice is saved here.
        </p>
        {consent !== 'unknown' && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Current choice: {consent === 'accepted' ? 'allowed' : 'rejected'}.
          </p>
        )}
      </div>
      <div className="mt-3 flex shrink-0 flex-row gap-2 sm:mt-0">
        <button
          type="button"
          onClick={() => saveConsent('rejected')}
          className="min-w-0 flex-1 whitespace-nowrap rounded-lg border border-slate-300 px-2 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 sm:flex-none sm:px-4 sm:text-sm"
        >
          Reject analytics
        </button>
        <button
          type="button"
          onClick={() => saveConsent('accepted')}
          className="min-w-0 flex-1 whitespace-nowrap rounded-lg bg-sky-600 px-2 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:flex-none sm:px-4 sm:text-sm"
        >
          Allow analytics
        </button>
      </div>
    </aside>
  );
}
