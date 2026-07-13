"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import type { Listing } from "@/lib/types";

export function AddToCartButton({
  listing,
  size = "sm",
}: {
  listing: Listing;
  size?: "sm" | "lg";
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      size={size}
      onClick={(e) => {
        e.preventDefault();
        addItem({
          listingId: listing.id,
          title: listing.title,
          price: listing.price,
          unit: listing.unit,
        });
      }}
      className="rounded-full"
    >
      <ShoppingBag className="h-4 w-4" /> Add to cart
    </Button>
  );
}
