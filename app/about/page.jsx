import { getSiteSettings } from '@/lib/dataService';
import AboutClientView from '@/components/AboutClientView';
import { person, portraitImage, siteUrl } from '@/components/JsonLdSchema';

export const revalidate = 60;

export const metadata = {
  title: "About",
  description: "Official biography and background of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.",
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'profile',
    title: 'About Dipesh Sapkota',
    description: 'Official biography and background of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus.',
    url: 'https://www.dipeshsapkota7.com.np/about',
    images: [{ url: '/dipesh-sapkota.jpg', width: 627, height: 627, alt: 'Dipesh Sapkota' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Dipesh Sapkota',
    description: 'Official biography and background of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus.',
    images: ['/dipesh-sapkota.jpg'],
    creator: '@DszAe18',
    site: '@DszAe18',
  },
};

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${siteUrl}/about#aboutpage`,
  url: `${siteUrl}/about`,
  name: 'About Dipesh Sapkota',
  description: 'Official biography and background of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.',
  mainEntity: person,
  primaryImageOfPage: portraitImage,
  isPartOf: {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: 'Dipesh Sapkota',
    url: `${siteUrl}/`,
  },
  inLanguage: 'en',
};

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();

  return (
    <AboutClientView 
      siteSettings={siteSettings} 
      jsonLd={aboutPageJsonLd} 
    />
  );
}
