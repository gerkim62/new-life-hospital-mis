import { Router } from "express";
import dateRouter from "./date";
import patientsRouter from "./patients";
import visitsRouter from "./visits";
import labsRouter from "./labs";
import stockRouter from "./stock";

const indexRouter = Router();
indexRouter.use("/date", dateRouter);
indexRouter.use("/patients", patientsRouter);
indexRouter.use("/visits", visitsRouter);
indexRouter.use("/labs", labsRouter);
indexRouter.use("/stock", stockRouter);

indexRouter.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default indexRouter;
