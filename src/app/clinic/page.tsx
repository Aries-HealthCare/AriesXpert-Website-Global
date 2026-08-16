'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building2,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Clock,
  Navigation,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Activity,
  Award,
  Zap,
  CalendarCheck,
  Home,
  Check,
  AlertCircle,
  Tag,
  Copy,
  CheckCheck,
  HeartPulse,
  Stethoscope,
  Radio,
  Sliders,
  Shield,
  Layers,
  Sparkle,
  Share2,
  Users,
  Compass,
  ArrowRight,
  Accessibility,
  Car,
  Wifi,
  Wind
} from 'lucide-react';
import { ARIES_CLINICS_DIRECTORY } from '@/lib/clinics-data';
import BookAppointmentButton from '@/components/book-appointment-button';
import { getOrganizationSchema, getBreadcrumbSchema, getMedicalClinicSchema } from '@/lib/seo-schemas';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ClinicsPage() {
  const clinic = ARIES_CLINICS_DIRECTORY[0];
  const { toast } = useToast();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);

  // Combine hero image + gallery images
  const allImages = [clinic.imageUrl, ...clinic.galleryImages];

  // Copy address handler
  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(clinic.address);
      setCopied(true);
      toast({
        title: "Address Copied!",
        description: "Clinic address copied to clipboard for easy navigation.",
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const jsonLd = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Our Clinic', url: '/clinic' },
    ]),
    getMedicalClinicSchema({
      name: clinic.name,
      description: clinic.description,
      address: clinic.address,
      city: clinic.city,
      state: clinic.state,
      slug: clinic.slug,
      mapUrl: clinic.googleMapsUrl,
      phone: clinic.phone,
      rating: clinic.googleRating,
      reviewCount: clinic.reviewCount,
    }),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="flex flex-col min-h-screen bg-[#07020d] text-foreground selection:bg-primary/30 selection:text-white">
        
        {/* ── BACKGROUND AMBIENT GLOWS ──────────────────────────────── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/20 via-purple-900/10 to-transparent rounded-full blur-[140px] opacity-70" />
          <div className="absolute top-[35%] -left-48 w-96 h-96 bg-accent/15 rounded-full blur-[120px]" />
          <div className="absolute top-[65%] -right-48 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        </div>

        {/* ── HERO & CENTER IDENTITY HEADER ─────────────────────────── */}
        <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 z-10">
          <div className="container mx-auto px-4 md:px-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-accent font-semibold">Flagship Clinic Center</span>
            </nav>

            <div className="max-w-5xl mx-auto space-y-6 text-center">
              {/* Center Status Chip */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-white/90">
                  Google Verified Physical Center · Open 365 Days
                </span>
              </div>

              {/* Title & Headline */}
              <div className="space-y-3">
                <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
                  Aries <span className="bg-gradient-to-r from-amber-300 via-rose-400 to-primary bg-clip-text text-transparent">PhysioCare</span>
                </h1>
                <p className="font-headline text-lg sm:text-2xl md:text-3xl font-bold text-white/90">
                  Expert Physiotherapy & Integrated Clinical Wellness Center
                </p>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                Hospital-grade physical rehabilitation and pain relief center in Borivali West, Mumbai. Powered by Class IV Laser, High-Intensity IFT, Spinal Traction, and veteran senior hospital physiotherapists.
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-7 rounded-2xl bg-gradient-to-r from-primary via-rose-600 to-rose-700 hover:from-primary/90 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all"
                >
                  <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
                    <Navigation className="w-4 h-4" />
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-7 rounded-2xl bg-white/5 hover:bg-white/10 text-white border-white/15 font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-xl hover:scale-[1.02] transition-all"
                >
                  <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-white">
                    <Phone className="w-4 h-4 text-emerald-400" />
                    Call: +91 9136447006
                  </a>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 px-7 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-black text-xs sm:text-sm uppercase tracking-wider backdrop-blur-xl hover:scale-[1.02] transition-all"
                >
                  <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent('Hello Aries PhysioCare Borivali West Center, I would like to book a physiotherapy appointment.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    WhatsApp Desk (+91 8591981880)
                  </a>
                </Button>
              </div>

              {/* Trust Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center">
                  <div className="flex items-center justify-center gap-1 text-amber-400 text-sm font-black">
                    <Star className="w-4 h-4 fill-amber-400" /> 4.9 / 5.0
                  </div>
                  <div className="text-[11px] text-white/60 font-medium mt-0.5">285+ Google Reviews</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center">
                  <div className="text-white text-sm font-black">8:00 AM – 9:30 PM</div>
                  <div className="text-[11px] text-white/60 font-medium mt-0.5">Open 365 Days Daily</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center">
                  <div className="text-emerald-400 text-sm font-black">100% BPT Certified</div>
                  <div className="text-[11px] text-white/60 font-medium mt-0.5">Expert Physiotherapists</div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl text-center">
                  <div className="text-accent text-sm font-black">₹ 800 / Session</div>
                  <div className="text-[11px] text-white/60 font-medium mt-0.5">Standard In-Clinic Tariff</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CINEMATIC FACILITY GALLERY & REAL-TIME HUB CARD ────────── */}
        <section className="py-8 md:py-12 z-10 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Interactive Photo Showcase (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl bg-black/40 group">
                  <Image
                    src={allImages[activeImageIndex] || clinic.imageUrl}
                    alt={`${clinic.name} interior`}
                    fill
                    priority
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  {/* Status Overlays */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open Today · 8:00 AM – 9:30 PM
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.9 (285+ Reviews)
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                      Borivali West Flagship Clinic
                    </div>
                    <h3 className="font-headline text-xl sm:text-2xl font-bold text-white mt-0.5">
                      Parrk Riviera, New MHB Colony
                    </h3>
                  </div>
                </div>

                {/* Thumbnails Swiper Strip */}
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-md",
                        activeImageIndex === idx
                          ? "border-primary scale-105 ring-2 ring-primary/40 shadow-primary/30"
                          : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/40"
                      )}
                    >
                      <Image src={img} alt="Clinic Thumbnail" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Real-Time Front Desk & Information Hub (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="rounded-3xl border-2 border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-2xl shadow-2xl p-6 md:p-8 space-y-6 text-white">
                  <div className="space-y-2 border-b border-white/10 pb-5">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[10px] font-black uppercase tracking-widest">
                      <Building2 className="w-3 h-3" /> Official Clinic Information
                    </div>
                    <h3 className="font-headline text-2xl font-black text-white">
                      Borivali West Center
                    </h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      Walk-ins and scheduled appointments welcome. Complete diagnostic and physical therapy facilities on ground floor.
                    </p>
                  </div>

                  {/* Contact & Address Items */}
                  <div className="space-y-4 text-xs">
                    {/* Address with Copy Button */}
                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div className="space-y-1 flex-1">
                        <div className="font-bold text-white flex items-center justify-between">
                          <span>Physical Address</span>
                          <button
                            onClick={handleCopyAddress}
                            className="text-[10px] font-semibold text-accent hover:text-accent/80 flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10"
                          >
                            {copied ? <CheckCheck className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            {copied ? "Copied!" : "Copy"}
                          </button>
                        </div>
                        <p className="text-white/75 leading-relaxed font-sans">
                          {clinic.address}
                        </p>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white">Operating Timings</div>
                        <div className="text-white/75 mt-0.5">8:00 AM – 9:30 PM (Monday to Sunday)</div>
                      </div>
                    </div>

                    {/* Official Mobile Numbers */}
                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <div className="font-bold text-white">Clinic Direct Lines</div>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono font-bold text-white/90">
                          <a href="tel:+919136447006" className="text-primary hover:underline">+91 9136447006</a>
                          <span className="text-white/30">·</span>
                          <a href="tel:+919372681410" className="text-primary hover:underline">+91 9372681410</a>
                          <span className="text-white/30">·</span>
                          <a href="tel:+918591981880" className="text-primary hover:underline">+91 8591981880</a>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Desk */}
                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">WhatsApp Front Desk</div>
                        <a
                          href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent('Hello Aries PhysioCare Borivali West Center, I would like to book a physiotherapy appointment.')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline font-mono font-bold text-xs"
                        >
                          +91 8591981880 (Click to Chat)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Direct Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button
                      asChild
                      className="h-12 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20"
                    >
                      <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                        <Navigation className="w-4 h-4" />
                        Get Directions
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider"
                    >
                      <a href="tel:+919136447006" className="flex items-center justify-center gap-1.5">
                        <Phone className="w-4 h-4 text-emerald-400" />
                        Call Desk
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ── SPECIALIST MEDICAL DIRECTORS & SHIFTS ──────────────────── */}
        <section className="py-16 md:py-24 z-10 relative bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              
              {/* Section Header */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest shadow-sm">
                  <Award className="w-4 h-4" /> The Clinical Medical Board
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Specialists & Daily Shifts at Borivali West
                </h2>
                <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                  Consult with senior hospital-trained clinical physiotherapists available throughout the day.
                </p>
              </div>

              {/* 3 Specialist Doctor Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clinic.doctors.map((doc, dIdx) => {
                  const isLogo = !doc.imageUrl || doc.imageUrl.includes('aries-emblem') || doc.imageUrl.includes('default-avatar');
                  return (
                    <Card
                      key={dIdx}
                      className="rounded-3xl border-2 border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent backdrop-blur-xl p-6 flex flex-col justify-between shadow-2xl hover:border-primary/50 transition-all duration-500 group hover:-translate-y-1.5"
                    >
                      <div className="space-y-5">
                        {/* Avatar & Badges */}
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 shadow-xl",
                            isLogo
                              ? "bg-gradient-to-br from-[#3b0d5c] via-[#1a052a] to-[#0d0214] border-amber-400/30 flex items-center justify-center p-3"
                              : "border-primary/40"
                          )}>
                            <Image
                              src={doc.imageUrl}
                              alt={doc.name}
                              fill
                              className={cn(
                                isLogo
                                  ? "object-contain p-2.5 drop-shadow-[0_4px_12px_rgba(234,179,8,0.35)]"
                                  : "object-cover group-hover:scale-105 transition-transform duration-500"
                              )}
                            />
                          </div>

                          <div className="space-y-1 flex-1 min-w-0">
                            <h3 className="font-headline text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                              {doc.name}
                            </h3>
                            <p className="text-xs text-primary font-semibold tracking-wide">
                              {doc.qualification}
                            </p>
                            <Badge variant="outline" className="text-[10px] border-amber-400/40 text-amber-300 bg-amber-400/10 font-bold mt-1">
                              {doc.experience}
                            </Badge>
                          </div>
                        </div>

                        {/* Specialization Description */}
                        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-white/70 leading-relaxed min-h-[60px]">
                          {doc.specialization}
                        </div>
                      </div>

                      {/* Shift Timing Footer */}
                      <div className="pt-5 mt-5 border-t border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{doc.timings}</span>
                          </div>
                          <span className="text-[11px] text-white/50 font-medium">Daily Shift</span>
                        </div>

                        <Button
                          asChild
                          className="w-full h-11 rounded-xl bg-white/10 hover:bg-primary hover:text-white text-white border border-white/10 text-xs font-bold transition-all shadow-md"
                        >
                          <a
                            href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(`Hello, I would like to book a consultation with ${doc.name} during the shift ${doc.timings}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5"
                          >
                            <CalendarCheck className="w-3.5 h-3.5 text-accent" />
                            Book with {doc.name.split(' ')[1] || 'Doctor'}
                          </a>
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── OFFICIAL FEES & PACKAGES SECTION (AUTHENTIC TARIFF BOARD) ─ */}
        <section className="py-16 md:py-24 z-10 relative bg-gradient-to-b from-white/[0.03] via-white/[0.05] to-white/[0.02] border-y border-white/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto space-y-12">
              
              {/* Header */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
                  <Tag className="w-4 h-4" /> Official Clinic Pricing
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight underline decoration-primary/60 underline-offset-8">
                  Fees For Physiotherapy
                </h2>
                <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
                  Transparent, standardized consultation fees and advance rehabilitation packages.
                </p>
              </div>

              {/* Consultation / Regular Therapy Hero Card */}
              <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-primary/10 border-2 border-primary/40 shadow-2xl backdrop-blur-2xl text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-primary">
                  <Stethoscope className="w-4 h-4" /> Single Session
                </div>
                <h3 className="font-headline text-2xl sm:text-3xl font-black text-white">
                  Consultation / Regular Therapy
                </h3>
                <div className="font-headline text-5xl sm:text-6xl font-black bg-gradient-to-r from-amber-300 via-rose-400 to-primary bg-clip-text text-transparent tracking-tight py-1">
                  ₹ 800/-
                </div>
                <p className="text-xs text-white/70 font-medium max-w-md mx-auto">
                  Comprehensive physical assessment, electrotherapy modalities (IFT, Ultrasound, Laser), and specialized hands-on clinical therapy.
                </p>
              </div>

              {/* Packages Block */}
              <div className="space-y-6 pt-4">
                <div className="text-center space-y-1">
                  <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-black text-white">
                    Physiotherapy Packages
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide uppercase">
                    (Only on 100% Advance Payments)
                  </p>
                </div>

                {/* 3 Packages Cards Matching Uploaded Board */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clinic.packages.map((pkg, idx) => (
                    <Card
                      key={idx}
                      className={cn(
                        "rounded-3xl overflow-hidden border-2 transition-all duration-500 flex flex-col justify-between relative shadow-2xl hover:-translate-y-2",
                        pkg.isPopular
                          ? "border-primary bg-gradient-to-b from-primary/15 via-white/[0.06] to-transparent ring-2 ring-primary/30 shadow-primary/30"
                          : "border-white/15 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent hover:border-white/40"
                      )}
                    >
                      {pkg.isPopular && (
                        <div className="bg-gradient-to-r from-primary to-rose-600 text-white text-[11px] font-black uppercase tracking-[0.2em] py-1.5 text-center shadow-md">
                          ★ Most Popular Choice
                        </div>
                      )}

                      <div className="p-6 md:p-8 text-center space-y-5">
                        {/* Package Header Pill */}
                        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white font-headline text-2xl sm:text-3xl font-black shadow-lg">
                          {pkg.duration}
                        </div>

                        {/* Per Session Rate */}
                        <div className="space-y-1 pt-1">
                          <div className="text-xs font-bold text-white/60 uppercase tracking-widest">
                            Per Session
                          </div>
                          <div className="font-headline text-xl font-bold text-white">
                            {pkg.perSession}
                          </div>
                        </div>

                        {/* Total Price Box */}
                        <div className="py-4 px-5 rounded-2xl bg-white/[0.05] border border-white/10 space-y-1 shadow-inner">
                          <div className="text-[11px] font-medium text-white/50 uppercase tracking-wider">Total Package Price</div>
                          <div className="font-headline text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">
                            {pkg.totalPrice}
                          </div>
                        </div>

                        {/* Savings Badge */}
                        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black shadow-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          {pkg.savings}
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <BookAppointmentButton className="w-full h-12 rounded-xl text-xs font-bold shadow-lg shadow-primary/20">
                          Book {pkg.duration} Plan
                        </BookAppointmentButton>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Strict Notice Card Styled like Official Board Footer */}
                <div className="p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 text-center space-y-1 max-w-3xl mx-auto shadow-xl">
                  <div className="text-rose-400 font-headline font-black text-base sm:text-lg flex items-center justify-center gap-2">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                    Bargaining is not permitted.
                  </div>
                  <p className="text-xs text-white/70 font-medium">
                    If there are any offers or discounts available, they will be clearly advertised or displayed on our board.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ADVANCED IN-HOUSE EQUIPMENT & MODALITIES ──────────────── */}
        <section className="py-16 md:py-24 z-10 relative bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
                  <Zap className="w-4 h-4" /> Clinical Technology
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Hospital-Grade Modalities & Infrastructure
                </h2>
                <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                  State-of-the-art electrotherapy, decompression, and rehabilitation equipment available in-clinic.
                </p>
              </div>

              {/* Grid of Modalities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {clinic.equipment.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/40 transition-all duration-300 shadow-xl flex items-start gap-3.5 group hover:bg-white/[0.06]"
                  >
                    <div className="p-2.5 rounded-xl bg-primary/15 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                        {item}
                      </h4>
                      <span className="text-[10px] text-white/50 font-medium block mt-1">
                        In-House Certified
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amenities Banner */}
              <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
                <h3 className="font-headline text-base sm:text-lg font-bold text-white text-center mb-6 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Clinic Facilities & Patient Comfort
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Accessibility, label: "Wheelchair Accessible", sub: "Ground Floor Entry" },
                    { icon: Wind, label: "Air-Conditioned", sub: "Private Treatment Cabins" },
                    { icon: Car, label: "Dedicated Parking", sub: "Available on Site" },
                    { icon: Wifi, label: "Free Wi-Fi & Lounge", sub: "Waiting Area for Families" },
                  ].map((amenity, aIdx) => {
                    const IconComp = amenity.icon;
                    return (
                      <div key={aIdx} className="text-center p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                        <IconComp className="w-6 h-6 text-primary mx-auto" />
                        <div className="text-xs font-bold text-white">{amenity.label}</div>
                        <div className="text-[10px] text-white/50">{amenity.sub}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOME VISIT & PAN-INDIA ALTERNATIVE ─────────────────────── */}
        <section className="py-16 md:py-20 z-10 relative bg-gradient-to-t from-black/80 via-transparent to-transparent">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-primary/15 border-2 border-primary/30 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Home className="w-4 h-4" /> Can't Travel to Our Borivali Center?
                </div>
                <h3 className="font-headline text-2xl sm:text-3xl font-black text-white">
                  Hospital-Grade Physiotherapy at Your Home
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-lg leading-relaxed">
                  Our certified physiotherapists visit homes across all suburbs of Mumbai and major cities in India, bringing portable IFT, Ultrasound, and full rehabilitation modalities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full md:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-8 rounded-2xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-primary/25"
                >
                  <Link href="/book-appointment">Book Home Session</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
