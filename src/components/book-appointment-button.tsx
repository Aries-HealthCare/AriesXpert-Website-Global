'use client';

import React, { useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Button, ButtonProps } from '@/components/ui/button';
import { useRequestCallback } from '@/components/request-callback-provider';
import { cn } from '@/lib/utils';

interface BookAppointmentButtonProps extends ButtonProps {
  serviceSlug?: string;
  conditionSlug?: string;
  therapistId?: string;
  children: React.ReactNode;
  enableTilt?: boolean;
}

export default function BookAppointmentButton({
  serviceSlug,
  conditionSlug,
  therapistId,
  children,
  onClick,
  enableTilt = true,
  className,
  ...props
}: BookAppointmentButtonProps) {
  const pathname = usePathname();
  const { openBookingModal } = useRequestCallback();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!enableTilt || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(`perspective(600px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.5 });
    setIsHovered(true);
  }, [enableTilt]);

  const handleMouseLeave = useCallback(() => {
    if (!enableTilt) return;
    setTransform('perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare(prev => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  }, [enableTilt]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    openBookingModal({
      service: serviceSlug || searchParams?.get('service') || '',
      condition: conditionSlug || searchParams?.get('condition') || '',
      therapist: therapistId || searchParams?.get('therapist') || '',
      sourcePath: pathname || '',
    });
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt ? transform : undefined,
        transition: isHovered
          ? 'transform 0.08s ease-out, box-shadow 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative overflow-hidden group shining-card-border cursor-pointer',
        className
      )}
      {...props}
    >
      {/* Specular glare reflection */}
      <span
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-20"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle 80px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4), transparent 70%)`,
        }}
        aria-hidden="true"
      />
      {/* Edge light sweep shimmer */}
      <span className="card-shimmer-sweep-overlay" aria-hidden="true" />
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
    </Button>
  );
}
