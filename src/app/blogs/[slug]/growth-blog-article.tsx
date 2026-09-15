'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ArrowRight,
  Phone,
  ShieldCheck,
  Home,
  Heart,
  Brain,
  ListOrdered,
  Stethoscope,
  Share2,
  ClipboardCheck,
  PhoneCall,
  UserCheck,
  ShieldAlert,
  Move,
  Footprints,
  Dumbbell,
  GraduationCap,
  Users,
  CheckCircle2,
  FileText,
  Sparkles,
  Quote,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRequestCallback } from '@/components/request-callback-provider';
import type { GrowthBlogPost } from '@/lib/growth-blog-posts';

interface SectionData {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  icon: React.ElementType;
  intro?: string;
  paragraphs: string[];
  bullets?: string[];
  isTwoColumnBullets?: boolean;
}

const SECTION_ICONS: Record<number, React.ElementType> = {
  1: Brain,
  2: ListOrdered,
  3: Stethoscope,
  4: Share2,
  5: ClipboardCheck,
  6: Home,
  7: PhoneCall,
};

// Fallback related articles matching the screenshot
const DEFAULT_RELATED_ARTICLES = [
  {
    slug: 'stroke-rehabilitation-at-home-a-complete-guide',
    title: 'Stroke Rehabilitation at Home: A Complete Guide',
    tag: 'Neurological Care',
    description: 'Practical tips, exercises and expert advice for continuous recovery at home.',
    readTime: '5 min read',
    imageUrl: '/images/blog/stroke-rehab-hero.jpg',
  },
  {
    slug: 'understanding-neuroplasticity-in-stroke-recovery',
    title: 'Understanding Neuroplasticity in Stroke Recovery',
    tag: 'Neurological Care',
    description: 'How the brain adapts and rewires after a stroke, and how physiotherapy helps.',
    readTime: '6 min read',
    imageUrl: '/images/blog/neuroplasticity-brain.jpg',
  },
  {
    slug: 'balance-training-after-stroke-steps-to-safer-movement',
    title: 'Balance Training After Stroke: Steps to Safer Movement',
    tag: 'Physiotherapy',
    description: 'Effective balance exercises and strategies to prevent falls.',
    readTime: '5 min read',
    imageUrl: '/images/blog/balance-cane-walk.jpg',
  },
];

const REHAB_INCLUDES = [
  {
    icon: UserCheck,
    title: 'Post-stroke assessment',
    subtitle: 'Personalized evaluation',
  },
  {
    icon: ShieldAlert,
    title: 'Balance & coordination training',
    subtitle: 'Improve stability and reduce falls',
  },
  {
    icon: Move,
    title: 'Functional transfer practice',
    subtitle: 'Safe and independent movement',
  },
  {
    icon: Footprints,
    title: 'Gait training',
    subtitle: 'Step towards confidence',
  },
  {
    icon: Dumbbell,
    title: 'Upper-limb activation',
    subtitle: 'Task-oriented exercises',
  },
  {
    icon: GraduationCap,
    title: 'Caregiver education',
    subtitle: 'Guidance and hands-on training',
  },
  {
    icon: ClipboardCheck,
    title: 'Home exercise guidance',
    subtitle: 'Simple, effective routines',
  },
  {
    icon: CheckCircle2,
    title: 'Follow-up monitoring',
    subtitle: 'Track progress and adapt care',
  },
];

export function GrowthBlogArticle({ post }: { post: GrowthBlogPost }) {
  const { openBookingModal, openModal } = useRequestCallback();
  const [activeSection, setActiveSection] = useState<string>('sec-1');

  // Format publication date
  const formattedDate = useMemo(() => {
    if (!post.publishedAt) return '5 February 2026';
    try {
      return new Date(post.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '5 February 2026';
    }
  }, [post.publishedAt]);

  // Dynamic reading time estimate
  const readTime = useMemo(() => {
    const wordCount = (post.content || '').split(/\s+/).length;
    return `${Math.max(5, Math.min(12, Math.ceil(wordCount / 180)))} min read`;
  }, [post.content]);

  // Parse structured markdown sections or provide curated fallback sections
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
        const shortTitle = fullTitle.split(':')[0].replace(/^(Understanding|The|About)\s+/i, '');
        const id = `sec-${num}`;

        currentSection = {
          id,
          number: num,
          title: fullTitle,
          shortTitle: shortTitle.length > 20 ? shortTitle.slice(0, 18) + '...' : shortTitle,
          icon: SECTION_ICONS[num] || Brain,
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
          if (!currentSection.paragraphs?.length && line.endsWith(':')) {
            currentSection.intro = line;
          } else {
            currentSection.paragraphs = currentSection.paragraphs || [];
            currentSection.paragraphs.push(line);
          }
        }
      }
    }

    if (currentSection && currentSection.title) {
      parsed.push(currentSection as SectionData);
    }

    // If content was not in markdown header format, supply the full 7 clinical sections
    if (parsed.length < 3) {
      return [
        {
          id: 'sec-1',
          number: 1,
          title: 'Introduction: Understanding Post-Stroke Recovery',
          shortTitle: 'Introduction',
          icon: Brain,
          paragraphs: [
            'A stroke occurs when the blood supply to a part of the brain is interrupted, either due to a blockage (ischemic stroke) or a bleed (hemorrhagic stroke). This can affect movement, balance, speech, cognition, and daily function. The good news is that the brain has an incredible ability to rewire itself — a process called neuroplasticity. With the right rehabilitation and home support, many individuals can regain significant independence and improve their quality of life.',
          ],
        },
        {
          id: 'sec-2',
          number: 2,
          title: 'Common Symptoms After Stroke',
          shortTitle: 'Symptoms',
          icon: ListOrdered,
          intro: 'Symptoms vary depending on the area of the brain affected and may include:',
          paragraphs: [],
          isTwoColumnBullets: true,
          bullets: [
            'Weakness or paralysis on one side of the body',
            'Difficulty with balance and coordination',
            'Problems with speech or communication',
            'Cognitive or memory changes',
            'Difficulty with daily activities (bathing, dressing, walking)',
            'Emotional changes (mood swings, anxiety)',
            'Reduced coordination and fine motor control',
          ],
        },
        {
          id: 'sec-3',
          number: 3,
          title: 'Diagnosis and Clinical Assessment',
          shortTitle: 'Diagnosis',
          icon: Stethoscope,
          paragraphs: [
            'Diagnosis typically involves a combination of neurological examination, brain imaging (CT or MRI), and functional assessments. At Aries PhysioCare, we also assess movement patterns, balance, muscle strength, and daily activity needs to design a personalized rehabilitation plan.',
          ],
        },
        {
          id: 'sec-4',
          number: 4,
          title: 'The Recovery Journey: Neuroplasticity in Action',
          shortTitle: 'Recovery Journey',
          icon: Share2,
          paragraphs: [
            "Neuroplasticity is the brain's ability to form new connections and reorganize itself after injury. Clinical evidence confirms that intensive, repetitive, and task-specific rehabilitation in the patient's real-world environment significantly accelerates neurological retraining and functional recovery.",
          ],
        },
        {
          id: 'sec-5',
          number: 5,
          title: 'Basic Rehabilitation Protocols',
          shortTitle: 'Basic Protocols',
          icon: ClipboardCheck,
          paragraphs: [],
          bullets: [
            '**Bobath & NDT Approaches:** Inhibiting abnormal synergies and spasticity while facilitating normal posture and movement.',
            '**Constraint-Induced Movement Therapy (CIMT):** Encouraging use of the affected upper limb to overcome learned non-use.',
            '**Task-Oriented Training:** Practice of real-life activities such as reaching, grasping, standing, and walking.',
            '**Balance & Coordination Drills:** To reduce fall risk and improve stability.',
          ],
        },
        {
          id: 'sec-6',
          number: 6,
          title: 'Home Rehabilitation Approach',
          shortTitle: 'Home Care Tips',
          icon: Home,
          paragraphs: [
            'Home-based rehabilitation bridges the gap between hospital and daily life. Our therapists train patients and caregivers in safe transfer techniques, home exercise programs, gait training, and positioning strategies — ensuring continuous progress in a familiar, comfortable environment.',
          ],
        },
        {
          id: 'sec-7',
          number: 7,
          title: 'When to Contact Us',
          shortTitle: 'When to Contact Us',
          icon: PhoneCall,
          paragraphs: [
            'If you or a loved one has experienced a stroke, early rehabilitation can make a meaningful difference. Contact Aries PhysioCare for a personalized assessment and home rehabilitation plan.',
          ],
        },
      ];
    }

    // Determine 2-column bullets for symptoms section
    return parsed.map((sec) => {
      if (sec.title.toLowerCase().includes('symptom') && (sec.bullets?.length || 0) >= 4) {
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
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

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

  // Split title to apply rich purple gradient styling to key phrases
  const renderedTitle = useMemo(() => {
    const title = post.title || 'Post-Stroke Neurological Recovery: Harnessing Neuroplasticity with Home Rehabilitation';
    
    if (title.includes('Harnessing Neuroplasticity')) {
      const parts = title.split('Harnessing Neuroplasticity');
      return (
        <>
          {parts[0]}
          <span className="text-[#7C3AED] bg-gradient-to-r from-[#7C3AED] to-[#9333EA] bg-clip-text text-transparent">
            Harnessing Neuroplasticity
          </span>
          {parts[1]}
        </>
      );
    }

    // Default formatting: if colon exists, color second part
    if (title.includes(':')) {
      const [before, after] = title.split(':');
      return (
        <>
          {before}:{' '}
          <span className="text-[#7C3AED] bg-gradient-to-r from-[#7C3AED] to-[#9333EA] bg-clip-text text-transparent">
            {after}
          </span>
        </>
      );
    }

    return title;
  }, [post.title]);

  const heroImage = post.imageUrl || '/images/blog/stroke-rehab-hero.jpg';

  return (
    <div className="min-h-screen bg-[#FDFCFE] dark:bg-background text-slate-900 dark:text-slate-100 font-sans selection:bg-[#7C3AED]/20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F3FF] via-[#FAF8FF] to-[#FDFCFE] dark:from-[#151226] dark:via-[#19152C] dark:to-background border-b border-purple-100/60 dark:border-purple-950/40 pt-8 pb-14 lg:pt-12 lg:pb-16">
        {/* Soft Ambient Glow Elements */}
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-purple-300/20 dark:bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[420px] h-[420px] bg-indigo-200/25 dark:bg-indigo-950/20 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pill */}
              <div className="inline-flex items-center">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-purple-100/80 dark:bg-purple-950/60 text-[#7C3AED] dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/50 shadow-xs">
                  {post.territory || post.topic || 'Neurological Care'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
                {renderedTitle}
              </h1>

              {/* Subtitle / Excerpt */}
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                {post.summary ||
                  'Understand the critical golden window of post-stroke rehabilitation, Bobath concepts, task-oriented training, and how home-based care can activate neuroplasticity for meaningful recovery.'}
              </p>

              {/* Publication Meta Bar */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#7C3AED]" />
                  <span>Published {formattedDate}</span>
                </div>
                <span className="text-slate-300 dark:text-slate-700">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7C3AED]" />
                  <span>{readTime}</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  onClick={() => openBookingModal({ topic: post.topic, territory: post.territory })}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm px-6 py-3 h-auto rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-600/35 transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  onClick={() => openModal({ topic: post.topic, territory: post.territory })}
                  variant="outline"
                  className="border-[#7C3AED] text-[#7C3AED] hover:bg-purple-50 dark:hover:bg-purple-950/40 font-semibold text-sm px-5 py-3 h-auto rounded-full transition-all duration-200 flex items-center gap-2 cursor-pointer bg-white/60 dark:bg-transparent"
                >
                  <Phone className="w-4 h-4 text-[#7C3AED]" />
                  <span>Talk to Specialist</span>
                </Button>
              </div>

              {/* Trust Badges Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-purple-100 dark:border-purple-900/30">
                <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-purple-50 dark:border-purple-900/20 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-purple-100/80 dark:bg-purple-950/80 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Expert Neurological Care</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">Evidence-Based Approach</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-purple-50 dark:border-purple-900/20 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-purple-100/80 dark:bg-purple-950/80 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Home Visit Available</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">In Mumbai & Metro Hubs</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-purple-50 dark:border-purple-900/20 shadow-xs">
                  <div className="w-9 h-9 rounded-lg bg-purple-100/80 dark:bg-purple-950/80 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Compassionate Support</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">For Patients & Families</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic & Callout Card */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-row gap-4 items-stretch">
              
              {/* Main Image with floating quote */}
              <div className="relative flex-1 min-w-[240px] rounded-3xl overflow-hidden shadow-xl border border-white dark:border-purple-900/30 group">
                <div className="relative aspect-[4/5] sm:aspect-auto sm:h-full min-h-[380px] w-full">
                  <Image
                    src={heroImage}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 450px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating "Movement Rebuilds Lives" Badge */}
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-purple-100/80 dark:border-purple-900/40 max-w-[170px]">
                  <Quote className="w-4 h-4 text-[#7C3AED]/70 mb-1" />
                  <p className="font-serif italic text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                    Movement Rebuilds Lives
                  </p>
                </div>
              </div>

              {/* Right Side Feature Callout Card */}
              <div className="w-full sm:w-[210px] lg:w-[210px] shrink-0 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 border border-purple-100 dark:border-purple-900/40 shadow-lg flex flex-col justify-between">
                <div>
                  <Quote className="w-7 h-7 text-[#7C3AED]/80 mb-2" />
                  <h3 className="font-serif italic text-lg font-bold text-slate-900 dark:text-white leading-snug mb-1">
                    New Possibilities After Stroke
                  </h3>
                  <p className="text-[10px] tracking-wider uppercase font-bold text-slate-400 dark:text-slate-500 mb-6">
                    Same People. Brighter Tomorrows.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                        <Brain className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wide uppercase text-slate-700 dark:text-slate-300 leading-tight">
                        Retrain The Brain
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                        <Footprints className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wide uppercase text-slate-700 dark:text-slate-300 leading-tight">
                        Regain Independence
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-950 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                        <Heart className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wide uppercase text-slate-700 dark:text-slate-300 leading-tight">
                        Live A Fuller Tomorrow
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-purple-50 dark:border-purple-900/30">
                  <button
                    onClick={() => openBookingModal()}
                    className="w-full text-center text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer"
                  >
                    Start Recovery →
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* 2. MAIN 3-COLUMN CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Sticky Stepper & Brand Quote (col-span-3) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
            
            {/* Article Highlights Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-100 dark:border-purple-900/40 shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <FileText className="w-4 h-4 text-[#7C3AED]" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Article Highlights
                </h3>
              </div>

              {/* Vertical Stepper */}
              <div className="relative pl-1">
                {/* Connecting Line */}
                <div className="absolute left-[9px] top-3 bottom-3 w-[1.5px] bg-slate-200 dark:bg-slate-800" />

                <nav className="space-y-4 relative">
                  {sections.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => scrollToSection(sec.id)}
                        className="flex items-center gap-3 w-full text-left group cursor-pointer transition-colors"
                      >
                        {/* Stepper Dot */}
                        <div
                          className={`w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                            isActive
                              ? 'bg-[#7C3AED] ring-4 ring-purple-100 dark:ring-purple-950'
                              : 'bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 group-hover:border-[#7C3AED]'
                          }`}
                        >
                          {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>

                        {/* Label */}
                        <span
                          className={`text-xs transition-colors ${
                            isActive
                              ? 'font-bold text-[#7C3AED] dark:text-purple-300'
                              : 'font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                          }`}
                        >
                          {sec.shortTitle || sec.title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Inspirational Brand Quote Card */}
            <div className="bg-gradient-to-br from-purple-50/90 to-indigo-50/50 dark:from-purple-950/20 dark:to-slate-900 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/40 shadow-xs relative overflow-hidden">
              <Quote className="w-8 h-8 text-[#7C3AED]/30 mb-2" />
              <p className="font-serif italic text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                “Recovery is not a race, but a journey of small, consistent steps.”
              </p>
              <div className="mt-4 pt-3 border-t border-purple-100/60 dark:border-purple-900/30">
                <p className="font-bold text-xs text-slate-900 dark:text-white">Aries PhysioCare</p>
                <p className="text-[11px] text-[#7C3AED] font-medium">The Healing Touch</p>
              </div>
            </div>

          </aside>


          {/* CENTER COLUMN: Main Structured Article Body (col-span-6) */}
          <article className="lg:col-span-6 space-y-12">
            {sections.map((sec) => {
              const IconComp = sec.icon;

              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 space-y-4 pb-4"
                >
                  {/* Section Title with Badge and Icon */}
                  <div className="flex items-start gap-3.5">
                    {/* Number Badge */}
                    <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-[#7C3AED] dark:text-purple-300 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                      {sec.number}
                    </div>

                    {/* Header with Icon */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <IconComp className="w-4 h-4 text-[#7C3AED]" />
                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                          {sec.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Intro text if any */}
                  {sec.intro && (
                    <p className="text-sm text-slate-600 dark:text-slate-300 pl-10 leading-relaxed font-medium">
                      {sec.intro}
                    </p>
                  )}

                  {/* Paragraphs */}
                  {sec.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-slate-600 dark:text-slate-300 pl-10 leading-relaxed font-normal"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Bullets List (Standard or 2-Column Grid) */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <div className="pl-10 pt-1">
                      {sec.isTwoColumnBullets ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                          {sec.bullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-1.5" />
                              <span className="leading-snug">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2.5">
                          {sec.bullets.map((bullet, idx) => {
                            // Render bold headers cleanly if formatted with markdown
                            if (bullet.includes('**')) {
                              const parts = bullet.split('**');
                              return (
                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-2" />
                                  <span className="leading-relaxed">
                                    <strong className="font-semibold text-slate-900 dark:text-white">
                                      {parts[1]}
                                    </strong>
                                    {parts.slice(2).join('')}
                                  </span>
                                </li>
                              );
                            }

                            return (
                              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-1.5" />
                                <span className="leading-relaxed">{bullet}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </section>
              );
            })}
          </article>


          {/* RIGHT COLUMN: What This Rehab Includes & Stronger Support (col-span-3) */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24">
            
            {/* What This Rehab Includes Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-100 dark:border-purple-900/40 shadow-xs">
              <div className="flex items-center gap-2 pb-4 mb-3 border-b border-slate-100 dark:border-slate-800">
                <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  What This Rehab Includes
                </h3>
              </div>

              <div className="space-y-3.5">
                {REHAB_INCLUDES.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0 mt-0.5 border border-purple-100/60 dark:border-purple-900/40">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stronger Support Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-purple-100 dark:border-purple-900/40 shadow-xs text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/80 text-[#7C3AED] dark:text-purple-300 mx-auto flex items-center justify-center mb-3 shadow-inner">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                Stronger Support <br />Healthier Tomorrows
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                We work together with patients and families to make recovery possible at home.
              </p>
              <Button
                onClick={() => openBookingModal()}
                variant="outline"
                className="mt-4 w-full text-xs font-bold border-purple-200 dark:border-purple-800 text-[#7C3AED] hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-full h-8 cursor-pointer"
              >
                Inquire Home Visit
              </Button>
            </div>

          </aside>

        </div>


        {/* 3. WIDE CALLOUT BOTTOM CTA BANNER */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 via-violet-50 to-indigo-50 dark:from-purple-950/30 dark:via-violet-950/25 dark:to-indigo-950/20 border border-purple-200/80 dark:border-purple-900/40 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-14 h-14 rounded-full bg-[#7C3AED]/10 dark:bg-purple-900/50 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0 shadow-inner">
              <Heart className="w-7 h-7 fill-[#7C3AED]/20" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                For better recovery, contact us or book appointment.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Take the next step towards a more independent and brighter tomorrow. Our neurological rehabilitation specialists are here to help.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              onClick={() => openBookingModal({ topic: post.topic, territory: post.territory })}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs sm:text-sm px-6 py-3 h-auto rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => openModal({ topic: post.topic, territory: post.territory })}
              variant="outline"
              className="border-[#7C3AED] text-[#7C3AED] hover:bg-purple-100/50 dark:hover:bg-purple-950/40 font-semibold text-xs sm:text-sm px-5 py-3 h-auto rounded-full transition-all flex items-center gap-1.5 cursor-pointer bg-white/80 dark:bg-transparent whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Talk to Specialist</span>
            </Button>
          </div>
        </div>


        {/* 4. RELATED ARTICLES SECTION */}
        <div className="mt-16 pt-10 border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Related Articles
            </h2>
            <Link
              href="/blogs"
              className="text-xs sm:text-sm font-semibold text-[#7C3AED] hover:text-[#6D28D9] flex items-center gap-1 group transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEFAULT_RELATED_ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blogs/${article.slug}`}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-purple-100/80 dark:border-purple-900/30 shadow-xs hover:shadow-md transition-all duration-300"
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
                    <span className="inline-block text-[11px] font-semibold text-[#7C3AED] dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-100 dark:border-purple-900/40 mb-2.5">
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
        </div>

      </section>

    </div>
  );
}
