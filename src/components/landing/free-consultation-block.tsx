'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, ShieldCheck, Clock, Award, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FreeConsultationBlockProps {
  title?: React.ReactNode;
  className?: string;
}

export default function FreeConsultationBlock({ title, className }: FreeConsultationBlockProps) {
  return (
    <section className={cn("py-18 md:py-28 bg-[#02050e] relative overflow-hidden text-white", className)}>
      
      {/* ── Precision Telemetry Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── Fluid Widescreen Container (Zero Side Margins) ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-[32px] p-[1.5px] bg-gradient-to-r from-blue-600/40 via-cyan-500/40 to-violet-600/40 shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          <div className="rounded-[30px] bg-[#070c1a]/95 border border-white/10 grid md:grid-cols-12 gap-0 items-stretch overflow-hidden">
            
            {/* Left Content Side */}
            <div className="md:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 flex flex-col justify-center text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black uppercase tracking-[0.2em] shadow-sm">
                  <Video className="w-3.5 h-3.5" />
                  <span>Free Tele-Health Assessment</span>
                </div>
              </div>

              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-white">
                {title || (
                  <>
                    Complimentary Live <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                      Clinical Tele-Consult
                    </span>
                  </>
                )}
              </h2>

              <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light max-w-xl">
                Speak directly with a Senior Clinical Lead over a secure video link. Get an immediate diagnosis of your symptoms, posture, and customized home recovery plan.
              </p>

              {/* Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>30-Min In-Depth Video Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Personalized Roadmap & Exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>100% Free · Zero Commitment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Same-Day Video Slot Available</span>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  size="lg" 
                  className="h-15 sm:h-16 px-9 text-base font-black rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-xl hover:brightness-110 active:scale-95 transition-all duration-300 w-full sm:w-auto" 
                  asChild
                >
                  <Link href="/free-tele-consultation">
                    <Video className="mr-3 w-5 h-5" /> 
                    <span>Consult Online Now (Free)</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Image Side */}
            <div className="md:col-span-5 relative hidden md:block min-h-[480px]">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000"
                alt="Tele-health clinical consultation"
                fill
                className="object-cover object-center brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#070c1a] via-[#070c1a]/40 to-transparent" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
