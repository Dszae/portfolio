// Last real content change for pages whose dates are not stored in the database.
// Used for JSON-LD dateModified and sitemap <lastmod>.
// Update the matching date only when that page's visible content changes.
// Do not derive these from build time: Google ignores dates that move without content changes.

export const HOME_UPDATED = '2026-11-14';
export const ABOUT_UPDATED = '2026-11-16';

// JSON-LD expects a full timestamp; pages are authored in Nepal time (UTC+05:45).
export const toNepalTimestamp = (date) => `${date}T00:00:00+05:45`;
