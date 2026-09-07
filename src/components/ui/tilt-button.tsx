'use client';

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TiltButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareEffect?: boolean;
  shiningBorder?: boolean;
}

export default function TiltButton({
  children,
  className = '',
  maxTilt = 10,
  glareEffect = true,
  shiningBorder = true,
  onMouseMove,
  onMouseLeave,
  ...props
}: TiltButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `perspective(600px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`
      );

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlare({ x: glareX, y: glareY, opacity: 0.6 });
      setIsHovered(true);

      if (onMouseMove) onMouseMove(e);
    },
    [maxTilt, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
      setGlare(prev => ({ ...prev, opacity: 0 }));
      setIsHovered(false);
      if (onMouseLeave) onMouseLeave(e);
    },
    [onMouseLeave]
  );

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden select-none cursor-pointer',
        shiningBorder && 'shining-card-border',
        className
      )}
      {...props}
    >
      {/* ── Specular Light Reflection Glare ── */}
      {glareEffect && (
        <span
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-20"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 90px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Edge Light Sweep Shimmer ── */}
      <span
        className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-10"
        aria-hidden="true"
      >
        <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full transition-transform group-hover:translate-x-[300%] duration-1000" />
      </span>

      {/* ── Content ── */}
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
}
