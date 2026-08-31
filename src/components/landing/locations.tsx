import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Clock, Globe, ChevronRight, Sparkles, ChevronLeft, Award } from "lucide-react";
import { locations } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Locations() {
  return (
    <section className="py-6 md:py-10 relative overflow-hidden bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 space-y-6 flex flex-col items-center animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
            <Globe className="w-4 h-4" /> Clinical Network
          </div>
          <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Our Service <span className="premium-gradient-text">Locations</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            Standardized clinical excellence delivered across our expanding network of specialized home healthcare hubs.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {locations.map((location, index) => (
              <CarouselItem key={location.id} className="sm:basis-1/2 lg:basis-1/4 pl-4">
                <div
                  className={cn(
                    "h-full animate-reveal-up fill-mode-both p-2",
                    index % 4 === 0 && "stagger-1",
                    index % 4 === 1 && "stagger-2",
                    index % 4 === 2 && "stagger-3",
                    index % 4 === 3 && "stagger-4"
                  )}
                >
                  <Card className="group premium-card overflow-hidden h-full flex flex-col relative rounded-3xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                    <CardHeader className="p-0 relative overflow-hidden">
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={location.mapImageUrl}
                          alt={`Landscape of ${location.city}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          data-ai-hint={location.mapImageHint}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                        <div className="absolute bottom-4 left-6 right-6">
                          <div className="flex items-center justify-between">
                            <CardTitle className="font-headline text-2xl text-white font-bold tracking-tight">
                              {location.city}
                            </CardTitle>
                            {index === 0 && (
                              <div className="flex items-center gap-1 text-[8px] font-black uppercase text-accent bg-accent/10 backdrop-blur-md px-2 py-1 rounded-full border border-accent/20">
                                <Sparkles className="w-2.5 h-2.5" /> Primary Hub
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-4 relative z-10 flex-grow flex flex-col">
                      <div className="space-y-3 flex-grow">
                        <div className="flex items-start gap-3 group/item">
                          <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300 shadow-inner">
                            <MapPin className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-[11px] font-medium text-muted-foreground leading-relaxed pt-1 group-hover/item:text-foreground transition-colors">
                            {location.address}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 group/item">
                          <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300 shadow-inner">
                            <Phone className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-[11px] font-bold text-foreground/80 tracking-tight">
                            {location.phone}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 group/item">
                          <div className="w-7 h-7 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-300 shadow-inner">
                            <Clock className="h-3.5 w-3.5" />
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground pt-0.5">
                            {location.timings}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-primary/5 mt-auto">
                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-primary group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 cursor-pointer">
                          View Hub <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
            Registry: 2026 Clinical Network Active • India • UAE • UK
          </p>
          <div className="h-px w-20 bg-primary/20 mx-auto mt-4" />
        </div>
      </div>
    </section>
  );
}