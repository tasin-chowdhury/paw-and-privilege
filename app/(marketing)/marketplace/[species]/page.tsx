import { notFound } from "next/navigation";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import { SPECIES } from "@/lib/constants";
import type { Species } from "@/lib/types";

export default async function SpeciesMarketplacePage({
  params,
}: {
  params: Promise<{ species: string }>;
}) {
  const { species } = await params;
  if (!SPECIES.some((s) => s.slug === species)) notFound();
  return <MarketplaceView species={species as Species} />;
}
