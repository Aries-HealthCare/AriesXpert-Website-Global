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
  Compass, 
  Award,
  Clock,
  Stethoscope
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
}

const MODALITIES: Modality[] = [
  {
    id: 'post-op',
    name: 'Post-Surgery',
    tag: 'POST-OPERATIVE REHAB',
    tagClass: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    title: 'Post-Surgical Joint Restoration',
    subtitle: 'Evidence-based protocols for TKR, THR, ligament reconstruction & fracture mobilization.',
    imageUrl: '/hero/post-op-hero.png',
    recoveryRate: '99.2%',
    metricLabel: 'Weight Bearing',
    metricValue: '100% Target',
    specialistTitle: 'Clinical Rehab Lead',
  },
  {
    id: 'spine',
    name: 'Spine & Posture',
    tag: 'SPINE & LUMBAR',
    tagClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    title: 'Advanced Spinal Alignment & Decompression',
    subtitle: 'Relieve sciatica, slip disc & chronic cervical stiffness with portable traction & manual release.',
    imageUrl: '/hero/physio-hero.png',
    recoveryRate: '98.5%',
    metricLabel: 'Mobility Gain',
    metricValue: '+48° ROM',
    specialistTitle: 'Senior Spine Specialist',
  },
  {
    id: 'needling',
    name: 'Dry Needling',
    tag: 'MYOFASCIAL TRIGGER',
    tagClass: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    title: 'Dry Needling & Neuromuscular Reset',
    subtitle: 'Target deep intramuscular trigger points for instant pain inhibition & rapid muscle reactivation.',
    imageUrl: '/hero/dry-needling.jpg',
    recoveryRate: '97.1%',
    metricLabel: 'Pain Relief',
    metricValue: '-85% VAS',
    specialistTitle: 'Certified Needling Specialist',
  },
  {
    id: 'sports',
    name: 'Sports Kinetic',
    tag: 'SPORTS & ATHLETIC',
    tagClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    title: 'High-Performance Functional Return',
    subtitle: 'Biomechanical movement restoration for ACL, rotator cuff, ankle instability & muscle tears.',
    imageUrl: '/hero/foam-roller.jpg',
    recoveryRate: '98.0%',
    metricLabel: 'Kinetic Output',
    metricValue: 'Elite Tier',
    specialistTitle: 'Sports Physiotherapist',
  },
];

export default function HeroInteractiveCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const activeModality = MODALITIES[activeIndex];

  // Auto switch modality every 7 seconds if not manually interacted with
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODALITIES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.28,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto perspective-1000">
      
      {/* ── Outer Ambient Hologram Light Halo ── */}
      <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-amber-500/20 rounded-[36px] blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* ── 3D Perspective Tilt Card Container ── */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative rounded-[32px] p-[2px] bg-gradient-to-b from-white/25 via-blue-500/20 to-violet-600/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl group transition-all duration-300 overflow-hidden"
      >
        {/* Dynamic Light Sheen on Cursor Hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
          }}
        />

        {/* ── Main Showcase Surface ── */}
        <div className="relative rounded-[30px] bg-[#070b16]/95 border border-white/10 p-5 sm:p-7 overflow-hidden flex flex-col justify-between space-y-6">
          
          {/* ── Top Modality Selector Tabs ── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {MODALITIES.map((modality, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={modality.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "relative px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 flex-shrink-0 flex items-center gap-1.5",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/40"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5"
                  )}
                >
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
                  )}
                  <span>{modality.name}</span>
                </button>
              );
            })}
          </div>

          {/* ── Interactive Image & Clinical Telemetry Screen ── */}
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-inner group-hover:border-blue-400/30 transition-colors">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModality.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeModality.imageUrl}
                  alt={activeModality.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 650px"
                  className="object-cover object-center brightness-95 contrast-105"
                  priority
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#070b16]/60 via-transparent to-[#070b16]/40 pointer-events-none" />

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
                  <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-emerald-500/40 backdrop-blur-xl shadow-xl flex items-center gap-3">
                    <div className="space-y-0.5 text-left">
                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                        Recovery Index
                      </div>
                      <div className="text-xs sm:text-sm font-black text-emerald-300 flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        {activeModality.recoveryRate}
                      </div>
                    </div>
                    {/* Live ECG Animated Wave */}
                    <div className="w-12 h-6 flex items-center">
                      <svg viewBox="0 0 100 40" className="w-full h-full stroke-emerald-400 fill-none stroke-[3]">
                        <path d="M0,20 L25,20 L32,5 L40,35 L48,15 L55,22 L62,20 L100,20" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Floating Specialist Badge */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/85 border border-white/15 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <span>{activeModality.specialistTitle}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>Home Dispatch · Same-Day Available</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      {activeModality.metricLabel}
                    </span>
                    <span className="text-xs font-black text-cyan-300">
                      {activeModality.metricValue}
                    </span>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* ── Treatment Details & Description ── */}
          <div className="text-left space-y-2">
            <h4 className="font-headline text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
              {activeModality.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed">
              {activeModality.subtitle}
            </p>
          </div>

          {/* ── Bottom Protocol Badges ── */}
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Clinic Commute</span>
            </div>
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Bespoke 1-on-1 Protocol</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Award className="w-4 h-4" />
              <span>Hospital-Grade Modalities</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
