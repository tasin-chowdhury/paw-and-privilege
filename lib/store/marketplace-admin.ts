import { create } from "zustand";
import { providers as seedProviders } from "@/lib/data/providers";
import { listings as seedListings } from "@/lib/data/listings";
import type { Listing, Provider } from "@/lib/types";

interface MarketplaceAdminState {
  providers: Provider[];
  listings: Listing[];
  getProvider: (id: string) => Provider | undefined;
  getListingsByProvider: (providerId: string) => Listing[];
  approveProvider: (id: string) => void;
  rejectProvider: (id: string, reason: string) => void;
  approveListing: (id: string) => void;
  rejectListing: (id: string) => void;
  createListing: (listing: Omit<Listing, "id" | "status">) => void;
  createProvider: (
    provider: Omit<
      Provider,
      "id" | "status" | "trialEndsAt" | "joinedAt" | "commissionRate" | "rating" | "reviewCount"
    >
  ) => string;
}

export const useMarketplaceAdminStore = create<MarketplaceAdminState>((set, get) => ({
  providers: seedProviders,
  listings: seedListings,
  getProvider: (id) => get().providers.find((p) => p.id === id),
  getListingsByProvider: (providerId) =>
    get().listings.filter((l) => l.providerId === providerId),
  approveProvider: (id) =>
    set((state) => ({
      providers: state.providers.map((p) =>
        p.id === id ? { ...p, status: "approved", rejectionReason: undefined } : p
      ),
    })),
  rejectProvider: (id, reason) =>
    set((state) => ({
      providers: state.providers.map((p) =>
        p.id === id ? { ...p, status: "rejected", rejectionReason: reason } : p
      ),
    })),
  approveListing: (id) =>
    set((state) => ({
      listings: state.listings.map((l) =>
        l.id === id ? { ...l, status: "approved" } : l
      ),
    })),
  rejectListing: (id) =>
    set((state) => ({
      listings: state.listings.map((l) =>
        l.id === id ? { ...l, status: "rejected" } : l
      ),
    })),
  createListing: (listing) =>
    set((state) => ({
      listings: [
        ...state.listings,
        { ...listing, id: `l-${crypto.randomUUID().slice(0, 8)}`, status: "pending" },
      ],
    })),
  createProvider: (provider) => {
    const id = `p-${crypto.randomUUID().slice(0, 8)}`;
    const joinedAt = new Date().toISOString().slice(0, 10);
    const trialEndsAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    set((state) => ({
      providers: [
        ...state.providers,
        {
          ...provider,
          id,
          status: "pending",
          joinedAt,
          trialEndsAt,
          commissionRate: provider.role === "foster" ? 0 : 20,
          rating: 0,
          reviewCount: 0,
        },
      ],
    }));
    return id;
  },
}));
