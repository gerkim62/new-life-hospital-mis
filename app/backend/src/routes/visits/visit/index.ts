import { Response, Router } from "express";
import { z } from "zod";
import { getVisit, markAsLeft, updateVisit } from "./controller";
import {
  GetVisitResponse,
  MarkAsLeftResponse,
  PutVisitResponse,
} from "./types";
import { UpdateVisitSchema } from "../../../validation/visit";
import medicationRouter from "./medication";
import expensesRouter from "./expenses";
import admissionRouter from "./admission";

const singleVisitRouter = Router({
  mergeParams: true,
});

singleVisitRouter.use("/medication", medicationRouter);
singleVisitRouter.use("/expenses", expensesRouter);
singleVisitRouter.use("/admission", admissionRouter);

singleVisitRouter.get("/", async (req, res: Response<GetVisitResponse>) => {
  const { visitId } = z
    .object({
      visitId: z.string({
        message: "Invalid visit ID",
      }),
    })
    .parse(req.params);
  const visit = await getVisit(visitId);

  if (!visit) {
    res.status(404).json({
      success: false,
      message: "Visit not found",
      errors: [],
    });

    return;
  }

  res.json({
    success: true,
    visit,
    message: "Successfully fetched visit",
  });
});

singleVisitRouter.put("/", async (req, res: Response<PutVisitResponse>) => {
  const data = UpdateVisitSchema.parse(req.body);
  const visit = await updateVisit(data);

  res.json({
    success: true,
    message: "Visit updated successfully",
    visit,
  });
});

// singleVisitRouter.post("/inpatient", (req, res) => {});

singleVisitRouter.post(
  "/mark-as-left",
  async (req, res: Response<MarkAsLeftResponse>) => {
    const { visitId } = z
      .object({
        visitId: z.string(),
      })
      .parse(req.params);

    const visit = await markAsLeft(visitId);

    res.json({
      message: "Visit marked as left successfully",
      success: true,
      visit,
    });
  }
);
export default singleVisitRouter;
