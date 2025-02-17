import { GetRevenueRouteResponse } from "@app/backend/src/routes/revenue/types";

async function getRevenue() {
  const res = await fetch("/api/v1/revenue");
  const json: GetRevenueRouteResponse = await res.json();

  return json;
}

export { getRevenue };
