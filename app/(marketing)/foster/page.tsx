import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { getApprovedFosterListings } from "@/lib/data/foster";
import { getProviderById } from "@/lib/data/providers";

export default function FosterPage() {
  const fosters = getApprovedFosterListings();

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
            Foster program
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Every foster home, personally inspected.
          </h1>
          <p className="mt-3 max-w-lg text-ink/60">
            We visit and verify every foster home before it's listed, so you can
            adopt or support with total confidence.
          </p>
        </SectionReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fosters.map((foster, i) => {
            const provider = getProviderById(foster.providerId);
            return (
              <SectionReveal key={foster.id} delay={(i % 3) * 0.06}>
                <Link
                  href={`/foster/${foster.id}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
                >
                  <ImagePlaceholder icon={HeartHandshake} variant={i} className="aspect-[4/3] w-full" />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="font-display text-lg text-ink">{foster.petName}</p>
                      <VerifiedBadge />
                    </div>
                    <p className="mt-1 text-sm text-ink/60">
                      {foster.breed} · {foster.age}
                    </p>
                    <p className="mt-1 text-xs text-ink/40">{provider?.businessName}</p>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
