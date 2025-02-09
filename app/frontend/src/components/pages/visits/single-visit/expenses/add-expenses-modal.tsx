import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addExpenses } from "@/mutations/expenses";
import { Route } from "@/routes/visits/$visitId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Define the expense type
type Expense = {
  name: string;
  amount: number;
  description?: string;
};

type Props = {
  onClose: () => void;
};

/**
 * Custom hook to detect media query matches.
 * For example, you can use it to detect if the viewport is at least 768px wide.
 */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export function AddExpensesModal({ onClose }: Props) {
  // State for the current expense input
  const [expense, setExpense] = useState<Expense>({
    name: "",
    amount: 0,
    description: "",
  });
  // State for the list of expenses
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // State to manage the active tab for narrow screens
  const [activeTab, setActiveTab] = useState<"add" | "list">("add");
  // Check if the screen is wide enough (e.g., at least 768px)
  const isWideScreen = useMediaQuery("(min-width: 768px)");

  // Adds the current expense to the list and resets the input fields
  const handleAddExpense = () => {
    if (expense.name.trim() === "" || expense.amount <= 0) {
      // Minimal validation; feel free to add more robust error handling
      return toast.error("Please enter expense name and amount");
    }
    setExpenses((prev) => [...prev, expense]);
    setExpense({ name: "", amount: 0, description: "" });
  };

  const visitId = Route.useParams().visitId;
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => addExpenses({ expenses, visitId }),
    onSuccess: (data) => {
      if (data.success) {
        console.log("Expenses added successfully");
        toast.success("Expenses added successfully");
        onClose();
        queryClient.refetchQueries({ queryKey: ["visits", visitId] });
      } else {
        console.error(data.message);
        toast.error(data.message ?? "Failed to add expenses");
      }
    },
    onError: (error) => {
      console.error("Error adding expenses:", error);
      toast.error("An error occurred. Please try again.");
    },
  });

  function handleSubmit() {
    if (expenses.length === 0) {
      toast.error("Please add at least one expense");
      return;
    }
    mutate();
  }

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      {/* Increase max-width for wide screens */}
      <DialogContent className="max-w-3xl p-6">
        {isPending && <Loader message="Saving expenses..." />}
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Expenses</DialogTitle>
        </DialogHeader>

        {isWideScreen ? (
          // Two-column layout for wide screens:
          // Left: Expense Input Form, Right: Expense List
          <div className="grid grid-cols-2 gap-6 mt-4 divide-x">
            {/* Expense Input Form */}
            <div className="pr-6">
              <h3 className="text-lg font-semibold mb-2">Add Expense</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expense Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter expense name"
                    value={expense.name}
                    onChange={(e) =>
                      setExpense({ ...expense, name: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount (KES)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={expense.amount || ""}
                    onChange={(e) =>
                      setExpense({
                        ...expense,
                        amount: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter description"
                    value={expense.description}
                    onChange={(e) =>
                      setExpense({ ...expense, description: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <Button
                  onClick={handleAddExpense}
                  variant="secondary"
                  className="w-full mt-2"
                >
                  Add Expense
                </Button>
              </div>
            </div>

            {/* Expense List */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Expenses Added:</h3>
              {expenses.length > 0 ? (
                <ul className="space-y-2">
                  {expenses.map((exp, idx) => (
                    <li key={idx} className="p-3 border rounded shadow-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{exp.name}</span>
                        <span className="text-sm text-gray-600">
                          ${exp.amount.toFixed(2)}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {exp.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No expenses added yet.</p>
              )}
            </div>
          </div>
        ) : (
          // Tabbed layout for narrow screens:
          // User can switch between Add Expense and Expense List
          <div className="mt-4">
            <div className="flex space-x-4 border-b mb-4">
              <button
                className={`py-2 px-4 ${
                  activeTab === "add" ? "border-b-2 font-bold" : ""
                }`}
                onClick={() => setActiveTab("add")}
              >
                Add Expense
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "list" ? "border-b-2 font-bold" : ""
                }`}
                onClick={() => setActiveTab("list")}
              >
                Expense List
              </button>
            </div>

            {activeTab === "add" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expense Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter expense name"
                    value={expense.name}
                    onChange={(e) =>
                      setExpense({ ...expense, name: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount (KES)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={expense.amount || ""}
                    onChange={(e) =>
                      setExpense({
                        ...expense,
                        amount: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter description"
                    value={expense.description}
                    onChange={(e) =>
                      setExpense({ ...expense, description: e.target.value })
                    }
                    className="mt-1 w-full"
                  />
                </div>
                <Button
                  onClick={handleAddExpense}
                  variant="secondary"
                  className="w-full mt-2"
                >
                  Add Expense
                </Button>
              </div>
            )}

            {activeTab === "list" && (
              <div>
                {expenses.length > 0 ? (
                  <ul className="space-y-2">
                    {expenses.map((exp, idx) => (
                      <li key={idx} className="p-3 border rounded shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exp.name}</span>
                          <span className="text-sm text-gray-600">
                            ${exp.amount.toFixed(2)}
                          </span>
                        </div>
                        {exp.description && (
                          <p className="mt-1 text-sm text-gray-500">
                            {exp.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No expenses added yet.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Save Button */}
        <DialogFooter className="mt-6">
          <Button onClick={() => handleSubmit()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
