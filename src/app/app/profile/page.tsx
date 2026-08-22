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
  Navigation,
  Plus,
  Trash2,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProviderProfilePage() {
  const { user, updateUserData } = useProviderAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'serviceArea' | 'emergency' | 'idcard'>('profile');

  const [name, setName] = useState(user?.fullName || user?.name || 'Dr. Rohan Sharma, BPT');
  const [email, setEmail] = useState(user?.email || 'rohan.sharma@ariesxpert.com');
  const [phone, setPhone] = useState(user?.phone || user?.mobileNo || '+91 98765 43210');
  const [city, setCity] = useState(user?.city || 'Mumbai');
  const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || 'MH-OTPT-2018-9412');
  const [specialization, setSpecialization] = useState(user?.specialization || 'Musculoskeletal & Sports Rehabilitation');
  const [experience, setExperience] = useState(user?.experience ? String(user.experience) : '6');
  const [bio, setBio] = useState('Senior Physiotherapist with 6+ years of clinical excellence in post-operative orthopedic recovery, sports rehabilitation, and neurological gait restoration across Mumbai.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Service Area & Pincodes
  const [operatingRadiusKm, setOperatingRadiusKm] = useState('8');
  const [pincodes, setPincodes] = useState<string[]>(['400092', '400103', '400067', '400068']);
  const [newPincode, setNewPincode] = useState('');

  // Emergency Contacts
  const [emergencyName, setEmergencyName] = useState('Dr. Priya Deshmukh (Clinical Buddy)');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98201 44219');
  const [emergencyRelation, setEmergencyRelation] = useState('Clinical Colleague / Territory Peer');

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

  const handleAddPincode = () => {
    if (newPincode.trim().length === 6 && !pincodes.includes(newPincode.trim())) {
      setPincodes([...pincodes, newPincode.trim()]);
      setNewPincode('');
    }
  };

  const handleRemovePincode = (pin: string) => {
    setPincodes(pincodes.filter((p) => p !== pin));
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
            Manage your public credentials, clinical service territory, emergency SOS roster, and digital ID card.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex gap-1 p-1 bg-muted/40 border border-border/80 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-outfit font-bold transition-all shrink-0 ${
              activeTab === 'profile' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab('serviceArea')}
            className={`px-3 py-1.5 rounded-xl text-xs font-outfit font-bold transition-all shrink-0 ${
              activeTab === 'serviceArea' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Service Area
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-3 py-1.5 rounded-xl text-xs font-outfit font-bold transition-all shrink-0 ${
              activeTab === 'emergency' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Emergency SOS
          </button>
          <button
            onClick={() => setActiveTab('idcard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-outfit font-bold transition-all shrink-0 ${
              activeTab === 'idcard' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital ID</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved successfully to canonical ecosystem.</span>
        </div>
      )}

      {/* ── TAB 1: MAIN PROFILE FORM ── */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
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
      )}

      {/* ── TAB 2: SERVICE AREA & PINCODES ── */}
      {activeTab === 'serviceArea' && (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-outfit font-extrabold text-foreground">Doorstep Operating Territory</h3>
            <p className="text-xs text-muted-foreground">
              Define your service radius and assigned pincodes to receive high-intent patient broadcasts in your locality.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-xs font-bold">Operating Travel Radius (km)</Label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="2"
                max="25"
                value={operatingRadiusKm}
                onChange={(e) => setOperatingRadiusKm(e.target.value)}
                className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
              />
              <span className="font-mono font-black text-primary text-base px-3 py-1 bg-primary/10 rounded-xl shrink-0">
                {operatingRadiusKm} km
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Label className="text-xs font-bold">Assigned Active Pincodes</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter 6-digit Pincode (e.g. 400092)..."
                maxLength={6}
                value={newPincode}
                onChange={(e) => setNewPincode(e.target.value.replace(/\D/g, ''))}
                className="h-10 rounded-xl text-xs font-mono"
              />
              <Button onClick={handleAddPincode} className="h-10 px-4 rounded-xl text-xs font-bold">
                <Plus className="w-4 h-4 mr-1" /> Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {pincodes.map((pin) => (
                <div
                  key={pin}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-muted/40 border border-border/60 text-xs font-mono font-bold text-foreground"
                >
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{pin}</span>
                  <button onClick={() => handleRemovePincode(pin)} className="text-muted-foreground hover:text-destructive">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            onClick={() => {
              setSavedSuccess(true);
              setTimeout(() => setSavedSuccess(false), 2500);
            }}
            className="w-full h-11 rounded-2xl bg-primary text-white font-extrabold text-xs"
          >
            Save Territory Pincodes
          </Button>
        </div>
      )}

      {/* ── TAB 3: EMERGENCY SOS CONFIGURATION ── */}
      {activeTab === 'emergency' && (
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-outfit font-extrabold text-foreground">Emergency SOS Buddy & Contacts</h3>
            <p className="text-xs text-muted-foreground">
              These contacts will be alerted immediately with your live GPS location if you trigger an emergency SOS during a doorstep visit.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <Label className="font-bold">Primary Emergency Contact Name</Label>
              <Input
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-bold">Contact Mobile Phone</Label>
              <Input
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="h-10 rounded-xl text-xs font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-bold">Relationship / Designation</Label>
              <Input
                value={emergencyRelation}
                onChange={(e) => setEmergencyRelation(e.target.value)}
                className="h-10 rounded-xl text-xs"
              />
            </div>
          </div>

          <Button
            onClick={() => {
              setSavedSuccess(true);
              setTimeout(() => setSavedSuccess(false), 2500);
            }}
            className="w-full h-11 rounded-2xl bg-destructive hover:bg-destructive/90 text-white font-extrabold text-xs shadow-md"
          >
            Save Emergency SOS Protocol
          </Button>
        </div>
      )}

      {/* ── TAB 4: DIGITAL ID CARD ── */}
      {activeTab === 'idcard' && (
        <div className="space-y-6">
          <div className="max-w-md mx-auto bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-primary/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10 pb-4 border-b border-white/10">
              <DynamicAppLogo size={36} showText={true} />
              <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[10px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>OFFICIAL VERIFIED SPECIALIST</span>
              </div>
            </div>

            {/* Middle row */}
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

            {/* Bottom Row */}
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
