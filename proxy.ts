import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const canonicalHost = 'www.dipeshsapkota7.com.np';
  const url = request.nextUrl.clone();

  if (url.hostname.toLowerCase() !== canonicalHost || url.protocol !== 'https:') {
    url.hostname = canonicalHost;
    url.protocol = 'https:';
    url.port = '';
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = request.nextUrl;

  // Keep API and Next.js internal requests out of the markdown negotiation path.
  if (pathname.startsWith('/api/') || pathname.startsWith('/_next/')) {
    return NextResponse.next();
  }

  // Static resources and metadata files should keep their native content types.
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  const accept = request.headers.get('accept') || '';

  if (accept.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/markdown';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Canonical redirects must cover HTML, API, and static asset URLs alike.
  matcher: '/:path*',
};
