'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Users,
    CheckCircle2,
    ArrowRight,
    ShieldCheck,
    Zap,
    Home,
    Heart,
    Award,
    Phone,
    MessageCircle,
    Activity,
    Smile,
    Clock,
    UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { services } from '@/lib/placeholder-data';
import BookAppointmentButton from '@/components/book-appointment-button';
import LocalizedFaqSection from '@/components/localized-faq-section';
import { useRequestCallback } from '@/components/request-callback-provider';

export default function CareTakerClient() {
    const service = services.find(s => s.slug === 'care-taker');
    const { openModal } = useRequestCallback();

    if (!service) return null;

    const WHATSAPP_URL = `https://wa.me/919136447006?text=Hi, I need information about Home Care Taker services.`;

    return (
        <div className="flex flex-col min-h-screen">
            {/* ── HERO SECTION ──────────────────────────────────────────── */}
            <section className="relative pt-24 pb-20 md:pt-40 md:pb-40 overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15)_0%,transparent_60%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.08)_0%,transparent_60%)]" />
                    <Image
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2000"
                        alt="Care Taker Hero"
                        fill
                        className="object-cover opacity-20 scale-110 animate-slow-zoom"
                        priority
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-[0.3em] backdrop-blur-md">
                            <Heart className="w-5 h-5 text-accent animate-pulse" /> Compassionate Home Support
                        </div>
                        <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
                            Trained <span className="text-accent underline decoration-accent/30 underline-offset-8">Care Takers</span> <br /> at Your Home
                        </h1>
                        <p className="text-xl md:text-3xl text-white/90 font-medium max-w-3xl mx-auto leading-relaxed">
                            Ensuring dignity, comfort, and safety for your loved ones with professional assistance for daily living.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                            <BookAppointmentButton size="lg" serviceSlug="care-taker" className="h-20 px-12 text-2xl font-black neon-accent-border shadow-accent/20 shadow-2xl">
                                Book a Care Taker
                            </BookAppointmentButton>
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-20 px-12 text-2xl font-black text-white border-white/40 hover:bg-white/10 bg-transparent glassmorphic"
                                onClick={() => openModal()}
                            >
                                <Phone className="mr-3 w-6 h-6" /> Talk to Expert
                            </Button>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 pt-12">
                            {[
                                { icon: ShieldCheck, text: "Vetted Staff" },
                                { icon: Clock, text: "12h/24h Shifts" },
                                { icon: UserCheck, text: "Personalized Care" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-white/70 font-bold uppercase tracking-widest text-[10px]">
                                    <item.icon className="w-4 h-4 text-accent" /> {item.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CORE VALUES SECTION ─────────────────────────────────── */}
            <section className="py-24 md:py-32 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto">
                        <div className="relative">
                            <div className="aspect-square rounded-[3.5rem] overflow-hidden soft-shadow border-8 border-primary/5 shadow-2xl relative group">
                                <Image
                                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
                                    alt="Compassionate Care"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent" />

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 glassmorphic p-8 rounded-3xl border border-white/20 shadow-2xl animate-bounce-subtle">
                                    <Smile className="w-12 h-12 text-primary" />
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">Dignified Living</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10">
                            <div className="space-y-4">
                                <div className="text-primary font-black uppercase tracking-[0.3em] text-xs">Our Commitment</div>
                                <h2 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">Care that feels like <span className="text-primary">Family.</span></h2>
                            </div>
                            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                We understand that inviting someone into your home is a matter of immense trust. Our Care Takers are not just service providers; they are <span className="text-foreground font-bold">compassionate companions</span> trained to support patients with physical limitations, ensuring a high quality of life.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: UserCheck, title: "Personalized Support", desc: "Tailored to your daily routine." },
                                    { icon: Smile, title: "Companionship", desc: "Emotional support and social interaction." },
                                    { icon: Zap, title: "Hygiene Assistance", desc: "Bathing, grooming, and dressing help." },
                                    { icon: Home, title: "Domestic Support", desc: "Ensuring a comfortable home environment." }
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

            {/* ── CARE PROGRAMS ────────────────────────────────────── */}
            <section className="py-24 md:py-32 bg-secondary/10 border-y relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <h2 className="font-headline text-4xl md:text-7xl font-bold tracking-tighter text-foreground">Supportive Protocols</h2>
                        <p className="text-xl text-muted-foreground font-medium">Focused assistance for different levels of mobility and health requirements.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
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
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-accent">Personal Care</div>
                                        <h3 className="text-2xl font-bold">{condition.name}</h3>
                                    </div>
                                </div>
                                <CardContent className="p-10 flex flex-col flex-grow">
                                    <p className="text-base text-muted-foreground leading-relaxed mb-8 flex-grow">
                                        {condition.description}
                                    </p>
                                    <div className="space-y-4 mb-8">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary">Core Activities</p>
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
                                        View Care Details <ArrowRight className="w-4 h-4 underline decoration-2 underline-offset-4" />
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TRUST & STANDARDS ────────────────────────────────────── */}
            <section className="py-24 md:py-40 bg-background overflow-hidden">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="glassmorphic rounded-[4rem] p-12 md:p-24 border-primary/10 shadow-3xl relative overflow-hidden bg-primary/5">
                        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
                            <Image
                                src="https://images.unsplash.com/photo-1516584224476-193798444f6f?auto=format&fit=crop&q=80&w=1200"
                                alt="Supportive Care"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                            <div className="space-y-10">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-[10px] font-black uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4" /> Trust & Verification
                                </div>
                                <h2 className="font-headline text-4xl md:text-6xl font-black leading-tight">Vetted Staff for <br /><span className="text-primary">Your Peace of Mind.</span></h2>
                                <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                    Safety is our top priority. Every Aries Care Taker undergoes a multi-stage background check and training program to ensure they can provide the highest standard of bedside care.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        "Verified identity and background checks.",
                                        "Comprehensive bedside manners training.",
                                        "Expert handling and mobility support skills.",
                                        "Regular performance monitoring by coordinators."
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-center">
                                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-accent" />
                                            </div>
                                            <span className="font-bold text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <BookAppointmentButton size="lg" serviceSlug="care-taker" className="h-16 px-10 text-xl font-black neon-accent-border shadow-2xl">
                                    Book a Consultation
                                </BookAppointmentButton>
                            </div>

                            <div className="hidden md:block">
                                <div className="relative aspect-square">
                                    <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse" />
                                    <div className="absolute inset-8 bg-accent/10 rounded-full animate-pulse delay-75" />
                                    <div className="absolute inset-16 bg-white border border-primary/10 rounded-full flex items-center justify-center p-12 text-center shadow-inner">
                                        <div className="space-y-4">
                                            <Users className="w-16 h-16 text-primary mx-auto" />
                                            <p className="text-2xl font-black text-primary uppercase tracking-widest leading-none">Standardized <br />Home Care</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <LocalizedFaqSection geo={null} title="Care Taker FAQs" />

            {/* ── FINAL CTA SECTION ──────────────────────────────────────── */}
            <section className="py-24 md:py-40 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl">
                    <h2 className="font-headline text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-none">
                        DIGNITY & COMFORT <br /> <span className="text-accent underline decoration-accent/30 underline-offset-8">FOR YOUR LOVED ONES</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-white/80 font-medium mb-12 max-w-3xl mx-auto">
                        Connect with the Aries clinical team today to secure compassionate help for your family.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <BookAppointmentButton size="lg" className="h-24 px-16 text-3xl font-black bg-white text-primary hover:bg-white/90 shadow-2xl transition-all hover:scale-105 active:scale-95">
                            Book Support Now
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
                        <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-accent" /> 12h/24h Shifts</span>
                        <span className="flex items-center gap-2"><Award className="w-5 h-5 text-accent" /> Trusted by 5000+ Families</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
