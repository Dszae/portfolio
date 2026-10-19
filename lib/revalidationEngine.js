import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from './supabaseAdmin';
import { invalidateSiteSettingsCache } from './dataService';

/**
 * Universal revalidation engine for automated full-stack sync
 * Automatically updates SEO, meta structures, sitemaps, and cached pages whenever admin edits data.
 */
export async function revalidateResource(resourceType, extraPaths = [], action = 'update') {
  // 1. Invalidate in-memory database caches
  invalidateSiteSettingsCache();

  // 2. Base paths always refreshed on content changes
  const pathsToRevalidate = new Set(['/', '/sitemap.xml', ...extraPaths]);

  switch (resourceType) {
    case 'settings':
    case 'profile':
    case 'seo':
      pathsToRevalidate.add('/about');
      pathsToRevalidate.add('/profile');
      pathsToRevalidate.add('/contact');
      pathsToRevalidate.add('/resume');
      pathsToRevalidate.add('/skills');
      pathsToRevalidate.add('/projects');
      pathsToRevalidate.add('/blog');
      pathsToRevalidate.add('/certificates');
      pathsToRevalidate.add('/gallery');
      pathsToRevalidate.add('/api/site-features');
      break;

    case 'projects':
      pathsToRevalidate.add('/projects');
      break;

    case 'blog':
    case 'articles':
      pathsToRevalidate.add('/blog');
      break;

    case 'experience':
    case 'education':
      pathsToRevalidate.add('/resume');
      pathsToRevalidate.add('/about');
      break;

    case 'skills':
      pathsToRevalidate.add('/skills');
      pathsToRevalidate.add('/about');
      break;

    case 'certificates':
      pathsToRevalidate.add('/certificates');
      break;

    case 'gallery':
      pathsToRevalidate.add('/gallery');
      break;

    case 'services':
      pathsToRevalidate.add('/');
      break;

    default:
      break;
  }

  // 3. Revalidate each path cleanly
  for (const path of pathsToRevalidate) {
    try {
      revalidatePath(path);
    } catch (err) {
      console.warn(`revalidatePath error on ${path}:`, err.message);
    }
  }

  // 4. Log to activity_logs for audit trail
  try {
    await supabaseAdmin.from('activity_logs').insert([{
      action: `${resourceType}_${action}`,
      details: {
        resourceType,
        action,
        revalidatedPaths: Array.from(pathsToRevalidate),
        timestamp: new Date().toISOString()
      }
    }]);
  } catch {
    // Activity log failure should never block response
  }

  return { success: true, revalidated: Array.from(pathsToRevalidate) };
}

