
import LocalizedFaqSection from "@/components/localized-faq-section";

export default function FaqSection() {
  // Uses default location (Mumbai) for the landing page FAQ
  return (
    <LocalizedFaqSection 
      geo={null} 
      className="bg-secondary/30" 
      title="Commonly Asked Questions"
      description="Learn more about how Aries PhysioCare brings clinical excellence to your doorstep."
    />
  );
}
