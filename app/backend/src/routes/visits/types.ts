import { Patient, PatientVisit } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type CreateVisitResponse = ApiResponse<PatientVisit, unknown, "visit">;

export type VisitWithPatient= PatientVisit & {
    patient:Patient
}
export type GetVisitsResponse = ApiResponse<VisitWithPatient[], unknown, "visits">;