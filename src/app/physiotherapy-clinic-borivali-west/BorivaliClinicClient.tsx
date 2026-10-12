'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  CheckCircle2,
  Star,
  Award,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  Heart,
  Play,
  X,
  Calendar,
  ShieldCheck,
  Zap,
  Users,
  HeartHandshake,
  Check,
  Mail,
  Navigation,
} from 'lucide-react';
import { trackPhoneCall, trackWhatsAppClick, trackLeadCreated, trackConsultationScheduled } from '@/lib/analytics';
import { submitAppointmentLead } from '@/app/actions/lead-actions';
import { getStoredAttribution } from '@/lib/growth-attribution';

const CLINIC_INFO = {
  name: 'Aries PhysioCare',
  tagline: 'Move Better • Live Pain Free',
  headline: 'Expert Physiotherapy Clinic in Borivali West, Mumbai',
  subheadline: 'Move Better. Live Pain Free. A Healthier You, Every Day.',
  address: 'Shop No. 7, Parrk Riviera, New MHB Colony, Opp. New MHB Ground, Borivali West, Mumbai – 400091, Maharashtra, India',
  phone: '+91 8591981880',
  phoneDisplay: '+91 85919 81880',
  phoneRaw: '918591981880',
  whatsapp: '918591981880',
  email: 'info@ariesphysiocare.in',
  hoursWeekday: 'Monday – Saturday: 8:00 AM – 1:00 PM & 4:00 PM – 9:00 PM',
  hoursSunday: 'Sunday: Closed',
  googleMapsUrl: 'https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091',
  googleRating: 4.9,
  reviewsCount: 285,
};

// 6 Why Choose Cards
const WHY_CHOOSE_ITEMS = [
  {
    title: 'Experienced Physiotherapists',
    description: 'Skilled & certified professionals',
    icon: Award,
  },
  {
    title: 'Personalized Treatment Plans',
    description: 'Tailored to your unique needs',
    icon: Stethoscope,
  },
  {
    title: 'Modern Equipment & Techniques',
    description: 'Latest technology for faster recovery',
    icon: Zap,
  },
  {
    title: 'Holistic Approach',
    description: 'Treating the root cause, not just symptoms',
    icon: HeartHandshake,
  },
  {
    title: 'Convenient Location in Borivali West',
    description: 'Easy access & flexible timings',
    icon: MapPin,
  },
  {
    title: 'Trusted by 1000+ Patients',
    description: 'Proven results and happy patients',
    icon: ShieldCheck,
  },
];

// 8 Treatment Cards
const TREATMENTS = [
  {
    id: 'back-neck-pain',
    title: 'Back & Neck Pain Treatment',
    description: 'Relieve pain and improve mobility.',
    image: '/images/blog/spine/low-back-pain-causes-symptoms-treatment-aries-physiocare.webp',
    link: '/services/physiotherapy',
  },
  {
    id: 'knee-pain',
    title: 'Knee Pain Physiotherapy',
    description: 'Recovery and strength for better movement.',
    image: '/images/physiotherapy/program-knee.jpg',
    link: '/services/physiotherapy',
  },
  {
    id: 'sports-injury',
    title: 'Sports Injury Rehabilitation',
    description: 'Get back to your game stronger.',
    image: '/images/physiotherapy/program-sports.jpg',
    link: '/services/physiotherapy',
  },
  {
    id: 'post-surgical',
    title: 'Post-Surgical Rehabilitation',
    description: 'Faster recovery with expert care.',
    image: '/images/physiotherapy/program-post-surgical.jpg',
    link: '/services/physiotherapy',
  },
  {
    id: 'shoulder-pain',
    title: 'Shoulder Pain Treatment',
    description: 'Treat stiffness and improve flexibility.',
    image: '/images/blog/shoulder/frozen-shoulder-capsular-release-physiotherapy-aries-physiocare.webp',
    link: '/services/physiotherapy',
  },
  {
    id: 'neurological',
    title: 'Neurological Physiotherapy',
    description: 'Care for stroke, paralysis and nerve conditions.',
    image: '/images/physiotherapy/program-neuro.jpg',
    link: '/services/physiotherapy',
  },
  {
    id: 'ergonomics',
    title: 'Workplace Ergonomics & Pain Prevention',
    description: 'Stay pain-free at work.',
    image: '/images/blog/spine/postural-back-pain-desk-workers-ergonomics-aries-physiocare.webp',
    link: '/services/physiotherapy',
  },
  {
    id: 'womens-health',
    title: "Women's Health Physiotherapy",
    description: 'Specialized care for pre & postnatal health.',
    image: '/images/physiotherapy/physio-cta-sunrise.jpg',
    link: '/services/physiotherapy',
  },
];

// 4 Walkthrough Facilities
const WALKTHROUGH_FACILITIES = [
  {
    id: 'reception',
    title: 'Reception & Waiting Area',
    description: 'Comfortable and welcoming space',
    image: '/images/clinics/aries-flagship-reception.jpg',
  },
  {
    id: 'treatment-rooms',
    title: 'Advanced Treatment Rooms',
    description: 'Modern equipment & hygiene',
    image: '/images/clinics/flagship-treatment-2.png',
  },
  {
    id: 'exercise-zone',
    title: 'Rehabilitation & Exercise Zone',
    description: 'State-of-the-art facilities',
    image: '/images/clinics/flagship-spinal-4.png',
  },
  {
    id: 'clean-safe',
    title: 'Clean & Safe Environment',
    description: 'Your health & safety is our priority',
    image: '/images/clinics/flagship-consult-3.png',
  },
];

// 4 Pricing Packages
const PRICING_PACKAGES = [
  {
    title: 'Initial Consultation',
    price: '₹800',
    popular: false,
    features: [
      'Detailed assessment',
      'Personalized treatment plan',
      '30-45 minutes session',
    ],
    buttonText: 'Book Now',
  },
  {
    title: 'Physiotherapy Session',
    subtitle: '(Per Visit)',
    price: '₹1,200',
    popular: false,
    features: [
      'One-on-one treatment',
      'Advanced techniques',
      '45 minutes session',
    ],
    buttonText: 'Book Now',
  },
  {
    title: 'Rehabilitation Package',
    subtitle: '(10 Sessions)',
    price: '₹10,000',
    popular: true,
    badge: 'Most Popular',
    features: [
      'Personalized treatment plan',
      'Flexible scheduling',
      'Better results, more savings',
    ],
    buttonText: 'Book Package',
  },
  {
    title: 'Sports Recovery Package',
    subtitle: '(10 Sessions)',
    price: '₹12,000',
    popular: false,
    features: [
      'Specialized sports care',
      'Injury prevention',
      'Performance improvement',
    ],
    buttonText: 'Book Package',
  },
];

// 3 Patient Testimonials
const PATIENT_TESTIMONIALS = [
  {
    name: 'Rohit Sharma',
    condition: 'Back Pain Treatment',
    rating: 5,
    avatar: '/images/avatar_m1.png',
    text: 'Excellent treatment and professional staff. My back pain is completely gone now. Highly recommended!',
  },
  {
    name: 'Priya Mehta',
    condition: 'Knee Rehabilitation',
    rating: 5,
    avatar: '/images/avatar_f1.png',
    text: 'Very comfortable and clean clinic. The physiotherapists are knowledgeable and caring.',
  },
  {
    name: 'Amit Desai',
    condition: 'Sports Injury Recovery',
    rating: 5,
    avatar: '/images/avatar_m2.png',
    text: 'Great experience! Personalized treatment and real results. Best physiotherapy clinic in Borivali West.',
  },
];

// 5 FAQs
const FAQS = [
  {
    q: 'What conditions do you treat at Aries PhysioCare?',
    a: 'We treat a comprehensive range of conditions including back and neck pain, slip disc, sciatica, knee osteoarthritis, frozen shoulder, post-surgical recovery (TKR/THR/ACL), sports injuries, stroke rehabilitation, postural strains, and geriatric mobility issues.',
  },
  {
    q: 'How long does a typical physiotherapy session last?',
    a: 'A standard clinical session typically lasts between 40 to 50 minutes. This includes dedicated one-on-one manual physical therapy, targeted advanced modalities (laser, ultrasound, traction), and supervised functional exercise training.',
  },
  {
    q: 'Do I need a doctor’s referral?',
    a: 'No doctor referral is required. Our qualified senior physiotherapists conduct an independent comprehensive clinical assessment, postural evaluation, and diagnostic review before commencing any treatment protocol.',
  },
  {
    q: 'Are home physiotherapy services available?',
    a: 'Yes! If you or a loved one cannot travel to the clinic due to acute pain, post-surgical recovery, or mobility limitations, our certified physiotherapists provide doorstep home physiotherapy visits across Borivali West, Borivali East, Kandivali, and Dahisar.',
  },
  {
    q: 'What are the clinic timings?',
    a: 'Our Borivali West clinic operates Monday through Saturday in two daily sessions: Morning Session from 8:00 AM to 1:00 PM, and Evening Session from 4:00 PM to 9:00 PM. The clinic is closed on Sundays for sanitization.',
  },
];

export default function BorivaliClinicClient() {
  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Physiotherapy Consultation');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Walkthrough Media State
  const [selectedWalkthrough, setSelectedWalkthrough] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBookingSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!date) {
      setFormError('Please select your preferred appointment date.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const attr = getStoredAttribution();
      const leadPayload = {
        fullName: fullName.trim(),
        phone: cleanPhone,
        email: `${cleanPhone}@patient.ariesphysiocare.in`,
        state: 'Maharashtra',
        city: 'Mumbai',
        area: 'Borivali West',
        address: CLINIC_INFO.address,
        landmark: 'Opposite New MHB Ground',
        service: `${service} (Borivali West Clinic)`,
        date: new Date(date),
        time: 'Preferred Clinical Slot',
        condition: `${service} - Direct Borivali Landing Inquiry`,
        country: 'India',
        utmSource: attr.utmSource || 'website_borivali_redesign',
        utmMedium: attr.utmMedium || 'organic_direct',
        utmCampaign: attr.utmCampaign || 'borivali_west_flagship',
        landingPage: '/physiotherapy-clinic-borivali-west',
        growthEngine: 'PATIENT' as const,
      };

      const result = await submitAppointmentLead(leadPayload);

      if (result.success) {
        const fallbackId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().slice(0, 6).toUpperCase() : Date.now().toString().slice(-6);
        const refCode = (result as any).referenceCode || (result as any).data?.referenceCode || `AP-BW-${fallbackId}`;
        setBookingSuccess(refCode);
        trackLeadCreated(refCode, { service, area: 'Borivali West' });
        trackConsultationScheduled(refCode, { date, service });
      } else {
        setFormError(result.error || 'Failed to submit booking. Please call +91 8591981880.');
      }
    } catch (err: any) {
      setFormError(err?.message || 'Network error. Please call +91 8591981880 directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToBooking = (preselectedService?: string) => {
    if (preselectedService) {
      setService(preselectedService);
    }
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#1E293B] font-body selection:bg-[#F3C64F] selection:text-[#1F1604]">
      {/* ============================================================ */}
      {/* 1. HEADER / NAVBAR                                           */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#F0E6D2] shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo with Aries Emblem */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden shadow-md border-2 border-[#D4A017] flex-shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/physiotherapy/aries-official-emblem.png"
                alt="Aries PhysioCare Emblem"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#111827] leading-none">
                ARIES <span className="text-[#C88A1E]">PhysioCare</span>
              </span>
              <span className="text-[11px] font-medium text-[#78716C] tracking-wider mt-1">
                Move Better • Live Pain Free
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#4B5563]">
            <Link href="/" className="hover:text-[#C88A1E] transition-colors">Home</Link>
            <Link href="/about" className="hover:text-[#C88A1E] transition-colors">About Us</Link>
            <Link href="/services" className="hover:text-[#C88A1E] transition-colors">Services</Link>
            <Link href="/conditions" className="hover:text-[#C88A1E] transition-colors">Conditions</Link>
            <a href="#patient-reviews" className="hover:text-[#C88A1E] transition-colors">Patient Stories</a>
            <a href="#clinic-walkthrough" className="hover:text-[#C88A1E] transition-colors">Gallery</a>
            <Link href="/blogs" className="hover:text-[#C88A1E] transition-colors">Blog</Link>
            <a href="#clinic-location" className="hover:text-[#C88A1E] transition-colors">Contact</a>
          </nav>

          {/* Header Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToBooking()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] hover:from-[#E5B63E] hover:to-[#C68710] shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-amber-50"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-slate-800 rounded transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`h-0.5 w-full bg-slate-800 rounded transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-slate-800 rounded transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#F0E6D2] px-6 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">Home</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">About Us</Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">Services</Link>
            <Link href="/conditions" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">Conditions</Link>
            <a href="#patient-reviews" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">Patient Stories</a>
            <a href="#clinic-walkthrough" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">Gallery</a>
            <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">Blog</Link>
            <a href="#clinic-location" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 text-slate-800 font-semibold">Contact</a>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* 2. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden pt-8 pb-14 lg:pt-14 lg:pb-20 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE1]">
        {/* Subtle decorative golden ambient waves */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-br from-amber-200/25 to-yellow-100/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-[450px] h-[450px] bg-gradient-to-tr from-amber-100/30 to-amber-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow */}
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#A07010] uppercase bg-[#FEF9E7] border border-[#F3C64F]/50 px-3.5 py-1.5 rounded-full">
                  PREMIUM PHYSIOTHERAPY CARE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#111827] leading-[1.12] tracking-tight">
                Expert Physiotherapy<br />
                Clinic in<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C98B19] via-[#DDA432] to-[#B3750F]">
                  Borivali West, Mumbai
                </span>
              </h1>

              {/* Subhead Tagline */}
              <p className="text-lg sm:text-xl font-bold text-[#1F2937] leading-snug">
                Move Better. Live Pain Free. A Healthier You, Every Day.
              </p>

              {/* Description */}
              <p className="text-base text-[#4B5563] leading-relaxed max-w-xl">
                At Aries PhysioCare, we provide advanced physiotherapy treatment with personalized care to help you recover, restore movement and live a healthier, pain-free life. Trusted by hundreds in Borivali West.
              </p>

              {/* 4 Feature Points Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-1 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-[#C88A1E] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F2937]">Experienced Physiotherapists</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-[#C88A1E] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F2937]">Personalized Treatment Plans</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-[#C88A1E] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F2937]">Advanced Equipment & Facility</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-[#C88A1E] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-semibold text-[#1F2937]">Trusted by 1000+ Patients</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToBooking()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] hover:from-[#E5B63E] hover:to-[#C68710] shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/35 transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  onClick={() => trackPhoneCall(CLINIC_INFO.phone, { source: 'hero_primary' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-base text-[#111827] bg-white border border-[#E5BD60] hover:bg-amber-50/50 shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Phone className="w-4 h-4 text-[#C88A1E]" />
                  <span>Call Now: {CLINIC_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual with Gold Frame & Handwritten Note */}
            <div className="lg:col-span-5 relative">
              {/* Handwritten script note above right */}
              <div className="absolute -top-7 right-3 z-20 pointer-events-none select-none">
                <span className="font-script text-2xl sm:text-3xl font-bold text-[#A87115] -rotate-6 block drop-shadow-sm">
                  Your Movement, Our Priority
                </span>
              </div>

              {/* Clinic Hero Image in Elegant Gold Double Border */}
              <div className="relative p-2.5 rounded-[28px] bg-gradient-to-b from-[#F7DF9B] via-[#E2B755] to-[#C99120] shadow-[0_20px_50px_rgba(201,139,25,0.2)]">
                <div className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-slate-900 group">
                  <Image
                    src="/images/clinics/flagship-clinic-main.png"
                    alt="Aries PhysioCare Borivali West Clinic Reception"
                    fill
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white group/btn"
                    aria-label="Watch Virtual Clinic Tour"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#111827]/80 group-hover/btn:bg-[#C88A1E] text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/btn:scale-110 border border-white/20">
                      <Play className="w-6 h-6 fill-white ml-1" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-white/95 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      Watch Clinic Tour
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Metric Stats Bar */}
          <div className="mt-12 pt-8 border-t border-[#F0E6D2]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/70 border border-[#F3E8D2] shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#111827]">1000+</span>
                <span className="text-xs sm:text-sm font-semibold text-[#78716C] mt-1">Happy Patients</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/70 border border-[#F3E8D2] shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#111827]">5+ Years</span>
                <span className="text-xs sm:text-sm font-semibold text-[#78716C] mt-1">Of Experience</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/70 border border-[#F3E8D2] shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Modern Clinic</span>
                <span className="text-xs sm:text-sm font-semibold text-[#78716C] mt-1">& Equipment</span>
              </div>
              <div className="flex flex-col items-center p-3 rounded-2xl bg-white/70 border border-[#F3E8D2] shadow-sm">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#111827]">Personalized</span>
                <span className="text-xs sm:text-sm font-semibold text-[#78716C] mt-1">Care for All</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INSTANT APPOINTMENT BOOKING WIDGET                         */}
      {/* ============================================================ */}
      <section id="booking-section" className="py-14 lg:py-20 bg-white border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Visual & Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#A07010] uppercase bg-[#FEF9E7] border border-[#F3C64F]/50 px-3.5 py-1.5 rounded-full inline-block">
                GET STARTED TODAY!
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight leading-tight">
                Instant Appointment Booking
              </h2>

              <p className="text-base text-[#4B5563] leading-relaxed">
                Book your consultation with our expert physiotherapists in just a few clicks.
              </p>

              {/* 3 Steps / Guarantees */}
              <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#1F2937]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-[#C88A1E] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Quick & Easy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-[#C88A1E] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Choose Date</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-[#C88A1E] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>Get Confirmation</span>
                </div>
              </div>

              {/* Supportive Photo */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-[#F0E6D2] group">
                <Image
                  src="/images/clinics/care-therapist-clean.png"
                  alt="Aries PhysioCare Certified Physiotherapist"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right Column: High-Converting Booking Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#F0E6D2] shadow-xl overflow-hidden">
                {/* Dark Navy Header Bar */}
                <div className="bg-[#0F1E36] text-white px-6 py-4 flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-[#F3C64F]" />
                  <h3 className="text-lg font-bold tracking-tight">Book Your Appointment</h3>
                </div>

                <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-5">
                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
                      {formError}
                    </div>
                  )}

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-full-name" className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      id="booking-full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D8C3] bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8981A] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-phone" className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-sm font-semibold text-slate-500">+91</span>
                      <input
                        id="booking-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="85919 81880"
                        required
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E2D8C3] bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D8981A] focus:border-transparent text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Select Service Dropdown */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-service" className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                      Select Service
                    </label>
                    <select
                      id="booking-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D8C3] bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D8981A] focus:border-transparent text-sm transition-all"
                    >
                      <option value="Physiotherapy Consultation">Physiotherapy Consultation (₹800)</option>
                      <option value="Back & Neck Pain Treatment">Back & Neck Pain Treatment</option>
                      <option value="Knee Pain Physiotherapy">Knee Pain Physiotherapy</option>
                      <option value="Sports Injury Rehabilitation">Sports Injury Rehabilitation</option>
                      <option value="Post-Surgical Rehabilitation">Post-Surgical Rehabilitation (TKR/THR/ACL)</option>
                      <option value="Shoulder Pain Treatment">Shoulder Pain Treatment</option>
                      <option value="Neurological Physiotherapy">Neurological Physiotherapy (Stroke/Paralysis)</option>
                      <option value="Workplace Ergonomics & Posture">Workplace Ergonomics & Posture</option>
                      <option value="Home Visit Physiotherapy">Home Visit Physiotherapy (Borivali & nearby)</option>
                    </select>
                  </div>

                  {/* Select Date */}
                  <div className="space-y-1.5">
                    <label htmlFor="booking-date" className="block text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                      Select Date
                    </label>
                    <input
                      id="booking-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-xl border border-[#E2D8C3] bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D8981A] focus:border-transparent text-sm transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-base text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] hover:from-[#E5B63E] hover:to-[#C68710] shadow-md shadow-amber-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Confirming Appointment...' : 'Book Appointment'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Security Assurance */}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#78716C] pt-1">
                    <Lock className="w-3.5 h-3.5 text-[#C88A1E]" />
                    <span>Your information is safe with us. No spam, ever.</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. WHY CHOOSE ARIES PHYSIOCARE IN BORIVALI WEST              */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Why Choose Aries PhysioCare in Borivali West?
          </h2>
          <p className="mt-3 text-sm sm:text-base font-semibold text-[#8C6D23] max-w-2xl mx-auto">
            Advanced Care | Experienced Professionals | Better Results
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-center">
            {WHY_CHOOSE_ITEMS.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-8 rounded-2xl bg-white border border-[#F0E6D2] shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFF8E7] to-[#FFEEC2] border border-[#F3C64F] text-[#B87B14] flex items-center justify-center shadow-sm mb-5">
                    <IconComp className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111827] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#4B5563] leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. PHYSIOTHERAPY TREATMENTS AT BORIVALI WEST                 */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                Physiotherapy Treatments at Borivali West
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4B5563] max-w-3xl leading-relaxed">
                Comprehensive physiotherapy care for all age groups and conditions. Get personalized treatment from expert physiotherapists at Aries PhysioCare.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111827] hover:text-[#C88A1E] px-4 py-2 rounded-xl border border-[#E2D8C3] hover:border-[#D8981A] transition-all flex-shrink-0 self-start sm:self-auto"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8 Treatment Cards (4 x 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TREATMENTS.map((treatment) => (
              <div
                key={treatment.id}
                className="rounded-2xl border border-[#F0E6D2] bg-[#FFFDF9] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
              >
                {/* Photo Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-[#111827] leading-snug mb-1.5">
                      {treatment.title}
                    </h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {treatment.description}
                    </p>
                  </div>

                  {/* Dark Pill CTA Button */}
                  <button
                    onClick={() => scrollToBooking(treatment.title)}
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-[#0F1E36] hover:bg-[#1E3A5F] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. CLINIC WALKTHROUGH & VIRTUAL TOUR                         */}
      {/* ============================================================ */}
      <section id="clinic-walkthrough" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Aries PhysioCare Borivali West Clinic Walkthrough
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4B5563]">
              Take a virtual tour of our modern clinic and see our facilities, treatment rooms and equipment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Big Interactive Tour Preview Card */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#E5BD60]/60 bg-slate-900 group">
                <Image
                  src={WALKTHROUGH_FACILITIES[selectedWalkthrough].image}
                  alt={WALKTHROUGH_FACILITIES[selectedWalkthrough].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Central Play Tour Button */}
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white group/play"
                  aria-label="Open Virtual Video Tour Modal"
                >
                  <div className="w-16 h-16 rounded-full bg-[#111827]/85 group-hover/play:bg-[#C88A1E] text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover/play:scale-110 border border-white/20">
                    <Play className="w-7 h-7 fill-white ml-1" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-black/60 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
                    Watch Video Tour
                  </span>
                </button>

                {/* Bottom label */}
                <div className="absolute bottom-4 left-5 right-5 text-white pointer-events-none">
                  <h4 className="text-lg font-bold drop-shadow-md">
                    {WALKTHROUGH_FACILITIES[selectedWalkthrough].title}
                  </h4>
                  <p className="text-xs text-white/90 drop-shadow-md">
                    {WALKTHROUGH_FACILITIES[selectedWalkthrough].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: 4 Facilities Cards */}
            <div className="lg:col-span-5 space-y-4">
              {WALKTHROUGH_FACILITIES.map((facility, idx) => (
                <button
                  type="button"
                  key={facility.id}
                  onClick={() => setSelectedWalkthrough(idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                    selectedWalkthrough === idx
                      ? 'bg-white border-[#D8981A] shadow-md ring-2 ring-[#D8981A]/30'
                      : 'bg-white/80 border-[#F0E6D2] hover:bg-white hover:border-[#D8981A]/50'
                  }`}
                >
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#111827]">{facility.title}</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">{facility.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. CLINIC FEES & REHABILITATION PACKAGES                     */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Clinic Fees & Rehabilitation Packages
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4B5563] max-w-2xl mx-auto">
            Affordable and transparent pricing for high-quality physiotherapy care.
          </p>

          {/* 4 Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {PRICING_PACKAGES.map((pkg) => (
              <div
                key={pkg.title}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-[#FFFDF9] border-2 border-[#D8981A] shadow-xl shadow-amber-500/15 -translate-y-2'
                    : 'bg-white border border-[#F0E6D2] shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Most Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] shadow-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-[#C88A1E] flex items-center justify-center">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#111827]">
                      {pkg.title} {pkg.subtitle && <span className="block text-xs font-normal text-slate-500">{pkg.subtitle}</span>}
                    </h3>
                  </div>

                  <div className="mt-4 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#111827]">
                      {pkg.price}
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#4B5563] pb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C88A1E] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => scrollToBooking(pkg.title)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-[#F3C64F] to-[#D8981A] text-[#1F1604] shadow-md hover:from-[#E5B63E] hover:to-[#C68710]'
                      : 'bg-[#F9F6F0] hover:bg-[#F3EAD8] text-[#111827] border border-[#E5BD60]/60'
                  }`}
                >
                  <span>{pkg.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Value Propositions Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-[#F0E6D2] text-xs sm:text-sm font-bold text-[#4B5563]">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C88A1E]" />
              <span>Transparent Pricing</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4 text-[#C88A1E]" />
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4 text-[#C88A1E]" />
              <span>Personalized Packages</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C88A1E]" />
              <span>No Hidden Charges</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. WHAT OUR PATIENTS SAY (TESTIMONIALS)                      */}
      {/* ============================================================ */}
      <section id="patient-reviews" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                What Our Patients Say About Aries PhysioCare
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4B5563]">
                Real stories. Real results. Hear from our happy patients.
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111827] hover:text-[#C88A1E] px-4 py-2 rounded-xl border border-[#E2D8C3] hover:border-[#D8981A] transition-all flex-shrink-0 self-start sm:self-auto"
            >
              <span>View All Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PATIENT_TESTIMONIALS.map((review) => (
              <div
                key={review.name}
                className="p-7 rounded-2xl bg-white border border-[#F0E6D2] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div>
                  {/* 5 Stars and Google Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((starNum) => (
                        <Star key={`star-${review.name}-${starNum}`} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {/* Google G icon */}
                    <div className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs text-[#4285F4]">
                      G
                    </div>
                  </div>

                  <p className="text-sm text-[#374151] leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#F5EFE1]">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-amber-100 flex-shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">{review.name}</h4>
                    <span className="text-xs text-[#8C6D23] font-medium block">{review.condition}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. FIND ARIES PHYSIOCARE BORIVALI WEST (MAP & NAP)           */}
      {/* ============================================================ */}
      <section id="clinic-location" className="py-16 lg:py-24 bg-white border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Find Aries PhysioCare Borivali West
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4B5563]">
              Visit our clinic for expert physiotherapy care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Card: Dark Navy Luxury Contact Box */}
            <div className="lg:col-span-5 rounded-3xl bg-[#0B1E36] text-white p-7 sm:p-9 flex flex-col justify-between shadow-2xl border border-amber-500/20">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F3C64F] mb-1 block">
                    BORIVALI WEST FLAGSHIP
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight">
                    Aries PhysioCare Clinic
                  </h3>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-[#F3C64F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Address</span>
                    <p className="text-sm text-slate-200 leading-relaxed mt-1">
                      {CLINIC_INFO.address}
                    </p>
                    <span className="text-xs text-[#F3C64F] font-semibold mt-1 block">
                      Landmark: Opposite New MHB Ground
                    </span>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-[#F3C64F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Call Us</span>
                    <a
                      href={`tel:${CLINIC_INFO.phoneRaw}`}
                      onClick={() => trackPhoneCall(CLINIC_INFO.phone, { source: 'location_box' })}
                      className="text-base font-bold text-white hover:text-[#F3C64F] transition-colors mt-1 block"
                    >
                      {CLINIC_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 text-[#F3C64F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Us</span>
                    <a
                      href={`mailto:${CLINIC_INFO.email}`}
                      className="text-sm text-slate-200 hover:text-[#F3C64F] transition-colors mt-1 block"
                    >
                      {CLINIC_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] hover:from-[#E5B63E] hover:to-[#C68710] shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={`tel:${CLINIC_INFO.phoneRaw}`}
                  onClick={() => trackPhoneCall(CLINIC_INFO.phone, { source: 'location_call' })}
                  className="py-3 px-5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#F3C64F]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Right Card: Google Map Embed */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#F0E6D2] shadow-xl min-h-[350px] relative bg-slate-100">
              <iframe
                title="Aries PhysioCare Borivali West Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.432857850893!2d72.84461131490333!3d19.231200086999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b13a772b1587%3A0x6b29f99bc7b67b1!2sParrk%20Riviera%2C%20New%20MHB%20Colony%2C%20Borivali%20West%2C%20Mumbai%2C%20Maharashtra%20400091!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FREQUENTLY ASKED QUESTIONS                               */}
      {/* ============================================================ */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#F0E6D2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#4B5563]">
              Find answers to common questions about our services, treatments and appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Visual with Script Quote */}
            <div className="lg:col-span-5 relative hidden lg:block">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-[#E5BD60]/50 group">
                <Image
                  src="/images/clinics/hero-clinic-visual-full.png"
                  alt="Aries PhysioCare Patient Care"
                  fill
                  sizes="450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Script Accent Note */}
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="font-script text-3xl font-bold text-[#F3C64F] block drop-shadow-md">
                    Better Movement, Brighter Lives
                  </span>
                  <div className="flex justify-center mt-1">
                    <Heart className="w-5 h-5 text-[#F3C64F] fill-[#F3C64F]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Accordion Questions */}
            <div className="lg:col-span-7 space-y-3.5">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-[#F0E6D2] bg-white overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-[#111827] text-sm sm:text-base hover:text-[#C88A1E] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <div className="w-6 h-6 rounded-full bg-amber-50 text-[#C88A1E] flex items-center justify-center flex-shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-[#4B5563] leading-relaxed border-t border-[#F8F3EA] bg-[#FFFDF9]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="bg-[#FFFDF9] text-[#4B5563] border-t border-[#F0E6D2] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#F0E6D2]">
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4A017] flex-shrink-0">
                  <Image
                    src="/images/physiotherapy/aries-official-emblem.png"
                    alt="Aries PhysioCare Emblem"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-[#111827]">
                  ARIES <span className="text-[#C88A1E]">PhysioCare</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
                Expert physiotherapy care in Borivali West, Mumbai. Helping you move better, live pain-free, and enjoy a healthier, stronger life.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 text-xs font-bold text-[#8C6D23]">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#111827]">FB</a>
                <span>•</span>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#111827]">IG</a>
                <span>•</span>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#111827]">YT</a>
                <span>•</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#111827]">IN</a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="/" className="hover:text-[#C88A1E] transition-colors">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#C88A1E] transition-colors">About Us</Link></li>
                <li><Link href="/services" className="hover:text-[#C88A1E] transition-colors">Services</Link></li>
                <li><Link href="/conditions" className="hover:text-[#C88A1E] transition-colors">Conditions</Link></li>
                <li><a href="#patient-reviews" className="hover:text-[#C88A1E] transition-colors">Patient Stories</a></li>
                <li><a href="#clinic-walkthrough" className="hover:text-[#C88A1E] transition-colors">Gallery</a></li>
                <li><Link href="/blogs" className="hover:text-[#C88A1E] transition-colors">Blog</Link></li>
                <li><a href="#clinic-location" className="hover:text-[#C88A1E] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Col 3: Our Services */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
                Our Services
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link href="/services/physiotherapy" className="hover:text-[#C88A1E] transition-colors">Back & Neck Pain</Link></li>
                <li><Link href="/services/physiotherapy" className="hover:text-[#C88A1E] transition-colors">Knee Pain</Link></li>
                <li><Link href="/services/physiotherapy" className="hover:text-[#C88A1E] transition-colors">Sports Injury Rehab</Link></li>
                <li><Link href="/services/physiotherapy" className="hover:text-[#C88A1E] transition-colors">Post-Surgical Rehab</Link></li>
                <li><Link href="/services/physiotherapy" className="hover:text-[#C88A1E] transition-colors">Neurological Physio</Link></li>
                <li><Link href="/services/physiotherapy" className="hover:text-[#C88A1E] transition-colors">Women’s Health</Link></li>
                <li><Link href="/services/physiotherapy" className="hover:text-[#C88A1E] transition-colors">Workplace Ergonomics</Link></li>
                <li><Link href="/services" className="hover:text-[#C88A1E] transition-colors font-semibold">All Services →</Link></li>
              </ul>
            </div>

            {/* Col 4: Contact Us & Clinic Timings */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                  Contact Us
                </h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Shop No. 7, Parrk Riviera, New MHB Colony, Opp. New MHB Ground, Borivali West, Mumbai – 400091
                </p>
                <p className="text-xs font-bold text-[#111827] mt-1.5">
                  Call: {CLINIC_INFO.phoneDisplay}
                </p>
                <p className="text-xs text-[#6B7280]">
                  Email: {CLINIC_INFO.email}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  Clinic Timings
                </h4>
                <p className="text-xs text-[#6B7280]">
                  Mon – Sat: 8:00 AM – 1:00 PM & 4:00 PM – 9:00 PM<br />
                  Sunday: Closed
                </p>
              </div>

              <button
                onClick={() => scrollToBooking()}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] hover:from-[#E5B63E] hover:to-[#C68710] shadow-sm transition-all"
              >
                Book Appointment →
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-3">
            <p>© {new Date().getFullYear()} Aries PhysioCare. All Rights Reserved.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="hover:text-[#111827] transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-[#111827] transition-colors">Terms & Conditions</Link>
              <Link href="/sitemap.xml" className="hover:text-[#111827] transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* 12. VIRTUAL TOUR VIDEO MODAL                                  */}
      {/* ============================================================ */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#0F1E36] rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 text-white">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-[#F3C64F] fill-[#F3C64F]" />
                <h3 className="font-bold text-base">Aries PhysioCare Borivali West — Virtual Clinic Tour</h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tour Facility Image Showcase & Carousel */}
            <div className="p-6">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black shadow-lg">
                <Image
                  src={WALKTHROUGH_FACILITIES[selectedWalkthrough].image}
                  alt={WALKTHROUGH_FACILITIES[selectedWalkthrough].title}
                  fill
                  sizes="900px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <span className="text-xs uppercase font-bold text-[#F3C64F] tracking-wider block">
                      Facility Showcase {selectedWalkthrough + 1} of {WALKTHROUGH_FACILITIES.length}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-white">
                      {WALKTHROUGH_FACILITIES[selectedWalkthrough].title}
                    </h4>
                    <p className="text-sm text-slate-200 mt-1">
                      {WALKTHROUGH_FACILITIES[selectedWalkthrough].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {WALKTHROUGH_FACILITIES.map((facility, idx) => (
                  <button
                    key={facility.id}
                    onClick={() => setSelectedWalkthrough(idx)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      selectedWalkthrough === idx ? 'border-[#F3C64F] scale-105 shadow-md' : 'border-white/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={facility.image}
                      alt={facility.title}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-white">
                <div className="text-xs text-slate-300">
                  📍 Shop No. 7, Parrk Riviera, New MHB Colony, Borivali West
                </div>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    scrollToBooking();
                  }}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] hover:from-[#E5B63E] hover:to-[#C68710] shadow-md"
                >
                  Book In-Person Consultation →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 13. BOOKING CONFIRMATION MODAL                                */}
      {/* ============================================================ */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 border border-[#E5BD60] shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#111827]">Appointment Requested!</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                Thank you, <span className="font-bold text-[#111827]">{fullName}</span>. Your clinical consultation request has been received by our Borivali West triage team.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#F0E6D2] space-y-2 text-left text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-[#F5EFE1]">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-extrabold text-[#A07010] font-mono text-sm">{bookingSuccess}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#F5EFE1]">
                <span className="text-slate-500">Selected Service:</span>
                <span className="font-semibold text-slate-800">{service}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Clinic Location:</span>
                <span className="font-semibold text-slate-800">Shop No. 7, Parrk Riviera, Borivali West</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=${encodeURIComponent(
                  `Hello Aries PhysioCare Borivali West! I have submitted appointment booking ${bookingSuccess} for ${service}. Please confirm my slot.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(CLINIC_INFO.whatsapp, { source: 'booking_modal_confirm' })}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Instant WhatsApp Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setBookingSuccess(null)}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 14. MOBILE STICKY BOTTOM ACTION BAR                          */}
      {/* ============================================================ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F0E6D2] p-3 shadow-2xl flex items-center gap-3">
        <a
          href={`tel:${CLINIC_INFO.phoneRaw}`}
          onClick={() => trackPhoneCall(CLINIC_INFO.phone, { source: 'mobile_sticky_bar' })}
          className="flex-1 py-3 px-3 rounded-xl font-bold text-xs text-center text-[#111827] bg-[#FAF7F2] border border-[#E5BD60] flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#C88A1E]" />
          <span>Call Now</span>
        </a>
        <button
          onClick={() => scrollToBooking()}
          className="flex-[1.5] py-3 px-3 rounded-xl font-bold text-xs text-center text-[#1F1604] bg-gradient-to-r from-[#F3C64F] to-[#D8981A] shadow-md flex items-center justify-center gap-1.5"
        >
          <span>Book Appointment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
