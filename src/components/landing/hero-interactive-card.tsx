'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Award,
  Stethoscope,
  Briefcase,
  User,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Modality {
  id: string;
  name: string;
  tag: string;
  tagClass: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  recoveryRate: string;
  metricLabel: string;
  metricValue: string;
  specialistTitle: string;
  clinicalCode: string;
}

const MODALITIES: Modality[] = [
  {
    id: 'post-op',
    name: 'POST-SURGERY',
    tag: 'POST-SURGERY REHABILITATION',
    tagClass: 'bg-blue-600 text-white',
    title: 'Post-Surgical Joint Restoration',
    subtitle: 'Evidence-based clinical protocols for TKR, THR, ACL reconstruction, ligament repair & fracture mobilization.',
    imageUrl: '/hero/post-op-hero.png',
    recoveryRate: '99.2%',
    metricLabel: 'WEIGHT BEARING TARGET',
    metricValue: '100% Milestone',
    specialistTitle: 'Orthopedic Physiotherapist',
    clinicalCode: 'CLIN-PROT : TKR-POST-V4',
  },
  {
    id: 'spine',
    name: 'SPINE & POSTURE',
    tag: 'SPINE & LUMBAR DECOMPRESSION',
    tagClass: 'bg-blue-600 text-white',
    title: 'Advanced Spinal Alignment & Decompression',
    subtitle: 'Relieve sciatica, disc herniation & chronic cervical stiffness with portable traction and targeted myofascial release.',
    imageUrl: '/hero/physio-hero.png',
    recoveryRate: '98.5%',
    metricLabel: 'LUMBAR MOBILITY GAIN',
    metricValue: '+48° ROM Gain',
    specialistTitle: 'Spine & Posture Specialist',
    clinicalCode: 'CLIN-PROT : LUMBAR-DEC-02',
  },
  {
    id: 'needling',
    name: 'DRY NEEDLING',
    tag: 'NEUROMUSCULAR TRIGGER POINT RESET',
    tagClass: 'bg-blue-600 text-white',
    title: 'Dry Needling & Neuromuscular Reset',
    subtitle: 'Target deep intramuscular trigger points for instantaneous pain inhibition, spasm relief & rapid muscle reactivation.',
    imageUrl: '/hero/dry-needling.jpg',
    recoveryRate: '97.4%',
    metricLabel: 'PAIN INHIBITION INDEX',
    metricValue: '-85% VAS Drop',
    specialistTitle: 'Certified Needling Expert',
    clinicalCode: 'CLIN-PROT : DN-MYO-V1',
  },
  {
    id: 'sports',
    name: 'SPORTS KINETICS',
    tag: 'SPORTS & ATHLETIC RESTORATION',
    tagClass: 'bg-blue-600 text-white',
    title: 'High-Performance Functional Return',
    subtitle: 'Biomechanical movement restoration for rotator cuff, tendonitis, ankle instability & athletic muscle tears.',
    imageUrl: '/hero/foam-roller.jpg',
    recoveryRate: '98.8%',
    metricLabel: 'KINETIC PERFORMANCE',
    metricValue: 'Elite Tier Return',
    specialistTitle: 'Sports Physiotherapist',
    clinicalCode: 'CLIN-PROT : KINETIC-ELITE',
  },
];

export default function HeroInteractiveCard() {
  const [activeIndex, setActiveIndex] = useState(3); // default to SPORTS KINETICS to match reference
  const cardRef = useRef<HTMLDivElement>(null);
  const activeModality = MODALITIES[activeIndex];

  // Auto-cycle through modalities smoothly every 10s if untouched
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODALITIES.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[620px] mx-auto">
      
      {/* ── Outer Ambient Blue/Cyan Glow ── */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-cyan-500/20 to-indigo-600/20 rounded-[40px] blur-2xl -z-10 opacity-70 pointer-events-none" />

      {/* ── Main Clinical Hub Container Card ── */}
      <div
        ref={cardRef}
        className="relative rounded-[28px] bg-[#070e20]/95 border border-blue-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.6)] backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-all duration-300"
      >
        
        {/* Top Header: Live Status + Protocol Code */}
        <div className="flex items-center justify-between text-[11px] font-mono tracking-wider pb-1">
          <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>CLINICAL_HUB : LIVE</span>
          </div>
          <span className="text-slate-400 font-semibold uppercase text-[10px]">
            {activeModality.clinicalCode}
          </span>
        </div>

        {/* ── 1. Category Tabs Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MODALITIES.map((modality, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={modality.id}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "py-2.5 px-2 rounded-xl text-[11px] font-extrabold tracking-wider uppercase transition-all duration-200 text-center flex items-center justify-center gap-1.5",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-400/50"
                    : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/80"
                )}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                <span className="truncate">{modality.name}</span>
              </button>
            );
          })}
        </div>

        {/* ── 2. Photographic Session Viewport with Overlays ── */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/80 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModality.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={activeModality.imageUrl}
                alt={activeModality.title}
                fill
                sizes="(max-width: 768px) 100vw, 620px"
                className="object-cover object-center brightness-[0.95] contrast-[1.05]"
                priority
              />

              {/* Subtle Depth Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top-Left Category Tag Pill */}
              <div className="absolute top-3.5 left-3.5 z-20">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  {activeModality.tag}
                </span>
              </div>

              {/* Top-Right Telemetry Card */}
              <div className="absolute top-3.5 right-3.5 z-20">
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/85 border border-emerald-500/40 backdrop-blur-md shadow-xl flex items-center gap-2.5">
                  <div className="text-left">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      RECOVERY INDEX
                    </div>
                    <div className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      {activeModality.recoveryRate}
                    </div>
                  </div>
                  {/* Green ECG Pulse Wave */}
                  <div className="w-9 h-5 flex items-center">
                    <svg viewBox="0 0 100 40" className="w-full h-full stroke-emerald-400 fill-none stroke-[3.5]">
                      <path d="M0,20 L25,20 L32,5 L40,35 L48,15 L55,22 L62,20 L100,20" />
                    </svg>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── 3. Treatment Title & Clinical Description ── */}
        <div className="text-left space-y-1 pt-1">
          <h3 className="font-headline text-lg sm:text-xl font-bold text-white tracking-tight">
            {activeModality.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed font-light">
            {activeModality.subtitle}
          </p>
        </div>

        {/* ── 4. Specialist & Metric Tiles Strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
          
          {/* Specialist Tile (7 cols) */}
          <div className="sm:col-span-7 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div className="text-left overflow-hidden">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span className="truncate">{activeModality.specialistTitle}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Same-Day Home Dispatch</span>
              </div>
            </div>
          </div>

          {/* Metric Performance Tile (5 cols) */}
          <div className="sm:col-span-5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                {activeModality.metricLabel}
              </span>
              <span className="text-xs font-black text-cyan-300">
                {activeModality.metricValue}
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

        </div>

        {/* ── 5. Bottom 3 Quality Badges Row ── */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Clinic Commute</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Bespoke 1-on-1 Protocol</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-amber-400" />
            <span>Hospital-Grade Gear</span>
          </div>
        </div>

      </div>

      {/* ── Sub-Badges Strip Below Card ── */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
        <span className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Clinicians
        </span>
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Activity className="w-4 h-4 text-cyan-400" /> Clinical Portability
        </span>
        <span className="flex items-center gap-1.5 text-slate-300">
          <User className="w-4 h-4 text-slate-300" /> High Recovery Rate
        </span>
      </div>

    </div>
  );
}
