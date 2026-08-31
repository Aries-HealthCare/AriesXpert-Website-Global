'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import CountryPopup from '@/components/landing/country-popup';
import MobileCtaFooter from '@/components/mobile-cta-footer';
import WhatsAppButton from '@/components/whatsapp-button';

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortalRoute = Boolean(pathname && pathname.startsWith('/portal'));

  return (
    <>
      {!isPortalRoute && <Header />}
      
      <main className="flex-1 bg-background text-foreground">
        {children}
      </main>

      {!isPortalRoute && (
        <>
          <Footer />
          <CountryPopup />
          <MobileCtaFooter />
          <WhatsAppButton />
        </>
      )}
    </>
  );
}
