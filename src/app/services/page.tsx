'use client';

import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HeartPulse, 
  Accessibility, 
  Stethoscope, 
  Users, 
  CookingPot, 
  BrainCircuit, 
  Mic2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Award,
  ChevronRight
} from "lucide-react";
import { useRequestCallback } from "@/components/request-callback-provider";
import BookAppointmentButton from "@/components/book-appointment-button";

const iconMap: { [key: string]: any } = {
  'physiotherapy': HeartPulse,
  'occupational-therapy': Accessibility,
  'home-nursing': Stethoscope,
  'care-taker': Users,
  'dietician': CookingPot,
  'psychologist': BrainCircuit,
  'speech-therapy': Mic2,
  'default': HeartPulse
};

export default function AllServicesPage() {
  const { openModal } = useRequestCallback();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
          <Image 
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Clinical Excellence"
            fill
            className="object-cover opacity-10"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
              <Award className="w-4 h-4 text-accent" /> Hospital-Grade Care at Home
            </div>
            <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Our Clinical <span className="text-accent">Service Portfolio</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Expert-led, evidence-based healthcare delivered with precision and compassion by Aries PhysioCare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookAppointmentButton size="lg" className="h-16 px-10 text-xl font-bold neon-accent-border">
                Book a Session
              </BookAppointmentButton>
              <Button 
                size="lg" 
                className="h-16 px-10 text-xl font-bold border-2 border-white text-white hover:bg-white/10 bg-transparent"
                onClick={() => openModal()}
              >
                Request Callback
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service) => {
              const Icon = iconMap[service.slug] || iconMap['default'];
              return (
                <Card 
                  key={service.id} 
                  className="group glassmorphic flex flex-col hover:neon-primary-border transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-primary/5"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Icon className="w-24 h-24" />
                  </div>
                  <CardHeader className="p-8 pb-0">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <Icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="font-headline text-3xl mb-4 group-hover:text-primary transition-colors">
                      {service.name}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed line-clamp-3">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-6 flex-grow">
                    <div className="space-y-3 mb-8">
                      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Core Focus Areas</p>
                      {service.conditions.slice(0, 3).map((cond, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{cond.name}</span>
                        </div>
                      ))}
                      <div className="flex items-center gap-3 text-sm text-primary font-semibold">
                        <ChevronRight className="w-4 h-4" />
                        <span>+{service.conditions.length - 3} specialized protocols</span>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-8 pt-0 mt-auto">
                    <Button asChild className="w-full h-12 font-bold shadow-lg group-hover:shadow-primary/20 transition-all" variant="outline">
                      <Link href={`/services/${service.slug}`} className="flex items-center justify-center gap-2">
                        Explore Conditions <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinical Standards Section */}
      <section className="py-24 bg-secondary/30 border-y">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                The Aries Edge
              </div>
              <h2 className="font-headline text-3xl md:text-5xl font-bold leading-tight">
                Why We Lead in <br />Home Healthcare Excellence
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Aries PhysioCare (a division of Aries HealthCare International Pvt Ltd) is built on a foundation of clinical rigor and technological innovation. We don't just provide visits; we deliver hospital-grade recovery programs.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: "Vetted Specialists", desc: "Every therapist undergoes a multi-stage clinical competency screening.", icon: ShieldCheck },
                  { title: "Advanced Modalities", desc: "We bring portable Laser, IFT, and ultrasound tech to your living room.", icon: Zap },
                  { title: "Real-time Tracking", desc: "Your recovery progress is digitally monitored and adjusted weekly.", icon: HeartPulse },
                  { title: "Global Protocols", desc: "Treatment plans based on evidence-backed international standards.", icon: Award },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1000" 
                alt="Expert clinical care"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              <div className="absolute bottom-8 left-8 right-8 glassmorphic p-6 rounded-2xl border-white/20">
                <p className="text-white text-sm italic font-medium leading-relaxed">
                  "Our mission is to bridge the gap between hospital treatment and home recovery through structured, expert-led clinical intervention."
                </p>
                <p className="text-accent text-xs font-bold mt-4 uppercase tracking-widest">— Aries Clinical Directorate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Global CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="glassmorphic rounded-[3rem] p-10 md:p-20 border-primary/10 shadow-2xl relative overflow-hidden text-center max-w-5xl mx-auto">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mb-32 blur-3xl" />
            
            <h2 className="font-headline text-4xl md:text-6xl font-bold mb-8 relative z-10">
              Ready to Start Your <br /><span className="text-primary">Recovery Journey?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto relative z-10">
              Join 50,000+ satisfied patients who regained their independence with our expert-led home healthcare programs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
              <BookAppointmentButton size="lg" className="h-20 px-12 text-2xl font-black neon-accent-border shadow-2xl">
                Book Free Consultation
              </BookAppointmentButton>
              <Button 
                size="lg" 
                className="h-20 px-12 text-2xl font-black border-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
                onClick={() => openModal()}
              >
                Call a Specialist
              </Button>
            </div>
            
            <p className="mt-12 text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/60">
              A Division of Aries HealthCare International Pvt Ltd
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
