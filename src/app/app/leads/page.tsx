'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchIncomingLeads, LeadBroadcast, respondToLeadBroadcast } from '@/services/provider-api';
import {
  Radio,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  User,
  Phone,
  Calendar,
  Filter,
  RefreshCw,
  Zap,
  Info,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProviderLeadsPage() {
  const [leads, setLeads] = useState<LeadBroadcast[]>([]);
  const [acceptedLeads, setAcceptedLeads] = useState<LeadBroadcast[]>([]);
  const [filterType, setFilterType] = useState<'ALL' | 'HOME' | 'CLINIC'>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedback, setFeedback] = useState<{ id: string; type: 'success' | 'info'; text: string } | null>(null);

  const loadLeads = async () => {
    setIsRefreshing(true);
    const data = await fetchIncomingLeads();
    setLeads(data);
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleAction = async (lead: LeadBroadcast, action: 'ACCEPT' | 'DECLINE') => {
    await respondToLeadBroadcast(lead.id, action);
    if (action === 'ACCEPT') {
      setAcceptedLeads([lead, ...acceptedLeads]);
      setFeedback({
        id: lead.id,
        type: 'success',
        text: `Lead for ${lead.patientName} successfully accepted! Added to Active Visits.`,
      });
    } else {
      setFeedback({
        id: lead.id,
        type: 'info',
        text: `Lead declined. It has been recirculated to nearby therapists.`,
      });
    }
    setLeads(leads.filter((l) => l.id !== lead.id));
  };

  const filteredLeads = leads.filter((l) => {
    if (filterType === 'HOME') return l.serviceType === 'Home Visit';
    if (filterType === 'CLINIC') return l.serviceType === 'Clinic Visit';
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Live Lead Broadcast Stream</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time patient match alerts within your registered service pincodes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadLeads}
            disabled={isRefreshing}
            className="rounded-xl text-xs font-bold"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Stream</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-3">
        <button
          type="button"
          onClick={() => setFilterType('ALL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'ALL'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          All Matches ({leads.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('HOME')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'HOME'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          Home Visits
        </button>
        <button
          type="button"
          onClick={() => setFilterType('CLINIC')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'CLINIC'
              ? 'bg-primary text-white shadow-sm'
              : 'bg-muted/50 text-muted-foreground hover:text-foreground'
          }`}
        >
          Clinic Consults
        </button>
      </div>

      {/* Feedback message */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500'
              : 'bg-muted border border-border text-muted-foreground'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
            <span>{feedback.text}</span>
          </div>
          {feedback.type === 'success' && (
            <Link href="/app/visits" className="underline font-bold">
              Go to Visits →
            </Link>
          )}
        </div>
      )}

      {/* Active Broadcasts Stream */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border/80 rounded-3xl p-8">
            <Radio className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-foreground">No Pending Broadcasts</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              You are on duty! New patient matching broadcasts in your pincodes will ring here automatically.
            </p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-card border-2 border-border/80 hover:border-primary/40 rounded-3xl p-5 sm:p-6 shadow-sm transition-all relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {lead.leadId}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                      {lead.serviceType}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      Broadcast Active
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-foreground">
                    {lead.condition}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-foreground" />
                      <span>
                        <strong className="text-foreground">{lead.patientName}</strong> ({lead.patientAge}y, {lead.patientGender})
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>{lead.locality} ({lead.distanceKm} km)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{lead.scheduledDate} @ {lead.scheduledTime}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/40 rounded-xl border border-border/60 text-xs text-muted-foreground flex items-center justify-between">
                    <div>
                      Patient Address: <strong className="text-foreground">{lead.address}</strong>
                    </div>
                    <div className="text-right font-mono">
                      Session Fee: ₹{lead.sessionFee}
                    </div>
                  </div>
                </div>

                {/* Pricing & CTA Controls */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-border/60">
                  <div className="text-left lg:text-right">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Therapist Net Payout</div>
                    <div className="text-2xl font-extrabold font-mono text-emerald-500">
                      ₹{lead.payoutAmount} <span className="text-xs text-muted-foreground font-normal">(60%)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleAction(lead, 'DECLINE')}
                      className="flex-1 sm:flex-none h-11 px-4 rounded-xl text-xs font-bold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                    >
                      Decline
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleAction(lead, 'ACCEPT')}
                      className="flex-1 sm:flex-none h-11 px-6 rounded-xl text-xs font-extrabold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20"
                    >
                      Accept & Book Slot
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Accepted Leads History */}
      {acceptedLeads.length > 0 && (
        <div className="pt-6 border-t border-border space-y-3">
          <h3 className="text-sm font-extrabold text-foreground">Recently Accepted Leads (Ready for Travel)</h3>
          <div className="space-y-2">
            {acceptedLeads.map((item) => (
              <div key={item.id} className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-bold text-foreground">{item.patientName}</span>
                  <span className="text-muted-foreground">• {item.condition}</span>
                </div>
                <Link href="/app/visits" className="font-bold text-primary hover:underline">
                  Execute Visit →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
