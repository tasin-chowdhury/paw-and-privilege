"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSessionStore } from "@/lib/store/session";
import { getBookingsByProvider } from "@/lib/data/bookings";
import { formatBDT, cn } from "@/lib/utils";

export default function ProviderBookingsPage() {
  const currentProviderId = useSessionStore((s) => s.currentProviderId);
  const bookings = getBookingsByProvider(currentProviderId);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
          Bookings &amp; orders
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">Bookings &amp; Orders</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-ink/50">
                  No bookings yet.
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium text-ink">{b.customerName}</TableCell>
                  <TableCell className="text-ink/60">{b.item}</TableCell>
                  <TableCell className="text-ink/60">{b.date}</TableCell>
                  <TableCell className="text-ink/60">{formatBDT(b.amount)}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs capitalize",
                        b.status === "completed" && "bg-emerald/10 text-emerald",
                        b.status === "confirmed" && "bg-blue-500/10 text-blue-600",
                        b.status === "requested" && "bg-gold/10 text-gold",
                        b.status === "cancelled" && "bg-destructive/10 text-destructive"
                      )}
                    >
                      {b.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
