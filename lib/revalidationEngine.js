import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from './supabaseAdmin';
import { invalidateSiteSettingsCache } from './dataService';

export async function revalidateResource(resourceType, extraPaths = [], action = 'update') {
  invalidateSiteSettingsCache();

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
      pathsToRevalidate.add('/profile');
      break;

    case 'skills':
      pathsToRevalidate.add('/skills');
      pathsToRevalidate.add('/about');
      pathsToRevalidate.add('/profile');
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

  for (const path of pathsToRevalidate) {
    try {
      revalidatePath(path);
    } catch (err) {
      console.warn(`revalidatePath error on ${path}:`, err.message);
    }
  }

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
  } catch {}

  return { success: true, revalidated: Array.from(pathsToRevalidate) };
}
