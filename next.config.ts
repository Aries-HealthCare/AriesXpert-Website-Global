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
      { source: '/our-expert-doctors', destination: '/therapist', permanent: true },
      { source: '/our-expert-doctors/', destination: '/therapist', permanent: true },
      { source: '/expert-center', destination: '/clinic', permanent: true },
      { source: '/expert-center/', destination: '/clinic', permanent: true },

      // ── Doctor/Therapist profile redirects ───────────────────
      { source: '/Doctor/:slug', destination: '/therapist/:slug', permanent: true },
      { source: '/doctor/:slug', destination: '/therapist/:slug', permanent: true },

      // ── City page redirects ──────────────────────────────────
      { source: '/mumbai', destination: '/physiotherapy-in-mumbai', permanent: true },
      { source: '/mumbai/', destination: '/physiotherapy-in-mumbai', permanent: true },
      { source: '/pune', destination: '/physiotherapy-in-pune', permanent: true },
      { source: '/pune/', destination: '/physiotherapy-in-pune', permanent: true },
      { source: '/surat', destination: '/physiotherapy-in-surat', permanent: true },
      { source: '/surat/', destination: '/physiotherapy-in-surat', permanent: true },
      { source: '/ahmedabad', destination: '/physiotherapy-in-ahmedabad', permanent: true },
      { source: '/ahmedabad/', destination: '/physiotherapy-in-ahmedabad', permanent: true },
      { source: '/bangalore', destination: '/physiotherapy-in-bangalore', permanent: true },
      { source: '/bangalore/', destination: '/physiotherapy-in-bangalore', permanent: true },
      { source: '/chennai', destination: '/physiotherapy-in-chennai', permanent: true },
      { source: '/chennai/', destination: '/physiotherapy-in-chennai', permanent: true },
      { source: '/delhi', destination: '/physiotherapy-in-delhi', permanent: true },
      { source: '/delhi/', destination: '/physiotherapy-in-delhi', permanent: true },
      { source: '/hyderabad', destination: '/physiotherapy-in-hyderabad', permanent: true },
      { source: '/hyderabad/', destination: '/physiotherapy-in-hyderabad', permanent: true },
      { source: '/kolkatta', destination: '/physiotherapy-in-kolkata', permanent: true },
      { source: '/kolkatta/', destination: '/physiotherapy-in-kolkata', permanent: true },
      { source: '/kolkata', destination: '/physiotherapy-in-kolkata', permanent: true },
      { source: '/kolkata/', destination: '/physiotherapy-in-kolkata', permanent: true },

      // ── City area/locality redirects (WordPress had /city/area) ─
      { source: '/mumbai/:area', destination: '/physiotherapy-in-mumbai', permanent: true },
      { source: '/pune/:area', destination: '/physiotherapy-in-pune', permanent: true },

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

      // ── Login page redirects ─────────────────────────────────
      { source: '/doctors-login', destination: '/login', permanent: true },
      { source: '/doctors-login/', destination: '/login', permanent: true },
      { source: '/patients-login', destination: '/login', permanent: true },
      { source: '/patients-login/', destination: '/login', permanent: true },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/app/:path*',
        destination: 'https://api.ariesxpert.com/api/app/:path*',
      },
      {
        source: '/api/v1/:path*',
        destination: 'https://api.ariesxpert.com/api/v1/:path*',
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
    ],
  },
};

export default nextConfig;
