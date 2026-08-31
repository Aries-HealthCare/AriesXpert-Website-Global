'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
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
  CheckCircle2,
  Stethoscope,
  Radio,
  FileCheck,
  Briefcase,
  User,
  MessageSquare
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
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#050814] dark:bg-[#050814] light:bg-[#f8fafc] py-12 md:py-16 lg:py-20">
      
      {/* ── 1. Medical 3D Animated Spline & Biomechanical Kinematics Background ── */}
      <HeroSplineBackground />

      {/* ── 4. Main Hero Container ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* ── Left Column: Headline, Bullets, CTAs & 4 Stats Cards (7 cols) ── */}
          <div className="lg:col-span-7 text-left space-y-6 lg:space-y-8">
            
            {/* Top 3 Micro-Capsule Badges */}
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
            >
              {/* Badge 1: Hospital-Grade Home Care */}
              <div className="py-1.5 px-3.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 dark:bg-emerald-950/40 light:bg-emerald-50 text-emerald-400 dark:text-emerald-300 light:text-emerald-700 flex items-center gap-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>HOSPITAL-GRADE HOME CARE</span>
              </div>

              {/* Badge 2: AI Clinical Precision */}
              <div className="py-1.5 px-3.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 dark:bg-cyan-950/40 light:bg-cyan-50 text-cyan-400 dark:text-cyan-300 light:text-cyan-700 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-sm">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>AI CLINICAL PRECISION · TIER-1</span>
              </div>

              {/* Badge 3: ISO Protocol */}
              <div className="py-1.5 px-3.5 rounded-full border border-slate-700/60 dark:border-slate-800 light:border-slate-200 bg-slate-900/40 dark:bg-slate-900/40 light:bg-slate-100 text-slate-400 dark:text-slate-400 light:text-slate-600 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest">
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
              <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.2rem] font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight leading-[1.06]">
                Advanced Recovery <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  At Your Home.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Clinical Message */}
            <motion.p
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-slate-400 dark:text-slate-300 light:text-slate-600 font-light max-w-2xl leading-relaxed"
            >
              Hospital-grade physiotherapy, post-surgical rehabilitation, and specialized nursing care delivered directly to your doorstep by verified BPT/MPT specialists with complete portable electrotherapy gear.
            </motion.p>

            {/* 3 Clinical Feature Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300 dark:text-slate-200 light:text-slate-700"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white dark:text-white light:text-slate-900 text-xs">Zero</div>
                  <div className="text-[11px] text-slate-400 light:text-slate-500">Clinic Commute</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white dark:text-white light:text-slate-900 text-xs">Certified</div>
                  <div className="text-[11px] text-slate-400 light:text-slate-500">Doctors & Physios</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white dark:text-white light:text-slate-900 text-xs">Full Treatment</div>
                  <div className="text-[11px] text-slate-400 light:text-slate-500">Gear Brought</div>
                </div>
              </div>
            </motion.div>

            {/* Action CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2"
            >
              <BookAppointmentButton 
                size="lg" 
                className="h-14 sm:h-15 px-8 sm:px-9 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Book Home Visit</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </BookAppointmentButton>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 sm:h-15 px-7 sm:px-8 rounded-2xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-white text-slate-200 dark:text-slate-200 light:text-slate-800 border-slate-700 dark:border-slate-700 light:border-slate-300 hover:bg-slate-800 dark:hover:bg-slate-800 light:hover:bg-slate-100 font-bold text-sm shadow-md flex items-center justify-center gap-2.5 transition-all"
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
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4"
            >
              {/* Card 1 */}
              <div className="p-4 rounded-2xl bg-slate-900/50 dark:bg-slate-900/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/90 text-left space-y-1 shadow-sm">
                <Users className="w-5 h-5 text-blue-400 mb-1" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight font-headline">
                  {stats ? formatCount(stats.therapistCount, '450+') : '450+'}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                  SPECIALISTS
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-4 rounded-2xl bg-slate-900/50 dark:bg-slate-900/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/90 text-left space-y-1 shadow-sm">
                <User className="w-5 h-5 text-cyan-400 mb-1" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight font-headline">
                  {stats ? formatCount(stats.patientCount, '15K+') : '15K+'}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                  PATIENTS SERVED
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-4 rounded-2xl bg-slate-900/50 dark:bg-slate-900/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/90 text-left space-y-1 shadow-sm">
                <Clock className="w-5 h-5 text-emerald-400 mb-1" />
                <div className="text-xl sm:text-2xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight font-headline pt-0.5">
                  Same-Day
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
                  SERVICE START
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-4 rounded-2xl bg-slate-900/50 dark:bg-slate-900/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200/90 text-left space-y-1 shadow-sm">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 mb-1" />
                <div className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight font-headline flex items-center gap-1">
                  4.9★
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 light:text-slate-500">
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
