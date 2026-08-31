import Link from "next/link";
import Image from "next/image";
import { HeartPulse, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Youtube } from "lucide-react";
import { services } from "@/lib/placeholder-data";

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/10 pt-20 pb-28 md:pb-10 overflow-hidden mt-16">
      {/* Subtle Background Glow for Elegance */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8 flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-3 group w-full" prefetch={false}>
              <div className="relative h-14 w-52 sm:h-16 sm:w-64 md:h-16 md:w-72 transition-all duration-300 group-hover:opacity-95">
                {/* Light Mode Logo */}
                <Image
                  src="/logo-light.png"
                  alt="Aries PhysioCare"
                  fill
                  sizes="(max-width: 640px) 208px, 288px"
                  className="object-contain block dark:hidden object-center md:object-left"
                />
                {/* Dark Mode Logo */}
                <Image
                  src="/logo-dark.png"
                  alt="Aries PhysioCare"
                  fill
                  sizes="(max-width: 640px) 208px, 288px"
                  className="object-contain hidden dark:block object-center md:object-left"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Bridging the gap between hospital and home. We deliver hospital-grade clinical excellence, evidence-based physiotherapy, and advanced recovery protocols in the comfort of your home.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "https://facebook.com/ariesphysiocare", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com/ariesphysiocare", label: "Twitter" },
                { icon: Instagram, href: "https://instagram.com/ariesphysiocare", label: "Instagram" },
                { icon: Linkedin, href: "https://linkedin.com/company/aries-physiocare", label: "LinkedIn" },
                { icon: Youtube, href: "https://youtube.com/@ariesphysiocare", label: "YouTube" },
              ].map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-headline font-bold text-xs text-primary uppercase tracking-[0.2em]">Our Services</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-headline font-bold text-xs text-primary uppercase tracking-[0.2em]">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">About Aries PhysioCare</Link></li>
              <li><Link href="/therapist" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Our Expert Therapists</Link></li>
              <li><Link href="/clinic" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200 font-semibold text-primary">Our Clinic (Borivali West)</Link></li>
              <li><Link href="/blogs" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Health Insights Blog</Link></li>
              <li><Link href="/work-with-us" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Work With Us</Link></li>
              <li><a href="https://app.ariesphysiocare.com/login" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors inline-block hover:translate-x-1 duration-200">AriesXpert Provider Login ↗</a></li>
              <li><a href="https://app.ariesphysiocare.com/onboarding" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Join as Physiotherapist ↗</a></li>
              <li><Link href="/free-tele-consultation" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block hover:translate-x-1 duration-200">Free Consultation</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-headline font-bold text-xs text-primary uppercase tracking-[0.2em]">Clinic & Support</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group">
                <div className="p-2.5 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <MapPin className="h-4 w-4" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground block mb-0.5">Aries PhysioCare Clinic</span>
                  Shop No. 7, Parrk Riviera, New MHB Colony, Borivali West, Mumbai 400091
                </p>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-sm text-muted-foreground flex flex-col font-medium">
                  <a href="tel:+919136447006" className="hover:text-primary transition-colors">+91 9136447006</a>
                  <a href="tel:+918591981880" className="hover:text-primary transition-colors text-xs text-emerald-500 font-bold">WhatsApp: +91 8591981880</a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="p-2.5 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:support@ariesphysiocare.com" className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium">support@ariesphysiocare.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-border/10 pt-10 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-[11px] text-muted-foreground font-medium text-center md:text-left">
                Aries PhysioCare is a division of <span className="text-foreground font-bold">Aries HealthCare International Pvt Ltd</span>.
              </p>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] font-bold">
                &copy; {new Date().getFullYear()} Aries HealthCare. All Rights Reserved.
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <Link href="/privacy-policy" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/sitemap.xml" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Sitemap</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
