'use client';

import React from 'react';

interface NatureAmbianceProps {
  variant?: 'hero' | 'section' | 'subtle';
  className?: string;
}

export default function NatureAmbiance({ variant = 'hero', className = '' }: NatureAmbianceProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* ── Ambient Radial Emerald Glows ── */}
      <div className="absolute -top-16 -left-16 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-br from-emerald-400/20 via-teal-300/15 to-transparent blur-3xl animate-nature-pulse" />
      <div className="absolute top-1/3 -right-20 w-80 sm:w-[450px] h-80 sm:h-[450px] rounded-full bg-gradient-to-bl from-green-300/15 via-emerald-500/10 to-transparent blur-3xl animate-nature-pulse [animation-delay:4s]" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-72 rounded-full bg-gradient-to-tr from-teal-400/15 via-emerald-300/10 to-transparent blur-3xl" />

      {/* ── Floating Leaf 1: Top-Left Eucalyptus Leaf ── */}
      <div className="absolute top-12 left-4 sm:left-12 opacity-75 dark:opacity-60 animate-leaf-drift-1">
        <svg
          className="w-10 sm:w-16 h-12 sm:h-20 text-emerald-600 dark:text-emerald-400 drop-shadow-[0_8px_16px_rgba(16,185,129,0.25)] animate-leaf-sway"
          viewBox="0 0 64 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Leaf Body */}
          <path
            d="M32 4C14 22 8 46 22 68C34 56 46 42 52 24C52 14 44 4 32 4Z"
            fill="url(#leaf-grad-1)"
            fillOpacity="0.85"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          {/* Central Stem & Veins */}
          <path d="M32 4C28 26 24 50 22 68" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M30 22C24 24 18 28 14 34" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <path d="M28 36C22 40 18 46 16 52" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <path d="M34 18C40 22 45 28 48 34" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <path d="M32 32C38 36 42 42 44 48" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <defs>
            <linearGradient id="leaf-grad-1" x1="10" y1="4" x2="52" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#34D399" />
              <stop offset="0.6" stopColor="#10B981" />
              <stop offset="1" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Floating Leaf 2: Top-Right Broad Healing Leaf ── */}
      <div className="absolute top-8 right-6 sm:right-16 opacity-70 dark:opacity-50 animate-leaf-drift-2">
        <svg
          className="w-12 sm:w-20 h-14 sm:h-24 text-emerald-500 dark:text-emerald-400 drop-shadow-[0_8px_20px_rgba(5,150,105,0.25)] animate-leaf-sway [animation-delay:2s]"
          viewBox="0 0 70 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58 8C38 10 14 26 10 54C28 66 48 64 62 48C68 34 68 18 58 8Z"
            fill="url(#leaf-grad-2)"
            fillOpacity="0.82"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <path d="M58 8C44 28 32 50 16 78" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M46 24C36 28 26 34 20 42" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <path d="M38 38C30 44 24 50 20 58" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <path d="M52 20C56 28 58 36 58 46" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
          <defs>
            <linearGradient id="leaf-grad-2" x1="60" y1="8" x2="15" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6EE7B7" />
              <stop offset="0.5" stopColor="#10B981" />
              <stop offset="1" stopColor="#065F46" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Floating Leaf 3: Mid-Left Subtle Willow/Sage Leaflet ── */}
      <div className="absolute top-1/2 left-2 sm:left-8 opacity-65 dark:opacity-45 animate-leaf-drift-2 [animation-delay:5s]">
        <svg
          className="w-8 sm:w-14 h-12 sm:h-20 text-teal-600 dark:text-teal-400 drop-shadow-md animate-leaf-sway [animation-delay:3s]"
          viewBox="0 0 50 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 6C12 24 10 48 24 74C34 54 36 30 25 6Z"
            fill="url(#leaf-grad-3)"
            fillOpacity="0.75"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M25 6C22 30 22 52 24 74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <defs>
            <linearGradient id="leaf-grad-3" x1="25" y1="6" x2="25" y2="74" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5EEAD4" />
              <stop offset="1" stopColor="#0D9488" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Floating Leaf 4: Bottom-Right Gentle Accent Leaf ── */}
      <div className="absolute bottom-16 right-4 sm:right-20 opacity-70 dark:opacity-50 animate-leaf-drift-1 [animation-delay:7s]">
        <svg
          className="w-10 sm:w-16 h-12 sm:h-18 text-emerald-600 dark:text-emerald-400 drop-shadow-[0_6px_14px_rgba(16,185,129,0.2)] animate-leaf-sway [animation-delay:1.5s]"
          viewBox="0 0 60 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12C28 10 46 22 50 46C34 56 20 52 12 36C8 26 8 18 10 12Z"
            fill="url(#leaf-grad-4)"
            fillOpacity="0.8"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M10 12C24 26 34 40 42 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <defs>
            <linearGradient id="leaf-grad-4" x1="10" y1="12" x2="45" y2="55" gradientUnits="userSpaceOnUse">
              <stop stopColor="#A7F3D0" />
              <stop offset="0.5" stopColor="#34D399" />
              <stop offset="1" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── Glowing Nature Dewdrops / Spores ── */}
      <div className="absolute top-28 left-1/4 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34D399] animate-ping opacity-60 [animation-duration:3s]" />
      <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 rounded-full bg-teal-300 shadow-[0_0_14px_#5EEAD4] animate-pulse opacity-70 [animation-duration:4s]" />
      <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#6EE7B7] animate-ping opacity-50 [animation-duration:5s]" />
      <div className="absolute bottom-28 left-1/3 w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_#4ADE80] animate-pulse opacity-60 [animation-duration:3.5s]" />
    </div>
  );
}
