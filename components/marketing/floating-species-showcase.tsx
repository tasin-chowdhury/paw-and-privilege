"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const cards = [
  {
    slug: "dog",
    label: "Dogs",
    image: "/images/species/dog.png",
    className: "left-0 top-0 z-20 w-[38%] rotate-[-6deg]",
    float: { duration: 5.5, delay: 0 },
  },
  {
    slug: "cat",
    label: "Cats",
    image: "/images/species/cat.png",
    className: "right-0 top-6 z-20 w-[34%] rotate-[5deg]",
    float: { duration: 6.5, delay: 0.4 },
  },
  {
    slug: "bird",
    label: "Birds",
    image: "/images/species/bird.png",
    className: "left-0 bottom-6 z-20 w-[34%] rotate-[4deg]",
    float: { duration: 6, delay: 0.8 },
  },
  {
    slug: "fish",
    label: "Fish",
    image: "/images/species/fish.png",
    className: "right-0 bottom-0 z-20 w-[38%] rotate-[-4deg]",
    float: { duration: 7, delay: 0.2 },
  },
];

export function FloatingSpeciesShowcase() {
  return (
    <section className="overflow-hidden bg-ivory-dim py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
            One home, every companion
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl text-ink sm:text-4xl">
            Whatever you keep, we&rsquo;ve verified for it.
          </h2>
          <p className="mt-4 max-w-md text-ink/60">
            Dogs, cats, birds, fish — every species has its own verified
            sellers, foster homes, and specialists. Nothing is generic here.
          </p>
          <Link
            href="/marketplace/dog"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full px-8")}
          >
            Explore the marketplace <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="relative mx-auto h-[520px] w-full max-w-md sm:h-[600px] sm:max-w-lg">
          {cards.map((card) => (
            <motion.div
              key={card.slug}
              animate={{ y: [0, -14, 0] }}
              transition={{
                duration: card.float.duration,
                delay: card.float.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={cn("absolute", card.className)}
            >
              <Link
                href={`/marketplace/${card.slug}`}
                className="block overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-ink/20 transition-transform hover:scale-[1.03]"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <div className="bg-card px-3 py-2 text-center">
                  <span className="font-display text-sm text-ink">{card.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
