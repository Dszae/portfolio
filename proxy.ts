import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const accept = request.headers.get('accept') || '';

  if (accept.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};