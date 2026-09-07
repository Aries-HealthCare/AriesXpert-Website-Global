'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getLocalizedFaqs } from "@/lib/placeholder-data";
import { GeoPath } from "@/lib/types";
import { useMemo } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import SchemaMarkup from "./seo/schema-markup";

interface Faq {
  id: string;
  question: string;
  answer: string;
}

interface LocalizedFaqSectionProps {
  geo: GeoPath | null;
  className?: string;
  title?: string;
  description?: string;
  faqs?: Faq[];
}

export default function LocalizedFaqSection({ geo, className, title, description, faqs: propFaqs }: LocalizedFaqSectionProps) {
  const faqs = useMemo(() => propFaqs || getLocalizedFaqs(geo), [geo, propFaqs]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const cityName = geo?.city?.name || 'Mumbai';
  const displayTitle = title || `FAQ`;
  const displayDescription = description || `Some frequently asked questions regarding physiotherapy / chiropractor services. For more FAQ's`;

  return (
    <section className={cn("py-16 md:py-24 bg-background relative overflow-hidden", className)}>
      <SchemaMarkup data={faqSchema} />
      {/* Abstract Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4 flex flex-col items-center animate-reveal-up">
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight uppercase">
            <span className="premium-gradient-text">{displayTitle}</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light">
            {displayDescription}
          </p>
        </div>

        <div className="w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1600px] mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className={cn(
                  "premium-card rounded-3xl border-0 px-6 md:px-10 shadow-sm hover:shadow-md healthcare-motion group overflow-hidden bg-white/80 dark:bg-card/80 backdrop-blur-md",
                  "animate-reveal-up fill-mode-both",
                  index % 2 === 0 ? "stagger-1" : "stagger-2"
                )}
              >
                <AccordionTrigger className="font-headline text-left hover:no-underline font-bold text-lg md:text-xl py-8 text-foreground transition-colors group-data-[state=open]:text-primary [&>svg]:hidden">
                  <div className="flex items-center justify-between w-full gap-4">
                    <span>{faq.question}</span>
                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-all duration-300">
                      <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base md:text-lg leading-relaxed pb-10">
                  <div className="max-w-5xl border-l-2 border-primary/10 pl-6">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-16 text-center animate-reveal-up stagger-3">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Still have technical clinical queries?</p>
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 text-primary font-black text-lg hover:underline transition-all"
            >
              <HelpCircle className="w-5 h-5" />
              Connect with a Clinical Coordinator
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
