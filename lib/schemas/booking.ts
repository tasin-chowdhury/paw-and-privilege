import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(11, "Enter a valid Bangladeshi phone number"),
  petName: z.string().min(1, "Pet's name is required"),
  date: z.string().min(1, "Please choose a preferred date"),
  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
