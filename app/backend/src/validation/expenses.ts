import { z } from "zod";

const ExpensesSchema = z.array(
  z.object({
    name: z.string(),
    description: z.string().optional(),
    amount: z.coerce.number(),
  })
);
export type ExpensesInput = z.infer<typeof ExpensesSchema>;
export type ExpensesOutput = z.output<typeof ExpensesSchema>;

export { ExpensesSchema };
