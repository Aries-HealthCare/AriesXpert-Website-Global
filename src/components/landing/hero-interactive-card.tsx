'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  HeartPulse, 
  TrendingUp, 
  Compass, 
  Clock 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Modality {
  id: string;
  name: string;
  tag: string;
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
    id: 'spine',
    name: 'Spine & Posture',
    tag: 'SPINE & ORTHO',
    title: 'Advanced Spinal Alignment & Decompression',
    subtitle: 'Relieve sciatica, slip disc & chronic lumbar stiffness at home.',
    imageUrl: '/hero/physio-hero.png',
    recoveryRate: '98.4%',
    metricLabel: 'Mobility Gain',
    metricValue: '+48° ROM',
    specialistTitle: 'Senior Spine Specialist',
  },
  {
    id: 'post-op',
    name: 'Post-Surgery',
    tag: 'POST-OPERATIVE',
    title: 'Post-Surgical Joint Restoration',
    subtitle: 'Dedicated protocols for TKR, THR, ligament & fracture rehab.',
    imageUrl: '/hero/post-op-hero.png',
    recoveryRate: '99.1%',
    metricLabel: 'Weight Bearing',
    metricValue: '100% Target',
    specialistTitle: 'Clinical Rehab Lead',
  },
  {
    id: 'needling',
    name: 'Dry Needling',
    tag: 'MYOFASCIAL',
    title: 'Dry Needling & Neuromuscular Reset',
    subtitle: 'Target deep trigger points for instant pain inhibition & muscle release.',
    imageUrl: '/hero/dry-needling.jpg',
    recoveryRate: '96.8%',
    metricLabel: 'Pain Relief',
    metricValue: '-85% VAS',
    specialistTitle: 'Certified Needling Physio',
  },
  {
    id: 'sports',
    name: 'Sports Kinetic',
    tag: 'SPORTS INJURY',
    title: 'High-Performance Functional Rehab',
    subtitle: 'Return to peak athletic performance with biomechanical movement tracking.',
    imageUrl: '/hero/foam-roller.jpg',
    recoveryRate: '97.9%',
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

  // Auto switch modality every 6 seconds if not hovered
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % MODALITIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

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
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none perspective-1000">
      {/* Dynamic 3D Tilt Card Frame */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative rounded-3xl p-1.5 sm:p-2 bg-gradient-to-br from-white/20 via-primary/30 to-accent/30 shadow-[0_20px_70px_rgba(0,0,0,0.8)] border border-white/15 backdrop-blur-2xl group transition-all duration-300"
      >
        {/* Dynamic Glass Glare Sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
          }}
        />

        {/* Ambient Halo Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 via-violet-600/30 to-amber-500/20 rounded-3xl blur-2xl -z-10 group-hover:opacity-100 opacity-70 transition-opacity duration-500" />

        {/* Main Card Container */}
        <div className="relative rounded-[22px] overflow-hidden bg-slate-950/90 border border-white/10 aspect-[4/3.4] sm:aspect-[4/3.2] flex flex-col justify-between">
          
          {/* Background Animated Physiotherapy Image with Cross-fade */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModality.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src={activeModality.imageUrl}
                  alt={activeModality.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                  className="object-cover object-center transform transition-transform duration-[8000ms] scale-105 group-hover:scale-110"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />

            {/* Laser Biomechanical Scanner Animation */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80 shadow-[0_0_15px_#22d3ee] animate-laser-sweep pointer-events-none z-10" />

            {/* Holographic Medical Grid Line Matrix */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: '32px 32px'
              }}
            />
          </div>

          {/* Top HUD: Status Bar & Badges */}
          <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between">
            {/* Live Modality Tag */}
            <div className="flex items-center gap-2">
              <div className="glassmorphic px-3 py-1.5 rounded-full border border-cyan-500/30 bg-black/50 backdrop-blur-md flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-cyan-300 uppercase">
                  {activeModality.tag}
                </span>
              </div>
            </div>

            {/* Interactive Modality Switcher Pills */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
              {MODALITIES.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-xl transition-all duration-300",
                    activeIndex === idx
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md font-bold scale-105"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  )}
                >
                  {mod.name}
                </button>
              ))}
            </div>
          </div>

          {/* Floating 3D Holographic Metric Widget (Top Right Overhang) */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-16 right-4 sm:right-6 z-20 glassmorphic p-3 sm:p-3.5 rounded-2xl border border-emerald-500/30 bg-slate-950/80 backdrop-blur-xl shadow-2xl max-w-[170px] sm:max-w-[190px]"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300">Recovery Index</span>
              </div>
              <span className="text-xs font-black text-white px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {activeModality.recoveryRate}
              </span>
            </div>

            {/* Dynamic Animated ECG Heartline */}
            <div className="w-full h-5 overflow-hidden relative opacity-90 my-1">
              <svg viewBox="0 0 160 24" className="w-full h-full stroke-emerald-400 fill-none stroke-[1.8]">
                <path d="M0,12 L30,12 L36,4 L44,20 L52,8 L60,16 L66,12 L100,12 L106,3 L114,21 L122,9 L130,12 L160,12" />
              </svg>
            </div>
            
            <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-white/70 font-medium">
              <span>{activeModality.metricLabel}</span>
              <span className="font-bold text-white">{activeModality.metricValue}</span>
            </div>
          </motion.div>

          {/* Floating 3D Specialist Dispatch Beacon (Left Center Overhang) */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-28 left-4 sm:left-6 z-20 glassmorphic p-2.5 sm:p-3 rounded-2xl border border-violet-500/30 bg-slate-950/80 backdrop-blur-xl shadow-2xl flex items-center gap-3"
          >
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-blue-600 via-violet-600 to-amber-400 p-[1.5px] flex items-center justify-center shadow-lg">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-ping opacity-75" />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-[11px] sm:text-xs font-bold text-white leading-tight">
                  {activeModality.specialistTitle}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-white/60 font-medium mt-0.5">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>Home Dispatch • Today Available</span>
              </div>
            </div>
          </motion.div>

          {/* Bottom Card Content & Modality Info */}
          <div className="relative z-20 p-4 sm:p-6 bg-gradient-to-t from-black via-black/90 to-transparent pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModality.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>{activeModality.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-normal line-clamp-2 leading-relaxed">
                  {activeModality.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Quick KPI indicators */}
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Zero Clinic Commute</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bespoke 1-on-1 Protocol</span>
              </div>
            </div>
          </div>

          {/* Futuristic Corner Tech Reticles */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
