import { ScrollHeader } from "@/components/ScrollHeader";
import { SEO } from "@/components/SEO";

const videos = [
  { label: "Video 1", id: "v1" },
  { label: "Video 2", id: "v2" },
  { label: "Video 3", id: "v3" },
];

const VellviiPrototype = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <SEO title="Vellvii — Prototypes" description="Prototype video showcase" />
      <ScrollHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-20">
        <header className="text-center space-y-3">
          <p className="text-amber-700 font-montserrat text-xs uppercase tracking-[0.25em]">
            Prototype Showcase
          </p>
          <h1 className="font-baskerville text-4xl sm:text-5xl text-stone-900">
            Vellvii Prototypes
          </h1>
        </header>

        {videos.map((v, i) => (
          <section key={v.id} className="space-y-4">
            <h2 className="font-baskerville text-2xl sm:text-3xl text-stone-800 text-center">
              {v.label}
            </h2>
            <div className="w-full aspect-video rounded-2xl bg-stone-200 border border-stone-300 flex items-center justify-center overflow-hidden">
              <p className="text-stone-400 font-montserrat text-sm tracking-wide">
                Upload video {i + 1}
              </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default VellviiPrototype;
