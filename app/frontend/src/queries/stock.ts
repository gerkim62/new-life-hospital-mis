import { GetStockItemMovementsResponse } from "@app/backend/src/routes/stock/stock-item/types";
import { GetAllStockItemsResponse } from "@app/backend/src/routes/stock/types";

async function getAllStockItems() {
  const response = await fetch("/api/v1/stock");
  return (await response.json()) as GetAllStockItemsResponse;
}

async function getItemMovements({ id }: { id: string }) {
  const response = await fetch(`/api/v1/stock/${id}/movements`);
  return (await response.json()) as GetStockItemMovementsResponse;
}

export { getAllStockItems, getItemMovements };
