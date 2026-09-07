'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Building2,
  MapPin,
  Phone,
  Clock,
  Navigation,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Users,
  Heart,
  CalendarCheck,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Home,
  CheckCircle2,
  Building,
  Zap,
} from 'lucide-react';
import { ARIES_CLINICS_DIRECTORY } from '@/lib/clinics-data';
import { REGIONAL_HUBS_DATA, FLAGSHIP_GALLERY_IMAGES } from '@/lib/clinics-hubs-data';
import { getOrganizationSchema, getBreadcrumbSchema, getMedicalClinicSchema } from '@/lib/seo-schemas';
import { cn } from '@/lib/utils';
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  scaleUp,
  cardReveal,
  staggerContainer,
  viewportConfig,
} from '@/hooks/use-scroll-animation';

export default function ClinicsPage() {
  const clinic = ARIES_CLINICS_DIRECTORY[0];
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const prevImage = () => {
    setActiveGalleryIndex((prev) =>
      prev === 0 ? FLAGSHIP_GALLERY_IMAGES.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setActiveGalleryIndex((prev) =>
      prev === FLAGSHIP_GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  const jsonLd = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Our Clinics', url: '/clinic' },
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

      <div className="flex flex-col min-h-screen bg-[#faf8fd] dark:bg-[#07020d] text-foreground transition-colors duration-300">
        {/* Ambient Top Background Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-purple-200/50 via-purple-100/20 to-transparent dark:from-purple-900/20 dark:via-purple-950/10 rounded-full blur-[140px]" />
          <div className="absolute top-[38%] -left-32 w-80 h-80 bg-purple-200/40 dark:bg-purple-900/10 rounded-full blur-[120px]" />
          <div className="absolute top-[65%] -right-32 w-80 h-80 bg-pink-200/30 dark:bg-pink-900/10 rounded-full blur-[120px]" />
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            1. HERO SECTION: "Our Physical Clinics & Regional Operations"
        ═════════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 z-10 overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
              
              {/* Left Column: Heading & 4 Feature Badges */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="lg:col-span-6 space-y-6"
              >
                {/* Pill Tag */}
                <motion.div variants={fadeUp} className="inline-flex">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100/90 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/60 text-purple-700 dark:text-purple-300 text-xs font-bold tracking-wider uppercase">
                    PHYSICAL CLINICS &amp; HOME CARE HUBS
                  </span>
                </motion.div>

                {/* Main Headline */}
                <motion.div variants={fadeUp} className="space-y-3">
                  <h1 className="font-headline text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                    Our Physical Clinics &amp;{' '}
                    <span className="bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#d946ef] bg-clip-text text-transparent">
                      Regional Operations
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                    Visit our state-of-the-art walk-in wellness clinics or receive same-day hospital-grade home physical therapy dispatched from your local city hub.
                  </p>
                </motion.div>

                {/* 4 Feature Badges in Horizontal Row on Desktop */}
                <motion.div
                  variants={fadeUp}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
                >
                  {[
                    {
                      label: 'Modern Infrastructure',
                      icon: Building2,
                    },
                    {
                      label: 'Experienced Specialists',
                      icon: Users,
                    },
                    {
                      label: 'Personalized Treatment Plans',
                      icon: ShieldCheck,
                    },
                    {
                      label: 'Care Closer to Home',
                      icon: Heart,
                    },
                  ].map((feat, idx) => {
                    const IconComp = feat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-white/90 dark:bg-white/[0.04] border border-purple-100/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start gap-2.5 group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                          {feat.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>

              {/* Right Column: Reception Desk Image with Stacked Slogan */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="lg:col-span-6 relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl shadow-purple-500/10 border border-purple-100 dark:border-white/15 bg-white dark:bg-black/40">
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full">
                    <Image
                      src="/images/clinics/hero-clinic-visual-full.png"
                      alt="Aries PhysioCare Clinic Reception and Wellness Center"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            2. OFFICIAL WALK-IN CLINIC CENTERS: Flagship Clinic Showcase
        ═════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 z-10 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Section Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Official Walk-In Clinic Centers
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Equipped with advanced therapeutic modalities, private assessment suites, and senior consultants.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-xs font-bold self-start sm:self-auto shrink-0 shadow-sm"
              >
                <a
                  href={clinic.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  Find the Nearest Clinic
                </a>
              </Button>
            </motion.div>

            {/* Flagship Clinic Card */}
            <motion.div
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="rounded-3xl border border-purple-100/90 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-xl p-5 sm:p-7 md:p-8 backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Gallery Showcase (7 cols) */}
                <div className="lg:col-span-7 space-y-3">
                  {/* Main Active Image */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-white/10 shadow-md group">
                    <Image
                      src={FLAGSHIP_GALLERY_IMAGES[activeGalleryIndex].url}
                      alt={FLAGSHIP_GALLERY_IMAGES[activeGalleryIndex].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />

                    {/* Flagship Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-700/90 text-white text-xs font-bold backdrop-blur-md shadow-md">
                      <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      Flagship Clinic
                    </div>
                  </div>

                  {/* Thumbnail Row with Arrow Navigation */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={prevImage}
                      aria-label="Previous Photo"
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-slate-700 dark:text-white flex items-center justify-center transition-colors shrink-0"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-4 gap-2.5 flex-1">
                      {FLAGSHIP_GALLERY_IMAGES.map((item, idx) => (
                        <button
                          key={item.id}
                          onClick={() => setActiveGalleryIndex(idx)}
                          className={cn(
                            "relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-sm",
                            activeGalleryIndex === idx
                              ? "border-purple-600 scale-105 ring-2 ring-purple-600/30"
                              : "border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100"
                          )}
                        >
                          <Image
                            src={item.thumbUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={nextImage}
                      aria-label="Next Photo"
                      className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-slate-700 dark:text-white flex items-center justify-center transition-colors shrink-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Clinic Details (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-headline text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {clinic.name}
                    </h3>

                    {/* Star Rating */}
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {clinic.googleRating}/5
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        ({clinic.reviewCount} Google Reviews)
                      </span>
                    </div>
                  </div>

                  {/* Location & Timings */}
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-1" />
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {clinic.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        Open Daily: {clinic.workingHours}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      asChild
                      className="h-12 px-6 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02]"
                    >
                      <Link href={`/clinic/${clinic.slug}`} className="flex items-center gap-2">
                        View Clinic &amp; Doctors
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-12 px-6 rounded-full border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02]"
                    >
                      <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-600" />
                        Call Clinic
                      </a>
                    </Button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            3. REGIONAL HOME-CARE OPERATIONAL HUBS (8 CITIES GRID)
        ═════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-16 z-10 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            {/* Header */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h2 className="font-headline text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Regional Home-Care Operational Hubs
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Select your city to explore dedicated neighborhood dispatch coverage and active specialists.
                </p>
              </div>

              <Link
                href="/locations"
                className="text-purple-600 hover:text-purple-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
              >
                Expanding to More Cities
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* 8 Cities Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {REGIONAL_HUBS_DATA.map((hub) => (
                <motion.div
                  key={hub.city}
                  variants={cardReveal}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-purple-100/80 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <Link href={`/${hub.slug}`} className="block h-full">
                    {/* Top Landmark Image */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-white/5">
                      <Image
                        src={hub.image}
                        alt={hub.altText}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Bottom Content Row */}
                    <div className="p-4 flex items-center justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-headline text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                          {hub.city}
                        </h3>
                        <div className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                          {hub.hubCount}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {hub.areas}
                        </p>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-white/5 text-purple-600 group-hover:bg-purple-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════════════
            4. "CARE BEYOND BOUNDARIES" CTA BANNER
        ═════════════════════════════════════════════════════════════════════ */}
        <section className="py-12 md:py-20 z-10 relative">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="rounded-[32px] bg-gradient-to-br from-[#f8f3ff] via-[#fdfbff] to-[#f4ebfe] dark:from-purple-950/40 dark:via-background dark:to-purple-950/30 border border-purple-200/80 dark:border-purple-800/40 p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-2xl"
            >
              {/* Decorative Subtle Wave Glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-300/20 dark:bg-purple-800/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side: Copy & Buttons */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex">
                    <span className="px-3.5 py-1.5 rounded-full bg-purple-100/90 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider">
                      CARE BEYOND BOUNDARIES
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                      Bringing World-Class{' '}
                      <span className="bg-gradient-to-r from-[#7c3aed] via-[#9333ea] to-[#f59e0b] bg-clip-text text-transparent">
                        Physiotherapy to Every Home
                      </span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                      From our clinics to your doorstep — we are building a healthier, stronger tomorrow, together.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      asChild
                      className="h-12 px-7 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-500/25 transition-all hover:scale-[1.02]"
                    >
                      <Link href="/book-appointment" className="flex items-center gap-2">
                        Book an Appointment
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-12 px-7 rounded-2xl border-2 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 font-bold text-xs sm:text-sm transition-all hover:scale-[1.02]"
                    >
                      <a
                        href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent('Hello Aries PhysioCare team, I would like to enquire about in-clinic and home physiotherapy.')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-500" />
                        Talk to Our Team
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Right Side: Therapist Photo & Floating Script */}
                <div className="lg:col-span-5 relative flex flex-col items-center">
                  <div className="relative w-full max-w-sm aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-purple-100 dark:border-white/10 bg-white">
                    <Image
                      src="/images/clinics/care-therapist-clean.png"
                      alt="Aries PhysioCare Home Care Physiotherapy"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />

                    {/* Overlay Script on top-right of image */}
                    <div className="absolute right-3 top-3 text-right">
                      <span className="font-script text-lg sm:text-xl text-purple-800 dark:text-purple-200 font-bold rotate-[-3deg] block leading-snug drop-shadow-sm">
                        Healthier People<br/>Stronger Communities ♡
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4-Stat Floating Bar */}
              <div className="mt-10 pt-8 border-t border-purple-200/60 dark:border-white/10">
                <div className="rounded-2xl sm:rounded-full bg-white/90 dark:bg-white/[0.05] border border-purple-100 dark:border-white/10 shadow-lg p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { number: '10+', label: 'Cities (India)', icon: Building },
                    { number: '50+', label: 'Partner Clinics', icon: Building2 },
                    { number: '1,000+', label: 'Lives Impacted', icon: Users },
                    { number: '24/7', label: 'Care Support', icon: Clock },
                  ].map((stat, sIdx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={sIdx} className="flex items-center gap-3 px-2 sm:px-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100/90 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                          <StatIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-headline text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-tight">
                            {stat.number}
                          </div>
                          <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </div>
        </section>

      </div>
    </>
  );
}
