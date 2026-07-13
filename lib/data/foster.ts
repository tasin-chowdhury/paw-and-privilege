import type { FosterListing } from "@/lib/types";

export const fosterListings: FosterListing[] = [
  {
    id: "f-01",
    providerId: "p-10",
    petName: "Meghla",
    species: "cat",
    breed: "Domestic Shorthair",
    age: "8 months",
    description: "Rescued from Mohammadpur, fully vaccinated, litter-trained and affectionate.",
    status: "approved",
  },
  {
    id: "f-02",
    providerId: "p-10",
    petName: "Tumpa",
    species: "cat",
    breed: "Domestic Shorthair mix",
    age: "2 years",
    description: "Calm, independent, great with children. Spayed and dewormed.",
    status: "approved",
  },
  {
    id: "f-03",
    providerId: "p-11",
    petName: "Bagha",
    species: "dog",
    breed: "Indie mix",
    age: "1 year",
    description: "Recovering from a leg injury, needs a quiet home during rehabilitation.",
    status: "rejected",
  },
];

export function getApprovedFosterListings(): FosterListing[] {
  return fosterListings.filter((f) => f.status === "approved");
}

export function getFosterById(id: string): FosterListing | undefined {
  return fosterListings.find((f) => f.id === id);
}
