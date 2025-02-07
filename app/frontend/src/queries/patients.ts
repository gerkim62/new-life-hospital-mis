import { PatientRouteResponse } from "@app/backend/src/routes/patients/patient/types";
import { GetAllPatientsResponse } from "@app/backend/src/routes/patients/types";

async function getPatient(id: number) {
  const res = await fetch(`/api/v1/patients/${id}`);
  const data: PatientRouteResponse = await res.json();

  return data;
}

async function getAllPatients() {
  const res = await fetch(`/api/v1/patients`);
  const data: GetAllPatientsResponse = await res.json();

  return data;
}

export { getPatient, getAllPatients };
