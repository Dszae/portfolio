import React from 'react';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getCertificates } from '@/lib/dataService';
import CertificatesClientView from '@/components/CertificatesClientView';

export const metadata = {
  title: 'Certificates & Credentials',
  description: 'Verified professional certifications of Dipesh Sapkota from Udemy, Blackmagic Design, and EDUCBA in Graphic Design, Motion Design, Color Correction, Premiere Pro, and Web Development.',
  alternates: { canonical: '/certificates' },
  openGraph: {
    type: 'website',
    title: 'Certificates & Credentials | Dipesh Sapkota',
    description: 'Verified professional certifications of Dipesh Sapkota across graphic design, motion design, DaVinci Resolve color science, and software engineering.',
    url: 'https://www.dipeshsapkota7.com.np/certificates',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Certificates of Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Certificates & Credentials | Dipesh Sapkota',
    description: 'Verified technical certifications in design, color science, and engineering by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  const certificatesPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/certificates#certificatespage`,
    url: `${siteUrl}/certificates`,
    name: 'Certificates | Dipesh Sapkota',
    description: 'Verified professional certifications of Dipesh Sapkota from Udemy, Blackmagic Design, and EDUCBA in Graphic Design, Motion Design, Color Correction, Premiere Pro, and Web Development.',
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
