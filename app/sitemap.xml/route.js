import { 
  getProjects, 
  getArticles, 
  getCertificates, 
  getGalleryImages, 
  getExperiences, 
  getSiteSettings 
} from '@/lib/dataService';
import { SITE_URL, toAbsoluteUrl } from '@/lib/seoEngine';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const escapeXml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export async function GET() {
  const [projects, articles, certificates, gallery, experiences, settings] = await Promise.all([
    getProjects().catch(() => []),
    getArticles().catch(() => []),
    getCertificates().catch(() => []),
    getGalleryImages().catch(() => []),
    getExperiences().catch(() => []),
    getSiteSettings().catch(() => ({})),
  ]);

  const profile = settings?.profile || {};
  const today = new Date().toISOString().split('T')[0];

  const portraitImage = {
    path: toAbsoluteUrl(profile.avatar_url || '/dipesh-sapkota.jpg'),
    title: `Official portrait of ${profile.name || 'Dipesh Sapkota'}`,
  };

  // 1. Core Primary Navigation Pages
  const corePages = [
    {
      loc: `${SITE_URL}/`,
      priority: '1.0',
      changefreq: 'daily',
      lastmod: today,
      images: [portraitImage],
    },
    {
      loc: `${SITE_URL}/about`,
      priority: '0.95',
      changefreq: 'weekly',
      lastmod: today,
      images: [portraitImage],
    },
    {
      loc: `${SITE_URL}/skills`,
      priority: '0.95',
      changefreq: 'weekly',
      lastmod: today,
      images: [],
    },
    {
      loc: `${SITE_URL}/projects`,
      priority: '0.95',
      changefreq: 'weekly',
      lastmod: today,
      images: projects.slice(0, 5).map(p => ({
        path: toAbsoluteUrl(p.img),
        title: p.title || 'Project Preview',
      })),
    },
    {
      loc: `${SITE_URL}/blog`,
      priority: '0.90',
      changefreq: 'weekly',
      lastmod: today,
      images: articles.slice(0, 5).map(a => ({
        path: toAbsoluteUrl(a.cover_image),
        title: a.title || 'Article Cover',
      })),
    },
    {
      loc: `${SITE_URL}/certificates`,
      priority: '0.90',
      changefreq: 'monthly',
      lastmod: today,
      images: certificates.map(c => ({
        path: toAbsoluteUrl(c.img),
        title: `${c.title} by ${c.org}`,
      })),
    },
    {
      loc: `${SITE_URL}/resume`,
      priority: '0.95',
      changefreq: 'weekly',
      lastmod: today,
      images: [
        portraitImage,
        ...experiences.filter(e => e.logo).map(e => ({
          path: toAbsoluteUrl(e.logo),
          title: `${e.organization || e.company} Logo`,
        }))
      ],
    },
    {
      loc: `${SITE_URL}/gallery`,
      priority: '0.85',
      changefreq: 'weekly',
      lastmod: today,
      images: gallery.map(g => ({
        path: toAbsoluteUrl(g.img),
        title: g.title || g.alt || 'Gallery photo',
      })),
    },
    {
      loc: `${SITE_URL}/contact`,
      priority: '0.85',
      changefreq: 'monthly',
      lastmod: today,
      images: [],
    },
    {
      loc: `${SITE_URL}/image-licensing`,
      priority: '0.50',
      changefreq: 'yearly',
      lastmod: today,
      images: [],
    },
  ];

  // 2. Dynamic Project Pages from Database
  const projectPages = projects
    .filter(p => p.status === 'published' || !p.status)
    .map(p => ({
      loc: `${SITE_URL}/projects/${p.slug || p.id}`,
      priority: p.featured ? '0.90' : '0.80',
      changefreq: 'monthly',
      lastmod: (p.updated_at || p.created_at || today).split('T')[0],
      images: p.img ? [{ path: toAbsoluteUrl(p.img), title: p.title }] : [],
    }));

  // 3. Dynamic Article Pages from Database
  const articlePages = articles
    .filter(a => a.status === 'published' || !a.status)
    .map(a => ({
      loc: `${SITE_URL}/blog/${a.slug || a.id}`,
      priority: '0.85',
      changefreq: 'monthly',
      lastmod: (a.updated_at || a.published_at || today).split('T')[0],
      images: a.cover_image ? [{ path: toAbsoluteUrl(a.cover_image), title: a.title }] : [],
    }));

  // 4. External Live Deployments associated with the portfolio
  const externalSubdomains = [
    { loc: 'https://sportivo.dipeshsapkota7.com.np/', priority: '0.90', changefreq: 'weekly', lastmod: today, images: [] },
    { loc: 'https://ioe-admission.dipeshsapkota7.com.np/', priority: '0.90', changefreq: 'weekly', lastmod: today, images: [] },
    { loc: 'https://git-visualizer.dipeshsapkota7.com.np/', priority: '0.90', changefreq: 'weekly', lastmod: today, images: [] },
  ];

  const allUrls = [...corePages, ...projectPages, ...articlePages, ...externalSubdomains];

  const xmlEntries = allUrls.map(({ loc, priority, changefreq, lastmod, images = [] }) => {
    const imageTags = images
      .filter(img => img.path)
      .map(img => `<image:image><image:loc>${escapeXml(img.path)}</image:loc><image:title>${escapeXml(img.title || 'Image')}</image:title></image:image>`)
      .join('');

    return `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod || today}</lastmod><changefreq>${changefreq || 'weekly'}</changefreq><priority>${priority || '0.7'}</priority>${imageTags}</url>`;
  }).join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${xmlEntries}</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
