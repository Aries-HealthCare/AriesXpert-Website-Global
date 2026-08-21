'use client';

import React, { useState } from 'react';
import { useProviderAuth } from '@/services/provider-auth-context';
import {
  Share2,
  Copy,
  Check,
  Gift,
  Users,
  TrendingUp,
  DollarSign,
  UserPlus,
  Stethoscope,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProviderReferralsPage() {
  const { user } = useProviderAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const referralCode = 'ROHANPT1000';
  const referralLink = `https://ariesphysiocare.com/register?ref=${referralCode}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Provider Referral Program</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Invite fellow physiotherapists and earn ₹1,000 when they complete their first doorstep session.
          </p>
        </div>
      </div>

      {/* Shareable Banner */}
      <div className="bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-foreground">Your Dedicated Referral Code</h2>
            <p className="text-xs text-muted-foreground">Share this with certified physical therapists in your network.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground">Referral Code</label>
            <div className="flex gap-2 mt-1">
              <Input
                readOnly
                value={referralCode}
                className="font-mono font-extrabold text-base bg-muted/40 h-11 rounded-xl uppercase"
              />
              <Button onClick={handleCopyCode} className="h-11 px-4 rounded-xl font-bold text-xs">
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-muted-foreground">Direct Invite Link</label>
            <div className="flex gap-2 mt-1">
              <Input
                readOnly
                value={referralLink}
                className="text-xs text-muted-foreground bg-muted/40 h-11 rounded-xl truncate"
              />
              <Button onClick={handleCopyLink} className="h-11 px-4 rounded-xl font-bold text-xs">
                {copiedLink ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Milestones & Pipeline */}
      <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-foreground">Invited Therapists Tracker</h3>

        <div className="space-y-3">
          {[
            {
              name: 'Dr. Pooja Nair, MPT',
              specialty: 'Pediatric Rehabilitation',
              date: 'Joined 18 Aug 2026',
              status: 'Completed 1st Visit ✓',
              bonus: '₹1,000 Credited',
            },
            {
              name: 'Dr. Sameer Joshi, BPT',
              specialty: 'Sports Physical Therapy',
              date: 'Joined 20 Aug 2026',
              status: 'Onboarding in Progress',
              bonus: 'Pending 1st Visit',
            },
            {
              name: 'Dr. Kavita Deshpande, BPT',
              specialty: 'Geriatric Care',
              date: 'Invited 21 Aug 2026',
              status: 'Link Clicked',
              bonus: 'Awaiting Signup',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {item.name.charAt(4)}
                </div>
                <div>
                  <div className="font-bold text-foreground">{item.name}</div>
                  <div className="text-muted-foreground">{item.specialty} • {item.date}</div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="font-bold text-foreground">{item.status}</div>
                <div className="text-emerald-500 font-mono font-bold">{item.bonus}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
