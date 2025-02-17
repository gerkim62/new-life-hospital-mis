import { PatientAdmission } from "@prisma/client";
import { ApiResponse } from "../../../../types/api/response";

export type AdmitPatientRouteResponse = ApiResponse<
  PatientAdmission,
  unknown,
  "admission"
>;
