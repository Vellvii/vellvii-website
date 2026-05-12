import { WarrantyLink } from "./WarrantyLink";

interface CareAndStorageProps {
  items: string[];
}

export const CareAndStorage = ({ items }: CareAndStorageProps) => {
  if (!items?.length) return null;

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
            Keep It Refined
          </p>
          <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary">
            Care &amp; Storage
          </h2>
        </div>

        <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed"
            >
              <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <WarrantyLink />
      </div>
    </section>
  );
};

export default CareAndStorage;
