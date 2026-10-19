import { getProjects } from '@/lib/dataService';
import ProjectsClientView from '@/components/ProjectsClientView';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';

import { generatePageMetadata } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  return await generatePageMetadata({
    title: 'Projects & Software Architecture',
    description: 'Featured web applications, interactive software tools, hardware simulations, and engineering projects created by Dipesh Sapkota, including Sportivo, IOE Admission Guide, and Git Visualizer.',
    path: '/projects',
  });
}

const projectsPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/projects#projectspage`,
  url: `${siteUrl}/projects`,
  name: 'Projects | Dipesh Sapkota',
  description: 'Featured web applications, interactive software tools, hardware simulations, and engineering projects created by Dipesh Sapkota, including Sportivo, IOE Admission Guide, and Git Visualizer.',
  creator: { '@id': personId },
  isPartOf: {
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Dipesh Sapkota',
    url: `${siteUrl}/`,
  },
  inLanguage: 'en',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <ProjectsClientView 
      initialProjects={projects} 
      jsonLd={projectsPageJsonLd} 
    />
  );
}
