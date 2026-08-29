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
  Activity
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
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#05070f] py-12 md:py-20">
      {/* 1. Interactive 3D WebGL Motion Canvas (Three.js Biomechanical Wave & Neural Field) */}
      <Hero3DScene />

      {/* 2. Multi-layered Ambient Light Beams & Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 3. Subtle Futuristic Cybernetic Grid Background Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 4. Main Hero Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy, Value Badges & Actions */}
          <div className="lg:col-span-7 text-left space-y-7">
            
            {/* Top Glowing Status Pills */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="glassmorphic py-1.5 px-4 rounded-full border border-emerald-500/30 bg-emerald-950/30 flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Home Healthcare Network
                </span>
              </div>

              <div className="glassmorphic py-1.5 px-4 rounded-full border border-violet-500/30 bg-violet-950/30 flex items-center gap-2 text-violet-300 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/90">
                  AI Clinical Precision
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black text-white tracking-tight leading-[1.02] drop-shadow-2xl">
                Advanced Recovery <br />
                <span className="bg-gradient-to-r from-blue-400 via-violet-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.3)]">
                  At Your Home.
                </span>
              </h1>
            </motion.div>

            {/* Subtitle & Value Proposition */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl text-slate-300/90 font-normal max-w-2xl leading-relaxed drop-shadow"
            >
              Request hospital-grade physiotherapy, post-surgical rehabilitation, and specialized nursing care directly to your doorstep from the verified Aries clinical network.
            </motion.p>

            {/* Quick Feature Checklist */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium pt-1"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Clinic Commute</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Certified Doctors & Physios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Full Treatment Gear Brought</span>
              </div>
            </motion.div>

            {/* Action Buttons Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {/* Primary Glowing Book Appointment Button */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-violet-600 to-amber-400 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300 group-hover:scale-105" />
                <BookAppointmentButton 
                  size="lg" 
                  className="relative h-15 sm:h-16 px-8 sm:px-10 text-base font-black rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 border border-white/20 flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  <span>Book Home Visit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </BookAppointmentButton>
              </div>
              
              {/* Secondary Glassmorphic Consultation Button */}
              <Button 
                size="lg" 
                variant="outline" 
                className="h-15 sm:h-16 px-8 sm:px-9 text-base font-bold rounded-2xl bg-white/5 text-white border-white/20 hover:bg-white/15 hover:border-white/40 hover:text-white backdrop-blur-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2.5"
                onClick={() => openModal()}
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Request Consultation</span>
              </Button>
            </motion.div>

            {/* Key Trust Stats & Social Proof Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="pt-6 border-t border-white/10 grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6"
            >
              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex items-center">
                  {stats ? formatCount(stats.therapistCount) : '450+'}
                </p>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                  Specialists
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight flex items-center">
                  {stats ? formatCount(stats.patientCount, '15k+') : '15k+'}
                </p>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                  Patients Served
                </p>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  Same-Day
                </p>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                  Service Start
                </p>
              </div>

              <div className="hidden sm:block">
                <p className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-400 tracking-tight flex items-center gap-1">
                  4.9 <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </p>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                  Google Rated
                </p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: 3D Motion Graphics & Interactive Physiotherapy Showcase */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <HeroInteractiveCard />

              {/* Bottom Quick Benefits Pill Under Showcase */}
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Clinicians
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-cyan-400">
                  <Activity className="w-3.5 h-3.5" /> Clinical Portability
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Award className="w-3.5 h-3.5" /> High Recovery Rate
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
