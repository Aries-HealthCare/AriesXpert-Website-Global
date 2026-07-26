'use client';

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { specialities } from "@/lib/placeholder-data";
import {
  Bone,
  BrainCircuit,
  Baby,
  Dumbbell,
  ShieldCheck,
  Users,
  HeartPulse,
  Monitor,
  UserRound,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from "@/lib/utils";

const icons = [
  Bone,           // Orthopedic
  BrainCircuit,   // Neurological
  Baby,           // Pediatric
  Users,          // Geriatric
  Dumbbell,       // Sports
  ShieldCheck,    // Post-Surgery
  UserRound,      // Women's Health
  Monitor,        // Ergonomics
  HeartPulse      // Cardio-Pulmonary
];

export default function Specialities() {
  // Duplicate for seamless infinite scroll (Set A | Set A)
  const displaySpecialities = [...specialities, ...specialities, ...specialities];

  return (
    <section className="py-6 md:py-10 relative overflow-hidden bg-background">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Centered Clinical Header */}
        <div className="max-w-5xl mx-auto text-center mb-12 md:mb-16 space-y-6 flex flex-col items-center animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
            <Award className="w-4 h-4" /> Clinical Portfolio
          </div>
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight md:whitespace-nowrap">
            Our Clinical <span className="premium-gradient-text">Specialities</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            Phased, evidence-based recovery programs designed by our clinical directorate to ensure the highest standards of functional restoration.
          </p>
        </div>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden group">
        <div className="flex w-max gap-8 px-4 animate-scroll-infinite hover:[animation-play-state:paused]">
          {displaySpecialities.map((speciality, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={`${speciality.id}-${index}`}
                className="w-[300px] md:w-[400px] shrink-0"
              >
                <Card
                  className={cn(
                    "group/card premium-card border-primary/5 healthcare-motion flex flex-col p-2 shadow-sm relative overflow-hidden h-full min-h-[320px]",
                    "hover:border-primary/30 hover:shadow-[0_0_40px_rgba(var(--primary),0.12)] hover:neon-primary-border"
                  )}
                >
                  {/* Atmospheric Liquid Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                  <CardHeader className="space-y-8 p-8 relative z-10 flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="relative">
                        {/* Icon Ambient Glow Core */}
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover/card:scale-150 transition-transform duration-1000 opacity-0 group-hover/card:opacity-100" />
                        <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center transition-all duration-500 group-hover/card:scale-110 group-hover/card:bg-primary group-hover/card:text-white shadow-sm relative z-10">
                          <Icon className="w-8 h-8 transition-transform duration-700 group-hover/card:rotate-3" />
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/40 group-hover/card:text-primary transition-colors">
                          Protocol 0{(index % specialities.length) + 1}
                        </div>
                        {index % specialities.length < 3 && (
                          <div className="flex items-center gap-1 text-[9px] font-bold uppercase text-accent mt-1">
                            <Sparkles className="w-3 h-3" /> High Priority
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <CardTitle className="font-headline text-2xl lg:text-3xl font-bold tracking-tight group-hover/card:text-primary transition-colors duration-300">
                        {speciality.name}
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base leading-relaxed font-light text-muted-foreground group-hover/card:text-foreground transition-colors line-clamp-3">
                        {speciality.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <div className="px-8 pb-8 relative z-10 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary opacity-50 group-hover/card:opacity-100 transition-all transform translate-x-[-10px] group-hover/card:translate-x-0 cursor-pointer">
                      View Clinical Path <ChevronRight className="w-4 h-4 transition-transform group-hover/card:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Edge Fades for Clinical Depth */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-20" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-20" />
      </div>

      {/* Registry Footer Tag */}
      <div className="container mx-auto px-4 md:px-6 mt-16 text-center animate-reveal-up stagger-4 opacity-0 [animation-fill-mode:forwards]">
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">
          Custom recovery roadmaps available for 150+ conditions
        </p>
        <div className="h-px w-24 bg-primary/10 mx-auto" />
      </div>

      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll-infinite {
          animation: scroll-infinite 60s linear infinite;
        }
      `}</style>
    </section>
  );
}
