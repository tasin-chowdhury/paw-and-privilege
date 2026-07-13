"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
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
import { formatBDT } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function ProviderListingsPage() {
  const currentProviderId = useSessionStore((s) => s.currentProviderId);
  const listings = useMarketplaceAdminStore((s) =>
    s.getListingsByProvider(currentProviderId)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
            Listings
          </p>
          <h1 className="mt-2 font-display text-3xl text-ink">Your Listings</h1>
        </div>
        <Link
          href="/provider/listings/new"
          className={cn(buttonVariants(), "rounded-full")}
        >
          <Plus className="h-4 w-4" /> New listing
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-ink/50">
                  No listings yet — create your first one.
                </TableCell>
              </TableRow>
            ) : (
              listings.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-medium text-ink">{l.title}</TableCell>
                  <TableCell className="capitalize text-ink/60">
                    {l.category.replace("-", " ")}
                  </TableCell>
                  <TableCell className="text-ink/60">
                    {formatBDT(l.price)} / {l.unit}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs",
                        l.status === "approved" && "bg-emerald/10 text-emerald",
                        l.status === "pending" && "bg-gold/10 text-gold",
                        l.status === "rejected" && "bg-destructive/10 text-destructive"
                      )}
                    >
                      {l.status}
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
