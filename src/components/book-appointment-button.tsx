'use client';

import React, { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { Button, ButtonProps } from '@/components/ui/button';
import BookAppointmentButtonContent from './book-appointment-button-content';

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
  ...props
}: BookAppointmentButtonProps) {
  const pathname = usePathname();

  return (
    <Suspense
      fallback={
        <Button {...props}>
          {children}
        </Button>
      }
    >
      <BookAppointmentButtonContent
        serviceSlug={serviceSlug}
        conditionSlug={conditionSlug}
        therapistId={therapistId}
        pathname={pathname}
        {...props}
      >
        {children}
      </BookAppointmentButtonContent>
    </Suspense>
  );
}
