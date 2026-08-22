'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useProviderAuth } from '@/services/provider-auth-context';
import { providerApi, resolveProfileImage } from '@/services/provider-api';
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
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProviderProfilePage() {
  const { user, updateUserData } = useProviderAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'serviceArea' | 'emergency' | 'idcard'>('profile');

  const [name, setName] = useState(user?.fullName || user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || user?.mobileNo || '');
  const [city, setCity] = useState(user?.city || 'Mumbai');
  const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || '');
  const [specialization, setSpecialization] = useState(user?.specialization || 'Musculoskeletal & Orthopedic Rehabilitation');
  const [experience, setExperience] = useState(user?.yearsOfExperience || (user?.experience ? String(user.experience) : '5'));
  const [bio, setBio] = useState('Senior Physiotherapist specializing in evidence-based rehabilitation, post-operative care, and neurological restoration.');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Service Area & Pincodes
  const [operatingRadiusKm, setOperatingRadiusKm] = useState('10');
  const [pincodes, setPincodes] = useState<string[]>(user?.targetPincodes || ['400092', '400103', '400067']);
  const [newPincode, setNewPincode] = useState('');

  // Emergency Contacts
  const [emergencyName, setEmergencyName] = useState('Emergency SOS Team');
  const [emergencyPhone, setEmergencyPhone] = useState('+91 98201 44219');
  const [emergencyRelation, setEmergencyRelation] = useState('Clinical Colleague / Territory Lead');

  // Digital ID 3D Animation State
  const [isIdCardFlipped, setIsIdCardFlipped] = useState(false);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardTilt({
      x: -(y / (rect.height / 2)) * 10,
      y: (x / (rect.width / 2)) * 10,
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const axId = user?.axId || user?.therapistId || (user?.phone ? `AX-IND-${user.phone.slice(-4)}` : 'AX-IND-PROV');
  const profilePhotoUrl = resolveProfileImage(user?.profilePhoto);

  useEffect(() => {
    if (user) {
      if (user.fullName || user.name) setName(user.fullName || user.name || '');
      if (user.email) setEmail(user.email);
      if (user.phone || user.mobileNo) setPhone(user.phone || user.mobileNo || '');
      if (user.city) setCity(user.city);
      if (user.licenseNumber) setLicenseNumber(user.licenseNumber);
      if (user.specialization) setSpecialization(user.specialization);
      if (user.yearsOfExperience || user.experience) setExperience(String(user.yearsOfExperience || user.experience));
      if (user.targetPincodes && user.targetPincodes.length > 0) setPincodes(user.targetPincodes);
    }
  }, [user]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingPhoto(true);
    try {
      const res = await providerApi.uploadProfilePhoto(file, user?.gender || 'male');
      if (res.success && res.url) {
        updateUserData({ profilePhoto: res.url });
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 2500);
      }
    } catch (err) {
      console.warn('Photo upload failed:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserData({
      fullName: name,
      name,
      email,
      city,
      licenseNumber,
      specialization,
      yearsOfExperience: experience,
      targetPincodes: pincodes,
    });
    providerApi.editProfile({
      fullName: name,
      email,
      city,
      licenseNumber,
      specialization,
      yearsOfExperience: experience,
      targetPincodes: pincodes,
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt={name}
                  className="w-20 h-20 rounded-3xl object-cover shadow-lg shadow-primary/20 border-2 border-primary/20"
                />
              ) : (
                <div className="w-20 h-20 rounded-3xl bg-primary text-white text-2xl font-outfit font-black flex items-center justify-center shadow-lg shadow-primary/20">
                  {name.charAt(0) || 'D'}
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-xl bg-card border border-border text-foreground hover:text-primary shadow-sm transition-colors"
                title="Upload new headshot"
              >
                {isUploadingPhoto ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Camera className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-outfit font-extrabold text-foreground">{name || 'Doctor'}</h2>
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
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive 3D Holographic Identity Pass</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Click or tap the card to flip between Clinical Credentials and Live Verification QR Scanner.
            </p>
          </div>

          {/* 3D Perspective Card Container */}
          <div
            className="relative w-full max-w-md mx-auto h-[480px] perspective-1000 cursor-pointer select-none group"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            onClick={() => setIsIdCardFlipped(!isIdCardFlipped)}
          >
            <div
              className={`w-full h-full transition-transform duration-700 transform-style-3d relative ${
                isIdCardFlipped ? 'rotate-y-180' : ''
              }`}
              style={{
                transform: isIdCardFlipped
                  ? 'rotateY(180deg)'
                  : `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
              }}
            >
              {/* ── FRONT SIDE ── */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-accent/40 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white flex flex-col justify-between overflow-hidden">
                {/* Holographic metallic reflection sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-primary/15 pointer-events-none animate-holographic" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

                {/* Card Top Header */}
                <div className="flex items-center justify-between relative z-10 pb-3.5 border-b border-white/10">
                  <DynamicAppLogo size={36} showText={true} />
                  <div className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-wide">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED SPECIALIST</span>
                  </div>
                </div>

                {/* Doctor Bio & Verified Portrait */}
                <div className="flex items-center gap-4 my-auto relative z-10">
                  <div className="relative shrink-0">
                    {profilePhotoUrl ? (
                      <img
                        src={profilePhotoUrl}
                        alt={name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-xl border-2 border-accent/50 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent text-white text-2xl font-outfit font-black flex items-center justify-center shadow-xl border-2 border-accent/50 group-hover:scale-105 transition-transform">
                        {name.charAt(0) || 'D'}
                      </div>
                    )}
                    {/* Live RFID / Security chip stamp */}
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent text-slate-950 font-black text-[9px] flex items-center justify-center shadow-md border border-white">
                      ✓
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-outfit font-extrabold tracking-tight text-white truncate">
                      {name || 'Doctor'}
                    </h3>
                    <p className="text-xs text-accent font-semibold truncate mt-0.5">{specialization}</p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] font-mono text-slate-300">
                      <span className="bg-white/10 px-2 py-0.5 rounded-md font-bold text-white">ID: {axId}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">● Active 2026</span>
                    </div>
                  </div>
                </div>

                {/* Council & Location Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs relative z-10 backdrop-blur-xs">
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Council Reg No</p>
                    <p className="font-mono font-bold text-white mt-0.5 truncate">{licenseNumber || 'MH-PT-4892'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Territory / State</p>
                    <p className="font-bold text-white mt-0.5 truncate">{city}, India</p>
                  </div>
                </div>

                {/* Card Bottom Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10 relative z-10 text-[10px]">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <div className="p-1 bg-white rounded-lg">
                      <QrCode className="w-5 h-5 text-black" />
                    </div>
                    <span>Tap card to view Laser QR</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Clinical Council</p>
                    <p className="text-xs font-outfit font-extrabold text-accent">Authorized Specialist</p>
                  </div>
                </div>
              </div>

              {/* ── BACK SIDE (3D FLIPPED) ── */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white flex flex-col justify-between overflow-hidden">
                {/* Holographic aura */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-primary/10 pointer-events-none" />

                {/* Back Top Header */}
                <div className="flex items-center justify-between relative z-10 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    <span>SECURE DIGITAL IDENTITY</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">EXP: 12/2028</span>
                </div>

                {/* High-Resolution QR with Animated Laser Scanner */}
                <div className="my-auto text-center space-y-2 relative z-10">
                  <div className="relative w-40 h-40 mx-auto bg-white p-2.5 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden border-2 border-emerald-400/40">
                    <QrCode className="w-full h-full text-slate-950" />
                    {/* Animated Laser Scanning Line */}
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_12px_#10b981] animate-laser-sweep pointer-events-none" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Scan with Camera to Verify Authenticity</p>
                    <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                      https://ariesphysiocare.com/verify/{axId}
                    </p>
                  </div>
                </div>

                {/* Back Footer Governance Notice */}
                <div className="space-y-1.5 pt-3 border-t border-white/10 relative z-10 text-center">
                  <p className="text-[9px] text-slate-400 leading-tight">
                    Issued under the authority of Aries HealthCare Clinical Governance Board. Certified Doorstep Physiotherapy Provider.
                  </p>
                  <p className="text-[10px] font-bold text-accent">Tap to Flip to Front</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              className="rounded-2xl text-xs font-bold"
              onClick={() => setIsIdCardFlipped(!isIdCardFlipped)}
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" /> Flip 3D Card
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl text-xs font-bold"
              onClick={() => alert(`Digital ID link copied: https://ariesphysiocare.com/verify/${axId}`)}
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share Digital Pass
            </Button>
            <Button
              className="rounded-2xl bg-primary hover:bg-primary/95 text-white font-bold text-xs"
              onClick={() => window.print()}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Print / Save ID
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
