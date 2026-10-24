import ContactClientView from '@/components/ContactClientView';
import { generatePageMetadata } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata() {
  return await generatePageMetadata({
    title: 'Contact',
    description: 'Direct contact channels, phone, email, and inquiry form for Dipesh Sapkota in Kathmandu, Nepal.',
    path: '/contact',
  });
}

export default function ContactPage() {
  return <ContactClientView />;
}
