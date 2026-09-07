'use client';

import Image from "next/image";
import Link from "next/link";
import { 
  Users, 
  ArrowRight, 
  Play, 
  Heart, 
  ShieldCheck, 
  BarChart3, 
  Home, 
  Activity,
  HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative w-full pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-gradient-to-b from-purple-50/50 via-background to-background dark:from-purple-950/20 dark:via-background dark:to-background">
      {/* Background ambient decorative glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 relative">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-wider uppercase shadow-xs">
              <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>About Aries PhysioCare</span>
            </div>

            {/* Main Headline with Cursive Accent */}
            <div className="relative">
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-foreground tracking-tight leading-[1.15]">
                Redefining Home Healthcare with{" "}
                <span className="bg-gradient-to-r from-amber-600 via-purple-600 to-indigo-600 dark:from-amber-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Precision, Compassion and Technology
                </span>
              </h1>

              {/* Handwritten floating text */}
              <div className="hidden sm:block absolute -top-8 right-2 lg:-right-4 font-script text-purple-600 dark:text-purple-400 text-3xl md:text-4xl -rotate-6 select-none pointer-events-none">
                Movement Heals Lives ♡
              </div>
            </div>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl font-normal">
              Aries PhysioCare, a premium home healthcare brand under Aries HealthCare International Pvt Ltd, is dedicated to delivering outcome-driven care through a team of expert professionals and scalable, technology-driven healthcare systems.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button 
                size="lg" 
                asChild
                className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-full px-7 shadow-lg shadow-purple-600/25 transition-all hover:scale-[1.02]"
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
                className="rounded-full px-6 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-purple-200/60 dark:border-purple-800/40 text-foreground hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all hover:scale-[1.02]"
              >
                <Link href="/services">
                  <Play className="w-4 h-4 mr-2 text-purple-600 fill-purple-600" />
                  Watch Our Story
                </Link>
              </Button>
            </div>

            {/* 4 Feature Items */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90">Care at Home</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90">Trusted Professionals</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90">Evidence Based Care</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-700 dark:text-purple-300">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-foreground/90">Better Quality of Life</span>
              </div>
            </div>

          </div>

          {/* Right Visual Column with Floating Cards */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-purple-900/10 border border-white/60 dark:border-white/10">
                <Image
                  src="/images/about/hero-therapist-rehab.jpg"
                  alt="Aries PhysioCare professional therapist assisting patient"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  priority
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Benefit Cards on Right */}
              <div className="absolute -right-2 sm:-right-4 top-4 sm:top-8 flex flex-col gap-2.5 z-20">
                
                {/* Recover Faster */}
                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg border border-purple-100/80 dark:border-purple-900/40 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Recover Faster</h4>
                    <p className="text-[10px] text-muted-foreground">Regain mobility and strength</p>
                  </div>
                </div>

                {/* Live Healthier */}
                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg border border-purple-100/80 dark:border-purple-900/40 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Live Healthier</h4>
                    <p className="text-[10px] text-muted-foreground">Move better, feel better</p>
                  </div>
                </div>

                {/* Stay Independent */}
                <div className="bg-white/95 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl shadow-lg border border-purple-100/80 dark:border-purple-900/40 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Stay Independent</h4>
                    <p className="text-[10px] text-muted-foreground">Care in the comfort of home</p>
                  </div>
                </div>

              </div>

              {/* Floating Cursive Note bottom right */}
              <div className="absolute -bottom-6 right-2 sm:right-6 font-script text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl rotate-2 select-none pointer-events-none">
                The Healing Touch ♡
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}