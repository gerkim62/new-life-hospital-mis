import { PatientVisit } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type CreateVisitResponse = ApiResponse<PatientVisit, unknown, "visit">;
