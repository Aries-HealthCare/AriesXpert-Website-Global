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
  AlertCircle
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

      <div className="flex flex-col min-h-screen bg-background text-foreground">
        {/* ── HERO HEADER ──────────────────────────────────────────── */}
        <section className="relative pt-24 pb-14 md:pt-36 md:pb-20 overflow-hidden bg-gradient-to-b from-primary/15 via-background to-background">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.2),transparent_70%)] pointer-events-none" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-muted-foreground text-xs mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/clinic" className="hover:text-primary transition-colors">Clinics</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-semibold truncate max-w-xs">{clinic.name}</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
                <Building2 className="w-4 h-4" />
                {clinic.badge || 'Official Clinic Center'}
              </div>

              <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-[1.12]">
                {clinic.name}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {clinic.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base font-black bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white rounded-2xl shadow-xl shadow-primary/25"
                >
                  <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" /> Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base font-bold rounded-2xl border-border hover:bg-secondary/60">
                  <a href="tel:+919136447006" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-500" /> Call Front Desk
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── PHOTO GALLERY & SIDEBAR ──────────────────────────────── */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Photo Gallery Grid */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border border-border/80">
                  <Image
                    src={clinic.imageUrl}
                    alt={clinic.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {clinic.galleryImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-border/80 shadow-md">
                      <Image src={img} alt={`${clinic.name} interior`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar Quick Card */}
              <div className="space-y-6">
                <Card className="rounded-3xl border border-primary/20 bg-card/80 backdrop-blur-xl shadow-xl p-6 space-y-5">
                  <h3 className="font-headline text-lg font-bold text-foreground">Clinic Contact & Timings</h3>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-foreground">Location Address:</div>
                        <div className="text-muted-foreground mt-0.5 leading-relaxed">{clinic.address}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <div className="font-bold text-foreground">Working Hours:</div>
                        <div className="text-muted-foreground mt-0.5">{clinic.workingHours} ({clinic.daysOpen})</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-foreground">Direct Mobile Numbers:</div>
                        <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1 font-mono font-bold">
                          {clinic.phones.map((phone, pIdx) => (
                            <React.Fragment key={pIdx}>
                              <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-primary hover:underline">
                                {phone}
                              </a>
                              {pIdx < clinic.phones.length - 1 && <span className="text-muted-foreground">·</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <div className="font-bold text-foreground">Consultation / Regular Session:</div>
                        <div className="text-emerald-500 font-bold font-mono text-sm mt-0.5">{clinic.consultationFee}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full h-11 rounded-xl text-xs font-bold border-border hover:bg-secondary">
                      <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        Call Front Desk (+91 9136447006)
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-11 rounded-xl text-xs font-bold border-border hover:bg-secondary text-emerald-500">
                      <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(`Hello Aries PhysioCare, I would like to book an appointment at ${clinic.name}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp Front Desk
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ── OFFICIAL FEES & PACKAGES SECTION ─────────────────────── */}
        <section className="py-16 bg-card/40 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto space-y-10">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
                  <Tag className="w-3.5 h-3.5" /> Standard Clinical Tariff
                </div>
                <h2 className="font-headline text-3xl md:text-4xl font-black text-foreground underline decoration-primary/50 underline-offset-8">
                  Fees For Physiotherapy
                </h2>
              </div>

              {/* Consultation Block */}
              <div className="p-8 rounded-3xl bg-gradient-to-r from-card via-card to-primary/10 border-2 border-primary/40 shadow-xl text-center max-w-xl mx-auto space-y-2">
                <h3 className="font-headline text-xl font-bold text-foreground">Consultation / Regular Therapy</h3>
                <div className="font-headline text-4xl sm:text-5xl font-black text-primary">₹ 800/-</div>
              </div>

              {/* Packages Block */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="font-headline text-xl sm:text-2xl font-black text-foreground">
                    Physiotherapy Packages <span className="text-xs sm:text-sm font-semibold text-primary block sm:inline sm:ml-2">(Only on 100% Advance Payments)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {clinic.packages.map((pkg, idx) => (
                    <Card
                      key={idx}
                      className={cn(
                        "rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between relative shadow-xl hover:-translate-y-1",
                        pkg.isPopular
                          ? "border-primary bg-gradient-to-b from-primary/10 via-card to-card shadow-primary/20"
                          : "border-border/80 bg-card hover:border-primary/40"
                      )}
                    >
                      {pkg.isPopular && (
                        <div className="bg-primary text-white text-[10px] font-black uppercase tracking-widest py-1 text-center">
                          ★ Most Recommended
                        </div>
                      )}

                      <div className="p-6 text-center space-y-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-headline text-2xl font-black shadow-md">
                          {pkg.duration}
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs font-bold text-muted-foreground uppercase">Per Session</div>
                          <div className="font-headline text-lg font-black text-foreground">{pkg.perSession}</div>
                        </div>

                        <div className="py-3 px-4 rounded-2xl bg-secondary/50 border border-border space-y-0.5">
                          <div className="text-[11px] text-muted-foreground">Total Price</div>
                          <div className="font-headline text-2xl font-black text-foreground">{pkg.totalPrice}</div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-black">
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
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-1 max-w-2xl mx-auto">
                  <div className="text-rose-500 font-headline font-bold text-sm flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    Bargaining is not permitted.
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    If there are any offers or discounts available, they will be clearly advertised or displayed on our board.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODALITIES & CLINICAL SPECIALISTS ─────────────────────── */}
        <section className="py-16 bg-card/30 border-y border-border">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Equipment Grid */}
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-primary text-xs font-black uppercase tracking-widest">
                    <Zap className="w-3.5 h-3.5" /> Advanced Technology
                  </div>
                  <h2 className="font-headline text-2xl md:text-3xl font-black text-foreground mt-1">
                    In-House Modalities & Medical Equipment
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
                    <Award className="w-3.5 h-3.5" /> Expert Medical Board
                  </div>
                  <h2 className="font-headline text-2xl md:text-3xl font-black text-foreground mt-1">
                    Specialists Practicing at {clinic.subArea} Center
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
      </div>
    </>
  );
}
