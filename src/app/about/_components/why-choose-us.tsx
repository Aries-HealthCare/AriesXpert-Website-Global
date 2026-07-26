import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BadgeCheck, Beaker, User, CircleDollarSign, Cloud, Globe } from 'lucide-react';

const reasons = [
  {
    icon: BadgeCheck,
    title: "Certified & Experienced Professionals",
    description: "Our team consists of vetted, highly-qualified therapists and medical staff.",
  },
  {
    icon: Beaker,
    title: "Evidence-Based Treatment",
    description: "We follow scientifically-proven protocols to ensure the best clinical outcomes.",
  },
  {
    icon: User,
    title: "Personalized Care Plans",
    description: "Every patient receives a care plan tailored to their specific needs and goals.",
  },
  {
    icon: CircleDollarSign,
    title: "Transparent Pricing",
    description: "No hidden costs. We believe in clear and honest pricing for all our services.",
  },
  {
    icon: Cloud,
    title: "Technology-Driven Operations",
    description: "Our use of technology ensures efficient, streamlined, and high-quality service delivery.",
  },
  {
    icon: Globe,
    title: "Pan-India & Global Vision",
    description: "We are building a scalable healthcare ecosystem to serve communities worldwide.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Why Choose Aries PhysioCare</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {reasons.map((reason) => (
            <Card key={reason.title} className="glassmorphic hover:neon-primary-border transition-all duration-300 transform hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg">
                    <reason.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="font-headline text-xl">{reason.title}</CardTitle>
                    <CardDescription className="pt-2">{reason.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}