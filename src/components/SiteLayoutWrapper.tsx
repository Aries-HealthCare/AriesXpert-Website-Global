'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import CountryPopup from '@/components/landing/country-popup';
import MobileCtaFooter from '@/components/mobile-cta-footer';
import WhatsAppButton from '@/components/whatsapp-button';
import { ProviderAuthProvider } from '@/services/provider-auth-context';

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAppRoute = Boolean(pathname && (pathname.startsWith('/app') || pathname.startsWith('/portal')));
  const isAuthRoute = Boolean(
    pathname &&
      (pathname === '/login' ||
        pathname === '/register' ||
        pathname === '/verify' ||
        pathname === '/onboarding')
  );

  return (
    <ProviderAuthProvider>
      {!isAppRoute && !isAuthRoute && <Header />}
      
      <main className={`flex-1 ${isAppRoute ? 'bg-background' : ''}`}>
        {children}
      </main>

      {!isAppRoute && !isAuthRoute && (
        <>
          <Footer />
          <CountryPopup />
          <MobileCtaFooter />
          <WhatsAppButton />
        </>
      )}
    </ProviderAuthProvider>
  );
}
