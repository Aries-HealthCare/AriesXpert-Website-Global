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
  CheckCircle2,
  HelpCircle,
  TrendingDown,
  Stethoscope,
  Radio,
  Crosshair,
  FileCheck
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
      } catch {
        // Fallback silently to standard tier
      }
    };

    autoDetectByIP();
    return () => {
      isCancelled = true;
    };
  }, [initialLocationName]);

  // ── HIGH ACCURACY GPS AUTO-DETECT TRIGGER ──
  const handleGPSDetect = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            const addr = data.address || {};
            const suburb = addr.suburb || addr.neighbourhood || addr.residential || '';
            const city = addr.city || addr.town || addr.state_district || addr.county || '';
            const state = addr.state || '';
            const postcode = addr.postcode || '';

            const combinedQuery = `${suburb} ${city} ${state} ${postcode}`.trim();
            const detectedTier = detectTierFromLocation(combinedQuery);
            const displayLabel = suburb 
              ? `${suburb}, ${city}${postcode ? ` - ${postcode}` : ''}`
              : `${city || state}${postcode ? ` - ${postcode}` : ''}`;

            setActiveTierKey(detectedTier);
            setActiveLocationLabel(displayLabel || 'Your Current GPS Location');
            setSelectedLocality(null);
            setDetectionSource('gps');
            setLocalitySearch('');
          }
        } catch {
          // GPS Geocode error fallback
        } finally {
          setIsDetectingLocation(false);
        }
      },
      () => {
        setIsDetectingLocation(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, []);

  // ── LOCALITY SEARCH AUTOCOMPLETE ──
  const searchResults = useMemo(() => {
    if (!localitySearch || localitySearch.trim().length < 2) return [];
    return searchAllIndiaLocalities(localitySearch, 6);
  }, [localitySearch]);

  const handleSelectSearchResult = (loc: LocalityPricingRecord) => {
    setSelectedLocality(loc);
    setActiveTierKey(loc.tierId || 'economy');
    setActiveLocationLabel(`${loc.subArea || loc.city}, ${loc.city} (${loc.state})`);
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

  // ── 4 MULTI-DAY MEDICAL PROTOCOLS CONFIGURATION ──
  const packageCards: PackageCardData[] = [
    {
      key: 'days10',
      days: 10,
      protocolCode: 'CLIN-PROT: 10-ACUTE',
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
      protocolCode: 'CLIN-PROT: 15-REHAB',
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
      protocolCode: 'CLIN-PROT: 20-POSTOP',
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
      protocolCode: 'CLIN-PROT: 30-NEURO',
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
    <section id="pricing-packages" className={cn('py-18 md:py-28 lg:py-32 relative overflow-hidden bg-[#02050e] text-white', className)}>
      
      {/* ── 1. 3D Motion Graphics Scene (Three.js WebGL Hologram Torus & Kinetic Value Nodes) ── */}
      <Pricing3DScene />

      {/* ── 2. Cinematic Volumetric Lighting & Glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.2),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[650px] h-[650px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ── 3. Medical Precision Telemetry Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.15) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── 4. Main Section Container (Medical HealthCare Grade Fluid Widescreen Geometry) ── */}
      <div className="w-full max-w-[1780px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* ── Section Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-10 space-y-4 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full glassmorphic border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(6,182,212,0.25)]">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Clinical Protocols & Transparent Pricing</span>
          </div>

          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] text-white">
            Hospital-Grade Care. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(56,189,248,0.35)]">
              Zero Hidden Charges.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-light">
            Evidence-based rehabilitation delivered to your home. Every visit includes dedicated certified specialists, complete portable electrotherapy gear, and progressive recovery tracking.
          </p>
        </motion.div>

        {/* ── 5. Medical Telemetry Location Radar & Auto-Detect Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <div className="rounded-[26px] p-[1.5px] bg-gradient-to-r from-blue-600/40 via-cyan-500/40 to-violet-600/40 shadow-2xl backdrop-blur-2xl">
            <div className="rounded-[24px] bg-[#070c1a]/95 p-4 sm:p-6 border border-white/10 space-y-4">
              
              {/* Active Detected City / Locality Status HUD */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Active Pricing Area:</span>
                  <span className="font-black text-white bg-white/[0.08] px-3 py-1 rounded-full border border-white/10">
                    {activeLocationLabel}
                  </span>
                  {detectionSource === 'gps' && (
                    <Badge variant="outline" className="text-[10px] border-emerald-500/50 text-emerald-300 bg-emerald-950/40">
                      GPS Locked
                    </Badge>
                  )}
                  {detectionSource === 'ip' && (
                    <Badge variant="outline" className="text-[10px] border-blue-500/50 text-blue-300 bg-blue-950/40">
                      Auto-Detected
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-cyan-300 font-mono">
                  <Crosshair className="w-3.5 h-3.5" />
                  <span>TIER: {(currentTier.id || activeTierKey || 'economy').toUpperCase()}</span>
                </div>
              </div>

              {/* Search Box & GPS Button Row */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={localitySearch}
                    onChange={handleSearchChange}
                    placeholder="Search your city, locality, or pincode (e.g. Bandra, Indiranagar, 400050)..."
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                  />
                  {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#090e1e] border border-white/15 shadow-2xl p-2 z-50 max-h-60 overflow-y-auto space-y-1">
                      {searchResults.map((loc, lIdx) => (
                        <button
                          key={lIdx}
                          onClick={() => handleSelectSearchResult(loc)}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-300 flex items-center justify-between transition-colors"
                        >
                          <span>{loc.subArea || loc.city}, {loc.city}</span>
                          <span className="text-[10px] text-slate-400">{loc.state}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleGPSDetect}
                  disabled={isDetectingLocation}
                  variant="outline"
                  className="h-12 px-5 rounded-xl border-white/20 bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-bold flex items-center gap-2 shrink-0 transition-all"
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span>Scanning GPS...</span>
                    </>
                  ) : (
                    <>
                      <LocateFixed className="w-4 h-4 text-cyan-400" />
                      <span>Detect My GPS</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Preset City Badges */}
              <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar text-xs">
                <span className="text-slate-400 text-[11px] font-bold mr-1 shrink-0">Popular:</span>
                {POPULAR_LOCALITIES.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePresetClick(p)}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/5 text-[11px] font-medium shrink-0 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </motion.div>

        {/* ── 6. Single Session Benchmark Rate Banner ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto mb-14"
        >
          <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3.5 text-left">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                  Single In-Home Clinical Session
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Complete Assessment + 1-on-1 Treatment + All Portable Modalities Included
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="text-[10px] font-bold uppercase text-slate-400">Pay-As-You-Go</div>
                <div className="text-2xl font-black text-white">
                  ₹{(currentTier.basePrice || 1000).toLocaleString('en-IN')}
                </div>
              </div>
              <Button asChild className="h-11 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                <Link href={`/book-appointment?locality=${encodeURIComponent(activeLocationLabel)}`}>
                  Book Single Visit
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* ── 7. 4 Multi-Day Medical Protocol Cards Grid (Fluid Widescreen 4-Column Layout) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
          {packageCards.map((pkg, index) => (
            <PricingPackageCard
              key={pkg.key}
              pkg={pkg}
              activeLocationLabel={activeLocationLabel}
              index={index}
            />
          ))}
        </div>

        {/* ── 8. Bottom Clinical Trust & Guarantee Seal ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 text-center"
        >
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
            <div className="text-xs font-bold text-white">Council Verified BPT/MPT</div>
            <div className="text-[11px] text-slate-400">100% verified clinical credentials</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <Zap className="w-6 h-6 text-amber-400 mx-auto" />
            <div className="text-xs font-bold text-white">Full Treatment Gear Brought</div>
            <div className="text-[11px] text-slate-400">IFT, TENS & Ultrasound modalities</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <Clock className="w-6 h-6 text-cyan-400 mx-auto" />
            <div className="text-xs font-bold text-white">Same-Day Home Visits</div>
            <div className="text-[11px] text-slate-400">Rapid local dispatch across your area</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
            <Award className="w-6 h-6 text-violet-400 mx-auto" />
            <div className="text-xs font-bold text-white">Zero Registration Fee</div>
            <div className="text-[11px] text-slate-400">Pay only after your first session</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
