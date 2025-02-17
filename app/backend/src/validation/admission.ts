import { z } from "zod";

const PatientAdmissionSchema = z.object({
  bedNumber: z.string().min(1, "Bed number is required"),
  dailySundriesFee: z
    .number()
    .positive("Daily sundries fee must be greater than 0"),
  dailyDoctorsFee: z
    .number()
    .positive("Daily doctor's fee must be greater than 0"),
  admissionFee: z.number().positive("Admission fee must be greater than 0"),
  dailyNurseCareFee: z
    .number()
    .positive("Daily nurse care fee must be greater than 0"),
  dailyBedCharges: z
    .number()
    .positive("Daily bed charges must be greater than 0"),
});

export type PatientAdmissionInput = z.input<typeof PatientAdmissionSchema>;
export type PatientAdmissionOutput = z.output<typeof PatientAdmissionSchema>;

export { PatientAdmissionSchema };
