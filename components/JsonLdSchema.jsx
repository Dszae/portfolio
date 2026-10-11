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
  description: 'Dipesh Sapkota is a Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus in Kathmandu, Nepal, known online as dszae and creator of independent software and intelligent systems.',
  disambiguatingDescription: 'Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus in Nepal; known online as dszae and creator of IOE Admission Guide, Sportivo, and Git Visualizer.',
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
    'https://www.linkedin.com/in/dszae',
    'https://dev.to/dszae',
    'https://x.com/DszAe18',
    'https://instagram.com/dsz.ae',
    'https://facebook.com/dsz.ae',
    'https://tiktok.com/@dsz_ae',
    'https://www.threads.net/@dsz.ae',
  ],
  knowsAbout: [
    'Computer engineering',
    'Artificial intelligence and machine learning',
    'Python programming',
    'Modern web architectures and React',
    'Embedded systems and circuit analysis',
    'Video editing and motion graphics',
  ],
};

export const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  name: 'Dipesh Sapkota',
  alternateName: ['Dipesh Sapkota Portfolio', 'dszae'],
  url: `${siteUrl}/`,
  description: 'Official portfolio of Dipesh Sapkota, a Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus, Nepal. Explore AI/ML projects, technical engineering pursuits, and creative work.',
  image: portraitImage,
  publisher: person,
  inLanguage: 'en',
  hasPart: [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/about`,
      name: 'About',
      description: 'Academic background, journey, and technical focus of Dipesh Sapkota at IOE Thapathali Campus.',
      url: `${siteUrl}/about`,
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/skills`,
      name: 'Skills',
      description: 'Programming languages, tools, frameworks, and engineering competencies.',
      url: `${siteUrl}/skills`,
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/projects`,
      name: 'Projects',
      description: 'Featured software systems, open-source projects, and engineering tools.',
      url: `${siteUrl}/projects`,
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/certificates`,
      name: 'Certificates',
      description: 'Verified technical certifications from Udemy, EDUCBA, and Blackmagic Design.',
      url: `${siteUrl}/certificates`,
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/resume`,
      name: 'Resume',
      description: 'Curriculum Vitae, academic history, roles, and downloadable PDF resume.',
      url: `${siteUrl}/resume`,
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/gallery`,
      name: 'Gallery',
      description: 'Campus memories, leadership events, and creative media visual archive.',
      url: `${siteUrl}/gallery`,
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/contact`,
      name: 'Contact',
      description: 'Get in touch for engineering collaborations, freelance work, and inquiries.',
      url: `${siteUrl}/contact`,
    },
  ],
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
      description: 'Official portfolio of Dipesh Sapkota, a Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus, Nepal. Explore AI/ML projects, technical engineering pursuits, and creative work.',
      dateCreated: '2025-01-01T00:00:00+05:45',
      dateModified: '2026-10-11T00:00:00+05:45',
      mainEntity: person,
      primaryImageOfPage: portraitImage,
      isPartOf: { '@id': websiteId },
    },
    {
      '@type': 'SiteNavigationElement',
      '@id': `${siteUrl}/#navigation`,
      name: 'Main portfolio navigation',
      hasPart: [
        { '@type': 'WebPage', name: 'About', description: 'Academic background, journey, and technical focus of Dipesh Sapkota.', url: `${siteUrl}/about` },
        { '@type': 'WebPage', name: 'Skills', description: 'Programming languages, tools, frameworks, and engineering competencies.', url: `${siteUrl}/skills` },
        { '@type': 'WebPage', name: 'Projects', description: 'Featured software systems, open-source projects, and engineering tools.', url: `${siteUrl}/projects` },
        { '@type': 'WebPage', name: 'Certificates', description: 'Verified technical certifications from Udemy, EDUCBA, and Blackmagic Design.', url: `${siteUrl}/certificates` },
        { '@type': 'WebPage', name: 'Resume', description: 'Curriculum Vitae, academic history, roles, and downloadable PDF resume.', url: `${siteUrl}/resume` },
        { '@type': 'WebPage', name: 'Gallery', description: 'Campus memories, leadership events, and creative media visual archive.', url: `${siteUrl}/gallery` },
        { '@type': 'WebPage', name: 'Contact', description: 'Get in touch for engineering collaborations, freelance work, and inquiries.', url: `${siteUrl}/contact` },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#sitelinks-list`,
      name: 'Dipesh Sapkota Sitelinks',
      description: 'Core sitelinks navigation list for Google Search results',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          position: 1,
          name: 'About',
          description: 'Academic background, journey, and technical focus of Dipesh Sapkota at IOE Thapathali Campus.',
          url: `${siteUrl}/about`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 2,
          name: 'Skills',
          description: 'Programming languages, tools, frameworks, and engineering competencies.',
          url: `${siteUrl}/skills`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'Projects',
          description: 'Featured software systems, open-source projects, and engineering tools.',
          url: `${siteUrl}/projects`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 4,
          name: 'Certificates',
          description: 'Verified technical certifications from Udemy, EDUCBA, and Blackmagic Design.',
          url: `${siteUrl}/certificates`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 5,
          name: 'Resume',
          description: 'Curriculum Vitae, academic history, roles, and downloadable PDF resume.',
          url: `${siteUrl}/resume`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 6,
          name: 'Gallery',
          description: 'Campus memories, leadership events, and creative media visual archive.',
          url: `${siteUrl}/gallery`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 7,
          name: 'Contact',
          description: 'Get in touch for engineering collaborations, freelance work, and inquiries.',
          url: `${siteUrl}/contact`,
        },
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
