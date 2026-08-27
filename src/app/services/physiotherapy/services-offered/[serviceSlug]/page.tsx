'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
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
  Award,
  Users,
  Clock
} from 'lucide-react';
import Link from 'next/link';
import { useRequestCallback } from '@/components/request-callback-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BookAppointmentButton from '@/components/book-appointment-button';
import LocalizedFaqSection from '@/components/localized-faq-section';

const navItems = [
  { id: 'overview', title: 'Clinical Focus', icon: Activity },
  { id: 'approach', title: 'Our Approach', icon: Stethoscope },
  { id: 'benefits', title: 'Key Benefits', icon: ShieldCheck },
  { id: 'who-should-opt', title: 'Who is it for?', icon: Target },
  { id: 'faqs', title: 'Service FAQs', icon: ChevronRight },
];

function capitalize(str: string) {
  if (!str) return '';
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const getServiceDetail = (slug: string) => {
  const name = capitalize(slug);
  const lowerSlug = slug.toLowerCase();

  let imageUrl = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=1600';
  let imageHint = 'advanced clinical physiotherapy treatment';

  if (lowerSlug.includes('sport')) {
    imageUrl = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'sports physiotherapy athletic recovery and kinetic conditioning';
  } else if (lowerSlug.includes('neuro') || lowerSlug.includes('stroke') || lowerSlug.includes('paralysis')) {
    imageUrl = 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'neurological rehabilitation stroke recovery and motor reprogramming';
  } else if (lowerSlug.includes('geriatric') || lowerSlug.includes('elderly') || lowerSlug.includes('senior')) {
    imageUrl = 'https://images.unsplash.com/photo-1576765608535-5f04c18459e4?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'geriatric senior mobility and functional rehabilitation';
  } else if (lowerSlug.includes('pediatric') || lowerSlug.includes('child')) {
    imageUrl = 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'pediatric physiotherapy developmental therapy and motor milestones';
  } else if (lowerSlug.includes('ortho') || lowerSlug.includes('joint') || lowerSlug.includes('bone') || lowerSlug.includes('fracture')) {
    imageUrl = 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'orthopedic musculoskeletal rehabilitation and joint mobilization';
  } else if (lowerSlug.includes('chiro') || lowerSlug.includes('spine') || lowerSlug.includes('back')) {
    imageUrl = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'chiropractic spinal alignment and manual decompression';
  } else if (lowerSlug.includes('cardio') || lowerSlug.includes('pulmon') || lowerSlug.includes('chest') || lowerSlug.includes('respiratory')) {
    imageUrl = 'https://images.unsplash.com/photo-1505751172676-d7405903823d?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'cardiopulmonary cardiac rehabilitation and lung clearance';
  } else if (lowerSlug.includes('women') || lowerSlug.includes('pelvic') || lowerSlug.includes('prenatal') || lowerSlug.includes('postnatal')) {
    imageUrl = 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'womens health pelvic floor and prenatal physical therapy';
  } else if (lowerSlug.includes('ergo') || lowerSlug.includes('postur') || lowerSlug.includes('work')) {
    imageUrl = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'ergonomic posture correction and occupational wellness';
  } else if (lowerSlug.includes('post-op') || lowerSlug.includes('post-surg') || lowerSlug.includes('surg')) {
    imageUrl = 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=85&w=1600';
    imageHint = 'post-surgical orthopedic physical rehabilitation and wound protocol';
  }

  const details: any = {
    name,
    slug,
    description: `Expert-led home ${name.toLowerCase()} services provided by Aries PhysioCare. We deliver hospital-grade clinical excellence directly to your doorstep.`,
    imageUrl,
    imageHint
  };
  const dynamicFaqs = [
    { id: 's1', question: `What is the clinical process for ${name}?`, answer: `Our expert physiotherapists begin with a thorough biomechanical assessment, followed by an evidence-based ${name} treatment plan utilizing advanced portable modalities.` },
    { id: 's2', question: `Are the therapists providing ${name} certified?`, answer: `Absolutely. All our practitioners are highly vetted, certified experts with specialized training in providing elite ${name} services.` },
    { id: 's3', question: `Can I receive ${name} at home?`, answer: `Yes, Aries PhysioCare brings hospital-grade ${name} directly to your home using state-of-the-art portable equipment.` }
  ];

  if (lowerSlug.includes('sports')) {
    details.longDescription = `Sports Physiotherapy at Aries focuses on the rapid recovery and performance optimization of athletes and active individuals. We address acute injuries and chronic imbalances through evidence-based biomechanical screening.`;
    details.approach = `Our clinical approach combines advanced manual therapy with sports-specific conditioning. We focus on restoring the kinetic chain, ensuring you return to your sport stronger and with a reduced risk of re-injury.`;
    details.benefits = ['Accelerated return to play', 'Optimized movement efficiency', 'Injury prevention protocols', 'Enhanced muscular endurance'];
    details.whoShouldOpt = ['Professional athletes', 'Weekend warriors', 'Individuals with acute sports strain', 'Marathon runners & gym enthusiasts'];
  } else if (lowerSlug.includes('neuro')) {
    details.longDescription = `Neuro Physiotherapy Rehab is a specialized program for individuals recovering from neurological conditions. Our goal is to rewire the neural pathways through intensive, task-oriented functional training.`;
    details.approach = `We utilize Neuro-Developmental Treatment (NDT) and PNF techniques to restore motor control. Every session is tracked digitally to monitor functional gains in balance, coordination, and independence.`;
    details.benefits = ['Significant gains in mobility', 'Improved balance & coordination', 'Enhanced functional independence', 'Reduces compensatory strain'];
    details.whoShouldOpt = ['Post-stroke survivors', 'Parkinson\'s patients', 'Individuals with spinal injuries', 'Patients with nerve dysfunction'];
  } else if (lowerSlug.includes('geriatric')) {
    details.longDescription = `Geriatric care focuses on maintaining independence and quality of life for senior citizens. We address age-related mobility challenges with compassion and clinical rigor in the familiar environment of your home.`;
    details.approach = `Our specialists focus on fall prevention, joint stability, and gentle functional exercises. We work closely with families to create a safe home environment while optimizing the senior's physical capacity.`;
    details.benefits = ['Reduced risk of falls', 'Maintained independence', 'Management of arthritis pain', 'Improved confidence in movement'];
    details.whoShouldOpt = ['Seniors with mobility issues', 'Elderly recovering from surgery', 'Individuals with chronic age-related pain', 'Seniors seeking wellness support'];
  } else {
    details.longDescription = `Our ${name} service provides a structured clinical framework for addressing specific health and mobility goals. At Aries, we prioritize outcome-driven care delivered by vetted specialists.`;
    details.approach = `The clinical process begins with a deep-dive assessment of your condition and lifestyle. We then design a personalized recovery roadmap combining manual skill with advanced therapeutic modalities.`;
    details.benefits = ['Personalized one-on-one attention', 'Consistent progress monitoring', 'Faster functional results', 'Flexible home-based scheduling'];
    details.whoShouldOpt = ['Individuals seeking expert recovery', 'Patients prioritizing home safety', 'Anyone with activity-limiting discomfort', 'Post-hospitalization recovery needs'];
  }

  details.faqs = dynamicFaqs;

  return details;
};

export default function ServiceOfferedDetailPage() {
  const params = useParams<{ serviceSlug: string }>();
  const { openModal } = useRequestCallback();

  if (!params.serviceSlug) notFound();

  const service = getServiceDetail(params.serviceSlug);

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
              Clinical Service Masterclass
            </Badge>
            <h1 className="font-headline text-4xl md:text-7xl font-bold text-white tracking-tight">
              Expert <span className="text-accent">{service.name}</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <BookAppointmentButton size="lg" className="h-16 px-10 text-xl font-bold neon-accent-border">
                Book Specialist Visit
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
                  Service Menu
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
              <h4 className="font-headline font-bold text-lg mb-2">Clinical Standards</h4>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">This service is delivered following strict international clinical protocols and safety standards.</p>
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
                    <h2 className="font-headline text-3xl font-bold uppercase tracking-tight text-foreground">Clinical Focus</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                    <p>{service.longDescription}</p>
                    <p>At Aries PhysioCare, we recognize that every patient has a unique physiological narrative. Our {service.name.toLowerCase()} service is meticulously designed to restore function and enhance performance within your home environment.</p>
                  </div>
                </div>
                <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden soft-shadow border border-primary/10">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                    data-ai-hint={service.imageHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <Badge className="bg-accent text-accent-foreground font-black px-6 py-2 text-sm shadow-xl">Expert-Led Care</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Approach Section */}
            <section id="approach" className="scroll-mt-32 bg-secondary/20 rounded-[3rem] p-10 md:p-16 border border-primary/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <Stethoscope className="w-64 h-64 text-primary" />
              </div>
              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Approach</h2>
                </div>
                <div className="max-w-3xl prose prose-xl dark:prose-invert text-muted-foreground">
                  <p className="leading-relaxed italic">
                    "{service.approach}"
                  </p>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="scroll-mt-32">
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="font-headline text-3xl font-bold uppercase tracking-[0.1em] text-foreground">Outcome-Driven Benefits</h2>
                  <div className="h-1 w-20 bg-accent mx-auto mt-4" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.benefits.map((benefit: string, i: number) => (
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

            {/* Who Should Opt Section */}
            <section id="who-should-opt" className="scroll-mt-32">
              <Card className="border-accent/20 bg-accent/5 overflow-hidden rounded-[2.5rem]">
                <CardHeader className="bg-accent/10 border-b border-accent/10 p-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-card flex items-center justify-center shadow-lg">
                      <Target className="w-8 h-8 text-accent-foreground" />
                    </div>
                    <CardTitle className="font-headline text-3xl font-bold text-foreground">Patient Suitability</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        The {service.name.toLowerCase()} program is ideal for individuals seeking structured, professional intervention for:
                      </p>
                      <ul className="space-y-4">
                        {service.whoShouldOpt.map((who: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 font-bold text-foreground">
                            <div className="w-2 h-2 rounded-full bg-accent" /> {who}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-background/40 rounded-3xl p-8 border border-accent/10 flex flex-col justify-center text-center space-y-4">
                      <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Users className="w-8 h-8" />
                      </div>
                      <h4 className="font-headline font-bold text-xl text-primary">Multidisciplinary Team</h4>
                      <p className="text-sm text-muted-foreground">Every {service.name.toLowerCase()} plan is reviewed by our senior clinical directorate to ensure the highest standards of safety and efficacy.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQs Section */}
            <div id="faqs" className="scroll-mt-32 pt-10 border-t border-primary/10">
              <LocalizedFaqSection geo={null} title={`${service.name} - Expert Insights`} description="Clinical answers to technical queries regarding our specialized home-based service delivery." faqs={service.faqs} />
            </div>
          </main>
        </div>

        {/* Global Modal CTA Section */}
        <section className="py-20 mt-20">
          <div className="glassmorphic rounded-[3.5rem] p-12 md:p-24 border-primary/10 shadow-2xl relative overflow-hidden text-center max-w-6xl mx-auto">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -ml-48 -mb-48 blur-3xl" />

            <h2 className="font-headline text-4xl md:text-7xl font-bold mb-10 relative z-10 text-foreground leading-[1.1]">
              Elevate Your <br /><span className="text-primary">Clinical Experience.</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-14 max-w-3xl mx-auto relative z-10 leading-relaxed">
              Join 50,000+ satisfied patients who regained their independence with our expert-led, home-based clinical programs.
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
