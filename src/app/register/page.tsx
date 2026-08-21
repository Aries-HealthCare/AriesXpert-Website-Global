'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProviderAuth } from '@/services/provider-auth-context';
import { registerProvider } from '@/services/provider-api';
import {
  User,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Stethoscope,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CITIES = [
  'Mumbai',
  'Pune',
  'Bangalore',
  'Delhi NCR',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
  'Surat',
];

const SPECIALIZATIONS = [
  'Musculoskeletal & Orthopedic Physiotherapy',
  'Sports Physical Therapy & Injury Prevention',
  'Neurological Rehabilitation & Stroke Recovery',
  'Geriatric Care & Mobility Restoration',
  'Pediatric Physiotherapy & Child Development',
  'Cardiopulmonary & Post-ICU Rehab',
  'Women\'s Health & Pelvic Floor Therapy',
];

export default function ProviderRegisterPage() {
  const router = useRouter();
  const { login } = useProviderAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('Male');
  const [city, setCity] = useState('Mumbai');
  const [specialization, setSpecialization] = useState(SPECIALIZATIONS[0]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !mobileNumber || !password) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }
    if (mobileNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage('You must agree to the Aries Provider Terms & Clinical Code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await registerProvider({
        firstName,
        lastName,
        email,
        mobileNumber,
        gender,
        city,
        specialization,
        password,
      });

      if (res.token && res.user) {
        login(res.token, res.user);
        router.push(`/verify?phone=${encodeURIComponent(mobileNumber)}`);
      } else {
        router.push(`/verify?phone=${encodeURIComponent(mobileNumber)}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-primary/5 flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8">
      {/* Top Navigation */}
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

      {/* Main Registration Card */}
      <div className="max-w-2xl w-full mx-auto my-6">
        <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative overflow-hidden">
          {/* Top banner */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-3 shadow-inner">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Join AriesXpert Network</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-lg mx-auto">
              Deliver evidence-based doorstep physiotherapy, grow your private clinical practice, and earn up to ₹85,000+/month.
            </p>
          </div>

          {/* Perks banner */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-2xl mb-8 border border-border/50 text-center">
            <div className="p-2">
              <div className="text-xs font-bold text-foreground">60-70% Payout</div>
              <div className="text-[10px] text-muted-foreground">Direct daily wallet credit</div>
            </div>
            <div className="p-2 border-x border-border/60">
              <div className="text-xs font-bold text-foreground">Zero Upfront Fee</div>
              <div className="text-[10px] text-muted-foreground">Free onboarding & kit</div>
            </div>
            <div className="p-2">
              <div className="text-xs font-bold text-foreground">AI Clinical Copilot</div>
              <div className="text-[10px] text-muted-foreground">Digital SOAP & diagnostics</div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-xs font-bold text-foreground">
                  First Name *
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <User className="w-4 h-4" />
                  </div>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="e.g. Rohan"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10 h-11 text-sm rounded-xl"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lastName" className="text-xs font-bold text-foreground">
                  Last Name *
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="e.g. Sharma"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 text-sm rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobileNumber" className="text-xs font-bold text-foreground">
                  Mobile Number (WhatsApp) *
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground text-xs font-bold">
                    +91
                  </div>
                  <Input
                    id="mobileNumber"
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    className="pl-12 h-11 text-sm rounded-xl font-mono"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-xs font-bold text-foreground">
                  Email Address *
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="dr.rohan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 text-sm rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            {/* City & Specialization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="text-xs font-bold text-foreground">
                  Base City *
                </Label>
                <div className="relative mt-1.5">
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full h-11 px-3 bg-background border border-input rounded-xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="gender" className="text-xs font-bold text-foreground">
                  Gender *
                </Label>
                <div className="relative mt-1.5">
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-11 px-3 bg-background border border-input rounded-xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Primary Specialization */}
            <div>
              <Label htmlFor="specialization" className="text-xs font-bold text-foreground">
                Primary Clinical Specialization *
              </Label>
              <div className="relative mt-1.5">
                <select
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full h-11 px-3 bg-background border border-input rounded-xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {SPECIALIZATIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password" className="text-xs font-bold text-foreground">
                  Create Password *
                </Label>
                <div className="relative mt-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 text-sm rounded-xl"
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
              <div>
                <Label htmlFor="confirmPassword" className="text-xs font-bold text-foreground">
                  Confirm Password *
                </Label>
                <div className="relative mt-1.5">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 text-sm rounded-xl"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-xs text-muted-foreground leading-snug">
                I certify that I am a licensed / certified physiotherapist and agree to Aries PhysioCare's{' '}
                <Link href="/terms-of-service" className="text-primary underline" target="_blank">
                  Clinical Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-primary underline" target="_blank">
                  Privacy Policy
                </Link>.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl text-sm font-extrabold bg-primary hover:bg-primary/95 text-white shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Create Account & Start Onboarding</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Already have account */}
          <div className="mt-6 pt-4 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground">
              Already registered with AriesXpert?{' '}
              <Link href="/login" className="text-primary font-bold hover:underline" prefetch={false}>
                Sign In to Dashboard
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-muted-foreground/60">
        © {new Date().getFullYear()} Aries PhysioCare International Pvt Ltd.
      </div>
    </div>
  );
}
