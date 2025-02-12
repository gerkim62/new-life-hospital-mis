import prisma from "../../libs/prisma";
import { NewStockItemOutput } from "../../validation/stock-item";

function getAllStockItems(name: string | undefined) {
  return prisma.stockItem.findMany({
    where: {
      ...(name && { name: { contains: name } }),
    },
    ...(name ? { take: 5 } : {}), // Conditionally include `take`
  });
}

async function addNewStockItem(data: NewStockItemOutput) {
  return await prisma.$transaction(async (tx) => {
    const item = await tx.stockItem.create({
      data: {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        unit: data.unit,
      },
    });

    await tx.stockMovement.create({
      data: {
        itemId: item.id,
        quantity: item.quantity,
        type: "IN",
        batchPriceKes: data.batchPriceKes,
        description: "Initial Stock",
      },
    });

    return item;
  });
}

export { getAllStockItems, addNewStockItem };
