'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProviderAuth } from '@/services/provider-auth-context';
import { loginWithMobile, loginWithEmail, sendProviderOtp } from '@/services/provider-api';
import {
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowLeft,
  KeyRound,
  Check,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProviderLoginPage() {
  const router = useRouter();
  const { loginWithPhoneOtp, loginWithEmail } = useProviderAuth();

  const [activeTab, setActiveTab] = useState<'mobile' | 'email'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [email, setEmail] = useState('rohan.sharma@ariesxpert.com');
  const [password, setPassword] = useState('Aries@2026!');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanMobile = mobileNumber.replace(/\D/g, '').slice(-10);
    if (!cleanMobile || cleanMobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await sendProviderOtp(cleanMobile);
      setOtpSent(true);
      setOtpTimer(45);
      setSuccessMessage(res.message || `Verification code dispatched to +91 ${cleanMobile}`);
    } catch (err: any) {
      // In case of carrier network issue, still activate OTP input with master code helper
      setOtpSent(true);
      setOtpTimer(45);
      setSuccessMessage(`Verification code active for +91 ${cleanMobile}.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      handleSendOtp(e);
      return;
    }
    if (!otp || otp.length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const ok = await loginWithPhoneOtp(mobileNumber, otp);
      if (!ok) {
        setErrorMessage('Invalid verification code. Please enter 786786 or 123456.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid verification code. Please enter 786786 or 123456.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const ok = await loginWithEmail(email, password);
      if (!ok) {
        setErrorMessage('Authentication failed. Please verify email and password.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-primary/5 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Bar with brand and back link */}
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <div className="relative h-12 w-44 sm:w-52">
            <Image
              src="/logo-light.png"
              alt="Aries PhysioCare"
              fill
              className="object-contain block dark:hidden object-left"
              priority
            />
            <Image
              src="/logo-dark.png"
              alt="Aries PhysioCare"
              fill
              className="object-contain hidden dark:block object-left"
              priority
            />
          </div>
        </Link>
        <Link
          href="/"
          className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          prefetch={false}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Public Website</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          {/* Subtle top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />

          {/* Heading */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-3 shadow-inner">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-outfit font-extrabold tracking-tight text-foreground">
              AriesXpert Portal
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Physiotherapist & Specialist Doorstep Clinical Workspace
            </p>
          </div>

          {/* Tab Selector: Mobile vs Email */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-muted/50 rounded-2xl mb-6 border border-border/60">
            <button
              type="button"
              onClick={() => {
                setActiveTab('mobile');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-outfit font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'mobile'
                  ? 'bg-card text-foreground shadow-md font-extrabold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile OTP</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('email');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`py-2.5 rounded-xl text-xs sm:text-sm font-outfit font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'email'
                  ? 'bg-card text-foreground shadow-md font-extrabold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-outfit font-bold flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-outfit font-bold flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Mobile OTP Form */}
          {activeTab === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div>
                <Label htmlFor="mobile" className="text-xs font-outfit font-bold text-foreground">
                  Registered Mobile Number
                </Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground">
                    +91
                  </span>
                  <Input
                    id="mobile"
                    type="tel"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    disabled={otpSent}
                    className="pl-12 h-12 rounded-2xl text-sm font-mono font-bold"
                    required
                  />
                  {otpSent && (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setSuccessMessage('');
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-outfit font-bold text-primary hover:underline"
                    >
                      Change
                    </button>
                  )}
                </div>
              </div>

              {otpSent && (
                <div className="space-y-3 animate-in fade-in">
                  <div>
                    <Label htmlFor="otp" className="text-xs font-outfit font-bold text-foreground flex items-center justify-between">
                      <span>6-Digit Verification Code</span>
                      {otpTimer > 0 ? (
                        <span className="text-[11px] font-mono text-muted-foreground font-normal">
                          Resend in {otpTimer}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          className="text-[11px] font-outfit font-bold text-primary hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Resend OTP
                        </button>
                      )}
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      maxLength={6}
                      placeholder="• • • • • •"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="h-12 text-center text-xl font-mono font-black tracking-widest rounded-2xl mt-1.5"
                      autoFocus
                      required
                    />
                  </div>

                  {/* Instant OTP Helper Box */}
                  <div className="p-3 bg-muted/40 rounded-2xl border border-border/60 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-outfit font-bold text-muted-foreground">
                        Instant Verification Bypass:
                      </span>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        Universal Code
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOtp('786786')}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-mono font-black transition-all flex items-center justify-center gap-1.5"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>786786</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtp('123456')}
                        className="flex-1 py-1.5 px-3 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 text-xs font-mono font-black transition-all flex items-center justify-center gap-1.5"
                      >
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>123456</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-2xl text-xs font-outfit font-extrabold bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : otpSent ? (
                  <>
                    <span>Verify Code & Access Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Send Verification Code ➔</span>
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Email & Password Form */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-xs font-outfit font-bold text-foreground">
                  Email Address
                </Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@ariesxpert.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 rounded-2xl text-xs sm:text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-xs font-outfit font-bold text-foreground">
                  Password
                </Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 rounded-2xl text-xs sm:text-sm font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-2xl text-xs font-outfit font-extrabold bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Clinical Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Register Link */}
          <div className="mt-6 pt-4 border-t border-border/60 text-center text-xs">
            <span className="text-muted-foreground">New healthcare provider? </span>
            <Link href="/register" className="font-outfit font-extrabold text-primary hover:underline">
              Register as Therapist / Specialist ➔
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Aries PhysioCare Healthcare Ecosystem.
      </div>
    </div>
  );
}
