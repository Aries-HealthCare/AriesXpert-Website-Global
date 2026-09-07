'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Home, 
  ShieldCheck, 
  Clock, 
  HeartPulse, 
  ArrowRight, 
  Star, 
  Sparkles, 
  Activity, 
  Heart, 
  Smile, 
  Users, 
  Zap 
} from "lucide-react";
import { useRequestCallback } from '@/components/request-callback-provider';
import BookAppointmentButton from "../book-appointment-button";
import type { WebsiteStats } from "@/app/api/stats/route";

const patientAvatars = [
  '/images/avatar_d1.png',
  '/images/avatar_m1.png',
  '/images/avatar_f1.png',
  '/images/avatar_d2.png',
];

function formatCount(n: number | undefined | null, fallback = '450+'): string {
  if (n == null || isNaN(n)) return fallback;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1_000).toLocaleString()}+`;
  return `${n}+`;
}

export default function Hero() {
  const { openModal } = useRequestCallback();
  const [stats, setStats] = useState<WebsiteStats>({
    therapistCount: 450,
    patientCount: 15000,
    cityCount: 12,
  });

  useEffect(() => {
    fetch('/api/stats')
      .then(r => (r.ok ? r.json() : null))
      .then((data: WebsiteStats | null) => {
        if (data) setStats(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9FF] dark:bg-[#0A0914] pt-4 sm:pt-8 md:pt-12 pb-12 sm:pb-16 transition-colors duration-500">
      {/* Ambient decorative glowing backdrops */}
      <div className="absolute -top-24 -left-24 w-96 sm:w-[540px] h-96 sm:h-[540px] bg-purple-200/40 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-0 w-[400px] sm:w-[650px] h-[400px] sm:h-[650px] bg-indigo-100/50 dark:bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-[500px] h-[350px] bg-purple-100/40 dark:bg-purple-950/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* ──────── Left Column: Typography, Features & Actions ──────── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
            
            {/* Professional Healthcare Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Home Healthcare Services
                </span>
              </div>

              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-slate-200/60 dark:bg-slate-800/80 border border-slate-300/60 dark:border-slate-700/60 shadow-xs backdrop-blur-md">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Appointment Requests Online
                </span>
              </div>
            </div>

            {/* Impressive Main Typography */}
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[68px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.06] mb-5">
              Advanced Recovery <br />
              <span className="bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#F59E0B] dark:from-[#A78BFA] dark:via-[#C084FC] dark:to-[#FBBF24] bg-clip-text text-transparent">
                At Your Home.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mb-7">
              Expert physiotherapy and professional nursing care, now at your doorstep. Part of the trusted Aries clinical network.
            </p>

            {/* 4 Feature Icon Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
              {/* Pill 1: Home Visit Care */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-purple-100 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Home Visit<br className="hidden sm:inline" /> Care
                </div>
              </div>

              {/* Pill 2: Certified Professionals */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-emerald-100 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Certified<br className="hidden sm:inline" /> Professionals
                </div>
              </div>

              {/* Pill 3: Flexible Scheduling */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-amber-100 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Flexible<br className="hidden sm:inline" /> Scheduling
                </div>
              </div>

              {/* Pill 4: Personalized Treatment */}
              <div className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-blue-100 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Personalized<br className="hidden sm:inline" /> Treatment
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8">
              <BookAppointmentButton 
                size="lg" 
                className="h-14 px-8 text-base font-bold rounded-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#BE185D] hover:from-[#4F46E5] hover:via-[#7C3AED] hover:to-[#9D174D] text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-none group cursor-pointer"
              >
                Book Home Visit
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 inline-block transition-transform" />
              </BookAppointmentButton>

              <button
                type="button"
                onClick={() => openModal()}
                className="h-14 px-8 text-base font-bold rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-xs hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                Request Consultation
              </button>
            </div>

            {/* Social Proof Cluster */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <div className="flex items-center -space-x-2.5">
                {patientAvatars.map((src, i) => (
                  <div 
                    key={i} 
                    className="relative w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-xs shrink-0"
                  >
                    <Image 
                      src={src} 
                      alt="Verified Patient" 
                      fill 
                      sizes="40px" 
                      className="object-cover" 
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-amber-100 dark:bg-amber-950/90 text-amber-800 dark:text-amber-200 text-[11px] font-bold flex items-center justify-center shadow-xs shrink-0">
                  {stats ? formatCount(stats.therapistCount, '450+') : '450+'}
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Trusted by {stats ? formatCount(stats.therapistCount, '450+') : '450+'} patients
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">
                    for compassionate, effective care.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ──────── Right Column: Hero Visual, Floating Cards & Handwriting ──────── */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center pt-6 lg:pt-0">
            <div className="relative w-full max-w-[560px] lg:max-w-none">
              
              {/* Organic curved violet aura backdrop */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-[48px] sm:rounded-[64px] bg-gradient-to-tr from-purple-200/40 via-violet-100/30 to-purple-50/10 dark:from-purple-950/40 dark:via-violet-950/25 dark:to-transparent blur-2xl pointer-events-none" />

              {/* Central Clinical Photography Card */}
              <div className="relative rounded-[32px] sm:rounded-[44px] overflow-hidden shadow-2xl shadow-purple-900/10 dark:shadow-purple-950/50 border border-white/80 dark:border-slate-800/80 aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900 group">
                <Image
                  src="/images/hero-home-recovery.jpg"
                  alt="Aries PhysioCare Certified Physiotherapist gently assisting patient with home knee rehabilitation"
                  fill
                  priority
                  quality={92}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                  className="object-cover object-center scale-[1.02] group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Subtle depth gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Handwritten Script Annotation: "Healing Moves With You" + Arrow */}
              <div className="absolute -top-8 sm:-top-10 left-2 sm:-left-6 z-20 pointer-events-none">
                <div className="relative">
                  <span className="font-script text-3xl sm:text-4xl md:text-5xl text-slate-800 dark:text-purple-200 font-bold tracking-wide transform -rotate-6 inline-block drop-shadow-sm select-none">
                    Healing<br />
                    Moves With You
                  </span>
                  <svg 
                    className="w-16 sm:w-20 h-8 sm:h-10 text-slate-600 dark:text-purple-300 stroke-current ml-8 -mt-2 opacity-80" 
                    viewBox="0 0 100 45" 
                    fill="none"
                  >
                    <path d="M10 8 Q 55 35 85 20" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M76 18 L 86 21 L 82 29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Floating Glassmorphic Card 1 (Top-Right): Benefits List */}
              <div className="absolute -top-4 sm:-top-6 -right-2 sm:-right-4 z-20 animate-float">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/80 dark:border-slate-800 rounded-3xl p-3.5 sm:p-4 shadow-xl shadow-purple-500/10 min-w-[175px] sm:min-w-[195px] space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Reduce Pain
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Improve Mobility
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                      <Heart className="w-3.5 h-3.5 fill-pink-600 dark:fill-pink-400" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Better Quality of Life
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Smile className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Care at Home
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphic Card 2 (Bottom-Right): Professional Care In Comfort of Home */}
              <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:right-6 z-20 animate-float-delayed">
                <div className="bg-white/92 dark:bg-slate-900/92 backdrop-blur-xl border border-white/80 dark:border-slate-800 rounded-2xl p-3 sm:p-3.5 shadow-xl shadow-purple-500/10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      Professional Care
                    </p>
                    <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                      In the Comfort of Your Home
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ──────── Bottom Stats Strip ──────── */}
        <div className="mt-12 sm:mt-16 pt-2">
          <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-purple-100/90 dark:border-slate-800/80 rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xl shadow-purple-900/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-center divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800/80">
              
              {/* Stat 1: Specialists */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-4 first:pl-0">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {stats ? formatCount(stats.therapistCount, '450+') : '450+'}
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    SPECIALISTS
                  </p>
                </div>
              </div>

              {/* Stat 2: Patients Served */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 fill-indigo-600 dark:fill-indigo-400" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {stats ? formatCount(stats.patientCount, '450+') : '450+'}
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    PATIENTS SERVED
                  </p>
                </div>
              </div>

              {/* Stat 3: Service Availability */}
              <div className="flex items-center gap-4 pt-4 sm:pt-0 sm:pl-8">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 fill-violet-600 dark:fill-violet-400" />
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    Same-Day
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                    SERVICE AVAILABILITY
                  </p>
                </div>
              </div>

              {/* Stat 4: Decorative Slogan & Heart */}
              <div className="flex items-center justify-start sm:justify-center lg:justify-end gap-3 pt-4 sm:pt-0 sm:pl-8">
                <span className="font-script text-2xl sm:text-3xl text-slate-800 dark:text-purple-200 font-bold">
                  Your Recovery Our Priority
                </span>
                <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-500 flex items-center justify-center shrink-0 animate-pulse">
                  <Heart className="w-4 h-4 fill-pink-500" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

