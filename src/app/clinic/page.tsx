'use client';

import React from 'react';
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
  Activity,
  Award,
  Zap,
  CalendarCheck,
  Home,
  Check
} from 'lucide-react';
import { ARIES_CLINICS_DIRECTORY } from '@/lib/clinics-data';
import BookAppointmentButton from '@/components/book-appointment-button';
import { getOrganizationSchema, getBreadcrumbSchema, getMedicalClinicSchema } from '@/lib/seo-schemas';
import { cn } from '@/lib/utils';

export default function ClinicsPage() {
  const clinic = ARIES_CLINICS_DIRECTORY[0];

  const jsonLd = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Our Clinic', url: '/clinic' },
    ]),
    getMedicalClinicSchema({
      name: clinic.name,
      description: clinic.description,
      address: clinic.address,
      city: clinic.city,
      state: clinic.state,
      slug: clinic.slug,
      mapUrl: clinic.googleMapsUrl,
      phone: clinic.phone,
      rating: clinic.googleRating,
      reviewCount: clinic.reviewCount,
    }),
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
              <span className="text-foreground font-semibold">Our Clinic Center</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">
                <Building2 className="w-4 h-4" />
                Physical Clinic Center
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.12]">
                Aries PhysioCare <br />
                <span className="premium-gradient-text">Expert Physiotherapy & Wellness Center</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Visit our physical rehabilitation facility in Borivali West, Mumbai. Fully equipped with hospital-grade Class IV Laser, High-Intensity IFT, Spinal Decompression, and certified senior physiotherapists.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base font-black bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white rounded-2xl shadow-xl shadow-primary/25"
                >
                  <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" /> Navigate on Google Maps
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                  </a>
                </Button>
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
                  { label: 'Working Hours', value: '8:00 AM – 9:30 PM (365 Days)' },
                  { label: 'Location', value: 'New MHB Colony, Borivali West' },
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

        {/* ── CLINIC DETAILS SHOWCASE ──────────────────────────────── */}
        <section className="py-12 md:py-20 bg-background relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row items-stretch gap-8 rounded-3xl p-6 md:p-10 bg-gradient-to-br from-card via-card/95 to-primary/5 border-2 border-primary/30 shadow-2xl backdrop-blur-2xl">
                {/* Left Visual Gallery */}
                <div className="lg:w-1/2 flex flex-col justify-between space-y-4">
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
                    <Image
                      src={clinic.imageUrl}
                      alt={clinic.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Live Open Status Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      Open Today · 8:00 AM - 9:30 PM
                    </div>

                    {/* Google Rating Chip */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-500/40 text-xs font-black text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9 (285+ Google Reviews)
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">Borivali West, Mumbai</span>
                      <h3 className="font-headline text-xl font-bold leading-tight">New MHB Colony Center</h3>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  <div className="grid grid-cols-4 gap-3">
                    {clinic.galleryImages.map((img, gIdx) => (
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
                        ★ Google Verified Physical Center
                      </Badge>
                      <Badge variant="outline" className="text-[11px] font-bold border-accent/40 text-accent">
                        Integrated Clinical Care
                      </Badge>
                    </div>

                    <h2 className="font-headline text-2xl md:text-3xl font-black text-foreground leading-snug">
                      {clinic.name}
                    </h2>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {clinic.description}
                    </p>
                  </div>

                  {/* Location & Timings Details */}
                  <div className="p-4 rounded-2xl bg-secondary/40 border border-border/60 text-xs space-y-3">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground">Clinic Address: </span>
                        <span className="text-muted-foreground">{clinic.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <span className="font-bold text-foreground">Clinic Timings: </span>
                        <span className="text-muted-foreground">{clinic.workingHours} ({clinic.daysOpen})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="font-bold text-foreground">Telephones: </span>
                        <a href="tel:+919136447006" className="text-primary hover:underline font-mono font-bold">+91 9136447006</a>
                        <span className="text-muted-foreground"> · </span>
                        <a href="tel:+919972267762" className="text-primary hover:underline font-mono font-bold">+91 9972267762</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <span className="font-bold text-foreground">Assessment Fee: </span>
                        <span className="text-emerald-500 font-bold font-mono">{clinic.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Modalities Preview */}
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-primary" /> Key In-House Equipment & Modalities:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {clinic.equipment.slice(0, 6).map((eq, eIdx) => (
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
                      <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <Navigation className="w-4 h-4" />
                        Open in Google Maps
                        <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-12 rounded-xl border-border hover:bg-secondary text-foreground font-bold text-xs uppercase tracking-wider"
                    >
                      <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent('Hello Aries PhysioCare Borivali West Center, I would like to book a physiotherapy appointment.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-emerald-500">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Front Desk
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODALITIES & DOCTORS ─────────────────────────────────── */}
        <section className="py-16 bg-card/30 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Equipment Grid */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-primary text-xs font-black uppercase tracking-widest">
                    <Zap className="w-3.5 h-3.5" /> Advanced Clinical Infrastructure
                  </div>
                  <h2 className="font-headline text-2xl md:text-3xl font-black text-foreground mt-1">
                    In-House Treatment Modalities & Facilities
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {clinic.equipment.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-card border border-border/80 shadow-md flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-foreground leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctors / Specialists practising at this center */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-primary text-xs font-black uppercase tracking-widest">
                    <Award className="w-3.5 h-3.5" /> Lead Specialists & Consultants
                  </div>
                  <h2 className="font-headline text-2xl md:text-3xl font-black text-foreground mt-1">
                    Consultants & Timings at Borivali West Center
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clinic.doctors.map((doc, dIdx) => {
                    const isLogo = !doc.imageUrl || doc.imageUrl.includes('aries-emblem') || doc.imageUrl.includes('default-avatar');
                    return (
                      <Card key={dIdx} className="rounded-3xl border border-border/80 bg-card p-6 flex flex-col justify-between shadow-xl hover:border-primary/40 transition-all duration-300 group">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className={cn("relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-primary/20", isLogo ? "bg-gradient-to-br from-[#3b0d5c] via-[#1f0730] to-[#0d0214] flex items-center justify-center p-3" : "")}>
                              <Image src={doc.imageUrl} alt={doc.name} fill className={cn(isLogo ? "object-contain p-3 drop-shadow-[0_4px_12px_rgba(234,179,8,0.3)]" : "object-cover")} />
                            </div>
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <h3 className="font-headline text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">{doc.name}</h3>
                              <p className="text-xs text-primary font-semibold">{doc.qualification}</p>
                              <Badge variant="outline" className="text-[10px] border-accent/40 text-accent font-bold mt-1">
                                {doc.experience}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs pt-1">
                            <p className="text-muted-foreground line-clamp-2">{doc.specialization}</p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{doc.timings}</span>
                          </div>
                          <span className="text-[11px] text-muted-foreground font-medium">Available Daily</span>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOME VISIT ACROSS INDIA CALLOUT ──────────────────────── */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto p-8 md:p-10 rounded-3xl bg-gradient-to-r from-card via-card/90 to-primary/10 border-2 border-primary/20 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="text-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                  <Home className="w-4 h-4" /> Pan-India In-Home Healthcare
                </div>
                <h4 className="font-headline text-2xl font-black text-foreground">
                  Can't Visit Our Clinic in Person?
                </h4>
                <p className="text-xs text-muted-foreground max-w-md">
                  We provide hospital-grade in-home physiotherapy across all localities of Mumbai and major cities in India. Our certified physiotherapists visit your home equipped with portable IFT, Ultrasound, and full rehab gear.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <Button asChild className="h-12 px-8 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-primary/20">
                  <Link href="/book-appointment">Book Home Visit</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
