import React from 'react';
import type { Metadata } from 'next';
import OccupationalTherapyClient from './OccupationalTherapyClient';
import SchemaMarkup from '@/components/seo/schema-markup';
import { services } from '@/lib/placeholder-data';

export const metadata: Metadata = {
    title: 'Expert Occupational Therapy at Home | Aries PhysioCare India',
    description: 'Master daily living with expert in-home Occupational Therapy. Specialized clinical care for sensory processing, stroke rehab, pediatric development, and geriatric safety. Book your home visit in Mumbai, Pune, and major indian cities.',
    keywords: [
        'occupational therapy at home',
        'OT specialist india',
        'sensory integration therapy',
        'stroke occupational therapy',
        'ADL training',
        'pediatric occupational therapist',
        'geriatric home safety audit',
        'hand therapy at home'
    ],
    openGraph: {
        title: 'Professional Occupational Therapy at Your Doorstep',
        description: 'Master the activities of daily living with our expert clinical specialists. Reclaim your independence in the comfort of your own home.',
        url: 'https://www.ariesphysiocare.com/services/occupational-therapy',
        images: [{ url: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=85&w=1200', width: 1200, height: 630, alt: 'Occupational Therapy' }],
    },
    alternates: {
        canonical: 'https://www.ariesphysiocare.com/services/occupational-therapy',
    },
};

export default function OccupationalTherapyPage() {
    const service = services.find(s => s.slug === 'occupational-therapy');

    if (!service) return null;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Occupational Therapy",
        "description": service.longDescription,
        "provider": {
            "@type": "MedicalOrganization",
            "name": "Aries PhysioCare India",
            "url": "https://www.ariesphysiocare.com"
        },
        "areaServed": "India",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Occupational Therapy Programs",
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
            <OccupationalTherapyClient />
        </>
    );
}
