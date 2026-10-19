import React from 'react';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getGalleryImages } from '@/lib/dataService';
import GalleryClientView from '@/components/GalleryClientView';

export const metadata = {
  title: 'Gallery & Visual Archive',
  description: 'Curated photo archive and visual moments documenting campus life at IOE Thapathali, tech exhibitions like Yathartha, and creative projects by Dipesh Sapkota.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    type: 'website',
    title: 'Visual Archive & Photo Gallery | Dipesh Sapkota',
    description: 'Campus life at IOE Thapathali, national tech exhibitions, cricket tournaments, and creative media moments by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/gallery',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery | Dipesh Sapkota',
    description: 'Campus moments, tech events, and visual storytelling by Dipesh Sapkota (dszae).',
    images: ['/dipesh-sapkota.jpg'],
  },
};

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
