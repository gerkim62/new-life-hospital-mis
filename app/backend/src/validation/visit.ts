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
  symptoms: z
    .string()
    .nonempty({
      message: "Symptoms are required",
    })
    .optional(),
  diagnosis: z
    .string({
      message: "Diagnosis is required",
    })
    .optional(),
  treatment: z
    .string({
      message: "Treatment is required",
    })
    .optional(),
  notes: z
    .string({
      message: "Notes is required",
    })
    .optional(),
  visitId: z
    .string({
      message: "No visit was specified",
    }),
  admissionBed: z.string().or(z.undefined()),
});

const GetVisitsSchema = z.object({
  patientId: z.coerce
    .number({
      message: "Patient ID must be a number",
    })
    .optional(),
});

export type GetVisitsInput = z.input<typeof GetVisitsSchema>;
export type UpdateVisitInput = z.input<typeof UpdateVisitSchema>;

export { NewVisitSchema, UpdateVisitSchema, GetVisitsSchema };
