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

type Props = {
  drugs: Drug[];
};

type Drug = {
  name: string;
  quantity?: number;
  fromStock: boolean;
  price?: number | null;
};

export default function Medication({ drugs }: Props) {
  const [
    ,
    // selectionModalOpen
    setSelectionModalOpen,
  ] = useState(false);
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Medications</CardTitle>
        <Button
          onClick={() => setSelectionModalOpen(true)}
          variant="ghost"
          size="icon"
        >
          <Plus className="h-4 w-4" /> Add Medication
        </Button>
        {/* {selectionModalOpen && (
          // <MedicationSelectionStockModal
          //   onClose={() => setSelectionModalOpen(false)}
          // />
        )} */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drugs.map((drug, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{drug.name}</TableCell>
                <TableCell>{drug.quantity}</TableCell>
                <TableCell>
                  {drug.fromStock ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Hospital Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Prescribed
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {drug.fromStock && drug.price ? `$${drug.price}` : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
