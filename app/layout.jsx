import React from 'react';
import AnalyticsPrivacyControls from '@/components/AnalyticsPrivacyControls';
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
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.dipeshsapkota7.com.np/#person',
      name: 'Dipesh Sapkota',
      alternateName: ['dszae', 'dsz.ae'],
      description: 'Dipesh Sapkota is a Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, known online as dszae and creator of independent software projects.',
      disambiguatingDescription: 'Computer Engineering student at IOE Thapathali Campus in Nepal; known online as dszae and creator of IOE Admission Guide, Sportivo, and Git Visualizer.',
      url: 'https://www.dipeshsapkota7.com.np/',
      mainEntityOfPage: 'https://www.dipeshsapkota7.com.np/about',
      image: {
        '@type': 'ImageObject',
        '@id': 'https://www.dipeshsapkota7.com.np/#primary-image',
        url: 'https://www.dipeshsapkota7.com.np/dipesh-sapkota.jpg',
        contentUrl: 'https://www.dipeshsapkota7.com.np/dipesh-sapkota.jpg',
        name: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal',
        description: 'Official portrait of Dipesh Sapkota, Computer Engineering student, AI/ML enthusiast, video editor, and motion graphics designer.',
        caption: 'Official portrait of Dipesh Sapkota',
        acquireLicensePage: 'https://www.dipeshsapkota7.com.np/contact',
        creator: { '@id': 'https://www.dipeshsapkota7.com.np/#person' },
        creditText: 'Dipesh Sapkota',
        copyrightNotice: '© Dipesh Sapkota. All rights reserved.',
        license: 'https://www.dipeshsapkota7.com.np/image-licensing',
        width: 627,
        height: 627,
        representativeOfPage: true,
      },
      jobTitle: ['Computer Engineering Student', 'AI/ML Enthusiast', 'Video Editor', 'Motion Graphics Designer'],
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'Nepal',
      },
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: 'Institute of Engineering (IOE), Thapathali Campus',
      },
      sameAs: [
        'https://github.com/dszae',
        'https://linkedin.com/in/dszae',
        'https://instagram.com/dsz.ae',
        'https://facebook.com/dsz.ae',
        'https://tiktok.com/@dsz.ae',
        'https://x.com/dsz_ae',
        'https://www.threads.net/@dsz.ae',
        'https://dev.to/dszae',
      ],
      knowsAbout: [
        'Computer engineering',
        'Artificial intelligence and machine learning',
        'Python programming',
        'React and Next.js development',
        'Embedded systems and circuit analysis',
        'Video editing and motion graphics',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://www.dipeshsapkota7.com.np/#website',
      name: 'Dipesh Sapkota',
      alternateName: 'Dipesh Sapkota Portfolio',
      url: 'https://www.dipeshsapkota7.com.np/',
      description: 'Dipesh Sapkota is a Computer Engineering student and AI/ML enthusiast at IOE Thapathali in Nepal.',
      image: {
        '@id': 'https://www.dipeshsapkota7.com.np/#primary-image',
      },
      publisher: {
        '@id': 'https://www.dipeshsapkota7.com.np/#person',
      },
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://www.dipeshsapkota7.com.np/#webpage',
      url: 'https://www.dipeshsapkota7.com.np/',
      name: 'Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast',
      primaryImageOfPage: {
        '@id': 'https://www.dipeshsapkota7.com.np/#primary-image',
      },
      isPartOf: {
        '@id': 'https://www.dipeshsapkota7.com.np/#website',
      },
    },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/markdown" href="/.well-known/llms.txt" title="AI-readable site information" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500/30 m-0 p-0 w-full min-h-screen overflow-x-hidden">
        <WebMCPInitializer />
        {children}
        <AnalyticsPrivacyControls />
      </body>
    </html>
  );
}
