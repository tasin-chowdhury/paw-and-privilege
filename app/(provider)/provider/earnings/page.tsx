"use client";

import { TrialCountdown } from "@/components/provider/trial-countdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSessionStore } from "@/lib/store/session";
import { useMarketplaceAdminStore } from "@/lib/store/marketplace-admin";
import { getBookingsByProvider } from "@/lib/data/bookings";
import { formatBDT } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

export default function ProviderEarningsPage() {
  const currentProviderId = useSessionStore((s) => s.currentProviderId);
  const provider = useMarketplaceAdminStore((s) => s.getProvider(currentProviderId));
  if (!provider) return null;

  const bookings = getBookingsByProvider(provider.id).filter(
    (b) => b.status === "completed"
  );
  const gross = bookings.reduce((sum, b) => sum + b.amount, 0);
  const commission = gross * (provider.commissionRate / 100);
  const net = gross - commission;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
          Earnings
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">Earnings</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <TrialCountdown trialEndsAt={provider.trialEndsAt} />
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-ink/50">Gross revenue</p>
          <p className="mt-2 font-display text-3xl text-ink">{formatBDT(gross)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-ink/50">
            Net after {provider.commissionRate}% commission
          </p>
          <p className="mt-2 font-display text-3xl text-emerald">{formatBDT(net)}</p>
        </div>
      </div>

      <div>
        <p className="mb-3 font-display text-lg text-ink">Payout history</p>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Gross</TableHead>
                <TableHead>Commission ({BRAND.commissionRate}%)</TableHead>
                <TableHead>Net</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-ink/50">
                    No completed transactions yet.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((b) => {
                  const c = b.amount * (provider.commissionRate / 100);
                  return (
                    <TableRow key={b.id}>
                      <TableCell className="text-ink/60">{b.date}</TableCell>
                      <TableCell className="text-ink">{b.item}</TableCell>
                      <TableCell className="text-ink/60">{formatBDT(b.amount)}</TableCell>
                      <TableCell className="text-ink/60">-{formatBDT(c)}</TableCell>
                      <TableCell className="font-medium text-emerald">
                        {formatBDT(b.amount - c)}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
