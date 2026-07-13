"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  ShoppingBag,
  Stethoscope,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  providerApplicationSchema,
  type ProviderApplicationValues,
} from "@/lib/schemas/provider-application";
import type { ProviderRole } from "@/lib/types";
import { BRAND } from "@/lib/constants";
import { useMarketplaceAdminStore } from "@/lib/store/marketplace-admin";
import { useSessionStore } from "@/lib/store/session";
import { cn } from "@/lib/utils";

const roleOptions: { role: ProviderRole; label: string; icon: typeof ShoppingBag }[] = [
  { role: "seller", label: "Product Seller", icon: ShoppingBag },
  { role: "foster", label: "Foster Home", icon: HeartHandshake },
  { role: "vet", label: "Doctor / Vet", icon: Stethoscope },
  { role: "service", label: "Groomer, Trainer or Breeder", icon: GraduationCap },
];

export function OnboardingFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as ProviderRole) ?? "seller";

  const [role, setRole] = useState<ProviderRole>(
    roleOptions.some((r) => r.role === initialRole) ? initialRole : "seller"
  );
  const [submitted, setSubmitted] = useState(false);
  const createProvider = useMarketplaceAdminStore((s) => s.createProvider);
  const setCurrentProviderId = useSessionStore((s) => s.setCurrentProviderId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProviderApplicationValues>({
    resolver: zodResolver(providerApplicationSchema),
    defaultValues: { role },
  });

  function selectRole(next: ProviderRole) {
    setRole(next);
    setValue("role", next);
  }

  async function onSubmit(values: ProviderApplicationValues) {
    await new Promise((r) => setTimeout(r, 700));
    const id = createProvider({
      role: values.role,
      name: values.name,
      businessName: values.businessName,
      location: values.location,
      bio: values.bio,
      avatarInitials: values.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      credentials: values.credentials,
    });
    setCurrentProviderId(id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-6 py-32 text-center">
        <CheckCircle2 className="h-12 w-12 text-emerald" />
        <h1 className="font-display text-3xl text-ink">Application submitted</h1>
        <p className="text-ink/60">
          Our team will review your application shortly. You can track your
          status any time from your dashboard.
        </p>
        <Link
          href="/provider/dashboard"
          className={cn(buttonVariants({ size: "lg" }), "mt-2 rounded-full")}
        >
          Go to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/" className="font-display text-lg text-ink">
        {BRAND.name}
      </Link>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-emerald">
        Become a provider
      </p>
      <h1 className="mt-2 font-display text-3xl text-ink">
        Tell us about yourself
      </h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {roleOptions.map((r) => (
          <button
            key={r.role}
            type="button"
            onClick={() => selectRole(r.role)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors",
              role === r.role
                ? "border-emerald bg-emerald/5 text-emerald"
                : "border-border bg-card text-ink/60 hover:border-emerald/40"
            )}
          >
            <r.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{r.label}</span>
          </button>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6"
      >
        <div>
          <Label htmlFor="name">Your full name</Label>
          <Input id="name" className="mt-1.5" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="businessName">
            {role === "vet" ? "Clinic / practice name" : "Business name"}
          </Label>
          <Input id="businessName" className="mt-1.5" {...register("businessName")} />
          {errors.businessName && (
            <p className="mt-1 text-xs text-destructive">{errors.businessName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. Gulshan, Dhaka" className="mt-1.5" {...register("location")} />
          {errors.location && (
            <p className="mt-1 text-xs text-destructive">{errors.location.message}</p>
          )}
        </div>
        {role === "vet" && (
          <div>
            <Label htmlFor="credentials">Credentials / registration number</Label>
            <Input
              id="credentials"
              placeholder="e.g. BVSc & AH, BAU — BVC Reg. No. 1234"
              className="mt-1.5"
              {...register("credentials")}
            />
          </div>
        )}
        <div>
          <Label htmlFor="bio">
            {role === "foster"
              ? "Tell us about your home and fostering experience"
              : "Tell us about your business"}
          </Label>
          <Textarea id="bio" className="mt-1.5" {...register("bio")} />
          {errors.bio && (
            <p className="mt-1 text-xs text-destructive">{errors.bio.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full">
          {isSubmitting ? "Submitting..." : "Submit application"}
        </Button>
        <p className="text-center text-xs text-ink/40">
          {BRAND.trialDays} days free, then a flat {BRAND.commissionRate}% commission
          on what you earn.
        </p>
      </form>
    </div>
  );
}
