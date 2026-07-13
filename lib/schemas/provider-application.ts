import { z } from "zod";

export const providerApplicationSchema = z.object({
  role: z.enum(["seller", "foster", "vet", "service"]),
  name: z.string().min(2, "Please enter your full name"),
  businessName: z.string().min(2, "Business or practice name is required"),
  location: z.string().min(2, "Location is required"),
  bio: z.string().min(20, "Tell us a bit more (min. 20 characters)"),
  credentials: z.string().optional(),
});

export type ProviderApplicationValues = z.infer<typeof providerApplicationSchema>;
