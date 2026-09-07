'use client';

import { useParams, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getServiceBySlug, getConditionBySlug } from '@/lib/placeholder-data';
import { fetchGrowthBlogPosts, type GrowthBlogPost } from '@/lib/growth-blog-posts';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRequestCallback } from '@/components/request-callback-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BookAppointmentButton from '@/components/book-appointment-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import LocalizedFaqSection from '@/components/localized-faq-section';
import PricingPackagesSection from '@/components/landing/pricing-packages-section';

const contents = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'symptoms', title: 'Symptoms' },
  { id: 'treatment', title: 'How We Treat' },
  { id: 'benefits', title: 'Benefits of Home Treatment' },
  { id: 'who-should-opt', title: 'Who Should Opt?' },
  { id: 'faqs', title: 'FAQs' },
];

export default function ConditionDetailPage() {
  const params = useParams<{ serviceSlug: string, conditionSlug: string }>();
  const service = getServiceBySlug(params.serviceSlug as string);
  const { openModal } = useRequestCallback();

  if (!service) notFound();

  const condition = getConditionBySlug(service, params.conditionSlug as string);
  if (!condition) notFound();

  // Real, backend-sourced posts from the Growth Engine CMS feed only — the
  // legacy fake related-posts matching against placeholder data has been
  // removed (P2-09). Prefer posts tagged for this service; fall back to the
  // latest published posts if none match.
  const [relatedPosts, setRelatedPosts] = useState<GrowthBlogPost[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetchGrowthBlogPosts().then((posts) => {
      if (cancelled) return;
      const matching = posts.filter(
        (p) => p.territory === service.name || p.topic === service.name,
      );
      setRelatedPosts((matching.length > 0 ? matching : posts).slice(0, 3));
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service.name]);

  const relatedConditions = service.conditions.filter(c => c.slug !== condition.slug).slice(0, 10);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="py-12 md:py-20 bg-secondary/30 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <Badge variant="outline" className="text-primary border-primary px-4 py-1 uppercase tracking-widest text-xs">
              {service.name} Condition
            </Badge>
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-foreground tracking-tight max-w-4xl">
              {condition.name}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Expert diagnosis and advanced home-based recovery protocols for {condition.name}.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28">
            <Card className="glassmorphic border-primary/10 shadow-xl">
              <CardHeader className="bg-primary/5 border-b border-primary/10 py-4">
                <CardTitle className="text-sm font-headline font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Contents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  {contents.map((item) => (
                    <Link
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center justify-between px-6 py-4 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 border-b last:border-b-0 transition-all group"
                    >
                      <span>{item.title}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
            <div className="mt-8 space-y-4">
              <BookAppointmentButton className="w-full h-14 neon-accent-border text-lg font-bold" serviceSlug={service.slug} conditionSlug={condition.slug}>
                Book Appointment
              </BookAppointmentButton>
              <Button variant="outline" className="w-full h-12 glassmorphic" onClick={() => openModal()}>
                Request Call Back
              </Button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-16">

            {/* Introduction Section */}
            <section id="introduction" className="scroll-mt-32">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="font-headline text-3xl md:text-4xl font-bold">What is {condition.name}?</h2>
                  <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                    <p>{condition.description}</p>
                    <p>At Aries PhysioCare, we specialize in addressing {condition.name} through evidence-based clinical protocols that prioritize mobility restoration and pain reduction in the comfort of your home.</p>
                  </div>
                </div>
                <div className="relative aspect-video md:aspect-square w-full rounded-2xl overflow-hidden soft-shadow border border-primary/10">
                  <Image
                    src={condition.imageUrl}
                    alt={condition.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover"
                    data-ai-hint={condition.imageHint}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-accent text-accent-foreground font-bold">Clinical Care</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Symptoms Section */}
            {condition.symptoms.length > 0 && (
              <section id="symptoms" className="scroll-mt-32">
                <Card className="glassmorphic border-primary/10 overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b border-primary/10">
                    <CardTitle className="font-headline text-2xl flex items-center gap-3">
                      <span className="p-2 bg-primary/10 rounded-lg"><ArrowRight className="w-5 h-5 text-primary" /></span>
                      Common Symptoms
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <ul className="grid sm:grid-cols-2 gap-6">
                      {condition.symptoms.map((symptom, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background/40 border border-primary/5 hover:border-primary/20 transition-colors">
                          <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground font-medium">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </section>
            )}

            {/* Treatment Section */}
            <section id="treatment" className="scroll-mt-32">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-primary/10 pb-6">
                  <h2 className="font-headline text-3xl md:text-4xl font-bold">How Aries PhysioCare Treats {condition.name}</h2>
                  <p className="text-primary font-bold text-sm tracking-widest uppercase">Expert Protocol</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
                    <p>{condition.treatmentDetails}</p>
                    <p>Our therapists use portable advanced recovery technology, including Laser and IFT, alongside specialized manual therapy to accelerate your recovery journey.</p>
                  </div>
                  <div className="bg-secondary/20 rounded-2xl p-6 border border-primary/5 flex flex-col justify-center text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Badge className="rounded-full h-10 w-10 p-0 flex items-center justify-center text-lg">1</Badge>
                    </div>
                    <h4 className="font-headline font-bold text-lg mb-2">Personalized Plan</h4>
                    <p className="text-sm text-muted-foreground">Every patient receives a unique care roadmap based on their specific clinical history.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Benefits Section */}
            {condition.benefits.length > 0 && (
              <section id="benefits" className="scroll-mt-32">
                <div className="text-center mb-10">
                  <h2 className="font-headline text-3xl font-bold">Benefits of Home Treatment</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {condition.benefits.map((benefit, i) => (
                    <div key={i} className="glassmorphic rounded-2xl p-6 flex items-center gap-5 border-primary/10 hover:neon-primary-border transition-all">
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                        {i + 1}
                      </div>
                      <span className="font-headline font-bold text-lg leading-tight">{benefit}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Who Should Opt Section */}
            {condition.whoShouldOpt.length > 0 && (
              <section id="who-should-opt" className="scroll-mt-32 bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1">
                    <h2 className="font-headline text-3xl font-bold leading-tight">Who Should Opt for This Service?</h2>
                    <p className="mt-4 text-muted-foreground">Identifying the right time to seek expert help is the first step toward recovery.</p>
                  </div>
                  <div className="md:col-span-2 flex flex-wrap gap-4">
                    {condition.whoShouldOpt.map((who, i) => (
                      <div key={i} className="bg-white dark:bg-card border border-primary/10 px-6 py-3 rounded-full text-sm font-bold text-primary shadow-sm hover:shadow-md transition-shadow">
                        {who}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <div id="faqs">
              <LocalizedFaqSection geo={null} title={`${condition.name} Treatment FAQs`} faqs={condition.faqs} />
            </div>
          </main>
        </div>

        {/* Related Conditions Carousel */}
        {relatedConditions.length > 0 && (
          <section className="py-20 border-t mt-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Related Conditions</h2>
              <p className="mt-4 text-muted-foreground text-lg">Explore treatment options for similar conditions we address.</p>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {relatedConditions.map((rel) => (
                  <CarouselItem key={rel.id} className="md:basis-1/3 lg:basis-1/5">
                    <div className="p-2 h-full">
                      <Link href={`/services/${params.serviceSlug}/conditions/${rel.slug}`}>
                        <Card className="glassmorphic overflow-hidden h-full flex flex-col items-center justify-center text-center p-6 hover:neon-primary-border transition-all group">
                          <div className="relative h-20 w-20 mb-4 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                            <Image src={rel.imageUrl} alt={rel.name} fill sizes="80px" className="object-cover" />
                          </div>
                          <CardTitle className="font-headline text-sm font-bold leading-tight group-hover:text-primary transition-colors">{rel.name}</CardTitle>
                        </Card>
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </section>
        )}

        {/* Nearby Cities SEO Section */}
        <section className="py-16 bg-primary/90 rounded-[2.5rem] text-primary-foreground overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 h-full">
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="border-r border-b border-white" />)}
            </div>
          </div>
          <div className="container mx-auto px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">{condition.name} Physiotherapy Nearby</h2>
              <p className="mt-4 text-white/80">Expert clinical care delivered to your doorstep across major cities.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {['Mumbai', 'Thane', 'Pune', 'Bengaluru', 'UAE', 'UK', 'Delhi', 'Hyderabad'].map((city) => (
                <Link key={city} href="#" className="bg-white/10 hover:bg-white/20 transition-colors px-6 py-4 rounded-xl border border-white/10 font-bold flex items-center justify-center gap-2 group">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>{city}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Related Blogs Section */}
        {relatedPosts.length > 0 && (
          <section className="py-20">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold">Related Health Insights</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Card key={post.id} className="glassmorphic overflow-hidden flex flex-col hover:soft-shadow transition-all border-primary/10">
                  <div className="relative aspect-video w-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Growth Engine</span>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-white">{post.territory || post.topic || 'Insights'}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <h3 className="font-headline text-xl font-bold mb-3 hover:text-primary transition-colors">
                      <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.summary}</p>
                  </CardContent>
                  <div className="p-6 pt-0 border-t border-primary/5 mt-auto">
                    <Button asChild variant="link" className="p-0 h-auto text-primary font-bold">
                      <Link href={`/blogs/${post.slug}`}>Read Full Article <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Condition-specific In-Home Packages */}
        <PricingPackagesSection
          serviceSlug={service.slug}
          conditionSlug={condition.slug}
          title={<>{condition.name} <span className="premium-gradient-text">Care Packages</span></>}
          subtitle={`Multi-session rehabilitation packages specifically structured for ${condition.name} by certified ${service.name.toLowerCase()} specialists. Decreasing per-day rates and bedside electrotherapy included.`}
          badgeText={`${condition.name} Package Rates`}
          className="my-10"
        />

        {/* Final Global CTA */}
        <section className="py-16 text-center">
          <div className="glassmorphic rounded-3xl p-10 md:p-16 max-w-4xl mx-auto border-accent/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-bl-full -mr-8 -mt-8" />
            <h3 className="font-headline text-3xl md:text-4xl font-bold mb-6">Start Your {condition.name} Recovery Today</h3>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">Join 50,000+ happy patients who regained their mobility with our expert-led home physiotherapy programs.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <BookAppointmentButton size="lg" className="h-16 px-10 text-xl font-bold neon-accent-border" serviceSlug={service.slug} conditionSlug={condition.slug}>
                Book Consultation
              </BookAppointmentButton>
              <Button
                size="lg"
                className="h-16 px-10 text-xl font-bold border-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
                onClick={() => openModal()}
              >
                Request Call Back
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
