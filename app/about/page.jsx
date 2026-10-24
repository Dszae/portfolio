import { getSiteSettings } from '@/lib/dataService';
import AboutClientView from '@/components/AboutClientView';
import { generatePageMetadata, buildProfilePageJsonLd } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};
  const name = profile.name || 'Dipesh Sapkota';

  return await generatePageMetadata({
    title: 'About',
    description: profile.bio || `Official biography and background of ${name}, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.`,
    path: '/about',
    type: 'profile',
    image: profile.avatar_url || '/dipesh-sapkota.jpg',
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
