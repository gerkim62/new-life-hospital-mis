import { NewVisitInput } from "../../validation/visit";
import prisma from "../libs/prisma";

async function createVisit(data: NewVisitInput) {
  const visit = await prisma.patientVisit.create({
    data: {
      symptoms: data.symptoms,
      patientId: data.patientId,
    },
  });

  return visit;
}

export { createVisit };
