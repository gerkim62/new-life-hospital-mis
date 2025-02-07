import { StockItem } from "@prisma/client";
import { ApiResponse } from "../../types/api/response";

export type GetAllStockItemsResponse = ApiResponse<
  StockItem[],
  unknown,
  "items"
>;

export type AddNewStockItemResponse = ApiResponse<StockItem, unknown, "item">;
