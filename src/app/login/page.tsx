'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { initiateAnonymousSignIn, initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Globe,
  Fingerprint,
  Smartphone,
  ShieldCheck,
  Check,
  Clock,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Particle structure for premium floating background animation
interface GoldParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'credentials' | 'otp' | 'biometric'>('credentials');

  // Credentials Form State
  const [email, setEmail] = useState('admin@arieshealth.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);

  // OTP Form State
  const [mobileNumber, setMobileNumber] = useState('98765 43210');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(59);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Biometric State
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // Common State
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('EN');

  // Interactive 3D Card Tilt
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Background floating stardust particles
  const [particles, setParticles] = useState<GoldParticle[]>([]);

  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Initialize floating stardust particles
  useEffect(() => {
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  // OTP Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTab === 'otp' && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, otpTimer]);

  // Card Mouse Tilt Handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    setRotateX(((centerY - y) / centerY) * 4);
    setRotateY(((x - centerX) / centerX) * 4);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (email && password) {
        initiateEmailSignIn(auth, email, password);
      } else {
        initiateAnonymousSignIn(auth);
      }
      setTimeout(() => {
        router.push('/portal');
      }, 800);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
      });
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value.slice(-1);
    setOtpDigits(newOtp);

    // Auto focus next input box
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleBiometricScan = () => {
    if (isScanning || scanComplete) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      toast({
        title: 'Biometric Authenticated',
        description: 'Fingerprint verified successfully. Redirecting...',
      });
      setTimeout(() => {
        initiateAnonymousSignIn(auth);
        router.push('/portal');
      }, 1000);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col items-center justify-center relative overflow-hidden px-4 py-8 select-none">

      {/* ── PREMIER BACKGROUND ANIMATION: Dynamic Ambient Radial Blurs & Floating Gold Dust ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

        {/* Animated Radial Color Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] bg-amber-600/15 rounded-full blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] bg-purple-900/20 rounded-full blur-[150px]"
        />

        {/* Floating Gold Stardust Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gradient-to-t from-amber-400 to-amber-200"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: '0 0 6px rgba(255, 215, 0, 0.8)',
            }}
            animate={{
              y: [-20, -120, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Decorative Gold Orbital Wave Curves */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 200 Q 400 -50 900 300 T 1900 600" fill="none" stroke="url(#gold-radial-1)" strokeWidth="1.2" />
          <path d="M-200 600 Q 500 200 1200 800 T 2200 400" fill="none" stroke="url(#gold-radial-2)" strokeWidth="0.8" />
          <defs>
            <linearGradient id="gold-radial-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f3d476" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4a3610" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="gold-radial-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── MAIN LUXURY CARD CONTAINER (FIXED DIMENSIONS: H-580px, Never resizes on tab change) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="w-full max-w-[1040px] h-[580px] gold-shiny-border z-10 my-auto"
      >
        <div className="bg-[#0b101d]/90 backdrop-blur-2xl rounded-[1.4rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-full">

          {/* ── LEFT PANEL: AriesXpert Brand & Logo Image ── */}
          <div className="lg:col-span-5 relative bg-gradient-to-b from-[#090d18] via-[#0d1425] to-[#070911] p-8 lg:p-10 flex flex-col justify-between items-center text-center border-b lg:border-b-0 lg:border-r border-amber-500/20 overflow-hidden h-full">

            {/* Background Decorative Gold Waves */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50 0 C 150 150, 250 100, 450 300" stroke="#ffd700" strokeWidth="1" />
                <path d="M-50 50 C 150 200, 250 150, 450 350" stroke="#d4af37" strokeWidth="0.7" />
                <path d="M-50 100 C 150 250, 250 200, 450 400" stroke="#f3d476" strokeWidth="0.5" strokeDasharray="4 4" />
                <path d="M-50 200 C 200 450, 250 350, 450 600" stroke="#d4af37" strokeWidth="0.8" />
              </svg>
            </div>

            <div className="w-full my-auto flex flex-col items-center z-10 py-4">

              {/* Gold Circular Badge Frame with /public/ariesxpert-logo.png Image */}
              <div className="relative mb-6 group">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-600/30 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] bg-gradient-to-tr from-amber-600 via-amber-200 to-amber-700 shadow-[0_0_35px_rgba(212,175,55,0.4)]">
                  <div className="w-full h-full rounded-full bg-gradient-to-b from-[#141b2d] to-[#080b14] flex items-center justify-center p-3 border border-amber-400/40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent opacity-60" />

                    {/* Official AriesXpert Logo Image */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src="/ariesxpert-logo.png"
                        alt="AriesXpert Logo"
                        fill
                        className="object-contain p-2 drop-shadow-[0_4px_20px_rgba(255,215,0,0.6)]"
                        priority
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Typography */}
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 font-headline uppercase mb-1">
                ARIESXPERT
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-500/60" />
                <span className="text-[11px] font-bold tracking-[0.3em] text-amber-300/80 uppercase">
                  ADMIN CONTROL
                </span>
                <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-500/60" />
              </div>

              <p className="text-xs sm:text-sm text-slate-400 max-w-[240px] leading-relaxed font-body">
                Secure access to your healthcare ecosystem
              </p>
            </div>

            {/* Security Badge */}
            <div className="z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/20 text-amber-300/80 text-[11px] font-medium tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Enterprise Grade Security</span>
            </div>
          </div>

          {/* ── RIGHT PANEL: Fixed Height Content Area (No Layout Shift) ── */}
          <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between bg-[#0b101d]/60 relative h-full">

            {/* Header: Title & Language Selector */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 font-headline">
                  {activeTab === 'credentials' && (
                    <>Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Back</span></>
                  )}
                  {activeTab === 'otp' && (
                    <>Verify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Number</span></>
                  )}
                  {activeTab === 'biometric' && (
                    <>Biometric <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Login</span></>
                  )}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {activeTab === 'credentials' && 'Sign in to continue to your dashboard'}
                  {activeTab === 'otp' && 'Enter the OTP sent to your mobile number'}
                  {activeTab === 'biometric' && 'Place your finger on the scanner to continue'}
                </p>
              </div>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLanguage((l) => (l === 'EN' ? 'HI' : 'EN'))}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141b2d] border border-slate-700/60 hover:border-amber-500/40 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* 3-Tab Selector Pill Container */}
            <div className="grid grid-cols-3 p-1 rounded-xl bg-[#121828] border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('credentials')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  activeTab === 'credentials'
                    ? 'gold-tab-active'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Credentials</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('otp')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  activeTab === 'otp'
                    ? 'gold-tab-active'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>OTP</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('biometric')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
                  activeTab === 'biometric'
                    ? 'gold-tab-active'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Fingerprint className="w-3.5 h-3.5" />
                <span>Biometric</span>
              </button>
            </div>

            {/* ── FIXED HEIGHT FORM CONTENT CONTAINER (H-340px: No Card Resizing Ever) ── */}
            <div className="h-[340px] relative overflow-hidden flex flex-col justify-center">
              <AnimatePresence mode="wait">

                {/* ── TAB 1: CREDENTIALS LOGIN ── */}
                {activeTab === 'credentials' && (
                  <motion.form
                    key="credentials-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleEmailLogin}
                    className="space-y-4 w-full my-auto"
                  >
                    {/* Corporate Email Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Corporate Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Mail className="w-4 h-4 text-amber-500/70" />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="admin@arieshealth.com"
                          className="w-full pl-10 pr-4 py-3 bg-[#131a2b] border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                          <Lock className="w-4 h-4 text-amber-500/70" />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-10 pr-11 py-3 bg-[#131a2b] border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-amber-400 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Options Row */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300 hover:text-slate-100">
                        <div
                          onClick={() => setRememberDevice(!rememberDevice)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            rememberDevice
                              ? 'bg-amber-500 border-amber-400 text-slate-950'
                              : 'border-slate-600 bg-[#131a2b]'
                          }`}
                        >
                          {rememberDevice && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>Remember this device</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => toast({ title: 'Password Reset', description: 'Reset link sent to your email.' })}
                        className="text-amber-400/90 hover:text-amber-300 font-medium hover:underline transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Gold Metallic Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-extrabold mt-4"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>SIGN IN</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}

                {/* ── TAB 2: OTP LOGIN ── */}
                {activeTab === 'otp' && (
                  <motion.form
                    key="otp-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleEmailLogin}
                    className="space-y-4 w-full my-auto"
                  >
                    {/* Mobile Number Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Mobile Number</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-2.5 bg-[#131a2b] border border-slate-700/80 rounded-xl text-sm font-semibold text-slate-200 shrink-0">
                          <span className="text-base leading-none">🇮🇳</span>
                          <span>+91</span>
                          <ChevronDown className="w-3 h-3 text-slate-400" />
                        </div>
                        <input
                          type="tel"
                          required
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="98765 43210"
                          className="w-full px-4 py-2.5 bg-[#131a2b] border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200"
                        />
                      </div>
                      <p className="text-[11px] text-amber-400/70 flex items-center gap-1">
                        <Check className="w-3 h-3" /> We will send you a 6-digit OTP
                      </p>
                    </div>

                    {/* 6 Digit OTP Inputs */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">Enter OTP</label>
                      <div className="grid grid-cols-6 gap-2 sm:gap-3">
                        {otpDigits.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              otpInputRefs.current[index] = el;
                            }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-full h-11 text-center text-lg font-bold bg-[#131a2b] border border-slate-700/80 rounded-xl text-amber-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Timer & Resend Row */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>
                          OTP expires in <strong className="text-amber-300">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</strong>
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setOtpTimer(59);
                          toast({ title: 'OTP Resent', description: 'A new 6-digit code has been sent.' });
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold hover:underline transition-colors"
                      >
                        Resend OTP
                      </button>
                    </div>

                    {/* Remember Device Option */}
                    <div className="flex items-center text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                        <div
                          onClick={() => setRememberDevice(!rememberDevice)}
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            rememberDevice
                              ? 'bg-amber-500 border-amber-400 text-slate-950'
                              : 'border-slate-600 bg-[#131a2b]'
                          }`}
                        >
                          {rememberDevice && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>Remember this device</span>
                      </label>
                    </div>

                    {/* Gold Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl gold-button flex items-center justify-center gap-2 text-sm uppercase tracking-wider font-extrabold mt-2"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>SIGN IN</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}

                {/* ── TAB 3: BIOMETRIC LOGIN ── */}
                {activeTab === 'biometric' && (
                  <motion.div
                    key="biometric-view"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center justify-center space-y-4 my-auto w-full"
                  >
                    {/* Animated Fingerprint Scanner Widget */}
                    <div
                      onClick={handleBiometricScan}
                      className={`relative w-32 h-32 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 ${
                        isScanning ? 'scale-105' : ''
                      }`}
                    >
                      {/* Pulse Ring */}
                      <div className="absolute inset-0 rounded-full border border-amber-500/40 fingerprint-scanner" />
                      <div className="absolute -inset-2 rounded-full border border-amber-400/20 animate-ping opacity-30 pointer-events-none" />

                      {/* Inner Circular Frame */}
                      <div className="w-28 h-28 rounded-full bg-gradient-to-b from-[#141c2e] to-[#0a0e17] border-2 border-amber-500/60 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.25)] relative overflow-hidden">

                        {/* Scanning Sweep Line Animation */}
                        {isScanning && (
                          <motion.div
                            initial={{ y: -45 }}
                            animate={{ y: 45 }}
                            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1 }}
                            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_15px_#ffd700]"
                          />
                        )}

                        {/* Fingerprint Gold Vector */}
                        <Fingerprint
                          className={`w-16 h-16 transition-all duration-500 ${
                            scanComplete
                              ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]'
                              : isScanning
                              ? 'text-amber-200 drop-shadow-[0_0_25px_rgba(255,215,0,0.9)] animate-pulse'
                              : 'text-amber-400/90 drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Status & Instruction Text */}
                    <div className="text-center space-y-1">
                      <p className="text-sm font-bold text-amber-300 tracking-wide">
                        {scanComplete ? 'Authentication Successful!' : isScanning ? 'Scanning Fingerprint...' : 'Ready to Scan'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {scanComplete ? 'Redirecting to patient portal' : 'Touch the fingerprint sensor'}
                      </p>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Footer Notice */}
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400/90">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {activeTab === 'biometric'
                  ? 'Secure your access with biometric authentication'
                  : 'Secured with enterprise-grade encryption'}
              </span>
            </div>

          </div>

        </div>
      </motion.div>

      {/* Copyright Footer */}
      <footer className="mt-8 text-center text-[11px] text-slate-500 tracking-wide z-10">
        © 2026 Aries Healthcare International. All rights reserved.
      </footer>

    </div>
  );
}
