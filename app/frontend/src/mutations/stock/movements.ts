import { NewStockItemMovementInput } from "@app/backend/src/validation/stock-item";
import { AddStockItemMovementResponse } from "@app/backend/src/routes/stock/stock-item/types";

async function createStockMovement(
  data: NewStockItemMovementInput & {
    itemId: string;
  }
) {
  console.log("stock movement data", data);

  const res = await fetch(`/api/v1/stock/${data.itemId}/movements`, {
    body: JSON.stringify(data),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json: AddStockItemMovementResponse = await res.json();

  return json;
}

export { createStockMovement };
