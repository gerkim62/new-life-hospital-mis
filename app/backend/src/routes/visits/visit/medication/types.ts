import { Drug } from "@prisma/client";
import { ApiResponse } from "../../../../types/api/response";

export type AddMedicationRouteResponse = ApiResponse<
  Drug,
  unknown,
  "medication"
>;
