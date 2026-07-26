import { Button } from "@/components/ui/button";
import Link from "next/link";
import BookAppointmentButton from "@/components/book-appointment-button";

export default function Cta() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="glassmorphic rounded-lg p-8 md:p-12 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Healthcare That Moves With You
          </h2>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <BookAppointmentButton size="lg" className="neon-accent-border">
              Book Appointment
            </BookAppointmentButton>
            <Button size="lg" variant="outline" asChild>
              <Link href="/work-with-us">Work With Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
