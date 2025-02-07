import { Patient } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type CreatePatientResponse = ApiResponse<Patient, unknown, "patient">;

export type GetAllPatientsResponse = ApiResponse<
  Patient[],
  unknown,
  "patients"
>;
