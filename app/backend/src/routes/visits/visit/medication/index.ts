import { Router } from "express";
import { z } from "zod";

const medicationRouter = Router({
  mergeParams: true,
});

medicationRouter.post("/", (req, res) => {
  const { visitId } = z
    .object({
      visitId: z.string({
        message: "Invalid visit ID",
      }),
    })
    .parse(req.params);

  res.send("hello medication " + visitId);
});

export default medicationRouter;
