'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Search, 
  LocateFixed, 
  Loader2, 
  CalendarCheck,
  Zap,
  Activity,
  Award,
  Clock,
  RotateCcw,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { 
  STANDARD_PRICING_TIERS, 
  detectTierFromLocation, 
  searchAllIndiaLocalities, 
  type PricingTier,
  type LocalityPricingRecord
} from '@/lib/pricing-packages';
import { cn } from '@/lib/utils';
import Pricing3DScene from './pricing-3d-scene';
import PricingPackageCard, { type PackageCardData } from './pricing-package-card';

interface PricingPackagesSectionProps {
  initialLocationName?: string;
  className?: string;
}

const POPULAR_LOCALITIES = [
  { label: 'Mumbai (South & Suburbs)', query: 'Mumbai' },
  { label: 'Bandra / Andheri', query: 'Bandra West, Andheri' },
  { label: 'Delhi NCR (South / Gurugram)', query: 'South Delhi, Gurugram' },
  { label: 'Bengaluru (Indiranagar / HSR)', query: 'Indiranagar Bengaluru' },
  { label: 'Hyderabad (Jubilee Hills / HITEC)', query: 'Jubilee Hills Hyderabad' },
  { label: 'Pune (Koregaon / Baner)', query: 'Koregaon Park Pune' },
  { label: 'Chennai (Anna Nagar / OMR)', query: 'Anna Nagar Chennai' },
];

export default function PricingPackagesSection({ 
  initialLocationName, 
  className 
}: PricingPackagesSectionProps) {
  const [activeTierKey, setActiveTierKey] = useState<string>(() => {
    return initialLocationName ? detectTierFromLocation(initialLocationName) : 'economy';
  });
  const [activeLocationLabel, setActiveLocationLabel] = useState<string>(
    initialLocationName || 'All-India Standard (Select your area for local rates)'
  );
  const [localitySearch, setLocalitySearch] = useState<string>('');
  const [selectedLocality, setSelectedLocality] = useState<LocalityPricingRecord | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [detectionSource, setDetectionSource] = useState<'default' | 'ip' | 'gps' | 'search'>('default');

  const currentTier: PricingTier = STANDARD_PRICING_TIERS[activeTierKey] || STANDARD_PRICING_TIERS.economy;
  const packages = currentTier.packages;

  // ── AUTO-DETECT USER LOCATION ON PAGE MOUNT ──
  useEffect(() => {
    if (initialLocationName) {
      const tier = detectTierFromLocation(initialLocationName);
      setActiveTierKey(tier);
      setActiveLocationLabel(initialLocationName);
      setDetectionSource('default');
      return;
    }

    try {
      const savedCity = localStorage.getItem('user_city');
      if (savedCity && savedCity.trim().length > 0) {
        const tier = detectTierFromLocation(savedCity);
        setActiveTierKey(tier);
        setActiveLocationLabel(savedCity);
        setDetectionSource('default');
        return;
      }
    } catch {}

    let isCancelled = false;
    const autoDetectByIP = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) return;

        const data = await res.json();
        if (isCancelled || !data) return;

        const city = data.city || '';
        const region = data.region || '';
        const postal = data.postal || '';

        if (city || region || postal) {
          const locString = `${postal} ${city} ${region}`.trim();
          const detectedTier = detectTierFromLocation(locString);
          const label = city ? `${city}${region ? `, ${region}` : ''}${postal ? ` (${postal})` : ''}` : locString;
          
          setActiveTierKey(detectedTier);
          setActiveLocationLabel(label);
          setDetectionSource('ip');
        }
      } catch {}
    };

    autoDetectByIP();

    return () => {
      isCancelled = true;
    };
  }, [initialLocationName]);

  // ── PRECISE GPS ONE-CLICK AUTO-DETECT ──
  const handleGPSDetect = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          );

          if (response.ok) {
            const data = await response.json();
            const address = data.address || {};
            const suburb = address.suburb || address.neighbourhood || address.residential || address.commercial || '';
            const city = address.city || address.town || address.state_district || address.county || '';
            const state = address.state || '';
            const postcode = address.postcode || '';

            const fullLocString = `${suburb} ${city} ${state} ${postcode}`.trim();
            const detectedTier = detectTierFromLocation(fullLocString);
            const displayLabel = suburb 
              ? `${suburb}, ${city || state}${postcode ? ` (${postcode})` : ''}`
              : (city ? `${city}, ${state}${postcode ? ` (${postcode})` : ''}` : fullLocString);

            setActiveTierKey(detectedTier);
            setActiveLocationLabel(displayLabel);
            setDetectionSource('gps');
            setSelectedLocality(null);
            setLocalitySearch('');

            try {
              if (city) localStorage.setItem('user_city', city);
            } catch {}
          }
        } catch {} finally {
          setIsDetectingLocation(false);
        }
      },
      () => {
        setIsDetectingLocation(false);
      },
      { timeout: 8000, maximumAge: 60000, enableHighAccuracy: true }
    );
  }, []);

  const searchResults = useMemo(() => {
    if (!localitySearch.trim() || localitySearch.trim().length < 2) return [];
    return searchAllIndiaLocalities(localitySearch, 8);
  }, [localitySearch]);

  const handleSelectLocality = (loc: LocalityPricingRecord) => {
    setSelectedLocality(loc);
    setActiveTierKey(loc.tierId);
    setActiveLocationLabel(`${loc.subArea}, ${loc.city} (${loc.pincodes[0] || ''})`);
    setDetectionSource('search');
    setLocalitySearch('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalitySearch(val);
    if (val.trim().length >= 3) {
      const detectedTier = detectTierFromLocation(val);
      setActiveTierKey(detectedTier);
      setActiveLocationLabel(val.trim());
      setDetectionSource('search');
    }
  };

  const handlePresetClick = (preset: { label: string; query: string }) => {
    const detectedTier = detectTierFromLocation(preset.query);
    setActiveTierKey(detectedTier);
    setActiveLocationLabel(preset.label);
    setSelectedLocality(null);
    setDetectionSource('search');
    setLocalitySearch('');
  };

  // ── 4 MULTI-DAY PACKAGES CONFIGURATION ──
  const packageCards: PackageCardData[] = [
    {
      key: 'days10',
      days: 10,
      title: '10 Days Recovery Plan',
      badge: '10 Days Plan',
      badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      rate: packages.days10.ratePerSession,
      total: packages.days10.totalPrice,
      savings: packages.days10.totalSavings,
      description: 'Ideal for acute muscle spasms, neck/back stiffness, minor sprains & initial mobility restoration.',
      features: [
        '10 In-Home Clinical Sessions',
        'Electrotherapy & Modalities Included',
        'Certified BPT/MPT Physiotherapist',
        'Daily Pain & Range-of-Motion Tracking',
      ],
      popular: false,
    },
    {
      key: 'days15',
      days: 15,
      title: '15 Days Rehabilitation Plan',
      badge: '15 Days Plan',
      badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      rate: packages.days15.ratePerSession,
      total: packages.days15.totalPrice,
      savings: packages.days15.totalSavings,
      description: 'Recommended for moderate joint stiffness, cervical spondylosis, frozen shoulder & sciatica pain.',
      features: [
        '15 In-Home Clinical Sessions',
        'Progressive Joint Mobilization & Manual Therapy',
        'All Electro & Ultrasound Rehab Gear Included',
        'Personalized Posture & Home Exercise Protocol',
      ],
      popular: false,
    },
    {
      key: 'days20',
      days: 20,
      title: '20 Days Intensive Rehab Plan',
      badge: '20 Days Plan',
      badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      rate: packages.days20.ratePerSession,
      total: packages.days20.totalPrice,
      savings: packages.days20.totalSavings,
      description: 'Designed for post-operative recovery, knee/hip replacement, fracture mobility & sports injuries.',
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
      badgeClass: 'bg-gradient-to-r from-amber-400 via-rose-500 to-violet-500 text-white border-0',
      rate: packages.days30.ratePerSession,
      total: packages.days30.totalPrice,
      savings: packages.days30.totalSavings,
      description: 'Comprehensive neurological recovery (Stroke, Parkinson\'s, Paralysis), geriatric mobility & chronic rebuild.',
      features: [
        '30 In-Home Clinical Sessions',
        'Senior Neuro / Ortho Specialist Continuity',
        'Complete Neuromuscular & Physical Rebuild Kit',
        'Clinical Lead Supervision & Family Progress Reports',
      ],
      popular: true,
    },
  ];

  return (
    <section id="pricing-packages" className={cn('py-20 md:py-32 relative overflow-hidden bg-[#04060d] text-white', className)}>
      
      {/* 1. 3D Motion Graphics Scene (Three.js WebGL Hologram Torus & Kinetic Value Nodes) */}
      <Pricing3DScene />

      {/* 2. Multi-layered Radiant Aurora Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 3. Futuristic Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-5 mb-12"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glassmorphic border border-violet-500/30 bg-violet-950/40 text-violet-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(124,58,237,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Home Care Pricing</span>
          </div>
          
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
            Aries PhysioCare <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-violet-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.3)]">
              Treatment Packages
            </span>
          </h2>
          
          <p className="text-slate-300/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            Hospital-grade home physiotherapy delivered by certified BPT/MPT specialists with advanced electrotherapy modalities. Transparent single visit rates and guaranteed decreasing per-day charges on all multi-day packages.
          </p>
        </motion.div>

        {/* ── LOCATION AUTO-DETECTOR & SEARCH BAR ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl mx-auto mb-10 space-y-3.5"
        >
          <div className="relative">
            <div className="relative flex items-center gap-2.5">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 absolute left-4 text-cyan-400 pointer-events-none" />
                <input
                  type="text"
                  value={localitySearch}
                  onChange={handleSearchChange}
                  placeholder="Search your Area, Locality, City or 6-Digit Pincode (e.g. Bandra, South Mumbai, Indiranagar, 400050)..."
                  className="w-full h-15 pl-12 pr-14 bg-slate-950/80 border border-white/15 focus:border-cyan-400/80 rounded-2xl text-sm sm:text-base text-white placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 shadow-2xl backdrop-blur-2xl transition-all"
                />
                {localitySearch && (
                  <button
                    onClick={() => {
                      setLocalitySearch('');
                      setSelectedLocality(null);
                    }}
                    className="absolute right-4 text-xs font-bold uppercase text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* One-Click GPS Auto-Detect Button */}
              <Button
                type="button"
                onClick={handleGPSDetect}
                disabled={isDetectingLocation}
                className="h-15 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 hover:brightness-110 border border-white/20 text-white font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 transition-all shadow-xl active:scale-95"
                title="Detect my location automatically via GPS"
              >
                {isDetectingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <LocateFixed className="w-4 h-4 text-cyan-300" />
                )}
                <span className="hidden sm:inline">Auto-Detect</span>
              </Button>
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {searchResults.length > 0 && !selectedLocality && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-slate-950/95 border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl z-50 max-h-72 overflow-y-auto divide-y divide-white/10">
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
                    <span className="text-xs font-black text-emerald-400 font-mono bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-500/30">
                      ₹{loc.basePrice} / day
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Popular Localities Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 shrink-0 flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Quick Select:
            </span>
            {POPULAR_LOCALITIES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-slate-950/70 hover:bg-white/15 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white transition-all shadow-sm"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── AUTO-DETECTED LOCATION & PER-DAY CHARGE HERO BANNER ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-4xl mx-auto mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 border border-white/15 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-cyan-500/10 via-violet-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-black text-cyan-300 uppercase tracking-widest">
                  {detectionSource === 'gps' 
                    ? 'GPS Verified Location:' 
                    : (detectionSource === 'ip' ? 'Auto-Detected Location:' : 'Active Location Rates:')}
                </span>
                <Badge className="bg-cyan-950/60 text-cyan-300 border-cyan-500/30 text-xs font-bold px-3 py-1 shadow-sm">
                  {activeLocationLabel}
                </Badge>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed max-w-lg">
                Includes verified BPT/MPT physiotherapist in-home visit, comprehensive physical examination, personalized rehabilitation roadmap, and hospital-grade electrotherapy gear (IFT/TENS/Ultrasound) at your home.
              </p>
            </div>

            {/* Per-Day Single Session Charge Box */}
            <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/15 shrink-0 text-center md:text-right w-full md:w-auto shadow-2xl">
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                Single Session (Per Day)
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-1 tracking-tight">
                ₹{currentTier.basePrice.toLocaleString('en-IN')}
                <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ day</span>
              </div>
              <div className="text-[10px] font-semibold text-slate-400 mt-1 flex items-center justify-center md:justify-end gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" /> No advance registration charges
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 4 MULTI-DAY RECOVERY PACKAGES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 max-w-7xl mx-auto mb-16">
          {packageCards.map((pkg, index) => (
            <PricingPackageCard
              key={pkg.key}
              pkg={pkg}
              activeLocationLabel={activeLocationLabel}
              index={index}
            />
          ))}
        </div>

        {/* ── CLINICAL ASSURANCES & TRANSPARENCY METRICS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12"
        >
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center gap-3 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Same Therapist Continuity</div>
              <div className="text-[11px] text-slate-400">1-on-1 dedicated care throughout plan</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center gap-3 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Unused Session Refund</div>
              <div className="text-[11px] text-slate-400">Zero lock-in penalties on early recovery</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 flex items-center gap-3 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">All Modalities Included</div>
              <div className="text-[11px] text-slate-400">IFT, TENS & Ultrasound carried to home</div>
            </div>
          </div>
        </motion.div>

        {/* ── BOTTOM CONSULTATION CALLOUT ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950/90 via-violet-950/40 to-slate-950/90 border border-violet-500/30 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <CalendarCheck className="w-4 h-4" />
              <span>Custom Rehabilitation Consultation</span>
            </div>
            <h4 className="font-headline text-xl sm:text-2xl font-black text-white">
              Need Help Choosing Your Recovery Plan?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md">
              Speak directly with our clinical physiotherapists for a free tele-consultation and personalized recovery assessment for your area.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto">
            <Button asChild variant="outline" className="h-13 px-6 border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-2xl">
              <a href="tel:+919136447006" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call +91 9136447006</span>
              </a>
            </Button>
            <Button asChild className="h-13 px-8 bg-gradient-to-r from-blue-600 via-violet-600 to-rose-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-violet-600/30">
              <Link href={`/book-appointment?location=${encodeURIComponent(activeLocationLabel)}`}>
                Book Home Assessment
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
