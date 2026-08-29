'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Star,
  Flame,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PackageCardData {
  key: string;
  days: number;
  title: string;
  badge: string;
  badgeClass: string;
  rate: number;
  total: number;
  savings: number;
  description: string;
  features: string[];
  popular: boolean;
  accentColor?: string;
}

interface PricingPackageCardProps {
  pkg: PackageCardData;
  activeLocationLabel: string;
  index: number;
}

export default function PricingPackageCard({ 
  pkg, 
  activeLocationLabel, 
  index 
}: PricingPackageCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: pkg.popular ? 0.35 : 0.2,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className={cn(
        "relative perspective-1000 flex flex-col h-full",
        pkg.popular ? "lg:-translate-y-3 z-20" : "z-10"
      )}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className={cn(
          "relative flex flex-col justify-between h-full rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300 group",
          pkg.popular
            ? "p-[2px] bg-gradient-to-b from-amber-400 via-rose-500 to-violet-600 shadow-[0_20px_60px_rgba(225,29,72,0.25)] ring-1 ring-amber-400/40"
            : "p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-white/10 hover:from-primary/40 hover:to-accent/40 shadow-xl"
        )}
      >
        {/* Dynamic Glass Glare Sheen */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-30"
          style={{
            background: `radial-gradient(circle 220px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
          }}
        />

        {/* Ambient Halo Glow */}
        {pkg.popular && (
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-600/30 via-violet-600/30 to-amber-400/30 rounded-3xl blur-xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* Inner Card Body */}
        <div className="relative flex flex-col justify-between h-full rounded-[23px] bg-slate-950/90 border border-white/10 overflow-hidden">
          
          {/* Top Banner for Best Value / Most Popular */}
          {pkg.popular ? (
            <div className="w-full bg-gradient-to-r from-amber-500 via-rose-600 to-violet-600 py-2 px-4 text-center text-[11px] font-black uppercase tracking-widest text-white shadow-lg flex items-center justify-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
              <span>Most Popular · Maximum Recovery</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          ) : (
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          )}

          <div className="p-6 md:p-7 flex flex-col justify-between flex-1 space-y-6">
            
            {/* Header info */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <Badge 
                  variant="outline" 
                  className={cn(
                    'text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-xl shadow-sm', 
                    pkg.badgeClass
                  )}
                >
                  {pkg.badge}
                </Badge>
                
                <div className="relative overflow-hidden rounded-xl">
                  <Badge 
                    variant="outline" 
                    className="text-[10px] sm:text-[11px] border-emerald-500/40 text-emerald-300 font-extrabold bg-emerald-950/60 px-2.5 py-1 flex items-center gap-1 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  >
                    <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    Save ₹{pkg.savings.toLocaleString('en-IN')}
                  </Badge>
                  {/* Shimmer sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                </div>
              </div>

              <div>
                <h3 className="font-headline text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {pkg.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-[13px] mt-1.5 leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            </div>

            {/* Pricing Box with 3D inset depth */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5 shadow-inner backdrop-blur-md">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold text-slate-400">Daily Session Rate</span>
                <div className="text-right">
                  <span className={cn(
                    "text-2xl sm:text-3xl font-black font-mono tracking-tight",
                    pkg.popular ? "text-amber-300" : "text-white"
                  )}>
                    ₹{pkg.rate.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ day</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-xs">
                <span className="text-slate-400 font-medium">Total ({pkg.days} Days Package)</span>
                <span className="text-base font-black text-emerald-400 font-mono tracking-tight">
                  ₹{pkg.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Features Checklist */}
            <div className="space-y-3 text-xs text-slate-300">
              {pkg.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className={cn(
                    "w-4 h-4 shrink-0 mt-0.5",
                    pkg.popular ? "text-amber-400" : "text-cyan-400"
                  )} />
                  <span className="leading-snug font-medium text-slate-200">{feat}</span>
                </div>
              ))}
            </div>

            {/* Action Booking Button */}
            <div className="pt-2">
              <Button
                asChild
                className={cn(
                  'w-full h-13 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl group-hover:scale-[1.02] active:scale-95',
                  pkg.popular
                    ? 'bg-gradient-to-r from-amber-500 via-rose-600 to-violet-600 hover:brightness-110 text-white shadow-rose-600/30'
                    : 'bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-white border border-white/20 hover:border-transparent'
                )}
              >
                <Link 
                  href={`/book-appointment?location=${encodeURIComponent(activeLocationLabel)}&package=${pkg.days}`}
                  className="flex items-center justify-center gap-2"
                >
                  <span>Book {pkg.days}-Day Plan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </Button>
            </div>

          </div>

          {/* Corner Tech Reticles */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/30 pointer-events-none" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/30 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/30 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/30 pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}
