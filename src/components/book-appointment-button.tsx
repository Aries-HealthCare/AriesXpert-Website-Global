'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Button, ButtonProps } from '@/components/ui/button';
import { useRequestCallback } from '@/components/request-callback-provider';

interface BookAppointmentButtonProps extends ButtonProps {
  serviceSlug?: string;
  conditionSlug?: string;
  therapistId?: string;
  children: React.ReactNode;
}

export default function BookAppointmentButton({
  serviceSlug,
  conditionSlug,
  therapistId,
  children,
  onClick,
  ...props
}: BookAppointmentButtonProps) {
  const pathname = usePathname();
  const { openBookingModal } = useRequestCallback();

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
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
