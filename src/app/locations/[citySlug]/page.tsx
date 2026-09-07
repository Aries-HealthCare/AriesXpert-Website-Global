import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { ARIES_CLINICS_DIRECTORY } from '@/lib/clinics-data';
import { IndianStates } from '@/lib/locations';
import { getCityHubDetail } from '@/lib/clinics-hubs-data';
import CityAreasDirectory from '@/components/locations/city-areas-directory';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star, Clock, ArrowRight, ShieldCheck, Building2, ChevronRight } from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import PricingPackagesSection from '@/components/landing/pricing-packages-section';

interface PageProps {
  params: Promise<{ citySlug: string }>;
}

function capitalize(str: string) {
  if (!str) return '';
  return str.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { citySlug } = await params;
  const hubDetail = getCityHubDetail(citySlug);
  const cityName = hubDetail ? hubDetail.city : capitalize(citySlug);

  return {
    title: `Physiotherapy Clinics & Care Centers in ${cityName} | Aries PhysioCare`,
    description: `Locate official Aries PhysioCare clinics and home physical therapy care hubs in ${cityName}. Same-day assessments, certified specialists, and hospital-grade equipment.`,
    alternates: {
      canonical: `https://www.ariesphysiocare.com/locations/${citySlug}`,
    },
    openGraph: {
      title: `Physiotherapy Clinics & Care Hubs in ${cityName} | Aries PhysioCare`,
      description: `Hospital-grade physical therapy centers and home dispatch hubs in ${cityName}.`,
      url: `https://www.ariesphysiocare.com/locations/${citySlug}`,
    }
  };
}

export default async function CityLocationHubPage({ params }: PageProps) {
  const { citySlug } = await params;
  const hubDetail = getCityHubDetail(citySlug);
  const cityName = hubDetail ? hubDetail.city : capitalize(citySlug);

  // Find clinics in this city
  const clinicsInCity = ARIES_CLINICS_DIRECTORY.filter(
    (c) =>
      c.city.toLowerCase() === citySlug.toLowerCase() ||
      (hubDetail && c.city.toLowerCase() === hubDetail.city.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-secondary/20 border-b border-border/40 py-3">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/locations" className="hover:text-foreground">Locations</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{cityName}</span>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="py-16 bg-gradient-to-b from-primary/10 via-background to-background border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center space-y-4">
          <Badge variant="outline" className="px-3 py-1 border-primary/40 text-primary font-bold text-xs uppercase">
            {cityName} Regional Directory
          </Badge>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Physiotherapy Clinics & Care Hubs in {cityName}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Access verified physical rehabilitation centers and dispatch hubs providing bedside home care across {cityName}.
          </p>
        </div>
      </section>

      {/* Physical Walk-In Clinics (if any in this city) */}
      {clinicsInCity.length > 0 && (
        <section className="py-12 container mx-auto px-4 md:px-6 max-w-5xl space-y-6">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" /> Walk-In Center in {cityName}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {clinicsInCity.map(clinic => (
              <Card key={clinic.id} className="glassmorphic border-border/60 hover:border-primary/50 transition-all overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={clinic.imageUrl} alt={clinic.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">
                    <Link href={`/locations/${citySlug}/${clinic.slug}`} className="hover:text-primary transition-colors">
                      {clinic.name}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-xs flex items-start gap-1.5 pt-1">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{clinic.address}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button asChild variant="default" size="sm" className="flex-1 font-bold">
                      <Link href={`/locations/${citySlug}/${clinic.slug}`}>
                        Clinic Details & Booking
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={`tel:${clinic.phone}`}>Call</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Localities & Sub-Areas Serviced via Home Care */}
      {hubDetail && hubDetail.areas.length > 0 && (
        <section className="py-12 bg-secondary/10 border-t border-border/40 flex-1">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                All Areas &amp; Sub-Areas Serviced in {cityName}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Our certified specialists provide same-day home physical therapy sessions across {hubDetail.totalAreasCount} primary zones and {hubDetail.totalSubAreasCount} sub-areas in {cityName}. Click any area or neighborhood to open its dedicated clinical landing page.
              </p>
            </div>

            <CityAreasDirectory hubDetail={hubDetail} />
          </div>
        </section>
      )}

      {/* Package Pricing for this City */}
      <PricingPackagesSection
        initialLocationName={cityName}
        title={<>Physiotherapy Packages in <span className="premium-gradient-text">{cityName}</span></>}
        subtitle={`Standardized, hospital-grade in-home physical therapy packages across all neighborhoods of ${cityName}. Verified BPT/MPT specialists with electrotherapy modalities included.`}
        badgeText={`${cityName} Package Pricing`}
        className="border-t border-border/40"
      />

      <Footer />
    </main>
  );
}
