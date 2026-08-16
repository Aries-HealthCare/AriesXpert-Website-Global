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
} from 'lucide-react';
import { ARIES_CLINICS_DIRECTORY, type ClinicBranch } from '@/lib/clinics-data';
import BookAppointmentButton from '@/components/book-appointment-button';
import { getMedicalClinicSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import { cn } from '@/lib/utils';

interface ClinicPageProps {
  params: Promise<{ clinicSlug: string }>;
}

export async function generateStaticParams() {
  return ARIES_CLINICS_DIRECTORY.map((clinic) => ({
    clinicSlug: clinic.slug,
  }));
}

export async function generateMetadata({ params }: ClinicPageProps): Promise<Metadata> {
  const { clinicSlug } = await params;
  const clinic = ARIES_CLINICS_DIRECTORY.find((c) => c.slug === clinicSlug || c.id === clinicSlug);

  if (!clinic) {
    return { title: 'Clinic Not Found | Aries PhysioCare' };
  }

  return {
    title: `${clinic.name} - ${clinic.subArea}, ${clinic.city} | Aries PhysioCare`,
    description: `Visit ${clinic.name} in ${clinic.subArea}, ${clinic.city}. Hospital-grade physiotherapy, Class IV Laser, IFT, Spinal Decompression, and certified BPT/MPT specialists.`,
    keywords: [
      clinic.name,
      `physiotherapy clinic in ${clinic.subArea}`,
      `best physiotherapist in ${clinic.city}`,
      'Aries PhysioCare clinic',
      'integrated wellness center',
      clinic.subArea,
      clinic.pincode,
    ],
    alternates: {
      canonical: `https://www.ariesphysiocare.com/clinic/${clinic.slug}`,
    },
    openGraph: {
      title: `${clinic.name} | Aries PhysioCare`,
      description: clinic.description,
      url: `https://www.ariesphysiocare.com/clinic/${clinic.slug}`,
      images: [{ url: clinic.imageUrl, width: 1200, height: 630, alt: clinic.name }],
    },
  };
}

export default async function ClinicDetailPage({ params }: ClinicPageProps) {
  const { clinicSlug } = await params;
  const clinic = ARIES_CLINICS_DIRECTORY.find((c) => c.slug === clinicSlug || c.id === clinicSlug);

  if (!clinic) {
    notFound();
  }

  const jsonLd = [
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
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Clinics', url: '/clinic' },
      { name: clinic.subArea, url: `/clinic/${clinic.slug}` },
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
        {/* ── BREADCRUMB & HEADER ──────────────────────────────────── */}
        <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-gradient-to-b from-primary/10 via-background to-background border-b border-border/40">
          <div className="container mx-auto px-4 md:px-6">
            <nav className="flex items-center gap-2 text-muted-foreground text-xs mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/clinic" className="hover:text-primary transition-colors">Clinics</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-semibold">{clinic.subArea}</span>
            </nav>

            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  {clinic.badge && (
                    <Badge className="bg-primary text-white text-[11px] font-black uppercase tracking-wider px-3 py-1">
                      {clinic.badge}
                    </Badge>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {clinic.googleRating} · {clinic.reviewCount}+ Google Reviews
                  </div>
                  <span className="flex items-center gap-1 text-xs text-emerald-500 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open Today ({clinic.workingHours})
                  </span>
                </div>

                <h1 className="font-headline text-2xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight">
                  {clinic.name}
                </h1>

                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {clinic.tagline}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <Button
                  asChild
                  className="h-12 px-6 rounded-xl bg-gradient-to-r from-primary to-rose-600 hover:from-primary/90 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-primary/20"
                >
                  <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Navigation className="w-4 h-4" /> Navigate on Google Maps <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </Button>
                <BookAppointmentButton className="h-12 px-6 rounded-xl font-bold text-xs">
                  Book In-Clinic Slot
                </BookAppointmentButton>
              </div>
            </div>
          </div>
        </section>

        {/* ── GALLERY & QUICK INFO ──────────────────────────────────── */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Image and Gallery */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-border shadow-2xl">
                  <Image
                    src={clinic.imageUrl}
                    alt={clinic.name}
                    fill
                    className="object-cover"
                    priority
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

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                      <div>
                        <div className="font-bold text-foreground">Direct Telephones:</div>
                        <div className="text-muted-foreground mt-0.5">
                          <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary font-mono">{clinic.phone}</a>
                          {clinic.alternatePhone && (
                            <> · <a href={`tel:${clinic.alternatePhone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary font-mono">{clinic.alternatePhone}</a></>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      <div>
                        <div className="font-bold text-foreground">Consultation Rates:</div>
                        <div className="text-emerald-500 font-bold mt-0.5">{clinic.consultationFee}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex flex-col gap-2">
                    <Button asChild variant="outline" className="w-full h-11 rounded-xl text-xs font-bold border-border hover:bg-secondary">
                      <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center justify-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        Call Front Desk
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full h-11 rounded-xl text-xs font-bold border-border hover:bg-secondary text-emerald-500">
                      <a href={`https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(`Hello Aries PhysioCare, I would like to book an appointment at ${clinic.name}`)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp Desk
                      </a>
                    </Button>
                  </div>
                </Card>
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
