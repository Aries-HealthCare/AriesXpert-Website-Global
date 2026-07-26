import { TherapistCard } from '@/types/therapist';

export async function fetchTherapistsServer(params: {
    city?: string;
    state?: string;
    area?: string;
    specialization?: string;
    slug?: string;
    limit?: number;
} = {}): Promise<TherapistCard[]> {
    const { city, state, area, specialization, slug, limit = 1000 } = params;

    const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ariesxpert-backend.onrender.com/api/v1';
    const TOKEN = process.env.ADMIN_API_TOKEN || '';

    const qs = new URLSearchParams({ limit: String(limit) });
    if (city) qs.set('city', city);
    if (state) qs.set('state', state);
    if (area) qs.set('area', area);
    if (specialization) qs.set('specialization', specialization);
    if (slug) qs.set('slug', slug);

    try {
        const res = await fetch(`${BACKEND}/website/therapists?${qs}`, {
            headers: { 'Content-Type': 'application/json', ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}) },
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const raw = await res.json();
        const list: any[] = Array.isArray(raw) ? raw : raw.data?.therapists ?? raw.therapists ?? raw.data ?? [];

        let normalisedList = list.map(normalise);

        // Fallback: If backend hasn't been updated/deployed to filter by slug/area, we enforce it here
        if (slug) {
            normalisedList = normalisedList.filter(t => t.slug === slug);
        }

        if (area) {
            const lowerTarget = area.toLowerCase().replace(/-/g, ' ').trim();
            normalisedList = normalisedList.filter(t => {
                const tAreas = (t.areas || []).map(a => a.toLowerCase().replace(/-/g, ' ').trim());
                return tAreas.some(a => a === lowerTarget);
            });
        }

        return normalisedList;
    } catch {
        return [];
    }
}

function normalise(t: any): TherapistCard {
    const firstName = t.userId?.firstName ?? t.firstName ?? '';
    const lastName = t.userId?.lastName ?? t.lastName ?? '';
    const fullName = (t.name ?? `${firstName} ${lastName}`.trim()) || 'Aries Specialist';
    return {
        id: t._id ?? t.id ?? '',
        slug: t.slug ?? slugify(fullName),
        name: fullName,
        qualification: t.qualification ?? t.userId?.qualification ?? 'Professional Degree',
        specialization: t.specialization ?? t.userId?.specialization ?? 'Healthcare Provider',
        experience: formatExp(t.yearsOfExperience ?? t.experience),
        city: t.location?.city ?? t.city ?? '',
        state: t.location?.state ?? t.state ?? '',
        areas: t.serviceAreas ?? t.coverageAreas ?? t.areas ?? [],
        rating: parseFloat(t.rating ?? t.averageRating ?? '4.8') || 4.8,
        reviewCount: parseInt(t.reviewCount ?? t.totalReviews ?? '40') || 40,
        imageUrl: t.profileImage ?? t.userId?.profileImage ?? t.imageUrl ?? t.profilePhoto
            ?? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
        isAvailable: t.isAvailable ?? true,
        languages: t.languages ?? ['English', 'Hindi'],
        services: t.services ?? t.subSpecialties ?? t.specializations ?? [],
        bio: t.bio ?? t.about ?? t.userId?.bio ?? `Dr. ${fullName} is a dedicated professional providing expert care.`,
        isVerified: t.isVerified ?? true,
        education: t.education ?? [t.qualification ?? 'Verified Degree'],
        feedback: t.feedback ?? [
            { rating: 5, comment: "Excellent clinical expertise and very professional.", user: "P. Sharma" },
            { rating: 5, comment: "Helped me recover from my back pain much faster than expected.", user: "A. Khan" }
        ],
    };
}

function slugify(name: string): string {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function formatExp(val: any): string {
    if (!val) return '';
    if (typeof val === 'string') return val.includes('Year') ? val : `${val} Years`;
    if (typeof val === 'number') return `${val} Year${val !== 1 ? 's' : ''}`;
    return String(val);
}
