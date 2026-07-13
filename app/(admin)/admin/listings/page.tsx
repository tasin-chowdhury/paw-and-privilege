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
import { formatBDT, cn } from "@/lib/utils";

export default function AdminListingsPage() {
  const listings = useMarketplaceAdminStore((s) => s.listings);
  const providers = useMarketplaceAdminStore((s) => s.providers);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
          Listings
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">All Listings</h1>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.map((l) => (
              <TableRow key={l.id}>
                <TableCell className="font-medium text-ink">{l.title}</TableCell>
                <TableCell className="text-ink/60">
                  {providers.find((p) => p.id === l.providerId)?.businessName}
                </TableCell>
                <TableCell className="capitalize text-ink/60">
                  {l.category.replace("-", " ")}
                </TableCell>
                <TableCell className="text-ink/60">{formatBDT(l.price)}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs capitalize",
                      l.status === "approved" && "bg-emerald/10 text-emerald",
                      l.status === "pending" && "bg-gold/10 text-gold",
                      l.status === "rejected" && "bg-destructive/10 text-destructive"
                    )}
                  >
                    {l.status}
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
