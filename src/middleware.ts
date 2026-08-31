import { NextRequest, NextResponse } from 'next/server';

// ── 23 Parity App Sub-Routes ────────────────────────────
const PARITY_ROUTES = new Set([
  'appointments',
  'attendance',
  'availability',
  'buddy',
  'documents',
  'earnings',
  'gaming',
  'invoices',
  'leads',
  'notifications',
  'patients',
  'profile',
  'quality',
  'refer-patient',
  'referrals',
  'rewards',
  'settings',
  'sos',
  'support',
  'telehealth',
  'training',
  'visits',
  'wallet',
]);

const ROOT_PARITY_PAGES = new Set([
  'login',
  'onboarding',
  'verify',
  'dashboard',
]);

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host') || '';
  const pathname = url.pathname;

  // Bypass Next.js internals, API proxy routes, and static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // file with extension (e.g. .png, .jpg, .ico, .json)
  ) {
    return NextResponse.next();
  }

  const isAppSubdomain = hostname.startsWith('app.') || hostname.startsWith('app-');
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'app.ariesphysiocare.com';
  const firstSegment = pathname.split('/')[1];

  // =========================================================================
  // 1. Requests arriving at main website (ariesphysiocare.com)
  //    Redirect ANY parity app route directly to app.ariesphysiocare.com
  // =========================================================================
  if (!isAppSubdomain) {
    if (pathname === '/app' || pathname === '/dashboard') {
      return NextResponse.redirect(`https://${appDomain}/`, 308);
    }
    if (pathname.startsWith('/app/')) {
      const appSubPath = pathname.replace(/^\/app/, '');
      return NextResponse.redirect(`https://${appDomain}${appSubPath}`, 308);
    }
    if (PARITY_ROUTES.has(firstSegment)) {
      return NextResponse.redirect(`https://${appDomain}${pathname}`, 308);
    }
    if (ROOT_PARITY_PAGES.has(firstSegment)) {
      return NextResponse.redirect(`https://${appDomain}${pathname}`, 308);
    }
    return NextResponse.next();
  }

  // =========================================================================
  // 2. Requests arriving at app.ariesphysiocare.com
  // =========================================================================
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
