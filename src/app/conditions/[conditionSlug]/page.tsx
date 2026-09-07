import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllConditions, getConditionDataBySlug } from '@/lib/conditions-data';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  ArrowRight, 
  Phone, 
  ChevronRight,
  BookOpen,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import PricingPackagesSection from '@/components/landing/pricing-packages-section';

interface PageProps {
  params: Promise<{
    conditionSlug: string;
  }>;
}

export const dynamicParams = false; // Only pre-rendered conditions are valid
export const revalidate = 86400; // 24h ISR

export async function generateStaticParams() {
  const conditions = getAllConditions();
  return conditions.map((c) => ({
    conditionSlug: c.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { conditionSlug } = await params;
  const condition = getConditionDataBySlug(conditionSlug);

  if (!condition) {
    return { title: 'Condition Not Found | Aries PhysioCare' };
  }

  const canonicalUrl = `https://www.ariesphysiocare.com/conditions/${condition.slug}`;

  return {
    title: `${condition.title}: Symptoms, Causes & Physiotherapy Management | Aries PhysioCare`,
    description: `${condition.clinicalSummary} Reviewed by ${condition.medicalReviewer.name}, ${condition.medicalReviewer.qualification}. Evidence-based physiotherapy recovery protocols.`,
    keywords: [
      `${condition.title.toLowerCase()} physiotherapy`,
      `${condition.slug} treatment at home`,
      `${condition.slug} physical therapy`,
      `${condition.slug} exercises`,
      'home physiotherapy india',
      'aries physiocare clinical guide'
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${condition.title} Physical Therapy Protocol | Aries PhysioCare`,
      description: condition.clinicalSummary,
      url: canonicalUrl,
      type: 'article',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: condition.title,
      description: condition.clinicalSummary,
    }
  };
}

export default async function ConditionDetailPage({ params }: PageProps) {
  const { conditionSlug } = await params;
  const condition = getConditionDataBySlug(conditionSlug);

  if (!condition) {
    notFound();
  }

  // Generate MedicalWebPage + MedicalCondition Schema
  const conditionSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `https://www.ariesphysiocare.com/conditions/${condition.slug}/#webpage`,
        'url': `https://www.ariesphysiocare.com/conditions/${condition.slug}`,
        'name': condition.title,
        'description': condition.clinicalSummary,
        'dateModified': condition.lastReviewedDate,
        'author': {
          '@type': 'Organization',
          'name': 'Aries HealthCare Clinical Editorial Board',
          'url': 'https://www.ariesphysiocare.com'
        },
        'reviewedBy': {
          '@type': 'Person',
          'name': condition.medicalReviewer.name,
          'jobTitle': condition.medicalReviewer.title,
          ...(condition.medicalReviewer.councilNumber ? {
            'identifier': {
              '@type': 'PropertyValue',
              'propertyID': 'Council Registration Number',
              'value': condition.medicalReviewer.councilNumber
            }
          } : {}),
          'url': `https://www.ariesphysiocare.com/physiotherapists/${condition.medicalReviewer.slug}`
        },
        'mainEntity': {
          '@type': 'MedicalCondition',
          'name': condition.medicalName,
          'possibleTreatment': condition.physioProtocols.map(p => ({
            '@type': 'MedicalTherapy',
            'name': p.phase,
            'description': p.description
          }))
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://www.ariesphysiocare.com' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Conditions', 'item': 'https://www.ariesphysiocare.com/conditions' },
          { '@type': 'ListItem', 'position': 3, 'name': condition.title, 'item': `https://www.ariesphysiocare.com/conditions/${condition.slug}` }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(conditionSchema) }}
      />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="bg-secondary/20 border-b border-border/40 py-3">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/conditions" className="hover:text-foreground">Conditions</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium truncate">{condition.title}</span>
        </div>
      </nav>

      {/* Hero & Clinical Byline Header */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 via-background to-background border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-primary/40 text-primary font-bold">
              {condition.category}
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">
              Clinical ID: {condition.medicalName}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {condition.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {condition.clinicalSummary}
          </p>

          {/* E-E-A-T Medical Reviewer Card (DEC-07) */}
          <div className="bg-card border border-border/60 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glassmorphic">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-foreground">
                    Medically Reviewed by{' '}
                    <Link href={`/physiotherapists/${condition.medicalReviewer.slug}`} className="text-primary hover:underline">
                      {condition.medicalReviewer.name}
                    </Link>
                  </span>
                  <ShieldCheck className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">
                  {condition.medicalReviewer.qualification} • Reg: {condition.medicalReviewer.councilNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground self-end sm:self-center">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Reviewed on: {condition.lastReviewedDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-12 grid lg:grid-cols-3 gap-12 flex-1">
        {/* Clinical Overview & Protocols (2 Cols) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Symptoms Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-primary" /> Common Clinical Symptoms
            </h2>
            <ul className="space-y-2.5">
              {condition.symptoms.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-3 text-muted-foreground text-base">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Causes Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Root Mechanical & Anatomical Causes</h2>
            <div className="grid gap-3">
              {condition.causes.map((cause, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-secondary/20 border border-border/40 text-sm text-muted-foreground">
                  <strong className="text-foreground block mb-1">Etiological Factor {idx + 1}:</strong>
                  {cause}
                </div>
              ))}
            </div>
          </section>

          {/* Multi-Stage Physical Therapy Protocols (DEC-09 Semantic Tables) */}
          <section className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Evidence-Based Rehabilitation Protocol</h2>
              <p className="text-sm text-muted-foreground">
                Standardized clinical recovery stages utilized by Aries PhysioCare specialists for home physical therapy sessions.
              </p>
            </div>

            <div className="space-y-6">
              {condition.physioProtocols.map((proto, idx) => (
                <Card key={idx} className="border-border/60 glassmorphic">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs flex items-center justify-center font-extrabold">
                        {idx + 1}
                      </span>
                      {proto.phase}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {proto.description}
                    </p>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground/80 block mb-2">
                        Clinical Modalities & Exercises Applied:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {proto.modalities.map((mod, mIdx) => (
                          <Badge key={mIdx} variant="secondary" className="text-xs">
                            {mod}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Who Should Opt For Home Care */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Why Home Physical Therapy for {condition.title}?</h2>
            <div className="grid gap-3">
              {condition.whoShouldOptForHomeCare.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Clinical FAQs */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Clinical Questions</h2>
            <div className="space-y-4">
              {condition.faqs.map((faq, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-card border border-border/50 space-y-2">
                  <h3 className="font-bold text-base text-foreground">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Clinical Literature Evidence & Citations */}
          <section className="p-6 rounded-2xl bg-secondary/20 border border-border/40 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> Clinical Evidence & Research References
            </h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              {condition.evidence.map((ev, idx) => (
                <li key={idx}>
                  <strong>{ev.source}:</strong> {ev.citation}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar Sticky Booking & Action Widget (DEC-10) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-28 space-y-6">
            <Card className="glassmorphic border-primary/40 shadow-2xl overflow-hidden">
              <div className="bg-primary/10 border-b border-primary/20 px-6 py-4">
                <Badge variant="outline" className="bg-primary/20 text-primary font-bold border-primary/40 mb-1">
                  Same-Day Bedside Visit
                </Badge>
                <h3 className="text-xl font-bold text-foreground">
                  Book Treatment for {condition.title.split(' ')[0]}
                </h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hospital-grade physical therapy delivered to your home. Certified specialists equipped with portable modalities.
                </p>

                <div className="space-y-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Complete Functional Range Assessment
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Bedside Modality Treatment Included
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> Verified State Council Specialist
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <BookAppointmentButton size="lg" className="w-full h-12 font-bold neon-accent-border">
                    Book Home Session Now
                  </BookAppointmentButton>
                  <Button asChild variant="outline" size="lg" className="w-full h-12 font-bold">
                    <a href="tel:+919136447006" className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4" /> Call Clinical Advisor
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Specialties */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold">Related Clinical Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {condition.relatedServices.map((s, idx) => (
                  <Link
                    key={idx}
                    href={`/services/${s.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-secondary/40 transition-colors text-sm font-medium"
                  >
                    <span>{s.title}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Condition Recovery & Rehabilitation Packages */}
      <PricingPackagesSection
        conditionSlug={condition.slug}
        title={<>{condition.title} <span className="premium-gradient-text">Recovery Packages</span></>}
        subtitle={`Personalized multi-session in-home physiotherapy programs engineered for ${condition.title}. Decreasing per-day charges, dedicated clinical specialists, and portable electrotherapy equipment included.`}
        badgeText={`${condition.title} Care Plans`}
        className="border-t border-border/40"
      />

      <Footer />
    </main>
  );
}
