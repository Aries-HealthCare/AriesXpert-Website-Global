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
  Activity,
  TrendingDown,
  Clock,
  CalendarCheck
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
  accentGradient?: string;
  borderAccent?: string;
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
  // 3D Tilt specifically for the inner pricing rate block
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const priceBoxRef = useRef<HTMLDivElement>(null);

  const handlePriceBoxMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!priceBoxRef.current) return;
    const rect = priceBoxRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: pkg.popular ? 0.4 : 0.25,
    });
  };

  const handlePriceBoxMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col h-full",
        pkg.popular ? "lg:-translate-y-3 z-20" : "z-10"
      )}
    >
      {/* ── Stable Luxury Glass Card Container ── */}
      <div
        className={cn(
          "relative flex flex-col justify-between h-full rounded-[30px] overflow-hidden backdrop-blur-2xl transition-all duration-300 group shadow-2xl",
          pkg.popular
            ? "p-[2px] bg-gradient-to-b from-amber-400 via-rose-500 to-violet-600 shadow-[0_25px_80px_rgba(225,29,72,0.35)] ring-1 ring-amber-400/50"
            : "p-[1px] bg-gradient-to-b from-white/20 via-white/10 to-white/5 hover:border-cyan-400/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.18)]"
        )}
      >
        {/* Ambient Halo for Popular Card */}
        {pkg.popular && (
          <div className="absolute -inset-3 bg-gradient-to-r from-rose-600/35 via-violet-600/35 to-amber-400/35 rounded-[34px] blur-2xl -z-10 opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* ── Inner Card Surface ── */}
        <div className="relative flex flex-col justify-between h-full rounded-[28px] bg-[#070c1a]/95 border border-white/10 overflow-hidden">
          
          {/* Top Banner for Best Value / Most Popular */}
          {pkg.popular ? (
            <div className="w-full bg-gradient-to-r from-amber-500 via-rose-600 to-violet-600 py-2.5 px-4 text-center text-xs font-black uppercase tracking-widest text-white shadow-lg flex items-center justify-center gap-2">
              <Star className="w-4 h-4 fill-amber-300 text-amber-300 animate-pulse" />
              <span>Most Popular · Maximum Recovery</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          ) : (
            <div className="h-2 w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          )}

          <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-6">
            
            {/* Header Badges & Plan Title */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <Badge 
                  variant="outline" 
                  className={cn(
                    'text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-sm border', 
                    pkg.badgeClass
                  )}
                >
                  {pkg.badge}
                </Badge>
                
                <div className="relative overflow-hidden rounded-xl">
                  <Badge 
                    variant="outline" 
                    className="text-xs border-emerald-500/40 text-emerald-300 font-black bg-emerald-950/70 px-3 py-1.5 flex items-center gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                  >
                    <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    Save ₹{pkg.savings.toLocaleString('en-IN')}
                  </Badge>
                  {/* Shimmer sweep effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                </div>
              </div>

              <div>
                <h3 className="font-headline text-xl sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  {pkg.title}
                </h3>
                <p className="text-slate-300/85 text-xs sm:text-sm mt-2 leading-relaxed font-light">
                  {pkg.description}
                </p>
              </div>
            </div>

            {/* ── 3D Interactive Rate & Price Box ── */}
            <div
              ref={priceBoxRef}
              onMouseMove={handlePriceBoxMouseMove}
              onMouseLeave={handlePriceBoxMouseLeave}
              style={{
                transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
              }}
              className={cn(
                "relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden cursor-default",
                pkg.popular
                  ? "bg-gradient-to-br from-rose-950/50 via-slate-900/90 to-violet-950/60 border-rose-500/40 shadow-inner"
                  : "bg-white/[0.04] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.07]"
              )}
            >
              {/* Dynamic Glare Sheen */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 z-10"
                style={{
                  background: `radial-gradient(circle 200px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glarePosition.opacity}), transparent 80%)`,
                }}
              />

              <div className="relative z-20 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Effective Session Rate
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-400">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Best Per-Day Value</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ₹{pkg.rate.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-400">
                    / session
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Package Investment:</span>
                  <span className="font-black text-white text-sm">
                    ₹{pkg.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Key Inclusions & Clinical Deliverables ── */}
            <div className="space-y-3 pt-1">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                Package Deliverables:
              </div>
              <ul className="space-y-2.5">
                {pkg.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-300 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Direct Booking Button CTA ── */}
            <div className="pt-3">
              <Button
                asChild
                className={cn(
                  "w-full h-14 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group-hover:scale-[1.02]",
                  pkg.popular
                    ? "bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 text-white hover:brightness-110 shadow-[0_0_30px_rgba(225,29,72,0.4)]"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(37,99,235,0.3)]"
                )}
              >
                <Link href={`/book-appointment?package=${pkg.key}&locality=${encodeURIComponent(activeLocationLabel)}`}>
                  <span>Book {pkg.days} Days Plan</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <p className="text-center text-[10px] text-slate-400 mt-2.5 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero advance registration fee · Pay after 1st session</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
