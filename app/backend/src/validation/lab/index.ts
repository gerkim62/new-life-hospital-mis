import { z } from "zod";

const NewLabSchema = z.object({
  name: z.string(),
  feesKes: z.number(),
  description: z.string(),
  visitId: z.string(),
});

export type NewLabInput = z.input<typeof NewLabSchema>;

export { NewLabSchema };
