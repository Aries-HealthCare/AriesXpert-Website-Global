'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { getDetailedSymptomBySlug } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Stethoscope,
  Activity,
  ShieldCheck,
  Zap,
  AlertCircle,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { useRequestCallback } from '@/components/request-callback-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookAppointmentButton from '@/components/book-appointment-button';
import LocalizedFaqSection from '@/components/localized-faq-section';

const navItems = [
  { id: 'overview', title: 'Clinical Overview', icon: Activity },
  { id: 'causes', title: 'Root Causes', icon: Stethoscope },
  { id: 'diagnosis', title: 'Diagnosis', icon: ShieldCheck },
  { id: 'treatment', title: 'Treatment', icon: Zap },
  { id: 'when-to-act', title: 'When to See Expert', icon: AlertCircle },
  { id: 'faqs', title: 'Expert FAQs', icon: ChevronRight },
];

export default function SymptomDetailPage() {
  const params = useParams<{ symptomSlug: string }>();
  const { openModal } = useRequestCallback();

  const symptom = getDetailedSymptomBySlug(params.symptomSlug as string);

  if (!symptom) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Professional Hero Section */}
      <section className="relative py-16 md:py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="outline" className="text-accent border-accent/50 px-4 py-1 uppercase tracking-widest text-[10px] font-black">
              Clinical Symptom Deep-Dive
            </Badge>
            <h1 className="font-headline text-4xl md:text-7xl font-bold text-white tracking-tight">
              Understanding <span className="text-accent">{symptom.name}</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              {symptom.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <BookAppointmentButton size="lg" className="h-16 px-10 text-xl font-bold neon-accent-border">
                Book Assessment
              </BookAppointmentButton>
              <Button size="lg" variant="outline" className="h-16 px-10 text-xl font-bold border-white text-white hover:bg-white/10" onClick={() => openModal()}>
                Consult an Expert
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <Card className="glassmorphic border-primary/10 shadow-2xl">
              <CardHeader className="bg-primary/5 border-b border-primary/10 py-4">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                  Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center justify-between px-6 py-4 text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 border-b last:border-b-0 transition-all group"
                    >
                      <span className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        {item.title}
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>

            <div className="mt-8 p-6 glassmorphic bg-accent/5 border-accent/20 rounded-2xl">
              <h4 className="font-headline font-bold text-lg mb-2">Need Immediate Help?</h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">Connect with our senior clinical coordinator for a free initial guidance call.</p>
              <Button className="w-full neon-accent-border" size="sm" asChild>
                <a href="tel:+919876543210">Call Specialist</a>
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-20">

            {/* Overview Section */}
            <section id="overview" className="scroll-mt-32">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                    <Activity className="w-6 h-6" />
                    <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Clinical Perspective</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                    <p>{symptom.longDescription}</p>
                  </div>
                </div>
                <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden soft-shadow border border-primary/10">
                  <Image
                    src={symptom.imageUrl}
                    alt={symptom.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                    data-ai-hint={symptom.imageHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <Badge className="bg-accent text-accent-foreground font-black px-4 py-1">Diagnostic Visualization</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Causes Section */}
            <section id="causes" className="scroll-mt-32">
              <div className="space-y-10">
                <div className="border-l-4 border-primary pl-6">
                  <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Probable Root Causes</h2>
                  <p className="text-muted-foreground mt-2">Identifying the anatomical or lifestyle triggers behind {symptom.name.toLowerCase()}.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {symptom.causes.map((cause, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 glassmorphic rounded-2xl border-primary/5 hover:border-primary/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                        {i + 1}
                      </div>
                      <span className="font-bold text-foreground/80 leading-snug">{cause}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Diagnosis Section */}
            <section id="diagnosis" className="scroll-mt-32 bg-secondary/20 rounded-[2.5rem] p-8 md:p-12 border border-primary/5">
              <div className="grid md:grid-cols-3 gap-12 items-center">
                <div className="md:col-span-1 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="font-headline text-3xl font-bold leading-tight">The Aries <br />Expert Scan</h2>
                </div>
                <div className="md:col-span-2 prose prose-lg dark:prose-invert text-muted-foreground">
                  <p>{symptom.diagnosis}</p>
                  <p>Our specialists utilize advanced biomechanical screening to differentiate between mechanical dysfunction and neurological irritation, ensuring a precise recovery path.</p>
                </div>
              </div>
            </section>

            {/* Treatment Section */}
            <section id="treatment" className="scroll-mt-32">
              <div className="space-y-10">
                <div className="flex items-center justify-between gap-4 border-b border-primary/10 pb-6">
                  <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Recovery Strategies</h2>
                  <Zap className="w-8 h-8 text-primary fill-primary/20 animate-pulse" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {symptom.treatments.map((treatment, i) => (
                    <Card key={i} className="glassmorphic border-none shadow-lg hover:neon-primary-border healthcare-motion">
                      <CardHeader className="pb-4">
                        <CheckCircle2 className="w-6 h-6 text-accent mb-2" />
                        <CardTitle className="text-lg font-bold leading-tight">{treatment}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* When to Act Section */}
            <section id="when-to-act" className="scroll-mt-32">
              <Card className="border-destructive/20 bg-destructive/5 overflow-hidden rounded-[2rem]">
                <CardHeader className="bg-destructive/10 border-b border-destructive/10 p-8">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                    <CardTitle className="font-headline text-2xl font-bold">When to Seek Clinical Intervention</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <p className="text-muted-foreground leading-relaxed font-medium">
                    {symptom.whenToSeeDoctor}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <BookAppointmentButton className="bg-destructive hover:bg-destructive/90 text-white font-bold h-14">
                      Book Emergency Assessment
                    </BookAppointmentButton>
                    <Button variant="ghost" className="h-14 font-bold border-destructive/20 text-destructive" onClick={() => openModal()}>
                      Request Instant Callback
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="scroll-mt-32">
              <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Outcome-Driven Benefits</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {symptom.benefits.map((benefit, i) => (
                  <div key={i} className="text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center border border-primary/10">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <p className="font-bold text-foreground/80 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQs Section */}
            <div id="faqs" className="scroll-mt-32 pt-10 border-t border-primary/10">
              <LocalizedFaqSection geo={null} title={`${symptom.name} Treatment Insights`} description="Clinical answers to your queries about home-based symptom management." faqs={symptom.faqs} />
            </div>
          </main>
        </div>

        {/* Global CTA Section */}
        <section className="py-20 mt-20">
          <div className="glassmorphic rounded-[3rem] p-10 md:p-20 border-accent/20 shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 p-10 opacity-5">
              <Activity className="w-64 h-64 text-accent" />
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 relative z-10">
              Stop Managing. <br /><span className="text-primary">Start Recovering.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto relative z-10">
              Our clinical team specializes in addressing the root cause of {symptom.name.toLowerCase()} with personalized home care protocols.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <BookAppointmentButton size="lg" className="h-20 px-12 text-2xl font-black neon-accent-border shadow-2xl">
                Book Expert Visit
              </BookAppointmentButton>
              <Button
                size="lg"
                className="h-20 px-12 text-2xl font-black border-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
                onClick={() => openModal()}
              >
                Consult a Doctor
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
