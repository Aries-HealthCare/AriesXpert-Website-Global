import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, TrendingUp, MonitorSmartphone, Activity } from "lucide-react";

export default function Roadmap() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">Global Presence & Future Roadmap</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our vision for a connected, accessible, and intelligent future of home healthcare.
          </p>
        </div>

        <Card className="glassmorphic overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Map className="h-12 w-12 text-primary mb-4" />
                <h3 className="font-headline text-2xl font-semibold">Expanding Our Reach</h3>
                <p className="mt-2 text-muted-foreground">
                  With a strong presence across major Indian cities, we are actively executing our expansion roadmap to bring quality home healthcare to more communities, both nationally and internationally.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <MonitorSmartphone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Digital Health Ecosystem</h4>
                    <p className="text-sm text-muted-foreground">
                      Developing mobile apps and patient portals for seamless communication and access to care.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">AI & Remote Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Integrating AI-assisted recovery tracking and wearable technology for real-time progress monitoring.
                    </p>
                  </div>
                </div>
                 <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Insurance & Partner Integrations</h4>
                    <p className="text-sm text-muted-foreground">
                      Building partnerships with insurance providers and other healthcare stakeholders to create a truly integrated care experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}