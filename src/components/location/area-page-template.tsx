import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Phone, MessageCircle, MapPin, ChevronRight, Shield,
    CheckCircle2, Clock, HeartPulse, Award, Users, Star,
    Building2, ArrowRight,
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import { type LocationPageData } from '@/lib/location-index';
import { getLocalBusinessSchema, getBreadcrumbSchema, getHealthcareServiceSchema } from '@/lib/seo-schemas';
import { services } from '@/lib/placeholder-data';
import { citySeoPages } from '@/lib/city-seo-data';
import VettedExperts from '@/components/landing/vetted-experts';
import PricingPackagesSection from '@/components/landing/pricing-packages-section';

interface AreaLandingPageTemplateProps {
    location: LocationPageData;
}

// Generic conditions treated everywhere
const COMMON_CONDITIONS = [
    'Back Pain', 'Neck Pain', 'Knee Pain', 'Shoulder Pain',
    'Post-Surgery Rehab', 'Sciatica', 'Frozen Shoulder',
    'Sports Injuries', 'Cervical Spondylosis', 'Arthritis',
    'Stroke Rehab', 'Elderly Care',
];

const TRUST_ITEMS = [
    { icon: Shield, text: 'BPT/MPT Verified Therapists' },
    { icon: Clock, text: 'Same-Day Appointments' },
    { icon: HeartPulse, text: 'Advanced Portable Equipment' },
    { icon: Star, text: '4.8★ Average Rating' },
    { icon: Award, text: '5+ Years Clinical Experience' },
];

const HOW_IT_WORKS = [
    { step: '01', title: 'Book or Call', desc: (loc: string) => `Click Book Now or call +91 9136447006. Tell us you need a physio in ${loc}.` },
    { step: '02', title: 'Get Matched', desc: (loc: string) => `We assign the nearest certified therapist covering ${loc}.` },
    { step: '03', title: 'Confirmation', desc: () => "We send you the therapist's name, credentials, and ETA." },
    { step: '04', title: 'Home Session', desc: () => 'Your therapist arrives with all equipment and delivers clinical-grade care.' },
];

export default function AreaLandingPageTemplate({ location }: AreaLandingPageTemplateProps) {
    const isSubArea = location.type === 'subarea';
    const cityPageSlug = `physiotherapy-in-${location.citySlug}`;
    const cityData = citySeoPages.find(c => c.citySlug === location.citySlug);

    const WHATSAPP_URL = `https://wa.me/918591981880?text=${encodeURIComponent(`Hi! I need home physiotherapy in ${location.locationName}, ${location.cityName}. Please share details.`)}`;

    // Build breadcrumb
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: `Physiotherapy in ${location.cityName}`, url: `/${cityPageSlug}` },
        ...(isSubArea && location.areaSlug
            ? [{ name: `Physiotherapy in ${location.areaName}`, url: `/physiotherapy-in-${location.areaSlug}` }]
            : []),
        { name: `Physiotherapy in ${location.locationName}`, url: `/${location.pageSlug}` },
    ];

    const jsonLd = [
        getLocalBusinessSchema({
            name: `Aries PhysioCare — ${location.locationName}, ${location.cityName}`,
            description: location.metaDescription,
            city: location.cityName,
            state: location.stateName,
            url: location.canonicalUrl,
        }),
        getBreadcrumbSchema(breadcrumbs),
        getHealthcareServiceSchema({
            name: `Home Physiotherapy in ${location.locationName}`,
            description: location.metaDescription,
            url: location.canonicalUrl,
            city: location.cityName,
            state: location.stateName,
        }),
        // Area-level FAQ schema
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
                {
                    '@type': 'Question',
                    name: `How quickly can a physiotherapist reach ${location.locationName}?`,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: `For most areas in ${location.locationName}, ${location.cityName}, we can arrange a same-day appointment. Call +91 9136447006 for the fastest slot.`,
                    },
                },
                {
                    '@type': 'Question',
                    name: `Do you have physiotherapists who visit homes in ${location.locationName}?`,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: `Yes! Aries PhysioCare has dedicated therapists covering ${location.locationName} and nearby areas. All therapists are BPT/MPT certified and bring clinical-grade portable equipment.`,
                    },
                },
                {
                    '@type': 'Question',
                    name: `What physiotherapy services are available in ${location.locationName}?`,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: `All Aries PhysioCare services are available in ${location.locationName} — including physiotherapy, sports injury rehab, post-surgery care, neuro rehab, elderly care, and more.`,
                    },
                },
                {
                    '@type': 'Question',
                    name: `How do I book a home physiotherapy session in ${location.locationName}?`,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: `Call +91 9136447006, WhatsApp +91 9372681410, or use the book button above. Mention ${location.locationName} as your location and we'll confirm availability instantly.`,
                    },
                },
            ],
        },
    ];

    return (
        <>
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            <div className="flex flex-col min-h-screen">

                {/* ── HERO ──────────────────────────────────────────── */}
                <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-primary">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_60%)]" />
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        {/* Breadcrumb */}
                        <nav className="flex items-center flex-wrap gap-2 text-white/60 text-xs mb-8" aria-label="Breadcrumb">
                            {breadcrumbs.map((crumb, i) => (
                                <span key={i} className="flex items-center gap-2">
                                    {i > 0 && <ChevronRight className="w-3 h-3" />}
                                    {i < breadcrumbs.length - 1 ? (
                                        <Link href={crumb.url} className="hover:text-white transition-colors">{crumb.name}</Link>
                                    ) : (
                                        <span className="text-white font-semibold">{crumb.name}</span>
                                    )}
                                </span>
                            ))}
                        </nav>

                        <div className="max-w-3xl mx-auto text-center space-y-6">
                            {/* Location pills */}
                            <div className="flex flex-wrap items-center justify-center gap-2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                                    <MapPin className="w-4 h-4 text-accent" />
                                    {location.locationName}, {location.cityName}
                                </div>
                                {isSubArea && location.areaName && (
                                    <Link
                                        href={`/physiotherapy-in-${location.areaSlug}`}
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs hover:bg-white/10 hover:text-white transition-all"
                                    >
                                        <Building2 className="w-3 h-3" />
                                        Part of {location.areaName}
                                    </Link>
                                )}
                            </div>

                            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                                {location.heroHeading}
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                {location.heroSubheading}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                                <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border shadow-accent/30 shadow-xl">
                                    Book Home Visit in {location.locationName}
                                </BookAppointmentButton>
                                <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                                    <a href="tel:+919136447006" className="flex items-center gap-2">
                                        <Phone className="w-5 h-5" /> Call +91 9136447006
                                    </a>
                                </Button>
                            </div>

                            {/* Social proof */}
                            <div className="flex flex-wrap justify-center gap-6 pt-6">
                                {[
                                    { val: '450+', label: 'Therapists Pan-India' },
                                    { val: 'Same Day', label: 'Appointments Available' },
                                    { val: '4.8★', label: 'Average Patient Rating' },
                                    { val: '100%', label: 'BPT/MPT Certified' },
                                ].map((item, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl font-black text-accent">{item.val}</div>
                                        <div className="text-white/60 text-xs">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TRUST STRIP ───────────────────────────────────── */}
                <section className="py-7 bg-secondary/30 border-b">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {TRUST_ITEMS.map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
                                    <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── WHY CHOOSE US ─────────────────────────────────── */}
                <section className="py-16 md:py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                    <HeartPulse className="w-3.5 h-3.5" /> Home Physiotherapy in {location.locationName}
                                </div>
                                <h2 className="font-headline text-3xl md:text-4xl font-extrabold leading-tight">
                                    Why Residents of <span className="text-primary">{location.locationName}</span> Choose Aries PhysioCare
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Getting physiotherapy treatment in {location.locationName}, {location.cityName} no longer means long commutes to clinics. Aries PhysioCare's certified therapists bring clinical-grade care directly to your home — with the same quality you'd expect from top hospitals in {location.cityName}.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Whether you're recovering from surgery, managing chronic pain, or rehabilitating a sports injury, our {location.locationName} team is equipped with advanced portable physiotherapy equipment — including IFT, Ultrasound Therapy, TENS, and Laser — to deliver effective results at your doorstep.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        `Home visits across ${location.locationName}`,
                                        'Certified BPT/MPT therapists',
                                        'IFT, US, TENS, Laser equipment',
                                        'Same-day appointments',
                                        'Clinical progress tracking',
                                        'Post-surgery specialists',
                                        'Elderly care specialists',
                                        'Sports injury experts',
                                    ].map((point, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground">{point}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <BookAppointmentButton size="lg" className="h-12 px-8 font-bold">
                                        Book in {location.locationName}
                                    </BookAppointmentButton>
                                    <Button asChild size="lg" variant="outline" className="h-12 px-8 font-bold">
                                        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#25D366]">
                                            <MessageCircle className="w-4 h-4" /> WhatsApp Us
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-primary/10">
                                    <Image
                                        src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&q=80&w=1000"
                                        alt={`Home physiotherapy in ${location.locationName}, ${location.cityName}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                                </div>
                                {/* Floating card */}
                                <div className="absolute -bottom-4 -right-4 bg-background border shadow-xl rounded-2xl p-4 max-w-[200px]">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        <span className="font-black text-sm">4.8 / 5.0</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Avg rating for {location.cityName} sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <VettedExperts
                    locationName={location.locationName}
                    state={location.stateName}
                    area={location.locationName}
                    city={location.cityName}
                    className="py-16 md:py-20 bg-secondary/10"
                />

                {/* ── SERVICES ──────────────────────────────────────── */}
                <section className="py-16 bg-secondary/20 border-y">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                Services Available in <span className="text-primary">{location.locationName}</span>
                            </h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                Every Aries PhysioCare service is available at your home in {location.locationName}.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {services.map(service => {
                                const ServiceIcon = service.icon;
                                return (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.slug}/${location.stateSlug}/${location.citySlug}`}
                                        className="group p-5 rounded-2xl bg-background border hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                                {ServiceIcon && <ServiceIcon className="w-5 h-5 text-primary group-hover:text-white" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm group-hover:text-primary transition-colors">{service.name}</p>
                                                <p className="text-xs text-muted-foreground">in {location.locationName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── PRICING & RECOVERY PACKAGES ───────────────────── */}
                <PricingPackagesSection initialLocationName={location.locationName} />

                {/* ── CONDITIONS ────────────────────────────────────── */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                Conditions We Treat in <span className="text-primary">{location.locationName}</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {COMMON_CONDITIONS.map(cond => (
                                <Badge key={cond} variant="secondary" className="text-sm px-4 py-2 font-medium">
                                    {cond}
                                </Badge>
                            ))}
                            <Badge variant="outline" className="text-sm px-4 py-2 font-medium">150+ More Conditions</Badge>
                        </div>
                    </div>
                </section>

                {/* ── NEARBY AREAS ──────────────────────────────────── */}
                {location.nearbyAreas.length > 0 && (
                    <section className="py-14 bg-secondary/20 border-y">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center mb-8">
                                <h2 className="font-headline text-2xl md:text-3xl font-bold mb-2">
                                    Also Serving Nearby Areas in <span className="text-primary">{location.cityName}</span>
                                </h2>
                                <p className="text-muted-foreground text-sm">
                                    Click any nearby location for its dedicated physiotherapy page.
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-center gap-3">
                                {location.nearbyAreas.map(area => (
                                    <Link
                                        key={area.slug}
                                        href={`/${area.pageSlug}`}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-full border bg-background hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-sm font-semibold group"
                                    >
                                        <MapPin className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                                        {area.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="text-center mt-6">
                                <Link
                                    href={`/${cityPageSlug}`}
                                    className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                                >
                                    View all areas in {location.cityName} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* ── HOW IT WORKS ──────────────────────────────────── */}
                <section className="py-16 md:py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                How to Get Physio at Home in <span className="text-primary">{location.locationName}</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {HOW_IT_WORKS.map((step, i) => (
                                <div key={i} className="relative flex flex-col items-center text-center gap-4">
                                    {i < 3 && (
                                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-primary/20" />
                                    )}
                                    <div className="w-16 h-16 rounded-2xl bg-primary text-white font-black text-xl flex items-center justify-center shadow-lg shadow-primary/20 relative z-10">
                                        {step.step}
                                    </div>
                                    <h3 className="font-bold text-base">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc(location.locationName)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQ ───────────────────────────────────────────── */}
                <section className="py-16 bg-secondary/20 border-t">
                    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                FAQs — Physiotherapy in <span className="text-primary">{location.locationName}</span>
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                {
                                    q: `How quickly can a physiotherapist reach ${location.locationName}?`,
                                    a: `For most patients in ${location.locationName}, we can arrange a same-day appointment. For early morning or weekend slots, we recommend booking at least a few hours in advance. Call +91 9136447006 for the fastest slot.`,
                                },
                                {
                                    q: `Do you have physiotherapists who visit homes in ${location.locationName}?`,
                                    a: `Yes! Aries PhysioCare has dedicated therapists covering ${location.locationName} and surrounding areas in ${location.cityName}. All are BPT/MPT certified and bring clinical-grade portable equipment for home sessions.`,
                                },
                                {
                                    q: `What conditions can be treated by home physiotherapy in ${location.locationName}?`,
                                    a: `Our ${location.locationName} team is experienced in treating back pain, neck pain, knee pain, post-surgery rehab, sports injuries, sciatica, frozen shoulder, stroke rehab, elderly care, and 150+ other conditions.`,
                                },
                                {
                                    q: `How do I book a home physiotherapy session in ${location.locationName}?`,
                                    a: `Simply call +91 9136447006, WhatsApp +91 9372681410, or click the Book button above. Mention ${location.locationName} as your location and your condition and we'll confirm a therapist within the hour.`,
                                },
                                {
                                    q: `What does home physiotherapy cost in ${location.locationName}?`,
                                    a: `Session pricing starts from ₹800 depending on the service type and package. We offer discounted recovery packages and corporate packages. Call us for an exact quote for your specific condition in ${location.locationName}.`,
                                },
                            ].map((faq, i) => (
                                <Card key={i} className="glassmorphic">
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-base mb-2 flex items-start gap-3">
                                            <span className="text-primary font-black text-sm mt-0.5">Q{i + 1}.</span>
                                            {faq.q}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed pl-8">{faq.a}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FINAL CTA ─────────────────────────────────────── */}
                <section className="py-20 bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                    <div className="container mx-auto px-4 md:px-6 text-center relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                            <MapPin className="w-4 h-4 text-accent" /> {location.locationName}, {location.cityName}
                        </div>
                        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                            Book Your Home Physio<br />in {location.locationName}
                        </h2>
                        <p className="text-white/80 text-lg mb-8">
                            Get certified physiotherapy at your doorstep in {location.locationName}. Same-day slots available.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border shadow-accent/30 shadow-xl">
                                Book Home Visit Now
                            </BookAppointmentButton>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" /> WhatsApp Us
                                </a>
                            </Button>
                        </div>
                        <div className="mt-8 flex items-center justify-center gap-6 text-white/60 text-sm">
                            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> +91 9136447006</span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" /> +91 9372681410</span>
                        </div>
                    </div>
                </section>

                {/* ── OTHER CITY LINKS ──────────────────────────────── */}
                <section className="py-10 bg-background border-t">
                    <div className="container mx-auto px-4 md:px-6">
                        <p className="text-center text-sm text-muted-foreground mb-4 font-semibold">
                            Physiotherapy in Other Cities
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {citySeoPages.map(c => (
                                <Link
                                    key={c.pageSlug}
                                    href={`/${c.pageSlug}`}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                >
                                    <MapPin className="w-3.5 h-3.5" /> {c.cityName}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
}
