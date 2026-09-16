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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRequestCallback } from '@/components/request-callback-provider';
import type { GrowthBlogPost } from '@/lib/growth-blog-posts';
import { SPINE_ORTHOPAEDIC_BLOGS } from '@/lib/spine-orthopaedic-blogs';

interface SectionData {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  paragraphs: string[];
  bullets?: string[];
  isTwoColumnBullets?: boolean;
}

interface ConditionTheme {
  isDDD: boolean;
  badgeText: string;
  heroBackdropImage?: string;
  heroRightImage: string;
  cursiveSlogan: { line1: string; line2: string; line3: string; line4: string };
  videoTitle: string;
  pdfGuideTitle: string;
  centerBannerTag: string;
  centerBannerTitle: string;
  centerBannerImage: string;
  rehabIncludesTitle: string;
  rehabIncludesItems: Array<{ icon: any; title: string }>;
  expertConsultTitle: string;
  expertConsultCategory: string;
  quoteText: string;
  ctaTitle: string;
  ctaSubtitle: string;
  promoCardTitle: string;
  promoCardPoints: string[];
  promoCardImage: string;
}

/**
 * Derives condition-specific visuals, headlines, and clinical highlights
 * strictly matching the blog topic and clinical condition.
 */
function getConditionTheme(post: GrowthBlogPost): ConditionTheme {
  const slug = (post.slug || '').toLowerCase();
  const title = (post.title || '').toLowerCase();
  const topic = (post.topic || '').toLowerCase();
  const territory = (post.territory || '').toLowerCase();

  const isDDD =
    slug.includes('degenerative-disc-disease') ||
    title.includes('degenerative disc disease');

  // 1. Degenerative Disc Disease (Dedicated Reference Layout)
  if (isDDD) {
    return {
      isDDD: true,
      badgeText: 'SPINE HEALTH',
      heroBackdropImage: '/images/blog/hero_ddd_clean_panoramic.png',
      heroRightImage: '/images/blog/hero_right_arch_clean.png',
      cursiveSlogan: {
        line1: 'Stronger',
        line2: 'Spine',
        line3: 'Brighter',
        line4: 'Tomorrows 💛',
      },
      videoTitle: 'Expert Insights: Degenerative Disc Disease & Active Recovery',
      pdfGuideTitle: 'Spine Care & Home Exercise Guide',
      centerBannerTag: 'DISC HEALTH',
      centerBannerTitle: 'Moves You Forward',
      centerBannerImage: '/images/blog/disc_health_cross_section.png',
      rehabIncludesTitle: 'What This Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Personalized Assessment' },
        { icon: Zap, title: 'Pain-Relief Techniques' },
        { icon: UserCheck, title: 'Posture & Ergonomic Training' },
        { icon: Activity, title: 'Strength & Mobility Exercises' },
        { icon: Home, title: 'Daily Activity Guidance' },
        { icon: Stethoscope, title: 'Long-Term Spine Health Plan' },
      ],
      expertConsultTitle: 'Consult Our Spine Experts',
      expertConsultCategory: 'Spine Health',
      quoteText: '“Movement is medicine for a healthier spine.”',
      ctaTitle: 'Take Control of Your Spine Health Today!',
      ctaSubtitle:
        'Book a consultation with our expert physiotherapists and get a personalized care plan for lasting relief.',
      promoCardTitle: 'Move Better\nLive Stronger',
      promoCardPoints: ['Less Pain', 'More Mobility', 'Healthier Tomorrow'],
      promoCardImage: '/images/blog/promo_move_better.png',
    };
  }

  // 2. Spinal Stenosis
  if (slug.includes('stenosis') || title.includes('stenosis')) {
    const stenosisImg =
      post.imageUrl && !post.imageUrl.includes('unsplash.com')
        ? post.imageUrl
        : '/images/blog/spinal-stenosis-gait.jpg';
    return {
      isDDD: false,
      badgeText: 'SPINAL STENOSIS',
      heroRightImage: stenosisImg,
      cursiveSlogan: {
        line1: 'Walk',
        line2: 'Farther',
        line3: 'Stand',
        line4: 'Taller 🚶',
      },
      videoTitle: `Expert Insights: ${post.title}`,
      pdfGuideTitle: 'Spinal Stenosis Walking & Flexion Guide',
      centerBannerTag: 'CANAL DECOMPRESSION',
      centerBannerTitle: 'Pain-Free Walking Distance Restoration',
      centerBannerImage: '/images/blog/spinal-stenosis-gait.jpg',
      rehabIncludesTitle: 'What Stenosis Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Claudication Assessment' },
        { icon: Zap, title: 'Lumbar Flexion & Canal Opening' },
        { icon: UserCheck, title: 'Pelvic Tilt & Abdominal Retraining' },
        { icon: Activity, title: 'Progressive Interval Walking' },
        { icon: Home, title: 'Postural Offloading Strategies' },
        { icon: Stethoscope, title: 'Long-Term Mobility Plan' },
      ],
      expertConsultTitle: 'Consult Our Spine Specialists',
      expertConsultCategory: 'Spine & Back Care',
      quoteText: '“Opening the spinal canal through targeted flexion restores walking freedom.”',
      ctaTitle: 'Take Control of Your Walking Freedom Today!',
      ctaSubtitle:
        'Our specialized physical therapy protocols help open the spinal canal and restore walking tolerance.',
      promoCardTitle: 'Walk Farther\nStand Taller',
      promoCardPoints: ['Extended Walking Range', 'Reduced Leg Heaviness', 'Independent Living'],
      promoCardImage: '/images/blog/spinal-stenosis-gait.jpg',
    };
  }

  // 3. Sciatica & Radiculopathy
  if (
    slug.includes('sciatica') ||
    title.includes('sciatica') ||
    slug.includes('radiculopathy') ||
    title.includes('radiculopathy') ||
    slug.includes('piriformis')
  ) {
    const sciaticaImg =
      post.imageUrl && !post.imageUrl.includes('unsplash.com')
        ? post.imageUrl
        : '/images/blog/sciatica-nerve-relief.jpg';
    return {
      isDDD: false,
      badgeText: 'SCIATICA CARE',
      heroRightImage: sciaticaImg,
      cursiveSlogan: {
        line1: 'Nerve',
        line2: 'Relief',
        line3: 'Active',
        line4: 'Living ⚡',
      },
      videoTitle: `Expert Insights: ${post.title}`,
      pdfGuideTitle: 'Sciatica Relief & Nerve Gliding Guide',
      centerBannerTag: 'NERVE DECOMPRESSION',
      centerBannerTitle: 'Centralizing Sciatic Nerve Relief',
      centerBannerImage: '/images/blog/sciatica-nerve-relief.jpg',
      rehabIncludesTitle: 'What Sciatica Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Neural Tension Screen' },
        { icon: Zap, title: 'Sciatic Nerve Flossing' },
        { icon: UserCheck, title: 'McKenzie Centralization Drills' },
        { icon: Activity, title: 'Core & Pelvic Decompression' },
        { icon: Home, title: 'Ergonomic Lumbar Support' },
        { icon: Stethoscope, title: 'Long-Term Nerve Protection Plan' },
      ],
      expertConsultTitle: 'Consult Our Spine & Nerve Specialists',
      expertConsultCategory: 'Spine & Back Care',
      quoteText: '“Decompressing the nerve through guided movement restores natural mobility.”',
      ctaTitle: 'Take Control of Your Sciatica Relief Today!',
      ctaSubtitle:
        'Get doorstep physiotherapy to relieve radiating leg pain and restore comfortable walking.',
      promoCardTitle: 'Relieve Pain\nWalk Freely',
      promoCardPoints: ['Centralized Sciatic Pain', 'Unblocked Neural Mobility', 'Zero Downtime'],
      promoCardImage: '/images/blog/sciatica-nerve-relief.jpg',
    };
  }

  // 4. Disc Herniation / Prolapse / Bulge / Slipped Disc
  if (
    slug.includes('herniat') ||
    title.includes('herniat') ||
    slug.includes('slipped') ||
    title.includes('slipped') ||
    slug.includes('prolapse') ||
    title.includes('prolapse') ||
    slug.includes('bulge')
  ) {
    const discImg =
      post.imageUrl && !post.imageUrl.includes('unsplash.com')
        ? post.imageUrl
        : '/images/blog/disc-herniation-rehab.jpg';
    return {
      isDDD: false,
      badgeText: 'DISC CARE',
      heroRightImage: discImg,
      cursiveSlogan: {
        line1: 'Stronger',
        line2: 'Spine',
        line3: 'Brighter',
        line4: 'Tomorrows 💛',
      },
      videoTitle: `Expert Insights: ${post.title}`,
      pdfGuideTitle: 'Herniated & Bulging Disc Recovery Guide',
      centerBannerTag: 'DISC CENTRALIZATION',
      centerBannerTitle: 'Non-Surgical Disc Healing Protocols',
      centerBannerImage: '/images/blog/disc_health_cross_section.png',
      rehabIncludesTitle: 'What Disc Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Directional Preference Screen' },
        { icon: Zap, title: 'Prone Extension Centralization' },
        { icon: UserCheck, title: 'Deep Core Muscle Armor (TVA)' },
        { icon: Activity, title: 'Gentle Spinal Traction Drills' },
        { icon: Home, title: 'Safe Hip Hinging Retraining' },
        { icon: Stethoscope, title: 'Long-Term Spine Protection' },
      ],
      expertConsultTitle: 'Consult Our Spine Experts',
      expertConsultCategory: 'Spine & Back Care',
      quoteText: '“Targeted directional movement promotes natural disc centralization and healing.”',
      ctaTitle: 'Take Control of Your Disc Health Today!',
      ctaSubtitle:
        'Evidence-based physical therapy accelerates natural disc recovery without surgery.',
      promoCardTitle: 'Heal Discs\nStay Active',
      promoCardPoints: ['Centralized Disc Strain', 'Core Muscle Armor', 'Faster Return to Activity'],
      promoCardImage: '/images/blog/disc-herniation-rehab.jpg',
    };
  }

  // 5. Knee & Joint Osteoarthritis / Orthopaedics
  if (
    slug.includes('knee') ||
    title.includes('knee') ||
    slug.includes('osteoarthritis') ||
    title.includes('osteoarthritis') ||
    slug.includes('joint') ||
    title.includes('joint') ||
    slug.includes('arthritis') ||
    title.includes('arthritis')
  ) {
    const kneeImg =
      post.imageUrl && !post.imageUrl.includes('unsplash.com')
        ? post.imageUrl
        : '/images/physiotherapy/physio-knee-treatment.jpg';
    return {
      isDDD: false,
      badgeText: 'JOINT PRESERVATION',
      heroRightImage: kneeImg,
      cursiveSlogan: {
        line1: 'Preserve',
        line2: 'Joints',
        line3: 'Protect',
        line4: 'Freedom ⚡',
      },
      videoTitle: `Expert Insights: ${post.title}`,
      pdfGuideTitle: 'Knee Osteoarthritis Home Preservation Guide',
      centerBannerTag: 'JOINT PRESERVATION',
      centerBannerTitle: 'Protecting Mobility & Joint Cartilage',
      centerBannerImage: '/images/physiotherapy/program-knee.jpg',
      rehabIncludesTitle: 'What Joint Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Joint Biomechanical Assessment' },
        { icon: Zap, title: 'Pain-Free Range of Motion' },
        { icon: UserCheck, title: 'Quadriceps & Gluteal Conditioning' },
        { icon: Activity, title: 'Joint Offloading Techniques' },
        { icon: Home, title: 'Safe Daily Walking & Stair Drills' },
        { icon: Stethoscope, title: 'Long-Term Joint Health Plan' },
      ],
      expertConsultTitle: 'Consult Our Joint Specialists',
      expertConsultCategory: 'Orthopaedic Rehabilitation',
      quoteText: '“Strong supporting muscles protect aging joints from wear and tear.”',
      ctaTitle: 'Take Control of Your Joint Mobility Today!',
      ctaSubtitle:
        'Book a consultation with our orthopaedic physiotherapists for lasting joint preservation.',
      promoCardTitle: 'Preserve Joints\nMove Free',
      promoCardPoints: ['Relieved Joint Pressure', 'Restored Walking Distance', 'Active Pain-Free Life'],
      promoCardImage: '/images/physiotherapy/physio-knee-treatment.jpg',
    };
  }

  // 6. Cervical Spondylosis & Neck Pain
  if (
    slug.includes('cervical') ||
    title.includes('cervical') ||
    slug.includes('neck') ||
    title.includes('neck')
  ) {
    const cervicalImg =
      post.imageUrl && !post.imageUrl.includes('unsplash.com')
        ? post.imageUrl
        : '/images/physiotherapy/program-cervical.jpg';
    return {
      isDDD: false,
      badgeText: 'CERVICAL & NECK CARE',
      heroRightImage: cervicalImg,
      cursiveSlogan: {
        line1: 'Effortless',
        line2: 'Posture',
        line3: 'Pain-Free',
        line4: 'Focus 🌿',
      },
      videoTitle: `Expert Insights: ${post.title}`,
      pdfGuideTitle: 'Cervical Spine & Ergonomic Desk Health Guide',
      centerBannerTag: 'CERVICAL SPINE',
      centerBannerTitle: 'Ergonomic Alignment & Neck Pain Relief',
      centerBannerImage: cervicalImg,
      rehabIncludesTitle: 'What Neck Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Cervical Kinematic Screen' },
        { icon: Zap, title: 'Deep Neck Flexor Retraining' },
        { icon: UserCheck, title: 'Scapular Stabilizer Conditioning' },
        { icon: Activity, title: 'Ergonomic Posture Correction' },
        { icon: Home, title: 'Segmental Joint Mobilization' },
        { icon: Stethoscope, title: 'Long-Term Cervical Protection' },
      ],
      expertConsultTitle: 'Consult Our Cervical Specialists',
      expertConsultCategory: 'Spine & Back Care',
      quoteText: '“Neutral cervical alignment and deep neck flexor strength protect your spine all day.”',
      ctaTitle: 'Take Control of Your Neck Health Today!',
      ctaSubtitle:
        'Eliminate stiff neck, postural fatigue, and radiating arm pain with expert home physiotherapy.',
      promoCardTitle: 'Pain-Free Neck\nClear Focus',
      promoCardPoints: ['Relieved Tension Headaches', 'Restored Neck Turning', 'Ergonomic Comfort'],
      promoCardImage: cervicalImg,
    };
  }

  // 7. Stroke & Neurological Rehabilitation
  if (
    slug.includes('stroke') ||
    title.includes('stroke') ||
    slug.includes('neuroplasticity') ||
    title.includes('neuroplasticity') ||
    slug.includes('hemiplegia') ||
    slug.includes('paralysis') ||
    slug.includes('brain') ||
    topic.includes('stroke') ||
    (territory.includes('neuro') && !slug.includes('stenosis'))
  ) {
    const neuroImg =
      post.imageUrl && !post.imageUrl.includes('unsplash.com')
        ? post.imageUrl
        : '/images/blog/stroke-rehab-hero.jpg';
    return {
      isDDD: false,
      badgeText: 'STROKE & NEURO REHAB',
      heroRightImage: neuroImg,
      cursiveSlogan: {
        line1: 'Rewiring',
        line2: 'Movement',
        line3: 'Rebuilding',
        line4: 'Hope 🌟',
      },
      videoTitle: `Expert Insights: ${post.title}`,
      pdfGuideTitle: 'Post-Stroke Home Recovery & Exercise Guide',
      centerBannerTag: 'NEUROLOGICAL CARE',
      centerBannerTitle: 'Activating Neuroplasticity Every Single Day',
      centerBannerImage: '/images/blog/neuroplasticity-brain.jpg',
      rehabIncludesTitle: 'What Neuro Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Neurological Motor Screen' },
        { icon: Zap, title: 'Motor Re-Education Protocols' },
        { icon: UserCheck, title: 'Balance & Fall Prevention' },
        { icon: Activity, title: 'Task-Oriented Functional Drills' },
        { icon: Home, title: 'Caregiver & Transfer Guidance' },
        { icon: Stethoscope, title: 'Long-Term Neuroplasticity Plan' },
      ],
      expertConsultTitle: 'Consult Our Neuro Specialists',
      expertConsultCategory: 'Neurological Care',
      quoteText: '“Neuroplasticity thrives on consistent, purposeful daily movement.”',
      ctaTitle: 'Take Control of Your Stroke Recovery Today!',
      ctaSubtitle:
        'Book a consultation with our neurological physiotherapists for milestone-driven in-home recovery.',
      promoCardTitle: 'Rewire Faster\nRecover Stronger',
      promoCardPoints: ['Restored Motor Control', 'Greater Independence', 'Safe Home Recovery'],
      promoCardImage: '/images/blog/stroke-rehab-hero.jpg',
    };
  }

  // 8. General Spine & Low Back Pain
  if (
    slug.includes('back') ||
    title.includes('back') ||
    slug.includes('spine') ||
    topic.includes('spine')
  ) {
    const spineImg =
      post.imageUrl && !post.imageUrl.includes('unsplash.com')
        ? post.imageUrl
        : '/images/blog/lumbar-spine-rehab.jpg';
    return {
      isDDD: false,
      badgeText: (post.topic || 'SPINE & BACK CARE').toUpperCase(),
      heroRightImage: spineImg,
      cursiveSlogan: {
        line1: 'Stronger',
        line2: 'Spine',
        line3: 'Brighter',
        line4: 'Tomorrows 💛',
      },
      videoTitle: `Expert Insights: ${post.title}`,
      pdfGuideTitle: 'Spine Care & Home Exercise Guide',
      centerBannerTag: 'SPINE RECOVERY',
      centerBannerTitle: 'Evidence-Based Spine Conditioning at Home',
      centerBannerImage: '/images/blog/disc_health_cross_section.png',
      rehabIncludesTitle: 'What Spine Rehab Includes',
      rehabIncludesItems: [
        { icon: ClipboardCheck, title: 'Personalized Assessment' },
        { icon: Zap, title: 'Pain-Relief Techniques' },
        { icon: UserCheck, title: 'Posture & Ergonomic Training' },
        { icon: Activity, title: 'Strength & Mobility Exercises' },
        { icon: Home, title: 'Daily Activity Guidance' },
        { icon: Stethoscope, title: 'Long-Term Spine Health Plan' },
      ],
      expertConsultTitle: 'Consult Our Spine Experts',
      expertConsultCategory: 'Spine & Back Care',
      quoteText: '“Movement is medicine for a healthier spine.”',
      ctaTitle: 'Take Control of Your Spine Health Today!',
      ctaSubtitle:
        'Book a consultation with our expert physiotherapists and get a personalized care plan for lasting relief.',
      promoCardTitle: 'Move Better\nLive Stronger',
      promoCardPoints: ['Less Pain', 'More Mobility', 'Healthier Tomorrow'],
      promoCardImage: '/images/blog/promo_move_better.png',
    };
  }

  // 9. Default Clinical Physiotherapy
  const defaultImg =
    post.imageUrl && !post.imageUrl.includes('unsplash.com')
      ? post.imageUrl
      : '/images/physiotherapy/physio-understanding-treatment.jpg';
  return {
    isDDD: false,
    badgeText: (post.topic || post.territory || 'CLINICAL CARE').toUpperCase(),
    heroRightImage: defaultImg,
    cursiveSlogan: {
      line1: 'Targeted',
      line2: 'Care',
      line3: 'Lasting',
      line4: 'Recovery 🌟',
    },
    videoTitle: `Expert Insights: ${post.title}`,
    pdfGuideTitle: 'Clinical Physiotherapy & Home Recovery Guide',
    centerBannerTag: 'CLINICAL RECOVERY',
    centerBannerTitle: 'Evidence-Based Care That Moves You Forward',
    centerBannerImage: defaultImg,
    rehabIncludesTitle: 'What This Rehab Includes',
    rehabIncludesItems: [
      { icon: ClipboardCheck, title: 'Personalized Clinical Assessment' },
      { icon: Zap, title: 'Evidence-Based Pain Relief' },
      { icon: UserCheck, title: 'Posture & Biomechanical Retraining' },
      { icon: Activity, title: 'Therapeutic Exercise Progression' },
      { icon: Home, title: 'Home Activity & Lifestyle Advice' },
      { icon: Stethoscope, title: 'Long-Term Health Maintenance Plan' },
    ],
    expertConsultTitle: 'Consult Our Clinical Specialists',
    expertConsultCategory: post.territory || 'Physiotherapy',
    quoteText: '“Movement is medicine for a healthier body and mind.”',
    ctaTitle: 'Take Control of Your Recovery Today!',
    ctaSubtitle:
      'Book a consultation with our clinical physiotherapists and start your personalized recovery journey.',
    promoCardTitle: 'Move Better\nLive Stronger',
    promoCardPoints: ['Less Pain', 'More Mobility', 'Healthier Tomorrow'],
    promoCardImage: defaultImg,
  };
}

/**
 * Renders markdown bold text (**text**) as bold elements
 */
function renderFormattedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={index} className="font-bold text-slate-900 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function GrowthBlogArticle({ post }: { post: GrowthBlogPost }) {
  const { openBookingModal, openModal } = useRequestCallback();
  const [activeSection, setActiveSection] = useState<string>('sec-1');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Condition Theme Engine
  const conditionTheme = useMemo(() => getConditionTheme(post), [post]);

  // Two-tone title formatting
  const { titlePrefix, titleSuffix } = useMemo(() => {
    const raw = post.title || '';
    const colonIndex = raw.indexOf(':');
    if (colonIndex !== -1) {
      return {
        titlePrefix: raw.slice(0, colonIndex + 1),
        titleSuffix: raw.slice(colonIndex + 1).trim(),
      };
    }
    return {
      titlePrefix: raw,
      titleSuffix: '',
    };
  }, [post.title]);

  // Dynamic reading time estimate
  const readTime = useMemo(() => {
    const wordCount = (post.content || '').split(/\s+/).length;
    return `${Math.max(6, Math.min(15, Math.ceil(wordCount / 180)))} min read`;
  }, [post.content]);

  // Dynamic date formatting
  const formattedDate = useMemo(() => {
    if (!post.publishedAt) return '5 Feb 2026';
    try {
      const d = new Date(post.publishedAt);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return '5 Feb 2026';
    }
  }, [post.publishedAt]);

  // Parse structured markdown sections strictly from this post's content
  const sections: SectionData[] = useMemo(() => {
    const rawContent = post.content || '';
    const lines = rawContent.split('\n');
    const parsed: SectionData[] = [];
    let currentSection: Partial<SectionData> | null = null;
    let secCounter = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Skip the very first H1 if it repeats the article title
      if (line.startsWith('# ') && i < 5) {
        continue;
      }

      // Match ## or ### headings
      const headingMatch = line.match(/^#{2,3}\s+(?:(\d+)[\.\s]+)?(.*)$/);

      if (headingMatch) {
        if (currentSection && currentSection.title) {
          parsed.push(currentSection as SectionData);
        }
        const num = headingMatch[1] ? parseInt(headingMatch[1], 10) : secCounter++;
        const fullTitle = headingMatch[2].trim();

        let shortTitle = fullTitle.split(':')[0].replace(/^(Understanding|The|About)\s+/i, '');
        if (shortTitle.length > 28) {
          shortTitle = shortTitle.slice(0, 25) + '...';
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

    // If no ## headings exist, structure raw paragraphs cleanly
    if (parsed.length === 0) {
      const paras = lines.filter((l) => l.trim().length > 0 && !l.trim().startsWith('#'));
      if (paras.length > 0) {
        parsed.push({
          id: 'sec-1',
          number: 1,
          title: 'Clinical Overview & Pathomechanics',
          shortTitle: 'Clinical Overview',
          paragraphs: paras.slice(0, 2),
        });
        if (paras.length > 2) {
          parsed.push({
            id: 'sec-2',
            number: 2,
            title: 'Evidence-Based Rehabilitation Protocols',
            shortTitle: 'Rehab Protocols',
            paragraphs: paras.slice(2, 4),
          });
        }
        if (paras.length > 4) {
          parsed.push({
            id: 'sec-3',
            number: 3,
            title: 'Recovery Outlook & Long-Term Management',
            shortTitle: 'Recovery & Care',
            paragraphs: paras.slice(4),
          });
        }
      }
    }

    // Apply 2-column bullets to multi-item bullet sections
    return parsed.map((sec) => {
      if ((sec.bullets?.length || 0) >= 4) {
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
      `Hello Aries PhysioCare, I am reading about ${post.title} on your website and would like to consult an expert physiotherapist.`
    );
    window.open(`https://wa.me/919372661410?text=${text}`, '_blank');
  };

  // Dynamic related articles matched to condition/topic
  const relatedArticles = useMemo(() => {
    if (conditionTheme.isDDD) {
      return [
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
    }

    const allPosts = SPINE_ORTHOPAEDIC_BLOGS;
    const pool = allPosts.filter((p) => p.slug !== post.slug);

    // Filter by same topic or territory
    const sameCategory = pool.filter(
      (p) =>
        (p.topic && post.topic && p.topic.toLowerCase() === post.topic.toLowerCase()) ||
        (p.territory && post.territory && p.territory.toLowerCase() === post.territory.toLowerCase())
    );

    const candidates = sameCategory.length >= 3 ? sameCategory : pool;
    const selected = candidates.slice(0, 3);

    return selected.map((p) => {
      const theme = getConditionTheme(p);
      return {
        slug: p.slug,
        title: p.title,
        tag: (p.topic || p.territory || 'CLINICAL CARE').toUpperCase(),
        description: p.summary,
        readTime: '6 min read',
        imageUrl: p.imageUrl || theme.heroRightImage,
      };
    });
  }, [post.slug, post.topic, post.territory, conditionTheme.isDDD]);

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-[#7C3AED]/20 pb-16">
      
      {/* ── 1. HERO SECTION WITH CONDITION-SPECIFIC VISUALS ────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#F8F5FE] via-[#F4EFFB] to-[#EFE8F9] dark:from-[#17122a] dark:via-[#1c1633] dark:to-background border-b border-purple-200/50 dark:border-purple-950/40">
        
        {/* For DDD: Display custom seamless panoramic hero backdrop */}
        {conditionTheme.isDDD && (
          <div className="absolute inset-0 hidden lg:block z-0 pointer-events-none select-none">
            <Image
              src={conditionTheme.heroBackdropImage!}
              alt={post.title}
              fill
              priority
              quality={95}
              className="object-cover object-right xl:object-center"
            />
          </div>
        )}

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-4 pb-8 lg:pt-6 lg:pb-12 relative z-10">
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <Link href="/" className="hover:text-[#7C3AED] transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blogs" className="hover:text-[#7C3AED] transition-colors">Blog</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 dark:text-slate-200 font-medium line-clamp-1 max-w-xs sm:max-w-md">
              {post.title}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[340px] lg:min-h-[400px]">
            
            {/* Left Column: Category, Headline, Excerpt, Author Meta */}
            <div className="lg:col-span-7 space-y-4 lg:space-y-5 max-w-2xl">
              
              {/* Category Pill */}
              <div>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-[#5B21B6] text-white shadow-xs">
                  {conditionTheme.badgeText}
                </span>
              </div>

              {/* Dynamic Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] font-black tracking-tight leading-[1.15]">
                <span className="text-[#5B21B6] dark:text-[#A78BFA] block">
                  {titlePrefix}
                </span>
                {titleSuffix && (
                  <span className="text-[#3B1270] dark:text-purple-200 block font-bold mt-1">
                    {titleSuffix}
                  </span>
                )}
              </h1>

              {/* Dynamic Excerpt */}
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-[15px] leading-relaxed font-normal">
                {post.summary}
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
                  <span>{formattedDate}</span>
                </div>

                {/* Reading time */}
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#7C3AED]" />
                  <span>{readTime}</span>
                </div>

                {/* Views */}
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#7C3AED]" />
                  <span>2.4k views</span>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Tailored to Condition */}
            <div className="lg:col-span-5 relative flex items-center justify-end h-full">
              
              {conditionTheme.isDDD ? (
                <>
                  {/* Mobile version for DDD */}
                  <div className="block lg:hidden relative w-full h-[300px] rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={conditionTheme.heroRightImage}
                      alt={post.title}
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

                  {/* Desktop interactive button positioned over Watch Expert Insights in backdrop */}
                  <div className="hidden lg:block relative w-full h-[360px]">
                    <button
                      onClick={() => setIsVideoModalOpen(true)}
                      aria-label="Watch Expert Insights Video"
                      title="Watch Expert Insights Video"
                      className="absolute bottom-10 right-4 xl:right-10 flex items-center gap-3 py-2 px-4 rounded-full bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-900 active:scale-95 transition-all cursor-pointer group border border-purple-200/50 shadow-sm backdrop-blur-xs"
                    >
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-[#7C3AED] transition-colors">
                        Watch Expert Insights
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                /* Condition-specific Sweeping Arched Graphic for All Other Articles */
                <div className="relative w-full max-w-[480px] h-[340px] sm:h-[400px] lg:h-[430px]">
                  
                  {/* Sweeping Arched Frame with Soft Lavender Border */}
                  <div className="relative w-full h-full rounded-[2.5rem] lg:rounded-l-[4rem] lg:rounded-r-[2.5rem] overflow-hidden shadow-xl border-4 border-white/80 dark:border-purple-900/40 bg-purple-100 dark:bg-purple-950/40">
                    <Image
                      src={conditionTheme.heroRightImage}
                      alt={post.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Top-Right Cursive Badge */}
                  <div className="absolute top-4 right-4 sm:right-6 text-right select-none pointer-events-none drop-shadow-sm bg-white/80 dark:bg-black/50 backdrop-blur-xs py-1.5 px-3 rounded-2xl border border-white/60">
                    <p className="font-serif italic font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm leading-tight">
                      {conditionTheme.cursiveSlogan.line1}<br />
                      {conditionTheme.cursiveSlogan.line2}<br />
                      <span className="text-[#6D28D9] dark:text-[#C4B5FD]">{conditionTheme.cursiveSlogan.line3}</span><br />
                      {conditionTheme.cursiveSlogan.line4}
                    </p>
                  </div>

                  {/* Floating Bottom-Right Play Button */}
                  <button
                    onClick={() => setIsVideoModalOpen(true)}
                    aria-label={`Watch Expert Insights on ${post.title}`}
                    className="absolute bottom-4 right-4 sm:right-6 flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 active:scale-95 transition-all cursor-pointer group border border-purple-200/50 shadow-lg backdrop-blur-xs"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-[#7C3AED] transition-colors">
                      Watch Expert Insights
                    </span>
                  </button>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>


      {/* ── 2. THREE-COLUMN BODY LAYOUT WITH FROZEN STICKY SIDEBARS ────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 pt-8 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ────────────────────────────────────────────────────────────────
              LEFT COLUMN: FROZEN STICKY SIDEBAR (Article Highlights & Guide)
             ──────────────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 self-start order-2 lg:order-1 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar">
            
            {/* 1. Article Highlights (Table of Contents) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-purple-100 dark:border-purple-900/40 shadow-xs">
              <h3 className="font-bold text-base text-slate-900 dark:text-white pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                Article Highlights
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

                      <span className="text-xs sm:text-[13px] leading-snug line-clamp-1">
                        {sec.shortTitle}
                      </span>
                    </button>
                  );
                })}

                {/* Related Articles TOC anchor */}
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
                    {activeSection === 'sec-related' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="text-xs sm:text-[13px] leading-snug">
                    Related Articles
                  </span>
                </button>
              </nav>
            </div>

            {/* 2. Download Guide Card */}
            <div className="bg-[#F8F5FE] dark:bg-purple-950/20 rounded-2xl p-5 border border-purple-100 dark:border-purple-900/40 shadow-xs space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-[#7C3AED] dark:text-purple-300 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight">
                    Download Guide
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    Get our clinical recovery and home exercise guide.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setIsPdfModalOpen(true)}
                variant="outline"
                className="w-full bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-950/50 text-[#7C3AED] dark:text-purple-300 border-purple-200 dark:border-purple-800 font-semibold text-xs py-2.5 h-auto rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Download PDF</span>
                <Download className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* 3. Movement Quote Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border-l-4 border-amber-400 border-y border-r border-slate-100 dark:border-slate-800 shadow-xs">
              <p className="font-serif italic text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed">
                {conditionTheme.quoteText}
              </p>
            </div>

          </aside>


          {/* ────────────────────────────────────────────────────────────────
              CENTER COLUMN: MAIN CLINICAL CONTENT
             ──────────────────────────────────────────────────────────────── */}
          <main className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            
            {/* Condition-Specific Featured Center Banner */}
            <div className="bg-[#1E2439] rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between text-white border border-slate-800/20 shadow-sm">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {conditionTheme.centerBannerTag}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-1 leading-snug">
                  {conditionTheme.centerBannerTitle}
                </h3>
                <div className="w-12 h-1 bg-amber-400 rounded-full mt-2 mx-auto md:mx-0" />
              </div>

              <div className="relative w-40 h-28 sm:w-48 sm:h-32 mt-4 md:mt-0 shrink-0 rounded-xl overflow-hidden">
                <Image
                  src={conditionTheme.centerBannerImage}
                  alt={conditionTheme.centerBannerTitle}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Numbered Clinical Sections from Post Content */}
            <article className="space-y-4">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-100 dark:border-slate-800/60 shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-3.5 transition-all"
                >
                  {/* Header: Purple Circle Badge + Title */}
                  <div className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#6D28D9] text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-sm mt-0.5">
                      {section.number}
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug pt-0.5">
                      {section.title}
                    </h2>
                  </div>

                  {/* Paragraphs */}
                  {section.paragraphs && section.paragraphs.length > 0 && (
                    <div className="space-y-2.5 pl-10 sm:pl-11 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx}>{renderFormattedText(p)}</p>
                      ))}
                    </div>
                  )}

                  {/* Bullets (2-column layout matching design for multi-item lists) */}
                  {section.bullets && section.bullets.length > 0 && (
                    <div className="pl-10 sm:pl-11 pt-1">
                      {section.isTwoColumnBullets ? (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                          {section.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-1.5" />
                              <span className="leading-relaxed">{renderFormattedText(bullet)}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="space-y-2">
                          {section.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] shrink-0 mt-1.5" />
                              <span className="leading-relaxed">{renderFormattedText(bullet)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </section>
              ))}
            </article>

            {/* Bottom Purple CTA Banner Tailored to Condition */}
            <div className="bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
              <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="w-12 h-12 rounded-full bg-white text-[#7C3AED] flex items-center justify-center shrink-0 shadow-md">
                  <Calendar className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                    {conditionTheme.ctaTitle}
                  </h3>
                  <p className="text-xs text-purple-100 mt-1 leading-relaxed max-w-md">
                    {conditionTheme.ctaSubtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto justify-center">
                <Button
                  onClick={() =>
                    openBookingModal({
                      topic: post.title,
                      territory: conditionTheme.expertConsultCategory,
                    })
                  }
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
              RIGHT COLUMN: FROZEN STICKY SIDEBAR (Rehab Includes & Experts)
             ──────────────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 self-start order-3 max-h-[calc(100vh-7rem)] overflow-y-auto no-scrollbar">
            
            {/* 1. What This Rehab Includes Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-purple-100 dark:border-purple-900/40 shadow-xs">
              {/* Dark Purple Header */}
              <div className="bg-[#3B1270] text-white px-4 py-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <h3 className="font-bold text-xs sm:text-sm text-white tracking-wide">
                  {conditionTheme.rehabIncludesTitle}
                </h3>
              </div>

              {/* 6 Structured Items */}
              <div className="p-4 space-y-2.5">
                {conditionTheme.rehabIncludesItems.map((item, idx) => {
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

            {/* 2. Consult Our Experts Card with Official Logo */}
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
                  {conditionTheme.expertConsultTitle}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Get a personalized assessment and start your recovery journey today.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Button
                  onClick={() =>
                    openBookingModal({
                      topic: post.title,
                      territory: conditionTheme.expertConsultCategory,
                    })
                  }
                  className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-xs py-2.5 h-auto rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>

                <Button
                  onClick={() =>
                    openModal({
                      topic: post.title,
                      territory: conditionTheme.expertConsultCategory,
                    })
                  }
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
                <h4 className="font-black text-base text-white leading-tight whitespace-pre-line">
                  {conditionTheme.promoCardTitle}
                </h4>

                <div className="space-y-1.5 text-xs">
                  {conditionTheme.promoCardPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="font-medium text-slate-200">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Condition Graphic Preview */}
              <div className="absolute right-0 top-0 bottom-0 w-28 opacity-80 pointer-events-none">
                <Image
                  src={conditionTheme.promoCardImage}
                  alt={conditionTheme.promoCardTitle}
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
            {relatedArticles.map((article) => (
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
                <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1">
                  {conditionTheme.videoTitle}
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
                src={conditionTheme.heroRightImage}
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
                    {post.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Presented by Dr. Rhea Sharma, Senior Physiotherapist at Aries PhysioCare
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    openBookingModal({
                      topic: post.title,
                      territory: conditionTheme.expertConsultCategory,
                    });
                  }}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg cursor-pointer"
                >
                  Schedule Consultation With Dr. Rhea Sharma
                </Button>
              </div>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
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
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white line-clamp-1">
                  {conditionTheme.pdfGuideTitle}
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
                    Aries PhysioCare: Clinical {conditionTheme.badgeText} Protocol
                  </h4>
                  <p className="text-xs text-slate-500">Official Patient Handout &bull; Issue 2026</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <p className="font-semibold text-slate-900 dark:text-white">
                  Key Chapters Included in this PDF Guide:
                </p>
                <ul className="space-y-1.5 pl-4 list-disc marker:text-[#7C3AED]">
                  <li>Clinical biomechanics and pathophysiology overview of {post.title}.</li>
                  <li>Daily morning and evening mobility drills with safe alignment.</li>
                  <li>Targeted muscular strengthening and joint offloading protocols.</li>
                  <li>Ergonomic workstation setup checklist and daily posture advice.</li>
                  <li>When to seek certified doorstep physiotherapist supervision.</li>
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
