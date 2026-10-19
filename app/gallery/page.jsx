import React from 'react';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getGalleryImages, getSiteSettings } from '@/lib/dataService';
import GalleryClientView from '@/components/GalleryClientView';
import { generatePageMetadata } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};
  const name = profile.name || 'Dipesh Sapkota';

  return await generatePageMetadata({
    title: `Visual Archive & Photo Gallery | ${name}`,
    description: `Curated photo archive and visual moments documenting campus life at IOE Thapathali, technical exhibitions like Yathartha, cricket tournaments, and creative media moments by ${name}.`,
    path: '/gallery',
  });
}

export default async function GalleryPage() {
  const gallery = await getGalleryImages();

  const galleryImageObjects = gallery.map((item) => ({
    '@type': 'ImageObject',
    '@id': `${siteUrl}${item.img}#image`,
    url: item.img.startsWith('http') ? item.img : `${siteUrl}${item.img}`,
    contentUrl: item.img.startsWith('http') ? item.img : `${siteUrl}${item.img}`,
    name: item.title,
    description: item.alt || item.title,
    caption: item.title,
    acquireLicensePage: `${siteUrl}/image-licensing`,
    license: `${siteUrl}/image-licensing`,
    copyrightNotice: '© 2026 Dipesh Sapkota. All rights reserved.',
    creditText: 'Dipesh Sapkota',
    creator: { '@id': personId },
    width: 640,
    height: 360,
  }));

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${siteUrl}/gallery#gallerypage`,
    url: `${siteUrl}/gallery`,
    name: 'Gallery | Dipesh Sapkota',
    description: 'Curated photo archive and visual moments documenting campus life at IOE Thapathali, tech exhibitions, and creative projects by Dipesh Sapkota.',
    creator: { '@id': personId },
    isPartOf: {
      '@type': 'WebSite',
      '@id': websiteId,
      name: 'Dipesh Sapkota',
      url: `${siteUrl}/`,
    },
    image: galleryImageObjects,
    inLanguage: 'en',
  };

  return (
    <GalleryClientView
      gallery={gallery}
      jsonLd={gallerySchema}
    />
  );
}
