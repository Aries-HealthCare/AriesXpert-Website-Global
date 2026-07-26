export default function Hero() {
    return (
      <section className="relative w-full h-[60vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="glassmorphic rounded-2xl p-8 md:p-12 soft-shadow">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                  About Aries PhysioCare
                </h1>
                <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                    Redefining Home Healthcare with Precision, Compassion, and Technology
                </p>
                <p className="mt-6 max-w-3xl mx-auto text-sm md:text-base text-muted-foreground/80">
                  Aries PhysioCare, a premium home healthcare brand under Aries HealthCare International Pvt Ltd, is dedicated to delivering outcome-driven care through a team of expert professionals and scalable, technology-driven healthcare systems. We bring clinical excellence to the comfort of your home.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }