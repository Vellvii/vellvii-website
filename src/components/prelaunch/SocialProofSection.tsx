import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { TestimonialCarousel } from "./TestimonialCarousel";

export const SocialProofSection = () => {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-16 font-baskerville">
            Join the Waitlist
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <TestimonialCarousel />
        </ScrollReveal>
      </div>
    </section>
  );
};
