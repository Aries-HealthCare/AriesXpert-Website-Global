'use client';

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ShiningCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  enableTilt?: boolean;
  enableGlare?: boolean;
  shiningBorder?: boolean;
}

export default function ShiningCard({
  children,
  className = '',
  maxTilt = 6,
  enableTilt = true,
  enableGlare = true,
  shiningBorder = true,
  onMouseMove,
  onMouseLeave,
  ...props
}: ShiningCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !enableTilt) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
      );

      if (enableGlare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        setGlare({ x: glareX, y: glareY, opacity: 0.7 });
      }

      setIsHovered(true);
      if (onMouseMove) onMouseMove(e);
    },
    [enableTilt, enableGlare, maxTilt, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
      setGlare(prev => ({ ...prev, opacity: 0 }));
      setIsHovered(false);
      if (onMouseLeave) onMouseLeave(e);
    },
    [onMouseLeave]
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt ? transform : undefined,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.3s ease'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative rounded-3xl bg-card border transition-all duration-500 overflow-hidden group',
        shiningBorder && 'shining-card-border',
        className
      )}
      {...props}
    >
      {/* ── Dynamic Specular Glare Reflection ── */}
      {enableGlare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-10"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, rgba(52, 211, 153, 0.15), rgba(255, 255, 255, 0.08), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Shimmer Sweep Overlay ── */}
      <div className="card-shimmer-sweep-overlay" aria-hidden="true" />

      {/* ── Card Content ── */}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
}
