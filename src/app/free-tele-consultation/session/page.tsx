'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, Video, User, Clock, ShieldCheck, Maximize } from 'lucide-react';

function SessionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const meetLink = searchParams.get('meetLink') || 'https://meet.google.com';
  const therapistName = searchParams.get('therapist') || 'Clinical Specialist';
  
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col">
      {/* Session Header */}
      <header className="h-20 border-b glassmorphic flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">{therapistName}</h2>
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
              <Badge variant="outline" className="h-4 px-1.5 border-green-500/30 text-green-500 text-[8px]">Session Active</Badge>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Encrypted Connection</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full border">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono font-bold text-primary">{formatTime(seconds)}</span>
          </div>
          <Button variant="destructive" className="h-12 px-6 font-bold rounded-xl" onClick={() => router.push('/')}>
            <LogOut className="mr-2 w-4 h-4" /> End Session
          </Button>
        </div>
      </header>

      {/* Embed Area */}
      <main className="flex-1 relative bg-[#1a1a1a]">
        <iframe 
          src={meetLink}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          className="absolute inset-0 w-full h-full border-none"
          title="Tele-Health Consultation"
        />
        
        {/* Mobile Timer Overlay */}
        <div className="md:hidden absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-black/60 backdrop-blur-md border-white/10 text-white px-4 py-1.5 font-mono text-sm">
            {formatTime(seconds)}
          </Badge>
        </div>
      </main>

      {/* Control Bar Overlay (Visual only for UX) */}
      <footer className="h-16 bg-black/90 border-t border-white/5 flex items-center justify-center gap-8 shrink-0">
        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">
          Aries Clinical Network • Trusted Home Care
        </p>
      </footer>
    </div>
  );
}

export default function TeleHealthSessionPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center bg-background">Initializing secure session...</div>}>
      <SessionContent />
    </Suspense>
  );
}
