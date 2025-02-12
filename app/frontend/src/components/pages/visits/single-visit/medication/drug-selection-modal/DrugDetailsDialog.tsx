import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { HospitalDrug, DrugFromStock } from "./types";
import { formatCurrency } from "@/lib/format";
import { toast } from "react-toastify";

interface DrugDetailsDialogProps {
  drug: HospitalDrug;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (drug: DrugFromStock) => void;
}

const DrugDetailsDialog: React.FC<DrugDetailsDialogProps> = ({
  drug,
  open,
  onOpenChange,
  onConfirm,
}) => {
  const [dosage, setDosage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [isPricePerUnit, setIsPricePerUnit] = useState(true);
  const [description, setDescription] = useState(drug.description || "");

  const handleConfirm = () => {
    if (!dosage) return;

    const selectedDrug: DrugFromStock = {
      name: drug.name,
      description: description || "",
      dosage,
      quantity: Number(quantity),
      unit: drug.unit,
      totalPrice: !isPricePerUnit
        ? Number(price)
        : Number(price) * Number(quantity),
      stockItemId: drug.id,
    };

    if (selectedDrug.quantity > drug.quantity) {
      return toast.error("Quantity exceeds available stock", {
        toastId: "quantity-exceeds-stock",
      });
    }

    if (!selectedDrug.totalPrice) {
      return toast.error("Must enter price, and quantity", {
        toastId: "price-quantity-missing",
      });
    }

    onConfirm(selectedDrug);
    toast.info(`Added ${selectedDrug.name}. Don't forget to save!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add {drug.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Dosage</Label>
            <Input
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="e.g. 1x2"
              required
            />
          </div>

          <div>
            <Label>
              Quantity - {drug.quantity}({drug.unit}) in stock
            </Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
              max={drug.quantity}
              required
            />
          </div>

          <div>
            <Label>
              Price (Current Total:{" "}
              {formatCurrency(
                isPricePerUnit
                  ? Number(price) * Number(quantity)
                  : Number(price)
              )}
              )
            </Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              step="0.01"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Input
              type="checkbox"
              checked={isPricePerUnit}
              onChange={(e) => setIsPricePerUnit(e.target.checked)}
              className="w-4 h-4"
            />
            <Label>Price per unit</Label>
          </div>

          {/* Description Input */}
          <div>
            <Label>Description (optional)</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleConfirm} disabled={!dosage}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DrugDetailsDialog;
