'use client';

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import BookAppointmentButton from '../book-appointment-button';
import { useTherapists } from '@/hooks/use-therapists';
import dynamic from "next/dynamic";
import {
  Award,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck,
  ArrowRight,
  Stethoscope,
  Activity,
  HeartPulse,
  Clock,
  Zap,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const Experts3DScene = dynamic(() => import("./experts-3d-scene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />
});

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
  if (typeof exp === 'number' && exp > 0) return `${exp}+ Yrs`;
  if (typeof exp === 'string') {
    const trimmed = exp.trim();
    if (trimmed && !trimmed.startsWith('0') && !trimmed.toLowerCase().includes('0 year')) {
      return trimmed.replace('Years', 'Yrs').replace('Year', 'Yr');
    }
  }
  return '6+ Yrs';
}

function getSpecialtyIcon(spec: string = '') {
  const s = spec.toLowerCase();
  if (s.includes('neuro') || s.includes('stroke')) return Activity;
  if (s.includes('ortho') || s.includes('spine') || s.includes('musculo')) return Stethoscope;
  if (s.includes('sport')) return Award;
  return HeartPulse;
}

function TherapistCard({ therapist, index }: { therapist: any; index: number }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

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
  const SpecIcon = getSpecialtyIcon(therapist.specialization);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="p-2 sm:p-3 h-full perspective-1000">
      {/* 3D Perspective Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative h-full flex flex-col justify-between rounded-[32px] p-[1.5px] bg-gradient-to-b from-white/20 via-cyan-500/15 to-violet-600/25 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 group hover:border-cyan-400/50 overflow-hidden"
      >
        {/* Dynamic Light Sheen on Cursor Hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
          }}
        />

        {/* Inner Card Surface */}
        <div className="relative flex flex-col justify-between h-full rounded-[30px] bg-[#070c1a]/95 border border-white/10 p-5 sm:p-6 space-y-5 overflow-hidden">
          
          {/* Top Header Strip: Verification Pill & Star Rating */}
          <div className="flex items-center justify-between gap-2 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-black uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clinical Directorate</span>
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-sm">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-black">{therapist.rating || 4.9}</span>
              <span className="text-[10px] text-slate-400 font-semibold">(100+)</span>
            </div>
          </div>

          {/* High-Definition Doctor Portrait Display */}
          <div className="flex flex-col items-center relative z-10 pt-1">
            <Link href={profileHref} className="relative block group/avatar cursor-pointer" prefetch={false}>
              <div className="relative w-36 h-44 sm:w-40 sm:h-48 p-[3px] rounded-2xl bg-gradient-to-br from-cyan-500/40 via-blue-600/30 to-violet-600/40 shadow-2xl ring-1 ring-white/20 transition-all duration-500 group-hover/avatar:ring-cyan-400/70 group-hover/avatar:shadow-[0_0_30px_rgba(6,182,212,0.3)] flex items-center justify-center">
                <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
                  <Image
                    src={displayImg}
                    alt={`Portrait of ${therapist.name}`}
                    fill
                    sizes="(max-width: 768px) 160px, 180px"
                    className={cn(
                      isLogo
                        ? "object-contain p-5 group-hover/avatar:scale-110 drop-shadow-[0_10px_25px_rgba(245,158,11,0.35)]"
                        : "object-cover object-top group-hover/avatar:scale-105",
                      "transition-transform duration-700 ease-out brightness-95 contrast-105"
                    )}
                    loading="lazy"
                  />

                  {!isLogo && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c1a] via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Verified Checkmark Badge on Bottom-Right */}
                  <div className="absolute bottom-2 right-2 z-20 w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg border-2 border-[#070c1a]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Live Availability Status Ribbon */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-black uppercase tracking-wider shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Available Today · Home Visits</span>
            </div>
          </div>

          {/* Doctor & Clinical Details */}
          <div className="space-y-2.5 text-center relative z-10 flex-grow">
            <div>
              <Link href={profileHref} prefetch={false}>
                <h3 className="font-headline text-lg sm:text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-1">
                  {therapist.name}
                </h3>
              </Link>
              <p className="text-xs font-bold text-cyan-400/90 mt-0.5 tracking-wide">
                {therapist.qualification || 'BPT, MPT · Certified Specialist'}
              </p>
            </div>

            {/* Specialization Badge */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-3.5 py-1 text-[11px] font-black uppercase tracking-wider bg-white/[0.05] text-slate-200 border border-white/10 rounded-xl flex items-center gap-1.5 shadow-sm"
              >
                <SpecIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{therapist.specialization || 'Physiotherapy Specialist'}</span>
              </Badge>
            </div>

            {/* Credentials Metric Micro-Grid */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{experienceText} Exp</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate max-w-[95px]">{therapist.city || 'Mumbai'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="space-y-2.5 pt-1 relative z-10">
            <BookAppointmentButton
              therapistId={therapist.id}
              className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:brightness-110 active:scale-[0.98] transition-all duration-300"
            >
              Instant Booking
            </BookAppointmentButton>

            <Link
              href={profileHref}
              className="text-[11px] font-bold text-slate-400 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1 py-0.5 group/link"
              prefetch={false}
            >
              <span>View Full Clinical Profile</span>
              <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>

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
      <section className={cn("py-18 md:py-28 bg-[#02050e] relative overflow-hidden text-white", className)}>
        <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-48 mx-auto rounded-full bg-white/10" />
            <Skeleton className="h-12 w-96 mx-auto bg-white/10" />
            <Skeleton className="h-6 w-full mx-auto bg-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[520px] w-full rounded-[32px] bg-white/10" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!therapists || therapists.length === 0) return null;

  return (
    <section className={cn("py-18 md:py-28 lg:py-32 bg-[#02050e] relative overflow-hidden text-white", className)}>
      
      {/* ── 1. 3D WebGL Background Scene (Concentric Biometric Rings & Constellation Field) ── */}
      <Experts3DScene />

      {/* ── 2. Cinematic Volumetric Lighting & Glows ── */}
      <div className="absolute top-1/4 right-1/6 w-[650px] h-[650px] bg-blue-600/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/6 w-[650px] h-[650px] bg-violet-600/12 rounded-full blur-[160px] pointer-events-none" />

      {/* ── 3. Cybernetic Precision Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '44px 44px'
        }}
      />

      {/* ── 4. Main Section Container (Fluid Widescreen Geometry without Side Gaps) ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-10 space-y-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glassmorphic border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Clinical Directorate · 100% Vetted</span>
          </div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            {locationName ? (
              <>
                Expert Physiotherapists in <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
                  {locationName}
                </span>
              </>
            ) : (
              <>
                Meet Our <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
                  Vetted Experts
                </span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Every specialist undergoes rigorous multi-stage clinical competency screening, Council verification, and background audits for hospital-grade home recovery.
          </p>
        </motion.div>

        {/* Specialization Quick Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10"
        >
          {SPECIALTY_FILTERS.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  "px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border flex items-center gap-1.5",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.35)] scale-105"
                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08] hover:text-white"
                )}
              >
                {isActive && <Check className="w-3.5 h-3.5 text-cyan-200" />}
                <span>{f.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Carousel Slider */}
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
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

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-12 w-12 rounded-2xl border border-white/20 bg-slate-950/80 backdrop-blur-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-xl text-white">
                <ChevronLeft className="w-5 h-5" />
              </CarouselPrevious>
              <CarouselNext className="relative right-0 top-0 translate-y-0 h-12 w-12 rounded-2xl border border-white/20 bg-slate-950/80 backdrop-blur-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-xl text-white">
                <ChevronRight className="w-5 h-5" />
              </CarouselNext>
            </div>
          </Carousel>
        </div>

        {/* Bottom Clinical Quality & Assurance Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center"
        >
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <ShieldCheck className="w-6 h-6 text-cyan-400 mx-auto" />
            <div className="text-xs font-bold text-white">Council-Verified BPT/MPT</div>
            <div className="text-[11px] text-slate-400">100% verified clinical credentials</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <Zap className="w-6 h-6 text-amber-400 mx-auto" />
            <div className="text-xs font-bold text-white">Full Treatment Gear Brought</div>
            <div className="text-[11px] text-slate-400">IFT, TENS & Ultrasound modalities</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <Clock className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-white">Same-Day Home Visits</div>
            <div className="text-[11px] text-slate-400">Rapid local dispatch across your area</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <Award className="w-6 h-6 text-violet-400 mx-auto" />
            <div className="text-xs font-bold text-white">2026 Registry Active</div>
            <div className="text-[11px] text-slate-400">Continuous milestone audits</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}