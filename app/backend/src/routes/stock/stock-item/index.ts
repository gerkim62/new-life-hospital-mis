import { Response, Router } from "express";
import {
  AddStockItemMovementResponse,
  GetStockItemMovementsResponse,
} from "./types";
import { NewStockItemMovementSchema } from "../../../validation/stock-item";
import { addStockItemMovement } from "./controllers";
import { z } from "zod";

const stockItemRouter = Router({
  mergeParams: true,
});

stockItemRouter.get(
  "/",
  async (req, res: Response<GetStockItemMovementsResponse>) => {}
);

stockItemRouter.post(
  "/movements",
  async (req, res: Response<AddStockItemMovementResponse>) => {
    const data = NewStockItemMovementSchema.parse(req.body);
    const { itemId } = z
      .object({
        itemId: z.string(),
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

export default stockItemRouter;
