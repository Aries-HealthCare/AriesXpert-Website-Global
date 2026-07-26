/**
 * @fileOverview Tele-Health API Service Layer
 * This service is designed to be backend-agnostic. 
 * Placeholders are ready to be replaced with real fetch/axios calls.
 */

import { TeleTherapist, ConsultationSession, IntakeFormValues } from '@/lib/telehealth-types';

const MOCK_THERAPISTS: TeleTherapist[] = [
  {
    id: 't1',
    name: 'Mr. Akshay Patel',
    qualification: 'Global Healthcare Entrepreneur',
    experience: '12 Years',
    specialization: 'Founder & CEO',
    imageUrl: '/images/team/akshay-patel.png',
    isOnline: true,
  },
  {
    id: 't2',
    name: 'Dr. Vikram Singh',
    qualification: 'MPT (Sports)',
    experience: '15 Years',
    specialization: 'Sports Injury',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    isOnline: false,
  },
];

export async function getOnlineTherapists(): Promise<TeleTherapist[]> {
  // GET /api/therapists/online
  await new Promise(r => setTimeout(r, 800)); // Simulate latency
  return MOCK_THERAPISTS.filter(t => t.isOnline);
}

export async function startInstantConsultation(data: IntakeFormValues, therapistId: string): Promise<ConsultationSession> {
  // POST /api/consultation/start
  console.log('Starting instant consultation with data:', data, 'Therapist:', therapistId);
  await new Promise(r => setTimeout(r, 1500));

  return {
    sessionId: `sess_${Math.random().toString(36).substr(2, 9)}`,
    googleMeetLink: 'https://meet.google.com/abc-defg-hij', // Placeholder link
    therapistName: MOCK_THERAPISTS.find(t => t.id === therapistId)?.name || 'Specialist',
    startTime: new Date().toISOString(),
  };
}

export async function scheduleConsultation(data: IntakeFormValues, therapistId: string, date: Date, time: string): Promise<{ success: boolean }> {
  // POST /api/consultation/schedule
  console.log('Scheduling consultation:', { data, therapistId, date, time });
  await new Promise(r => setTimeout(r, 1200));
  return { success: true };
}
