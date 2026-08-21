'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { providerApi, MobileExpertProfile } from './provider-api';

interface ProviderAuthContextType {
  user: MobileExpertProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  dutyStatus: boolean;
  toggleDutyStatus: () => Promise<void>;
  loginWithPhoneOtp: (phone: string, otp: string) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
  updateUserData: (data: Partial<MobileExpertProfile>) => void;
  refreshProfile: () => Promise<void>;
}

const ProviderAuthContext = createContext<ProviderAuthContextType | undefined>(undefined);

export function ProviderAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MobileExpertProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dutyStatus, setDutyStatus] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Restore session on mount
    const token = providerApi.getToken();
    const cached = localStorage.getItem('expert_user_data');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setUser(parsed);
        setDutyStatus(!!parsed.isTherapistActive);
      } catch (_) {}
    } else if (token) {
      // Default initial mock therapist if token exists
      const defaultUser: MobileExpertProfile = {
        _id: 'exp_rohan_sharma_4892',
        fullName: 'Dr. Rohan Sharma, BPT',
        firstName: 'Dr. Rohan',
        lastName: 'Sharma',
        email: 'rohan.sharma@ariesxpert.com',
        phone: '9876543210',
        mobileNo: '9876543210',
        city: 'Mumbai',
        onboardingStep: 5,
        status: 'Active',
        isTherapistActive: true,
        walletBalance: 14850,
        totalEarnings: 86400,
        completedVisitsCount: 94,
        axId: 'AX-IND-4892',
        rating: 4.95,
      };
      setUser(defaultUser);
      setDutyStatus(true);
    }
    setIsLoading(false);
  }, []);

  const refreshProfile = async () => {
    if (!user?._id) return;
    const res = await providerApi.refreshUser(user._id);
    if (res.success && res.result) {
      setUser(res.result);
      setDutyStatus(!!res.result.isTherapistActive);
      localStorage.setItem('expert_user_data', JSON.stringify(res.result));
    }
  };

  const loginWithPhoneOtp = async (phone: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    const res = await providerApi.verifyOTP(phone, otp);
    setIsLoading(false);
    if (res.success) {
      const userData: MobileExpertProfile = res.result || {
        _id: 'exp_' + Date.now(),
        fullName: 'Dr. Rohan Sharma, BPT',
        firstName: 'Dr. Rohan',
        lastName: 'Sharma',
        phone: phone.replace(/\D/g, '').slice(-10),
        email: 'therapist@ariesxpert.com',
        city: 'Mumbai',
        onboardingStep: 5,
        status: 'Active',
        isTherapistActive: true,
        walletBalance: 14850,
        totalEarnings: 86400,
        completedVisitsCount: 94,
        axId: 'AX-IND-4892',
        rating: 4.95,
      };
      setUser(userData);
      setDutyStatus(!!userData.isTherapistActive);
      localStorage.setItem('expert_user_data', JSON.stringify(userData));

      if (userData.onboardingStep !== undefined && userData.onboardingStep < 4) {
        router.push('/onboarding');
      } else {
        router.push('/app');
      }
      return true;
    }
    return false;
  };

  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    setIsLoading(true);
    const res = await providerApi.loginFromEmail(email, pass);
    setIsLoading(false);
    if (res.success) {
      const userData: MobileExpertProfile = res.result || {
        _id: 'exp_' + Date.now(),
        fullName: 'Dr. Rohan Sharma, BPT',
        firstName: 'Dr. Rohan',
        lastName: 'Sharma',
        email,
        phone: '9876543210',
        city: 'Mumbai',
        onboardingStep: 5,
        status: 'Active',
        isTherapistActive: true,
        walletBalance: 14850,
        totalEarnings: 86400,
        completedVisitsCount: 94,
        axId: 'AX-IND-4892',
        rating: 4.95,
      };
      setUser(userData);
      setDutyStatus(!!userData.isTherapistActive);
      localStorage.setItem('expert_user_data', JSON.stringify(userData));

      if (userData.onboardingStep !== undefined && userData.onboardingStep < 4) {
        router.push('/onboarding');
      } else {
        router.push('/app');
      }
      return true;
    }
    return false;
  };

  const toggleDutyStatus = async () => {
    const next = !dutyStatus;
    setDutyStatus(next);
    if (user?._id) {
      await providerApi.setTherapistActive(user._id, next);
      const updated = { ...user, isTherapistActive: next };
      setUser(updated);
      localStorage.setItem('expert_user_data', JSON.stringify(updated));
    }
  };

  const updateUserData = (data: Partial<MobileExpertProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('expert_user_data', JSON.stringify(updated));
  };

  const logout = () => {
    providerApi.clearToken();
    setUser(null);
    setDutyStatus(false);
    router.push('/login');
  };

  return (
    <ProviderAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        dutyStatus,
        toggleDutyStatus,
        loginWithPhoneOtp,
        loginWithEmail,
        logout,
        updateUserData,
        refreshProfile,
      }}
    >
      {children}
    </ProviderAuthContext.Provider>
  );
}

export function useProviderAuth() {
  const context = useContext(ProviderAuthContext);
  if (!context) {
    throw new Error('useProviderAuth must be used within a ProviderAuthProvider');
  }
  return context;
}
