import { Card, CardContent } from "@/components/ui/card";

export default function Story() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="glassmorphic">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">
                  Our Story
                </h2>
                <p className="mt-2 text-primary font-medium">Bridging the Gap Between Hospital and Home</p>
              </div>
              <div className="md:col-span-2 space-y-4 text-muted-foreground">
                <p>
                  Aries PhysioCare was founded with a clear and powerful mission: to close the critical gap between hospital-level medical treatment and the care patients receive at home. We recognized that the journey to recovery doesn’t end at the hospital exit; it continues in the familiar, comforting environment of one's home. Our goal is to deliver clinical-grade physiotherapy and comprehensive healthcare services directly to your doorstep.
                </p>
                <p>
                  Our approach is built on a robust framework that combines deep medical expertise, cutting-edge technology, and structured, evidence-based care protocols. This synergy ensures that every patient receives a level of care that is not only effective but also consistent and reliable.
                </p>
                <p>
                  We have meticulously designed our services for a diverse range of needs, catering to patients requiring post-surgery rehabilitation, elderly individuals needing geriatric care, families seeking support for chronic pain and lifestyle conditions, and anyone who believes in a proactive approach to health.
                </p>
                <p>
                  Our vision extends beyond individual homes. We are building a multi-city, multi-country, integrated digital health ecosystem. This global network will empower us to deliver standardized, high-quality care, making world-class home healthcare accessible to all.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}