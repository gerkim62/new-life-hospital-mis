import { Patient, PatientAdmission, PatientVisit } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type CreateVisitResponse = ApiResponse<PatientVisit, unknown, "visit">;

export type VisitWithPatientAndAdmission = PatientVisit & {
  patient: Patient;
  admission: PatientAdmission | null;
};
export type GetVisitsResponse = ApiResponse<
  VisitWithPatientAndAdmission[],
  unknown,
  "visits"
>;
