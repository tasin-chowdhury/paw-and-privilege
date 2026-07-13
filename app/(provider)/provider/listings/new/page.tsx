"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listingSchema, type ListingFormValues } from "@/lib/schemas/listing";
import { CATEGORIES, SPECIES } from "@/lib/constants";
import { useSessionStore } from "@/lib/store/session";
import { useMarketplaceAdminStore } from "@/lib/store/marketplace-admin";

export default function NewListingPage() {
  const router = useRouter();
  const currentProviderId = useSessionStore((s) => s.currentProviderId);
  const createListing = useMarketplaceAdminStore((s) => s.createListing);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: { species: [] },
  });

  async function onSubmit(values: ListingFormValues) {
    await new Promise((r) => setTimeout(r, 500));
    createListing({
      providerId: currentProviderId,
      title: values.title,
      description: values.description,
      category: values.category,
      species: values.species,
      price: values.price,
      unit: values.unit,
    });
    router.push("/provider/listings");
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
          New listing
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">Add a listing</h1>
        <p className="mt-1 text-sm text-ink/50">
          New listings enter our review queue before appearing in the marketplace.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 rounded-2xl border border-border bg-card p-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" className="mt-1.5" {...register("title")} />
          {errors.title && (
            <p className="mt-1 text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" className="mt-1.5" {...register("description")} />
          {errors.description && (
            <p className="mt-1 text-xs text-destructive">{errors.description.message}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <Label htmlFor="category">Category</Label>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="category" className="mt-1.5 w-full">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c.slug} value={c.slug}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="mt-1 text-xs text-destructive">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input id="unit" placeholder="e.g. 1kg bag" className="mt-1.5" {...register("unit")} />
            {errors.unit && (
              <p className="mt-1 text-xs text-destructive">{errors.unit.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="price">Price (BDT)</Label>
          <Input
            id="price"
            type="number"
            className="mt-1.5"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="mt-1 text-xs text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label>Species</Label>
          <Controller
            control={control}
            name="species"
            render={({ field }) => (
              <div className="mt-2 flex flex-wrap gap-4">
                {SPECIES.map((s) => (
                  <label key={s.slug} className="flex items-center gap-2 text-sm text-ink/80">
                    <Checkbox
                      checked={field.value?.includes(s.slug)}
                      onCheckedChange={(checked) => {
                        const next = checked
                          ? [...(field.value ?? []), s.slug]
                          : (field.value ?? []).filter((v) => v !== s.slug);
                        field.onChange(next);
                      }}
                    />
                    {s.label}
                  </label>
                ))}
              </div>
            )}
          />
          {errors.species && (
            <p className="mt-1 text-xs text-destructive">{errors.species.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full rounded-full">
          {isSubmitting ? "Submitting..." : "Submit for review"}
        </Button>
      </form>
    </div>
  );
}
