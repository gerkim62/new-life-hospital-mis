import { Router } from "express";
import { z } from "zod";

const singleUserRouter = Router();
singleUserRouter.get("/", (req, res) => {
  const { user_id: userId } = z
    .object({
      user_id: z.coerce.number({
        message: "User ID must be a number",
      }),
    })
    .parse(req.params);
});

export default singleUserRouter;
