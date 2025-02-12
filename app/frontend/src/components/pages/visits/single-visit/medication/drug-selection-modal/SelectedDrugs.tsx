import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Drug } from "./types";
import { formatCurrency } from "@/lib/format";
import { toast } from "react-toastify";

interface SelectedDrugsProps {
  selectedDrugs: Drug[];
  setSelectedDrugs: React.Dispatch<React.SetStateAction<Drug[]>>;
  onSubmit: () => void;
}

const SelectedDrugs: React.FC<SelectedDrugsProps> = ({
  selectedDrugs,
  setSelectedDrugs,
  onSubmit,
}) => {
  const handleRemoveDrug = (index: number) => {
    const name = selectedDrugs[index].name;
    setSelectedDrugs((prevDrugs) => prevDrugs.filter((_, i) => i !== index));
    toast.info(`Removed ${name}`);
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedDrugs.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No medications selected yet.
              </TableCell>
            </TableRow>
          )}
          {selectedDrugs.map((drug, index) => (
            <TableRow key={index}>
              <TableCell>{drug.name}</TableCell>
              <TableCell>{drug.description || "N/A"}</TableCell>
              <TableCell>{drug.dosage}</TableCell>
              <TableCell>
                {drug.quantity ?? "N/A"}
                {"unit" in drug ? ` ${drug.unit}` : ""}
              </TableCell>
              <TableCell>
                {"totalPrice" in drug ? formatCurrency(drug.totalPrice) : "N/A"}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveDrug(index)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={onSubmit} disabled={selectedDrugs.length === 0}>
        Submit
      </Button>
    </div>
  );
};

export default SelectedDrugs;
