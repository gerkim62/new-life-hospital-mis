import { Router } from "express";
import dateRouter from "./date";
import usersRouter from "./users";

const indexRouter = Router();
indexRouter.use("/date", dateRouter);
indexRouter.use("/user", usersRouter);
export default indexRouter;
