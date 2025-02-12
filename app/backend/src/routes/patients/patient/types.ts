import { Patient } from "@prisma/client";
import { ApiResponse } from "../../../types/api/response";

export type PatientRouteResponse = ApiResponse<Patient, unknown, "patient">;

