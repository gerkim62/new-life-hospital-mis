import { Response, Router } from "express";
import singlePatientRouter from "./patient";
import { NewPatientSchema } from "../../validation/patient";
import { createPatient, getAllPatients } from "./controller";
import { CreatePatientResponse, GetAllPatientsResponse } from "./types";
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

patientsRouter.get("/", async (_, res: Response<GetAllPatientsResponse>) => {
  const patients = await getAllPatients();

  res.json({
    success: true,
    message: `Retrieved ${patients.length} patients`,
    patients,
  });
});

export default patientsRouter;
