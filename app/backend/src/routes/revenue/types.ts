import { ApiResponse } from "../../types/api/response";
import { getRevenue } from "./controllers";

export type GetRevenueRouteResponse = ApiResponse<
  Awaited<ReturnType<typeof getRevenue>>,
  unknown,
  "revenue"
>;

