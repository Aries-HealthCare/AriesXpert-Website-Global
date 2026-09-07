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
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import PricingPackagesSection from '@/components/landing/pricing-packages-section';
import { cn } from '@/lib/utils';

interface ClinicPageProps {
  params: Promise<{ citySlug: string; clinicSlug: string }>;
}

export async function generateStaticParams() {
  return ARIES_CLINICS_DIRECTORY.map((c) => ({
    citySlug: c.city.toLowerCase(),
    clinicSlug: c.slug,
  }));
}

export async function generateMetadata({ params }: ClinicPageProps): Promise<Metadata> {
  const { citySlug, clinicSlug } = await params;
  const clinic = ARIES_CLINICS_DIRECTORY.find((c) => c.slug === clinicSlug) || ARIES_CLINICS_DIRECTORY[0];

  if (!clinic) {
    return { title: 'Clinic Not Found | Aries PhysioCare' };
  }

  const canonicalUrl = `https://www.ariesphysiocare.com/locations/${citySlug}/${clinic.slug}`;

  return {
    title: `${clinic.name} | Top Physiotherapy Center in ${clinic.subArea}`,
    description: `${clinic.description} Located at ${clinic.address}. Open daily ${clinic.workingHours}. Call ${clinic.phone}.`,
    keywords: [
      `physiotherapy clinic ${clinic.subArea}`,
      `best physiotherapist ${clinic.subArea}`,
      `physiotherapy center ${clinic.city}`,
      'aries physiocare clinic',
      clinic.name
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${clinic.name} | Integrated Wellness & Physiotherapy Center`,
      description: `${clinic.tagline} · ${clinic.address}`,
      url: canonicalUrl,
      images: [{ url: clinic.imageUrl, width: 1200, height: 630, alt: clinic.name }],
    }
  };
}

export default async function PhysicalClinicPage({ params }: ClinicPageProps) {
  const { citySlug, clinicSlug } = await params;
  const clinic = ARIES_CLINICS_DIRECTORY.find((c) => c.slug === clinicSlug);

  if (!clinic) {
    notFound();
  }

  const jsonLd = [
    getMedicalClinicSchema(clinic),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Locations', url: '/locations' },
      { name: clinic.city, url: `/locations/${citySlug}` },
      { name: clinic.name, url: `/locations/${citySlug}/${clinic.slug}` },
    ]),
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-secondary/20 border-b border-border/40 py-3">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/locations" className="hover:text-foreground">Locations</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/locations/${citySlug}`} className="hover:text-foreground">{clinic.city}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate">{clinic.subArea} Center</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-primary/10 via-background to-background border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-primary text-primary-foreground font-bold">
              {clinic.badge || 'Official Walk-In Clinic'}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-primary" /> Verified Physical Center
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {clinic.name}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {clinic.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-sm">
            <div className="flex items-center gap-1.5 text-amber-500 font-bold">
              <Star className="w-5 h-5 fill-amber-500" />
              <span>{clinic.googleRating}★</span>
              <span className="text-muted-foreground font-normal">({clinic.reviewCount} Verified Google Reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{clinic.workingHours}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{clinic.subArea}, {clinic.city}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border">
              Book In-Clinic Consultation
            </BookAppointmentButton>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold">
              <a href={`tel:${clinic.phone}`} className="flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call Clinic ({clinic.phone})
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Details Grid */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-12 grid lg:grid-cols-3 gap-10 flex-1">
        {/* Left 2 Cols: Details & Services */}
        <div className="lg:col-span-2 space-y-10">
          {/* Clinic Overview */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">About This Clinic</h2>
            <p className="text-muted-foreground leading-relaxed text-base">
              {clinic.description}
            </p>
          </section>

          {/* Specialties & Modalities */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Advanced Modalities & Specialties</h2>
            <div className="flex flex-wrap gap-2.5">
              {clinic.specialties.map((s, idx) => (
                <Badge key={idx} variant="secondary" className="px-3.5 py-1.5 text-xs font-semibold">
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          {/* Equipment */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Hospital-Grade Equipment On-Site</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {clinic.equipment.map((eq, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/40 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Doctors at this Clinic */}
          {clinic.doctors && clinic.doctors.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">Consultants at This Center</h2>
              <div className="grid gap-4">
                {clinic.doctors.map((doc, idx) => (
                  <Card key={idx} className="glassmorphic border-border/50 p-5 flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                      <Stethoscope className="w-8 h-8" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-bold text-lg text-foreground">{doc.name}</h3>
                      <p className="text-xs text-primary font-semibold">{doc.specialization} • {doc.qualification}</p>
                      <p className="text-xs text-muted-foreground">Experience: {doc.experience} • Timings: {doc.timings}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Location Map Embed */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <Navigation className="w-6 h-6 text-primary" /> Location & Directions
            </h2>
            <p className="text-sm text-muted-foreground">{clinic.address}</p>
            {clinic.googleMapsEmbedUrl && (
              <div className="w-full h-80 rounded-2xl overflow-hidden border border-border/50">
                <iframe
                  src={clinic.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </section>
        </div>

        {/* Right 1 Col: Quick Info & Consultation Card */}
        <div className="space-y-6">
          <Card className="glassmorphic border-primary/30 p-6 space-y-6 sticky top-28">
            <div>
              <h3 className="text-lg font-bold">Consultation Hours</h3>
              <p className="text-xs text-muted-foreground mt-1">Walk-ins and scheduled appointments welcome.</p>
            </div>

            <div className="space-y-3 text-xs border-y border-border/40 py-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday – Sunday:</span>
                <span className="font-bold">{clinic.workingHours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Initial Assessment:</span>
                <span className="font-bold text-primary">{clinic.consultationFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Regular Session:</span>
                <span className="font-bold">{clinic.regularSessionFee}</span>
              </div>
            </div>

            <div className="space-y-3">
              <BookAppointmentButton size="lg" className="w-full h-12 font-bold neon-accent-border">
                Book Center Appointment
              </BookAppointmentButton>
              <Button asChild variant="outline" className="w-full h-12 font-bold">
                <a href={clinic.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Localized In-Home & Center Packages */}
      <PricingPackagesSection
        initialLocationName={`${clinic.subArea}, ${clinic.city}`}
        title={<>Home Care Packages in <span className="premium-gradient-text">{clinic.subArea}</span></>}
        subtitle={`In addition to walk-in consultations at our ${clinic.name}, our verified specialists deliver hospital-grade physiotherapy sessions directly to homes across ${clinic.subArea} and ${clinic.city}.`}
        badgeText={`${clinic.subArea} Care Packages`}
        className="border-t border-border/40"
      />

      <Footer />
    </main>
  );
}
