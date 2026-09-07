'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Quote, Sparkles, Users, ShieldCheck } from 'lucide-react';
import { fadeUp, slideInLeft, slideInRight, cardReveal, viewportConfig } from '@/hooks/use-scroll-animation';

export default function Story() {
  return (
    <section id="story" className="pt-2 pb-16 md:pt-4 md:pb-24 bg-gradient-to-b from-[#FAF8FF] via-white to-background dark:from-[#0B0817] dark:via-[#0F0B1E] dark:to-background relative scroll-mt-20 overflow-hidden">
      
      {/* ── Background Organic Curves & Botanical Petals ─────────────────────── */}
      {/* Sweeping Left Wave Transition from Hero */}
      <div className="absolute top-0 left-0 w-[400px] h-[600px] pointer-events-none -z-10 opacity-50 dark:opacity-15 select-none">
        <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M-50 0 C120 150 180 320 100 480 C50 560 0 580 -50 600 Z"
            fill="url(#storyLeftWaveGrad)"
          />
          <defs>
            <linearGradient id="storyLeftWaveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#EDE9FE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FAF5FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sweeping Right Wave Transition from Hero */}
      <div className="absolute top-0 right-0 w-[380px] h-[550px] pointer-events-none -z-10 opacity-50 dark:opacity-15 select-none">
        <svg viewBox="0 0 380 550" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M400 0 C280 120 220 280 290 420 C340 500 370 520 400 550 Z"
            fill="url(#storyRightWaveGrad)"
          />
          <defs>
            <linearGradient id="storyRightWaveGrad" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EDE9FE" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FAF5FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom-Left Floral Petals Watermark matching Mockup */}
      <div className="absolute bottom-4 -left-6 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-45 dark:opacity-15 select-none -z-10">
        <svg viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-purple-300/80 dark:text-purple-700/60">
          <path d="M125 125 C85 55 45 80 60 115 C75 150 125 125 125 125 Z" fill="currentColor" />
          <path d="M125 125 C140 45 180 55 180 100 C180 145 125 125 125 125 Z" fill="currentColor" />
          <path d="M125 125 C200 100 215 150 175 165 C135 180 125 125 125 125 Z" fill="currentColor" />
          <path d="M125 125 C160 200 110 215 100 175 C90 135 125 125 125 125 Z" fill="currentColor" />
          <path d="M125 125 C50 175 40 125 75 100 C110 75 125 125 125 125 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        
        {/* Main Card Container with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white/90 dark:bg-card/90 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 lg:p-14 border border-purple-100/90 dark:border-purple-900/40 shadow-2xl shadow-purple-950/5 relative overflow-hidden"
        >
          
          {/* Section Header */}
          <div className="mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Our Story</span>
            </div>
            
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Our Story
            </h2>
            
            <p className="mt-2 text-lg sm:text-xl font-semibold text-purple-700 dark:text-purple-400 font-headline">
              Bridging the Gap Between Hospital and Home
            </p>
          </div>

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Founding Belief Callout */}
            <motion.div 
              className="lg:col-span-3"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideInLeft}
            >
              <div className="bg-purple-50/70 dark:bg-purple-950/30 rounded-3xl p-6 sm:p-7 border border-purple-100 dark:border-purple-900/40 relative shadow-sm hover:shadow-md transition-shadow duration-300">
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
            </motion.div>

            {/* Center Column: Narrative Paragraphs */}
            <motion.div 
              className="lg:col-span-5 space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={fadeUp}
            >
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
            </motion.div>

            {/* Right Column: Visual, Stats & Quote Banner */}
            <motion.div 
              className="lg:col-span-4 space-y-5"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideInRight}
            >
              
              {/* Recovery Visual Card with Cursive Caption */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md border border-purple-100/80 dark:border-purple-900/30 group">
                <Image
                  src="/images/about/story-recovery-room.jpg"
                  alt="Aries PhysioCare recovery setup and wellness environment"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                
                {/* Handwritten Floating Text */}
                <div className="absolute top-4 right-4 max-w-[210px] text-right font-script text-white text-xl sm:text-2xl drop-shadow-md leading-tight -rotate-3 select-none pointer-events-none">
                  From Recovery to a Brighter Tomorrow ♡
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100/70 dark:border-purple-900/40">
                <div className="text-center group cursor-default">
                  <div className="flex items-center justify-center gap-1 text-purple-700 dark:text-purple-400 font-bold text-base sm:text-lg transition-transform duration-300 group-hover:scale-105">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>5+</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Years of Impact</p>
                </div>

                <div className="text-center border-x border-border/50 group cursor-default">
                  <div className="flex items-center justify-center gap-1 text-purple-700 dark:text-purple-400 font-bold text-base sm:text-lg transition-transform duration-300 group-hover:scale-105">
                    <Users className="w-3.5 h-3.5" />
                    <span>1,000+</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Happy Patients</p>
                </div>

                <div className="text-center group cursor-default">
                  <div className="flex items-center justify-center gap-1 text-purple-700 dark:text-purple-400 font-bold text-base sm:text-lg transition-transform duration-300 group-hover:scale-105">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>95%</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">Satisfaction</p>
                </div>
              </div>

              {/* Bottom Quote Banner */}
              <div className="rounded-2xl p-4 text-center bg-gradient-to-r from-purple-100/70 via-purple-50/90 to-purple-100/70 dark:from-purple-950/50 dark:via-purple-900/30 dark:to-purple-950/50 border border-purple-200/60 dark:border-purple-800/40 shadow-xs">
                <p className="text-sm font-semibold text-purple-950 dark:text-purple-100 italic">
                  &ldquo;A healthier you, a happier tomorrow.&rdquo;
                </p>
                <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300 tracking-wider uppercase mt-1">
                  — Aries PhysioCare
                </p>
              </div>

            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}