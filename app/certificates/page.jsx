import React from 'react';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getCertificates, getSiteSettings } from '@/lib/dataService';
import CertificatesClientView from '@/components/CertificatesClientView';
import { generatePageMetadata } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};
  const name = profile.name || 'Dipesh Sapkota';

  return await generatePageMetadata({
    title: `Certificates & Credentials | ${name}`,
    description: `Verified professional certifications of ${name} across graphic design, motion design, DaVinci Resolve color science, and software engineering.`,
    path: '/certificates',
  });
}

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  const certificatesPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/certificates#certificatespage`,
    url: `${siteUrl}/certificates`,
    name: 'Certificates | Dipesh Sapkota',
    description: 'Verified professional certifications of Dipesh Sapkota from Udemy, Blackmagic Design, and EDUCBA across Graphic Design, Motion Design, Color Correction, Premiere Pro, and Software Engineering.',
    about: { '@id': personId },
    isPartOf: {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Dipesh Sapkota',
      url: `${siteUrl}/`,
    },
    inLanguage: 'en',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: certificates.map((cert, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: cert.title,
        description: `Certificate issued by ${cert.org}`,
      })),
    },
  };

  return (
    <CertificatesClientView
      certificates={certificates}
      jsonLd={certificatesPageJsonLd}
    />
  );
}
