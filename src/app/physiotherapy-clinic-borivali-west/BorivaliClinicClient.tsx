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
  ArrowRight,
  Activity,
  Zap,
  Heart,
  Navigation,
  Check,
  LocateFixed,
  Building2,
  HeartHandshake,
  Plus,
  Search,
  Scale,
  Brain,
  Radio,
  BedDouble,
  RotateCw,
  Waves
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BorivaliAppointmentModal from './BorivaliAppointmentModal';

export default function BorivaliClinicClient() {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(undefined);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);

  // Home care pincode search state
  const [searchLocation, setSearchLocation] = useState('Borivali West, Mumbai');
  const [activeAreaChip, setActiveAreaChip] = useState('Borivali West');

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
      {/* ── BREADCRUMB NAVIGATION ───────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF8FD] border-b border-purple-100/60 py-2.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#682582] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/locations" className="hover:text-[#682582] transition-colors">Locations</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/locations/mumbai" className="hover:text-[#682582] transition-colors">Mumbai</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#682582] font-semibold">Borivali West Center</span>
        </div>
      </nav>

      {/* ── HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-6 pb-12 md:pt-10 md:pb-16 bg-gradient-to-b from-[#F7F1FB] via-[#FCFAFE] to-white border-b border-purple-100/50 overflow-hidden">
        {/* Soft Organic Lilac Wave in Background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-purple-200/40 via-purple-100/20 to-transparent rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-5">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#5B1F8C] text-white shadow-xs">
                  <Building2 className="w-3.5 h-3.5" /> Official Clinic Center
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFE6F7] text-[#682582] border border-purple-200/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#682582]" /> Verified PhysioCare Center
                </span>
              </div>

              {/* Main H1 Title */}
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#260B49] tracking-tight leading-[1.15]">
                  <span>Aries PhysioCare</span><br />
                  <span className="inline-flex items-center gap-2">
                    <span>Borivali West Center</span>
                    <span className="text-[11px] font-bold text-[#682582] bg-purple-100/90 px-2 py-0.5 rounded-full border border-purple-200 align-middle">
                      No. 1
                    </span>
                  </span>
                </h1>

                <p className="text-base sm:text-lg font-bold text-[#682582] pt-1">
                  Expert Physiotherapy. Integrated Wellness. A Healthier You.
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  The Healing Touch · Hospital-Grade Integrated Physiotherapy & Advanced Clinical Wellness
                </p>
              </div>

              {/* Stats & Hours Pill Bar */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-1 text-xs text-slate-700">
                <div className="flex items-center gap-1.5 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-900 font-extrabold">4.9/5</span>
                  <span className="text-slate-500 font-normal">(2.8K+ Verified Google Reviews)</span>
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
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  size="lg"
                  onClick={() => handleOpenBooking()}
                  className="h-12 px-7 rounded-full bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-purple-900/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Clock className="w-4 h-4" />
                  <span>Book In-Clinic Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 px-6 rounded-full border-2 border-purple-200 hover:border-[#682582] hover:bg-purple-50 text-[#682582] font-bold text-sm bg-white"
                >
                  <a href="tel:+918591981880" className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-[#682582]" />
                    <span>Call Now (+91 8591981880)</span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Column: Hero Visual Image with Cursive Accents */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-100 shadow-2xl bg-white aspect-[4/3] group">
                <Image
                  src="/images/clinics/borivali-clinic-interior.jpg"
                  alt="Aries PhysioCare Borivali West Clinic Interior & Treatment Beds"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Top-Right Script Calligraphy: "Move Better. Live Healthier." */}
                <div className="absolute top-4 right-5 text-right select-none pointer-events-none drop-shadow-md">
                  <span className="font-script text-2xl sm:text-3xl font-bold text-[#8C5E28] block leading-tight">
                    Move Better.
                  </span>
                  <span className="font-script text-2xl sm:text-3xl font-bold text-[#8C5E28] block leading-tight">
                    Live Healthier.
                  </span>
                </div>
              </div>

              {/* Floating Handwritten Banner: "Your Wellness Our Priority" */}
              <div className="absolute -bottom-4 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-purple-200/80 flex items-center gap-2 z-20">
                <span className="font-script text-xl sm:text-2xl font-bold text-[#682582] tracking-wide">
                  Your Wellness Our Priority
                </span>
                <Heart className="w-4 h-4 fill-[#682582] text-[#682582]" />
              </div>
            </div>

          </div>

          {/* 4 Feature Badges Row directly below Hero */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-10 mt-4 border-t border-purple-100/60">
            <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 flex items-center gap-3 transition-all hover:bg-purple-100/70">
              <div className="w-10 h-10 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Expert Physiotherapists</h4>
                <p className="text-[11px] text-slate-500">Certified & Experienced</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 flex items-center gap-3 transition-all hover:bg-purple-100/70">
              <div className="w-10 h-10 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Advanced Equipment</h4>
                <p className="text-[11px] text-slate-500">Hospital-Grade Facilities</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 flex items-center gap-3 transition-all hover:bg-purple-100/70">
              <div className="w-10 h-10 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Personalized Treatment</h4>
                <p className="text-[11px] text-slate-500">One-on-One Care</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 flex items-center gap-3 transition-all hover:bg-purple-100/70">
              <div className="w-10 h-10 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Integrated Wellness</h4>
                <p className="text-[11px] text-slate-500">Holistic & Long-term Relief</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT OUR CLINIC SECTION ─────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Text & 3 Badges */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
                    ABOUT OUR CLINIC
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#260B49] tracking-tight">
                  Aries PhysioCare Borivali West Center
                </h2>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Aries PhysioCare Center in New MHB Colony, Borivali West is our premier physical clinic and clinical wellness hub. Equipped with world-class electrotherapy modalities, private therapy suites, and senior hospital-trained specialists, we provide personalized healing for acute and chronic musculoskeletal, neurological, and post-operative conditions.
              </p>

              {/* 3 Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">Personalized Care</h5>
                    <p className="text-[11px] text-slate-500">for Every Patient</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">Evidence-Based</h5>
                    <p className="text-[11px] text-slate-500">Treatment Plans</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">Better Mobility</h5>
                    <p className="text-[11px] text-slate-500">Stronger, Healthier You</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Consultation Hours Card */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 shadow-xl space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Consultation Hours</h4>
                    <p className="text-[11px] text-slate-500">Walk-ins and scheduled appointments welcome.</p>
                  </div>
                </div>

                <div className="space-y-3 border-y border-purple-100/80 py-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Monday – Sunday</span>
                    <span className="font-bold text-slate-900 text-right">
                      8:00 AM – 1:00 PM &<br />4:00 PM – 9:00 PM
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-t border-purple-50 pt-2">
                    <span className="text-slate-500 font-medium">Initial Assessment</span>
                    <span className="font-extrabold text-[#682582] text-sm">₹ 800/-</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-purple-50 pt-2">
                    <span className="text-slate-500 font-medium">Regular Sessions</span>
                    <span className="font-bold text-slate-800">₹ 800/- per session</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <Button
                    onClick={() => handleOpenBooking()}
                    className="w-full h-11 rounded-full bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] hover:opacity-95 text-white font-bold text-xs shadow-md shadow-purple-900/15 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Book Center Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>

                  <a
                    href="https://maps.google.com/?q=Shop+No.+7,+Parrk+Riviera,+New+MHB+Colony,+Borivali+West,+Mumbai+400091"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-9 flex items-center justify-center gap-1.5 text-xs font-bold text-[#682582] hover:text-[#4E1372] hover:bg-purple-50 rounded-xl transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 rotate-45" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OUR SPECIALTIES SECTION ─────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#FCFAFE] border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
                OUR SPECIALTIES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#260B49] tracking-tight">
              Advanced Modalities & Specialties
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Evidence-based physiotherapy care for faster recovery and long-term wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 8 Specialty Pills Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Orthopedic & Joint Rehabilitation', icon: Activity },
                { title: 'Neurological Stroke Rehabilitation', icon: Brain },
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
                    className="p-3 rounded-2xl bg-[#F6EEFA] border border-purple-100 hover:border-purple-300 hover:bg-purple-100/70 transition-all flex items-center gap-3 shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">{s.title}</span>
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
      <section className="py-12 md:py-16 bg-white border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
                HOSPITAL-GRADE EQUIPMENT ON-SITE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Modern technology. Advanced care. Better outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 8 Equipment Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'High-Intensity Class IV Laser Therapy Unit', icon: Sparkles },
                { name: 'Multi-Channel Interferential Therapy (IFT)', icon: Radio },
                { name: 'High-Frequency Therapeutic Ultrasound (1 & 3 MHz)', icon: Waves },
                { name: 'Continuous Passive Motion (CPM) Knee Unit', icon: RotateCw },
                { name: 'Lumbar & Cervical Intermittent Traction Bed', icon: BedDouble },
                { name: 'Pneumatic Deep Tissue Massager & Recovery Boots', icon: Activity },
                { name: 'Digital Muscle Stimulators (TENS / Functional)', icon: Zap },
                { name: 'Dynamic Balance & Stability Platform', icon: Scale },
              ].map((eq) => {
                const IconComp = eq.icon;
                return (
                  <div
                    key={eq.name}
                    className="p-3 rounded-2xl bg-[#F6EEFA] border border-purple-100 hover:border-purple-300 hover:bg-purple-100/70 transition-all flex items-center gap-3 shadow-2xs"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-200/60 text-[#682582] flex items-center justify-center shrink-0">
                      <IconComp className="w-4 h-4 text-[#682582]" />
                    </div>
                    <span className="text-xs font-bold text-slate-800 leading-tight">{eq.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Right: Equipment Room Photo with Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-100 shadow-xl bg-white aspect-[4/3] group">
                <Image
                  src="/images/clinics/borivali-equipment-gym.jpg"
                  alt="Modern Physiotherapy Rehabilitation Gym & Hospital-Grade Equipment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Purple Pill on Bottom Right */}
                <div className="absolute bottom-3 right-3 bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] px-3.5 py-1.5 rounded-full shadow-lg text-white flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[11px] font-bold tracking-wide">
                    Advanced Equipment. Faster Recovery.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR EXPERT TEAM SECTION ──────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#FCFAFE] border-b border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Stethoscope className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#682582]">
                OUR EXPERT TEAM
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#260B49] tracking-tight">
              Consultants at This Center
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Experienced. Compassionate. Patient Outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Doctor 1 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center space-y-3">
              <div className="relative w-22 h-22 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                <Image
                  src="/images/therapist_avatar_1.jpg"
                  alt="Dr. Hitali Sonkhe, PT"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#260B49]">Dr. Hitali Sonkhe, PT</h3>
                <p className="text-xs font-bold text-[#682582] mt-0.5 leading-snug">
                  Orthopaedic & Neurological Rehabilitation Specialist
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  BPT, MIAP · Expert Physiotherapist
                </p>
              </div>

              <div className="w-full bg-[#F6EEFA] rounded-xl p-2.5 text-[11px] text-slate-600 space-y-1">
                <div><span className="font-bold text-slate-700">Experience:</span> 6+ Years</div>
                <div><span className="font-bold text-slate-700">Consultation Timings:</span> 9:00 AM – 1:00 PM</div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking('Dr. Hitali Sonkhe, PT')}
                className="text-xs font-bold text-[#682582] hover:text-[#4E1372] flex items-center gap-1.5 pt-1 cursor-pointer transition-colors"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Doctor 2 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center space-y-3">
              <div className="relative w-22 h-22 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                <Image
                  src="/images/therapist_avatar_2.jpg"
                  alt="Dr. Anu Desai, PT"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#260B49]">Dr. Anu Desai, PT</h3>
                <p className="text-xs font-bold text-[#682582] mt-0.5 leading-snug">
                  Senior Clinical Advisor & Comprehensive Rehabilitation
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  MPT, MIAP · Senior Consultant Physiotherapist
                </p>
              </div>

              <div className="w-full bg-[#F6EEFA] rounded-xl p-2.5 text-[11px] text-slate-600 space-y-1">
                <div><span className="font-bold text-slate-700">Experience:</span> 10+ Years</div>
                <div><span className="font-bold text-slate-700">Consultation Timings:</span> 1:00 PM – 4:00 PM</div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking('Dr. Anu Desai, PT')}
                className="text-xs font-bold text-[#682582] hover:text-[#4E1372] flex items-center gap-1.5 pt-1 cursor-pointer transition-colors"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Doctor 3 */}
            <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 shadow-md hover:shadow-xl transition-all flex flex-col items-center text-center space-y-3">
              <div className="relative w-22 h-22 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                <Image
                  src="/images/therapist_avatar_3.jpg"
                  alt="Dr. Pallavi Sharma, PT"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#260B49]">Dr. Pallavi Sharma, PT</h3>
                <p className="text-xs font-bold text-[#682582] mt-0.5 leading-snug">
                  Spine Care, Joint Mobilization & Pain Management Specialist
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  BPT, MIAP · Expert Physiotherapist
                </p>
              </div>

              <div className="w-full bg-[#F6EEFA] rounded-xl p-2.5 text-[11px] text-slate-600 space-y-1">
                <div><span className="font-bold text-slate-700">Experience:</span> 8+ Years</div>
                <div><span className="font-bold text-slate-700">Consultation Timings:</span> 4:00 PM – 9:00 PM</div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenBooking('Dr. Pallavi Sharma, PT')}
                className="text-xs font-bold text-[#682582] hover:text-[#4E1372] flex items-center gap-1.5 pt-1 cursor-pointer transition-colors"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHYSIOTHERAPY PACKAGES (DEEP LUXURY PURPLE BANNER) ─────────── */}
      <section className="py-14 md:py-20 bg-gradient-to-b from-[#1C0637] via-[#240A44] to-[#140228] text-white relative overflow-hidden">
        {/* Ambient Gold Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Green Crest Badge */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-extrabold bg-[#064E3B]/80 text-[#34D399] border border-[#059669]/40 mb-3 uppercase tracking-wider">
              <span className="w-4 h-4 rounded-full bg-[#059669] text-white flex items-center justify-center text-[10px]">✓</span>
              <span>PHYSIOTHERAPY PACKAGES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight bg-gradient-to-r from-[#FDE68A] via-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">
              Affordable Care for Better Recovery
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/90 mt-2">
              Quality physiotherapy at transparent and value-packed rates. (Only on 100% Advance Payments)
            </p>
          </div>

          {/* 4 Pricing Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {/* Card 1: Consultation / Regular Therapy */}
            <div className="p-6 rounded-3xl bg-white text-slate-800 shadow-2xl flex flex-col justify-between space-y-5">
              <div className="space-y-3.5 text-center">
                <div className="w-12 h-12 rounded-full bg-[#2A0845] text-amber-300 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-md">
                  <Stethoscope className="w-6 h-6" />
                </div>
                
                <h4 className="text-xs font-bold text-slate-800 leading-tight">
                  Consultation /<br />Regular Therapy
                </h4>

                <div className="pt-1">
                  <div className="text-3xl font-black text-[#260B49]">₹ 800/-</div>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 text-left">
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
                className="w-full h-10 rounded-full bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] hover:opacity-95 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>

            {/* Card 2: 10 DAYS Package */}
            <div className="p-6 rounded-3xl bg-white text-slate-800 shadow-2xl flex flex-col justify-between space-y-5">
              <div className="space-y-3.5 text-center">
                <div className="w-12 h-12 rounded-full bg-[#2A0845] text-amber-300 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-md">
                  <Clock className="w-6 h-6" />
                </div>
                
                <h4 className="text-xs font-bold text-slate-800">
                  <span className="text-sm font-black">10 DAYS</span><br />Package
                </h4>

                <div className="pt-1">
                  <div className="text-[11px] font-bold text-slate-600">₹ 750 <span className="font-normal text-slate-500">/ session</span></div>
                  <div className="text-3xl font-black text-[#260B49]">₹ 7,500/-</div>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-900 shadow-xs">
                    ★ Save ₹500/- ★
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 text-left">
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
                className="w-full h-10 rounded-full bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] hover:opacity-95 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                <span>Book 10-Day Plan</span>
              </Button>
            </div>

            {/* Card 3: 15 DAYS Package (MOST POPULAR) */}
            <div className="relative p-6 rounded-3xl bg-white text-slate-800 shadow-2xl border-2 border-amber-400 flex flex-col justify-between space-y-5">
              {/* Most Popular Gold Banner */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-[10px] tracking-wider shadow-md uppercase">
                ★ MOST POPULAR ★
              </div>

              <div className="space-y-3.5 text-center pt-1">
                <div className="w-12 h-12 rounded-full bg-[#2A0845] text-amber-300 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                
                <h4 className="text-xs font-bold text-slate-800">
                  <span className="text-sm font-black">15 DAYS</span><br />Package
                </h4>

                <div className="pt-1">
                  <div className="text-[11px] font-bold text-slate-600">₹ 700 <span className="font-normal text-slate-500">/ session</span></div>
                  <div className="text-3xl font-black text-[#260B49]">₹ 10,500/-</div>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-900 shadow-xs">
                    ★ Save ₹1,500/- ★
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 text-left">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>15 In-clinic Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Personalized Protocol</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#682582] shrink-0" />
                    <span>Better & Faster Results</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => handleOpenBooking(undefined, '15 DAYS Package (₹10,500)')}
                className="w-full h-10 rounded-full bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] hover:opacity-95 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                <span>Book 15-Day Plan</span>
              </Button>
            </div>

            {/* Card 4: 30 DAYS Package */}
            <div className="p-6 rounded-3xl bg-white text-slate-800 shadow-2xl flex flex-col justify-between space-y-5">
              <div className="space-y-3.5 text-center">
                <div className="w-12 h-12 rounded-full bg-[#2A0845] text-amber-300 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-md">
                  <Award className="w-6 h-6" />
                </div>
                
                <h4 className="text-xs font-bold text-slate-800">
                  <span className="text-sm font-black">30 DAYS</span><br />Package
                </h4>

                <div className="pt-1">
                  <div className="text-[11px] font-bold text-slate-600">₹ 650 <span className="font-normal text-slate-500">/ session</span></div>
                  <div className="text-3xl font-black text-[#260B49]">₹ 19,500/-</div>
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-slate-900 shadow-xs">
                    ★ Save ₹4,500/- ★
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3 text-left">
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
                className="w-full h-10 rounded-full bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] hover:opacity-95 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                <span>Book 30-Day Plan</span>
              </Button>
            </div>
          </div>

          {/* Bargaining Notice Banner */}
          <div className="mt-10 p-3.5 sm:p-4 rounded-2xl bg-black/35 backdrop-blur-md border border-amber-400/40 max-w-3xl mx-auto flex items-center gap-3.5 text-xs text-amber-200">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/images/aries-gold-emblem.png"
                alt="Aries Gold Emblem"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="inline-block px-2.5 py-0.5 rounded-md border border-amber-400/60 font-black tracking-wider text-amber-300 uppercase text-[11px] shrink-0">
                BARGAINING IS NOT PERMITTED.
              </span>
              <span className="text-purple-100/90 text-[11px] leading-tight">
                If there are any offers or discounts available, they will be clearly advertised or displayed on our board.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PERSONALIZED CARE AT YOUR HOME SECTION ─────────────────────── */}
      <section className="py-12 md:py-16 bg-white relative overflow-hidden">
        {/* Botanical leaf flourish SVG in top-left corner */}
        <div className="absolute top-0 left-0 w-36 h-36 pointer-events-none opacity-80 -ml-4 -mt-4">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 80C25 65 30 40 20 20C40 30 65 25 80 10C65 25 60 50 70 70C50 60 25 65 10 80Z" fill="#10B981" fillOpacity="0.25"/>
            <path d="M5 95C30 85 45 60 40 35C55 50 80 55 95 45C75 60 70 85 80 100C55 90 30 95 5 95Z" fill="#059669" fillOpacity="0.3"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#D97706]">
                  PERSONALIZED CARE AT YOUR HOME
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#260B49] tracking-tight mt-1">
                  Home Care Packages in <span className="text-[#682582]">Borivali West</span>
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                In addition to walk-in consultations at our Aries PhysioCare Center / Integrated Wellness Center, our verified specialist team also provides hospital-grade physiotherapy sessions directly to homes across Borivali West and Mumbai.
              </p>

              {/* 3 Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 text-xs">
                  <div className="font-bold text-slate-900 leading-tight">Expert Physiotherapists</div>
                  <div className="text-[11px] text-slate-500">At Your Doorstep</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 text-xs">
                  <div className="font-bold text-slate-900 leading-tight">Same Quality Care</div>
                  <div className="text-[11px] text-slate-500">As Our Clinic</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#F6EEFA] border border-purple-100 text-xs">
                  <div className="font-bold text-slate-900 leading-tight">Convenient & Hassle-Free</div>
                  <div className="text-[11px] text-slate-500">For All Age Groups</div>
                </div>
              </div>

              {/* Location Search Bar */}
              <div className="space-y-3 pt-1">
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-600" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="Search your area, Locality, City or 6 Digit Pincode (e.g. Dombivli, South Mumbai, 400001)"
                    className="w-full h-12 pl-10 pr-36 rounded-full border-2 border-purple-100 focus:border-[#682582] focus:outline-none text-xs text-slate-800 shadow-xs"
                  />
                  <Button
                    type="button"
                    onClick={() => setSearchLocation('Borivali West, Mumbai 400091')}
                    className="absolute right-1.5 h-9 px-4 rounded-full bg-gradient-to-r from-[#4E1372] via-[#682582] to-[#7B2CBF] hover:opacity-95 text-white text-[11px] font-bold cursor-pointer"
                  >
                    <span>Use My Location</span>
                    <Plus className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>

                {/* Quick Select Chips */}
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
                      className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border cursor-pointer ${
                        activeAreaChip === chip
                          ? 'bg-[#682582] text-white border-[#682582] shadow-xs'
                          : 'bg-white border-purple-100 text-slate-600 hover:border-purple-300'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Card: Home Care Pricing with Photo & Floating Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-purple-100 shadow-xl bg-white aspect-[4/3] group">
                <Image
                  src="/images/booking-popup-therapist.jpg"
                  alt="Doctor treating patient at home in Borivali"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlaid Floating Badge on Bottom */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-purple-200/80 flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-wider">Home Care Packages</span>
                    <span className="text-[10px] text-slate-400 block">Starting from</span>
                    <div className="text-xl font-black text-[#059669]">
                      ₹ 1,200 <span className="text-[11px] font-bold text-slate-500">/ day</span>
                    </div>
                    <p className="text-[9px] text-slate-500 leading-tight">
                      Inclusive of therapist visit, assessment & therapy session
                    </p>
                  </div>

                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 shrink-0 shadow-xs">
                    <Image
                      src="/images/therapist_avatar_4.jpg"
                      alt="Aries Home Care Therapist"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── NEED HELP CHOOSING YOUR RECOVERY PLAN BANNER ──────────────── */}
      <section className="py-6 bg-white border-t border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-7 rounded-3xl bg-gradient-to-r from-[#240643] via-[#431268] to-[#240643] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="relative w-14 h-14 shrink-0">
                <Image
                  src="/images/aries-gold-emblem.png"
                  alt="Aries Gold Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  Need Help Choosing Your Recovery Plan?
                </h3>
                <p className="text-xs text-purple-200/90 mt-0.5 max-w-xl">
                  Speak with our expert team to find the right package for your condition, recovery goals and home location.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href="tel:+919136647806"
                className="w-full sm:w-auto h-11 px-5 rounded-full bg-white text-[#260B49] hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#682582]" />
                <span>Call +91 91366 47806</span>
              </a>

              <Button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto h-11 px-5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Book Free Assessment</span>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

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
