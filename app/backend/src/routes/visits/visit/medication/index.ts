import { Response, Router } from "express";
import { z } from "zod";
import { AddMedicationsRouteResponse } from "./types";
import { AddMedicationInputSchema } from "../../../../validation/medication";
import { addMedications } from "./controller";

const medicationRouter = Router({
  mergeParams: true,
});

medicationRouter.post(
  "/",
  async (req, res: Response<AddMedicationsRouteResponse>) => {
    const { visitId } = z
      .object({
        visitId: z.string({
          message: "Invalid visit ID",
        }),
      })
      .parse(req.params);

      console.log(req.body)

    const data = AddMedicationInputSchema.parse(req.body);

    const success = await addMedications({
      ...data,
      visitId,
    });

    if (!success) {
      res.json({
        success: false,
        errors: [],
        message: "Error while adding medications",
      });

      return;
    }

    res.json({
      success: success,
      message: "Success adding medication",
    });
  }
);

export default medicationRouter;
