import { Response, Router } from "express";
import singlePatientRouter from "./patient";
import { NewPatientSchema } from "../../validation/patient";
import { createPatient } from "./controller";
import { CreatePatientResponse } from "./types";
import { StatusCodes } from "http-status-codes";

const patientsRouter = Router();

patientsRouter.use("/:patientId", singlePatientRouter);

patientsRouter.post("/", async (req, res: Response<CreatePatientResponse>) => {
  const data = NewPatientSchema.parse(req.body);
  const patient = await createPatient(data);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Patient Registered Successfully",
    patient: patient,
  });
});

export default patientsRouter;
