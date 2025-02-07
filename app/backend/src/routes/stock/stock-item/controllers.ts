import prisma from "../../../libs/prisma";
import { NewStockItemMovementOutput } from "../../../validation/stock-item";

async function addStockItemMovement(
  data: NewStockItemMovementOutput & { itemId: string }
) {
  const item = await prisma.stockItem.findUnique({
    where: {
      id: data.itemId,
    },
  });

  if (!item) {
    return null;
  }

  const quantityAddition =
    data.type === "IN"
      ? data.quantity
      : data.type === "OUT"
        ? -data.quantity
        : 0;

  console.log("quantityAddition", quantityAddition);
  const movement = await prisma.$transaction(async (tx) => {
    const movement = await tx.stockMovement.create({
      data: {
        batchPriceKes: data.batchPriceKes,
        quantity: data.quantity,
        type: data.type,
        itemId: data.itemId,
        description: data.description ?? null,
      },
    });

    await tx.stockItem.update({
      where: {
        id: data.itemId,
      },
      data: {
        quantity: {
          increment: quantityAddition,
        },
      },
    });

    return movement;
  });

  return movement;
}

export { addStockItemMovement };
