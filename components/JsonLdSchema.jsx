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
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/projects?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
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
      description: 'In-depth software engineering articles and architectural breakdowns.',
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
      '@type': 'SiteNavigationElement',
      '@id': `${siteUrl}/#navigation`,
      name: 'Main portfolio navigation',
      hasPart: [
        { '@type': 'WebPage', name: 'About', description: 'Academic background, journey, and technical focus of Dipesh Sapkota.', url: `${siteUrl}/about` },
        { '@type': 'WebPage', name: 'Profile', description: 'Verified public profile, credentials, and biographical records of Dipesh Sapkota.', url: `${siteUrl}/profile` },
        { '@type': 'WebPage', name: 'Skills', description: 'Programming languages, tools, frameworks, and engineering competencies.', url: `${siteUrl}/skills` },
        { '@type': 'WebPage', name: 'Projects', description: 'Featured software systems, open-source projects, and engineering tools.', url: `${siteUrl}/projects` },
        { '@type': 'WebPage', name: 'Articles', description: 'In-depth software engineering write-ups and architectural breakdowns.', url: `${siteUrl}/blog` },
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
            description: 'In-depth software engineering write-ups and architectural breakdowns.',
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
          author: { '@id': personId },
          creator: { '@id': personId },
        },
        {
          '@type': 'WebApplication',
          '@id': 'https://ioe-admission.dipeshsapkota7.com.np/#app',
          name: 'IOE Admission Hub',
          description: 'An admission toolkit for Institute of Engineering applicants featuring rank prediction, campus exploration, priority planning, CBT score calculation, and counseling guidance.',
          url: 'https://ioe-admission.dipeshsapkota7.com.np/',
          author: { '@id': personId },
          creator: { '@id': personId },
        },
        {
          '@type': 'WebApplication',
          '@id': 'https://git-visualizer.dipeshsapkota7.com.np/#app',
          name: 'Git Visualizer',
          description: 'An interactive Git learning platform featuring a live commit graph, deterministic Git command simulator, guided lessons, safe undo tools, command reference, and a visual explanation of how Git moves code between repository stages.',
          url: 'https://git-visualizer.dipeshsapkota7.com.np/',
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
