import type { Metadata } from "next";
import Hero from "./_components/hero";
import Story from "./_components/story";
import Team from "./_components/team";
import WhyChooseUs from "./_components/why-choose-us";
import Roadmap from "./_components/roadmap";
import Cta from "./_components/cta";

export const metadata: Metadata = {
  title: "About Us | Aries PhysioCare - Redefining Home Healthcare",
  description: "Learn about Aries PhysioCare, a premium home healthcare brand under Aries HealthCare International Pvt Ltd. Discover our vision, leadership team, evidence-based care protocols, and global expansion roadmap.",
  keywords: "About Us, Aries PhysioCare, Home Healthcare, Leadership Team, Akshay Patel, Karishma Rathod, Physiotherapy at Home, Clinical Excellence",
  openGraph: {
    title: "About Aries PhysioCare | Our Story, Leadership & Vision",
    description: "Redefining home healthcare with precision, compassion, and technology. Meet the team bringing clinical excellence to your doorstep.",
    url: "https://www.ariesphysiocare.com/about",
    siteName: "Aries PhysioCare",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-purple-600/20 selection:text-purple-900 dark:selection:text-purple-200">
      <Hero />
      <Story />
      <Team />
      <WhyChooseUs />
      <Roadmap />
      <Cta />
    </main>
  );
}
