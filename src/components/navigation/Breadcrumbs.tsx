import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Crumb {
  name: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

/**
 * Visual breadcrumbs only. JSON-LD BreadcrumbList schema is emitted by the
 * SEO component when `breadcrumbs` prop is passed — do NOT duplicate schema
 * here. Pass the same array to both to avoid conflicting Linked Data.
 */
export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  if (!items || items.length === 0) return null;
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "font-montserrat text-[0.7rem] sm:text-xs tracking-wide text-light-secondary/70",
        className
      )}
    >
      <ol className="flex items-center flex-wrap gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center">
              {item.url && !isLast ? (
                <Link
                  to={item.url}
                  className="hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={cn(isLast && "text-light-primary/85")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="mx-2 h-3 w-3 text-light-secondary/40"
                  strokeWidth={1.5}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
