import { MagneticButton } from "@/components/animations/MagneticButton";

interface LuxReserveCTAProps {
  className?: string;
}

export const LuxReserveCTA = ({ className = "" }: LuxReserveCTAProps) => {
  const scrollToEmailCapture = () => {
    const emailSection = document.getElementById('email-capture');
    emailSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MagneticButton
      onClick={scrollToEmailCapture}
      className={`group px-10 py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] text-black rounded-xl font-bold text-lg shadow-elegant hover:shadow-glow transition-all duration-700 pulse-glow relative overflow-hidden ${className}`}
    >
      <span className="relative z-10">Reserve Your LUX</span>
      <div className="absolute inset-0 bg-gradient-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </MagneticButton>
  );
};
