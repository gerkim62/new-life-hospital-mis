import { UpdateVisitInput } from "../../../validation/visit";
import prisma from "../../libs/prisma";
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
          price: drug.stockMovement.priceKes,
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
  const { visitId, ...rest } = data;
  console.log("updateVisit -> rest", rest);
  const visit = await prisma.patientVisit.update({
    where: {
      id: visitId,
    },
    data: {
      ...rest,
    },
  });

  return visit;
}

export { getVisit, updateVisit };
