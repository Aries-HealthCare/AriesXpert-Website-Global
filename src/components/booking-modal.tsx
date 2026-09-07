'use client';

import * as React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import BookingForm from '@/components/booking-form';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: Record<string, any>;
}

export default function BookingModal({ isOpen, onClose, context }: BookingModalProps) {
  const isMobile = useIsMobile();
  const [key, setKey] = useState(Date.now()); // Used to reset the form state

  const handleClose = () => {
    onClose();
    // Reset form by changing key after a delay
    setTimeout(() => setKey(Date.now()), 300);
  };
  
  const formProps = {
    service: context?.service || '',
    therapist: context?.therapist || '',
    condition: context?.condition || '',
    city: context?.city || '',
    area: context?.area || '',
    state: context?.state || '',
    onSubmitted: handleClose,
    onClose: handleClose,
    isModal: true,
  };
  
  if (isMobile) {
    return (
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent className="max-h-[96vh] p-0 bg-white/98 dark:bg-[#0e0a1c]/98 backdrop-blur-2xl border-t border-purple-100 dark:border-purple-900/40 rounded-t-[2rem] flex flex-col overflow-hidden">
          <DrawerTitle className="sr-only">Book an Appointment</DrawerTitle>
          <DrawerDescription className="sr-only">Fill in the details below to request a home visit.</DrawerDescription>
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
            <BookingForm key={key} {...formProps} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[96vw] max-w-5xl lg:max-w-6xl xl:max-w-[1260px] p-0 overflow-hidden bg-white/98 dark:bg-[#0e0a1c]/98 backdrop-blur-2xl border border-purple-100 dark:border-purple-900/40 rounded-[2rem] shadow-2xl shadow-purple-950/20 max-h-[94vh] flex flex-col outline-none [&>button:last-child]:z-50 [&>button:last-child]:right-5 [&>button:last-child]:top-5 [&>button:last-child]:w-8 [&>button:last-child]:h-8 [&>button:last-child]:rounded-full [&>button:last-child]:flex [&>button:last-child]:items-center [&>button:last-child]:justify-center [&>button:last-child]:bg-gray-100 dark:[&>button:last-child]:bg-white/10 [&>button:last-child]:hover:bg-gray-200 dark:[&>button:last-child]:hover:bg-white/20 [&>button:last-child]:text-gray-600 dark:[&>button:last-child]:text-gray-300 [&>button:last-child]:transition-colors">
        <DialogTitle className="sr-only">Book an Appointment</DialogTitle>
        <DialogDescription className="sr-only">Fill in the details below to request a home visit.</DialogDescription>
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
          <BookingForm key={key} {...formProps} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
