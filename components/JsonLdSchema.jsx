export const siteUrl = 'https://www.dipeshsapkota7.com.np';
export const personId = `${siteUrl}/#person`;
export const websiteId = `${siteUrl}/#website`;
export const imageId = `${siteUrl}/#primary-image`;

export const portraitImage = {
  '@type': 'ImageObject',
  '@id': imageId,
  url: `${siteUrl}/dipesh-sapkota.jpg`,
  contentUrl: `${siteUrl}/dipesh-sapkota.jpg`,
  name: 'Portrait of Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal',
  description: 'Official portrait of Dipesh Sapkota, Computer Engineering student, AI/ML enthusiast, video editor, and motion graphics designer.',
  caption: 'Official portrait of Dipesh Sapkota',
  acquireLicensePage: `${siteUrl}/image-licensing`,
  creator: {
    '@type': 'Person',
    name: 'Dipesh Sapkota',
  },
  creditText: 'Dipesh Sapkota',
  copyrightNotice: '© 2026 Dipesh Sapkota. All rights reserved.',
  license: `${siteUrl}/image-licensing`,
  width: 627,
  height: 627,
  representativeOfPage: true,
};

export const person = {
  '@type': 'Person',
  '@id': personId,
  name: 'Dipesh Sapkota',
  alternateName: ['dszae', 'dsz.ae'],
  description: 'Dipesh Sapkota is a Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, known online as dszae and creator of independent software projects.',
  disambiguatingDescription: 'Computer Engineering student at IOE Thapathali Campus in Nepal; known online as dszae and creator of IOE Admission Guide, Sportivo, and Git Visualizer.',
  url: `${siteUrl}/`,
  mainEntityOfPage: `${siteUrl}/`,
  image: portraitImage,
  jobTitle: ['Computer Engineering Student', 'AI/ML Enthusiast', 'Video Editor', 'Motion Graphics Designer'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  affiliation: {
    '@type': 'CollegeOrUniversity',
    name: 'Institute of Engineering (IOE), Thapathali Campus',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Clamphook Academy',
  },
  sameAs: [
    'https://github.com/dszae',
    'https://linkedin.com/in/dszae',
    'https://instagram.com/dsz.ae',
    'https://facebook.com/dsz.ae',
    'https://tiktok.com/@dsz_ae',
    'https://x.com/dsz_ae',
    'https://www.threads.net/@dsz.ae',
    'https://dev.to/dszae',
  ],
  knowsAbout: [
    'Computer engineering',
    'Artificial intelligence and machine learning',
    'Python programming',
    'React and Next.js development',
    'Embedded systems and circuit analysis',
    'Video editing and motion graphics',
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: 'Dipesh Sapkota',
  alternateName: 'Dipesh Sapkota Portfolio',
  url: `${siteUrl}/`,
  description: 'Dipesh Sapkota is a Computer Engineering student and AI/ML enthusiast at IOE Thapathali in Nepal.',
  image: portraitImage,
  publisher: person,
  inLanguage: 'en',
};

export const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [person, portraitImage, website],
};

export const homePageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: `${siteUrl}/`,
      name: 'Dipesh Sapkota | Computer Engineering Student & AI/ML Enthusiast',
      description: 'Dipesh Sapkota is a Computer Engineering student and AI/ML enthusiast at IOE Thapathali in Nepal.',
      dateCreated: '2025-01-01T00:00:00+05:45',
      dateModified: '2026-10-09T00:00:00+05:45',
      mainEntity: person,
      primaryImageOfPage: portraitImage,
      isPartOf: { '@id': websiteId },
    },
    {
      '@type': 'SiteNavigationElement',
      '@id': `${siteUrl}/#navigation`,
      name: 'Main portfolio navigation',
      hasPart: [
        { '@type': 'WebPage', name: 'Home', url: `${siteUrl}/` },
        { '@type': 'WebPage', name: 'About', url: `${siteUrl}/about` },
        { '@type': 'WebPage', name: 'Skills', url: `${siteUrl}/skills` },
        { '@type': 'WebPage', name: 'Resume', url: `${siteUrl}/resume` },
        { '@type': 'WebPage', name: 'Projects', url: `${siteUrl}/projects` },
        { '@type': 'WebPage', name: 'Gallery', url: `${siteUrl}/gallery` },
        { '@type': 'WebPage', name: 'Certificates', url: `${siteUrl}/certificates` },
        { '@type': 'WebPage', name: 'Contact', url: `${siteUrl}/contact` },
      ],
    },
  ],
};

function JsonLdScript({ id, data }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function JsonLdSchema() {
  return <JsonLdScript id="json-ld-schema" data={siteSchema} />;
}

export function HomePageJsonLd() {
  return <JsonLdScript id="home-page-json-ld-schema" data={homePageSchema} />;
}
