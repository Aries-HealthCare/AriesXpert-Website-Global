'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Award, 
  Target, 
  Users, 
  Lightbulb, 
  BarChart3, 
  Globe, 
  Settings, 
  Heart, 
  TrendingUp, 
  Linkedin, 
  ArrowRight,
  Star,
  ShieldCheck
} from 'lucide-react';
import { 
  fadeUp, 
  slideInLeft, 
  slideInRight, 
  scaleUp, 
  staggerContainer, 
  viewportConfig 
} from '@/hooks/use-scroll-animation';

export default function Team() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-purple-50/30 to-background dark:from-background dark:via-purple-950/15 dark:to-background relative overflow-hidden transition-colors duration-500">
      
      {/* ── Background Organic Flowing Waves & Decorative Elements ─────────── */}
      {/* Sweeping Left Organic Silhouette Wave matching Image 1 */}
      <div className="absolute -top-10 -left-16 w-[340px] md:w-[480px] lg:w-[580px] h-[950px] pointer-events-none -z-10 opacity-70 dark:opacity-20 select-none">
        <svg viewBox="0 0 580 950" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M-40 -10 C160 140 260 340 210 560 C150 780 40 840 -40 950 Z"
            fill="url(#teamLeftWaveGrad)"
          />
          <path
            d="M-80 80 C120 220 200 400 160 600 C110 800 -10 870 -80 950 Z"
            fill="url(#teamLeftWaveGrad2)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="teamLeftWaveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5F3FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="teamLeftWaveGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F3E8FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sweeping Right Organic Silhouette Wave matching Image 1 */}
      <div className="absolute -top-10 -right-16 w-[340px] md:w-[480px] lg:w-[580px] h-[950px] pointer-events-none -z-10 opacity-70 dark:opacity-20 select-none">
        <svg viewBox="0 0 580 950" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M620 -10 C420 150 340 380 410 610 C480 800 550 860 620 950 Z"
            fill="url(#teamRightWaveGrad)"
          />
          <path
            d="M660 70 C470 210 390 440 450 670 C510 840 580 890 660 950 Z"
            fill="url(#teamRightWaveGrad2)"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="teamRightWaveGrad" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5F3FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="teamRightWaveGrad2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F3E8FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EDE9FE" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-200/15 dark:bg-pink-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        
        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div 
          className="max-w-3xl mx-auto text-center space-y-3 mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-widest uppercase shadow-xs">
              <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>The Visionaries</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2 
            variants={fadeUp}
            className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Founders &{" "}
            <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 dark:from-purple-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
              Co-Founders
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            variants={fadeUp}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Steering Aries PhysioCare toward a connected, accessible, and intelligent future of home healthcare.
          </motion.p>
        </motion.div>

        {/* ── Main Interactive Showcase with Side Accents ─────────────────── */}
        <div className="relative">

          {/* Left Decorative Handwritten Cursive Accent */}
          <motion.div 
            className="hidden xl:flex flex-col items-center absolute -left-10 2xl:-left-16 top-12 font-script text-purple-600/90 dark:text-purple-400/90 text-2xl -rotate-12 select-none pointer-events-none space-y-0.5 leading-snug z-20"
            initial={{ opacity: 0, x: -25, rotate: -16 }}
            whileInView={{ opacity: 1, x: 0, rotate: -12 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8 }}
          >
            <p className="tracking-wide">People</p>
            <p className="tracking-wide">Passion</p>
            <p className="tracking-wide">Purpose</p>
            <p className="tracking-wide">Progress</p>
            <p className="text-3xl pt-1 text-purple-600 dark:text-purple-400">♡</p>
          </motion.div>

          {/* Right Decorative Quote Callout with Dot Matrix */}
          <motion.div 
            className="hidden xl:flex flex-col items-start absolute -right-10 2xl:-right-16 top-14 max-w-[240px] text-left select-none pointer-events-none z-20 space-y-3"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Giant quotation mark */}
            <span className="font-serif text-6xl xl:text-7xl leading-none text-purple-200 dark:text-purple-900/60 font-black -mb-4 select-none">
              “
            </span>

            {/* Quote Title */}
            <div className="space-y-0.5">
              <h3 className="font-headline text-xl font-extrabold text-foreground leading-tight tracking-tight whitespace-nowrap">
                Stronger
              </h3>
              <h3 className="font-headline text-xl font-extrabold text-foreground leading-tight tracking-tight whitespace-nowrap">
                Together for a
              </h3>
              <h3 className="font-headline text-xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight whitespace-nowrap">
                Healthier
              </h3>
              <h3 className="font-headline text-xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight tracking-tight whitespace-nowrap">
                Tomorrow
              </h3>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 pt-1">
              <span className="w-5 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full inline-block" />
              <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Aries PhysioCare
              </span>
            </div>

            {/* Dot Matrix Pattern */}
            <div className="pt-3">
              <div className="grid grid-cols-6 gap-2 opacity-25 dark:opacity-20 text-purple-600">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400" />
                ))}
              </div>
            </div>
          </motion.div>

          {/* 2 Founder Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-4xl mx-auto">
            
            {/* ── Card 1: Mr. Akshay Patel ────────────────────────────────────── */}
            <motion.div 
              className="bg-white/95 dark:bg-card/90 backdrop-blur-xl rounded-[2.25rem] border border-purple-100/90 dark:border-purple-900/50 shadow-xl shadow-purple-950/5 overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:border-purple-300/80 dark:hover:border-purple-700/80"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideInLeft}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* Top Photo with Overlays */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-100 dark:bg-purple-950/40">
                <Image
                  src="/images/team/akshay-patel.png"
                  alt="Mr. Akshay Patel - Founder & Chief Executive Officer"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                
                {/* Quote overlay on top */}
                <div className="absolute top-5 left-5 right-5">
                  <p className="text-white/95 text-xs sm:text-sm font-medium italic drop-shadow-sm max-w-xs leading-relaxed">
                    &ldquo;Technology can bring world-class care to every home.&rdquo;
                  </p>
                </div>

                {/* Bottom Name and Tag overlay */}
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-black text-[10px] uppercase tracking-widest mb-2 shadow-md">
                    ⚡ FOUNDER
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-headline text-white tracking-tight">
                    Mr. Akshay Patel
                  </h3>
                  <p className="text-amber-300 text-[11px] font-bold uppercase tracking-widest mt-0.5">
                    GLOBAL HEALTHCARE ENTREPRENEUR
                  </p>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                
                <div className="space-y-3">
                  {/* Role Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 shadow-xs">
                      <Target className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 tracking-wider uppercase font-headline">
                      Founder & Chief Executive Officer
                    </h4>
                  </div>

                  {/* Bio Narrative */}
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                    Visionary leader dedicated to standardizing home healthcare through technology and clinical rigor. Akshay drives the strategic growth, innovation, and global expansion of Aries PhysioCare, ensuring accessible and high-quality care for every home.
                  </p>
                </div>

                {/* 3 Attribute Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-100/80 dark:border-purple-900/30">
                  <div className="text-center p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 group/tag transition-all duration-300 hover:bg-purple-100/70">
                    <Lightbulb className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1 transition-transform duration-300 group-hover/tag:scale-110" />
                    <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Strategic Leadership</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 group/tag transition-all duration-300 hover:bg-purple-100/70">
                    <BarChart3 className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1 transition-transform duration-300 group-hover/tag:scale-110" />
                    <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Technology Innovation</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 group/tag transition-all duration-300 hover:bg-purple-100/70">
                    <Globe className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1 transition-transform duration-300 group-hover/tag:scale-110" />
                    <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Global Expansion</p>
                  </div>
                </div>

                {/* LinkedIn Button */}
                <div className="pt-1">
                  <Link
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white font-semibold text-xs inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-xs"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-current" />
                    <span>Connect on LinkedIn</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </motion.div>

            {/* ── Card 2: Ms. Karishma Rathod ────────────────────────────────── */}
            <motion.div 
              className="bg-white/95 dark:bg-card/90 backdrop-blur-xl rounded-[2.25rem] border border-purple-100/90 dark:border-purple-900/50 shadow-xl shadow-purple-950/5 overflow-hidden flex flex-col group transition-all duration-500 hover:shadow-2xl hover:border-purple-300/80 dark:hover:border-purple-700/80"
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={slideInRight}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* Top Photo with Overlays */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-100 dark:bg-purple-950/40">
                <Image
                  src="/images/team/karishma-rathod.png"
                  alt="Ms. Karishma Rathod - Co-Founder & Chief Operating Officer"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                
                {/* Quote overlay on top */}
                <div className="absolute top-5 left-5 right-5">
                  <p className="text-white/95 text-xs sm:text-sm font-medium italic drop-shadow-sm max-w-xs leading-relaxed">
                    &ldquo;Care is stronger when it is personal and accessible.&rdquo;
                  </p>
                </div>

                {/* Bottom Name and Tag overlay */}
                <div className="absolute bottom-5 left-6 right-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-black text-[10px] uppercase tracking-widest mb-2 shadow-md">
                    ⚡ CO-FOUNDER
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-headline text-white tracking-tight">
                    Ms. Karishma Rathod
                  </h3>
                  <p className="text-amber-300 text-[11px] font-bold uppercase tracking-widest mt-0.5">
                    MBA, STRATEGY & OPERATIONS
                  </p>
                </div>
              </div>

              {/* Bottom Details */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-6">
                
                <div className="space-y-3">
                  {/* Role Header */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 shadow-xs">
                      <Users className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 tracking-wider uppercase font-headline">
                      Co-Founder & Chief Operating Officer
                    </h4>
                  </div>

                  {/* Bio Narrative */}
                  <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                    Strategic operations leader focused on building scalable healthcare ecosystems and ensuring operational excellence across global markets. Karishma brings a patient-centric approach, driving service innovation, team growth, and a seamless care experience for every individual.
                  </p>
                </div>

                {/* 3 Attribute Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-purple-100/80 dark:border-purple-900/30">
                  <div className="text-center p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 group/tag transition-all duration-300 hover:bg-purple-100/70">
                    <Settings className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1 transition-transform duration-300 group-hover/tag:scale-110" />
                    <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Operations Excellence</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 group/tag transition-all duration-300 hover:bg-purple-100/70">
                    <Heart className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1 transition-transform duration-300 group-hover/tag:scale-110" />
                    <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Patient-Centric Care</p>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 group/tag transition-all duration-300 hover:bg-purple-100/70">
                    <TrendingUp className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1 transition-transform duration-300 group-hover/tag:scale-110" />
                    <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Sustainable Growth</p>
                  </div>
                </div>

                {/* LinkedIn Button */}
                <div className="pt-1">
                  <Link
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-full border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white font-semibold text-xs inline-flex items-center justify-center gap-2 transition-all duration-300 shadow-xs"
                  >
                    <Linkedin className="w-3.5 h-3.5 fill-current" />
                    <span>Connect on LinkedIn</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </motion.div>

          </div>

        </div>

        {/* ── Bottom Scale & Trust Bar ───────────────────────────────────────── */}
        <motion.div 
          className="mt-14 sm:mt-16 max-w-4xl mx-auto py-4 px-6 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-xl border border-purple-100/90 dark:border-purple-900/40 shadow-xl shadow-purple-950/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={scaleUp}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-purple-100 dark:divide-purple-900/40">
            
            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center group cursor-default">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-headline">1,000+</p>
                <p className="text-[11px] text-muted-foreground">Happy Patients</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center group cursor-default">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Star className="w-4 h-4 fill-purple-600 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-headline">4.9/5</p>
                <p className="text-[11px] text-muted-foreground">Patient Satisfaction</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center group cursor-default">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-headline">Trusted</p>
                <p className="text-[11px] text-muted-foreground">Healthcare Brand</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center group cursor-default">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-headline">Expanding</p>
                <p className="text-[11px] text-muted-foreground">Across India & Beyond</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}