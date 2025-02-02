import { GetVisitResponse } from "@app/backend/src/routes/visits/visit/types";

async function getVisit(visitId: string) {
  const res = await fetch(`/api/v1/visits/${visitId}`);
  const data: GetVisitResponse = await res.json();
  return data;
}

export { getVisit };
