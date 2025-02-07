import { Response, Router } from "express";
import { CreateLabResponse, GetAllLabsResponse } from "./types";
import { addLab, getALlLabs } from "./controllers";
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

labsRouter.get("/", async (_, res: Response<GetAllLabsResponse>) => {
  const labs = await getALlLabs();

  res.json({
    success: true,
    labs,
    message: `Retrieved ${labs.length} labs.`,
  });
});

export default labsRouter;
