'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Search, 
  Check, 
  LocateFixed, 
  Loader2, 
  CalendarCheck,
  Zap,
  Activity,
  HeartPulse
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
import { fadeUp, cardReveal, viewportConfig } from '@/hooks/use-scroll-animation';

interface PricingPackagesSectionProps {
  initialLocationName?: string;
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badgeText?: React.ReactNode;
  serviceSlug?: string;
  conditionSlug?: string;
}

const POPULAR_LOCALITIES = [
  { label: 'Mumbai (South & Suburbs)', query: 'Mumbai' },
  { label: 'Bandra / Andheri', query: 'Bandra West, Andheri' },
  { label: 'Delhi NCR (South / Gurugram)', query: 'South Delhi, Gurugram' },
  { label: 'Bengaluru (Indiranagar / HSR)', query: 'Indiranagar Bengaluru' },
  { label: 'Hyderabad (Jubilee Hills / HITEC)', query: 'Jubilee Hills Hyderabad' },
  { label: 'Pune (Koregaon / Baner)', query: 'Koregaon Park Pune' },
  { label: 'Chennai (Anna Nagar / OMR)', query: 'Anna Nagar Chennai' },
  { label: 'Kolkata (Salt Lake / Alipore)', query: 'Salt Lake Kolkata' },
  { label: 'Ahmedabad (SG Highway)', query: 'SG Highway Ahmedabad' },
];

export default function PricingPackagesSection({ 
  initialLocationName, 
  className,
  title,
  subtitle,
  badgeText,
  serviceSlug,
  conditionSlug,
}: PricingPackagesSectionProps) {
  // Default to Economy tier (₹1,000/session) if location is not detected
  const [activeTierKey, setActiveTierKey] = useState<string>(() => {
    return initialLocationName ? detectTierFromLocation(initialLocationName) : 'economy';
  });
  const [activeLocationLabel, setActiveLocationLabel] = useState<string>(
    initialLocationName || 'All-India Standard (Select your area for local rates)'
  );
  const [localitySearch, setLocalitySearch] = useState<string>('');
  const [selectedLocality, setSelectedLocality] = useState<LocalityPricingRecord | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [detectionSource, setDetectionSource] = useState<'default' | 'page' | 'saved' | 'ip' | 'gps' | 'search'>(
    initialLocationName ? 'page' : 'default'
  );

  const currentTier: PricingTier = STANDARD_PRICING_TIERS[activeTierKey] || STANDARD_PRICING_TIERS.economy;
  const packages = currentTier.packages;

  // ── AUTO-DETECT USER LOCATION ON PAGE MOUNT ──
  useEffect(() => {
    // 1. If an initial location was passed via props (e.g. on landing pages), keep it locked
    if (initialLocationName) {
      const tier = detectTierFromLocation(initialLocationName);
      setActiveTierKey(tier);
      setActiveLocationLabel(initialLocationName);
      setDetectionSource('page');
      return;
    }

    // 2. Check localStorage if user previously selected/detected location
    let hadSaved = false;
    try {
      const savedCity = localStorage.getItem('user_city');
      if (savedCity && savedCity.trim().length > 0) {
        hadSaved = true;
        const tier = detectTierFromLocation(savedCity);
        setActiveTierKey(tier);
        setActiveLocationLabel(savedCity);
        setDetectionSource('saved');
      }
    } catch {
      // Ignore localStorage read errors
    }

    // 3. Resilient Multi-Stage Auto-Detection for Home Page viewers
    let isCancelled = false;
    const autoDetectViewerLocation = async () => {
      try {
        // Stage A: Internal Fast Next.js Edge/Server Route
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('/api/detect-location', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (isCancelled) return;

          if (data && data.city) {
            const locString = `${data.postal || ''} ${data.city} ${data.region || ''}`.trim();
            const detectedTier = detectTierFromLocation(locString);
            const label = `${data.city}${data.region ? `, ${data.region}` : ''}`;
            
            setActiveTierKey(detectedTier);
            setActiveLocationLabel(label);
            setDetectionSource('ip');

            try {
              localStorage.setItem('user_city', label);
            } catch {}
            return;
          }
        }
      } catch {
        // Fall through to Client-side backup
      }

      // Stage B: Direct Client-Side Fallback (ipwho.is)
      try {
        if (isCancelled) return;
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 3000);

        const res2 = await fetch('https://ipwho.is/', { signal: controller2.signal });
        clearTimeout(timeoutId2);

        if (res2.ok) {
          const data2 = await res2.json();
          if (isCancelled) return;

          if (data2 && data2.city) {
            const locString = `${data2.postal || ''} ${data2.city} ${data2.region || ''}`.trim();
            const detectedTier = detectTierFromLocation(locString);
            const label = `${data2.city}${data2.region ? `, ${data2.region}` : ''}`;

            setActiveTierKey(detectedTier);
            setActiveLocationLabel(label);
            setDetectionSource('ip');

            try {
              localStorage.setItem('user_city', label);
            } catch {}
            return;
          }
        }
      } catch {
        // Fall through to keep saved or clean base default
      }
    };

    // If no saved location, auto-detect; if saved exists, verify in background
    if (!hadSaved) {
      autoDetectViewerLocation();
    }

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
        } catch {
          // Keep current selection on network failure
        } finally {
          setIsDetectingLocation(false);
        }
      },
      () => {
        setIsDetectingLocation(false);
      },
      { timeout: 8000, maximumAge: 60000, enableHighAccuracy: true }
    );
  }, []);

  // ── REAL-TIME SEARCH SUGGESTIONS ACROSS 2026 REGISTRY ──
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
  const packageCards = [
    {
      key: 'days10',
      days: 10,
      title: '10 Days Recovery Plan',
      badge: '10 Days',
      badgeClass: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
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
      badge: '15 Days',
      badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
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
      badge: '20 Days',
      badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
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
      badgeClass: 'bg-gradient-to-r from-primary via-rose-500 to-pink-500 text-white border-0',
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
    <section id="pricing-packages" className={cn('py-20 md:py-28 relative overflow-hidden bg-background text-foreground', className)}>
      {/* Background glow ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1820px] h-96 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            {badgeText || 'Transparent Home Care Pricing'}
          </div>
          
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            {title ? (
              title
            ) : (
              <>Aries PhysioCare <span className="premium-gradient-text">Treatment Packages</span></>
            )}
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            {subtitle || 'Hospital-grade home physiotherapy delivered by certified BPT/MPT specialists with advanced electrotherapy modalities. Transparent single visit rates and guaranteed decreasing per-day charges on all multi-day packages.'}
          </p>
        </motion.div>

        {/* ── LOCATION AUTO-DETECTOR & SEARCH BAR ── */}
        <div className="max-w-3xl mx-auto mb-10 space-y-3">
          <div className="relative">
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 absolute left-4 text-primary pointer-events-none" />
                <input
                  type="text"
                  value={localitySearch}
                  onChange={handleSearchChange}
                  placeholder="Search your Area, Locality, City or 6-Digit Pincode (e.g. Bandra, South Mumbai, Indiranagar, 400050)..."
                  className="w-full h-14 pl-12 pr-4 bg-card/80 border-2 border-border/80 focus:border-primary rounded-2xl text-sm md:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-4 focus:ring-primary/20 shadow-xl backdrop-blur-xl transition-all"
                />
                {localitySearch && (
                  <button
                    onClick={() => {
                      setLocalitySearch('');
                      setSelectedLocality(null);
                    }}
                    className="absolute right-4 text-xs font-bold uppercase text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-lg bg-secondary/80"
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
                className="h-14 px-4 sm:px-5 rounded-2xl bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 text-primary font-bold text-xs shrink-0 flex items-center gap-2 transition-all shadow-md"
                title="Detect my location automatically via GPS"
              >
                {isDetectingLocation ? (
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                ) : (
                  <LocateFixed className="w-4 h-4 text-primary" />
                )}
                <span className="hidden sm:inline">Auto-Detect</span>
              </Button>
            </div>

            {/* Instant Search Suggestions Dropdown */}
            {searchResults.length > 0 && !selectedLocality && (
              <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-card/95 border border-border rounded-2xl shadow-2xl backdrop-blur-2xl z-50 max-h-72 overflow-y-auto divide-y divide-border/40">
                {searchResults.map((loc, idx) => (
                  <button
                    key={`${loc.city}-${loc.subArea}-${idx}`}
                    onClick={() => handleSelectLocality(loc)}
                    className="w-full p-3 text-left hover:bg-primary/5 rounded-xl flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-foreground group-hover:text-primary">
                          {loc.subArea}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {loc.city}, {loc.state} · <span className="font-mono text-primary">{loc.pincodes.join(', ')}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-500 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      ₹{loc.basePrice} / day
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Popular Localities Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-muted-foreground shrink-0 flex items-center gap-1 font-semibold">
              <MapPin className="w-3 h-3 text-primary" /> Quick Select:
            </span>
            {POPULAR_LOCALITIES.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-card hover:bg-primary/10 border border-border/80 hover:border-primary/40 text-muted-foreground hover:text-foreground transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── AUTO-DETECTED LOCATION & PER-DAY CHARGE HERO BANNER ── */}
        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto mb-12 p-6 md:p-7 rounded-3xl bg-card/60 border border-primary/20 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {detectionSource === 'gps' 
                    ? 'GPS Verified Location:' 
                    : (detectionSource === 'ip' 
                      ? 'Auto-Detected For Your Area:' 
                      : (detectionSource === 'page'
                        ? 'Rates for Landing Page Area:'
                        : (detectionSource === 'saved'
                          ? 'Saved Selected Area:'
                          : 'Active Location Rates:')))}
                </span>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-bold font-sans">
                  {activeLocationLabel}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                Includes verified BPT/MPT physiotherapist in-home visit, comprehensive physical examination, personalized rehabilitation roadmap, and hospital-grade electrotherapy gear (IFT/TENS/Ultrasound) at your home.
              </p>
            </div>

            {/* Per-Day Single Session Charge Box */}
            <div className="p-4 md:p-5 rounded-2xl bg-background/80 border border-primary/20 shrink-0 text-center md:text-right w-full md:w-auto shadow-xl">
              <div className="text-[11px] font-black uppercase tracking-wider text-muted-foreground">
                Single Session (Per Day)
              </div>
              <div className="text-3xl md:text-4xl font-black font-mono text-emerald-500 mt-0.5">
                ₹{currentTier.basePrice.toLocaleString('en-IN')}
                <span className="text-xs text-muted-foreground font-sans font-normal ml-1">/ day</span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-1">
                No advance registration charges
              </div>
            </div>
          </div>
        </div>

        {/* ── 4 MULTI-DAY RECOVERY PACKAGES ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mx-auto mb-16">
          {packageCards.map((pkg, i) => (
            <motion.div
              key={pkg.key}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={cardReveal}
              custom={i}
            >
            <Card
              className={cn(
                'relative flex flex-col justify-between overflow-hidden rounded-3xl border hover:shadow-2xl hover:-translate-y-1 transition-shadow duration-300 h-full',
                pkg.popular
                  ? 'bg-card border-primary shadow-2xl shadow-primary/10 ring-2 ring-primary/30'
                  : 'bg-card/70 hover:bg-card border-border/80 hover:border-primary/40 shadow-xl'
              )}
            >
              {/* Top Banner for Best Value */}
              {pkg.popular && (
                <div className="w-full bg-gradient-to-r from-primary via-rose-500 to-pink-500 py-1.5 text-center text-[11px] font-black uppercase tracking-widest text-white shadow-md">
                  ★ Most Popular · Maximum Recovery
                </div>
              )}

              <CardContent className="p-6 md:p-7 flex flex-col justify-between h-full space-y-6">
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={cn('text-[11px] font-black uppercase tracking-wider px-2.5 py-1', pkg.badgeClass)}>
                      {pkg.badge}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 font-bold bg-emerald-500/10">
                      Save ₹{pkg.savings.toLocaleString('en-IN')}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-headline text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {pkg.title}
                    </h3>
                    <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                {/* Pricing Box */}
                <div className="p-4 rounded-2xl bg-secondary/40 border border-border/50 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-muted-foreground">Rate / Day</span>
                    <div className="text-right">
                      <span className="text-2xl font-black font-mono text-foreground">
                        ₹{pkg.rate.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-muted-foreground font-sans ml-1">/ day</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                    <span className="text-muted-foreground">Total ({pkg.days} Days)</span>
                    <span className="text-base font-black text-emerald-500 font-mono">
                      ₹{pkg.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-2.5 text-xs text-foreground/80">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
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
                      ? 'bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 hover:to-rose-500 text-white shadow-lg shadow-primary/25'
                      : 'bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary'
                  )}
                >
                  <Link href={`/book-appointment?location=${encodeURIComponent(activeLocationLabel)}&package=${pkg.days}${serviceSlug ? `&service=${encodeURIComponent(serviceSlug)}` : ''}${conditionSlug ? `&condition=${encodeURIComponent(conditionSlug)}` : ''}`}>
                    Book {pkg.days}-Day Plan
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* ── BOTTOM CONSULTATION CALLOUT ── */}
        <motion.div
          className="max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-card/60 border border-border shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeUp}
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <CalendarCheck className="w-4 h-4" />
              Custom Rehabilitation Consultation
            </div>
            <h4 className="font-headline text-xl font-black text-foreground">
              Need Help Choosing Your Recovery Plan?
            </h4>
            <p className="text-xs text-muted-foreground max-w-md">
              Speak directly with our clinical physiotherapists for a free tele-consultation and personalized recovery assessment for your area.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button asChild variant="outline" className="h-12 px-6 border-border hover:bg-secondary text-foreground font-bold text-xs uppercase tracking-wider rounded-xl">
              <a href="tel:+919136447006" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                Call +91 9136447006
              </a>
            </Button>
            <Button asChild className="h-12 px-8 bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-primary/20">
              <Link href={`/book-appointment?location=${encodeURIComponent(activeLocationLabel)}${serviceSlug ? `&service=${encodeURIComponent(serviceSlug)}` : ''}${conditionSlug ? `&condition=${encodeURIComponent(conditionSlug)}` : ''}`}>
                Book Home Assessment
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
