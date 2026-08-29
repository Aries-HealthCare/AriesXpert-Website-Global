'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProviderAuth } from '@/services/provider-auth-context';
import { providerApi } from '@/services/provider-api';
import {
  Stethoscope,
  Phone,
  Mail,
  User,
  MapPin,
  Lock,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CountrySelector, COUNTRIES_CONFIG } from '@/components/country-selector';

export default function ProviderRegisterPage() {
  const router = useRouter();
  const { updateUserData } = useProviderAuth();

  const [selectedCountry, setSelectedCountry] = useState('India');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Mumbai');
  const [role, setRole] = useState('Physiotherapist');
  const [qualification, setQualification] = useState('BPT (Bachelor of Physiotherapy)');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentCountry = COUNTRIES_CONFIG[selectedCountry] || COUNTRIES_CONFIG['India'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < currentCountry.phoneLength - 2) {
      setErrorMsg(`Please enter a valid mobile number for ${currentCountry.name}.`);
      return;
    }
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Please agree to the Provider Terms & Conditions.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Immediately create/register Expert in MongoDB backend
      let registeredId = '';
      try {
        const fd = new FormData();
        fd.append('fullName', fullName);
        fd.append('phone', cleanPhone);
        fd.append('email', email.toLowerCase().trim());
        fd.append('password', password);
        fd.append('city', city);
        fd.append('countryCode', currentCountry.dialCode);
        fd.append('countryName', currentCountry.name);
        fd.append('licenseNumber', licenseNumber);
        fd.append('specialization', qualification);
        fd.append('isMobileNumberVerified', 'false');

        const regRes = await providerApi.addPersonalInfo(fd);
        if (regRes.result?._id) {
          registeredId = regRes.result._id;
        }
      } catch (backendErr) {
        console.warn('[Register] Immediate backend registration error:', backendErr);
      }

      // 2. Trigger MSG91 OTP
      await providerApi.sendOTP(cleanPhone);

      // 3. Cache preliminary data to pass to onboarding
      const tempUser = {
        _id: registeredId || 'exp_' + Date.now(),
        fullName,
        phone: cleanPhone,
        countryName: currentCountry.name,
        countryCode: currentCountry.dialCode,
        email: email.toLowerCase().trim(),
        city,
        licenseNumber,
        specialization: qualification,
        onboardingStep: 0,
        status: 'Pending' as const,
      };

      updateUserData(tempUser);
      localStorage.setItem('temp_register_phone', cleanPhone);
      localStorage.setItem('temp_register_country', currentCountry.name);
      localStorage.setItem('temp_register_data', JSON.stringify(tempUser));

      // 4. Redirect to OTP verification
      router.push(`/verify?phone=${cleanPhone}`);
    } catch (e: any) {
      setErrorMsg(e.message || 'Registration request failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white mx-auto flex items-center justify-center shadow-lg shadow-primary/20">
            <Stethoscope className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold tracking-widest text-primary uppercase">
            AriesXpert Clinical Network
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Join as Certified Healthcare Specialist
          </h1>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            Start receiving verified doorstep home visit broadcasts with 60% transparent payout and instant IMPS settlement.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          {errorMsg && (
            <div className="p-3.5 bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <Label className="font-bold">Full Name (Dr. / Specialist)</Label>
              <div className="relative mt-1">
                <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Priya Deshmukh, BPT"
                  className="pl-9 h-11 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Country & Mobile Number (For OTP)</Label>
              <div className="flex gap-2 mt-1">
                <div className="w-32 shrink-0">
                  <CountrySelector
                    selectedCountry={selectedCountry}
                    onSelectCountry={setSelectedCountry}
                    compact
                  />
                </div>
                <div className="relative flex-1">
                  <Input
                    type="tel"
                    maxLength={currentCountry.phoneLength + 2}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder={currentCountry.phonePlaceholder}
                    className="h-11 rounded-xl text-xs font-mono"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="font-bold">Email Address</Label>
              <div className="relative mt-1">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="doctor@example.com"
                  className="pl-9 h-11 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="font-bold">Healthcare Role</Label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full h-11 px-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium"
                >
                  <option value="Physiotherapist">Physiotherapist</option>
                  <option value="Occupational Therapist">Occupational Therapist</option>
                  <option value="Speech Therapist">Speech Therapist</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Caretaker">Caretaker</option>
                </select>
              </div>

              <div>
                <Label className="font-bold">Primary Qualification</Label>
                <Input
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="BPT / MPT"
                  className="h-11 mt-1 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="font-bold">State Council Registration No.</Label>
                <Input
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="MH-OTPT-2018-9412"
                  className="h-11 mt-1 rounded-xl text-xs font-mono"
                  required
                />
              </div>

              <div>
                <Label className="font-bold">Operating Base City</Label>
                <Input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai"
                  className="h-11 mt-1 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="font-bold">Create Account Password</Label>
              <div className="relative mt-1">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 7 characters (e.g. DocPass@123)"
                  className="pl-9 h-11 rounded-xl text-xs font-mono"
                  required
                />
              </div>
            </div>

            <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 mt-0.5 rounded text-primary"
              />
              <span className="text-muted-foreground leading-snug">
                I agree to the{' '}
                <Link href="/terms-of-service" className="text-primary font-bold hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="text-primary font-bold hover:underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Send OTP & Continue to KYC</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-border/60 text-xs">
            <span className="text-muted-foreground">Already registered as a provider? </span>
            <Link href="/login" className="text-primary font-extrabold hover:underline">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
