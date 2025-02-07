import { StockMovement } from "@prisma/client";
import { ApiResponse } from "../../../types/api/response";

export type GetStockItemMovementsResponse = ApiResponse<
  StockMovement[],
  unknown,
  "movements"
>;

export type AddStockItemMovementResponse = ApiResponse<
  StockMovement,
  unknown,
  "movement"
>;
