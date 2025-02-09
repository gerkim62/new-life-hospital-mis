import { z } from "zod";

const LabResultSchema = z.object({
  value: z.string(),
  comment: z.string(),
});

export type LabResultInput = z.input<typeof LabResultSchema>;
export { LabResultSchema };
