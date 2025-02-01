import z from "zod";

const NewVisitSchema = z.object({
  symptoms: z.string().nonempty({
    message: "Symptoms are required",
  }),
  patientId: z.coerce.number({
    message: "Patient ID is required",
  }),
});

export type NewVisitInput = z.input<typeof NewVisitSchema>;
export type NewVisitOutput = z.output<typeof NewVisitSchema>;

export { NewVisitSchema };
