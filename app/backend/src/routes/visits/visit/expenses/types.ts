import { Prisma } from "@prisma/client";
import { ApiResponse } from "../../../../types/api/response";

export type AddExpensesRouteResponse = ApiResponse<
  Prisma.BatchPayload,
  unknown,
  "payload"
>;
