import { StockItem, StockMovement } from "@prisma/client";
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

export type GetStockItemResponse = ApiResponse<StockItem, unknown, "item">;

export type UpdateStockItemResponse = ApiResponse<StockItem, unknown, "item">;
