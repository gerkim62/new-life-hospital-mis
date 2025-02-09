import { UpdateStockItemResponse } from "@app/backend/src/routes/stock/stock-item/types";
import { AddNewStockItemResponse } from "@app/backend/src/routes/stock/types";
import {
  NewStockItemInput,
  UpdateStockItemInput,
} from "@app/backend/src/validation/stock-item";

async function addNewStockItem(data: NewStockItemInput) {
  console.log("stock item detals", data);
  const res = await fetch("/api/v1/stock", {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json: AddNewStockItemResponse = await res.json();

  return json;
}

async function updateStockItem(
  data: UpdateStockItemInput & { itemId: string }
) {
  const res = await fetch(`/api/v1/stock/${data.itemId}`, {
    body: JSON.stringify(data),
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json: UpdateStockItemResponse = await res.json();

  return json;
}

export { addNewStockItem, updateStockItem };
