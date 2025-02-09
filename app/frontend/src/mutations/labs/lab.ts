import { LabResultInput } from "@app/backend/src/validation/lab/result";
import { LabResultRouteResponse } from "@app/backend/src/routes/labs/lab/types";

async function addLabResult(data: LabResultInput & { labId: string }) {
  const res = await fetch(`/api/v1/labs/${data.labId}/result`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json: LabResultRouteResponse = await res.json();

  return json;
}

export { addLabResult };
