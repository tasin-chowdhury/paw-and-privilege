"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useMarketplaceAdminStore } from "@/lib/store/marketplace-admin";
import { formatBDT } from "@/lib/utils";

export default function ReviewQueuePage() {
  const providers = useMarketplaceAdminStore((s) => s.providers);
  const listings = useMarketplaceAdminStore((s) => s.listings);
  const approveProvider = useMarketplaceAdminStore((s) => s.approveProvider);
  const rejectProvider = useMarketplaceAdminStore((s) => s.rejectProvider);
  const approveListing = useMarketplaceAdminStore((s) => s.approveListing);
  const rejectListing = useMarketplaceAdminStore((s) => s.rejectListing);

  const pendingProviders = providers.filter((p) => p.status === "pending");
  const pendingListings = listings.filter((l) => l.status === "pending");

  const [rejectTarget, setRejectTarget] = useState<
    { kind: "provider" | "listing"; id: string; label: string } | null
  >(null);
  const [reason, setReason] = useState("");

  function confirmReject() {
    if (!rejectTarget) return;
    if (rejectTarget.kind === "provider") {
      rejectProvider(rejectTarget.id, reason || "Application did not meet verification standards.");
    } else {
      rejectListing(rejectTarget.id);
    }
    setRejectTarget(null);
    setReason("");
  }

  const totalPending = pendingProviders.length + pendingListings.length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald">
          Review queue
        </p>
        <h1 className="mt-2 font-display text-3xl text-ink">
          {totalPending} item{totalPending === 1 ? "" : "s"} awaiting review
        </h1>
      </div>

      <div>
        <p className="mb-3 font-display text-lg text-ink">Provider applications</p>
        {pendingProviders.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-sm text-ink/50">
            No pending provider applications.
          </p>
        ) : (
          <div className="space-y-3">
            {pendingProviders.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink">
                    {p.businessName}{" "}
                    <span className="ml-1 rounded-full bg-secondary px-2 py-0.5 text-xs capitalize text-ink/60">
                      {p.role}
                    </span>
                  </p>
                  <p className="mt-0.5 text-sm text-ink/50">
                    {p.name} · {p.location}
                  </p>
                  {p.credentials && (
                    <p className="mt-1 text-xs text-ink/40">{p.credentials}</p>
                  )}
                  <p className="mt-2 max-w-lg text-sm text-ink/60">{p.bio}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/5"
                    onClick={() =>
                      setRejectTarget({ kind: "provider", id: p.id, label: p.businessName })
                    }
                  >
                    <X className="h-4 w-4" /> Reject
                  </Button>
                  <Button size="sm" onClick={() => approveProvider(p.id)}>
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="mb-3 font-display text-lg text-ink">New listings</p>
        {pendingListings.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-6 text-sm text-ink/50">
            No pending listings.
          </p>
        ) : (
          <div className="space-y-3">
            {pendingListings.map((l) => (
              <div
                key={l.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink">{l.title}</p>
                  <p className="mt-0.5 text-sm text-ink/50">
                    {formatBDT(l.price)} / {l.unit} · {l.category.replace("-", " ")}
                  </p>
                  <p className="mt-2 max-w-lg text-sm text-ink/60">{l.description}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive/30 text-destructive hover:bg-destructive/5"
                    onClick={() =>
                      setRejectTarget({ kind: "listing", id: l.id, label: l.title })
                    }
                  >
                    <X className="h-4 w-4" /> Reject
                  </Button>
                  <Button size="sm" onClick={() => approveListing(l.id)}>
                    <Check className="h-4 w-4" /> Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!rejectTarget} onOpenChange={(open) => !open && setRejectTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject {rejectTarget?.label}</DialogTitle>
          </DialogHeader>
          <div>
            <Label htmlFor="reason">Reason (shown to the provider)</Label>
            <Textarea
              id="reason"
              className="mt-1.5"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. Please resubmit with clearer verification documents."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              Confirm rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
