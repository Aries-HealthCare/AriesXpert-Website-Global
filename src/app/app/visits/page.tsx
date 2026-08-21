'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Check,
  RefreshCw,
  Calendar,
  Users,
  ChevronDown,
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

const ADDON_PRICING: Record<string, number> = {
  Cupping: 500,
  Needling: 500,
  IASTM: 500,
  'Kinesology Tapeing': 300,
};

const TREATMENT_TYPES = [
  'Manual Therapy',
  'Electrotherapy (TENS/IFT)',
  'Therapeutic Exercise',
  'Ultrasound',
  'Hot/Cold Therapy',
  'Traction',
  'Dry Needling',
  'Gait Training',
  'Soft Tissue Mobilization',
  'PNF Stretching',
];

const PAIN_NATURE_OPTS = ['Throbbing', 'Dull Ache', 'Burning', 'Stabbing', 'Stiff', 'Sharp'];
const REHAB_PHASES = ['Acute (0-2 wks)', 'Subacute (2-6 wks)', 'Chronic (>6 wks)', 'Functional Return', 'Sports Return'];
const MMT_GRADES = ['Grade 0 — Zero', 'Grade 1 — Trace', 'Grade 2 — Poor', 'Grade 3 — Fair', 'Grade 4 — Good', 'Grade 5 — Normal'];

export default function ProviderVisitsPage() {
  const { user } = useProviderAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [activeApt, setActiveApt] = useState<any | null>(null);
  const [visitStage, setVisitStage] = useState<VisitStage>('SCHEDULED');
  const [isProcessing, setIsProcessing] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi_qr' | 'online'>('cash');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // SOAP note state (matches SOAPClinicalAssessment schema in mobile)
  const [soap, setSoap] = useState<SOAPClinicalAssessment>({
    chiefComplaint: '',
    mechanismOfInjury: '',
    vasPainScore: 5,
    painNature: 'Dull Ache',
    aggravatingFactors: '',
    relievingFactors: '',
    rangeOfMotion: '',
    muscleStrengthMMT: 'Grade 4 — Good',
    specialTests: '',
    palpationFindings: '',
    clinicalDiagnosis: '',
    rehabPhase: 'Subacute (2-6 wks)',
    treatmentProvided: [],
    selectedAddOns: [],
    homeExercisePrescription: '',
    therapistNotes: '',
  });

  const loadAppointments = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setIsLoading(true);
    try {
      const data = await providerApi.getAppointments();
      setAppointments(data);
    } catch (e) {
      console.warn('Appointments load error', e);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  const showFeedback = (type: 'success' | 'error' | 'info', text: string) => {
    setFeedback({ type, text });
    setTimeout(() => setFeedback(null), 5000);
  };

  const filteredApts = appointments.filter((a) => {
    const s = (a.status || '').toLowerCase();
    if (activeTab === 'upcoming') return ['scheduled', 'upcoming', 'confirmed', 'inprogress', 'travel_started', 'arrived'].includes(s);
    if (activeTab === 'completed') return ['completed', 'cancelled'].includes(s);
    return true;
  });

  const startVisit = (apt: any) => {
    setActiveApt(apt);
    setVisitStage('SCHEDULED');
    setSelectedAddOns([]);
    setOtpInput('');
    setOtpError('');
    setSoap({
      chiefComplaint: apt.condition || '',
      mechanismOfInjury: '',
      vasPainScore: 5,
      painNature: 'Dull Ache',
      aggravatingFactors: '',
      relievingFactors: '',
      rangeOfMotion: '',
      muscleStrengthMMT: 'Grade 4 — Good',
      specialTests: '',
      palpationFindings: '',
      clinicalDiagnosis: apt.condition || '',
      rehabPhase: 'Subacute (2-6 wks)',
      treatmentProvided: [],
      selectedAddOns: [],
      homeExercisePrescription: '',
      therapistNotes: '',
    });
  };

  const handleStartTravel = async () => {
    if (!activeApt) return;
    setIsProcessing(true);
    await providerApi.startTravel(activeApt._id || activeApt.id);
    setVisitStage('TRAVEL_STARTED');
    setIsProcessing(false);
    showFeedback('info', 'Travel started. Navigate to patient location.');
  };

  const handleArrived = async () => {
    if (!activeApt) return;
    setIsProcessing(true);
    await providerApi.markArrived(activeApt._id || activeApt.id);
    setVisitStage('ARRIVED');
    setIsProcessing(false);
    showFeedback('info', 'Marked as arrived. Request OTP from patient.');
  };

  const handleOtpCheckIn = async () => {
    if (!activeApt) return;
    const checkInOtp = activeApt.checkInOtp || '';
    if (otpInput.trim() !== checkInOtp.trim() && checkInOtp) {
      setOtpError('Incorrect OTP. Ask the patient for their OTP.');
      return;
    }
    setIsProcessing(true);
    const res = await providerApi.checkInWithOtp(activeApt._id || activeApt.id, otpInput);
    setIsProcessing(false);
    if (res.success) {
      setVisitStage('IN_SESSION');
      setOtpError('');
      showFeedback('success', 'Check-in successful! Session started.');
    } else {
      setOtpError(res.message || 'Check-in failed. Please verify OTP.');
    }
  };

  const handleGoToFinalize = () => {
    setVisitStage('FINALIZE_PAYMENT');
  };

  const baseFee = activeApt?.sessionFee || activeApt?.totalAmount || 1200;
  const addOnTotal = selectedAddOns.reduce((sum, a) => sum + (ADDON_PRICING[a] || 0), 0);
  const totalAmount = baseFee + addOnTotal;

  const handleFinalizeVisit = async () => {
    if (!activeApt) return;
    setIsProcessing(true);
    try {
      const payload: FinalizeVisitPayload = {
        appointmentId: activeApt._id || activeApt.id,
        paymentMethod,
        totalAmount,
        addOns: selectedAddOns,
        packageName: activeApt.packageName || activeApt.packageType,
      };
      const res = await providerApi.finalizeVisit(payload);
      if (res.success) {
        setVisitStage('COMPLETED');
        setAppointments((prev) => prev.map((a) =>
          (a._id || a.id) === (activeApt._id || activeApt.id) ? { ...a, status: 'Completed' } : a
        ));
        showFeedback('success', `Visit completed! ₹${totalAmount.toLocaleString('en-IN')} recorded.`);
      } else {
        showFeedback('error', res.message || 'Failed to finalize visit.');
      }
    } catch {
      showFeedback('error', 'Unable to finalize visit. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleTreatment = (t: string) => setSoap((s) => ({
    ...s,
    treatmentProvided: s.treatmentProvided.includes(t)
      ? s.treatmentProvided.filter((x) => x !== t)
      : [...s.treatmentProvided, t],
  }));
  const toggleAddOn = (a: string) => setSelectedAddOns((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const patientName = activeApt?.patient?.name || activeApt?.patient?.fullName || activeApt?.patientDetails?.name || 'Patient';
  const patientPhone = activeApt?.patient?.phone || activeApt?.patient?.mobileNo || activeApt?.patientDetails?.phone || '';
  const patientAddress = activeApt?.patient?.address || activeApt?.patientDetails?.address || '';
  const sessionNum = activeApt?.sessionNumber;
  const totalSessions = activeApt?.totalSessions;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Active Visit Engine */}
      {activeApt && visitStage !== 'COMPLETED' ? (
        <div className="space-y-6">
          {/* Visit Header */}
          <div className="bg-gradient-to-r from-primary/10 to-card border-2 border-primary/30 rounded-3xl p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">Active Visit</span>
                </div>
                <h2 className="text-xl font-extrabold">{patientName}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {activeApt.condition || activeApt.packageName}
                  {sessionNum && totalSessions ? ` · Session ${sessionNum} of ${totalSessions}` : ''}
                </p>
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                  {patientPhone && (
                    <a href={`tel:${patientPhone}`} className="flex items-center gap-1 hover:text-primary">
                      <Phone className="w-3.5 h-3.5" /> {patientPhone}
                    </a>
                  )}
                  {patientAddress && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" /> {patientAddress}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={() => setActiveApt(null)} className="text-xs text-muted-foreground hover:text-foreground">
                ✕ Exit
              </button>
            </div>
          </div>

          {/* Stage progress bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {(['SCHEDULED', 'TRAVEL_STARTED', 'ARRIVED', 'OTP_CHECKIN', 'IN_SESSION', 'FINALIZE_PAYMENT'] as VisitStage[]).map((stage, i) => {
              const labels: Record<VisitStage, string> = {
                SCHEDULED: 'Ready', TRAVEL_STARTED: 'Travel', ARRIVED: 'Arrived', OTP_CHECKIN: 'Check-In',
                IN_SESSION: 'Session', FINALIZE_PAYMENT: 'Payment', COMPLETED: 'Done',
              };
              const stageOrder = ['SCHEDULED', 'TRAVEL_STARTED', 'ARRIVED', 'OTP_CHECKIN', 'IN_SESSION', 'FINALIZE_PAYMENT', 'COMPLETED'];
              const isDone = stageOrder.indexOf(visitStage) > i;
              const isCurrent = visitStage === stage;
              return (
                <React.Fragment key={stage}>
                  <div className={`flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                    isCurrent ? 'bg-primary text-white border-primary' :
                    isDone ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                    'bg-muted/30 text-muted-foreground border-border/60'
                  }`}>
                    {isDone && <Check className="w-3 h-3" />}
                    {labels[stage]}
                  </div>
                  {i < 5 && <div className={`h-px w-4 shrink-0 ${isDone ? 'bg-emerald-500' : 'bg-border/60'}`} />}
                </React.Fragment>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              feedback.type === 'success' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30' :
              feedback.type === 'error' ? 'bg-red-500/10 text-red-600 border border-red-500/30' :
              'bg-blue-500/10 text-blue-600 border border-blue-500/30'
            }`}>
              {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              {feedback.text}
            </div>
          )}

          {/* Stage Content */}
          {(visitStage === 'SCHEDULED' || visitStage === 'TRAVEL_STARTED') && (
            <div className="bg-card border border-border/80 rounded-3xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Navigation className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {visitStage === 'SCHEDULED' ? 'Ready to travel?' : 'En route to patient'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {visitStage === 'SCHEDULED'
                    ? `Address: ${patientAddress || 'Check appointment details'}`
                    : 'Mark arrived when you reach the patient location.'}
                </p>
              </div>
              {visitStage === 'SCHEDULED' ? (
                <Button onClick={handleStartTravel} disabled={isProcessing} className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold shadow-lg shadow-primary/20">
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Navigation className="w-5 h-5 mr-2" />}
                  Start Travel
                </Button>
              ) : (
                <Button onClick={handleArrived} disabled={isProcessing} className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20">
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
                  I've Arrived
                </Button>
              )}
            </div>
          )}

          {visitStage === 'ARRIVED' && (
            <div className="bg-card border border-border/80 rounded-3xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold">Request OTP Check-In</h3>
              <p className="text-sm text-muted-foreground">
                Ask the patient for their 4-digit OTP from the Aries app to begin the session.
              </p>
              <Button onClick={() => setVisitStage('OTP_CHECKIN')} className="h-12 px-8 rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold">
                Enter OTP →
              </Button>
            </div>
          )}

          {visitStage === 'OTP_CHECKIN' && (
            <div className="bg-card border border-border/80 rounded-3xl p-6 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold">Patient OTP Verification</h3>
                <p className="text-sm text-muted-foreground mt-1">Enter the 4-digit OTP shown on the patient's phone</p>
              </div>
              {activeApt?.checkInOtp && (
                <div className="p-3 bg-muted/40 rounded-xl text-xs text-center font-mono text-muted-foreground border border-border/60">
                  Patient OTP (test): <span className="font-bold text-foreground">{activeApt.checkInOtp}</span>
                </div>
              )}
              <div className="max-w-xs mx-auto">
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otpInput}
                  onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                  className="h-14 text-2xl font-bold font-mono text-center tracking-widest rounded-2xl"
                />
                {otpError && <p className="text-xs text-red-500 font-bold mt-2 text-center">{otpError}</p>}
              </div>
              <Button
                onClick={handleOtpCheckIn}
                disabled={isProcessing || otpInput.length < 4}
                className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <ShieldCheck className="w-5 h-5 mr-2" />}
                Verify & Begin Session
              </Button>
            </div>
          )}

          {visitStage === 'IN_SESSION' && (
            <div className="bg-card border border-border/80 rounded-3xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">SOAP Clinical Assessment</h3>
                  <p className="text-xs text-muted-foreground">Complete the clinical note for this session</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Subjective */}
                <div className="space-y-3 border-t border-border/60 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">S — Subjective</h4>
                  <div>
                    <Label className="text-xs font-bold mb-1.5 block">Chief Complaint</Label>
                    <textarea
                      rows={2}
                      className="w-full text-sm p-3 rounded-xl border border-border/60 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Patient's main complaint..."
                      value={soap.chiefComplaint}
                      onChange={(e) => setSoap((s) => ({ ...s, chiefComplaint: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-bold mb-1.5 block">VAS Pain Score (0-10)</Label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range" min={0} max={10} value={soap.vasPainScore}
                          onChange={(e) => setSoap((s) => ({ ...s, vasPainScore: parseInt(e.target.value) }))}
                          className="flex-1 accent-primary"
                        />
                        <span className="w-8 text-center font-bold text-sm">{soap.vasPainScore}/10</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-bold mb-1.5 block">Pain Nature</Label>
                      <select
                        className="w-full text-sm p-2.5 rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                        value={soap.painNature}
                        onChange={(e) => setSoap((s) => ({ ...s, painNature: e.target.value }))}
                      >
                        {PAIN_NATURE_OPTS.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-bold mb-1.5 block">Aggravating Factors</Label>
                      <Input className="h-9 rounded-xl text-sm" placeholder="e.g., Walking, stairs" value={soap.aggravatingFactors} onChange={(e) => setSoap((s) => ({ ...s, aggravatingFactors: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs font-bold mb-1.5 block">Relieving Factors</Label>
                      <Input className="h-9 rounded-xl text-sm" placeholder="e.g., Rest, ice" value={soap.relievingFactors} onChange={(e) => setSoap((s) => ({ ...s, relievingFactors: e.target.value }))} />
                    </div>
                  </div>
                </div>

                {/* Objective */}
                <div className="space-y-3 border-t border-border/60 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">O — Objective</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs font-bold mb-1.5 block">Range of Motion</Label>
                      <Input className="h-9 rounded-xl text-sm" placeholder="e.g., Flexion 80°" value={soap.rangeOfMotion} onChange={(e) => setSoap((s) => ({ ...s, rangeOfMotion: e.target.value }))} />
                    </div>
                    <div>
                      <Label className="text-xs font-bold mb-1.5 block">Muscle Strength (MMT)</Label>
                      <select
                        className="w-full text-sm p-2.5 rounded-xl border border-border/60 bg-background focus:outline-none"
                        value={soap.muscleStrengthMMT}
                        onChange={(e) => setSoap((s) => ({ ...s, muscleStrengthMMT: e.target.value }))}
                      >
                        {MMT_GRADES.map((g) => <option key={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-bold mb-1.5 block">Palpation Findings</Label>
                    <Input className="h-9 rounded-xl text-sm" placeholder="e.g., Tenderness at L4-L5" value={soap.palpationFindings} onChange={(e) => setSoap((s) => ({ ...s, palpationFindings: e.target.value }))} />
                  </div>
                  <div>
                    <Label className="text-xs font-bold mb-1.5 block">Special Tests</Label>
                    <Input className="h-9 rounded-xl text-sm" placeholder="e.g., SLR +ve at 45°" value={soap.specialTests} onChange={(e) => setSoap((s) => ({ ...s, specialTests: e.target.value }))} />
                  </div>
                </div>

                {/* Assessment */}
                <div className="space-y-3 border-t border-border/60 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">A — Assessment</h4>
                  <div>
                    <Label className="text-xs font-bold mb-1.5 block">Clinical Diagnosis</Label>
                    <Input className="h-9 rounded-xl text-sm" placeholder="e.g., Lumbar disc herniation L4-L5" value={soap.clinicalDiagnosis} onChange={(e) => setSoap((s) => ({ ...s, clinicalDiagnosis: e.target.value }))} />
                  </div>
                  <div>
                    <Label className="text-xs font-bold mb-1.5 block">Rehab Phase</Label>
                    <select
                      className="w-full text-sm p-2.5 rounded-xl border border-border/60 bg-background focus:outline-none"
                      value={soap.rehabPhase}
                      onChange={(e) => setSoap((s) => ({ ...s, rehabPhase: e.target.value }))}
                    >
                      {REHAB_PHASES.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                {/* Plan */}
                <div className="space-y-3 border-t border-border/60 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">P — Plan</h4>
                  <div>
                    <Label className="text-xs font-bold mb-2 block">Treatment Provided (select all)</Label>
                    <div className="flex flex-wrap gap-2">
                      {TREATMENT_TYPES.map((t) => (
                        <button
                          key={t}
                          onClick={() => toggleTreatment(t)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            soap.treatmentProvided.includes(t)
                              ? 'bg-primary text-white border-primary'
                              : 'bg-muted/30 text-muted-foreground border-border/60 hover:bg-muted/60'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-bold mb-1.5 block">Home Exercise Prescription</Label>
                    <textarea
                      rows={2}
                      className="w-full text-sm p-3 rounded-xl border border-border/60 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Exercise plan for the patient..."
                      value={soap.homeExercisePrescription}
                      onChange={(e) => setSoap((s) => ({ ...s, homeExercisePrescription: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold mb-1.5 block">Therapist Notes</Label>
                    <textarea
                      rows={2}
                      className="w-full text-sm p-3 rounded-xl border border-border/60 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="Internal notes (not visible to patient)..."
                      value={soap.therapistNotes}
                      onChange={(e) => setSoap((s) => ({ ...s, therapistNotes: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Add-Ons */}
                <div className="space-y-3 border-t border-border/60 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Premium Add-Ons</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(ADDON_PRICING).map(([name, price]) => (
                      <button
                        key={name}
                        onClick={() => toggleAddOn(name)}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-left transition-all ${
                          selectedAddOns.includes(name)
                            ? 'bg-primary/10 text-primary border-primary/30'
                            : 'bg-muted/20 text-muted-foreground border-border/60 hover:bg-muted/40'
                        }`}
                      >
                        <span className="text-xs font-bold">{name}</span>
                        <span className="text-xs font-mono">+₹{price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleGoToFinalize} className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold">
                  <CreditCard className="w-4 h-4 mr-2" /> Proceed to Payment
                </Button>
              </div>
            </div>
          )}

          {visitStage === 'FINALIZE_PAYMENT' && (
            <div className="bg-card border border-border/80 rounded-3xl p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Finalize Payment</h3>
                  <p className="text-xs text-muted-foreground">Total: ₹{totalAmount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Fee breakdown */}
              <div className="bg-muted/30 rounded-2xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Session Fee</span>
                  <span className="font-bold">₹{baseFee.toLocaleString('en-IN')}</span>
                </div>
                {selectedAddOns.map((a) => (
                  <div key={a} className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{a}</span>
                    <span className="font-medium">+₹{ADDON_PRICING[a]}</span>
                  </div>
                ))}
                <div className="border-t border-border/60 pt-2 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment method */}
              <div className="space-y-2">
                <Label className="text-xs font-bold">Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cash', label: 'Cash', icon: <Banknote className="w-4 h-4" /> },
                    { id: 'upi_qr', label: 'UPI / QR', icon: <QrCode className="w-4 h-4" /> },
                    { id: 'online', label: 'Online Link', icon: <Send className="w-4 h-4" /> },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-2xl border text-xs font-bold transition-all ${
                        paymentMethod === m.id
                          ? 'bg-primary/10 text-primary border-primary/30'
                          : 'bg-muted/20 text-muted-foreground border-border/60 hover:bg-muted/40'
                      }`}
                    >
                      {m.icon}
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleFinalizeVisit}
                disabled={isProcessing}
                className="w-full h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-500/20"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <CheckCircle2 className="w-5 h-5 mr-2" />}
                Complete Visit & Record Payment
              </Button>
            </div>
          )}
        </div>
      ) : activeApt && visitStage === 'COMPLETED' ? (
        /* Completion screen */
        <div className="bg-card border border-border/80 rounded-3xl p-8 text-center space-y-4">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-emerald-500">Visit Completed!</h2>
            <p className="text-sm text-muted-foreground mt-2">
              ₹{totalAmount.toLocaleString('en-IN')} payment recorded. SOAP note saved to patient record.
            </p>
            <p className="text-xs text-muted-foreground mt-1">Your payout (60%) will be credited on the 5th.</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" className="rounded-2xl font-bold" onClick={() => { setActiveApt(null); setVisitStage('SCHEDULED'); }}>
              Back to Schedule
            </Button>
            <Button className="rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold" onClick={() => loadAppointments(true)}>
              Refresh Visits
            </Button>
          </div>
        </div>
      ) : (
        /* Appointment List */
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">Visits & Appointments</h1>
              <p className="text-xs text-muted-foreground mt-1">Manage your clinical schedule</p>
            </div>
            <button
              onClick={() => loadAppointments(true)}
              disabled={refreshing}
              className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border border-border/80 hover:bg-muted/50 transition-colors self-start sm:self-auto"
            >
              {refreshing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
              Refresh
            </button>
          </div>

          {/* Status tabs */}
          <div className="flex gap-1 p-1 bg-muted/30 border border-border/60 rounded-2xl w-fit">
            {(['upcoming', 'completed', 'all'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                  activeTab === tab ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredApts.length === 0 ? (
            <div className="p-12 rounded-3xl border border-dashed border-border/80 text-center text-muted-foreground">
              <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">No {activeTab} appointments</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApts.map((apt: any) => {
                const name = apt.patient?.name || apt.patient?.fullName || apt.patientDetails?.name || 'Patient';
                const age = apt.patient?.age || apt.patientDetails?.age;
                const condition = apt.condition || apt.packageName || '—';
                const date = apt.appointmentDate ? new Date(apt.appointmentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—';
                const time = apt.startTime || apt.scheduledTime || '—';
                const status = apt.status || 'Scheduled';
                const isCompleted = ['completed', 'cancelled'].includes(status.toLowerCase());
                const sessionNum = apt.sessionNumber;
                const totalSess = apt.totalSessions;
                const fee = apt.sessionFee || apt.totalAmount;
                return (
                  <div key={apt._id || apt.id} className={`bg-card border rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow ${isCompleted ? 'border-border/60 opacity-80' : 'border-border/80'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-bold">{name}{age ? ` (${age}y)` : ''}</h3>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isCompleted ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'
                            }`}>{status}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{condition}</p>
                          <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{time}</span>
                            {sessionNum && totalSess && <span className="font-medium text-foreground">Session {sessionNum}/{totalSess}</span>}
                            {fee && <span className="font-bold text-emerald-600">₹{fee.toLocaleString('en-IN')}</span>}
                          </div>
                        </div>
                      </div>
                      {!isCompleted && (
                        <Button
                          size="sm"
                          className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/95 text-white font-bold text-xs shrink-0"
                          onClick={() => startVisit(apt)}
                        >
                          Start →
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
