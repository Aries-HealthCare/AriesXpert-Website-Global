'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Star,
  MapPin,
  Award,
  Phone,
  MessageCircle,
  ChevronRight,
  Clock,
  CheckCircle2,
  Languages,
  Calendar,
  Shield,
  ShieldCheck,
  Share2,
  Heart,
  Info,
  GraduationCap,
  Briefcase,
  ThumbsUp,
  HeartPulse,
  LocateFixed,
  Zap,
  Activity,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Check,
  Copy,
  Radio,
  FileCheck,
  Building2
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import { TherapistCard } from '@/types/therapist';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface TherapistProfileTemplateProps {
  therapist: TherapistCard;
}

export default function TherapistProfileTemplate({ therapist }: TherapistProfileTemplateProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'services' | 'equipment' | 'locations' | 'education' | 'reviews'>('about');

  const whatsappText = `Hello Aries PhysioCare, I would like to book a physiotherapy session with ${therapist.name} in ${therapist.city}.`;
  
  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: 'Profile Link Copied!',
        description: `Link for ${therapist.name} copied to clipboard.`,
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const isLogo =
    !therapist.imageUrl ||
    therapist.imageUrl.includes('aries-emblem') ||
    therapist.imageUrl.includes('BrandLogo') ||
    therapist.imageUrl.includes('default-avatar') ||
    therapist.imageUrl.includes('unsplash') ||
    therapist.imageUrl.includes('placehold');
  const displayImg = isLogo ? '/images/aries-emblem.png' : therapist.imageUrl;

  const portableEquipment = [
    { name: 'Hospital-Grade Portable IFT', desc: 'Deep muscle stimulation & rapid pain relief' },
    { name: 'Therapeutic Ultrasound (1 & 3 MHz)', desc: 'Accelerates tendon & ligament cellular repair' },
    { name: 'Spinal Decompression & Traction Unit', desc: 'Targeted disc herniation & nerve decompression' },
    { name: 'Dry Needling & Myofascial Tools', desc: 'Trigger point release & hypertonic knot removal' },
    { name: 'Class IV Deep Tissue Laser Modality', desc: 'Reduces acute inflammation and joint edema' },
    { name: 'Biometric Gait & Goniometry Sensors', desc: 'Precise angular range-of-motion telemetry' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07020d] text-slate-900 dark:text-white selection:bg-emerald-500/30">
      
      {/* Background Ambience Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-emerald-500/10 via-teal-900/10 to-transparent rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-[40%] -left-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* ── HERO BANNER SECTION ───────────────────────────────────── */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-slate-200/80 dark:border-white/10 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-white/50 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/therapist" className="hover:text-slate-900 dark:hover:text-white transition-colors">Our Specialists</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold truncate">{therapist.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Doctor Portrait & Live Telemetry Badge */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-all duration-500" />
                <div className={cn(
                  "relative w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl bg-slate-100 dark:bg-slate-900",
                  isLogo ? "bg-gradient-to-br from-[#3b0d5c] via-[#1f0730] to-[#0d0214] flex items-center justify-center p-6" : ""
                )}>
                  <Image
                    src={displayImg}
                    alt={therapist.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 192px, 256px"
                    className={cn(isLogo ? "object-contain p-6 drop-shadow-[0_10px_20px_rgba(234,179,8,0.3)]" : "object-cover object-top group-hover:scale-105 transition-transform duration-500")}
                  />
                  
                  {/* Status Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-center text-[10px] sm:text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-lg">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active on Duty · Doorstep Visits</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle & Right: Doctor Name, Badges & Highlights */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              
              {/* Badges Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <Badge className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold px-3 py-1 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  Verified Clinical Specialist
                </Badge>
                <Badge variant="outline" className="text-xs font-semibold px-3 py-1 bg-white/50 dark:bg-slate-900/50">
                  {therapist.specialization} Discipline
                </Badge>
                <Badge variant="outline" className="text-xs font-semibold px-3 py-1 bg-white/50 dark:bg-slate-900/50">
                  <MapPin className="w-3 h-3 mr-1 text-emerald-500" />
                  {therapist.city}, {therapist.state}
                </Badge>
              </div>

              {/* Doctor Name */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight font-headline">
                {therapist.name}
              </h1>

              {/* Subtitle / Degrees */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <GraduationCap className="w-4 h-4" />
                  {therapist.qualification}
                </span>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {therapist.experience} Clinical Practice
                </span>
                <span className="text-slate-400">•</span>
                <span className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-slate-400" />
                  {therapist.languages.join(', ')}
                </span>
              </div>

              {/* Bio Summary Snippet */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl pt-1">
                {therapist.bio}
              </p>

              {/* CTA Buttons in Hero */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                <BookAppointmentButton
                  therapistId={therapist.id}
                  className="h-12 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20"
                >
                  Book Home Session with {therapist.name.split(' ')[1] || 'Doctor'}
                </BookAppointmentButton>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 px-5 rounded-2xl border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <a
                    href={`https://wa.me/918591981880?text=${encodeURIComponent(whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Desk (+91 8591981880)
                  </a>
                </Button>

                <Button
                  onClick={handleCopyLink}
                  variant="ghost"
                  className="h-12 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500 mr-1.5" /> : <Copy className="w-4 h-4 mr-1.5" />}
                  {copied ? 'Copied' : 'Share Profile'}
                </Button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── CLINICAL TELEMETRY HUD STRIP ──────────────────────────── */}
      <section className="py-6 bg-white dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-white/10 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Clinical Experience</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-headline mt-0.5">
                {therapist.experience}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Hospital-Trained</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Patient Rating</div>
              <div className="text-xl sm:text-2xl font-black text-amber-500 flex items-center justify-center gap-1 font-headline mt-0.5">
                <Star className="w-5 h-5 fill-amber-400" /> {therapist.rating}
              </div>
              <div className="text-[11px] text-slate-500">{therapist.reviewCount}+ Verified Reviews</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Cases Restored</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-headline mt-0.5">
                500+
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">99.2% Clinical Adherence</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 text-center">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Dispatch Time</div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-headline mt-0.5">
                &lt; 2 Hours
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Same-Day Home Visits</div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT GRID WITH STICKY BOOKING SIDEBAR ─────────── */}
      <section className="py-12 md:py-16 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT COLUMN: Deep Clinical Modules (8 cols) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Profile Navigation Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
                {[
                  { id: 'about', label: 'Clinical Bio', icon: Info },
                  { id: 'services', label: 'Conditions & Therapies', icon: HeartPulse },
                  { id: 'equipment', label: 'Portable Modalities', icon: Zap },
                  { id: 'locations', label: 'Coverage Localities', icon: MapPin },
                  { id: 'education', label: 'Degrees & CME', icon: GraduationCap },
                  { id: 'reviews', label: 'Verified Reviews', icon: Star }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap",
                        isActive
                          ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Module 1: Comprehensive Biography */}
              {(activeTab === 'about' || activeTab === 'services') && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-headline">
                        Clinical Overview & Specialization
                      </h2>
                      <p className="text-xs text-slate-500">Evidence-based physiotherapy methodologies administered at home</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light leading-relaxed">
                    {therapist.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Clinical Focus
                      </span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {therapist.specialization} Rehabilitation & Functional Biomechanics
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Shield className="w-3.5 h-3.5" /> Medical Directorate
                      </span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Aries Certified Physiotherapist · MIAP Accredited
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Module 2: Conditions Treated & Therapies */}
              {(activeTab === 'about' || activeTab === 'services') && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-headline">
                        Clinical Conditions Treated
                      </h2>
                      <p className="text-xs text-slate-500">Specialized rehabilitation protocols customized to individual pathology</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {therapist.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 hover:border-emerald-500/40 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 3: Hospital-Grade Portable Equipment */}
              {(activeTab === 'about' || activeTab === 'equipment') && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-headline">
                        Hospital-Grade Modalities Carried to Your Home
                      </h2>
                      <p className="text-xs text-slate-500">No need to travel. Complete electrotherapy gear sanitized and transported.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {portableEquipment.map((eq, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
                        <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-purple-500" />
                          <span>{eq.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-light leading-snug">{eq.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 4: 4-Stage Clinical Recovery Workflow */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Standard Clinical Protocol</span>
                  <h3 className="text-xl sm:text-2xl font-bold font-headline">How Dr. {therapist.name.split(' ')[1]} Treats You at Home</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  {[
                    { step: '01', title: 'Biomechanical Intake', desc: 'Detailed physical examination, posture analysis, and joint goniometry.' },
                    { step: '02', title: 'Pain Relief Protocol', desc: 'Targeted electrotherapy (IFT/US) and hands-on manual decompression.' },
                    { step: '03', title: 'Functional Retraining', desc: 'Therapeutic exercises to rebuild strength, range of motion, and balance.' },
                    { step: '04', title: 'Ergonomic Defense', desc: 'Long-term posture corrections and guided home maintenance regimes.' }
                  ].map((s, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                      <div className="text-xs font-black text-emerald-400 font-mono">{s.step}</div>
                      <div className="text-xs font-bold text-white">{s.title}</div>
                      <p className="text-[11px] text-slate-400 leading-snug font-light">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module 5: Coverage Localities */}
              {(activeTab === 'about' || activeTab === 'locations') && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-headline">
                        Localities Covered in {therapist.city}
                      </h2>
                      <p className="text-xs text-slate-500">Same-day home visit availability across these residential and commercial hubs</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {therapist.areas.map((area, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                      >
                        <LocateFixed className="w-3 h-3 text-emerald-500" />
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 6: Education & Certifications */}
              {(activeTab === 'about' || activeTab === 'education') && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-headline">
                        Education & Medical Certifications
                      </h2>
                      <p className="text-xs text-slate-500">Formal university degrees and postgraduate clinical training</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {therapist.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700"
                      >
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module 7: Verified Patient Reviews */}
              {(activeTab === 'about' || activeTab === 'reviews') && (
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                        <Star className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-headline">
                          Verified Patient Feedback
                        </h2>
                        <p className="text-xs text-slate-500">Real outcomes reported by patients treated at home</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {therapist.rating} / 5.0 Rating
                    </div>
                  </div>

                  <div className="space-y-4">
                    {therapist.feedback.map((fb, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-400">
                            {[...Array(fb.rating)].map((_, r) => (
                              <Star key={r} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Patient
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-light italic leading-relaxed">
                          "{fb.comment}"
                        </p>

                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          — {fb.user}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Sticky Smart Booking Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              
              {/* Primary Booking Card */}
              <Card className="rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/20 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest text-emerald-100">
                    Direct Practitioner Booking
                  </div>
                  <div className="text-xl font-headline font-black">
                    Reserve Home Session
                  </div>
                  <p className="text-xs text-emerald-50 opacity-90">
                    Schedule with {therapist.name} in {therapist.city}
                  </p>
                </div>

                <CardContent className="p-6 space-y-5">
                  
                  {/* Pricing Overview */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Standard In-Home Tariff
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-headline">
                      ₹ 800 – ₹ 900 <span className="text-xs font-normal text-slate-500">/ session</span>
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      Package savings up to 25% on 5/10/15 sessions
                    </p>
                  </div>

                  {/* Primary CTA */}
                  <div className="space-y-3">
                    <BookAppointmentButton
                      therapistId={therapist.id}
                      className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm tracking-wide shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5 transition-all"
                    >
                      Book Home Visit Now
                    </BookAppointmentButton>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 rounded-2xl font-bold text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all text-xs"
                    >
                      <a
                        href={`https://wa.me/918591981880?text=${encodeURIComponent(whatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" /> WhatsApp Specialist Desk
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-full h-11 rounded-2xl font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs"
                    >
                      <a href="tel:+919136447006" className="flex items-center justify-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> Call Helpline: +91 91364 47006
                      </a>
                    </Button>
                  </div>

                  {/* Trust Bullet Guarantee */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                    <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>100% Background Verified & Council Registered Doctor</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                      <Zap className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>Sanitized Hospital-Grade Electrotherapy Gear</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-slate-600 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>Flexible Morning & Evening Scheduling (8 AM – 8 PM)</span>
                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* Share & In-Clinic Flagship Info */}
              <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-500" />
                  <span>Prefer In-Clinic Consultation?</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  You can also consult at our flagship physical center in Borivali West, Mumbai equipped with spinal traction and Class IV laser.
                </p>
                <Link
                  href="/clinic"
                  className="inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  View Borivali Clinic Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
