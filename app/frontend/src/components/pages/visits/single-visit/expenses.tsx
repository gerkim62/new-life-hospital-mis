import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Plus } from "lucide-react";

type Props = {
  expenses: Expense[];
};
type Expense = {
  name: string;
  amount: number | undefined;
};

export default function Expenses({ expenses }: Props) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Expenses</CardTitle>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Item</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.name}</TableCell>
                <TableCell className="text-right">${expense.amount}</TableCell>
              </TableRow>
            ))}
            <TableRow className="border-t-2">
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell className="text-right font-semibold">
                $
                {expenses.reduce(
                  (sum, expense) => sum + (expense?.amount ?? 0),
                  0
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-6 flex justify-end">
          <Button className="flex gap-2">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
