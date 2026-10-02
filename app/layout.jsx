import React from 'react';
import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.dipeshsapkota7.com.np'),
  title: {
    default: 'Dipesh Sapkota | Computer Engineering Student & AI ML enthusiast',
    template: '%s | Dipesh Sapkota',
  },
  description: 'Dipesh Sapkota is a Computer Engineering student at IOE Thapathali, an AI ML enthusiast, and a video editor and motion graphics designer based in Nepal.',
  keywords: [
    'Dipesh Sapkota',
    'dsz.ae',
    'Dipesh sapkota cricket',
    'cricket',
    'dszae',
    'dipesh',
    'sapkota dipesh',
    'clamphook',
    'dipeshsapkota',
    '#dipeshsapkota',
    'sapkota',
    'Computer Engineering Student at IOE Thapathali',
    'AI ML enthusiast',
    'Video Editor',
    'Motion Graphics Designer',
  ],
  authors: [{ name: 'Dipesh Sapkota' }],
  creator: 'Dipesh Sapkota',
  publisher: 'Dipesh Sapkota',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
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
    canonical: 'https://www.dipeshsapkota7.com.np/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.dipeshsapkota7.com.np/',
    title: 'Dipesh Sapkota | Computer Engineering Student & AI ML enthusiast',
    description: 'Dipesh Sapkota is a Computer Engineering student at IOE Thapathali, an AI ML enthusiast, and a video editor and motion graphics designer based in Nepal.',
    images: [
      {
        url: 'https://www.dipeshsapkota7.com.np/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Dipesh Sapkota Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    url: 'https://www.dipeshsapkota7.com.np/',
    title: 'Dipesh Sapkota | Computer Engineering Student & AI ML enthusiast',
    description: 'Dipesh Sapkota is a Computer Engineering student at IOE Thapathali, an AI ML enthusiast, and a video editor and motion graphics designer based in Nepal.',
    images: ['https://www.dipeshsapkota7.com.np/og-image.webp'],
  },
  verification: {
    google: 'E6jJLG4IQhyyDHiocZ2ca38GtjN1bOMrQGIctSGJvZ8',
  },
  other: {
    sitemap: 'https://www.dipeshsapkota7.com.np/sitemap.xml',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.dipeshsapkota7.com.np/#person',
      name: 'Dipesh Sapkota',
      alternateName: ['dsz.ae', 'Dipesh'],
      url: 'https://www.dipeshsapkota7.com.np/',
      image: 'https://www.dipeshsapkota7.com.np/og-image.webp',
      jobTitle: ['Computer Engineering Student', 'AI/ML Enthusiast', 'Video Editor', 'Motion Graphics Designer'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gaindakot',
        addressRegion: 'Gandaki Province',
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
        'https://sportivo.dipeshsapkota7.com.np/',
        'https://ioe-admission.dipeshsapkota7.com.np/',
        'https://git-visualizer.dipeshsapkota7.com.np/',
      ],
      hasPart: [
        {
          '@type': 'WebSite',
          name: 'Sportivo Live Sports Streaming',
          url: 'https://sportivo.dipeshsapkota7.com.np/',
        },
        {
          '@type': 'WebSite',
          name: 'IOE Entrance Preparation Portal',
          url: 'https://ioe-admission.dipeshsapkota7.com.np/',
        },
        {
          '@type': 'WebApplication',
          name: 'Git Visualizer',
          url: 'https://git-visualizer.dipeshsapkota7.com.np/',
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.dipeshsapkota7.com.np/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Sportivo Live Sports',
          item: 'https://sportivo.dipeshsapkota7.com.np/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'IOE Entrance Preparation Portal',
          item: 'https://ioe-admission.dipeshsapkota7.com.np/',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Git Visualizer',
          item: 'https://git-visualizer.dipeshsapkota7.com.np/',
        },
      ],
    },
  ];

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://api.web3forms.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.web3forms.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-500/30 m-0 p-0 w-full min-h-screen overflow-x-hidden">
        <noscript>
          <header>
            <h1>Dipesh Sapkota</h1>
            <p>Computer Engineering Student at IOE Thapathali | AI ML enthusiast | Video Editor & Motion Graphics Designer</p>
            <ul>
              <li>Location: Kathmandu, Nepal</li>
              <li>GitHub: https://github.com/dszae</li>
              <li>LinkedIn: https://linkedin.com/in/dszae</li>
            </ul>
          </header>
          <main>
            <section>
              <h2>About Me</h2>
              <p>I am Dipesh Sapkota, a dedicated Computer Engineering student at IOE Thapathali in Kathmandu, Nepal. As an AI and ML enthusiast, I am deeply invested in exploring intelligent systems, analyzing algorithms, and architecting embedded hardware solutions. Complementing my engineering background, I possess over 4 years of professional experience as a freelance Video Editor and Motion Graphics Designer.</p>
            </section>
            <section>
              <h2>Featured Web Applications & Projects</h2>
              <article>
                <h3>1. Sportivo</h3>
                <p>A high-performance live sports streaming platform featuring real-time match schedule scraping, multi-server stream switching, live team logo thumbnails, and direct shareable match links.</p>
                <a href="https://sportivo.dipeshsapkota7.com.np/">View Sportivo</a>
              </article>
              <article>
                <h3>2. IOE Admission Guide</h3>
                <p>A comprehensive admission ecosystem for Tribhuvan University engineering applicants. Beyond predicting ranks, it provides step-by-step procedural counseling guides, automated priority form generation, and detailed cutoff analytics.</p>
                <a href="https://ioe-admission.dipeshsapkota7.com.np/">View IOE Admission Guide</a>
              </article>
              <article>
                <h3>3. Git Visualizer</h3>
                <p>An interactive, visually driven learning tool designed to demystify Git version control. Features a dynamic data-flow architecture and an interactive canvas for mapping standard Git commands.</p>
                <a href="https://git-visualizer.dipeshsapkota7.com.np/">View Git Visualizer</a>
              </article>
            </section>
            <section>
              <h2>Experience</h2>
              <ul>
                <li><strong>Video Editor & Graphics Designer</strong> at Clamphook Academy (2026 - Present)</li>
                <li><strong>Video Editor</strong> at College Programs (2026 - Present)</li>
                <li><strong>Freelance Media Creator</strong> (2023 - Present)</li>
              </ul>
            </section>
            <section>
              <h2>Education</h2>
              <ul>
                <li><strong>Bachelor in Computer Engineering</strong> - Institute of Engineering (IOE), Thapathali Campus (2025 - Present)</li>
              </ul>
            </section>
          </main>
        </noscript>
        {children}
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-49P9YBE6PD"
        />
        <Script
          id="google-analytics-config"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-49P9YBE6PD', { 'send_page_view': true });
            `,
          }}
        />
      </body>
    </html>
  );
}