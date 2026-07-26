import AnalysisTool from "./_components/analysis-tool";
import { Microscope, BrainCircuit, ShieldCheck, Activity } from "lucide-react";

export const metadata = {
  title: "Aries AI™ | Advanced Clinical Body Insight & Analysis",
  description: "Experience the future of physiotherapy with Aries AI™. Our advanced clinical body map visualization provides deep anatomical insights and personalized recovery protocols.",
  keywords: "AI Body Analysis, Clinical Anatomy, 3D Body Mapping, Physiotherapy AI, Aries HealthCare, Precision Recovery",
};

export default function AiAnalysisPage() {
  return (
    <div className="bg-background min-h-screen selection:bg-primary/20">
      {/* ── PREMIUM CLINICAL HERO ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden border-b border-primary/10">
        <div className="absolute inset-0 z-0">
          {/* Dynamic Background Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.08)_0%,transparent_70%)] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

          {/* Floating High-Tech Accents */}
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-[100px] animate-blob" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent/5 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-reveal-up">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-primary/20 text-primary text-xs md:text-sm font-bold uppercase tracking-widest backdrop-blur-xl shadow-2xl">
              <Microscope className="w-4 h-4 text-accent animate-pulse" /> Aries AI™ Diagnostic Precision Core
            </div>

            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-foreground leading-[1.1] mb-4">
              FUTURE OF <br />
              <span className="text-primary italic underline decoration-accent/30 underline-offset-[8px]">BODY ANALYSIS</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              Clinical-grade anatomical visualization meets deep neural insights. Experience <span className="text-foreground font-black">Aries AI™</span> — the global standard in predictive recovery.
            </p>

            <div className="flex flex-wrap justify-center gap-8 pt-10 border-t border-primary/5">
              {[
                { icon: BrainCircuit, text: "Neural Mapping" },
                { icon: ShieldCheck, text: "Clinical Integrity" },
                { icon: Activity, text: "Live Kinematics" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground/80 font-bold uppercase tracking-widest text-xs md:text-sm">
                  <item.icon className="w-5 h-5 text-accent/80" /> {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE ANALYSIS INTERFACE ──────────────────────────────────────── */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-secondary/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/2 rounded-full blur-[120px] -mr-[400px] -mt-[400px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnalysisTool />
        </div>

        {/* Registry & Authority Section */}
        <div className="mt-20 text-center animate-reveal-up stagger-4 max-w-lg mx-auto px-6">
          <div className="p-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />
          <p className="text-sm font-bold text-primary/80 uppercase tracking-widest mb-4">
            REGISTRY: 2026 CLINICAL PROTOCOL ACTIVE
          </p>
          <p className="text-sm text-muted-foreground/80 font-medium leading-relaxed uppercase tracking-wider">
            Aries AI™ is an assistive diagnostic tool designed to augment clinical assessment. All assessments are verified by licensed practitioners at Aries HealthCare International.
          </p>
          <div className="grid grid-cols-4 gap-4 mt-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {/* These would be logos of partners/standardizations */}
            <div className="h-4 bg-muted-foreground/20 rounded-full" />
            <div className="h-4 bg-muted-foreground/20 rounded-full" />
            <div className="h-4 bg-muted-foreground/20 rounded-full" />
            <div className="h-4 bg-muted-foreground/20 rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}