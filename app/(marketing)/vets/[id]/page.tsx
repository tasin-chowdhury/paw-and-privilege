import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { VetChatMock } from "@/components/marketplace/vet-chat-mock";
import { getProviderById } from "@/lib/data/providers";

export default async function VetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vet = getProviderById(id);
  if (!vet || vet.role !== "vet" || vet.status !== "approved") notFound();

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <SectionReveal>
            <div className="flex items-center gap-2">
              <VerifiedBadge />
            </div>
            <h1 className="mt-3 font-display text-4xl text-ink">{vet.name}</h1>
            <p className="mt-1 text-ink/60">{vet.credentials}</p>
            <p className="mt-1 text-sm text-ink/40">{vet.location}</p>
            <div className="mt-3 flex items-center gap-1 text-sm text-ink/60">
              <Star className="h-4 w-4 fill-gold text-gold" />
              {vet.rating.toFixed(1)} ({vet.reviewCount} reviews)
            </div>
            <p className="mt-6 text-ink/70">{vet.bio}</p>

            <div className="mt-8 rounded-2xl border border-emerald/20 bg-emerald/5 p-5 text-sm text-emerald">
              This is a live chat preview. Real consultations will connect you
              directly with {vet.name} once payments go live.
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <VetChatMock vetName={vet.name} />
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
