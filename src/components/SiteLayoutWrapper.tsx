'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import MobileCtaFooter from '@/components/mobile-cta-footer';
import WhatsAppButton from '@/components/whatsapp-button';
import HanumanWelcomeCard from '@/components/devotional/HanumanWelcomeCard';
import DynamicOfferPopup from '@/components/offers/DynamicOfferPopup';
import AutoLocationDetector from '@/components/AutoLocationDetector';

export default function SiteLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPortalRoute = Boolean(pathname && pathname.startsWith('/portal'));
  const isCustomLayoutRoute = isPortalRoute;
  const isBorivaliRoute = Boolean(pathname && (pathname.includes('borivali') || pathname.includes('physiotherapy-clinic-borivali-west')));

  return (
    <>
      <AutoLocationDetector />
      {!isCustomLayoutRoute && <Header />}
      
      <main id="main-content" className="flex-1 bg-background text-foreground overflow-x-hidden">
        {children}
      </main>

      {!isCustomLayoutRoute && (
        <>
          <Footer />
          <MobileCtaFooter />
          <WhatsAppButton />
          {!isBorivaliRoute && <HanumanWelcomeCard />}
          {!isBorivaliRoute && <DynamicOfferPopup />}
        </>
      )}
    </>
  );
}
