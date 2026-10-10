/**
 * Title Tag Strategy for Aries PhysioCare
 * 
 * Standards:
 * - Brand suffix: '| Aries PhysioCare'
 * - Max length: ~60 characters where possible
 * - User-intent focused (Service, Locality, Clinical Evidence)
 * - Zero keyword-stuffing
 */

export const BRAND_NAME = 'Aries PhysioCare';

export function formatTitle(title: string): string {
  if (title.includes(BRAND_NAME)) {
    return title;
  }
  return `${title} | ${BRAND_NAME}`;
}

export function buildServiceTitle(
  serviceName: string,
  locality?: string,
  city?: string
): string {
  if (locality && city) {
    return formatTitle(`Best Home ${serviceName} in ${locality}, ${city}`);
  }
  if (city) {
    return formatTitle(`Expert Home ${serviceName} in ${city}`);
  }
  return formatTitle(`Expert ${serviceName} at Home | Hospital-Grade Care`);
}

export function buildConditionTitle(conditionTitle: string): string {
  return formatTitle(`${conditionTitle}: Symptoms, Causes & Recovery Protocol`);
}

export function buildClinicTitle(
  clinicName: string,
  locality: string,
  city: string
): string {
  return formatTitle(`${clinicName} in ${locality}, ${city}`);
}

export function buildPractitionerTitle(
  doctorName: string,
  specialization: string,
  city?: string
): string {
  if (city) {
    return formatTitle(`${doctorName} - ${specialization} in ${city}`);
  }
  return formatTitle(`${doctorName} - ${specialization}`);
}

export function buildBlogTitle(postTitle: string): string {
  return formatTitle(postTitle);
}
