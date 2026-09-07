'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Users, 
  FileText, 
  HeartHandshake, 
  IndianRupee, 
  Settings, 
  Globe, 
  ArrowRight 
} from 'lucide-react';
import { 
  fadeUp, 
  cardReveal, 
  staggerContainer, 
  viewportConfig 
} from '@/hooks/use-scroll-animation';

const reasons = [
  {
    number: "01",
    icon: Users,
    iconColor: "text-purple-600 dark:text-purple-300",
    iconBg: "bg-purple-100 dark:bg-purple-950/60",
    title: "Certified & Experienced Professionals",
    description: "Our team consists of vetted, highly-qualified therapists and medical staff.",
    link: "/therapist",
  },
  {
    number: "02",
    icon: FileText,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100/90 dark:bg-amber-950/50",
    title: "Evidence-Based Treatment",
    description: "We follow scientifically-proven protocols to ensure the best clinical outcomes.",
    link: "/services",
  },
  {
    number: "03",
    icon: HeartHandshake,
    iconColor: "text-purple-600 dark:text-purple-300",
    iconBg: "bg-purple-100 dark:bg-purple-950/60",
    title: "Personalized Care Plans",
    description: "Every patient receives a care plan tailored to their specific needs and goals.",
    link: "/services",
  },
  {
    number: "04",
    icon: IndianRupee,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100/90 dark:bg-amber-950/50",
    title: "Transparent Pricing",
    description: "No hidden costs. We believe in clear and honest pricing for all our services.",
    link: "/services",
  },
  {
    number: "05",
    icon: Settings,
    iconColor: "text-purple-600 dark:text-purple-300",
    iconBg: "bg-purple-100 dark:bg-purple-950/60",
    title: "Technology-Driven Operations",
    description: "Our use of technology ensures efficient, streamlined, and high-quality service delivery.",
    link: "/services",
  },
  {
    number: "06",
    icon: Globe,
    iconColor: "text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-100/90 dark:bg-amber-950/50",
    title: "Pan-India & Global Vision",
    description: "We are building a scalable healthcare ecosystem to serve communities worldwide.",
    link: "/clinic",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-purple-50/25 to-background dark:from-background dark:via-purple-950/10 dark:to-background relative overflow-hidden transition-colors duration-500">
      
      {/* ── Background Organic Flowing Waves matching Mockup ───────────── */}
      <div className="absolute -top-16 -left-20 w-[380px] md:w-[520px] h-[750px] pointer-events-none -z-10 opacity-60 dark:opacity-15 select-none">
        <svg viewBox="0 0 520 750" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M-50 -20 C140 100 240 280 190 480 C130 680 30 720 -50 780 Z"
            fill="url(#whyChooseLeftWave)"
          />
          <defs>
            <linearGradient id="whyChooseLeftWave" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#DDD6FE" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FAF5FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-1/3 -right-20 w-[380px] md:w-[500px] h-[700px] pointer-events-none -z-10 opacity-55 dark:opacity-15 select-none">
        <svg viewBox="0 0 500 700" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path
            d="M550 -20 C380 120 300 320 360 520 C420 680 480 720 550 780 Z"
            fill="url(#whyChooseRightWave)"
          />
          <defs>
            <linearGradient id="whyChooseRightWave" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9D5FF" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#EDE9FE" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#FAF5FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-200/20 dark:bg-purple-950/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        
        {/* ── Section Header with Cursive Accent ─────────────────────────── */}
        <div className="relative max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="space-y-3"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="flex justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-widest uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Why Choose Us</span>
              </div>
            </motion.div>

            {/* Headline with Dual-Color Gradient */}
            <motion.h2 
              variants={fadeUp}
              className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
            >
              Why Choose{" "}
              <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 dark:from-purple-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
                Aries Physio
              </span>
              <span className="bg-gradient-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                Care?
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p 
              variants={fadeUp}
              className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              We go beyond treatment — we deliver a better way to live.
            </motion.p>
          </motion.div>

          {/* Floating Handwritten Script Top-Right */}
          <motion.div 
            className="hidden lg:block absolute -top-4 -right-12 xl:-right-16 font-script text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl rotate-6 select-none pointer-events-none"
            initial={{ opacity: 0, x: 20, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 6 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Your Health Our Priority ♡
          </motion.div>
        </div>

        {/* ── 6 Numbered Feature Cards Grid (3 cols x 2 rows) ─────────────── */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {reasons.map((item) => (
            <motion.div
              key={item.number}
              variants={cardReveal}
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 dark:bg-card/90 backdrop-blur-xl rounded-[1.75rem] p-6 sm:p-7 border border-purple-100/90 dark:border-purple-900/40 shadow-lg shadow-purple-950/5 hover:shadow-xl hover:border-purple-300/80 dark:hover:border-purple-700/80 transition-all duration-300 flex items-stretch justify-between gap-4 group"
            >
              {/* Left Column: Circular Icon */}
              <div className="shrink-0 pt-0.5">
                <div className={`w-12 h-12 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                  <item.icon className="w-5 h-5" />
                </div>
              </div>

              {/* Center Column: Title & Description */}
              <div className="flex-grow space-y-1.5 min-w-0">
                <h3 className="text-base font-bold font-headline text-foreground tracking-tight leading-snug group-hover:text-purple-900 dark:group-hover:text-purple-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Right Column: Number at Top, Arrow at Bottom */}
              <div className="shrink-0 flex flex-col justify-between items-end pl-1">
                {/* Step Number */}
                <span className="text-2xl sm:text-3xl font-bold font-headline text-purple-200/80 dark:text-purple-800/60 group-hover:text-purple-400 dark:group-hover:text-purple-400 transition-colors select-none">
                  {item.number}
                </span>

                {/* Circular Arrow Link */}
                <Link
                  href={item.link}
                  aria-label={`Learn more about ${item.title}`}
                  className="w-7 h-7 rounded-full border border-purple-200/80 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-600 dark:group-hover:text-white transition-all duration-300 shadow-xs"
                >
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}