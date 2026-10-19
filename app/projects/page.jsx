import { getProjects } from '@/lib/dataService';
import ProjectsClientView from '@/components/ProjectsClientView';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';

export const revalidate = 60;

export const metadata = {
  title: "Projects",
  description: "Featured web applications, interactive software tools, hardware simulations, and engineering projects created by Dipesh Sapkota, including Sportivo, IOE Admission Guide, and Git Visualizer.",
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    title: 'Projects - Dipesh Sapkota',
    description: 'Featured web applications, interactive software tools, hardware simulations, and engineering projects created by Dipesh Sapkota.',
    url: 'https://www.dipeshsapkota7.com.np/projects',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects by Dipesh Sapkota',
    description: 'Featured web applications, interactive software tools, hardware simulations, and engineering projects created by Dipesh Sapkota.',
    images: ['/dipesh-sapkota.jpg'],
    creator: '@DszAe18',
    site: '@DszAe18',
  },
};

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
