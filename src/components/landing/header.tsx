'use client';

import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { HeartPulse, Menu, ChevronDown, Plus, Minus, Loader2, MapPin, Globe, LocateFixed, Video, Users, Building2, Stethoscope } from "lucide-react";
import { useState, useMemo } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import BookAppointmentButton from "../book-appointment-button";
import { usePathname, useRouter } from "next/navigation";
import { IndianStates } from "@/lib/locations";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { services as staticServices } from "@/lib/placeholder-data";

const workWithUsLinks = [
  { href: "/work-with-us/for-physiotherapists", label: "For Physiotherapists" },
  { href: "/work-with-us/for-corporates", label: "For Corporates" },
  { href: "/work-with-us/for-investors", label: "For Investors" },
];

function capitalize(str: string) {
  if (!str) return '';
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export default function Header() {
  const pathname = usePathname();

  const currentLocationName = useMemo(() => {
    const parts = (pathname || '').split('/').filter(Boolean);
    if (parts[0] !== 'services' || parts.length < 3) return null;

    const ignoreKeywords = ['conditions', 'symptoms', 'therapies-offered', 'services-offered', 'services'];
    const geoSegments = [];

    for (let i = 2; i < parts.length; i++) {
      if (ignoreKeywords.includes(parts[i])) break;
      geoSegments.push(parts[i]);
    }

    if (geoSegments.length === 0) return null;
    const lastSeg = geoSegments[geoSegments.length - 1];
    return capitalize(lastSeg);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border/10 shadow-xs transition-all duration-300">
      <div className="w-full mx-auto flex h-16 lg:h-18 2xl:h-20 items-center px-4 sm:px-6 lg:px-8 xl:px-12 relative justify-between gap-2">
        
        {/* Logo Section */}
        <div className="flex items-center shrink-0">
          <Link href="/" className="flex items-center group py-1" prefetch={false}>
            <div className="relative h-10 w-36 sm:h-11 sm:w-44 md:h-12 md:w-48 xl:h-14 xl:w-56 transition-all duration-300 group-hover:opacity-95">
              <Image
                src="/logo-light.png"
                alt="Aries PhysioCare"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 250px"
                className="object-contain block dark:hidden object-left"
                priority
              />
              <Image
                src="/logo-dark.png"
                alt="Aries PhysioCare"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 250px"
                className="object-contain hidden dark:block object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Navigation Menu (Desktop Only) */}
        <nav className="hidden lg:flex items-center gap-x-1.5 xl:gap-x-3 2xl:gap-x-4 px-1">
          <Link href="/" className="text-xs xl:text-[13px] 2xl:text-[14px] font-bold hover:text-primary transition-colors whitespace-nowrap px-1" prefetch={false}>Home</Link>
          <Link href="/about" className="text-xs xl:text-[13px] 2xl:text-[14px] font-bold hover:text-primary transition-colors whitespace-nowrap px-1" prefetch={false}>About</Link>
          <ServicesDropdown />
          <Link href="/therapist" className="text-xs xl:text-[13px] 2xl:text-[14px] font-bold hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap px-1" prefetch={false}>
            <Users className="h-3.5 w-3.5" /> Therapists
          </Link>
          <Link href="/clinic" className="text-xs xl:text-[13px] 2xl:text-[14px] font-bold hover:text-primary transition-colors flex items-center gap-1 whitespace-nowrap px-1" prefetch={false}>
            <Building2 className="h-3.5 w-3.5" /> Clinic
          </Link>
          <Link href="/blogs" className="hidden xl:flex text-xs xl:text-[13px] 2xl:text-[14px] font-bold hover:text-primary transition-colors whitespace-nowrap px-1" prefetch={false}>Blog</Link>
          <div className="hidden xl:block"><WorkWithUsDropdown /></div>

          <div className="hidden min-[1500px]:flex items-center gap-2 border-l ml-1 pl-3 border-border/50">
            <Link href="/free-tele-consultation" className="text-xs xl:text-[13px] 2xl:text-[14px] font-black hover:text-primary transition-colors flex items-center gap-1.5 text-accent whitespace-nowrap" prefetch={false}>
              <Video className="h-4 w-4 animate-pulse" /> Free Consultation
            </Link>
          </div>
        </nav>

        {/* Actions Section */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 2xl:gap-3 shrink-0">
          <div className="hidden md:block">
            <LocationSelector current={currentLocationName} />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs 2xl:text-[13px] font-bold transition-all hover:scale-105 whitespace-nowrap shrink-0"
            prefetch={false}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Login</span>
          </Link>
          <div className="hidden sm:inline-flex shrink-0">
            <BookAppointmentButton className="neon-primary-border bg-primary text-white hover:bg-primary/95 shadow-md transition-all rounded-full px-3.5 py-1.5 2xl:px-5 2xl:py-2 text-xs 2xl:text-[13px] font-bold tracking-wide hover:-translate-y-0.5 whitespace-nowrap shrink-0">
              Book Home Visit
            </BookAppointmentButton>
          </div>
          <div className="lg:hidden flex items-center">
            <MobileMenu currentLocationName={currentLocationName} />
          </div>
        </div>
      </div>
    </header>
  );
}

function LocationSelector({ current }: { current: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const [isDetecting, setIsDetecting] = useState(false);
  const serviceSlug = (pathname || '').split('/')[2] || 'physiotherapy';

  const handleCitySelect = (cityName: string, url: string) => {
    localStorage.setItem("user_city", cityName);
    // Trigger a custom event for AreaCarousel to react
    window.dispatchEvent(new Event('storage'));
    router.push(url);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({ variant: "destructive", title: "Geolocation Not Supported", description: "Your browser doesn't support location services." });
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setTimeout(() => {
          setIsDetecting(false);
          localStorage.setItem("user_city", "Mumbai");
          window.dispatchEvent(new Event('storage'));
          toast({ title: "Location Detected", description: "Showing services for Mumbai." });
          router.push(`/services/${serviceSlug}/maharashtra/mumbai`);
        }, 1500);
      },
      () => {
        setIsDetecting(false);
        toast({ variant: "destructive", title: "Access Denied", description: "Please enable location access to auto-detect your city." });
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto py-1.5 px-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary flex items-center gap-1.5 transition-all">
          <MapPin className="h-3.5 w-3.5 fill-primary/20" />
          <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
            {current || "Mumbai"}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 glassmorphic max-h-[80vh] overflow-y-auto" align="end">
        <DropdownMenuLabel className="flex items-center gap-2 font-headline">
          <Globe className="w-4 h-4 text-primary" />
          Service Cities
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleDetectLocation} className="cursor-pointer text-primary font-bold flex items-center gap-2 py-3">
          {isDetecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <LocateFixed className="h-4 w-4" />}
          <span>Detect My Location</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {IndianStates.map(state => (
          <div key={state.slug}>
            <div className="px-2 py-1 text-[10px] uppercase font-bold text-muted-foreground tracking-widest bg-muted/30">{state.name}</div>
            {state.cities.map(city => (
              <DropdownMenuItem
                key={city.slug}
                onClick={() => handleCitySelect(city.name, `/services/${serviceSlug}/${state.slug}/${city.slug}`)}
                className="flex items-center justify-between cursor-pointer"
              >
                <span>{city.name}</span>
                {(current === city.name || (!current && city.name === 'Mumbai')) && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </DropdownMenuItem>
            ))}
          </div>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/contact" className="text-xs text-center text-primary font-bold w-full block">View All Locations</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ServicesDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm 2xl:text-[15px] font-semibold hover:text-primary transition-colors p-0 focus:outline-none text-foreground whitespace-nowrap">
        Services <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 glassmorphic">
        <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Our Services</DropdownMenuLabel>
        {staticServices.map((service) => (
          <DropdownMenuItem key={service.id} asChild>
            <Link href={`/services/${service.slug}`} prefetch={false}>
              {service.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Find Specialists</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href="/therapist" className="flex items-center gap-2" prefetch={false}>
            <Users className="h-4 w-4 text-primary" /> Our Therapists
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/clinic" className="flex items-center gap-2" prefetch={false}>
            <Building2 className="h-4 w-4 text-primary" /> Our Clinic (Borivali West)
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/services" className="font-semibold" prefetch={false}>
            All Services →
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function WorkWithUsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 text-sm 2xl:text-[15px] font-semibold hover:text-primary transition-colors p-0 focus:outline-none text-foreground whitespace-nowrap">
        Work With Us <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glassmorphic">
        {workWithUsLinks.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <Link href={link.href} prefetch={false}>
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


function MobileMenu({ currentLocationName }: { currentLocationName: string | null }) {
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const handleCollapsibleChange = (name: string) => {
    setOpenCollapsible(prev => (prev === name ? null : name));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 p-0 text-foreground">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-sm flex flex-col p-0 border-l">
        <SheetHeader className="p-6 pb-4 border-b">
          <SheetTitle>
            <Link href="/" className="flex items-center" prefetch={false}>
              <div className="relative h-12 w-48">
                <Image
                  src="/logo-light.png"
                  alt="Aries PhysioCare"
                  fill
                  className="object-contain block dark:hidden object-left"
                />
                <Image
                  src="/logo-dark.png"
                  alt="Aries PhysioCare"
                  fill
                  className="object-contain hidden dark:block object-left"
                />
              </div>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-1 p-4">
            <div className="mb-4">
              <LocationSelector current={currentLocationName} />
            </div>

            <Link href="/" className="text-lg font-medium hover:text-primary transition-colors py-3 px-2 mt-2" prefetch={false}>Home</Link>
            <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors py-3 px-2" prefetch={false}>About Us</Link>

            <Collapsible open={openCollapsible === 'services'} onOpenChange={() => handleCollapsibleChange('services')}>
              <CollapsibleTrigger className="flex justify-between items-center w-full text-lg font-medium hover:text-primary transition-colors py-3 px-2">
                Services
                {openCollapsible === 'services' ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-6 flex flex-col gap-1 border-l ml-4 mt-1">
                  {staticServices.map(service => (
                    <Link key={service.id} href={`/services/${service.slug}`} className="text-base text-muted-foreground hover:text-primary transition-colors py-2" prefetch={false}>
                      {service.name}
                    </Link>
                  ))}
                  <Link href="/therapist" className="text-base font-semibold text-primary transition-colors py-2 flex items-center gap-2" prefetch={false}>
                    <Users className="h-4 w-4" /> Our Therapists
                  </Link>
                  <Link href="/clinic" className="text-base font-semibold text-primary transition-colors py-2 flex items-center gap-2" prefetch={false}>
                    <Building2 className="h-4 w-4" /> Our Clinic (Borivali West)
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Link href="/free-tele-consultation" className="text-lg font-medium text-accent hover:text-primary transition-colors py-3 px-2 flex items-center gap-2" prefetch={false}>
              <Video className="h-5 w-5" /> Free Consultation
            </Link>
            <Link href="/blogs" className="text-lg font-medium hover:text-primary transition-colors py-3 px-2" prefetch={false}>Health Blog</Link>

            <Collapsible open={openCollapsible === 'work'} onOpenChange={() => handleCollapsibleChange('work')}>
              <CollapsibleTrigger className="flex justify-between items-center w-full text-lg font-medium hover:text-primary transition-colors py-3 px-2">
                Work With Us
                {openCollapsible === 'work' ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="pl-6 flex flex-col gap-1 border-l ml-4 mt-1">
                  {workWithUsLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-base text-muted-foreground hover:text-primary transition-colors py-2" prefetch={false}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors py-3 px-2" prefetch={false}>Contact Us</Link>

            <div className="mt-4 pt-4 border-t border-border/40">
              <div className="text-xs uppercase font-bold text-muted-foreground tracking-wider px-2 mb-2">AriesXpert Professionals</div>
              <Link
                href="/login"
                className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-primary/10 text-primary font-bold text-sm mb-2"
                prefetch={false}
              >
                <div className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  <span>Provider Login</span>
                </div>
                <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Sign In →</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-between py-2 px-3 text-xs text-muted-foreground hover:text-foreground font-medium"
                prefetch={false}
              >
                <span>Join as Physiotherapist</span>
                <span>Register →</span>
              </Link>
            </div>
          </nav>
        </div>
        <div className="p-4 border-t mt-auto">
          <BookAppointmentButton className="w-full neon-accent-border">
            Book Appointment
          </BookAppointmentButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}