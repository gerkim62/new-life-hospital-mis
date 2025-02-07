import prisma from "../../../libs/prisma";

async function fetchPatient(id: number) {
  const patient = await prisma.patient.findUnique({
    where: {
      id,
    },
  });

  return patient;
}

export { fetchPatient };
