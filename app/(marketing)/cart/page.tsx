"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { formatBDT, cn } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="font-display text-4xl text-ink">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <ShoppingBag className="h-10 w-10 text-ink/20" />
            <p className="text-ink/60">Your cart is empty.</p>
            <Link href="/marketplace/dog" className={cn(buttonVariants(), "rounded-full")}>
              Browse the marketplace
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.listingId}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex-1">
                    <p className="font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-ink/50">{item.unit}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.listingId, item.quantity - 1)}
                        className="rounded-full border border-border p-1.5 hover:bg-secondary"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.listingId, item.quantity + 1)}
                        className="rounded-full border border-border p-1.5 hover:bg-secondary"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <p className="font-display text-lg text-ink">
                      {formatBDT(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.listingId)}
                      className="text-ink/40 hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-2xl border border-border bg-card p-6">
              <p className="font-display text-lg text-ink">Order Summary</p>
              <div className="mt-4 flex items-center justify-between text-sm text-ink/60">
                <span>Subtotal</span>
                <span>{formatBDT(total)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-ink/60">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-display text-lg text-ink">
                <span>Total</span>
                <span>{formatBDT(total)}</span>
              </div>
              <Link
                href="/checkout"
                className={cn(buttonVariants({ size: "lg" }), "mt-6 w-full rounded-full")}
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
