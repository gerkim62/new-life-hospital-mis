import { LabResult } from "@prisma/client";
import { ApiResponse } from "../../../types/api/response";

export type LabResultRouteResponse = ApiResponse<LabResult, unknown, "result">;
