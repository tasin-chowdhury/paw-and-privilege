import { ClipboardCheck, ShieldCheck, Users } from "lucide-react";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { BRAND } from "@/lib/constants";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Verification first",
    description:
      "No seller, foster home, vet, groomer or trainer goes live until our team has personally reviewed their credentials, licenses, or home.",
  },
  {
    icon: ClipboardCheck,
    title: "Accountability always",
    description:
      "Every provider is reviewed continuously — ratings, reports and renewals keep standards high long after approval.",
  },
  {
    icon: Users,
    title: "Built for Bangladesh",
    description:
      "From Dhaka to Sylhet to Chattogram, we work with local providers who understand the realities of pet care here.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
              About {BRAND.name}
            </p>
            <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
              Trust is the product.
            </h1>
            <p className="mt-4 text-ink/60">
              {BRAND.name} exists because pet owners in Bangladesh deserve to
              know exactly who they&rsquo;re trusting with their companion —
              whether that&rsquo;s the person selling their food, the home
              fostering a rescue, or the doctor on the other end of a 2am chat.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-ink py-20 text-ivory">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <SectionReveal key={p.title} delay={i * 0.08}>
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 font-display text-lg">{p.title}</p>
                  <p className="mt-2 text-sm text-ivory/60">{p.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <SectionReveal>
            <p className="font-display text-2xl text-ink">
              &ldquo;Every seller. Every foster home. Every vet.
              <br />
              Personally verified.&rdquo;
            </p>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
