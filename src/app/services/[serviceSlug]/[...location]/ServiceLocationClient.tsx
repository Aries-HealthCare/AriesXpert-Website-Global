'use client';
import React from 'react';
import {
    getServiceBySlug,
    getGeoPath,
    getLocalizedFaqs,
    getNearbyAreas,
    getAreaSpecificContext
} from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import {
    CheckCircle2,
    Phone,
    Zap,
    Loader2,
    ShieldCheck,
    MessageCircle,
    Award,
    Target,
    Gift,
    Video,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useRequestCallback } from '@/components/request-callback-provider';
import BookAppointmentButton from '@/components/book-appointment-button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitAppointmentLead } from '@/app/actions/lead-actions';
import { withStoredAttribution } from '@/lib/growth-attribution';
import LocalizedFaqSection from '@/components/localized-faq-section';
import GoogleReviews from '@/components/google-reviews';
import WhatWeTreat from '@/components/landing/what-we-treat';
import FreeConsultationBlock from '@/components/landing/free-consultation-block';
import VettedExperts from '@/components/landing/vetted-experts';
import { Label } from '@/components/ui/label';
import { getTherapistsClient, createVisit } from '@/lib/api';
import SchemaMarkup from '@/components/seo/schema-markup';

const leadSchema = z.object({
    fullName: z.string().min(1, 'Name is required'),
    age: z.string().min(1, 'Age is required'),
    gender: z.string().min(1, 'Gender is required'),
    city: z.string().min(1, 'City is required'),
    phone: z.string().min(10, 'Valid phone required'),
    condition: z.string().min(1, 'Please specify your condition'),
});

type LeadFormValues = z.infer<typeof leadSchema>;

function capitalize(str: string) {
    if (!str) return '';
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

interface ServiceLocationClientProps {
    serviceSlug: string;
    location: string[];
}

export default function ServiceLocationClient({ serviceSlug, location }: ServiceLocationClientProps) {
    const service = getServiceBySlug(serviceSlug);
    const geoPath = getGeoPath(location);
    const { openModal } = useRequestCallback();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [therapists, setTherapists] = useState<any[]>([]);
    const [bookingTherapistId, setBookingTherapistId] = useState<string | null>(null);

    if (!service || !geoPath || !(geoPath.country || geoPath.state || geoPath.city || geoPath.area)) {
        return null;
    }

    const cityName = geoPath.city?.name || 'Mumbai';
    const areaName = geoPath.area?.name || cityName;
    const subAreaName = geoPath.subArea?.name || areaName;
    const capitalizedArea = capitalize(subAreaName);
    const capitalizedCity = capitalize(cityName);
    const serviceName = service.name;

    const areaContext = getAreaSpecificContext(geoPath);
    const faqs = getLocalizedFaqs(geoPath, serviceSlug);

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: { fullName: '', age: '', gender: '', city: `${capitalizedArea}, ${capitalizedCity}`, phone: '', condition: '' },
    });

    const roleMap: Record<string, string> = {
        physiotherapy: 'physiotherapy',
        'occupational-therapy': 'occupational_therapy',
        'speech-therapy': 'speech_therapy',
        nursing: 'nursing',
    };
    const spec = roleMap[serviceSlug] || 'physiotherapy';

    useEffect(() => {
        (async () => {
            try {
                const res = await getTherapistsClient({ specialization: spec, city: capitalizedCity });
                const list = res.therapists ?? (Array.isArray(res) ? res : []);
                setTherapists(list);
            } catch {
                setTherapists([]);
            }
        })();
    }, [spec, capitalizedCity]);

    const onLeadSubmit = async (data: any) => {
        if (!isVerified) {
            toast({ variant: "destructive", title: "Verification Required", description: "Please verify your number via OTP first." });
            return;
        }
        setIsSubmitting(true);
        const result = await submitAppointmentLead(withStoredAttribution({
            ...data,
            service: service.name,
            country: 'India',
            state: geoPath.state?.name || '',
            city: data.city,
            area: geoPath.area?.name || 'Local',
            date: new Date(),
            time: 'Asap',
            address: `Lead from Local SEO: ${subAreaName}`,
            email: data.email || `${data.phone.replace(/\D/g, '')}@lead.ariesxpert.com`,
        }));

        if (result.success) {
            toast({ title: "Enquiry Received", description: `A specialist will call you shortly.` });
            form.reset();
            setIsVerified(false);
            setOtpSent(false);
            setOtp("");
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
        setIsSubmitting(false);
    };

    const handleSendOtp = () => {
        setOtpSent(true);
        toast({ title: "OTP Sent", description: "Verification code sent." });
    };

    const handleVerifyOtp = () => {
        setIsVerified(true);
        toast({ title: "Verified", description: "Ready to book." });
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
    };

    return (
        <div className="flex flex-col min-h-screen">
            <SchemaMarkup data={faqSchema} />
            {/* HERO SECTION */}
            <section className="relative min-h-[80vh] flex items-center pt-24 pb-16 overflow-hidden bg-background">
                <div className="absolute inset-0 z-0 opacity-5">
                    <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=2400" alt={`Home ${serviceName} in ${capitalizedArea}`} fill className="object-cover" priority />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-reveal-up">
                            <div className="flex flex-wrap gap-2">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                                    <ShieldCheck className="w-3.5 h-3.5" /> 1000+ Sessions in {capitalizedCity}
                                </div>
                                <Link href="/free-tele-consultation" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-widest animate-pulse">
                                    <Video className="w-3 h-3" /> Free Live Consultation
                                </Link>
                            </div>
                            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
                                Home <span className="text-primary">{serviceName}</span> <br />in <span className="underline decoration-accent/50 underline-offset-8">{capitalizedArea}</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                                Professional clinical excellence at your doorstep. Get <span className="text-foreground font-bold">expert {serviceName} specialists</span> and advanced modalities in {capitalizedArea}, {capitalizedCity}.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button size="lg" className="h-16 px-10 text-xl font-bold neon-accent-border shadow-2xl" asChild>
                                    <a href="tel:+919136447006"><Phone className="mr-3 w-6 h-6" /> Call Specialist</a>
                                </Button>
                                <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold glassmorphic" asChild>
                                    <Link href={`https://wa.me/919136447006?text=Hi, I need home ${serviceName.toLowerCase()} in ${capitalizedArea}`} target="_blank">
                                        <MessageCircle className="mr-3 w-6 h-6 text-green-500" /> WhatsApp
                                    </Link>
                                </Button>
                            </div>
                            <p className="text-xs font-black text-primary flex items-center gap-2 uppercase tracking-widest">
                                <Zap className="w-4 h-4 fill-primary" /> Same-day Visit Available in {capitalizedArea}
                            </p>
                        </div>

                        <div className="animate-reveal-up stagger-2">
                            <Card className="glassmorphic border-primary/10 shadow-2xl relative overflow-hidden rounded-[2.5rem]">
                                <div className="bg-primary/[0.02] p-8 md:p-10">
                                    <div className="mb-8 text-center">
                                        <h3 className="font-headline text-2xl font-bold">Quick Booking</h3>
                                        <p className="text-xs font-black text-primary uppercase tracking-[0.3em] mt-1 drop-shadow-sm">Registry: 2026 Active Intake</p>
                                    </div>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onLeadSubmit)} className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Full Name</FormLabel><FormControl><Input placeholder="Name" {...field} className="h-12 bg-background/40" /></FormControl><FormMessage /></FormItem>)} />
                                                <div className="flex gap-2 items-end">
                                                    <div className="flex-1">
                                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-[10px] font-black uppercase tracking-widest">Mobile No.</FormLabel>
                                                                <FormControl><Input placeholder="+91" {...field} className="h-12 bg-background/40" disabled={isVerified} /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                    </div>
                                                    {!isVerified && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="h-12 px-4 font-bold text-[10px] uppercase border-primary/10 hover:bg-primary/5"
                                                            onClick={handleSendOtp}
                                                            disabled={isVerifying || !form.getValues('phone')}
                                                        >
                                                            {otpSent ? "Resend" : "Get OTP"}
                                                        </Button>
                                                    )}
                                                    {isVerified && <div className="h-12 flex items-center text-green-500 gap-1 px-2 font-black text-[9px] uppercase tracking-widest"><CheckCircle2 className="w-4 h-4" /> Verified</div>}
                                                </div>
                                            </div>
                                            {otpSent && !isVerified && (
                                                <div className="p-5 bg-primary/5 rounded-2xl border border-primary/10 animate-reveal-up">
                                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                                        <div className="flex-1 w-full space-y-2">
                                                            <Label className="text-[9px] font-black uppercase tracking-widest">Enter Code</Label>
                                                            <Input placeholder="0000" maxLength={4} className="h-12 bg-background/60 text-center font-black" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                                        </div>
                                                        <Button type="button" className="h-12 px-6 font-black uppercase text-[10px] w-full sm:w-auto" onClick={handleVerifyOtp} disabled={isVerifying || otp.length < 4}>Verify</Button>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="grid grid-cols-2 gap-5">
                                                <FormField control={form.control} name="age" render={({ field }) => (<FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Age</FormLabel><FormControl><Input type="number" placeholder="45" {...field} className="h-12 bg-background/40" /></FormControl><FormMessage /></FormItem>)} />
                                                <FormField control={form.control} name="gender" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest">Gender</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl><SelectTrigger className="h-12 bg-background/40"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                                            <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem></SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name="city" render={({ field }) => (
                                                <FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Registry Hub</FormLabel><FormControl><Input {...field} className="h-12 bg-background/40" readOnly /></FormControl></FormItem>
                                            )} />
                                            <FormField control={form.control} name="condition" render={({ field }) => (<FormItem><FormLabel className="text-[10px] font-black uppercase tracking-widest">Problem Description</FormLabel><FormControl><Input placeholder="e.g. Lower Back Pain" {...field} className="h-12 bg-background/40" /></FormControl><FormMessage /></FormItem>)} />
                                            <Button type="submit" className="w-full h-16 text-xl font-black neon-accent-border mt-4" disabled={isSubmitting || !isVerified}>
                                                {isSubmitting ? "Finalizing..." : "Schedule Home Visit"}
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* REVIEWS SECTION */}
            <GoogleReviews locationName={capitalizedArea} className="bg-secondary/30" />

            {/* Why Choose Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 text-center mb-16 space-y-6">
                    <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Why Choose Home {serviceName} in {capitalizedArea}?</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed font-medium max-w-4xl mx-auto">
                        {areaContext.lifestyle} Residents of {capitalizedArea} often face challenges with {areaContext.painPoints}. Aries PhysioCare brings hospital-grade clinical excellence near landmarks like {areaContext.landmarks[0]}.
                    </p>
                </div>
            </section>

            {/* VETTED EXPERTS FOR AREA */}
            <VettedExperts 
                locationName={capitalizedArea} 
                state={geoPath.state?.name}
                city={capitalizedCity} 
                area={capitalizedArea} 
                specialization={spec} 
                className="py-16 md:py-20" 
            />

            {/* MASTER TREATMENT BLOCK */}
            <WhatWeTreat />

            {/* FREE TELE-HEALTH CTA SECTION */}
            <FreeConsultationBlock />

            {/* FAQ Section */}
            <LocalizedFaqSection geo={geoPath} title={`Clinical FAQs in ${capitalizedArea}`} className="bg-secondary/30" />
        </div>
    );
}
