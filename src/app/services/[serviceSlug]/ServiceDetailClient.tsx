'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/placeholder-data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useRequestCallback } from '@/components/request-callback-provider';
import BookAppointmentButton from '@/components/book-appointment-button';
import LocalizedFaqSection from '@/components/localized-faq-section';
import Image from 'next/image';

interface ServiceDetailClientProps {
    serviceSlug: string;
}

const getServiceVisuals = (slug: string) => {
    const s = slug.toLowerCase();
    if (s.includes('occupational') || s === 'ot') {
        return {
            hero: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=85&w=2000',
            overview: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=85&w=1600'
        };
    }
    if (s.includes('diet') || s.includes('nutrition')) {
        return {
            hero: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=85&w=2000',
            overview: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=85&w=1600'
        };
    }
    if (s.includes('nursing')) {
        return {
            hero: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=85&w=2000',
            overview: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=85&w=1600'
        };
    }
    if (s.includes('care-taker') || s.includes('caretaker')) {
        return {
            hero: 'https://images.unsplash.com/photo-1576765608535-5f04c18459e4?auto=format&fit=crop&q=85&w=2000',
            overview: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1600'
        };
    }
    if (s.includes('speech')) {
        return {
            hero: 'https://images.unsplash.com/photo-1543881062-8e1f5798aee8?auto=format&fit=crop&q=85&w=2000',
            overview: 'https://images.unsplash.com/photo-1519238263530-990ffce6e4b8?auto=format&fit=crop&q=85&w=1600'
        };
    }
    return {
        hero: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=2000',
        overview: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=1600'
    };
};

export default function ServiceDetailClient({ serviceSlug }: ServiceDetailClientProps) {
    const service = getServiceBySlug(serviceSlug);
    const { openModal } = useRequestCallback();
    const visuals = getServiceVisuals(serviceSlug);

    if (!service) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* Dynamic Hero Section */}
            <section className="relative w-full h-[60vh] flex items-center overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src={visuals.hero}
                        alt={service.name}
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h1 className="font-headline text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                            Expert {service.name} <br /><span className="text-accent">at Home</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
                            Clinical excellence, specialized care, and advanced recovery protocols delivered to your doorstep.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <BookAppointmentButton size="lg" serviceSlug={service.slug} className="h-16 px-10 text-xl font-bold neon-accent-border shadow-2xl">
                                Book {service.name} Session
                            </BookAppointmentButton>
                            <Button size="lg" className="h-16 px-10 text-xl font-bold border-2 border-white text-white hover:bg-white/10 bg-transparent glassmorphic" onClick={() => openModal()}>
                                Consult an Expert
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Focused Service Overview */}
            <section className="py-20 md:py-32 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center w-full mx-auto">
                        <div className="space-y-8">
                            <h2 className="font-headline text-3xl md:text-5xl font-bold">Understanding {service.name}</h2>
                            <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                                <p>{service.longDescription}</p>
                            </div>
                            <ul className="space-y-4 pt-4">
                                {[
                                    `Professional home-based ${service.name.toLowerCase()} assessments`,
                                    'Tailored clinical recovery roadmaps',
                                    'Regular progress monitoring and adjustments',
                                    'Family integration in the care process'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-semibold text-foreground">
                                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative aspect-square rounded-[3rem] overflow-hidden soft-shadow border border-primary/10 shadow-2xl glassmorphic">
                            <Image
                                src={visuals.overview}
                                alt={service.name}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Conditions Hub Section */}
            <section className="py-20 bg-secondary/30 border-y">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-headline text-3xl md:text-5xl font-bold uppercase tracking-tight">Specialized Care Programs</h2>
                        <p className="mt-6 text-lg text-muted-foreground font-medium">Explore the clinical focus areas we address within our {service.name} service to optimize your recovery.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto">
                        {service.conditions.slice(0, 9).map((condition) => (
                            <Card key={condition.id} className="glassmorphic flex flex-col group hover:neon-primary-border transition-all duration-500 rounded-[2rem] overflow-hidden">
                                <div className="relative aspect-video w-full overflow-hidden">
                                    <Image
                                        src={condition.imageUrl}
                                        alt={condition.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <CardHeader className="p-8">
                                    <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{condition.name}</CardTitle>
                                    <CardDescription className="pt-3 text-base leading-relaxed line-clamp-2">{condition.description}</CardDescription>
                                </CardHeader>
                                <div className="px-8 pb-8 mt-auto">
                                    <Link href={`/services/${service.slug}/conditions/${condition.slug}`} className="inline-flex items-center gap-2 font-black text-primary text-xs uppercase tracking-widest hover:gap-4 transition-all">
                                        Explore Protocol <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <LocalizedFaqSection geo={null} title={`${service.name} Support & FAQs`} />

            <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="container mx-auto px-4 max-w-4xl space-y-10 relative z-10">
                    <h2 className="font-headline text-4xl md:text-7xl font-bold uppercase">Restore Your Mobility</h2>
                    <p className="text-xl text-white/80 font-medium">Connect with our clinical coordinators to begin your specialized {service.name.toLowerCase()} journey.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                        <BookAppointmentButton size="lg" className="bg-white text-primary hover:bg-white/90 h-20 px-12 text-2xl font-black shadow-2xl" serviceSlug={serviceSlug}>
                            Book Expert Session
                        </BookAppointmentButton>
                        <Button size="lg" className="h-20 px-12 text-2xl font-black border-2 border-white text-white hover:bg-white/10 bg-transparent" onClick={() => openModal()}>
                            Request Consultation
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
