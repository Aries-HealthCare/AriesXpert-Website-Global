'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Activity, Target, ArrowUpCircle, Sparkles, ChevronRight, Zap, Microscope } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const recoveryStages = [
  {
    title: 'Assess',
    subtitle: 'Biomechanical Screening',
    description: 'Proprietary algorithms analyze symptom patterns and biomechanical data to identify the precise source of dysfunction.',
    icon: ShieldCheck,
    color: 'text-primary',
    bgColor: 'bg-primary/5',
  },
  {
    title: 'Plan',
    subtitle: 'Dynamic Roadmaps',
    description: 'AI-generated clinical protocols tailored to your specific condition, age, and mobility goals for optimal outcomes.',
    icon: Target,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    title: 'Track',
    subtitle: 'Real-time Monitoring',
    description: 'Continuous monitoring of functional progress and biometric indicators, ensuring every session is evidence-based.',
    icon: Activity,
    color: 'text-primary',
    bgColor: 'bg-primary/5',
  },
  {
    title: 'Advance',
    subtitle: 'Adaptive Protocols',
    description: 'Intelligent adjustment of therapy intensity and techniques as you recover, pushing the limits of your performance.',
    icon: ArrowUpCircle,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
];

export default function AiPrecisionRecovery() {
  return (
    <section className="py-6 md:py-10 relative overflow-hidden bg-background">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6 flex flex-col items-center animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
            <Microscope className="w-4 h-4" /> Aries AI™ Directorate
          </div>
          <h2 className="font-headline text-4xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Precision <span className="premium-gradient-text">Recovery</span> Engine
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            Our proprietary clinical platform powers every stage of your recovery journey, delivering data-driven insights for elite-level functional restoration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">
          {recoveryStages.map((stage, index) => (
            <Card
              key={stage.title}
              className={cn(
                "group premium-card flex flex-col p-2",
                "animate-reveal-up fill-mode-both",
                index === 0 && "stagger-1",
                index === 1 && "stagger-2",
                index === 2 && "stagger-3",
                index === 3 && "stagger-4"
              )}
            >
              <CardHeader className="space-y-6 p-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm",
                  stage.bgColor,
                  stage.color
                )}>
                  <stage.icon className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Stage 0{index + 1}</div>
                  <CardTitle className="font-headline text-2xl font-bold tracking-tight">{stage.title}</CardTitle>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stage.subtitle}</p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-0 px-6 pb-8">
                <p className="text-[15px] text-muted-foreground leading-relaxed font-light">
                  {stage.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Highlighted Body-Map Insight Block */}
        <div className="max-w-5xl mx-auto animate-reveal-up fill-mode-both transition-all duration-1000 delay-500">
          <Card className="premium-card p-10 md:p-16 border-primary/10 bg-gradient-to-br from-white to-primary/5 dark:from-card dark:to-primary/10 rounded-[2.5rem] relative overflow-hidden group/insight">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover/insight:opacity-[0.05] transition-opacity duration-700">
              <Zap className="w-80 h-80 text-primary" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> High-Fidelity Assessment
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="font-headline text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
                    Experience Your <br />
                    <span className="premium-gradient-text">Body-Map Insight</span>
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                    Go beyond general symptom tracking. Our AI diagnostic tool creates a visual digital twin of your condition, allowing you to see exactly where recovery begins.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground/60">
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Anatomical Visualization</span>
                  <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Clinical Educational Summary</span>
                </div>
              </div>

              <div className="shrink-0">
                <Button asChild size="lg" className="h-16 px-10 text-lg font-semibold rounded-2xl neon-primary-border bg-primary text-white hover:bg-primary/90 shadow-2xl healthcare-motion transform hover:-translate-y-1">
                  <Link href="/ai-analysis" className="flex items-center">
                    Launch AI Analysis <ChevronRight className="ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
