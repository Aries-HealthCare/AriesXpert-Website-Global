import Hero from "@/components/landing/hero";
import ServicesStrip from "@/components/landing/services-strip";
import AreaCarousel from "@/components/landing/area-carousel";
import AiPrecisionRecovery from "@/components/landing/ai-precision-recovery";
import Specialities from "@/components/landing/specialities";
import VettedExperts from "@/components/landing/vetted-experts";
import Locations from "@/components/landing/locations";
import WhatWeTreat from "@/components/landing/what-we-treat";
import BlogSection from "@/components/landing/blog-section";
import FaqSection from "@/components/landing/faq-section";
import GoogleReviews from "@/components/google-reviews";
import SchemaMarkup from "@/components/seo/schema-markup";
import PricingPackagesSection from "@/components/landing/pricing-packages-section";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Aries PhysioCare India",
    "url": "https://www.ariesphysiocare.com",
    "logo": "https://www.ariesphysiocare.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9136447006",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://facebook.com/ariesphysiocare",
      "https://instagram.com/ariesphysiocare",
      "https://twitter.com/ariesphysiocare"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Aries PhysioCare - Home Physiotherapy Services",
    "image": "https://www.ariesphysiocare.com/og-image.jpg",
    "@id": "https://www.ariesphysiocare.com",
    "url": "https://www.ariesphysiocare.com",
    "telephone": "+91-9136447006",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mumbai",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "07:00",
      "closes": "21:00"
    }
  };

  return (
    <>
      <SchemaMarkup data={organizationSchema} />
      <SchemaMarkup data={localBusinessSchema} />
      <Hero />
      <ServicesStrip />
      <AreaCarousel />
      <AiPrecisionRecovery />
      <Specialities />
      <PricingPackagesSection />
      <GoogleReviews locationName="your city" className="bg-background" />
      <VettedExperts />
      <Locations />
      <WhatWeTreat />
      <BlogSection />
      <FaqSection />
    </>
  );
}
