import { PatientAdmissionInput } from "@app/backend/src/validation/admission";
import { AdmitPatientRouteResponse } from "@app/backend/src/routes/visits/visit/admission/types";

async function admitPatient(data: PatientAdmissionInput & { visitId: string }) {
  const { visitId, ...rest } = data;
  const res = await fetch(`/api/v1/visits/${visitId}/admission`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rest),
  });

  const json: AdmitPatientRouteResponse = await res.json();

  return json;
}

export { admitPatient };
