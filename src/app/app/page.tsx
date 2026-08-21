'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProviderAuth } from '@/services/provider-auth-context';
import { fetchIncomingLeads, LeadBroadcast, respondToLeadBroadcast } from '@/services/provider-api';
import {
  TrendingUp,
  CalendarCheck,
  Radio,
  Wallet,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Play,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bot,
  ChevronRight,
  Navigation,
  Phone,
  UserCheck,
  Stethoscope,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProviderDashboardPage() {
  const { user, dutyStatus, toggleDutyStatus } = useProviderAuth();
  const isDutyActive = dutyStatus;
  const [leads, setLeads] = useState<LeadBroadcast[]>([]);
  const [activeLeadIndex, setActiveLeadIndex] = useState(0);
  const [acceptedLeadMessage, setAcceptedLeadMessage] = useState('');

  const therapistName = user?.fullName || user?.name || (user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Dr. Rohan Sharma, BPT');
  const axId = user?.axId || 'AX-IND-4892';
  const rating = user?.rating || 4.95;
  const walletBalance = user?.walletBalance || 14850;

  useEffect(() => {
    const loadLeads = async () => {
      const data = await fetchIncomingLeads();
      setLeads(data);
    };
    loadLeads();
  }, []);

  const handleAcceptLead = async (leadId: string) => {
    await respondToLeadBroadcast(leadId, 'ACCEPT');
    setAcceptedLeadMessage('Lead accepted! Added to your Active Visits schedule.');
    setLeads(leads.filter((l) => l.id !== leadId));
  };

  const topLead = leads.length > 0 ? leads[0] : null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-card via-card to-primary/5 border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                {axId}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{rating} Clinical Rating</span>
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                ✓ Verified Physiotherapist
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {therapistName}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Clinical territory: <strong className="text-foreground">{user?.city || 'Mumbai (Borivali - Kandivali)'}</strong> • 4 scheduled visits today
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/app/visits" prefetch={false}>
              <Button className="h-11 px-5 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold shadow-lg shadow-primary/20 flex items-center gap-2">
                <Play className="w-4 h-4 fill-white" />
                <span>Active Visits (1 Pending)</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Today's Earnings */}
        <div className="bg-card border border-border/80 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">Today's Earnings</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-2 text-foreground">
            ₹2,400
          </div>
          <div className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
            <span className="text-emerald-500 font-bold">+₹720</span> from completed morning sessions
          </div>
        </div>

        {/* Card 2: Completed Sessions */}
        <div className="bg-card border border-border/80 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">Visits Completed</span>
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-2 text-foreground">
            3 <span className="text-base text-muted-foreground font-normal">/ 4</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            1 remaining home session today
          </div>
        </div>

        {/* Card 3: Live Broadcasts */}
        <div className="bg-card border border-border/80 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">Nearby Lead Matches</span>
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-2 text-foreground">
            {leads.length} <span className="text-xs font-bold text-accent">Active</span>
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            Within 5 km of your territory
          </div>
        </div>

        {/* Card 4: Wallet Balance */}
        <div className="bg-card border border-border/80 p-5 rounded-3xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground">Wallet Balance</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono mt-2 text-foreground">
            ₹{walletBalance.toLocaleString('en-IN')}
          </div>
          <Link
            href="/app/wallet"
            className="text-[11px] font-bold text-primary hover:underline mt-1 inline-block"
            prefetch={false}
          >
            Request Instant Payout →
          </Link>
        </div>
      </div>

      {/* Success notification banner when lead accepted */}
      {acceptedLeadMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{acceptedLeadMessage}</span>
          </div>
          <Link href="/app/visits" className="underline">
            View Schedule →
          </Link>
        </div>
      )}

      {/* Live Broadcast Urgent Lead Card */}
      {topLead && (
        <div className="bg-gradient-to-br from-primary/10 via-card to-card border-2 border-primary/40 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  Immediate Lead Broadcast Match
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  • Expires in 8 mins
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
                {topLead.condition}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <strong className="text-foreground">{topLead.locality}</strong> ({topLead.distanceKm} km away)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {topLead.scheduledDate}, {topLead.scheduledTime}
                </span>
                <span className="flex items-center gap-1 text-emerald-500 font-bold">
                  ₹{topLead.payoutAmount} Therapist Payout (60%)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                type="button"
                onClick={() => setLeads(leads.filter((l) => l.id !== topLead.id))}
                variant="outline"
                className="h-11 px-4 rounded-xl text-xs font-bold"
              >
                Pass
              </Button>
              <Button
                type="button"
                onClick={() => handleAcceptLead(topLead.id)}
                className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold shadow-lg shadow-primary/20"
              >
                Accept Lead Broadcast
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Today's Schedule + AI Buddy Quick Copilot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Today's Clinical Schedule Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold tracking-tight">Today's Treatment Itinerary</h3>
            <Link
              href="/app/appointments"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              prefetch={false}
            >
              <span>Full Schedule</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {/* Session 1: Completed */}
            <div className="p-4 rounded-2xl border border-border/80 bg-card/60 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">Mrs. Meenakshi Rao (68y)</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full">
                      Completed ✓
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Post-TKR Knee Joint Mobilization • IC Colony, Borivali West
                  </p>
                  <div className="text-[11px] font-mono text-muted-foreground mt-1">
                    09:30 AM - 10:20 AM • SOAP Note Submitted • ₹720 Credited
                  </div>
                </div>
              </div>
            </div>

            {/* Session 2: Completed */}
            <div className="p-4 rounded-2xl border border-border/80 bg-card/60 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">Mr. Anil Kapoor (54y)</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full">
                      Completed ✓
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Stroke Hemiplegia Gait Training • Thakur Village, Kandivali East
                  </p>
                  <div className="text-[11px] font-mono text-muted-foreground mt-1">
                    11:30 AM - 12:25 PM • SOAP Note Submitted • ₹900 Credited
                  </div>
                </div>
              </div>
            </div>

            {/* Session 3: UPCOMING / ACTION REQUIRED */}
            <div className="p-5 rounded-2xl border-2 border-primary/30 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-md">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-foreground">Dr. Arvind Kulkarni (71y)</span>
                    <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full">
                      Next Up (05:00 PM)
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Lumbar Canal Stenosis & Balance Therapy • Evershine Nagar, Malad West
                  </p>
                  <div className="text-xs font-semibold text-primary mt-1.5 flex items-center gap-3">
                    <span>Session 4 of 10</span>
                    <span>•</span>
                    <span>Patient Phone: +91 98204 11982</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Link href="/app/visits" prefetch={false}>
                  <Button className="h-10 px-5 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md">
                    Start Travel →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Clinical Copilot & Shortcuts */}
        <div className="space-y-4">
          <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">Aries AI Clinical Buddy</h4>
                  <p className="text-[10px] text-muted-foreground">Doorstep Physio Copilot</p>
                </div>
              </div>
              <span className="text-[10px] bg-accent/10 text-accent font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Ask about clinical differentials, exercise prescription progressions, or red flags before starting your next visit.
            </p>

            <div className="p-3 bg-muted/40 rounded-2xl border border-border/60 text-xs text-foreground italic">
              "Patient Dr. Arvind has history of osteoporosis. Avoid aggressive spinal flexion manipulations."
            </div>

            <Link href="/app/buddy" className="block" prefetch={false}>
              <Button variant="outline" className="w-full h-10 rounded-xl text-xs font-bold border-accent/40 text-accent hover:bg-accent/10">
                Open AI Case Copilot →
              </Button>
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-card border border-border/80 rounded-3xl p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
              Quick Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/app/wallet"
                className="p-3 rounded-2xl bg-muted/30 hover:bg-muted/60 border border-border/60 transition-all text-left"
                prefetch={false}
              >
                <Wallet className="w-4 h-4 text-sky-500 mb-1" />
                <div className="text-xs font-bold text-foreground">My Wallet</div>
                <div className="text-[10px] text-muted-foreground">₹14,850 balance</div>
              </Link>
              <Link
                href="/app/referrals"
                className="p-3 rounded-2xl bg-muted/30 hover:bg-muted/60 border border-border/60 transition-all text-left"
                prefetch={false}
              >
                <TrendingUp className="w-4 h-4 text-emerald-500 mb-1" />
                <div className="text-xs font-bold text-foreground">Refer & Earn</div>
                <div className="text-[10px] text-muted-foreground">₹1,000 / Colleague</div>
              </Link>
              <Link
                href="/app/availability"
                className="p-3 rounded-2xl bg-muted/30 hover:bg-muted/60 border border-border/60 transition-all text-left"
                prefetch={false}
              >
                <Clock className="w-4 h-4 text-amber-500 mb-1" />
                <div className="text-xs font-bold text-foreground">Time Slots</div>
                <div className="text-[10px] text-muted-foreground">5 active pincodes</div>
              </Link>
              <Link
                href="/app/training"
                className="p-3 rounded-2xl bg-muted/30 hover:bg-muted/60 border border-border/60 transition-all text-left"
                prefetch={false}
              >
                <Stethoscope className="w-4 h-4 text-primary mb-1" />
                <div className="text-xs font-bold text-foreground">SOP Library</div>
                <div className="text-[10px] text-muted-foreground">Clinical Protocols</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
