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
import 'katex/dist/katex.min.css';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.dipeshsapkota7.com.np'),
  title: {
    default: 'Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast',
    template: '%s | Dipesh Sapkota',
  },
  description: 'Official portfolio of Dipesh Sapkota featuring software projects including IOE Admission Hub and Git Visualizer, alongside technical engineering and creative work.',
  keywords: [
    'Dipesh Sapkota',
    'Dipesh Sapkota portfolio',
    'Computer Engineering student Nepal',
    'AI/ML enthusiast',
    'Video Editor',
    'Motion Graphics Designer',
    'Git Visualizer',
    'IOE Admission Hub',
    'Sportivo',
  ],
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
        url: '/icon-48x48.png?v=3',
        type: 'image/png',
        sizes: '48x48',
      },
      {
        url: '/favicon-48x48.png?v=3',
        type: 'image/png',
        sizes: '48x48',
      },
      {
        url: '/icon-96x96.png?v=3',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: '/favicon-96x96.png?v=3',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: '/icon-192x192.png?v=3',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: '/favicon-192x192.png?v=3',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        url: '/favicon.svg?v=3',
        type: 'image/svg+xml',
        sizes: 'any',
      },
      {
        url: '/favicon.ico?v=3',
        type: 'image/x-icon',
        sizes: '48x48',
      },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: [
      {
        url: '/apple-touch-icon.png?v=3',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
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
    siteName: 'Dipesh Sapkota',
    locale: 'en_US',
    title: 'Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast',
    description: 'Official portfolio of Dipesh Sapkota featuring software projects including IOE Admission Hub and Git Visualizer, alongside technical engineering and creative work.',
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
    title: 'Dipesh Sapkota | IOE Admission Hub & Git Visualizer',
    description: 'Official portfolio of Dipesh Sapkota featuring software projects including IOE Admission Hub and Git Visualizer, alongside technical engineering and creative work.',
    images: ['https://www.dipeshsapkota7.com.np/dipesh-sapkota.jpg'],
    creator: '@DszAe18',
    site: '@DszAe18',
  },
  verification: {
    google: 'E6jJLG4IQhyyDHiocZ2ca38GtjN1bOMrQGIctSGJvZ8',
  },
};

export const viewport = {
  themeColor: '#F8FAFC',
  colorScheme: 'light dark',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link rel="author" href="/" />
        <link rel="alternate" type="text/markdown" href="/.well-known/llms.txt" title="AI-readable site information" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var isDark = stored === 'dark';
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
