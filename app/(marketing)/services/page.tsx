import Link from "next/link";
import { Clock, GraduationCap, Scissors } from "lucide-react";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { ImagePlaceholder } from "@/components/marketing/image-placeholder";
import { VerifiedBadge } from "@/components/marketplace/verified-badge";
import { getApprovedServices } from "@/lib/data/services";
import { getProviderById } from "@/lib/data/providers";
import { formatBDT } from "@/lib/utils";

export default function ServicesPage() {
  const services = getApprovedServices();

  return (
    <div className="bg-ivory pt-32 pb-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
            Grooming &amp; training
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Studio-grade care, verified providers.
          </h1>
        </SectionReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const provider = getProviderById(service.providerId);
            return (
              <SectionReveal key={service.id} delay={(i % 3) * 0.06}>
                <Link
                  href={`/services/${service.id}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
                >
                  <ImagePlaceholder
                    icon={service.kind === "grooming" ? Scissors : GraduationCap}
                    variant={i}
                    className="aspect-[5/3] w-full"
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-ink/50">{provider?.businessName}</p>
                      <VerifiedBadge />
                    </div>
                    <p className="mt-2 font-display text-lg text-ink">{service.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-ink/60">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="font-display text-lg text-ink">
                        {formatBDT(service.price)}
                      </p>
                      <span className="flex items-center gap-1 text-xs text-ink/50">
                        <Clock className="h-3 w-3" /> {service.duration}
                      </span>
                    </div>
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
