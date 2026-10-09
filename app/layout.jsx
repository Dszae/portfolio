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
  description: 'Dipesh Sapkota is a Computer Engineering student and AI/ML enthusiast at IOE Thapathali in Nepal.',
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
        url: '/favicon.svg',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        url: '/favicon.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
        sizes: 'any',
      },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
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
    description: 'Dipesh Sapkota is a Computer Engineering student and AI/ML enthusiast at IOE Thapathali in Nepal.',
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
    description: 'Dipesh Sapkota is a Computer Engineering student and AI/ML enthusiast at IOE Thapathali in Nepal.',
    images: ['https://www.dipeshsapkota7.com.np/dipesh-sapkota.jpg'],
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
                    document.documentElement.style.backgroundColor = '#0B0F0E';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.backgroundColor = '#F8FAFC';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#F8FAFC] dark:bg-[#0B0F0E] text-[#111827] dark:text-[#F9FAFB] font-sans antialiased selection:bg-[#10B981]/25 dark:selection:bg-[#34D399]/25 m-0 p-0 w-full min-h-screen overflow-x-hidden">
        <JsonLdSchema />
        <WebMCPInitializer />
        {children}
      </body>
    </html>
  );
}
