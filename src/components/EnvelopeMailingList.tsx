import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface MailingListFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  gender: 'male' | 'female' | '';
  country: string;
}

interface EnvelopeMailingListProps {
  isOpen: boolean;
  onClose: () => void;
  formData: MailingListFormData;
  onFormChange: (data: MailingListFormData) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const COUNTRY_CODES = [
  { code: '+1', country: 'US/CA' },
  { code: '+27', country: 'ZA' },
  { code: '+44', country: 'UK' },
  { code: '+61', country: 'AU' },
  { code: '+91', country: 'IN' },
];

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'South Africa',
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland',
  'India', 'Japan', 'China', 'Brazil', 'Mexico', 'Argentina', 'Other'
];

export const EnvelopeMailingList = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  isSubmitting,
}: EnvelopeMailingListProps) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Delay opening animation
      const timer = setTimeout(() => setIsEnvelopeOpen(true), 400);
      return () => clearTimeout(timer);
    } else {
      setIsEnvelopeOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleClose = () => {
    setIsEnvelopeOpen(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />

          {/* Envelope Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 flex items-center justify-center z-[1001] p-4"
          >
            <div className="relative w-full max-w-2xl">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              {/* Envelope SVG */}
              <div className="relative w-full aspect-[4/3]" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="envelopeBody" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(12, 55%, 70%)" />
                      <stop offset="50%" stopColor="hsl(12, 60%, 65%)" />
                      <stop offset="100%" stopColor="hsl(15, 50%, 75%)" />
                    </linearGradient>
                    <linearGradient id="envelopeFlap" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="hsl(12, 60%, 60%)" />
                      <stop offset="100%" stopColor="hsl(12, 55%, 65%)" />
                    </linearGradient>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
                    </filter>
                  </defs>

                  {/* Envelope Body */}
                  <rect
                    x="50"
                    y="100"
                    width="300"
                    height="180"
                    fill="url(#envelopeBody)"
                    stroke="hsl(12, 50%, 55%)"
                    strokeWidth="2"
                    rx="4"
                    filter="url(#shadow)"
                  />

                  {/* Inner lines for decoration */}
                  <line x1="70" y1="140" x2="330" y2="140" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                  <line x1="70" y1="160" x2="330" y2="160" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                  <line x1="70" y1="180" x2="330" y2="180" stroke="hsl(12, 55%, 70%)" strokeWidth="1" opacity="0.3" />
                </svg>

                {/* Logo on envelope body */}
                <img
                  src="/uploads/V-logo-transparent.png"
                  alt="Vellvii logo"
                  className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 w-[15%] opacity-90 z-5"
                  style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }}
                />

                {/* White paper sliding over envelope - expanded for form */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ 
                    y: isEnvelopeOpen ? '0%' : '100%'
                  }}
                  transition={{ 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 180,
                    delay: isEnvelopeOpen ? 0.3 : 0
                  }}
                  className="absolute transform-gpu overflow-hidden"
                  style={{
                    left: '8%',
                    top: '20%',
                    width: '84%',
                    height: '75%',
                    background: 'hsl(30, 35%, 96%)',
                    border: '1px solid hsl(30, 20%, 80%)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    zIndex: 20,
                    willChange: 'transform',
                    pointerEvents: isEnvelopeOpen ? 'auto' : 'none'
                  }}
                >
                  {/* Embedded form on the paper - scrollable */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isEnvelopeOpen ? 1 : 0, y: isEnvelopeOpen ? 0 : 10 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute inset-0 overflow-y-auto"
                    style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(12, 55%, 70%) transparent' }}
                  >
                    <form onSubmit={handleSubmit} className="w-full px-6 py-6 space-y-3">
                      <h3 className="text-base font-playfair text-foreground/90 text-center mb-4">
                        Join Our Mailing List
                      </h3>
                      
                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label htmlFor="firstName" className="block text-xs font-medium text-foreground/70 mb-1">
                            First Name *
                          </label>
                          <input
                            id="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => onFormChange({ ...formData, firstName: e.target.value })}
                            placeholder="John"
                            className="w-full px-2 py-1.5 text-sm bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                            disabled={isSubmitting}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-xs font-medium text-foreground/70 mb-1">
                            Last Name *
                          </label>
                          <input
                            id="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => onFormChange({ ...formData, lastName: e.target.value })}
                            placeholder="Doe"
                            className="w-full px-2 py-1.5 text-sm bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                            disabled={isSubmitting}
                            required
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-foreground/70 mb-1">
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          className="w-full px-2 py-1.5 text-sm bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                          disabled={isSubmitting}
                          required
                        />
                      </div>

                      {/* Phone with Country Code */}
                      <div>
                        <label htmlFor="phone" className="block text-xs font-medium text-foreground/70 mb-1">
                          Phone Number *
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={formData.countryCode}
                            onChange={(e) => onFormChange({ ...formData, countryCode: e.target.value })}
                            className="px-2 py-1.5 text-sm bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                            disabled={isSubmitting}
                            required
                          >
                            <option value="">Code</option>
                            {COUNTRY_CODES.map(({ code, country }) => (
                              <option key={code} value={code}>
                                {code} {country}
                              </option>
                            ))}
                          </select>
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => onFormChange({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                            placeholder="1234567890"
                            className="flex-1 px-2 py-1.5 text-sm bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                            disabled={isSubmitting}
                            required
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs font-medium text-foreground/70 mb-2">
                          Gender *
                        </label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value="male"
                              checked={formData.gender === 'male'}
                              onChange={(e) => onFormChange({ ...formData, gender: e.target.value as 'male' | 'female' })}
                              className="w-4 h-4 text-primary focus:ring-primary"
                              disabled={isSubmitting}
                              required
                            />
                            <span className="text-sm text-foreground">Male</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="gender"
                              value="female"
                              checked={formData.gender === 'female'}
                              onChange={(e) => onFormChange({ ...formData, gender: e.target.value as 'male' | 'female' })}
                              className="w-4 h-4 text-primary focus:ring-primary"
                              disabled={isSubmitting}
                              required
                            />
                            <span className="text-sm text-foreground">Female</span>
                          </label>
                        </div>
                      </div>

                      {/* Country */}
                      <div>
                        <label htmlFor="country" className="block text-xs font-medium text-foreground/70 mb-1">
                          Country *
                        </label>
                        <select
                          id="country"
                          value={formData.country}
                          onChange={(e) => onFormChange({ ...formData, country: e.target.value })}
                          className="w-full px-2 py-1.5 text-sm bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                          disabled={isSubmitting}
                          required
                        >
                          <option value="">Select country</option>
                          {COUNTRIES.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 py-2.5 px-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground font-medium text-sm rounded-lg shadow-elegant transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Join Mailing List"}
                      </button>

                      {/* Logo at bottom */}
                      <div className="pt-4">
                        <img
                          src="/uploads/Vellvii-full-logo-transparent.png"
                          alt="Vellvii"
                          className="w-20 mx-auto opacity-40"
                        />
                      </div>
                    </form>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
