import prisma from "../../libs/prisma";

function getAllStockItems() {
  return prisma.stockItem.findMany();
}

export { getAllStockItems };
