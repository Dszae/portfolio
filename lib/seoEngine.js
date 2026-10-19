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
  tech = [],
  type = 'article'
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
    alternateName: ['dszae', 'dsz.ae', 'Dipesh'],
    description: profile.bio,
    disambiguatingDescription: `${profile.tagline} at IOE Thapathali Campus in Nepal; creator of independent software and intelligent systems.`,
    url: `${SITE_URL}/`,
    mainEntityOfPage: `${SITE_URL}/`,
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#primary-image`,
      url: avatarUrl,
      caption: `Official portrait of ${profile.name}`,
    },
    jobTitle: [
      profile.tagline || 'Computer Engineering Student & AI/ML Enthusiast',
      'Full-Stack Developer',
      'Video Editor & Motion Designer'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location || 'Kathmandu',
      addressCountry: 'NP',
    },
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'Institute of Engineering (IOE), Thapathali Campus',
    },
    sameAs: [
      'https://github.com/dszae',
      'https://www.linkedin.com/in/dszae',
      'https://dev.to/dszae',
      'https://x.com/DszAe18',
      'https://instagram.com/dsz.ae',
      'https://facebook.com/dsz.ae',
    ],
    knowsAbout: [
      'Computer Engineering',
      'Artificial Intelligence & Machine Learning',
      'Python Programming',
      'Next.js & React Architecture',
      'Embedded Systems & Circuit Simulation',
      'Motion Design & Video Post-Production',
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

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name: `About ${profile.name}`,
    description: profile.bio,
    mainEntity: { '@id': `${SITE_URL}/#author` },
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
