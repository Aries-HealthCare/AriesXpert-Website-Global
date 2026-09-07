'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Star, MapPin, Clock, Award, Phone, MessageCircle,
    ChevronRight, HeartPulse, Shield, Loader2, RefreshCw,
    CheckCircle2, Users, Search
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import { getOrganizationSchema, getBreadcrumbSchema } from '@/lib/seo-schemas';
import { useTherapists, type TherapistCard } from '@/hooks/use-therapists';
import { TherapistCard as TherapistCardComponent } from '@/components/therapist-grid';
import { VERIFIED_THERAPISTS_CATALOG } from '@/lib/verified-therapists';
import { cn } from '@/lib/utils';

const CITIES = ['All', 'Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad'];
const SPECS = ['All', 'Orthopedics', 'Neurology', 'Sports', 'Pediatrics', 'Geriatrics', "Women's Health", 'Pain Management'];

export default function TherapistsPageClient() {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSpec, setSelectedSpec] = useState('');
    const [searchQ, setSearchQ] = useState('');

    const { therapists: liveTherapists, isLoading, source, refetch } = useTherapists({
        city: selectedCity || undefined,
        specialization: selectedSpec || undefined,
        limit: 1000,
    });

    // Use live therapists if returned, or fallback to verified catalog
    const displayList = (liveTherapists && liveTherapists.length > 0) ? liveTherapists : VERIFIED_THERAPISTS_CATALOG;

    // Client-side search and category filter
    const filtered = displayList.filter(t => {
        if (selectedCity && selectedCity !== 'All') {
            const sc = selectedCity.toLowerCase();
            const tc = (t.city || '').toLowerCase();
            const matchCity = tc.includes(sc) || sc.includes(tc) || (sc.includes('bangalore') && tc.includes('bengaluru')) || (sc.includes('bengaluru') && tc.includes('bangalore'));
            if (!matchCity) return false;
        }
        if (selectedSpec && selectedSpec !== 'All') {
            const ss = selectedSpec.toLowerCase();
            const ts = (t.specialization || '').toLowerCase();
            const matchSpec = ts.includes(ss) || (t.services && t.services.some(s => s.toLowerCase().includes(ss)));
            if (!matchSpec) return false;
        }
        const q = searchQ.toLowerCase().trim();
        if (!q) return true;
        return (
            t.name.toLowerCase().includes(q) ||
            t.specialization.toLowerCase().includes(q) ||
            t.city.toLowerCase().includes(q) ||
            t.areas.some(a => a.toLowerCase().includes(q)) ||
            (t.services && t.services.some(s => s.toLowerCase().includes(q)))
        );
    });

    const jsonLd = [
        getOrganizationSchema(),
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Physiotherapists', url: '/physiotherapists' }]),
    ];

    return (
        <>
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            <div className="flex flex-col min-h-screen">

                {/* ── Hero ─────────────────────────────────────────────── */}
                <section className="relative pt-20 pb-12 md:pt-32 md:pb-24 overflow-hidden bg-primary">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1)_0%,transparent_60%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.05)_0%,transparent_60%)]" />
                    </div>
                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <nav className="flex items-center gap-2 text-white/60 text-xs mb-8" aria-label="Breadcrumb">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-white font-semibold">Our Physiotherapists</span>
                        </nav>
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                                <Shield className="w-4 h-4 text-accent" /> Verified Clinical Specialists
                            </div>
                            <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                                Meet Our Expert<br /><span className="text-accent">Physiotherapists</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Every Aries specialist is rigorously vetted, BPT/MPT certified, and registered with the state clinical council to deliver hospital-grade care at your home.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border">
                                    Book Home Visit Now
                                </BookAppointmentButton>
                                <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                                    <a href="tel:+919136447006" className="flex items-center gap-2">
                                        <Phone className="w-5 h-5" /> Speak to a Doctor
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Filters & Search ─────────────────────────────────── */}
                <section className="bg-background border-b border-border/40 py-6 sticky top-16 z-30 shadow-sm backdrop-blur-md bg-background/95">
                    <div className="container mx-auto px-4 md:px-6 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            {/* Search bar */}
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search doctor, condition, area..."
                                    value={searchQ}
                                    onChange={e => setSearchQ(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-border/60 bg-muted/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
                                />
                            </div>

                            {/* City Pills */}
                            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                                <span className="text-xs font-bold text-muted-foreground shrink-0 uppercase tracking-wider">City:</span>
                                {CITIES.map(c => {
                                    const val = c === 'All' ? '' : c;
                                    const isAct = selectedCity === val;
                                    return (
                                        <button
                                            key={c}
                                            onClick={() => setSelectedCity(val)}
                                            className={cn(
                                                "px-3 py-1 text-xs font-semibold rounded-full shrink-0 transition-all",
                                                isAct
                                                    ? "bg-primary text-primary-foreground shadow-sm"
                                                    : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {c}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Specialization Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                            <span className="text-xs font-bold text-muted-foreground shrink-0 uppercase tracking-wider">Specialty:</span>
                            {SPECS.map(s => {
                                const val = s === 'All' ? '' : s;
                                const isAct = selectedSpec === val;
                                return (
                                    <button
                                        key={s}
                                        onClick={() => setSelectedSpec(val)}
                                        className={cn(
                                            "px-3 py-1 text-xs font-semibold rounded-full shrink-0 transition-all",
                                            isAct
                                                ? "bg-accent text-accent-foreground shadow-sm font-bold"
                                                : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {s}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ── Practitioner Grid ─────────────────────────────────── */}
                <section className="py-12 md:py-20 bg-background flex-1">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                                    {selectedCity ? `Physiotherapists in ${selectedCity}` : 'All Verified Physiotherapists'}
                                    {selectedSpec ? ` · ${selectedSpec}` : ''}
                                </h2>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Showing {filtered.length} qualified specialists
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => refetch()}
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                                disabled={isLoading}
                            >
                                <RefreshCw className={cn("w-3.5 h-3.5", isLoading && "animate-spin")} />
                                Refresh
                            </Button>
                        </div>

                        {isLoading && filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 space-y-4">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <p className="text-sm text-muted-foreground">Loading verified doctors...</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="text-center py-24 space-y-4 max-w-md mx-auto">
                                <Users className="w-12 h-12 text-muted-foreground/30 mx-auto" />
                                <h3 className="text-lg font-bold">No Specialists Found</h3>
                                <p className="text-sm text-muted-foreground">
                                    No doctors currently match your filter in this area. You can still book a general assessment and our clinical team will assign a certified therapist.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => { setSelectedCity(''); setSelectedSpec(''); setSearchQ(''); }}
                                    className="text-xs font-bold"
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filtered.map((t, idx) => (
                                    <TherapistCardComponent key={t.id || idx} therapist={t} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}
