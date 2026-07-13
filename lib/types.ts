export type Species = "cat" | "dog" | "bird" | "fish";

export type ProductCategory =
  | "dry-food"
  | "wet-food"
  | "treats"
  | "toys"
  | "accessories"
  | "medicine";

export type ProviderRole = "seller" | "foster" | "vet" | "service";

export type VerificationStatus = "pending" | "approved" | "rejected";

export interface Provider {
  id: string;
  role: ProviderRole;
  name: string;
  businessName: string;
  location: string;
  bio: string;
  avatarInitials: string;
  status: VerificationStatus;
  rejectionReason?: string;
  trialEndsAt: string;
  joinedAt: string;
  commissionRate: number;
  rating: number;
  reviewCount: number;
  credentials?: string;
}

export interface Listing {
  id: string;
  providerId: string;
  species: Species[];
  category: ProductCategory;
  title: string;
  description: string;
  price: number;
  unit: string;
  status: VerificationStatus;
  featured?: boolean;
}

export interface FosterListing {
  id: string;
  providerId: string;
  petName: string;
  species: Species;
  breed: string;
  age: string;
  description: string;
  status: VerificationStatus;
}

export interface ServiceListing {
  id: string;
  providerId: string;
  kind: "grooming" | "training" | "breeding";
  title: string;
  description: string;
  price: number;
  duration: string;
  status: VerificationStatus;
}

export interface Booking {
  id: string;
  providerId: string;
  customerName: string;
  item: string;
  date: string;
  amount: number;
  status: "requested" | "confirmed" | "completed" | "cancelled";
}
