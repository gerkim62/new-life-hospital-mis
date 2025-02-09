import prisma from "../../../../libs/prisma";
import { ExpensesOutput } from "../../../../validation/expenses";

async function addExpenses(data: {
  expenses: ExpensesOutput;
  visitId: string;
}) {
  const { visitId, expenses } = data; // Adjusted destructuring to extract the expenses array

  // Map each expense item to the format required by your Prisma schema
  const expenseData = expenses.map((expense) => ({
    patientVisitId: visitId,
    amount: expense.amount,
    description: expense.description ?? null,
    name: expense.name,
  }));

  // Create multiple expense records in one query
  const result = await prisma.expense.createMany({
    data: expenseData,
  });

  return result;
}

export { addExpenses };
