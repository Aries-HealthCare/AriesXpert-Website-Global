import React from 'react';
import type { Metadata } from 'next';
import DieticianClient from './DieticianClient';
import SchemaMarkup from '@/components/seo/schema-markup';
import { services } from '@/lib/placeholder-data';

export const metadata: Metadata = {
    title: 'Clinical Dietician at Home | Expert Medical Nutrition Therapy | Aries PhysioCare',
    description: 'Evidence-based clinical dietician services at your doorstep. Specialized medical nutrition therapy for diabetes, hypertension, PCOS, weight management, and post-surgery recovery across Mumbai, Pune, and major Indian cities.',
    keywords: [
        'clinical dietician at home',
        'medical nutrition therapy',
        'dietician for diabetes',
        'nutrition for hypertension',
        'PCOS diet specialist',
        'weight loss clinical program',
        'heart healthy diet plan',
        'home nutrition consultation'
    ],
    openGraph: {
        title: 'Professional Medical Nutrition Therapy at Your Doorstep',
        description: 'Master your metabolic health with our expert clinical dieticians. Personalized, science-backed nutrition plans delivered in your home.',
        url: 'https://www.ariesphysiocare.com/services/dietician',
        images: [{ url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=85&w=1200', width: 1200, height: 630, alt: 'Clinical Dietician' }],
    },
    alternates: {
        canonical: 'https://www.ariesphysiocare.com/services/dietician',
    },
};

export default function DieticianPage() {
    const service = services.find(s => s.slug === 'dietician');

    if (!service) return null;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Clinical Dietician & Medical Nutrition Therapy",
        "description": service.longDescription,
        "provider": {
            "@type": "MedicalOrganization",
            "name": "Aries PhysioCare India",
            "url": "https://www.ariesphysiocare.com"
        },
        "areaServed": "India",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Clinical Nutrition Programs",
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
            <DieticianClient />
        </>
    );
}
