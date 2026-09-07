import React from 'react';
import type { Metadata } from 'next';
import TherapistsPageClient from '@/components/therapist/therapists-page-client';

export const metadata: Metadata = {
  title: 'Verified Physiotherapists & Clinical Specialists | Aries PhysioCare',
  description: 'Meet our council-verified physiotherapists across India. Senior specialists in neurology, orthopedics, sports rehabilitation, and geriatric care for home visits.',
  alternates: {
    canonical: 'https://www.ariesphysiocare.com/physiotherapists',
  },
  openGraph: {
    title: 'Council-Verified Physiotherapists & Clinical Specialists | Aries PhysioCare',
    description: 'Find verified senior physiotherapists near you. Hospital-grade home physical therapy across major Indian cities.',
    url: 'https://www.ariesphysiocare.com/physiotherapists',
    type: 'website',
  },
};

export default function PhysiotherapistsDirectoryPage() {
  return <TherapistsPageClient />;
}
