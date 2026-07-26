"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Globe } from "lucide-react";

export default function CountryPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // This effect runs only on the client
    const countryPreference = localStorage.getItem("country_preference");
    if (!countryPreference) {
      // A simple check for browser language, replace with IP detection for production
      const userLang = navigator.language || (navigator as any).userLanguage;
      if (userLang.startsWith("en-IN")) {
        setIsOpen(true);
      }
    }
  }, []);

  const handleStay = () => {
    localStorage.setItem("country_preference", "global");
    setIsOpen(false);
  };

  const handleSwitch = () => {
    localStorage.setItem("country_preference", "in");
    window.location.href = "https://ariesphysiocare.com";
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="premium-card rounded-3xl border-0 overflow-hidden shadow-2xl bg-white/95 dark:bg-card/95 backdrop-blur-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-3 font-headline text-2xl">
            <Globe className="text-primary w-6 h-6" />
            <span>Viewing Global Website</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-muted-foreground mt-2">
            You are viewing the global Aries PhysioCare website. Would you like to switch to the India website for localized content and services?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel onClick={handleStay} className="rounded-xl font-bold">Stay on Global</AlertDialogCancel>
          <AlertDialogAction onClick={handleSwitch} className="neon-primary-border bg-primary text-white hover:bg-primary/95 rounded-xl font-bold px-6 shadow-lg">
            Go to India Website
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
