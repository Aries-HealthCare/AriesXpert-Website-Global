import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { fetchTherapistsServer } from '@/services/therapists-server';
import AreaProfessionTemplate from '../../../components/location/area-profession-template';

interface PageProps {
    params: Promise<{
        citySlug: string;
        areaSlug: string;
    }>;
}

const PROFESSION_MAP: Record<string, { title: string; backend: string }> = {
    'physiotherapy': { title: 'Physiotherapy', backend: 'physiotherapy' },
    'occupational-therapy': { title: 'Occupational Therapy', backend: 'occupational_therapy' },
    'speech-therapy': { title: 'Speech Therapy', backend: 'speech_therapy' },
    'home-nursing': { title: 'Home Nursing', backend: 'nursing' },
    'nursing': { title: 'Home Nursing', backend: 'nursing' },
    'dietician': { title: 'Dietician', backend: 'dietician' },
    'care-taker': { title: 'Care Taker', backend: 'care_taker' },
    'massage-therapy': { title: 'Massage Therapy', backend: 'massage_therapy' },
};

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { citySlug, areaSlug } = await params;
    const prof = PROFESSION_MAP[citySlug];

    if (!prof) return { title: 'Professional Services | Aries PhysioCare' };

    const areaName = areaSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: `Best ${prof.title} in ${areaName} | Home Visit ${prof.title} | Aries PhysioCare`,
        description: `Book expert ${prof.title.toLowerCase()} specialists in ${areaName} for home sessions. Professional care for rehabilitation and recovery at your doorstep.`,
        keywords: [`${prof.title} in ${areaName}`, `home ${prof.title.toLowerCase()} ${areaName}`, `best ${prof.title.toLowerCase()} specialist ${areaName}`],
    };
}

export default async function AreaProfessionPage({ params }: PageProps) {
    const { citySlug, areaSlug } = await params;

    const prof = PROFESSION_MAP[citySlug];
    if (!prof) {
        // Fallback: check if it's a city slug instead of a profession
        // But the user specifically wants [citySlug]/[areaSlug]
        notFound();
    }

    const areaName = areaSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Fetch therapists for this profession and area
    const therapists = await fetchTherapistsServer({
        specialization: prof.backend,
        area: areaSlug,
        limit: 100
    });

    return (
        <main>
            <Header />
            <AreaProfessionTemplate
                profession={prof.title}
                professionSlug={citySlug}
                areaName={areaName}
                areaSlug={areaSlug}
                therapists={therapists}
            />
            <Footer />
        </main>
    );
}

export async function generateStaticParams() {
    // In a real scenario, we'd fetch all (profession, area) pairs from the DB.
    // For now, return empty array to allow ISR to handle it on-demand.
    return [];
}
