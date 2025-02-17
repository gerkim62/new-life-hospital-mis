import { Response, Router } from "express";
import { z } from "zod";
import { PatientAdmissionSchema } from "../../../../validation/admission";
import { admitPatient } from "./controllers";
import { AdmitPatientRouteResponse } from "./types";

const admissionRouter = Router({
  mergeParams: true,
});

admissionRouter.post(
  "/",
  async (req, res: Response<AdmitPatientRouteResponse>) => {
    const { visitId } = z
      .object({
        visitId: z.string({
          message: "Invalid visit ID",
        }),
      })
      .parse(req.params);

    const data = PatientAdmissionSchema.parse(req.body);

    const admission = await admitPatient({
      ...data,
      visitId,
    });

    res.json({
      admission,
      success: true,
      message: "Patient admitted successfully",
    });
  }
);

export default admissionRouter;
