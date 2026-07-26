
'use client';

import { Suspense } from 'react';
import BookingForm from '@/components/booking-form';

export default function BookAppointmentPage() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="w-full max-w-4xl mx-auto">
                    <Suspense fallback={<div>Loading...</div>}>
                        <BookingForm className="glassmorphic rounded-lg" />
                    </Suspense>
                </div>
            </div>
        </section>
    )
}
