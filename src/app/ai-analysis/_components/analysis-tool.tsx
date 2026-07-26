'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Sparkles,
  CheckCircle,
  Activity,
  ShieldCheck,
  Target,
  User,
  Phone,
  Calendar,
  MapPin,
  Send,
  FileText,
  UploadCloud,
  Microscope,
  BrainCircuit,
  LocateFixed,
  ChevronRight,
  Award
} from "lucide-react";
import AnatomyViewer from "./anatomy-viewer";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getNextQuestionAction, getFinalAssessmentAction } from "@/app/actions/ai-analysis-actions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Step = 'setup' | 'conversation' | 'result';
type Message = { role: 'ai' | 'user'; content: string };

type AiResult = {
  conditionName: string;
  region: string;
  structure: string;
  layer: string;
  focusPosition: { x: number; y: number; z: number };
  explanation: { what: string; why: string; how: string; };
  ariesExpertise: string;
  estimatedDays: number;
};

export default function AnalysisTool() {
  const [step, setStep] = useState<Step>('setup');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { toast } = useToast();

  // Onboarding
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [reportFileName, setReportFile] = useState<string | null>(null);

  // Conversation
  const [symptom, setSymptom] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  const handleSendOtp = () => {
    if (!mobile) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpSent(true);
      toast({ title: "Verification Initiated", description: "Security code dispatched to your terminal." });
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      toast({ title: "Identity Confirmed", description: "Clinical access granted." });
    }, 800);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({ variant: "destructive", title: "Geolocation error" });
      return;
    }
    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCity("Mumbai Region (Aries Central)");
        setIsDetectingLocation(false);
      },
      () => {
        setIsDetectingLocation(false);
        toast({ variant: "destructive", title: "Local Registry Access Denied" });
      }
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportFile(file.name);
      toast({ title: "Diagnostic Intel Registered", description: `Source: ${file.name}` });
    }
  };

  const handleStartConversation = async () => {
    if (!symptom) return;
    setStep('conversation');
    setIsLoading(true);
    setMessages([{ role: 'ai', content: `Hello ${name.split(' ')[0]}. Protocol initialized. I am analyzing your primary clinical objective: "${symptom}"${reportFileName ? ' with integrated diagnostic reports' : ''}. To construct a high-fidelity 3D anatomical projection, I require targeted clinical data. Processing initiated.` }]);
    const response = await getNextQuestionAction(symptom, []);
    if (response) {
      setMessages(prev => [...prev, { role: 'ai', content: response.question }]);
    }
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!currentInput || isLoading) return;
    const newMessages = [...messages, { role: 'user', content: currentInput } as Message];
    setMessages(newMessages);
    setCurrentInput("");
    setIsLoading(true);

    const userAnswersCount = newMessages.filter(m => m.role === 'user').length;

    if (userAnswersCount >= 5) {
      const result = await getFinalAssessmentAction(symptom, newMessages, !!reportFileName);
      if (result) {
        setAiResult(result as AiResult);
        setStep('result');
      } else {
        toast({ variant: "destructive", title: "Assessment Failure", description: "Neural synthesis interrupted. Re-attempting sync." });
      }
    } else {
      const response = await getNextQuestionAction(symptom, newMessages);
      if (response) {
        setMessages(prev => [...prev, { role: 'ai', content: response.question }]);
      }
    }
    setIsLoading(false);
  };

  const userMsgCount = messages.filter(m => m.role === 'user').length;
  const conversationProgress = Math.min((userMsgCount / 5) * 100, 100);

  return (
    <div className="grid xl:grid-cols-12 gap-8 lg:gap-12 items-start max-w-[1600px] mx-auto animate-reveal-up w-full">
      {/* ── ANATOMICAL PROJECTION (ALWAYS VISIBLE) ───────────────────────── */}
      <div className="xl:col-span-7 h-[650px] md:h-[800px] xl:h-[900px] sticky top-24 order-2 xl:order-1">
        <Card className="glassmorphic h-full p-2 relative overflow-hidden group shadow-[0_48px_128px_-12px_rgba(0,0,0,0.5)] rounded-[3rem] lg:rounded-[4rem] border-primary/20 bg-black/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_80%)] pointer-events-none" />
          <AnatomyViewer gender={gender} aiResult={aiResult} />

          {/* Clinical HUD Overlays */}
          <div className="absolute top-6 left-6 right-6 md:top-10 md:left-10 md:right-10 flex justify-between items-start z-10 pointer-events-none">
            <div className="space-y-4">
              {aiResult && (
                <div className="bg-primary/90 backdrop-blur-2xl text-white px-6 py-4 md:px-8 md:py-5 rounded-3xl font-headline text-2xl md:text-3xl shadow-[0_24px_64px_-12px_rgba(var(--primary),0.6)] border border-white/20 flex items-center gap-4 animate-reveal-up group">
                  <Activity className="w-8 h-8 md:w-10 md:h-10 text-accent group-hover:scale-125 transition-transform" />
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-accent/80">Diagnostic Match Locked</div>
                    <span className="font-black uppercase tracking-tighter block max-w-[200px] truncate md:max-w-full">{aiResult.conditionName}</span>
                  </div>
                </div>
              )}
              <div className="bg-black/60 backdrop-blur-xl border border-white/5 p-3 md:p-4 rounded-2xl w-fit flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Telemetry Streaming Verified</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 translate-y-2">
              {name && (
                <div className="bg-black/60 backdrop-blur-xl border border-white/5 p-3 md:p-4 rounded-2xl flex items-center gap-3 md:gap-4">
                  <div className="text-right">
                    <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Subject ID</div>
                    <div className="text-sm font-black text-white uppercase tracking-tighter truncate max-w-[80px] md:max-w-[120px]">{name.split(' ')[0]}</div>
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-white/10 hidden sm:flex">
                    <User className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 pointer-events-none hidden sm:block">
            <div className="space-y-2">
              <div className="text-2xl md:text-3xl font-black text-white/10 italic leading-none">CLINICAL_MAP_v2.6</div>
              <div className="flex gap-4 opacity-20">
                <div className="h-1 w-20 bg-white" />
                <div className="h-1 w-10 bg-white" />
                <div className="h-1 w-20 md:w-40 bg-white" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
            <div className="bg-black/80 backdrop-blur-2xl text-xs font-bold text-white/90 uppercase tracking-widest px-6 py-3 md:px-8 md:py-4 rounded-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent animate-pulse" /> Live Neural Projection
            </div>
          </div>
        </Card>
      </div>

      {/* ── INTERACTIVE CORE (DYNAMIC STEPS) ──────────────────────────── */}
      <div className="xl:col-span-5 h-auto xl:h-[900px] flex flex-col order-1 xl:order-2">
        {step === 'setup' && (
          <Card className="glassmorphic flex-1 flex flex-col overflow-hidden shadow-[0_32px_128px_-12px_rgba(0,0,0,0.4)] rounded-[3rem] lg:rounded-[4rem] border-primary/20 bg-secondary/10 backdrop-blur-3xl">
            <CardHeader className="p-8 md:p-10 border-b border-primary/5 bg-primary/[0.01]">
              <CardTitle className="font-headline text-2xl md:text-3xl font-black tracking-tight leading-none uppercase">Clinical Intake</CardTitle>
              <CardDescription className="text-sm font-bold text-primary/60 mt-2 tracking-widest uppercase">Initialize Diagnostic Node</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 overflow-auto p-0">
              <ScrollArea className="h-full p-8 md:p-10">
                <div className="space-y-12 pb-10">
                  <div className="space-y-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary/80 flex items-center gap-3">
                      <div className="w-4 h-px bg-primary/30" /> Biographic Profile
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-foreground/60 pl-1">Legal Identity</Label>
                        <Input placeholder="Full Name" className="h-14 bg-background/20 border-primary/10 transition-all rounded-xl shadow-inner font-medium text-base" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-wider text-foreground/60 pl-1">Age</Label>
                          <Input type="number" placeholder="25" className="h-14 bg-background/20 border-primary/10 rounded-xl shadow-inner text-center font-medium text-base" value={age} onChange={(e) => setAge(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-wider text-foreground/60 pl-1">Gender</Label>
                          <Select value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')}>
                            <SelectTrigger className="h-14 bg-background/20 border-primary/10 rounded-xl shadow-inner font-medium text-base"><SelectValue /></SelectTrigger>
                            <SelectContent className="glassmorphic"><SelectItem value="male" className="font-bold">Male</SelectItem><SelectItem value="female" className="font-bold">Female</SelectItem></SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary/80 flex items-center gap-3">
                      <div className="w-4 h-px bg-primary/30" /> Network & Locale
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-foreground/60 pl-1">Operational City</Label>
                        <div className="flex gap-2">
                          <Input placeholder="e.g. Mumbai" className="flex-1 h-14 bg-background/20 border-primary/10 rounded-xl shadow-inner font-medium text-base" value={city} onChange={(e) => setCity(e.target.value)} />
                          <Button variant="outline" size="icon" className="h-14 w-14 rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white" onClick={handleDetectLocation} disabled={isDetectingLocation}>
                            {isDetectingLocation ? <Loader2 className="animate-spin h-5 w-5" /> : <LocateFixed className="h-5 w-5" />}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-wider text-foreground/60 pl-1">Mobile Access</Label>
                        <div className="flex gap-2">
                          <Input type="tel" placeholder="+91" className="flex-1 h-14 bg-background/20 border-primary/10 rounded-xl shadow-inner font-medium text-base" value={mobile} onChange={(e) => setMobile(e.target.value)} disabled={isVerified} />
                          {!isVerified && (
                            <Button variant="outline" className="h-14 px-5 rounded-xl font-bold text-xs uppercase tracking-wider border-primary/20 text-primary hover:bg-primary hover:text-white" onClick={handleSendOtp} disabled={isVerifying || !mobile}>
                              {otpSent ? 'Resend' : 'Send'}
                            </Button>
                          )}
                          {isVerified && <div className="flex items-center text-green-500 gap-2 font-bold text-xs uppercase tracking-wider px-4 bg-green-500/5 rounded-xl border border-green-500/10"><CheckCircle className="w-4 h-4" /> Verified</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {otpSent && !isVerified && (
                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 animate-in slide-in-from-top-4 shadow-xl">
                      <div className="flex flex-col gap-4">
                        <Label className="text-xs font-bold uppercase tracking-wider text-primary">Verification Code</Label>
                        <div className="flex gap-2">
                          <Input placeholder="0000" className="h-14 flex-1 tracking-[0.5em] text-center text-xl font-black bg-background/40 border-primary/30 rounded-xl" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value)} />
                          <Button onClick={handleVerifyOtp} className="h-14 px-6 rounded-xl font-bold text-sm uppercase tracking-wider neon-accent-border" disabled={isVerifying || otp.length < 4}>
                            {isVerifying ? <Loader2 className="animate-spin" /> : "Verify"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-8 pt-6 border-t border-primary/10">
                    <div className="space-y-4">
                      <Label className="text-xs font-bold uppercase tracking-wider text-foreground/60 pl-1">Primary Clinical Complaint</Label>
                      <Input
                        placeholder="e.g. Acute neuropathic pain in back"
                        className="h-16 bg-background/20 border-primary/10 focus:border-primary/40 text-base font-medium italic placeholder:text-muted-foreground/50 rounded-xl shadow-inner px-4"
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label className="text-xs font-bold uppercase tracking-wider text-foreground/60 pl-1">Investigation Intelligence <span className="font-normal opacity-50">(OPTIONAL)</span></Label>
                      <div className="relative group">
                        <input type="file" id="report-upload" className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                        <Label htmlFor="report-upload" className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-primary/10 rounded-xl cursor-pointer hover:border-primary/40 bg-background/20 group-hover:bg-primary/[0.02] transition-all">
                          {reportFileName ? <><FileText className="w-6 h-6 text-primary mb-2 animate-pulse" /> <span className="font-bold text-sm truncate max-w-[200px] uppercase">{reportFileName}</span></> : <><UploadCloud className="w-6 h-6 text-muted-foreground/40 mb-2" /> <span className="font-bold text-xs text-muted-foreground/60 uppercase tracking-wider">Upload Reports</span></>}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              <div className="p-6 md:p-8 border-t border-primary/5 bg-background/40 backdrop-blur-3xl">
                <Button
                  className="w-full h-16 md:h-20 text-lg font-black rounded-2xl neon-accent-border shadow-[0_16px_48px_-12px_rgba(var(--accent),0.4)] transition-all transform hover:-translate-y-1 group bg-primary hover:bg-primary/90 tracking-wide uppercase"
                  onClick={handleStartConversation}
                  disabled={!isVerified || !name || !age || !city || !symptom}
                >
                  <Sparkles className="mr-3 w-5 h-5 transition-transform group-hover:rotate-12 text-accent" /> INITIALIZE ANALYSIS
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'conversation' && (
          <Card className="glassmorphic flex-1 flex flex-col overflow-hidden shadow-[0_48px_128px_-12px_rgba(0,0,0,0.4)] rounded-[4rem] border-primary/20 bg-secondary/5 backdrop-blur-3xl">
            <CardHeader className="p-10 border-b border-primary/5 bg-primary/[0.02]">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-black flex items-center gap-4 tracking-tight uppercase">
                    <div className="w-4 h-4 rounded-full bg-primary animate-pulse shadow-[0_0_20px_rgba(var(--primary),0.8)]" />
                    Neural Sync
                  </CardTitle>
                  <CardDescription className="text-xs font-bold text-primary/60 uppercase tracking-widest">Processing Case Data...</CardDescription>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">{userMsgCount} / 5 SYNTHESIS NODES</div>
                  <Progress value={conversationProgress} className="h-2 w-24 md:w-32 bg-primary/10 shadow-inner" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 overflow-hidden relative">
              <ScrollArea className="flex-1 p-6 md:p-10" ref={scrollRef}>
                <div className="space-y-8 pb-8">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'} animate-reveal-up`}>
                      <div className={cn(
                        "max-w-[90%] p-6 md:p-8 rounded-[2rem] shadow-2xl font-bold leading-relaxed text-sm tracking-tight",
                        m.role === 'ai'
                          ? 'bg-white/60 backdrop-blur-md text-foreground border border-white/20 rounded-bl-none'
                          : 'bg-primary text-primary-foreground shadow-[0_20px_48px_-12px_rgba(var(--primary),0.4)] rounded-br-none border border-primary/20 italic'
                      )}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start items-center gap-4 text-primary/60 animate-pulse pl-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-150" />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-300" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary/80">Synthesis Active...</span>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-6 md:p-8 border-t border-primary/5 bg-white/5 backdrop-blur-2xl">
                <div className="flex gap-3">
                  <Input
                    placeholder="Provide targeted details..."
                    className="h-16 bg-background/40 border-primary/10 focus:border-primary/40 rounded-2xl px-6 font-bold shadow-inner placeholder:italic placeholder:text-muted-foreground/30"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isLoading}
                  />
                  <Button size="icon" className="h-16 w-16 rounded-2xl neon-accent-border shadow-xl transform active:scale-90 transition-all bg-primary flex-shrink-0" onClick={handleSendMessage} disabled={isLoading || !currentInput}>
                    <Send className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 'result' && aiResult && (
          <Card className="glassmorphic border-primary/30 animate-reveal-up flex-1 overflow-auto shadow-[0_64px_128px_-12px_rgba(0,0,0,0.6)] rounded-[3rem] lg:rounded-[4rem] bg-secondary/10 backdrop-blur-3xl">
            <CardHeader className="p-8 md:p-12 border-b border-primary/5 bg-primary/[0.02]">
              <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-wider mb-6 border border-green-500/20 shadow-xl">
                <CheckCircle className="w-4 h-4" /> Neural Synthesis Verified
              </div>
              <CardTitle className="font-headline text-3xl md:text-4xl font-black leading-none uppercase tracking-tighter">Diagnostic Summary</CardTitle>
              <CardDescription className="text-sm md:text-base font-bold text-foreground/60 mt-4 flex items-center gap-3">
                <div className="w-8 h-px bg-primary/40 hidden sm:block" />
                <span className="text-primary font-black uppercase tracking-tight italic">{aiResult.conditionName}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="p-8 md:p-12 space-y-10">
              {[
                { title: "High-Fidelity Insight", key: "what", icon: Microscope, isExplanation: true },
                { title: "Neuro-Anatomical Origin", key: "why", icon: BrainCircuit, isExplanation: true },
                { title: "Strategic Intervention", key: "how", icon: Target, isExplanation: true },
                { title: "The Aries Differential", key: "ariesExpertise", icon: Sparkles, isExplanation: false },
                { title: "Recovery Trajectory", key: "estimatedDays", icon: Calendar, isExplanation: false },
              ].map((s, idx) => (
                <div key={s.key} className={cn("relative pl-14 md:pl-16 animate-reveal-up", idx === 0 && "stagger-1", idx === 1 && "stagger-2", idx === 2 && "stagger-3", idx === 3 && "stagger-4", idx === 4 && "stagger-5")}>
                  <div className="absolute left-0 top-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(var(--primary),0.4)]">
                    <s.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-2 md:mb-3">{s.title}</h4>
                  <p className="text-sm font-medium text-foreground/80 leading-relaxed tracking-tight italic">
                    {s.isExplanation
                      ? (aiResult.explanation as any)[s.key]
                      : s.key === 'estimatedDays'
                        ? `Predictive Recovery Window: ~${aiResult.estimatedDays} Days. Clinical confirmation required.`
                        : (aiResult as any)[s.key]}
                  </p>
                </div>
              ))}

              <div className="pt-8 space-y-4">
                <Button className="w-full h-16 md:h-20 text-lg md:text-xl font-black rounded-2xl md:rounded-3xl neon-accent-border shadow-[0_24px_64px_-12px_rgba(var(--accent),0.5)] transition-all transform hover:-translate-y-1 group bg-primary hover:bg-primary/90">
                  SECURE CLINICAL VISIT <ChevronRight className="ml-3 w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:translate-x-2 text-accent" />
                </Button>
                <Button variant="ghost" className="w-full h-12 md:h-14 font-bold text-xs uppercase tracking-widest text-muted-foreground/50 hover:text-primary transition-all rounded-xl" onClick={() => { setStep('setup'); setAiResult(null); setMessages([]); setReportFile(null); }}>
                  RESET TERMINAL
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}