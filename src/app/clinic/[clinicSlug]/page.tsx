import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
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
  Zap,
  ExternalLink,
  ChevronRight,
  Award,
  CalendarCheck,
  Activity,
  Layers,
  Home,
  Tag,
  AlertCircle,
  Stethoscope,
  Accessibility,
  Car,
  Wifi,
  Wind
} from 'lucide-react';
import { ARIES_CLINICS_DIRECTORY, type ClinicBranch } from '@/lib/clinics-data';
import BookAppointmentButton from '@/components/book-appointment-button';
import { getMedicalClinicSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import { cn } from '@/lib/utils';

interface ClinicPageProps {
  params: Promise<{ clinicSlug: string }>;
}

export async function generateStaticParams() {
  return ARIES_CLINICS_DIRECTORY.map((c) => ({
    clinicSlug: c.slug,
  }));
}

export async function generateMetadata({ params }: ClinicPageProps): Promise<Metadata> {
  const { clinicSlug } = await params;
  const clinic = ARIES_CLINICS_DIRECTORY.find((c) => c.slug === clinicSlug) || ARIES_CLINICS_DIRECTORY[0];

  if (!clinic) {
    return { title: 'Clinic Not Found | Aries PhysioCare' };
  }

  return {
    title: `${clinic.name} | Top Physiotherapy Center in ${clinic.subArea}`,
    description: `${clinic.description} Located at ${clinic.address}. Open daily ${clinic.workingHours}. Call ${clinic.phone}.`,
    alternates: {
      canonical: `/clinic/${clinic.slug}`,
    },
    openGraph: {
      title: `${clinic.name} · Borivali West Mumbai`,
      description: clinic.tagline,
      images: [{ url: clinic.imageUrl, width: 1200, height: 630, alt: clinic.name }],
    },
  };
}

export default async function ClinicDetailPage({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;
  const clinic = ARIES_CLINICS_DIRECTORY.find((c) => c.slug === clinicSlug) || ARIES_CLINICS_DIRECTORY[0];

  if (!clinic) {
    notFound();
  }

  const jsonLd = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Clinics', url: '/clinic' },
      { name: clinic.name, url: `/clinic/${clinic.slug}` },
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

      <div className="flex flex-col min-h-screen bg-[#07020d] text-foreground selection:bg-primary/30 selection:text-white">
        
        {/* Ambient Glows */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/20 via-purple-900/10 to-transparent rounded-full blur-[140px] opacity-70" />
          <div className="absolute top-[40%] -right-48 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        </div>

        {/* ── HERO HEADER ──────────────────────────────────────────── */}
        <section className="relative pt-28 pb-14 md:pt-36 md:pb-20 overflow-hidden z-10">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/clinic" className="hover:text-white transition-colors">Clinics</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-accent font-semibold truncate max-w-xs">{clinic.subArea} Center</span>
            </nav>

            <div className="max-w-5xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-black uppercase tracking-widest backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {clinic.badge || 'Official Clinic Center'} · Open 8:00 AM – 9:30 PM
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.12]">
                {clinic.name}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {clinic.tagline}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-13 px-7 text-sm font-black bg-gradient-to-r from-primary via-rose-600 to-rose-700 hover:from-primary/90 text-white rounded-2xl shadow-xl shadow-primary/25 hover:scale-[1.02] transition-all"
                >
                  <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" /> Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-70" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-13 px-7 text-sm font-bold rounded-2xl border-white/15 bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl hover:scale-[1.02] transition-all">
                  <a href="tel:+919136447006" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-400" /> Call Front Desk
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-13 px-7 text-sm font-bold rounded-2xl border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 backdrop-blur-xl hover:scale-[1.02] transition-all">
                  <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent('Hello Aries PhysioCare, I would like to book a clinic appointment.')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp (+91 8591981880)
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── PHOTO GALLERY & SIDEBAR ──────────────────────────────── */}
        <section className="py-10 z-10 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Photo Gallery Grid */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 bg-black/40">
                  <Image
                    src={clinic.imageUrl}
                    alt={clinic.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Open Today · 8:00 AM - 9:30 PM
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-xs font-bold text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.9 (285+ Reviews)
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="font-headline text-2xl font-bold text-white leading-tight">
                      {clinic.name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {clinic.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-md">
                      <Image src={img} alt={`${clinic.name} interior`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Quick Card */}
              <div className="lg:col-span-5 space-y-6">
                <Card className="rounded-3xl border-2 border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent backdrop-blur-2xl shadow-2xl p-6 space-y-5 text-white">
                  <h3 className="font-headline text-xl font-bold text-white border-b border-white/10 pb-3">Clinic Contact & Timings</h3>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Location Address:</div>
                        <div className="text-white/70 mt-0.5 leading-relaxed">{clinic.address}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white">Working Hours:</div>
                        <div className="text-white/70 mt-0.5">{clinic.workingHours} ({clinic.daysOpen})</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-white">Direct Mobile Numbers:</div>
                        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 font-mono font-bold">
                          {clinic.phones.map((phone, pIdx) => (
                            <React.Fragment key={pIdx}>
                              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-primary hover:underline">
                                {phone}
                              </a>
                              {pIdx < clinic.phones.length - 1 && <span className="text-white/30">·</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white">Consultation / Regular Session:</div>
                        <div className="text-emerald-400 font-bold font-mono text-sm mt-0.5">{clinic.consultationFee}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex flex-col gap-2.5">
                    <Button asChild className="w-full h-12 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                      <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Call Front Desk (+91 9136447006)
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-12 rounded-xl text-xs font-bold border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400">
                      <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(`Hello Aries PhysioCare, I would like to book an appointment at ${clinic.name}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Desk (+91 8591981880)
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ── SPECIALIST MEDICAL BOARD ──────────────────────────────── */}
        <section className="py-16 md:py-20 z-10 relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 text-primary text-xs font-black uppercase tracking-widest">
                  <Award className="w-4 h-4" /> Expert Medical Board
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                  Specialists Practicing at {clinic.subArea} Center
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {clinic.doctors.map((doc, dIdx) => {
                  const isLogo = !doc.imageUrl || doc.imageUrl.includes('aries-emblem') || doc.imageUrl.includes('default-avatar');
                  return (
                    <Card key={dIdx} className="rounded-3xl border-2 border-white/10 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-transparent backdrop-blur-xl p-6 flex flex-col justify-between shadow-2xl hover:border-primary/50 transition-all duration-300 group">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className={cn("relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2", isLogo ? "bg-gradient-to-br from-[#3b0d5c] via-[#1a052a] to-[#0d0214] border-amber-400/30 flex items-center justify-center p-3" : "border-primary/40")}>
                            <Image src={doc.imageUrl} alt={doc.name} fill className={cn(isLogo ? "object-contain p-2.5 drop-shadow-[0_4px_12px_rgba(234,179,8,0.35)]" : "object-cover")} />
                          </div>
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <h3 className="font-headline text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">{doc.name}</h3>
                            <p className="text-xs text-primary font-semibold">{doc.qualification}</p>
                            <Badge variant="outline" className="text-[10px] border-amber-400/40 text-amber-300 bg-amber-400/10 font-bold mt-1">
                              {doc.experience}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-white/70 leading-relaxed min-h-[55px]">
                          {doc.specialization}
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{doc.timings}</span>
                        </div>
                        <span className="text-[11px] text-white/50 font-medium">Daily Shift</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── OFFICIAL FEES & PACKAGES SECTION ─────────────────────── */}
        <section className="py-16 md:py-20 z-10 relative bg-gradient-to-b from-white/[0.03] via-white/[0.05] to-white/[0.02] border-y border-white/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
                  <Tag className="w-3.5 h-3.5" /> Standard Clinical Tariff
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight underline decoration-primary/60 underline-offset-8">
                  Fees For Physiotherapy
                </h2>
              </div>

              {/* Consultation Block */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-primary/10 border-2 border-primary/40 shadow-2xl backdrop-blur-2xl text-center max-w-xl mx-auto space-y-2">
                <h3 className="font-headline text-xl font-bold text-white">Consultation / Regular Therapy</h3>
                <div className="font-headline text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-300 via-rose-400 to-primary bg-clip-text text-transparent">₹ 800/-</div>
                <p className="text-xs text-white/70">Per clinical session with diagnostic evaluation & therapy</p>
              </div>

              {/* Packages Block */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-headline text-xl sm:text-2xl font-black text-white">
                    Physiotherapy Packages <span className="text-xs sm:text-sm font-semibold text-amber-300 block sm:inline sm:ml-2">(Only on 100% Advance Payments)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clinic.packages.map((pkg, idx) => (
                    <Card
                      key={idx}
                      className={cn(
                        "rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between relative shadow-2xl hover:-translate-y-1",
                        pkg.isPopular
                          ? "border-primary bg-gradient-to-b from-primary/15 via-white/[0.06] to-transparent ring-2 ring-primary/30 shadow-primary/30"
                          : "border-white/15 bg-gradient-to-b from-white/[0.06] via-white/[0.02] to-transparent hover:border-white/40"
                      )}
                    >
                      {pkg.isPopular && (
                        <div className="bg-gradient-to-r from-primary to-rose-600 text-white text-[10px] font-black uppercase tracking-widest py-1 text-center">
                          ★ Most Popular Choice
                        </div>
                      )}

                      <div className="p-6 text-center space-y-4">
                        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700 text-white font-headline text-2xl font-black shadow-md">
                          {pkg.duration}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-bold text-white/60 uppercase">Per Session</div>
                          <div className="font-headline text-lg font-black text-white">{pkg.perSession}</div>
                        </div>

                        <div className="py-3 px-4 rounded-2xl bg-white/[0.05] border border-white/10 space-y-0.5">
                          <div className="text-[11px] text-white/50">Total Price</div>
                          <div className="font-headline text-2xl font-black text-amber-300">{pkg.totalPrice}</div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-black">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {pkg.savings}
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <BookAppointmentButton className="w-full h-11 rounded-xl text-xs font-bold">
                          Book {pkg.duration}
                        </BookAppointmentButton>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Policy Note */}
                <div className="p-4 rounded-2xl bg-rose-500/10 border-2 border-rose-500/30 text-center space-y-1 max-w-2xl mx-auto">
                  <div className="text-rose-400 font-headline font-bold text-sm flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    Bargaining is not permitted.
                  </div>
                  <p className="text-[11px] text-white/70">
                    If there are any offers or discounts available, they will be clearly advertised or displayed on our board.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── IN-HOUSE MODALITIES ──────────────────────────────────── */}
        <section className="py-16 md:py-20 z-10 relative bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 text-primary text-xs font-black uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5" /> Advanced Technology
                </div>
                <h2 className="font-headline text-3xl sm:text-4xl font-black text-white">
                  In-House Modalities & Medical Equipment
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {clinic.equipment.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-md flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-white leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
