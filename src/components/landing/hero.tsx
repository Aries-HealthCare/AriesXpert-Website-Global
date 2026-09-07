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

const realTherapistAvatars = [
  '/images/therapist_avatar_1.jpg',
  '/images/therapist_avatar_2.jpg',
  '/images/therapist_avatar_3.jpg',
  '/images/therapist_avatar_4.jpg',
];

export default function Hero() {
  const { openModal, openBookingModal } = useRequestCallback();
  const [stats, setStats] = useState<WebsiteStats>({
    therapistCount: 2500,
    patientCount: 25000,
    cityCount: 12,
  });

  useEffect(() => {
    fetch('/api/stats')
      .then(r => (r.ok ? r.json() : null))
      .then((data: WebsiteStats | null) => {
        if (data) {
          setStats({
            therapistCount: Math.max(data.therapistCount || 0, 2500),
            patientCount: Math.max(data.patientCount || 0, 25000),
            cityCount: data.cityCount || 12,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#FAF9FF] dark:bg-[#0A0914] min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-4.5rem)] flex flex-col justify-between transition-colors duration-500">
      {/* Ambient glowing radial light effects */}
      <div className="absolute -top-24 -left-24 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-purple-200/40 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-0 w-80 sm:w-[550px] h-80 sm:h-[550px] bg-indigo-100/50 dark:bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/3 w-96 h-64 bg-purple-100/40 dark:bg-purple-950/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container - Expands to fill available hero height and distributes content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex-1 flex flex-col justify-between py-2 sm:py-2.5 lg:py-3 relative z-10">
        
        {/* ──────── 2-Column Main Content Row ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 xl:gap-10 items-center flex-1 my-auto py-1 sm:py-1.5">
          
          {/* ──────── Left Column: Headlines, Pills & CTAs ──────── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center py-0.5 lg:py-0">
            
            {/* Professional Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2 sm:mb-2.5">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Home Healthcare Services
                </span>
              </div>

              <div className="inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur-md">
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Appointment Requests Online
                </span>
              </div>
            </div>

            {/* Impressive Typography */}
            <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[48px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] mb-2 sm:mb-2.5">
              Advanced Recovery <br />
              <span className="text-[#6D28D9] dark:text-[#A78BFA]">At Your </span>
              <span className="text-[#D97706] dark:text-[#FBBF24]">Home.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-lg mb-2.5 sm:mb-3">
              Expert physiotherapy and professional nursing care, now at your doorstep. Part of the trusted Aries clinical network.
            </p>

            {/* 4 Feature Icon Pills: 2 cols on mobile, 4 on tablet, 2 on lg, 4 on xl */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-1.5 sm:gap-2 mb-3 sm:mb-3.5">
              {/* Pill 1 */}
              <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                  <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">Home Visit</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Care</p>
                </div>
              </div>

              {/* Pill 2 */}
              <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">Certified</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight truncate">Professionals</p>
                </div>
              </div>

              {/* Pill 3 */}
              <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">Flexible</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Scheduling</p>
                </div>
              </div>

              {/* Pill 4 */}
              <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-300">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate">Personalized</p>
                  <p className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-tight truncate">Treatment</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-3 sm:mb-3.5">
              <button
                type="button"
                onClick={() => openBookingModal({ sourcePath: '/' })}
                className="h-10 sm:h-11 md:h-12 px-4 sm:px-6 xl:px-7 text-xs sm:text-sm font-bold rounded-full bg-gradient-to-r from-[#6D28D9] via-[#8B5CF6] to-[#BE185D] hover:from-[#5B21B6] hover:via-[#7C3AED] hover:to-[#9D174D] text-white shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 border-none group cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Book Home Visit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 inline-block transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => openModal()}
                className="h-10 sm:h-11 md:h-12 px-4 sm:px-6 xl:px-7 text-xs sm:text-sm font-bold rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-xs hover:shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Request Consultation
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <div className="flex items-center -space-x-2">
                {realTherapistAvatars.map((src, i) => (
                  <div 
                    key={i} 
                    className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-xs shrink-0 z-0"
                  >
                    <Image 
                      src={src} 
                      alt="Verified Aries Physiotherapist" 
                      fill 
                      sizes="32px" 
                      className="object-cover object-top" 
                    />
                  </div>
                ))}
                <div className="relative z-10 h-7 sm:h-8 px-2 rounded-full border-2 border-white dark:border-slate-900 bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 text-xs font-black flex items-center justify-center shadow-xs shrink-0 tracking-tight min-w-[36px]">
                  2.5k+
                </div>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Trusted by 25k+ patients
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 ml-1">
                    for compassionate, effective care.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ──────── Right Column: Expansive Hero Visual & Floating Elements ──────── */}
          <div className="lg:col-span-6 xl:col-span-6 h-full flex items-center justify-center relative pt-1 lg:pt-0">
            <div className="relative w-full max-w-[560px] lg:max-w-none">
              
              {/* Organic curved violet aura backdrop */}
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-purple-200/50 via-violet-100/40 to-indigo-100/30 dark:from-purple-900/25 dark:via-violet-950/20 dark:to-transparent rounded-[44px] sm:rounded-[56px] blur-2xl pointer-events-none" />

              {/* Expansive Clinical Photography Container */}
              <div className="relative w-full h-[250px] sm:h-[300px] md:h-[330px] lg:h-[340px] xl:h-[390px] 2xl:h-[430px] rounded-[28px] sm:rounded-[40px] overflow-hidden shadow-2xl shadow-purple-900/10 dark:shadow-purple-950/40 border border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
                <Image
                  src="/images/hero-home-recovery.jpg"
                  alt="Aries PhysioCare Certified Physiotherapist gently assisting patient with home knee rehabilitation"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
                  className="object-cover object-[center_16%] scale-[1.01] group-hover:scale-103 transition-transform duration-1000 ease-out"
                />
                {/* Subtle soft edge feathering into background on desktop */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9FF]/40 via-transparent to-transparent lg:block hidden pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Handwritten Script Annotation: "Healing Moves With You" + Arrow (Positioned in open space) */}
              <div className="absolute -top-4 sm:-top-6 left-1 sm:-left-4 lg:-left-8 xl:-left-12 z-20 pointer-events-none">
                <div className="relative">
                  <span className="font-script text-xl sm:text-2xl lg:text-[30px] xl:text-[36px] text-slate-800 dark:text-purple-200 font-bold tracking-wide transform -rotate-6 inline-block select-none leading-[0.95] drop-shadow-sm">
                    Healing<br />
                    Moves<br />
                    With You
                  </span>
                  <svg 
                    className="w-12 sm:w-16 lg:w-18 h-6 sm:h-8 text-slate-600 dark:text-purple-300 stroke-current ml-3 -mt-1 opacity-85" 
                    viewBox="0 0 100 45" 
                    fill="none"
                  >
                    <path d="M10 8 Q 55 35 85 20" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M76 18 L 86 21 L 82 29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Floating Glassmorphic Card 1 (Top-Right): Benefits List (hidden on small mobile to avoid obscuring patient) */}
              <div className="hidden sm:block absolute -top-3.5 -right-3 z-20 animate-float">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-xl shadow-purple-950/10 min-w-[135px] sm:min-w-[160px] space-y-1.5 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Reduce Pain
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Improve Mobility
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                      <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-pink-600 dark:fill-pink-400" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Better Quality of Life
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Smile className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 dark:text-slate-200">
                      Care at Home
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphic Card 2 (Bottom-Right): Professional Care (tablet & desktop) */}
              <div className="hidden sm:block absolute bottom-3 sm:bottom-3.5 right-2 sm:right-4 z-20 animate-float-delayed">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-3 shadow-xl shadow-purple-950/10 flex items-center gap-1.5 sm:gap-2.5">
                  <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                    <Home className="w-3 h-3 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-sm font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap">
                      Professional Care
                    </p>
                    <p className="text-[9px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight whitespace-nowrap">
                      In the Comfort of Your Home
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ──────── Bottom Stats Strip - Flush at the base of the Hero block ──────── */}
        <div className="w-full shrink-0 pt-2 pb-1 sm:pb-2 lg:pb-3">
          <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-purple-100/90 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl py-2 px-3 sm:py-2.5 sm:px-5 lg:py-3 lg:px-6 shadow-lg shadow-purple-950/5">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 items-center divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800/80">
              
              {/* Stat 1: Specialists */}
              <div className="flex items-center gap-2.5 sm:gap-3 sm:pl-3 first:pl-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    2.5k+
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                    SPECIALISTS
                  </p>
                </div>
              </div>

              {/* Stat 2: Patients Served */}
              <div className="flex items-center gap-2.5 sm:gap-3 sm:pl-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-indigo-600 dark:fill-indigo-400" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    25k+
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                    PATIENTS SERVED
                  </p>
                </div>
              </div>

              {/* Stat 3: Service Availability */}
              <div className="flex items-center gap-2.5 sm:gap-3 sm:pl-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-violet-600 dark:fill-violet-400" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                    Same-Day
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                    SERVICE AVAILABILITY
                  </p>
                </div>
              </div>

              {/* Stat 4: Decorative Slogan & Heart */}
              <div className="flex items-center justify-start sm:justify-center lg:justify-end gap-2.5 sm:gap-3 sm:pl-4">
                <div className="text-right sm:text-center lg:text-right">
                  <p className="font-script text-lg sm:text-xl lg:text-[22px] text-slate-800 dark:text-purple-200 font-bold leading-tight">
                    Your Recovery
                  </p>
                  <p className="font-script text-lg sm:text-xl lg:text-[22px] text-slate-800 dark:text-purple-200 font-bold leading-tight -mt-1">
                    Our Priority
                  </p>
                </div>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-500 flex items-center justify-center shrink-0 animate-pulse">
                  <Heart className="w-3.5 h-3.5 fill-pink-500" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



