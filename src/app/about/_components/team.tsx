'use client';

import Image from "next/image";
import Link from "next/link";
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
  ShieldCheck,
  Quote
} from "lucide-react";

export default function Team() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-purple-50/20 to-background dark:from-background dark:via-purple-950/10 dark:to-background relative overflow-hidden">
      
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-pink-200/20 dark:bg-pink-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        
        {/* Section Header with Left Cursive and Right Quote */}
        <div className="relative mb-14 sm:mb-16">
          
          {/* Top-Left Handwritten Accent */}
          <div className="hidden xl:block absolute -top-4 -left-8 font-script text-purple-600 dark:text-purple-400 text-2xl -rotate-12 select-none pointer-events-none space-y-1">
            <p>People</p>
            <p>Passion</p>
            <p>Purpose</p>
            <p>Progress</p>
            <p className="text-3xl pl-2">♡</p>
          </div>

          {/* Centered Title */}
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-wider uppercase shadow-xs">
              <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>The Visionaries</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Founders &{" "}
              <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-pink-600 dark:from-purple-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
                Co-Founders
              </span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Steering Aries PhysioCare toward a connected, accessible, and intelligent future of home healthcare.
            </p>
          </div>

          {/* Top-Right Quote Callout with Dot Matrix */}
          <div className="hidden lg:flex items-center gap-4 absolute -top-2 right-0 max-w-xs xl:max-w-sm text-left">
            <div className="space-y-1">
              <Quote className="w-8 h-8 text-purple-300 dark:text-purple-800 rotate-180" />
              <p className="font-headline text-lg xl:text-xl font-bold text-foreground leading-snug">
                Stronger Together for a{" "}
                <span className="bg-gradient-to-r from-purple-700 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  Healthier Tomorrow
                </span>
              </p>
              <p className="text-xs font-semibold text-muted-foreground pt-1">
                — Aries PhysioCare
              </p>
            </div>
            {/* Dot Matrix Pattern */}
            <div className="grid grid-cols-4 gap-1.5 opacity-30 text-purple-600 shrink-0">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              ))}
            </div>
          </div>

        </div>

        {/* 2 Founder Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          
          {/* Card 1: Mr. Akshay Patel */}
          <div className="bg-white/90 dark:bg-card/90 backdrop-blur-xl rounded-[2.25rem] border border-purple-100/80 dark:border-purple-900/40 shadow-xl shadow-purple-950/5 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-purple-300/50">
            
            {/* Top Photo with Overlays */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-100 dark:bg-purple-950/40">
              <Image
                src="/images/team/akshay-patel.png"
                alt="Mr. Akshay Patel - Founder & Chief Executive Officer"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              {/* Quote overlay on top */}
              <div className="absolute top-5 left-5 right-5">
                <p className="text-white/95 text-xs sm:text-sm font-medium italic drop-shadow-sm max-w-xs">
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
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 tracking-wider uppercase">
                    Founder & Chief Executive Officer
                  </h4>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Visionary leader dedicated to standardizing home healthcare through technology and clinical rigor. Akshay drives the strategic growth, innovation, and global expansion of Aries PhysioCare, ensuring accessible and high-quality care for every home.
                </p>
              </div>

              {/* 3 Attribute Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40">
                <div className="text-center p-2 rounded-xl bg-purple-50/50 dark:bg-purple-950/20">
                  <Lightbulb className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Strategic Leadership</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-purple-50/50 dark:bg-purple-950/20">
                  <BarChart3 className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Technology Innovation</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-purple-50/50 dark:bg-purple-950/20">
                  <Globe className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Global Expansion</p>
                </div>
              </div>

              {/* LinkedIn Button */}
              <div className="pt-1">
                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/50 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

          {/* Card 2: Ms. Karishma Rathod */}
          <div className="bg-white/90 dark:bg-card/90 backdrop-blur-xl rounded-[2.25rem] border border-purple-100/80 dark:border-purple-900/40 shadow-xl shadow-purple-950/5 overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-2xl hover:border-purple-300/50">
            
            {/* Top Photo with Overlays */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-100 dark:bg-purple-950/40">
              <Image
                src="/images/team/karishma-rathod.png"
                alt="Ms. Karishma Rathod - Co-Founder & Chief Operating Officer"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              {/* Quote overlay on top */}
              <div className="absolute top-5 left-5 right-5">
                <p className="text-white/95 text-xs sm:text-sm font-medium italic drop-shadow-sm max-w-xs">
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
                  <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 tracking-wider uppercase">
                    Co-Founder & Chief Operating Officer
                  </h4>
                </div>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Strategic operations leader focused on building scalable healthcare ecosystems and ensuring operational excellence across global markets. Karishma brings a patient-centric approach, driving service innovation, team growth, and a seamless care experience for every individual.
                </p>
              </div>

              {/* 3 Attribute Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40">
                <div className="text-center p-2 rounded-xl bg-purple-50/50 dark:bg-purple-950/20">
                  <Settings className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Operations Excellence</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-purple-50/50 dark:bg-purple-950/20">
                  <Heart className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Patient-Centric Care</p>
                </div>
                <div className="text-center p-2 rounded-xl bg-purple-50/50 dark:bg-purple-950/20">
                  <TrendingUp className="w-4 h-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
                  <p className="text-[11px] font-semibold text-foreground/80 leading-tight">Sustainable Growth</p>
                </div>
              </div>

              {/* LinkedIn Button */}
              <div className="pt-1">
                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-full border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/50 font-semibold text-xs inline-flex items-center justify-center gap-2 transition-all"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>Connect on LinkedIn</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Scale & Trust Bar */}
        <div className="mt-14 max-w-4xl mx-auto py-4 px-6 rounded-2xl bg-white/70 dark:bg-card/70 backdrop-blur-md border border-purple-100 dark:border-purple-900/30 shadow-md">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-border/50">
            
            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">1,000+</p>
                <p className="text-[11px] text-muted-foreground">Happy Patients</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                <Star className="w-4 h-4 fill-purple-600 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">4.9/5</p>
                <p className="text-[11px] text-muted-foreground">Patient Satisfaction</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Trusted</p>
                <p className="text-[11px] text-muted-foreground">Healthcare Brand</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0 justify-center">
              <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Expanding</p>
                <p className="text-[11px] text-muted-foreground">Across India & Beyond</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}