import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const gradients = [
  "from-emerald via-emerald-deep to-ink",
  "from-gold-soft via-gold to-emerald-deep",
  "from-ink via-emerald-deep to-emerald",
  "from-ivory-dim via-gold-soft to-gold",
];

export function ImagePlaceholder({
  icon: Icon,
  variant = 0,
  label,
  className,
}: {
  icon: LucideIcon;
  variant?: number;
  label?: string;
  className?: string;
}) {
  const gradient = gradients[variant % gradients.length];
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
      <Icon className="h-10 w-10 text-ivory/70" strokeWidth={1.25} />
      {label && (
        <span className="absolute bottom-3 left-3 text-xs font-medium text-ivory/70">
          {label}
        </span>
      )}
    </div>
  );
}
