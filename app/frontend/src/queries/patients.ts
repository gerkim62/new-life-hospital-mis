import { PatientRouteResponse } from "@app/backend/src/routes/patients/patient/types";

async function getPatient(id: number) {
  const res = await fetch(`/api/v1/patients/${id}`);
  const data: PatientRouteResponse = await res.json();

  return data;
}



export { getPatient };

