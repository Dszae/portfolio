import React from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import JsonLdSchema from '@/components/JsonLdSchema';
import WebMCPInitializer from '@/components/WebMCPInitializer';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.dipeshsapkota7.com.np'),
  title: {
    default: 'Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast',
    template: '%s | Dipesh Sapkota',
  },
  description: 'Official portfolio of Dipesh Sapkota, a Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus, Nepal. Explore AI/ML projects, technical engineering pursuits, and creative work.',
  authors: [{ name: 'Dipesh Sapkota' }],
  creator: 'Dipesh Sapkota',
  publisher: 'Dipesh Sapkota',
  applicationName: 'Dipesh Sapkota Portfolio',
  category: 'portfolio',
  referrer: 'strict-origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      {
        url: '/favicon-48x48.png?v=2',
        type: 'image/png',
        sizes: '48x48',
      },
      {
        url: '/favicon-96x96.png?v=2',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: '/favicon-192x192.png?v=2',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: '/favicon.svg?v=2',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        url: '/favicon.png?v=2',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        url: '/favicon.ico?v=2',
        type: 'image/x-icon',
        sizes: '48x48',
      },
    ],
    shortcut: '/favicon.ico?v=2',
    apple: '/favicon-192x192.png?v=2',
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.dipeshsapkota7.com.np/',
    siteName: 'Dipesh Sapkota',
    locale: 'en_US',
    title: 'Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast',
    description: 'Official portfolio of Dipesh Sapkota, a Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus, Nepal. Explore AI/ML projects, technical engineering pursuits, and creative work.',
    images: [
      {
        url: 'https://www.dipeshsapkota7.com.np/dipesh-sapkota.jpg',
        width: 627,
        height: 627,
        alt: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://www.dipeshsapkota7.com.np/',
    title: 'Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast',
    description: 'Official portfolio of Dipesh Sapkota, a Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus, Nepal. Explore AI/ML projects, technical engineering pursuits, and creative work.',
    images: ['https://www.dipeshsapkota7.com.np/dipesh-sapkota.jpg'],
    creator: '@DszAe18',
    site: '@DszAe18',
  },
  verification: {
    google: 'E6jJLG4IQhyyDHiocZ2ca38GtjN1bOMrQGIctSGJvZ8',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="alternate" type="text/markdown" href="/.well-known/llms.txt" title="AI-readable site information" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored !== null ? stored === 'dark' : prefersDark;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="theme-page font-sans antialiased m-0 p-0 w-full min-h-screen overflow-x-hidden">
        <JsonLdSchema />
        <WebMCPInitializer />
        {children}
      </body>
    </html>
  );
}
