import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPhysicianSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import { fetchTherapistsServer } from '@/services/therapists-server';
import TherapistProfileTemplate from '@/components/therapist/therapist-profile-template';

interface PageProps {
    params: Promise<{ therapistSlug: string }>;
}

// Therapist profiles are operational data. Render them from the live directory
// at request time instead of making a production build depend on a reachable
// backend or baking a stale practitioner roster into the deployment.
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { therapistSlug } = await params;
    const therapists = await fetchTherapistsServer({ slug: therapistSlug });
    const therapist = therapists[0];

    if (!therapist) {
        return { title: 'Specialist Not Found | Aries PhysioCare' };
    }

    return {
        title: `${therapist.name} - ${therapist.specialization} | Aries PhysioCare`,
        description: `Book appointment with ${therapist.name}, expert ${therapist.specialization} specialist with ${therapist.experience} of experience. Available in ${therapist.city}.`,
        keywords: [`${therapist.name}`, `physiotherapist ${therapist.city}`, `home physiotherapy ${therapist.city}`, therapist.specialization, 'book physiotherapist online'],
        alternates: {
            canonical: `https://www.ariesphysiocare.com/therapist/${therapistSlug}`,
        },
        openGraph: {
            title: `${therapist.name} | Expert ${therapist.specialization}`,
            description: `Book a session with ${therapist.name} — ${therapist.experience} clinical experience.`,
            url: `https://www.ariesphysiocare.com/therapist/${therapistSlug}`,
            images: [{ url: therapist.imageUrl, width: 800, height: 600, alt: therapist.name }],
        },
    };
}

export default async function TherapistProfilePage({ params }: PageProps) {
    const { therapistSlug } = await params;
    const therapists = await fetchTherapistsServer({ slug: therapistSlug });
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
        }),
        getBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Our Specialists', url: '/therapist' },
            { name: therapist.name, url: `/therapist/${therapist.slug}` },
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
