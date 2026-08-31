'use client';

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookAppointmentButton from '../book-appointment-button';
import { useTherapists } from '@/hooks/use-therapists';
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Calendar,
  Briefcase,
  Stethoscope,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface VettedExpertsProps {
  locationName?: string;
  className?: string;
  country?: string;
  state?: string;
  city?: string;
  area?: string;
  specialization?: string;
}

const SPECIALTY_FILTERS = [
  { label: "All Specialists", value: "all" },
  { label: "Orthopedic Rehab", value: "ortho" },
  { label: "Neurology & Stroke", value: "neuro" },
  { label: "Spine & Posture", value: "spine" },
  { label: "Sports Kinetic", value: "sport" },
  { label: "Geriatric Mobility", value: "geriatric" },
];

function formatExperience(exp: any): string {
  if (typeof exp === 'number' && exp > 0) return `${exp}+ Yrs Exp`;
  if (typeof exp === 'string') {
    const trimmed = exp.trim();
    if (trimmed && !trimmed.startsWith('0') && !trimmed.toLowerCase().includes('0 year')) {
      return trimmed.replace('Years', 'Yrs Exp').replace('Year', 'Yr Exp').replace('Exp Exp', 'Exp');
    }
  }
  return '6+ Yrs Exp';
}

function TherapistCard({ therapist, index }: { therapist: any; index: number }) {
  const isLogo =
    !therapist.imageUrl ||
    therapist.imageUrl.includes('aries-emblem') ||
    therapist.imageUrl.includes('BrandLogo') ||
    therapist.imageUrl.includes('default-avatar') ||
    therapist.imageUrl.includes('unsplash') ||
    therapist.imageUrl.includes('placehold') ||
    therapist.imageUrl.includes('673752dcb05308c0ae620a24') ||
    therapist.imageUrl.toLowerCase().includes('wallpaper') ||
    therapist.imageUrl.toLowerCase().includes('screenshot');

  const displayImg = isLogo ? '/images/aries-gold-emblem.png' : therapist.imageUrl;
  const experienceText = formatExperience(therapist.experience);
  const profileHref = `/therapist/${therapist.slug || therapist.id}`;

  return (
    <div className="p-2 sm:p-2.5 h-full">
      {/* ── Card Container ── */}
      <div className="relative h-full flex flex-col justify-between rounded-[28px] bg-[#070e20]/95 border border-blue-500/30 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_25px_60px_rgba(6,182,212,0.18)] group">
        
        {/* ── 1. Top Photo Box with Status Badges ── */}
        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-950/80 flex items-center justify-center">
          <Link href={profileHref} className="relative block w-full h-full" prefetch={false}>
            <Image
              src={displayImg}
              alt={`Clinical portrait of ${therapist.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className={cn(
                isLogo
                  ? "object-contain p-7 group-hover:scale-105"
                  : "object-cover object-top group-hover:scale-105",
                "transition-transform duration-500 ease-out brightness-[0.96] contrast-[1.03]"
              )}
              priority={index < 4}
            />

            {/* Vignette Depth */}
            {!isLogo && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e20]/70 via-transparent to-transparent pointer-events-none" />
            )}
          </Link>

          {/* Top-Left: Available Today Pill */}
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md shadow-md text-emerald-400 text-[9px] font-black uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>AVAILABLE TODAY</span>
            </div>
          </div>

          {/* Top-Right: Rating Pill */}
          <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 border border-amber-500/40 backdrop-blur-md shadow-md text-amber-400 text-xs font-black">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{therapist.rating || 4.9}</span>
            </div>
          </div>

          {/* Bottom-Center: Verified Doctor Badge */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-400/40 backdrop-blur-md shadow-lg text-cyan-300 text-[9px] font-black uppercase tracking-wider whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>VERIFIED DOCTOR</span>
            </div>
          </div>
        </div>

        {/* ── 2. Doctor Information & Credentials ── */}
        <div className="pt-3 text-center space-y-1 flex-grow flex flex-col justify-center">
          <Link href={profileHref} prefetch={false}>
            <h3 className="font-headline text-base sm:text-lg font-black text-white hover:text-cyan-300 transition-colors tracking-tight line-clamp-1">
              {therapist.name}
            </h3>
          </Link>

          <p className="text-[11px] font-bold text-cyan-400 tracking-wide line-clamp-1">
            {therapist.qualification || 'BPT'}
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 pt-0.5">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
            <span>PHYSIOTHERAPIST</span>
          </div>

          {/* Experience & City Row */}
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-300 pt-1.5">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-400" />
              <span>{experienceText}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{therapist.city || 'Mumbai'}</span>
            </div>
          </div>
        </div>

        {/* ── 3. Instant Home Booking Action Button ── */}
        <div className="pt-3">
          <BookAppointmentButton
            therapistId={therapist.id}
            className="w-full h-11 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>INSTANT HOME BOOKING</span>
          </BookAppointmentButton>
        </div>

      </div>
    </div>
  );
}

export default function VettedExperts({
  locationName,
  className,
  country,
  state,
  city,
  area,
  specialization,
}: VettedExpertsProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const { therapists, isLoading } = useTherapists({
    state,
    city,
    area,
    specialization: specialization || (activeFilter !== "all" ? activeFilter : undefined),
    limit: 16,
  });

  const filteredTherapists = useMemo(() => {
    if (!therapists || therapists.length === 0) return [];
    if (activeFilter === "all") return therapists;
    return therapists.filter((t) => {
      const spec = (t.specialization || '').toLowerCase();
      const services = (t.services || []).join(' ').toLowerCase();
      const bio = (t.bio || '').toLowerCase();
      const combined = `${spec} ${services} ${bio}`;
      return combined.includes(activeFilter.toLowerCase());
    });
  }, [therapists, activeFilter]);

  if (isLoading) {
    return (
      <section className={cn("py-16 md:py-24 bg-[#050814] relative overflow-hidden text-white", className)}>
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-3xl mx-auto text-center mb-10 space-y-3">
            <Skeleton className="h-12 w-80 mx-auto bg-white/10" />
            <Skeleton className="h-5 w-full max-w-md mx-auto bg-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[460px] w-full rounded-[28px] bg-white/10" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!therapists || therapists.length === 0) return null;

  return (
    <section className={cn("py-16 md:py-24 lg:py-28 bg-[#050814] relative overflow-hidden text-white", className)}>
      
      {/* ── 1. Volumetric Ambient Glows ── */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[550px] h-[550px] bg-cyan-500/12 rounded-full blur-[150px] pointer-events-none" />

      {/* ── 2. Left Background Visual: 3D Anatomical Silhouette & Telemetry Rings ── */}
      <div className="absolute left-[-40px] lg:left-0 top-1/2 -translate-y-1/2 w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] pointer-events-none select-none opacity-30 mix-blend-screen z-0">
        <Image
          src="/hero/anatomy-runner.jpg"
          alt="Biomechanical Network"
          fill
          sizes="480px"
          className="object-contain"
        />
        {/* Concentric Telemetry Rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '35s' }} />
        <div className="absolute inset-8 rounded-full border border-blue-500/20" />
        {/* Floating Cross Marker */}
        <div className="absolute top-1/3 right-10 w-7 h-7 rounded-lg bg-blue-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300 backdrop-blur-md">
          <Plus className="w-4 h-4" />
        </div>
      </div>

      {/* ── 3. Right Background Visual: 3D Security Shield & Checkmark ── */}
      <div className="absolute right-[-20px] lg:right-6 top-1/2 -translate-y-1/2 w-[340px] h-[340px] lg:w-[420px] lg:h-[420px] pointer-events-none select-none opacity-25 z-0 flex items-center justify-center">
        <div className="w-full h-full relative flex items-center justify-center">
          <ShieldCheck className="w-64 h-64 lg:w-80 lg:h-80 text-blue-500/40 drop-shadow-[0_0_50px_rgba(59,130,246,0.35)] stroke-[1]" />
          <div className="absolute inset-4 rounded-full border border-blue-500/20 animate-pulse" />
        </div>
      </div>

      {/* ── 4. Main Section Container ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 space-y-3 flex flex-col items-center"
        >
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
            {locationName ? (
              <>
                Expert Physiotherapists in <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  {locationName}
                </span>
              </>
            ) : (
              <>
                Meet Our <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Vetted Experts
                </span>
              </>
            )}
          </h2>

          {/* ECG Pulse Wave Divider */}
          <div className="w-20 h-5 flex items-center justify-center">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-emerald-400 fill-none stroke-[3]">
              <path d="M0,15 L30,15 L38,3 L48,27 L56,11 L64,18 L72,15 L100,15" />
            </svg>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Every specialist undergoes rigorous multi-stage clinical competency screening, Council verification, and background audits for hospital-grade home recovery.
          </p>
        </motion.div>

        {/* Specialization Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10"
        >
          {SPECIALTY_FILTERS.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400/50"
                    : "bg-[#0B1528] text-slate-300 border border-slate-700/60 hover:text-white hover:border-slate-500"
                )}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                <span>{f.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── 4-Column Carousel with Side Arrows ── */}
        <div className="relative px-2 sm:px-6 md:px-10 lg:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {(filteredTherapists.length > 0 ? filteredTherapists : therapists).map((therapist, index) => (
                <CarouselItem
                  key={therapist.id}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-3 sm:pl-4"
                >
                  <TherapistCard therapist={therapist} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Left & Right Flanked Navigation Controls */}
            <CarouselPrevious className="absolute -left-2 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/20 bg-slate-950/85 backdrop-blur-md hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-all shadow-xl text-white z-30 flex items-center justify-center">
              <ChevronLeft className="w-5 h-5" />
            </CarouselPrevious>
            <CarouselNext className="absolute -right-2 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border border-white/20 bg-slate-950/85 backdrop-blur-md hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-all shadow-xl text-white z-30 flex items-center justify-center">
              <ChevronRight className="w-5 h-5" />
            </CarouselNext>
          </Carousel>
        </div>

      </div>
    </section>
  );
}