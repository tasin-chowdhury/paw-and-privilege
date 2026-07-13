"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { BRAND, PUBLIC_NAV } from "@/lib/constants";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

export function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
  const openCart = useCartStore((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-ink/95 backdrop-blur transition-all duration-300",
        scrolled ? "py-3" : "py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt={BRAND.name}
            width={32}
            height={40}
            className="h-8 w-auto object-contain"
          />
          <span className="font-display text-xl tracking-tight text-ivory">
            {BRAND.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ivory/80 transition-colors hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative rounded-full p-2 text-ivory transition-colors hover:bg-white/10"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink">
                {itemCount}
              </span>
            )}
          </button>

          <Link
            href="/provider/onboarding"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden sm:inline-flex rounded-full bg-gold text-ink hover:bg-gold-soft"
            )}
          >
            Become a Provider
          </Link>

          <Sheet>
            <SheetTrigger
              aria-label="Open menu"
              className="rounded-full p-2 text-ivory transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-ivory">
              <SheetTitle className="px-6 pt-6 font-display text-lg">
                {BRAND.name}
              </SheetTitle>
              <nav className="flex flex-col gap-1 px-6 py-4">
                {PUBLIC_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-ink/5"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
