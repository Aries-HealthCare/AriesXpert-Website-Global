import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Building, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Work With Us | Aries PhysioCare",
  description: "Join our team of expert healthcare professionals, partner with us for corporate wellness, or invest in the future of home healthcare. Explore opportunities with Aries PhysioCare.",
};

const opportunities = [
  {
    title: "For Physiotherapists",
    description: "Build a rewarding career delivering expert home healthcare with flexibility and growth.",
    href: "/work-with-us/for-physiotherapists",
    icon: Briefcase,
  },
  {
    title: "For Corporates",
    description: "Enhance employee wellbeing with our structured home healthcare solutions.",
    href: "/work-with-us/for-corporates",
    icon: Building,
  },
  {
    title: "For Investors",
    description: "Invest in the future of home healthcare and join our mission to scale globally.",
    href: "/work-with-us/for-investors",
    icon: TrendingUp,
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <section className="relative w-full h-[40vh] md:h-[35vh] overflow-hidden">
        <div className="absolute inset-0 bg-secondary/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-4xl mx-auto glassmorphic rounded-2xl p-8">
              <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                Work With Aries PhysioCare
              </h1>
              <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                Join us in our mission to revolutionize home healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opp) => (
              <Card key={opp.title} className="glassmorphic text-center transform hover:-translate-y-2 transition-transform duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                    <opp.icon className="h-8 w-8" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline text-2xl mb-4">{opp.title}</CardTitle>
                  <p className="text-muted-foreground mb-6">{opp.description}</p>
                  <Link href={opp.href} className="font-semibold text-primary hover:underline">
                    Learn More &rarr;
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
