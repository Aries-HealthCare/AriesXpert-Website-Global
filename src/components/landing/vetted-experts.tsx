'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import BookAppointmentButton from '../book-appointment-button';
import { useTherapists } from '@/hooks/use-therapists';
import { Award, Star, ChevronLeft, ChevronRight, Sparkles, MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface VettedExpertsProps {
  locationName?: string;
  className?: string;
  city?: string;
  area?: string;
  specialization?: string;
}

function TherapistCard({ therapist, index }: { therapist: any, index: number }) {
  return (
    <div className={cn(
      "p-2 h-full animate-reveal-up fill-mode-both",
      index % 4 === 0 && "stagger-1",
      index % 4 === 1 && "stagger-2",
      index % 4 === 2 && "stagger-3",
      index % 4 === 3 && "stagger-4"
    )}>
      <Card className="group premium-card overflow-hidden h-full flex flex-col relative rounded-3xl border-border/40 glassmorphic">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        <CardHeader className="p-0 relative z-10 w-full">
          <Link href={`/therapist/${therapist.slug}`} className="block relative aspect-[4/3] w-full bg-muted overflow-hidden cursor-pointer" prefetch={false}>
            <Image
              src={therapist.imageUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600'}
              alt={`Portrait of ${therapist.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-healthcare"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60"></div>
            <div className="absolute top-4 right-4 z-20">
              {therapist.isVerified && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg animate-pulse-slow">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-white/95 dark:bg-black/95 backdrop-blur-xl text-foreground dark:text-white border-none shadow-md px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] rounded-full">
                {therapist.specialization}
              </Badge>
            </div>
          </Link>
        </CardHeader>

        <CardContent className="p-6 flex-grow space-y-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-primary font-bold text-[10px] uppercase tracking-[0.15em]">{therapist.qualification}</p>
              <div className="flex items-center gap-1 bg-accent/10 px-2.5 py-1 rounded-full">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span className="text-[10px] font-bold text-foreground">{therapist.rating || 4.8}</span>
              </div>
            </div>
            <CardTitle className="font-headline text-2xl font-bold tracking-tight group-hover:text-primary transition-colors duration-300 pt-1">
              {therapist.name}
            </CardTitle>
            <div className="flex items-center gap-1.5 text-muted-foreground pt-1">
              <MapPin className="w-3.5 h-3.5 text-primary/60" />
              <span className="text-xs font-medium">{therapist.city}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-sm">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em]">{therapist.experience} Experience</span>
            </div>
            {therapist.isAvailable && (
              <Badge variant="outline" className="border-green-500/20 text-green-600 bg-green-500/5 text-[9px] font-bold uppercase tracking-tight">
                Live Now
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0 relative z-10">
          <BookAppointmentButton
            therapistId={therapist.id}
            className="w-full h-12 neon-primary-border bg-white text-primary hover:bg-primary hover:text-white font-bold text-[11px] uppercase tracking-[0.15em] healthcare-motion shadow-lg rounded-xl dark:bg-card dark:border-primary/20 dark:hover:bg-primary"
          >
            Instant Booking
          </BookAppointmentButton>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function VettedExperts({ locationName, className, city, area, specialization }: VettedExpertsProps) {
  const { therapists, isLoading } = useTherapists({ city, area, specialization, limit: 12 });

  if (isLoading) {
    return (
      <section className={cn("py-6 md:py-10 bg-background relative overflow-hidden", className)}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
            <Skeleton className="h-8 w-48 mx-auto rounded-full" />
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-[450px] w-full rounded-3xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!therapists || therapists.length === 0) return null;

  return (
    <section className={cn("py-6 md:py-10 bg-background relative overflow-hidden", className)}>
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6 flex flex-col items-center animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
            <Award className="w-4 h-4" /> Clinical Directorate
          </div>
          <h2 className="font-headline text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {locationName ? (
              <>Expert Physiotherapist at <span className="premium-gradient-text">{locationName}</span></>
            ) : (
              <>Meet Our <span className="premium-gradient-text">Vetted Experts</span></>
            )}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            Every specialist undergoes a multi-stage competency screening, ensuring hospital-grade recovery at home.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2">
            {therapists.map((therapist, index) => (
              <CarouselItem key={therapist.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-2">
                <TherapistCard therapist={therapist} index={index} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-4 mt-12 animate-reveal-up stagger-4">
            <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-12 w-12 rounded-xl glassmorphic border-primary/10 hover:bg-primary hover:text-white transition-all duration-500 shadow-sm">
              <ChevronLeft className="w-5 h-5" />
            </CarouselPrevious>
            <CarouselNext className="relative right-0 top-0 translate-y-0 h-12 w-12 rounded-xl glassmorphic border-primary/10 hover:bg-primary hover:text-white transition-all duration-500 shadow-sm">
              <ChevronRight className="w-5 h-5" />
            </CarouselNext>
          </div>
        </Carousel>

        <div className="mt-16 text-center animate-reveal-up stagger-4">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] drop-shadow-sm">
            Aries Clinical Directorate • 2026 Registry Active
          </p>
          <div className="h-px w-20 bg-primary/20 mx-auto mt-4" />
        </div>
      </div>
    </section>
  );
}