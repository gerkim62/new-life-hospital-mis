"use client";

import Loader from "@/components/small/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStockItem } from "@/mutations/stock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface StockItem {
  name: string;
  description: string;
  unit: string;
  id: string;
}

interface EditStockItemModalProps {
  initialData: StockItem;
  onClose: () => void;
}

const EditStockItemModal: React.FC<EditStockItemModalProps> = ({
  initialData,
  onClose,
}) => {
  // Form state for each input
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [unit, setUnit] = useState(initialData.unit);

  const queryClient = useQueryClient();

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateStockItem({ name, description, unit, itemId: initialData.id }),
    onError: () => toast.error("Something went wrong"),
    onSuccess: (data) => {
      if (data.success) {
        onClose();
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["stockItems"],
        });
      } else {
        toast.error(data.message);
      }
    },
  });

  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Stock Item</DialogTitle>
          <DialogDescription>
            Update the details of your stock item below.
          </DialogDescription>
        </DialogHeader>

        {/* Form with inputs for name, description, and quantity */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isPending && <Loader message="Saving changes..." />}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Item Name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Item Description"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              type="string"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Enter Unit"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>

        {/* A close button for the modal */}
      </DialogContent>
    </Dialog>
  );
};

export default EditStockItemModal;
