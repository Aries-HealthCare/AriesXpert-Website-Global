'use client';

import * as React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from '@/components/ui/drawer';
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
    onSubmitted: handleClose,
  };
  
  if (isMobile) {
    return (
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent className="h-[90vh] glassmorphic">
          <DrawerHeader className="text-left">
            <DrawerTitle className="font-headline text-2xl">Book an Appointment</DrawerTitle>
            <DrawerDescription>Fill in the details below. Our team will call you to confirm.</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4">
            <BookingForm key={key} {...formProps} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glassmorphic sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Book an Appointment</DialogTitle>
          <DialogDescription>Fill in the details below. Our team will call you to confirm.</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-6">
            <BookingForm key={key} {...formProps} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
