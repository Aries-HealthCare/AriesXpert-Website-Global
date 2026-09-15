'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  Eye,
  Play,
  ArrowRight,
  FileText,
  Download,
  Sparkles,
  Check,
  Home,
  GraduationCap,
  ClipboardCheck,
  Activity,
  Zap,
  UserCheck,
  X,
  MessageCircle,
  Stethoscope,
  ChevronRight,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRequestCallback } from '@/components/request-callback-provider';
import type { GrowthBlogPost } from '@/lib/growth-blog-posts';

interface SectionData {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  paragraphs: string[];
  bullets?: string[];
  isTwoColumnBullets?: boolean;
}

// 6 Structured items for "What This Rehab Includes" matching reference design
const REHAB_INCLUDES = [
  {
    icon: ClipboardCheck,
    title: 'Personalized Assessment',
  },
  {
    icon: Zap,
    title: 'Pain-Relief Techniques',
  },
  {
    icon: UserCheck,
    title: 'Posture & Ergonomic Training',
  },
  {
    icon: Activity,
    title: 'Strength & Mobility Exercises',
  },
  {
    icon: Home,
    title: 'Daily Activity Guidance',
  },
  {
    icon: Stethoscope,
    title: 'Long-Term Spine Health Plan',
  },
];

// Related Articles matching reference design
const RELATED_ARTICLES = [
  {
    slug: '5-everyday-habits-that-harm-your-spine',
    title: '5 Everyday Habits That Harm Your Spine',
    tag: 'SPINE HEALTH',
    description: 'Small changes can make a big difference in spine health.',
    readTime: '5 min read',
    imageUrl: '/images/blog/related_habits_spine.png',
  },
  {
    slug: 'physiotherapy-vs-surgery-for-disc-problems',
    title: 'Physiotherapy vs. Surgery for Disc Problems',
    tag: 'TREATMENT',
    description: 'Understand your options for long-term relief.',
    readTime: '7 min read',
    imageUrl: '/images/blog/related_mri_spine.png',
  },
  {
    slug: 'top-7-exercises-for-a-stronger-lower-back',
    title: 'Top 7 Exercises for a Stronger Lower Back',
    tag: 'EXERCISE',
    description: 'Simple and effective moves you can do at home.',
    readTime: '6 min read',
    imageUrl: '/images/blog/related_exercises_spine.png',
  },
];

export function GrowthBlogArticle({ post }: { post: GrowthBlogPost }) {
  const { openBookingModal, openModal } = useRequestCallback();
  const [activeSection, setActiveSection] = useState<string>('sec-1');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Dynamic reading time estimate
  const readTime = useMemo(() => {
    const wordCount = (post.content || '').split(/\s+/).length;
    return `${Math.max(8, Math.min(15, Math.ceil(wordCount / 180)))} min read`;
  }, [post.content]);

  // Parse structured markdown sections matching the design
  const sections: SectionData[] = useMemo(() => {
    const rawContent = post.content || '';
    const lines = rawContent.split('\n');
    const parsed: SectionData[] = [];
    let currentSection: Partial<SectionData> | null = null;
    let secCounter = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const h2Match = line.match(/^##\s+(?:(\d+)[\.\s]+)?(.*)$/);

      if (h2Match) {
        if (currentSection && currentSection.title) {
          parsed.push(currentSection as SectionData);
        }
        const num = h2Match[1] ? parseInt(h2Match[1], 10) : secCounter++;
        const fullTitle = h2Match[2].trim();
        
        let shortTitle = fullTitle.split(':')[0].replace(/^(Understanding|The|About)\s+/i, '');
        if (fullTitle.toLowerCase().includes('what is')) {
          shortTitle = 'What is DDD?';
        } else if (fullTitle.toLowerCase().includes('introduction')) {
          shortTitle = 'Introduction';
        } else if (fullTitle.toLowerCase().includes('cause')) {
          shortTitle = 'Causes & Risk Factors';
        } else if (fullTitle.toLowerCase().includes('symptom')) {
          shortTitle = 'Symptoms';
        } else if (fullTitle.toLowerCase().includes('diagnos')) {
          shortTitle = 'Diagnosis';
        } else if (fullTitle.toLowerCase().includes('how physiotherapy')) {
          shortTitle = 'How Physiotherapy Helps';
        } else if (fullTitle.toLowerCase().includes('rehabilitation')) {
          shortTitle = 'Rehabilitation Protocols';
        } else if (fullTitle.toLowerCase().includes('recovery')) {
          shortTitle = 'Recovery & Outlook';
        } else if (fullTitle.toLowerCase().includes('when to contact')) {
          shortTitle = 'When to Contact Us';
        }

        const id = `sec-${num}`;

        currentSection = {
          id,
          number: num,
          title: fullTitle,
          shortTitle,
          paragraphs: [],
          bullets: [],
          isTwoColumnBullets: false,
        };
        continue;
      }

      if (currentSection) {
        if (line.startsWith('- ') || line.startsWith('* ')) {
          currentSection.bullets = currentSection.bullets || [];
          currentSection.bullets.push(line.replace(/^[-*]\s+/, ''));
        } else if (line.length > 0 && !line.startsWith('#')) {
          currentSection.paragraphs = currentSection.paragraphs || [];
          currentSection.paragraphs.push(line);
        }
      }
    }

    if (currentSection && currentSection.title) {
      parsed.push(currentSection as SectionData);
    }

    // Curated 9-section clinical structure from reference design if fewer sections
    if (parsed.length < 5) {
      return [
        {
          id: 'sec-1',
          number: 1,
          title: 'Introduction: Understanding Degenerative Disc Disease',
          shortTitle: 'Introduction',
          paragraphs: [
            "Degenerative Disc Disease (DDD) is a common, age-related condition that affects the spinal discs — the cushions between the vertebrae. Over time, these discs lose hydration, elasticity, and height, which can lead to pain, stiffness, and reduced mobility. While it's a natural part of aging, the right physiotherapy approach can significantly reduce discomfort and help you stay active.",
          ],
        },
        {
          id: 'sec-2',
          number: 2,
          title: 'What is Degenerative Disc Disease?',
          shortTitle: 'What is DDD?',
          paragraphs: [
            'DDD refers to the gradual breakdown of intervertebral discs, which act as shock absorbers in the spine. It most commonly affects the cervical (neck) and lumbar (lower back) regions and can lead to nerve compression, pain, and functional limitations.',
          ],
        },
        {
          id: 'sec-3',
          number: 3,
          title: 'Causes & Risk Factors',
          shortTitle: 'Causes & Risk Factors',
          paragraphs: [],
          isTwoColumnBullets: true,
          bullets: [
            'Natural aging and wear & tear',
            'Poor posture and prolonged sitting',
            'Repetitive strain or heavy lifting',
            'Previous spine injuries',
            'Obesity and lack of physical activity',
            'Genetic predisposition',
          ],
        },
        {
          id: 'sec-4',
          number: 4,
          title: 'Common Symptoms',
          shortTitle: 'Symptoms',
          paragraphs: [],
          isTwoColumnBullets: true,
          bullets: [
            'Persistent neck or lower back pain',
            'Stiffness, especially in the morning',
            'Reduced range of motion',
            'Pain radiating to arms or legs',
            'Numbness or tingling (if nerves are involved)',
            'Difficulty with prolonged sitting or standing',
          ],
        },
        {
          id: 'sec-5',
          number: 5,
          title: 'Diagnosis',
          shortTitle: 'Diagnosis',
          paragraphs: [
            'Diagnosis typically involves a physical examination, medical history review, and imaging tests such as X-rays or MRI. At Aries PhysioCare, we combine clinical assessment with functional movement analysis to create a personalized treatment plan.',
          ],
        },
        {
          id: 'sec-6',
          number: 6,
          title: 'How Physiotherapy Helps',
          shortTitle: 'How Physiotherapy Helps',
          paragraphs: [
            'Physiotherapy focuses on reducing pain, improving mobility, strengthening supporting muscles, and preventing further degeneration. Evidence-based techniques such as manual therapy, therapeutic exercises, posture correction, and core stabilization play a key role in managing DDD.',
          ],
        },
        {
          id: 'sec-7',
          number: 7,
          title: 'Rehabilitation Protocols',
          shortTitle: 'Rehabilitation Protocols',
          paragraphs: [],
          isTwoColumnBullets: true,
          bullets: [
            'Pain management and inflammation control',
            'Gentle mobility and stretching exercises',
            'Core and back muscle strengthening',
            'Posture and ergonomic training',
            'Activity modification and lifestyle advice (stress)',
            'Gradual return to daily and sports activities',
          ],
        },
        {
          id: 'sec-8',
          number: 8,
          title: 'Recovery & Outlook',
          shortTitle: 'Recovery & Outlook',
          paragraphs: [
            'While DDD cannot be reversed, the right physiotherapy program can help you manage symptoms effectively, improve function, and maintain an active, pain-free lifestyle for years to come.',
          ],
        },
        {
          id: 'sec-9',
          number: 9,
          title: 'When to Contact Us',
          shortTitle: 'When to Contact Us',
          paragraphs: [
            "If you're experiencing persistent back or neck pain, stiffness, or difficulty with daily activities, our expert physiotherapists at Aries PhysioCare are here to help. Early intervention can prevent further complications and get you back to doing what you love.",
          ],
        },
      ];
    }

    // Apply 2-column bullets to multi-item bullet sections
    return parsed.map((sec) => {
      const isBulletSection =
        sec.title.toLowerCase().includes('cause') ||
        sec.title.toLowerCase().includes('symptom') ||
        sec.title.toLowerCase().includes('protocol') ||
        sec.title.toLowerCase().includes('risk');
      if (isBulletSection && (sec.bullets?.length || 0) >= 4) {
        return { ...sec, isTwoColumnBullets: true };
      }
      return sec;
    });
  }, [post.content]);

  // Scrollspy observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    const relatedEl = document.getElementById('sec-related');
    if (relatedEl) observer.observe(relatedEl);

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      `Hello Aries PhysioCare, I am reading about Degenerative Disc Disease (DDD) on your website and would like to consult an expert spine physiotherapist.`
    );
    window.open(`https://wa.me/919372661410?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#7C3AED]/20 pb-16">
      
      {/* ── 1. HERO SECTION WITH EXACT REFERENCE LAYOUT ───────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F8F5FE] via-[#F4EFFB] to-[#EFE8F9] dark:from-[#17122a] dark:via-[#1c1633] dark:to-background border-b border-purple-200/50 dark:border-purple-950/40">
        
        {/* Full panoramic backdrop image on desktop (sharp patient & spine on right, smooth blur on left) */}
        <div className="absolute inset-0 hidden lg:block z-0 pointer-events-none select-none">
          <Image
            src="/images/blog/hero_ddd_clean_panoramic.png"
            alt="Degenerative Disc Disease Hero Backdrop"
            fill
            priority
            quality={95}
            className="object-cover object-right xl:object-center"
          />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-4 pb-8 lg:pt-6 lg:pb-12 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <Link href="/" className="hover:text-[#7C3AED] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blogs" className="hover:text-[#7C3AED] transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 dark:text-slate-200 font-medium">Degenerative Disc Disease</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[340px] lg:min-h-[400px]">
            
            {/* Left Column: Category, Headline, Excerpt, Author Meta */}
            <div className="lg:col-span-7 space-y-4 lg:space-y-5 max-w-2xl">
              
              {/* Category Pill */}
              <div>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#5B21B6] text-white shadow-xs">
                  SPINE HEALTH
                </span>
              </div>

              {/* Main Headline matching reference design */}
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-black tracking-tight leading-[1.14]">
                <span className="text-[#5B21B6] dark:text-[#A78BFA] block">
                  Degenerative Disc Disease (DDD):
                </span>
                <span className="text-[#3B1270] dark:text-purple-200 block font-bold">
                  Pathomechanics, Pain Relief &amp; Active Spine Conditioning
                </span>
              </h1>

              {/* Excerpt */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-normal">
                A complete guide to understanding Degenerative Disc Disease and how physiotherapy can help you move better, live pain-free, and stay active — at home.
              </p>

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {/* Author Avatar & Title */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-800 shadow-xs shrink-0">
                    <Image
                      src="/images/blog/dr_rhea_sharma_avatar.png"
                      alt="Dr. Rhea Sharma"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white leading-tight">Dr. Rhea Sharma</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Senior Physiotherapist</p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#7C3AED]" />
                  <span>5 Feb 2026</span>
                </div>

                {/* Reading time */}
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7C3AED]" />
                  <span>12 min read</span>
                </div>

                {/* Views */}
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#7C3AED]" />
                  <span>2.4k views</span>
                </div>
              </div>

            </div>

            {/* Right Column: Mobile image or desktop interactive click target */}
            <div className="lg:col-span-5 relative flex items-center justify-end h-full">
              
              {/* Mobile version shown when backdrop is hidden */}
              <div className="block lg:hidden relative w-full h-[300px] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/blog/hero_right_arch_clean.png"
                  alt="Degenerative Disc Disease Spine Rehabilitation"
                  fill
                  className="object-cover object-center"
                />
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-amber-500/90 text-white px-3.5 py-2 rounded-full font-bold text-xs shadow-lg backdrop-blur-xs cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Expert Insights</span>
                </button>
              </div>

              {/* Desktop interactive button positioned over Watch Expert Insights */}
              <div className="hidden lg:block relative w-full h-[360px]">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Watch Expert Insights Video"
                  title="Watch Expert Insights Video"
                  className="absolute bottom-6 right-2 xl:right-6 flex items-center gap-3 py-2 px-4 rounded-full bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer group border border-amber-400/40 shadow-sm"
                >
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-[#7C3AED] transition-colors">
                    Watch Expert Insights
                  </span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ── 2. THREE-COLUMN BODY LAYOUT WITH FREEZING/STICKY SIDEBARS ──────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ────────────────────────────────────────────────────────────────
              LEFT COLUMN: FROZEN STICKY SIDEBAR (Article Highlights / Guide)
             ──────────────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 self-start order-2 lg:order-1">
            
            {/* 1. In This Article (Table of Contents) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-100 dark:border-purple-900/40 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                In This Article
              </h3>

              <nav className="space-y-2">
                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full flex items-center gap-3 text-left py-1.5 px-2 rounded-lg transition-colors group cursor-pointer ${
                        isActive
                          ? 'text-[#7C3AED] font-bold dark:text-purple-300'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
                      }`}
                    >
                      {/* Purple circular active indicator */}
                      <div
                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                          isActive
                            ? 'bg-[#7C3AED] ring-4 ring-purple-100 dark:ring-purple-950'
                            : 'border-2 border-slate-300 dark:border-slate-700 group-hover:border-[#7C3AED]'
                        }`}
                      >
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>

                      <span className="text-xs leading-snug">
                        {sec.shortTitle || sec.title}
                      </span>
                    </button>
                  );
                })}

                {/* Related Articles link */}
                <button
                  onClick={() => scrollToSection('sec-related')}
                  className={`w-full flex items-center gap-3 text-left py-1.5 px-2 rounded-lg transition-colors group cursor-pointer ${
                    activeSection === 'sec-related'
                      ? 'text-[#7C3AED] font-bold dark:text-purple-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      activeSection === 'sec-related'
                        ? 'bg-[#7C3AED] ring-4 ring-purple-100 dark:ring-purple-950'
                        : 'border-2 border-slate-300 dark:border-slate-700 group-hover:border-[#7C3AED]'
                    }`}
                  >
                    {activeSection === 'sec-related' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs leading-snug">Related Articles</span>
                </button>
              </nav>
            </div>

            {/* 2. Download Guide Card */}
            <div className="bg-[#F6F1FD] dark:bg-purple-950/30 rounded-2xl p-5 border border-purple-200/70 dark:border-purple-900/40 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-200/60 dark:bg-purple-900/50 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Download Guide</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    Get our free spine care and home exercise guide.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setIsPdfModalOpen(true)}
                variant="outline"
                className="w-full bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-[#7C3AED] dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-semibold text-xs py-2.5 h-auto rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Download PDF</span>
                <Download className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* 3. Quote Callout Box */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-l-4 border-amber-500 border-y border-r border-purple-100/60 dark:border-slate-800 shadow-xs">
              <p className="font-serif italic text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-snug">
                “Movement is medicine for a healthier spine.”
              </p>
            </div>

          </aside>


          {/* ────────────────────────────────────────────────────────────────
              CENTER COLUMN: MAIN ARTICLE CONTENT (9 Sections + CTA Banner)
             ──────────────────────────────────────────────────────────────── */}
          <main className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            
            {/* Top Navy Banner: Disc Health Moves You Forward */}
            <div className="bg-[#1C2438] dark:bg-slate-900 rounded-2xl p-5 sm:p-6 text-white flex items-center justify-between gap-4 overflow-hidden relative shadow-md">
              <div className="space-y-1.5 z-10">
                <p className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Disc Health
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
                  Moves You<br />Forward
                </h2>
                <div className="w-12 h-1 bg-amber-400 rounded-full mt-2" />
              </div>

              {/* Lumbar Spine Vertebra Disc Visual */}
              <div className="relative w-44 sm:w-56 h-28 sm:h-32 shrink-0 rounded-xl overflow-hidden">
                <Image
                  src="/images/blog/disc_health_cross_section.png"
                  alt="Lumbar Spine Disc Cross Section"
                  fill
                  className="object-contain object-right"
                />
              </div>
            </div>

            {/* 9 Numbered Content Sections */}
            <article className="space-y-5">
              {sections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 space-y-3 bg-white dark:bg-slate-900/80 p-5 sm:p-6 rounded-2xl border border-purple-100/70 dark:border-slate-800/80 shadow-xs"
                >
                  {/* Section Title with Purple Circular Number */}
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#7C3AED] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                      {sec.number}
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Body Paragraphs */}
                  {sec.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Two-Column or Standard Bullets */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <div className="pt-1">
                      {sec.isTwoColumnBullets ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-1">
                          {sec.bullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-1.5" />
                              <span className="leading-snug">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2 pt-1">
                          {sec.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-1.5" />
                              <span className="leading-relaxed">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </article>

            {/* Bottom Purple CTA Banner: Take Control of Your Spine Health Today! */}
            <div className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
              <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="w-12 h-12 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-md">
                  <Calendar className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                    Take Control of Your Spine Health Today!
                  </h3>
                  <p className="text-xs text-purple-100 mt-1 leading-relaxed max-w-md">
                    Book a consultation with our expert physiotherapists and get a personalized care plan for lasting relief.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center">
                <Button
                  onClick={() => openBookingModal({ topic: 'Degenerative Disc Disease', territory: 'Spine Health' })}
                  className="bg-white hover:bg-slate-100 text-[#6D28D9] font-bold text-xs px-5 py-2.5 h-auto rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-[#1E1B4B] hover:bg-[#2E1065] text-white font-semibold text-xs px-4 py-2.5 h-auto rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer border border-purple-300/30"
                >
                  <span>WhatsApp Us</span>
                  <MessageCircle className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

          </main>


          {/* ────────────────────────────────────────────────────────────────
              RIGHT COLUMN: FROZEN STICKY SIDEBAR (What This Rehab Includes)
             ──────────────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 self-start order-3">
            
            {/* 1. What This Rehab Includes Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/40 shadow-xs">
              {/* Dark Purple Header */}
              <div className="bg-[#3B1270] text-white px-4 py-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h3 className="font-bold text-xs sm:text-sm text-white tracking-wide">
                  What This Rehab Includes
                </h3>
              </div>

              {/* 6 Structured Items */}
              <div className="p-4 space-y-2.5">
                {REHAB_INCLUDES.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#F7F3FD] dark:bg-purple-950/40 rounded-xl px-3.5 py-2.5 flex items-center gap-3 border border-purple-100/60 dark:border-purple-900/30"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-200/70 dark:bg-purple-900/60 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                        <IconComp className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Consult Our Spine Experts Card with Official Logo */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-100 dark:border-purple-900/40 shadow-xs text-center space-y-3.5">
              {/* Official Round Aries PhysioCare Emblem */}
              <div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden shadow-xs border border-purple-100 dark:border-purple-800">
                <Image
                  src="/images/brand-logo-emblem.png"
                  alt="Aries PhysioCare Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  Consult Our Spine Experts
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Get a personalized assessment and start your recovery journey today.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Button
                  onClick={() => openBookingModal({ topic: 'Degenerative Disc Disease', territory: 'Spine Health' })}
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs py-2.5 h-auto rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <Button
                  onClick={() => openModal({ topic: 'Degenerative Disc Disease', territory: 'Spine Health' })}
                  variant="outline"
                  className="w-full bg-purple-50/70 hover:bg-purple-100/80 dark:bg-purple-950/40 text-[#7C3AED] dark:text-purple-300 border border-purple-200/80 dark:border-purple-800 font-semibold text-xs py-2.5 h-auto rounded-xl transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>Talk to a Physiotherapist</span>
                </Button>
              </div>

              {/* Trust Check Items */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 text-left text-slate-600 dark:text-slate-300 text-xs">
                <div className="flex items-center gap-2">
                  <Home className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                  <span>Home Visits Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                  <span>Experienced &amp; Certified Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                  <span>Personalized Care Plans</span>
                </div>
              </div>
            </div>

            {/* 3. Move Better Live Stronger Card */}
            <div className="relative rounded-2xl overflow-hidden bg-[#1E293B] dark:bg-slate-950 text-white p-5 shadow-sm border border-slate-700/50">
              <div className="relative z-10 space-y-2.5 max-w-[190px]">
                <h4 className="font-black text-base text-white leading-tight">
                  Move Better<br />Live Stronger
                </h4>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="font-medium text-slate-200">Less Pain</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="font-medium text-slate-200">More Mobility</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="font-medium text-slate-200">Healthier Tomorrow</span>
                  </div>
                </div>
              </div>

              {/* Glowing spine silhouette background image */}
              <div className="absolute right-0 top-0 bottom-0 w-28 opacity-80 pointer-events-none">
                <Image
                  src="/images/blog/promo_move_better.png"
                  alt="Healthy Spine"
                  fill
                  className="object-cover object-right"
                />
              </div>
            </div>

          </aside>

        </div>


        {/* ── 3. RELATED ARTICLES SECTION MATCHING DESIGN ──────────────────── */}
        <section id="sec-related" className="mt-14 pt-10 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Related Articles
            </h2>
            <Link
              href="/blogs"
              className="text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 group transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blogs/${article.slug}`}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/30 shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="inline-block text-[11px] font-bold text-[#7C3AED] dark:text-purple-300 bg-[#F4EFFF] dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-100 dark:border-purple-900/40 mb-2.5">
                      {article.tag}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-[#7C3AED] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                      {article.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>{article.readTime}</span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-purple-50 dark:bg-purple-950 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>


      {/* ── 4. VIDEO INSIGHTS MODAL ───────────────────────────────────────── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-white">
                  Expert Insights: Degenerative Disc Disease &amp; Active Recovery
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <Image
                src="/images/blog/hero_spine_sharp.png"
                alt="Expert Insights Video Preview"
                fill
                className="object-cover opacity-60"
              />
              <div className="relative z-10 text-center p-6 space-y-4 max-w-lg">
                <div className="w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center mx-auto shadow-xl">
                  <Play className="w-7 h-7 fill-slate-950 ml-1" />
                </div>
                <div>
                  <h4 className="font-black text-lg text-white">
                    Non-Surgical Spine Decompression &amp; Lumbar Conditioning
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Presented by Dr. Rhea Sharma, Senior Physiotherapist at Aries PhysioCare
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setIsVideoModalOpen(false);
                      openBookingModal({ topic: 'Degenerative Disc Disease', territory: 'Spine Health' });
                    }}
                    className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md"
                  >
                    Schedule Consultation With Dr. Rhea Sharma
                  </Button>
                </div>
              </div>
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 bg-slate-950/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Aries PhysioCare Clinical Video Series</span>
              <span>Available in Mumbai &amp; Across India</span>
            </div>
          </div>
        </div>
      )}


      {/* ── 5. PDF GUIDE DOWNLOAD / PRINT MODAL ────────────────────────────── */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl overflow-hidden shadow-2xl border border-purple-200 dark:border-purple-800">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-purple-50/50 dark:bg-purple-950/30">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[#7C3AED]" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  Spine Care &amp; Home Exercise Guide
                </h3>
              </div>
              <button
                onClick={() => setIsPdfModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Guide Preview Content */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-purple-100 shrink-0">
                  <Image
                    src="/images/brand-logo-emblem.png"
                    alt="Aries Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Aries PhysioCare: Clinical Spine Care Protocol
                  </h4>
                  <p className="text-xs text-slate-500">Official Patient Handout &bull; Issue 2026</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Key Chapters Included in this PDF Guide:
                </p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-[#7C3AED]">
                  <li>Biomechanical overview of Degenerative Disc Disease (DDD).</li>
                  <li>7 Daily spine-safe morning and evening mobility drills.</li>
                  <li>McKenzie prone extension &amp; neutral pelvic stabilization instructions.</li>
                  <li>Ergonomic workstation setup checklist for desk professionals.</li>
                  <li>When to seek doorstep physiotherapist supervision.</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl text-xs text-[#7C3AED] dark:text-purple-300 font-medium">
                Tip: Print this guide or save it to your device to follow your daily home exercise regimen consistently.
              </div>
            </div>

            {/* Footer with Print/Download Action */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="text-xs font-semibold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Guide</span>
              </Button>

              <Button
                onClick={() => {
                  window.print();
                  setIsPdfModalOpen(false);
                }}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download / Save PDF</span>
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
