/**
 * Meta Description Strategy for Aries PhysioCare
 * 
 * Standards:
 * - Length: 140–160 characters
 * - Clear patient benefit & what is offered
 * - Actionable CTA (Call / Book online / Same-day)
 * - Zero keyword-stuffing
 */

export function buildServiceDescription(
  serviceName: string,
  locality?: string,
  city?: string
): string {
  const serviceLower = serviceName.toLowerCase();
  if (locality && city) {
    return `Hospital-grade ${serviceLower} delivered at your doorstep in ${locality}, ${city}. Verified BPT/MPT specialists, advanced portable modalities & same-day slots.`;
  }
  if (city) {
    return `Expert home ${serviceLower} across ${city}. Certified physiotherapists bring hospital-grade electrotherapy & personalized care to your home. Book same-day.`;
  }
  return `Hospital-grade ${serviceLower} at home by certified BPT/MPT physiotherapists. Personalized treatment protocols for rapid pain relief and mobility recovery across India.`;
}

export function buildConditionDescription(
  conditionTitle: string,
  clinicalSummary?: string,
  reviewerName?: string
): string {
  if (clinicalSummary) {
    const trimmed = clinicalSummary.slice(0, 120).trim();
    return `${trimmed}... Evidence-based physical therapy protocols reviewed by ${reviewerName || 'clinical specialists'}.`;
  }
  return `Comprehensive clinical guide for ${conditionTitle.toLowerCase()}. Learn evidence-based physiotherapy treatment protocols, recovery timelines, and home exercise plans.`;
}

export function buildClinicDescription(
  clinicName: string,
  locality: string,
  city: string,
  address?: string
): string {
  return `Visit ${clinicName} in ${locality}, ${city}. Hospital-grade electrotherapy, private therapy suites & expert physiotherapists. Open 365 days. Book your session today.`;
}

export function buildPractitionerDescription(
  doctorName: string,
  specialization: string,
  experience: string,
  city?: string
): string {
  const loc = city ? ` in ${city}` : '';
  return `Consult with ${doctorName}, verified ${specialization} with ${experience} of clinical experience${loc}. Available for personalized home visits and clinic appointments.`;
}

export function buildBlogDescription(summary: string): string {
  if (summary.length <= 160) return summary;
  return `${summary.slice(0, 157).trim()}...`;
}
