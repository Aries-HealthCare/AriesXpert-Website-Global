'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { getDetailedTherapyBySlug } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Activity,
  ShieldCheck,
  Zap,
  Stethoscope,
  Target,
  Award
} from 'lucide-react';
import Link from 'next/link';
import { useRequestCallback } from '@/components/request-callback-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookAppointmentButton from '@/components/book-appointment-button';
import LocalizedFaqSection from '@/components/localized-faq-section';

const navItems = [
  { id: 'overview', title: 'Therapeutic Overview', icon: Activity },
  { id: 'how-it-works', title: 'Science & Mechanism', icon: Zap },
  { id: 'benefits', title: 'Key Outcomes', icon: ShieldCheck },
  { id: 'techniques', title: 'Clinical Techniques', icon: Stethoscope },
  { id: 'who-should-opt', title: 'Patient Suitability', icon: Target },
  { id: 'faqs', title: 'Expert FAQs', icon: ChevronRight },
];

export default function TherapyDetailPage() {
  const params = useParams<{ therapySlug: string }>();
  const { openModal } = useRequestCallback();

  const therapy = getDetailedTherapyBySlug(params.therapySlug as string);

  if (!therapy) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      {/* High-Authority Hero Section */}
      <section className="relative py-16 md:py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
            <Badge variant="outline" className="text-accent border-accent/50 px-4 py-1 uppercase tracking-widest text-[10px] font-black">
              Clinical Modality Masterclass
            </Badge>
            <h1 className="font-headline text-4xl md:text-7xl font-bold text-white tracking-tight">
              Advanced <span className="text-accent">{therapy.name}</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              {therapy.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <BookAppointmentButton size="lg" className="h-16 px-10 text-xl font-bold neon-accent-border">
                Book Modality Session
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
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent-foreground mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-headline font-bold text-lg mb-2">Vetted Specialists</h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">This modality is exclusively administered by certified Aries specialists with proven clinical competency.</p>
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
                    <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-foreground">Clinical Masterclass</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                    <p>{therapy.description}</p>
                    <p>At Aries PhysioCare, we integrate {therapy.name} into goal-oriented recovery roadmaps to ensure optimal physiological response and long-term functional stability.</p>
                  </div>
                </div>
                <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden soft-shadow border border-primary/10">
                  <Image
                    src={therapy.imageUrl}
                    alt={therapy.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                    data-ai-hint={therapy.imageHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <Badge className="bg-accent text-accent-foreground font-black px-6 py-2 text-sm shadow-xl">Expert-Led Modality</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="scroll-mt-32 bg-secondary/20 rounded-[3rem] p-10 md:p-16 border border-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Zap className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Science & Mechanism</h2>
                </div>
                <div className="max-w-3xl prose prose-xl dark:prose-invert text-muted-foreground">
                  <p className="leading-relaxed italic">
                    "{therapy.howItWorks}"
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="scroll-mt-32">
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="font-headline text-3xl font-bold uppercase tracking-[0.1em] text-foreground">Proven Clinical Outcomes</h2>
                  <div className="h-1 w-20 bg-accent mx-auto mt-4" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {therapy.benefits.map((benefit, i) => (
                    <Card key={i} className="glassmorphic border-none shadow-xl hover:neon-primary-border healthcare-motion group p-2">
                      <CardHeader className="pb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 transition-colors group-hover:bg-primary group-hover:text-white">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-lg font-bold leading-tight text-foreground">{benefit}</CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Techniques Section */}
            <section id="techniques" className="scroll-mt-32">
              <div className="space-y-10">
                <div className="border-l-4 border-primary pl-8">
                  <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-foreground">Aries Expert Techniques</h2>
                  <p className="text-muted-foreground mt-2">Specialized methodologies used by our clinical team to maximize the efficacy of {therapy.name.toLowerCase()}.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {therapy.techniques.map((tech, i) => (
                    <div key={i} className="flex items-center gap-5 p-8 glassmorphic rounded-[2rem] border-primary/5 hover:border-primary/20 transition-all group shadow-md">
                      <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center text-lg font-black shrink-0 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="font-bold text-foreground/90 text-lg leading-snug">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Who Should Opt Section */}
            <section id="who-should-opt" className="scroll-mt-32">
              <Card className="border-accent/20 bg-accent/5 overflow-hidden rounded-[2.5rem]">
                <CardHeader className="bg-accent/10 border-b border-accent/10 p-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-card flex items-center justify-center shadow-lg">
                      <Target className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <CardTitle className="font-headline text-3xl font-bold text-foreground">Clinical Indications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        Our clinical directorate recommends {therapy.name} for individuals meeting specific criteria or facing these functional challenges:
                      </p>
                      <ul className="space-y-4">
                        {therapy.whoShouldOpt.map((who, i) => (
                          <li key={i} className="flex items-center gap-3 font-bold text-foreground">
                            <div className="w-2 h-2 rounded-full bg-accent" /> {who}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-background/40 rounded-3xl p-8 border border-accent/10 flex flex-col justify-center">
                      <h4 className="font-headline font-bold text-xl mb-4 text-primary">Conditions Treated</h4>
                      <div className="flex flex-wrap gap-2">
                        {therapy.conditionsTreated.map((cond, i) => (
                          <Badge key={i} variant="secondary" className="px-4 py-1.5 font-medium">{cond}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQs Section */}
            <div id="faqs" className="scroll-mt-32 pt-10 border-t border-primary/10">
              <LocalizedFaqSection geo={null} title={`${therapy.name} - Expert Insights`} description="Clinical answers to technical queries regarding this specialized therapeutic modality." faqs={therapy.faqs} />
            </div>
          </main>
        </div>

        {/* Global Modal CTA Section */}
        <section className="py-20 mt-20">
          <div className="glassmorphic rounded-[3.5rem] p-12 md:p-24 border-primary/10 shadow-2xl relative overflow-hidden text-center max-w-6xl mx-auto">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -ml-48 -mb-48 blur-3xl" />

            <h2 className="font-headline text-4xl md:text-7xl font-bold mb-10 relative z-10 text-foreground leading-[1.1]">
              Elevate Your <br /><span className="text-primary">Recovery Protocol.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Experience the difference of hospital-grade clinical equipment and certified manual expertise in the comfort of your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 justify-center relative z-10">
              <BookAppointmentButton size="lg" className="h-20 px-14 text-2xl font-black neon-accent-border shadow-2xl transform hover:-translate-y-1 transition-all">
                Book Specialist Visit
              </BookAppointmentButton>
              <Button
                size="lg"
                className="h-20 px-14 text-2xl font-black border-2 border-primary text-primary hover:bg-primary/10 bg-transparent transform hover:-translate-y-1 transition-all"
                onClick={() => openModal()}
              >
                Request Expert Call
              </Button>
            </div>

            <div className="mt-16 text-[10px] uppercase tracking-[0.4em] font-black text-primary/40">
              A Division of Aries HealthCare International Pvt Ltd
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
