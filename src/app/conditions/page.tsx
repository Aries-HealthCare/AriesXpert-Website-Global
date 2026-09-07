import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllConditions } from '@/lib/conditions-data';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Stethoscope, ShieldCheck, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';

export const revalidate = 86400; // ISR: 24h

export const metadata: Metadata = {
  title: 'Clinical Conditions & Evidence-Based Physiotherapy Protocols | Aries PhysioCare',
  description: 'Explore comprehensive clinical guides for musculoskeletal, neurological, and post-surgical conditions. Evidence-based treatment protocols by certified physiotherapists.',
  alternates: {
    canonical: 'https://www.ariesphysiocare.com/conditions',
  },
  openGraph: {
    title: 'Clinical Conditions & Physical Rehabilitation Directory | Aries PhysioCare',
    description: 'Hospital-grade clinical guidance for back pain, sciatica, stroke rehab, frozen shoulder, and joint replacement recovery.',
    url: 'https://www.ariesphysiocare.com/conditions',
    type: 'website',
  }
};

export default function ConditionsIndexPage() {
  const conditions = getAllConditions();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      
      {/* Hero Header */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 via-background to-background border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl text-center space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/40 text-primary font-bold tracking-wide uppercase text-xs">
            YMYL Clinical Knowledge Base
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Evidence-Based Rehabilitation & Clinical Conditions
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Reviewed by certified medical specialists. Understand your condition, explore multi-stage clinical protocols, and access hospital-grade home physiotherapy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm font-medium text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> Council-Verified Specialists
            </span>
            <span className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Multi-Stage Clinical Protocols
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" /> Standardized Bedside Modalities
            </span>
          </div>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 max-w-6xl flex-1">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditions.map((c) => (
            <Card key={c.slug} className="glassmorphic border-border/50 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs font-semibold">
                    {c.category}
                  </Badge>
                  <Stethoscope className="w-5 h-5 text-primary/70 group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                  <Link href={`/conditions/${c.slug}`} className="hover:underline">
                    {c.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm font-mono text-muted-foreground/80">
                  {c.medicalName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {c.clinicalSummary}
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-border/40">
                  <span className="text-xs text-muted-foreground">
                    Reviewed by <strong className="text-foreground">{c.medicalReviewer.name}</strong>
                  </span>
                  <Button asChild variant="ghost" size="sm" className="font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    <Link href={`/conditions/${c.slug}`}>
                      Explore Protocol <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Conversion Banner */}
      <section className="py-16 bg-primary/5 border-t border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Need a Clinical Assessment for Your Condition?</h2>
          <p className="text-muted-foreground text-lg">
            Consult directly with a senior physiotherapist in the comfort of your home. Same-day appointments available across major metropolitan hubs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <BookAppointmentButton size="lg" className="h-12 px-8 font-bold neon-accent-border">
              Book Home Assessment
            </BookAppointmentButton>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 font-bold">
              <a href="tel:+919136447006">Speak with Clinical Advisor</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
