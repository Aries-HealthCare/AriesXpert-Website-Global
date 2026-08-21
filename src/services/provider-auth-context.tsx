'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TherapistUser,
  getStoredProviderUser,
  setStoredProviderUser,
  clearAuthToken,
  setAuthToken,
  fetchCurrentProvider,
  updateDutyStatus as apiUpdateDutyStatus,
} from './provider-api';
import { useRouter, usePathname } from 'next/navigation';

interface ProviderAuthContextType {
  user: TherapistUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  isDutyActive: boolean;
  login: (token: string, user: TherapistUser) => void;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  toggleDutyStatus: (active?: boolean) => Promise<void>;
  updateUserData: (data: Partial<TherapistUser>) => void;
}

const ProviderAuthContext = createContext<ProviderAuthContextType | undefined>(undefined);

export function ProviderAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TherapistUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const stored = getStoredProviderUser();
      if (stored) {
        setUser(stored);
        try {
          const fresh = await fetchCurrentProvider();
          if (fresh) setUser(fresh);
        } catch (e) {
          // Keep stored
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (token: string, userData: TherapistUser) => {
    setAuthToken(token);
    setStoredProviderUser(userData);
    setUser(userData);

    // Direct routing based on onboarding status
    if (userData.onboardingStep && userData.onboardingStep < 5 && userData.status === 'INCOMPLETE') {
      router.push('/onboarding');
    } else {
      router.push('/app');
    }
  };

  const logout = () => {
    clearAuthToken();
    setUser(null);
    router.push('/login');
  };

  const refreshProfile = async () => {
    const fresh = await fetchCurrentProvider();
    if (fresh) {
      setUser(fresh);
      setStoredProviderUser(fresh);
    }
  };

  const toggleDutyStatus = async (active?: boolean) => {
    const newStatus = active !== undefined ? active : !user?.isTherapistActive;
    await apiUpdateDutyStatus(newStatus);
    if (user) {
      const updated = { ...user, isTherapistActive: newStatus };
      setUser(updated);
      setStoredProviderUser(updated);
    }
  };

  const updateUserData = (data: Partial<TherapistUser>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      setStoredProviderUser(updated);
    }
  };

  const isAuthenticated = Boolean(user && user.id);
  const isOnboarded = Boolean(user?.status === 'ACTIVE' || (user?.onboardingStep && user.onboardingStep >= 5));
  const isDutyActive = Boolean(user?.isTherapistActive);

  return (
    <ProviderAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isOnboarded,
        isDutyActive,
        login,
        logout,
        refreshProfile,
        toggleDutyStatus,
        updateUserData,
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
