import { Response, Router } from "express";
import {
  AddStockItemMovementResponse,
  GetStockItemMovementsResponse,
  UpdateStockItemResponse,
} from "./types";
import {
  NewStockItemMovementSchema,
  UpdateStockItemSchema,
} from "../../../validation/stock-item";
import {
  addStockItemMovement,
  getAllStockMovements,
  updateStockItem,
} from "./controllers";
import { z } from "zod";

const stockItemRouter = Router({
  mergeParams: true,
});

stockItemRouter.get(
  "/movements",
  async (req, res: Response<GetStockItemMovementsResponse>) => {
    const { stockItemId: itemId } = z
      .object({
        stockItemId: z.string(),
      })
      .parse(req.params);

    const movements = await getAllStockMovements({ itemId });

    res.json({
      success: true,
      message: `Retrieved ${movements.length} stock movements`,
      movements,
    });
  }
);

stockItemRouter.post(
  "/movements",
  async (req, res: Response<AddStockItemMovementResponse>) => {
    const data = NewStockItemMovementSchema.parse(req.body);
    const { stockItemId: itemId } = z
      .object({
        stockItemId: z.string(),
      })
      .parse(req.params);
    console.log("data", data);
    console.log("itemId", itemId);
    const movement = await addStockItemMovement({
      ...data,
      itemId,
    });

    if (!movement) {
      res.status(400).json({
        success: false,
        message: "Failed to add stock item movement.",
        errors: [],
      });
    } else
      res.json({
        success: true,
        message: "Stock item movement added successfully.",
        movement,
      });
  }
);

stockItemRouter.put(
  "/",
  async (req, res: Response<UpdateStockItemResponse>) => {
    const data = UpdateStockItemSchema.parse(req.body);
    const { stockItemId: itemId } = z
      .object({
        stockItemId: z.string(),
      })
      .parse(req.params);

    const item = await updateStockItem({
      ...data,
      itemId,
    });

    if (!item) {
      res.status(404).json({
        success: false,
        message: "The stock item you are trying to update does not exist.",
        errors: [],
      });
    } else
      res.json({
        success: true,
        message: "Stock item updated successfully.",
        item,
      });
  }
);

export default stockItemRouter;
