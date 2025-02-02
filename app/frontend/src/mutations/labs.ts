import { NewLabInput } from "@app/backend/src/validation/lab";
import { CreateLabResponse } from "@app/backend/src/routes/labs/types";

async function addLab(data: NewLabInput) {
  const res = await fetch("/api/v1/labs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json: CreateLabResponse = await res.json();

  return json;
}

export { addLab };
