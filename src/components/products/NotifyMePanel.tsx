import { useState, FormEvent } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NotifyMePanelProps {
  productTitle: string;
}

/**
 * Notify-me UI for sold-out products.
 *
 * UI-ONLY: This panel visually accepts an email and shows a non-persistent
 * confirmation message. No backend storage or email dispatch is wired.
 *
 * TODO: Integrate with Klaviyo or a Supabase edge function to actually
 * persist the email and send back-in-stock notifications.
 */
export const NotifyMePanel = ({ productTitle }: NotifyMePanelProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to Klaviyo/Supabase notify-list. For now, UI-only acknowledgement.
    setSubmitted(true);
  };

  return (
    <section className="py-12 sm:py-16 px-3 sm:px-4 lg:px-8 border-t border-white/10">
      <div className="max-w-2xl mx-auto card-dark rounded-2xl border border-primary/20 p-6 sm:p-8 lg:p-10 text-center">
        <Bell className="w-6 h-6 text-primary mx-auto mb-4" strokeWidth={1.4} />
        <p className="text-primary font-montserrat text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
          Currently Unavailable
        </p>
        <h2 className="text-2xl sm:text-3xl font-baskerville font-bold text-light-primary mb-3">
          Notify me when available
        </h2>
        <p className="font-montserrat text-sm sm:text-base text-light-secondary leading-relaxed mb-6 max-w-md mx-auto">
          Leave your email and we will let you know the moment {productTitle} is
          back in the Pleasure Collection.
        </p>

        {submitted ? (
          <p className="font-montserrat text-sm text-primary">
            Thank you - we have noted your interest. You will hear from us when
            this product is available again.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-background/40 border-white/15 text-light-primary placeholder:text-light-muted/60 font-montserrat"
              aria-label="Email address"
            />
            <Button type="submit" className="btn-premium whitespace-nowrap">
              Notify me
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NotifyMePanel;
