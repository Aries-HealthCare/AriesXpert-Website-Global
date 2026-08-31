'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRequestCallback } from '@/components/request-callback-provider';
import BookAppointmentButton from "../book-appointment-button";
import HeroInteractiveCard from "./hero-interactive-card";
import HeroSplineBackground from "./hero-spline-background";
import { 
  ShieldCheck, 
  PhoneCall, 
  Star, 
  Users, 
  Clock, 
  ArrowRight, 
  Stethoscope, 
  Radio, 
  Briefcase, 
  User, 
  Plus
} from "lucide-react";
import type { WebsiteStats } from "@/app/api/stats/route";

function formatCount(n: number | undefined | null, fallback = '450+'): string {
  if (n == null || isNaN(n)) return fallback;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}K+`;
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
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#030712] py-12 md:py-16 lg:py-20 text-white">
      
      {/* ── 1. Medical 3D Animated Spline & Biomechanical Kinematics Background ── */}
      <HeroSplineBackground />

      {/* ── 2. Main Hero Container ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* ── Left Column: Headline, Badges, CTAs & 4 Stats Cards (7 cols) ── */}
          <div className="lg:col-span-7 text-left space-y-6 lg:space-y-7">
            
            {/* Top 3 Micro-Capsule Badges */}
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {/* Badge 1: Hospital-Grade Home Care */}
              <div className="py-1.5 px-3 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-400 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                <Plus className="w-3 h-3 text-emerald-400 stroke-[3]" />
                <span>HOSPITAL-GRADE HOME CARE</span>
              </div>

              {/* Badge 2: AI Clinical Precision */}
              <div className="py-1.5 px-3 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>AI CLINICAL PRECISION · TIER-1</span>
              </div>

              {/* Badge 3: ISO Protocol */}
              <div className="py-1.5 px-3 rounded-full border border-amber-500/40 bg-amber-950/30 text-amber-300 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>ISO 9001:2015 PROTOCOL</span>
              </div>
            </motion.div>

            {/* Main Bold Headline */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1"
            >
              <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl lg:text-[4.5rem] xl:text-[5.2rem] font-black text-white tracking-tight leading-[1.05]">
                Advanced Recovery <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-400 bg-clip-text text-transparent">
                  At Your Home.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Clinical Message */}
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-slate-300 font-light max-w-xl leading-relaxed"
            >
              Hospital-grade physiotherapy, post-surgical rehabilitation, and specialized nursing care delivered directly to your doorstep by verified BPT/MPT specialists with complete portable electrotherapy gear.
            </motion.p>

            {/* 3 Clinical Feature Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Zero</div>
                  <div className="text-[11px] text-slate-400">Clinic Commute</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <User className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Certified</div>
                  <div className="text-[11px] text-slate-400">Doctors & Physios</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <div className="font-bold text-white text-xs">Full Treatment</div>
                  <div className="text-[11px] text-slate-400">Gear Brought</div>
                </div>
              </div>
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <BookAppointmentButton 
                size="lg" 
                className="h-13 sm:h-14 px-7 sm:px-8 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Book Home Visit</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </BookAppointmentButton>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="h-13 sm:h-14 px-6 sm:px-7 rounded-xl bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-all"
                onClick={() => openModal()}
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Request Consultation</span>
              </Button>
            </motion.div>

            {/* 4 Stat Metric Cards in a Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3"
            >
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-left space-y-1 shadow-sm backdrop-blur-md">
                <Users className="w-5 h-5 text-blue-400 mb-1" />
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-headline">
                  {stats ? formatCount(stats.therapistCount, '450+') : '450+'}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SPECIALISTS
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-left space-y-1 shadow-sm backdrop-blur-md">
                <User className="w-5 h-5 text-blue-400 mb-1" />
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-headline">
                  {stats ? formatCount(stats.patientCount, '15K+') : '15K+'}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  PATIENTS SERVED
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-left space-y-1 shadow-sm backdrop-blur-md">
                <Clock className="w-5 h-5 text-blue-400 mb-1" />
                <div className="text-xl sm:text-2xl font-black text-white tracking-tight font-headline pt-0.5">
                  Same-Day
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SERVICE START
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 text-left space-y-1 shadow-sm backdrop-blur-md">
                <Star className="w-5 h-5 text-blue-400 mb-1" />
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight font-headline flex items-center gap-1">
                  4.9<span className="text-amber-400">★</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  GOOGLE RATED
                </div>
              </div>
            </motion.div>

          </div>

          {/* ── Right Column: Interactive Clinical Hub Card (5 cols) ── */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full"
            >
              <HeroInteractiveCard />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
