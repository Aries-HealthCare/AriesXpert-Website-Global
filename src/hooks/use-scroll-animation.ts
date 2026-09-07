/**
 * Shared scroll animation variants and presets for AriesXpert landing page.
 * Uses Framer Motion v11's `whileInView` pattern for elegant, natural entrance effects.
 *
 * All variants respect `MotionConfig reducedMotion="user"` — if the user has
 * system-level reduced-motion enabled, Framer Motion automatically disables animations.
 */

import { Variants } from 'framer-motion';

// ── Viewport trigger config ───────────────────────────────────────────────────
export const viewportConfig = {
  once: true,
  margin: '-80px',
} as const;

// ── Base transition presets ───────────────────────────────────────────────────
export const spring = {
  type: 'spring' as const,
  stiffness: 60,
  damping: 20,
  mass: 0.8,
};

export const easeOut = {
  type: 'tween' as const,
  ease: [0.16, 1, 0.3, 1],
  duration: 0.7,
};

export const gentleEase = {
  type: 'tween' as const,
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.65,
};

// ── Animation Variants ────────────────────────────────────────────────────────

/** Fade up — default for section headers, badges, sub-text */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOut,
  },
};

/** Pure fade — for background blobs, overlays */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ...gentleEase, duration: 0.9 },
  },
};

/** Slide in from left — for alternating stage cards */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOut,
  },
};

/** Slide in from right — for alternating stage cards */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: easeOut,
  },
};

/** Scale up — for KPI badges, stat pills, pricing card highlights */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...spring },
  },
};

/** Card reveal — gentle lift + fade for grid cards */
export const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: easeOut,
  },
};

/** Container that staggers its children */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

/** Faster stagger for tighter grids */
export const fastStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

/** Stagger for horizontal rows (tag pills, icon strips) */
export const pillStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

/** Individual pill / badge item */
export const pillItem: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: gentleEase,
  },
};
