'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { motion } from 'framer-motion';

// Medical Joint Telemetry Points mapped to anatomical locations
const ANATOMICAL_NODES = [
  { id: 'cervical', label: 'C-Spine · 82° ROM', x: '50%', y: '26%', color: 'text-cyan-400', ringColor: 'border-cyan-400', glow: 'shadow-[0_0_20px_#00f0ff]' },
  { id: 'shoulder-r', label: 'R-Glenohumeral · 178°', x: '42%', y: '33%', color: 'text-sky-400', ringColor: 'border-sky-400', glow: 'shadow-[0_0_20px_#38bdf8]' },
  { id: 'shoulder-l', label: 'L-Glenohumeral · OK', x: '58%', y: '33%', color: 'text-cyan-400', ringColor: 'border-cyan-400', glow: 'shadow-[0_0_20px_#00f0ff]' },
  { id: 'lumbar', label: 'L4-L5 Kinematics · 99.2%', x: '50%', y: '48%', color: 'text-blue-400', ringColor: 'border-blue-400', glow: 'shadow-[0_0_20px_#3b82f6]' },
  { id: 'hip-r', label: 'R-Acetabulofemoral · 125°', x: '45%', y: '56%', color: 'text-indigo-400', ringColor: 'border-indigo-400', glow: 'shadow-[0_0_20px_#818cf8]' },
  { id: 'knee-r', label: 'R-Patellofemoral · 135°', x: '41%', y: '72%', color: 'text-emerald-400', ringColor: 'border-emerald-400', glow: 'shadow-[0_0_20px_#10b981]' },
  { id: 'knee-l', label: 'L-Patellofemoral · 138°', x: '59%', y: '68%', color: 'text-emerald-400', ringColor: 'border-emerald-400', glow: 'shadow-[0_0_20px_#10b981]' },
  { id: 'ankle-r', label: 'R-Talocrural · 42° Flex', x: '38%', y: '88%', color: 'text-cyan-300', ringColor: 'border-cyan-300', glow: 'shadow-[0_0_20px_#67e8f9]' },
];

export default function HeroSplineBackground() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 24;
      const y = (e.clientY / innerHeight - 0.5) * 24;
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Telemetry node cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % ANATOMICAL_NODES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Medical Clinical Particle & Neural Synapse Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate floating kinetic bio-particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.5 ? '#00f0ff' : '#3b82f6',
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw flowing synaptic links between nearby particles
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha * 0.7;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p1.color;
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = (1 - dist / 130) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* ── 1. Spline Web Component Runtime Script ── */}
      <Script
        src="https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js"
        type="module"
        strategy="lazyOnload"
        onLoad={() => setSplineLoaded(true)}
      />

      {/* ── 2. Volumetric Medical Light Blooms ── */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[170px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[650px] h-[650px] bg-cyan-500/12 rounded-full blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[190px]" />

      {/* ── 3. Cybernetic Precision Mesh Grid ── */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.25) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* ── 4. High-Performance WebGL Neural Particle Canvas ── */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* ── 5. Spline 3D Scene Layer (when loaded) ── */}
      {splineLoaded && (
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none z-0 overflow-hidden">
          {/* @ts-ignore */}
          <spline-viewer
            url="https://prod.spline.design/kZDDjOASOTtY6DYH/scene.splinecode"
            className="w-full h-full scale-110"
          />
        </div>
      )}

      {/* ── 6. 3D Biomechanical Anatomical Stage with Cursor Parallax ── */}
      <motion.div
        animate={{
          x: mouseOffset.x * 1.6,
          y: mouseOffset.y * 1.6,
        }}
        transition={{ type: 'spring', stiffness: 75, damping: 25 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] lg:w-[760px] lg:h-[760px]"
      >
        {/* Concentric Biometric Telemetry Orbit Rings */}
        <div 
          className="absolute inset-[-50px] rounded-full border border-cyan-500/20 animate-spin shadow-[0_0_30px_rgba(0,240,255,0.05)]"
          style={{ animationDuration: '45s' }}
        />
        <div 
          className="absolute inset-[-15px] rounded-full border border-blue-500/25 animate-spin"
          style={{ animationDuration: '30s', animationDirection: 'reverse' }}
        />
        <div className="absolute inset-[60px] rounded-full border border-cyan-400/15" />
        <div className="absolute inset-[130px] rounded-full border border-indigo-400/20 border-dashed animate-pulse" />

        {/* Pulsing Radar Radar Sweep */}
        <div 
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,rgba(0,240,255,0.1)_360deg)] animate-spin"
          style={{ animationDuration: '7s' }}
        />

        {/* 3D Anatomical Runner Human Silhouette */}
        <div className="relative w-full h-full opacity-50 mix-blend-screen">
          <Image
            src="/hero/anatomy-runner.jpg"
            alt="Biomechanical Human Kinematics Hologram"
            fill
            sizes="(max-width: 1024px) 620px, 760px"
            className="object-contain filter drop-shadow-[0_0_50px_rgba(6,182,212,0.45)]"
            priority
          />
        </div>

        {/* ── 7. Interactive Live Medical Telemetry Nodes ── */}
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
                <span className={`w-3.5 h-3.5 rounded-full border-2 ${node.ringColor} bg-slate-950/90 ${node.glow}`} />
                <span className={`animate-ping absolute w-5 h-5 rounded-full ${node.ringColor} opacity-60`} />
                {isActive && (
                  <span className="animate-pulse absolute w-9 h-9 rounded-full border border-cyan-400/50 opacity-80" />
                )}

                {/* Floating Telemetry Label HUD */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isActive ? 1 : 0.45, scale: isActive ? 1 : 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md text-[9px] font-mono font-bold tracking-wider ${node.color} shadow-lg shadow-cyan-500/15 flex items-center gap-1.5`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{node.label}</span>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Continuous ECG Cardiac Wave Horizon Line */}
        <div className="absolute left-[-20%] right-[-20%] bottom-1/4 h-8 overflow-hidden opacity-40">
          <svg viewBox="0 0 800 40" className="w-full h-full stroke-cyan-400 fill-none stroke-[2]">
            <path d="M0,20 L250,20 L260,8 L275,32 L290,14 L305,24 L315,20 L550,20 L560,8 L575,32 L590,14 L605,24 L615,20 L800,20" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
