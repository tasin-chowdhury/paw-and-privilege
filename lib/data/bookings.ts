import type { Booking } from "@/lib/types";

export const bookings: Booking[] = [
  {
    id: "b-01",
    providerId: "p-01",
    customerName: "Mehedi Hasan",
    item: "Slow-Cooked Chicken & Brown Rice Kibble ×2",
    date: "2026-07-11",
    amount: 4900,
    status: "completed",
  },
  {
    id: "b-02",
    providerId: "p-01",
    customerName: "Tania Rahman",
    item: "Salmon & Pumpkin Pâté ×6",
    date: "2026-07-10",
    amount: 2280,
    status: "confirmed",
  },
  {
    id: "b-03",
    providerId: "p-07",
    customerName: "Naima Khan",
    item: "Signature Spa & Breed Trim",
    date: "2026-07-14",
    amount: 3500,
    status: "requested",
  },
  {
    id: "b-04",
    providerId: "p-08",
    customerName: "Rakib Uddin",
    item: "Puppy Foundations Program",
    date: "2026-07-15",
    amount: 12000,
    status: "confirmed",
  },
  {
    id: "b-05",
    providerId: "p-01",
    customerName: "Sadia Islam",
    item: "Freeze-Dried Liver Treats ×3",
    date: "2026-07-09",
    amount: 2070,
    status: "completed",
  },
];

export function getBookingsByProvider(providerId: string): Booking[] {
  return bookings.filter((b) => b.providerId === providerId);
}
