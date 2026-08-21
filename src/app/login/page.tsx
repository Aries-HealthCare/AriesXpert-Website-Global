'use client';

import React, { useState } from 'react';
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
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProviderLoginPage() {
  const router = useRouter();
  const { login } = useProviderAuth();

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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await sendProviderOtp(mobileNumber);
      setOtpSent(true);
      setOtpTimer(30);
      setSuccessMessage(res.message || 'Verification OTP sent to your phone.');
      // Auto-focus OTP
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send OTP. Please try again.');
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
      setErrorMessage('Please enter the verification code sent to your phone.');
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { token, user } = await loginWithMobile(mobileNumber, otp);
      login(token, user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid verification code. Please check and retry.');
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
      const { token, user } = await loginWithEmail(email, password);
      login(token, user);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo Fast-Track Login for instant evaluation
  const handleQuickDemoLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const { token, user } = await loginWithMobile('9876543210', '123456');
      login(token, user);
    } catch (err: any) {
      setErrorMessage('Quick login failed.');
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
          <span>Patient Website</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          {/* Subtle glow accent */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-3 shadow-inner">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AriesXpert Provider</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Clinical Command Center for Certified Physiotherapists
            </p>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 p-1 bg-muted/60 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab('mobile');
                setErrorMessage('');
              }}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'mobile'
                  ? 'bg-background text-foreground shadow-sm'
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
              }}
              className={`py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'email'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Tab 1: Mobile OTP Form */}
          {activeTab === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="space-y-4">
              <div>
                <Label htmlFor="mobileNumber" className="text-xs font-bold text-foreground">
                  Registered Mobile Number
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground text-sm font-semibold">
                    +91
                  </div>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    className="pl-12 text-sm font-medium h-12 rounded-xl"
                    disabled={otpSent && isLoading}
                    required
                  />
                </div>
              </div>

              {otpSent && (
                <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="otp" className="text-xs font-bold text-foreground">
                      6-Digit Verification Code
                    </Label>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Resend Code
                    </button>
                  </div>
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP (e.g. 123456)"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="text-center tracking-widest text-lg font-mono font-bold h-12 rounded-xl"
                    autoFocus
                    required
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-sm font-extrabold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : otpSent ? (
                  <>
                    <span>Verify & Enter Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Get Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Tab 2: Email & Password Form */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-xs font-bold text-foreground">
                  Email Address
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="doctor@ariesxpert.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 text-sm font-medium h-12 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold text-foreground">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 text-sm font-medium h-12 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-sm font-extrabold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Quick Demo Access Bar */}
          <div className="mt-6 pt-4 border-t border-border/60">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="w-full py-2.5 px-3 rounded-xl bg-accent/10 border border-accent/30 hover:bg-accent/20 text-accent font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Test Provider Demo Login</span>
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Are you a licensed Physiotherapist?{' '}
              <Link href="/register" className="text-primary font-bold hover:underline" prefetch={false}>
                Apply to Join AriesXpert
              </Link>
            </p>
          </div>
        </div>

        {/* Security Assurance footer */}
        <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>Canonical Aries Core</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Aries PhysioCare International Pvt Ltd. All rights reserved.
      </div>
    </div>
  );
}
