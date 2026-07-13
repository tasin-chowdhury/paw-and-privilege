import Link from "next/link";
import { ListingCard } from "@/components/marketplace/listing-card";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { CATEGORIES, SPECIES } from "@/lib/constants";
import { getApprovedListings } from "@/lib/data/listings";
import type { ProductCategory, Species } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MarketplaceView({
  species,
  category,
}: {
  species: Species;
  category?: ProductCategory;
}) {
  const speciesLabel = SPECIES.find((s) => s.slug === species)?.label ?? species;
  const listings = getApprovedListings().filter(
    (l) => l.species.includes(species) && (!category || l.category === category)
  );

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
            Marketplace
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            {speciesLabel}
          </h1>
          <p className="mt-3 max-w-lg text-ink/60">
            Every listing below comes from a personally verified provider.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-6">
            <Link
              href={`/marketplace/${species}`}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                !category
                  ? "bg-ink text-ivory"
                  : "border border-border text-ink/70 hover:border-emerald hover:text-emerald"
              )}
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/marketplace/${species}/${c.slug}`}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  category === c.slug
                    ? "bg-ink text-ivory"
                    : "border border-border text-ink/70 hover:border-emerald hover:text-emerald"
                )}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </SectionReveal>

        {listings.length === 0 ? (
          <SectionReveal delay={0.12}>
            <p className="mt-16 text-center text-ink/50">
              No verified listings here yet — check back soon.
            </p>
          </SectionReveal>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing, i) => (
              <SectionReveal key={listing.id} delay={(i % 3) * 0.06}>
                <ListingCard listing={listing} variant={i} />
              </SectionReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
