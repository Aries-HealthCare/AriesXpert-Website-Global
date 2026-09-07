'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  MapPin, 
  Globe, 
  Building2, 
  Users, 
  Smartphone, 
  Activity, 
  Handshake, 
  Target 
} from 'lucide-react';
import { 
  fadeUp, 
  slideInLeft, 
  slideInRight, 
  scaleUp, 
  staggerContainer, 
  viewportConfig 
} from '@/hooks/use-scroll-animation';

const roadmapPillars = [
  {
    icon: Smartphone,
    title: "Digital Health Ecosystem",
    description: "Developing mobile apps and patient portals for seamless communication and access to care."
  },
  {
    icon: Activity,
    title: "AI & Remote Monitoring",
    description: "Integrating AI-assisted recovery tracking and wearable technology for real-time progress monitoring."
  },
  {
    icon: Handshake,
    title: "Insurance & Partner Integrations",
    description: "Building partnerships with insurance providers and other healthcare stakeholders to create a truly integrated care experience."
  },
  {
    icon: Target,
    title: "Expanding Our Reach",
    description: "With a strong presence across major Indian cities, we are actively executing our expansion roadmap to bring quality home healthcare to more communities, both nationally and internationally."
  }
];

export default function Roadmap() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-purple-50/20 to-background dark:from-background dark:via-purple-950/10 dark:to-background relative overflow-hidden transition-colors duration-500">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl relative z-10">
        
        {/* ── Main Unified Showcase Card ─────────────────────────────────── */}
        <motion.div 
          className="bg-white/90 dark:bg-card/90 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-purple-100/90 dark:border-purple-900/40 shadow-xl shadow-purple-950/5 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={scaleUp}
        >
          
          {/* ── Card Header with Floating Script ───────────────────────────── */}
          <div className="relative mb-10 sm:mb-14">
            
            <motion.div variants={fadeUp} className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-widest uppercase shadow-xs">
                <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Our Growth</span>
              </div>

              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                Global Presence &{" "}
                <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent">
                  Future Roadmap
                </span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                Our vision for a connected, accessible, and intelligent future of home healthcare.
              </p>
            </motion.div>

            {/* Floating Cursive Script Accent Top Right */}
            <motion.div 
              className="hidden lg:block absolute -top-2 right-4 font-script text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl rotate-3 select-none pointer-events-none"
              initial={{ opacity: 0, x: 20, rotate: 6 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={viewportConfig}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Expanding Care Enriching Lives ♡
            </motion.div>
          </div>

          {/* ── Grid Layout: Left Map & Stats, Right Roadmap Pillars & Photo ─ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* ── Left Column: World Map Visual & Metric Strip (5 cols) ─────── */}
            <motion.div 
              className="lg:col-span-5 flex flex-col justify-between space-y-5"
              variants={slideInLeft}
            >
              
              {/* World Map Container */}
              <div className="relative w-full aspect-[16/11] rounded-3xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-100/80 dark:border-purple-900/40 p-4 flex items-center justify-center overflow-hidden shadow-inner">
                
                {/* SVG Dotted World Map Graphic with connection arcs */}
                <svg className="w-full h-full text-purple-300/60 dark:text-purple-700/50" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dense Continental Dots Matrix */}
                  <g fill="currentColor">
                    {/* North America */}
                    <circle cx="80" cy="90" r="3" /><circle cx="100" cy="85" r="3" /><circle cx="120" cy="90" r="3" /><circle cx="140" cy="85" r="3" /><circle cx="160" cy="95" r="3" />
                    <circle cx="90" cy="110" r="3" /><circle cx="110" cy="105" r="3" /><circle cx="130" cy="110" r="3" /><circle cx="150" cy="105" r="3" /><circle cx="170" cy="115" r="3" /><circle cx="190" cy="110" r="3" />
                    <circle cx="100" cy="130" r="3" /><circle cx="120" cy="125" r="3" /><circle cx="140" cy="130" r="3" /><circle cx="160" cy="130" r="3" /><circle cx="180" cy="135" r="3" /><circle cx="200" cy="130" r="3" /><circle cx="220" cy="135" r="3" />
                    <circle cx="110" cy="150" r="3" /><circle cx="130" cy="150" r="3" /><circle cx="150" cy="150" r="3" /><circle cx="170" cy="155" r="3" /><circle cx="190" cy="155" r="3" /><circle cx="210" cy="150" r="3" /><circle cx="230" cy="160" r="3" />
                    <circle cx="120" cy="170" r="3" /><circle cx="140" cy="170" r="3" /><circle cx="160" cy="175" r="3" /><circle cx="180" cy="175" r="3" /><circle cx="200" cy="175" r="3" /><circle cx="220" cy="180" r="3" />
                    <circle cx="140" cy="195" r="3" /><circle cx="160" cy="195" r="3" /><circle cx="180" cy="195" r="3" /><circle cx="200" cy="200" r="3" />
                    <circle cx="150" cy="220" r="3" /><circle cx="170" cy="220" r="3" /><circle cx="190" cy="225" r="3" />
                    <circle cx="180" cy="245" r="3" /><circle cx="195" cy="255" r="3" />

                    {/* South America */}
                    <circle cx="220" cy="275" r="3" /><circle cx="240" cy="280" r="3" /><circle cx="260" cy="285" r="3" /><circle cx="280" cy="290" r="3" />
                    <circle cx="230" cy="300" r="3" /><circle cx="250" cy="305" r="3" /><circle cx="270" cy="310" r="3" /><circle cx="290" cy="315" r="3" /><circle cx="310" cy="320" r="3" />
                    <circle cx="240" cy="325" r="3" /><circle cx="260" cy="330" r="3" /><circle cx="280" cy="335" r="3" /><circle cx="300" cy="340" r="3" /><circle cx="320" cy="345" r="3" />
                    <circle cx="250" cy="350" r="3" /><circle cx="270" cy="355" r="3" /><circle cx="290" cy="360" r="3" /><circle cx="310" cy="365" r="3" />
                    <circle cx="260" cy="375" r="3" /><circle cx="280" cy="380" r="3" /><circle cx="300" cy="385" r="3" />
                    <circle cx="270" cy="400" r="3" /><circle cx="290" cy="405" r="3" />
                    <circle cx="280" cy="425" r="3" />

                    {/* Europe & Scandinavia */}
                    <circle cx="450" cy="85" r="3" /><circle cx="470" cy="80" r="3" /><circle cx="490" cy="75" r="3" /><circle cx="510" cy="80" r="3" />
                    <circle cx="440" cy="105" r="3" /><circle cx="460" cy="100" r="3" /><circle cx="480" cy="95" r="3" /><circle cx="500" cy="100" r="3" /><circle cx="520" cy="105" r="3" />
                    <circle cx="430" cy="125" r="3" /><circle cx="450" cy="120" r="3" /><circle cx="470" cy="120" r="3" /><circle cx="490" cy="125" r="3" /><circle cx="510" cy="130" r="3" /><circle cx="530" cy="130" r="3" />
                    <circle cx="440" cy="145" r="3" /><circle cx="460" cy="145" r="3" /><circle cx="480" cy="145" r="3" /><circle cx="500" cy="150" r="3" /><circle cx="520" cy="155" r="3" />
                    <circle cx="450" cy="165" r="3" /><circle cx="470" cy="170" r="3" /><circle cx="490" cy="170" r="3" /><circle cx="510" cy="175" r="3" />

                    {/* Africa */}
                    <circle cx="460" cy="195" r="3" /><circle cx="480" cy="195" r="3" /><circle cx="500" cy="195" r="3" /><circle cx="520" cy="200" r="3" /><circle cx="540" cy="205" r="3" />
                    <circle cx="450" cy="220" r="3" /><circle cx="470" cy="220" r="3" /><circle cx="490" cy="225" r="3" /><circle cx="510" cy="230" r="3" /><circle cx="530" cy="235" r="3" /><circle cx="550" cy="240" r="3" /><circle cx="570" cy="245" r="3" />
                    <circle cx="460" cy="245" r="3" /><circle cx="480" cy="250" r="3" /><circle cx="500" cy="255" r="3" /><circle cx="520" cy="260" r="3" /><circle cx="540" cy="265" r="3" /><circle cx="560" cy="270" r="3" />
                    <circle cx="480" cy="275" r="3" /><circle cx="500" cy="280" r="3" /><circle cx="520" cy="285" r="3" /><circle cx="540" cy="290" r="3" /><circle cx="560" cy="295" r="3" />
                    <circle cx="500" cy="305" r="3" /><circle cx="520" cy="310" r="3" /><circle cx="540" cy="315" r="3" /><circle cx="560" cy="320" r="3" />
                    <circle cx="510" cy="335" r="3" /><circle cx="530" cy="340" r="3" /><circle cx="550" cy="345" r="3" />
                    <circle cx="520" cy="365" r="3" /><circle cx="540" cy="370" r="3" />
                    <circle cx="530" cy="395" r="3" />

                    {/* Asia & Middle East */}
                    <circle cx="560" cy="115" r="3" /><circle cx="580" cy="110" r="3" /><circle cx="600" cy="105" r="3" /><circle cx="620" cy="100" r="3" /><circle cx="640" cy="95" r="3" /><circle cx="660" cy="90" r="3" /><circle cx="680" cy="95" r="3" /><circle cx="700" cy="100" r="3" /><circle cx="720" cy="95" r="3" /><circle cx="740" cy="90" r="3" /><circle cx="760" cy="85" r="3" /><circle cx="780" cy="90" r="3" />
                    <circle cx="550" cy="140" r="3" /><circle cx="570" cy="135" r="3" /><circle cx="590" cy="130" r="3" /><circle cx="610" cy="125" r="3" /><circle cx="630" cy="120" r="3" /><circle cx="650" cy="120" r="3" /><circle cx="670" cy="125" r="3" /><circle cx="690" cy="125" r="3" /><circle cx="710" cy="120" r="3" /><circle cx="730" cy="120" r="3" /><circle cx="750" cy="115" r="3" /><circle cx="770" cy="115" r="3" /><circle cx="790" cy="120" r="3" /><circle cx="810" cy="125" r="3" />
                    <circle cx="580" cy="160" r="3" /><circle cx="600" cy="155" r="3" /><circle cx="620" cy="150" r="3" /><circle cx="640" cy="145" r="3" /><circle cx="660" cy="145" r="3" /><circle cx="680" cy="150" r="3" /><circle cx="700" cy="150" r="3" /><circle cx="720" cy="150" r="3" /><circle cx="740" cy="145" r="3" /><circle cx="760" cy="145" r="3" /><circle cx="780" cy="150" r="3" /><circle cx="800" cy="155" r="3" />
                    <circle cx="590" cy="185" r="3" /><circle cx="610" cy="180" r="3" /><circle cx="630" cy="175" r="3" /><circle cx="650" cy="170" r="3" /><circle cx="670" cy="175" r="3" /><circle cx="690" cy="180" r="3" /><circle cx="710" cy="180" r="3" /><circle cx="730" cy="175" r="3" /><circle cx="750" cy="175" r="3" /><circle cx="770" cy="180" r="3" /><circle cx="790" cy="185" r="3" />
                    
                    {/* India Subcontinent */}
                    <circle cx="650" cy="205" r="3.5" /><circle cx="670" cy="205" r="3.5" /><circle cx="690" cy="210" r="3.5" /><circle cx="710" cy="210" r="3.5" /><circle cx="730" cy="210" r="3.5" />
                    <circle cx="660" cy="230" r="3.5" /><circle cx="680" cy="230" r="3.5" /><circle cx="700" cy="235" r="3.5" />
                    <circle cx="670" cy="255" r="3.5" /><circle cx="690" cy="260" r="3.5" />
                    <circle cx="680" cy="280" r="3.5" />

                    {/* East & Southeast Asia */}
                    <circle cx="740" cy="235" r="3" /><circle cx="760" cy="240" r="3" /><circle cx="780" cy="245" r="3" />
                    <circle cx="750" cy="265" r="3" /><circle cx="770" cy="270" r="3" /><circle cx="790" cy="275" r="3" /><circle cx="810" cy="260" r="3" /><circle cx="830" cy="240" r="3" />
                    <circle cx="760" cy="295" r="3" /><circle cx="780" cy="300" r="3" /><circle cx="800" cy="305" r="3" />

                    {/* Australia & Oceania */}
                    <circle cx="810" cy="340" r="3" /><circle cx="830" cy="335" r="3" /><circle cx="850" cy="340" r="3" /><circle cx="870" cy="345" r="3" />
                    <circle cx="800" cy="365" r="3" /><circle cx="820" cy="365" r="3" /><circle cx="840" cy="370" r="3" /><circle cx="860" cy="375" r="3" /><circle cx="880" cy="375" r="3" />
                    <circle cx="810" cy="390" r="3" /><circle cx="830" cy="395" r="3" /><circle cx="850" cy="400" r="3" /><circle cx="870" cy="400" r="3" />
                    <circle cx="830" cy="420" r="3" /><circle cx="850" cy="425" r="3" />
                  </g>

                  {/* Arcs connecting nodes */}
                  <path d="M190 155 Q 330 95 480 120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45" />
                  <path d="M480 120 Q 560 160 675 250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.55" />
                  <path d="M675 250 Q 740 280 840 370" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45" />
                  <path d="M675 250 Q 730 200 780 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                </svg>

                {/* Regional Pinpoints matching Mockup */}
                {/* North America */}
                <div className="absolute top-[32%] left-[19%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* South America */}
                <div className="absolute top-[64%] left-[27%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Europe */}
                <div className="absolute top-[28%] left-[48%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Africa */}
                <div className="absolute top-[52%] left-[52%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* East Asia */}
                <div className="absolute top-[32%] left-[78%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Australia */}
                <div className="absolute top-[72%] left-[84%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Active India (Mumbai) Pin & Popover Callout */}
                <div className="absolute top-[52%] left-[67.5%] -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-600/40 animate-ping absolute -left-2 -top-2" />
                    <div className="w-4 h-4 rounded-full bg-purple-700 dark:bg-purple-500 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Popover Pill matching Mockup */}
                    <div className="ml-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-purple-200 dark:border-purple-800 flex items-center gap-1.5 whitespace-nowrap">
                      <Users className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <div className="text-[11px] leading-tight">
                        <span className="text-muted-foreground font-normal">Currently Serving </span>
                        <span className="font-bold text-foreground">Mumbai, India</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4 Metric Counters Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100/90 dark:border-purple-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground font-headline">10+</p>
                    <p className="text-[10px] text-muted-foreground">Cities (India)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground font-headline">3+</p>
                    <p className="text-[10px] text-muted-foreground">Countries</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground font-headline">50+</p>
                    <p className="text-[10px] text-muted-foreground">Partner Clinics</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground font-headline">1,000+</p>
                    <p className="text-[10px] text-muted-foreground">Lives Impacted</p>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* ── Right Column: 4 Roadmap Pillars & Vertical Visual (7 cols) ── */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* 4 Feature Pillars (7 cols of right section) */}
              <motion.div 
                className="sm:col-span-7 space-y-4"
                variants={staggerContainer}
              >
                {roadmapPillars.map((pillar) => (
                  <motion.div 
                    key={pillar.title}
                    variants={fadeUp}
                    className="flex items-start gap-3.5 group cursor-default"
                  >
                    <div className="w-9 h-9 rounded-2xl bg-purple-100/90 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs mt-0.5 transition-transform duration-300 group-hover:scale-110">
                      <pillar.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground font-headline group-hover:text-purple-900 dark:group-hover:text-purple-200 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Side Visual Card: Vertical Compassionate Hands Photo (5 cols of right section) */}
              <motion.div 
                className="sm:col-span-5 h-full flex flex-col justify-center"
                variants={slideInRight}
              >
                <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden shadow-xl border border-purple-100/90 dark:border-purple-900/50 group">
                  <Image
                    src="/images/about/roadmap-hands-vertical.jpg"
                    alt="Aries PhysioCare compassionate care hands"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                  
                  {/* Card Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end space-y-2">
                    <h4 className="text-base sm:text-lg font-bold font-headline text-white tracking-tight leading-snug drop-shadow-md">
                      A Healthier World Together
                    </h4>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-semibold w-fit shadow-xs">
                      <span>People • Partnerships • Possibilities</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}