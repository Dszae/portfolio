import { buildPersonJsonLd, buildWebSiteJsonLd } from '@/lib/seoEngine';

export const siteUrl = 'https://www.dipeshsapkota7.com.np';
export const personId = `${siteUrl}/#author`;
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
  creator: {
    '@type': 'Person',
    name: 'Dipesh Sapkota',
  },
  creditText: 'Dipesh Sapkota',
  copyrightNotice: '© 2026 Dipesh Sapkota. All rights reserved.',
  license: `${siteUrl}/`,
  width: 627,
  height: 627,
  representativeOfPage: true,
};

export const person = {
  '@type': 'Person',
  '@id': personId,
  name: 'Dipesh Sapkota',
  givenName: 'Dipesh',
  familyName: 'Sapkota',
  additionalName: 'dszae',
  alternateName: ['dszae', 'dsz.ae', 'Dipesh Sapkota (dszae)', 'Dipesh'],
  description: 'Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, exploring Artificial Intelligence, Machine Learning, embedded systems, and visual motion design.',
  disambiguatingDescription: 'Computer Engineering student and AI/ML enthusiast at IOE Thapathali Campus in Nepal; creator of IOE Admission Hub, Sportivo, and Git Visualizer; known online as dszae.',
  url: `${siteUrl}/`,
  mainEntityOfPage: `${siteUrl}/profile`,
  image: portraitImage,
  gender: 'https://schema.org/Male',
  jobTitle: ['Computer Engineering Student', 'AI/ML Enthusiast', 'Motion Graphics Designer', 'Video Editor'],
  nationality: {
    '@type': 'Country',
    name: 'Nepal',
    sameAs: [
      'https://en.wikipedia.org/wiki/Nepal',
      'https://www.wikidata.org/wiki/Q837',
    ],
  },
  homeLocation: {
    '@type': 'Place',
    name: 'Kathmandu, Nepal',
    sameAs: [
      'https://en.wikipedia.org/wiki/Kathmandu',
      'https://www.wikidata.org/wiki/Q2429',
    ],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressRegion: 'Bagmati Province',
    postalCode: '44600',
    addressCountry: 'NP',
  },
  knowsLanguage: ['en', 'ne'],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      '@id': 'https://tcioe.edu.np/#organization',
      name: 'Institute of Engineering (IOE), Thapathali Campus',
      alternateName: ['IOE Thapathali', 'Thapathali Campus', 'IOE Thapathali Campus'],
      url: 'https://tcioe.edu.np',
      sameAs: [
        'https://en.wikipedia.org/wiki/Thapathali_Campus',
        'https://www.wikidata.org/wiki/Q7710687',
        'https://www.wikidata.org/wiki/Q7710714',
      ],
    },
    {
      '@type': 'CollegeOrUniversity',
      '@id': 'https://tu.edu.np/#organization',
      name: 'Tribhuvan University',
      alternateName: ['TU', 'Tribhuvan University Nepal'],
      url: 'https://tu.edu.np',
      sameAs: [
        'https://en.wikipedia.org/wiki/Tribhuvan_University',
        'https://www.wikidata.org/wiki/Q1143890',
      ],
    },
  ],
  affiliation: [
    {
      '@type': 'CollegeOrUniversity',
      '@id': 'https://tcioe.edu.np/#organization',
      name: 'Institute of Engineering (IOE), Thapathali Campus',
      alternateName: ['IOE Thapathali', 'Thapathali Campus', 'IOE Thapathali Campus'],
      url: 'https://tcioe.edu.np',
      sameAs: [
        'https://en.wikipedia.org/wiki/Thapathali_Campus',
        'https://www.wikidata.org/wiki/Q7710687',
        'https://www.wikidata.org/wiki/Q7710714',
      ],
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Clamphook Academy',
  },
  identifier: 'https://orcid.org/0009-0001-7595-5114',
  sameAs: [
    'https://orcid.org/0009-0001-7595-5114',
    'https://www.wikidata.org/wiki/Q141595522',
    'https://www.wikidata.org/entity/Q141595522',
    'https://github.com/dszae',
    'https://www.linkedin.com/in/dszae',
    'https://dev.to/dszae',
    'https://hashnode.com/@dszae',
    'https://huggingface.co/dszae',
    'https://about.me/dipeshsapkota',
    'https://x.com/DszAe18',
    'https://instagram.com/dsz.ae',
    'https://facebook.com/dsz.ae',
    'https://www.threads.net/@dsz.ae',
    'https://wa.me/9779764685307',
  ],
  knowsAbout: [
    { '@type': 'DefinedTerm', name: 'Computer Engineering', sameAs: 'https://en.wikipedia.org/wiki/Computer_engineering' },
    { '@type': 'DefinedTerm', name: 'Artificial Intelligence', sameAs: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
    { '@type': 'DefinedTerm', name: 'Machine Learning', sameAs: 'https://en.wikipedia.org/wiki/Machine_learning' },
    { '@type': 'DefinedTerm', name: 'Embedded Systems', sameAs: 'https://en.wikipedia.org/wiki/Embedded_system' },
    { '@type': 'DefinedTerm', name: 'Circuit Analysis', sameAs: 'https://en.wikipedia.org/wiki/Network_analysis_(electrical_circuits)' },
    { '@type': 'DefinedTerm', name: 'Motion Graphic Design', sameAs: 'https://en.wikipedia.org/wiki/Motion_graphic_design' },
    { '@type': 'DefinedTerm', name: 'Video Editing', sameAs: 'https://en.wikipedia.org/wiki/Video_editing' },
    { '@type': 'DefinedTerm', name: 'Python Programming', sameAs: 'https://en.wikipedia.org/wiki/Python_(programming_language)' },
    { '@type': 'DefinedTerm', name: 'React', sameAs: 'https://en.wikipedia.org/wiki/React_(software)' },
    { '@type': 'DefinedTerm', name: 'Next.js', sameAs: 'https://en.wikipedia.org/wiki/Next.js' },
    { '@type': 'DefinedTerm', name: 'Internet of Things', sameAs: 'https://en.wikipedia.org/wiki/Internet_of_things' },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Graphic Design Masterclass',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'Udemy' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Motion Design with Figma',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'Udemy' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'After Effects Course',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'EDUCBA' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'DaVinci Resolve 16: Color Correction',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'Blackmagic Design' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Adobe Premiere Pro CC Masterclass',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'Udemy' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Web Development Masterclass',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'Udemy' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Google Adwords Crash Course 2021',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'Udemy' },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Design Principles, Typography & Color Theory',
      credentialCategory: 'Certification',
      recognizedBy: { '@type': 'Organization', name: 'Udemy' },
    },
  ],
  hasOccupation: [
    {
      '@type': 'Occupation',
      name: 'Computer Engineering Student',
      description: 'Undergraduate Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal.',
    },
    {
      '@type': 'Occupation',
      name: 'Motion Graphics Designer & Video Editor',
      description: 'Motion designer and video editor with 4+ years of freelance experience for over 50 global clients.',
    },
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
      '@id': `${siteUrl}/profile`,
      name: 'Profile',
      description: 'Verified public profile, credentials, and biographical records of Dipesh Sapkota.',
      url: `${siteUrl}/profile`,
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
      '@id': `${siteUrl}/blog`,
      name: 'Articles',
      description: 'Published technical articles, architectural case studies, and engineering write-ups by Dipesh Sapkota on DEV Community.',
      url: `${siteUrl}/blog`,
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
      '@type': 'ItemList',
      '@id': `${siteUrl}/#navigation-elements`,
      name: 'Main portfolio navigation',
      description: 'Primary sitelinks navigation elements for Google Search results',
      numberOfItems: 7,
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
          name: 'Projects',
          description: 'Software applications, hardware simulations, and AI/ML projects created by Dipesh Sapkota.',
          url: `${siteUrl}/projects`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 3,
          name: 'Articles',
          description: 'Published technical articles, architectural case studies, and engineering write-ups by Dipesh Sapkota on DEV Community.',
          url: `${siteUrl}/blog`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 4,
          name: 'Skills',
          description: 'Programming languages, tools, frameworks, and engineering competencies.',
          url: `${siteUrl}/skills`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 5,
          name: 'Certificates',
          description: 'Verified technical certifications from Udemy, EDUCBA, and Blackmagic Design.',
          url: `${siteUrl}/certificates`,
        },
        {
          '@type': 'SiteNavigationElement',
          position: 6,
          name: 'Resume',
          description: 'Curriculum Vitae, academic history, roles, and downloadable PDF resume.',
          url: `${siteUrl}/resume`,
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
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#sitelinks-list`,
      name: 'Dipesh Sapkota Sitelinks',
      description: 'Core sitelinks navigation list for Google Search results',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'About',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/about`,
            name: 'About',
            url: `${siteUrl}/about`,
            description: 'Academic background, journey, and technical focus of Dipesh Sapkota at IOE Thapathali Campus.',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Profile',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/profile`,
            name: 'Profile',
            url: `${siteUrl}/profile`,
            description: 'Verified public profile, credentials, and biographical records of Dipesh Sapkota.',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Skills',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/skills`,
            name: 'Skills',
            url: `${siteUrl}/skills`,
            description: 'Programming languages, tools, frameworks, and engineering competencies.',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Projects',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/projects`,
            name: 'Projects',
            url: `${siteUrl}/projects`,
            description: 'Featured software systems, open-source projects, and engineering tools.',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Articles',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/blog`,
            name: 'Articles',
            url: `${siteUrl}/blog`,
            description: 'Published technical articles, architectural case studies, and engineering write-ups by Dipesh Sapkota on DEV Community.',
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          name: 'Certificates',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/certificates`,
            name: 'Certificates',
            url: `${siteUrl}/certificates`,
            description: 'Verified technical certifications from Udemy, EDUCBA, and Blackmagic Design.',
          },
        },
        {
          '@type': 'ListItem',
          position: 7,
          name: 'Resume',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/resume`,
            name: 'Resume',
            url: `${siteUrl}/resume`,
            description: 'Curriculum Vitae, academic history, roles, and downloadable PDF resume.',
          },
        },
        {
          '@type': 'ListItem',
          position: 8,
          name: 'Gallery',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/gallery`,
            name: 'Gallery',
            url: `${siteUrl}/gallery`,
            description: 'Campus memories, leadership events, and creative media visual archive.',
          },
        },
        {
          '@type': 'ListItem',
          position: 9,
          name: 'Contact',
          item: {
            '@type': 'WebPage',
            '@id': `${siteUrl}/contact`,
            name: 'Contact',
            url: `${siteUrl}/contact`,
            description: 'Get in touch for engineering collaborations, freelance work, and inquiries.',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#featured-projects`,
      name: 'Featured projects by Dipesh Sapkota',
      description: 'Sportivo, IOE Admission Guide, and Git Visualizer engineering projects created by Dipesh Sapkota.',
      itemListElement: [
        {
          '@type': 'SoftwareApplication',
          position: 1,
          name: 'Sportivo',
          description: 'Real-time live sports streaming and match schedule platform created by Dipesh Sapkota.',
          url: 'https://sportivo.dipeshsapkota7.com.np/',
          image: `${siteUrl}/sportivo-preview.jpg`,
          applicationCategory: 'SportsApplication',
          operatingSystem: 'Any modern browser (Web Application)',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          author: { '@id': personId },
          creator: { '@id': personId },
          sameAs: [
            'https://sportivo.dipeshsapkota7.com.np/',
            'https://github.com/dszae/sportivo',
          ],
        },
        {
          '@type': 'SoftwareApplication',
          position: 2,
          name: 'IOE Admission Guide (Admission Hub)',
          description: 'Engineering admission portal with rank prediction, cutoff analytics, and counseling tools created by Dipesh Sapkota.',
          url: 'https://ioe-admission.dipeshsapkota7.com.np/',
          image: `${siteUrl}/ioe-preview.jpg`,
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Any modern browser (Web Application)',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          author: { '@id': personId },
          creator: { '@id': personId },
        },
        {
          '@type': 'SoftwareApplication',
          position: 3,
          name: 'Git Visualizer',
          description: 'Interactive Git version-control and DAG learning tool created by Dipesh Sapkota.',
          url: 'https://git-visualizer.dipeshsapkota7.com.np/',
          image: `${siteUrl}/git-preview.jpg`,
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Any modern browser (Web Application)',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          author: { '@id': personId },
          creator: { '@id': personId },
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

export default function JsonLdSchema({ settings }) {
  if (settings?.profile || settings?.seo) {
    const dynamicPerson = buildPersonJsonLd(settings);
    const dynamicWebSite = buildWebSiteJsonLd(settings);
    const dynamicGraph = siteSchema['@graph'].map((item) => {
      if (item['@id'] === personId) return dynamicPerson;
      if (item['@id'] === websiteId) return dynamicWebSite;
      return item;
    });

    return <JsonLdScript id="json-ld-schema" data={{ ...siteSchema, '@graph': dynamicGraph }} />;
  }
  return <JsonLdScript id="json-ld-schema" data={siteSchema} />;
}

export function HomePageJsonLd() {
  return <JsonLdScript id="home-page-json-ld-schema" data={homePageSchema} />;
}
