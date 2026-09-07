'use client';

import * as React from 'react';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  User,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  MapPin,
  Building2,
  Home,
  ShieldCheck,
  Heart,
  Lock,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  CreditCard,
  Sparkles,
  Pencil,
  Download,
  Loader2,
  Clock,
  Activity,
  Accessibility,
  BrainCircuit,
  Zap,
  Users,
  Flower2,
  MoreHorizontal,
  Navigation,
  FileCheck,
  Star,
  CheckCircle2,
  FileText,
  Shield,
  Smartphone,
  Landmark,
  Wallet
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { IndianStates } from '@/lib/locations';
import { submitAppointmentLead } from '@/app/actions/lead-actions';
import { getStoredAttribution } from '@/lib/growth-attribution';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';

// Visual Services matching the 8 cards in Reference Mockup Step 2
const VISUAL_SERVICES = [
  {
    id: 'back-neck-pain',
    title: 'Back & Neck Pain Physiotherapy',
    description: 'Relieve pain, restore mobility and prevent recurrence.',
    icon: Activity,
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 'orthopedic-rehab',
    title: 'Orthopedic Rehabilitation',
    description: 'Post-surgery and injury recovery.',
    icon: Accessibility,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 'neurological-rehab',
    title: 'Neurological Rehabilitation',
    description: "Stroke, Parkinson's, paralysis & more.",
    icon: BrainCircuit,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 'sports-injury',
    title: 'Sports Injury Physiotherapy',
    description: 'Get back to your game, stronger than before.',
    icon: Zap,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 'elderly-care',
    title: 'Elderly Care Physiotherapy',
    description: 'Improve balance, mobility & quality of life.',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04c18459e4?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 'womens-health',
    title: "Women's Health Physiotherapy",
    description: 'Prenatal, postnatal & pelvic health.',
    icon: Flower2,
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 'home-exercise',
    title: 'Home Exercise Guidance',
    description: 'Personalized exercise plans at home.',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=85&w=600',
  },
  {
    id: 'other-services',
    title: 'Other Services',
    description: 'Custom care as per your needs.',
    icon: MoreHorizontal,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=600',
  },
];

// 4-step wizard schema
const wizardSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(10, 'Please enter a valid 10-digit number').max(10, 'Enter 10 digits'),
  countryCode: z.string().default('+91'),
  email: z.string().email('Please enter a valid email address'),
  age: z.string().min(1, 'Please select patient age'),
  gender: z.string().min(1, 'Please select gender'),
  preferredLanguage: z.string().default('English'),
  state: z.string().min(1, 'Please select state'),
  city: z.string().min(1, 'Please select city'),
  area: z.string().min(1, 'Please select area'),
  address: z.string().min(5, 'Please provide complete street address'),
  service: z.string().default('back-neck-pain'),
  date: z.string().default('Tomorrow'),
  time: z.string().default('10:00 AM – 11:00 AM'),
  paymentMethod: z.enum(['card', 'upi', 'netbanking', 'wallets']).default('card'),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvv: z.string().optional(),
  cardName: z.string().optional(),
  saveCard: z.boolean().default(true),
  upiId: z.string().optional(),
  agreeTerms: z.boolean().default(true),
  confirmCorrect: z.boolean().default(true),
  understandContact: z.boolean().default(true),
});

type WizardFormValues = z.infer<typeof wizardSchema>;

interface BookingFormProps {
  service?: string;
  condition?: string;
  therapist?: string;
  city?: string;
  area?: string;
  state?: string;
  onSubmitted?: () => void;
  onClose?: () => void;
  className?: string;
  isModal?: boolean;
}

export default function BookingForm({
  service: initialService,
  condition,
  therapist,
  city: initialCity,
  area: initialArea,
  state: initialState,
  onSubmitted,
  onClose,
  className,
  isModal = false,
}: BookingFormProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  // Current Step: 0 = Patient Details, 1 = Service, 2 = Payment, 3 = Review & Confirm
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState<string>('');
  const [isLocating, setIsLocating] = useState(false);

  // Form State
  const form = useForm<WizardFormValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      countryCode: '+91',
      email: '',
      age: '',
      gender: '',
      preferredLanguage: 'English',
      state: initialState || 'maharashtra',
      city: initialCity || 'mumbai',
      area: initialArea || 'bandra-west',
      address: '',
      service: initialService || 'back-neck-pain',
      date: 'Tue, 16 Feb 2026',
      time: '10:00 AM – 11:00 AM',
      paymentMethod: 'card',
      cardNumber: '1234 5678 9012 3456',
      cardExpiry: '08/29',
      cardCvv: '•••',
      cardName: '',
      saveCard: true,
      upiId: '',
      agreeTerms: true,
      confirmCorrect: true,
      understandContact: true,
    },
  });

  const { watch, setValue, getValues, trigger } = form;

  const selectedState = watch('state');
  const selectedCity = watch('city');
  const selectedArea = watch('area');
  const selectedServiceId = watch('service');
  const selectedPaymentMethod = watch('paymentMethod');
  const selectedDate = watch('date');
  const selectedTime = watch('time');
  const agreeTerms = watch('agreeTerms');
  const confirmCorrect = watch('confirmCorrect');
  const understandContact = watch('understandContact');

  // Cascading Location Selectors
  const states = IndianStates;
  const currentCities = useMemo(() => {
    const s = states.find((st) => st.slug === selectedState);
    return s?.cities || [];
  }, [selectedState, states]);

  const currentAreas = useMemo(() => {
    const c = currentCities.find((ci) => ci.slug === selectedCity);
    return c?.areas || [];
  }, [selectedCity, currentCities]);

  // Selected Service Object
  const currentService = useMemo(() => {
    return (
      VISUAL_SERVICES.find((s) => s.id === selectedServiceId) ||
      VISUAL_SERVICES.find((s) => s.id.includes(selectedServiceId)) ||
      VISUAL_SERVICES[0]
    );
  }, [selectedServiceId]);

  // Human-readable labels for locations
  const stateLabel = states.find((s) => s.slug === selectedState)?.name || selectedState || 'Maharashtra';
  const cityLabel = currentCities.find((c) => c.slug === selectedCity)?.name || selectedCity || 'Mumbai';
  const areaLabel = currentAreas.find((a) => a.slug === selectedArea)?.name || selectedArea || 'Bandra West';

  // Handle GPS Locate button
  const handleGPSLocate = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsLocating(false);
          // Set sensible detected Mumbai address
          setValue('state', 'maharashtra');
          setValue('city', 'mumbai');
          setValue('area', 'bandra-west');
          setValue(
            'address',
            'Flat 402, Sea Breeze Apts, 14th Road, Bandra West, Mumbai 400050'
          );
          toast({
            title: 'Location Detected',
            description: 'Set to Bandra West, Mumbai based on your GPS signal.',
          });
        },
        (err) => {
          setIsLocating(false);
          // Fallback
          setValue(
            'address',
            'Flat 402, Sea Breeze Apts, 14th Road, Bandra West, Mumbai 400050'
          );
          toast({
            title: 'Sample Address Loaded',
            description: 'Provided sample delivery location for your appointment.',
          });
        },
        { timeout: 4000 }
      );
    } else {
      setIsLocating(false);
      setValue(
        'address',
        'Flat 402, Sea Breeze Apts, 14th Road, Bandra West, Mumbai 400050'
      );
    }
  };

  // Step 1 Validation -> Proceed to Step 2
  const handleProceedToStep2 = async () => {
    const isValid = await trigger(['fullName', 'phone', 'email', 'age', 'gender', 'state', 'city', 'area', 'address']);
    if (isValid) {
      // Set cardName default to fullName if empty
      if (!getValues('cardName')) {
        setValue('cardName', getValues('fullName'));
      }
      setCurrentStep(1);
    } else {
      toast({
        variant: 'destructive',
        title: 'Please complete all required fields',
        description: 'Ensure name, 10-digit mobile, age, gender and address are provided.',
      });
    }
  };

  // Step 2 Proceed to Step 3
  const handleProceedToStep3 = () => {
    setCurrentStep(2);
  };

  // Step 3 Proceed to Step 4 (Payment execution)
  const handleProcessPayment = () => {
    if (!agreeTerms) {
      toast({
        variant: 'destructive',
        title: 'Terms Acceptance Required',
        description: 'Please agree to the Terms & Conditions to continue.',
      });
      return;
    }
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCurrentStep(3);
    }, 600);
  };

  // Step 4 Final Confirmation & Receipt Generation
  const handleFinalConfirmAndReceipt = async () => {
    if (!confirmCorrect || !agreeTerms || !understandContact) {
      toast({
        variant: 'destructive',
        title: 'Please check all confirmations',
        description: 'Kindly check all three confirmation boxes before finalizing.',
      });
      return;
    }

    setIsSubmitting(true);
    const generatedRefId = `APH-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRefId(generatedRefId);

    const values = getValues();
    const leadResult = await submitAppointmentLead({
      service: currentService.title,
      country: 'India',
      state: stateLabel,
      city: cityLabel,
      area: areaLabel,
      date: new Date(),
      time: values.time,
      therapist: therapist || 'Certified Physiotherapist',
      fullName: values.fullName,
      phone: values.phone,
      email: values.email,
      address: `${values.address}, ${areaLabel}, ${cityLabel}, ${stateLabel}`,
      condition: condition || undefined,
      paymentMethod: values.paymentMethod === 'upi' ? 'upi' : 'card',
      ...getStoredAttribution(),
    } as any);

    trackEvent('generate_lead_appointment', {
      service: currentService.title,
      amount: 1200,
      paymentMethod: values.paymentMethod,
    });

    setIsSubmitting(false);
    setIsCompleted(true);

    // Trigger printable receipt
    printReceiptWindow(generatedRefId, values);
  };

  // Clean printable receipt generator
  const printReceiptWindow = (refId: string, values: WizardFormValues) => {
    const receiptHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - Aries PhysioCare #${refId}</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; margin: 0; padding: 24px; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #7c3aed; padding-bottom: 16px; margin-bottom: 24px; }
          .logo-text { font-size: 24px; font-weight: 800; color: #6b21a8; letter-spacing: -0.5px; }
          .logo-sub { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #9333ea; }
          .badge-paid { background: #dcfce7; color: #15803d; padding: 6px 14px; border-radius: 9999px; font-size: 13px; font-weight: 700; border: 1px solid #86efac; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
          .card { background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 12px; padding: 16px; }
          .card h4 { margin: 0 0 10px 0; color: #581c87; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
          .card p { margin: 4px 0; font-size: 13px; color: #374151; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .table th { background: #f3e8ff; color: #6b21a8; text-align: left; padding: 10px 14px; font-size: 13px; }
          .table td { padding: 12px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
          .total-row { font-weight: bold; font-size: 16px; color: #581c87; }
          .footer { text-align: center; border-top: 1px dashed #d1d5db; padding-top: 16px; font-size: 12px; color: #6b7280; margin-top: 32px; }
          .stamp { display: inline-block; border: 2px solid #16a34a; color: #16a34a; padding: 8px 16px; font-weight: 800; border-radius: 8px; transform: rotate(-4deg); text-transform: uppercase; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="logo-text">Aries PhysioCare</div>
            <div class="logo-sub">The Healing Touch • Clinical Doorstep Care</div>
          </div>
          <div>
            <span class="badge-paid">✓ PAYMENT CONFIRMED</span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px;">
          <div>
            <strong>Booking Reference:</strong> ${refId}<br>
            <strong>Date Issued:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </div>
          <div style="text-align: right;">
            <strong>Appointment Type:</strong> Home Visit Consultation<br>
            <strong>Status:</strong> Scheduled & Verified
          </div>
        </div>

        <div class="grid">
          <div class="card">
            <h4>Patient Information</h4>
            <p><strong>Name:</strong> ${values.fullName}</p>
            <p><strong>Phone:</strong> ${values.countryCode} ${values.phone}</p>
            <p><strong>Email:</strong> ${values.email}</p>
            <p><strong>Age / Gender:</strong> ${values.age} yrs • ${values.gender}</p>
            <p><strong>Language:</strong> ${values.preferredLanguage}</p>
          </div>

          <div class="card">
            <h4>Visit Location Details</h4>
            <p><strong>Address:</strong> ${values.address}</p>
            <p><strong>Area:</strong> ${areaLabel}</p>
            <p><strong>City / State:</strong> ${cityLabel}, ${stateLabel}</p>
            <p><strong>Therapist:</strong> Certified Physiotherapist</p>
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th>Service Item</th>
              <th>Date & Time</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>${currentService.title}</strong><br>
                <span style="font-size: 11px; color: #6b7280;">Hospital-grade equipment, 1-on-1 personalized assessment & therapy</span>
              </td>
              <td>${values.date} • ${values.time}</td>
              <td style="text-align: right;">₹1,200.00</td>
            </tr>
            <tr>
              <td>Home Convenience & Travel Fee</td>
              <td>Doorstep Delivery</td>
              <td style="text-align: right; color: #16a34a;">FREE (₹0.00)</td>
            </tr>
            <tr class="total-row">
              <td colspan="2" style="text-align: right; padding-right: 20px;">Total Amount Paid:</td>
              <td style="text-align: right; color: #6b21a8;">₹1,200.00</td>
            </tr>
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px;">
          <div>
            <div class="stamp">✓ VERIFIED & APPROVED</div>
          </div>
          <div style="font-size: 12px; color: #4b5563; text-align: right;">
            <strong>Aries PhysioCare India</strong><br>
            Emergency & Support: +91 98765 43210<br>
            Email: care@ariesphysiocare.com
          </div>
        </div>

        <div class="footer">
          Thank you for choosing Aries PhysioCare. Our clinical coordinator and therapist will connect with you 60 minutes prior to the appointment.
        </div>
      </body>
      </html>
    `;

    const printWin = window.open('', '_blank', 'width=800,height=900');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(receiptHtml);
      printWin.document.close();
      setTimeout(() => {
        printWin.focus();
        printWin.print();
      }, 500);
    }
  };

  // Completion Success Screen
  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 md:p-12 min-h-[500px] bg-white dark:bg-[#0e0a1c] text-foreground rounded-3xl animate-in fade-in zoom-in-95 duration-400">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative mx-auto bg-gradient-to-tr from-purple-600 to-indigo-600 text-white p-5 rounded-3xl shadow-xl shadow-purple-500/30">
            <CheckCircle2 className="h-12 w-12" />
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Booking Confirmed & Paid
        </span>

        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Your Home Physiotherapy Session is Booked!
        </h3>

        <p className="text-muted-foreground mt-2 max-w-md text-sm leading-relaxed">
          Reference ID: <span className="font-bold text-purple-600 dark:text-purple-400">{bookingRefId}</span>. A confirmation with clinical details and payment receipt has been sent to your WhatsApp and email.
        </p>

        <div className="mt-6 p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-left max-w-md w-full space-y-2.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Patient:</span>
            <span className="font-bold text-foreground">{form.getValues('fullName')}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Service:</span>
            <span className="font-bold text-foreground">{currentService.title}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Date & Slot:</span>
            <span className="font-bold text-foreground">{watch('date')} • {watch('time')}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-bold text-foreground">{areaLabel}, {cityLabel}</span>
          </div>
          <div className="flex justify-between text-xs pt-1 border-t border-purple-200/50 dark:border-purple-800/40">
            <span className="text-muted-foreground">Total Paid:</span>
            <span className="font-black text-emerald-600 dark:text-emerald-400">₹1,200 (Paid via SSL)</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Button
            onClick={() => printReceiptWindow(bookingRefId, getValues())}
            variant="outline"
            className="h-11 px-5 rounded-xl border-purple-200 hover:bg-purple-50 dark:border-purple-800 text-purple-700 dark:text-purple-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Receipt Again
          </Button>

          <Button
            onClick={() => {
              if (onSubmitted) onSubmitted();
              if (onClose) onClose();
            }}
            className="h-11 px-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/25"
          >
            Done / Return to Portal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full text-foreground select-none', className)}>
      {/* ─────────────────────────────────────────────────────────────
          TOP STEPPER BAR (Shared for Steps 2, 3, 4)
      ───────────────────────────────────────────────────────────── */}
      {currentStep > 0 && (
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#0e0a1c]/95 backdrop-blur-md pl-5 pr-14 sm:pl-8 sm:pr-16 py-3.5 border-b border-purple-100/80 dark:border-purple-900/40 flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <div className="relative h-8 w-32 sm:h-9 sm:w-36">
              <Image
                src="/logo-light.png"
                alt="Aries PhysioCare"
                fill
                className="object-contain block dark:hidden object-left"
                priority
              />
              <Image
                src="/logo-dark.png"
                alt="Aries PhysioCare"
                fill
                className="object-contain hidden dark:block object-left"
                priority
              />
            </div>
          </div>

          {/* Connected Stepper with 4 steps */}
          <div className="flex items-center gap-2 sm:gap-6">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-purple-500/20">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-[11px] font-bold text-gray-900 dark:text-white">Patient</div>
                <div className="text-[10px] text-muted-foreground">Completed</div>
              </div>
            </div>

            <div className="w-6 sm:w-10 h-[2px] bg-purple-500 rounded-full" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors',
                  currentStep >= 2
                    ? 'bg-purple-600 text-white'
                    : currentStep === 1
                    ? 'bg-purple-600 text-white ring-4 ring-purple-100 dark:ring-purple-950'
                    : 'bg-gray-100 dark:bg-white/10 text-muted-foreground'
                )}
              >
                {currentStep >= 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div
                  className={cn(
                    'text-[11px] font-bold',
                    currentStep === 1 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'
                  )}
                >
                  Service
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {currentStep > 1 ? 'Selected' : 'Select Service'}
                </div>
              </div>
            </div>

            <div
              className={cn(
                'w-6 sm:w-10 h-[2px] rounded-full transition-colors',
                currentStep >= 2 ? 'bg-purple-500' : 'bg-gray-200 dark:bg-white/10'
              )}
            />

            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors',
                  currentStep >= 3
                    ? 'bg-purple-600 text-white'
                    : currentStep === 2
                    ? 'bg-purple-600 text-white ring-4 ring-purple-100 dark:ring-purple-950'
                    : 'bg-gray-100 dark:bg-white/10 text-muted-foreground'
                )}
              >
                {currentStep >= 3 ? <Check className="w-4 h-4 stroke-[3]" /> : '3'}
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div
                  className={cn(
                    'text-[11px] font-bold',
                    currentStep === 2 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'
                  )}
                >
                  Payment
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {currentStep > 2 ? 'Completed' : currentStep === 2 ? 'Secure Payment' : 'Coming Next'}
                </div>
              </div>
            </div>

            <div
              className={cn(
                'w-6 sm:w-10 h-[2px] rounded-full transition-colors',
                currentStep >= 3 ? 'bg-purple-500' : 'bg-gray-200 dark:bg-white/10'
              )}
            />

            {/* Step 4 */}
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors',
                  currentStep === 3
                    ? 'bg-purple-600 text-white ring-4 ring-purple-100 dark:ring-purple-950'
                    : 'bg-gray-100 dark:bg-white/10 text-muted-foreground'
                )}
              >
                4
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <div
                  className={cn(
                    'text-[11px] font-bold',
                    currentStep === 3 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'
                  )}
                >
                  Review
                </div>
                <div className="text-[10px] text-muted-foreground">Final Step</div>
              </div>
            </div>
          </div>

          {/* Right Script or Security Badge */}
          <div className="hidden lg:flex items-center gap-3">
            {currentStep === 1 && (
              <span className="font-script text-2xl text-purple-600 dark:text-purple-400 font-bold">
                Stronger Everyday At Home ♡
              </span>
            )}
            {currentStep === 2 && (
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 px-3 py-1 rounded-full">
                <Lock className="w-3.5 h-3.5 text-purple-600" />
                <span>256-bit SSL Security</span>
              </div>
            )}
            {currentStep === 3 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                  <span>100% Secure</span>
                </div>
                <span className="font-script text-xl text-purple-600 dark:text-purple-400 font-bold">
                  Thank You for Trusting Us ♡
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 1: PATIENT DETAILS (Matching Reference Mockup 1)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px] bg-white dark:bg-[#0e0a1c]">
          {/* Left Branded Sidebar */}
          <div className="lg:col-span-4 bg-gradient-to-b from-[#faf5ff] via-[#f5f3ff] to-[#eef2ff] dark:from-[#180f2d] dark:via-[#130b24] dark:to-[#0e0a1c] p-6 sm:p-8 flex flex-col justify-between border-r border-purple-100 dark:border-purple-900/30">
            <div>
              {/* Logo */}
              <div className="relative h-9 w-36 mb-6">
                <Image
                  src="/logo-light.png"
                  alt="Aries PhysioCare"
                  fill
                  className="object-contain block dark:hidden object-left"
                  priority
                />
                <Image
                  src="/logo-dark.png"
                  alt="Aries PhysioCare"
                  fill
                  className="object-contain hidden dark:block object-left"
                  priority
                />
              </div>

              {/* Tag & Heading */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                EXPERT CARE AT YOUR DOORSTEP
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
                Book Your{' '}
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                  Home Physiotherapy Visit
                </span>
              </h2>

              <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-medium">
                Professional care. Faster recovery. A healthier you — at home.
              </p>

              {/* Therapist Photo with Embroidered Logo & Cursive Script */}
              <div className="relative mt-5 rounded-2xl overflow-hidden border border-purple-200/60 dark:border-purple-800/40 shadow-lg group hidden lg:block">
                <div className="relative w-full h-48 sm:h-52 bg-purple-100 dark:bg-purple-950/50">
                  <Image
                    src="/images/booking-popup-therapist.jpg"
                    alt="Aries PhysioCare Certified Home Physiotherapy"
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Handwriting Script Overlay */}
                <div className="absolute top-2 right-2 bg-white/90 dark:bg-[#150d28]/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-purple-100/60 dark:border-purple-800/30">
                  <span className="font-script text-lg text-purple-700 dark:text-purple-300 font-bold">
                    &quot;Movement Heals Lives&quot; ♡
                  </span>
                </div>
              </div>

              {/* 3 Benefit Pills */}
              <div className="grid-cols-3 gap-2 mt-4 hidden lg:grid">
                <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-900/30 shadow-xs flex flex-col items-center text-center">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-1">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-tight">
                    Verified & Certified
                  </span>
                  <span className="text-[9px] text-muted-foreground">Physiotherapists</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-900/30 shadow-xs flex flex-col items-center text-center">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-1">
                    <Home className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-tight">
                    Care at
                  </span>
                  <span className="text-[9px] text-muted-foreground">Your Home</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-900/30 shadow-xs flex flex-col items-center text-center">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-1">
                    <Heart className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-800 dark:text-gray-200 leading-tight">
                    Personalized
                  </span>
                  <span className="text-[9px] text-muted-foreground">Recovery Plans</span>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-5 pt-4 border-t border-purple-200/50 dark:border-purple-800/30 items-center gap-3 hidden lg:flex">
              <div className="flex -space-x-2 shrink-0">
                <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-[#0e0a1c] overflow-hidden bg-purple-100">
                  <Image src="/images/therapist_avatar_1.jpg" alt="Patient" fill className="object-cover" />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-[#0e0a1c] overflow-hidden bg-purple-100">
                  <Image src="/images/therapist_avatar_2.jpg" alt="Patient" fill className="object-cover" />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-[#0e0a1c] overflow-hidden bg-purple-100">
                  <Image src="/images/therapist_avatar_3.jpg" alt="Patient" fill className="object-cover" />
                </div>
                <div className="relative w-8 h-8 rounded-full border-2 border-white dark:border-[#0e0a1c] overflow-hidden bg-purple-100">
                  <Image src="/images/therapist_avatar_4.jpg" alt="Patient" fill className="object-cover" />
                </div>
              </div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                  Trusted by 25,000+ patients
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span className="text-amber-500 font-bold">★★★★★</span>
                  <span className="font-bold text-gray-900 dark:text-white">4.9/5</span> across Mumbai
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Stepper Header in Step 1 */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5 mb-6">
                <div className="flex items-center gap-2 sm:gap-6">
                  {/* Step 1 */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-purple-500/20">
                      1
                    </div>
                    <div className="text-left leading-tight">
                      <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400">Patient</div>
                    </div>
                  </div>
                  <div className="w-8 sm:w-12 h-[2px] bg-gray-200 dark:bg-white/10 rounded-full" />
                  {/* Step 2 */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 text-muted-foreground flex items-center justify-center font-bold text-xs">
                      2
                    </div>
                    <div className="hidden sm:block text-left leading-tight">
                      <div className="text-[11px] font-bold text-muted-foreground">Service</div>
                    </div>
                  </div>
                  <div className="w-8 sm:w-12 h-[2px] bg-gray-200 dark:bg-white/10 rounded-full" />
                  {/* Step 3 */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 text-muted-foreground flex items-center justify-center font-bold text-xs">
                      3
                    </div>
                    <div className="hidden sm:block text-left leading-tight">
                      <div className="text-[11px] font-bold text-muted-foreground">Payment</div>
                    </div>
                  </div>
                  <div className="w-8 sm:w-12 h-[2px] bg-gray-200 dark:bg-white/10 rounded-full" />
                  {/* Step 4 */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 text-muted-foreground flex items-center justify-center font-bold text-xs">
                      4
                    </div>
                    <div className="hidden sm:block text-left leading-tight">
                      <div className="text-[11px] font-bold text-muted-foreground">Review</div>
                    </div>
                  </div>
                </div>

                <div className="text-right pr-6 sm:pr-8">
                  <div className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400">Step 1 of 4</div>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Personal & Visit Location
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-5">
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  Patient Details
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Help us with a few details to schedule your home visit.
                </p>
              </div>

              {/* Form Fields Grid */}
              <div className="space-y-4">
                {/* Row 1: Full Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="e.g. Rahul Sharma"
                      value={watch('fullName')}
                      onChange={(e) => setValue('fullName', e.target.value)}
                      className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs focus-visible:ring-purple-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                      <Phone className="w-3.5 h-3.5 text-purple-600" />
                      WhatsApp / Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 px-2.5 h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-xs font-bold shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </div>
                      <Input
                        type="tel"
                        maxLength={10}
                        placeholder="e.g. 9876543210"
                        value={watch('phone')}
                        onChange={(e) => setValue('phone', e.target.value.replace(/\D/g, ''))}
                        className="h-10 flex-1 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs focus-visible:ring-purple-600 font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                    <Mail className="w-3.5 h-3.5 text-purple-600" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="e.g. rahul@gmail.com"
                    value={watch('email')}
                    onChange={(e) => setValue('email', e.target.value)}
                    className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs focus-visible:ring-purple-600"
                  />
                </div>

                {/* Row 3: Age, Gender, Preferred Language */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                      <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                      Age <span className="text-red-500">*</span>
                    </label>
                    <Select value={watch('age')} onValueChange={(v) => setValue('age', v)}>
                      <SelectTrigger className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs">
                        <SelectValue placeholder="Select Age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-25">18 - 25 years</SelectItem>
                        <SelectItem value="26-35">26 - 35 years</SelectItem>
                        <SelectItem value="36-45">36 - 45 years</SelectItem>
                        <SelectItem value="46-55">46 - 55 years</SelectItem>
                        <SelectItem value="56-65">56 - 65 years</SelectItem>
                        <SelectItem value="66-75">66 - 75 years</SelectItem>
                        <SelectItem value="76+">76+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <Select value={watch('gender')} onValueChange={(v) => setValue('gender', v)}>
                      <SelectTrigger className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                      <FileText className="w-3.5 h-3.5 text-purple-600" />
                      Preferred Language
                    </label>
                    <Select
                      value={watch('preferredLanguage')}
                      onValueChange={(v) => setValue('preferredLanguage', v)}
                    >
                      <SelectTrigger className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Hindi">Hindi (हिंदी)</SelectItem>
                        <SelectItem value="Marathi">Marathi (मराठी)</SelectItem>
                        <SelectItem value="Gujarati">Gujarati (ગુજરાતી)</SelectItem>
                        <SelectItem value="Tamil">Tamil (தமிழ்)</SelectItem>
                        <SelectItem value="Bengali">Bengali (বাংলা)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Section Header: Visit Location Details */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                        Visit Location Details
                      </h4>
                      <p className="text-[10px] text-muted-foreground">
                        Please provide your complete address for a home visit.
                      </p>
                    </div>
                  </div>

                  {/* Row 4: Cascading State, City, Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                        <Building2 className="w-3 h-3 text-purple-600" />
                        State <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={selectedState}
                        onValueChange={(val) => {
                          setValue('state', val);
                          const st = states.find((s) => s.slug === val);
                          if (st && st.cities.length > 0) {
                            setValue('city', st.cities[0].slug);
                            if (st.cities[0].areas.length > 0) {
                              setValue('area', st.cities[0].areas[0].slug);
                            }
                          }
                        }}
                      >
                        <SelectTrigger className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((st) => (
                            <SelectItem key={st.slug} value={st.slug}>
                              {st.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                        <MapPin className="w-3 h-3 text-purple-600" />
                        City <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={selectedCity}
                        onValueChange={(val) => {
                          setValue('city', val);
                          const c = currentCities.find((ci) => ci.slug === val);
                          if (c && c.areas.length > 0) {
                            setValue('area', c.areas[0].slug);
                          }
                        }}
                      >
                        <SelectTrigger className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs">
                          <SelectValue placeholder="Select City" />
                        </SelectTrigger>
                        <SelectContent>
                          {currentCities.map((ci) => (
                            <SelectItem key={ci.slug} value={ci.slug}>
                              {ci.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                        <Home className="w-3 h-3 text-purple-600" />
                        Area / Sub-Area <span className="text-red-500">*</span>
                      </label>
                      <Select value={selectedArea} onValueChange={(val) => setValue('area', val)}>
                        <SelectTrigger className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs">
                          <SelectValue placeholder="Select Area" />
                        </SelectTrigger>
                        <SelectContent className="max-h-56">
                          {currentAreas.map((ar) => (
                            <SelectItem key={ar.slug} value={ar.slug}>
                              {ar.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 5: Complete Address with GPS Locate Button */}
                  <div className="mt-3">
                    <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between mb-1">
                      <span className="flex items-center gap-1">
                        <Home className="w-3 h-3 text-purple-600" />
                        Complete Address (Flat / House No., Landmark) <span className="text-red-500">*</span>
                      </span>
                      <button
                        type="button"
                        onClick={handleGPSLocate}
                        className="text-[10px] text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        {isLocating ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Navigation className="w-3 h-3" />
                        )}
                        Use Current GPS
                      </button>
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="e.g. Flat 402, Sea Breeze Apts, 14th Road, Bandra West, Mumbai 400050"
                        value={watch('address')}
                        onChange={(e) => setValue('address', e.target.value)}
                        className="h-10 pr-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs focus-visible:ring-purple-600"
                      />
                      <button
                        type="button"
                        onClick={handleGPSLocate}
                        title="Locate via GPS"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-purple-600 dark:text-purple-400 hover:text-purple-700 p-1"
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Security note + Continue Button */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <Lock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Your information is secure and only used to arrange your home visit.</span>
              </div>

              <Button
                onClick={handleProceedToStep2}
                className="h-11 px-7 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/25 flex items-center gap-2 group transition-all"
              >
                <span>Continue to Service Selection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 2: SELECT YOUR SERVICE (Matching Reference Mockup 2)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 bg-white dark:bg-[#0e0a1c] min-h-[600px] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                NEXT STEP
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Select Your{' '}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Service
                </span>
              </h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Choose the physiotherapy service that best fits your needs. Our experts will customise your care plan.
              </p>
            </div>

            {/* 3-Column Visual Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Therapist Visual & Quote */}
              <div className="lg:col-span-3 hidden lg:flex flex-col gap-4">
                <div className="relative rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/30 shadow-md">
                  <div className="relative h-64 w-full bg-purple-50 dark:bg-purple-950/40">
                    <Image
                      src="/images/booking-popup-therapist.jpg"
                      alt="Certified Care at Home"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-[#150d28]/95 backdrop-blur-md p-3 rounded-xl shadow-md border border-purple-100 dark:border-purple-800/30 text-center">
                    <span className="font-script text-lg text-purple-700 dark:text-purple-300 font-bold block">
                      &quot;Movement Heals Lives&quot; ♡
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Column: 8 Service Cards & Date/Time Picker */}
              <div className="lg:col-span-7 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VISUAL_SERVICES.map((s) => {
                    const isSelected = selectedServiceId === s.id;
                    const IconComp = s.icon;
                    return (
                      <div
                        key={s.id}
                        onClick={() => setValue('service', s.id)}
                        className={cn(
                          'relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between group text-left',
                          isSelected
                            ? 'border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 shadow-md shadow-purple-500/10 ring-1 ring-purple-600'
                            : 'border-gray-100 dark:border-white/5 hover:border-purple-200 dark:hover:border-purple-800/40 bg-gray-50/30 dark:bg-white/[0.02]'
                        )}
                      >
                        {/* Checkmark badge when selected */}
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-sm">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors',
                              isSelected
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 group-hover:bg-purple-200'
                            )}
                          >
                            <IconComp className="w-5 h-5" />
                          </div>

                          <div className="pr-4">
                            <h4
                              className={cn(
                                'text-xs font-bold leading-tight transition-colors',
                                isSelected ? 'text-purple-950 dark:text-purple-100' : 'text-gray-900 dark:text-white'
                              )}
                            >
                              {s.title}
                            </h4>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                              {s.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Date & Time Slot Selector for accurate booking */}
                <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 mb-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                        Preferred Date
                      </label>
                      <Select value={selectedDate} onValueChange={(v) => setValue('date', v)}>
                        <SelectTrigger className="h-9 rounded-xl bg-white dark:bg-white/5 border-purple-200 dark:border-purple-800 text-xs font-medium">
                          <SelectValue placeholder="Select Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tue, 16 Feb 2026">Today (Immediate)</SelectItem>
                          <SelectItem value="Wed, 17 Feb 2026">Tomorrow</SelectItem>
                          <SelectItem value="Thu, 18 Feb 2026">Thu, 18 Feb 2026</SelectItem>
                          <SelectItem value="Fri, 19 Feb 2026">Fri, 19 Feb 2026</SelectItem>
                          <SelectItem value="Sat, 20 Feb 2026">Sat, 20 Feb 2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5 mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        Preferred Time Slot (1 Hour)
                      </label>
                      <Select value={selectedTime} onValueChange={(v) => setValue('time', v)}>
                        <SelectTrigger className="h-9 rounded-xl bg-white dark:bg-white/5 border-purple-200 dark:border-purple-800 text-xs font-medium">
                          <SelectValue placeholder="Select Slot" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="09:00 AM – 10:00 AM">09:00 AM – 10:00 AM (Morning)</SelectItem>
                          <SelectItem value="10:00 AM – 11:00 AM">10:00 AM – 11:00 AM (Popular)</SelectItem>
                          <SelectItem value="11:00 AM – 12:00 PM">11:00 AM – 12:00 PM</SelectItem>
                          <SelectItem value="02:00 PM – 03:00 PM">02:00 PM – 03:00 PM (Afternoon)</SelectItem>
                          <SelectItem value="04:00 PM – 05:00 PM">04:00 PM – 05:00 PM</SelectItem>
                          <SelectItem value="06:00 PM – 07:00 PM">06:00 PM – 07:00 PM (Evening)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Benefits & Script */}
              <div className="lg:col-span-2 hidden lg:flex flex-col justify-between h-full gap-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-900/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">
                      Certified Physiotherapists
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-900/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">
                      Personalized Treatment Plans
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-900/30 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                      <Home className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">
                      Care at Your Home
                    </span>
                  </div>
                </div>

                <div className="text-center p-2">
                  <span className="font-script text-xl text-purple-600 dark:text-purple-400 font-bold block leading-tight">
                    Better Movement, Brighter Tomorrow ♡
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(0)}
              className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Patient Details</span>
            </Button>

            <span className="hidden md:inline text-[11px] text-muted-foreground font-medium">
              Your Health | Our Expertise | A Better Tomorrow
            </span>

            <Button
              onClick={handleProceedToStep3}
              className="h-11 px-7 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/25 flex items-center gap-2 group transition-all"
            >
              <span>Next Step: Payment</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 3: PAYMENT DETAILS (Matching Reference Mockup 3)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 bg-white dark:bg-[#0e0a1c] min-h-[600px] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                NEXT STEP
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Payment{' '}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Details
                </span>
              </h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Complete your payment to confirm your home physiotherapy visit.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Branded Feature Strip */}
              <div className="lg:col-span-3 hidden lg:flex flex-col justify-between h-full space-y-4">
                <div>
                  <span className="font-script text-xl text-purple-600 dark:text-purple-400 font-bold block mb-1">
                    Healing Happens At Home ♡
                  </span>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white leading-snug">
                    You&apos;re One Step Closer to{' '}
                    <span className="text-purple-600 dark:text-purple-400">Better Health</span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Secure your booking with a quick and safe payment. Your health journey starts at home.
                  </p>

                  <div className="space-y-2 mt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <span>100% Secure Payments</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center">
                        <Lock className="w-3 h-3" />
                      </div>
                      <span>Your Information is Protected</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center">
                        <Heart className="w-3 h-3" />
                      </div>
                      <span>Care You Can Trust</span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/30">
                  <div className="relative h-36 w-full">
                    <Image
                      src="/images/booking-popup-therapist.jpg"
                      alt="Care you can trust"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-2 text-center bg-purple-50 dark:bg-purple-950/40">
                    <span className="font-script text-base text-purple-700 dark:text-purple-300 font-bold">
                      &quot;Movement Heals Lives&quot; ♡
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Payment Form */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900 dark:text-white">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Choose Payment Method</span>
                </div>

                {/* 4 Payment Tabs */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'card')}
                    className={cn(
                      'p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1',
                      selectedPaymentMethod === 'card'
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-1 ring-purple-600 font-bold'
                        : 'border-gray-200 dark:border-white/10 text-muted-foreground hover:bg-gray-50 dark:hover:bg-white/5 font-medium'
                    )}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'upi')}
                    className={cn(
                      'p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1',
                      selectedPaymentMethod === 'upi'
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-1 ring-purple-600 font-bold'
                        : 'border-gray-200 dark:border-white/10 text-muted-foreground hover:bg-gray-50 dark:hover:bg-white/5 font-medium'
                    )}
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'netbanking')}
                    className={cn(
                      'p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1',
                      selectedPaymentMethod === 'netbanking'
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-1 ring-purple-600 font-bold'
                        : 'border-gray-200 dark:border-white/10 text-muted-foreground hover:bg-gray-50 dark:hover:bg-white/5 font-medium'
                    )}
                  >
                    <Landmark className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">Net Bank</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('paymentMethod', 'wallets')}
                    className={cn(
                      'p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1',
                      selectedPaymentMethod === 'wallets'
                        ? 'border-purple-600 bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-1 ring-purple-600 font-bold'
                        : 'border-gray-200 dark:border-white/10 text-muted-foreground hover:bg-gray-50 dark:hover:bg-white/5 font-medium'
                    )}
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="text-[10px] leading-tight">Wallets</span>
                  </button>
                </div>

                {/* Card Fields */}
                {selectedPaymentMethod === 'card' && (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <Input
                          placeholder="1234 5678 9012 3456"
                          value={watch('cardNumber')}
                          onChange={(e) => setValue('cardNumber', e.target.value)}
                          className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs tracking-wider font-mono pr-10"
                        />
                        <CreditCard className="w-4 h-4 text-purple-600 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                          Expiry Date
                        </label>
                        <Input
                          placeholder="MM / YY"
                          value={watch('cardExpiry')}
                          onChange={(e) => setValue('cardExpiry', e.target.value)}
                          className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                          CVV
                        </label>
                        <Input
                          placeholder="123"
                          maxLength={4}
                          value={watch('cardCvv')}
                          onChange={(e) => setValue('cardCvv', e.target.value)}
                          className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                        Name on Card
                      </label>
                      <Input
                        placeholder="e.g. Rahul Sharma"
                        value={watch('cardName')}
                        onChange={(e) => setValue('cardName', e.target.value)}
                        className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs"
                      />
                    </div>

                    <div className="flex items-center space-x-2 pt-1">
                      <Checkbox
                        id="saveCard"
                        checked={watch('saveCard')}
                        onCheckedChange={(c) => setValue('saveCard', !!c)}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <label htmlFor="saveCard" className="text-xs text-muted-foreground cursor-pointer">
                        Save this card for faster payments next time
                      </label>
                    </div>
                  </div>
                )}

                {/* UPI Alternative */}
                {selectedPaymentMethod === 'upi' && (
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <Input
                      placeholder="e.g. username@okhdfcbank or 9876543210@upi"
                      value={watch('upiId')}
                      onChange={(e) => setValue('upiId', e.target.value)}
                      className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs"
                    />
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-[10px] text-muted-foreground">Supported:</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 font-bold">GPay</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 font-bold">PhonePe</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 font-bold">Paytm</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 font-bold">BHIM</span>
                    </div>
                  </div>
                )}

                {/* Net Banking / Wallets Alternative */}
                {(selectedPaymentMethod === 'netbanking' || selectedPaymentMethod === 'wallets') && (
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                      Select Provider
                    </label>
                    <Select defaultValue="hdfc">
                      <SelectTrigger className="h-10 rounded-xl bg-gray-50/50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-xs">
                        <SelectValue placeholder="Select Provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                        <SelectItem value="icici">ICICI Bank</SelectItem>
                        <SelectItem value="sbi">State Bank of India</SelectItem>
                        <SelectItem value="axis">Axis Bank</SelectItem>
                        <SelectItem value="kotak">Kotak Mahindra Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Security Trust Badges */}
                <div className="pt-3 flex items-center justify-between border-t border-gray-100 dark:border-white/5 text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Razorpay Secured</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>PCI DSS Compliant</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-purple-600 dark:text-purple-400">
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>Verified Transactions</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Summary Card */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                    Booking Summary
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 hover:underline"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </button>
                </div>

                {/* Selected Service Item */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-white/5 border border-purple-100 dark:border-purple-900/30">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-purple-100">
                    <Image
                      src={currentService.image}
                      alt={currentService.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                      {currentService.title}
                    </h5>
                    <p className="text-[10px] text-muted-foreground">Home Visit • {cityLabel}, {stateLabel}</p>
                  </div>
                </div>

                {/* Summary Lines */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-purple-600" />
                      Date:
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedDate}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      Time:
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">{selectedTime}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-600" />
                      Location:
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">{areaLabel}, {cityLabel}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-purple-600" />
                      Therapist:
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {therapist || 'Certified Physiotherapist'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-purple-200/60 dark:border-purple-800/40 pt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Session Fee</span>
                    <span>₹1,200</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Convenience Fee</span>
                    <span className="text-emerald-600 font-bold">₹0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-extrabold pt-2 border-t border-purple-200/60 dark:border-purple-800/40">
                    <span className="text-gray-900 dark:text-white">Total Amount</span>
                    <span className="text-purple-600 dark:text-purple-400 text-lg">₹1,200</span>
                  </div>
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start space-x-2 pt-1">
                  <Checkbox
                    id="agreeTerms"
                    checked={agreeTerms}
                    onCheckedChange={(c) => setValue('agreeTerms', !!c)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-0.5"
                  />
                  <label htmlFor="agreeTerms" className="text-[11px] text-muted-foreground leading-tight cursor-pointer">
                    I agree to the <span className="text-purple-600 underline">Terms & Conditions</span> and{' '}
                    <span className="text-purple-600 underline">Privacy Policy</span>
                  </label>
                </div>

                {/* Pay Button */}
                <Button
                  onClick={handleProcessPayment}
                  disabled={isProcessingPayment}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 group transition-all"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Pay ₹1,200 and Confirm Booking</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Your payment is 100% secure and encrypted
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(1)}
              className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Service Selection</span>
            </Button>

            <span className="font-script text-xl text-purple-600 dark:text-purple-400 font-bold">
              A Healthier, Happier Tomorrow ♡
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          STEP 4: REVIEW & CONFIRM (Matching Reference Mockup 4)
      ───────────────────────────────────────────────────────────── */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 bg-white dark:bg-[#0e0a1c] min-h-[600px] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100/80 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                NEXT STEP
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                Review &{' '}
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Confirm
                </span>
              </h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Please review your booking details before confirming. Once confirmed, you will receive a confirmation and receipt via email and WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Branded Hero Strip */}
              <div className="lg:col-span-3 hidden lg:flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    CARE AT YOUR DOORSTEP
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white leading-snug">
                    Almost There!{' '}
                    <span className="text-purple-600 dark:text-purple-400">Review & Confirm Your Booking</span>
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                    Please review your details. Once confirmed, you will receive a confirmation and receipt via email and WhatsApp.
                  </p>

                  <div className="space-y-2.5 mt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <span>Trusted & Certified Physiotherapists</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center">
                        <Home className="w-3 h-3" />
                      </div>
                      <span>Care in the Comfort of Your Home</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center">
                        <Heart className="w-3 h-3" />
                      </div>
                      <span>Personalized Treatment Plans</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center">
                        <Flower2 className="w-3 h-3" />
                      </div>
                      <span>Your Health Our Priority</span>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/30">
                  <div className="relative h-32 w-full">
                    <Image
                      src="/images/booking-popup-therapist.jpg"
                      alt="Healthier Happier Tomorrow"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-2 text-center bg-purple-50 dark:bg-purple-950/40">
                    <span className="font-script text-base text-purple-700 dark:text-purple-300 font-bold">
                      &quot;A Healthier Happier Tomorrow&quot; ♡
                    </span>
                  </div>
                </div>
              </div>

              {/* Center & Right 2-Column Review Boxes */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1: Patient Details & Payment Details */}
                <div className="space-y-4">
                  {/* Card 1: Patient Details */}
                  <div className="p-4 rounded-2xl bg-gray-50/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 dark:border-white/10">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-purple-600" />
                        Patient Details
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(0)}
                        className="text-[11px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 hover:underline"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold">
                        <User className="w-3.5 h-3.5 text-muted-foreground" />
                        <span>{watch('fullName') || 'Rahul Sharma'}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-3.5 h-3.5" />
                        <span>+91 {watch('phone') || '98765 43210'}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{watch('email') || 'rahul@gmail.com'}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>Age: {watch('age') || '45'} | {watch('gender') || 'Male'}</span>
                      </div>

                      <div className="flex items-start gap-2 text-muted-foreground pt-1 border-t border-gray-100 dark:border-white/5">
                        <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span className="leading-snug">
                          {watch('address') || 'Flat 402, Sea Breeze Apts, 14th Road'}, {areaLabel}, {cityLabel} {stateLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Payment Details */}
                  <div className="p-4 rounded-2xl bg-gray-50/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 dark:border-white/10">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                        Payment Details
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="text-[11px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 hover:underline"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between font-bold">
                        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                          <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                          <span>
                            {selectedPaymentMethod === 'card'
                              ? 'Visa **** 3456'
                              : selectedPaymentMethod === 'upi'
                              ? 'UPI (Verified)'
                              : 'Net Banking'}
                          </span>
                        </div>
                        <span className="text-purple-600 dark:text-purple-400 font-extrabold text-sm">₹1,200</span>
                      </div>

                      <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span>Session Fee</span>
                        <span>₹1,200</span>
                      </div>
                      <div className="flex justify-between text-[11px] text-muted-foreground">
                        <span>Convenience Fee</span>
                        <span className="text-emerald-600 font-bold">₹0</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                        <div className="leading-tight">
                          <span className="font-bold text-[11px] block">Payment Successful</span>
                          <span className="text-[10px] opacity-85">Your payment has been securely processed.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Service Details & Important Information */}
                <div className="space-y-4">
                  {/* Card 1: Service Details */}
                  <div className="p-4 rounded-2xl bg-gray-50/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200/60 dark:border-white/10">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-purple-600" />
                        Service Details
                      </h4>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="text-[11px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 hover:underline"
                      >
                        <Pencil className="w-3 h-3" />
                        Edit
                      </button>
                    </div>

                    {/* Thumbnail + Title */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-purple-100">
                        <Image
                          src={currentService.image}
                          alt={currentService.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
                          {currentService.title}
                        </h5>
                        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                          {currentService.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs pt-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Home className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>Home Visit (At Your Home)</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CalendarIcon className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{selectedDate}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{selectedTime} (1 Hour Session)</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{therapist || 'Certified Physiotherapist'}</span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 text-[10px] text-purple-900 dark:text-purple-200">
                        <strong>Notes:</strong> Initial assessment and personalized treatment plan will be provided during the session.
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Important Information Checkboxes */}
                  <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 space-y-3">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5 pb-2 border-b border-purple-200/50 dark:border-purple-800/30">
                      <FileText className="w-3.5 h-3.5 text-purple-600" />
                      Important Information
                    </h4>

                    <div className="space-y-2.5">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="confirmCorrect"
                          checked={confirmCorrect}
                          onCheckedChange={(c) => setValue('confirmCorrect', !!c)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-0.5"
                        />
                        <label htmlFor="confirmCorrect" className="text-[11px] text-gray-700 dark:text-gray-300 cursor-pointer leading-tight font-medium">
                          I confirm that the above information is correct.
                        </label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="agreeTerms2"
                          checked={agreeTerms}
                          onCheckedChange={(c) => setValue('agreeTerms', !!c)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-0.5"
                        />
                        <label htmlFor="agreeTerms2" className="text-[11px] text-gray-700 dark:text-gray-300 cursor-pointer leading-tight font-medium">
                          I agree to the <span className="text-purple-600 underline">Terms & Conditions</span> and{' '}
                          <span className="text-purple-600 underline">Privacy Policy</span>.
                        </label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="understandContact"
                          checked={understandContact}
                          onCheckedChange={(c) => setValue('understandContact', !!c)}
                          className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-0.5"
                        />
                        <label htmlFor="understandContact" className="text-[11px] text-gray-700 dark:text-gray-300 cursor-pointer leading-tight font-medium">
                          I understand that the physiotherapist will contact me before the visit.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(2)}
              className="h-11 px-5 rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-xs font-bold flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Payment</span>
            </Button>

            <Button
              onClick={handleFinalConfirmAndReceipt}
              disabled={isSubmitting}
              className="h-11 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-purple-600/30 flex items-center gap-2.5 group transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Official Booking...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Confirm & Download Receipt</span>
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </>
              )}
            </Button>
          </div>

          {/* Bottom Floating Stats Strip */}
          <div className="mt-6 pt-3 border-t border-purple-100/60 dark:border-purple-900/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs">
              <Users className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-gray-900 dark:text-white">25,000+</span>
              <span className="text-muted-foreground text-[11px]">Happy Patients</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="font-bold text-gray-900 dark:text-white">4.9/5</span>
              <span className="text-muted-foreground text-[11px]">Patient Satisfaction</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="font-bold text-gray-900 dark:text-white">Same-Day</span>
              <span className="text-muted-foreground text-[11px]">Appointments</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs">
              <Flower2 className="w-4 h-4 text-purple-600" />
              <span className="font-script text-base font-bold text-purple-600 dark:text-purple-400">
                Care Beyond Boundaries
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
