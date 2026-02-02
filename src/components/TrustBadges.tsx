import { Truck, Package, Shield, RotateCcw } from "lucide-react";

const badges = [
  { icon: Truck, label: "Free Shipping", sublabel: "On all orders" },
  { icon: Package, label: "Discreet Packaging", sublabel: "Plain exterior" },
  { icon: Shield, label: "1-Year Warranty", sublabel: "Full coverage" },
  { icon: RotateCcw, label: "30-Day Returns", sublabel: "Easy process" },
];

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {badges.map((badge) => (
        <div key={badge.label} className="trust-badge">
          <div className="trust-badge-icon">
            <badge.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="text-light-primary text-sm font-semibold font-montserrat">
              {badge.label}
            </p>
            <p className="text-light-muted text-xs font-montserrat">
              {badge.sublabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
