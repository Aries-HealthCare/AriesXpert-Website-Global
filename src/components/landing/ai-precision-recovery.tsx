'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRequestCallback } from '@/components/request-callback-provider';
import {
  Search,
  FileText,
  Activity,
  ChevronsUp,
  Brain,
  BarChart3,
  User,
  Check,
  Eye,
  Video,
  Headphones,
  Calendar,
  ShieldCheck,
  Star,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = [
  {
    stageNumber: '01',
    stageLabel: 'STAGE 01',
    title: 'Assess',
    subtitle: 'BIOMECHANICAL SCREENING',
    description:
      'Proprietary algorithms analyze symptom patterns and biomechanical data to identify the precise source of dysfunction.',
    bullets: [
      'Posture & Movement Analysis',
      'Pain Pattern Mapping',
      'Functional Assessment',
    ],
    theme: {
      text: 'text-purple-600 dark:text-purple-400',
      badgeBg: 'bg-purple-100 dark:bg-purple-950/60',
      border: 'border-purple-200/70 dark:border-purple-900/40',
      cardBg:
        'bg-gradient-to-br from-white via-purple-50/40 to-purple-100/30 dark:from-card dark:via-purple-950/20 dark:to-card',
      watermark: 'text-purple-400/20 dark:text-purple-400/10',
      checkBg: 'bg-purple-600 text-white',
    },
    icon: Search,
    image: '/images/precision-recovery/stage1-assess.webp',
  },
  {
    stageNumber: '02',
    stageLabel: 'STAGE 02',
    title: 'Plan',
    subtitle: 'DYNAMIC ROADMAPS',
    description:
      'AI-generated clinical protocols tailored to your specific condition, age, and mobility goals for optimal outcomes.',
    bullets: [
      'Personalized Treatment Plan',
      'Goal-Oriented Roadmap',
      'Expert Review & Validation',
    ],
    theme: {
      text: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-100 dark:bg-amber-950/60',
      border: 'border-amber-200/70 dark:border-amber-900/40',
      cardBg:
        'bg-gradient-to-br from-white via-amber-50/40 to-amber-100/30 dark:from-card dark:via-amber-950/20 dark:to-card',
      watermark: 'text-amber-400/20 dark:text-amber-400/10',
      checkBg: 'bg-amber-600 text-white',
    },
    icon: FileText,
    image: '/images/precision-recovery/stage2-plan.webp',
  },
  {
    stageNumber: '03',
    stageLabel: 'STAGE 03',
    title: 'Track',
    subtitle: 'REAL-TIME MONITORING',
    description:
      'Continuous monitoring of functional progress and biometric indicators, ensuring every session is evidence-based.',
    bullets: [
      'Track Progress',
      'Measure Improvements',
      'Data-Driven Adjustments',
    ],
    theme: {
      text: 'text-sky-600 dark:text-sky-400',
      badgeBg: 'bg-sky-100 dark:bg-sky-950/60',
      border: 'border-sky-200/70 dark:border-sky-900/40',
      cardBg:
        'bg-gradient-to-br from-white via-sky-50/40 to-sky-100/30 dark:from-card dark:via-sky-950/20 dark:to-card',
      watermark: 'text-sky-400/20 dark:text-sky-400/10',
      checkBg: 'bg-sky-600 text-white',
    },
    icon: Activity,
    image: '/images/precision-recovery/stage3-track.webp',
  },
  {
    stageNumber: '04',
    stageLabel: 'STAGE 04',
    title: 'Advance',
    subtitle: 'ADAPTIVE PROTOCOLS',
    description:
      'Intelligent adjustment of therapy intensity and techniques as you recover, pushing the limits of your performance.',
    bullets: [
      'Adaptive Therapy Plans',
      'Higher Functional Independence',
      'Long-Term Wellness Support',
    ],
    theme: {
      text: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950/60',
      border: 'border-emerald-200/70 dark:border-emerald-900/40',
      cardBg:
        'bg-gradient-to-br from-white via-emerald-50/40 to-emerald-100/30 dark:from-card dark:via-emerald-950/20 dark:to-card',
      watermark: 'text-emerald-400/20 dark:text-emerald-400/10',
      checkBg: 'bg-emerald-600 text-white',
    },
    icon: ChevronsUp,
    image: '/images/precision-recovery/stage4-advance.webp',
  },
];

export default function AiPrecisionRecovery() {
  const { openBookingModal } = useRequestCallback();

  return (
    <section className="py-12 md:py-18 relative overflow-hidden bg-background">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 space-y-10 md:space-y-14">
        {/* Top Header Section */}
        <div className="relative flex flex-col items-center text-center max-w-5xl mx-auto pt-2">
          {/* Top-Left Cursive Annotation */}
          <div className="hidden lg:block absolute left-0 top-0 -translate-y-2 pointer-events-none select-none">
            <span className="font-script text-2xl md:text-3xl text-purple-600 dark:text-purple-400 font-bold rotate-[-6deg] inline-block drop-shadow-sm leading-tight">
              Smarter Care <br /> Faster Recovery ♡
            </span>
          </div>

          {/* Top-Right Feature Stack */}
          <div className="hidden lg:flex flex-col gap-2 absolute right-0 top-0 items-start pointer-events-none select-none">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-card/90 border border-purple-100 dark:border-purple-900/40 shadow-xs text-xs font-semibold text-foreground">
              <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Brain className="w-3 h-3" />
              </div>
              <span>AI-Powered Insights</span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-card/90 border border-purple-100 dark:border-purple-900/40 shadow-xs text-xs font-semibold text-foreground">
              <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <BarChart3 className="w-3 h-3" />
              </div>
              <span>Evidence-Based Care</span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-card/90 border border-purple-100 dark:border-purple-900/40 shadow-xs text-xs font-semibold text-foreground">
              <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <User className="w-3 h-3" />
              </div>
              <span>Personalized for You</span>
            </div>
          </div>

          {/* Center Badge & Headlines */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-100/80 dark:bg-purple-950/50 border border-purple-200/80 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-[11px] font-extrabold uppercase tracking-[0.25em] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            Our Technology
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-3">
            Precision{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600">
              Recovery
            </span>{' '}
            Engine
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl font-light">
            Our proprietary clinical platform powers every stage of your recovery journey, delivering data-driven insights for elite-level functional restoration.
          </p>

          {/* Mobile Feature Stack */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 lg:hidden">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-semibold text-foreground">
              <Brain className="w-3 h-3 text-purple-600" /> AI Insights
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-semibold text-foreground">
              <BarChart3 className="w-3 h-3 text-purple-600" /> Evidence-Based
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/40 text-[11px] font-semibold text-foreground">
              <User className="w-3 h-3 text-purple-600" /> Personalized
            </span>
          </div>
        </div>

        {/* Row 1: 4 Stage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.stageNumber}
                className={cn(
                  'group relative flex flex-col justify-between rounded-2xl p-5 border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden min-h-[340px]',
                  stage.theme.border,
                  stage.theme.cardBg
                )}
              >
                {/* Watermark Number */}
                <span
                  className={cn(
                    'absolute top-2 right-4 text-5xl md:text-6xl font-black select-none pointer-events-none transition-transform duration-500 group-hover:scale-105',
                    stage.theme.watermark
                  )}
                >
                  {stage.stageNumber}
                </span>

                {/* Card Top Content */}
                <div className="relative z-10 space-y-3">
                  {/* Icon Box */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-xl flex items-center justify-center shadow-xs transition-transform duration-500 group-hover:scale-110',
                      stage.theme.badgeBg,
                      stage.theme.text
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Stage Label & Titles */}
                  <div className="space-y-0.5">
                    <div
                      className={cn(
                        'text-[10px] font-extrabold uppercase tracking-[0.2em]',
                        stage.theme.text
                      )}
                    >
                      {stage.stageLabel}
                    </div>
                    <h3 className="font-headline text-2xl font-bold tracking-tight text-foreground">
                      {stage.title}
                    </h3>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {stage.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground leading-relaxed font-light">
                    {stage.description}
                  </p>
                </div>

                {/* Card Bottom Content: Bullets on Left + 3D Visual on Right */}
                <div className="relative z-10 grid grid-cols-12 gap-2 items-end pt-3 mt-auto">
                  {/* Left: Bullets */}
                  <div className="col-span-7 space-y-1.5">
                    {stage.bullets.map((bullet, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 text-[11px] font-medium text-foreground/90 leading-tight"
                      >
                        <div
                          className={cn(
                            'w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-xs',
                            stage.theme.checkBg
                          )}
                        >
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Right: 3D Visual */}
                  <div className="col-span-5 relative -mr-3 -mb-3 h-28 sm:h-32 flex items-end justify-end pointer-events-none select-none">
                    <Image
                      src={stage.image}
                      alt={`${stage.title} Visual`}
                      width={180}
                      height={140}
                      className="object-contain object-bottom max-h-full w-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Two Large Featured Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {/* Featured Card 1: Experience Your Body-Map Insight */}
          <div className="group relative rounded-[2rem] p-6 sm:p-8 border border-purple-200/70 dark:border-purple-900/40 bg-gradient-to-br from-white via-purple-50/40 to-indigo-100/30 dark:from-card dark:via-purple-950/20 dark:to-card shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left Content */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xs">
                  <Sparkles className="w-3 h-3" /> AI-Powered Insights
                </div>

                <h3 className="font-headline text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  Experience Your <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                    Body-Map Insight
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                  Go beyond general symptom tracking. Our AI diagnostic tool creates a visual digital twin of your condition, allowing you to see exactly where recovery begins.
                </p>

                {/* 3 Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-card/80 border border-purple-100 dark:border-purple-900/40 text-[11px] font-medium text-foreground shadow-xs">
                    <Eye className="w-3 h-3 text-purple-600" />
                    Anatomical Visualization
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-card/80 border border-purple-100 dark:border-purple-900/40 text-[11px] font-medium text-foreground shadow-xs">
                    <BarChart3 className="w-3 h-3 text-purple-600" />
                    Clinical Insights
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-card/80 border border-purple-100 dark:border-purple-900/40 text-[11px] font-medium text-foreground shadow-xs">
                    <FileText className="w-3 h-3 text-purple-600" />
                    Personalized Report
                  </span>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 px-6 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <Link href="/ai-analysis" className="inline-flex items-center">
                      Launch AI Analysis <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Visual Image */}
              <div className="md:col-span-5 relative flex items-center justify-center min-h-[200px] sm:min-h-[240px] pointer-events-none select-none">
                <Image
                  src="/images/precision-recovery/bodymap-insight.webp"
                  alt="AI Body Map Insight"
                  width={320}
                  height={280}
                  className="object-contain max-h-[240px] sm:max-h-[270px] w-auto transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Featured Card 2: Free Live Online Consultation */}
          <div className="group relative rounded-[2rem] p-6 sm:p-8 border border-purple-200/70 dark:border-purple-900/40 bg-gradient-to-br from-white via-purple-50/40 to-indigo-100/30 dark:from-card dark:via-purple-950/20 dark:to-card shadow-md hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Right Script Note */}
            <div className="hidden sm:block absolute right-8 top-6 pointer-events-none select-none">
              <span className="font-script text-xl md:text-2xl text-purple-600 dark:text-purple-400 font-bold rotate-[4deg] inline-block leading-tight">
                Care Connects Heals ♡
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              {/* Left Content */}
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-200/80 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 text-[10px] font-bold uppercase tracking-[0.2em] shadow-xs">
                  <Video className="w-3 h-3" /> Expert Clinical Guidance
                </div>

                <h3 className="font-headline text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                  Free Live <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">
                    Online Consultation
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-light">
                  Book a free 30-minute online consultation and receive expert advice on your symptoms and recovery plan.
                </p>

                {/* 3 Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-card/80 border border-purple-100 dark:border-purple-900/40 text-[11px] font-medium text-foreground shadow-xs">
                    <Headphones className="w-3 h-3 text-purple-600" />
                    Talk to Experts from Anywhere
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-card/80 border border-purple-100 dark:border-purple-900/40 text-[11px] font-medium text-foreground shadow-xs">
                    <Calendar className="w-3 h-3 text-purple-600" />
                    Flexible Time Slots
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-card/80 border border-purple-100 dark:border-purple-900/40 text-[11px] font-medium text-foreground shadow-xs">
                    <ShieldCheck className="w-3 h-3 text-purple-600" />
                    Secure Video Consultation
                  </span>
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <Button
                    onClick={() =>
                      openBookingModal({
                        service: 'Free Live Online Consultation',
                        sourcePath: '/#free-consultation',
                      })
                    }
                    size="lg"
                    className="h-12 px-6 text-sm font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Video className="mr-2 w-4 h-4" /> Consult Online Now{' '}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Right Visual Image (Doctor with official Aries logo badge on uniform) */}
              <div className="md:col-span-5 relative flex items-center justify-center min-h-[200px] sm:min-h-[240px] pointer-events-none select-none">
                <Image
                  src="/images/precision-recovery/doctor-consultation.webp"
                  alt="Online Physiotherapy Doctor Consultation"
                  width={320}
                  height={280}
                  className="object-contain max-h-[240px] sm:max-h-[270px] w-auto transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Bottom Trust Metrics Strip */}
        <div className="relative rounded-2xl border border-purple-200/70 dark:border-purple-900/40 bg-white/80 dark:bg-card/80 backdrop-blur-md p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            {/* 4 Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full lg:w-auto flex-1">
              {/* Stat 1 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-xs">
                  <Users className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                    25,000+
                  </div>
                  <div className="text-xs text-muted-foreground font-light">
                    Happy Patients
                  </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-xs">
                  <Star className="w-4.5 h-4.5 fill-purple-600 text-purple-600 dark:fill-purple-400 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                    4.9/5
                  </div>
                  <div className="text-xs text-muted-foreground font-light">
                    Patient Satisfaction
                  </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-xs">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                    100% Secure
                  </div>
                  <div className="text-xs text-muted-foreground font-light">
                    Your Information is Safe
                  </div>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 shadow-xs">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-extrabold text-foreground leading-tight">
                    Available Across Mumbai
                  </div>
                  <div className="text-xs text-muted-foreground font-light">
                    Trusted Local Experts
                  </div>
                </div>
              </div>
            </div>

            {/* Right Cursive Annotation */}
            <div className="shrink-0 text-center lg:text-right pt-2 lg:pt-0 pointer-events-none select-none">
              <span className="font-script text-xl sm:text-2xl text-purple-600 dark:text-purple-400 font-bold rotate-[-3deg] inline-block">
                Movement Heals Lives ♡
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
