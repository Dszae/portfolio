import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import { getArticleBySlug, getArticles, getSiteSettings } from '@/lib/dataService';
import { generatePageMetadata, buildArticleJsonLd } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      robots: { index: false, follow: false },
    };
  }

  return await generatePageMetadata({
    title: article.title,
    description: article.excerpt || article.description,
    content: article.content,
    category: article.category,
    path: `/blog/${article.slug || resolvedParams.slug}`,
    image: article.cover_image || '/sportivo-preview.jpg',
    type: 'article',
    keywords: Array.isArray(article.tags) ? article.tags : (article.tags ? [article.tags] : []),
    publishedTime: article.published_at,
    modifiedTime: article.updated_at || article.published_at,
  });
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    .filter(a => a.slug)
    .map(a => ({ slug: a.slug }));
}

export default async function DynamicArticlePage({ params }) {
  const resolvedParams = await params;
  const [article, allArticles, siteSettings] = await Promise.all([
    getArticleBySlug(resolvedParams.slug),
    getArticles(),
    getSiteSettings(),
  ]);

  if (!article) {
    notFound();
  }

  const profile = siteSettings?.profile || {};
  const jsonLd = buildArticleJsonLd(article, siteSettings);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/blog' },
    { name: article.title, path: `/blog/${article.slug || resolvedParams.slug}` },
  ];

  const publishedArticles = allArticles.filter(a => a.status === 'published' || !a.status);
  const currentIndex = publishedArticles.findIndex(a => a.id === article.id || a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? publishedArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < publishedArticles.length - 1 ? publishedArticles[currentIndex + 1] : null;

  return (
    <SiteLayout>
      <div className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto w-full">
          <BreadcrumbJsonLd items={breadcrumbs} />
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <article className="space-y-8">
            
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <Link 
                href="/blog" 
                className="text-[#065F46] dark:text-[#34D399] font-mono hover:underline inline-flex items-center gap-1"
              >
                <span>&larr; All Articles</span>
              </Link>
              <span className="text-slate-400">&bull;</span>
              <span className="card-category-label">
                {article.category || 'Technical Write-Up'}
              </span>
              {article.read_time && (
                <span className="card-meta font-mono">{article.read_time}</span>
              )}
              {article.published_at && (
                <span className="text-slate-500 text-[11px] font-mono">
                  {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>

<h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
              {article.title}
            </h1>

{article.excerpt && (
              <p className="text-base sm:text-lg text-[#334155] dark:text-[#CBD5E1] leading-relaxed border-l-2 border-[#065F46] dark:border-[#34D399] pl-4 italic">
                {article.excerpt}
              </p>
            )}

{article.cover_image && (
              <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md">
                <Image
                  src={article.cover_image}
                  alt={article.title}
                  fill
                  unoptimized={true}
                  className="object-cover"
                  priority
                />
              </div>
            )}

<div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line">
              {article.content || article.description || article.excerpt}
            </div>

<div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
              {article.live_url && (
                <a
                  href={article.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#090B0E] font-semibold text-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Read on Original Publication &rarr;</span>
                </a>
              )}
              {article.local_url && (
                <Link
                  href={article.local_url}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-xs transition-colors"
                >
                  View Related Project Page
                </Link>
              )}
            </div>

<div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#141824] border border-slate-200 dark:border-slate-800 flex items-center gap-4 mt-12">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-emerald-500/30">
                <Image
                  src={profile.avatar_url || '/profile.webp'}
                  alt={profile.name || 'Dipesh Sapkota'}
                  fill
                  unoptimized={true}
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {profile.name || 'Dipesh Sapkota'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {profile.tagline || 'Computer Engineering Student · AI/ML Enthusiast · Motion Designer'}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                  <Link href="/about" className="text-[#065F46] dark:text-[#34D399] hover:underline">
                    About Author
                  </Link>
                  <span className="text-slate-400">&bull;</span>
                  <Link href="/contact" className="text-slate-500 hover:text-slate-800 dark:hover:text-white">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>

<PagePagination
              prev={prevArticle ? { label: prevArticle.title, path: `/blog/${prevArticle.slug || prevArticle.id}` } : { label: 'All Articles', path: '/blog' }}
              next={nextArticle ? { label: nextArticle.title, path: `/blog/${nextArticle.slug || nextArticle.id}` } : { label: 'Explore Projects', path: '/projects' }}
            />
          </article>
        </div>
      </div>
    </SiteLayout>
  );
}

