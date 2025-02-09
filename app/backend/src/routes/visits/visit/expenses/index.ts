import { Response, Router } from "express";
import { AddExpensesRouteResponse } from "./types";
import { z } from "zod";
import { ExpensesSchema } from "../../../../validation/expenses";
import { addExpenses } from "./controllers";

const expensesRouter = Router({
  mergeParams: true,
});

expensesRouter.post(
  "/",
  async (req, res: Response<AddExpensesRouteResponse>) => {
    const { visitId } = z
      .object({
        visitId: z.string({
          message: "Invalid visit ID",
        }),
      })
      .parse(req.params);

    const expensesInput = ExpensesSchema.parse(req.body);

    const expensesRes = await addExpenses({ visitId, expenses:expensesInput });

    res.json({
      success: true,
      message: "Expenses added successfully",
      payload: expensesRes,
    });
  }
);

export default expensesRouter;
