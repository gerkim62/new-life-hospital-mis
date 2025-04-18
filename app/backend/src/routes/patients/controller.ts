import { NewPatientValues } from "../../validation/patient";
import prisma from "../../libs/prisma";

async function createPatient(data: NewPatientValues) {
  const patient = await prisma.patient.create({
    data: {
      name: data.name,
      address: data.address,
      birthDate: data.dateOfBirth,
      phone: data.phone,
    },
  });

  return patient;
}

async function getAllPatients() {
  const patients = await prisma.patient.findMany();

  return patients;
}

export { createPatient, getAllPatients };
