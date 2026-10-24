import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import { siteUrl, personId, websiteId } from '@/components/JsonLdSchema';
import { getArticles, ARTICLE_HIGHLIGHTS } from '@/lib/dataService';

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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <p className="text-base sm:text-lg text-[#1E293B] dark:text-[#A7B0BE] leading-relaxed max-w-2xl">
              Published technical articles, architectural case studies, and engineering write-ups from my official DEV Community author profile.
            </p>
            <a
              href="https://dev.to/dszae"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] text-xs font-mono font-medium text-slate-700 dark:text-slate-300 hover:border-[#065F46] dark:hover:border-[#34D399] hover:text-[#065F46] dark:hover:text-[#34D399] transition-colors shrink-0 shadow-sm"
            >
              <span>DEV: @dszae</span>
              <svg className="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <ul className="space-y-6">
            {publishedArticles.map((art) => {
              const primaryLink = art.live_url || art.local_url || `/blog/${art.slug || art.id}`;
              const isExternal = primaryLink.startsWith('http');
              const highlights = art.highlights || ARTICLE_HIGHLIGHTS[art.slug] || [];
              const tags = Array.isArray(art.tags) ? art.tags : (art.tags ? [art.tags] : []);
              const publishedDate = art.published_at ? new Date(art.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : null;

              return (
                <li 
                  key={art.id || art.slug} 
                  className="article-interactive-card group p-6 sm:p-8 rounded-2xl border border-[#CBD5E1] dark:border-[#222933] bg-white dark:bg-[#0F1216] hover:border-[#065F46]/60 dark:hover:border-[#34D399]/60 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="card-category-label">
                      {art.category || "Engineering"}
                    </span>
                    {art.read_time && (
                      <span className="card-meta">{art.read_time}</span>
                    )}
                    {publishedDate && (
                      <span className="text-[11px] font-mono text-slate-500 dark:text-[#64748B] hidden sm:inline">
                        &bull; {publishedDate}
                      </span>
                    )}
                  </div>
                  <a 
                    href={primaryLink} 
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="card-heading group-hover:text-[#065F46] dark:group-hover:text-[#34D399] transition-colors block mb-3"
                  >
                    {art.title}
                  </a>
                  <p className="card-description mb-4">
                    {art.excerpt || art.description}
                  </p>

                  {/* Smooth expander revealing authentic article details on hover */}
                  <div className="article-expand-grid">
                    <div className="article-expand-content">
                      <div className="article-expand-inner pt-4 mt-2 border-t border-slate-200/80 dark:border-[#222933] space-y-3">
                        {highlights.length > 0 && (
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#94A3B8] font-bold block mb-1.5">
                              Core Technical Highlights
                            </span>
                            <ul className="space-y-1.5 text-xs text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
                              {highlights.map((point, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2">
                                  <span className="text-[#065F46] dark:text-[#34D399] font-bold leading-normal select-none" aria-hidden="true">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-[#1E2530]">
                          {tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold mr-1">
                                Stack:
                              </span>
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181D24] text-[11px] font-mono text-[#065F46] dark:text-[#34D399] border border-slate-200 dark:border-[#222933] font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {publishedDate && (
                            <span className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8]">
                              Verified {publishedDate}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono mt-4 pt-3 border-t border-slate-100 dark:border-[#1a1f26]">
                    {art.live_url && (
                      <a 
                        href={art.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#065F46] dark:text-[#34D399] font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Read on DEV Community</span>
                        <svg className="w-3 h-3 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {art.local_url && art.local_url.startsWith('/projects') && (
                      <a href={art.local_url} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                        Project Overview
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
