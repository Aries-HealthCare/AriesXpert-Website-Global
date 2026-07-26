import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Rocket, Gem } from "lucide-react";

const items = [
  {
    icon: Eye,
    title: "Our Vision",
    description: "To become a global leader in home healthcare, delivering hospital-level care at home through innovation and compassion.",
  },
  {
    icon: Rocket,
    title: "Our Mission",
    description: "To empower patients with personalized, expert-led home healthcare services supported by technology and standardized clinical protocols.",
  },
  {
    icon: Gem,
    title: "Our Core Values",
    description: "Patient First. Clinical Excellence. Integrity & Transparency. Innovation in Care. Continuous Learning.",
  },
];

export default function MissionVision() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <Card key={item.title} className="glassmorphic text-center transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                  <item.icon className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-2xl mb-4">{item.title}</CardTitle>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}