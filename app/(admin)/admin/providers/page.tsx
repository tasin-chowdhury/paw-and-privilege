"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMarketplaceAdminStore } from "@/lib/store/marketplace-admin";
import { cn } from "@/lib/utils";

export default function AdminProvidersPage() {
  const providers = useMarketplaceAdminStore((s) => s.providers);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
          Providers
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">All Providers</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Trial ends</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium text-ink">{p.businessName}</TableCell>
                <TableCell className="capitalize text-ink/60">{p.role}</TableCell>
                <TableCell className="text-ink/60">{p.location}</TableCell>
                <TableCell className="text-ink/60">{p.trialEndsAt}</TableCell>
                <TableCell className="text-ink/60">{p.commissionRate}%</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs capitalize",
                      p.status === "approved" && "bg-emerald/10 text-emerald",
                      p.status === "pending" && "bg-gold/10 text-gold",
                      p.status === "rejected" && "bg-destructive/10 text-destructive"
                    )}
                  >
                    {p.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
