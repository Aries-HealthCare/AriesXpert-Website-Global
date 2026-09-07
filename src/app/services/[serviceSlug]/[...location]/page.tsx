import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getGeoPath } from '@/lib/placeholder-data';
import ServiceLocationClient from './ServiceLocationClient';

interface PageProps {
  params: Promise<{
    serviceSlug: string;
    location: string[];
  }>;
}

function capitalize(str: string) {
  if (!str) return '';
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug, location } = await params;
  const service = getServiceBySlug(serviceSlug);
  const geoPath = getGeoPath(location);

  if (!service || !geoPath) {
    return { title: 'Service Not Found | Aries PhysioCare' };
  }

  const cityName = geoPath.city?.name || 'Mumbai';
  const citySlug = geoPath.city?.slug || 'mumbai';
  const areaName = geoPath.area?.name || cityName;
  const areaSlug = geoPath.area?.slug || '';
  const subAreaName = geoPath.subArea?.name || areaName;
  const capArea = capitalize(subAreaName);
  const capCity = capitalize(cityName);
  const serviceName = service.name;

  // DEC-01: Clean canonical without state
  const canonicalPath = areaSlug ? `${serviceSlug}/${citySlug}/${areaSlug}` : `${serviceSlug}/${citySlug}`;
  const canonicalUrl = `https://www.ariesphysiocare.com/services/${canonicalPath}`;

  // DEC-04: Index Eligibility Gate
  // Only index if verified therapists cover this specific city/area
  const hasLocalTherapists = geoPath.city ? true : false;
  const isLocalityTierA = geoPath.area
    ? ['andheri', 'andheri-west', 'andheri-east', 'bandra', 'bandra-west', 'borivali', 'colaba', 'koramangala', 'indiranagar', 'whitefield', 'kothrud', 'wakad'].some(slug => areaSlug.includes(slug))
    : true;

  const shouldIndex = isLocalityTierA;

  return {
    title: `Best Home ${serviceName} in ${capArea}, ${capCity} | Aries PhysioCare`,
    description: `Expert home ${serviceName.toLowerCase()} specialists in ${capArea}, ${capCity}. Certified clinical experts, advanced portable modalities, and same-day visits near you. Book now!`,
    keywords: [
      `${serviceName.toLowerCase()} in ${capArea}`,
      `${serviceName.toLowerCase()} in ${capCity}`,
      `best physiotherapist in ${capArea}`,
      'home physiotherapy india',
      'aries physiocare',
      `physio at home ${capArea}`
    ],
    robots: shouldIndex ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: `Expert ${serviceName} at Home in ${capArea}, ${capCity}`,
      description: `Get hospital-grade ${serviceName.toLowerCase()} at your doorstep in ${capArea}. Trusted by 1000+ patients.`,
      url: canonicalUrl,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${serviceName} in ${capArea}` }],
    },
    alternates: {
      canonical: canonicalUrl,
    }
  };
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { serviceSlug, location } = await params;
  const service = getServiceBySlug(serviceSlug);
  const geoPath = getGeoPath(location);

  if (!service || !geoPath || !(geoPath.country || geoPath.state || geoPath.city || geoPath.area)) {
    notFound();
  }

  return (
    <ServiceLocationClient
      serviceSlug={serviceSlug}
      location={location}
    />
  );
}
