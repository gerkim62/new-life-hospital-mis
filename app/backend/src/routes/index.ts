import { Router } from "express";
import dateRouter from "./date";
import patientsRouter from "./patients";
import visitsRouter from "./visits";

const indexRouter = Router();
indexRouter.use("/date", dateRouter);
indexRouter.use("/patients", patientsRouter);
indexRouter.use("/visits", visitsRouter);

export default indexRouter;
