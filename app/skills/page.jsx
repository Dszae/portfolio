import { getSkills } from '@/lib/dataService';
import SkillsClientView from '@/components/SkillsClientView';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';

export const revalidate = 60;

export const metadata = {
  title: "Skills",
  description: "Technical competencies of Dipesh Sapkota across programming (C/C++, Python, React, PHP), creative media (video editing, motion graphics, graphic design), and engineering (circuit analysis, Proteus).",
  alternates: { canonical: '/skills' },
  openGraph: {
    type: 'website',
    title: 'Skills - Dipesh Sapkota',
    description: 'Technical competencies of Dipesh Sapkota across programming, creative media, and engineering.',
    url: 'https://www.dipeshsapkota7.com.np/skills',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skills - Dipesh Sapkota',
    description: 'Technical competencies of Dipesh Sapkota across programming, creative media, and engineering.',
    images: ['/dipesh-sapkota.jpg'],
    creator: '@DszAe18',
    site: '@DszAe18',
  },
};

const skillsPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${siteUrl}/skills#skillspage`,
  url: `${siteUrl}/skills`,
  name: 'Skills | Dipesh Sapkota',
  description: 'Technical competencies of Dipesh Sapkota across programming (C/C++, Python, React, PHP), creative media (video editing, motion graphics, graphic design), and engineering (circuit analysis, Proteus).',
  about: { '@id': personId },
  isPartOf: {
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Dipesh Sapkota',
    url: `${siteUrl}/`,
  },
  inLanguage: 'en',
};

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <SkillsClientView 
      initialSkills={skills} 
      jsonLd={skillsPageJsonLd} 
    />
  );
}
