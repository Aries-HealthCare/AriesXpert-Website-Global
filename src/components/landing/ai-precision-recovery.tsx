'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Activity, 
  Target, 
  ArrowUpCircle, 
  Sparkles, 
  ChevronRight, 
  Zap, 
  Microscope,
  Crosshair,
  Radio,
  FileCheck,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const recoveryStages = [
  {
    title: 'Assess',
    subtitle: 'Biomechanical Screening',
    description: 'Proprietary clinical algorithms analyze joint kinematics and postural pain triggers to isolate the precise source of dysfunction.',
    icon: ShieldCheck,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10 border-cyan-500/20',
    code: 'STAGE_01/ROM_SCAN',
  },
  {
    title: 'Plan',
    subtitle: 'Dynamic Roadmaps',
    description: 'AI-assisted clinical roadmaps tailored to specific pathology, age, joint angle targets, and home milestone goals.',
    icon: Target,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10 border-blue-500/20',
    code: 'STAGE_02/PROTOCOL_AI',
  },
  {
    title: 'Track',
    subtitle: 'Real-time Monitoring',
    description: 'Continuous session-by-session functional tracking of ROM degrees, VAS pain scores, and muscle activation milestones.',
    icon: Activity,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10 border-emerald-500/20',
    code: 'STAGE_03/LIVE_TELEMETRY',
  },
  {
    title: 'Advance',
    subtitle: 'Adaptive Protocols',
    description: 'Intelligent, automated adjustment of electrotherapy frequencies and manual techniques as functional capacity returns.',
    icon: ArrowUpCircle,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10 border-violet-500/20',
    code: 'STAGE_04/PERFORMANCE_RETURN',
  },
];

export default function AiPrecisionRecovery() {
  return (
    <section className="py-18 md:py-28 lg:py-32 relative overflow-hidden bg-[#02050e] text-white">
      {/* ── Volumetric Ambient Lighting ── */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[650px] h-[650px] bg-blue-600/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[650px] h-[650px] bg-violet-600/12 rounded-full blur-[170px] pointer-events-none" />

      {/* ── Precision Telemetry Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── Fluid Widescreen Container (Zero Side Voids) ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14 space-y-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glassmorphic border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <Microscope className="w-3.5 h-3.5 text-cyan-400" />
            <span>Aries AI™ Directorate · Clinical Protocol</span>
          </div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            Precision <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
              Recovery Engine
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Our proprietary clinical platform powers every stage of your recovery journey, delivering data-driven milestones for hospital-grade home rehabilitation.
          </p>
        </motion.div>

        {/* 4-Stage Clinical Recovery Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 mb-16">
          {recoveryStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex flex-col h-full rounded-[28px] p-[1.5px] bg-gradient-to-b from-white/20 via-cyan-500/15 to-violet-600/25 shadow-2xl backdrop-blur-2xl group hover:border-cyan-400/50 hover:shadow-[0_20px_60px_rgba(6,182,212,0.2)] transition-all duration-300"
            >
              <div className="relative flex flex-col justify-between h-full rounded-[26px] bg-[#070c1a]/95 border border-white/10 p-6 sm:p-7 space-y-6 overflow-hidden">
                
                {/* Top HUD Tag */}
                <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400/80 border-b border-white/10 pb-3">
                  <span className="flex items-center gap-1">
                    <Crosshair className="w-3 h-3" /> {stage.code}
                  </span>
                  <span className="text-slate-400">STAGE 0{index + 1}</span>
                </div>

                <div className="space-y-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-500 group-hover:scale-110",
                    stage.bgColor,
                    stage.color
                  )}>
                    <stage.icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-headline text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-bold text-cyan-400/90 uppercase tracking-wider">
                      {stage.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300/85 leading-relaxed font-light">
                    {stage.description}
                  </p>
                </div>

                {/* Bottom Milestone Status */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Clinical Efficacy</span>
                  <span className="font-mono font-bold text-emerald-400">99.4% Verified</span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Clinical Assurance Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[28px] p-[1.5px] bg-gradient-to-r from-blue-600/40 via-cyan-500/40 to-violet-600/40 shadow-2xl backdrop-blur-2xl"
        >
          <div className="rounded-[26px] bg-[#070c1a]/95 p-6 sm:p-8 md:p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" /> Telemetry Protocol V3.4
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Experience Hospital-Grade Clinical Precision at Home
              </h3>
              <p className="text-slate-300 text-sm sm:text-base font-light max-w-2xl">
                Every home visit is backed by our Clinical Directorate with automated progress logs, calibrated electrotherapy gear, and verified practitioner continuity.
              </p>
            </div>

            <Button asChild className="h-14 px-8 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(37,99,235,0.4)] shrink-0 transition-all">
              <Link href="/book-appointment">
                Schedule Assessment Visit
              </Link>
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
