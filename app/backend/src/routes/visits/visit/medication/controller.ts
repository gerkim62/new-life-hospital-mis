import { StockMovementType } from "@prisma/client";
import prisma from "../../../../libs/prisma";
import { AddMedicationsOutput } from "../../../../validation/medication";

async function addMedications(
  data: AddMedicationsOutput & {
    visitId: string;
  }
) {
  const { visitId, fromStock, manual } = data;

  await prisma.$transaction(async (tx) => {
    // Insert manual drugs
    if (manual.length > 0) {
      await tx.drug.createMany({
        data: manual.map((drug) => ({
          name: drug.name,
          dosage: drug.dosage,
          patientVisitId: visitId,
          stockMovementId: null,
          description:
            `${drug.description ? drug.description : ""}${drug.quantity ? ` \n (Quantity: ${drug.quantity})` : ""}`.trim(),
        })),
      });
    }

    // Insert stock-related drugs
    await Promise.all(
      fromStock.map(async (drugFromStock) => {
        const movement = await tx.stockMovement.create({
          data: {
            batchPriceKes: drugFromStock.totalPrice,
            quantity: drugFromStock.quantity,
            type: StockMovementType.OUT,
            description: "Given to patient",
            patientVisitId: visitId,
            itemId: drugFromStock.stockItemId,
          },
        });

        await tx.drug.create({
          data: {
            name: drugFromStock.name,
            description: drugFromStock.description,
            dosage: drugFromStock.dosage,
            stockMovementId: movement.id, // Link the stock movement
            patientVisitId: visitId, // Ensure valid patient visit ID
          },
        });

        await tx.stockItem.update({
          where: {
            id: drugFromStock.stockItemId,
          },
          data: {
            quantity: {
              decrement: drugFromStock.quantity,
            },
          },
        });
      })
    );
  });

  return true;
}

export { addMedications };
