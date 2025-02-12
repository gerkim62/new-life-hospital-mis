import { Response, Router } from "express";
import { AddNewStockItemResponse, GetAllStockItemsResponse } from "./types";
import { addNewStockItem, getAllStockItems } from "./controller";
import { NewStockItemSchema } from "../../validation/stock-item";
import stockItemRouter from "./stock-item";
import { z } from "zod";

const stockRouter = Router();

stockRouter.use("/:stockItemId", stockItemRouter);

stockRouter.get("/", async (req, res: Response<GetAllStockItemsResponse>) => {
  // get name from request query
  const { name } = z
    .object({
      name: z.string().optional(),
    })
    .parse(req.query);

  console.log("Search for stock items with name: ", name);

  const items = await getAllStockItems(name);

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
