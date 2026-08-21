'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProviderAuth } from '@/services/provider-auth-context';
import { verifyProviderOtp, sendProviderOtp } from '@/services/provider-api';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneParam = searchParams.get('phone') || '';
  const { user, updateUserData } = useProviderAuth();

  const [mobileNumber, setMobileNumber] = useState(phoneParam || user?.mobileNumber || '9876543210');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    if (timer > 0) return;
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await sendProviderOtp(mobileNumber);
      setTimer(45);
      setSuccessMessage(res.message || 'New OTP sent to your registered mobile number.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      await verifyProviderOtp(mobileNumber, otp);
      updateUserData({ isVerified: true });
      setSuccessMessage('Mobile number verified successfully! Redirecting to KYC onboarding...');
      setTimeout(() => {
        router.push('/onboarding');
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Verification failed. Please check the code.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-primary/5 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
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
          href="/login"
          className="text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
          prefetch={false}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-3">
              <Smartphone className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Verify Your Mobile</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter the 6-digit code sent to{' '}
              <span className="font-bold text-foreground font-mono">+91 {mobileNumber}</span>
            </p>
          </div>

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

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <Label htmlFor="otp" className="text-xs font-bold text-foreground">
                6-Digit Verification Code
              </Label>
              <Input
                id="otp"
                type="text"
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="text-center text-2xl tracking-[0.3em] font-mono font-bold h-14 rounded-xl mt-1.5"
                autoFocus
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Didn't receive code?</span>
              {timer > 0 ? (
                <span className="text-muted-foreground font-mono">Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isLoading}
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend OTP</span>
                </button>
              )}
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
                  <span>Verify & Proceed to Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border/60 text-center">
            <button
              type="button"
              onClick={() => {
                setOtp('123456');
              }}
              className="text-xs text-muted-foreground hover:text-foreground font-medium"
            >
              Development Bypass: Autofill Test OTP (123456)
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Aries PhysioCare International Pvt Ltd.
      </div>
    </div>
  );
}

export default function ProviderVerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
      <VerifyContent />
    </Suspense>
  );
}
