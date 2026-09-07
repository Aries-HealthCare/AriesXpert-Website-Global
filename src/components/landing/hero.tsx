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
import NatureAmbiance from "@/components/ui/nature-ambiance";
import TiltButton from "@/components/ui/tilt-button";

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
    <section className="relative w-full overflow-hidden bg-[#FAF9FF] dark:bg-[#0A0914] min-h-[calc(100vh-4rem)] lg:min-h-0 xl:min-h-[860px] flex flex-col justify-between transition-colors duration-500">
      {/* ── Botanical Nature Ambiance (Floating Green Leaves & Radiant Glows) ── */}
      <NatureAmbiance variant="hero" />

      {/* Ambient glowing radial light effects */}
      <div className="absolute -top-24 -left-24 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-purple-200/40 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-12 right-0 w-80 sm:w-[550px] h-80 sm:h-[550px] bg-indigo-100/50 dark:bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 left-1/3 w-96 h-64 bg-purple-100/40 dark:bg-purple-950/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container - Expands to fill available hero height with luxurious breathing room */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex-1 flex flex-col justify-between py-4 sm:py-6 lg:py-8 xl:py-10 relative z-10">
        
        {/* ──────── 2-Column Main Content Row ──────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center flex-1 my-auto">
          
          {/* ──────── Left Column: Headlines, Pills & CTAs ──────── */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center py-1 lg:py-0">
            
            {/* Professional Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-emerald-500/30 dark:border-emerald-500/40 shadow-sm backdrop-blur-md shining-card-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  🌿 100% Verified Home Physio
                </span>
              </div>

              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs backdrop-blur-md">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Same-Day Appointments
                </span>
              </div>
            </div>

            {/* Impressive Typography */}
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[56px] 2xl:text-[62px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.08] lg:leading-[1.10] mb-3.5 sm:mb-4 lg:mb-5">
              Advanced Recovery <br />
              <span className="text-[#6D28D9] dark:text-[#A78BFA]">At Your </span>
              <span className="text-[#059669] dark:text-[#34D399]">Home.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-[17px] xl:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-xl mb-5 sm:mb-6 lg:mb-7">
              Expert physiotherapy and professional nursing care, now at your doorstep. Part of the trusted Aries clinical network.
            </p>

            {/* 4 Feature Icon Pills: 2 spacious columns with shining borders */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:gap-3.5 mb-5 sm:mb-6 lg:mb-7">
              {/* Pill 1 */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shining-card-border cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">Home Visit</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight truncate">Care at Doorstep</p>
                </div>
              </div>

              {/* Pill 2 */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shining-card-border cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">Certified</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight truncate">Top Specialists</p>
                </div>
              </div>

              {/* Pill 3 */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shining-card-border cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">Flexible</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight truncate">Custom Times</p>
                </div>
              </div>

              {/* Pill 4 */}
              <div className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shining-card-border cursor-pointer">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight truncate">Personalized</p>
                  <p className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight truncate">Custom Plans</p>
                </div>
              </div>
            </div>

            {/* Action Buttons with 3D Tilt & Specular Light Shine */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6 lg:mb-7">
              <TiltButton
                onClick={() => openBookingModal({ sourcePath: '/' })}
                maxTilt={8}
                className="h-11 sm:h-12 lg:h-13 px-6 sm:px-8 text-sm lg:text-base font-bold rounded-full bg-gradient-to-r from-[#059669] via-[#10B981] to-[#7C3AED] hover:from-[#047857] hover:via-[#059669] hover:to-[#6D28D9] text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/35 border-none group cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <span>Book Home Visit</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 inline-block transition-transform" />
              </TiltButton>

              <TiltButton
                onClick={() => openModal()}
                maxTilt={7}
                className="h-11 sm:h-12 lg:h-13 px-6 sm:px-8 text-sm lg:text-base font-bold rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-xs hover:shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-emerald-500/40 cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Request Consultation
              </TiltButton>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center -space-x-2.5">
                {realTherapistAvatars.map((src, i) => (
                  <div 
                    key={i} 
                    className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden shadow-xs shrink-0 z-0"
                  >
                    <Image 
                      src={src} 
                      alt="Verified Aries Physiotherapist" 
                      fill 
                      sizes="36px" 
                      className="object-cover object-top" 
                    />
                  </div>
                ))}
                <div className="relative z-10 h-8 sm:h-9 px-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-amber-100 dark:bg-amber-950/90 text-amber-900 dark:text-amber-200 text-xs font-black flex items-center justify-center shadow-xs shrink-0 tracking-tight min-w-[40px]">
                  2.5k+
                </div>
              </div>

              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Trusted by 25k+ patients
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 ml-1">
                    for compassionate, effective care.
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ──────── Right Column: Expansive Hero Visual & Floating Elements ──────── */}
          <div className="lg:col-span-6 xl:col-span-6 h-full flex items-center justify-center relative pt-2 lg:pt-0">
            <div className="relative w-full max-w-[620px] lg:max-w-none">
              
              {/* Organic curved violet aura backdrop */}
              <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-tr from-purple-200/60 via-violet-100/50 to-indigo-100/40 dark:from-purple-900/30 dark:via-violet-950/25 dark:to-transparent rounded-[48px] sm:rounded-[64px] blur-3xl pointer-events-none" />

              {/* Expansive Clinical Photography Container */}
              <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[470px] xl:h-[530px] 2xl:h-[590px] rounded-[32px] sm:rounded-[44px] overflow-hidden shadow-2xl shadow-purple-900/15 dark:shadow-purple-950/50 border border-white dark:border-slate-800 bg-slate-100 dark:bg-slate-900 group">
                <Image
                  src="/images/hero-home-recovery.jpg"
                  alt="Aries PhysioCare Certified Physiotherapist gently assisting patient with home knee rehabilitation"
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  className="object-cover object-[center_16%] scale-[1.01] group-hover:scale-103 transition-transform duration-1000 ease-out"
                />
                {/* Subtle soft edge feathering into background on desktop */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9FF]/40 via-transparent to-transparent lg:block hidden pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Handwritten Script Annotation: "Healing Moves With You" + Arrow (Positioned in open space) */}
              <div className="absolute -top-5 sm:-top-7 left-1 sm:-left-4 lg:-left-8 xl:-left-12 z-20 pointer-events-none">
                <div className="relative">
                  <span className="font-script text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] text-slate-800 dark:text-purple-200 font-bold tracking-wide transform -rotate-6 inline-block select-none leading-[0.95] drop-shadow-sm">
                    Healing<br />
                    Moves<br />
                    With You
                  </span>
                  <svg 
                    className="w-14 sm:w-18 lg:w-20 h-7 sm:h-9 text-slate-600 dark:text-purple-300 stroke-current ml-3 -mt-1 opacity-85" 
                    viewBox="0 0 100 45" 
                    fill="none"
                  >
                    <path d="M10 8 Q 55 35 85 20" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M76 18 L 86 21 L 82 29" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Floating Glassmorphic Card 1 (Top-Right): Benefits List (hidden on small mobile to avoid obscuring patient) */}
              <div className="hidden sm:block absolute -top-4 -right-3 sm:-right-4 lg:-right-6 z-20 animate-float">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 shadow-xl shadow-purple-950/10 min-w-[145px] sm:min-w-[170px] space-y-2 shining-card-border hover:shadow-emerald-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                      Reduce Pain
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                      Improve Mobility
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400 flex items-center justify-center shrink-0">
                      <Heart className="w-3.5 h-3.5 fill-pink-600 dark:fill-pink-400" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                      Better Quality of Life
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      <Smile className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200">
                      Care at Home
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Glassmorphic Card 2 (Bottom-Right): Professional Care (tablet & desktop) */}
              <div className="hidden sm:block absolute bottom-4 sm:bottom-6 right-3 sm:right-6 lg:right-8 z-20 animate-float-delayed">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-100 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 shadow-xl shadow-purple-950/10 flex items-center gap-3 shining-card-border hover:shadow-emerald-500/20">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                    <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap">
                      Professional Care
                    </p>
                    <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5 leading-tight whitespace-nowrap">
                      In the Comfort of Your Home
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ──────── Bottom Stats Strip - Flush & Balanced at base ──────── */}
        <div className="w-full shrink-0 pt-6 sm:pt-8 lg:pt-10 pb-1 sm:pb-2 lg:pb-3">
          <div className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-purple-100/90 dark:border-slate-800/80 rounded-2xl sm:rounded-3xl py-3.5 px-4 sm:py-4 sm:px-6 lg:py-4.5 lg:px-8 shadow-lg shadow-purple-950/5 shining-card-border">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-center divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800/80">
              
              {/* Stat 1: Specialists */}
              <div className="flex items-center gap-3 sm:gap-4 sm:pl-4 first:pl-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    2.5k+
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                    SPECIALISTS
                  </p>
                </div>
              </div>

              {/* Stat 2: Patients Served */}
              <div className="flex items-center gap-3 sm:gap-4 sm:pl-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-indigo-600 dark:fill-indigo-400" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    25k+
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                    PATIENTS SERVED
                  </p>
                </div>
              </div>

              {/* Stat 3: Service Availability */}
              <div className="flex items-center gap-3 sm:gap-4 sm:pl-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-300 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-violet-600 dark:fill-violet-400" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    Same-Day
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                    SERVICE AVAILABILITY
                  </p>
                </div>
              </div>

              {/* Stat 4: Decorative Slogan & Heart */}
              <div className="flex items-center justify-start sm:justify-center lg:justify-end gap-3 sm:gap-4 sm:pl-4">
                <div className="text-right sm:text-center lg:text-right">
                  <p className="font-script text-xl sm:text-2xl lg:text-[24px] text-slate-800 dark:text-purple-200 font-bold leading-tight">
                    Your Recovery
                  </p>
                  <p className="font-script text-xl sm:text-2xl lg:text-[24px] text-slate-800 dark:text-purple-200 font-bold leading-tight -mt-1">
                    Our Priority
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-pink-100 dark:bg-pink-950/80 text-pink-500 flex items-center justify-center shrink-0 animate-pulse">
                  <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-pink-500" />
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}



