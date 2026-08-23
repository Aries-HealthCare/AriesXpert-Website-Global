import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Phone, MessageCircle, MapPin, ChevronRight, Shield,
    CheckCircle2, Clock, HeartPulse, Award, Users, Star,
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import { type CitySeoData, citySeoPages } from '@/lib/city-seo-data';
import { getLocalBusinessSchema, getBreadcrumbSchema, getFAQSchema, getHealthcareServiceSchema } from '@/lib/seo-schemas';
import { services } from '@/lib/placeholder-data';
import VettedExperts from '@/components/landing/vetted-experts';
import PricingPackagesSection from '@/components/landing/pricing-packages-section';

interface CityLandingPageTemplateProps {
    city: CitySeoData;
}

export default function CityLandingPageTemplate({ city }: CityLandingPageTemplateProps) {
    const WHATSAPP_URL = `https://wa.me/918591981880?text=${encodeURIComponent(`Hi! I need home physiotherapy in ${city.cityName}. Please share details.`)}`;

    const jsonLd = [
        getLocalBusinessSchema({
            name: `Aries PhysioCare — ${city.cityName}`,
            description: city.metaDescription,
            city: city.cityName,
            state: city.stateName,
            url: city.canonicalUrl,
        }),
        getBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Physiotherapy in India', url: '/physiotherapy-in-india' },
            { name: `Physiotherapy in ${city.cityName}`, url: `/${city.pageSlug}` },
        ]),
        getFAQSchema(city.faqs),
        getHealthcareServiceSchema({
            name: `Home Physiotherapy in ${city.cityName}`,
            description: city.metaDescription,
            url: city.canonicalUrl,
            city: city.cityName,
            state: city.stateName,
        }),
    ];

    return (
        <>
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            <div className="flex flex-col min-h-screen">

                {/* ── HERO ──────────────────────────────────────────── */}
                <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-primary">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_60%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.06)_0%,transparent_60%)]" />
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <nav className="flex items-center gap-2 text-white/60 text-xs mb-8" aria-label="Breadcrumb">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link href="/physiotherapy-in-india" className="hover:text-white transition-colors">Physiotherapy in India</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white font-semibold">Physiotherapy in {city.cityName}</span>
                        </nav>

                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                                <MapPin className="w-4 h-4 text-accent" /> {city.cityName}, {city.stateName}
                            </div>
                            <h1 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                                {city.heroHeading}
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                {city.heroSubheading}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                                <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border shadow-accent/30 shadow-xl">
                                    Book Home Visit Now
                                </BookAppointmentButton>
                                <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                                    <a href="tel:+919136447006" className="flex items-center gap-2">
                                        <Phone className="w-5 h-5" /> Call +91 9136447006
                                    </a>
                                </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto">
                                {city.stats.map((stat, idx) => (
                                    <div key={idx} className="text-center bg-white/5 rounded-2xl p-4 border border-white/10">
                                        <div className="text-2xl md:text-3xl font-black text-accent">{stat.value}</div>
                                        <div className="text-white/70 text-xs mt-1 leading-snug">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── TRUST STRIP ───────────────────────────────────── */}
                <section className="py-8 bg-secondary/30 border-b">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {[
                                { icon: Shield, text: 'BPT/MPT Verified Therapists' },
                                { icon: Clock, text: 'Same-Day Appointments' },
                                { icon: HeartPulse, text: 'Advanced Portable Equipment' },
                                { icon: Star, text: `4.8★ Rated in ${city.cityName}` },
                                { icon: Award, text: '5+ Years Clinical Experience' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground">
                                    <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                                    {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── ABOUT / WHY ───────────────────────────────────── */}
                <section className="py-16 md:py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                    <HeartPulse className="w-3.5 h-3.5" /> Home Physiotherapy in {city.cityName}
                                </div>
                                <h2 className="font-headline text-3xl md:text-4xl font-extrabold leading-tight">
                                    Why {city.cityName} Residents Choose <span className="text-primary">Aries PhysioCare</span>
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">{city.localIntro}</p>
                                <p className="text-muted-foreground leading-relaxed">{city.whySection}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                    {[
                                        `Door-to-door service across ${city.cityName}`,
                                        'Certified BPT/MPT therapists',
                                        'Advanced portable equipment',
                                        'Same-day appointments available',
                                        'Digital clinical progress tracking',
                                        'Post-surgery rehab specialists',
                                    ].map((point, i) => (
                                        <div key={i} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-muted-foreground">{point}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                    <BookAppointmentButton size="lg" className="h-12 px-8 font-bold">
                                        Book in {city.cityName}
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
                                        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                                        alt={`Home physiotherapy in ${city.cityName} by Aries PhysioCare`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 bg-background border shadow-xl rounded-2xl p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{city.stats[0].value}</div>
                                        <div className="text-xs text-muted-foreground">{city.stats[0].label}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <VettedExperts
                    locationName={city.cityName}
                    state={city.stateName}
                    city={city.cityName}
                    className="py-16 md:py-20"
                />

                {/* ── SERVICES IN CITY ──────────────────────────────── */}
                <section className="py-16 bg-secondary/20 border-y">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                Our Services in <span className="text-primary">{city.cityName}</span>
                            </h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                All Aries PhysioCare services are available at your home in {city.cityName}.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {services.map(service => {
                                const ServiceIcon = service.icon;
                                return (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.slug}/${city.stateSlug}/${city.citySlug}`}
                                        className="group p-5 rounded-2xl bg-background border hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                {ServiceIcon && <ServiceIcon className="w-5 h-5 text-primary group-hover:text-white" />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm group-hover:text-primary transition-colors">{service.name}</p>
                                                <p className="text-xs text-muted-foreground">in {city.cityName}</p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── PRICING & RECOVERY PACKAGES ───────────────────── */}
                <PricingPackagesSection initialLocationName={city.cityName} />

                {/* ── POPULAR AREAS ─────────────────────────────────── */}
                <section className="py-16 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                Areas We Serve in <span className="text-primary">{city.cityName}</span>
                            </h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                Our therapists cover all major localities in {city.cityName}.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {city.popularAreas.map(area => (
                                <Link
                                    key={area.slug}
                                    href={`/physiotherapy-in-${area.slug}`}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border bg-background hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-sm font-semibold group"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-primary group-hover:text-white transition-colors" />
                                    {area.name}
                                </Link>
                            ))}
                        </div>
                        <div className="text-center">
                            <Button asChild variant="outline" className="font-bold">
                                <a href="tel:+919136447006" className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Confirm Your Area — +91 9136447006
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* ── CONDITIONS ────────────────────────────────────── */}
                <section className="py-16 bg-secondary/20 border-y">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                Conditions Treated in <span className="text-primary">{city.cityName}</span>
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {city.conditions.map(condition => (
                                <Badge key={condition} variant="secondary" className="text-sm px-4 py-2 font-medium">
                                    {condition}
                                </Badge>
                            ))}
                            <Badge variant="outline" className="text-sm px-4 py-2 font-medium">150+ More Conditions</Badge>
                        </div>
                    </div>
                </section>

                {/* ── HOW IT WORKS ──────────────────────────────────── */}
                <section className="py-16 md:py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                How to Get Physiotherapy at Home in <span className="text-primary">{city.cityName}</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { step: '01', title: 'Book or Call', desc: `Book online or call +91 9136447006. Tell us your locality in ${city.cityName} and your condition.` },
                                { step: '02', title: 'Get Matched', desc: `We match you with the best available certified therapist in your area of ${city.cityName}.` },
                                { step: '03', title: 'Confirmation', desc: "You receive confirmation with your therapist's name, credentials, and arrival time." },
                                { step: '04', title: 'Session at Home', desc: 'Your therapist arrives with all equipment and delivers hospital-grade care at your home.' },
                            ].map((step, i) => (
                                <div key={i} className="relative flex flex-col items-center text-center gap-4">
                                    {i < 3 && (
                                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-primary/20" />
                                    )}
                                    <div className="w-16 h-16 rounded-2xl bg-primary text-white font-black text-xl flex items-center justify-center shadow-lg shadow-primary/20 relative z-10">
                                        {step.step}
                                    </div>
                                    <h3 className="font-bold text-base">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── FAQs ──────────────────────────────────────────── */}
                <section className="py-16 bg-secondary/20 border-t">
                    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                FAQs — Physiotherapy in <span className="text-primary">{city.cityName}</span>
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {city.faqs.map((faq, i) => (
                                <Card key={i} className="glassmorphic">
                                    <CardContent className="p-6">
                                        <h3 className="font-bold text-base mb-2 flex items-start gap-3">
                                            <span className="text-primary font-black text-sm mt-0.5">Q{i + 1}.</span>
                                            {faq.question}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed pl-8">{faq.answer}</p>
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
                        <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                            Book Your Session in<br />{city.cityName} Today
                        </h2>
                        <p className="text-white/80 text-lg mb-8 leading-relaxed">
                            Join thousands across {city.cityName} who've experienced hospital-grade physiotherapy at home.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border shadow-accent/30 shadow-xl">
                                Book Home Visit Now
                            </BookAppointmentButton>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* ── OTHER CITIES ──────────────────────────────────── */}
                <section className="py-12 bg-background border-t">
                    <div className="container mx-auto px-4 md:px-6">
                        <h2 className="text-center font-headline text-xl font-bold mb-6 text-muted-foreground">
                            Physiotherapy Services in Other Cities
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {citySeoPages
                                .filter(c => c.pageSlug !== city.pageSlug)
                                .map(c => (
                                    <Link
                                        key={c.pageSlug}
                                        href={`/${c.pageSlug}`}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                                    >
                                        <MapPin className="w-3.5 h-3.5" />
                                        Physiotherapy in {c.cityName}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
