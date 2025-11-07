import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { CheckCircle2, Loader2 } from "lucide-react";

export const EmailCaptureForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    wantsEarlyBird: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="glass-dark border-primary/30 rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white font-playfair">
          You're on the List!
        </h3>
        <p className="text-white/70 leading-relaxed max-w-md mx-auto">
          Check your email for confirmation. You're number <span className="text-primary font-semibold">2,438</span> on the waitlist.
        </p>
        <p className="text-white/50 text-sm">
          We'll notify you when the DOX launches with your exclusive discount code.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-dark border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-white text-sm font-medium">
            First Name *
          </label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-white text-sm font-medium">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-white text-sm font-medium">
          Phone <span className="text-white/40">(optional)</span>
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary"
        />
      </div>

      <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <Checkbox
          id="earlyBird"
          checked={formData.wantsEarlyBird}
          onCheckedChange={(checked) => setFormData({ ...formData, wantsEarlyBird: checked as boolean })}
          className="mt-0.5 border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <label htmlFor="earlyBird" className="text-white/90 text-sm leading-relaxed cursor-pointer">
          I want exclusive launch pricing and to save <span className="text-primary font-semibold">$200</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-8 py-4 bg-gradient-secondary text-white rounded-lg font-semibold text-lg shadow-luxury hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Securing Your Spot...</span>
          </>
        ) : (
          <span>Secure My Spot</span>
        )}
      </button>
    </form>
  );
};
