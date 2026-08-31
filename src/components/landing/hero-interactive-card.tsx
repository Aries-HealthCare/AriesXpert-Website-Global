'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  HeartPulse, 
  TrendingUp, 
  Award,
  Clock,
  Stethoscope,
  ChevronRight,
  Crosshair,
  Radio,
  FileCheck
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
  badgeAccent: string;
  clinicalCode: string;
}

const MODALITIES: Modality[] = [
  {
    id: 'post-op',
    name: 'Post-Surgery',
    tag: 'POST-OPERATIVE REHAB PROTOCOL',
    tagClass: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    title: 'Post-Surgical Joint Restoration',
    subtitle: 'Evidence-based clinical protocols for TKR, THR, ACL reconstruction, ligament repair & fracture mobilization.',
    imageUrl: '/hero/post-op-hero.png',
    recoveryRate: '99.2%',
    metricLabel: 'Weight Bearing Target',
    metricValue: '100% Milestone',
    specialistTitle: 'Clinical Rehab Lead',
    badgeAccent: 'from-blue-600 to-indigo-600',
    clinicalCode: 'CLIN-PROT: TKR/THR-V4',
  },
  {
    id: 'spine',
    name: 'Spine & Posture',
    tag: 'SPINE & LUMBAR DECOMPRESSION',
    tagClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    title: 'Advanced Spinal Alignment & Decompression',
    subtitle: 'Relieve sciatica, disc herniation & chronic cervical stiffness with portable traction and targeted myofascial release.',
    imageUrl: '/hero/physio-hero.png',
    recoveryRate: '98.5%',
    metricLabel: 'Mobility Recovery',
    metricValue: '+48° ROM Gain',
    specialistTitle: 'Senior Spine Specialist',
    badgeAccent: 'from-emerald-600 to-teal-600',
    clinicalCode: 'CLIN-PROT: LUMBAR-DEC-02',
  },
  {
    id: 'needling',
    name: 'Dry Needling',
    tag: 'NEUROMUSCULAR TRIGGER POINT RESET',
    tagClass: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    title: 'Dry Needling & Neuromuscular Reset',
    subtitle: 'Target deep intramuscular trigger points for instantaneous pain inhibition, spasm relief & rapid muscle reactivation.',
    imageUrl: '/hero/dry-needling.jpg',
    recoveryRate: '97.4%',
    metricLabel: 'Pain Relief Index',
    metricValue: '-85% VAS Drop',
    specialistTitle: 'Certified Needling Expert',
    badgeAccent: 'from-violet-600 to-purple-600',
    clinicalCode: 'CLIN-PROT: DN-MYO-V1',
  },
  {
    id: 'sports',
    name: 'Sports Kinetic',
    tag: 'SPORTS & ATHLETIC RESTORATION',
    tagClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    title: 'High-Performance Functional Return',
    subtitle: 'Biomechanical movement restoration for rotator cuff, tendonitis, ankle instability & athletic muscle tears.',
    imageUrl: '/hero/foam-roller.jpg',
    recoveryRate: '98.8%',
    metricLabel: 'Kinetic Performance',
    metricValue: 'Elite Tier Return',
    specialistTitle: 'Sports Physiotherapist',
    badgeAccent: 'from-amber-600 to-orange-600',
    clinicalCode: 'CLIN-PROT: KINETIC-ELITE',
  },
];

export default function HeroInteractiveCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const activeModality = MODALITIES[activeIndex];

  // Auto-switch modality every 8 seconds if not manually interacted with
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODALITIES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative w-full max-w-[620px] mx-auto perspective-1000">
      
      {/* ── Outer Ambient Holographic Glow Aura ── */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-blue-600/25 via-violet-600/25 to-cyan-500/20 rounded-[36px] blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* ── Medical HealthCare Grade HUD Card Container ── */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative rounded-[32px] p-[1.5px] bg-gradient-to-b from-white/25 via-cyan-500/20 to-violet-600/30 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 overflow-hidden"
      >
        {/* Dynamic Light Sheen on Cursor Hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 380px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
          }}
        />

        {/* ── Main Showcase Surface with Medical HUD Accents ── */}
        <div className="relative rounded-[30px] bg-[#070c18]/95 border border-white/10 p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-5">
          
          {/* Top HUD Telemetry Line */}
          <div className="flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-slate-400 border-b border-white/10 pb-2">
            <span className="flex items-center gap-1 text-cyan-400">
              <Crosshair className="w-3 h-3" /> CLINICAL_HUD: LIVE
            </span>
            <span className="text-slate-400">{activeModality.clinicalCode}</span>
          </div>

          {/* ── 1. Modality Selector Tabs ── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {MODALITIES.map((modality, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={modality.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "relative px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex-shrink-0 flex items-center gap-1.5",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.45)] border border-blue-400/50"
                      : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                  )}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
                  )}
                  <span>{modality.name}</span>
                </button>
              );
            })}
          </div>

          {/* ── 2. Cinematic Medical Visual Viewport ── */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden border border-white/15 bg-black/70 shadow-inner group">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModality.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeModality.imageUrl}
                  alt={activeModality.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  className="object-cover object-center brightness-[0.92] contrast-[1.05]"
                  priority
                />

                {/* Soft Edge Vignettes for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070c18] via-transparent to-black/30 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070c18]/40 via-transparent to-[#070c18]/30 pointer-events-none" />

                {/* Top Floating Category Tag */}
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-widest border backdrop-blur-md shadow-lg inline-flex items-center gap-1.5",
                    activeModality.tagClass
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {activeModality.tag}
                  </span>
                </div>

                {/* Top Right Live Telemetry Widget */}
                <div className="absolute top-3.5 right-3.5 z-20">
                  <div className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 border border-emerald-500/40 backdrop-blur-xl shadow-xl flex items-center gap-2.5">
                    <div className="text-left">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Recovery Index
                      </div>
                      <div className="text-xs sm:text-sm font-black text-emerald-300 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        {activeModality.recoveryRate}
                      </div>
                    </div>
                    {/* Live ECG Wave */}
                    <div className="w-10 h-5 flex items-center">
                      <svg viewBox="0 0 100 40" className="w-full h-full stroke-emerald-400 fill-none stroke-[3]">
                        <path d="M0,20 L25,20 L32,5 L40,35 L48,15 L55,22 L62,20 L100,20" />
                      </svg>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* ── 3. Dedicated Treatment Details ── */}
          <div className="text-left space-y-1.5">
            <h4 className="font-headline text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
              {activeModality.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-light">
              {activeModality.subtitle}
            </p>
          </div>

          {/* ── 4. Clinical Protocol & Telemetry Deck ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            
            {/* Specialist Credential Tile */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="text-left overflow-hidden">
                <div className="text-xs font-black text-white flex items-center gap-1">
                  <span className="truncate">{activeModality.specialistTitle}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>Same-Day Home Dispatch</span>
                </div>
              </div>
            </div>

            {/* Targeted Metric Tile */}
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {activeModality.metricLabel}
                </span>
                <span className="text-xs font-black text-cyan-300">
                  {activeModality.metricValue}
                </span>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

          </div>

          {/* ── 5. Bottom Quality Assurance Protocol Badges ── */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Clinic Commute</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Bespoke 1-on-1 Protocol</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>Hospital-Grade Gear</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
