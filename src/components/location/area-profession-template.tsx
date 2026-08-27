import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Phone, MessageCircle, MapPin, ChevronRight, Shield,
    CheckCircle2, Clock, HeartPulse, Award, Users, Star,
    Building2, ArrowRight, Accessibility, Mic2, Stethoscope, CookingPot
} from 'lucide-react';
import BookAppointmentButton from '@/components/book-appointment-button';
import { TherapistCard } from '@/hooks/use-therapists';
import { getLocalBusinessSchema, getBreadcrumbSchema, getHealthcareServiceSchema, getFAQSchema } from '@/lib/seo-schemas';
import TherapistCarousel from '@/components/therapist/therapist-carousel';

interface AreaProfessionTemplateProps {
    profession: string;
    professionSlug: string;
    areaName: string;
    areaSlug: string;
    therapists: TherapistCard[];
}

const PROFESSION_CONTENT: Record<string, any> = {
    'physiotherapy': {
        icon: HeartPulse,
        symptoms: ['Back Pain', 'Neck Pain', 'Joint Stiffness', 'Sports Injuries', 'Post-Op Recovery', 'Sciatica'],
        benefits: ['Reduced Pain', 'Improved Mobility', 'Faster Recovery', 'Personalized Care'],
        about: (area: string) => `Getting professional physiotherapy in ${area} is now easier than ever. Aries PhysioCare brings expert physical therapy to your doorstep, helping you recover from musculoskeletal issues, neurological conditions, and sports injuries in the comfort of your home.`,
    },
    'occupational-therapy': {
        icon: Accessibility,
        symptoms: ['Fine Motor Issues', 'Sensory Processing', 'Developmental Delays', 'Activities of Daily Living', 'Post-Stroke Recovery'],
        benefits: ['Improved Independence', 'Enhanced Motor Skills', 'Better Quality of Life', 'Adaptive Strategies'],
        about: (area: string) => `Our Occupational Therapy services in ${area} focus on helping individuals regain independence in their daily lives. We provide specialized support for both children and adults, ensuring they can perform meaningful activities with confidence.`,
    },
    'speech-therapy': {
        icon: Mic2,
        symptoms: ['Stuttering', 'Articulation Issues', 'Delayed Speech', 'Swallowing Difficulty', 'Language Disorders'],
        benefits: ['Clear Communication', 'Improved Confidence', 'Better Social Integration', 'Swallowing Safety'],
        about: (area: string) => `Speech and language therapy in ${area} helps adults and children overcome communication challenges. Our certified pathologists work on articulation, fluency, and cognitive-communication skills at your home.`,
    },
    'home-nursing': {
        icon: Stethoscope,
        symptoms: ['Post-Op Care', 'Wound Management', 'Injection Services', 'Vital Monitoring', 'Medicine Management'],
        benefits: ['Professional Medical Care', 'Hospital-Grade Safety', 'Comfort of Home', 'Peace of Mind'],
        about: (area: string) => `Reliable home nursing services in ${area} provide professional medical assistance for patients needing post-surgical care or chronic illness management. Our nurses are trained for clinical precision and compassionate care.`,
    },
};

const DEFAULT_CONTENT = {
    icon: Users,
    symptoms: ['General Weakness', 'Recovery Support', 'Activities of Daily Living', 'Mobility Issues'],
    benefits: ['Expert Support', 'Comfortable Environment', 'Personalized Attention', 'Clinical Excellence'],
    about: (area: string, prof: string) => `Aries PhysioCare provides expert ${prof} services in ${area}. Our team of certified specialists ensures you get the highest quality healthcare at your doorstep.`,
};

export default function AreaProfessionTemplate({
    profession,
    professionSlug,
    areaName,
    areaSlug,
    therapists
}: AreaProfessionTemplateProps) {
    const content = PROFESSION_CONTENT[professionSlug] || DEFAULT_CONTENT;
    const Icon = content.icon;
    const aboutText = typeof content.about === 'function' ? content.about(areaName, profession) : content.about;

    const WHATSAPP_URL = `https://wa.me/918591981880?text=${encodeURIComponent(`Hi! I need ${profession} in ${areaName}. Please share details.`)}`;

    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: profession, url: `/therapist?specialization=${professionSlug.replace('-', '_')}` },
        { name: `${profession} in ${areaName}`, url: `/${professionSlug}/${areaSlug}` },
    ];

    const faqs = [
        {
            question: `How quickly can I get a ${profession} session in ${areaName}?`,
            answer: `We typically arrange a session within 4-6 hours of booking in ${areaName}. Same-day appointments are available for bookings made before 2 PM.`,
        },
        {
            question: `Are your specialists qualified and background-verified?`,
            answer: `Yes, every Aries specialist is a certified professional with verified degrees and clinical experience. We follow a multi-step verification process before onboarding.`,
        },
        {
            question: `Do you bring equipment for home sessions in ${areaName}?`,
            answer: `Absolutely. Our specialists bring all necessary portable clinical equipment required for the session. You only need to provide a comfortable space.`,
        }
    ];

    const jsonLd = [
        getBreadcrumbSchema(breadcrumbs),
        getHealthcareServiceSchema({
            name: `${profession} in ${areaName}`,
            description: `Book expert ${profession.toLowerCase()} specialists in ${areaName} for home sessions.`,
            url: `https://www.ariesphysiocare.com/${professionSlug}/${areaSlug}`,
        }),
        getFAQSchema(faqs),
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {jsonLd.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}

            {/* Hero Section */}
            <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12)_0%,transparent_60%)]" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center text-white space-y-8">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">
                            <Icon className="w-4 h-4 text-accent" />
                            Expert {profession} Specialist
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        Best {profession} in <span className="text-accent underline decoration-accent/30">{areaName}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                        Hospital-grade clinical care at your doorstep in {areaName}. Certified specialists available for same-day home visits.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border">
                            Book Now in {areaName}
                        </BookAppointmentButton>
                        <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                            <a href="tel:+919136447006" className="flex items-center gap-2">
                                <Phone className="w-5 h-5" /> Call Expert
                            </a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Therapist List */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-3 max-w-2xl">
                            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                Top Verified {profession} Specialists in {areaName}
                            </h2>
                            <p className="text-muted-foreground text-lg">
                                Showing highly-rated professionals available for home visits in your locality.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-primary">
                            <Shield className="w-5 h-5" /> All Profiles Verified
                        </div>
                    </div>

                    {therapists.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {therapists.map((therapist) => (
                                <Card key={therapist.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-border/40 glassmorphic">
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={therapist.imageUrl}
                                            alt={therapist.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                                            <Badge className="bg-green-500/90 text-white backdrop-blur-sm border-0 font-bold">
                                                Available
                                            </Badge>
                                            {therapist.isVerified && (
                                                <Badge className="bg-primary/90 text-white backdrop-blur-sm border-0 font-bold">
                                                    Verified
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <CardContent className="p-6 space-y-4">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1 mb-1">{therapist.name}</h3>
                                            <p className="text-sm font-bold text-primary mb-2">{therapist.qualification}</p>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3.5 h-3.5 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                                ))}
                                                <span className="text-xs font-black ml-1">4.8 (80+ reviews)</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Award className="w-4 h-4 text-primary" /> {therapist.experience} Experience
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-primary" /> Covering {areaName}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <Link href={`/therapist/${therapist.slug}`} className="flex-1">
                                                <Button variant="outline" className="w-full font-bold">Profile</Button>
                                            </Link>
                                            <BookAppointmentButton className="flex-1 font-bold">Book Now</BookAppointmentButton>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-secondary/20 rounded-3xl p-12 text-center max-w-2xl mx-auto border-2 border-dashed border-border">
                            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
                            <h3 className="text-2xl font-bold mb-3">Expanding Our Services in {areaName}</h3>
                            <p className="text-muted-foreground mb-8">
                                We are currently onboarding more {profession.toLowerCase()} specialists in your area. You can still book an assessment and we will match you with a nearby expert.
                            </p>
                            <BookAppointmentButton size="lg" className="font-bold">Book General Assessment</BookAppointmentButton>
                        </div>
                    )}
                </div>
            </section>

            {/* About & Symptoms Section */}
            <section className="py-20 bg-secondary/20">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                                    Quality <span className="text-primary">{profession}</span> Services at Home
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {aboutText}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Key Benefits
                                    </h3>
                                    <ul className="space-y-3">
                                        {content.benefits.map((benefit: string) => (
                                            <li key={benefit} className="flex items-center gap-2 text-muted-foreground font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="font-bold text-xl flex items-center gap-2">
                                        <HeartPulse className="w-5 h-5 text-accent" /> Conditions Treated
                                    </h3>
                                    <ul className="space-y-3">
                                        {content.symptoms.map((symptom: string) => (
                                            <li key={symptom} className="flex items-center gap-2 text-muted-foreground font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {symptom}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 mt-8">
                                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl border">
                                    <Image src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=85&w=800" alt="Specialized Care" fill className="object-cover" />
                                </div>
                                <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-xl border">
                                    <Image src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=85&w=800" alt="Home Visit" fill className="object-cover" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-xl border">
                                    <Image src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=85&w=800" alt="Expert Consultation" fill className="object-cover" />
                                </div>
                                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl border">
                                    <Image src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=85&w=800" alt="Advanced Equipment" fill className="object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Specialists Carousel */}
            <div className="bg-secondary/10">
                <TherapistCarousel
                    title={`Other Highly Rated ${profession}s Near ${areaName}`}
                    description={`Our team of expert ${profession.toLowerCase()}s covers all major localities in your city. Browse more verified specialists.`}
                    specialization={professionSlug.replace('-', '_')}
                    city={therapists[0]?.city}
                    limit={10}
                />
            </div>

            {/* CTA Section */}
            <section className="py-20 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 text-center text-white space-y-8 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black">Ready to Start Your Recovery?</h2>
                    <p className="text-xl text-white/80 max-w-xl mx-auto font-medium">
                        Speak with our clinical experts now and get assigned a {profession.toLowerCase()} in {areaName} today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <BookAppointmentButton size="lg" className="h-14 px-10 text-base font-bold neon-accent-border shadow-xl">
                            Instant Booking
                        </BookAppointmentButton>
                        <Button asChild size="lg" variant="outline" className="h-14 px-8 font-bold text-white border-white/40 hover:bg-white/10 bg-transparent">
                            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
