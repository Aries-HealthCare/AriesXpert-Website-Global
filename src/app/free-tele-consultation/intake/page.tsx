'use client';

import { Suspense } from 'react';
import IntakeForm from '../_components/intake-form';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

function IntakeContent() {
  const searchParams = useSearchParams();
  const therapistId = searchParams.get('therapistId') || '';

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] font-bold">
            Step 2: Patient Intake
          </Badge>
          <h1 className="font-headline text-3xl md:text-5xl font-bold">Clinical Information Form</h1>
          <p className="text-muted-foreground">
            Please provide your health details to help our specialist prepare for your consultation.
          </p>
        </div>
        
        <IntakeForm therapistId={therapistId} />
      </div>
    </div>
  );
}

export default function TeleHealthIntakePage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading form...</div>}>
      <IntakeContent />
    </Suspense>
  );
}
