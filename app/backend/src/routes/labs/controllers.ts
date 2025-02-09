import { NewLabInput } from "../../validation/lab";
import prisma from "../../libs/prisma";

async function addLab(data: NewLabInput) {
  const { visitId, ...rest } = data;
  const lab = await prisma.lab.create({
    data: {
      patientVisitId: visitId,
      ...rest,
    },
  });

  return lab;
}

async function getALlLabs() {
  const labs = await prisma.lab.findMany({
    include: {
      patientVisit: {
        include: {
          patient: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return labs;
}

export { addLab, getALlLabs };
