/**
 * Website API Configuration
 * File: src/services/api/config.ts
 * Connects website to Admin Dashboard backend
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ariesxpert-backend.onrender.com/api/v1';

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('websiteAuthToken');
  }
  return null;
};

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
};

export const API_ENDPOINTS = {
  // Leads
  LEADS: `${API_BASE_URL}/leads`,
  LEADS_APPOINTMENT: `${API_BASE_URL}/leads/appointment`,
  LEADS_CALLBACK: `${API_BASE_URL}/leads/callback`,
  LEADS_CONTACT: `${API_BASE_URL}/leads/contact`,
  LEADS_CORPORATE: `${API_BASE_URL}/leads/corporate`,
  LEADS_INVESTOR: `${API_BASE_URL}/leads/investor`,

  // Therapists (Public Website Routes)
  THERAPISTS: `${API_BASE_URL}/website/therapists`,
  THERAPISTS_LOCATION: `${API_BASE_URL}/website/therapists`, // Filters applied via query params
  THERAPISTS_AVAILABLE: `${API_BASE_URL}/website/therapists`, // Filters applied via query params

  // CMS
  CMS_PAGES: `${API_BASE_URL}/cms/pages`,
  CMS_BLOGS: `${API_BASE_URL}/cms/blogs`,
  CMS_SERVICES: `${API_BASE_URL}/cms/services`,
  CMS_CONDITIONS: `${API_BASE_URL}/cms/conditions`,
  CMS_TESTIMONIALS: `${API_BASE_URL}/cms/testimonials`,
  CMS_SETTINGS: `${API_BASE_URL}/cms/settings`,

  // Appointments
  APPOINTMENTS: `${API_BASE_URL}/appointments`,

  // Consultations
  CONSULTATIONS: `${API_BASE_URL}/therapists/consultation-slots`,
};
