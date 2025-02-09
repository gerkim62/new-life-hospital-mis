import { Response, Router } from "express";
import { LabResultRouteResponse } from "./types";
import { z } from "zod";
import { LabResultSchema } from "../../../validation/lab/result";
import { addLabResult } from "./controllers";

const singleLabRouter = Router({
  mergeParams: true,
});

singleLabRouter.post(
  "/result",
  async (req, res: Response<LabResultRouteResponse>) => {
    const { labId } = z.object({ labId: z.string() }).parse(req.params);
    console.log(req.params);

    console.log(labId);
    const data = LabResultSchema.parse(req.body);

    const result = await addLabResult({ ...data, labId });
    res.json({
      success: true,
      message: "Result has been added successfully",
      result,
    });
  }
);

export default singleLabRouter;
