import { submitTelehealthRequest } from '@/app/actions/lead-actions';
import { withStoredAttribution } from '@/lib/growth-attribution';
import { IntakeFormValues, TeleTherapist } from '@/lib/telehealth-types';

export async function getTelehealthTherapists(): Promise<TeleTherapist[]> {
  const response = await fetch('/api/therapists?limit=100', {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error('The therapist directory is unavailable');
  }
  const data = await response.json();
  if (data?.source !== 'live' || !Array.isArray(data?.therapists)) {
    throw new Error('The therapist directory is unavailable');
  }
  return data.therapists
    .filter((therapist: any) => therapist.isAvailable === true)
    .map((therapist: any) => ({
      id: therapist.id,
      name: therapist.name,
      qualification: therapist.qualification || '',
      experience: therapist.experience || '',
      specialization: therapist.specialization || '',
      imageUrl: therapist.imageUrl,
      isAvailable: true,
    }));
}

export async function scheduleConsultation(
  data: IntakeFormValues,
  therapistId: string,
  date: Date,
  time: string,
): Promise<void> {
  const result = await submitTelehealthRequest(
    withStoredAttribution({
      fullName: data.fullName,
      mobile: data.mobile,
      email: data.email,
      address: data.address,
      condition: data.condition,
      age: data.age,
      gender: data.gender,
      therapistId,
      preferredDate: date.toISOString(),
      preferredTime: time,
    }),
  );
  if (!result.success) {
    throw new Error(result.error || 'Unable to submit telehealth request');
  }
}
