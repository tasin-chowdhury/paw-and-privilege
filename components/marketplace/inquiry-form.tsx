"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { inquirySchema, type InquiryFormValues } from "@/lib/schemas/inquiry";

export function InquiryForm({
  submitLabel,
  successMessage,
  messagePlaceholder,
}: {
  submitLabel: string;
  successMessage: string;
  messagePlaceholder?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormValues>({ resolver: zodResolver(inquirySchema) });

  async function onSubmit() {
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-emerald/20 bg-emerald/5 p-8 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald" />
        <p className="font-display text-lg text-ink">Request sent</p>
        <p className="text-sm text-ink/60">{successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" className="mt-1.5" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="phone">Phone number</Label>
        <Input id="phone" placeholder="01XXXXXXXXX" className="mt-1.5" {...register("phone")} />
        {errors.phone && (
          <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder={messagePlaceholder}
          className="mt-1.5"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full rounded-full" size="lg">
        {isSubmitting ? "Sending..." : submitLabel}
      </Button>
    </form>
  );
}
