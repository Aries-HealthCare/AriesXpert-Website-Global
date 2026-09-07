'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Users, 
  ArrowRight, 
  Play, 
  Heart, 
  ShieldCheck, 
  BarChart3, 
  Home, 
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeUp, slideInLeft, slideInRight, staggerContainer, pillStagger, pillItem, viewportConfig } from '@/hooks/use-scroll-animation';

export default function Hero() {
  return (
    <section className="relative w-full pt-10 pb-8 md:pt-16 md:pb-12 overflow-hidden bg-gradient-to-b from-[#FAF8FF] via-white to-[#FAF8FF] dark:from-[#0B0817] dark:via-[#0F0B1E] dark:to-[#0B0817] transition-colors duration-500">
      
      {/* ── Background Organic Flowing Waves & Accents ───────────────────────── */}
      {/* Sweeping Left Organic Wave */}
      <div className="absolute top-0 left-0 w-[450px] md:w-[650px] h-[750px] pointer-events-none -z-10 opacity-70 dark:opacity-20 select-none">
        <svg viewBox="0 0 650 750" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M-50 0 C150 80 320 220 260 420 C200 620 60 680 -50 750 Z"
            fill="url(#leftHeroWaveGrad)"
          />
          <defs>
            <linearGradient id="leftHeroWaveGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F5F3FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sweeping Right Organic Wave */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[800px] pointer-events-none -z-10 opacity-70 dark:opacity-20 select-none">
        <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M650 0 C420 120 340 380 440 580 C520 740 580 760 650 800 Z"
            fill="url(#rightHeroWaveGrad)"
          />
          <defs>
            <linearGradient id="rightHeroWaveGrad" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.45" />
              <stop offset="65%" stopColor="#EDE9FE" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FAF5FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Mid-Left Translucent Floral Petals Watermark */}
      <div className="absolute top-48 -left-8 w-44 h-44 pointer-events-none opacity-40 dark:opacity-15 select-none -z-10">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-purple-300 dark:text-purple-700">
          <path d="M100 100 C70 40 40 60 50 90 C60 120 100 100 100 100 Z" fill="currentColor" />
          <path d="M100 100 C110 30 140 40 140 80 C140 120 100 100 100 100 Z" fill="currentColor" />
          <path d="M100 100 C160 80 170 120 140 130 C110 140 100 100 100 100 Z" fill="currentColor" />
          <path d="M100 100 C130 160 90 170 80 140 C70 110 100 100 100 100 Z" fill="currentColor" />
          <path d="M100 100 C40 140 30 100 60 80 C90 60 100 100 100 100 Z" fill="currentColor" />
        </svg>
      </div>

      {/* Ambient background blur glows */}
      <div className="absolute top-12 left-1/3 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-16 w-80 h-80 bg-amber-100/30 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── Main Hero Content Container ──────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <motion.div 
            className="lg:col-span-7 space-y-6 relative"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
          >
            
            {/* Top Badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-wider uppercase shadow-xs">
                <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>About Aries PhysioCare</span>
              </div>
            </motion.div>

            {/* Main Headline with Cursive Accent */}
            <div className="relative">
              <motion.h1 
                variants={fadeUp}
                className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-foreground tracking-tight leading-[1.15]"
              >
                Redefining Home Healthcare with{" "}
                <span className="bg-gradient-to-r from-amber-600 via-purple-600 to-indigo-600 dark:from-amber-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Precision, Compassion and Technology
                </span>
              </motion.h1>

              {/* Handwritten floating text with floating drift */}
              <motion.div 
                className="hidden sm:block absolute -top-8 right-2 lg:-right-4 font-script text-purple-600 dark:text-purple-400 text-3xl md:text-4xl -rotate-6 select-none pointer-events-none"
                initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: -6 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ rotate: -2, scale: 1.05 }}
              >
                Movement Heals Lives ♡
              </motion.div>
            </div>

            {/* Subtitle description */}
            <motion.p 
              variants={fadeUp}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal"
            >
              Aries PhysioCare, a premium home healthcare brand under Aries HealthCare International Pvt Ltd, is dedicated to delivering outcome-driven care through a team of expert professionals and scalable, technology-driven healthcare systems.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-full px-7 shadow-lg shadow-purple-600/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-purple-600/40"
              >
                <Link href="#story">
                  Our Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="rounded-full px-6 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-purple-200/70 dark:border-purple-800/40 text-foreground hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <Link href="/services">
                  <Play className="w-4 h-4 mr-2 text-purple-600 fill-purple-600" />
                  Watch Our Story
                </Link>
              </Button>
            </motion.div>

            {/* 4 Quick Benefit Items */}
            <motion.div 
              variants={pillStagger}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-purple-100/80 dark:border-purple-900/30"
            >
              <motion.div variants={pillItem} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Care at Home
                </span>
              </motion.div>

              <motion.div variants={pillItem} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Trusted Professionals
                </span>
              </motion.div>

              <motion.div variants={pillItem} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Evidence Based Care
                </span>
              </motion.div>

              <motion.div variants={pillItem} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300 transition-transform duration-300 group-hover:scale-110">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  Better Quality of Life
                </span>
              </motion.div>
            </motion.div>

          </motion.div>

          {/* Right Visual Column with Floating Badges */}
          <motion.div 
            className="lg:col-span-5 relative mt-4 lg:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={slideInRight}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image Container with Soft Shadow & Border */}
              <motion.div 
                className="relative aspect-[4/3] w-full rounded-[2.25rem] overflow-hidden shadow-2xl shadow-purple-950/10 border border-white/80 dark:border-purple-900/30"
                whileHover={{ scale: 1.015 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src="/images/about/hero-therapist-rehab.jpg"
                  alt="Aries PhysioCare professional therapist assisting patient"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Floating Benefit Cards on Right */}
              <div className="absolute -right-2 sm:-right-4 top-4 sm:top-8 flex flex-col gap-2.5 z-20">
                
                {/* 1. Recover Faster */}
                <motion.div 
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg border border-purple-100/90 dark:border-purple-900/50 flex items-center gap-3 transition-all cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground font-headline">Recover Faster</h4>
                    <p className="text-[10px] text-muted-foreground">Regain mobility and strength</p>
                  </div>
                </motion.div>

                {/* 2. Live Healthier */}
                <motion.div 
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg border border-purple-100/90 dark:border-purple-900/50 flex items-center gap-3 transition-all cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground font-headline">Live Healthier</h4>
                    <p className="text-[10px] text-muted-foreground">Move better, feel better</p>
                  </div>
                </motion.div>

                {/* 3. Stay Independent */}
                <motion.div 
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ y: -3, scale: 1.03 }}
                  className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg border border-purple-100/90 dark:border-purple-900/50 flex items-center gap-3 transition-all cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/70 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground font-headline">Stay Independent</h4>
                    <p className="text-[10px] text-muted-foreground">Care in the comfort of home</p>
                  </div>
                </motion.div>

              </div>

              {/* Floating Cursive Signature bottom right with subtle drift */}
              <motion.div 
                className="absolute -bottom-6 right-2 sm:right-6 font-script text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl rotate-2 select-none pointer-events-none"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                The Healing Touch ♡
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}