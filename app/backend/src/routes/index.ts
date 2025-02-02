import { Router } from "express";
import dateRouter from "./date";
import patientsRouter from "./patients";
import visitsRouter from "./visits";
import labsRouter from "./labs";

const indexRouter = Router();
indexRouter.use("/date", dateRouter);
indexRouter.use("/patients", patientsRouter);
indexRouter.use("/visits", visitsRouter);
indexRouter.use("/labs", labsRouter);

export default indexRouter;
