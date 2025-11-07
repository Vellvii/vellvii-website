import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { CountdownTimer } from "./CountdownTimer";

export const FinalCTA = () => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-playfair">
              Don't Miss Out on Launch Day
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/70">
              Early-bird pricing ends soon. Secure your spot now.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <CountdownTimer targetDate="2025-04-15T00:00:00" size="small" />
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <MagneticButton
              onClick={scrollToEmailCapture}
              className="px-8 py-4 bg-gradient-secondary text-white rounded-lg font-semibold text-lg shadow-luxury hover:shadow-glow transition-all duration-300 pulse-glow"
            >
              Reserve Your DOX Now
            </MagneticButton>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <p className="text-white/40 text-sm">
              First 500 orders get priority shipping & exclusive colorway
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
