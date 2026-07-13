import Link from "next/link";
import { Star, Stethoscope } from "lucide-react";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { getApprovedProviders } from "@/lib/data/providers";

export default function VetsPage() {
  const vets = getApprovedProviders().filter((p) => p.role === "vet");

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
            Verified vets
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            24/7 consultations, credential-checked.
          </h1>
          <p className="mt-3 max-w-lg text-ink/60">
            Every doctor listed here has had their BVC registration personally
            verified by our team before seeing a single client.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vets.map((vet, i) => (
            <SectionReveal key={vet.id} delay={(i % 3) * 0.06}>
              <Link
                href={`/vets/${vet.id}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
              >
                <ImagePlaceholder icon={Stethoscope} variant={i} className="aspect-[5/3] w-full" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-lg text-ink">{vet.name}</p>
                    <VerifiedBadge />
                  </div>
                  <p className="mt-1 text-sm text-ink/60">{vet.credentials}</p>
                  <p className="mt-1 text-xs text-ink/40">{vet.location}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-ink/60">
                    <Star className="h-3 w-3 fill-gold text-gold" />
                    {vet.rating.toFixed(1)} ({vet.reviewCount})
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
