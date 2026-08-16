import { Metadata } from 'next';
import { getDetailedTherapyBySlug, therapyList, toSlug } from '@/lib/placeholder-data';
import TherapyClient from './therapy-client';

type Props = {
    params: Promise<{ therapySlug: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { therapySlug } = await params;
    const therapy = getDetailedTherapyBySlug(therapySlug);

    if (!therapy) {
        return {
            title: 'Therapy Not Found - AriesXpert',
            description: 'The requested therapy could not be found.',
        };
    }

    // SEO Optimization based on therapy info
    // Generate robust semantic keywords based on therapy details
    const keywordArray = [
        therapy.name,
        'Therapy',
        'Physiotherapy',
        'Rehabilitation',
        'Clinical Therapy',
        ...therapy.conditionsTreated.slice(0, 3), // Top 3 conditions
        ...therapy.benefits.slice(0, 2) // Top 2 benefits
    ];

    const title = `${therapy.name} - Expert Clinical Modality & Treatment | AriesXpert`;
    const description = `${therapy.description} Discover how ${therapy.name} works, its key benefits, techniques, and if it's right for your recovery journey at AriesXpert.`;

    return {
        title,
        description,
        keywords: keywordArray.join(', '),
        openGraph: {
            title,
            description,
            type: 'article',
            url: `https://ariesxpert.com/services/physiotherapy/therapies-offered/${therapySlug}`,
            images: [
                {
                    url: therapy.imageUrl || 'https://ariesxpert.com/default-therapy-og.jpg',
                    width: 1200,
                    height: 630,
                    alt: therapy.imageHint || therapy.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [therapy.imageUrl || 'https://ariesxpert.com/default-therapy-og.jpg'],
        },
        alternates: {
            canonical: `https://ariesxpert.com/services/physiotherapy/therapies-offered/${therapySlug}`,
        },
    };
}

export async function generateStaticParams() {
    return therapyList.map((name) => ({
        therapySlug: toSlug(name),
    }));
}

export default function Page() {
    return <TherapyClient />;
}
