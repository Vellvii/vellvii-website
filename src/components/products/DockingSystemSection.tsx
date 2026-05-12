import { Link } from "react-router-dom";
import { ArrowRight, Package, Disc } from "lucide-react";
import type { DockingInfo } from "@/lib/pdpContent";

interface DockingSystemSectionProps {
  info: DockingInfo;
  /** Hide the CTA when the section is rendered on the collection page itself. */
  showCta?: boolean;
}

export const DockingSystemSection = ({ info, showCta = true }: DockingSystemSectionProps) => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 sm:mb-10 max-w-2xl">
          <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
            The Vellvii Ecosystem
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-baskerville font-bold text-light-primary leading-tight">
            {info.heading}
          </h2>
          <p className="mt-3 sm:mt-4 font-montserrat text-light-secondary text-sm sm:text-base leading-relaxed">
            {info.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <article className="card-dark rounded-xl p-5 sm:p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-5 h-5 text-primary" strokeWidth={1.4} />
              <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-primary/80">
                {info.vds.subtitle}
              </span>
            </div>
            <h3 className="font-baskerville text-2xl sm:text-3xl text-light-primary mb-2">
              {info.vds.title}
            </h3>
            <p className="font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed">
              {info.vds.copy}
            </p>
          </article>

          <article className="card-dark rounded-xl p-5 sm:p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <Disc className="w-5 h-5 text-primary" strokeWidth={1.4} />
              <span className="font-montserrat text-xs uppercase tracking-[0.2em] text-primary/80">
                {info.dds.subtitle}
              </span>
            </div>
            <h3 className="font-baskerville text-2xl sm:text-3xl text-light-primary mb-2">
              {info.dds.title}
            </h3>
            <p className="font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed">
              {info.dds.copy}
            </p>
          </article>
        </div>

        {showCta && (
          <div className="mt-8 sm:mt-10">
            <Link
              to="/collections/dox-compatible-products"
              className="inline-flex items-center gap-2 font-montserrat text-sm sm:text-base text-primary hover:text-primary/80 transition-colors group"
            >
              Explore DOX-Compatible Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default DockingSystemSection;
