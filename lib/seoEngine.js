import { getSiteSettings, DEFAULT_SITE_SETTINGS } from './dataService';

export const SITE_URL = 'https://www.dipeshsapkota7.com.np';

export function toAbsoluteUrl(pathOrUrl = '') {
  if (!pathOrUrl) return `${SITE_URL}/dipesh-sapkota.jpg`;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${cleanPath}`;
}

export function analyzeContent({
  title = '',
  description = '',
  content = '',
  category = '',
  tags = [],
  tech = []
} = {}) {
  const cleanBody = (content || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/#{1,6}\s+/g, ' ')
    .replace(/[*_~`>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = cleanBody ? cleanBody.split(/\s+/).filter(Boolean).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));
  const readTime = `${readTimeMinutes} min read`;

  let excerpt = (description || '').trim();
  if (!excerpt || excerpt.length < 30) {
    if (cleanBody) {
      const sentenceMatch = cleanBody.match(/^(.*?[.!?])(?:\s|$)/);
      if (sentenceMatch && sentenceMatch[1].length >= 40 && sentenceMatch[1].length <= 220) {
        excerpt = sentenceMatch[1].trim();
      } else {
        excerpt = cleanBody.slice(0, 160).trim();
        if (cleanBody.length > 160) excerpt += '...';
      }
    }
  }

  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
    'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
    'will', 'with', 'about', 'this', 'these', 'those', 'which', 'who', 'how',
    'can', 'into', 'then', 'than', 'when', 'where', 'also', 'more', 'some',
    'what', 'all', 'any', 'each', 'very', 'just', 'such', 'like', 'through',
    'over', 'our', 'your', 'their', 'them', 'they', 'we', 'i', 'my', 'me',
    'using', 'used', 'build', 'create', 'make', 'made', 'new', 'well', 'both'
  ]);

  const rawTokens = `${title} ${category} ${cleanBody.slice(0, 3000)}`
    .toLowerCase()
    .replace(/[^a-z0-9+#.-]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 2 && !stopWords.has(t));

  const frequency = {};
  for (const token of rawTokens) {
    frequency[token] = (frequency[token] || 0) + 1;
  }

  const extractedKeywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([token]) => token.charAt(0).toUpperCase() + token.slice(1));

  const explicitTags = Array.isArray(tags) ? tags : (typeof tags === 'string' ? tags.split(',').map(s => s.trim()) : []);
  const techTokens = Array.isArray(tech) ? tech : (typeof tech === 'string' ? tech.split(',').map(s => s.trim()) : []);

  const mergedKeywords = Array.from(new Set([
    ...explicitTags,
    ...techTokens,
    ...(category ? [category] : []),
    ...extractedKeywords
  ])).filter(Boolean);

  const fullText = `${title} ${category} ${techTokens.join(' ')} ${cleanBody.slice(0, 2000)}`.toLowerCase();

  const isTechnical = /code|function|api|database|react|next|python|algorithm|hardware|model|circuit|sql|docker|architecture|git|component|pipeline|training|inference|embedded/i.test(fullText);

  let appCategory = 'DeveloperApplication';
  let osRequirement = 'Any modern browser (Web Application)';

  if (/hardware|embedded|circuit|esp32|arduino|microcontroller|simulation|stm32|cad/i.test(fullText)) {
    appCategory = 'HardwareSimulationApplication';
    osRequirement = 'Embedded Hardware / Microcontroller or Web Browser';
  } else if (/ai|ml|learning|model|neural|nlp|vision|dataset|pytorch|tensorflow/i.test(fullText)) {
    appCategory = 'ArtificialIntelligenceApplication';
    osRequirement = 'Cross-platform (Python 3.10+ / Web Browser)';
  } else if (/video|media|motion|animation|graphics|reel|edit|davinci|blender/i.test(fullText)) {
    appCategory = 'MultimediaApplication';
    osRequirement = 'Cross-platform Video Workstation (DaVinci Resolve / Web)';
  } else if (/sports|game|live|score|fixture|football|cricket/i.test(fullText)) {
    appCategory = 'SportsApplication';
    osRequirement = 'Cross-platform Web & Mobile PWA';
  }

  return {
    cleanBody,
    words,
    readTime,
    excerpt,
    keywords: mergedKeywords,
    isTechnical,
    appCategory,
    osRequirement,
    schemaType: isTechnical ? 'TechArticle' : 'BlogPosting'
  };
}

export async function generatePageMetadata({
  title,
  description,
  content = '',
  category = '',
  tech = [],
  path = '/',
  image,
  type = 'website',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  noIndex = false,
}) {
  const settings = await getSiteSettings();
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const seo = settings?.seo || DEFAULT_SITE_SETTINGS.seo;

  const analysis = analyzeContent({
    title: title || '',
    description: description || '',
    content,
    category,
    tags: keywords,
    tech,
    type
  });

  const canonicalUrl = toAbsoluteUrl(path);
  const siteName = profile.name ? `${profile.name} Portfolio` : 'Dipesh Sapkota Portfolio';
  
  const finalTitle = title 
    ? (title.includes(profile.name) ? title : `${title} | ${profile.name}`)
    : (seo.title || `${profile.name} | Computer Engineering Student & AI/ML Enthusiast`);

  const finalDescription = analysis.excerpt || seo.description || profile.bio || '';
  const sanitizedDesc = finalDescription.length > 200 
    ? `${finalDescription.slice(0, 197)}...` 
    : finalDescription;

  const rawImage = image || seo.og_image || profile.avatar_url || '/dipesh-sapkota.jpg';
  const finalImageUrl = toAbsoluteUrl(rawImage);

  const dynamicKeywords = Array.from(new Set([
    ...analysis.keywords,
    profile.name,
    ...(type === 'website' && path === '/' ? [
      `${profile.name} portfolio`,
      'Computer Engineering student Nepal',
      'AI/ML enthusiast',
      'IOE Thapathali Campus'
    ] : [])
  ]));

  const twitterHandle = (seo.twitter_handle || '@dszae').replace(/^@?/, '@');

  return {
    metadataBase: new URL(SITE_URL),
    title: title ? { absolute: finalTitle } : finalTitle,
    description: sanitizedDesc,
    keywords: dynamicKeywords,
    authors: [{ name: author || profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
    applicationName: siteName,
    referrer: 'strict-origin-when-cross-origin',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: type === 'article' ? 'article' : type === 'profile' ? 'profile' : 'website',
      url: canonicalUrl,
      title: finalTitle,
      description: sanitizedDesc,
      siteName,
      locale: 'en_US',
      images: [
        {
          url: finalImageUrl,
          width: 1200,
          height: 630,
          alt: `${title || profile.name} preview banner`,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: [author || profile.name],
        tags: dynamicKeywords,
        section: category || 'Engineering',
      }),
      ...(type === 'profile' && {
        firstName: profile.name.split(' ')[0] || 'Dipesh',
        lastName: profile.name.split(' ').slice(1).join(' ') || 'Sapkota',
        username: 'dszae',
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: sanitizedDesc,
      images: [finalImageUrl],
      creator: twitterHandle,
      site: twitterHandle,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };
}

export function buildPersonJsonLd(settings) {
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const avatarUrl = toAbsoluteUrl(profile.avatar_url || '/dipesh-sapkota.jpg');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#author`,
    name: profile.name,
    givenName: profile.name.split(' ')[0] || 'Dipesh',
    familyName: profile.name.split(' ').slice(1).join(' ') || 'Sapkota',
    additionalName: 'dszae',
    alternateName: ['dszae', 'dsz.ae', `${profile.name} (dszae)`, 'Dipesh'],
    description: profile.bio || 'Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal, exploring Artificial Intelligence, Machine Learning, embedded systems, and visual motion design.',
    disambiguatingDescription: `${profile.tagline || 'Computer Engineering Student & AI/ML Enthusiast'} at IOE Thapathali Campus in Nepal; creator of IOE Admission Hub, Sportivo, and Git Visualizer; known online as dszae.`,
    url: `${SITE_URL}/`,
    mainEntityOfPage: `${SITE_URL}/profile`,
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#primary-image`,
      url: avatarUrl,
      caption: `Official portrait of ${profile.name}`,
    },
    gender: 'https://schema.org/Male',
    jobTitle: [
      profile.tagline || 'Computer Engineering Student & AI/ML Enthusiast',
      'AI/ML Enthusiast',
      'Motion Graphics Designer',
      'Video Editor'
    ],
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
      name: `${profile.location || 'Kathmandu'}, Nepal`,
      sameAs: [
        'https://en.wikipedia.org/wiki/Kathmandu',
        'https://www.wikidata.org/wiki/Q2429',
      ],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location || 'Kathmandu',
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
    sameAs: [
      'https://www.wikidata.org/wiki/Q141595522',
      'https://www.wikidata.org/entity/Q141595522',
      'https://github.com/dszae',
      'https://www.linkedin.com/in/dszae',
      'https://dev.to/dszae',
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
}

export function buildWebSiteJsonLd(settings) {
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const seo = settings?.seo || DEFAULT_SITE_SETTINGS.seo;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: profile.name,
    alternateName: [`${profile.name} Portfolio`, 'dszae'],
    url: `${SITE_URL}/`,
    description: seo.description || profile.bio,
    publisher: { '@id': `${SITE_URL}/#author` },
    inLanguage: 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    hasPart: [
      { '@type': 'WebPage', '@id': `${SITE_URL}/about`, name: 'About', url: `${SITE_URL}/about`, description: 'Academic background, journey, and technical focus of Dipesh Sapkota at IOE Thapathali Campus.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/profile`, name: 'Profile', url: `${SITE_URL}/profile`, description: 'Verified public profile and biographical records of Dipesh Sapkota.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/projects`, name: 'Projects', url: `${SITE_URL}/projects`, description: 'Software applications, hardware simulations, and AI/ML projects created by Dipesh Sapkota.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/resume`, name: 'Resume', url: `${SITE_URL}/resume`, description: 'Curriculum Vitae, academic credentials, and career history of Dipesh Sapkota.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/skills`, name: 'Skills', url: `${SITE_URL}/skills`, description: 'Technical competencies, programming toolchains, and engineering disciplines.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/blog`, name: 'Articles', url: `${SITE_URL}/blog`, description: 'Published technical articles, architectural case studies, and engineering write-ups by Dipesh Sapkota on DEV Community.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/certificates`, name: 'Certificates', url: `${SITE_URL}/certificates`, description: 'Verified credentials in DaVinci Resolve, graphic design, and engineering.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/gallery`, name: 'Gallery', url: `${SITE_URL}/gallery`, description: 'Campus events, robotics exhibitions, and creative visual archives.' },
      { '@type': 'WebPage', '@id': `${SITE_URL}/contact`, name: 'Contact', url: `${SITE_URL}/contact`, description: 'Get in touch for technical collaborations and inquiries.' },
    ],
  };
}

export function buildBreadcrumbJsonLd(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(article, settings) {
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const articleUrl = toAbsoluteUrl(article.slug ? `/blog/${article.slug}` : `/blog/${article.id}`);
  const coverUrl = toAbsoluteUrl(article.cover_image || '/sportivo-preview.jpg');

  const analysis = analyzeContent({
    title: article.title,
    description: article.excerpt || article.description,
    content: article.content,
    category: article.category,
    tags: article.tags,
    type: 'article'
  });

  return {
    '@context': 'https://schema.org',
    '@type': analysis.schemaType,
    '@id': `${articleUrl}#article`,
    url: articleUrl,
    headline: article.title,
    description: analysis.excerpt,
    image: coverUrl,
    wordCount: analysis.words,
    timeRequired: `PT${Math.max(1, Math.ceil(analysis.words / 200))}M`,
    articleSection: article.category || 'Engineering',
    datePublished: article.published_at || new Date().toISOString(),
    dateModified: article.updated_at || article.published_at || new Date().toISOString(),
    author: { '@id': `${SITE_URL}/#author` },
    publisher: {
      '@type': 'Organization',
      name: profile.name,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(profile.avatar_url || '/profile.webp'),
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    inLanguage: 'en',
    keywords: analysis.keywords.join(', '),
  };
}

export function buildProjectJsonLd(project, settings = null) {
  const projectUrl = toAbsoluteUrl(`/projects/${project.slug || project.id}`);
  const imageUrl = toAbsoluteUrl(project.img || '/sportivo-preview.jpg');
  const authorName = settings?.profile?.name || DEFAULT_SITE_SETTINGS.profile.name;

  const analysis = analyzeContent({
    title: project.title,
    description: project.description,
    content: project.description,
    category: project.category || project.category_label,
    tech: project.tech,
    type: 'project'
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${projectUrl}#software`,
    name: project.title,
    description: analysis.excerpt,
    url: project.live_url || projectUrl,
    image: imageUrl,
    applicationCategory: analysis.appCategory,
    operatingSystem: analysis.osRequirement,
    keywords: analysis.keywords.join(', '),
    programmingLanguage: Array.isArray(project.tech) ? project.tech : [],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Person',
      name: authorName,
      '@id': `${SITE_URL}/#author`,
    },
    creator: {
      '@type': 'Person',
      name: authorName,
      '@id': `${SITE_URL}/#author`,
    },
    ...(project.github_url && {
      sameAs: [project.github_url],
    }),
  };
}

export function buildProfilePageJsonLd(settings, path = '/about') {
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const pageUrl = toAbsoluteUrl(path);
  const personEntity = buildPersonJsonLd(settings);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name: `${profile.name} | Official Profile & Biography`,
    description: profile.bio,
    mainEntity: personEntity,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl(profile.avatar_url || '/profile.webp'),
    },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en',
  };
}

export function buildCredentialJsonLd(cert, settings) {
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const certUrl = toAbsoluteUrl(cert.credential_url || '/certificates');
  const imageUrl = toAbsoluteUrl(cert.img);

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOccupationalCredential',
    name: cert.title,
    credentialCategory: cert.category || 'Certification',
    recognizedBy: {
      '@type': 'Organization',
      name: cert.org,
    },
    url: certUrl,
    image: imageUrl,
    recipient: {
      '@type': 'Person',
      name: profile.name,
      '@id': `${SITE_URL}/#author`,
    },
  };
}

export function buildImageJsonLd(imgObj, settings) {
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const imageUrl = toAbsoluteUrl(imgObj.img || imgObj.src || imgObj.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: imageUrl,
    url: imageUrl,
    name: imgObj.title || imgObj.alt || 'Portfolio Asset',
    description: imgObj.alt || imgObj.title || `Photograph / artwork by ${profile.name}`,
    caption: imgObj.title || imgObj.alt,
    creator: {
      '@type': 'Person',
      name: profile.name,
    },
    creditText: profile.name,
    copyrightNotice: `© ${new Date().getFullYear()} ${profile.name}. All rights reserved.`,
    license: `${SITE_URL}/image-licensing`,
    acquireLicensePage: `${SITE_URL}/image-licensing`,
  };
}

export function buildVideoJsonLd(videoObj, settings = null) {
  const profile = settings?.profile || DEFAULT_SITE_SETTINGS.profile;
  const videoUrl = toAbsoluteUrl(videoObj.url || '/projects/sports-reels');
  const thumbnailUrl = toAbsoluteUrl(videoObj.thumbnail || videoObj.img || '/instagram-videos.png');

  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `${videoUrl}#video`,
    name: videoObj.title || videoObj.name || 'Sports Reels & Motion Design Collection',
    description: videoObj.description || `High-energy sports edits, kinetic motion typography, and video storytelling produced by ${profile.name}.`,
    thumbnailUrl: [thumbnailUrl],
    uploadDate: videoObj.uploadDate || '2024-12-01T00:00:00+05:45',
    contentUrl: videoObj.contentUrl || 'https://instagram.com/dsz.ae',
    embedUrl: videoObj.embedUrl || videoUrl,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: profile.name,
      '@id': `${SITE_URL}/#author`,
    },
    creator: {
      '@type': 'Person',
      name: profile.name,
      '@id': `${SITE_URL}/#author`,
    },
    publisher: {
      '@type': 'Organization',
      name: profile.name,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl(profile.avatar_url || '/profile.webp'),
      },
    },
  };
}
