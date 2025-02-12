import { AddMedicationsInput } from "@app/backend/src/validation/medication";
import { AddMedicationsRouteResponse } from "@app/backend/src/routes/visits/visit/medication/types";

async function addMedications({
  medication,
  visitId,
}: {
  medication: AddMedicationsInput;
  visitId: string;
}) {
  const res = await fetch(`/api/v1/visits/${visitId}/medication`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medication),
  });

  const data: AddMedicationsRouteResponse = await res.json();

  return data;
}

export { addMedications };
