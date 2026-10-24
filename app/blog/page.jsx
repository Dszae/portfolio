import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getArticles } from '@/lib/dataService';

export const revalidate = 60;

const articlesPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${siteUrl}/blog#articlespage`,
  url: `${siteUrl}/blog`,
  name: 'Articles | Dipesh Sapkota',
  description: 'Technical write-ups, architecture case studies, and engineering articles authored by Dipesh Sapkota.',
  creator: { '@id': personId },
  isPartOf: {
    '@type': 'WebSite',
    '@id': websiteId,
    name: 'Dipesh Sapkota',
    url: `${siteUrl}/`,
  },
  inLanguage: 'en',
};

import { generatePageMetadata } from '@/lib/seoEngine';

export async function generateMetadata() {
  return await generatePageMetadata({
    title: 'Articles',
    description: 'Technical write-ups, architecture case studies, and engineering articles authored by Dipesh Sapkota covering AI/ML, distributed systems, and modern web applications.',
    path: '/blog',
  });
}

export default async function BlogPage() {
  const articles = await getArticles();
  const publishedArticles = articles.filter(a => a.status === 'published' || !a.status);

  return (
    <SiteLayout>
      <div className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: 'Articles', path: '/blog' }]} />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesPageJsonLd) }}
          />
          
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight text-[#0F172A] dark:text-[#F9FAFB] flex items-center gap-3">
            <span className="text-[#065F46] dark:text-[#34D399]">/</span> Articles &amp; Write-Ups
          </h1>
          <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] mb-10 leading-relaxed max-w-2xl">
            In-depth engineering articles, architectural case studies, and technical write-ups covering AI/ML, distributed systems, and modern web applications.
          </p>

          <ul className="space-y-6">
            {publishedArticles.map((art) => {
              const primaryLink = art.live_url || art.local_url || `/blog/${art.slug || art.id}`;
              const isExternal = primaryLink.startsWith('http');

              return (
                <li 
                  key={art.id || art.slug} 
                  className="p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/50 dark:hover:border-[#34D399]/50 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="card-category-label">
                      {art.category || "Engineering"}
                    </span>
                    {art.read_time && (
                      <span className="card-meta">{art.read_time}</span>
                    )}
                  </div>
                  <a 
                    href={primaryLink} 
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="card-heading hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors block mb-3"
                  >
                    {art.title} &rarr;
                  </a>
                  <p className="card-description mb-4">
                    {art.excerpt || art.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    {art.local_url && (
                      <a href={art.local_url} className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline">
                        Read Local Case Study &rarr;
                      </a>
                    )}
                    {art.live_url && art.local_url && (
                      <a 
                        href={art.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      >
                        Live Publication &rarr;
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          <PagePagination
            prev={{ label: 'Featured Projects', path: '/projects' }}
            next={{ label: 'Certificates & Credentials', path: '/certificates' }}
          />
        </div>
      </div>
    </SiteLayout>
  );
}
