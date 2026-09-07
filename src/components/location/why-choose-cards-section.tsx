'use client';

import React from 'react';
import Image from 'next/image';
import {
    Home,
    Clock,
    ShieldCheck,
    Heart,
    Users,
    MapPin,
    Award,
    Star,
    HeartPulse,
    Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WhyChooseCardsSectionProps {
    locationName: string;
    cityName?: string;
    serviceName?: string;
    description?: string;
    landmark?: string;
    showTrustStrip?: boolean;
    className?: string;
}

export default function WhyChooseCardsSection({
    locationName,
    cityName,
    serviceName = 'Physiotherapy',
    description,
    landmark,
    showTrustStrip = true,
    className,
}: WhyChooseCardsSectionProps) {
    const displayCity = cityName || locationName;
    const defaultLandmark = landmark || (locationName.toLowerCase() === 'mumbai' ? 'Mumbai market' : `${locationName} center`);

    const defaultDescription = description ||
        `The residents of ${locationName} are part of a vibrant urban community that values health and proactive clinical recovery. Residents of ${locationName} often face challenges with common health management issues, mobility support, and lifestyle-related clinical needs. Aries PhysioCare brings hospital-grade clinical excellence near landmarks like ${defaultLandmark}.`;

    const cards = [
        {
            id: 'care-at-home',
            icon: Home,
            title: 'Care at Your Home',
            description: 'No travel, no waiting. Expert care at your doorstep.',
            image: '/images/why-choose/card1_care_at_home.jpg',
            imageAlt: `Care at Your Home - Aries PhysioCare in ${locationName}`,
        },
        {
            id: 'flexible-scheduling',
            icon: Clock,
            title: 'Flexible Scheduling',
            description: 'Choose convenient time slots, including evenings and weekends.',
            image: '/images/why-choose/card2_flexible_scheduling.jpg',
            imageAlt: `Flexible Scheduling - Aries PhysioCare in ${locationName}`,
        },
        {
            id: 'certified-experienced',
            icon: ShieldCheck,
            title: 'Certified & Experienced',
            description: 'Trained, verified physiotherapists with clinical expertise.',
            image: '/images/why-choose/card3_certified_experienced.jpg',
            imageAlt: `Certified and Experienced Physiotherapists in ${locationName}`,
        },
        {
            id: 'personalized-plans',
            icon: Heart,
            title: 'Personalized Treatment Plans',
            description: 'Designed around your goals, lifestyle and condition.',
            image: '/images/why-choose/card4_personalized_plans.jpg',
            imageAlt: `Personalized Treatment Plans - Aries PhysioCare`,
        },
        {
            id: 'better-mobility',
            icon: Users,
            title: 'Better Mobility, Brighter Tomorrow',
            description: 'Helping you move better, live healthier and stay independent.',
            image: '/images/why-choose/card5_better_mobility.jpg',
            imageAlt: `Better Mobility, Brighter Tomorrow - Aries PhysioCare`,
        },
        {
            id: 'local-expertise',
            icon: MapPin,
            title: `Local Expertise in ${locationName}`,
            description: `Familiar with ${locationName}'s lifestyle, communities and home care needs.`,
            image: '/images/why-choose/card6_local_expertise.jpg',
            imageAlt: `Serving Across ${locationName} - Aries PhysioCare`,
            badgeText: `Serving Across ${locationName.replace(/ (West|East|North|South|Central)$/i, '')}`,
        },
    ];

    return (
        <section className={cn('py-16 md:py-24 bg-background relative overflow-hidden', className)}>
            {/* Ambient Lighting & Silhouette Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/50 via-purple-50/20 to-transparent dark:from-purple-950/25 dark:via-transparent dark:to-transparent pointer-events-none" />
            
            {/* Edge Landmark Silhouettes (Visible on ultra-wide screens) */}
            <div className="hidden 2xl:block absolute left-0 top-1/2 -translate-y-1/2 opacity-25 dark:opacity-15 pointer-events-none w-20 h-auto">
                <Image
                    src="/images/why-choose/sealink-edge.png"
                    alt="Bandra-Worli Sea Link silhouette"
                    width={85}
                    height={480}
                    className="object-contain"
                />
            </div>
            <div className="hidden 2xl:block absolute right-0 top-1/2 -translate-y-1/2 opacity-25 dark:opacity-15 pointer-events-none w-20 h-auto">
                <Image
                    src="/images/why-choose/gateway-edge.png"
                    alt="Gateway of India silhouette"
                    width={80}
                    height={480}
                    className="object-contain"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* ── TOP FLOATING TRUST STATS STRIP ────────────────── */}
                {showTrustStrip && (
                    <div className="max-w-5xl mx-auto mb-16">
                        <div className="bg-white/90 dark:bg-[#130d24]/90 backdrop-blur-md rounded-2xl md:rounded-full border border-purple-100 dark:border-purple-900/40 p-3 sm:p-4 shadow-xl shadow-purple-500/5">
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-0 lg:divide-x lg:divide-purple-100 dark:lg:divide-purple-900/40 items-center">
                                {/* Stat 1 */}
                                <div className="flex items-center gap-3 px-3 py-1">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white leading-tight">1,000+</div>
                                        <div className="text-[11px] text-muted-foreground font-medium">Happy Patients</div>
                                    </div>
                                </div>

                                {/* Stat 2 */}
                                <div className="flex items-center gap-3 px-3 py-1">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white leading-tight">450+</div>
                                        <div className="text-[11px] text-muted-foreground font-medium">Certified Physiotherapists</div>
                                    </div>
                                </div>

                                {/* Stat 3 */}
                                <div className="flex items-center gap-3 px-3 py-1">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                                        <Star className="w-5 h-5 fill-purple-600 text-purple-600 dark:fill-purple-400 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white leading-tight">4.9/5</div>
                                        <div className="text-[11px] text-muted-foreground font-medium">Patient Rating</div>
                                    </div>
                                </div>

                                {/* Stat 4 */}
                                <div className="flex items-center gap-3 px-3 py-1">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white leading-tight">Same-Day</div>
                                        <div className="text-[11px] text-muted-foreground font-medium">Appointments Available</div>
                                    </div>
                                </div>

                                {/* Stat 5 / Motto */}
                                <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2.5 px-3 py-1">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                                        <HeartPulse className="w-5 h-5" />
                                    </div>
                                    <span className="font-script text-xl text-purple-700 dark:text-purple-300 font-bold whitespace-nowrap">
                                        Care Beyond Boundaries ♡
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── SECTION HEADER & SCRIPT BADGES ────────────────── */}
                <div className="relative max-w-4xl mx-auto text-center mb-14 space-y-4">
                    {/* Left Script Annotation */}
                    <div className="hidden lg:block absolute -left-36 top-6 -rotate-6 pointer-events-none select-none">
                        <span className="font-script text-2xl text-purple-700/90 dark:text-purple-300 font-bold tracking-wide">
                            “ Local Care<br />Lasting Recovery ♡
                        </span>
                    </div>

                    {/* Right Script Annotation */}
                    <div className="hidden lg:block absolute -right-36 top-6 rotate-6 pointer-events-none select-none">
                        <span className="font-script text-2xl text-purple-700/90 dark:text-purple-300 font-bold tracking-wide">
                            Healthier {displayCity}<br />Happier You ♡
                        </span>
                    </div>

                    {/* Tag badge */}
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-purple-100/90 dark:bg-purple-900/40 border border-purple-200/60 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-widest shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        WHY CHOOSE US
                    </div>

                    {/* Main Title */}
                    <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                        Why Choose{' '}
                        <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 dark:from-purple-400 dark:via-indigo-300 dark:to-purple-200 bg-clip-text text-transparent">
                            Home {serviceName} in {locationName}?
                        </span>
                    </h2>

                    {/* Description Paragraph */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mx-auto font-medium">
                        {defaultDescription}
                    </p>
                </div>

                {/* ── THE 6 CONTENT CARDS ───────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-5">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.id}
                                className="bg-white/95 dark:bg-[#130d24]/95 backdrop-blur-md rounded-3xl border border-purple-100 dark:border-purple-900/40 p-4 sm:p-5 flex flex-col justify-between shadow-lg shadow-purple-950/5 hover:shadow-2xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 transform hover:-translate-y-1 group"
                            >
                                {/* Top Content */}
                                <div className="text-center flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-purple-100/90 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center mb-3 shadow-xs group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white dark:group-hover:bg-purple-600 transition-all duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-extrabold text-[15px] sm:text-base text-gray-900 dark:text-white leading-snug group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-medium">
                                        {card.description}
                                    </p>
                                </div>

                                {/* Bottom Image Visual with Rounded Frame */}
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mt-4 border border-purple-100/70 dark:border-purple-800/40 shadow-xs bg-purple-50/50 dark:bg-purple-950/30">
                                    <Image
                                        src={card.image}
                                        alt={card.imageAlt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 16vw"
                                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Dynamic Pill Overlay for Card 6 */}
                                    {card.badgeText && (
                                        <div className="absolute bottom-2 inset-x-1 flex justify-center z-10 pointer-events-none">
                                            <div className="bg-white/95 dark:bg-[#130d24]/95 backdrop-blur-md px-2 py-0.5 rounded-full shadow-md border border-purple-100 dark:border-purple-800/40 text-[9px] sm:text-[10px] 2xl:text-[10.5px] font-bold text-gray-900 dark:text-white flex items-center gap-1 shadow-xs whitespace-nowrap tracking-tight">
                                                <MapPin className="w-3 h-3 text-purple-600 dark:text-purple-400 shrink-0" />
                                                <span>{card.badgeText}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
