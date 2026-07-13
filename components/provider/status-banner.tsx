import { AlertTriangle, Clock, ShieldCheck } from "lucide-react";
import type { Provider } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StatusBanner({ provider }: { provider: Provider }) {
  if (provider.status === "approved") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald/20 bg-emerald/5 px-5 py-4 text-emerald">
        <ShieldCheck className="h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">
          Verified &amp; live — your listings are visible to buyers.
        </p>
      </div>
    );
  }

  if (provider.status === "rejected") {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-destructive">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <div>
          <p className="text-sm font-medium">Application not approved</p>
          {provider.rejectionReason && (
            <p className="mt-1 text-sm text-destructive/80">
              {provider.rejectionReason}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-gold-soft">
      <Clock className={cn("h-5 w-5 shrink-0", "text-gold")} />
      <p className="text-sm font-medium text-ink">
        Your application is under review — our team verifies every provider
        before you go live.
      </p>
    </div>
  );
}
