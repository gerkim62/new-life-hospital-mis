import prisma from "../../libs/prisma";
import { NewStockItemOutput } from "../../validation/stock-item";

function getAllStockItems() {
  return prisma.stockItem.findMany();
}

async function addNewStockItem(data: NewStockItemOutput) {
  const item = await prisma.stockItem.create({
    data,
  });

  return item;
}

export { getAllStockItems, addNewStockItem };
