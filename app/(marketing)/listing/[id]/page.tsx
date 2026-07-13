import { notFound } from "next/navigation";
import Link from "next/link";
import { PawPrint, Star } from "lucide-react";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { AddToCartButton } from "@/components/marketplace/add-to-cart-button";
import { ListingCard } from "@/components/marketplace/listing-card";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { getListingById, getListingsByProvider } from "@/lib/data/listings";
import { getProviderById } from "@/lib/data/providers";
import { formatBDT } from "@/lib/utils";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = getListingById(id);
  if (!listing || listing.status !== "approved") notFound();

  const provider = getProviderById(listing.providerId);
  const more = getListingsByProvider(listing.providerId).filter(
    (l) => l.id !== listing.id && l.status === "approved"
  );

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <ImagePlaceholder
              icon={PawPrint}
              className="aspect-square w-full rounded-3xl"
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="flex items-center justify-between">
              {provider && (
                <Link
                  href={`/vets/${provider.id}`}
                  className="text-sm text-ink/60 hover:text-emerald"
                >
                  {provider.businessName} · {provider.location}
                </Link>
              )}
              <VerifiedBadge />
            </div>
            <h1 className="mt-3 font-display text-4xl text-ink">{listing.title}</h1>
            <p className="mt-4 text-ink/70">{listing.description}</p>

            <div className="mt-6 flex items-baseline gap-2">
              <p className="font-display text-3xl text-ink">
                {formatBDT(listing.price)}
              </p>
              <p className="text-sm text-ink/40">/ {listing.unit}</p>
            </div>

            <div className="mt-8">
              <AddToCartButton listing={listing} size="lg" />
            </div>

            {provider && (
              <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 font-display text-sm text-emerald">
                  {provider.avatarInitials}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-ink">{provider.businessName}</p>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-ink/50">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {provider.rating.toFixed(1)} ({provider.reviewCount} reviews)
                  </div>
                </div>
              </div>
            )}
          </SectionReveal>
        </div>

        {more.length > 0 && (
          <div className="mt-24">
            <SectionReveal>
              <h2 className="font-display text-2xl text-ink">
                More from {provider?.businessName}
              </h2>
            </SectionReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((l, i) => (
                <SectionReveal key={l.id} delay={i * 0.06}>
                  <ListingCard listing={l} variant={i} />
                </SectionReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
