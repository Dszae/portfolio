// Custom Worker entry that wraps the OpenNext-generated worker (.open-next/worker.js).
//
// Why: OpenNext's /_next/image handler only sends a Cache-Control header when the source
// image is "immutable". Files in /public are served with `max-age=0`, so every optimized
// image was re-fetched and re-transformed through Cloudflare Images on every page view
// (~0.5 s per image, never cached by the browser or the edge).
//
// This wrapper caches each transformed image in the Cloudflare edge cache (keyed by URL and
// negotiated format) and gives browsers a long cache lifetime.
// To replace a public image, upload it under a new filename (e.g. -v2) so caches pick it up.

import handler from '../.open-next/worker.js';

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from '../.open-next/worker.js';

const IMAGE_PATH = '/_next/image';
// Browser: 30 days. Edge (Cache API honours s-maxage): 1 year.
const IMAGE_CACHE_CONTROL = 'public, max-age=2592000, s-maxage=31536000, stale-while-revalidate=86400';

function negotiatedFormat(request) {
  const accept = request.headers.get('Accept') || '';
  if (accept.includes('image/avif')) return 'avif';
  if (accept.includes('image/webp')) return 'webp';
  return 'original';
}

async function handleImage(request, env, ctx) {
  const url = new URL(request.url);
  const cacheKeyUrl = new URL(url.pathname + url.search, url.origin);
  cacheKeyUrl.searchParams.set('__fmt', negotiatedFormat(request));
  const cacheKey = new Request(cacheKeyUrl.toString(), { method: 'GET' });
  const cache = caches.default;

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const response = await handler.fetch(request, env, ctx);
  if (response.status !== 200) return response;

  const cacheable = new Response(response.body, response);
  cacheable.headers.set('Cache-Control', IMAGE_CACHE_CONTROL);
  ctx.waitUntil(cache.put(cacheKey, cacheable.clone()));
  return cacheable;
}

const worker = {
  async fetch(request, env, ctx) {
    if (request.method === 'GET' && new URL(request.url).pathname === IMAGE_PATH) {
      return handleImage(request, env, ctx);
    }
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
