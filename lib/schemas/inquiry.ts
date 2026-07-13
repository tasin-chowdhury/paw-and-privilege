import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(11, "Enter a valid Bangladeshi phone number"),
  message: z.string().min(10, "Tell us a little more (min. 10 characters)"),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
