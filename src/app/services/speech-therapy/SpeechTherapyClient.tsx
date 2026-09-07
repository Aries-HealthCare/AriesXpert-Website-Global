'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Mic2,
    CheckCircle2,
    ArrowRight,
    ShieldCheck,
    Zap,
    Home,
    Users,
    Award,
    Phone,
    MessageCircle,
    BrainCircuit,
    HeartPulse,
    Volume2,
    Ear
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { services } from '@/lib/placeholder-data';
import BookAppointmentButton from '@/components/book-appointment-button';
import LocalizedFaqSection from '@/components/localized-faq-section';
import { useRequestCallback } from '@/components/request-callback-provider';

export default function SpeechTherapyClient() {
    const service = services.find(s => s.slug === 'speech-therapy');
    const { openModal } = useRequestCallback();

    if (!service) return null;

    const WHATSAPP_URL = `https://wa.me/919136447006?text=Hi, I need information about Home Speech Therapy services.`;

    return (
        <div className="flex flex-col min-h-screen">
            {/* ── HERO SECTION ──────────────────────────────────────────── */}
            <section className="relative pt-24 pb-20 md:pt-40 md:pb-40 overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
                    <Image
                        src="https://images.unsplash.com/photo-1543881062-8e1f5798aee8?auto=format&fit=crop&q=85&w=2400"
                        alt="Speech Therapy Hero"
                        fill
                        className="object-cover opacity-20 scale-110 animate-slow-zoom"
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md">
                            <Volume2 className="w-5 h-5 text-accent animate-pulse" /> The Power of Communication
                        </div>
                        <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                            Expert <span className="text-accent underline decoration-accent/30 underline-offset-8">Speech</span> <br /> Therapy at Home
                        </h1>
                        <p className="text-xl md:text-3xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed">
                            Certified speech-language pathologists delivering personalized recovery for speech, language, and swallow disorders.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <BookAppointmentButton size="lg" serviceSlug="speech-therapy" className="h-20 px-12 text-2xl font-black neon-accent-border shadow-accent/20 shadow-2xl">
                                Book Home Session
                            </BookAppointmentButton>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-20 px-12 text-2xl font-black text-white border-white/40 hover:bg-white/10 bg-transparent glassmorphic"
                                onClick={() => openModal()}
                            >
                                <Phone className="mr-3 w-6 h-6" /> Talk to Specialist
                            </Button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 pt-12">
                            {[
                                { icon: ShieldCheck, text: "Licensed Pathologists" },
                                { icon: Ear, text: "Hearing-Speech Sync" },
                                { icon: Award, text: "Clinical Excellence" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/70 font-bold uppercase tracking-widest text-[10px]">
                                    <item.icon className="w-4 h-4 text-accent" /> {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CLINICAL PHILOSOPHY SECTION ─────────────────────────────────── */}
            <section className="py-24 md:py-32 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center w-full mx-auto">
                        <div className="relative">
                            <div className="aspect-square rounded-[3.5rem] overflow-hidden soft-shadow border-8 border-primary/5 shadow-2xl relative group">
                                <Image
                                    src="https://images.unsplash.com/photo-1519238263530-990ffce6e4b8?auto=format&fit=crop&q=85&w=1600"
                                    alt="Understanding SLP"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 glassmorphic p-8 rounded-3xl border border-white/20 shadow-2xl animate-bounce-subtle">
                                    <Mic2 className="w-12 h-12 text-primary" />
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Voice & Connection</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <div className="text-primary font-black uppercase tracking-[0.3em] text-xs">Our Specialty</div>
                                <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">Restoring the <span className="text-primary">Human Voice.</span></h2>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                At Aries PhysioCare, we recognize that communication is the foundation of quality of life. Whether helping a child find their first words or an adult regain speech after a stroke, our specialized <span className="text-foreground font-bold">Speech-Language Pathologists</span> provide clinically proven therapies tailored to your unique biological needs.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: BrainCircuit, title: "Cognitive-Linguistic", desc: "Memory and attention for communication." },
                                    { icon: Volume2, title: "Voice Therapy", desc: "Expert care for vocal cord disorders." },
                                    { icon: Zap, title: "Articulation", desc: "Clearer pronunciation and speech flow." },
                                    { icon: Home, title: "Swallow Safely", desc: "Specialized dysphagia management." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-colors border border-transparent hover:border-primary/10">
                                        <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base mb-1">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground font-medium">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SPEECH PROGRAMS ────────────────────────────────────── */}
            <section className="py-24 md:py-32 bg-secondary/10 border-y relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <h2 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter text-foreground">Clinical Protocols</h2>
                        <p className="text-xl text-muted-foreground font-medium">Explore our specialized SLP programs designed for diverse neurodevelopmental and adult rehab needs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full mx-auto">
                        {service.conditions.map((condition) => (
                            <Card key={condition.id} className="group glassmorphic flex flex-col hover:neon-primary-border transition-all duration-500 rounded-[3rem] overflow-hidden border-primary/5 shadow-xl">
                                <div className="relative aspect-[16/10] w-full overflow-hidden">
                                    <Image
                                        src={condition.imageUrl}
                                        alt={condition.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute bottom-6 left-8 right-8 text-white">
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-accent">Clinical Care</div>
                                        <h3 className="text-2xl font-bold">{condition.name}</h3>
                                    </div>
                                </div>
                                <CardContent className="p-10 flex flex-col flex-grow">
                                    <p className="text-base text-muted-foreground leading-relaxed mb-8 flex-grow">
                                        {condition.description}
                                    </p>
                                    <div className="space-y-4 mb-8">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Core Clinical Goals</p>
                                        {condition.benefits.slice(0, 3).map((benefit, bIdx) => (
                                            <div key={bIdx} className="flex items-center gap-3 text-sm font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                {benefit}
                                            </div>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/services/${service.slug}/conditions/${condition.slug}`}
                                        className="inline-flex items-center gap-2 font-black text-primary text-xs uppercase tracking-[0.3em] hover:gap-4 transition-all"
                                    >
                                        View Clinical Details <ArrowRight className="w-4 h-4 underline decoration-2 underline-offset-4" />
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SWALLOWING SAFETY SECTION ─────────────────────────── */}
            <section className="py-24 md:py-40 bg-background overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="glassmorphic rounded-[4rem] p-12 md:p-24 border-primary/10 shadow-3xl relative overflow-hidden bg-primary/5">
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                            <Image
                                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
                                alt="Swallow Rehab"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                            <div className="space-y-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest text-white">
                                    <HeartPulse className="w-4 h-4" /> Dysphagia Specialized Care
                                </div>
                                <h2 className="font-headline text-4xl md:text-6xl font-black leading-tight">Safety in Every <br /><span className="text-primary">Swallow.</span></h2>
                                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                    Swallowing disorders (Dysphagia) can be life-threatening. Our experts provide vital home-based assessments and therapeutic maneuvers to prevent aspiration and ensure you eat and drink with safety and dignity.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        "Oral-motor strengthening exercises.",
                                        "Aspiration risk assessment and prevention.",
                                        "Texture modification and dietary mapping.",
                                        "Mendelsohn and Masako clinical maneuvers."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-center">
                                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                            </div>
                                            <span className="font-bold text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <BookAppointmentButton size="lg" serviceSlug="speech-therapy" className="h-16 px-10 text-xl font-black neon-accent-border shadow-2xl">
                                    Request Swallow Audit
                                </BookAppointmentButton>
                            </div>

                            <div className="hidden md:block">
                                <div className="relative aspect-square">
                                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                                    <div className="absolute inset-8 bg-accent/10 rounded-full animate-pulse delay-75" />
                                    <div className="absolute inset-16 bg-white border border-primary/10 rounded-full flex items-center justify-center p-12 text-center shadow-inner">
                                        <div className="space-y-4">
                                            <Mic2 className="w-16 h-16 text-primary mx-auto" />
                                            <p className="text-2xl font-black text-primary uppercase tracking-widest leading-none">Clinically <br />Structured</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LocalizedFaqSection geo={null} title="Speech Therapy FAQs" />

            {/* ── FINAL CTA SECTION ──────────────────────────────────────── */}
            <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl">
                    <h2 className="font-headline text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">
                        RECLAIM YOUR <br /> <span className="text-accent underline decoration-accent/30 underline-offset-8">VOICE TODAY</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-3xl mx-auto">
                        Connect with the Aries clinical team to match with the ideal speech-language pathologist for your recovery.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <BookAppointmentButton size="lg" className="h-24 px-16 text-3xl font-black bg-white text-primary hover:bg-white/90 shadow-2xl transition-all hover:scale-105 active:scale-95">
                            Book Session Now
                        </BookAppointmentButton>
                        <Button
                            asChild
                            size="lg"
                            className="h-24 px-16 text-3xl font-black border-4 border-white text-white hover:bg-white/10 bg-transparent glassmorphic transition-all hover:scale-105 active:scale-95"
                        >
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-4 w-8 h-8" /> WhatsApp Us
                            </a>
                        </Button>
                    </div>

                    <div className="mt-20 flex flex-wrap justify-center gap-12 text-white/40 font-black text-[10px] uppercase tracking-[0.4em]">
                        <span className="flex items-center gap-2"><Phone className="w-5 h-5 text-accent" /> +91 9136447006</span>
                        <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-accent" /> Certified SLPs</span>
                        <span className="flex items-center gap-2"><Zap className="w-5 h-5 text-accent" /> Neuro-focused Rehab</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
