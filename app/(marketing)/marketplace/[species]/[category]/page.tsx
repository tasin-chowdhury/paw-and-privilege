import { notFound } from "next/navigation";
import { MarketplaceView } from "@/components/marketplace/marketplace-view";
import { CATEGORIES, SPECIES } from "@/lib/constants";
import type { ProductCategory, Species } from "@/lib/types";

export default async function CategoryMarketplacePage({
  params,
}: {
  params: Promise<{ species: string; category: string }>;
}) {
  const { species, category } = await params;
  if (
    !SPECIES.some((s) => s.slug === species) ||
    !CATEGORIES.some((c) => c.slug === category)
  ) {
    notFound();
  }
  return (
    <MarketplaceView species={species as Species} category={category as ProductCategory} />
  );
}
