import { z } from "zod";

export const SkillValidationSchema = z.object({
  title: z.string({ required_error: "Please provide a title" }).max(12),
  color: z.string({ required_error: "Please provide a description" }),
});
