'use client';

import Image from "next/image";
import { BookOpen, Quote, Sparkles, Users, ShieldCheck } from "lucide-react";

export default function Story() {
  return (
    <section id="story" className="py-12 md:py-20 bg-background relative scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        
        {/* Main Card Container */}
        <div className="bg-white/80 dark:bg-card/80 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 lg:p-14 border border-purple-100/80 dark:border-purple-900/30 shadow-xl shadow-purple-950/5 relative overflow-hidden">
          
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Our Story</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Our Story
            </h2>
            <p className="mt-2 text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400">
              Bridging the Gap Between Hospital and Home
            </p>
          </div>

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Founding Belief Callout */}
            <div className="lg:col-span-3">
              <div className="bg-purple-50/70 dark:bg-purple-950/30 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 relative">
                <Quote className="w-10 h-10 text-purple-400/80 dark:text-purple-500/50 mb-3" />
                <blockquote className="text-base sm:text-lg font-medium text-foreground/90 leading-relaxed italic">
                  &ldquo;Quality care should not end at the hospital door. It should continue at home.&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-purple-200/60 dark:border-purple-800/40">
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                    — Our Founding Belief
                  </p>
                </div>
              </div>
            </div>

            {/* Center Column: Narrative */}
            <div className="lg:col-span-5 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Aries PhysioCare was founded with a clear and powerful mission: to close the critical gap between hospital-level medical treatment and the care patients receive at home. We recognized that the journey to recovery doesn&apos;t end at the hospital exit; it continues in the familiar, comforting environment of one&apos;s home.
              </p>
              <p>
                Our goal is to deliver clinical-grade physiotherapy and comprehensive healthcare services directly to your doorstep.
              </p>
              <p>
                Our approach is built on a robust framework that combines deep medical expertise, cutting-edge technology, and structured, evidence-based care protocols. This synergy ensures that every patient receives a level of care that is not only effective but also consistent and reliable.
              </p>
              <p>
                We have meticulously designed our services for a diverse range of needs, catering to patients requiring post-surgery rehabilitation, <strong className="font-semibold text-foreground">elderly individuals needing geriatric care</strong>, families seeking support for chronic pain and lifestyle conditions, and anyone who believes in a proactive approach to health.
              </p>
            </div>

            {/* Right Column: Visual, Stats & Quote Banner */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Recovery Visual Card */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md border border-purple-100/80 dark:border-purple-900/30 group">
                <Image
                  src="/images/about/story-recovery-room.jpg"
                  alt="Aries PhysioCare recovery setup and wellness environment"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Handwritten Floating Text */}
                <div className="absolute top-4 right-4 max-w-[200px] text-right font-script text-white text-xl sm:text-2xl drop-shadow-md leading-tight -rotate-3 select-none pointer-events-none">
                  From Recovery to a Brighter Tomorrow ♡
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/60 dark:border-purple-900/30">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-700 dark:text-purple-400 font-bold text-base sm:text-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>5+</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Years of Impact</p>
                </div>

                <div className="text-center border-x border-border/40">
                  <div className="flex items-center justify-center gap-1 text-purple-700 dark:text-purple-400 font-bold text-base sm:text-lg">
                    <Users className="w-3.5 h-3.5" />
                    <span>1,000+</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Happy Patients</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-purple-700 dark:text-purple-400 font-bold text-base sm:text-lg">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>95%</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Satisfaction</p>
                </div>
              </div>

              {/* Bottom Quote Banner */}
              <div className="rounded-2xl p-4 text-center bg-gradient-to-r from-purple-100/60 via-purple-50/80 to-purple-100/60 dark:from-purple-950/40 dark:via-purple-900/20 dark:to-purple-950/40 border border-purple-200/50 dark:border-purple-800/30">
                <p className="text-sm font-semibold text-purple-900 dark:text-purple-200 italic">
                  &ldquo;A healthier you, a happier tomorrow.&rdquo;
                </p>
                <p className="text-[11px] font-bold text-purple-700/80 dark:text-purple-400 tracking-wider uppercase mt-1">
                  — Aries PhysioCare
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}