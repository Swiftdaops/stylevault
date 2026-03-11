import { NextResponse } from 'next/server';
import { extractTenantSlugFromHost } from './src/lib/seo';

export function middleware(request) {
  const tenantSlug = extractTenantSlugFromHost(request.headers.get('host') || '');

  if (!tenantSlug) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  if (url.pathname === '/' || url.pathname === '') {
    url.pathname = `/barbers/${tenantSlug}`;
    return NextResponse.rewrite(url);
  }

  if (url.pathname === '/book' || url.pathname === '/book/') {
    url.pathname = `/barbers/${tenantSlug}/book`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|.*\\..*).*)'],
};