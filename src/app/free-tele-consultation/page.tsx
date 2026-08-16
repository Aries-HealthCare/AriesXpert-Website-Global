'use client';

import { useEffect, useState } from 'react';
import { TeleTherapist } from '@/lib/telehealth-types';
import { getTelehealthTherapists } from '@/services/telehealth-api';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Video, Award, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function TeleHealthListingPage() {
  const [therapists, setTherapists] = useState<TeleTherapist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTelehealthTherapists()
      .then(setTherapists)
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'The therapist directory is unavailable');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
        <Badge variant="outline" className="text-primary border-primary/30 uppercase tracking-widest text-[10px] font-bold px-4 py-1">
          Telehealth Consultation Requests
        </Badge>
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
          Request a consultation with an <span className="text-primary">Approved Expert</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Choose an approved telehealth specialist and request a preferred consultation time. Our team will confirm availability and joining details separately.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="glassmorphic overflow-hidden h-[450px]">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            </Card>
          ))
        ) : error ? (
          <div role="alert" className="col-span-full py-16 text-center glassmorphic rounded-3xl border border-destructive/30">
            <Video className="mx-auto w-12 h-12 text-destructive mb-4" />
            <h3 className="text-xl font-bold">Therapist directory unavailable</h3>
            <p className="text-muted-foreground mt-2">{error}</p>
          </div>
        ) : therapists.length > 0 ? (
          therapists.map((therapist) => (
            <Card key={therapist.id} className="group glassmorphic overflow-hidden flex flex-col hover:neon-primary-border transition-all duration-500 transform hover:-translate-y-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image 
                  src={therapist.imageUrl} 
                  alt={therapist.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white border-none shadow-sm flex items-center gap-1.5 px-3 py-1">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Accepting Requests
                  </Badge>
                </div>
              </div>
              <CardHeader className="p-6 pb-2">
                <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{therapist.name}</CardTitle>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{therapist.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{therapist.experience} Experience</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex-grow">
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Specialization</p>
                <p className="text-sm text-muted-foreground">{therapist.specialization}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full h-12 font-bold neon-accent-border group-hover:shadow-accent/30 transition-all">
                  <Link href={`/free-tele-consultation/intake?therapistId=${therapist.id}`}>
                    Request Consultation <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-20 text-center glassmorphic rounded-3xl border-dashed">
            <Video className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-bold">No approved specialists are accepting requests</h3>
            <p className="text-muted-foreground mt-2">Please contact support or check again later.</p>
            <Button variant="outline" className="mt-6" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
