/**
 * Website Leads API Service
 * File: src/services/api/leads.ts
 * Handles form submissions that create leads in the admin dashboard
 */

import { API_ENDPOINTS, getAuthHeaders, handleApiError } from './config';

export interface AppointmentLead {
  fullName: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  area: string;
  address: string;
  service: string;
  date: Date | string;
  time: string;
  paymentMethod?: 'card' | 'upi' | 'cash';
  condition?: string;
  therapistId?: string;
}

export interface CallbackLead {
  fullName: string;
  phone: string;
}

export interface ContactLead {
  name: string;
  email: string;
  phone: string;
  country?: string;
  city?: string;
  enquiryType: string;
  message: string;
}

export interface CorporateLead {
  companyName: string;
  industryType?: string;
  employeeCount?: string;
  contactPerson: string;
  email: string;
  phone: string;
  location?: string;
  requirement?: string;
}

export interface InvestorLead {
  companyName?: string;
  investorName: string;
  email: string;
  phone: string;
  country?: string;
  investmentInterest?: string;
  message?: string;
}

class LeadsService {
  /**
   * Submit appointment/booking form to create lead in dashboard
   */
  async submitAppointmentLead(data: AppointmentLead) {
    try {
      const payload = {
        ...data,
        leadType: 'patient-appointment',
        source: 'website',
        condition: data.condition || data.service,
        preferredTherapistId: data.therapistId,
        location: {
          country: 'India',
          state: data.state,
          city: data.city,
          area: data.area,
        },
      };

      const response = await fetch(API_ENDPOINTS.LEADS_APPOINTMENT, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit appointment: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Submit callback request form
   */
  async submitCallbackLead(data: CallbackLead) {
    try {
      const payload = {
        ...data,
        leadType: 'patient-callback',
        source: 'website',
      };

      const response = await fetch(API_ENDPOINTS.LEADS_CALLBACK, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit callback: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Submit contact form
   */
  async submitContactLead(data: ContactLead) {
    try {
      const payload = {
        ...data,
        leadType: 'contact-inquiry',
        source: 'website',
      };

      const response = await fetch(API_ENDPOINTS.LEADS_CONTACT, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit contact: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Submit corporate inquiry form
   */
  async submitCorporateLead(data: CorporateLead) {
    try {
      const payload = {
        ...data,
        leadType: 'corporate-partner',
        source: 'website',
      };

      const response = await fetch(API_ENDPOINTS.LEADS_CORPORATE, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit corporate inquiry: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Submit investor inquiry form
   */
  async submitInvestorLead(data: InvestorLead) {
    try {
      const payload = {
        ...data,
        leadType: 'investor-inquiry',
        source: 'website',
      };

      const response = await fetch(API_ENDPOINTS.LEADS_INVESTOR, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit investor inquiry: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export const leadsService = new LeadsService();
