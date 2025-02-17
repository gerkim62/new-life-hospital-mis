import { calculateDays } from "../../libs/date";
import prisma from "../../libs/prisma";

export type NeatRevenue = {
  date: Date;
  amount: number;
  description: string | null;
  patientId: number | null;
  visitId: string | null;
  id: string;
};

async function getDoneLabs(): Promise<NeatRevenue[]> {
  const labs = await prisma.lab.findMany({
    where: {
      status: "DONE",
    },
    include: {
      patientVisit: {
        select: {
          patientId: true,
        },
      },
    },
  });

  return labs.map((lab) => ({
    date: lab.createdAt,
    amount: lab.feesKes,
    description: lab.name,
    patientId: lab.patientVisit.patientId,
    visitId: lab.patientVisitId,
    id: lab.id,
  }));
}

async function getStockMovements(): Promise<NeatRevenue[]> {
  const medications = await prisma.stockMovement.findMany({
    where: {
      type: "OUT",
    },
    include: {
      item: {
        select: {
          name: true,
        },
      },
      patientVisit: {
        select: {
          patientId: true,
        },
      },
    },
  });

  return medications.map((medication) => ({
    date: medication.createdAt,
    amount: medication.batchPriceKes,
    description: `Sale of ${medication.item.name}`,
    patientId: medication.patientVisit?.patientId ?? null,
    visitId: medication.patientVisitId,
    id: medication.id,
  }));
}

async function getOtherExpensesRevenue(): Promise<NeatRevenue[]> {
  const otherExpenses = await prisma.expense.findMany({
    include: {
      patientVisit: {
        select: {
          patientId: true,
        },
      },
    },
  });

  return otherExpenses.map((expense) => ({
    date: expense.createdAt,
    amount: expense.amount,
    description: expense.name + " - for a patient",
    patientId: expense.patientVisit.patientId,
    visitId: expense.patientVisitId,
    id: expense.id,
  }));
}

async function getAdmissions(): Promise<NeatRevenue[]> {
  const admissions = await prisma.patientAdmission.findMany({
    include: {
      visit: {
        select: {
          leaveTime: true,
          patientId: true,
        },
      },
    },
  });

  return admissions.map((admission) => ({
    date: admission.admittedAt,
    amount:
      (admission.admissionFee +
        admission.dailyBedCharges +
        admission.dailyDoctorsFee +
        admission.dailyNurseCareFee +
        admission.dailySundriesFee) *
      calculateDays(
        admission.admittedAt,
        admission.visit.leaveTime ?? new Date()
      ),
    description: "Amount charged for admission and stay",
    patientId: admission.visit.patientId,
    visitId: admission.patientVisitId,
    id: admission.id,
  }));
}

async function getRevenue() {
  const labs = await getDoneLabs();
  const medications = await getStockMovements();
  const others = await getOtherExpensesRevenue();
  const admissions = await getAdmissions();

  return {
    labs,
    medications,
    others,
    admissions,
  };
}

export { getRevenue };
