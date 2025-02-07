import { GetAllStockItemsResponse } from "@app/backend/src/routes/stock/types";

async function getAllStockItems() {
  const response = await fetch("/api/v1/stock");
  return (await response.json()) as GetAllStockItemsResponse;
}

export { getAllStockItems };
