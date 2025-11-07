import { useState } from "react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  { label: "DOX CLOSED - Front View", description: "Exterior vegan leather finish" },
  { label: "DOX OPEN - Interior Velvet Lining", description: "Luxurious velvet compartments" },
  { label: "CHARGING DOCK - Close-up Detail", description: "Wireless charging technology" },
  { label: "FINGERPRINT LOCK - Technology Shot", description: "Biometric security system" },
  { label: "LIFESTYLE - DOX on Nightstand", description: "Seamless bedroom integration" },
];

export const ProductShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-16 font-playfair">
            Exquisite Design
          </h2>
        </ScrollReveal>

        {/* Main Carousel */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-dark shadow-luxury">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent" />
              
              {/* Image Placeholder */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8 transition-opacity duration-500">
                <p className="text-white/60 text-base font-medium text-center mb-2">
                  {images[currentIndex].label}
                </p>
                <p className="text-white/40 text-sm text-center">
                  {images[currentIndex].description}
                  <br />
                  <span className="text-xs">(4:3 aspect ratio)</span>
                </p>
              </div>

              {/* Navigation Buttons */}
              <Button
                onClick={prevSlide}
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </Button>
              <Button
                onClick={nextSlide}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </Button>

              {/* Dot Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
