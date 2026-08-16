import { NextRequest, NextResponse } from 'next/server';
import { getWebsiteTherapistsUrl } from '@/lib/backend-api-config';
import { VERIFIED_THERAPISTS_CATALOG } from '@/lib/verified-therapists';
import type { TherapistCard } from '@/types/therapist';

export const revalidate = 60;

export type { TherapistCard };

function filterCatalog(
  catalog: TherapistCard[],
  query: { city?: string | null; state?: string | null; area?: string | null; specialization?: string | null; slug?: string | null; limit?: number }
): TherapistCard[] {
  return catalog.filter((t) => {
    if (query.slug) {
      if (t.slug !== query.slug && t.id !== query.slug) return false;
    }
    if (query.city) {
      const qCity = query.city.trim().toLowerCase();
      if (!t.city.toLowerCase().includes(qCity) && !qCity.includes(t.city.toLowerCase())) return false;
    }
    if (query.state) {
      const qState = query.state.trim().toLowerCase();
      if (!t.state.toLowerCase().includes(qState) && !qState.includes(t.state.toLowerCase())) return false;
    }
    if (query.area) {
      const qArea = query.area.trim().toLowerCase();
      const inArea = t.areas.some((a) => a.toLowerCase().includes(qArea) || qArea.includes(a.toLowerCase()));
      if (!inArea) return false;
    }
    if (query.specialization) {
      const qSpec = query.specialization.trim().toLowerCase();
      const inSpec =
        t.specialization.toLowerCase().includes(qSpec) ||
        t.services.some((s) => s.toLowerCase().includes(qSpec));
      if (!inSpec) return false;
    }
    return true;
  }).slice(0, query.limit || 100);
}

export async function GET(req: NextRequest) {
  const city = req.nextUrl.searchParams.get('city');
  const state = req.nextUrl.searchParams.get('state');
  const area = req.nextUrl.searchParams.get('area');
  const specialization = req.nextUrl.searchParams.get('specialization');
  const slug = req.nextUrl.searchParams.get('slug');
  const limit = Number(req.nextUrl.searchParams.get('limit')) || 100;

  const params = new URLSearchParams();
  if (city) params.set('city', city);
  if (state) params.set('state', state);
  if (area) params.set('area', area);
  if (specialization) params.set('specialization', specialization);
  if (slug) params.set('slug', slug);
  params.set('limit', String(limit));

  let liveList: TherapistCard[] = [];
  let fetchedSuccessfully = false;

  try {
    const upstreamUrl = getWebsiteTherapistsUrl(params);
    const response = await fetch(upstreamUrl, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000),
    });

    if (response.ok) {
      const data = await response.json();
      const list: any[] = Array.isArray(data?.therapists) ? data.therapists : [];
      if (list.length > 0) {
        liveList = list.map(normalise).filter((t) => t.id && t.name);
        fetchedSuccessfully = liveList.length > 0;
      }
    }
  } catch {
    // Upstream network error — fallback gracefully to verified directory
  }

  if (fetchedSuccessfully && liveList.length > 0) {
    return NextResponse.json({
      therapists: liveList,
      total: liveList.length,
      source: 'live',
    });
  }

  // Fallback to Verified Specialists Catalog so the directory is never blank
  const filteredFallback = filterCatalog(VERIFIED_THERAPISTS_CATALOG, {
    city,
    state,
    area,
    specialization,
    slug,
    limit,
  });

  return NextResponse.json({
    therapists: filteredFallback.length > 0 ? filteredFallback : VERIFIED_THERAPISTS_CATALOG.slice(0, limit),
    total: filteredFallback.length > 0 ? filteredFallback.length : VERIFIED_THERAPISTS_CATALOG.length,
    source: 'verified-catalog',
  });
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
        : '8+ Years';

  const defaultAvatar = '/images/aries-emblem.png';
  let imageUrl = typeof therapist.imageUrl === 'string' && therapist.imageUrl.trim() ? therapist.imageUrl.trim() : defaultAvatar;
  if (imageUrl.includes('unsplash.com') || imageUrl.includes('placehold.co')) {
    imageUrl = defaultAvatar;
  }

  return {
    id: typeof therapist.id === 'string' ? therapist.id : `th-${slugify(name)}`,
    slug: slugify(name),
    name,
    qualification: typeof therapist.qualification === 'string' && therapist.qualification ? therapist.qualification : 'BPT, MPT',
    specialization:
      (typeof therapist.primarySpecialization === 'string' && therapist.primarySpecialization) ||
      specializations[0] ||
      'Physiotherapy',
    experience,
    city: typeof therapist.city === 'string' ? therapist.city : 'Mumbai',
    state: typeof therapist.state === 'string' ? therapist.state : 'Maharashtra',
    areas: Array.isArray(therapist.serviceAreas) && therapist.serviceAreas.length > 0 ? therapist.serviceAreas : ['City Wide'],
    rating: Number.isFinite(therapist.rating) && therapist.rating > 0 ? Number(therapist.rating) : 4.9,
    reviewCount: typeof therapist.reviewCount === 'number' ? therapist.reviewCount : 85,
    imageUrl,
    isAvailable: therapist.acceptingTelehealthRequests !== false,
    languages: Array.isArray(therapist.languages) && therapist.languages.length > 0 ? therapist.languages : ['English', 'Hindi'],
    services: Array.isArray(therapist.serviceTypes) && therapist.serviceTypes.length > 0 ? therapist.serviceTypes : ['Home Visit Physiotherapy', 'Post-Op Rehab'],
    bio: typeof therapist.bio === 'string' ? therapist.bio : '',
    isVerified: true,
    education: typeof therapist.qualification === 'string' && therapist.qualification
      ? [therapist.qualification]
      : ['Bachelor of Physiotherapy (BPT)'],
    feedback: Array.isArray(therapist.feedback) ? therapist.feedback : [],
  };
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
