import React from 'react';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getExperiences, getSiteSettings } from '@/lib/dataService';
import ResumeClientView from '@/components/ResumeClientView';

import { generatePageMetadata } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};
  const name = profile.name || 'Dipesh Sapkota';

  return await generatePageMetadata({
    title: `Resume & Career Journey | ${name}`,
    description: `Career journey, work experience, and educational background of ${name} at IOE Thapathali Campus and beyond. Download verified CV.`,
    path: '/resume',
  });
}

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
