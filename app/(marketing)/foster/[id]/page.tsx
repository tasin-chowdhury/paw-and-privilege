import { notFound } from "next/navigation";
import { HeartHandshake } from "lucide-react";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { InquiryForm } from "@/components/marketplace/inquiry-form";
import { getFosterById } from "@/lib/data/foster";
import { getProviderById } from "@/lib/data/providers";

export default async function FosterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const foster = getFosterById(id);
  if (!foster || foster.status !== "approved") notFound();
  const provider = getProviderById(foster.providerId);

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <ImagePlaceholder icon={HeartHandshake} className="aspect-square w-full rounded-3xl" />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink/60">
                {provider?.businessName} · {provider?.location}
              </p>
              <VerifiedBadge />
            </div>
            <h1 className="mt-3 font-display text-4xl text-ink">{foster.petName}</h1>
            <p className="mt-1 text-ink/60">
              {foster.breed} · {foster.age}
            </p>
            <p className="mt-4 text-ink/70">{foster.description}</p>

            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <p className="mb-4 font-display text-lg text-ink">
                Interested in fostering or adopting {foster.petName}?
              </p>
              <InquiryForm
                submitLabel={`Ask about ${foster.petName}`}
                successMessage={`${provider?.businessName ?? "The foster home"} will reach out to you directly.`}
                messagePlaceholder="Tell us about your home and experience with pets..."
              />
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
