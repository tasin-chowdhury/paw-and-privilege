import Link from "next/link";
import { PawPrint } from "lucide-react";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { TiltCard } from "@/components/marketing/tilt-card";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { AddToCartButton } from "@/components/marketplace/add-to-cart-button";
import { getProviderById } from "@/lib/data/providers";
import { formatBDT } from "@/lib/utils";
import type { Listing } from "@/lib/types";

export function ListingCard({ listing, variant = 0 }: { listing: Listing; variant?: number }) {
  const provider = getProviderById(listing.providerId);

  return (
    <TiltCard>
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <Link href={`/listing/${listing.id}`}>
          <ImagePlaceholder
            icon={PawPrint}
            variant={variant}
            className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-ink/50">{provider?.businessName}</p>
            <VerifiedBadge />
          </div>
          <Link href={`/listing/${listing.id}`}>
            <p className="mt-2 font-display text-lg leading-snug text-ink">
              {listing.title}
            </p>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm text-ink/60">{listing.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="font-display text-lg text-ink">{formatBDT(listing.price)}</p>
              <p className="text-xs text-ink/40">{listing.unit}</p>
            </div>
            <AddToCartButton listing={listing} />
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
