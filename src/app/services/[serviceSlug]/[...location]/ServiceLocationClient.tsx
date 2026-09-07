'use client';
import React from 'react';
import {
    getServiceBySlug,
    getGeoPath,
    getLocalizedFaqs,
    getAreaSpecificContext
} from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import {
    CheckCircle2,
    ShieldCheck,
    MessageCircle,
    Award,
    Clock,
    Heart,
    Home,
    Star,
    Calendar,
    User,
    Mail,
    CalendarDays,
    ChevronDown,
    MapPin,
    FileText,
    Lock,
    Users,
    HeartPulse,
    ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
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
import { getTherapistsClient } from '@/lib/api';
import SchemaMarkup from '@/components/seo/schema-markup';
import WhyChooseCardsSection from '@/components/location/why-choose-cards-section';

const leadSchema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    phone: z.string().min(10, 'Valid 10-digit mobile number required'),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    age: z.string().optional().or(z.literal('')),
    gender: z.string().optional().or(z.literal('')),
    city: z.string().min(1, 'City is required'),
    condition: z.string().optional().or(z.literal('')),
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
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [therapists, setTherapists] = useState<any[]>([]);

    if (!service || !geoPath || !(geoPath.country || geoPath.state || geoPath.city || geoPath.area)) {
        return null;
    }

    const cityName = geoPath.city?.name || 'Mumbai';
    const areaName = geoPath.area?.name || cityName;
    const subAreaName = geoPath.subArea?.name || areaName;
    const capitalizedArea = capitalize(subAreaName);
    const capitalizedCity = capitalize(cityName);
    const stateName = geoPath.state?.name || 'Maharashtra';
    const capitalizedState = capitalize(stateName);
    const serviceName = service.name;

    // Display location string: e.g. "Mumbai, Maharashtra" or "Grant Road, Mumbai"
    const locationDisplay = subAreaName.toLowerCase() === cityName.toLowerCase()
        ? `${capitalizedCity}, ${capitalizedState}`
        : `${capitalizedArea}, ${capitalizedCity}`;

    const areaContext = getAreaSpecificContext(geoPath);
    const faqs = getLocalizedFaqs(geoPath, serviceSlug);

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            fullName: '',
            phone: '',
            email: '',
            age: '',
            gender: '',
            city: locationDisplay,
            condition: ''
        },
    });

    // Keep location synced with route params
    useEffect(() => {
        if (locationDisplay) {
            form.setValue('city', locationDisplay);
        }
    }, [locationDisplay, form]);

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

    const handleSendOtp = () => {
        const phoneVal = form.getValues('phone');
        if (!phoneVal || phoneVal.replace(/\D/g, '').length < 10) {
            toast({ variant: "destructive", title: "Phone Required", description: "Please enter a valid 10-digit mobile number first." });
            return;
        }
        setOtpSent(true);
        toast({ title: "OTP Sent", description: "Verification code sent to your number (use 1234 for testing)." });
    };

    const handleVerifyOtp = () => {
        if (otp.trim().length >= 4) {
            setIsVerified(true);
            toast({ title: "Mobile Verified", description: "You can now complete your home visit schedule." });
        } else {
            toast({ variant: "destructive", title: "Invalid Code", description: "Please enter a 4-digit verification code." });
        }
    };

    const onLeadSubmit = async (data: LeadFormValues) => {
        if (!isVerified) {
            if (!otpSent) {
                handleSendOtp();
            }
            toast({
                variant: "destructive",
                title: "OTP Verification Required",
                description: "Please verify your mobile number with the OTP code to confirm your appointment."
            });
            return;
        }

        setIsSubmitting(true);
        const result = await submitAppointmentLead(withStoredAttribution({
            fullName: data.fullName,
            phone: data.phone,
            email: data.email || `${data.phone.replace(/\D/g, '')}@lead.ariesxpert.com`,
            service: service.name,
            country: 'India',
            state: stateName,
            city: capitalizedCity,
            area: capitalizedArea,
            date: new Date(),
            time: 'Asap',
            address: `Lead from City/Area Page: ${locationDisplay}. Age: ${data.age || 'N/A'}, Gender: ${data.gender || 'N/A'}, Condition: ${data.condition || 'General'}`,
        }));

        if (result.success) {
            toast({
                title: "Home Visit Scheduled!",
                description: `Thank you, ${data.fullName}. An Aries senior specialist in ${capitalizedArea} will call you shortly.`
            });
            form.reset({
                fullName: '',
                phone: '',
                email: '',
                age: '',
                gender: '',
                city: locationDisplay,
                condition: ''
            });
            setIsVerified(false);
            setOtpSent(false);
            setOtp("");
        } else {
            toast({ variant: "destructive", title: "Error", description: result.error });
        }
        setIsSubmitting(false);
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

            {/* ══════════════════════════════════════════════════════════════
                HERO SECTION — REDESIGNED EXACTLY AS PER REFERENCE MOCKUP
                ══════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[88vh] lg:min-h-[85vh] flex flex-col justify-between pt-16 lg:pt-20 pb-4 lg:pb-5 overflow-hidden bg-[#faf8ff] dark:bg-[#0b0813]">
                
                {/* Background Clinical Hero Photography with Verified Aries Logo */}
                <div className="absolute inset-0 z-0 pointer-events-none select-none">
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/hero-city-recovery.jpg"
                            alt={`Professional Home ${serviceName} in ${capitalizedArea}, ${capitalizedCity} - Aries PhysioCare`}
                            fill
                            priority
                            className="object-cover object-[53%_center] lg:object-[54%_center] opacity-90 dark:opacity-35"
                            sizes="100vw"
                        />
                        {/* Soft white/lavender side gradient on left for crystal-clear readability */}
                        <div className="absolute inset-y-0 left-0 w-full lg:w-[54%] bg-gradient-to-r from-[#faf8ff] via-[#faf8ff]/95 lg:via-[#faf8ff]/85 to-transparent dark:from-[#0b0813] dark:via-[#0b0813]/95 lg:dark:via-[#0b0813]/85" />
                        
                        {/* Subtle bottom fade into stats bar */}
                        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#faf8ff] via-[#faf8ff]/80 to-transparent dark:from-[#0b0813] dark:via-[#0b0813]/80" />
                    </div>
                </div>

                <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 flex-1 flex flex-col justify-center">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">
                        
                        {/* ── LEFT COLUMN: HERO CONTENT ────────────────────── */}
                        <div className="lg:col-span-6 xl:col-span-6 space-y-4 lg:space-y-5 animate-reveal-up">
                            
                            {/* Top Badge: Professional Care At Your Doorstep */}
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/95 dark:bg-purple-950/80 border border-purple-200/90 dark:border-purple-800/80 text-primary dark:text-purple-300 text-[11px] font-bold uppercase tracking-wider shadow-sm">
                                <Home className="w-3.5 h-3.5 text-primary dark:text-purple-400" />
                                <span>Professional Care At Your Doorstep</span>
                            </div>

                            {/* Main Headline */}
                            <div className="space-y-1">
                                <h1 className="font-headline text-4xl sm:text-5xl lg:text-[3.85rem] xl:text-[4.4rem] font-extrabold tracking-tight leading-[1.05] text-slate-900 dark:text-white">
                                    Expert <br />
                                    <span className="bg-gradient-to-r from-[#6b21a8] via-[#7c3aed] to-[#8b5cf6] dark:from-purple-400 dark:via-purple-300 dark:to-indigo-400 bg-clip-text text-transparent">
                                        {serviceName}
                                    </span> <br />
                                    Care at{' '}
                                    <span className="font-serif italic font-normal text-[#c9832c] dark:text-[#f3ad52]">
                                        Home
                                    </span>
                                </h1>
                                {subAreaName.toLowerCase() !== cityName.toLowerCase() && (
                                    <p className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 tracking-normal pt-0.5">
                                        in <span className="underline decoration-primary/40 underline-offset-4">{capitalizedArea}</span>, {capitalizedCity}
                                    </p>
                                )}
                            </div>

                            {/* Subtitle */}
                            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl font-medium">
                                Recover faster with certified physiotherapists, advanced modalities, and personalized care — in the comfort of your home{subAreaName.toLowerCase() !== cityName.toLowerCase() ? ` in ${capitalizedArea}` : ` in ${capitalizedCity}`}.
                            </p>

                            {/* 4 Feature Icon Pills Row */}
                            <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-1 max-w-xl">
                                <div className="flex flex-col items-center text-center space-y-1">
                                    <div className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shadow-sm">
                                        <ShieldCheck className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                                        Verified & Certified Physiotherapists
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-1">
                                    <div className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shadow-sm">
                                        <Home className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                                        Care at Your Home
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-1">
                                    <div className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shadow-sm">
                                        <Heart className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                                        Personalized Recovery Plans
                                    </span>
                                </div>
                                <div className="flex flex-col items-center text-center space-y-1">
                                    <div className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shadow-sm">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-tight">
                                        Same-Day Appointments
                                    </span>
                                </div>
                            </div>

                            {/* Two CTAs */}
                            <div className="flex flex-wrap items-center gap-3.5 pt-1.5">
                                <Button
                                    size="lg"
                                    className="h-12 px-7 rounded-full bg-gradient-to-r from-purple-600 via-primary to-fuchsia-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-purple-600/25 flex items-center gap-2.5 transition-all active:scale-95"
                                    onClick={() => {
                                        const formEl = document.getElementById('quick-booking-card');
                                        if (formEl) {
                                            formEl.scrollIntoView({ behavior: 'smooth' });
                                            const nameInput = formEl.querySelector('input');
                                            if (nameInput) nameInput.focus();
                                        }
                                    }}
                                >
                                    <Calendar className="w-4 h-4" />
                                    <span>Book Home Visit</span>
                                    <ArrowRight className="w-4 h-4 ml-0.5" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-12 px-7 rounded-full bg-white dark:bg-card border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm flex items-center gap-2.5 transition-all"
                                    asChild
                                >
                                    <Link
                                        href={`https://wa.me/918591981880?text=Hi, I need home ${serviceName.toLowerCase()} in ${locationDisplay}. Please share details.`}
                                        target="_blank"
                                    >
                                        <MessageCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
                                        <span>WhatsApp Us</span>
                                    </Link>
                                </Button>
                            </div>

                            {/* Poetic Quotes & Handwriting Scripts */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 max-w-xl text-slate-600 dark:text-slate-400">
                                <div className="flex items-start gap-1.5 text-xs italic font-serif">
                                    <span className="text-xl leading-none text-primary/60 font-serif">&ldquo;</span>
                                    <span>Healing is a journey.<br />Let us walk it with you at home.</span>
                                </div>
                                <div className="font-script text-2xl sm:text-[1.65rem] text-[#7c3aed] dark:text-[#c084fc] font-bold -rotate-2 select-none">
                                    &ldquo;Movement Heals Lives ♡&rdquo;
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT COLUMN: QUICK BOOKING CARD & SOCIAL PROOF ── */}
                        <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-end justify-center animate-reveal-up stagger-2">
                            <div className="w-full max-w-md xl:max-w-lg">
                                
                                {/* Quick Booking Card */}
                                <Card id="quick-booking-card" className="bg-white/95 dark:bg-[#120d20]/95 backdrop-blur-xl border border-purple-100 dark:border-purple-900/40 rounded-[2rem] p-5 sm:p-6 shadow-2xl shadow-purple-900/10 relative overflow-hidden">
                                    
                                    {/* Card Header */}
                                    <div className="flex items-center gap-3 mb-3.5">
                                        <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                                            <Calendar className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-white">Quick Booking</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Schedule your home physiotherapy visit in just a few steps.</p>
                                        </div>
                                    </div>

                                    {/* Booking Form */}
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onLeadSubmit)} className="space-y-3">
                                            
                                            {/* Row 1: Full Name & Mobile */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                <FormField
                                                    control={form.control}
                                                    name="fullName"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-1">
                                                            <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name <span className="text-rose-500">*</span></FormLabel>
                                                            <div className="relative">
                                                                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                                <FormControl>
                                                                    <Input placeholder="e.g. Rahul Sharma" {...field} className="h-10 pl-9 rounded-xl bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)]" />
                                                                </FormControl>
                                                            </div>
                                                            <FormMessage className="text-[11px]" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="space-y-1">
                                                    <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                                                        <span>Mobile No. <span className="text-rose-500">*</span></span>
                                                        {isVerified && <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5"><CheckCircle2 className="w-3 h-3" /> Verified</span>}
                                                    </FormLabel>
                                                    <div className="flex gap-1.5">
                                                        <div className="relative flex-1">
                                                            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
                                                                <span>🇮🇳</span>
                                                                <span>+91</span>
                                                                <ChevronDown className="w-3 h-3 opacity-60" />
                                                            </div>
                                                            <FormField
                                                                control={form.control}
                                                                name="phone"
                                                                render={({ field }) => (
                                                                    <FormItem className="space-y-0">
                                                                        <FormControl>
                                                                            <Input
                                                                                placeholder="98765 43210"
                                                                                {...field}
                                                                                disabled={isVerified}
                                                                                className="h-10 pl-18 rounded-xl bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage className="text-[11px]" />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                        {!isVerified && (
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                className="h-10 px-3 text-xs font-bold rounded-xl border-purple-200 dark:border-purple-800 text-primary hover:bg-purple-50 shrink-0"
                                                                onClick={handleSendOtp}
                                                                disabled={isVerifying || !form.getValues('phone') || form.getValues('phone').length < 10}
                                                            >
                                                                {otpSent ? "Resend" : "Get OTP"}
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* OTP Code Box when OTP sent */}
                                            {otpSent && !isVerified && (
                                                <div className="p-3 bg-purple-50/90 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800/60 animate-in fade-in slide-in-from-top-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex-1 space-y-1">
                                                            <Label className="text-[11px] font-bold text-primary">Enter 4-Digit Verification OTP</Label>
                                                            <Input
                                                                placeholder="• • • •"
                                                                maxLength={4}
                                                                className="h-9 text-center tracking-[0.5em] font-black bg-white dark:bg-card border-purple-200"
                                                                value={otp}
                                                                onChange={(e) => setOtp(e.target.value)}
                                                            />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            className="h-9 px-4 rounded-xl bg-primary text-white font-bold text-xs mt-4"
                                                            onClick={handleVerifyOtp}
                                                            disabled={isVerifying || otp.length < 4}
                                                        >
                                                            Verify
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Row 2: Email, Age, Gender */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-0.5">
                                                            <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</FormLabel>
                                                            <div className="relative">
                                                                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                                <FormControl>
                                                                    <Input placeholder="e.g. rahul@gmail.com" {...field} className="h-9 pl-9 rounded-xl bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)]" />
                                                                </FormControl>
                                                            </div>
                                                            <FormMessage className="text-[11px]" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="age"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-0.5">
                                                            <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">Age</FormLabel>
                                                            <div className="relative">
                                                                <CalendarDays className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                                <FormControl>
                                                                    <Input type="number" placeholder="e.g. 45" {...field} className="h-9 pl-9 rounded-xl bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)]" />
                                                                </FormControl>
                                                            </div>
                                                            <FormMessage className="text-[11px]" />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="gender"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-0.5">
                                                            <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">Gender</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="h-9 rounded-xl bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                                                                        <SelectValue placeholder="Select" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    <SelectItem value="male">Male</SelectItem>
                                                                    <SelectItem value="female">Female</SelectItem>
                                                                    <SelectItem value="other">Other</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage className="text-[11px]" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Row 3: Location (Prefilled) */}
                                            <FormField
                                                control={form.control}
                                                name="city"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-0.5">
                                                        <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">Location</FormLabel>
                                                        <div className="relative">
                                                            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                                                            <FormControl>
                                                                <Input {...field} readOnly className="h-9 pl-9 rounded-xl bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.03)] cursor-default" />
                                                            </FormControl>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Row 4: Problem Description */}
                                            <FormField
                                                control={form.control}
                                                name="condition"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-0.5">
                                                        <FormLabel className="text-xs font-semibold text-slate-700 dark:text-slate-300">Problem Description</FormLabel>
                                                        <div className="relative">
                                                            <FileText className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                            <FormControl>
                                                                <Input placeholder="e.g. Lower Back Pain, Knee Rehab, Post-Surgery Care..." {...field} className="h-9 pl-9 rounded-xl bg-white dark:bg-card border-slate-200 dark:border-slate-800 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.03)]" />
                                                            </FormControl>
                                                        </div>
                                                        <FormMessage className="text-[11px]" />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Submit CTA */}
                                            <Button
                                                type="submit"
                                                className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 via-primary to-fuchsia-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-600/25 hover:opacity-95 flex items-center justify-center gap-2 mt-1 transition-all active:scale-98"
                                                disabled={isSubmitting}
                                            >
                                                <Calendar className="w-4 h-4" />
                                                <span>{isSubmitting ? "Scheduling..." : "Schedule Home Visit"}</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>

                                            {/* Security Disclaimer */}
                                            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                                                <span>Your information is secure and only used to arrange your home visit.</span>
                                            </div>
                                        </form>
                                    </Form>
                                </Card>

                                {/* Social Proof Below Card */}
                                <div className="flex items-center justify-between pt-2.5 px-2">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex -space-x-2">
                                            <Image src="/images/therapist_avatar_1.jpg" alt="Aries patient" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-card object-cover shadow-sm" />
                                            <Image src="/images/therapist_avatar_2.jpg" alt="Aries patient" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-card object-cover shadow-sm" />
                                            <Image src="/images/therapist_avatar_3.jpg" alt="Aries patient" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-card object-cover shadow-sm" />
                                            <Image src="/images/therapist_avatar_4.jpg" alt="Aries patient" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-card object-cover shadow-sm" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Trusted by 1,000+ patients in {capitalizedCity}</p>
                                            <div className="flex items-center gap-1 text-[11px] font-extrabold text-amber-500">
                                                <span>★★★★★</span>
                                                <span className="text-slate-900 dark:text-white font-black">4.9/5</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:block font-script text-xl sm:text-2xl text-[#7c3aed] dark:text-[#c084fc] font-bold -rotate-3 text-right select-none">
                                        A Healthier You,<br />Happier Tomorrow
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* ── BOTTOM STATS STRIP (MATCHING MOCKUP FLOATING PILL) ── */}
                    <div className="mt-4 lg:mt-5 relative z-20">
                        <div className="bg-white/95 dark:bg-[#120d20]/95 backdrop-blur-md rounded-2xl border border-purple-100 dark:border-purple-900/40 p-3.5 sm:p-4 shadow-xl shadow-purple-900/5 max-w-6xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5 items-center divide-y md:divide-y-0 md:divide-x divide-purple-100 dark:divide-purple-900/30">
                                
                                {/* Metric 1: Happy Patients */}
                                <div className="flex items-center gap-3 pt-1 md:pt-0">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                                        <Users className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">1,000+</div>
                                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Happy Patients</div>
                                    </div>
                                </div>

                                {/* Metric 2: Certified Physiotherapists */}
                                <div className="flex items-center gap-3 md:pl-5 pt-1 md:pt-0">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                                        <Award className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">450+</div>
                                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Certified Physiotherapists</div>
                                    </div>
                                </div>

                                {/* Metric 3: Patient Rating */}
                                <div className="flex items-center gap-3 md:pl-5 pt-1 md:pt-0">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                                        <Star className="w-5 h-5 text-primary fill-primary/25" />
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">4.9/5</div>
                                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Patient Rating</div>
                                    </div>
                                </div>

                                {/* Metric 4: Same-Day Appointments */}
                                <div className="flex items-center gap-3 md:pl-5 pt-1 md:pt-0">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-primary flex items-center justify-center shrink-0 shadow-sm">
                                        <Clock className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Same-Day</div>
                                        <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium">Appointments Available</div>
                                    </div>
                                </div>

                                {/* Metric 5: Care Beyond Boundaries */}
                                <div className="col-span-2 md:col-span-1 flex items-center justify-center gap-2.5 md:pl-5 pt-2 md:pt-0">
                                    <HeartPulse className="w-6 h-6 text-primary shrink-0" />
                                    <div className="font-script text-2xl sm:text-[1.7rem] text-[#7c3aed] dark:text-[#c084fc] font-bold select-none">
                                        Care Beyond Boundaries
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* REVIEWS SECTION */}
            <GoogleReviews locationName={capitalizedArea} className="bg-secondary/30" />

            {/* Why Choose Section & 6 Content Cards */}
            <WhyChooseCardsSection
                locationName={capitalizedArea}
                cityName={capitalizedCity}
                serviceName={serviceName}
                description={`${areaContext.lifestyle} Residents of ${capitalizedArea} often face challenges with ${areaContext.painPoints}. Aries PhysioCare brings hospital-grade clinical excellence near landmarks like ${areaContext.landmarks[0]}.`}
                landmark={areaContext.landmarks[0]}
                showTrustStrip={true}
            />

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
