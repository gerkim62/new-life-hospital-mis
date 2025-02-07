import { Response, Router } from "express";
import { AddNewStockItemResponse, GetAllStockItemsResponse } from "./types";
import { addNewStockItem, getAllStockItems } from "./controller";
import { NewStockItemSchema } from "../../validation/stock-item";
import stockItemRouter from "./stock-item";

const stockRouter = Router();

stockRouter.use(":/stockItemId", stockItemRouter);

stockRouter.get("/", async (req, res: Response<GetAllStockItemsResponse>) => {
  const items = await getAllStockItems();

  res.json({
    success: true,
    message: `Retrieved ${items.length} stock items`,
    items,
  });
});

stockRouter.post("/", async (req, res: Response<AddNewStockItemResponse>) => {
  console.log(req.body);
  const item = await addNewStockItem(NewStockItemSchema.parse(req.body));

  res.json({
    success: true,
    message: "Item was added to stock successfully.",
    item,
  });
});

export default stockRouter;
