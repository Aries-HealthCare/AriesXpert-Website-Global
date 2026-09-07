'use client';

import { services } from "@/lib/placeholder-data";
import { Card } from "@/components/ui/card";
import { HeartPulse, Accessibility, Stethoscope, Users, CookingPot, BrainCircuit, Mic2 } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'physiotherapy': HeartPulse,
  'occupational-therapy': Accessibility,
  'home-nursing': Stethoscope,
  'care-taker': Users,
  'dietician': CookingPot,
  'psychologist': BrainCircuit,
  'speech-therapy': Mic2,
  'default': HeartPulse
};

export default function ServicesStrip() {
  // Triplicate for a seamless infinite scroll loop
  const extendedServices = [...services, ...services, ...services];

  return (
    <section className="py-6 md:py-10 bg-background/80 border-y border-border/5 relative overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll-services hover:[animation-play-state:paused]">
          {extendedServices.map((service, index) => {
            const Icon = iconMap[service.slug] || iconMap['default'];
            return (
              <div key={`${service.id}-${index}`} className="px-4 py-4">
                <Card className="premium-card w-64 h-36 flex flex-col justify-center items-center p-6 bg-white dark:bg-card border border-primary/5 hover:border-primary/20 group cursor-pointer transition-all duration-500">
                  <div className="text-primary bg-primary/5 rounded-2xl p-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-primary/30 group-hover:scale-110 group-hover:-translate-y-2">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold font-headline text-center tracking-tight text-foreground/90 group-hover:text-primary transition-colors">{service.name}</h3>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Edge Fades for Clinical Depth */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background via-transparent to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
