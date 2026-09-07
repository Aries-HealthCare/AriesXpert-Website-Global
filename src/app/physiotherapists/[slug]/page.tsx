import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPhysicianSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import { fetchTherapistsServer } from '@/services/therapists-server';
import TherapistProfileTemplate from '@/components/therapist/therapist-profile-template';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const therapists = await fetchTherapistsServer({ slug });
    const therapist = therapists[0];

    if (!therapist) {
        return { title: 'Specialist Not Found | Aries PhysioCare' };
    }

    const canonicalUrl = `https://www.ariesphysiocare.com/physiotherapists/${slug}`;

    return {
        title: `${therapist.name} - ${therapist.specialization} | Aries PhysioCare`,
        description: `Book appointment with ${therapist.name}, expert ${therapist.specialization} specialist with ${therapist.experience} of experience. Available for home visits in ${therapist.city}.`,
        keywords: [`${therapist.name}`, `physiotherapist ${therapist.city}`, `home physiotherapy ${therapist.city}`, therapist.specialization, 'book physiotherapist online'],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${therapist.name} | Expert ${therapist.specialization}`,
            description: `Book a home session with ${therapist.name} — ${therapist.experience} clinical experience.`,
            url: canonicalUrl,
            images: [{ url: therapist.imageUrl, width: 800, height: 600, alt: therapist.name }],
        },
    };
}

export default async function PhysiotherapistProfilePage({ params }: PageProps) {
    const { slug } = await params;
    const therapists = await fetchTherapistsServer({ slug });
    const therapist = therapists[0];

    if (!therapist) {
        notFound();
    }

    const jsonLd = [
        getPhysicianSchema({
            name: therapist.name,
            qualification: therapist.qualification,
            experience: therapist.experience,
            specialization: therapist.specialization,
            areas: therapist.areas,
            slug: therapist.slug,
            imageUrl: therapist.imageUrl,
            rating: therapist.rating,
            reviewCount: therapist.reviewCount,
            city: therapist.city,
            state: therapist.state,
            bio: therapist.bio,
            education: therapist.education,
        }),
        getBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Physiotherapists', url: '/physiotherapists' },
            { name: therapist.name, url: `/physiotherapists/${slug}` },
        ]),
    ];

    return (
        <>
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <TherapistProfileTemplate therapist={therapist} />
        </>
    );
}
