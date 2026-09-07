'use client';

import { 
  Sparkles, 
  Users, 
  FileText, 
  HeartHandshake, 
  IndianRupee, 
  Settings, 
  Globe, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

const reasons = [
  {
    number: "01",
    icon: Users,
    iconBg: "bg-purple-100/90 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300",
    title: "Certified & Experienced Professionals",
    description: "Our team consists of vetted, highly-qualified therapists and medical staff.",
    link: "/therapist",
  },
  {
    number: "02",
    icon: FileText,
    iconBg: "bg-amber-100/90 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300",
    title: "Evidence-Based Treatment",
    description: "We follow scientifically-proven protocols to ensure the best clinical outcomes.",
    link: "/services",
  },
  {
    number: "03",
    icon: HeartHandshake,
    iconBg: "bg-purple-100/90 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300",
    title: "Personalized Care Plans",
    description: "Every patient receives a care plan tailored to their specific needs and goals.",
    link: "/services",
  },
  {
    number: "04",
    icon: IndianRupee,
    iconBg: "bg-amber-100/90 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300",
    title: "Transparent Pricing",
    description: "No hidden costs. We believe in clear and honest pricing for all our services.",
    link: "/pricing",
  },
  {
    number: "05",
    icon: Settings,
    iconBg: "bg-purple-100/90 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300",
    title: "Technology-Driven Operations",
    description: "Our use of technology ensures efficient, streamlined, and high-quality service delivery.",
    link: "/services",
  },
  {
    number: "06",
    icon: Globe,
    iconBg: "bg-amber-100/90 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300",
    title: "Pan-India & Global Vision",
    description: "We are building a scalable healthcare ecosystem to serve communities worldwide.",
    link: "/clinic",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-100/20 dark:bg-purple-950/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        
        {/* Header with Cursive Accent */}
        <div className="relative max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Why Choose Us</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent">
              Aries PhysioCare?
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            We go beyond treatment — we deliver a better way to live.
          </p>

          {/* Floating script top right */}
          <div className="hidden lg:block absolute -top-4 -right-16 font-script text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl rotate-6 select-none pointer-events-none">
            Your Health Our Priority ♡
          </div>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white/80 dark:bg-card/80 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-purple-100/80 dark:border-purple-900/40 shadow-sm hover:shadow-xl hover:border-purple-300/60 dark:hover:border-purple-800/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300 group-hover:scale-110`}>
                    <item.icon className="w-6 h-6" />
                  </div>

                  {/* Step Number */}
                  <span className="text-2xl font-bold text-muted-foreground/30 font-headline group-hover:text-purple-600/40 transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-headline text-foreground tracking-tight mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>

              {/* Arrow Button */}
              <div className="pt-4 mt-2 flex justify-end">
                <Link
                  href={item.link}
                  className="w-8 h-8 rounded-full border border-purple-200 dark:border-purple-800/60 bg-purple-50/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs"
                  aria-label={`Learn more about ${item.title}`}
                >
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}