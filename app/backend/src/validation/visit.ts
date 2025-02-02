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

const UpdateVisitSchema = z.object({
  symptoms: z.string().nonempty({
    message: "Symptoms are required",
  }),
  diagnosis: z.string({
    message: "Diagnosis is required",
  }),
  treatment: z.string({
    message: "Treatment is required",
  }),
  notes: z.string({
    message: "Notes is required",
  }),
  visitId: z.string({
    message: "No visit was specified",
  }),
});

export type UpdateVisitInput = z.input<typeof UpdateVisitSchema>;

export { NewVisitSchema, UpdateVisitSchema };
