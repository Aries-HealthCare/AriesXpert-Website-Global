/**
 * Server Actions for Lead Submission
 * File: src/app/actions/lead-actions.ts
 * Handles form submissions and creates leads in Admin Dashboard
 */

'use server';

import { z } from 'zod';
import { leadsService } from '@/services/api';

const appointmentSchema = z.object({
  service: z.string().min(1, 'Service is required'),
  country: z.string(),
  state: z.string().min(1, 'State is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  date: z.date(),
  time: z.string().min(1, 'Time is required'),
  therapist: z.string().optional(),
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  condition: z.string().optional(),
  paymentMethod: z.enum(['card', 'upi', 'cash']).optional(),
});

export async function submitAppointmentLead(data: z.infer<typeof appointmentSchema>) {
  try {
    // Validate data
    const validatedData = appointmentSchema.parse(data);

    // Submit to admin dashboard
    const response = await leadsService.submitAppointmentLead({
      fullName: validatedData.fullName,
      phone: validatedData.phone,
      email: validatedData.email,
      state: validatedData.state,
      city: validatedData.city,
      area: validatedData.area,
      address: validatedData.address,
      service: validatedData.service,
      date: validatedData.date,
      time: validatedData.time,
      condition: validatedData.condition,
      therapistId: validatedData.therapist,
      paymentMethod: validatedData.paymentMethod as any,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error submitting appointment lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit appointment',
    };
  }
}

const callbackSchema = z.object({
  fullName: z.string().min(1, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
});

export async function submitCallbackLead(data: z.infer<typeof callbackSchema>) {
  try {
    const validatedData = callbackSchema.parse(data);

    const response = await leadsService.submitCallbackLead({
      fullName: validatedData.fullName,
      phone: validatedData.phone,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error submitting callback lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit callback request',
    };
  }
}

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number is required'),
  country: z.string().optional(),
  city: z.string().optional(),
  enquiryType: z.string().min(1, 'Please select an enquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function submitContactLead(data: z.infer<typeof contactSchema>) {
  try {
    const validatedData = contactSchema.parse(data);

    const response = await leadsService.submitContactLead({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      country: validatedData.country,
      city: validatedData.city,
      enquiryType: validatedData.enquiryType,
      message: validatedData.message,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error submitting contact lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit contact form',
    };
  }
}

const corporateSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  industryType: z.string().optional(),
  employeeCount: z.string().optional(),
  contactPerson: z.string().min(1, 'Contact person is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number is required'),
  location: z.string().optional(),
  requirement: z.string().optional(),
});

export async function submitCorporateLead(data: z.infer<typeof corporateSchema>) {
  try {
    const validatedData = corporateSchema.parse(data);

    const response = await leadsService.submitCorporateLead({
      companyName: validatedData.companyName,
      industryType: validatedData.industryType,
      employeeCount: validatedData.employeeCount,
      contactPerson: validatedData.contactPerson,
      email: validatedData.email,
      phone: validatedData.phone,
      location: validatedData.location,
      requirement: validatedData.requirement,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error submitting corporate lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit corporate inquiry',
    };
  }
}

const investorSchema = z.object({
  companyName: z.string().optional(),
  investorName: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number is required'),
  country: z.string().optional(),
  investmentInterest: z.string().optional(),
  message: z.string().optional(),
});

export async function submitInvestorLead(data: z.infer<typeof investorSchema>) {
  try {
    const validatedData = investorSchema.parse(data);

    const response = await leadsService.submitInvestorLead({
      companyName: validatedData.companyName,
      investorName: validatedData.investorName,
      email: validatedData.email,
      phone: validatedData.phone,
      country: validatedData.country,
      investmentInterest: validatedData.investmentInterest,
      message: validatedData.message,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error submitting investor lead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to submit investor inquiry',
    };
  }
}
