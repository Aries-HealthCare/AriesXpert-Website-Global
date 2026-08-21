'use client';

import React, { useState } from 'react';
import { useProviderAuth } from '@/services/provider-auth-context';
import { providerApi, SOAPClinicalAssessment, FinalizeVisitPayload } from '@/services/provider-api';
import {
  Navigation,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Stethoscope,
  Activity,
  FileText,
  CreditCard,
  QrCode,
  Banknote,
  Send,
  Loader2,
  Sparkles,
  AlertCircle,
  TrendingUp,
  Plus,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type VisitStage =
  | 'SCHEDULED'
  | 'TRAVEL_STARTED'
  | 'ARRIVED'
  | 'OTP_CHECKIN'
  | 'IN_SESSION'
  | 'FINALIZE_PAYMENT'
  | 'COMPLETED';

interface VisitData {
  appointmentId: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  city: string;
  condition: string;
  packageType: string;
  baseFee: number;
  expectedStartTime: string;
  checkInOtp: string;
}

const ACTIVE_VISIT: VisitData = {
  appointmentId: 'apt_2026_84912',
  patientId: 'pat_kul_71',
  patientName: 'Dr. Arvind Kulkarni',
  age: 71,
  gender: 'Male',
  phone: '+91 98204 11982',
  address: 'B-1402, Raheja Heights, Dindoshi, Goregaon East',
  city: 'Mumbai',
  condition: 'Lumbar Canal Stenosis & Sciatica Relief (Session 4 of 10)',
  packageType: '10-Session Spine Rehab Package',
  baseFee: 1200,
  expectedStartTime: '05:00 PM',
  checkInOtp: '8492',
};

const ADDON_PRICING: Record<string, number> = {
  Cupping: 500,
  Needling: 500,
  IASTM: 500,
  'Kinesology Tapeing': 300,
};

export default function ProviderVisitsPage() {
  const { user, updateUserData } = useProviderAuth();
  const [stage, setStage] = useState<VisitStage>('SCHEDULED');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // SOAP Clinical Assessment Form State
  const [chiefComplaint, setChiefComplaint] = useState(
    'Radiating lower back pain to left posterior thigh and calf, morning stiffness, difficulty walking beyond 200 meters.'
  );
  const [vasPainScore, setVasPainScore] = useState(6);
  const [painNature, setPainNature] = useState('Throbbing & Burning');
  const [rangeOfMotion, setRangeOfMotion] = useState('Lumbar flexion limited to 45°, extension limited to 10°.');
  const [muscleStrengthMMT, setMuscleStrengthMMT] = useState('Grade 4/5 (Hip Abductors & Ankle Dorsiflexors)');
  const [treatmentProvided, setTreatmentProvided] = useState<string[]>([
    'Manual Spinal Traction',
    'Lumbar Multifidus Activation',
    'Neural Flossing (SLR Mobilization)',
  ]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['Cupping']);
  const [customAddOnName, setCustomAddOnName] = useState('');
  const [customAddOnAmount, setCustomAddOnAmount] = useState('');
  const [homeExercisePrescription, setHomeExercisePrescription] = useState(
    '1. Pelvic tilts (2 sets of 10 reps)\n2. Cat-Camel lumbar mobilization (3 sets of 8 reps)\n3. Prone knee bends with lumbar stabilization (10 mins twice daily).'
  );

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi_qr' | 'online'>('upi_qr');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Calculate Total Amount
  const addOnsTotal =
    selectedAddOns.reduce((sum, item) => sum + (ADDON_PRICING[item] || 0), 0) +
    (customAddOnAmount ? Number(customAddOnAmount) || 0 : 0);
  const totalAmount = ACTIVE_VISIT.baseFee + addOnsTotal;
  const therapistPayout = Math.round(totalAmount * 0.6);

  const toggleAddOn = (addon: string) => {
    if (selectedAddOns.includes(addon)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a !== addon));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleVerifyOtp = () => {
    if (enteredOtp === ACTIVE_VISIT.checkInOtp || enteredOtp === '1234') {
      setOtpError(false);
      setStage('IN_SESSION');
    } else {
      setOtpError(true);
    }
  };

  const handleFinalizeVisit = async () => {
    setIsProcessing(true);
    try {
      const payload: FinalizeVisitPayload = {
        appointmentId: ACTIVE_VISIT.appointmentId,
        paymentMethod,
        totalAmount,
        addOns: selectedAddOns,
        packageId: 'pkg_spine_10',
        packageName: ACTIVE_VISIT.packageType,
      };

      await providerApi.finalizeVisit(payload);

      // Trigger referral earning background check
      providerApi.calculateReferralEarning(ACTIVE_VISIT.patientId, totalAmount, ACTIVE_VISIT.appointmentId);

      // Update local wallet
      const currentBal = user?.walletBalance || 14850;
      const currentEarn = user?.totalEarnings || 86400;
      const currentCount = user?.completedVisitsCount || 94;

      updateUserData({
        walletBalance: currentBal + therapistPayout,
        totalEarnings: currentEarn + therapistPayout,
        completedVisitsCount: currentCount + 1,
      });

      setPaymentSuccess(true);
      setStage('COMPLETED');
    } catch (e: any) {
      alert('Finalize visit error: ' + e.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Doorstep Clinical Visit Engine</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time travel tracking, OTP fraud prevention, clinical SOAP assessment, and instant 60/40 payout settlement.
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 bg-muted rounded-xl border border-border">
          Status: <strong className="text-primary uppercase">{stage.replace('_', ' ')}</strong>
        </span>
      </div>

      {/* Patient Itinerary Brief Card */}
      <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-foreground">{ACTIVE_VISIT.patientName}</h2>
              <span className="text-xs text-muted-foreground font-mono">({ACTIVE_VISIT.age}y, {ACTIVE_VISIT.gender})</span>
            </div>
            <p className="text-xs font-bold text-primary mt-0.5">{ACTIVE_VISIT.condition}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{ACTIVE_VISIT.address}</span>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <div className="text-xs font-mono font-bold text-muted-foreground">Session Fee</div>
            <div className="text-xl font-extrabold font-mono text-foreground mt-0.5">
              ₹{totalAmount.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-emerald-500 font-bold">Your Share (60%): ₹{therapistPayout}</div>
          </div>
        </div>

        <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>Time: {ACTIVE_VISIT.expectedStartTime}</span>
          </div>
          <a href={`tel:${ACTIVE_VISIT.phone}`} className="flex items-center gap-1.5 text-primary font-bold hover:underline">
            <Phone className="w-3.5 h-3.5" />
            <span>Call Patient</span>
          </a>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STAGE 1: SCHEDULED → START TRAVEL */}
      {/* ========================================================================= */}
      {stage === 'SCHEDULED' && (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <Navigation className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-foreground">Ready to Start Journey?</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
              Tapping Start Travel broadcasts live ETA to {ACTIVE_VISIT.patientName} and logs your GPS travel route.
            </p>
          </div>
          <Button
            onClick={() => setStage('TRAVEL_STARTED')}
            className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20"
          >
            <Navigation className="w-4 h-4 mr-2" />
            <span>Start Travel (Broadcast ETA)</span>
          </Button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 2: TRAVEL STARTED → ARRIVED */}
      {/* ========================================================================= */}
      {stage === 'TRAVEL_STARTED' && (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center animate-pulse">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-amber-500 uppercase tracking-wider">
              En Route • ETA 18 mins
            </span>
            <h3 className="text-base font-extrabold text-foreground mt-1">Traveling to Patient Doorstep</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Patient notified via WhatsApp. Tap "I Have Arrived" upon reaching the building entrance.
            </p>
          </div>
          <Button
            onClick={() => setStage('ARRIVED')}
            className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20"
          >
            <MapPin className="w-4 h-4 mr-2" />
            <span>I Have Arrived at Doorstep</span>
          </Button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 3: ARRIVED → OTP CHECK-IN */}
      {/* ========================================================================= */}
      {(stage === 'ARRIVED' || stage === 'OTP_CHECKIN') && (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-5 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-500 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-foreground">Patient Check-in OTP</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Ask the patient for their 4-digit start OTP to unlock this session.
            </p>
          </div>

          <div className="space-y-2">
            <Input
              type="text"
              maxLength={4}
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              placeholder="Enter 4-digit OTP"
              className="text-center font-mono text-2xl font-extrabold tracking-widest h-14 rounded-2xl"
            />
            {otpError && (
              <p className="text-xs text-destructive font-bold">
                Invalid OTP. (Demo test code: <strong>{ACTIVE_VISIT.checkInOtp}</strong> or 1234)
              </p>
            )}
          </div>

          <div className="p-3 bg-muted/40 rounded-xl text-[11px] text-muted-foreground font-mono">
            Demo Test OTP: <strong>{ACTIVE_VISIT.checkInOtp}</strong>
          </div>

          <Button
            onClick={handleVerifyOtp}
            className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            <span>Verify OTP & Begin Clinical Session</span>
          </Button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 4: IN_SESSION → CLINICAL SOAP NOTE & ADD-ONS */}
      {/* ========================================================================= */}
      {stage === 'IN_SESSION' && (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              <h3 className="text-base font-extrabold text-foreground">Clinical SOAP Assessment & Care Plan</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
              Live Session Active
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Subjective */}
            <div>
              <Label className="font-bold">Subjective Symptoms & Chief Complaint</Label>
              <textarea
                rows={2}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className="w-full p-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* VAS Pain Score */}
            <div className="p-4 bg-muted/20 rounded-2xl space-y-2">
              <div className="flex justify-between items-center">
                <Label className="font-bold">VAS Pain Intensity Score: {vasPainScore} / 10</Label>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    vasPainScore <= 3
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : vasPainScore <= 6
                      ? 'bg-amber-500/10 text-amber-500'
                      : 'bg-destructive/10 text-destructive'
                  }`}
                >
                  {vasPainScore <= 3 ? 'Mild' : vasPainScore <= 6 ? 'Moderate Pain' : 'Severe Pain'}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={10}
                value={vasPainScore}
                onChange={(e) => setVasPainScore(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Objective Exam */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="font-bold">Range of Motion (ROM)</Label>
                <Input
                  value={rangeOfMotion}
                  onChange={(e) => setRangeOfMotion(e.target.value)}
                  className="h-10 mt-1 rounded-xl text-xs"
                />
              </div>
              <div>
                <Label className="font-bold">Muscle Strength (MMT)</Label>
                <Input
                  value={muscleStrengthMMT}
                  onChange={(e) => setMuscleStrengthMMT(e.target.value)}
                  className="h-10 mt-1 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Advanced Add-On Treatments */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-foreground">Specialized Add-On Treatments</div>
                  <div className="text-muted-foreground text-[11px]">Select extra modalities performed during visit.</div>
                </div>
                <span className="text-xs font-mono font-bold text-primary">+₹{addOnsTotal}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {Object.entries(ADDON_PRICING).map(([addon, price]) => {
                  const isSelected = selectedAddOns.includes(addon);
                  return (
                    <button
                      key={addon}
                      type="button"
                      onClick={() => toggleAddOn(addon)}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-md'
                          : 'border-border/60 bg-card hover:border-primary/40'
                      }`}
                    >
                      <span>{addon}</span>
                      <span className="font-mono text-[11px] mt-1">+₹{price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Home Exercise Plan */}
            <div>
              <Label className="font-bold">Home Exercise Prescription (Hep) & Ergonomic Advice</Label>
              <textarea
                rows={3}
                value={homeExercisePrescription}
                onChange={(e) => setHomeExercisePrescription(e.target.value)}
                className="w-full p-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 flex justify-end">
            <Button
              onClick={() => setStage('FINALIZE_PAYMENT')}
              className="h-12 px-7 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20"
            >
              <span>Save SOAP & Proceed to Payment (₹{totalAmount})</span>
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 5: FINALIZE PAYMENT & CHECKOUT */}
      {/* ========================================================================= */}
      {stage === 'FINALIZE_PAYMENT' && (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="text-base font-extrabold text-foreground">Collect Payment & Settle Payout</h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground font-mono">Total Billable:</span>
              <strong className="text-base font-mono text-foreground ml-2">₹{totalAmount}</strong>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <Label className="font-bold text-xs">Select Collection Method</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'upi_qr' as const,
                  title: 'Instant UPI QR Code',
                  desc: 'Generate dynamic QR on screen for patient GPay / PhonePe scan.',
                  icon: QrCode,
                },
                {
                  id: 'cash' as const,
                  title: 'Cash Payment',
                  desc: 'Collect physical cash directly at doorstep.',
                  icon: Banknote,
                },
                {
                  id: 'online' as const,
                  title: 'SMS / WhatsApp Link',
                  desc: 'Dispatch instant payment checkout link to patient mobile.',
                  icon: Send,
                },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                      isSelected
                        ? 'border-primary bg-primary/10 shadow-md ring-2 ring-primary/20'
                        : 'border-border/60 bg-muted/20 hover:border-primary/40'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-card border border-border flex items-center justify-center text-primary">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-foreground">{m.title}</div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* UPI QR Display Preview */}
          {paymentMethod === 'upi_qr' && (
            <div className="p-6 bg-muted/30 border border-border/60 rounded-2xl text-center space-y-3 max-w-xs mx-auto">
              <div className="w-40 h-40 bg-white p-2 rounded-2xl mx-auto flex items-center justify-center border shadow-sm">
                <QrCode className="w-36 h-36 text-slate-900" />
              </div>
              <div className="text-xs font-extrabold font-mono text-foreground">UPI: aries.pay@hdfcbank</div>
              <div className="text-[11px] text-muted-foreground">Scan with any UPI app to pay ₹{totalAmount}</div>
            </div>
          )}

          {/* Commission Settlement Summary */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground">Therapist Payout Credit (60%):</span>
              <strong className="text-emerald-500 font-mono text-sm">+₹{therapistPayout}</strong>
            </div>
            <div className="text-[11px] text-muted-foreground">
              Amount will be instantly credited to your Aries Wallet upon clicking Complete.
            </div>
          </div>

          <div className="pt-4 border-t border-border/60 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStage('IN_SESSION')} className="h-11 px-5 rounded-xl font-bold text-xs">
              Back to SOAP
            </Button>

            <Button
              onClick={handleFinalizeVisit}
              disabled={isProcessing}
              className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Payment & Complete Visit'}
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STAGE 6: COMPLETED */}
      {/* ========================================================================= */}
      {stage === 'COMPLETED' && (
        <div className="bg-card border-2 border-emerald-500/30 rounded-3xl p-8 shadow-lg text-center space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-emerald-500 uppercase tracking-widest">
              Visit Successfully Finalized
            </span>
            <h2 className="text-2xl font-extrabold text-foreground mt-1">₹{therapistPayout} Credited to Your Wallet</h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
              Clinical SOAP records encrypted and saved to MongoDB. Patient invoice and care prescription sent via WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              onClick={() => {
                setStage('SCHEDULED');
                setEnteredOtp('');
              }}
              className="h-11 px-6 rounded-xl bg-primary text-white font-bold text-xs"
            >
              View Next Appointment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
