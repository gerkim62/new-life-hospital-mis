import { GetAllLabsResponse } from "@app/backend/src/routes/labs/types";

async function getALlLabs() {
  const res = await fetch(`/api/v1/labs`);
  const data: GetAllLabsResponse = await res.json();
  return data;
}

export { getALlLabs };
