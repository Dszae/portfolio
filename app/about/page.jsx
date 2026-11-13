import { getSiteSettings } from '@/lib/dataService';
import AboutClientView from '@/components/AboutClientView';
import { generatePageMetadata, buildProfilePageJsonLd } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};

  return await generatePageMetadata({
    title: 'About',
    description: profile.bio || `Official biography and academic profile of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal. Exploring Artificial Intelligence, Machine Learning, embedded circuits, and motion design.`,
    path: '/about',
    type: 'profile',
    image: '/dipeshsapkota_2.png',
    keywords: [
      'Dipesh Sapkota',
      'Dipesh Sapkota IOE',
      'Dipesh Sapkota Thapathali',
      'Dipesh Sapkota Nepal',
      'Dipesh Sapkota Computer Engineering',
      'Dipesh Sapkota AI ML',
      'dszae',
      'Computer Engineering Student Nepal',
      'IOE Thapathali Campus',
      'Tribhuvan University',
      'Sportivo Dipesh Sapkota',
      'Git Visualizer Dipesh Sapkota'
    ],
  });
}

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();
  const jsonLd = buildProfilePageJsonLd(siteSettings, '/about');

  return (
    <AboutClientView 
      siteSettings={siteSettings} 
      jsonLd={jsonLd} 
    />
  );
}
