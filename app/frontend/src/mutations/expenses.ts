import { ExpensesInput } from "@app/backend/src/validation/expenses";
import { AddExpensesRouteResponse } from "@app/backend/src/routes/visits/visit/expenses/types";

async function addExpenses({
  expenses,
  visitId,
}: {
  expenses: ExpensesInput;
  visitId: string;
}) {
  const res = await fetch(`/api/v1/visits/${visitId}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenses),
  });

  const data: AddExpensesRouteResponse = await res.json();

  return data;
}

export { addExpenses };
