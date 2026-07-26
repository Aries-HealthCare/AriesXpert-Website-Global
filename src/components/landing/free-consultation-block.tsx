'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FreeConsultationBlockProps {
  title?: React.ReactNode;
  className?: string;
}

export default function FreeConsultationBlock({ title, className }: FreeConsultationBlockProps) {
  return (
    <section className={`py-12 md:py-16 bg-background relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-4">
        <Card className="premium-card overflow-hidden shadow-2xl rounded-[2.5rem] border-0">
          <div className="grid md:grid-cols-2 gap-0 items-stretch bg-gradient-to-br from-background to-primary/5 dark:from-card dark:to-primary/10">
            <div className="p-10 md:p-16 space-y-6 flex flex-col justify-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                  Expert Clinical Guidance
                </div>
              </div>
              <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                {title || <>Free Live <br /> <span className="premium-gradient-text">Online Consultation</span></>}
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-light">
                Book a free 30-minute online consultation and receive expert advice on your symptoms and recovery plan.
              </p>
              <div className="pt-6">
                <Button size="lg" className="h-16 px-10 text-lg font-semibold neon-primary-border bg-primary text-white hover:bg-primary/90 hover:-translate-y-1 w-full sm:w-auto rounded-xl shadow-xl healthcare-motion" asChild>
                  <Link href="/free-tele-consultation">
                    <Video className="mr-3 w-5 h-5" /> Consult Online Now
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block min-h-[450px]">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000"
                alt="Tele-health consultation"
                fill
                className="object-cover object-center"
                data-ai-hint="online doctor"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent dark:from-card" />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
