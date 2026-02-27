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
  
  // Normalize checking for auth pages
  const isAuthPage = pathSegments.includes('login') || pathSegments.includes('register');
  
  // 1. Unauthenticated users
  if (!token) {
    if (!isAuthPage) {
      // Redirect to login if trying to access page while unauthenticated
      const url = new URL(`/${detectedLocale}/login`, request.url);
      return NextResponse.redirect(url);
    }
    return handleI18nRouting(request);
  }

  // 2. Authenticated users
  let isAdmin = false;
  try {
    const payload = decodeJwt(token);
    isAdmin = payload.role === 'admin';
  } catch (error) {
    // If token is invalid, treat as unauthenticated
    if (!isAuthPage) {
        return NextResponse.redirect(new URL(`/${detectedLocale}/login`, request.url));
    }
    return handleI18nRouting(request);
  }

  // Prevent authenticated users from accessing login/register
  if (isAuthPage) {
    return NextResponse.redirect(new URL(isAdmin ? `/${detectedLocale}/dashboard` : `/${detectedLocale}`, request.url));
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
