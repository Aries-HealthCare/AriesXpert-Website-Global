'use client';

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Download, MapPin, Briefcase, Clock, ChevronRight, Search, XCircle, FileText, Target, Info } from 'lucide-react';
import Link from "next/link";
import { cn } from "@/lib/utils";

const benefits = [
  { title: "Flexible Working Hours", description: "Choose your schedule and maintain a healthy work-life balance." },
  { title: "Competitive Payouts", description: "Earn what you deserve with our transparent and competitive compensation model." },
  { title: "Steady Patient Flow", description: "Get access to a consistent stream of patients in your preferred locality." },
  { title: "Technology-Enabled Practice", description: "Use our AriesXpert app to manage appointments, track progress, and reduce administrative work." },
  { title: "Clinical Growth & Learning", description: "Benefit from continuous training, workshops, and access to standardized protocols." },
  { title: "Pan-India & Global Opportunities", description: "Grow with us as we expand our footprint across new cities and countries." },
];

const jobOpenings = [
  {
    id: "job-1",
    title: "Senior Physiotherapist (Neurology)",
    role: "Physiotherapist",
    city: "Mumbai",
    area: "Andheri West",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    experience: "5+ Years",
    description: "As a Senior Neuro-Physiotherapist at Aries, you will lead complex clinical cases involving stroke recovery, Parkinson's, and spinal injuries. You will be responsible for designing high-fidelity recovery roadmaps, supervising junior therapists, and utilizing advanced neuro-rehab modalities at the patient's home.",
    requirements: ["MPT in Neurology", "Experience with task-oriented training", "Strong clinical documentation skills"]
  },
  {
    id: "job-2",
    title: "Consultant Physiotherapist (Sports)",
    role: "Consultant",
    city: "Pune",
    area: "Kothrud",
    location: "Pune, Maharashtra",
    type: "Full-time",
    experience: "3+ Years",
    description: "Lead our sports medicine initiative in Pune. You will work with professional and amateur athletes to restore movement economy and performance. Expertise in biomechanical screening and portable therapeutic modalities (Laser/IFT) is essential.",
    requirements: ["BPT/MPT Sports", "Certification in Manual Therapy", "Athelete management experience"]
  },
  {
    id: "job-3",
    title: "Home Healthcare Physiotherapist",
    role: "Physiotherapist",
    city: "Bengaluru",
    area: "Whitefield",
    location: "Bengaluru, Karnataka",
    type: "Full-time / Part-time",
    experience: "1+ Years",
    description: "Join our primary clinical team in Bengaluru. Deliver evidence-based home sessions for orthopedic and post-operative cases. You will use the AriesXpert app to track patient milestones and coordinate care with our medical directorate.",
    requirements: ["BPT Degree", "Passion for home-based clinical care", "Effective communication"]
  },
  {
    id: "job-4",
    title: "Geriatric Care Specialist",
    role: "Specialist",
    city: "Chennai",
    area: "Adyar",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    experience: "4+ Years",
    description: "Specialized role focusing on senior independence and fall prevention in Chennai. You will conduct environmental safety assessments and design gentle yet effective functional mobilization plans for the elderly.",
    requirements: ["BPT", "Experience in Geriatric Rehab", "Patient and compassionate approach"]
  },
  {
    id: "job-5",
    title: "Clinical Coordinator",
    role: "Coordinator",
    city: "Delhi NCR",
    area: "Saket",
    location: "Delhi NCR",
    type: "Full-time",
    experience: "2+ Years",
    description: "Manage clinical logistics and patient intake for the Delhi region. You will bridge the gap between patient symptoms and therapist allocation, ensuring every case follows Aries' high clinical standards.",
    requirements: ["Healthcare Management/BPT", "Excellent organizational skills", "Client relation expertise"]
  }
];

const cities = ["Mumbai", "Pune", "Bengaluru", "Chennai", "Delhi NCR"];
const roles = ["Physiotherapist", "Consultant", "Specialist", "Coordinator"];

export default function ForPhysiotherapistsPage() {
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  const availableAreas = useMemo(() => {
    if (selectedCity === "all") return [];
    const areas = jobOpenings
      .filter(job => job.city === selectedCity)
      .map(job => job.area);
    return Array.from(new Set(areas));
  }, [selectedCity]);

  const filteredJobs = useMemo(() => {
    return jobOpenings.filter(job => {
      const cityMatch = selectedCity === "all" || job.city === selectedCity;
      const roleMatch = selectedRole === "all" || job.role === selectedRole;
      const areaMatch = selectedArea === "all" || job.area === selectedArea;
      return cityMatch && roleMatch && areaMatch;
    });
  }, [selectedCity, selectedRole, selectedArea]);

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedRole("all");
    setSelectedArea("all");
  };

  const toggleJobDescription = (id: string) => {
    setExpandedJobId(prev => prev === id ? null : id);
  };

  return (
    <>
      <section className="relative w-full h-[50vh] md:h-[45vh] overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-4xl mx-auto glassmorphic rounded-2xl p-8 md:p-12 soft-shadow">
              <h1 className="font-headline text-4xl md:text-6xl font-bold text-white tracking-tight">
                Work With <span className="text-accent">Aries PhysioCare</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-white/90 font-medium">
                Build a rewarding career delivering expert home healthcare with flexibility, respect, and growth.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-14 px-10 text-lg font-bold neon-accent-border">Apply Now</Button>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-bold border-white text-white hover:bg-white/10">
                  Download AriesXpert App
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              The Aries Edge
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Why Join Aries PhysioCare?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <Card key={benefit.title} className="group glassmorphic hover:neon-primary-border transition-all duration-500 transform hover:-translate-y-1 animate-reveal-up fill-mode-both" style={{ animationDelay: `${idx * 100}ms` }}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-xl shadow-inner group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="font-headline text-xl font-bold">{benefit.title}</CardTitle>
                      <CardDescription className="pt-2 text-base leading-relaxed">{benefit.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/30 border-y border-border/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
              Career Hub
            </div>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Current Job Openings</h2>
            <p className="text-muted-foreground text-lg font-medium">Join our growing clinical network and redefine the standards of home healthcare.</p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="glassmorphic rounded-[2rem] p-4 md:p-6 shadow-xl border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-2">City Registry</label>
                  <Select value={selectedCity} onValueChange={(val) => { setSelectedCity(val); setSelectedArea("all"); }}>
                    <SelectTrigger className="h-12 bg-background/40 border-primary/5 rounded-xl">
                      <SelectValue placeholder="All Cities" />
                    </SelectTrigger>
                    <SelectContent className="glassmorphic">
                      <SelectItem value="all">All Cities</SelectItem>
                      {cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-2">Area Hub</label>
                  <Select value={selectedArea} onValueChange={setSelectedArea} disabled={selectedCity === "all"}>
                    <SelectTrigger className="h-12 bg-background/40 border-primary/5 rounded-xl">
                      <SelectValue placeholder="All Areas" />
                    </SelectTrigger>
                    <SelectContent className="glassmorphic">
                      <SelectItem value="all">All Areas</SelectItem>
                      {availableAreas.map(area => <SelectItem key={area} value={area}>{area}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 ml-2">Clinical Role</label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="h-12 bg-background/40 border-primary/5 rounded-xl">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent className="glassmorphic">
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map(role => <SelectItem key={role} value={role}>{role}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-3 lg:col-span-1">
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-[10px] uppercase tracking-widest border-primary/10 hover:bg-primary/5" onClick={resetFilters}>
                    <XCircle className="w-4 h-4 mr-2" /> Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 max-w-5xl mx-auto">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => (
                <Card 
                  key={job.id} 
                  onClick={() => toggleJobDescription(job.id)}
                  className={cn(
                    "glassmorphic group cursor-pointer hover:neon-primary-border transition-all duration-500 animate-reveal-up fill-mode-both",
                    expandedJobId === job.id && "neon-primary-border ring-1 ring-primary/20",
                    "overflow-hidden"
                  )} 
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <h3 className="text-xl md:text-2xl font-bold font-headline group-hover:text-primary transition-colors">{job.title}</h3>
                          <Badge variant="secondary" className="w-fit text-[10px] font-black uppercase tracking-widest bg-primary/5 text-primary border-none">{job.type}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{job.area}, {job.city}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>Registry: Active 2026</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-primary/40 group-hover:text-primary/60 transition-colors">
                          {expandedJobId === job.id ? 'Close Details' : 'View Details'}
                          <ChevronRight className={cn("w-3 h-3 transition-transform", expandedJobId === job.id && "rotate-90")} />
                        </div>
                        <Button 
                          className="h-12 px-8 font-black text-[10px] uppercase tracking-[0.2em] neon-accent-border group/btn" 
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Link href="/contact">
                            Apply for Position <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>

                    {/* Expandable Description */}
                    {expandedJobId === job.id && (
                      <div className="mt-8 pt-8 border-t border-primary/10 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="grid md:grid-cols-3 gap-8">
                          <div className="md:col-span-2 space-y-6">
                            <div className="space-y-3">
                              <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                                <FileText className="w-3.5 h-3.5" /> Clinical Role Overview
                              </h4>
                              <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                                {job.description}
                              </p>
                            </div>
                            <div className="space-y-3">
                              <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary">
                                <Target className="w-3.5 h-3.5" /> Key Responsibilities
                              </h4>
                              <ul className="grid sm:grid-cols-2 gap-3">
                                {job.requirements.map((req, i) => (
                                  <li key={i} className="flex items-start gap-3 text-xs font-bold text-foreground/80">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/5 h-fit space-y-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Info className="w-4 h-4" />
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest">Job Protocol</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">
                              Candidates must be willing to provide high-quality care in home environments and maintain strict adherence to Aries clinical safety standards.
                            </p>
                            <div className="pt-2">
                              <p className="text-[9px] font-bold uppercase text-primary/60">Registry Status</p>
                              <p className="text-xs font-black">2026 Active Intake</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-20 glassmorphic rounded-[2rem] border-dashed border-primary/20 animate-reveal-up">
                <Search className="mx-auto w-12 h-12 text-primary/20 mb-4" />
                <h3 className="text-xl font-bold font-headline">No matching openings found</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">We're always looking for elite talent. Submit a general enquiry and we'll keep your profile in our registry.</p>
                <Button className="mt-6 neon-accent-border" asChild>
                  <Link href="/contact">General Application</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground">Download the AriesXpert App</h2>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              A comprehensive clinical workstation in your pocket. Manage appointments, track patient recovery, and grow your practice with our AI-powered ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-4xl mx-auto">
            <Card className="glassmorphic p-8 text-center hover:neon-primary-border transition-all duration-500 group rounded-[2.5rem]">
              <h3 className="font-headline text-2xl font-bold mb-6">AriesXpert for Android</h3>
              <Button size="lg" className="h-16 w-full text-lg font-bold shadow-xl shadow-primary/10 group-hover:scale-105 transition-transform"><Download className="mr-2 w-6 h-6"/> Download on Play Store</Button>
            </Card>
            <Card className="glassmorphic p-8 text-center hover:neon-primary-border transition-all duration-500 group rounded-[2.5rem]">
              <h3 className="font-headline text-2xl font-bold mb-6">AriesXpert for iOS</h3>
              <Button size="lg" className="h-16 w-full text-lg font-bold shadow-xl shadow-primary/10 group-hover:scale-105 transition-transform"><Download className="mr-2 w-6 h-6"/> Download on App Store</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* High-Visibility Registry Summary */}
      <div className="mt-20 text-center animate-reveal-up stagger-4">
        <p className="text-[10px] font-black text-primary/80 uppercase tracking-[0.4em] drop-shadow-sm">
          Aries Clinical Directorate • 2026 Registry Active
        </p>
        <div className="h-px w-20 bg-primary/20 mx-auto mt-4" />
      </div>
    </>
  );
}
