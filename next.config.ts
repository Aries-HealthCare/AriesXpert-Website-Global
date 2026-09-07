import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['@genkit-ai/google-genai', 'genkit', 'google-auth-library', 'gtoken'],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,

  // ============================================================
  // SEO CRITICAL: 301 Redirects from old WordPress URLs
  // Preserves all link juice and rankings from ariesphysiocare.com
  // ============================================================
  async redirects() {
    return [
      // ── Core page redirects ──────────────────────────────────
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/about-us/', destination: '/about', permanent: true },
      { source: '/service', destination: '/services', permanent: true },
      { source: '/service/', destination: '/services', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/blog/', destination: '/blogs', permanent: true },
      { source: '/contact/', destination: '/contact', permanent: true },
      { source: '/our-expert-doctors', destination: '/physiotherapists', permanent: true },
      { source: '/our-expert-doctors/', destination: '/physiotherapists', permanent: true },
      { source: '/expert-center', destination: '/locations', permanent: true },
      { source: '/expert-center/', destination: '/locations', permanent: true },
      { source: '/clinic', destination: '/locations', permanent: true },
      { source: '/clinic/', destination: '/locations', permanent: true },
      { source: '/clinics', destination: '/locations', permanent: true },
      { source: '/clinics/', destination: '/locations', permanent: true },

      // ── Doctor/Therapist profile redirects (DEC-03) ──────────
      { source: '/Doctor/:slug', destination: '/physiotherapists/:slug', permanent: true },
      { source: '/doctor/:slug', destination: '/physiotherapists/:slug', permanent: true },
      { source: '/therapist', destination: '/physiotherapists', permanent: true },
      { source: '/therapist/', destination: '/physiotherapists', permanent: true },
      { source: '/therapist/:slug', destination: '/physiotherapists/:slug', permanent: true },

      // ── National & Old SEO Page Redirects (DEC-01) ───────────
      { source: '/physiotherapy-in-india', destination: '/services/physiotherapy', permanent: true },
      { source: '/physiotherapy-in-india/', destination: '/services/physiotherapy', permanent: true },

      // ── City page redirects (DEC-01) ─────────────────────────
      { source: '/physiotherapy-in-mumbai', destination: '/services/physiotherapy/mumbai', permanent: true },
      { source: '/physiotherapy-in-mumbai/', destination: '/services/physiotherapy/mumbai', permanent: true },
      { source: '/mumbai', destination: '/services/physiotherapy/mumbai', permanent: true },
      { source: '/mumbai/', destination: '/services/physiotherapy/mumbai', permanent: true },

      { source: '/physiotherapy-in-pune', destination: '/services/physiotherapy/pune', permanent: true },
      { source: '/physiotherapy-in-pune/', destination: '/services/physiotherapy/pune', permanent: true },
      { source: '/pune', destination: '/services/physiotherapy/pune', permanent: true },
      { source: '/pune/', destination: '/services/physiotherapy/pune', permanent: true },

      { source: '/physiotherapy-in-surat', destination: '/services/physiotherapy/surat', permanent: true },
      { source: '/physiotherapy-in-surat/', destination: '/services/physiotherapy/surat', permanent: true },
      { source: '/surat', destination: '/services/physiotherapy/surat', permanent: true },
      { source: '/surat/', destination: '/services/physiotherapy/surat', permanent: true },

      { source: '/physiotherapy-in-ahmedabad', destination: '/services/physiotherapy/ahmedabad', permanent: true },
      { source: '/physiotherapy-in-ahmedabad/', destination: '/services/physiotherapy/ahmedabad', permanent: true },
      { source: '/ahmedabad', destination: '/services/physiotherapy/ahmedabad', permanent: true },
      { source: '/ahmedabad/', destination: '/services/physiotherapy/ahmedabad', permanent: true },

      { source: '/physiotherapy-in-bangalore', destination: '/services/physiotherapy/bangalore', permanent: true },
      { source: '/physiotherapy-in-bangalore/', destination: '/services/physiotherapy/bangalore', permanent: true },
      { source: '/bangalore', destination: '/services/physiotherapy/bangalore', permanent: true },
      { source: '/bangalore/', destination: '/services/physiotherapy/bangalore', permanent: true },

      { source: '/physiotherapy-in-chennai', destination: '/services/physiotherapy/chennai', permanent: true },
      { source: '/physiotherapy-in-chennai/', destination: '/services/physiotherapy/chennai', permanent: true },
      { source: '/chennai', destination: '/services/physiotherapy/chennai', permanent: true },
      { source: '/chennai/', destination: '/services/physiotherapy/chennai', permanent: true },

      { source: '/physiotherapy-in-delhi', destination: '/services/physiotherapy/delhi', permanent: true },
      { source: '/physiotherapy-in-delhi/', destination: '/services/physiotherapy/delhi', permanent: true },
      { source: '/delhi', destination: '/services/physiotherapy/delhi', permanent: true },
      { source: '/delhi/', destination: '/services/physiotherapy/delhi', permanent: true },

      { source: '/physiotherapy-in-hyderabad', destination: '/services/physiotherapy/hyderabad', permanent: true },
      { source: '/physiotherapy-in-hyderabad/', destination: '/services/physiotherapy/hyderabad', permanent: true },
      { source: '/hyderabad', destination: '/services/physiotherapy/hyderabad', permanent: true },
      { source: '/hyderabad/', destination: '/services/physiotherapy/hyderabad', permanent: true },

      { source: '/physiotherapy-in-kolkatta', destination: '/services/physiotherapy/kolkata', permanent: true },
      { source: '/physiotherapy-in-kolkatta/', destination: '/services/physiotherapy/kolkata', permanent: true },
      { source: '/kolkatta', destination: '/services/physiotherapy/kolkata', permanent: true },
      { source: '/kolkatta/', destination: '/services/physiotherapy/kolkata', permanent: true },
      { source: '/physiotherapy-in-kolkata', destination: '/services/physiotherapy/kolkata', permanent: true },
      { source: '/physiotherapy-in-kolkata/', destination: '/services/physiotherapy/kolkata', permanent: true },
      { source: '/kolkata', destination: '/services/physiotherapy/kolkata', permanent: true },
      { source: '/kolkata/', destination: '/services/physiotherapy/kolkata', permanent: true },

      // ── High-Volume Locality Redirects (1:1 without wildcard collapsing) ──
      { source: '/physiotherapy-in-andheri', destination: '/services/physiotherapy/mumbai/andheri', permanent: true },
      { source: '/physiotherapy-in-andheri-west', destination: '/services/physiotherapy/mumbai/andheri-west', permanent: true },
      { source: '/physiotherapy-in-andheri-east', destination: '/services/physiotherapy/mumbai/andheri-east', permanent: true },
      { source: '/physiotherapy-in-bandra', destination: '/services/physiotherapy/mumbai/bandra', permanent: true },
      { source: '/physiotherapy-in-bandra-west', destination: '/services/physiotherapy/mumbai/bandra-west', permanent: true },
      { source: '/physiotherapy-in-colaba', destination: '/services/physiotherapy/mumbai/colaba', permanent: true },
      { source: '/physiotherapy-in-borivali', destination: '/services/physiotherapy/mumbai/borivali', permanent: true },
      { source: '/physiotherapy-in-dadar', destination: '/services/physiotherapy/mumbai/dadar', permanent: true },
      { source: '/physiotherapy-in-thane', destination: '/services/physiotherapy/mumbai/thane', permanent: true },
      { source: '/physiotherapy-in-koramangala', destination: '/services/physiotherapy/bangalore/koramangala', permanent: true },
      { source: '/physiotherapy-in-indiranagar', destination: '/services/physiotherapy/bangalore/indiranagar', permanent: true },
      { source: '/physiotherapy-in-whitefield', destination: '/services/physiotherapy/bangalore/whitefield', permanent: true },
      { source: '/physiotherapy-in-kothrud', destination: '/services/physiotherapy/pune/kothrud', permanent: true },
      { source: '/physiotherapy-in-wakad', destination: '/services/physiotherapy/pune/wakad', permanent: true },

      // ── Deep State URL Flattening Redirects (DEC-01) ──────────
      { source: '/services/:service/maharashtra/:city/:area', destination: '/services/:service/:city/:area', permanent: true },
      { source: '/services/:service/karnataka/:city/:area', destination: '/services/:service/:city/:area', permanent: true },
      { source: '/services/:service/delhi/:city/:area', destination: '/services/:service/:city/:area', permanent: true },
      { source: '/services/:service/tamil-nadu/:city/:area', destination: '/services/:service/:city/:area', permanent: true },
      { source: '/services/:service/telangana/:city/:area', destination: '/services/:service/:city/:area', permanent: true },
      { source: '/services/:service/gujarat/:city/:area', destination: '/services/:service/:city/:area', permanent: true },
      { source: '/services/:service/west-bengal/:city/:area', destination: '/services/:service/:city/:area', permanent: true },

      // ── Condition URL Consolidation to Clean Top-Level (DEC-02) ──
      { source: '/services/:serviceSlug/conditions/:conditionSlug', destination: '/conditions/:conditionSlug', permanent: true },
      { source: '/services/physiotherapy/conditions/:conditionSlug', destination: '/conditions/:conditionSlug', permanent: true },

      // ── Old service page redirects ───────────────────────────
      { source: '/home-visit-physiotherapy', destination: '/services/physiotherapy', permanent: true },
      { source: '/home-visit-physiotherapy/', destination: '/services/physiotherapy', permanent: true },
      { source: '/telehealth-physiotherapy', destination: '/services/physiotherapy', permanent: true },
      { source: '/telehealth-physiotherapy/', destination: '/services/physiotherapy', permanent: true },
      { source: '/in-hospital-treatment', destination: '/services/physiotherapy', permanent: true },
      { source: '/in-hospital-treatment/', destination: '/services/physiotherapy', permanent: true },

      // ── Legal page redirects ─────────────────────────────────
      { source: '/terms-conditions', destination: '/terms-of-service', permanent: true },
      { source: '/terms-conditions/', destination: '/terms-of-service', permanent: true },

      // ── Parity App Subdomain Redirects ───────────────────────
      { source: '/app', destination: 'https://app.ariesphysiocare.com', permanent: true },
      { source: '/app/:path*', destination: 'https://app.ariesphysiocare.com/:path*', permanent: true },
      { source: '/login', destination: 'https://app.ariesphysiocare.com/login', permanent: true },
      { source: '/login/', destination: 'https://app.ariesphysiocare.com/login', permanent: true },
      { source: '/onboarding', destination: 'https://app.ariesphysiocare.com/onboarding', permanent: true },
      { source: '/onboarding/', destination: 'https://app.ariesphysiocare.com/onboarding', permanent: true },
      { source: '/verify', destination: 'https://app.ariesphysiocare.com/verify', permanent: true },
      { source: '/verify/', destination: 'https://app.ariesphysiocare.com/verify', permanent: true },
      { source: '/doctors-login', destination: 'https://app.ariesphysiocare.com/login', permanent: true },
      { source: '/doctors-login/', destination: 'https://app.ariesphysiocare.com/login', permanent: true },
      { source: '/patients-login', destination: 'https://app.ariesphysiocare.com/login', permanent: true },
      { source: '/patients-login/', destination: 'https://app.ariesphysiocare.com/login', permanent: true },
      { source: '/dashboard', destination: 'https://app.ariesphysiocare.com', permanent: true },
      { source: '/dashboard/:path*', destination: 'https://app.ariesphysiocare.com/:path*', permanent: true },
      { source: '/register', destination: 'https://app.ariesphysiocare.com/onboarding', permanent: true },
      { source: '/register/', destination: 'https://app.ariesphysiocare.com/onboarding', permanent: true },
    ];
  },

  async rewrites() {
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://api.ariesxpert.com').replace(/\/$/, '');
    return [
      {
        source: '/api/app/:path*',
        destination: `${backendUrl}/api/app/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-select',
      '@radix-ui/react-popover',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs',
      '@radix-ui/react-accordion',
      'clsx',
      'tailwind-merge',
    ],
  },

  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 90, 95],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        // Allow old WordPress site images during transition
        protocol: 'https',
        hostname: 'ariesphysiocare.com',
        port: '',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'http',
        hostname: 'ariesphysiocare.com',
        port: '',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: '*.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'amigo-2.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'aries-physiohealthcare.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.ariesxpert.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.ariesxpert.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
