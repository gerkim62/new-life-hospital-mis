import { Response, Router } from "express";
import { GetAllStockItemsResponse } from "./types";
import { getAllStockItems } from "./controller";

const stockRouter = Router();

stockRouter.get("/", async (req, res: Response<GetAllStockItemsResponse>) => {
  const items = await getAllStockItems();

  res.json({
    success: true,
    message: `Retrieved ${items.length} stock items`,
    items,
  });
});

export default stockRouter;
