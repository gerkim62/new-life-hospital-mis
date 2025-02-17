import { UpdateVisitInput } from "../../../validation/visit";
import prisma from "../../../libs/prisma";
import { ComprehensiveVisit } from "./types";

async function getVisit(id: string): Promise<ComprehensiveVisit | null> {
  const visit = await prisma.patientVisit.findUnique({
    where: {
      id,
    },
    include: {
      patient: true,
      labs: {
        include: {
          labResult: true,
        },
      },
      drugs: {
        include: {
          stockMovement: {
            include: {
              item: true,
            },
          },
        },
      },
      expenses: true,
      admission: true,
    },
  });

  if (!visit) {
    return null;
  }

  return {
    ...visit,
    labs: visit.labs.map((lab) => ({
      ...lab,
      result: lab.labResult,
    })),
    drugs: visit.drugs.map((drug) => {
      if (drug.stockMovement !== null) {
        return {
          ...drug,
          price: drug.stockMovement.batchPriceKes,
          fromStock: true,
          quantity: drug.stockMovement.quantity,
          unit: drug.stockMovement.item.unit,
        };
      } else {
        return {
          ...drug,
          price: null,
          fromStock: false,
        };
      }
    }),
  };
}

async function updateVisit(data: UpdateVisitInput) {
  const { visitId, ...updateFields } = data;
  console.log("updateVisit -> updateFields", updateFields);

  const filteredData = Object.fromEntries(
    Object.entries(updateFields).filter(([_, value]) => value !== undefined)
  );

  const visit = await prisma.patientVisit.update({
    where: { id: visitId },
    data: filteredData,
  });

  return visit;
}

async function markAsLeft(visitId: string) {
  const visit = await prisma.patientVisit.update({
    where: {
      id: visitId,
    },
    data: {
      leaveTime: new Date(),
    },
  });

  return visit;
}

export { getVisit, updateVisit, markAsLeft };
