import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/placeholder-data';
import ServiceDetailClient from './ServiceDetailClient';
import SchemaMarkup from '@/components/seo/schema-markup';

interface PageProps {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return { title: 'Service Not Found | Aries PhysioCare' };
  }

  return {
    title: `Expert ${service.name} Services at Home | Aries PhysioCare India`,
    description: `${service.description} Get hospital-grade ${service.name.toLowerCase()} at your doorstep. Certified clinical experts, advanced protocols, and personalized care. Book now!`,
    keywords: [
      service.name,
      `home ${service.name.toLowerCase()}`,
      `${service.name.toLowerCase()} specialist near me`,
      'best physiotherapist india',
      'aries health care',
      'rehabilitation services at home'
    ],
    openGraph: {
      title: `Professional ${service.name} at Your Doorstep`,
      description: `Experience clinical excellence with our expert ${service.name.toLowerCase()} specialists. Personalized recovery plans in the comfort of your home.`,
      url: `https://www.ariesphysiocare.com/services/${serviceSlug}`,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: service.name }],
    },
    alternates: {
      canonical: `https://www.ariesphysiocare.com/services/${serviceSlug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Aries PhysioCare India",
      "url": "https://www.ariesphysiocare.com"
    },
    "areaServed": "India",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.name} Programs`,
      "itemListElement": service.conditions.slice(0, 10).map((c, i) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": c.name,
          "description": c.description
        },
        "position": i + 1
      }))
    }
  };

  return (
    <>
      <SchemaMarkup data={serviceSchema} />
      <ServiceDetailClient serviceSlug={serviceSlug} />
    </>
  );
}
