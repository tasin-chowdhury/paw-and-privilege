import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { formatBDT } from "@/lib/utils";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Member",
    price: 0,
    period: "always free",
    highlight: false,
    features: [
      "Browse all verified listings",
      "Book grooming, training & vet chat",
      "Standard order & booking support",
    ],
  },
  {
    name: "The Atelier",
    price: 4900,
    period: "per year",
    highlight: true,
    features: [
      "Priority 24/7 vet chat — under 2 min response",
      "Concierge booking for grooming & training",
      "First access to limited-run provider drops",
      "Dedicated account specialist",
      "Free delivery on all marketplace orders",
    ],
  },
];

export default function MembershipPage() {
  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <SectionReveal>
          <div className="text-center">
            <Sparkles className="mx-auto h-8 w-8 text-gold" />
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-emerald">
              Membership
            </p>
            <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
              The Atelier
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-ink/60">
              Our private tier for owners who want the very best — priority
              access to Bangladesh&rsquo;s most exclusive vets, groomers and
              trainers.
            </p>
          </div>
        </SectionReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {tiers.map((tier, i) => (
            <SectionReveal key={tier.name} delay={i * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-8",
                  tier.highlight
                    ? "border-gold bg-ink text-ivory shadow-2xl"
                    : "border-border bg-card"
                )}
              >
                <p
                  className={cn(
                    "font-display text-2xl",
                    tier.highlight ? "text-ivory" : "text-ink"
                  )}
                >
                  {tier.name}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <p
                    className={cn(
                      "font-display text-4xl",
                      tier.highlight ? "text-gold" : "text-ink"
                    )}
                  >
                    {tier.price === 0 ? "Free" : formatBDT(tier.price)}
                  </p>
                  <p
                    className={cn(
                      "text-sm",
                      tier.highlight ? "text-ivory/50" : "text-ink/40"
                    )}
                  >
                    {tier.period}
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          tier.highlight ? "text-gold" : "text-emerald"
                        )}
                      />
                      <span className={tier.highlight ? "text-ivory/80" : "text-ink/70"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn(
                    "mt-8 w-full rounded-full",
                    tier.highlight && "bg-gold text-ink hover:bg-gold-soft"
                  )}
                  variant={tier.highlight ? "default" : "outline"}
                >
                  {tier.price === 0 ? "Continue free" : "Join The Atelier"}
                </Button>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
