/**
 * GA4 event tracking helper (P2-10).
 *
 * Wraps `window.gtag` / `window.dataLayer` so conversion events can be fired
 * from client components without each call site needing to know whether GA4
 * is actually configured. Safe to call unconditionally — it's a no-op until
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set in the environment and gtag.js has
 * loaded (see src/app/layout.tsx).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type LeadConversionEvent =
  | 'generate_lead_appointment'
  | 'generate_lead_callback'
  | 'generate_lead_contact'
  | 'generate_lead_telehealth'
  | 'generate_lead_corporate'
  | 'generate_lead_investor'
  | 'generate_lead_therapist_application';

/**
 * Fires a GA4 event. No-ops silently (does not throw) if gtag hasn't loaded,
 * e.g. because NEXT_PUBLIC_GA_MEASUREMENT_ID is unset or the script hasn't
 * finished loading yet.
 */
export function trackEvent(eventName: LeadConversionEvent | string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', eventName, params);
  } catch {
    // Analytics must never break the user-facing flow.
  }
}

export function trackPhoneCall(phoneNumber: string, context?: Record<string, unknown>): void {
  trackEvent('conversion_phone_call', {
    phone_number: phoneNumber,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    ...context,
  });
}

export function trackWhatsAppClick(destination: string, context?: Record<string, unknown>): void {
  trackEvent('conversion_whatsapp_click', {
    chat_destination: destination,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    ...context,
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Downstream Patient Lifecycle Analytics (P0 Directive: Leads First)
// ─────────────────────────────────────────────────────────────────────────────

export function trackLeadCreated(leadId: string, context?: Record<string, unknown>): void {
  trackEvent('lead_created', {
    lead_id: leadId,
    event_category: 'Patient Acquisition Funnel',
    stage: '1_lead_created',
    ...context,
  });
}

export function trackLeadQualified(leadId: string, context?: Record<string, unknown>): void {
  trackEvent('lead_qualified', {
    lead_id: leadId,
    event_category: 'Patient Acquisition Funnel',
    stage: '2_lead_qualified',
    ...context,
  });
}

export function trackConsultationScheduled(leadId: string, context?: Record<string, unknown>): void {
  trackEvent('consultation_scheduled', {
    lead_id: leadId,
    event_category: 'Patient Acquisition Funnel',
    stage: '3_consultation_scheduled',
    ...context,
  });
}

export function trackAppointmentCompleted(leadId: string, context?: Record<string, unknown>): void {
  trackEvent('appointment_completed', {
    lead_id: leadId,
    event_category: 'Patient Acquisition Funnel',
    stage: '4_appointment_completed',
    ...context,
  });
}

export function trackPatientConverted(leadId: string, value: number, context?: Record<string, unknown>): void {
  trackEvent('patient_converted', {
    lead_id: leadId,
    value,
    currency: 'INR',
    event_category: 'Patient Acquisition Funnel',
    stage: '5_patient_converted',
    ...context,
  });
}

/**
 * Builds a high-converting contextual WhatsApp chat link preserving service, locality, and doctor context.
 */
export function buildContextualWhatsAppUrl(context: {
  service?: string;
  city?: string;
  area?: string;
  doctorName?: string;
}): string {
  const base = 'https://wa.me/919136447006';
  const service = context.service || 'Physiotherapy';
  const location = context.area && context.city 
    ? `${context.area}, ${context.city}` 
    : context.city || 'Mumbai';

  const message = context.doctorName
    ? `Hello Aries PhysioCare, I would like to book a home consultation with ${context.doctorName} in ${location}. Please share available appointment slots.`
    : `Hello Aries PhysioCare, I am looking for expert ${service} in ${location}. Please share consultation availability.`;

  return `${base}?text=${encodeURIComponent(message)}`;
}

