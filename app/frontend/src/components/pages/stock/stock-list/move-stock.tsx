import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createStockMovement } from "@/mutations/stock/movements";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  toggle: (isOpen: boolean) => void;
  item: {
    quantity: number;
    description: string;
    name: string;
    id: string;
    unit: string;
  };
};

export function MoveStockItemModal({ toggle, item }: Props) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [movementType, setMovementType] = useState<"IN" | "OUT" | null>(null);
  const [priceType, setPriceType] = useState<"UNIT" | "BULK" | null>(null);
  const [price, setPrice] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createStockMovement({
        itemId: item.id,
        description,
        batchPriceKes:
          priceType === "UNIT"
            ? Number(price)
            : Number(price) * Number(quantity),
        quantity: Number(quantity),
        type: movementType === "IN" ? "IN" : "OUT",
      }),
    onError: () => toast.error("Something went wrong"),
    onSuccess: (data) => {
      if (data.success) {
        setDescription("");
        setQuantity("");
        setMovementType(null);
        setPriceType(null);
        setPrice("");

        toggle(false);

        toast.success(data.message);
      } else toast.error(data.message);
    },
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!movementType || !priceType || !quantity || !price) {
      return toast.error("Please fill all required fields first.");
    }

    mutate();
  }

  return (
    <Dialog defaultOpen onOpenChange={toggle}>
      {isPending && <Loader message={`Saving changes for ${item.name}...`} />}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move Stock Item - ({item.name})</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Movement Type</Label>
            <select
              onChange={(e) => setMovementType(e.target.value as "IN" | "OUT")}
              className="w-full border rounded p-2"
              required
            >
              <option value="" disabled selected>
                Select type
              </option>
              <option value="IN">In (Adding to Stock)</option>
              <option value="OUT">Out (Removing from Stock)</option>
            </select>
          </div>
          <div>
            <Label>Quantity</Label>
            <Input
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
              required
              type="number"
              placeholder={`e.g 5 ${item.unit}`}
            />
          </div>
          <div>
            <Label>Description (optional)</Label>
            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div>
            <Label>Price (KES)</Label>
            <Input
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              required
              type="number"
              placeholder="Enter price"
            />
          </div>
          <div>
            <Label>Price Type</Label>
            <select
              onChange={(e) => setPriceType(e.target.value as "UNIT" | "BULK")}
              className="w-full border rounded p-2"
              required
            >
              <option value="" disabled selected>
                Select price type
              </option>
              <option value="UNIT">Per Unit</option>
              <option value="BULK">For the selected quantity</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => toggle(false)}
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
