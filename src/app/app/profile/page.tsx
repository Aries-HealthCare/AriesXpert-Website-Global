'use client';

import React, { useState } from 'react';
import { useProviderAuth } from '@/services/provider-auth-context';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  ShieldCheck,
  Camera,
  Save,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProviderProfilePage() {
  const { user, updateUserData } = useProviderAuth();

  const [name, setName] = useState(user?.name || `${user?.firstName || 'Dr. Rohan'} ${user?.lastName || 'Sharma, BPT'}`);
  const [email, setEmail] = useState(user?.email || 'rohan.sharma@ariesxpert.com');
  const [phone, setPhone] = useState(user?.mobileNumber || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'Mumbai');
  const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || 'MH-OTPT-2018-9412');
  const [specialization, setSpecialization] = useState(user?.specialization || 'Musculoskeletal & Sports Rehabilitation');
  const [experience, setExperience] = useState(user?.experience ? String(user.experience) : '6');
  const [bio, setBio] = useState('Senior Physiotherapist with 6+ years of clinical excellence in post-operative orthopedic recovery, sports rehabilitation, and neurological gait restoration across Mumbai.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserData({
      name,
      email,
      city,
      licenseNumber,
      specialization,
      experience: Number(experience),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Therapist Profile</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your public bio, council credentials, and practice information.
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full">
          {user?.axId || 'AX-IND-4892'}
        </span>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved successfully to canonical ecosystem.</span>
        </div>
      )}

      {/* Main Profile Card */}
      <form onSubmit={handleSave} className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        {/* Avatar & Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-border/60">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-primary text-white text-2xl font-extrabold flex items-center justify-center shadow-lg">
              {name.charAt(0) || 'D'}
            </div>
            <button
              type="button"
              className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-card border border-border text-foreground hover:text-primary shadow-sm"
              title="Upload new headshot"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-foreground">{name}</h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                Verified Doctor ✓
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{specialization}</p>
            <div className="text-[11px] text-muted-foreground mt-1 font-mono">
              Council Reg: <strong>{licenseNumber}</strong> • {experience} Years Exp
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="h-11 mt-1 rounded-xl" />
            </div>
            <div>
              <Label className="font-bold">Email Address</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 mt-1 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">Mobile Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 mt-1 rounded-xl font-mono" />
            </div>
            <div>
              <Label className="font-bold">Base City</Label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} className="h-11 mt-1 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label className="font-bold">State Council Registration No.</Label>
              <Input value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} className="h-11 mt-1 rounded-xl font-mono" />
            </div>
            <div>
              <Label className="font-bold">Years of Experience</Label>
              <Input value={experience} onChange={(e) => setExperience(e.target.value)} className="h-11 mt-1 rounded-xl" />
            </div>
          </div>

          <div>
            <Label className="font-bold">Specialization</Label>
            <Input value={specialization} onChange={(e) => setSpecialization(e.target.value)} className="h-11 mt-1 rounded-xl" />
          </div>

          <div>
            <Label className="font-bold">Professional Bio (Displayed on Patient Quotations)</Label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 mt-1 bg-background border border-input rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border/60 flex justify-end">
          <Button type="submit" className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/95 text-white font-extrabold text-xs shadow-md flex items-center gap-2">
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
