import React from 'react';
import type { Metadata } from 'next';
import CareTakerClient from './CareTakerClient';
import SchemaMarkup from '@/components/seo/schema-markup';
import { services } from '@/lib/placeholder-data';

export const metadata: Metadata = {
    title: 'Trained Care Takers at Home | Patient Support & Elderly Care | Aries PhysioCare',
    description: 'Professional, compassionate in-home care taker services for the elderly, post-operative patients, and individuals needing bedside assistance. Across Mumbai, Pune, and major Indian cities. Trusted by thousands of families.',
    keywords: [
        'care taker at home',
        'patient support services',
        'elderly care taker',
        'home attendant for patients',
        'bedside assistance at home',
        '12 hour care taker',
        '24 hour patient care',
        'trained attendant for stroke patients'
    ],
    openGraph: {
        title: 'Dignified & Professional In-Home Care Taker Services',
        description: 'Master the activities of daily living with our trained care takers. Compassionate assistance delivered in your own home.',
        url: 'https://www.ariesphysiocare.com/services/care-taker',
        images: [{ url: 'https://images.unsplash.com/photo-1576765608535-5f04c18459e4?auto=format&fit=crop&q=85&w=1200', width: 1200, height: 630, alt: 'Care Taker Services' }],
    },
    alternates: {
        canonical: 'https://www.ariesphysiocare.com/services/care-taker',
    },
};

export default function CareTakerPage() {
    const service = services.find(s => s.slug === 'care-taker');

    if (!service) return null;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Professional In-Home Care Taker Services",
        "description": service.longDescription,
        "provider": {
            "@type": "MedicalOrganization",
            "name": "Aries PhysioCare India",
            "url": "https://www.ariesphysiocare.com"
        },
        "areaServed": "India",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Personal Care Programs",
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
            <CareTakerClient />
        </>
    );
}
