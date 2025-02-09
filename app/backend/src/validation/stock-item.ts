import { StockMovementType } from "@prisma/client";
import z from "zod";

// name,description,quantity, unit
const NewStockItemSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  quantity: z.coerce.number().positive(),
  unit: z.string().nonempty(),
  batchPriceKes: z.coerce.number().positive(),
});

const UpdateStockItemSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  unit: z.string().nonempty(),
});

const NewStockItemMovementSchema = z.object({
  type: z.nativeEnum(StockMovementType),
  quantity: z.coerce.number().gt(0, {
    message: "Quantity must be greater than 0",
  }),
  description: z.string().optional(),
  batchPriceKes: z.coerce.number().gt(0, {
    message: "Price must be greater than 0",
  }),
});

export type NewStockItemOutput = z.output<typeof NewStockItemSchema>;
export type NewStockItemInput = z.input<typeof NewStockItemSchema>;

export type NewStockItemMovementInput = z.input<
  typeof NewStockItemMovementSchema
>;
export type NewStockItemMovementOutput = z.output<
  typeof NewStockItemMovementSchema
>;

export type UpdateStockItemInput = z.input<typeof UpdateStockItemSchema>;
export type UpdateStockItemOutput = z.output<typeof UpdateStockItemSchema>;

export {
  NewStockItemSchema,
  NewStockItemMovementSchema,
  UpdateStockItemSchema,
};
