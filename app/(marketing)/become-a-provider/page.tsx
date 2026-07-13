import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShoppingBag,
  Stethoscope,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const roles = [
  {
    role: "seller",
    icon: ShoppingBag,
    title: "Product Seller",
    description: "List pet food, treats, toys, accessories or medicine for sale.",
  },
  {
    role: "foster",
    icon: HeartHandshake,
    title: "Foster Home",
    description: "List pets available for foster after a home verification.",
  },
  {
    role: "vet",
    icon: Stethoscope,
    title: "Doctor / Vet",
    description: "Offer consultations and the 24/7 chat, once credentials are verified.",
  },
  {
    role: "service",
    icon: GraduationCap,
    title: "Groomer, Trainer or Breeder",
    description: "List bookable services or a verified breeding program.",
  },
];

const steps = [
  {
    title: "Apply in minutes",
    description: "Pick your role and tell us about your business or practice.",
  },
  {
    title: "We verify you",
    description: "Our team reviews your credentials, licenses, or home before you go live.",
  },
  {
    title: "Start earning",
    description: `15 days free, then a flat ${BRAND.commissionRate}% commission — only on what you earn.`,
  },
];

export default function BecomeProviderPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
              Become a provider
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              Join Bangladesh&rsquo;s most trusted pet marketplace.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-ink/60">
              Every provider is personally verified — which means every buyer
              trusts what they find here. 15 days free, then {BRAND.commissionRate}%
              commission on completed sales or bookings only.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((r, i) => (
              <SectionReveal key={r.role} delay={i * 0.06}>
                <Link
                  href={`/provider/onboarding?role=${r.role}`}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald/10 text-emerald">
                    <r.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 font-display text-lg text-ink">{r.title}</p>
                  <p className="mt-2 flex-1 text-sm text-ink/60">{r.description}</p>
                  <span className="mt-4 flex items-center gap-1 text-sm font-medium text-emerald">
                    Apply <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-ivory">
        <div className="mx-auto max-w-4xl px-6">
          <SectionReveal>
            <h2 className="text-center font-display text-3xl">How it works</h2>
          </SectionReveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.08}>
                <div className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-sm text-ink">
                    {i + 1}
                  </div>
                  <p className="mt-4 font-display text-lg">{s.title}</p>
                  <p className="mt-2 text-sm text-ivory/60">{s.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <div className="mx-auto flex max-w-md flex-col gap-3 text-left">
              {[
                "No upfront fees — pay only when you earn",
                "Verified badge builds instant buyer trust",
                "Dashboard for listings, bookings and earnings",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald" />
                  <span className="text-ink/70">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/provider/onboarding"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 rounded-full px-8")}
            >
              Start your application <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
