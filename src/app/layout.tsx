import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import CountryPopup from "@/components/landing/country-popup";
import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import { RequestCallbackProvider } from "@/components/request-callback-provider";
import MobileCtaFooter from "@/components/mobile-cta-footer";
import { FirebaseClientProvider } from "@/firebase";
import WhatsAppButton from "@/components/whatsapp-button";
import { AttributionCapture } from "@/components/attribution-capture";

// 🔴 ACTION REQUIRED: Set NEXT_PUBLIC_GA_MEASUREMENT_ID in the environment to
// activate GA4. Until a real measurement ID (G-XXXXXXXXXX) is provisioned by
// the business owner, gtag.js is not loaded and no analytics traffic is sent.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ariesphysiocare.com'),
  title: {
    default: 'Aries PhysioCare INDIA | Expert Home Physiotherapy Services',
    template: '%s | Aries PhysioCare',
  },
  description: 'Aries PhysioCare: Your path to wellness. Expert home physiotherapy, rehabilitation & healthcare at your doorstep. 450+ specialist therapists across India. Book same-day appointments.',
  keywords: [
    'physiotherapy', 'home physiotherapy', 'physiotherapist near me',
    'best physiotherapist in mumbai', 'home healthcare india', 'aries physiocare',
    'physio at home', 'orthopedic rehabilitation', 'neurological rehabilitation',
    'sports injury management', 'post surgical rehabilitation', 'geriatric physiotherapy',
    'pediatric physiotherapy', 'home visit physiotherapy', 'telehealth physiotherapy',
    'physiotherapy mumbai', 'physiotherapy pune', 'physiotherapy bangalore',
    'physiotherapy delhi', 'physiotherapy chennai', 'physiotherapy hyderabad',
    'physiotherapy in india', 'expert physiotherapy', 'home health care',
  ],
  authors: [{ name: 'Aries PhysioCare' }],
  creator: 'Aries HealthCare International Pvt Ltd',
  publisher: 'Aries HealthCare International Pvt Ltd',
  category: 'Healthcare',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.ariesphysiocare.com',
    siteName: 'Aries PhysioCare India',
    title: 'Aries PhysioCare INDIA | Expert Home Physiotherapy Services',
    description: 'Aries PhysioCare: Your path to wellness. Expert physiotherapy for a healthier, active life. 450+ specialist therapists at your doorstep across India.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aries PhysioCare - Expert Home Physiotherapy Services India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ariesphysiocare',
    creator: '@ariesphysiocare',
    title: 'Aries PhysioCare INDIA | Expert Home Physiotherapy',
    description: 'Expert physiotherapy at your doorstep. 450+ specialist therapists across India. Book now.',
  },
  alternates: {
    canonical: 'https://www.ariesphysiocare.com',
  },
  /**
   * 🔴 ACTION REQUIRED: Add these to .env.local when available:
   *   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<your_code_from_search_console>
   *   NEXT_PUBLIC_BING_SITE_VERIFICATION=<your_code_from_bing_webmaster>
   * 
   * To get Google code: Search Console → Settings → Ownership Verification → HTML Tag
   * To get Bing code:   Bing Webmaster Tools → Settings → Site Verification
   */
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
      other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION },
    }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased flex flex-col min-h-screen`}>
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <ThemeProvider>
          <FirebaseClientProvider>
            <RequestCallbackProvider>
              <AttributionCapture />
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
              <Toaster />
              <CountryPopup />
              <MobileCtaFooter />
              <WhatsAppButton />
            </RequestCallbackProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
