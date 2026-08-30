import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Phone, MessageCircle, Star, MapPin, ChevronRight, Shield,
    CheckCircle2, Clock, HeartPulse, Award, Users, ArrowRight,
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import { citySeoPages, getCityData } from '@/lib/city-seo-data';
import { getLocationPageData, getAllLocationPageSlugs, type LocationPageData } from '@/lib/location-index';
import { getLocalBusinessSchema, getBreadcrumbSchema, getFAQSchema, getHealthcareServiceSchema } from '@/lib/seo-schemas';
import { services } from '@/lib/placeholder-data';
import CityLandingPageTemplate from '@/components/location/city-page-template';
import AreaLandingPageTemplate from '@/components/location/area-page-template';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours ISR cache

// ─── Fast Production Builds: Pre-render core city hubs; render localities on-demand ───
export async function generateStaticParams() {
    return citySeoPages.map(city => ({ citySlug: city.pageSlug }));
}

// ─── Per-page metadata ────────────────────────────────────────────────
export async function generateMetadata(
    { params }: { params: Promise<{ citySlug: string }> }
): Promise<Metadata> {
    const { citySlug } = await params;

    // Try city first
    const city = getCityData(citySlug);
    if (city) {
        return {
            title: city.metaTitle,
            description: city.metaDescription,
            keywords: city.keywords,
            alternates: { canonical: city.canonicalUrl },
            openGraph: {
                title: city.metaTitle,
                description: city.metaDescription,
                url: city.canonicalUrl,
                type: 'website',
                locale: 'en_IN',
            },
            twitter: {
                card: 'summary_large_image',
                title: city.metaTitle,
                description: city.metaDescription,
            },
        };
    }

    // Try area/sub-area lookup
    const location = getLocationPageData(citySlug);
    if (location) {
        return {
            title: location.metaTitle,
            description: location.metaDescription,
            keywords: location.keywords,
            alternates: { canonical: location.canonicalUrl },
            openGraph: {
                title: location.metaTitle,
                description: location.metaDescription,
                url: location.canonicalUrl,
                type: 'website',
                locale: 'en_IN',
            },
            twitter: {
                card: 'summary_large_image',
                title: location.metaTitle,
                description: location.metaDescription,
            },
        };
    }

    return { title: 'Page Not Found' };
}

// ─── Router: delegates to the correct template ───────────────────────
export default async function LocationRouter(
    { params }: { params: Promise<{ citySlug: string }> }
) {
    const { citySlug } = await params;

    // 1. City page
    const city = getCityData(citySlug);
    if (city) {
        return <CityLandingPageTemplate city={city} />;
    }

    // 2. Area / Sub-area page
    const location = getLocationPageData(citySlug);
    if (location) {
        return <AreaLandingPageTemplate location={location} />;
    }

    notFound();
}
