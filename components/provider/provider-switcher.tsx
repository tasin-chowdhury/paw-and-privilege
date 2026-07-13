"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSessionStore } from "@/lib/store/session";
import { useMarketplaceAdminStore } from "@/lib/store/marketplace-admin";

export function ProviderSwitcher() {
  const providers = useMarketplaceAdminStore((s) => s.providers);
  const currentProviderId = useSessionStore((s) => s.currentProviderId);
  const setCurrentProviderId = useSessionStore((s) => s.setCurrentProviderId);

  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-ivory/40">
        Viewing as (demo)
      </p>
      <Select
        value={currentProviderId}
        onValueChange={(value) => value && setCurrentProviderId(value)}
      >
        <SelectTrigger className="w-full border-white/10 bg-white/5 text-ivory">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {providers.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.businessName} — {p.status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
