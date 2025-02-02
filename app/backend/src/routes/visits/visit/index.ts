import { Response, Router } from "express";
import { z } from "zod";
import { getVisit, updateVisit } from "./controller";
import { GetVisitResponse, PutVisitResponse } from "./types";
import { UpdateVisitSchema } from "../../../validation/visit";

const singleVisitRouter = Router({
  mergeParams: true,
});
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
export default singleVisitRouter;
