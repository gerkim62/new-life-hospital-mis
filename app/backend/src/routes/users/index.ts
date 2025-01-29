import { Router } from "express";
import singleUserRouter from "./user";

const usersRouter = Router();

usersRouter.use("/:userId", singleUserRouter);

export default usersRouter;
