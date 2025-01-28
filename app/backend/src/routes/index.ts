import { Router } from "express";
import dateRouter from "./date";

const indexRouter = Router();
indexRouter.use("/date", dateRouter);
export default indexRouter;
