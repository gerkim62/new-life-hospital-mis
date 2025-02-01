import { Response, Router } from "express";
import { z } from "zod";
import { PatientRouteResponse } from "./types";
import { fetchPatient } from "./controller";

const singlePatientRouter = Router({
  mergeParams: true,
});
singlePatientRouter.get(
  "/",
  async (req, res: Response<PatientRouteResponse>) => {
    const { patientId } = z
      .object({
        patientId: z.coerce.number({
          message: "Patient ID must be a number",
        }),
      })
      .parse(req.params);

    const patient = await fetchPatient(patientId);
    if (!patient) {
      res.status(404).json({
        success: false,
        message: `Patient with ID ${patientId} was not found on the server.`,
        errors: [],
      });
    } else
      res.json({
        success: true,
        message: "Patient found",
        patient: patient,
      });
  }
);

export default singlePatientRouter;
