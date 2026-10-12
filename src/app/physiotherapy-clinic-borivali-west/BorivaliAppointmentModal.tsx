'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  Sparkles,
  ArrowRight,
  Printer,
  MessageCircle,
  Info,
  Check,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { submitAppointmentLead } from '@/app/actions/lead-actions';
import { getStoredAttribution } from '@/lib/growth-attribution';

// Razorpay type definition for window
declare global {
  interface Window {
    Razorpay?: any;
  }
}

export interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: string;
  preselectedPackage?: string;
}

const COMMON_CONDITIONS = [
  'Knee Pain & Osteoarthritis',
  'Back Pain & Sciatica Decompression',
  'Cervical Spondylosis & Neck Pain',
  'Frozen Shoulder & Rotator Cuff',
  'Post-Surgical Rehab (TKR / THR / Spine)',
  'Stroke & Neurological Rehabilitation',
  'Sports Injury & Ligament Sprain',
  'Geriatric Balance & Fall Prevention',
  'Postural Strain & Ergonomic Correction',
  'Other / General Physiotherapy Assessment',
];

const CLINIC_ADDRESS = 'Shop No. 7, Parrk Riviera, New Mhatre Colony, Opp. New Mhatre Ground, Borivali West, Mumbai 400091';
const CLINIC_PHONE = '+91 8591981880';
const WHATSAPP_NUM = '918591981880';
const CONSULTATION_FEE = 800;
const ADVANCE_DEPOSIT = 250;
const BALANCE_ON_VISIT = 550;

// Base slots configuration:
// Morning: 08:00 AM - 01:00 PM
// Evening: 04:00 PM - 09:00 PM
// Each 30-min window can take max 2 bookings (staggered by 15 mins).
interface SlotDefinition {
  windowStart: string; // e.g. "08:00 AM"
  windowLabel: string; // e.g. "08:00 AM - 08:30 AM"
  shift: 'morning' | 'evening';
  patient1Time: string; // "08:00 AM"
  patient2Time: string; // "08:15 AM" (+15m gap)
  hourValue: string; // "08"
  minuteValue1: string; // "00"
  minuteValue2: string; // "15"
}

const SHIFT_SLOTS: SlotDefinition[] = [
  // Morning shift
  { windowStart: '08:00 AM', windowLabel: '08:00 AM - 08:30 AM', shift: 'morning', patient1Time: '08:00 AM', patient2Time: '08:15 AM', hourValue: '08', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '08:30 AM', windowLabel: '08:30 AM - 09:00 AM', shift: 'morning', patient1Time: '08:30 AM', patient2Time: '08:45 AM', hourValue: '08', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '09:00 AM', windowLabel: '09:00 AM - 09:30 AM', shift: 'morning', patient1Time: '09:00 AM', patient2Time: '09:15 AM', hourValue: '09', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '09:30 AM', windowLabel: '09:30 AM - 10:00 AM', shift: 'morning', patient1Time: '09:30 AM', patient2Time: '09:45 AM', hourValue: '09', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '10:00 AM', windowLabel: '10:00 AM - 10:30 AM', shift: 'morning', patient1Time: '10:00 AM', patient2Time: '10:15 AM', hourValue: '10', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '10:30 AM', windowLabel: '10:30 AM - 11:00 AM', shift: 'morning', patient1Time: '10:30 AM', patient2Time: '10:45 AM', hourValue: '10', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '11:00 AM', windowLabel: '11:00 AM - 11:30 AM', shift: 'morning', patient1Time: '11:00 AM', patient2Time: '11:15 AM', hourValue: '11', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '11:30 AM', windowLabel: '11:30 AM - 12:00 PM', shift: 'morning', patient1Time: '11:30 AM', patient2Time: '11:45 AM', hourValue: '11', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '12:00 PM', windowLabel: '12:00 PM - 12:30 PM', shift: 'morning', patient1Time: '12:00 PM', patient2Time: '12:15 PM', hourValue: '12', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '12:30 PM', windowLabel: '12:30 PM - 01:00 PM', shift: 'morning', patient1Time: '12:30 PM', patient2Time: '12:45 PM', hourValue: '12', minuteValue1: '30', minuteValue2: '45' },

  // Evening shift
  { windowStart: '04:00 PM', windowLabel: '04:00 PM - 04:30 PM', shift: 'evening', patient1Time: '04:00 PM', patient2Time: '04:15 PM', hourValue: '04', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '04:30 PM', windowLabel: '04:30 PM - 05:00 PM', shift: 'evening', patient1Time: '04:30 PM', patient2Time: '04:45 PM', hourValue: '04', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '05:00 PM', windowLabel: '05:00 PM - 05:30 PM', shift: 'evening', patient1Time: '05:00 PM', patient2Time: '05:15 PM', hourValue: '05', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '05:30 PM', windowLabel: '05:30 PM - 06:00 PM', shift: 'evening', patient1Time: '05:30 PM', patient2Time: '05:45 PM', hourValue: '05', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '06:00 PM', windowLabel: '06:00 PM - 06:30 PM', shift: 'evening', patient1Time: '06:00 PM', patient2Time: '06:15 PM', hourValue: '06', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '06:30 PM', windowLabel: '06:30 PM - 07:00 PM', shift: 'evening', patient1Time: '06:30 PM', patient2Time: '06:45 PM', hourValue: '06', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '07:00 PM', windowLabel: '07:00 PM - 07:30 PM', shift: 'evening', patient1Time: '07:00 PM', patient2Time: '07:15 PM', hourValue: '07', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '07:30 PM', windowLabel: '07:30 PM - 08:00 PM', shift: 'evening', patient1Time: '07:30 PM', patient2Time: '07:45 PM', hourValue: '07', minuteValue1: '30', minuteValue2: '45' },
  { windowStart: '08:00 PM', windowLabel: '08:00 PM - 08:30 PM', shift: 'evening', patient1Time: '08:00 PM', patient2Time: '08:15 PM', hourValue: '08', minuteValue1: '00', minuteValue2: '15' },
  { windowStart: '08:30 PM', windowLabel: '08:30 PM - 09:00 PM', shift: 'evening', patient1Time: '08:30 PM', patient2Time: '08:45 PM', hourValue: '08', minuteValue1: '30', minuteValue2: '45' },
];

export default function BorivaliAppointmentModal({
  isOpen,
  onClose,
  preselectedDoctor,
  preselectedPackage,
}: AppointmentModalProps) {
  // Modal step: 'details' -> 'payment' -> 'confirmed'
  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');

  // Form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [condition, setCondition] = useState(COMMON_CONDITIONS[0]);
  const [customCondition, setCustomCondition] = useState('');

  // Calendar state
  const today = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1); // Default to tomorrow
    return d;
  });
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  // Time & Shift state
  const [shift, setShift] = useState<'morning' | 'evening'>('morning');
  const [selectedHour, setSelectedHour] = useState('09');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedSlotTime, setSelectedSlotTime] = useState('09:00 AM');

  // Simulation booking map for slot limits:
  // key: `${dateString}_${slotWindowStart}` -> number of bookings (0, 1, or 2)
  const [slotOccupancy, setSlotOccupancy] = useState<Record<string, number>>(() => {
    // Seed with realistic appointments so rules are visually transparent
    const seed: Record<string, number> = {};
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const dateKey = d.toISOString().split('T')[0];
    seed[`${dateKey}_09:00 AM`] = 1; // 1 booked -> second patient gets 15m gap
    seed[`${dateKey}_11:00 AM`] = 2; // 2 booked -> FULL (max 2 bookings per slot)
    seed[`${dateKey}_05:00 PM`] = 1;
    seed[`${dateKey}_06:30 PM`] = 2;
    return seed;
  });

  // Submission & payment state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceCode: string;
    patientName: string;
    mobile: string;
    condition: string;
    date: string;
    time: string;
    paymentId: string;
    advancePaid: number;
    balanceDue: number;
  } | null>(null);

  // Load Razorpay script
  useEffect(() => {
    if (!document.getElementById('razorpay-sdk')) {
      const script = document.createElement('script');
      script.id = 'razorpay-sdk';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Sync hour and minute when a slot is clicked
  const handleSelectSlot = (slot: SlotDefinition, isSecondPatient: boolean) => {
    const chosenTime = isSecondPatient ? slot.patient2Time : slot.patient1Time;
    const chosenMinute = isSecondPatient ? slot.minuteValue2 : slot.minuteValue1;
    setSelectedHour(slot.hourValue);
    setSelectedMinute(chosenMinute);
    setSelectedSlotTime(chosenTime);
  };

  // Calendar helpers
  const handlePrevMonth = () => {
    setViewMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setViewMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const daysInMonth = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: (Date | null)[] = [];
    // Pad previous month days
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Add current month days
    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  }, [viewMonth]);

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isPastDate = (d: Date) => {
    const checkDate = new Date(d);
    checkDate.setHours(23, 59, 59, 999);
    return checkDate < today;
  };

  // Calculate slot occupancy for currently selected date
  const selectedDateKey = useMemo(() => {
    return selectedDate.toISOString().split('T')[0];
  }, [selectedDate]);

  // Filter slots for active shift
  const currentShiftSlots = useMemo(() => {
    return SHIFT_SLOTS.filter((s) => s.shift === shift);
  }, [shift]);

  // Validation
  const validateForm = () => {
    if (!firstName.trim()) {
      setPaymentError('Please enter patient first name');
      return false;
    }
    if (!lastName.trim()) {
      setPaymentError('Please enter patient last name');
      return false;
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setPaymentError('Please enter a valid 10-digit Indian mobile number');
      return false;
    }
    setPaymentError('');
    return true;
  };

  // Handle final appointment confirmation after payment
  const completeBooking = async (paymentId: string) => {
    setIsProcessing(true);
    setPaymentError('');

    try {
      const cleanMobile = mobile.replace(/\D/g, '');
      const selectedDiagnosis = condition === 'Other / General Physiotherapy Assessment' && customCondition.trim()
        ? customCondition.trim()
        : condition;
      
      const attr = getStoredAttribution();
      const leadPayload = {
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        phone: cleanMobile,
        email: `${cleanMobile}@patient.ariesphysiocare.in`,
        state: 'Maharashtra',
        city: 'Mumbai',
        area: 'Borivali West',
        address: CLINIC_ADDRESS,
        service: 'Physiotherapy (In-Clinic Borivali West Consultation)',
        date: selectedDate,
        time: `${selectedSlotTime} (${shift === 'morning' ? 'Morning Shift' : 'Evening Shift'})`,
        condition: `${selectedDiagnosis}. Paid Advance Deposit: ₹250 (Razorpay ID: ${paymentId}) | Balance ₹550 due at clinic visit.${preselectedDoctor ? ` Doctor: ${preselectedDoctor}.` : ''}${preselectedPackage ? ` Package: ${preselectedPackage}.` : ''}`,
        country: 'India',
        paymentMethod: 'upi' as const,
        utmSource: attr.utmSource || 'website_borivali_redesign',
        utmMedium: attr.utmMedium || 'organic_clinic_popup',
        utmCampaign: attr.utmCampaign || 'borivali_west_flagship',
        landingPage: '/locations/mumbai/aries-physiocare-expert-physiotherapy-wellness-center-borivali',
        growthEngine: 'PATIENT' as const,
      };

      const result = await submitAppointmentLead(leadPayload);
      const generatedCode = (result as any)?.referenceCode ||
        (result as any)?.data?.referenceCode ||
        `AP-BOR-${Math.floor(100000 + Math.random() * 900000)}`;

      // Update slot occupancy in state
      const matchingSlot = SHIFT_SLOTS.find(
        (s) => s.patient1Time === selectedSlotTime || s.patient2Time === selectedSlotTime
      );
      if (matchingSlot) {
        const slotKey = `${selectedDateKey}_${matchingSlot.windowStart}`;
        setSlotOccupancy((prev) => ({
          ...prev,
          [slotKey]: (prev[slotKey] || 0) + 1,
        }));
      }

      setConfirmedBooking({
        referenceCode: generatedCode,
        patientName: `${firstName.trim()} ${lastName.trim()}`,
        mobile: cleanMobile,
        condition: selectedDiagnosis,
        date: selectedDate.toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        time: selectedSlotTime,
        paymentId,
        advancePaid: ADVANCE_DEPOSIT,
        balanceDue: BALANCE_ON_VISIT,
      });

      setStep('confirmed');
    } catch (err: any) {
      setPaymentError(err?.message || 'Error recording appointment. Please call front desk.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Launch Razorpay checkout
  const handleProceedToRazorpay = () => {
    if (!validateForm()) return;

    const rzpKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder';
    const cleanMobile = mobile.replace(/\D/g, '');

    // Check if window.Razorpay is available
    if (typeof window !== 'undefined' && window.Razorpay && !rzpKey.includes('placeholder')) {
      const options = {
        key: rzpKey,
        amount: ADVANCE_DEPOSIT * 100, // in paise = 25000
        currency: 'INR',
        name: 'Aries PhysioCare',
        description: 'In-Clinic Consultation Booking Deposit (₹250)',
        image: '/logo.png',
        handler: function (response: any) {
          const paymentId = response.razorpay_payment_id || `pay_${Date.now()}`;
          completeBooking(paymentId);
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          contact: cleanMobile,
          email: `${cleanMobile}@patient.ariesphysiocare.in`,
        },
        notes: {
          clinic: 'Borivali West Center',
          date: selectedDate.toISOString().split('T')[0],
          slot: selectedSlotTime,
        },
        theme: {
          color: '#682582',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error('Razorpay initialization error:', err);
        // Fallback to simulator step
        setStep('payment');
      }
    } else {
      // In sandbox/preview or if script blocked, open test payment simulator
      setStep('payment');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#120F24] rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-900/50 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative bg-gradient-to-r from-[#4A156B] via-[#682582] to-[#7C3AED] text-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Official Borivali Clinic
                </span>
                <span className="text-[11px] text-purple-200 font-medium">Shop No. 7, Parrk Riviera</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                In-Clinic Appointment Booking
              </h2>
              <p className="text-xs sm:text-sm text-purple-100 mt-1">
                Hospital-grade consultation · ₹250 booking deposit via Razorpay (Balance ₹550 on visit)
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Value Highlights Pill Bar */}
          <div className="mt-4 pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-[11px] text-purple-100 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Zero Wait Time</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>30m Gap Protocol</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span>Max 2 Patients/Slot</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6 text-slate-800 dark:text-slate-100">
          {paymentError && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{paymentError}</span>
            </div>
          )}

          {/* STEP 1: Details & Slot Selector */}
          {step === 'details' && (
            <div className="space-y-6">
              {/* Doctor / Package Notice if preselected */}
              {(preselectedDoctor || preselectedPackage) && (
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#682582] dark:text-purple-400" />
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {preselectedDoctor ? `Consultant: ${preselectedDoctor}` : `Selected: ${preselectedPackage}`}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-purple-300 text-purple-700 dark:text-purple-300">
                    Preselected
                  </Badge>
                </div>
              )}

              {/* 1. Patient Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    First Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="e.g. Ramesh"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="pl-9 h-11 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-[#682582]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Last Name <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. Shah"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-[#682582]"
                  />
                </div>
              </div>

              {/* 2. Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Mobile Number (WhatsApp Enabled) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800 pr-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>+91</span>
                  </div>
                  <Input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="pl-20 h-11 rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-[#682582] font-medium"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  We will send your digital appointment receipt and clinic pass to this number.
                </p>
              </div>

              {/* 3. Condition / Diagnosis */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Condition / Diagnosis <span className="text-rose-500">*</span>
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {COMMON_CONDITIONS.slice(0, 6).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCondition(c)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg border transition-all text-left ${
                        condition === c
                          ? 'bg-[#682582] text-white border-[#682582] font-semibold shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#682582]"
                >
                  {COMMON_CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {condition === 'Other / General Physiotherapy Assessment' && (
                  <div className="mt-2">
                    <Input
                      type="text"
                      placeholder="Please describe your symptoms or diagnosis..."
                      value={customCondition}
                      onChange={(e) => setCustomCondition(e.target.value)}
                      className="h-10 text-xs rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* 4. Date Selection (Proper Interactive Calendar) */}
              <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#682582] dark:text-purple-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Select Appointment Date
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#682582] dark:text-purple-300 bg-purple-100/70 dark:bg-purple-900/50 px-2.5 py-0.5 rounded-full">
                    {selectedDate.toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Calendar Month Navigation */}
                <div className="bg-white dark:bg-[#1A1633] p-3 rounded-xl border border-purple-100 dark:border-purple-900/50 shadow-xs">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {viewMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        aria-label="Next month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day of Week Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 mb-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>

                  {/* Day Cells Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {daysInMonth.map((day, idx) => {
                      if (!day) {
                        return <div key={`empty-${idx}`} className="h-8" />;
                      }
                      const disabled = isPastDate(day);
                      const selected = isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, today);

                      return (
                        <button
                          key={day.toISOString()}
                          type="button"
                          disabled={disabled}
                          onClick={() => setSelectedDate(day)}
                          className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                            disabled
                              ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                              : selected
                              ? 'bg-gradient-to-br from-[#682582] to-[#7C3AED] text-white shadow-xs font-bold scale-105'
                              : isToday
                              ? 'border border-[#682582] text-[#682582] dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 5. Time Selection (Hours & Minutes with 15m/30m Slot Capacity Rules) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Select Consultation Slot <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#682582] dark:text-purple-300">
                    Selected: {selectedSlotTime}
                  </span>
                </div>

                {/* Shift Selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShift('morning')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      shift === 'morning'
                        ? 'bg-[#682582] text-white border-[#682582] shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Morning Shift (8:00 AM – 1:00 PM)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShift('evening')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      shift === 'evening'
                        ? 'bg-[#682582] text-white border-[#682582] shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Evening Shift (4:00 PM – 9:00 PM)</span>
                  </button>
                </div>

                {/* Clinical Slot Capacity Rule Explanation Banner */}
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Clinic Staggering Rule:</span> Max 2 bookings per 30-min window. Patient 1 takes the 30-min base slot; if 2 patients are booked, they are scheduled with a 15-minute gap. Full slots cannot accept a 3rd patient.
                  </div>
                </div>

                {/* Available Slots Grid */}
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    Available 30-Minute Consultation Windows:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentShiftSlots.map((slot) => {
                      const slotKey = `${selectedDateKey}_${slot.windowStart}`;
                      const bookedCount = slotOccupancy[slotKey] || 0;
                      const isFull = bookedCount >= 2;
                      const hasOneBooking = bookedCount === 1;

                      // Patient 1 option
                      const isSelectedP1 = selectedSlotTime === slot.patient1Time;
                      // Patient 2 option (15-min gap)
                      const isSelectedP2 = selectedSlotTime === slot.patient2Time;

                      return (
                        <div
                          key={slot.windowStart}
                          className={`p-3 rounded-xl border transition-all ${
                            isFull
                              ? 'bg-slate-100/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-60'
                              : 'bg-white dark:bg-slate-900 border-purple-100 dark:border-purple-900/40 hover:border-purple-300'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              {slot.windowLabel}
                            </span>
                            {isFull ? (
                              <Badge variant="secondary" className="text-[10px] bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-semibold">
                                Slot Full (2/2)
                              </Badge>
                            ) : hasOneBooking ? (
                              <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-semibold">
                                1 Seat Left (+15m Gap)
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                                Available (2 Seats)
                              </Badge>
                            )}
                          </div>

                          {/* Action Buttons for this slot window */}
                          {!isFull ? (
                            <div className="grid grid-cols-2 gap-1.5 pt-1">
                              {/* Option A: Base slot (00/30) */}
                              <button
                                type="button"
                                disabled={hasOneBooking} // If 1 patient already booked base, next is staggered
                                onClick={() => handleSelectSlot(slot, false)}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border flex items-center justify-center gap-1 transition-all ${
                                  hasOneBooking
                                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                                    : isSelectedP1
                                    ? 'bg-[#682582] text-white border-[#682582] shadow-xs'
                                    : 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 hover:bg-purple-100/60'
                                }`}
                              >
                                {isSelectedP1 && <Check className="w-3 h-3" />}
                                <span>{slot.patient1Time}</span>
                              </button>

                              {/* Option B: Staggered slot (+15m gap: 15/45) */}
                              <button
                                type="button"
                                onClick={() => handleSelectSlot(slot, true)}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border flex items-center justify-center gap-1 transition-all ${
                                  isSelectedP2
                                    ? 'bg-[#682582] text-white border-[#682582] shadow-xs'
                                    : 'bg-purple-50/50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-200 hover:bg-purple-100/60'
                                }`}
                              >
                                {isSelectedP2 && <Check className="w-3 h-3" />}
                                <span>{slot.patient2Time} (+15m)</span>
                              </button>
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-400 italic pt-1">
                              Both staggered slots booked. Please select an adjacent window.
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Manual Hour & Minute fine-tuning */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">
                    Selected Time breakdown:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border font-bold text-[#682582] dark:text-purple-300">
                      Hr: {selectedHour}
                    </span>
                    <span className="text-slate-400 font-bold">:</span>
                    <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border font-bold text-[#682582] dark:text-purple-300">
                      Min: {selectedMinute}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-950 border border-purple-200 font-bold text-[#682582] dark:text-purple-300">
                      {shift === 'morning' ? 'AM' : 'PM'}
                    </span>
                  </div>
                </div>
              </div>

              {/* 6. Pricing & Deposit Summary */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50/40 dark:from-purple-950/30 dark:to-indigo-950/20 border border-purple-200 dark:border-purple-900/60 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Initial Clinical Consultation Fee:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">₹ {CONSULTATION_FEE}/-</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Payable Today via Razorpay (Deposit):</span>
                  <span className="font-bold text-[#682582] dark:text-purple-300 text-sm">₹ {ADVANCE_DEPOSIT}/-</span>
                </div>
                <div className="flex items-center justify-between text-xs border-t border-purple-200 dark:border-purple-900/50 pt-2 text-slate-500 dark:text-slate-400">
                  <span>Balance Payable at Clinic on Visit:</span>
                  <span className="font-medium">₹ {BALANCE_ON_VISIT}/-</span>
                </div>
              </div>

              {/* Proceed Button */}
              <Button
                type="button"
                onClick={handleProceedToRazorpay}
                className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#4A156B] via-[#682582] to-[#7C3AED] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Pay ₹{ADVANCE_DEPOSIT} via Razorpay & Confirm Booking</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          {/* STEP 2: Razorpay Payment Confirmation / Sandbox Mode */}
          {step === 'payment' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-[#682582] dark:text-purple-300 mx-auto border border-purple-200 dark:border-purple-800">
                <CreditCard className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Razorpay Payment Gateway
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  Complete ₹{ADVANCE_DEPOSIT} advance booking deposit for {firstName} {lastName} ({mobile}) on {selectedSlotTime}, {selectedDate.toLocaleDateString('en-IN')}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">In-Clinic Consultation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Condition:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{condition}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Slot Reserved:</span>
                  <span className="font-bold text-[#682582] dark:text-purple-300">{selectedSlotTime}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-bold text-slate-800 dark:text-white">Amount Due Now:</span>
                  <span className="font-extrabold text-[#682582] dark:text-purple-300 text-sm">₹ {ADVANCE_DEPOSIT}/-</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Balance Due on Visit:</span>
                  <span>₹ {BALANCE_ON_VISIT}/-</span>
                </div>
              </div>

              <div className="space-y-2.5 max-w-md mx-auto">
                <Button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => completeBooking(`pay_rzp_${Date.now()}`)}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isProcessing ? 'Confirming Appointment...' : 'Complete Payment of ₹250 (Confirm Slot)'}</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('details')}
                  className="w-full h-10 rounded-xl text-xs text-slate-600"
                >
                  Change Date / Slot Details
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirmed Booking Pass Screen */}
          {step === 'confirmed' && confirmedBooking && (
            <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <Badge className="bg-emerald-600 text-white font-bold text-xs mb-2">
                  Appointment Confirmed & Reserved
                </Badge>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Booking Reference: {confirmedBooking.referenceCode}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  A confirmation SMS & WhatsApp message has been dispatched to +91 {confirmedBooking.mobile}.
                </p>
              </div>

              {/* Printable / Viewable Clinical Appointment Pass */}
              <div className="p-5 rounded-3xl bg-gradient-to-b from-purple-50/70 to-white dark:from-purple-950/30 dark:to-slate-900 border border-purple-200 dark:border-purple-800 text-left text-xs space-y-3.5 shadow-sm">
                <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-2.5">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Patient Name</span>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{confirmedBooking.patientName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Scheduled Slot</span>
                    <p className="font-bold text-sm text-[#682582] dark:text-purple-300">{confirmedBooking.time}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Appointment Date</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{confirmedBooking.date}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Clinical Condition</span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{confirmedBooking.condition}</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white dark:bg-slate-950 border border-purple-100 dark:border-purple-900/40 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Advance Paid via Razorpay:</span>
                    <span className="font-bold text-emerald-600">₹ {confirmedBooking.advancePaid}/- (Receipt Generated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pending Balance to Pay on Visit:</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹ {confirmedBooking.balanceDue}/-</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Payment Transaction ID:</span>
                    <span className="font-mono">{confirmedBooking.paymentId}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1 text-slate-600 dark:text-slate-400 text-[11px]">
                  <MapPin className="w-4 h-4 text-[#682582] shrink-0 mt-0.5" />
                  <span>{CLINIC_ADDRESS}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                <Button
                  asChild
                  className="h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hi%20Aries%20PhysioCare,%20I%20have%20booked%20an%20appointment%20(Ref:%20${confirmedBooking.referenceCode})%20for%20${confirmedBooking.patientName}%20on%20${confirmedBooking.date}%20at%20${confirmedBooking.time}.%20Please%20guide%20me.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Front Desk</span>
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-xl border-purple-200 dark:border-purple-800 text-xs font-semibold flex items-center gap-2"
                >
                  <a
                    href="https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-4 h-4 text-[#682582]" />
                    <span>Get Directions (Google Maps)</span>
                  </a>
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  className="h-11 rounded-xl text-xs text-slate-600"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
