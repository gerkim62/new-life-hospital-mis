import { z } from "zod";

// Base schema matching ManualDrug type
const ManualDrugSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  // Allowing null, per the type (if you want to enforce a nonempty string, use z.string().nonempty())
  description: z.string().nullable(),
  dosage: z.string().nonempty({ message: "Dosage is required" }),
  // Allow null as per the type. Remove .nonempty() because it’s a string method, not applicable to numbers.
  quantity: z.coerce.number().nullable(),
});

// Extend the ManualDrugSchema for the stock drugs.
// We override the quantity to be a required number.
const DrugFromStockSchema = ManualDrugSchema.extend({
  quantity: z.coerce.number({ required_error: "Quantity is required" }),
  unit: z.string().nonempty({ message: "Unit is required" }),
  totalPrice: z.coerce.number({ required_error: "Total price is required" }),
  stockItemId: z.string().nonempty({ message: "Stock item ID is required" }),
});

// The overall input schema
const AddMedicationsInputSchema = z.object({
  manual: z.array(ManualDrugSchema),
  fromStock: z.array(DrugFromStockSchema),
});

export type AddMedicationsInput = z.input<typeof AddMedicationsInputSchema>;
export type AddMedicationsOutput = z.output<typeof AddMedicationsInputSchema>;

export { AddMedicationsInputSchema as AddMedicationInputSchema };
