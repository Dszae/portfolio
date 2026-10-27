import { getSiteSettings } from '@/lib/dataService';
import { generatePageMetadata } from '@/lib/seoEngine';

export async function generateMetadata() {
  const siteSettings = await getSiteSettings();
  const profile = siteSettings?.profile || {};
  const name = profile.name || 'Dipesh Sapkota';

  return await generatePageMetadata({
    title: `Contact & Collaboration | ${name}`,
    description: `Reach out to ${name} for engineering collaborations, AI/ML exploration, or freelance video editing and motion graphics in Kathmandu, Nepal.`,
    path: '/contact',
  });
}

export default function ContactLayout({ children }) {
  return children;
}

