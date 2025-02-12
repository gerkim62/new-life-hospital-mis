import { GetStockItemMovementsResponse } from "@app/backend/src/routes/stock/stock-item/types";
import { GetAllStockItemsResponse } from "@app/backend/src/routes/stock/types";

async function getAllStockItems(name: string | undefined) {
  const url = name
    ? `/api/v1/stock?name=${encodeURIComponent(name)}`
    : "/api/v1/stock";

  const response = await fetch(url);
  return (await response.json()) as GetAllStockItemsResponse;
}

async function getItemMovements({ id }: { id: string }) {
  const response = await fetch(`/api/v1/stock/${id}/movements`);
  return (await response.json()) as GetStockItemMovementsResponse;
}

export { getAllStockItems, getItemMovements };
