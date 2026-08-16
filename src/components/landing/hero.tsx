'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRequestCallback } from '@/components/request-callback-provider';
import BookAppointmentButton from "../book-appointment-button";
import type { WebsiteStats } from "@/app/api/stats/route";

const heroImages = PlaceHolderImages.filter(p => p.id.startsWith('hero-'));

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M+`;
  if (n >= 1_000) return `${Math.floor(n / 1_000)}k+`;
  return `${n}+`;
}

export default function Hero() {
  const { openModal } = useRequestCallback();
  const [stats, setStats] = useState<WebsiteStats | null>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setStats(data); })
      .catch(() => {}); // Non-blocking: hero renders fine without stats
  }, []);

  return (
    <section className="relative w-full h-[85vh] md:h-[95vh] min-h-[700px] overflow-hidden bg-black">
      {/* Background Slider */}
      <Carousel 
        className="w-full h-full" 
        opts={{ loop: true }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={image.id} className="h-full relative px-0">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  sizes="100vw"
                  className="object-cover object-center transition-transform duration-[3000ms] scale-110 animate-pulse-slow"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                {/* Modern Multi-layered Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Main Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl text-left">
            {/* Professional Badges */}
            <div className="flex flex-wrap gap-3 mb-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-100 fill-mode-both">
              <div className="glassmorphic py-1.5 px-4 rounded-full border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-white">Home Healthcare Services</span>
              </div>
              <div className="glassmorphic py-1.5 px-4 rounded-full border border-white/20 flex items-center gap-2">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary-foreground">Appointment Requests Online</span>
              </div>
            </div>

            {/* Impressive Typography */}
            <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tight leading-[0.95] animate-in slide-in-from-left-12 duration-1000 delay-200 fill-mode-both drop-shadow-2xl">
              Advanced Recovery <br />
              <span className="premium-gradient-text">At Your Home.</span>
            </h1>
            
            <p className="mt-8 text-lg sm:text-xl md:text-2xl text-white/80 font-medium max-w-2xl leading-relaxed animate-in slide-in-from-left-8 duration-1000 delay-400 fill-mode-both drop-shadow">
              Request home physiotherapy and professional nursing services from the Aries clinical network.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-5 animate-in slide-in-from-left-4 duration-1000 delay-600 fill-mode-both">
              <BookAppointmentButton size="lg" className="h-16 px-10 text-base font-black rounded-2xl premium-gradient text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-none group">
                Book Home Visit
                <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
              </BookAppointmentButton>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-10 text-base font-bold rounded-2xl bg-white/5 text-white border-white/20 hover:bg-white hover:text-black hover:border-white backdrop-blur-xl transition-all duration-300"
                onClick={() => openModal()}
              >
                Request Consultation
              </Button>
            </div>

            {/* Key Trust Stats */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-8 md:gap-16 animate-in fade-in duration-1000 delay-800 fill-mode-both">
              <div>
                <p className="text-3xl md:text-4xl font-black text-white">
                  {stats ? formatCount(stats.therapistCount) : '—'}
                </p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50">Specialists</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-white">
                  {stats ? formatCount(stats.patientCount) : '—'}
                </p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50">Patients Served</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-black text-white">Same-Day</p>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50">Service Availability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
