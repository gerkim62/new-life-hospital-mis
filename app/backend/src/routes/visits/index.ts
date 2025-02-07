import { Response, Router } from "express";
import { GetVisitsSchema, NewVisitSchema } from "../../validation/visit";
import { createVisit, getVisits } from "./controller";
import { CreateVisitResponse, GetVisitsResponse } from "./types";
import singleVisitRouter from "./visit";

const visitsRouter = Router();
visitsRouter.use("/:visitId", singleVisitRouter);

visitsRouter.post("/", async (req, res: Response<CreateVisitResponse>) => {
  const data = NewVisitSchema.parse(req.body);
  const visit = await createVisit(data);

  res.json({
    message: "Visit created successfully",
    success: true,
    visit,
  });
});

visitsRouter.get("/", async (req, res: Response<GetVisitsResponse>) => {
  const data = GetVisitsSchema.parse(req.query);
  const visits = await getVisits(data);

  res.json({
    success: true,
    message: "Successfully retrieved visits",
    visits,
  });
});
export default visitsRouter;
