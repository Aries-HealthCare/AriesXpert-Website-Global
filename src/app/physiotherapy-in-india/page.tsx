import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Phone,
  MessageCircle,
  Star,
  Shield,
  Award,
  HeartPulse,
  Clock,
  CheckCircle2,
  Building2,
  Zap,
  Users,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import { citySeoPages } from '@/lib/city-seo-data';
import { getOrganizationSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import PricingPackagesSection from '@/components/landing/pricing-packages-section';
import GoogleReviews from '@/components/google-reviews';

export const metadata: Metadata = {
  title: 'Best Home Physiotherapy Services in India | Aries PhysioCare',
  description:
    'Aries PhysioCare provides hospital-grade home physiotherapy across Mumbai, Delhi, Bengaluru, Pune, Hyderabad, Chennai, Kolkata & Ahmedabad. 450+ verified BPT/MPT physiotherapists. Book same-day home visits.',
  keywords: [
    'physiotherapy in india',
    'home physiotherapy india',
    'best physiotherapist india',
    'doorstep physiotherapy',
    'aries physiocare',
    'physiotherapy mumbai',
    'physiotherapy delhi',
    'physiotherapy bangalore',
    'physiotherapy pune',
    'physiotherapy hyderabad',
  ],
  alternates: {
    canonical: 'https://www.ariesphysiocare.com/physiotherapy-in-india',
  },
  openGraph: {
    title: 'Aries PhysioCare INDIA | Expert Home Physiotherapy Services',
    description:
      'Hospital-grade physical rehabilitation and physiotherapy at your doorstep across India. 450+ specialist therapists. Book now.',
    url: 'https://www.ariesphysiocare.com/physiotherapy-in-india',
    type: 'website',
  },
};

const NATIONAL_STATS = [
  { value: '450+', label: 'Verified Physiotherapists', sub: 'BPT & MPT Certified' },
  { value: '9+', label: 'Metropolitan Hubs', sub: 'Covering 250+ Suburbs' },
  { value: '50,000+', label: 'Successful Recoveries', sub: 'Post-op & Chronic Care' },
  { value: '4.9★', label: 'Average Patient Rating', sub: 'Google & Direct Reviews' },
];

const METRO_CITIES = [
  {
    name: 'Mumbai',
    slug: 'physiotherapy-in-mumbai',
    state: 'Maharashtra',
    therapists: '80+ Specialists',
    areas: ['Andheri', 'Bandra', 'Borivali', 'Kandivali', 'Powai', 'Goregaon'],
    tag: 'Flagship Clinic & Home Visit Hub',
  },
  {
    name: 'Delhi NCR',
    slug: 'physiotherapy-in-delhi',
    state: 'Delhi NCR',
    therapists: '65+ Specialists',
    areas: ['South Delhi', 'Dwarka', 'Noida', 'Gurugram', 'Rohini', 'Connaught Place'],
    tag: 'Full NCR Home Visit Coverage',
  },
  {
    name: 'Bengaluru',
    slug: 'physiotherapy-in-bengaluru',
    state: 'Karnataka',
    therapists: '55+ Specialists',
    areas: ['Indiranagar', 'Koramangala', 'Whitefield', 'HSR Layout', 'Jayanagar', 'Marathahalli'],
    tag: 'Tech Park & Home Rehabilitation',
  },
  {
    name: 'Pune',
    slug: 'physiotherapy-in-pune',
    state: 'Maharashtra',
    therapists: '40+ Specialists',
    areas: ['Kothrud', 'Baner', 'Wakad', 'Viman Nagar', 'Hadapsar', 'Aundh'],
    tag: 'Rapid Response Home Care',
  },
  {
    name: 'Hyderabad',
    slug: 'physiotherapy-in-hyderabad',
    state: 'Telangana',
    therapists: '45+ Specialists',
    areas: ['Gachibowli', 'Hitec City', 'Jubilee Hills', 'Banjara Hills', 'Kukatpally', 'Madhapur'],
    tag: 'Same-Day Slotted Visits',
  },
  {
    name: 'Chennai',
    slug: 'physiotherapy-in-chennai',
    state: 'Tamil Nadu',
    therapists: '35+ Specialists',
    areas: ['Anna Nagar', 'T Nagar', 'Adyar', 'Velachery', 'OMR', 'Mylapore'],
    tag: 'Geriatric & Ortho Specialists',
  },
  {
    name: 'Kolkata',
    slug: 'physiotherapy-in-kolkata',
    state: 'West Bengal',
    therapists: '30+ Specialists',
    areas: ['Salt Lake', 'New Town', 'Ballygunge', 'Alipore', 'Behala', 'Garia'],
    tag: 'Neuro & Cardiac Rehabilitation',
  },
  {
    name: 'Ahmedabad',
    slug: 'physiotherapy-in-ahmedabad',
    state: 'Gujarat',
    therapists: '30+ Specialists',
    areas: ['Satellite', 'Bodakdev', 'SG Highway', 'Vastrapur', 'Prahlad Nagar', 'Navrangpura'],
    tag: 'Post-Surgical Joint Care',
  },
];

export default function PhysiotherapyInIndiaPage() {
  const jsonLd = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Physiotherapy in India', url: '/physiotherapy-in-india' },
    ]),
  ];

  const WHATSAPP_URL =
    'https://wa.me/918591981880?text=' +
    encodeURIComponent('Hello Aries PhysioCare, I am looking for home physiotherapy in India.');

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20">
        {/* ── HERO SECTION ────────────────────────────────────────── */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-primary">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-2 text-white/60 text-xs mb-8"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-accent font-semibold">Physiotherapy in India</span>
            </nav>

            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
                <Shield className="w-4 h-4 text-accent" /> India’s Leading Home Healthcare Network
              </div>

              <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hospital-Grade Physiotherapy <br />
                <span className="text-accent">Delivered to Your Doorstep Across India</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Over 450+ senior certified physiotherapists bringing portable electrotherapy, laser
                modalities, and customized rehabilitation programs right to your living room.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <BookAppointmentButton
                  size="lg"
                  className="h-14 px-10 text-base font-bold neon-accent-border shadow-accent/30 shadow-xl"
                >
                  Book Home Session
                </BookAppointmentButton>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent"
                >
                  <a href="tel:+919136447006" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" /> Call +91 9136447006
                  </a>
                </Button>
              </div>

              {/* National Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-4xl mx-auto">
                {NATIONAL_STATS.map((st, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-black text-accent">{st.value}</div>
                    <div className="text-white text-xs font-bold mt-1">{st.label}</div>
                    <div className="text-white/60 text-[10px] mt-0.5">{st.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PAN-INDIA METRO CITIES DIRECTORY ────────────────────── */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" /> Direct City Portals
              </div>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Explore Physiotherapy Services by <span className="text-primary">City</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Click any city to view local specialists, covered localities, patient reviews, and
                same-day appointment availability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {METRO_CITIES.map((city) => (
                <Card
                  key={city.name}
                  className="group rounded-3xl border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold border-primary/20 text-primary">
                        {city.therapists}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="font-headline text-2xl font-bold group-hover:text-primary transition-colors">
                        {city.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{city.state}</p>
                    </div>

                    <p className="text-xs text-primary font-semibold">{city.tag}</p>

                    <div>
                      <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                        Key Localities:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {city.areas.map((a) => (
                          <span
                            key={a}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-secondary/50 text-foreground"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <div className="p-6 pt-0">
                    <Button asChild className="w-full h-10 rounded-xl font-bold text-xs" variant="outline">
                      <Link href={`/${city.slug}`} className="flex items-center justify-center gap-1.5">
                        View {city.name} Services <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── FLAGSHIP PHYSICAL CLINIC SPOTLIGHT ──────────────────── */}
        <section className="py-16 bg-secondary/20 border-y">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/30 border border-primary/20 p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-black uppercase tracking-widest">
                  <Building2 className="w-4 h-4" /> Flagship Physical Center
                </div>
                <h3 className="font-headline text-3xl font-black">
                  Prefer In-Clinic Treatment? Visit Borivali West, Mumbai
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our comprehensive physical wellness center is equipped with Class IV Laser, High-Intensity IFT, Spinal Traction, and veteran senior hospital physiotherapists. Open 365 days a year (8:00 AM – 9:30 PM).
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-foreground">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9★ Google Rating (285+ Reviews)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> ₹800 In-Clinic Tariff
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                <Button asChild size="lg" className="h-12 px-8 font-bold rounded-2xl">
                  <Link href="/clinic">Explore Borivali Center</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 font-bold rounded-2xl">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-500">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Desk
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING & RECOVERY PACKAGES ─────────────────────────── */}
        <PricingPackagesSection initialLocationName="India" />

        {/* ── GOOGLE REVIEWS SECTION ─────────────────────────────── */}
        <section className="py-16 bg-background">
          <GoogleReviews locationName="India" />
        </section>

        {/* ── NATIONAL CONTACT BANNER ─────────────────────────────── */}
        <section className="py-16 bg-primary text-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-3xl space-y-6">
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black">
              Ready to Regain Your Active, Pain-Free Life?
            </h2>
            <p className="text-white/80 text-base sm:text-lg">
              Book online in 60 seconds or speak directly to a clinical coordinator for immediate therapist matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border shadow-2xl">
                Book Doorstep Visit
              </BookAppointmentButton>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                <a href="tel:+919136447006" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call +91 9136447006
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
