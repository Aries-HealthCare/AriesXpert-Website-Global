'use client';

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeUp, cardReveal, viewportConfig } from '@/hooks/use-scroll-animation';

interface VettedExpertsProps {
  locationName?: string;
  className?: string;
  country?: string;
  state?: string;
  city?: string;
  area?: string;
  specialization?: string;
}

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

  const displayImg = isLogo ? '/images/aries-emblem.png' : therapist.imageUrl;
  const experienceText = formatExperience(therapist.experience);
  const profileHref = `/therapist/${therapist.slug || therapist.id}`;
  const SpecIcon = getSpecialtyIcon(therapist.specialization);

  return (
    <motion.div
      className="p-2.5 h-full"
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={cardReveal}
    >
      <Card className="group relative h-full flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/20 dark:border-white/10 bg-gradient-to-b from-card via-card/95 to-card/90 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/95 backdrop-blur-2xl shadow-xl transition-all duration-500 hover:-translate-y-2.5 hover:border-primary/50 hover:shadow-[0_25px_60px_-15px_rgba(0,122,255,0.25)]">
        {/* Top ambient radial glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 bg-gradient-to-br from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* ── Top Header Strip: Verification & Rating ── */}
        <div className="p-4 pb-2 flex items-center justify-between z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/25 text-primary text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>Clinical Directorate</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-600 dark:text-amber-400 shadow-sm">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-black">{therapist.rating || 4.9}</span>
            <span className="text-[9px] text-muted-foreground font-medium hidden sm:inline">(100+)</span>
          </div>
        </div>

        {/* ── Passport-Sized Portrait Display ── */}
        <div className="px-4 pt-2 pb-2 flex flex-col items-center relative z-10">
          <Link href={profileHref} className="relative block group/avatar cursor-pointer" prefetch={false}>
            {/* Passport Credential Frame */}
            <div className="relative w-32 h-40 sm:w-36 sm:h-44 p-[3px] rounded-2xl bg-gradient-to-br from-primary/50 via-accent/30 to-primary/20 shadow-2xl ring-1 ring-white/20 transition-all duration-500 group-hover:ring-primary/60 group-hover:shadow-primary/20 flex items-center justify-center">
              <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-950 flex items-center justify-center">
                <Image
                  src={displayImg}
                  alt={`Passport portrait of ${therapist.name}`}
                  fill
                  sizes="(max-width: 768px) 144px, 160px"
                  className={cn(
                    isLogo
                      ? "object-contain p-6 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(234,179,8,0.3)]"
                      : "object-cover object-top group-hover:scale-105",
                    "transition-transform duration-700 ease-out"
                  )}
                  loading="lazy"
                />

                {!isLogo && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Verified Shield Badge on Bottom-Right */}
                <div className="absolute bottom-1.5 right-1.5 z-20 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-2 border-background">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>
          </Link>

          {/* Availability Status Ribbon */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Home Visits</span>
          </div>
        </div>

        {/* ── Doctor & Clinical Details ── */}
        <CardContent className="px-5 py-2 flex-grow space-y-2.5 text-center relative z-10">
          <div>
            <Link href={profileHref} prefetch={false}>
              <h3 className="font-headline text-lg sm:text-xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {therapist.name}
              </h3>
            </Link>
            <p className="text-xs font-bold text-primary/90 mt-0.5 tracking-wide">
              {therapist.qualification || 'BPT, MPT'}
            </p>
          </div>

          {/* Specialization Badge */}
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider bg-secondary/80 text-foreground border border-border/60 rounded-full flex items-center gap-1.5 shadow-sm"
            >
              <SpecIcon className="w-3 h-3 text-primary" />
              <span>{therapist.specialization || 'Physiotherapy Specialist'}</span>
            </Badge>
          </div>

          {/* Credentials Metric Micro-Grid */}
          <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground">
            <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-xl bg-secondary/30">
              <Award className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>{experienceText} Exp</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-xl bg-secondary/30">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="truncate max-w-[90px]">{therapist.city || 'Mumbai'}</span>
            </div>
          </div>
        </CardContent>

        {/* ── Action Buttons Footer ── */}
        <CardFooter className="p-4 pt-1 flex flex-col gap-2 relative z-10">
          <BookAppointmentButton
            therapistId={therapist.id}
            className="w-full h-11 rounded-2xl bg-gradient-to-r from-primary via-blue-600 to-indigo-600 hover:from-primary/95 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 active:scale-[0.98]"
          >
            Instant Booking
          </BookAppointmentButton>

          <Link
            href={profileHref}
            className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-1 py-0.5"
            prefetch={false}
          >
            <span>View Full Clinical Profile</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
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
  const { therapists, isLoading } = useTherapists({
    state,
    city,
    area,
    specialization,
    limit: 12,
  });

  if (isLoading) {
    return (
      <section className={cn("py-10 md:py-16 bg-background relative overflow-hidden", className)}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
            <Skeleton className="h-8 w-48 mx-auto rounded-full" />
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[460px] w-full rounded-[28px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!therapists || therapists.length === 0) return null;

  return (
    <section className={cn("py-12 md:py-20 bg-background relative overflow-hidden", className)}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-12 space-y-4 flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] shadow-sm">
            <Award className="w-4 h-4 text-accent" /> Clinical Directorate
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
            {locationName ? (
              <>
                Expert Physiotherapists in <span className="text-primary">{locationName}</span>
              </>
            ) : (
              <>
                Meet Our <span className="text-primary">Vetted Experts</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Every specialist undergoes a multi-stage competency screening, ensuring hospital-grade recovery at home.
          </p>
        </motion.div>

        {/* Carousel Slider */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          autoPlay={4000}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {therapists.map((therapist, index) => (
              <CarouselItem
                key={therapist.id}
                className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-3"
              >
                <TherapistCard therapist={therapist} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Slider Navigation Controls */}
          <div className="flex justify-center gap-4 mt-10">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-11 w-11 rounded-xl border border-border bg-card/80 backdrop-blur-md hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </CarouselPrevious>
            <CarouselNext className="relative right-0 top-0 translate-y-0 h-11 w-11 rounded-xl border border-border bg-card/80 backdrop-blur-md hover:bg-primary hover:text-white transition-all duration-300 shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </CarouselNext>
          </div>
        </Carousel>

        {/* Registry Trust Seal */}
        <div className="mt-12 text-center">
          <p className="text-[10px] font-black text-primary/80 uppercase tracking-[0.3em]">
            Aries Clinical Directorate • 2026 Registry Active
          </p>
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mt-3" />
        </div>
      </div>
    </section>
  );
}