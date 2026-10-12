'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Star,
  Award,
  Stethoscope,
  Sparkles,
  ChevronRight,
  User,
  ArrowRight,
  ExternalLink,
  Activity,
  Zap,
  Heart,
  ChevronDown,
  Navigation,
  Check,
  LocateFixed,
  Building2,
  HeartHandshake,
  Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import BorivaliAppointmentModal from './BorivaliAppointmentModal';

export default function BorivaliClinicClient() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  // Home care pincode search state
  const [searchLocation, setSearchLocation] = useState('Borivali West, Mumbai');
  const [activeAreaChip, setActiveAreaChip] = useState('Borivali West');

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOpenBooking = (doctor?: string, pkg?: string) => {
    setSelectedDoctor(doctor);
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
    setSelectedDoctor(undefined);
    setSelectedPackage(undefined);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-slate-800 selection:bg-purple-200 selection:text-purple-950 flex flex-col font-sans">
      {/* ── Official Site Header ────────────────────────────────────── */}
      <Header />

      {/* ── BREADCRUMB NAVIGATION ───────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-slate-50/80 border-b border-purple-100/60 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#682582] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/locations" className="hover:text-[#682582] transition-colors">Locations</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/services/physiotherapy/mumbai" className="hover:text-[#682582] transition-colors">Mumbai</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#682582] font-semibold">Borivali West Center</span>
        </div>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-8 pb-14 md:py-16 bg-gradient-to-b from-purple-50/80 via-white to-white border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#682582] text-white shadow-xs">
                  <Building2 className="w-3.5 h-3.5" /> Official Clinic Center
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-[#682582] border border-purple-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#682582]" /> Verified PhysioCare Center
                </span>
              </div>

              {/* H1 Heading */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2E0B5B] tracking-tight leading-[1.15]">
                  Aries PhysioCare <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-[#5E2E8C] via-[#682582] to-[#8B5CF6] bg-clip-text text-transparent">
                    Borivali West Center
                  </span>
                </h1>
                <p className="text-base sm:text-lg font-bold text-slate-700 mt-2">
                  Expert Physiotherapy. Integrated Wellness. A Healthier You.
                </p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  The Healing Touch · Hospital-Grade Integrated Physiotherapy & Advanced Clinical Wellness
                </p>
              </div>

              {/* Stats & Hours Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs text-slate-600 border-y border-purple-100 py-3.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                  </div>
                  <span>4.9/5</span>
                  <span className="text-slate-500 font-normal">(2.8k+ Verified Google Reviews)</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-4 h-4 text-[#682582]" />
                  <span>8:00 AM – 1:00 PM & 4:00 PM – 9:00 PM</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-4 h-4 text-[#682582]" />
                  <span>Borivali West, Mumbai</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <Button
                  size="lg"
                  onClick={() => handleOpenBooking()}
                  className="h-13 px-8 rounded-full bg-gradient-to-r from-[#4A156B] via-[#682582] to-[#7C3AED] hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 group"
                >
                  <span>Book In-Clinic Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-7 rounded-full border-2 border-purple-200 hover:border-[#682582] hover:bg-purple-50 text-[#682582] font-bold text-sm sm:text-base"
                >
                  <a href="tel:+918591981880" className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-[#682582]" />
                    <span>Call Now (+91 8591981880)</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column: Hero Visual Image with Sticker */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-100 shadow-2xl bg-white aspect-[4/3] group">
                <Image
                  src="/images/clinics/borivali-clinic-interior.jpg"
                  alt="Aries PhysioCare Borivali West Clinic Interior & Treatment Beds"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Handwritten Style Badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-purple-200 flex items-center gap-2 animate-bounce-subtle">
                  <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-[#682582]">
                    <Heart className="w-4 h-4 fill-[#682582]" />
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-[#682582] font-serif italic">
                      Your Wellness Our Priority
                    </span>
                    <span className="block text-[10px] text-slate-500 font-sans">
                      Verified Clinical Facility
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4 VALUE PROPOSITIONS BAR ─────────────────────────────────── */}
      <section className="py-8 bg-white border-b border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center gap-3.5 transition-all hover:bg-purple-50 hover:shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Expert Physiotherapists</h4>
                <p className="text-[11px] text-slate-500">Certified & Experienced</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center gap-3.5 transition-all hover:bg-purple-50 hover:shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Advanced Equipment</h4>
                <p className="text-[11px] text-slate-500">Hospital-Grade Facilities</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center gap-3.5 transition-all hover:bg-purple-50 hover:shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Personalized Treatment</h4>
                <p className="text-[11px] text-slate-500">One-on-One Care</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex items-center gap-3.5 transition-all hover:bg-purple-50 hover:shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Integrated Wellness</h4>
                <p className="text-[11px] text-slate-500">Holistic & Long-term Relief</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ABOUT OUR CLINIC SECTION ─────────────────────────────────── */}
      <section className="py-14 md:py-18 bg-[#FAFAFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: About Text & 3 Feature Badges */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    ✦
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
                    ABOUT OUR CLINIC
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E0B5B] tracking-tight">
                  Aries PhysioCare Borivali West Center
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Aries PhysioCare Center in New Mhatre Colony, Borivali West is our premier physical clinic and clinical wellness hub. Equipped with world-class electrotherapy modalities, private therapy suites, and senior hospital-trained specialists, we provide personalized healing for acute and chronic musculoskeletal, neurological, and post-operative conditions.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Personalized Care</h5>
                    <p className="text-[11px] text-slate-500">For Every Patient</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Evidence-Based</h5>
                    <p className="text-[11px] text-slate-500">Treatment Plans</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-purple-100 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">Better Mobility</h5>
                    <p className="text-[11px] text-slate-500">Stronger, Healthier You</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Consultation Hours Card */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-purple-100 shadow-xl space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <span>Consultation Hours</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Walk-ins and scheduled appointments welcome.
                  </p>
                </div>

                <div className="space-y-3.5 border-y border-purple-100 py-4 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Monday – Sunday:</span>
                    <span className="font-bold text-slate-900 text-right">
                      8:00 AM – 1:00 PM &<br />4:00 PM – 9:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Initial Assessment:</span>
                    <span className="font-extrabold text-[#682582] text-sm">₹ 800/-</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Regular Sessions:</span>
                    <span className="font-bold text-slate-800">₹ 800/- per session</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => handleOpenBooking()}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#4A156B] via-[#682582] to-[#7C3AED] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-purple-900/10 flex items-center justify-center gap-2"
                  >
                    <span>Book Center Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 rounded-xl border-purple-200 text-[#682582] hover:bg-purple-50 font-bold text-xs"
                  >
                    <a
                      href="https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OUR SPECIALTIES SECTION ─────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white border-t border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
              OUR SPECIALTIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E0B5B] tracking-tight mt-1">
              Advanced Modalities & Specialties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-8">
              Evidence-based physiotherapy care for faster recovery and long-term wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 8 Specialty Pills Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                { title: 'Orthopedic & Joint Rehabilitation', icon: Activity },
                { title: 'Neurological Stroke Rehabilitation', icon: Compass },
                { title: 'Spine Decompression & Sciatica Care', icon: Zap },
                { title: 'Sports Injury Conditioning', icon: Award },
                { title: 'Geriatric Balance & Fall Prevention', icon: HeartHandshake },
                { title: 'Post-Surgical (TKR/THR Rehab)', icon: Stethoscope },
                { title: "Women's Health & Pelvic Floor", icon: Heart },
                { title: 'Pediatric Neuro Development', icon: Sparkles },
              ].map((s) => {
                const IconComponent = s.icon;
                return (
                  <div
                    key={s.title}
                    className="p-3.5 rounded-2xl bg-purple-50/40 border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-3 shadow-2xs"
                  >
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{s.title}</span>
                  </div>
                );
              })}
            </div>

            {/* Right: Shoulder Therapy Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-100 shadow-xl bg-white aspect-[4/3] group">
                <Image
                  src="/images/clinics/borivali-shoulder-therapy.jpg"
                  alt="Specialist Physiotherapy Manual Therapy at Borivali Center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOSPITAL-GRADE EQUIPMENT ON-SITE SECTION ─────────────────── */}
      <section className="py-14 md:py-20 bg-[#FAFAFD] border-t border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E0B5B] tracking-tight">
              HOSPITAL-GRADE EQUIPMENT ON-SITE
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-8">
              Modern technology. Advanced care. Better outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 8 Equipment Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                'High-Intensity Class IV Laser Therapy Unit',
                'Multi-Channel Interferential Therapy (IFT)',
                'High-Frequency Therapeutic Ultrasound (1 & 3 MHz)',
                'Continuous Passive Motion (CPM) Knee Unit',
                'Lumbar & Cervical Intermittent Traction Bed',
                'Pneumatic Deep Tissue Massager & Recovery Boots',
                'Digital Muscle Stimulators (TENS / Functional)',
                'Dynamic Balance & Stability Platform',
              ].map((eq) => (
                <div
                  key={eq}
                  className="p-3.5 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 transition-all flex items-center gap-3 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-[#682582] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#682582]" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800">{eq}</span>
                </div>
              ))}
            </div>

            {/* Right: Equipment Room Photo with Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-100 shadow-xl bg-white aspect-[4/3] group">
                <Image
                  src="/images/clinics/borivali-equipment-gym.jpg"
                  alt="Modern Physiotherapy Equipment Room at Borivali Center"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Purple Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#682582]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg text-white flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold tracking-wide">
                    + Advanced Equipment. Faster Recovery.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR EXPERT TEAM SECTION ──────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white border-t border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
              OUR EXPERT TEAM
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E0B5B] tracking-tight mt-1">
              Consultants at This Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Experienced. Compassionate. Patient Outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor 1 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 shadow-lg transition-all flex flex-col items-center text-center space-y-3.5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                <Image
                  src="/images/therapist_avatar_1.jpg"
                  alt="Dr. Hitali Sonkhe, PT"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#2E0B5B]">Dr. Hitali Sonkhe, PT</h3>
                <p className="text-xs font-bold text-[#682582] mt-0.5">
                  Orthopaedic & Neurological Rehabilitation Specialist
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  BPT, MIAP · Expert Physiotherapist
                </p>
              </div>

              <div className="w-full bg-purple-50/60 rounded-xl p-2.5 text-[11px] text-slate-600 space-y-1">
                <div><span className="font-semibold text-slate-700">Experience:</span> 6+ Years</div>
                <div><span className="font-semibold text-slate-700">Consultation Timings:</span> 9:00 AM – 1:00 PM</div>
              </div>

              <Button
                variant="ghost"
                onClick={() => handleOpenBooking('Dr. Hitali Sonkhe, PT')}
                className="text-xs font-bold text-[#682582] hover:text-[#4A156B] hover:bg-purple-50 flex items-center gap-1.5"
              >
                <span>View Profile & Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Doctor 2 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 shadow-lg transition-all flex flex-col items-center text-center space-y-3.5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                <Image
                  src="/images/therapist_avatar_2.jpg"
                  alt="Dr. Anu Desai, PT"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#2E0B5B]">Dr. Anu Desai, PT</h3>
                <p className="text-xs font-bold text-[#682582] mt-0.5">
                  Senior Clinical Advisor & Comprehensive Rehabilitation
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  MPT, MIAP · Senior Consultant Physiotherapist
                </p>
              </div>

              <div className="w-full bg-purple-50/60 rounded-xl p-2.5 text-[11px] text-slate-600 space-y-1">
                <div><span className="font-semibold text-slate-700">Experience:</span> 10+ Years</div>
                <div><span className="font-semibold text-slate-700">Consultation Timings:</span> 1:00 PM – 4:00 PM</div>
              </div>

              <Button
                variant="ghost"
                onClick={() => handleOpenBooking('Dr. Anu Desai, PT')}
                className="text-xs font-bold text-[#682582] hover:text-[#4A156B] hover:bg-purple-50 flex items-center gap-1.5"
              >
                <span>View Profile & Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Doctor 3 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 shadow-lg transition-all flex flex-col items-center text-center space-y-3.5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                <Image
                  src="/images/therapist_avatar_3.jpg"
                  alt="Dr. Pallavi Sharma, PT"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#2E0B5B]">Dr. Pallavi Sharma, PT</h3>
                <p className="text-xs font-bold text-[#682582] mt-0.5">
                  Spine Care, Joint Mobilization & Pain Management Specialist
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  BPT, MIAP · Expert Physiotherapist
                </p>
              </div>

              <div className="w-full bg-purple-50/60 rounded-xl p-2.5 text-[11px] text-slate-600 space-y-1">
                <div><span className="font-semibold text-slate-700">Experience:</span> 8+ Years</div>
                <div><span className="font-semibold text-slate-700">Consultation Timings:</span> 4:00 PM – 9:00 PM</div>
              </div>

              <Button
                variant="ghost"
                onClick={() => handleOpenBooking('Dr. Pallavi Sharma, PT')}
                className="text-xs font-bold text-[#682582] hover:text-[#4A156B] hover:bg-purple-50 flex items-center gap-1.5"
              >
                <span>View Profile & Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHYSIOTHERAPY PACKAGES (LUXURY PURPLE BANNER) ─────────────── */}
      <section className="py-16 md:py-22 bg-gradient-to-b from-[#2E0B5B] via-[#220744] to-[#17032F] text-white relative overflow-hidden">
        {/* Subtle Ambient Gold Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-emerald-300 border border-emerald-400/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> PHYSIOTHERAPY PACKAGES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Affordable Care for Better Recovery
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 mt-2">
              Quality physiotherapy at transparent and value-packed rates. (Only on 100% Advance Payments)
            </p>
          </div>

          {/* 4 Pricing Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* Card 1: Consultation / Regular Therapy */}
            <div className="p-6 rounded-3xl bg-white text-slate-800 shadow-2xl border border-purple-100 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-700 leading-tight">
                    Consultation / Regular Therapy
                  </h4>
                </div>

                <div className="pt-2">
                  <div className="text-3xl font-extrabold text-[#2E0B5B]">₹ 800/-</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Comprehensive Evaluation</p>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Initial Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Regular Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Expert Physiotherapist</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleOpenBooking(undefined, 'Consultation / Regular Therapy')}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#4A156B] via-[#682582] to-[#7C3AED] hover:opacity-95 text-white font-bold text-xs"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {/* Card 2: 10 DAYS Package */}
            <div className="p-6 rounded-3xl bg-white text-slate-800 shadow-2xl border border-purple-100 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-700">10 DAYS Package</h4>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-500">₹ 750 / session</div>
                  <div className="text-3xl font-extrabold text-[#2E0B5B]">₹ 7,500/-</div>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                    Save ₹ 500/-
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>10 In-clinic Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Guided Therapy Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Track Your Progress</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleOpenBooking(undefined, '10 DAYS Package (₹7,500)')}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#4A156B] via-[#682582] to-[#7C3AED] hover:opacity-95 text-white font-bold text-xs"
              >
                <span>Book 10-Day Plan</span>
              </Button>
            </div>

            {/* Card 3: 15 DAYS Package (MOST POPULAR) */}
            <div className="relative p-6 rounded-3xl bg-white text-slate-800 shadow-2xl border-2 border-amber-400 flex flex-col justify-between space-y-6 scale-[1.02]">
              {/* Most Popular Ribbon */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 font-extrabold text-[10px] tracking-wider shadow-md uppercase">
                ★ MOST POPULAR ★
              </div>

              <div className="space-y-4 pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-700">15 DAYS Package</h4>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-500">₹ 700 / session</div>
                  <div className="text-3xl font-extrabold text-[#2E0B5B]">₹ 10,500/-</div>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                    Save ₹ 1,500/-
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>15 In-clinic Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Personalized Protocol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Better & Faster Results</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleOpenBooking(undefined, '15 DAYS Package (₹10,500)')}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-500 via-[#682582] to-[#7C3AED] hover:opacity-95 text-white font-bold text-xs shadow-md"
              >
                <span>Book 15-Day Plan</span>
              </Button>
            </div>

            {/* Card 4: 30 DAYS Package */}
            <div className="p-6 rounded-3xl bg-white text-slate-800 shadow-2xl border border-purple-100 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-[#682582] flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-700">30 DAYS Package</h4>
                </div>

                <div className="pt-2">
                  <div className="text-xs font-semibold text-slate-500">₹ 650 / session</div>
                  <div className="text-3xl font-extrabold text-[#2E0B5B]">₹ 19,500/-</div>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                    Save ₹ 4,500/-
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>30 In-clinic Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Long-Term Relief</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Best Value for Money</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleOpenBooking(undefined, '30 DAYS Package (₹19,500)')}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#4A156B] via-[#682582] to-[#7C3AED] hover:opacity-95 text-white font-bold text-xs"
              >
                <span>Book 30-Day Plan</span>
              </Button>
            </div>
          </div>

          {/* Bargaining Notice Banner */}
          <div className="mt-12 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-amber-400/40 max-w-3xl mx-auto flex items-center gap-3.5 text-xs text-amber-200">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold tracking-wider text-amber-300 uppercase">
                BARGAINING IS NOT PERMITTED.
              </span>
              <span className="text-purple-100 ml-1.5">
                If there are any offers or discounts available, they will be clearly advertised or displayed on our board.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONALIZED CARE AT YOUR HOME SECTION ─────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
                  PERSONALIZED CARE AT YOUR HOME
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E0B5B] tracking-tight mt-1">
                  Home Care Packages in <span className="text-[#682582]">Borivali West</span>
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In addition to walk-in consultations at our Aries PhysioCare Center / Expert Physiotherapy Center, our verified specialist team also provides hospital-grade physiotherapy sessions directly to homes across Borivali West and Mumbai.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs">
                  <div className="font-bold text-slate-900">Expert Physiotherapists</div>
                  <div className="text-[11px] text-slate-500">At Your Doorstep</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs">
                  <div className="font-bold text-slate-900">Same Quality Care</div>
                  <div className="text-[11px] text-slate-500">As Our Clinic</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-xs">
                  <div className="font-bold text-slate-900">Convenient & Hassle-Free</div>
                  <div className="text-[11px] text-slate-500">For All Age Groups</div>
                </div>
              </div>

              {/* Search Location Bar */}
              <div className="space-y-3 pt-2">
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-600" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search your Area, Locality, City or 6 Digit Pincode (e.g. Dahisar, South Mumbai, 400001)"
                    className="w-full h-12 pl-10 pr-36 rounded-2xl border-2 border-purple-100 focus:border-[#682582] focus:outline-none text-xs text-slate-800"
                  />
                  <Button
                    type="button"
                    onClick={() => setSearchLocation('Borivali West, Mumbai 400091')}
                    className="absolute right-1.5 h-9 px-4 rounded-xl bg-[#682582] hover:bg-[#4A156B] text-white text-[11px] font-bold"
                  >
                    <LocateFixed className="w-3.5 h-3.5 mr-1" />
                    <span>Use My Location</span>
                  </Button>
                </div>

                {/* Quick Area Select Chips */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[11px] text-slate-500 font-semibold mr-1">Quick Select:</span>
                  {[
                    'Mira Road & Dahisar',
                    'Borivali West',
                    'Kandivali',
                    'Malad',
                    'Goregaon',
                    'Andheri',
                    'All Mumbai',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setActiveAreaChip(chip);
                        setSearchLocation(`${chip}, Mumbai`);
                      }}
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                        activeAreaChip === chip
                          ? 'bg-[#682582] text-white border-[#682582]'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-purple-200'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Home Care Pricing Starting from ₹1,200/day */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-purple-50 border-2 border-purple-100 shadow-xl space-y-4">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-purple-100">
                  <Image
                    src="/images/booking-popup-therapist.jpg"
                    alt="Doorstep Home Physiotherapy in Borivali"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Home Care Packages Starting from</span>
                    <div className="text-2xl font-extrabold text-[#682582]">₹ 1,200 <span className="text-xs font-normal text-slate-500">/ day</span></div>
                  </div>
                  <Button
                    onClick={() => handleOpenBooking(undefined, 'Home Care Package (₹1,200/day)')}
                    className="h-10 px-5 rounded-xl bg-[#682582] text-white font-bold text-xs"
                  >
                    <span>Book Home Visit</span>
                  </Button>
                </div>
                <p className="text-[11px] text-slate-500 border-t border-purple-100 pt-2">
                  Inclusive of therapist visit, clinical assessment & 1-on-1 electrotherapy session.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── NEED HELP CHOOSING CTA BANNER ────────────────────────────── */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2E0B5B] via-[#4A156B] to-[#2E0B5B] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-amber-300 flex items-center justify-center shrink-0 border border-white/20">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  Need Help Choosing Your Recovery Plan?
                </h3>
                <p className="text-xs sm:text-sm text-purple-200 mt-1 max-w-xl">
                  Speak with our expert clinical team to find the right package for your condition, recovery goals, and home location.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Button
                asChild
                className="w-full sm:w-auto h-12 px-6 rounded-full bg-white text-[#2E0B5B] hover:bg-slate-100 font-bold text-xs flex items-center gap-2"
              >
                <a href="tel:+919138647806">
                  <Phone className="w-4 h-4 text-[#682582]" />
                  <span>Call +91 91386 47806</span>
                </a>
              </Button>

              <Button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto h-12 px-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:opacity-95 font-extrabold text-xs flex items-center gap-1.5"
              >
                <span>Book Free Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION, DIRECTIONS & MAP ──────────────────────────────── */}
      <section className="py-14 bg-white border-t border-purple-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#682582] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>LOCATION & CLINIC ACCESS</span>
              </div>
              <h2 className="text-2xl font-extrabold text-[#2E0B5B]">
                Visit Our Borivali West Center
              </h2>
              <div className="space-y-3 text-xs text-slate-600">
                <p className="font-semibold text-slate-800">
                  Shop No. 7, Parrk Riviera, New Mhatre Colony, Opp. New Mhatre Ground, Borivali West, Mumbai – 400091.
                </p>
                <p>
                  <strong className="text-slate-800">Key Landmarks:</strong> Opposite New Mhatre Ground, near Gorai Bridge / Don Bosco Road, 5 mins from Eksar Metro Station and Borivali Railway Station.
                </p>
                <p>
                  <strong className="text-slate-800">Accessibility:</strong> Ground floor zero-step wheelchair accessible entrance with dedicated clinical ambulance bay and patient drop-off area.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <Button
                  asChild
                  className="h-10 px-5 rounded-xl bg-[#682582] text-white text-xs font-bold"
                >
                  <a
                    href="https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </Button>
                <Button
                  onClick={() => handleOpenBooking()}
                  variant="outline"
                  className="h-10 px-5 rounded-xl border-purple-200 text-[#682582] text-xs font-bold"
                >
                  Schedule Visit
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="w-full h-80 rounded-3xl overflow-hidden border-2 border-purple-100 shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.149202575239!2d72.84461131490333!3d19.23232898699745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b13a37d2f9ef%3A0x6b4453b34b150d18!2sParrk%20Riviera!5e0!3m2!1sen!2sin!4v1694500000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Aries PhysioCare Borivali West Clinic Location Map"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BORIVALI CLINIC FAQS ACCORDION ─────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#FAFAFD] border-t border-purple-100/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2E0B5B] tracking-tight mt-1">
              Borivali West Clinic Patient Inquiries
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'Where exactly is Aries PhysioCare located in Borivali West?',
                a: 'We are located at Shop No. 7, Parrk Riviera, New Mhatre Colony, Borivali West, Mumbai – 400091, opposite New Mhatre Ground and close to Gorai Bridge / Don Bosco Road, with full ground floor wheelchair access.',
              },
              {
                q: 'What are the consultation timings and shift hours?',
                a: 'We operate 7 days a week in two shifts: Morning Shift from 8:00 AM to 1:00 PM, and Evening Shift from 4:00 PM to 9:00 PM. Pre-booked appointments guarantee priority zero wait time.',
              },
              {
                q: 'How does the online slot booking with ₹250 deposit work?',
                a: 'You select your preferred date, shift, and time slot. To confirm and reserve your dedicated 30-min window, an advance deposit of ₹250 is paid securely via Razorpay (Cards, UPI, Netbanking). The remaining ₹550 is payable at the clinic during your visit.',
              },
              {
                q: 'What is the slot staggering rule (15 mins & 30 mins)?',
                a: 'To maintain strict clinical discipline and prevent overcrowding, each 30-minute consultation window accommodates a maximum of 2 patients. If two patients book the same slot, they are staggered by 15 minutes (e.g. 9:00 AM and 9:15 AM). A slot with 2 bookings is closed to prevent any overlap.',
              },
              {
                q: 'Are home physiotherapy visits available from this center?',
                a: 'Yes. In addition to clinic walk-ins, our verified physiotherapists deliver hospital-grade sessions directly to homes across Borivali West, Borivali East, Kandivali, Dahisar, and Gorai starting from ₹1,200/day.',
              },
              {
                q: 'What conditions are treated at this clinic?',
                a: 'We specialize in knee osteoarthritis, spine decompression & sciatica, frozen shoulder, post-surgical TKR/THR rehabilitation, stroke & neuro-rehab, sports injury conditioning, and geriatric fall prevention.',
              },
            ].map((faq, idx) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-purple-100 bg-white overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-800 hover:text-[#682582] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-600 transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-purple-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Official Site Footer ────────────────────────────────────── */}
      <Footer />

      {/* ── Appointment Booking Popup Modal ─────────────────────────── */}
      <BorivaliAppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        preselectedDoctor={selectedDoctor}
        preselectedPackage={selectedPackage}
      />
    </div>
  );
}
