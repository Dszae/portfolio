import React from 'react';
import { Manrope } from 'next/font/google';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

import JsonLdSchema from '@/components/JsonLdSchema';
import WebMCPInitializer from '@/components/WebMCPInitializer';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { getSiteSettings } from '@/lib/dataService';
import 'katex/dist/katex.min.css';
import './globals.css';

export async function generateMetadata() {
  const settings = await getSiteSettings();
  const profile = settings?.profile || {};
  const seo = settings?.seo || {};

  const name = profile.name || 'Dipesh Sapkota';
  const rawTitle = seo.title || `${name} | Computer Engineering Student & AI/ML Enthusiast`;
  const description = seo.description || profile.bio || 'Official portfolio of Dipesh Sapkota featuring software engineering projects, AI/ML tools, and creative media work.';
  const ogImage = seo.og_image || profile.avatar_url || '/dipesh-sapkota.jpg';
  const twitterHandle = (seo.twitter_handle || '@dszae').replace(/^@?/, '@');

  return {
    metadataBase: new URL('https://www.dipeshsapkota7.com.np'),
    title: {
      default: rawTitle,
      template: `%s | ${name}`,
    },
    description,
    keywords: [
      name,
      `${name} portfolio`,
      'Computer Engineering student Nepal',
      'AI/ML enthusiast',
      'Video Editor',
      'Motion Graphics Designer',
      'Git Visualizer',
      'IOE Admission Hub',
      'Sportivo',
    ],
    authors: [{ name }],
    creator: name,
    publisher: name,
    applicationName: `${name} Portfolio`,
    category: 'portfolio',
    referrer: 'strict-origin-when-cross-origin',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    },
    icons: {
      icon: [
        { url: '/icon-48x48.png?v=3', type: 'image/png', sizes: '48x48' },
        { url: '/favicon-48x48.png?v=3', type: 'image/png', sizes: '48x48' },
        { url: '/icon-96x96.png?v=3', type: 'image/png', sizes: '96x96' },
        { url: '/favicon-96x96.png?v=3', type: 'image/png', sizes: '96x96' },
        { url: '/icon-192x192.png?v=3', type: 'image/png', sizes: '192x192' },
        { url: '/favicon-192x192.png?v=3', type: 'image/png', sizes: '192x192' },
        { url: '/favicon.svg?v=3', type: 'image/svg+xml', sizes: 'any' },
        { url: '/favicon.ico?v=3', type: 'image/x-icon', sizes: '48x48' },
      ],
      shortcut: '/favicon.ico?v=3',
      apple: [{ url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      url: 'https://www.dipeshsapkota7.com.np/',
      siteName: `${name} Portfolio`,
      locale: 'en_US',
      title: rawTitle,
      description,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `https://www.dipeshsapkota7.com.np${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`,
          width: 1200,
          height: 630,
          alt: `Portrait of ${name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      url: 'https://www.dipeshsapkota7.com.np/',
      title: rawTitle,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `https://www.dipeshsapkota7.com.np${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`],
      creator: twitterHandle,
      site: twitterHandle,
    },
    verification: {
      google: 'E6jJLG4IQhyyDHiocZ2ca38GtjN1bOMrQGIctSGJvZ8',
    },
  };
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#090B0E' },
  ],
  colorScheme: 'dark light',
};

export default async function RootLayout({ children }) {
  const settings = await getSiteSettings();
  const safeFeaturesJson = JSON.stringify({
    announcement: settings.announcement || null,
    popup: settings.popup || null,
  }).replace(/</g, '\\u003c');

  return (
    <html lang="en" className={`dark ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link rel="author" href="/" />
        <link rel="alternate" type="text/markdown" href="/.well-known/llms.txt" title="AI-readable site information" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isLight = stored === 'light';
                  var d = document.documentElement;
                  if (isLight) {
                    d.classList.remove('dark');
                    d.classList.add('light');
                    d.style.colorScheme = 'light';
                  } else {
                    d.classList.remove('light');
                    d.classList.add('dark');
                    d.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
              window.__INITIAL_SITE_FEATURES__ = ${safeFeaturesJson};
            `,
          }}
        />
      </head>
      <body className="theme-page font-sans antialiased m-0 p-0 w-full min-h-screen overflow-x-hidden">
        <JsonLdSchema settings={settings} />
        <WebMCPInitializer />
        <AnalyticsTracker />
        {children}
      </body>
    </html>
  );
}
