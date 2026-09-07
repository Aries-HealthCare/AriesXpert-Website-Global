'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookAppointmentButton from "@/components/book-appointment-button";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";

export default function Cta() {
  return (
    <section className="py-14 md:py-22 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
        
        {/* Card Container with Elegant Purple Gradient and Glass Glow */}
        <div className="relative rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-center overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white shadow-2xl shadow-purple-950/20 border border-purple-800/40">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Experience The Healing Touch</span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Healthcare That Moves With You
            </h2>

            <p className="text-base sm:text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed font-normal">
              Book a certified home physiotherapist today or speak with our clinical care specialists to create a personalized recovery roadmap for you or your loved ones.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <BookAppointmentButton size="lg" className="rounded-full px-8 bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]">
                Book Appointment
                <ArrowRight className="w-4 h-4 ml-2" />
              </BookAppointmentButton>

              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="rounded-full px-7 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm transition-all hover:scale-[1.02]"
              >
                <Link href="/work-with-us">
                  Work With Us
                </Link>
              </Button>

              <Button 
                size="lg" 
                variant="outline" 
                asChild
                className="rounded-full px-7 bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm transition-all hover:scale-[1.02]"
              >
                <Link href="/contact">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Contact Us
                </Link>
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
