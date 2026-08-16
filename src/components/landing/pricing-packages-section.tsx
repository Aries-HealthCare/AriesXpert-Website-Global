'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  ArrowRight,
  Search,
  Check,
  CalendarCheck,
  Activity
} from 'lucide-react';
import { 
  STANDARD_PRICING_TIERS, 
  detectTierFromLocation, 
  searchAllIndiaLocalities, 
  ALL_INDIA_LOCALITIES_2026,
  type PricingTier,
  type LocalityPricingRecord
} from '@/lib/pricing-packages';
import { cn } from '@/lib/utils';

interface PricingPackagesSectionProps {
  initialLocationName?: string;
  className?: string;
}

const POPULAR_LOCATION_PRESETS = [
  { label: 'South Mumbai', query: 'South Mumbai' },
  { label: 'Bandra / Andheri', query: 'Bandra West' },
  { label: 'Delhi NCR', query: 'South Delhi' },
  { label: 'Gurugram', query: 'Golf Course Road Gurugram' },
  { label: 'Bengaluru', query: 'Indiranagar Bengaluru' },
  { label: 'Hyderabad', query: 'Jubilee Hills Hyderabad' },
  { label: 'Pune', query: 'Koregaon Park Pune' },
  { label: 'Chennai', query: 'Anna Nagar Chennai' },
  { label: 'Kolkata', query: 'Salt Lake Kolkata' },
  { label: 'Ahmedabad', query: 'SG Highway Ahmedabad' },
];

export default function PricingPackagesSection({ 
  initialLocationName, 
  className 
}: PricingPackagesSectionProps) {
  const initialTier = initialLocationName 
    ? detectTierFromLocation(initialLocationName) 
    : 'luxury';

  const [activeTierKey, setActiveTierKey] = useState<string>(initialTier);
  const [activeLocationLabel, setActiveLocationLabel] = useState<string>(
    initialLocationName || 'Mumbai (South & Western Suburbs)'
  );
  const [localitySearch, setLocalitySearch] = useState<string>('');
  const [selectedLocality, setSelectedLocality] = useState<LocalityPricingRecord | null>(null);

  const currentTier: PricingTier = STANDARD_PRICING_TIERS[activeTierKey] || STANDARD_PRICING_TIERS.standard;
  const packages = currentTier.packages;

  // Real-time search suggestions across all India 2026 dataset
  const searchResults = useMemo(() => {
    if (!localitySearch.trim() || localitySearch.trim().length < 2) return [];
    return searchAllIndiaLocalities(localitySearch, 8);
  }, [localitySearch]);

  const handleSelectLocality = (loc: LocalityPricingRecord) => {
    setSelectedLocality(loc);
    setActiveTierKey(loc.tierId);
    setActiveLocationLabel(`${loc.subArea}, ${loc.city} (${loc.pincodes[0] || ''})`);
    setLocalitySearch('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalitySearch(val);
    if (val.trim().length >= 3) {
      const detectedTier = detectTierFromLocation(val);
      setActiveTierKey(detectedTier);
      setActiveLocationLabel(val.trim());
    }
  };

  const handlePresetClick = (preset: { label: string; query: string }) => {
    const detectedTier = detectTierFromLocation(preset.query);
    setActiveTierKey(detectedTier);
    setActiveLocationLabel(preset.label);
    setSelectedLocality(null);
    setLocalitySearch('');
  };

  const packageCards = [
    {
      key: 'days10',
      days: 10,
      title: '10 Days Recovery Plan',
      badge: '10 Days',
      badgeBg: 'bg-orange-500',
      rate: packages.days10.ratePerSession,
      total: packages.days10.totalPrice,
      savings: packages.days10.totalSavings,
      description: 'Ideal for acute muscle strains, sprains, neck/back stiffness & initial pain relief.',
      features: [
        '10 In-Home Clinical Sessions',
        'Electrotherapy & Modalities Included',
        'Certified BPT/MPT Senior Therapist Continuity',
        'Daily Pain & Range-of-Motion Tracking',
      ],
      popular: false,
    },
    {
      key: 'days15',
      days: 15,
      title: '15 Days Rehabilitation Plan',
      badge: '15 Days',
      badgeBg: 'bg-blue-600',
      rate: packages.days15.ratePerSession,
      total: packages.days15.totalPrice,
      savings: packages.days15.totalSavings,
      description: 'Recommended for moderate joint stiffness, cervical spondylosis, frozen shoulder & sciatica.',
      features: [
        '15 In-Home Clinical Sessions',
        'Progressive Joint Mobilization & Manual Therapy',
        'All Electro & Ultrasound Rehab Gear Included',
        'Personalized Home Exercise & Posture Protocol',
      ],
      popular: false,
    },
    {
      key: 'days20',
      days: 20,
      title: '20 Days Intensive Rehab Plan',
      badge: '20 Days',
      badgeBg: 'bg-rose-600',
      rate: packages.days20.ratePerSession,
      total: packages.days20.totalPrice,
      savings: packages.days20.totalSavings,
      description: 'Designed for post-operative recovery, knee/hip replacement, fracture & sports ligament repairs.',
      features: [
        '20 In-Home Clinical Sessions',
        'Post-Surgical Orthopedic Care Protocol',
        'Dedicated Senior Therapist Continuity',
        'Weekly Clinical Lead Audit & Milestone Tracking',
      ],
      popular: false,
    },
    {
      key: 'days30',
      days: 30,
      title: '30 Days Complete Care Plan',
      badge: '30 Days · Best Value',
      badgeBg: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      rate: packages.days30.ratePerSession,
      total: packages.days30.totalPrice,
      savings: packages.days30.totalSavings,
      description: 'Comprehensive neurological recovery (Stroke, Parkinson\'s, Paralysis), geriatric mobility & chronic care.',
      features: [
        '30 In-Home Clinical Sessions',
        'Senior Neuro / Ortho Specialist Continuity',
        'Complete Neuromuscular & Physical Rebuild Kit',
        'Dedicated Care Lead Supervision & Family Reports',
      ],
      popular: true,
    },
  ];

  return (
    <section id="pricing-packages" className={cn('py-20 md:py-28 relative overflow-hidden bg-slate-950 text-white', className)}>
      {/* Background glow ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-cyan-500/10 via-primary/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-black uppercase tracking-widest backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Clinical Pricing & Packages
          </div>
          
          <h2 className="font-headline text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Aries PhysioCare <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Treatment Packages</span>
          </h2>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Hospital-grade home physiotherapy delivered by certified BPT/MPT specialists with advanced electrotherapy modalities. Guaranteed decreasing per-day rates on all multi-day packages.
          </p>
        </div>

        {/* ── LOCATION SELECTOR & SEARCH ── */}
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          <div className="relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-cyan-400 pointer-events-none" />
              <input
                type="text"
                value={localitySearch}
                onChange={handleSearchChange}
                placeholder="Search your Area, Locality, City or 6-Digit Pincode (e.g. Bandra, South Mumbai, Indiranagar, 400050)..."
                className="w-full h-14 pl-12 pr-4 bg-slate-900/90 border-2 border-cyan-500/30 focus:border-cyan-400 rounded-2xl text-sm md:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 shadow-2xl backdrop-blur-xl transition-all"
              />
              {localitySearch && (
                <button
                  onClick={() => {
                    setLocalitySearch('');
                    setSelectedLocality(null);
                  }}
                  className="absolute right-4 text-xs font-bold uppercase text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/10"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {searchResults.length > 0 && !selectedLocality && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl z-50 max-h-72 overflow-y-auto divide-y divide-white/5">
                {searchResults.map((loc, idx) => (
                  <button
                    key={`${loc.city}-${loc.subArea}-${idx}`}
                    onClick={() => handleSelectLocality(loc)}
                    className="w-full p-3 text-left hover:bg-white/10 rounded-xl flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300">
                          {loc.subArea}
                        </div>
                        <div className="text-xs text-slate-400">
                          {loc.city}, {loc.state} · <span className="font-mono text-cyan-400">{loc.pincodes.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      ₹{loc.basePrice} / day
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Popular Location Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 shrink-0 flex items-center gap-1 font-semibold">
              <MapPin className="w-3 h-3 text-cyan-400" /> Popular:
            </span>
            {POPULAR_LOCATION_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── ACTIVE LOCATION & PER-DAY CHARGE BANNER ── */}
        <div className="max-w-4xl mx-auto mb-10 p-5 md:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Showing Pricing For:</span>
                <span className="text-white font-black">{activeLocationLabel}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                Includes verified BPT/MPT physiotherapist visit, comprehensive diagnosis, manual therapy, and hospital-grade electrotherapy gear at your home.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 shrink-0 text-center sm:text-right w-full sm:w-auto">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Single Session Visit
              </div>
              <div className="text-2xl md:text-3xl font-black font-mono text-emerald-400 mt-0.5">
                ₹{currentTier.basePrice.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ day</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 MULTI-DAY RECOVERY PACKAGES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-16">
          {packageCards.map((pkg) => (
            <Card
              key={pkg.key}
              className={cn(
                'relative flex flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 group hover:-translate-y-2',
                pkg.popular
                  ? 'bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border-purple-500/50 shadow-2xl shadow-purple-950/50 ring-1 ring-purple-500/30'
                  : 'bg-slate-900/80 hover:bg-slate-900 border-white/10 hover:border-cyan-500/30 shadow-xl'
              )}
            >
              {/* Top Banner for Best Value */}
              {pkg.popular && (
                <div className="w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 py-1.5 text-center text-[11px] font-black uppercase tracking-widest text-white shadow-md">
                  ★ Most Popular · Maximum Recovery
                </div>
              )}

              <CardContent className="p-6 md:p-7 flex flex-col justify-between h-full space-y-6">
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge className={cn('text-[11px] font-black uppercase tracking-wider text-white border-0 px-2.5 py-1', pkg.badgeBg)}>
                      {pkg.badge}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400 font-bold bg-emerald-950/30">
                      Save ₹{pkg.savings.toLocaleString('en-IN')}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-headline text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Rate / Day</span>
                    <div className="text-right">
                      <span className="text-2xl font-black font-mono text-white">
                        ₹{pkg.rate.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-400 font-sans ml-1">/ day</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                    <span className="text-slate-400">Total Package ({pkg.days} Days)</span>
                    <span className="text-base font-black text-emerald-400 font-mono">
                      ₹{pkg.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2.5 text-xs text-slate-300">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
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
                  <Link href={`/book-appointment?location=${encodeURIComponent(activeLocationLabel)}&package=${pkg.days}`}>
                    Book {pkg.days}-Day Plan
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── BOTTOM CONSULTATION CALLOUT ── */}
        <div className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <CalendarCheck className="w-4 h-4" />
              Custom Rehabilitation Consultation
            </div>
            <h4 className="text-xl font-black text-white">
              Need Help Deciding on Your Recovery Roadmap?
            </h4>
            <p className="text-xs text-slate-400 max-w-md">
              Speak directly with our senior clinical lead for a free tele-consultation and personalized treatment plan tailored to your condition.
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
              <Link href={`/book-appointment?location=${encodeURIComponent(activeLocationLabel)}`}>
                Book Home Assessment
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
