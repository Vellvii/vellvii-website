import { cn } from "@/lib/utils";

export type ProductStatus = "available" | "pre-order" | "sold-out";

interface StatusPillProps {
  status: ProductStatus;
  className?: string;
  size?: "sm" | "md";
}

const STATUS_STYLES: Record<ProductStatus, { label: string; classes: string }> = {
  available: {
    label: "Available",
    classes: "bg-emerald-500/10 border-emerald-400/30 text-emerald-300",
  },
  "pre-order": {
    label: "Pre-Order",
    classes: "bg-primary/15 border-primary/40 text-primary",
  },
  "sold-out": {
    label: "Sold Out",
    classes: "bg-black/45 border-primary/30 text-primary/90",
  },
};

export const getProductStatus = (
  handle: string | undefined,
  isAvailable: boolean
): ProductStatus => {
  if (!isAvailable) return "sold-out";
  if (handle?.toLowerCase().includes("lux")) return "pre-order";
  return "available";
};

export const StatusPill = ({ status, className, size = "sm" }: StatusPillProps) => {
  const { label, classes } = STATUS_STYLES[status];
  const sizeClasses =
    size === "md"
      ? "px-3.5 py-1.5 text-[11px] sm:text-xs"
      : "px-3 py-1 text-[10px] sm:text-xs";
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border backdrop-blur-sm",
        classes,
        sizeClasses,
        className
      )}
    >
      <span className="font-montserrat font-medium uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
};
