import { toQueryParams } from "@/lib/utils";
import { GetVisitsResponse } from "@app/backend/src/routes/visits/types";
import { GetVisitResponse } from "@app/backend/src/routes/visits/visit/types";
import { GetVisitsInput } from "@app/backend/src/validation/visit";

async function getVisit(visitId: string) {
  const res = await fetch(`/api/v1/visits/${visitId}`);
  const data: GetVisitResponse = await res.json();
  return data;
}

async function getVisits(data: GetVisitsInput) {
  const queryString = toQueryParams(data).toString();

  console.log("getting visits ", data);
  const res = await fetch(
    "/api/v1/visits" + (queryString ? `?${queryString}` : "")
  );

  const json: GetVisitsResponse = await res.json();

  console.log("got visits", json);

  return json;
}

export { getVisit, getVisits };
