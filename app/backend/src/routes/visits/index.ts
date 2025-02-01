import { Response, Router } from "express";
import { NewVisitSchema } from "../../validation/visit";
import { createVisit } from "./controller";
import { CreateVisitResponse } from "./types";

const visitsRouter = Router();

visitsRouter.post("/", async (req, res: Response<CreateVisitResponse>) => {
  const data = NewVisitSchema.parse(req.body);
  const visit = await createVisit(data);

  res.json({
    message: "Visit created successfully",
    success: true,
    visit,
  });
});

export default visitsRouter;
