import { NewVisitInput } from "@app/backend/src/validation/visit";
import { CreateVisitResponse } from "@app/backend/src/routes/visits/types";

async function createVisit(data: NewVisitInput) {
  const res = await fetch("/api/v1/visits", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json: CreateVisitResponse = await res.json();
  return json;
}

export { createVisit };
