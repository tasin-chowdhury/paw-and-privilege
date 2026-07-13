"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCartStore } from "@/lib/store/cart";
import { formatBDT, cn } from "@/lib/utils";

const checkoutSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(11, "Enter a valid Bangladeshi phone number"),
  address: z.string().min(10, "Please enter your full delivery address"),
  notes: z.string().optional(),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, clear } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const [placed, setPlaced] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 700));
    clear();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="bg-ivory pt-40 pb-32">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 text-center">
          <CheckCircle2 className="h-12 w-12 text-emerald" />
          <h1 className="font-display text-3xl text-ink">Order placed</h1>
          <p className="text-ink/60">
            This is a preview checkout — no payment has been taken. Real
            payments (bKash, Nagad, card) go live in a later phase.
          </p>
          <Link href="/marketplace/dog" className={cn(buttonVariants(), "mt-4 rounded-full")}>
            Continue browsing
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-ivory pt-40 pb-32">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 text-center">
          <p className="text-ink/60">Your cart is empty.</p>
          <Link href="/marketplace/dog" className={cn(buttonVariants(), "rounded-full")}>
            Browse the marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        <h1 className="font-display text-4xl text-ink">Checkout</h1>
        <p className="mt-2 text-sm text-ink/50">
          Preview checkout — payment integration (bKash / Nagad / card) arrives
          in a later phase.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" className="mt-1.5" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">Phone number</Label>
              <Input id="phone" placeholder="01XXXXXXXXX" className="mt-1.5" {...register("phone")} />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="address">Delivery address</Label>
              <Textarea id="address" className="mt-1.5" {...register("address")} />
              {errors.address && (
                <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="notes">Delivery notes (optional)</Label>
              <Textarea id="notes" className="mt-1.5" {...register("notes")} />
            </div>
            <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full">
              {isSubmitting ? "Placing order..." : `Place order · ${formatBDT(total)}`}
            </Button>
          </form>

          <div className="h-fit rounded-2xl border border-border bg-card p-6">
            <p className="font-display text-lg text-ink">Order Summary</p>
            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.listingId} className="flex justify-between text-sm">
                  <span className="text-ink/70">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="text-ink">{formatBDT(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 font-display text-lg text-ink">
              <span>Total</span>
              <span>{formatBDT(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
