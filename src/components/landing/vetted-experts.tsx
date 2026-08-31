'use client';

import React, { useState, useMemo, useRef } from "react";
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
  Check,
  UserCheck
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
  // 3D Tilt specifically for the photo frame ONLY
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const photoBoxRef = useRef<HTMLDivElement>(null);

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

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!photoBoxRef.current) return;
    const rect = photoBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handlePhotoMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="p-2 sm:p-3 h-full">
      {/* ── Modern Luxury Passport Card Surface ── */}
      <div className="relative h-full flex flex-col justify-between rounded-[32px] p-[1.5px] bg-gradient-to-b from-white/20 via-cyan-500/15 to-violet-600/25 shadow-[0_25px_70px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 group hover:border-cyan-400/50 hover:shadow-[0_30px_90px_rgba(6,182,212,0.2)] overflow-hidden">
        
        {/* Inner Card Container */}
        <div className="relative flex flex-col justify-between h-full rounded-[30px] bg-[#070c1a]/95 border border-white/10 p-5 sm:p-6 space-y-6 overflow-hidden">
          
          {/* ── 1. Full Doctor Hero Visual Stage (3D Tilt ON Photo Frame ONLY) ── */}
          <div className="relative w-full">
            <Link href={profileHref} className="relative block w-full group/avatar cursor-pointer" prefetch={false}>
              
              {/* Photo Box with Smooth 3D Hover Tilt */}
              <div
                ref={photoBoxRef}
                onMouseMove={handlePhotoMouseMove}
                onMouseLeave={handlePhotoMouseLeave}
                style={{
                  transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                  transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                className="relative w-full aspect-[3/3.6] sm:aspect-[3/3.5] rounded-2xl p-[2px] bg-gradient-to-br from-cyan-500/40 via-blue-600/30 to-violet-600/40 shadow-2xl ring-1 ring-white/20 transition-all duration-300 group-hover/avatar:ring-cyan-400/80 group-hover/avatar:shadow-[0_0_35px_rgba(6,182,212,0.35)] overflow-hidden"
              >
                {/* Dynamic Cursor Light Sheen */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-30"
                  style={{
                    background: `radial-gradient(circle 260px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
                  }}
                />

                {/* Inner Image Surface Showing Full Doctor Coat/Apron & Logo */}
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#090e1c] to-[#04060e] flex items-center justify-center">
                  <Image
                    src={displayImg}
                    alt={`Full clinical portrait of ${therapist.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className={cn(
                      isLogo
                        ? "object-contain p-8 group-hover/avatar:scale-110 drop-shadow-[0_10px_35px_rgba(245,158,11,0.4)]"
                        : "object-cover object-top group-hover/avatar:scale-105",
                      "transition-transform duration-700 ease-out brightness-[0.97] contrast-[1.04]"
                    )}
                    priority={index < 4}
                  />

                  {/* Soft Vignette Overlay */}
                  {!isLogo && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070c1a] via-transparent to-transparent pointer-events-none" />
                  )}

                  {/* Top-Left: Floating Live Availability Status Ribbon */}
                  <div className="absolute top-3 left-3 z-20">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md shadow-lg text-emerald-300 text-[10px] font-black uppercase tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      <span>Available Today</span>
                    </div>
                  </div>

                  {/* Top-Right: Star Rating Badge */}
                  <div className="absolute top-3 right-3 z-20">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/85 border border-amber-500/40 backdrop-blur-md shadow-lg text-amber-300 text-xs font-black">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{therapist.rating || 4.9}</span>
                    </div>
                  </div>

                  {/* Bottom-Right: Council Verified Directorate Seal */}
                  <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-400/40 backdrop-blur-md shadow-lg text-cyan-300 text-[10px] font-black tracking-wider uppercase">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Verified Doctor</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* ── 2. Doctor Clinical Identity & Specialization Deck ── */}
          <div className="space-y-3 text-center relative z-10 flex-grow">
            <div>
              <Link href={profileHref} prefetch={false}>
                <h3 className="font-headline text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors duration-300 line-clamp-1">
                  {therapist.name}
                </h3>
              </Link>
              <p className="text-xs font-bold text-cyan-400/90 mt-1 tracking-wide">
                {therapist.qualification || 'BPT, MPT · Certified Physiotherapist'}
              </p>
            </div>

            {/* Specialization Category Badge */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-3.5 py-1.5 text-xs font-black uppercase tracking-wider bg-white/[0.05] text-slate-200 border border-white/10 rounded-xl flex items-center gap-2 shadow-sm"
              >
                <SpecIcon className="w-4 h-4 text-cyan-400" />
                <span>{therapist.specialization || 'Physiotherapy Specialist'}</span>
              </Badge>
            </div>

            {/* Micro-Credentials Grid */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{experienceText} Exp</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/[0.03] border border-white/5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate max-w-[100px]">{therapist.city || 'Mumbai'}</span>
              </div>
            </div>
          </div>

          {/* ── 3. High-Conversion Action Button Area ── */}
          <div className="space-y-2.5 pt-1 relative z-10">
            <BookAppointmentButton
              therapistId={therapist.id}
              className="w-full h-13 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(37,99,235,0.35)] hover:brightness-110 active:scale-[0.98] transition-all duration-300"
            >
              Instant Home Booking
            </BookAppointmentButton>

            <Link
              href={profileHref}
              className="text-[11px] font-bold text-slate-400 hover:text-cyan-300 transition-colors flex items-center justify-center gap-1.5 py-0.5 group/link"
              prefetch={false}
            >
              <span>View Clinical Profile & Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
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
              <Skeleton key={i} className="h-[560px] w-full rounded-[32px] bg-white/10" />
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
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
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

        {/* ── Carousel Slider with Flanked Side Navigation Arrows ── */}
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

            {/* Flanked Side Navigation Controls (Vertically Centered on Card Row Sides) */}
            <CarouselPrevious className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-white/20 bg-[#070c1a]/90 backdrop-blur-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-white z-30 flex items-center justify-center">
              <ChevronLeft className="w-6 h-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-white/20 bg-[#070c1a]/90 backdrop-blur-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-white z-30 flex items-center justify-center">
              <ChevronRight className="w-6 h-6" />
            </CarouselNext>
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