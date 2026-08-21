'use client';

import React, { useState } from 'react';
import { useProviderAuth } from '@/services/provider-auth-context';
import { DynamicAppLogo } from '@/components/ui/dynamic-app-logo';
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
  Stethoscope,
  QrCode,
  Download,
  Share2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProviderProfilePage() {
  const { user, updateUserData } = useProviderAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'idcard'>('profile');

  const [name, setName] = useState(user?.fullName || user?.name || 'Dr. Rohan Sharma, BPT');
  const [email, setEmail] = useState(user?.email || 'rohan.sharma@ariesxpert.com');
  const [phone, setPhone] = useState(user?.phone || user?.mobileNo || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'Mumbai');
  const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || 'MH-OTPT-2018-9412');
  const [specialization, setSpecialization] = useState(user?.specialization || 'Musculoskeletal & Sports Rehabilitation');
  const [experience, setExperience] = useState(user?.experience ? String(user.experience) : '6');
  const [bio, setBio] = useState('Senior Physiotherapist with 6+ years of clinical excellence in post-operative orthopedic recovery, sports rehabilitation, and neurological gait restoration across Mumbai.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const axId = user?.axId || user?.therapistId || 'AX-IND-4892';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserData({
      fullName: name,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-outfit font-extrabold tracking-tight">Therapist Profile & ID</h1>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your public bio, council credentials, and digital specialist identity card.
          </p>
        </div>

        {/* Tab Toggle: Edit Profile vs Digital ID Card */}
        <div className="flex gap-1 p-1 bg-muted/40 border border-border/80 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-outfit font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab('idcard')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-outfit font-bold transition-all ${
              activeTab === 'idcard'
                ? 'bg-primary text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital ID Card</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved successfully to canonical ecosystem.</span>
        </div>
      )}

      {activeTab === 'profile' ? (
        /* Main Profile Form */
        <form onSubmit={handleSave} className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          {/* Avatar & Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-border/60">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-primary text-white text-2xl font-outfit font-black flex items-center justify-center shadow-lg shadow-primary/20">
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
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-outfit font-extrabold text-foreground">{name}</h2>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Verified Doctor ✓
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{specialization}</p>
              <p className="text-[11px] font-mono text-primary font-bold mt-1">ID: {axId}</p>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Full Name & Honorifics</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-2xl text-sm"
                placeholder="Dr. Full Name, Degree"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-2xl text-sm"
                placeholder="doctor@example.com"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Registered Mobile Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 rounded-2xl text-sm font-mono"
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Primary Practice City</Label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 rounded-2xl text-sm"
                placeholder="Mumbai, Bangalore, etc."
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold">State Council Registration No</Label>
              <Input
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                className="h-11 rounded-2xl text-sm font-mono"
                placeholder="e.g. MH-OTPT-2018-9412"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold">Years of Clinical Experience</Label>
              <Input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="h-11 rounded-2xl text-sm"
                min="0"
                max="50"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold">Clinical Specialization</Label>
            <Input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="h-11 rounded-2xl text-sm"
              placeholder="e.g., Musculoskeletal & Sports, Neuro Rehabilitation"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-bold">Professional Biography (Public on Patient App)</Label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-sm p-3.5 rounded-2xl border border-border/80 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Tell patients about your expertise, treatment philosophy, and clinical milestones..."
            />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              className="h-11 px-6 rounded-2xl bg-primary hover:bg-primary/95 text-white font-outfit font-extrabold text-xs shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Information</span>
            </Button>
          </div>
        </form>
      ) : (
        /* Digital ID Card — matches Flutter digital_id_card.dart */
        <div className="space-y-6">
          <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-primary/40 relative overflow-hidden">
            {/* Ambient metallic sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            {/* Top row: Brand logo & Verified seal */}
            <div className="flex items-center justify-between relative z-10 pb-4 border-b border-white/10">
              <DynamicAppLogo size={36} showText={true} />
              <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL VERIFIED SPECIALIST</span>
              </div>
            </div>

            {/* Middle row: Doctor headshot, name, council reg */}
            <div className="flex items-center gap-4 my-6 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-primary text-white text-2xl font-outfit font-black flex items-center justify-center shadow-lg border-2 border-white/20 shrink-0">
                {name.charAt(0) || 'D'}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-outfit font-extrabold tracking-tight truncate">{name}</h3>
                <p className="text-xs text-slate-300 font-medium truncate">{specialization}</p>
                <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-primary font-bold">
                  <span>ID: {axId}</span>
                </div>
              </div>
            </div>

            {/* Council & Location Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs relative z-10">
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Council Reg No</p>
                <p className="font-mono font-bold text-white mt-0.5">{licenseNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Territory</p>
                <p className="font-bold text-white mt-0.5">{city}, India</p>
              </div>
            </div>

            {/* Bottom Row: QR Code & Signature Seal */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white rounded-xl">
                  <QrCode className="w-8 h-8 text-black" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-300">Scan to Verify Doctor</p>
                  <p className="text-[9px] text-slate-400 font-mono">api.ariesxpert.com/verify/{axId}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-400 uppercase tracking-wider">Clinical Council</p>
                <p className="text-xs font-outfit font-extrabold text-accent">Authorized Specialist</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-2xl text-xs font-bold"
              onClick={() => alert(`Digital ID Card link copied: https://ariesphysiocare.com/verify/${axId}`)}
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share Digital ID
            </Button>
            <Button
              className="rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold text-xs"
              onClick={() => window.print()}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Print / Save ID Card
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
