import { CreatePatientResponse } from "@app/backend/src/routes/patients/types";
import { NewPatientInput } from "@app/backend/src/validation/patient";

async function createPatient(data: NewPatientInput) {
    const res = await fetch("/api/v1/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const json: CreatePatientResponse = await res.json();
  
    return json;
  }

  export { createPatient,  };