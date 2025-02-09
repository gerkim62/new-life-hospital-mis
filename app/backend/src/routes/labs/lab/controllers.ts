import { LabStatus } from "@prisma/client";
import prisma from "../../../libs/prisma";
import { LabResultInput } from "../../../validation/lab/result";

async function addLabResult(data: LabResultInput & { labId: string }) {
  console.log(`Adding lab result for lab ${data.labId}`, data);

  const result = await prisma.$transaction(async (prisma) => {
    const labResult = await prisma.labResult.upsert({
      where: { labId: data.labId },
      update: { ...data },
      create: data,
    });

    await prisma.lab.update({
      where: { id: data.labId },
      data: { status: LabStatus.DONE },
    });

    return labResult;
  });

  return result;
}

export { addLabResult };
