import React from 'react';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getExperiences, getSiteSettings } from '@/lib/dataService';
import ResumeClientView from '@/components/ResumeClientView';

export const metadata = {
  title: 'Resume | Career & Education',
  description: 'Career journey, work experience, and educational background of Dipesh Sapkota (dszae) at IOE Thapathali Campus and Clamphook Academy. Download full CV.',
  alternates: { canonical: '/resume' },
  openGraph: {
    type: 'website',
    title: 'Resume & Career Journey | Dipesh Sapkota',
    description: 'Computer Engineering at IOE Thapathali, freelance video editing, and software systems engineering history of Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/resume',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume & Career | Dipesh Sapkota',
    description: 'Career journey, engineering education, and creative media background by Dipesh Sapkota.',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default async function ResumePage() {
  const experiences = await getExperiences();
  const siteSettings = await getSiteSettings();

  const resumePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteUrl}/resume#resumepage`,
    url: `${siteUrl}/resume`,
    name: 'Resume | Dipesh Sapkota',
    description: 'Career journey, work experience, and educational background of Dipesh Sapkota (dszae) at IOE Thapathali Campus and Clamphook Academy. Download full CV.',
    about: { '@id': personId },
    isPartOf: {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Dipesh Sapkota',
      url: `${siteUrl}/`,
    },
    inLanguage: 'en',
  };

  return (
    <ResumeClientView
      experiences={experiences}
      siteSettings={siteSettings}
      jsonLd={resumePageJsonLd}
    />
  );
}
