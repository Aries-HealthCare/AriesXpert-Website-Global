'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProviderAuth } from '@/services/provider-auth-context';
import {
  Navigation,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  KeyRound,
  FileSpreadsheet,
  DollarSign,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Activity,
  Timer,
  Check,
  Stethoscope,
  Send,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type VisitStage = 'IDLE' | 'TRAVELING' | 'ARRIVED' | 'IN_SESSION' | 'COMPLETED';

export default function ProviderVisitsPage() {
  const { user, updateUserData } = useProviderAuth();

  const [visitStage, setVisitStage] = useState<VisitStage>('IDLE');
  const [etaMinutes, setEtaMinutes] = useState(18);
  const [patientOtp, setPatientOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Digital SOAP Notes State
  const [painScale, setPainScale] = useState(6);
  const [subjectiveNote, setSubjectiveNote] = useState('Patient reports reduced morning stiffness in left lumbar region. Mild radiating pain down left thigh on prolonged standing.');
  const [objectiveNote, setObjectiveNote] = useState('Lumbar flexion 55 deg with end-range discomfort. Straight Leg Raise (SLR) Left: 60 deg, Right: 75 deg. Core endurance test: 30 secs.');
  const [assessmentNote, setAssessmentNote] = useState('L4-L5 discogenic radiculopathy improving. Muscle guarding in piriformis and erector spinae significantly reduced.');
  const [planNote, setPlanNote] = useState('1. Pelvic bridging (3x10), 2. Cat-Camel mobilizations, 3. Bird-dog core stability, 4. Ice pack for 15 mins post therapy.');

  const [paymentCollected, setPaymentCollected] = useState(true);
  const [sessionSuccess, setSessionSuccess] = useState(false);

  // Active visit patient details
  const patient = {
    name: 'Dr. Arvind Kulkarni',
    age: 71,
    gender: 'Male',
    phone: '+91 98204 11982',
    condition: 'Lumbar Canal Stenosis & Balance Rehabilitation',
    sessionNumber: 4,
    totalSessions: 10,
    address: 'Bungalow 7, Evershine Nagar, Malad West, Mumbai 400064',
    sessionFee: 1200,
    payoutAmount: 720,
    otpCode: '8492',
  };

  // Timer logic for in-session workflow
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStartTravel = () => {
    setVisitStage('TRAVELING');
  };

  const handleConfirmArrival = () => {
    setVisitStage('ARRIVED');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientOtp === patient.otpCode || patientOtp === '1234' || patientOtp.length === 4) {
      setVisitStage('IN_SESSION');
      setIsTimerRunning(true);
      setOtpError('');
    } else {
      setOtpError(`Invalid OTP. Ask patient for the 4-digit code (Demo: ${patient.otpCode}).`);
    }
  };

  const handleCompleteSession = () => {
    setIsTimerRunning(false);
    setVisitStage('COMPLETED');
    setSessionSuccess(true);
    // Credit wallet
    if (user?.walletBalance !== undefined) {
      updateUserData({
        walletBalance: user.walletBalance + patient.payoutAmount,
        completedVisitsCount: (user.completedVisitsCount || 0) + 1,
      });
    }
  };

  const handleResetForNext = () => {
    setVisitStage('IDLE');
    setSessionSuccess(false);
    setSessionSeconds(0);
    setPatientOtp('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Doorstep Clinical Visit Engine</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Complete doorstep clinical workflow with GPS tracking, patient OTP unlock, digital SOAP notes & payout.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-muted-foreground">Session Timer:</span>
          <span className="font-extrabold px-3 py-1 bg-card border rounded-xl shadow-sm text-foreground">
            {formatTimer(sessionSeconds)}
          </span>
        </div>
      </div>

      {/* Main Workflow Stage Card */}
      <div className="bg-card border-2 border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Step Indicator */}
        <div className="grid grid-cols-4 gap-2 border-b border-border/60 pb-6 mb-6 text-center">
          {[
            { stage: 'TRAVELING', label: '1. Start Travel' },
            { stage: 'ARRIVED', label: '2. Check-In OTP' },
            { stage: 'IN_SESSION', label: '3. Clinical SOAP' },
            { stage: 'COMPLETED', label: '4. Complete & Paid' },
          ].map((item, idx) => {
            const stages = ['TRAVELING', 'ARRIVED', 'IN_SESSION', 'COMPLETED'];
            const currentIdx = stages.indexOf(visitStage);
            const thisIdx = idx;
            const isDone = currentIdx > thisIdx || visitStage === 'COMPLETED';
            const isCurrent = visitStage === item.stage || (visitStage === 'IDLE' && idx === 0);

            return (
              <div key={item.stage} className="flex flex-col items-center">
                <div
                  className={`text-xs font-bold px-3 py-1 rounded-full mb-1 transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-primary text-white ring-2 ring-primary/20'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>
                <span className="text-[11px] font-bold text-foreground">{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Patient Summary Bar */}
        <div className="p-4 bg-muted/40 rounded-2xl border border-border/60 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-foreground">{patient.name}</span>
              <span className="text-xs text-muted-foreground font-mono">({patient.age}y, {patient.gender})</span>
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                Session {patient.sessionNumber} of {patient.totalSessions}
              </span>
            </div>
            <p className="text-xs font-bold text-primary mt-0.5">{patient.condition}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
              <span>{patient.address}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${patient.phone}`}
              className="px-3.5 py-2 rounded-xl bg-card border border-border hover:bg-muted text-xs font-bold flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>Call Patient</span>
            </a>
          </div>
        </div>

        {/* STAGE 1: IDLE / READY TO START TRAVEL */}
        {visitStage === 'IDLE' && (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-inner">
              <Navigation className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h2 className="text-xl font-extrabold text-foreground">Ready for Doorstep Home Visit</h2>
              <p className="text-xs text-muted-foreground">
                Clicking "Start Travel" will broadcast your live ETA ({etaMinutes} mins) to the patient via SMS/WhatsApp and initialize GPS route assistance.
              </p>
            </div>

            <Button
              type="button"
              onClick={handleStartTravel}
              className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-sm shadow-xl shadow-primary/25"
            >
              <Navigation className="w-4 h-4 mr-2" />
              <span>Start Travel to Patient Home</span>
            </Button>
          </div>
        )}

        {/* STAGE 2: TRAVELING */}
        {visitStage === 'TRAVELING' && (
          <div className="space-y-6 text-center py-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-bold text-xs animate-pulse">
              <Activity className="w-4 h-4" />
              <span>En Route — Patient Notified of ETA</span>
            </div>

            <div className="max-w-md mx-auto space-y-2">
              <h2 className="text-xl font-extrabold text-foreground">Traveling to {patient.name}'s Residence</h2>
              <p className="text-xs text-muted-foreground">
                Live navigation active. When you arrive at the doorstep, click "Confirm Doorstep Arrival".
              </p>
            </div>

            <div className="p-4 bg-muted/40 rounded-2xl border border-border/60 max-w-sm mx-auto text-xs text-left space-y-1">
              <div className="text-muted-foreground">Estimated Arrival Time: <strong className="text-foreground font-mono">18 minutes</strong></div>
              <div className="text-muted-foreground">Doorstep Location: <strong className="text-foreground">Malad West</strong></div>
            </div>

            <Button
              type="button"
              onClick={handleConfirmArrival}
              className="h-12 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              <span>I Have Arrived at Patient Doorstep</span>
            </Button>
          </div>
        )}

        {/* STAGE 3: ARRIVED / OTP VERIFICATION */}
        {visitStage === 'ARRIVED' && (
          <div className="max-w-md mx-auto space-y-5 py-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-foreground">Enter Patient Check-In OTP</h2>
              <p className="text-xs text-muted-foreground">
                Ask the patient or caregiver for the 4-digit session check-in OTP sent to their mobile.
              </p>
            </div>

            {otpError && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{otpError}</span>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <Label className="text-xs font-bold">4-Digit Security OTP</Label>
                <Input
                  type="text"
                  maxLength={4}
                  placeholder="8492"
                  value={patientOtp}
                  onChange={(e) => setPatientOtp(e.target.value.replace(/\D/g, ''))}
                  className="text-center text-2xl tracking-[0.4em] font-mono font-bold h-14 rounded-xl mt-1.5"
                  autoFocus
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-sm shadow-lg shadow-primary/20"
              >
                <span>Verify OTP & Unlock Clinical Session</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setPatientOtp(patient.otpCode)}
                className="text-xs text-muted-foreground hover:text-foreground underline font-medium"
              >
                Autofill Verified Demo OTP ({patient.otpCode})
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: IN_SESSION / DIGITAL SOAP NOTES */}
        {visitStage === 'IN_SESSION' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-500 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Session Live & Authenticated • Timer: {formatTimer(sessionSeconds)}</span>
              </div>
              <span className="font-mono text-muted-foreground font-bold">L4-L5 Lumbar Rehab</span>
            </div>

            <div className="border-t border-border/60 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-foreground flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-primary" />
                  <span>Digital SOAP Clinical Assessment Note</span>
                </h3>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Session 4 of 10</span>
              </div>

              {/* Pain Scale Slider */}
              <div className="p-4 bg-muted/30 rounded-2xl border border-border/60">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-xs font-bold">Patient Reported Pain Scale (VAS: 0 - 10)</Label>
                  <span className="text-sm font-mono font-extrabold text-primary bg-primary/10 px-3 py-0.5 rounded-full">
                    {painScale} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painScale}
                  onChange={(e) => setPainScale(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>0 - No Pain</span>
                  <span>5 - Moderate</span>
                  <span>10 - Severe Intolerable</span>
                </div>
              </div>

              {/* Subjective */}
              <div>
                <Label className="text-xs font-bold text-foreground">S - Subjective Symptoms</Label>
                <textarea
                  rows={2}
                  value={subjectiveNote}
                  onChange={(e) => setSubjectiveNote(e.target.value)}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Objective */}
              <div>
                <Label className="text-xs font-bold text-foreground">O - Objective Examination & Range of Motion</Label>
                <textarea
                  rows={2}
                  value={objectiveNote}
                  onChange={(e) => setObjectiveNote(e.target.value)}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Assessment */}
              <div>
                <Label className="text-xs font-bold text-foreground">A - Clinical Assessment & Progress</Label>
                <textarea
                  rows={2}
                  value={assessmentNote}
                  onChange={(e) => setAssessmentNote(e.target.value)}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Plan */}
              <div>
                <Label className="text-xs font-bold text-foreground">P - Plan & Prescribed Home Exercises</Label>
                <textarea
                  rows={2}
                  value={planNote}
                  onChange={(e) => setPlanNote(e.target.value)}
                  className="w-full p-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Complete Visit Button */}
            <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-muted-foreground">
                Total Session Fee: <strong>₹{patient.sessionFee}</strong> • Net Therapist Payout: <strong className="text-emerald-500 font-mono">₹{patient.payoutAmount}</strong>
              </div>

              <Button
                type="button"
                onClick={handleCompleteSession}
                className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-xl shadow-primary/25 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Submit SOAP & Complete Visit</span>
              </Button>
            </div>
          </div>
        )}

        {/* STAGE 5: COMPLETED */}
        {visitStage === 'COMPLETED' && (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-foreground">Visit Completed Successfully!</h2>
              <p className="text-xs text-muted-foreground">
                Digital tax invoice & exercises sent to {patient.name}. ₹{patient.payoutAmount} has been credited to your wallet.
              </p>
            </div>

            <div className="p-4 bg-muted/40 rounded-2xl border border-border/60 max-w-sm mx-auto text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session Payout:</span>
                <span className="font-bold text-emerald-500 font-mono">+₹{patient.payoutAmount} (60%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">SOAP Note ID:</span>
                <span className="font-mono font-bold">SOAP-2026-9812</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Updated Wallet Balance:</span>
                <span className="font-bold font-mono">₹{((user?.walletBalance || 14850) + patient.payoutAmount).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/app/wallet" prefetch={false}>
                <Button variant="outline" className="h-11 px-5 rounded-xl text-xs font-bold">
                  View in Wallet
                </Button>
              </Link>
              <Button
                type="button"
                onClick={handleResetForNext}
                className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md"
              >
                Back to Appointments
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
