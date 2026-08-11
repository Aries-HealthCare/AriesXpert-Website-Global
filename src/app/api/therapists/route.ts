import { NextRequest, NextResponse } from 'next/server';
import { getWebsiteTherapistsUrl } from '@/lib/backend-api-config';

export const revalidate = 60;

export interface TherapistCard {
  id: string;
  slug: string;
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  city: string;
  state: string;
  areas: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isAvailable: boolean;
  languages: string[];
  services: string[];
  bio: string;
  isVerified: boolean;
  education: string[];
  feedback: Array<{ rating: number; comment: string; user: string }>;
}

export async function GET(req: NextRequest) {
  const params = new URLSearchParams();
  for (const key of ['city', 'state', 'area', 'specialization', 'limit']) {
    const value = req.nextUrl.searchParams.get(key);
    if (value) params.set(key, value);
  }
  if (!params.has('limit')) params.set('limit', '100');

  let upstreamUrl: string;
  try {
    upstreamUrl = getWebsiteTherapistsUrl(params);
  } catch {
    return NextResponse.json(
      {
        error: 'Backend API is not configured',
        configurationError: true,
      },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(upstreamUrl, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return NextResponse.json(
        { therapists: [], total: 0, error: 'Therapist directory is unavailable' },
        { status: 503 },
      );
    }

    const data = await response.json();
    const list: any[] = Array.isArray(data?.therapists) ? data.therapists : [];
    const therapists = list.map(normalise).filter((therapist) => therapist.id && therapist.name && therapist.imageUrl);
    return NextResponse.json({ therapists, total: therapists.length, source: 'live' });
  } catch {
    return NextResponse.json(
      { therapists: [], total: 0, error: 'Therapist directory is unavailable' },
      { status: 503 },
    );
  }
}

function normalise(therapist: any): TherapistCard {
  const name = typeof therapist.name === 'string' ? therapist.name.trim() : '';
  const specializations = Array.isArray(therapist.specializations)
    ? therapist.specializations.filter((value: unknown): value is string => typeof value === 'string' && Boolean(value.trim()))
    : [];
  const experienceValue = therapist.experience;
  const experience =
    typeof experienceValue === 'number'
      ? `${experienceValue} Year${experienceValue === 1 ? '' : 's'}`
      : typeof experienceValue === 'string'
        ? experienceValue
        : '';

  return {
    id: typeof therapist.id === 'string' ? therapist.id : '',
    slug: slugify(name),
    name,
    qualification: typeof therapist.qualification === 'string' ? therapist.qualification : '',
    specialization:
      (typeof therapist.primarySpecialization === 'string' && therapist.primarySpecialization) ||
      specializations[0] ||
      '',
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
    education: typeof therapist.qualification === 'string' && therapist.qualification
      ? [therapist.qualification]
      : [],
    feedback: [],
  };
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
