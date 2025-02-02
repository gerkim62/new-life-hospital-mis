import { Response, Router } from "express";
import { CreateLabResponse } from "./types";
import { addLab } from "./controllers";
import { NewLabSchema } from "../../validation/lab";

const labsRouter = Router();

labsRouter.post("/", async (req, res: Response<CreateLabResponse>) => {
  const data = NewLabSchema.parse(req.body);
  const lab = await addLab(data);

  res.json({
    success: true,
    message: "Lab has been added successfully",
    lab,
  });
});

export default labsRouter;
