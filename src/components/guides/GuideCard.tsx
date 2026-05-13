import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface GuideCardProps {
  to: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
}

export const GuideCard = ({ to, category, title, excerpt, image, imageAlt }: GuideCardProps) => {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-colors hover:border-primary/30"
    >
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10">
          <img
            src={image}
            alt={imageAlt || title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </div>
      )}
      <div className="flex flex-col p-6 sm:p-8 flex-1">
        <span className="font-montserrat text-[0.65rem] uppercase tracking-[0.28em] text-primary/80 mb-4">
          {category}
        </span>
        <h2 className="font-baskerville text-xl sm:text-2xl text-light-primary mb-3 leading-snug">
          {title}
        </h2>
        <p className="font-montserrat text-sm text-light-secondary leading-relaxed mb-6 flex-1">
          {excerpt}
        </p>
        <span className="inline-flex items-center gap-2 font-montserrat text-xs uppercase tracking-[0.18em] text-primary group-hover:gap-3 transition-all">
          Read Guide
          <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
};

export default GuideCard;
