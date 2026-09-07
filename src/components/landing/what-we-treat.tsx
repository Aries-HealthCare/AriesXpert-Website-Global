'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Sparkles,
  Activity,
  Home,
  UserCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRequestCallback } from '@/components/request-callback-provider';
import { fadeUp, slideInLeft, slideInRight, viewportConfig } from '@/hooks/use-scroll-animation';

const toSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

function SpineIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2v20" />
      <path d="M8 5h8" />
      <path d="M7 8.5h10" />
      <path d="M6.5 12h11" />
      <path d="M7 15.5h10" />
      <path d="M8 19h8" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="8.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="15.5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

function SymptomsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="5" r="2.5" fill="currentColor" />
      <path d="M12 8v5" />
      <path d="M9 11l3 2 3-2" />
      <path d="M10 18l2-5 2 5" />
      <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function TherapiesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="14" cy="4" r="2" fill="currentColor" />
      <path d="M14 7l-3 4-3-1-2 3" />
      <path d="M11 11l2 4 4 1" />
      <path d="M13 15l-1 5" />
      <path d="M17 16l2 4" />
      <path d="M4 19l4-1" />
    </svg>
  );
}

function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c-1.5 3-4 6-4 9a4 4 0 0 0 8 0c0-3-2.5-6-4-9z" />
      <path d="M12 12c-2.5-1-6 .5-7 3.5a4 4 0 0 0 5.5 4.5c1.5-.5 1.5-1.5 1.5-2" />
      <path d="M12 12c2.5-1 6 .5 7 3.5a4 4 0 0 1-5.5 4.5c-1.5-.5-1.5-1.5-1.5-2" />
    </svg>
  );
}

interface TreatmentCategory {
  title: string;
  subtitle: string;
  basePath: string;
  viewAllText: string;
  image: string;
  imageAlt: string;
  topBadgeTitle?: string;
  topBadgeSubtitle?: string;
  bottomBadgeTitle?: string;
  bottomBadgeSubtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  arrowBg: string;
  linkText: string;
  cardBorder: string;
  cardGradient: string;
  items: Array<{ name: string; slug: string }>;
}

const treatmentCategories: TreatmentCategory[] = [
  {
    title: "Conditions",
    subtitle: "We treat a wide range of musculoskeletal, neurological and lifestyle-related conditions.",
    basePath: "/services/physiotherapy/conditions",
    viewAllText: "View All Conditions",
    image: "/images/what-we-treat/conditions-spine.webp",
    imageAlt: "Targeted Care and Lasting Relief for Spine Conditions",
    topBadgeTitle: "Targeted Care",
    topBadgeSubtitle: "Lasting Relief",
    bottomBadgeTitle: "Stronger Spines",
    bottomBadgeSubtitle: "Brighter Lives",
    icon: <SpineIcon className="w-6 h-6 text-[#7c3aed]" />,
    iconBg: "bg-purple-100 dark:bg-purple-950/60 text-[#7c3aed]",
    arrowBg: "bg-[#7c3aed] text-white hover:bg-purple-700",
    linkText: "text-[#7c3aed] dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300",
    cardBorder: "border-purple-100/90 dark:border-purple-900/40 shadow-purple-500/5",
    cardGradient: "from-purple-50/40 via-white to-purple-50/20 dark:from-[#161028] dark:via-[#120d22] dark:to-[#171029]",
    items: [
      { name: "Lumbar Spondylosis" },
      { name: "Ankle Dislocation" },
      { name: "Tarsal Tunnel Syndrome" },
      { name: "Ankle Instability" },
      { name: "Posterior Tibial Tendon Dysfunction (Pttd)" },
      { name: "Osteoarthritis" },
      { name: "Rheumatoid Arthritis" },
      { name: "Cervical Spondylosis" },
      { name: "Metatarsalgia" },
      { name: "Herniated Disk Or Slipped Disc" },
      { name: "Clubfoot Or Congenital Talipes Equinovarus Or Ctev" },
      { name: "Ankle Bone Spur" },
      { name: "Total Hip Replacement (thr)" },
      { name: "Swan Neck Deformity" },
      { name: "Erb’s Palsy" },
      { name: "Sprengel's Shoulder" },
      { name: "Meralgia Paresthetica" },
      { name: "Tendinitis" },
      { name: "Sciatica" },
      { name: "Guillain-barré Syndrome" },
      { name: "Fecal Incontinence" },
      { name: "Radial Nerve Injury" },
      { name: "Sacralization" },
      { name: "Shoulder Impingement" },
      { name: "Disc Bulge" },
      { name: "Frozen Shoulder" },
      { name: "Carpal Tunnel Syndrome (cts)" },
      { name: "Tennis Elbow" },
      { name: "Plantar Fasciitis" },
      { name: "Total Knee Replacement(tkr)" },
      { name: "Meniscal Injury" },
      { name: "Stroke Or Cerebrovascular Accident (cva)" },
      { name: "Parkinson's Disease" },
      { name: "Cerebral Palsy" },
      { name: "Scoliosis" },
      { name: "Ankylosing Spondylitis (as)" },
      { name: "Spinal Cord Injury" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Symptoms",
    subtitle: "Targeted therapy to help you feel better, move freely and get back to your daily life.",
    basePath: "/services/physiotherapy/symptoms",
    viewAllText: "View All Symptoms",
    image: "/images/what-we-treat/symptoms-knee.webp",
    imageAlt: "Relief Today and A More Active Tomorrow for Joint and Muscle Pain",
    topBadgeTitle: "Relief Today",
    topBadgeSubtitle: "A More Active Tomorrow",
    bottomBadgeTitle: "Move Freely",
    bottomBadgeSubtitle: "Live Pain Free",
    icon: <SymptomsIcon className="w-6 h-6 text-[#db2777]" />,
    iconBg: "bg-pink-100 dark:bg-pink-950/60 text-[#db2777]",
    arrowBg: "bg-[#db2777] text-white hover:bg-pink-700",
    linkText: "text-[#db2777] dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-300",
    cardBorder: "border-pink-100/90 dark:border-pink-900/40 shadow-pink-500/5",
    cardGradient: "from-pink-50/40 via-white to-pink-50/20 dark:from-[#22101e] dark:via-[#120d22] dark:to-[#1e0e1a]",
    items: [
      { name: "Muscle Spasm" },
      { name: "Crepitus - Cracking Joints" },
      { name: "Numbness And Tingling" },
      { name: "Neck Pain" },
      { name: "Foot Pain" },
      { name: "Stiffness And Reduced Mobility" },
      { name: "Joint Swelling" },
      { name: "Balance Issues" },
      { name: "Muscle Stiffness" },
      { name: "Tremors" },
      { name: "Back Pain" },
      { name: "Myalgia (muscle Pain)" },
      { name: "Knee Pain" },
      { name: "Joint Pain" },
      { name: "Shoulder Pain" },
      { name: "Loss Of Balance" },
      { name: "Inflammation" },
      { name: "Headache" },
      { name: "Shortness Of Breath" },
      { name: "Sprains And Strains" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Therapies Offered",
    subtitle: "Advanced, evidence-based therapies tailored to your recovery goals.",
    basePath: "/services/physiotherapy/therapies-offered",
    viewAllText: "View All Therapies",
    image: "/images/what-we-treat/therapies-kneecare.webp",
    imageAlt: "Modern Therapies with Real Results by Aries PhysioCare Specialist",
    topBadgeTitle: "Modern Therapies.",
    topBadgeSubtitle: "Real Results.",
    bottomBadgeTitle: "Hands On Care",
    bottomBadgeSubtitle: "Real Progress",
    icon: <TherapiesIcon className="w-6 h-6 text-[#0284c7]" />,
    iconBg: "bg-sky-100 dark:bg-sky-950/60 text-[#0284c7]",
    arrowBg: "bg-[#0284c7] text-white hover:bg-sky-700",
    linkText: "text-[#0284c7] dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300",
    cardBorder: "border-sky-100/90 dark:border-sky-900/40 shadow-sky-500/5",
    cardGradient: "from-sky-50/40 via-white to-sky-50/20 dark:from-[#0d1c2e] dark:via-[#120d22] dark:to-[#0a1827]",
    items: [
      { name: "Interferential Therapy (IFT)" },
      { name: "Chiropractic Therapy" },
      { name: "Ultrasound Therapy" },
      { name: "Laser Therapy" },
      { name: "Cupping Therapy" },
      { name: "Manual Therapy" },
      { name: "Electrotherapy" },
      { name: "Dry Needling" },
      { name: "Wax Therapy" },
      { name: "Kinesio Taping / Taping Therapy" },
      { name: "Thermotherapy(heat Therapy)" },
      { name: "Transcutaneous Electrical Nerve Stimulation(tens) Therapy" },
      { name: "Lymphatic Drainage Massage" },
      { name: "Overhead Track Harness Therapy" },
      { name: "Traction Therapy" },
      { name: "Spinal Decompression / Traction Therapy" },
      { name: "Tecar / Cret Therapy" },
      { name: "Cryotherapy(cold Therapy)" },
      { name: "Dynamic Compression Therapy" },
      { name: "Shockwave Therapy" },
      { name: "Robotic Spinal Decompression Therapy" },
      { name: "Myofascial Release (mfr)" },
      { name: "Soft Tissue Mobilization" },
      { name: "Pelvic Floor Physical Therapy" },
      { name: "Chest Physiotherapy" },
      { name: "Shortwave Diathermy (swd)" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  },
  {
    title: "Services Offered",
    subtitle: "Comprehensive physiotherapy services designed for every age and need.",
    basePath: "/services/physiotherapy/services-offered",
    viewAllText: "View All Services",
    image: "/images/what-we-treat/services-rehab.webp",
    imageAlt: "Care at Home and Care Beyond Boundaries with Aries PhysioCare",
    topBadgeTitle: "Care at Home",
    topBadgeSubtitle: "Comfort Always",
    bottomBadgeTitle: "Care Beyond",
    bottomBadgeSubtitle: "Boundaries",
    icon: <Home className="w-6 h-6 text-[#d97706]" />,
    iconBg: "bg-amber-100 dark:bg-amber-950/60 text-[#d97706]",
    arrowBg: "bg-[#d97706] text-white hover:bg-amber-700",
    linkText: "text-[#d97706] dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300",
    cardBorder: "border-amber-100/90 dark:border-amber-900/40 shadow-amber-500/5",
    cardGradient: "from-amber-50/40 via-white to-amber-50/20 dark:from-[#241708] dark:via-[#120d22] dark:to-[#1c1106]",
    items: [
      { name: "Pediatric Physiotherapy" },
      { name: "Home Care Physiotherapy" },
      { name: "Neuro Physiotherapy - Rehab" },
      { name: "Pre And Post Surgery Rehabilitation" },
      { name: "Geriatric Physiotherapy" },
      { name: "Sports Injury Rehabilitation" },
      { name: "Postural Correction" },
      { name: "Workplace Ergonomics Support" },
      { name: "Chiropractor Treatment" },
      { name: "Sports Physiotherapy" },
      { name: "Sports Massage Therapy" },
      { name: "Strength Training" },
      { name: "Advanced Physiotherapy" },
      { name: "Women's Health Physiotherapy" },
      { name: "Physical Therapy" },
      { name: "Musculoskeletal Physiotherapy" },
      { name: "Vestibular Rehabilitation (vr)" },
      { name: "Tele-physiotherapy" },
      { name: "Cardiac Rehabilitation" },
      { name: "Spinal Injury Rehabilitation" },
      { name: "Occupational Therapy" },
      { name: "Dietician" },
      { name: "Home Nursing" },
      { name: "Care Takers" },
      { name: "Speech Therapy" }
    ].map(item => ({ ...item, slug: toSlug(item.name) }))
  }
];

export default function WhatWeTreat() {
  const { openBookingModal } = useRequestCallback();

  return (
    <section className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-b from-[#FAF8FF] via-white to-[#FAF8FF] dark:from-[#0B0817] dark:via-[#0F0B1E] dark:to-[#0B0817] transition-colors duration-500">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle organic leaf accent bottom-left */}
      <div className="absolute bottom-6 left-0 w-28 md:w-36 pointer-events-none opacity-80 select-none z-0 hidden sm:block">
        <Image
          src="/images/what-we-treat/decorative-leaves.webp"
          alt=""
          width={150}
          height={180}
          className="w-full h-auto drop-shadow-sm"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Header Area */}
        <div className="relative mb-12 sm:mb-16">
          {/* Top-left script annotation */}
          <div className="hidden xl:flex absolute left-2 top-2 -rotate-6 items-center gap-1.5 font-script text-2xl lg:text-3xl text-purple-700 dark:text-purple-300 font-medium select-none pointer-events-none">
            <span>Movement Heals Lives</span>
            <span className="text-xl">♡</span>
          </div>

          {/* Top-right Expert Care badge */}
          <div className="hidden xl:flex absolute right-2 top-0 items-center gap-3 bg-white/90 dark:bg-[#161028]/90 backdrop-blur-md border border-purple-100 dark:border-purple-900/40 rounded-2xl p-2.5 pr-4 shadow-sm select-none">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/20 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left leading-tight">
              <div className="text-xs font-bold text-slate-900 dark:text-white">Expert Care</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">for a Healthier Tomorrow</div>
              <div className="h-0.5 w-10 bg-purple-500/60 rounded-full mt-1" />
            </div>
          </div>

          {/* Center Heading */}
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeUp}
          >
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full border border-purple-200 dark:border-purple-800 bg-white/90 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-600/20" />
              <span>OUR EXPERTISE</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              What We <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">Treat</span>
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1">
              We provide specialized physiotherapy treatments for neurological, orthopedic, musculoskeletal, pediatric, geriatric, and sports-related conditions — addressing a wide range of symptoms and recovery needs.
            </p>
          </motion.div>
        </div>

        {/* 2x2 Grid of Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full mx-auto">
          {treatmentCategories.map((area, index) => (
            <motion.div
              key={area.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              className={cn(
                "group bg-gradient-to-br rounded-3xl border p-5 sm:p-6 lg:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-xl",
                area.cardGradient,
                area.cardBorder
              )}
            >
              <div className="flex flex-col sm:flex-row gap-5 lg:gap-6 items-stretch justify-between h-full">
                {/* Left content: Header, Scrollable List, View All link */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className={cn("w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs", area.iconBg)}>
                        {area.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                          {area.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug mt-0.5 line-clamp-2">
                          {area.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Scrollable list of conditions/symptoms/therapies/services */}
                    <div className="h-[250px] sm:h-[265px] overflow-y-auto pr-2 custom-scrollbar space-y-2">
                      {area.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={`${area.basePath}/${item.slug}`}
                          className="flex items-center gap-2.5 group/item py-0.5 transition-all"
                        >
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover/item:scale-110",
                              area.arrowBg
                            )}
                          >
                            <ArrowRight className="w-2.5 h-2.5 text-white" />
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors leading-tight line-clamp-1">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Visual Image */}
                <div className="relative w-full sm:w-[170px] md:w-[185px] lg:w-[195px] shrink-0 rounded-2xl overflow-hidden shadow-sm aspect-[173/240] mx-auto sm:mx-0 self-center sm:self-auto">
                  <Image
                    src={area.image}
                    alt={area.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Glass Badge */}
                  {area.topBadgeTitle && (
                    <div className="absolute top-2.5 inset-x-2 z-10 flex justify-center pointer-events-none">
                      <div className="px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/85 dark:bg-[#0B0817]/85 border border-white/80 dark:border-white/15 shadow-sm text-center max-w-[90%]">
                        <div className="text-[11px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                          {area.topBadgeTitle}
                        </div>
                        {area.topBadgeSubtitle && (
                          <div className="text-[9.5px] font-semibold text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                            {area.topBadgeSubtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Bottom Glass Badge */}
                  {area.bottomBadgeTitle && (
                    <div className="absolute bottom-2.5 inset-x-2 z-10 flex justify-center pointer-events-none">
                      <div className="px-3 py-1.5 rounded-xl backdrop-blur-md bg-white/85 dark:bg-[#0B0817]/85 border border-white/80 dark:border-white/15 shadow-sm text-center max-w-[90%]">
                        <div className="text-[11px] font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                          {area.bottomBadgeTitle}
                        </div>
                        {area.bottomBadgeSubtitle && (
                          <div className="text-[9.5px] font-semibold text-slate-600 dark:text-slate-300 leading-tight mt-0.5">
                            {area.bottomBadgeSubtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Consultation Strip */}
        <div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-[#150f28] rounded-2xl sm:rounded-full border border-purple-100/90 dark:border-purple-900/50 shadow-md hover:shadow-lg transition-shadow px-5 sm:px-8 py-4 sm:py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Wellness badge */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shadow-xs">
                <LotusIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-left">
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Your Health</div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">Our Commitment</div>
              </div>
            </div>

            {/* Middle Divider */}
            <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-purple-900/40 shrink-0" />

            {/* Middle Prompt */}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Not sure what you need?
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Consult our experts to get a personalized treatment plan.
              </div>
            </div>

            {/* Right Action Button */}
            <button
              onClick={() => openBookingModal({ service: 'Expert Physiotherapy Consultation' })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full font-bold px-6 py-2.5 text-xs sm:text-sm shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom-right handwritten note */}
          <div className="hidden xl:flex justify-end pt-3 pr-4">
            <div className="font-script text-2xl text-purple-700 dark:text-purple-300 rotate-2 select-none pointer-events-none flex items-center gap-1">
              <span>A Healthier Happier Tomorrow</span>
              <span className="text-xl">♡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}