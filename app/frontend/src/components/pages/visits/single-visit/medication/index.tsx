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
import { Plus } from "lucide-react";
import { useState } from "react";
import DrugSelectionModal from "./drug-selection-modal";
import { ComprehensiveDrug } from "@app/backend/src/routes/visits/visit/types";
import { formatCurrency } from "@/lib/format";

type Props = {
  drugs: Drug[];
};

type Drug = ComprehensiveDrug;

export default function Medication({ drugs }: Props) {
  const [selectionModalOpen, setSelectionModalOpen] = useState(false);
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Medications</CardTitle>
        <Button onClick={() => setSelectionModalOpen(true)} variant={"outline"}>
          <Plus className="h-4 w-4" /> Add Medication
        </Button>
        {selectionModalOpen && (
          <DrugSelectionModal onClose={() => setSelectionModalOpen(false)} />
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drugs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No medications added yet.
                </TableCell>
              </TableRow>
            )}
            {drugs.map((drug, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{drug.name}</TableCell>
                <TableCell>
                  {drug.fromStock
                    ? drug.quantity + " (" + drug.unit + ")"
                    : "-"}
                </TableCell>
                <TableCell>{drug.dosage}</TableCell>
                <TableCell>{drug.description}</TableCell>
                <TableCell>
                  {drug.fromStock ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hospital Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      To be bought
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {drug.fromStock ? `${formatCurrency(drug.price)}` : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
