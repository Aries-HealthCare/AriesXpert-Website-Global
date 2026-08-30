'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRequestCallback } from '@/components/request-callback-provider';
import BookAppointmentButton from "../book-appointment-button";
import type { WebsiteStats } from "@/app/api/stats/route";
import Hero3DScene from "./hero-3d-scene";
import HeroInteractiveCard from "./hero-interactive-card";
import { 
  ShieldCheck, 
  Sparkles, 
  PhoneCall, 
  Star, 
  Award, 
  Users, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Activity,
  Stethoscope,
  HeartHandshake
} from "lucide-react";

function formatCount(n: number | undefined | null, fallback = '450+'): string {
  if (n == null || isNaN(n)) return fallback;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}k+`;
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
    <section className="relative w-full min-h-[94vh] flex items-center overflow-hidden bg-[#030611] py-14 md:py-24 lg:py-28">
      
      {/* ── 1. Interactive 3D WebGL Kinetic Canvas (Three.js Biomechanical Wave & Neural Field) ── */}
      <Hero3DScene />

      {/* ── 2. Cinematic Volumetric Ambient Lighting & Glows ── */}
      <div className="absolute top-1/4 left-1/5 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/6 w-[700px] h-[700px] bg-violet-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── 3. Cybernetic Precision Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── 4. Main Hero Container (Full-Bleed Widescreen Fit without Side Emptiness) ── */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 xl:gap-16 items-center">
          
          {/* ── Left Column: Hero Content, Value Badges & High-Impact CTAs ── */}
          <div className="lg:col-span-7 text-left space-y-8 lg:space-y-10">
            
            {/* Top Glowing Status Pills */}
            <motion.div 
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3.5"
            >
              <div className="glassmorphic py-2 px-4.5 rounded-full border border-emerald-500/40 bg-emerald-950/40 flex items-center gap-2.5 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                  Hospital-Grade Home Care
                </span>
              </div>

              <div className="glassmorphic py-2 px-4.5 rounded-full border border-violet-500/40 bg-violet-950/40 flex items-center gap-2 text-violet-300 shadow-[0_0_25px_rgba(124,58,237,0.2)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs font-black uppercase tracking-wider text-white/95">
                  AI Clinical Precision
                </span>
              </div>
            </motion.div>

            {/* Epic Multi-line Headline */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] font-black text-white tracking-tight leading-[1.04] drop-shadow-2xl">
                Advanced Recovery <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
                  At Your Doorstep.
                </span>
              </h1>
            </motion.div>

            {/* Subtitle & Value Proposition with Generous Breathing Room */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 font-light max-w-2xl leading-relaxed drop-shadow"
            >
              Hospital-grade physiotherapy, post-surgical rehabilitation, and specialized nursing care delivered directly to your home by verified BPT/MPT specialists with complete portable electrotherapy modalities.
            </motion.p>

            {/* Quick Feature Checklist with Glowing Icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32 }}
              className="flex flex-wrap gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-200 font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>Zero Clinic Commute</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>Certified Doctors & Physios</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>Full Treatment Gear Brought</span>
              </div>
            </motion.div>

            {/* Action CTA Buttons Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Glowing Luxury Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300 group-hover:scale-105" />
                <BookAppointmentButton 
                  size="lg" 
                  className="relative h-15 sm:h-16 px-9 sm:px-11 text-base font-black rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 border border-white/20 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <span>Book Home Visit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </BookAppointmentButton>
              </div>
              
              {/* Secondary Frosted Glass Consultation Button */}
              <Button 
                size="lg" 
                variant="outline" 
                className="h-15 sm:h-16 px-8 sm:px-10 text-base font-bold rounded-2xl bg-white/5 text-white border-white/20 hover:bg-white/15 hover:border-white/40 hover:text-white backdrop-blur-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
                onClick={() => openModal()}
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Request Consultation</span>
              </Button>
            </motion.div>

            {/* Key Trust Stats Grid (Cleanly Separated with Generous Padding) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55 }}
              className="pt-8 border-t border-white/10 grid grid-cols-3 sm:grid-cols-4 gap-6 sm:gap-8"
            >
              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center">
                  {stats ? formatCount(stats.therapistCount) : '450+'}
                </p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                  Specialists
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center">
                  {stats ? formatCount(stats.patientCount, '15k+') : '15k+'}
                </p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                  Patients Served
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                  Same-Day
                </p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                  Service Start
                </p>
              </div>

              <div className="hidden sm:block">
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-400 tracking-tight flex items-center gap-1.5">
                  4.9 <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-400" />
                </p>
                <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
                  Google Rating
                </p>
              </div>
            </motion.div>

          </div>

          {/* ── Right Column: 3D Motion Graphics & Interactive Physiotherapy Showcase ── */}
          <div className="lg:col-span-5 relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <HeroInteractiveCard />

              {/* Bottom Clinical Trust Guarantee Pill */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> Verified Clinicians
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Activity className="w-4 h-4" /> Clinical Portability
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Award className="w-4 h-4" /> High Recovery Rate
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
