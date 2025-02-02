import { NewLabInput } from "../../validation/lab";
import prisma from "../libs/prisma";

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

export { addLab };
