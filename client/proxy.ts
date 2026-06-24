import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { decodeJwt } from 'jose';
import { TOKEN_KEY } from './utils/constants';

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip logic for internal Next.js paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_KEY)?.value;
  
  // Detect locale from path or fallback to default
  const pathSegments = pathname.split('/');
  const detectedLocale = routing.locales.includes(pathSegments[1] as (typeof routing.locales)[number]) 
    ? pathSegments[1] 
    : routing.defaultLocale;
  
  // Auth-related pages
  const isLoginOrRegister =
    pathSegments.includes('login') || pathSegments.includes('register');

  // Allow everyone to browse the site without authentication
  if (!token) {
    return handleI18nRouting(request);
  }

  // Authenticated users
  let isAdmin = false;
  try {
    const payload = decodeJwt(token);
    isAdmin = payload.role === 'admin';
  } catch {
    // Invalid token — treat as guest for browsing
    return handleI18nRouting(request);
  }

  // Logged-in users cannot access login/register again
  if (isLoginOrRegister) {
    return NextResponse.redirect(
      new URL(isAdmin ? `/${detectedLocale}/dashboard` : `/${detectedLocale}`, request.url)
    );
  }

  // Protect Dashboard specifically for admins/employees
  if (pathname.includes('/dashboard') && !isAdmin) {
    return NextResponse.redirect(new URL(`/${detectedLocale}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/',
  ]
};
