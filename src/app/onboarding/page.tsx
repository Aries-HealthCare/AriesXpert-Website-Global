'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useProviderAuth } from '@/services/provider-auth-context';
import { submitOnboardingStep } from '@/services/provider-api';
import {
  User2,
  Briefcase,
  CreditCard,
  MapPin,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  FileText,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STEPS = [
  { id: 1, label: 'Personal Details', icon: User2 },
  { id: 2, label: 'Qualifications', icon: Briefcase },
  { id: 3, label: 'Banking & UPI', icon: CreditCard },
  { id: 4, label: 'Service Coverage', icon: MapPin },
  { id: 5, label: 'KYC Documents', icon: FileCheck },
];

export default function ProviderOnboardingPage() {
  const router = useRouter();
  const { user, updateUserData } = useProviderAuth();

  const [currentStep, setCurrentStep] = useState(user?.onboardingStep || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Step 1 State: Personal
  const [name, setName] = useState(user?.name || `${user?.firstName || 'Dr. Rohan'} ${user?.lastName || 'Sharma'}`);
  const [dob, setDob] = useState('1994-08-15');
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [emergencyContact, setEmergencyContact] = useState('+91 98201 99882');
  const [addressLine1, setAddressLine1] = useState('Flat 502, Orchid Residency, Link Road');
  const [addressLine2, setAddressLine2] = useState('Near Don Bosco School');
  const [city, setCity] = useState(user?.city || 'Mumbai');
  const [state, setState] = useState(user?.state || 'Maharashtra');
  const [pincode, setPincode] = useState('400091');

  // Step 2 State: Professional
  const [degree, setDegree] = useState('Bachelor of Physiotherapy (BPT), MPT Ortho');
  const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || 'MH-OTPT-2018-9412');
  const [experience, setExperience] = useState(user?.experience ? String(user.experience) : '6');
  const [specialization, setSpecialization] = useState(user?.specialization || 'Musculoskeletal & Sports Rehabilitation');
  const [hospitalAffiliation, setHospitalAffiliation] = useState('Ex-Fortis Healthcare & Apollo Clinic');

  // Step 3 State: Banking
  const [accountHolderName, setAccountHolderName] = useState(name);
  const [bankName, setBankName] = useState('HDFC Bank');
  const [accountNumber, setAccountNumber] = useState('50100492817291');
  const [ifscCode, setIfscCode] = useState('HDFC0000240');
  const [panNumber, setPanNumber] = useState('ABCDE1234F');
  const [upiId, setUpiId] = useState('rohansharma@okhdfcbank');

  // Step 4 State: Coverage
  const [pincodesList, setPincodesList] = useState<string[]>(
    user?.servicePincodes && user.servicePincodes.length > 0
      ? user.servicePincodes
      : ['400091', '400092', '400067', '400068', '400053']
  );
  const [newPincodeInput, setNewPincodeInput] = useState('');
  const [transportMode, setTransportMode] = useState('Two-Wheeler (Personal Scooter/Bike)');
  const [shifts, setShifts] = useState({
    morning: true,
    afternoon: true,
    evening: true,
  });

  // Step 5 State: Documents
  const [uploadedDocs, setUploadedDocs] = useState({
    degree: 'BPT_Degree_Certificate.pdf',
    license: 'State_OTPT_Registration.pdf',
    pan: 'PAN_Card_Copy.jpg',
    aadhaar: 'Aadhaar_Front_Back.pdf',
    cheque: 'Cancelled_Cheque_HDFC.jpg',
  });
  const [certifiedTruth, setCertifiedTruth] = useState(true);

  const handleAddPincode = () => {
    if (newPincodeInput && newPincodeInput.length === 6 && !pincodesList.includes(newPincodeInput)) {
      setPincodesList([...pincodesList, newPincodeInput]);
      setNewPincodeInput('');
    }
  };

  const handleRemovePincode = (code: string) => {
    setPincodesList(pincodesList.filter((p) => p !== code));
  };

  const handleNextStep = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      if (currentStep === 1) {
        await submitOnboardingStep(1, {
          name,
          dob,
          gender,
          emergencyContact,
          address: { addressLine1, addressLine2, city, state, pincode },
        });
        updateUserData({ name, gender, city, state, onboardingStep: 2 });
        setCurrentStep(2);
      } else if (currentStep === 2) {
        await submitOnboardingStep(2, {
          degree,
          licenseNumber,
          experience: Number(experience),
          specialization,
          hospitalAffiliation,
        });
        updateUserData({ licenseNumber, experience: Number(experience), specialization, onboardingStep: 3 });
        setCurrentStep(3);
      } else if (currentStep === 3) {
        await submitOnboardingStep(3, {
          bankInfo: { accountHolderName, bankName, accountNumber, ifscCode, panNumber, upiId },
        });
        updateUserData({ onboardingStep: 4 });
        setCurrentStep(4);
      } else if (currentStep === 4) {
        await submitOnboardingStep(4, {
          servicePincodes: pincodesList,
          transportMode,
          shifts,
        });
        updateUserData({ servicePincodes: pincodesList, onboardingStep: 5 });
        setCurrentStep(5);
      } else if (currentStep === 5) {
        if (!certifiedTruth) {
          setErrorMessage('Please confirm that the uploaded clinical documents are genuine.');
          setIsLoading(false);
          return;
        }
        await submitOnboardingStep(5, {
          documents: uploadedDocs,
          isSubmittedForReview: true,
        });
        updateUserData({ status: 'UNDER_REVIEW', onboardingStatus: 'pending', onboardingStep: 5 });
        setSuccessMessage('Application submitted successfully! Your credentials are under clinical review.');
        setTimeout(() => {
          router.push('/app');
        }, 1500);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save onboarding information.');
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
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted-foreground hidden sm:inline-block">
            Logged in as: <strong className="text-foreground">{user?.email || 'dr.rohan@ariesxpert.com'}</strong>
          </span>
          <Link
            href="/app"
            className="text-xs font-bold text-primary hover:underline"
            prefetch={false}
          >
            Go to App →
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-3xl w-full mx-auto my-6">
        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {STEPS.map((s) => {
              const Icon = s.icon;
              const isCompleted = currentStep > s.id;
              const isCurrent = currentStep === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                        : isCurrent
                        ? 'bg-primary text-white ring-4 ring-primary/20 shadow-lg shadow-primary/30 scale-105'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold mt-2 hidden sm:block ${
                      isCurrent ? 'text-primary' : isCompleted ? 'text-emerald-500' : 'text-muted-foreground'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border/80 shadow-2xl rounded-3xl p-6 sm:p-10 backdrop-blur-xl relative">
          {/* Header */}
          <div className="border-b border-border/60 pb-5 mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Step {currentStep} of 5
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5">
                {STEPS.find((s) => s.id === currentStep)?.label}
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs bg-muted/80 font-bold px-3 py-1.5 rounded-full text-muted-foreground">
                {Math.round((currentStep / 5) * 100)}% Complete
              </span>
            </div>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold">Full Legal Name (as per degree)</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-bold">Date of Birth</Label>
                  <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-11 mt-1 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold">Gender</Label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-11 px-3 mt-1 bg-background border border-input rounded-xl text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-bold">Emergency Contact Number</Label>
                  <Input value={emergencyContact} onChange={(e) => setEmergencyContact(e.target.value)} className="h-11 mt-1 rounded-xl font-mono" />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold">Residential Address Line 1</Label>
                <Input value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} className="h-11 mt-1 rounded-xl" />
              </div>
              <div>
                <Label className="text-xs font-bold">Address Line 2 (Landmark)</Label>
                <Input value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} className="h-11 mt-1 rounded-xl" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs font-bold">City</Label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} className="h-11 mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-bold">State</Label>
                  <Input value={state} onChange={(e) => setState(e.target.value)} className="h-11 mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-bold">Pincode</Label>
                  <Input value={pincode} maxLength={6} onChange={(e) => setPincode(e.target.value)} className="h-11 mt-1 rounded-xl font-mono" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Qualifications */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label className="text-xs font-bold">Degree / Highest Qualification</Label>
                <Input
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  placeholder="e.g. BPT, MPT Musculoskeletal"
                  className="h-11 mt-1 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold">State Medical / OTPT Council Registration No.</Label>
                  <Input
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="e.g. MH-PT-2018-9412"
                    className="h-11 mt-1 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold">Years of Clinical Experience</Label>
                  <Input
                    type="number"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="h-11 mt-1 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold">Primary Clinical Specializations</Label>
                <Input
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  placeholder="e.g. Orthopedic Rehab, Dry Needling, Neuro Physio"
                  className="h-11 mt-1 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs font-bold">Past Hospital / Clinic Affiliations (Optional)</Label>
                <Input
                  value={hospitalAffiliation}
                  onChange={(e) => setHospitalAffiliation(e.target.value)}
                  placeholder="e.g. Fortis Hospital, Max Healthcare"
                  className="h-11 mt-1 rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Step 3: Banking & UPI Details */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span>Direct daily wallet payouts are disbursed to this registered bank account & UPI handle.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold">Account Holder Name (as per Bank)</Label>
                  <Input value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} className="h-11 mt-1 rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs font-bold">Bank Name</Label>
                  <Input value={bankName} onChange={(e) => setBankName(e.target.value)} className="h-11 mt-1 rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold">Account Number</Label>
                  <Input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="h-11 mt-1 rounded-xl font-mono" />
                </div>
                <div>
                  <Label className="text-xs font-bold">IFSC Code</Label>
                  <Input value={ifscCode} onChange={(e) => setIfscCode(e.target.value.toUpperCase())} className="h-11 mt-1 rounded-xl font-mono uppercase" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs font-bold">PAN Card Number</Label>
                  <Input value={panNumber} onChange={(e) => setPanNumber(e.target.value.toUpperCase())} className="h-11 mt-1 rounded-xl font-mono uppercase" />
                </div>
                <div>
                  <Label className="text-xs font-bold">UPI ID for Instant Payouts</Label>
                  <Input value={upiId} onChange={(e) => setUpiId(e.target.value)} className="h-11 mt-1 rounded-xl font-mono" />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Service Coverage */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <Label className="text-xs font-bold">Operating Service Pincodes</Label>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  You will receive instant visit broadcasts within these pincodes.
                </p>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter 6-digit Pincode (e.g. 400091)"
                    maxLength={6}
                    value={newPincodeInput}
                    onChange={(e) => setNewPincodeInput(e.target.value.replace(/\D/g, ''))}
                    className="h-11 font-mono rounded-xl"
                  />
                  <Button type="button" onClick={handleAddPincode} className="h-11 px-5 rounded-xl font-bold">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {pincodesList.map((code) => (
                    <span
                      key={code}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold"
                    >
                      <span>{code}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePincode(code)}
                        className="hover:text-destructive text-muted-foreground ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-xs font-bold">Primary Mode of Transport</Label>
                <select
                  value={transportMode}
                  onChange={(e) => setTransportMode(e.target.value)}
                  className="w-full h-11 px-3 mt-1 bg-background border border-input rounded-xl text-sm"
                >
                  <option value="Two-Wheeler (Personal Scooter/Bike)">Two-Wheeler (Personal Scooter/Bike)</option>
                  <option value="Four-Wheeler (Car)">Four-Wheeler (Car)</option>
                  <option value="Public Transit / Metro">Public Transit / Metro</option>
                </select>
              </div>

              <div>
                <Label className="text-xs font-bold">Available Shifts</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-input bg-muted/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shifts.morning}
                      onChange={(e) => setShifts({ ...shifts, morning: e.target.checked })}
                      className="h-4 w-4 rounded text-primary"
                    />
                    <span className="text-xs font-medium">Morning (8 AM - 12 PM)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-input bg-muted/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shifts.afternoon}
                      onChange={(e) => setShifts({ ...shifts, afternoon: e.target.checked })}
                      className="h-4 w-4 rounded text-primary"
                    />
                    <span className="text-xs font-medium">Afternoon (12 PM - 4 PM)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-input bg-muted/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={shifts.evening}
                      onChange={(e) => setShifts({ ...shifts, evening: e.target.checked })}
                      className="h-4 w-4 rounded text-primary"
                    />
                    <span className="text-xs font-medium">Evening (4 PM - 9 PM)</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Document Uploads */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="p-3 bg-muted/40 border border-border/80 rounded-xl text-xs text-muted-foreground flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary shrink-0" />
                <span>Uploaded documents are verified by the Aries Clinical Governance Committee within 24 hours.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'degree', label: 'BPT / MPT Degree Certificate', filename: uploadedDocs.degree },
                  { key: 'license', label: 'Council Registration Certificate', filename: uploadedDocs.license },
                  { key: 'pan', label: 'PAN Card Copy', filename: uploadedDocs.pan },
                  { key: 'aadhaar', label: 'Aadhaar Card (Front & Back)', filename: uploadedDocs.aadhaar },
                  { key: 'cheque', label: 'Cancelled Cheque / Passbook', filename: uploadedDocs.cheque },
                ].map((doc) => (
                  <div key={doc.key} className="p-3.5 rounded-2xl border border-border/80 bg-muted/20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold truncate">{doc.label}</div>
                        <div className="text-[10px] text-emerald-500 font-mono truncate">✓ {doc.filename}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-border/80 bg-card hover:bg-muted text-foreground"
                    >
                      Replace
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-border/60">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={certifiedTruth}
                    onChange={(e) => setCertifiedTruth(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-primary"
                  />
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    I solemnly declare that all educational certificates, registration licenses, and personal documents uploaded are true, genuine, and unexpired.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/60">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="h-11 px-5 rounded-xl text-xs font-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Previous Step
              </Button>
            ) : (
              <div />
            )}

            <Button
              type="button"
              onClick={handleNextStep}
              disabled={isLoading}
              className="h-11 px-6 rounded-xl text-xs sm:text-sm font-extrabold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/20 flex items-center gap-1.5"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : currentStep === 5 ? (
                <>
                  <span>Submit Application for Review</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Save & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
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
