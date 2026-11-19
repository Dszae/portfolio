/**
 * Fetches article bodies from the public DEV Community API so that /blog/[slug]
 * can host the full article on this domain (the canonical copy) instead of
 * redirecting to DEV Community.
 */

const DEVTO_ORIGIN = 'https://dev.to';
const REVALIDATE_SECONDS = 60 * 60;
// DEV answers 403 to requests without a User-Agent. Node's fetch sends one by
// default, but the Cloudflare Workers runtime does not, so set it explicitly.
const REQUEST_HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (compatible; article-fetcher/1.0)',
};

/** Returns "username/slug" for a dev.to article URL, or null for any other URL. */
export function devtoPathFromUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'dev.to') return null;
    const parts = parsed.pathname.split('/').filter(Boolean);
    return parts.length === 2 ? `${parts[0]}/${parts[1]}` : null;
  } catch {
    return null;
  }
}

function youtubeWatchUrl(embedSrc) {
  const match = embedSrc.match(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{6,})/);
  return match ? `https://www.youtube.com/watch?v=${match[1]}` : null;
}

/**
 * Normalizes DEV Community body_html for rendering on this site. The source is
 * the site owner's own DEV account and is already sanitized by DEV; this is a
 * second layer that also fits the content to the page and its CSP.
 */
export function sanitizeDevToHtml(html) {
  if (!html) return '';
  return html
    // Executable or styling blocks
    .replace(/<(script|style|object|embed)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|style|object|embed)\b[^>]*\/?>/gi, '')
    // Inline event handlers and javascript: URLs, only inside tags so code samples stay intact
    .replace(/<[a-z][a-z0-9]*\b[^>]*>/gi, (tag) => tag
      .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/(href|src)\s*=\s*(["'])\s*javascript:[^"']*\2/gi, '$1="#"'))
    // CSP blocks frames (frame-src 'none'): turn YouTube embeds into links, drop the rest
    .replace(/<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>[\s\S]*?<\/iframe>/gi, (_, src) => {
      const watch = youtubeWatchUrl(src);
      return watch
        ? `<p><a href="${watch}" target="_blank" rel="noopener noreferrer">Watch the video on YouTube</a></p>`
        : '';
    })
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    // DEV-relative links point at dev.to, not this site
    .replace(/(href|src)=(["'])\/(?!\/)/gi, `$1=$2${DEVTO_ORIGIN}/`)
    // The page renders the title as the only h1
    .replace(/<h1(\s[^>]*)?>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>')
    // Lazy-load images from the article body
    .replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy"');
}

/**
 * Fetches and sanitizes a DEV Community article. Returns null when the URL is
 * not a dev.to article or the request fails, so callers can fall back.
 */
export async function getDevToArticle(liveUrl) {
  const path = devtoPathFromUrl(liveUrl);
  if (!path) return null;
  try {
    let res;
    // DEV rate-limits bursts (429), which happens when many pages build at once.
    for (let attempt = 0; attempt < 3; attempt++) {
      res = await fetch(`${DEVTO_ORIGIN}/api/articles/${path}`, {
        headers: REQUEST_HEADERS,
        next: { revalidate: REVALIDATE_SECONDS },
      });
      if (res.ok || (res.status !== 429 && res.status < 500)) break;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
    if (!res.ok) {
      console.warn(`[devto] ${path}: HTTP ${res.status}, rendering fallback body`);
      return null;
    }
    const data = await res.json();
    const html = sanitizeDevToHtml(data.body_html || '');
    if (!html.trim()) return null;
    return {
      html,
      url: data.url || liveUrl,
      readingMinutes: data.reading_time_minutes || null,
      publishedAt: data.published_at || null,
      editedAt: data.edited_at || null,
    };
  } catch (err) {
    console.warn(`[devto] ${path}: ${err?.message || err}, rendering fallback body`);
    return null;
  }
}
