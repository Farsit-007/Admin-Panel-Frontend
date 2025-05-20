import { z } from "zod";

export const BlogValidationSchema = z.object({
  title: z.string({ required_error: "Please provide a title" }),
  description: z.string({ required_error: "Please provide a description" }),
});
