import React from 'react';
import type { Metadata } from 'next';
import HomeNursingClient from './HomeNursingClient';
import SchemaMarkup from '@/components/seo/schema-markup';
import { services } from '@/lib/placeholder-data';

export const metadata: Metadata = {
    title: 'Professional Home Nursing Services | Certified Nurses at Home | Aries PhysioCare',
    description: 'Expert home nursing care across Mumbai, Pune, and major Indian cities. Specialized in post-operative care, wound management, critical care, and geriatric nursing by certified clinical experts.',
    keywords: [
        'home nursing services',
        'certified nurse at home',
        'post operative nursing care',
        'wound dressing at home',
        'critical care nursing at home',
        'geriatric nursing india',
        'injection at home',
        'nursing for elderly at home'
    ],
    openGraph: {
        title: 'Hospital-Grade Nursing Care at Your Doorstep',
        description: 'Breathtakingly professional clinical care for your loved ones. Our certified nurses bridge the gap between hospital and home.',
        url: 'https://www.ariesphysiocare.com/services/home-nursing',
        images: [{ url: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=85&w=1200', width: 1200, height: 630, alt: 'Home Nursing Care' }],
    },
    alternates: {
        canonical: 'https://www.ariesphysiocare.com/services/home-nursing',
    },
};

export default function HomeNursingPage() {
    const service = services.find(s => s.slug === 'home-nursing');

    if (!service) return null;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Professional Home Nursing Services",
        "description": service.longDescription,
        "provider": {
            "@type": "MedicalOrganization",
            "name": "Aries PhysioCare India",
            "url": "https://www.ariesphysiocare.com"
        },
        "areaServed": "India",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Clinical Nursing Programs",
            "itemListElement": service.conditions.map((c, i) => ({
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
            <HomeNursingClient />
        </>
    );
}
