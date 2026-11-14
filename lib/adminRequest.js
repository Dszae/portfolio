import { NextResponse } from 'next/server';

/* Request helpers shared by the admin authentication routes. */

export const CANONICAL_ORIGIN = 'https://www.dipeshsapkota7.com.np';

const NO_STORE = { 'Cache-Control': 'no-store' };

export function json(body, status = 200, headers = {}) {
  return NextResponse.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

/* Rejects requests posted from another site. Same-origin browsers always send Origin on POST and DELETE. */
export function isSameOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return request.headers.get('sec-fetch-site') !== 'cross-site';
  try {
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientAddress(request) {
  return (
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

/*
 * Origin used in links that are emailed out. Production always uses the canonical
 * domain, so a forged Host header cannot point a reset link at another site.
 */
export function linkOrigin(request) {
  if (process.env.NODE_ENV === 'production') return CANONICAL_ORIGIN;
  return new URL(request.url).origin;
}

export function tooManyRequests(retryAfterSeconds, error = 'Too many requests') {
  return json({ error, code: 'rate_limited', retryAfterSeconds }, 429, { 'Retry-After': String(retryAfterSeconds) });
}

export async function readJson(request) {
  try {
    const body = await request.json();
    return body && typeof body === 'object' ? body : null;
  } catch {
    return null;
  }
}
