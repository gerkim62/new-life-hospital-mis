import { GetVisitsInput, NewVisitInput } from "../../validation/visit";
import prisma from "../../libs/prisma";

async function createVisit(data: NewVisitInput) {
  const visit = await prisma.patientVisit.create({
    data: {
      symptoms: data.symptoms,
      patientId: data.patientId,
    },
  });

  return visit;
}

async function getVisits(data: GetVisitsInput) {
  //  data.patientId might be undefined
  const visits = await prisma.patientVisit.findMany({
    where: {
      ...(data.patientId && { patientId: data.patientId }),
    },
    include: {
      patient: true,

      admission: true,
    },
  });

  return visits;
}

export { createVisit, getVisits };
