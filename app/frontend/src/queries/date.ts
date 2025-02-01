import { DateRouteResponse } from "@app/backend/src/routes/date/types";

async function fetchDate() {
  const res = await fetch("/api/v1/date");
  const json: DateRouteResponse = await res.json();

  return json;
}

export { fetchDate };
