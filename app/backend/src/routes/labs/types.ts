import { Lab, Patient, PatientVisit } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type CreateLabResponse = ApiResponse<Lab, unknown, "lab">;

type VisitWithPatient = PatientVisit & {
  patient: Patient;
};

type LabWithVisit = Lab & {
  patientVisit: VisitWithPatient;
};

export type GetAllLabsResponse = ApiResponse<LabWithVisit[], unknown, "labs">;
