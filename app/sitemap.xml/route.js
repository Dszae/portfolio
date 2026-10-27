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
      loc: `${SITE_URL}/profile`,
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
  ];

  const projectPages = projects
    .filter(p => p.status === 'published' || !p.status)
    .map(p => {
      const isVideoProject = p.slug === 'sports-reels' || (p.category || '').toLowerCase().includes('video') || (p.category_label || '').toLowerCase().includes('video');
      return {
        loc: `${SITE_URL}/projects/${p.slug || p.id}`,
        priority: p.featured ? '0.90' : '0.80',
        changefreq: 'monthly',
        lastmod: (p.updated_at || p.created_at || today).split('T')[0],
        images: p.img ? [{ path: toAbsoluteUrl(p.img), title: p.title }] : [],
        videos: isVideoProject ? [{
          thumbnail_loc: toAbsoluteUrl(p.img || '/instagram-videos.png'),
          title: p.title || 'Sports Reels & Motion Design',
          description: p.description || 'Short-form sports edits, kinetic motion typography, and video storytelling by Dipesh Sapkota.',
          player_loc: `${SITE_URL}/projects/${p.slug || p.id}`,
          publication_date: (p.created_at || '2024-12-01T00:00:00+05:45').split('T')[0],
        }] : [],
      };
    });

  // External publications redirect to DEV Community, so the canonical indexable hub is ${SITE_URL}/blog.
  const allUrls = [...corePages, ...projectPages];

  const xmlEntries = allUrls.map(({ loc, priority, changefreq, lastmod, images = [], videos = [] }) => {
    const imageTags = images
      .filter(img => img.path)
      .map(img => `<image:image><image:loc>${escapeXml(img.path)}</image:loc><image:title>${escapeXml(img.title || 'Image')}</image:title></image:image>`)
      .join('');

    const videoTags = videos
      .filter(v => v.thumbnail_loc)
      .map(v => `<video:video><video:thumbnail_loc>${escapeXml(v.thumbnail_loc)}</video:thumbnail_loc><video:title>${escapeXml(v.title)}</video:title><video:description>${escapeXml(v.description)}</video:description><video:player_loc>${escapeXml(v.player_loc)}</video:player_loc><video:publication_date>${escapeXml(v.publication_date)}</video:publication_date><video:family_friendly>yes</video:family_friendly></video:video>`)
      .join('');

    return `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod || today}</lastmod><changefreq>${changefreq || 'weekly'}</changefreq><priority>${priority || '0.7'}</priority>${imageTags}${videoTags}</url>`;
  }).join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${xmlEntries}</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
