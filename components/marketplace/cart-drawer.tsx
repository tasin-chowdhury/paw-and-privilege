"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { formatBDT, cn } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent side="right" className="flex flex-col bg-ivory sm:max-w-md">
        <SheetTitle className="flex items-center gap-2 px-6 pt-6 font-display text-lg">
          <ShoppingBag className="h-5 w-5" /> Your Cart
        </SheetTitle>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              href="/marketplace/dog"
              onClick={close}
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Browse the marketplace
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-6">
              {items.map((item) => (
                <div
                  key={item.listingId}
                  className="flex items-start justify-between gap-3 border-b border-border pb-4"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.listingId, item.quantity - 1)
                        }
                        className="rounded-full border border-border p-1 hover:bg-secondary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.listingId, item.quantity + 1)
                        }
                        className="rounded-full border border-border p-1 hover:bg-secondary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-sm font-medium text-ink">
                      {formatBDT(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.listingId)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-6 py-6">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg text-ink">
                  {formatBDT(total)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={close}
                className={cn(buttonVariants({ size: "lg" }), "w-full rounded-full")}
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
