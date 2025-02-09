import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PDFDownloadLink } from "@react-pdf/renderer";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Plus } from "lucide-react";
import { AddExpensesModal } from "./add-expenses-modal";
import { useState } from "react";
import { formatCurrency, formatDateTime } from "@/lib/format";
import ReceiptPdf, { ReceiptProps } from "@/components/pdf/receipt";
import { printPDF } from "@/lib/print";
import { toast } from "react-toastify";

type Props = ReceiptProps;

export default function Expenses(props: Props) {
  const [addingExpense, setAddingExpense] = useState(false);
  const { medications, labs, otherExpenses, patient } = props;

  // Calculate totals for each category
  const totalMedications = medications.reduce(
    (sum, expense) => sum + (expense.price ?? 0),
    0
  );
  const totalLabs = labs.reduce(
    (sum, expense) => sum + (expense.price ?? 0),
    0
  );
  const totalOtherExpenses = otherExpenses.reduce(
    (sum, expense) => sum + (expense.price ?? 0),
    0
  );
  const totalExpenses = totalMedications + totalLabs + totalOtherExpenses;

  return (
    <Card className="border border-gray-200 shadow-sm">
      {addingExpense && (
        <AddExpensesModal onClose={() => setAddingExpense(false)} />
      )}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Expenses</CardTitle>
        <Button onClick={() => setAddingExpense(true)} variant="outline">
          <Plus className="h-4 w-4" /> Add Expenses
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
            {medications.length > 0 && (
              <>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={2} className="font-bold">
                    Medications
                  </TableCell>
                </TableRow>
                {medications.map((expense, index) => (
                  <TableRow key={`med-${index}`}>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(expense.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}

            {labs.length > 0 && (
              <>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={2} className="font-bold">
                    Lab Tests
                  </TableCell>
                </TableRow>
                {labs.map((expense, index) => (
                  <TableRow key={`lab-${index}`}>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(expense.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}

            {otherExpenses.length > 0 && (
              <>
                <TableRow className="bg-gray-100">
                  <TableCell colSpan={2} className="font-bold">
                    Other Expenses
                  </TableCell>
                </TableRow>
                {otherExpenses.map((expense, index) => (
                  <TableRow key={`other-${index}`}>
                    <TableCell>{expense.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(expense.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}

            <TableRow className="border-t-2">
              <TableCell className="font-semibold">Total</TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(totalExpenses)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="mt-6 flex justify-end">
          <PDFDownloadLink
            document={
              <ReceiptPdf
                patient={patient}
                labs={labs}
                medications={medications}
                otherExpenses={otherExpenses}
              />
            }
            fileName={`Receipt-${patient.name}-PatientID:${patient.id}----------${formatDateTime(new Date())}.pdf`}
          >
            {({ url, loading, error }) => (
              <Button
                onClick={() => {
                  if (!url) return toast.error("Error generating PDF");
                  printPDF(url);
                }}
                disabled={Boolean(loading || error)}
                className="flex gap-2"
              >
                <Download className="h-4 w-4" />
                {loading
                  ? "Loading document..."
                  : error
                    ? "Error loading document"
                    : "Receipt"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </CardContent>
    </Card>
  );
}
