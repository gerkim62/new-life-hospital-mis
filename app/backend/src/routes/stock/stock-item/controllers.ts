import prisma from "../../../libs/prisma";
import { NewStockItemMovementOutput } from "../../../validation/stock-item";
import { Prisma } from "@prisma/client";

async function addStockItemMovement(
  data: NewStockItemMovementOutput & { itemId: string }
) {
  try {
    return await prisma.stockMovement.create({
      data: {
        batchPriceKes: data.batchPriceKes,
        quantity: data.quantity,
        type: data.type,
        itemId: data.itemId,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      // Foreign key constraint failed (stock item does not exist)
      return null;
    }
    throw error; // Rethrow other unexpected errors
  }
}

export { addStockItemMovement };
