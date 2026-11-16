import React from 'react';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getExperiences, getSiteSettings } from '@/lib/dataService';
import ResumeClientView from '@/components/ResumeClientView';
import {
  CV_PDF_PATH,
  CV_PREVIEW_PATH,
  CV_PREVIEW_SIZE,
  CV_TITLE,
  CV_DESCRIPTION,
  CV_UPDATED,
  CV_SIZE_BYTES,
  resolveCvUrl,
} from '@/lib/cv';

import { generatePageMetadata } from '@/lib/seoEngine';

export const revalidate = 60;

const cvUrl = `${siteUrl}${CV_PDF_PATH}`;
const cvPreviewUrl = `${siteUrl}${CV_PREVIEW_PATH}`;
const cvDocumentId = `${siteUrl}/resume#cv-pdf`;

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};
  const name = profile.name || 'Dipesh Sapkota';

  const metadata = await generatePageMetadata({
    title: 'Resume & CV',
    description: `View or download the CV of ${name}, Computer Engineering student at IOE Thapathali Campus, AI/ML enthusiast and motion designer. Experience, education, skills and PDF resume.`,
    path: '/resume',
    keywords: [`${name} CV`, `${name} resume`, 'CV PDF', 'Computer Engineering Student CV', 'Motion Designer CV Nepal'],
  });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      types: { 'application/pdf': cvUrl },
    },
  };
}

export default async function ResumePage() {
  const experiences = await getExperiences();
  const siteSettings = await getSiteSettings();
  const resumeUrl = resolveCvUrl(siteSettings?.profile?.resume_url);

  const cvDocument = {
    '@type': 'DigitalDocument',
    '@id': cvDocumentId,
    name: CV_TITLE,
    headline: 'Curriculum Vitae of Dipesh Sapkota',
    description: CV_DESCRIPTION,
    url: cvUrl,
    encodingFormat: 'application/pdf',
    inLanguage: 'en',
    dateModified: CV_UPDATED,
    isAccessibleForFree: true,
    thumbnailUrl: cvPreviewUrl,
    image: {
      '@type': 'ImageObject',
      url: cvPreviewUrl,
      width: CV_PREVIEW_SIZE.width,
      height: CV_PREVIEW_SIZE.height,
      caption: 'First page preview of the CV of Dipesh Sapkota',
    },
    author: { '@id': personId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
    keywords: 'Dipesh Sapkota, CV, resume, Computer Engineering Student, AI/ML Enthusiast, Motion Graphics Designer, Video Editor, IOE Thapathali Campus, Kathmandu, Nepal',
    encoding: {
      '@type': 'MediaObject',
      contentUrl: cvUrl,
      encodingFormat: 'application/pdf',
      contentSize: `${CV_SIZE_BYTES} B`,
    },
  };

  const resumePageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/resume#resumepage`,
        url: `${siteUrl}/resume`,
        name: 'Resume & CV | Dipesh Sapkota',
        description: 'Work experience, education, skills and downloadable PDF CV of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus and motion designer at Clamphook Academy.',
        about: { '@id': personId },
        mainEntity: { '@id': personId },
        hasPart: { '@id': cvDocumentId },
        dateModified: CV_UPDATED,
        isPartOf: {
          '@type': 'WebSite',
          '@id': websiteId,
          name: 'Dipesh Sapkota',
          url: `${siteUrl}/`,
        },
        inLanguage: 'en',
      },
      cvDocument,
    ],
  };

  return (
    <ResumeClientView
      experiences={experiences}
      siteSettings={siteSettings}
      resumeUrl={resumeUrl}
      jsonLd={resumePageJsonLd}
    />
  );
}
