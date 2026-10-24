import { getSkills, getSiteSettings } from '@/lib/dataService';
import SkillsClientView from '@/components/SkillsClientView';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { generatePageMetadata } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};
  const name = profile.name || 'Dipesh Sapkota';

  return await generatePageMetadata({
    title: 'Skills',
    description: `Technical competencies of ${name} across Computer Engineering, AI/ML exploration, hardware simulation (Proteus), programming (Python, C/C++, React, PHP), and motion graphics.`,
    path: '/skills',
    keywords: [
      'Computer Engineering Skills',
      'AI ML Enthusiast',
      'Python Programming',
      'C C++',
      'React Next.js',
      'Proteus Circuit Simulation',
      'Video Editing Motion Graphics',
      'After Effects Premiere Pro',
      'DaVinci Resolve',
    ],
  });
}

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
