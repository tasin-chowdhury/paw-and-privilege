import { z } from "zod";

export const listingSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Add a short description (min. 10 characters)"),
  category: z.enum([
    "dry-food",
    "wet-food",
    "treats",
    "toys",
    "accessories",
    "medicine",
  ]),
  species: z.array(z.enum(["cat", "dog", "bird", "fish"])).min(1, "Pick at least one species"),
  price: z.number().positive("Enter a valid price"),
  unit: z.string().min(1, "e.g. 1kg bag, each, 100g jar"),
});

export type ListingFormValues = z.infer<typeof listingSchema>;
