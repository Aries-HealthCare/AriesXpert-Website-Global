'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Medical Joint Telemetry Points mapped to anatomical locations
const ANATOMICAL_NODES = [
  { id: 'cervical', label: 'C-Spine · 82° ROM', x: '50%', y: '26%', color: 'text-cyan-400', ringColor: 'border-cyan-400' },
  { id: 'shoulder-r', label: 'R-Glenohumeral · 178°', x: '42%', y: '33%', color: 'text-sky-400', ringColor: 'border-sky-400' },
  { id: 'shoulder-l', label: 'L-Glenohumeral · OK', x: '58%', y: '33%', color: 'text-cyan-400', ringColor: 'border-cyan-400' },
  { id: 'lumbar', label: 'L4-L5 Kinematics · 99.2%', x: '50%', y: '48%', color: 'text-blue-400', ringColor: 'border-blue-400' },
  { id: 'hip-r', label: 'R-Acetabulofemoral · 125°', x: '45%', y: '56%', color: 'text-indigo-400', ringColor: 'border-indigo-400' },
  { id: 'knee-r', label: 'R-Patellofemoral · 135°', x: '41%', y: '72%', color: 'text-emerald-400', ringColor: 'border-emerald-400' },
  { id: 'knee-l', label: 'L-Patellofemoral · 138°', x: '59%', y: '68%', color: 'text-emerald-400', ringColor: 'border-emerald-400' },
  { id: 'ankle-r', label: 'R-Talocrural · 42° Flex', x: '38%', y: '88%', color: 'text-cyan-300', ringColor: 'border-cyan-300' },
];

export default function HeroSplineBackground() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse parallax listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // -10px to +10px
      const y = (e.clientY / innerHeight - 0.5) * 20; // -10px to +10px
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cycle active telemetry telemetry pings every 2.4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % ANATOMICAL_NODES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* ── 1. Volumetric Medical Light Blooms ── */}
      <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-blue-600/12 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-indigo-600/8 rounded-full blur-[180px]" />

      {/* ── 2. Cybernetic Precision Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.25) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── 3. 3D Biomechanical Anatomical Stage with Cursor Parallax ── */}
      <motion.div
        animate={{
          x: mouseOffset.x * 1.5,
          y: mouseOffset.y * 1.5,
        }}
        transition={{ type: 'spring', stiffness: 75, damping: 25 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] lg:w-[750px] lg:h-[750px]"
      >
        {/* Concentric Biometric Telemetry Orbit Rings */}
        <div 
          className="absolute inset-[-40px] rounded-full border border-cyan-500/15 animate-spin"
          style={{ animationDuration: '45s' }}
        />
        <div 
          className="absolute inset-[-10px] rounded-full border border-blue-500/20 animate-spin"
          style={{ animationDuration: '30s', animationDirection: 'reverse' }}
        />
        <div className="absolute inset-[60px] rounded-full border border-cyan-400/10" />
        <div className="absolute inset-[130px] rounded-full border border-indigo-400/15 border-dashed" />

        {/* Pulsing Radar Radar Sweep */}
        <div 
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(0,240,255,0.08)_360deg)] animate-spin"
          style={{ animationDuration: '8s' }}
        />

        {/* 3D Anatomical Runner Human Silhouette */}
        <div className="relative w-full h-full opacity-45 mix-blend-screen">
          <Image
            src="/hero/anatomy-runner.jpg"
            alt="Biomechanical Human Kinematics Hologram"
            fill
            sizes="(max-width: 1024px) 620px, 750px"
            className="object-contain filter drop-shadow-[0_0_40px_rgba(6,182,212,0.35)]"
            priority
          />
        </div>

        {/* ── 4. Interactive Live Medical Telemetry Nodes ── */}
        {ANATOMICAL_NODES.map((node, i) => {
          const isActive = i === activeNodeIndex;
          return (
            <div
              key={node.id}
              style={{ left: node.x, top: node.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              {/* Pulsing Multi-Ring Node Core */}
              <div className="relative flex items-center justify-center">
                <span className={`w-3.5 h-3.5 rounded-full border-2 ${node.ringColor} bg-slate-950/80 shadow-[0_0_15px_rgba(0,240,255,0.8)]`} />
                <span className={`animate-ping absolute w-5 h-5 rounded-full ${node.ringColor} opacity-50`} />
                {isActive && (
                  <span className="animate-pulse absolute w-8 h-8 rounded-full border border-cyan-400/40 opacity-75" />
                )}

                {/* Floating Telemetry Label HUD */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isActive ? 1 : 0.45, scale: isActive ? 1 : 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md text-[9px] font-mono font-bold tracking-wider ${node.color} shadow-lg shadow-cyan-500/10 flex items-center gap-1.5`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{node.label}</span>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Continuous ECG Cardiac Wave Horizon Line */}
        <div className="absolute left-[-20%] right-[-20%] bottom-1/4 h-8 overflow-hidden opacity-35">
          <svg viewBox="0 0 800 40" className="w-full h-full stroke-cyan-400 fill-none stroke-[2]">
            <path d="M0,20 L250,20 L260,8 L275,32 L290,14 L305,24 L315,20 L550,20 L560,8 L575,32 L590,14 L605,24 L615,20 L800,20" />
          </svg>
        </div>
      </motion.div>

      {/* ── 5. Floating Ambient Sparkles & Quantum Nodes ── */}
      <div className="absolute top-1/5 left-1/6 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-60" />
      <div className="absolute top-2/3 left-1/5 w-2 h-2 rounded-full bg-blue-400 animate-pulse opacity-50" />
      <div className="absolute top-1/3 right-1/6 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping opacity-60" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/5 right-1/4 w-2 h-2 rounded-full bg-emerald-400 animate-pulse opacity-45" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}
