import Hero from "./_components/hero";
import Story from "./_components/story";
import MissionVision from "./_components/mission-vision";
import Team from "./_components/team";
import WhyChooseUs from "./_components/why-choose-us";
import Roadmap from "./_components/roadmap";
import Cta from "./_components/cta";

export const metadata = {
  title: "About Aries PhysioCare | Our Mission, Vision, and Team",
  description: "Learn about Aries PhysioCare, a premium home healthcare brand by Aries HealthCare International Pvt Ltd. Discover our mission to deliver hospital-level care at home.",
  keywords: "About Us, Aries PhysioCare, Home Healthcare, Company Vision, Leadership Team",
};


export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <MissionVision />
      <Team />
      <WhyChooseUs />
      <Roadmap />
      <Cta />
    </>
  );
}
