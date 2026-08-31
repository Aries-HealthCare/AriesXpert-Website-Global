'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Activity, 
  Target, 
  ArrowUpCircle, 
  ArrowRight,
  Radio,
  BarChart2,
  Cpu,
  UserCheck,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';

const recoveryStages = [
  {
    stageNum: 'STAGE 01',
    code: 'STAGE_01/ROM_SCAN',
    title: 'Assess',
    subtitle: 'BIOMECHANICAL SCREENING',
    description: 'Proprietary clinical algorithms analyze joint kinematics and postural pain triggers to isolate the precise source of dysfunction.',
    icon: ShieldCheck,
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    iconBoxColor: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400',
    tagColor: 'text-cyan-400',
    dotColor: 'bg-cyan-400',
  },
  {
    stageNum: 'STAGE 02',
    code: 'STAGE_02/PROTOCOL_AI',
    title: 'Plan',
    subtitle: 'DYNAMIC ROADMAPS',
    description: 'AI-assisted clinical roadmaps tailored to specific pathology, age, joint angle targets, and home milestone goals.',
    icon: Target,
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    iconBoxColor: 'bg-blue-950/60 border-blue-500/40 text-blue-400',
    tagColor: 'text-blue-400',
    dotColor: 'bg-blue-400',
  },
  {
    stageNum: 'STAGE 03',
    code: 'STAGE_03/LIVE_TELEMETRY',
    title: 'Track',
    subtitle: 'REAL-TIME MONITORING',
    description: 'Continuous session-by-session functional tracking of ROM degrees, VAS pain scores, and muscle activation milestones.',
    icon: Activity,
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    iconBoxColor: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400',
    tagColor: 'text-emerald-400',
    dotColor: 'bg-emerald-400',
  },
  {
    stageNum: 'STAGE 04',
    code: 'STAGE_04/PERFORMANCE_RETURN',
    title: 'Advance',
    subtitle: 'ADAPTIVE PROTOCOLS',
    description: 'Intelligent, automated adjustment of electrotherapy frequencies and manual techniques as functional capacity returns.',
    icon: ArrowUpCircle,
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    iconBoxColor: 'bg-purple-950/60 border-purple-500/40 text-purple-400',
    tagColor: 'text-purple-400',
    dotColor: 'bg-purple-400',
  },
];

export default function AiPrecisionRecovery() {
  return (
    <section className="py-16 md:py-24 lg:py-28 relative overflow-hidden bg-[#050814] text-white">
      {/* ── 1. Volumetric Ambient Glows ── */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[550px] h-[550px] bg-cyan-500/12 rounded-full blur-[160px] pointer-events-none" />

      {/* ── 2. Left Background Visual: 3D Anatomical Silhouette ── */}
      <div className="absolute left-[-50px] lg:left-[-10px] top-1/3 -translate-y-1/2 w-[380px] h-[380px] lg:w-[480px] lg:h-[480px] pointer-events-none select-none opacity-25 mix-blend-screen z-0">
        <Image
          src="/hero/anatomy-runner.jpg"
          alt="Biomechanical Kinematics Engine"
          fill
          sizes="480px"
          className="object-contain"
        />
        {/* Concentric Telemetry Rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '40s' }} />
        <div className="absolute inset-10 rounded-full border border-blue-500/20" />
      </div>

      {/* ── 3. Right Background Visual: 3D DNA Helix Structure ── */}
      <div className="absolute right-[-40px] lg:right-0 top-1/3 -translate-y-1/2 w-[340px] h-[450px] lg:w-[420px] lg:h-[550px] pointer-events-none select-none opacity-20 z-0 flex items-center justify-center">
        <svg viewBox="0 0 200 400" className="w-full h-full stroke-cyan-400/40 fill-none">
          {/* DNA Double Helix Curve 1 */}
          <path d="M 50,20 Q 150,100 50,180 T 50,340" strokeWidth="2.5" strokeDasharray="6,4" />
          {/* DNA Double Helix Curve 2 */}
          <path d="M 150,20 Q 50,100 150,180 T 150,340" strokeWidth="2.5" strokeDasharray="6,4" />
          {/* DNA Base Pairs Connection Lines & Glowing Nodes */}
          {[40, 80, 120, 160, 200, 240, 280, 320].map((y, i) => (
            <g key={i}>
              <line x1="60" y1={y} x2="140" y2={y} strokeWidth="1.5" stroke="rgba(56,189,248,0.3)" />
              <circle cx="60" cy={y} r="3.5" fill="#00F0FF" />
              <circle cx="140" cy={y} r="3.5" fill="#3B82F6" />
            </g>
          ))}
        </svg>
      </div>

      {/* ── 4. Main Section Container ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12 space-y-3 flex flex-col items-center"
        >
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
            Precision <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Recovery Engine
            </span>
          </h2>

          {/* ECG Pulse Wave Divider */}
          <div className="w-20 h-5 flex items-center justify-center">
            <svg viewBox="0 0 100 30" className="w-full h-full stroke-emerald-400 fill-none stroke-[3]">
              <path d="M0,15 L30,15 L38,3 L48,27 L56,11 L64,18 L72,15 L100,15" />
            </svg>
          </div>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Our proprietary clinical platform powers every stage of your recovery journey, delivering data-driven milestones for hospital-grade home rehabilitation.
          </p>
        </motion.div>

        {/* ── 5. 4-Stage Clinical Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {recoveryStages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col justify-between rounded-[24px] bg-[#070e20]/95 border border-blue-500/30 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_25px_60px_rgba(6,182,212,0.18)] group"
            >
              {/* Top HUD Header with Badge & Monospace Code */}
              <div className="flex items-center justify-between gap-3 pb-5">
                <div className={cn("w-7 h-7 rounded-full border flex items-center justify-center shrink-0", stage.badgeColor)}>
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <div className="text-right font-mono">
                  <div className={cn("text-[11px] font-bold tracking-wider", stage.tagColor)}>
                    {stage.stageNum}
                  </div>
                  <div className="text-[9px] text-slate-400 tracking-tight">
                    {stage.code}
                  </div>
                </div>
              </div>

              {/* Centered Large Stage Icon */}
              <div className="py-2">
                <div className={cn(
                  "w-13 h-13 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105",
                  stage.iconBoxColor
                )}>
                  <stage.icon className="w-7 h-7" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1 pt-3">
                <h3 className="font-headline text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {stage.title}
                </h3>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-400">
                  {stage.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed font-light py-3 flex-grow">
                {stage.description}
              </p>

              {/* Bottom Milestone Status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Clinical Efficacy</span>
                <span className="font-bold text-emerald-400 font-mono">99.4% Verified</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 6. Bottom Clinical Telemetry & Precision Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-[28px] bg-[#070e20]/95 border border-blue-500/30 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden"
        >
          {/* Internal Volumetric Glow */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left Content Area */}
            <div className="space-y-4 max-w-3xl">
              {/* Telemetry Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>TELEMETRY PROTOCOL V3.4</span>
              </div>

              {/* Headline */}
              <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                Experience Hospital-Grade Clinical Precision at Home
              </h3>

              {/* Paragraph */}
              <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                Every home visit is backed by our Clinical Directorate with automated progress logs, calibrated electrotherapy gear, and verified practitioner continuity.
              </p>

              {/* 4 Micro-Feature Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <div className="font-bold text-white">Clinical Governance</div>
                    <div className="text-slate-400 text-[9px]">Verified Process</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <BarChart2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <div className="font-bold text-white">Data-Driven Care</div>
                    <div className="text-slate-400 text-[9px]">Outcome Focused</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Cpu className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <div className="font-bold text-white">Hospital-Grade Gear</div>
                    <div className="text-slate-400 text-[9px]">At Your Home</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <div className="font-bold text-white">Practitioner Continuity</div>
                    <div className="text-slate-400 text-[9px]">Consistent Recovery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Holographic Telemetry Visual + CTA Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 shrink-0">
              {/* Holographic Tablet Preview */}
              <div className="relative w-44 h-24 rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-blue-950/60 to-slate-950/90 shadow-[0_0_30px_rgba(6,182,212,0.2)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_70%)]" />
                <ShieldCheck className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.6)] animate-pulse" />
                {/* HUD Telemetry Scanlines */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[8px] font-mono text-cyan-300">
                  <span>99.4% MATCH</span>
                  <span>SYNC OK</span>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-600 hover:from-blue-700 hover:to-cyan-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98] whitespace-nowrap"
              >
                <span>SCHEDULE ASSESSMENT VISIT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
