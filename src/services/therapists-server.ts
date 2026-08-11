import { TherapistCard } from '@/types/therapist';
import { getWebsiteTherapistsUrl } from '@/lib/backend-api-config';

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

  const response = await fetch(getWebsiteTherapistsUrl(query), {
    headers: { Accept: 'application/json' },
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error('Therapist directory is unavailable');
  }
  const data = await response.json();
  const therapists = (Array.isArray(data?.therapists) ? data.therapists : [])
    .map(normalise)
    .filter((therapist: TherapistCard) => therapist.id && therapist.name && therapist.imageUrl);
  return params.slug
    ? therapists.filter((therapist: TherapistCard) => therapist.slug === params.slug)
    : therapists;
}

function normalise(therapist: any): TherapistCard {
  const name = typeof therapist.name === 'string' ? therapist.name.trim() : '';
  const specializations = Array.isArray(therapist.specializations)
    ? therapist.specializations.filter((value: unknown): value is string => typeof value === 'string' && Boolean(value.trim()))
    : [];
  const rawExperience = therapist.experience;
  const experience = typeof rawExperience === 'number'
    ? `${rawExperience} Year${rawExperience === 1 ? '' : 's'}`
    : typeof rawExperience === 'string' ? rawExperience : '';
  return {
    id: typeof therapist.id === 'string' ? therapist.id : '',
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    name,
    qualification: typeof therapist.qualification === 'string' ? therapist.qualification : '',
    specialization: therapist.primarySpecialization || specializations[0] || '',
    experience,
    city: typeof therapist.city === 'string' ? therapist.city : '',
    state: typeof therapist.state === 'string' ? therapist.state : '',
    areas: Array.isArray(therapist.serviceAreas) ? therapist.serviceAreas : [],
    rating: Number.isFinite(therapist.rating) ? Number(therapist.rating) : 0,
    reviewCount: 0,
    imageUrl: typeof therapist.imageUrl === 'string' ? therapist.imageUrl : '',
    isAvailable: therapist.acceptingTelehealthRequests === true,
    languages: [],
    services: Array.isArray(therapist.serviceTypes) ? therapist.serviceTypes : [],
    bio: '',
    isVerified: therapist.isVerified === true,
    education: therapist.qualification ? [therapist.qualification] : [],
    feedback: [],
  };
}
