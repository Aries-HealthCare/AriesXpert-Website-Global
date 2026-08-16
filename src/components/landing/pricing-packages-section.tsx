'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  TrendingDown, 
  MapPin, 
  Phone, 
  ArrowRight,
  Zap,
  Award
} from 'lucide-react';
import { STANDARD_PRICING_TIERS, getTierForLocation, type PricingTier } from '@/lib/pricing-packages';
import { cn } from '@/lib/utils';

interface PricingPackagesSectionProps {
  initialLocationName?: string;
  className?: string;
}

export default function PricingPackagesSection({ 
  initialLocationName, 
  className 
}: PricingPackagesSectionProps) {
  const initialTier = initialLocationName 
    ? getTierForLocation(initialLocationName).id 
    : 'standard';

  const [selectedTierKey, setSelectedTierKey] = useState<string>(initialTier);
  const [localitySearch, setLocalitySearch] = useState<string>('');

  const currentTier: PricingTier = STANDARD_PRICING_TIERS[selectedTierKey] || STANDARD_PRICING_TIERS.standard;
  const packages = currentTier.packages;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalitySearch(val);
    if (val.trim().length >= 3) {
      const detected = getTierForLocation(val);
      setSelectedTierKey(detected.id);
    }
  };

  const packageCards = [
    {
      key: 'days10',
      days: 10,
      title: '10 Days Recovery',
      badge: '10 Days',
      badgeBg: 'bg-orange-500',
      rate: packages.days10.ratePerSession,
      total: packages.days10.totalPrice,
      savings: packages.days10.totalSavings,
      description: 'Ideal for acute strain, minor sprains & initial pain relief mobility.',
      popular: false,
    },
    {
      key: 'days15',
      days: 15,
      title: '15 Days Rehabilitation',
      badge: '15 Days',
      badgeBg: 'bg-blue-600',
      rate: packages.days15.ratePerSession,
      total: packages.days15.totalPrice,
      savings: packages.days15.totalSavings,
      description: 'Recommended for moderate joint stiffness, cervical spondylosis & frozen shoulder.',
      popular: false,
    },
    {
      key: 'days20',
      days: 20,
      title: '20 Days Intensive Rehab',
      badge: '20 Days',
      badgeBg: 'bg-rose-600',
      rate: packages.days20.ratePerSession,
      total: packages.days20.totalPrice,
      savings: packages.days20.totalSavings,
      description: 'Designed for post-operative recovery, knee replacement & sports ligament repairs.',
      popular: false,
    },
    {
      key: 'days30',
      days: 30,
      title: '30 Days Complete Care',
      badge: '30 Days · Best Value',
      badgeBg: 'bg-purple-600',
      rate: packages.days30.ratePerSession,
      total: packages.days30.totalPrice,
      savings: packages.days30.totalSavings,
      description: 'Comprehensive neurological rehab (Stroke, Parkinson\'s) and complete physical rebuild.',
      popular: true,
    },
  ];

  return (
    <section id="pricing-packages" className={cn('py-20 md:py-28 relative overflow-hidden bg-slate-950 text-white', className)}>
      {/* Background glow ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Clinical Pricing & Packages
          </div>
          
          <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Aries PhysioCare <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Recovery Packages</span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Hospital-grade physiotherapy at your home with transparent decreasing-rate multi-day plans. 
            No hidden charges. Verified BPT/MPT physiotherapists with advanced modalities.
          </p>
        </div>

        {/* ── INTERACTIVE TIER SWITCHER TABS ── */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
            {[
              {
                id: 'economy',
                name: 'Economy Tier',
                price: '₹1,000/-',
                sub: 'Suburban / Outskirts',
                activeStyle: 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30',
              },
              {
                id: 'standard',
                name: 'Standard Tier',
                price: '₹1,200/-',
                sub: 'Main City Residential',
                activeStyle: 'bg-blue-600 text-white shadow-lg shadow-blue-500/30',
              },
              {
                id: 'premium',
                name: 'Premium Tier',
                price: '₹1,500/-',
                sub: 'High-Demand & Specialized',
                activeStyle: 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30',
              },
              {
                id: 'luxury',
                name: 'Luxury Tier',
                price: '₹2,000/-',
                sub: 'South Mumbai & Bandra',
                activeStyle: 'bg-rose-600 text-white shadow-lg shadow-rose-500/30',
              },
            ].map((tier) => {
              const isSelected = selectedTierKey === tier.id;
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTierKey(tier.id)}
                  type="button"
                  className={cn(
                    'p-3.5 rounded-xl text-left transition-all duration-300 relative',
                    isSelected
                      ? tier.activeStyle
                      : 'hover:bg-white/5 text-slate-300'
                  )}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate">{tier.name}</span>
                    <span className="text-xs font-black font-mono">{tier.price}</span>
                  </div>
                  <p className={cn('text-[10px] mt-0.5 truncate', isSelected ? 'opacity-90 font-medium' : 'text-slate-500')}>
                    {tier.sub}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Tier description banner */}
          <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong className="text-white">{currentTier.name} [{currentTier.badge}]</strong>: {currentTier.description}
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-300/80 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20 shrink-0">
              Locality: {currentTier.recommendedFor}
            </span>
          </div>
        </div>

        {/* ── 4 PACKAGES GRID (10, 15, 20, 30 DAYS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packageCards.map((pkg) => (
            <Card
              key={pkg.key}
              className={cn(
                'relative flex flex-col justify-between rounded-3xl border transition-all duration-500 overflow-hidden backdrop-blur-xl',
                pkg.popular
                  ? 'bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950 border-purple-500/50 shadow-2xl shadow-purple-500/20 ring-1 ring-purple-500/50 scale-[1.02]'
                  : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/30 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-500/10'
              )}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-black uppercase tracking-widest text-center py-1.5 shadow-md">
                  ★ Most Popular Recovery Plan ★
                </div>
              )}

              <CardContent className={cn('p-6 flex flex-col justify-between h-full space-y-6', pkg.popular && 'pt-8')}>
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={cn('text-xs font-black px-2.5 py-0.5 text-white', pkg.badgeBg)}>
                      {pkg.badge}
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      <TrendingDown className="w-3 h-3" />
                      Save ₹{pkg.savings.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-headline">
                    {pkg.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">
                    {pkg.description}
                  </p>
                </div>

                {/* Pricing Display */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400 font-medium">Rate / Session</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white font-mono">
                        ₹{pkg.rate.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-400"> /sess</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-slate-400">Total Package</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      ₹{pkg.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{pkg.days} In-Home Certified Sessions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>All Electro & Rehab Gear Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Dedicated Senior Therapist Continuity</span>
                  </div>
                </div>

                {/* Booking Button */}
                <Button
                  asChild
                  className={cn(
                    'w-full h-12 rounded-xl font-black text-xs uppercase tracking-wider transition-all duration-300',
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30'
                  )}
                >
                  <Link href={`/book-appointment?tier=${currentTier.id}&package=${pkg.days}`}>
                    Book {pkg.days}-Day Plan
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── AREA PRICING CALCULATOR / CALLOUT ── */}
        <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              Check Pricing for Your Area
            </div>
            <h4 className="text-xl font-black text-white">
              Need Help Choosing the Right Package?
            </h4>
            <p className="text-xs text-slate-400 max-w-md">
              Speak directly with our senior clinical lead for a free tele-consultation and exact quote for your locality.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button asChild variant="outline" className="h-12 px-6 border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl">
              <a href="tel:+919136447006" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                Call +91 9136447006
              </a>
            </Button>
            <Button asChild className="h-12 px-8 bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-cyan-500/20">
              <Link href="/book-appointment">
                Book Initial Home Visit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
