import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedStorageNoteProps {
  copy: string;
  href: string;
  label: string;
}

export const RelatedStorageNote = ({ copy, href, label }: RelatedStorageNoteProps) => {
  return (
    <section className="py-10 sm:py-12 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-baskerville italic text-base sm:text-lg text-light-secondary mb-3">
          {copy}
        </p>
        <Link
          to={href}
          className="inline-flex items-center gap-2 font-montserrat text-sm text-primary hover:text-primary/80 transition-colors group"
        >
          {label}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default RelatedStorageNote;
