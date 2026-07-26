import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Sparkles, Linkedin, Github } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const founders = [
  {
    name: "Mr. Akshay Patel",
    role: "Founder & Chief Executive Officer",
    qualification: "Global Healthcare Entrepreneur",
    bio: "Visionary leader dedicated to standardizing home healthcare through technology and clinical rigor.",
    imageUrl: "/images/team/akshay-patel.png",
    imageHint: "ceo portrait"
  },
  {
    name: "Ms. Karishma Rathod",
    role: "Co-Founder & Chief Operating Officer",
    qualification: "MBA, Strategy & Operations",
    bio: "Strategic operations leader focused on building scalable healthcare ecosystems and ensuring operational excellence across global markets.",
    imageUrl: "/images/team/karishma-rathod.png",
    imageHint: "coo portrait"
  }
];



export default function Team() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6 animate-reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
            <Award className="w-3 h-3" /> The Visionaries
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
            Founders & Co-Founders
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-medium">
            Steering Aries PhysioCare toward a connected, accessible, and intelligent future of home healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {founders.map((founder, idx) => (
            <Card key={founder.name} className={cn(
              "group glassmorphic border-primary/5 hover:neon-primary-border healthcare-motion transform hover:-translate-y-2 flex flex-col shadow-sm relative overflow-hidden rounded-[2.5rem] animate-reveal-up fill-mode-both",
              idx % 2 === 0 ? "stagger-1" : "stagger-2"
            )}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary),0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

              <CardHeader className="p-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={founder.imageUrl}
                    alt={founder.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={founder.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-8 right-8">
                    <Badge className="bg-accent text-accent-foreground font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1 rounded-full shadow-lg border-none mb-3">
                      <Sparkles className="w-2.5 h-2.5 mr-1.5" /> Founder
                    </Badge>
                    <h3 className="text-3xl font-bold font-headline text-white tracking-tight">{founder.name}</h3>
                    <p className="text-accent font-black text-[11px] uppercase tracking-widest mt-1">{founder.qualification}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-8 space-y-4 flex-grow relative z-10">
                <p className="text-primary font-black text-xs uppercase tracking-widest">{founder.role}</p>
                <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                  {founder.bio}
                </p>
                <div className="pt-4 flex gap-4">
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>



        <div className="mt-24 text-center animate-reveal-up stagger-4">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] drop-shadow-sm">
            Aries Clinical Directorate • 2026 Registry Active
          </p>
          <div className="h-px w-20 bg-primary/20 mx-auto mt-4" />
        </div>
      </div>
    </section>
  );
}