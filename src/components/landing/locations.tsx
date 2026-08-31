'use client';

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Globe, ChevronRight, Sparkles, ChevronLeft, Award, Crosshair } from "lucide-react";
import { locations } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

export default function Locations() {
  return (
    <section className="py-18 md:py-28 lg:py-32 relative overflow-hidden bg-[#02050e] text-white">
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
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14 space-y-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glassmorphic border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pan-India Clinical Network</span>
          </div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            Our Service <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
              Clinical Hubs
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Standardized clinical excellence and same-day home dispatch delivered across our specialized metropolitan rehabilitation hubs.
          </p>
        </motion.div>

        {/* Carousel Slider with Flanked Side Arrows */}
        <div className="relative px-2 sm:px-6 md:px-10 lg:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4">
              {locations.map((location, index) => (
                <CarouselItem key={location.id} className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4">
                  <div className="p-2 h-full">
                    <div className="h-full rounded-[28px] p-[1.5px] bg-gradient-to-b from-white/20 via-cyan-500/15 to-violet-600/25 shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/50 group overflow-hidden flex flex-col justify-between">
                      <div className="h-full rounded-[26px] bg-[#070c1a]/95 border border-white/10 overflow-hidden flex flex-col justify-between">
                        
                        {/* Image Header */}
                        <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/60">
                          <Image
                            src={location.mapImageUrl}
                            alt={`Landscape of ${location.city}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 420px"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.88] contrast-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070c1a] via-transparent to-transparent pointer-events-none" />

                          {/* Top Status */}
                          <div className="absolute top-3 left-3 z-20">
                            <span className="px-3 py-1 rounded-full bg-slate-950/85 border border-emerald-500/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-lg">
                              ● Active Hub
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <h3 className="font-headline text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                              {location.city}
                            </h3>
                            <p className="text-xs text-cyan-400/90 font-mono">
                              HUB ID: LOC-IN-0{index + 1}
                            </p>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                              <span className="truncate">{location.address || 'Citywide Home Visits'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>7:00 AM – 9:00 PM (Daily)</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Flanked Side Arrows */}
            <CarouselPrevious className="absolute -left-2 sm:-left-4 md:-left-6 lg:-left-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-white/20 bg-[#070c1a]/90 backdrop-blur-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-2xl text-white z-30 flex items-center justify-center">
              <ChevronLeft className="w-6 h-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute -right-2 sm:-right-4 md:-right-6 lg:-right-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border border-white/20 bg-[#070c1a]/90 backdrop-blur-xl hover:bg-cyan-500 hover:text-white hover:border-cyan-400 transition-all duration-300 shadow-2xl text-white z-30 flex items-center justify-center">
              <ChevronRight className="w-6 h-6" />
            </CarouselNext>
          </Carousel>
        </div>

      </div>
    </section>
  );
}