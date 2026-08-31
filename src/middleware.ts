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

  // =========================================================================
  // 1. Requests arriving at app.ariesphysiocare.com (or app.localhost:3000)
  // =========================================================================
  if (isAppSubdomain) {
    // A. Root path `/` -> rewrite to `/app` (The Mobile Parity Dashboard)
    if (pathname === '/' || pathname === '') {
      return NextResponse.rewrite(new URL('/app', req.url));
    }

    // B. If request is `/app` -> rewrite to `/app`
    if (pathname === '/app') {
      return NextResponse.rewrite(new URL('/app', req.url));
    }

    // C. If request is `/app/<subpath>` -> rewrite to `/app/<subpath>`
    if (pathname.startsWith('/app/')) {
      return NextResponse.rewrite(new URL(pathname, req.url));
    }

    // D. Extract first segment of path (e.g. `/appointments` -> `appointments`)
    const firstSegment = pathname.split('/')[1];

    // E. If first segment is one of the 23 parity subroutes -> rewrite to `/app/<subpath>`
    if (PARITY_ROUTES.has(firstSegment)) {
      return NextResponse.rewrite(new URL(`/app${pathname}`, req.url));
    }

    // F. If it's a root parity page (`/login`, `/onboarding`, `/verify`) -> pass through directly
    if (ROOT_PARITY_PAGES.has(firstSegment)) {
      return NextResponse.next();
    }

    // G. If visiting dashboard -> rewrite to `/app`
    if (firstSegment === 'dashboard') {
      return NextResponse.rewrite(new URL('/app', req.url));
    }

    // Allow other common pages (e.g. `/privacy-policy`, `/terms-of-service`)
    return NextResponse.next();
  }

  // =========================================================================
  // 2. Requests arriving at main website (ariesphysiocare.com / localhost)
  // =========================================================================
  const isProduction = process.env.NODE_ENV === 'production';
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'app.ariesphysiocare.com';

  // In production, seamlessly redirect parity routes hitting main domain to app subdomain
  if (isProduction && !isAppSubdomain) {
    if (pathname === '/app') {
      return NextResponse.redirect(`https://${appDomain}/`, 308);
    }
    if (pathname.startsWith('/app/')) {
      const appSubPath = pathname.replace(/^\/app/, '');
      return NextResponse.redirect(`https://${appDomain}${appSubPath}`, 308);
    }
  }

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
