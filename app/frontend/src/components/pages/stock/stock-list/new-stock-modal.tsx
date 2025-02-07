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
import { addNewStockItem } from "@/mutations/stock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  toggle: (isOpen: boolean) => void;
};

export function NewStockModal({ toggle }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      addNewStockItem({
        description,
        name,
        quantity: Number(quantity),
        unit,
      }),
    onError: () => toast.error("Something went wrong"),
    onSuccess: (data) => {
      if (data.success) {
        // Clear form
        setName("");
        setDescription("");
        setQuantity("");
        setUnit("");

        toggle(false);

        toast.success(data.message);

        queryClient.invalidateQueries({
          queryKey: ["stockItems"],
        });
      } else toast.error(data.message);
    },
  });

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !unit.trim() || quantity === "") {
      toast.error("All fields are required.");
      return;
    }

    console.log(name, unit, quantity);

    mutate();
  }

  return (
    <Dialog defaultOpen onOpenChange={toggle}>
      <DialogContent>
        {isPending && <Loader message="Please wait..." />}
        <DialogHeader>
          <DialogTitle>Add New Stock Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g Paracetamol"
            />
          </div>
          <div>
            <Label>Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>
          <div>
            <Label>Quantity</Label>
            <Input
              min={1}
              required
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : e.target.value)
              }
              placeholder="Enter quantity"
            />
          </div>
          <div>
            <Label>Unit</Label>
            <Input
              required
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="E.g., Kg, Litres"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              disabled={isPending}
              onClick={() => toggle(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isPending}>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
