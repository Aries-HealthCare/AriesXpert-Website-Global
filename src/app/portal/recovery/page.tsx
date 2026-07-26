
'use client';

import AiPrecisionRecovery from "@/components/landing/ai-precision-recovery";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldCheck, Target, Zap } from "lucide-react";

export default function RecoveryPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold font-headline">Precision Recovery</h1>
        <p className="text-muted-foreground mt-1">AI-driven insights tailored to your specific condition and progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="glassmorphic border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-2xl flex items-center gap-2">
                  <Zap className="text-primary" /> Current Phase: Active Mobility
                </CardTitle>
                <span className="text-sm font-semibold text-primary">Stage 3 of 4</span>
              </div>
              <CardDescription>You are making excellent progress in restoring full range of motion.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Milestone Completion</span>
                  <span className="font-bold">75%</span>
                </div>
                <Progress value={75} className="h-3" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { label: "Pain Relief", value: 90, icon: ShieldCheck },
                  { label: "Flexibility", value: 65, icon: Activity },
                  { label: "Strength", value: 40, icon: Target },
                ].map((stat) => (
                  <div key={stat.label} className="text-center space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-background flex items-center justify-center border border-border/50">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-sm font-bold">{stat.value}%</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <section>
            <h2 className="text-xl font-bold font-headline mb-4">AI Insight Generator</h2>
            <AiPrecisionRecovery />
          </section>
        </div>

        <div className="space-y-6">
          <Card className="glassmorphic">
            <CardHeader>
              <CardTitle className="font-headline text-lg">Daily Recovery Plan</CardTitle>
              <CardDescription>Updated by your AI Care Assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Morning Stretch", duration: "10 mins", status: "Done" },
                { title: "Joint Mobilization", duration: "15 mins", status: "Done" },
                { title: "Resistance Band Set", duration: "20 mins", status: "Pending" },
                { title: "Evening Cooling", duration: "5 mins", status: "Pending" },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-md border border-border/10 hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="text-sm font-semibold">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.duration}</p>
                  </div>
                  <Badge variant={task.status === 'Done' ? 'default' : 'outline'}>
                    {task.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glassmorphic bg-accent/5 border-accent/20">
            <CardHeader>
              <CardTitle className="font-headline text-lg text-accent-foreground">Clinical Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "Consistency is the key to cellular repair. Even on days when you feel 100%, completing your basic mobilization prevents future micro-trauma."
              </p>
              <p className="text-xs font-bold text-accent-foreground mt-4">— Aries Clinical Team</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
