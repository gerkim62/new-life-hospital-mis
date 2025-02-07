import {
  NewVisitInput,
  UpdateVisitInput,
} from "@app/backend/src/validation/visit";
import {
  CreateVisitResponse,
} from "@app/backend/src/routes/visits/types";
import { MarkAsLeftResponse } from "@app/backend/src/routes/visits/visit/types";

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

async function updateVisit(data: UpdateVisitInput) {
  const res = await fetch(`/api/v1/visits/${data.visitId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json: CreateVisitResponse = await res.json();
  return json;
}

async function markVisitAsLeft(visitId: string) {
  const res = await fetch(`/api/v1/visits/${visitId}/mark-as-left`, {
    method: "POST",
  });
  const json: MarkAsLeftResponse = await res.json();
  return json;
}

export { createVisit, updateVisit, markVisitAsLeft };
