'use client';

import { useMemo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { IndianStates } from "@/lib/locations";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function AreaCarousel() {
  const pathname = usePathname();
  const [detectedCity, setDetectedCity] = useState("Mumbai");

  useEffect(() => {
    // Sync with localStorage preference
    const saved = localStorage.getItem("user_city");
    if (saved) setDetectedCity(saved);
    
    // Listen for storage changes from Header
    const handleStorage = () => {
      const city = localStorage.getItem("user_city");
      if (city) setDetectedCity(city);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const { cityData, stateSlug } = useMemo(() => {
    const segments = (pathname || '').split('/').filter(Boolean);
    let citySlug = "";
    let sSlug = "maharashtra";

    // 1. Try to extract from URL (Standard SEO path: /services/[service]/[state]/[city])
    if (segments[0] === 'services' && segments.length >= 4) {
        sSlug = segments[2];
        citySlug = segments[3];
    } else {
        // 2. Fallback to detected/saved city
        const foundState = IndianStates.find(s => s.cities.some(c => c.name === detectedCity));
        if (foundState) {
            sSlug = foundState.slug;
            const foundCity = foundState.cities.find(c => c.name === detectedCity);
            citySlug = foundCity?.slug || "mumbai";
        } else {
            citySlug = "mumbai";
        }
    }

    const state = IndianStates.find(s => s.slug === sSlug);
    const city = state?.cities.find(c => c.slug === citySlug);
    
    return { cityData: city, stateSlug: sSlug };
  }, [pathname, detectedCity]);

  if (!cityData || !cityData.areas || cityData.areas.length === 0) return null;

  // Triplicate list for seamless infinite scroll
  const areaList = [...cityData.areas, ...cityData.areas, ...cityData.areas];

  return (
    <section className="py-6 bg-background border-y border-border/5 relative overflow-hidden">
      {/* Subtle background atmosphere */}
      <div className="absolute inset-0 bg-primary/[0.01] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex items-center gap-6">
        {/* High-Authority Leading Tag */}
        <div className="shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-full glassmorphic border-primary/10 shadow-sm">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full animate-pulse" />
            <MapPin className="w-3.5 h-3.5 text-primary relative z-10 fill-primary/10" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/80 whitespace-nowrap">
            Active in <span className="text-primary">{cityData.name}</span>:
          </span>
        </div>

        {/* Infinite Scroller */}
        <div className="relative flex-1 overflow-hidden h-10 flex items-center">
          <div className="flex w-max animate-scroll-areas gap-12 items-center hover:[animation-play-state:paused]">
            {areaList.map((area, idx) => (
              <Link
                key={`${area.slug}-${idx}`}
                href={`/services/physiotherapy/${stateSlug}/${cityData.slug}/${area.slug}`}
                className="group flex items-center gap-3"
              >
                <span className="text-[11px] font-bold text-muted-foreground group-hover:text-primary transition-all duration-300 uppercase tracking-widest whitespace-nowrap">
                  {area.name}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-border/20 group-hover:bg-accent group-hover:scale-125 transition-all duration-500" />
              </Link>
            ))}
          </div>
          
          {/* Edge Fades for Clinical Depth */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-20" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-areas {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
        .animate-scroll-areas {
          animation: scroll-areas 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
