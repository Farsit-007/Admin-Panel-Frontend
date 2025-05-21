import { z } from "zod";

export const ExperianceValidationSchema = z.object({
  designation: z.string({ required_error: "Please provide a designation" }),
  date: z.string({ required_error: "Please provide a date" }),
  description: z.string({ required_error: "Please provide a description" }),
});
