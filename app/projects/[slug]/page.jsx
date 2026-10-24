import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import PagePagination from '@/components/PagePagination';
import { getProjectBySlug, getProjects, getSiteSettings } from '@/lib/dataService';
import { generatePageMetadata, buildProjectJsonLd } from '@/lib/seoEngine';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
      robots: { index: false, follow: false },
    };
  }

  return await generatePageMetadata({
    title: project.title,
    description: project.description,
    content: project.description,
    category: project.category_label || project.category,
    tech: project.tech,
    path: `/projects/${project.slug || resolvedParams.slug}`,
    image: project.img || '/sportivo-preview.jpg',
    keywords: Array.isArray(project.tech) ? project.tech : (project.tech ? [project.tech] : []),
  });
}

export async function generateStaticParams() {
  const projects = await getProjects();
  
  const hardcodedFolders = new Set([
    '555-flasher',
    'analyzer-diag',
    'git-visualizer',
    'ioe-admission-guide',
    'motor-modeling',
    'sportivo',
    'sports-reels',
  ]);

  return projects
    .filter(p => p.slug && !hardcodedFolders.has(p.slug))
    .map(p => ({ slug: p.slug }));
}

export default async function DynamicProjectPage({ params }) {
  const resolvedParams = await params;
  const [project, allProjects, siteSettings] = await Promise.all([
    getProjectBySlug(resolvedParams.slug),
    getProjects(),
    getSiteSettings(),
  ]);

  if (!project) {
    notFound();
  }

  const profile = siteSettings?.profile || {};
  const jsonLd = buildProjectJsonLd(project, siteSettings);
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: project.title, path: `/projects/${project.slug || resolvedParams.slug}` },
  ];

  const publishedProjects = allProjects.filter(p => p.status === 'published' || !p.status);
  const currentIndex = publishedProjects.findIndex(p => p.id === project.id || p.slug === project.slug);
  const prevProject = currentIndex > 0 ? publishedProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < publishedProjects.length - 1 ? publishedProjects[currentIndex + 1] : null;

  const techList = Array.isArray(project.tech)
    ? project.tech
    : typeof project.tech === 'string'
    ? project.tech.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <SiteLayout>
      <div className="w-full pt-28 sm:pt-32 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto w-full">
          <BreadcrumbJsonLd items={breadcrumbs} />

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          <article className="space-y-8">
            
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <Link 
                href="/projects" 
                className="text-[#065F46] dark:text-[#34D399] font-mono hover:underline inline-flex items-center gap-1"
              >
                <span>All Projects</span>
              </Link>
              <span className="text-slate-400">&bull;</span>
              <span className="card-category-label">
                {project.category_label || (project.category === 'dev' ? 'Development' : 'Creative Media')}
              </span>
              {project.type && (
                <span className="card-meta font-mono">{project.type}</span>
              )}
            </div>

<h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-snug">
              {project.title}
            </h1>

<div className="flex flex-wrap items-center gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#065F46] hover:bg-[#044E39] dark:bg-[#34D399] dark:hover:bg-[#6EE7B7] text-white dark:text-[#090B0E] font-semibold text-xs transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Launch Live Platform</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-xs transition-colors inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>View Source Code</span>
                </a>
              )}
            </div>

{project.img && (
              <div className="relative w-full h-72 sm:h-[420px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-lg">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  unoptimized={true}
                  className="object-cover"
                  priority
                />
              </div>
            )}

{techList.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                  Technologies & Architecture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techList.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs border border-slate-200 dark:border-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

<div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line pt-2">
              {project.description}
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
                  Designed & Engineered by {profile.name || 'Dipesh Sapkota'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                  {profile.tagline || 'Computer Engineering Student · AI/ML Enthusiast · Motion Designer'}
                </p>
                <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                  <Link href="/about" className="text-[#065F46] dark:text-[#34D399] hover:underline">
                    About Creator
                  </Link>
                  <span className="text-slate-400">&bull;</span>
                  <Link href="/contact" className="text-slate-500 hover:text-slate-800 dark:hover:text-white">
                    Contact Dipesh
                  </Link>
                </div>
              </div>
            </div>

<PagePagination
              prev={prevProject ? { label: prevProject.title, path: `/projects/${prevProject.slug || prevProject.id}` } : { label: 'All Projects', path: '/projects' }}
              next={nextProject ? { label: nextProject.title, path: `/projects/${nextProject.slug || nextProject.id}` } : { label: 'Explore Articles', path: '/blog' }}
            />
          </article>
        </div>
      </div>
    </SiteLayout>
  );
}

