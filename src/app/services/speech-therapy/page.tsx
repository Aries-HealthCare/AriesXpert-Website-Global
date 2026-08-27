import React from 'react';
import type { Metadata } from 'next';
import SpeechTherapyClient from './SpeechTherapyClient';
import SchemaMarkup from '@/components/seo/schema-markup';
import { services } from '@/lib/placeholder-data';

export const metadata: Metadata = {
    title: 'Expert Speech Therapy at Home | Speech-Language Pathology | Aries PhysioCare',
    description: 'Certified Speech-Language Pathology (SLP) services delivered at your home. Specialized therapy for pediatric speech delays, autism, post-stroke aphasia, stuttering, and swallowing disorders (dysphagia) in Mumbai, Pune, and major Indian cities.',
    keywords: [
        'speech therapy at home',
        'certified speech pathologist india',
        'pediatric speech therapy',
        'aphasia rehab after stroke',
        'dysphagia swallowing therapy',
        'stuttering treatment for adults',
        'social communication therapy autism',
        'voice disorders therapy'
    ],
    openGraph: {
        title: 'Professional Speech & Language Therapy at Your Doorstep',
        description: 'Restoring the human voice and connection. Evidence-based clinical care for speech and swallowing disorders at your home.',
        url: 'https://www.ariesphysiocare.com/services/speech-therapy',
        images: [{ url: 'https://images.unsplash.com/photo-1543881062-8e1f5798aee8?auto=format&fit=crop&q=85&w=1200', width: 1200, height: 630, alt: 'Speech Therapy Care' }],
    },
    alternates: {
        canonical: 'https://www.ariesphysiocare.com/services/speech-therapy',
    },
};

export default function SpeechTherapyPage() {
    const service = services.find(s => s.slug === 'speech-therapy');

    if (!service) return null;

    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Professional Speech-Language Pathology Services",
        "description": service.longDescription,
        "provider": {
            "@type": "MedicalOrganization",
            "name": "Aries PhysioCare India",
            "url": "https://www.ariesphysiocare.com"
        },
        "areaServed": "India",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Clinical Speech & Swallow Programs",
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
            <SpeechTherapyClient />
        </>
    );
}
