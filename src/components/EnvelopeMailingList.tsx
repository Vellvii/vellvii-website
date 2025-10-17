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
  consent: boolean;
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
  { code: '+7', country: 'RU/KZ' },
  { code: '+20', country: 'EG' },
  { code: '+27', country: 'ZA' },
  { code: '+30', country: 'GR' },
  { code: '+31', country: 'NL' },
  { code: '+32', country: 'BE' },
  { code: '+33', country: 'FR' },
  { code: '+34', country: 'ES' },
  { code: '+36', country: 'HU' },
  { code: '+39', country: 'IT' },
  { code: '+40', country: 'RO' },
  { code: '+41', country: 'CH' },
  { code: '+43', country: 'AT' },
  { code: '+44', country: 'UK' },
  { code: '+45', country: 'DK' },
  { code: '+46', country: 'SE' },
  { code: '+47', country: 'NO' },
  { code: '+48', country: 'PL' },
  { code: '+49', country: 'DE' },
  { code: '+51', country: 'PE' },
  { code: '+52', country: 'MX' },
  { code: '+53', country: 'CU' },
  { code: '+54', country: 'AR' },
  { code: '+55', country: 'BR' },
  { code: '+56', country: 'CL' },
  { code: '+57', country: 'CO' },
  { code: '+58', country: 'VE' },
  { code: '+60', country: 'MY' },
  { code: '+61', country: 'AU' },
  { code: '+62', country: 'ID' },
  { code: '+63', country: 'PH' },
  { code: '+64', country: 'NZ' },
  { code: '+65', country: 'SG' },
  { code: '+66', country: 'TH' },
  { code: '+81', country: 'JP' },
  { code: '+82', country: 'KR' },
  { code: '+84', country: 'VN' },
  { code: '+86', country: 'CN' },
  { code: '+90', country: 'TR' },
  { code: '+91', country: 'IN' },
  { code: '+92', country: 'PK' },
  { code: '+93', country: 'AF' },
  { code: '+94', country: 'LK' },
  { code: '+95', country: 'MM' },
  { code: '+98', country: 'IR' },
  { code: '+212', country: 'MA' },
  { code: '+213', country: 'DZ' },
  { code: '+216', country: 'TN' },
  { code: '+218', country: 'LY' },
  { code: '+220', country: 'GM' },
  { code: '+221', country: 'SN' },
  { code: '+222', country: 'MR' },
  { code: '+223', country: 'ML' },
  { code: '+224', country: 'GN' },
  { code: '+225', country: 'CI' },
  { code: '+226', country: 'BF' },
  { code: '+227', country: 'NE' },
  { code: '+228', country: 'TG' },
  { code: '+229', country: 'BJ' },
  { code: '+230', country: 'MU' },
  { code: '+231', country: 'LR' },
  { code: '+232', country: 'SL' },
  { code: '+233', country: 'GH' },
  { code: '+234', country: 'NG' },
  { code: '+235', country: 'TD' },
  { code: '+236', country: 'CF' },
  { code: '+237', country: 'CM' },
  { code: '+238', country: 'CV' },
  { code: '+239', country: 'ST' },
  { code: '+240', country: 'GQ' },
  { code: '+241', country: 'GA' },
  { code: '+242', country: 'CG' },
  { code: '+243', country: 'CD' },
  { code: '+244', country: 'AO' },
  { code: '+245', country: 'GW' },
  { code: '+246', country: 'IO' },
  { code: '+248', country: 'SC' },
  { code: '+249', country: 'SD' },
  { code: '+250', country: 'RW' },
  { code: '+251', country: 'ET' },
  { code: '+252', country: 'SO' },
  { code: '+253', country: 'DJ' },
  { code: '+254', country: 'KE' },
  { code: '+255', country: 'TZ' },
  { code: '+256', country: 'UG' },
  { code: '+257', country: 'BI' },
  { code: '+258', country: 'MZ' },
  { code: '+260', country: 'ZM' },
  { code: '+261', country: 'MG' },
  { code: '+262', country: 'RE' },
  { code: '+263', country: 'ZW' },
  { code: '+264', country: 'NA' },
  { code: '+265', country: 'MW' },
  { code: '+266', country: 'LS' },
  { code: '+267', country: 'BW' },
  { code: '+268', country: 'SZ' },
  { code: '+269', country: 'KM' },
  { code: '+290', country: 'SH' },
  { code: '+291', country: 'ER' },
  { code: '+297', country: 'AW' },
  { code: '+298', country: 'FO' },
  { code: '+299', country: 'GL' },
  { code: '+350', country: 'GI' },
  { code: '+351', country: 'PT' },
  { code: '+352', country: 'LU' },
  { code: '+353', country: 'IE' },
  { code: '+354', country: 'IS' },
  { code: '+355', country: 'AL' },
  { code: '+356', country: 'MT' },
  { code: '+357', country: 'CY' },
  { code: '+358', country: 'FI' },
  { code: '+359', country: 'BG' },
  { code: '+370', country: 'LT' },
  { code: '+371', country: 'LV' },
  { code: '+372', country: 'EE' },
  { code: '+373', country: 'MD' },
  { code: '+374', country: 'AM' },
  { code: '+375', country: 'BY' },
  { code: '+376', country: 'AD' },
  { code: '+377', country: 'MC' },
  { code: '+378', country: 'SM' },
  { code: '+380', country: 'UA' },
  { code: '+381', country: 'RS' },
  { code: '+382', country: 'ME' },
  { code: '+383', country: 'XK' },
  { code: '+385', country: 'HR' },
  { code: '+386', country: 'SI' },
  { code: '+387', country: 'BA' },
  { code: '+389', country: 'MK' },
  { code: '+420', country: 'CZ' },
  { code: '+421', country: 'SK' },
  { code: '+423', country: 'LI' },
  { code: '+500', country: 'FK' },
  { code: '+501', country: 'BZ' },
  { code: '+502', country: 'GT' },
  { code: '+503', country: 'SV' },
  { code: '+504', country: 'HN' },
  { code: '+505', country: 'NI' },
  { code: '+506', country: 'CR' },
  { code: '+507', country: 'PA' },
  { code: '+508', country: 'PM' },
  { code: '+509', country: 'HT' },
  { code: '+590', country: 'GP' },
  { code: '+591', country: 'BO' },
  { code: '+592', country: 'GY' },
  { code: '+593', country: 'EC' },
  { code: '+594', country: 'GF' },
  { code: '+595', country: 'PY' },
  { code: '+596', country: 'MQ' },
  { code: '+597', country: 'SR' },
  { code: '+598', country: 'UY' },
  { code: '+599', country: 'AN' },
  { code: '+670', country: 'TL' },
  { code: '+672', country: 'NF' },
  { code: '+673', country: 'BN' },
  { code: '+674', country: 'NR' },
  { code: '+675', country: 'PG' },
  { code: '+676', country: 'TO' },
  { code: '+677', country: 'SB' },
  { code: '+678', country: 'VU' },
  { code: '+679', country: 'FJ' },
  { code: '+680', country: 'PW' },
  { code: '+681', country: 'WF' },
  { code: '+682', country: 'CK' },
  { code: '+683', country: 'NU' },
  { code: '+685', country: 'WS' },
  { code: '+686', country: 'KI' },
  { code: '+687', country: 'NC' },
  { code: '+688', country: 'TV' },
  { code: '+689', country: 'PF' },
  { code: '+690', country: 'TK' },
  { code: '+691', country: 'FM' },
  { code: '+692', country: 'MH' },
  { code: '+850', country: 'KP' },
  { code: '+852', country: 'HK' },
  { code: '+853', country: 'MO' },
  { code: '+855', country: 'KH' },
  { code: '+856', country: 'LA' },
  { code: '+880', country: 'BD' },
  { code: '+886', country: 'TW' },
  { code: '+960', country: 'MV' },
  { code: '+961', country: 'LB' },
  { code: '+962', country: 'JO' },
  { code: '+963', country: 'SY' },
  { code: '+964', country: 'IQ' },
  { code: '+965', country: 'KW' },
  { code: '+966', country: 'SA' },
  { code: '+967', country: 'YE' },
  { code: '+968', country: 'OM' },
  { code: '+970', country: 'PS' },
  { code: '+971', country: 'AE' },
  { code: '+972', country: 'IL' },
  { code: '+973', country: 'BH' },
  { code: '+974', country: 'QA' },
  { code: '+975', country: 'BT' },
  { code: '+976', country: 'MN' },
  { code: '+977', country: 'NP' },
  { code: '+992', country: 'TJ' },
  { code: '+993', country: 'TM' },
  { code: '+994', country: 'AZ' },
  { code: '+995', country: 'GE' },
  { code: '+996', country: 'KG' },
  { code: '+998', country: 'UZ' },
];

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus',
  'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
  'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
  'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia',
  'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan',
  'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon',
  'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Madagascar',
  'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius',
  'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
  'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria',
  'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
  'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania',
  'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
  'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
  'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea',
  'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen',
  'Zambia', 'Zimbabwe'
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
                  {/* Embedded form on the paper - compact layout */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isEnvelopeOpen ? 1 : 0, y: isEnvelopeOpen ? 0 : 10 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <form onSubmit={handleSubmit} className="w-full h-full px-6 py-4 flex flex-col">
                      <h3 className="text-sm font-playfair text-foreground/90 text-center mb-3">
                        Join Our Mailing List
                      </h3>
                      
                      {/* Scrollable content area */}
                      <div className="flex-1 overflow-y-auto space-y-2 pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(12, 55%, 70%) transparent' }}>
                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label htmlFor="firstName" className="block text-[11px] font-medium text-foreground/70 mb-0.5">
                              First Name *
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => onFormChange({ ...formData, firstName: e.target.value })}
                              placeholder="John"
                              className="w-full px-2 py-1 text-xs bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                              disabled={isSubmitting}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-[11px] font-medium text-foreground/70 mb-0.5">
                              Last Name *
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              value={formData.lastName}
                              onChange={(e) => onFormChange({ ...formData, lastName: e.target.value })}
                              placeholder="Doe"
                              className="w-full px-2 py-1 text-xs bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                              disabled={isSubmitting}
                              required
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-[11px] font-medium text-foreground/70 mb-0.5">
                            Email *
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => onFormChange({ ...formData, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full px-2 py-1 text-xs bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                            disabled={isSubmitting}
                            required
                          />
                        </div>

                        {/* Phone with Country Code */}
                        <div>
                          <label htmlFor="phone" className="block text-[11px] font-medium text-foreground/70 mb-0.5">
                            Phone Number *
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={formData.countryCode}
                              onChange={(e) => onFormChange({ ...formData, countryCode: e.target.value })}
                              className="px-2 py-1 text-xs bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
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
                              className="flex-1 px-2 py-1 text-xs bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
                              disabled={isSubmitting}
                              required
                            />
                          </div>
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="block text-[11px] font-medium text-foreground/70 mb-1">
                            Gender *
                          </label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formData.gender === 'male'}
                                onChange={(e) => onFormChange({ ...formData, gender: e.target.value as 'male' | 'female' })}
                                className="w-3.5 h-3.5 text-primary focus:ring-primary"
                                disabled={isSubmitting}
                                required
                              />
                              <span className="text-xs text-foreground">Male</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formData.gender === 'female'}
                                onChange={(e) => onFormChange({ ...formData, gender: e.target.value as 'male' | 'female' })}
                                className="w-3.5 h-3.5 text-primary focus:ring-primary"
                                disabled={isSubmitting}
                                required
                              />
                              <span className="text-xs text-foreground">Female</span>
                            </label>
                          </div>
                        </div>

                        {/* Country */}
                        <div>
                          <label htmlFor="country" className="block text-[11px] font-medium text-foreground/70 mb-0.5">
                            Country *
                          </label>
                          <select
                            id="country"
                            value={formData.country}
                            onChange={(e) => onFormChange({ ...formData, country: e.target.value })}
                            className="w-full px-2 py-1 text-xs bg-white/50 border border-foreground/20 rounded focus:outline-none focus:border-primary transition-colors text-foreground"
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
                      </div>

                      {/* Consent Checkbox - Fixed at bottom */}
                      <div className="pt-2 pb-2 border-t border-foreground/10">
                        <label className="flex items-start gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.consent}
                            onChange={(e) => onFormChange({ ...formData, consent: e.target.checked })}
                            className="mt-0.5 w-4 h-4 text-primary focus:ring-primary border-foreground/30 rounded"
                            disabled={isSubmitting}
                            required
                          />
                          <span className="text-[10px] leading-tight text-foreground/80">
                            I agree to receive emails from Vellvii's mailing list *
                          </span>
                        </label>
                      </div>

                      {/* Submit Button - Fixed at bottom */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-primary-foreground font-medium text-xs rounded-lg shadow-elegant transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Join Mailing List"}
                      </button>
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
