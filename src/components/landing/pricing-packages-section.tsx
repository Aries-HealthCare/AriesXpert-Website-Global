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
  HelpCircle,
  TrendingDown,
  Stethoscope
} from 'lucide-react';
import { 
  STANDARD_PRICING_TIERS, 
  detectTierFromLocation, 
  searchAllIndiaLocalities, 
  type PricingTier,
  type LocalityPricingRecord
} from '@/lib/pricing-packages';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';
const Pricing3DScene = dynamic(() => import('./pricing-3d-scene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 pointer-events-none" />
});
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
      badgeClass: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
      rate: packages.days10.ratePerSession,
      total: packages.days10.totalPrice,
      savings: packages.days10.totalSavings,
      description: 'Ideal for acute muscle spasms, neck/back stiffness, minor sprains & initial mobility restoration.',
      features: [
        '10 In-Home Clinical Sessions',
        'Electrotherapy & Modalities Included (IFT/TENS/US)',
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
      badgeClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
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
      badgeClass: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
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
    <section id="pricing-packages" className={cn('py-20 md:py-32 relative overflow-hidden bg-[#030611] text-white', className)}>
      
      {/* ── 1. 3D Motion Graphics Scene (Three.js WebGL Hologram Torus & Kinetic Value Nodes) ── */}
      <Pricing3DScene />

      {/* ── 2. Cinematic Volumetric Lighting & Glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.22),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[550px] h-[550px] bg-blue-600/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-rose-600/12 rounded-full blur-[150px] pointer-events-none" />

      {/* ── 3. Cybernetic Precision Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── 4. Main Section Container (Full-Bleed Widescreen Fit without Side Emptiness) ── */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* ── Section Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-6 mb-14"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glassmorphic border border-violet-500/40 bg-violet-950/40 text-violet-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(124,58,237,0.25)]">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Transparent Home Care Pricing</span>
          </div>
          
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            Aries PhysioCare <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
              Treatment Packages
            </span>
          </h2>
          
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Hospital-grade home physiotherapy delivered by certified BPT/MPT specialists with advanced electrotherapy modalities. Transparent single visit rates and guaranteed decreasing per-day charges on all multi-day packages.
          </p>
        </motion.div>

        {/* ── LOCATION AUTO-DETECTOR & SEARCH BAR ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-4xl mx-auto mb-12 space-y-4"
        >
          <div className="relative">
            <div className="relative flex items-center gap-3">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 absolute left-5 text-cyan-400 pointer-events-none" />
                <input
                  type="text"
                  value={localitySearch}
                  onChange={handleSearchChange}
                  placeholder="Search your Area, Locality, City or 6-Digit Pincode (e.g. Bandra, Saket, Indiranagar, 400050)..."
                  className="w-full h-15 pl-14 pr-4 rounded-2xl bg-black/60 border border-white/20 text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-xl shadow-2xl transition-all"
                />
                {localitySearch && (
                  <button
                    onClick={() => setLocalitySearch('')}
                    className="absolute right-4 text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-white/10 rounded-lg"
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
                className="h-15 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg flex items-center gap-2 flex-shrink-0 transition-all"
              >
                {isDetectingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <LocateFixed className="w-4 h-4 text-cyan-300" />
                )}
                <span className="hidden sm:inline">Auto-Detect</span>
              </Button>
            </div>

            {/* Instant Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl bg-[#0a0f1d] border border-cyan-500/40 backdrop-blur-2xl shadow-2xl max-h-72 overflow-y-auto p-2 space-y-1">
                {searchResults.map((result) => (
                  <button
                    key={`${result.subArea}-${result.city}`}
                    onClick={() => handleSelectLocality(result)}
                    className="w-full p-3 rounded-xl hover:bg-white/10 text-left flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-cyan-300">
                          {result.subArea}, {result.city}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Pincodes: {result.pincodes.join(', ')} · Tier: {result.tierId.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-400">
                      ₹{STANDARD_PRICING_TIERS[result.tierId]?.basePrice || 1200} / visit
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Popular Metro Quick Select Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Quick Select:
            </span>
            {POPULAR_LOCALITIES.map((loc) => (
              <button
                key={loc.label}
                onClick={() => handlePresetClick(loc)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border",
                  activeLocationLabel.toLowerCase().includes(loc.query.toLowerCase())
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── ACTIVE LOCATION & BENCHMARK SINGLE VISIT RATE CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-14 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-violet-950/40 border border-white/15 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-left flex-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Active Location Rates:
              </span>
              <span className="text-xs font-black text-white px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10">
                {activeLocationLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Includes verified BPT/MPT physiotherapist in-home visit, comprehensive physical examination, personalized rehabilitation roadmap, and hospital-grade electrotherapy gear (IFT/TENS/Ultrasound) at your home.
            </p>
          </div>

          <div className="flex-shrink-0 p-5 rounded-2xl bg-black/60 border border-cyan-500/40 text-center shadow-xl min-w-[220px]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Single Session (Per Day)
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight mt-1">
              ₹{currentTier.basePrice.toLocaleString('en-IN')}
              <span className="text-xs font-semibold text-slate-400">/day</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>No advance registration charges</span>
            </div>
          </div>
        </motion.div>

        {/* ── 4-COLUMN RESPONSIVE MULTI-DAY PACKAGE CARDS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {packageCards.map((pkg, idx) => (
            <PricingPackageCard
              key={pkg.key}
              pkg={pkg}
              activeLocationLabel={activeLocationLabel}
              index={idx}
            />
          ))}
        </div>

        {/* ── HOSPITAL-GRADE MODALITY ASSURANCE STRIP ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <Zap className="w-6 h-6 text-amber-400 mx-auto" />
            <div className="text-xs font-bold text-white">Full Modalities Included</div>
            <div className="text-[11px] text-slate-400">IFT, TENS, Ultrasound & Laser gear</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <Stethoscope className="w-6 h-6 text-cyan-400 mx-auto" />
            <div className="text-xs font-bold text-white">Certified Specialists</div>
            <div className="text-[11px] text-slate-400">Council-registered BPT/MPT clinicians</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <Activity className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-white">Milestone Audits</div>
            <div className="text-[11px] text-slate-400">Weekly clinical recovery tracking</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
            <ShieldCheck className="w-6 h-6 text-violet-400 mx-auto" />
            <div className="text-xs font-bold text-white">100% Transparent</div>
            <div className="text-[11px] text-slate-400">Zero hidden fees or advance locks</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
