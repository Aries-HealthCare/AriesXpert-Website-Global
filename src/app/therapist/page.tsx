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

export default function TherapistsPage() {
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
        getBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Our Therapists', url: '/therapist' }]),
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
                            <span className="text-white font-semibold">Our Therapists</span>
                        </nav>
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                                <Shield className="w-4 h-4 text-accent" /> 474+ Verified Specialists
                            </div>
                            <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                                Meet Our Expert<br /><span className="text-accent">Physiotherapists</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                                Every Aries therapist is rigorously vetted, BPT/MPT certified, and trained to deliver hospital-grade care at your home.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border">
                                    Book Home Visit Now
                                </BookAppointmentButton>
                                <Button asChild size="lg" variant="outline" className="h-14 px-10 text-base font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                                    <a href="tel:+919136447006" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Call +91 9136447006
                                    </a>
                                </Button>
                            </div>
                            <div className="grid grid-cols-3 gap-6 pt-4 max-w-xl mx-auto">
                                {[{ label: 'Expert Therapists', value: '450+' }, { label: 'Cities Covered', value: '9+' }, { label: 'Happy Patients', value: '50,000+' }].map((s, i) => (
                                    <div key={i} className="text-center">
                                        <div className="text-2xl md:text-3xl font-black text-accent">{s.value}</div>
                                        <div className="text-white/70 text-xs font-medium mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Trust Strip ──────────────────────────────────────── */}
                <section className="py-8 bg-secondary/30 border-b">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Shield, title: 'BPT/MPT Certified', desc: 'Recognised physiotherapy degrees' },
                                { icon: Award, title: 'Multi-stage Vetting', desc: 'Clinical competency screening' },
                                { icon: HeartPulse, title: 'Advanced Equipment', desc: 'Portable IFT, Laser, Ultrasound' },
                                { icon: Clock, title: 'Punctual & Reliable', desc: 'On-time with real-time tracking' },
                            ].map((f, i) => (
                                <div key={i} className="flex flex-col items-center text-center gap-2 p-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                        <f.icon className="w-5 h-5" />
                                    </div>
                                    <div className="font-bold text-sm">{f.title}</div>
                                    <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Filters & Grid ───────────────────────────────────── */}
                <section className="py-16 md:py-20 bg-background">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-10">
                            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-3">
                                Find the Right <span className="text-primary">Specialist</span>
                            </h2>
                            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                                Filter by city or specialization. All therapists are live-synced from our therapist management system.
                            </p>
                        </div>

                        {/* Filter row */}
                        <div className="flex flex-wrap md:flex-nowrap gap-3 mb-10 justify-center items-center overflow-x-auto pb-4 no-scrollbar">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search name, area, specialty…"
                                    value={searchQ}
                                    onChange={e => setSearchQ(e.target.value)}
                                    className="pl-9 pr-4 h-11 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 w-[240px] sm:w-64"
                                />
                            </div>

                            {/* City filter */}
                            <select
                                value={selectedCity}
                                onChange={e => setSelectedCity(e.target.value === 'All' ? '' : e.target.value)}
                                className="h-11 px-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[120px]"
                            >
                                {CITIES.map(c => <option key={c} value={c === 'All' ? '' : c}>{c === 'All' ? 'All Cities' : c}</option>)}
                            </select>

                            {/* Specialization filter */}
                            <select
                                value={selectedSpec}
                                onChange={e => setSelectedSpec(e.target.value === 'All' ? '' : e.target.value)}
                                className="h-11 px-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-w-[140px]"
                            >
                                {SPECS.map(s => <option key={s} value={s === 'All' ? '' : s}>{s === 'All' ? 'All Specializations' : s}</option>)}
                            </select>

                            {/* Refresh */}
                            <Button variant="outline" size="sm" className="h-11 gap-2 font-semibold shadow-sm px-5" onClick={refetch}>
                                <RefreshCw className="w-4 h-4" /> Refresh
                            </Button>
                        </div>

                        {/* Status bar */}
                        <div className="flex items-center justify-between mb-6 text-sm">
                            <span className="text-muted-foreground">
                                {isLoading ? 'Loading…' : `Showing ${filtered.length} specialist${filtered.length !== 1 ? 's' : ''}`}
                                <span className="ml-2 text-green-500 text-xs font-semibold">● Verified Directory</span>
                            </span>
                        </div>

                        {/* Grid */}
                        {isLoading && filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                <p className="text-muted-foreground text-sm">Loading specialists from directory…</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filtered.map(t => (
                                    <TherapistCardComponent key={t.id || t.slug} therapist={t} />
                                ))}
                            </div>
                        )}

                        {filtered.length === 0 && !isLoading && (
                            <div className="text-center py-16">
                                <p className="text-muted-foreground mb-4">
                                    No specialists found matching your filters.
                                </p>
                                <Button variant="outline" onClick={() => { setSelectedCity(''); setSelectedSpec(''); setSearchQ(''); }}>
                                    Clear Filters
                                </Button>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="text-center mt-12">
                            <p className="text-muted-foreground mb-4 text-sm">
                                {filtered.length > 0
                                    ? `Showing ${filtered.length} active specialists. Call us to find the perfect match.`
                                    : 'Call us and our clinical coordinators will match you with the right specialist directly.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button asChild size="lg" className="h-12 px-8 font-bold">
                                    <a href="tel:+919136447006" className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" /> Call +91 9136447006
                                    </a>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="h-12 px-8 font-bold">
                                    <a href="https://wa.me/918591981880" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4" /> WhatsApp Us
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Join as Therapist CTA ────────────────────────────── */}
                <section className="py-16 bg-primary/5 border-t">
                    <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Users className="w-5 h-5 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Are You a Physiotherapist?</span>
                        </div>
                        <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4">Join the Aries PhysioCare Network</h2>
                        <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                            Be part of India's fastest-growing home healthcare network. Get consistent bookings, flexible timing, and a premium brand behind you.
                        </p>
                        <Button asChild size="lg" className="h-12 px-8 font-bold">
                            <Link href="/work-with-us/for-physiotherapists">Apply as a Therapist</Link>
                        </Button>
                    </div>
                </section>
            </div>
        </>
    );
}
