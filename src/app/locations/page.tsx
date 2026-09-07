import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { ARIES_CLINICS_DIRECTORY } from '@/lib/clinics-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Star, Clock, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';

export const metadata: Metadata = {
  title: 'Our Clinics & Regional Care Hubs | Aries PhysioCare India',
  description: 'Find official Aries PhysioCare walk-in clinics and regional home-visit operational hubs across Mumbai, Pune, Bangalore, Delhi, and major Indian cities.',
  alternates: {
    canonical: 'https://www.ariesphysiocare.com/locations',
  },
  openGraph: {
    title: 'Aries PhysioCare Clinics & Regional Care Centers',
    description: 'Explore our physical clinic centers and home dispatch centers across India.',
    url: 'https://www.ariesphysiocare.com/locations',
    type: 'website',
  }
};

const CITY_HUBS = [
  { name: 'Mumbai', slug: 'mumbai', centers: '12 Hubs + Borivali Clinic', coverage: 'All 48 Wards' },
  { name: 'Pune', slug: 'pune', centers: '6 Regional Hubs', coverage: 'Kothrud, Wakad, Baner, Hadapsar' },
  { name: 'Bangalore', slug: 'bangalore', centers: '8 Regional Hubs', coverage: 'Koramangala, Indiranagar, Whitefield' },
  { name: 'Delhi NCR', slug: 'delhi', centers: '7 Regional Hubs', coverage: 'South Delhi, Gurugram, Noida' },
  { name: 'Hyderabad', slug: 'hyderabad', centers: '5 Regional Hubs', coverage: 'Jubilee Hills, Gachibowli, Banjara Hills' },
  { name: 'Chennai', slug: 'chennai', centers: '4 Regional Hubs', coverage: 'Anna Nagar, Adyar, OMR' },
  { name: 'Ahmedabad', slug: 'ahmedabad', centers: '4 Regional Hubs', coverage: 'Satellite, SG Highway, Bodakdev' },
  { name: 'Kolkata', slug: 'kolkata', centers: '4 Regional Hubs', coverage: 'Salt Lake, Alipore, New Town' }
];

export default function LocationsDirectoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Hero Header */}
      <section className="py-20 bg-gradient-to-b from-primary/10 via-background to-background border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/40 text-primary font-bold tracking-wide uppercase text-xs">
            Physical Clinics & Home Care Hubs
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Our Physical Clinics & Regional Operations
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Visit our state-of-the-art walk-in wellness clinics or receive same-day hospital-grade home physical therapy dispatched from your local city hub.
          </p>
        </div>
      </section>

      {/* Featured Walk-in Centers */}
      <section className="py-16 container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="w-7 h-7 text-primary" /> Official Walk-In Clinic Centers
          </h2>
          <p className="text-muted-foreground text-base">
            Equipped with advanced therapeutic modalities, private assessment suites, and senior consultants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {ARIES_CLINICS_DIRECTORY.map((clinic) => (
            <Card key={clinic.id} className="glassmorphic border-border/60 hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between">
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={clinic.imageUrl}
                  alt={clinic.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground font-bold shadow-md">
                    {clinic.badge || 'Walk-In Center'}
                  </Badge>
                </div>
              </div>
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-bold line-clamp-2">
                  <Link href={`/locations/mumbai/${clinic.slug}`} className="hover:text-primary transition-colors">
                    {clinic.name}
                  </Link>
                </CardTitle>
                <div className="flex items-center gap-1.5 text-amber-500 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{clinic.googleRating}★</span>
                  <span className="text-muted-foreground font-normal">({clinic.reviewCount} Google Reviews)</span>
                </div>
                <CardDescription className="text-xs text-muted-foreground flex items-start gap-2 pt-1">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{clinic.address}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Open Daily: {clinic.workingHours}</span>
                </div>
                <div className="flex gap-3 pt-2 border-t border-border/40">
                  <Button asChild variant="default" className="flex-1 font-bold">
                    <Link href={`/locations/mumbai/${clinic.slug}`}>
                      View Clinic & Doctors <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="font-bold">
                    <a href={`tel:${clinic.phone}`}>Call Clinic</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Regional City Hubs Grid */}
      <section className="py-16 bg-secondary/20 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl space-y-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Regional Home-Care Operational Hubs</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Select your city to explore dedicated neighborhood dispatch coverage and active specialists.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CITY_HUBS.map((hub) => (
              <Card key={hub.slug} className="glassmorphic hover:border-primary/40 transition-all p-5 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{hub.name}</h3>
                  <p className="text-xs font-semibold text-primary">{hub.centers}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{hub.coverage}</p>
                </div>
                <Button asChild variant="ghost" size="sm" className="mt-4 w-full justify-between text-xs font-bold text-primary">
                  <Link href={`/locations/${hub.slug}`}>
                    Explore Hub <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
