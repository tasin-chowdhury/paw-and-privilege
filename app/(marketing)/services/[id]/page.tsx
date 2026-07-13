import { notFound } from "next/navigation";
import { Clock, GraduationCap, Scissors } from "lucide-react";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { BookingForm } from "@/components/marketplace/booking-form";
import { getServiceById } from "@/lib/data/services";
import { getProviderById } from "@/lib/data/providers";
import { formatBDT } from "@/lib/utils";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getServiceById(id);
  if (!service || service.status !== "approved") notFound();
  const provider = getProviderById(service.providerId);

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionReveal>
            <ImagePlaceholder
              icon={service.kind === "grooming" ? Scissors : GraduationCap}
              className="aspect-square w-full rounded-3xl"
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-ink/60">
                {provider?.businessName} · {provider?.location}
              </p>
              <VerifiedBadge />
            </div>
            <h1 className="mt-3 font-display text-4xl text-ink">{service.title}</h1>
            <p className="mt-4 text-ink/70">{service.description}</p>
            <div className="mt-6 flex items-center gap-6">
              <p className="font-display text-3xl text-ink">
                {formatBDT(service.price)}
              </p>
              <span className="flex items-center gap-1 text-sm text-ink/50">
                <Clock className="h-4 w-4" /> {service.duration}
              </span>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <p className="mb-4 font-display text-lg text-ink">Request a booking</p>
              <BookingForm itemLabel={service.title} />
            </div>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}
