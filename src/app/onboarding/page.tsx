'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProviderAuth } from '@/services/provider-auth-context';
import { providerApi } from '@/services/provider-api';
import {
  User,
  GraduationCap,
  Building2,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Upload,
  FileText,
  ShieldCheck,
  CreditCard,
  Briefcase,
  Navigation,
  Loader2,
  Sparkles,
  Info,
  Car
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STEPS = [
  { id: 0, title: 'Personal Details', desc: 'Identity & Address' },
  { id: 1, title: 'Professional Qualifications', desc: 'Council Registration & Degree' },
  { id: 2, title: 'Bank Account & UPI', desc: 'Direct IMPS Payout Setup' },
  { id: 3, title: 'Service Coverage', desc: 'Operating Pincodes & Commute' },
  { id: 4, title: 'Review & Submit', desc: 'Compliance & Verification' },
];

export default function ProviderOnboardingPage() {
  const { user, updateUserData } = useProviderAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // ── Step 0: Personal ──────────────────────────────────
  const [fullName, setFullName] = useState(user?.fullName || 'Dr. Rohan Sharma');
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [dob, setDob] = useState(user?.dob || '15/08/1992');
  const [email, setEmail] = useState(user?.email || 'rohan.sharma@ariesxpert.com');
  const [password, setPassword] = useState('AriesDoc@2026');
  const [phone, setPhone] = useState(user?.phone || user?.mobileNo || '9876543210');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || 'A-402, Green Meadows');
  const [addressLineTwo, setAddressLineTwo] = useState(user?.addressLineTwo || 'Link Road, IC Colony');
  const [zipCode, setZipCode] = useState(user?.zipCode || '400103');
  const [city, setCity] = useState(user?.city || 'Mumbai');
  const [stateVal, setStateVal] = useState(user?.state || 'Maharashtra');
  const [area, setArea] = useState(user?.area || 'Borivali West');
  const [aadharNumber, setAadharNumber] = useState(user?.aadharNumber || '5489 1234 8901');

  // ── Step 1: Professional ──────────────────────────────
  const [professionalRole, setProfessionalRole] = useState('Physiotherapist');
  const [qualification, setQualification] = useState('BPT (Bachelor of Physiotherapy)');
  const [specializations, setSpecializations] = useState<string[]>([
    'Musculoskeletal & Sports',
    'Neurological Rehabilitation',
  ]);
  const [yearOfExperience, setYearOfExperience] = useState('6');
  const [currentlyWorkingAt, setCurrentlyWorkingAt] = useState('Private Practice & Doorstep Consultations');
  const [serviceTypes, setServiceTypes] = useState<string[]>(['Home Visit', 'Clinic Visit', 'Telehealth']);
  const [hasModalities, setHasModalities] = useState(true);
  const [hasOwnClinic, setHasOwnClinic] = useState(false);
  const [clinicName, setClinicName] = useState('');
  const [clinicEstablishmentMonth, setClinicEstablishmentMonth] = useState('');
  const [clinicEstablishmentYear, setClinicEstablishmentYear] = useState('');

  // ── Step 2: Banking ───────────────────────────────────
  const [accountType, setAccountType] = useState('Savings');
  const [businessName, setBusinessName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('Dr. Rohan Sharma');
  const [accountNumber, setAccountNumber] = useState('50100234567890');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [ifscCode, setIfscCode] = useState('HDFC0000240');
  const [upiId, setUpiId] = useState('rohan@okhdfc');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');

  // ── Step 3: Service Area & Travel ─────────────────────
  const [serviceCity, setServiceCity] = useState('Mumbai');
  const [serviceAreas, setServiceAreas] = useState<string[]>(['Borivali West', 'Kandivali East', 'Malad West']);
  const [targetPincodes, setTargetPincodes] = useState<string[]>([
    '400103',
    '400101',
    '400064',
    '400063',
    '400053',
  ]);
  const [newPincode, setNewPincode] = useState('');
  const [serviceRadius, setServiceRadius] = useState(10);
  const [commuteType, setCommuteType] = useState('Two Wheeler (Bike / Scooter)');
  const [travelCapacity, setTravelCapacity] = useState('Up to 5 visits per day');
  const [urgentVisits, setUrgentVisits] = useState(true);
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState('MH-02-2018-0091234');

  // ── Step 4: Consents ──────────────────────────────────
  const [consents, setConsents] = useState({
    accuracy: true,
    terms: true,
    verification: true,
    feePolicy: true,
  });

  const toggleSpecialization = (spec: string) => {
    if (specializations.includes(spec)) {
      setSpecializations(specializations.filter((s) => s !== spec));
    } else {
      setSpecializations([...specializations, spec]);
    }
  };

  const toggleServiceType = (type: string) => {
    if (serviceTypes.includes(type)) {
      setServiceTypes(serviceTypes.filter((t) => t !== type));
    } else {
      setServiceTypes([...serviceTypes, type]);
    }
  };

  const handleAddPincode = () => {
    if (newPincode && newPincode.length === 6 && !targetPincodes.includes(newPincode)) {
      setTargetPincodes([...targetPincodes, newPincode]);
      setNewPincode('');
    }
  };

  const handleRemovePincode = (code: string) => {
    setTargetPincodes(targetPincodes.filter((p) => p !== code));
  };

  // ── Step Navigation Handlers ─────────────────────────

  const handleNext = async () => {
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (currentStep === 0) {
        // Step 0: Submit Personal Details to MongoDB
        const fd = new FormData();
        fd.append('user', user?._id || '');
        fd.append('fullName', fullName);
        fd.append('gender', gender);
        fd.append('dob', dob);
        fd.append('email', email);
        fd.append('password', password);
        fd.append('phone', phone.replace(/\D/g, '').slice(-10));
        fd.append('isMobileNumberVerified', 'true');
        fd.append('countryCode', '+91');
        fd.append('countryName', 'India');
        fd.append('streetAddress', streetAddress);
        fd.append('addressLineTwo', addressLineTwo);
        fd.append('zipCode', zipCode);
        fd.append('city', city);
        fd.append('state', stateVal);
        fd.append('area', area);
        fd.append('aadharNumber', aadharNumber);

        const res = await providerApi.addPersonalInfo(fd);
        if (res.result?._id) {
          updateUserData({ _id: res.result._id, fullName, email, phone, city, onboardingStep: 1 });
        }
        setCurrentStep(1);
      } else if (currentStep === 1) {
        // Step 1: Submit Professional Details
        const fd = new FormData();
        fd.append('user', user?._id || 'exp_demo_user');
        fd.append(
          'professionalInfo',
          JSON.stringify({
            professionalRole,
            qualification,
            specializations,
            yearOfExperience,
            currentlyWorkingAt,
            serviceTypes,
            hasModalities,
            hasOwnClinic,
            clinicName: hasOwnClinic ? clinicName : '',
            clinicEstablishmentMonth: hasOwnClinic ? clinicEstablishmentMonth : '',
            clinicEstablishmentYear: hasOwnClinic ? clinicEstablishmentYear : '',
          })
        );
        await providerApi.addProfessionalInfo(fd);
        updateUserData({ onboardingStep: 2 });
        setCurrentStep(2);
      } else if (currentStep === 2) {
        // Step 2: Submit Banking Details
        const fd = new FormData();
        fd.append('user', user?._id || 'exp_demo_user');
        fd.append(
          'bankInfo',
          JSON.stringify({
            accountType,
            businessName: accountType === 'Business' ? businessName : '',
            accountHolderName,
            accountNumber,
            bankName,
            ifscCode,
            upiId,
            panNumber,
          })
        );
        await providerApi.addBankInfo(fd);
        updateUserData({ onboardingStep: 3 });
        setCurrentStep(3);
      } else if (currentStep === 3) {
        // Step 3: Submit Service Area & Coverage
        const fd = new FormData();
        fd.append('user', user?._id || 'exp_demo_user');
        fd.append(
          'areaOfServiceInfo',
          JSON.stringify({
            city: serviceCity,
            serviceAreas,
            pincode: zipCode,
            targetPincodes,
            serviceRadius,
            commuteType,
            travelCapacity,
            urgentVisits,
            maxDistance: serviceRadius + 5,
            travelTimePreference: 'Anytime',
            drivingLicenseNumber,
          })
        );
        await providerApi.addAreaOfServiceInfo(fd);
        updateUserData({ onboardingStep: 4 });
        setCurrentStep(4);
      } else if (currentStep === 4) {
        // Step 4: Final Submit For Review
        await providerApi.submitForReview(user?._id || 'exp_demo_user');
        updateUserData({ onboardingStep: 5, status: 'Pending' });
        router.push('/app');
      }
    } catch (e: any) {
      setErrorMsg(e.message || 'Submission failed. Please check fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">
              AriesXpert Clinical Network
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Doctor & Specialist Onboarding
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Complete your verification profile. Saved seamlessly across web and mobile apps.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">
              Step {currentStep + 1} of {STEPS.length}
            </span>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step Indicator Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {STEPS.map((s) => {
            const isDone = currentStep > s.id;
            const isCurrent = currentStep === s.id;
            return (
              <div
                key={s.id}
                className={`p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'border-primary bg-primary/10 shadow-sm'
                    : isDone
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-border/40 bg-card/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isDone ? '✓' : s.id + 1}
                  </span>
                  <span className="text-xs font-extrabold truncate text-foreground">{s.title}</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1 truncate">{s.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3.5 bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold rounded-2xl flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step Content Form */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* STEP 0: Personal Details */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <User className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-extrabold text-foreground">Personal & Identity Information</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <Label className="font-bold">Full Legal Name (as per degree/Aadhaar)</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Rohan Sharma"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Gender</Label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-11 px-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <Label className="font-bold">Date of Birth (DD/MM/YYYY)</Label>
                  <Input
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="15/08/1992"
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <Label className="font-bold">Mobile Number (Verified)</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 mt-1 rounded-xl font-mono"
                    readOnly
                  />
                </div>

                <div>
                  <Label className="font-bold">Email Address</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@example.com"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Account Password (Min 7 chars, 1 capital, 1 symbol)</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <Label className="font-bold">Street / Building Address</Label>
                  <Input
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Flat 402, Green Meadows"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Address Line 2 / Locality</Label>
                  <Input
                    value={addressLineTwo}
                    onChange={(e) => setAddressLineTwo(e.target.value)}
                    placeholder="Link Road, IC Colony"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Base City</Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">State</Label>
                  <Input
                    value={stateVal}
                    onChange={(e) => setStateVal(e.target.value)}
                    placeholder="Maharashtra"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Pincode (6-Digits)</Label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="400103"
                    maxLength={6}
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <Label className="font-bold">12-Digit Aadhaar Card Number</Label>
                  <Input
                    value={aadharNumber}
                    onChange={(e) => setAadharNumber(e.target.value)}
                    placeholder="5489 1234 8901"
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* ID Proof Upload Stubs */}
              <div className="pt-3 border-t border-border/60 space-y-2">
                <span className="text-xs font-bold text-foreground">Identity Documents Upload</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl border border-dashed border-border bg-muted/20 text-center space-y-1">
                    <Upload className="w-4 h-4 mx-auto text-primary" />
                    <div className="font-bold">Profile Headshot</div>
                    <span className="text-[10px] text-emerald-500 font-bold">dr_headshot.jpg ✓</span>
                  </div>
                  <div className="p-3 rounded-xl border border-dashed border-border bg-muted/20 text-center space-y-1">
                    <Upload className="w-4 h-4 mx-auto text-primary" />
                    <div className="font-bold">Aadhaar (Front & Back)</div>
                    <span className="text-[10px] text-emerald-500 font-bold">aadhaar_doc.pdf ✓</span>
                  </div>
                  <div className="p-3 rounded-xl border border-dashed border-border bg-muted/20 text-center space-y-1">
                    <Upload className="w-4 h-4 mx-auto text-primary" />
                    <div className="font-bold">PAN Card Copy</div>
                    <span className="text-[10px] text-emerald-500 font-bold">pan_card.jpg ✓</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: Professional Qualifications */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <GraduationCap className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-extrabold text-foreground">Professional Credentials & Experience</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <Label className="font-bold">Healthcare Role</Label>
                  <select
                    value={professionalRole}
                    onChange={(e) => setProfessionalRole(e.target.value)}
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
                  <Label className="font-bold">Primary Qualification Degree</Label>
                  <Input
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    placeholder="BPT (Bachelor of Physiotherapy)"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Total Clinical Experience (Years)</Label>
                  <Input
                    type="number"
                    value={yearOfExperience}
                    onChange={(e) => setYearOfExperience(e.target.value)}
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <Label className="font-bold">Current Practice / Workplace</Label>
                  <Input
                    value={currentlyWorkingAt}
                    onChange={(e) => setCurrentlyWorkingAt(e.target.value)}
                    placeholder="Hospital / Private Practice / Freelance"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>
              </div>

              {/* Specializations Multi-Select */}
              <div className="space-y-2 pt-2">
                <Label className="font-bold text-xs">Clinical Specializations (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Musculoskeletal & Sports',
                    'Neurological Rehabilitation',
                    'Pediatric Physical Therapy',
                    'Geriatric & Post-Op Recovery',
                    'Cardiorespiratory Therapy',
                    'Women\'s Health & Pelvic Floor',
                    'Ergonomics & Postural Correction',
                  ].map((spec) => {
                    const isSelected = specializations.includes(spec);
                    return (
                      <button
                        key={spec}
                        type="button"
                        onClick={() => toggleSpecialization(spec)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {spec}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Clinic Ownership Toggle */}
              <div className="p-4 bg-muted/20 rounded-2xl space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-foreground">Do you operate your own private clinic?</div>
                    <div className="text-muted-foreground">Allows receiving in-clinic patient bookings.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={hasOwnClinic}
                    onChange={(e) => setHasOwnClinic(e.target.checked)}
                    className="h-4 w-4 rounded text-primary"
                  />
                </div>

                {hasOwnClinic && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <Label className="text-[11px] font-bold">Clinic Name</Label>
                      <Input
                        value={clinicName}
                        onChange={(e) => setClinicName(e.target.value)}
                        placeholder="Apex Physio Clinic"
                        className="h-9 mt-1 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] font-bold">Established Month</Label>
                      <Input
                        value={clinicEstablishmentMonth}
                        onChange={(e) => setClinicEstablishmentMonth(e.target.value)}
                        placeholder="January"
                        className="h-9 mt-1 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-[11px] font-bold">Established Year</Label>
                      <Input
                        value={clinicEstablishmentYear}
                        onChange={(e) => setClinicEstablishmentYear(e.target.value)}
                        placeholder="2020"
                        className="h-9 mt-1 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: Bank & UPI */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <Building2 className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-extrabold text-foreground">Payout Bank Account & UPI Setup</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <Label className="font-bold">Bank Account Type</Label>
                  <select
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full h-11 px-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium"
                  >
                    <option value="Savings">Savings Account</option>
                    <option value="Current">Current Account</option>
                    <option value="Business">Business Account</option>
                  </select>
                </div>

                <div>
                  <Label className="font-bold">Account Holder Name (as in Bank)</Label>
                  <Input
                    value={accountHolderName}
                    onChange={(e) => setAccountHolderName(e.target.value)}
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Bank Name</Label>
                  <Input
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="HDFC Bank"
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Bank Account Number</Label>
                  <Input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="50100234567890"
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <Label className="font-bold">IFSC Code</Label>
                  <Input
                    value={ifscCode}
                    onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                    placeholder="HDFC0000240"
                    className="h-11 mt-1 rounded-xl font-mono uppercase"
                  />
                </div>

                <div>
                  <Label className="font-bold">Primary UPI ID (for Instant IMPS)</Label>
                  <Input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="doctor@okhdfc"
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Service Area & Travel */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <MapPin className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-extrabold text-foreground">Operational Service Area & Commute</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <Label className="font-bold">Primary Operating City</Label>
                  <Input
                    value={serviceCity}
                    onChange={(e) => setServiceCity(e.target.value)}
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>

                <div>
                  <Label className="font-bold">Primary Commute Mode</Label>
                  <select
                    value={commuteType}
                    onChange={(e) => setCommuteType(e.target.value)}
                    className="w-full h-11 px-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium"
                  >
                    <option value="Two Wheeler (Bike / Scooter)">Two Wheeler (Bike / Scooter)</option>
                    <option value="Four Wheeler (Car)">Four Wheeler (Car)</option>
                    <option value="Public Transit (Metro / Train / Bus)">Public Transit (Metro / Train / Bus)</option>
                  </select>
                </div>

                <div>
                  <Label className="font-bold">Driving License Number</Label>
                  <Input
                    value={drivingLicenseNumber}
                    onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                    placeholder="MH-02-2018-0091234"
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <Label className="font-bold">Max Doorstep Service Radius: {serviceRadius} km</Label>
                  <input
                    type="range"
                    min={2}
                    max={25}
                    value={serviceRadius}
                    onChange={(e) => setServiceRadius(Number(e.target.value))}
                    className="w-full mt-3 accent-primary"
                  />
                </div>
              </div>

              {/* Service Pincodes Manager */}
              <div className="space-y-2 pt-2">
                <Label className="font-bold text-xs">Target Doorstep Pincodes</Label>
                <div className="flex gap-2 max-w-md">
                  <Input
                    placeholder="Add 6-digit Pincode"
                    maxLength={6}
                    value={newPincode}
                    onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                    className="h-10 rounded-xl font-mono text-xs"
                  />
                  <Button type="button" onClick={handleAddPincode} className="h-10 px-4 rounded-xl text-xs font-bold">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {targetPincodes.map((code) => (
                    <div
                      key={code}
                      className="px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold flex items-center gap-1.5"
                    >
                      <span>{code}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePincode(code)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Consents */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div className="flex items-center gap-2 pb-2 border-b border-border/60">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <h2 className="text-sm font-extrabold text-foreground">Compliance Verification & Legal Consents</h2>
              </div>

              <div className="p-4 bg-muted/30 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span>Therapist Profile Summary:</span>
                  <span className="text-primary font-mono">{fullName} ({qualification})</span>
                </div>
                <div className="text-muted-foreground">
                  Operating in <strong>{serviceCity}</strong> across <strong>{targetPincodes.length} pincodes</strong> with {yearOfExperience} years of experience.
                </div>
              </div>

              {/* Consents Checklist */}
              <div className="space-y-3 text-xs">
                {[
                  {
                    id: 'accuracy' as const,
                    label: 'I confirm all submitted professional qualifications and medical license details are authentic and accurate.',
                  },
                  {
                    id: 'terms' as const,
                    label: 'I agree to the Aries PhysioCare Provider Code of Conduct, SOPs, and Terms of Clinical Engagement.',
                  },
                  {
                    id: 'verification' as const,
                    label: 'I consent to background checks and verification by the Clinical Governance Committee.',
                  },
                  {
                    id: 'feePolicy' as const,
                    label: 'I understand the 60/40 transparent commission structure and instant IMPS settlement policy.',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-xl border border-border/60 bg-card/60 cursor-pointer hover:border-primary/40 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={consents[item.id]}
                      onChange={(e) => setConsents({ ...consents, [item.id]: e.target.checked })}
                      className="h-4 w-4 mt-0.5 rounded text-primary"
                    />
                    <span className="text-foreground leading-relaxed">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Controls */}
          <div className="pt-6 border-t border-border/60 flex items-center justify-between">
            {currentStep > 0 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isSubmitting}
                className="h-11 px-5 rounded-xl font-bold text-xs"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous Step
              </Button>
            ) : (
              <div />
            )}

            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting || (currentStep === 4 && !Object.values(consents).every(Boolean))}
              className="h-11 px-7 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-lg shadow-primary/20 flex items-center gap-1.5"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : currentStep === 4 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Submit Profile For Review
                </>
              ) : (
                <>
                  Save & Continue
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
