import { Patient } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type CreatePatientResponse = ApiResponse<Patient, unknown, "patient">;