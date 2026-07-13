"use client";

import Link from "next/link";
import { ArrowRight, Eye, ListChecks, Wallet } from "lucide-react";
import { StatusBanner } from "@/components/provider/status-banner";
import { TrialCountdown } from "@/components/provider/trial-countdown";
import { useSessionStore } from "@/lib/store/session";
import { useMarketplaceAdminStore } from "@/lib/store/marketplace-admin";
import { getBookingsByProvider } from "@/lib/data/bookings";
import { formatBDT } from "@/lib/utils";

export default function ProviderDashboardPage() {
  const currentProviderId = useSessionStore((s) => s.currentProviderId);
  const provider = useMarketplaceAdminStore((s) => s.getProvider(currentProviderId));
  const listings = useMarketplaceAdminStore((s) =>
    s.getListingsByProvider(currentProviderId)
  );

  if (!provider) return null;

  const bookings = getBookingsByProvider(provider.id);
  const completed = bookings.filter((b) => b.status === "completed");
  const commissionOwed = completed.reduce(
    (sum, b) => sum + b.amount * (provider.commissionRate / 100),
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
          Dashboard
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">
          Welcome, {provider.name.split(" ")[0]}
        </h1>
      </div>

      <StatusBanner provider={provider} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TrialCountdown trialEndsAt={provider.trialEndsAt} />

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-ink/50">
            <Eye className="h-4 w-4" /> <span className="text-xs">Listing views (30d)</span>
          </div>
          <p className="mt-2 font-display text-3xl text-ink">
            {(listings.length * 214 + 96) % 900 + 120}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-ink/50">
            <Wallet className="h-4 w-4" /> <span className="text-xs">Commission owed</span>
          </div>
          <p className="mt-2 font-display text-3xl text-ink">
            {formatBDT(commissionOwed)}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 font-display text-lg text-ink">
            <ListChecks className="h-4 w-4 text-emerald" /> Your listings
          </p>
          <Link
            href="/provider/listings"
            className="flex items-center gap-1 text-sm font-medium text-emerald"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {listings.length === 0 ? (
          <p className="mt-4 text-sm text-ink/50">
            You haven&rsquo;t added any listings yet.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {listings.slice(0, 4).map((l) => (
              <div key={l.id} className="flex items-center justify-between py-3">
                <p className="text-sm text-ink">{l.title}</p>
                <span
                  className={
                    l.status === "approved"
                      ? "rounded-full bg-emerald/10 px-3 py-1 text-xs text-emerald"
                      : l.status === "pending"
                      ? "rounded-full bg-gold/10 px-3 py-1 text-xs text-gold"
                      : "rounded-full bg-destructive/10 px-3 py-1 text-xs text-destructive"
                  }
                >
                  {l.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
