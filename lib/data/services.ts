import type { ServiceListing } from "@/lib/types";

export const serviceListings: ServiceListing[] = [
  {
    id: "s-01",
    providerId: "p-07",
    kind: "grooming",
    title: "Signature Spa & Breed Trim",
    description: "Bath, de-shed treatment, breed-standard trim, ear and nail care.",
    price: 3500,
    duration: "2 hrs",
    status: "approved",
  },
  {
    id: "s-02",
    providerId: "p-07",
    kind: "grooming",
    title: "Express Bath & Blow-Dry",
    description: "Quick refresh wash for in-between full grooming visits.",
    price: 1400,
    duration: "45 min",
    status: "approved",
  },
  {
    id: "s-03",
    providerId: "p-08",
    kind: "training",
    title: "Puppy Foundations Program",
    description: "4-week positive-reinforcement program covering house manners and recall.",
    price: 12000,
    duration: "4 weeks",
    status: "approved",
  },
  {
    id: "s-04",
    providerId: "p-08",
    kind: "training",
    title: "Behavioral Rehabilitation Session",
    description: "One-on-one session for reactivity, anxiety, or aggression concerns.",
    price: 3200,
    duration: "90 min",
    status: "approved",
  },
  {
    id: "s-05",
    providerId: "p-09",
    kind: "breeding",
    title: "Maine Coon Kitten Reservation",
    description: "Health-tested lineage, TICA registered, vaccinated and dewormed.",
    price: 45000,
    duration: "N/A",
    status: "pending",
  },
];

export function getApprovedServices(kind?: ServiceListing["kind"]): ServiceListing[] {
  return serviceListings.filter(
    (s) => s.status === "approved" && (!kind || s.kind === kind)
  );
}

export function getServiceById(id: string): ServiceListing | undefined {
  return serviceListings.find((s) => s.id === id);
}

