'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { specialities } from "@/lib/placeholder-data";
import {
  Bone,
  BrainCircuit,
  Baby,
  Dumbbell,
  ShieldCheck,
  Users,
  HeartPulse,
  Monitor,
  UserRound,
  Award,
  ChevronRight,
  Sparkles,
  Activity,
  Crosshair,
  Stethoscope
} from 'lucide-react';
import { cn } from "@/lib/utils";

const icons = [
  Bone,           // Orthopedic
  BrainCircuit,   // Neurological
  Baby,           // Pediatric
  Users,          // Geriatric
  Dumbbell,       // Sports
  ShieldCheck,    // Post-Surgery
  UserRound,      // Women's Health
  Monitor,        // Ergonomics
  HeartPulse      // Cardio-Pulmonary
];

export default function Specialities() {
  // Duplicate for seamless infinite scroll
  const displaySpecialities = [...specialities, ...specialities, ...specialities];

  return (
    <section className="py-18 md:py-28 lg:py-32 relative overflow-hidden bg-[#02050e] text-white">
      {/* ── Ambient Radial Lighting ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_70%)] pointer-events-none" />

      {/* ── Precision Telemetry Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── Fluid Widescreen Header ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14 space-y-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glassmorphic border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Comprehensive Clinical Specialities</span>
          </div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            Specialized Care. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
              Targeted Recovery.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Phased, evidence-based recovery programs designed by our Clinical Directorate to ensure the highest standard of functional restoration.
          </p>
        </motion.div>
      </div>

      {/* ── Infinite Horizontal Carousel Stream with Medical HealthCare Cards ── */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max gap-6 px-4 animate-scroll-infinite hover:[animation-play-state:paused]">
          {displaySpecialities.map((item, index) => {
            const Icon = icons[index % icons.length] || Bone;
            return (
              <div
                key={`${item.id}-${index}`}
                className="w-[340px] sm:w-[380px] flex-shrink-0"
              >
                <div className="h-full rounded-[26px] p-[1.5px] bg-gradient-to-b from-white/20 via-cyan-500/15 to-violet-600/25 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(6,182,212,0.2)]">
                  <div className="h-full rounded-[24px] bg-[#070c1a]/95 border border-white/10 p-6 flex flex-col justify-between space-y-4">
                    
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[9px] font-mono text-cyan-400/80">
                      <span className="flex items-center gap-1">
                        <Crosshair className="w-3 h-3" /> CLIN-SPEC-0{((index % specialities.length) + 1)}
                      </span>
                      <span className="text-slate-400">COUNCIL VERIFIED</span>
                    </div>

                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-lg">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="font-headline text-xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-slate-300/85 leading-relaxed font-light line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-bold">
                      <span>Explore Protocol</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edge Clinical Fades */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-48 bg-gradient-to-r from-[#02050e] via-[#02050e]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 sm:w-48 bg-gradient-to-l from-[#02050e] via-[#02050e]/80 to-transparent pointer-events-none z-10" />
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 45s linear infinite;
        }
      `}</style>
    </section>
  );
}
