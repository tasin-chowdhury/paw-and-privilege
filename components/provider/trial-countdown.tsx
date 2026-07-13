import { Progress } from "@/components/ui/progress";
import { BRAND } from "@/lib/constants";

export function TrialCountdown({ trialEndsAt }: { trialEndsAt: string }) {
  const now = new Date();
  const end = new Date(trialEndsAt);
  const msLeft = end.getTime() - now.getTime();
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

  if (daysLeft <= 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-medium text-ink">Free trial ended</p>
        <p className="mt-1 text-xs text-ink/50">
          A flat {BRAND.commissionRate}% commission now applies to completed sales
          and bookings.
        </p>
      </div>
    );
  }

  const percent = Math.min(100, (daysLeft / BRAND.trialDays) * 100);

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="text-sm font-medium text-ink">
        {daysLeft} day{daysLeft === 1 ? "" : "s"} left in your free trial
      </p>
      <Progress value={percent} className="mt-3" />
      <p className="mt-2 text-xs text-ink/50">
        After your trial, a flat {BRAND.commissionRate}% commission applies —
        only on what you earn.
      </p>
    </div>
  );
}
