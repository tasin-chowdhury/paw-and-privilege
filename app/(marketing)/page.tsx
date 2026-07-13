import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bird,
  Cat,
  Dog,
  Fish,
  GraduationCap,
  HeartHandshake,
  MessageCircle,
  Quote,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { TiltCard } from "@/components/marketing/tilt-card";
import { FloatingSpeciesShowcase } from "@/components/marketing/floating-species-showcase";
import { AnimatedStat } from "@/components/marketing/animated-stat";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { BRAND, CATEGORIES } from "@/lib/constants";
import { getApprovedProviders } from "@/lib/data/providers";
import { getApprovedFosterListings } from "@/lib/data/foster";

const speciesCards = [
  { slug: "dog", label: "Dogs", icon: Dog, image: "/images/species/dog.png" },
  { slug: "cat", label: "Cats", icon: Cat, image: "/images/species/cat.png" },
  { slug: "bird", label: "Birds", icon: Bird, image: "/images/species/bird.png" },
  { slug: "fish", label: "Fish", icon: Fish, image: "/images/species/fish.png" },
];

const stats = [
  { value: "500+", label: "Verified providers" },
  { value: "24/7", label: "Vet consultations" },
  { value: "100%", label: "Home-checked fosters" },
  { value: "20%", label: "No hidden fees, ever" },
];

const testimonials = [
  {
    quote:
      "Every seller on here is actually vetted. I've never trusted a pet food brand in Bangladesh the way I trust this marketplace.",
    author: "Farzana Ahmed",
    role: "Dog owner, Dhaka",
  },
  {
    quote:
      "As a foster, the verification process gave adopters real confidence. I placed three cats in their first month faster than anywhere else.",
    author: "Sabrina Islam",
    role: "Foster provider",
  },
  {
    quote:
      "The 24/7 vet chat caught a health issue in my parrot at 2am. That alone justified joining.",
    author: "Rezaul Karim",
    role: "Bird owner, Chattogram",
  },
];

export default function HomePage() {
  const vets = getApprovedProviders().filter((p) => p.role === "vet").slice(0, 3);
  const fosters = getApprovedFosterListings().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />

        <div className="relative mx-auto max-w-5xl px-6 py-28 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold">
              <ShieldCheck className="h-3.5 w-3.5" /> Every provider personally verified
            </span>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <h1 className="mt-8 text-balance font-display text-5xl leading-[1.05] tracking-tight text-ivory sm:text-7xl">
              Bangladesh&rsquo;s most exclusive
              <br />
              home for pet care.
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-ivory/70">
              {BRAND.name} connects owners with rigorously verified sellers, foster
              homes, vets, groomers and trainers — nothing goes live until our team
              confirms it.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.24}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/marketplace/dog"
                className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8")}
              >
                Explore the marketplace <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
              <Link
                href="/become-a-provider"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-ivory/30 bg-transparent px-8 text-ivory hover:bg-white/10"
                )}
              >
                Become a provider
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      <FloatingSpeciesShowcase />

      {/* Stats strip */}
      <section className="bg-ink py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.06}>
              <div className="text-center">
                <p className="font-display text-3xl text-gold sm:text-4xl">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="mt-1 text-xs text-ivory/60 sm:text-sm">{stat.label}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Shop by species */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
              Shop by species
            </p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Curated for every companion.
            </h2>
          </SectionReveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {speciesCards.map((s, i) => (
              <SectionReveal key={s.slug} delay={i * 0.06}>
                <TiltCard>
                  <Link
                    href={`/marketplace/${s.slug}`}
                    className="group block h-full overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-dim">
                      <Image
                        src={s.image}
                        alt={s.label}
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <span className="font-display text-lg text-ink">{s.label}</span>
                      <ArrowRight className="h-4 w-4 text-ink/40 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/marketplace/dog/${c.slug}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-ink/70 transition-colors hover:border-emerald hover:text-emerald"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Verified vets */}
      <section className="bg-ink py-24 text-ivory">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionReveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-medium text-gold">
                <MessageCircle className="h-3.5 w-3.5" /> 24/7 vet chat
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                Real, credentialed vets — never more than a message away.
              </h2>
              <p className="mt-4 text-ivory/60">
                Every doctor on {BRAND.name} is verified against their BVC
                registration before they can see a single client. Start a private
                consultation any hour of the day.
              </p>
              <Link
                href="/vets"
                className={cn(
                  buttonVariants(),
                  "mt-8 rounded-full bg-gold px-8 text-ink hover:bg-gold-soft"
                )}
              >
                Meet our vets <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </SectionReveal>

            <div className="grid gap-4 sm:grid-cols-3">
              {vets.map((vet, i) => (
                <SectionReveal key={vet.id} delay={i * 0.08}>
                  <Link
                    href={`/vets/${vet.id}`}
                    className="block rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 font-display text-sm text-gold">
                      {vet.avatarInitials}
                    </div>
                    <p className="mt-4 font-display text-lg">{vet.name}</p>
                    <p className="text-xs text-ivory/50">{vet.location}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gold">
                      <Star className="h-3 w-3 fill-gold" /> {vet.rating.toFixed(1)}
                      <span className="text-ivory/40">
                        &nbsp;({vet.reviewCount})
                      </span>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grooming & training */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
              Grooming &amp; training
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl text-ink sm:text-4xl">
              Studio-grade care, booked in a few taps.
            </h2>
          </SectionReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <SectionReveal>
              <Link
                href="/services"
                className="group flex items-center gap-6 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                  <Scissors className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-xl text-ink">Grooming</p>
                  <p className="mt-1 text-sm text-ink/60">
                    Breed-standard trims, spa treatments and mobile grooming.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <Link
                href="/services"
                className="group flex items-center gap-6 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-display text-xl text-ink">Training</p>
                  <p className="mt-1 text-sm text-ink/60">
                    Certified trainers for obedience, puppy foundations and more.
                  </p>
                </div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Foster spotlight */}
      <section className="bg-ivory-dim py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
                  Foster program
                </p>
                <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
                  Every foster home, personally inspected.
                </h2>
              </div>
              <Link
                href="/foster"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-full border-ink/15"
                )}
              >
                View all fosters <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {fosters.map((foster, i) => (
              <SectionReveal key={foster.id} delay={i * 0.08}>
                <Link
                  href={`/foster/${foster.id}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
                >
                  <ImagePlaceholder
                    icon={HeartHandshake}
                    variant={i + 1}
                    className="aspect-[4/3] w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg text-ink">{foster.petName}</p>
                      <VerifiedBadge />
                    </div>
                    <p className="mt-1 text-sm text-ink/60">
                      {foster.breed} · {foster.age}
                    </p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="relative overflow-hidden bg-emerald-deep py-24 text-ivory">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <Sparkles className="mx-auto h-8 w-8 text-gold" />
            <h2 className="mt-6 font-display text-3xl sm:text-4xl">
              The Atelier — our private membership tier.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ivory/70">
              Priority vet access, concierge booking, and first invitations to
              limited-run products from our most exclusive providers.
            </p>
            <Link
              href="/membership"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 rounded-full bg-gold px-8 text-ink hover:bg-gold-soft"
              )}
            >
              Explore membership
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionReveal>
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-emerald">
              What owners say
            </p>
          </SectionReveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.author} delay={i * 0.08}>
                <TiltCard>
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <Quote className="h-5 w-5 text-gold" />
                    <p className="mt-4 text-sm leading-relaxed text-ink/80">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <p className="mt-5 font-display text-base text-ink">{t.author}</p>
                    <p className="text-xs text-ink/50">{t.role}</p>
                  </div>
                </TiltCard>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Provider CTA */}
      <section className="bg-ink py-24 text-ivory">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <SectionReveal>
            <Stethoscope className="mx-auto h-8 w-8 text-gold" />
            <h2 className="mt-6 font-display text-3xl sm:text-4xl">
              Sell, foster, or practice with us.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ivory/60">
              15 days free. After that, a flat 20% commission — only on what you
              actually earn.
            </p>
            <Link
              href="/become-a-provider"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 rounded-full bg-gold px-8 text-ink hover:bg-gold-soft"
              )}
            >
              Become a provider <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
