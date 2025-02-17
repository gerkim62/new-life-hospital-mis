import prisma from "../../../../libs/prisma";
import { PatientAdmissionOutput } from "../../../../validation/admission";

async function admitPatient(
  data: PatientAdmissionOutput & { visitId: string }
) {
  const { visitId, ...rest } = data;
  const admission = await prisma.patientAdmission.create({
    data: {
      ...rest,
      patientVisitId: visitId,
    },
  });

  return admission;
}

export { admitPatient };
