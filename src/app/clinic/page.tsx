'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building2,
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Clock,
  Navigation,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Search,
  Activity,
  Layers,
  Award,
  Zap,
  CalendarCheck
} from 'lucide-react';
import { ARIES_CLINICS_DIRECTORY, type ClinicBranch } from '@/lib/clinics-data';
import BookAppointmentButton from '@/components/book-appointment-button';
import { getOrganizationSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import { cn } from '@/lib/utils';

const CITIES = ['All Cities', 'Mumbai', 'Delhi', 'Bengaluru'];

export default function ClinicsPage() {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClinics = useMemo(() => {
    return ARIES_CLINICS_DIRECTORY.filter((clinic) => {
      if (selectedCity !== 'All Cities') {
        if (!clinic.city.toLowerCase().includes(selectedCity.toLowerCase())) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          clinic.name.toLowerCase().includes(q) ||
          clinic.address.toLowerCase().includes(q) ||
          clinic.subArea.toLowerCase().includes(q) ||
          clinic.pincode.includes(q) ||
          clinic.specialties.some((s) => s.toLowerCase().includes(q));
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCity, searchQuery]);

  const flagshipClinic = ARIES_CLINICS_DIRECTORY.find((c) => c.isFlagship) || ARIES_CLINICS_DIRECTORY[0];

  const jsonLd = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Our Clinics', url: '/clinic' },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* ── HERO SECTION ─────────────────────────────────────────── */}
        <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-primary/15 via-background to-background">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.25),transparent_70%)] pointer-events-none" />
          <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-muted-foreground text-xs mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-semibold">Clinics & Wellness Centers</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">
                <Building2 className="w-4 h-4" />
                State-of-the-Art Clinical Centers
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12]">
                Expert Physiotherapy & <br />
                <span className="premium-gradient-text">Integrated Wellness Centers</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Step into our hospital-grade rehabilitation facilities equipped with advanced Class IV Laser, High-Intensity IFT, Spinal Decompression, and certified BPT/MPT clinical specialists.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <BookAppointmentButton size="lg" className="h-14 px-8 text-base font-black bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white rounded-2xl shadow-xl shadow-primary/25">
                  Book In-Clinic Assessment
                </BookAppointmentButton>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-bold rounded-2xl border-border hover:bg-secondary/60">
                  <a href="tel:+919136447006" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" /> Call +91 9136447006
                  </a>
                </Button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-3xl mx-auto">
                {[
                  { label: 'Google Rating', value: '4.9 ★ (280+ Reviews)' },
                  { label: 'Open Hours', value: '8:00 AM – 9:30 PM (365 Days)' },
                  { label: 'Advanced Modalities', value: 'Laser, IFT, CPM & Traction' },
                  { label: 'Clinical Staff', value: '100% BPT/MPT Certified' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-card/60 border border-border/80 backdrop-blur-md text-center">
                    <div className="text-xs text-muted-foreground font-medium">{item.label}</div>
                    <div className="text-sm font-black text-foreground mt-0.5">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── GOOGLE RESEARCHED FLAGSHIP SHOWCASE ───────────────────── */}
        <section className="py-12 md:py-16 bg-card/30 border-y border-border/60 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-stretch gap-8 rounded-3xl p-6 md:p-10 bg-gradient-to-br from-card via-card/95 to-primary/5 border-2 border-primary/30 shadow-2xl backdrop-blur-2xl">
                {/* Left Visual Gallery */}
                <div className="lg:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                    <Image
                      src={flagshipClinic.imageUrl}
                      alt={flagshipClinic.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Live Open Status Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open Now · 8:00 AM - 9:30 PM
                    </div>

                    {/* Google Rating Chip */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-xs font-black text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9 (285+ Google Reviews)
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">Flagship Center</span>
                      <h3 className="font-headline text-xl font-bold leading-tight">{flagshipClinic.subArea}, Mumbai</h3>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="grid grid-cols-4 gap-3">
                    {flagshipClinic.galleryImages.map((img, gIdx) => (
                      <div key={gIdx} className="relative aspect-video rounded-xl overflow-hidden border border-border/80 shadow-md">
                        <Image src={img} alt="Clinic Room" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Details Column */}
                <div className="lg:w-1/2 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-primary text-white font-black text-[11px] uppercase tracking-wider px-3 py-1">
                        ★ Google Verified Listing
                      </Badge>
                      <Badge variant="outline" className="text-[11px] font-bold border-accent/40 text-accent">
                        Integrated Wellness Hub
                      </Badge>
                    </div>

                    <h2 className="font-headline text-2xl md:text-3xl font-black text-foreground leading-snug">
                      {flagshipClinic.name}
                    </h2>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {flagshipClinic.description}
                    </p>
                  </div>

                  {/* Location & Timings Details */}
                  <div className="space-y-3 p-4 rounded-2xl bg-secondary/40 border border-border/60 text-xs space-y-2">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground">Address: </span>
                        <span className="text-muted-foreground">{flagshipClinic.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <span className="font-bold text-foreground">Timings: </span>
                        <span className="text-muted-foreground">{flagshipClinic.workingHours} ({flagshipClinic.daysOpen})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="font-bold text-foreground">Consultation Fee: </span>
                        <span className="text-emerald-500 font-bold font-mono">{flagshipClinic.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Equipment / Modalities Badges */}
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-primary" /> Key In-House Equipment & Modalities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {flagshipClinic.equipment.slice(0, 6).map((eq, eIdx) => (
                        <Badge key={eIdx} variant="secondary" className="text-[11px] px-2.5 py-1 bg-card border border-border font-medium text-foreground">
                          {eq}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Button
                      asChild
                      className="h-12 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-primary/20"
                    >
                      <a href={flagshipClinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Navigate on Google Maps
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-xl border-border hover:bg-secondary text-foreground font-bold text-xs uppercase tracking-wider"
                    >
                      <a href={`tel:${flagshipClinic.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-500" />
                        Call Center: {flagshipClinic.phone}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ALL CLINICS BROWSER & FILTER ─────────────────────────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">
                Explore All <span className="premium-gradient-text">Aries PhysioCare Centers</span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Locate our certified physiotherapy centers and clinics across major Indian cities for comprehensive physical therapy, electro-modalities, and post-surgery rehabilitation.
              </p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto mb-10">
              {/* City Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-none">
                {CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={cn(
                      'px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap',
                      selectedCity === city
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary'
                    )}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Locality Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search clinic, area, pincode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 bg-card border border-border rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* Clinics Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredClinics.map((clinic) => (
                <Card
                  key={clinic.id}
                  className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card/70 hover:bg-card hover:border-primary/40 transition-all duration-500 hover:-translate-y-1.5 shadow-xl backdrop-blur-xl"
                >
                  <div>
                    {/* Card Header Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-secondary/30">
                      <Image
                        src={clinic.imageUrl}
                        alt={clinic.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {clinic.badge && (
                          <Badge className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                            {clinic.badge}
                          </Badge>
                        )}
                      </div>

                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-500/40 text-[11px] font-black text-amber-400">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {clinic.googleRating} ({clinic.reviewCount})
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-xs font-bold text-accent flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {clinic.subArea}, {clinic.city}
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="font-headline text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                          {clinic.name}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                          {clinic.description}
                        </p>
                      </div>

                      {/* Info lines */}
                      <div className="space-y-2 text-xs border-t border-border/40 pt-3">
                        <div className="flex items-start gap-2 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{clinic.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{clinic.workingHours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span>{clinic.consultationFee}</span>
                        </div>
                      </div>

                      {/* Specialties preview */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {clinic.specialties.slice(0, 3).map((spec, sIdx) => (
                          <Badge key={sIdx} variant="secondary" className="text-[10px] px-2 py-0.5 font-medium">
                            {spec}
                          </Badge>
                        ))}
                        {clinic.specialties.length > 3 && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0.5">
                            +{clinic.specialties.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-6 pt-0 space-y-2">
                    <Button
                      asChild
                      className="w-full h-11 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-xs uppercase tracking-wider border border-primary/20 hover:border-primary transition-all"
                    >
                      <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                        <Navigation className="w-3.5 h-3.5" /> View on Google Maps
                      </a>
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 h-10 rounded-xl text-xs font-bold border-border hover:bg-secondary"
                      >
                        <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-emerald-500" /> Call
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="flex-1 h-10 rounded-xl text-xs font-bold border-border hover:bg-secondary text-emerald-500"
                      >
                        <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(`Hello Aries PhysioCare, I would like to book an appointment at ${clinic.name}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredClinics.length === 0 && (
              <div className="text-center py-16 space-y-3">
                <Building2 className="w-10 h-10 mx-auto text-muted-foreground opacity-50" />
                <p className="text-muted-foreground text-sm">No clinics found matching your search.</p>
                <Button variant="outline" onClick={() => { setSelectedCity('All Cities'); setSearchQuery(''); }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* ── CLINIC VS HOME CARE BENEFIT STRIP ─────────────────────── */}
        <section className="py-16 md:py-20 bg-secondary/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-primary text-xs font-black uppercase tracking-widest">
                  <Layers className="w-3.5 h-3.5" /> Comprehensive Care Ecosystem
                </div>
                <h3 className="font-headline text-2xl md:text-3xl font-black text-foreground">
                  In-Clinic Visit or In-Home Physiotherapy?
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
                  Whether you prefer walking into our high-tech clinics or having our hospital-grade therapists visit your bedside at home, Aries delivers standardized excellence.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* In-Clinic Card */}
                <div className="p-6 md:p-8 rounded-3xl bg-card border border-primary/20 shadow-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-headline text-lg font-bold text-foreground">In-Clinic Treatment</h4>
                      <p className="text-xs text-muted-foreground">At Aries PhysioCare Centers</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Access to heavy stationary equipment (Spinal Traction beds, Gait Labs)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Dedicated private air-conditioned therapy cabins</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Multi-specialist clinical board consultations available</span>
                    </li>
                  </ul>
                  <Button asChild className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider">
                    <Link href="/book-appointment">Book In-Clinic Slot</Link>
                  </Button>
                </div>

                {/* Home Visit Card */}
                <div className="p-6 md:p-8 rounded-3xl bg-card border border-border shadow-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center font-bold">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-headline text-lg font-bold text-foreground">In-Home Physiotherapy</h4>
                      <p className="text-xs text-muted-foreground">At Your Doorstep (Across India)</p>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Zero travel stress for bedridden, post-surgery or elderly patients</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Therapist arrives with portable IFT, Ultrasound, and rehab kit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>Home ergonomic environment safety and mobility assessment</span>
                    </li>
                  </ul>
                  <Button asChild variant="outline" className="w-full h-11 rounded-xl border-border hover:bg-secondary font-bold text-xs uppercase tracking-wider">
                    <Link href="/book-appointment">Book Home Visit Visit</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CALLOUT ────────────────────────────────────────── */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-3xl bg-gradient-to-r from-card via-card/90 to-primary/10 border border-primary/30 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="text-primary font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4" /> Need Personalized Direction?
                </div>
                <h4 className="font-headline text-2xl font-black text-foreground">
                  Talk to Our Clinical Care Coordinator
                </h4>
                <p className="text-xs text-muted-foreground max-w-md">
                  Our medical coordinators will match your condition with the nearest Aries clinic or arrange an expert home visit therapist immediately.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <Button asChild variant="outline" className="h-12 px-6 rounded-xl border-border hover:bg-secondary font-bold text-xs">
                  <a href="tel:+919136447006" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" />
                    +91 9136447006
                  </a>
                </Button>
                <Button asChild className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-primary/20">
                  <Link href="/book-appointment">Book Assessment</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
