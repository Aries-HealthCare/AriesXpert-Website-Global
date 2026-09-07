'use client';

import Image from "next/image";
import { 
  TrendingUp, 
  MapPin, 
  Globe, 
  Building2, 
  Users, 
  Smartphone, 
  Activity, 
  Handshake, 
  Target 
} from "lucide-react";

export default function Roadmap() {
  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        
        {/* Main Card Wrapper */}
        <div className="bg-white/85 dark:bg-card/85 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 lg:p-12 border border-purple-100/80 dark:border-purple-900/30 shadow-xl shadow-purple-950/5 relative overflow-hidden">
          
          {/* Header */}
          <div className="relative mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/50 text-purple-900 dark:text-purple-200 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <TrendingUp className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>Our Growth</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Global Presence &{" "}
              <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-amber-600 dark:from-purple-400 dark:via-purple-300 dark:to-amber-400 bg-clip-text text-transparent">
                Future Roadmap
              </span>
            </h2>

            <p className="mt-2 text-base sm:text-lg text-muted-foreground max-w-2xl">
              Our vision for a connected, accessible, and intelligent future of home healthcare.
            </p>

            {/* Floating Cursive Accent */}
            <div className="hidden lg:block absolute -top-2 right-4 font-script text-purple-600 dark:text-purple-400 text-2xl sm:text-3xl rotate-3 select-none pointer-events-none">
              Expanding Care Enriching Lives ♡
            </div>
          </div>

          {/* Grid Layout: Left Map & Stats, Right Roadmap Pillars & Side Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: World Map Visual & Metric Strip (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              
              {/* World Map Container */}
              <div className="relative w-full aspect-[16/11] rounded-3xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100/70 dark:border-purple-900/30 p-4 flex items-center justify-center overflow-hidden">
                
                {/* SVG Dotted World Map Graphic with connection arcs */}
                <svg className="w-full h-full text-purple-400/50 dark:text-purple-600/40" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Continental Dots */}
                  <g fill="currentColor">
                    {/* North America */}
                    <circle cx="120" cy="110" r="3.5" /><circle cx="150" cy="100" r="3.5" /><circle cx="180" cy="120" r="3.5" />
                    <circle cx="210" cy="130" r="3.5" /><circle cx="240" cy="150" r="3.5" /><circle cx="160" cy="160" r="3.5" />
                    <circle cx="190" cy="180" r="3.5" /><circle cx="220" cy="190" r="3.5" /><circle cx="170" cy="210" r="3.5" />
                    
                    {/* South America */}
                    <circle cx="280" cy="280" r="3.5" /><circle cx="300" cy="310" r="3.5" /><circle cx="320" cy="350" r="3.5" />
                    <circle cx="310" cy="400" r="3.5" /><circle cx="330" cy="380" r="3.5" />

                    {/* Europe */}
                    <circle cx="480" cy="110" r="3.5" /><circle cx="500" cy="100" r="3.5" /><circle cx="520" cy="120" r="3.5" />
                    <circle cx="490" cy="140" r="3.5" /><circle cx="510" cy="150" r="3.5" /><circle cx="530" cy="160" r="3.5" />

                    {/* Africa */}
                    <circle cx="500" cy="210" r="3.5" /><circle cx="520" cy="240" r="3.5" /><circle cx="540" cy="280" r="3.5" />
                    <circle cx="560" cy="310" r="3.5" /><circle cx="550" cy="360" r="3.5" />

                    {/* Middle East & Asia */}
                    <circle cx="610" cy="140" r="3.5" /><circle cx="640" cy="130" r="3.5" /><circle cx="670" cy="150" r="3.5" />
                    <circle cx="710" cy="160" r="3.5" /><circle cx="750" cy="180" r="3.5" /><circle cx="780" cy="200" r="3.5" />
                    <circle cx="620" cy="210" r="3.5" /><circle cx="650" cy="230" r="3.5" /><circle cx="680" cy="260" r="3.5" />
                    <circle cx="700" cy="290" r="3.5" /><circle cx="730" cy="310" r="3.5" />

                    {/* Australia */}
                    <circle cx="830" cy="340" r="3.5" /><circle cx="860" cy="360" r="3.5" /><circle cx="890" cy="380" r="3.5" />
                    <circle cx="850" cy="400" r="3.5" />
                  </g>

                  {/* Arcs connecting nodes */}
                  <path d="M220 190 Q 360 120 510 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                  <path d="M510 150 Q 580 180 620 210" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                  <path d="M620 210 Q 650 240 685 270" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                  <path d="M685 270 Q 760 300 850 360" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                </svg>

                {/* Regional Pinpoints */}
                <div className="absolute top-[38%] left-[22%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="absolute top-[30%] left-[51%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="absolute top-[42%] left-[62%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="absolute top-[36%] left-[80%] -translate-x-1/2 -translate-y-1/2">
                  <div className="w-3.5 h-3.5 rounded-full bg-purple-600/30 animate-ping" />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>

                {/* Active India (Mumbai) Pin & Popover Callout */}
                <div className="absolute top-[54%] left-[68.5%] -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-600/40 animate-ping absolute -left-2 -top-2" />
                    <div className="w-4 h-4 rounded-full bg-purple-700 dark:bg-purple-500 border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>

                    {/* Popover Pill */}
                    <div className="ml-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-purple-200 dark:border-purple-800 flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin className="w-3 h-3 text-purple-600 fill-purple-600 shrink-0" />
                      <div className="text-[11px] leading-tight">
                        <span className="text-muted-foreground">Currently Serving: </span>
                        <span className="font-bold text-foreground">Mumbai, India</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4 Metric Counters Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">10+</p>
                    <p className="text-[10px] text-muted-foreground">Cities (India)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">3+</p>
                    <p className="text-[10px] text-muted-foreground">Countries</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">50+</p>
                    <p className="text-[10px] text-muted-foreground">Partner Clinics</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center text-purple-700 dark:text-purple-300 shrink-0">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">1,000+</p>
                    <p className="text-[10px] text-muted-foreground">Lives Impacted</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: 4 Roadmap Pillars alongside Side Visual (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* 4 Feature Pillars (7 cols of right section) */}
              <div className="sm:col-span-7 space-y-4">
                
                {/* 1. Digital Health Ecosystem */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100/90 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground font-headline">
                      Digital Health Ecosystem
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Developing mobile apps and patient portals for seamless communication and access to care.
                    </p>
                  </div>
                </div>

                {/* 2. AI & Remote Monitoring */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100/90 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground font-headline">
                      AI & Remote Monitoring
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Integrating AI-assisted recovery tracking and wearable technology for real-time progress monitoring.
                    </p>
                  </div>
                </div>

                {/* 3. Insurance & Partner Integrations */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100/90 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground font-headline">
                      Insurance & Partner Integrations
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      Building partnerships with insurance providers and other healthcare stakeholders to create a truly integrated care experience.
                    </p>
                  </div>
                </div>

                {/* 4. Expanding Our Reach */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-2xl bg-purple-100/90 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground font-headline">
                      Expanding Our Reach
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                      With a strong presence across major Indian cities, we are actively executing our expansion roadmap to bring quality home healthcare to more communities, both nationally and internationally.
                    </p>
                  </div>
                </div>

              </div>

              {/* Side Visual Card: Vertical Compassionate Hands Photo (5 cols of right section) */}
              <div className="sm:col-span-5 h-full flex flex-col justify-center">
                <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden shadow-lg border border-purple-100/80 dark:border-purple-900/40 group">
                  <Image
                    src="/images/about/roadmap-hands-vertical.jpg"
                    alt="Aries PhysioCare compassionate care hands"
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Card Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                    <h4 className="text-base sm:text-lg font-bold font-headline text-white tracking-tight leading-snug drop-shadow-md">
                      A Healthier World Together
                    </h4>
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-medium w-fit shadow-xs">
                      <span>People • Partnerships • Possibilities</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}