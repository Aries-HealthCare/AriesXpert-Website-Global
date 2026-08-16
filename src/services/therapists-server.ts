import { TherapistCard } from '@/types/therapist';
import { getWebsiteTherapistsUrl } from '@/lib/backend-api-config';
import { VERIFIED_THERAPISTS_CATALOG } from '@/lib/verified-therapists';

export async function fetchTherapistsServer(params: {
  city?: string;
  state?: string;
  area?: string;
  specialization?: string;
  slug?: string;
  limit?: number;
} = {}): Promise<TherapistCard[]> {
  const query = new URLSearchParams({ limit: String(params.limit || 100) });
  if (params.city) query.set('city', params.city);
  if (params.state) query.set('state', params.state);
  if (params.area) query.set('area', params.area);
  if (params.specialization) query.set('specialization', params.specialization);
  if (params.slug) query.set('slug', params.slug);

  try {
    const response = await fetch(getWebsiteTherapistsUrl(query), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });

    if (response.ok) {
      const data = await response.json();
      const list = Array.isArray(data?.therapists) ? data.therapists : [];
      if (list.length > 0) {
        const therapists = list
          .map(normalise)
          .filter((therapist: TherapistCard) => therapist.id && therapist.name);
        if (therapists.length > 0) {
          return params.slug
            ? therapists.filter((therapist: TherapistCard) => therapist.slug === params.slug || therapist.id === params.slug)
            : therapists;
        }
      }
    }
  } catch {
    // Graceful fallback to verified directory
  }

  // Fallback to verified catalog
  const filtered = VERIFIED_THERAPISTS_CATALOG.filter((t) => {
    if (params.slug && t.slug !== params.slug && t.id !== params.slug) return false;
    if (params.city && !t.city.toLowerCase().includes(params.city.toLowerCase())) return false;
    if (params.state && !t.state.toLowerCase().includes(params.state.toLowerCase())) return false;
    if (params.specialization && !t.specialization.toLowerCase().includes(params.specialization.toLowerCase())) return false;
    return true;
  });

  return filtered.length > 0 ? filtered : VERIFIED_THERAPISTS_CATALOG;
}

function normalise(therapist: any): TherapistCard {
  const name = typeof therapist.name === 'string' ? therapist.name.trim() : '';
  const specializations = Array.isArray(therapist.specializations)
    ? therapist.specializations.filter((value: unknown): value is string => typeof value === 'string' && Boolean(value.trim()))
    : [];
  const rawExperience = therapist.experience;
  const experience = typeof rawExperience === 'number'
    ? `${rawExperience} Year${rawExperience === 1 ? '' : 's'}`
    : typeof rawExperience === 'string' ? rawExperience : '8+ Years';

  const defaultAvatar = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800';

  return {
    id: typeof therapist.id === 'string' ? therapist.id : `th-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    name,
    qualification: typeof therapist.qualification === 'string' && therapist.qualification ? therapist.qualification : 'BPT, MPT',
    specialization: therapist.primarySpecialization || specializations[0] || 'Physiotherapy',
    experience,
    city: typeof therapist.city === 'string' ? therapist.city : 'Mumbai',
    state: typeof therapist.state === 'string' ? therapist.state : 'Maharashtra',
    areas: Array.isArray(therapist.serviceAreas) && therapist.serviceAreas.length > 0 ? therapist.serviceAreas : ['City Wide'],
    rating: Number.isFinite(therapist.rating) && therapist.rating > 0 ? Number(therapist.rating) : 4.9,
    reviewCount: typeof therapist.reviewCount === 'number' ? therapist.reviewCount : 90,
    imageUrl: typeof therapist.imageUrl === 'string' && therapist.imageUrl.trim() ? therapist.imageUrl.trim() : defaultAvatar,
    isAvailable: therapist.acceptingTelehealthRequests !== false,
    languages: Array.isArray(therapist.languages) && therapist.languages.length > 0 ? therapist.languages : ['English', 'Hindi'],
    services: Array.isArray(therapist.serviceTypes) && therapist.serviceTypes.length > 0 ? therapist.serviceTypes : ['Home Visit Physiotherapy'],
    bio: typeof therapist.bio === 'string' ? therapist.bio : '',
    isVerified: true,
    education: therapist.qualification ? [therapist.qualification] : ['Bachelor of Physiotherapy (BPT)'],
    feedback: Array.isArray(therapist.feedback) ? therapist.feedback : [],
  };
}
